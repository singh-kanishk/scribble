import { type ApiResponse } from '@my-app/shared';
import { PORT } from '@my-app/shared';
// 1. Added an internal _retry flag to prevent infinite refresh loops
interface ApiCallParams {
  url: string;
  config?: RequestInit;
  method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE'; // Changed 'UPDATE' to 'PATCH'
  _retry?: boolean; 
}

export async function apiCall<T>({ url, config, method, _retry = false }: ApiCallParams): Promise<ApiResponse<T>> {
  try {
    const finalConfig: RequestInit = {
      ...config,
      method: method,
      
      // CRITICAL: Tells the browser to send your HttpOnly tokens (cookies)
      credentials: 'include', 
      
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    const response = await fetch(url, finalConfig);

    // --- THE AUTO-REFRESH INTERCEPTOR ---
    // If the access token is expired (401) and we haven't retried yet...
    if (response.status ===401 && !_retry) {
      console.warn('Access token expired. Attempting background refresh...');

      // Call your backend refresh endpoint. 
      // (The browser auto-attaches the refreshToken cookie because of credentials: 'include')
      const refreshRes = await fetch(`http://localhost:${PORT.server}/auth/refresh`, {
        // server mounts auth routes under /auth and uses GET for refresh
        method: 'GET',
        credentials: 'include',
      });
      

      if (refreshRes.ok) {
        // Success! The server just planted a NEW accessToken cookie in the browser.
        // We retry the exact same original request transparently:
        return apiCall<T>({ url, config, method, _retry: true });
      } else {
        // The refresh token is ALSO expired. Hard logout time.
        window.location.href = '/login'; 
        return {
          success: false,
          statusCode: 401,
          message: 'Session permanently expired. Please log in again.',
        };
      }
    }
    // --- END INTERCEPTOR ---
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        message: result?.message,
      };
    }

    return {
      success: true,
      statusCode: response.status,
      body: result.body,
      message: 'Successful',
    };
    
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
    return {
      success: false,
      statusCode: 500, // Consider 500 for network-level failures
      error: errorMessage,
      message: errorMessage,
    };
  }
}