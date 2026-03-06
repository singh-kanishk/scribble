export interface ApiResponse<T> {
  success: boolean;
  body?: T;
  error?: string;
  message?:string;
  statusCode: number;
  isSessionExpired?:boolean
}