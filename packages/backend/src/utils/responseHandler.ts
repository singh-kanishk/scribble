import type { Response } from "express";


// export interface ApiResponse<T> {
//   success: boolean;
//   body?: T;
//   error?: string;
//   message?:string;
//   statusCode: number;
// }
interface SendSuccessParams<T>{
  res: Response,
  data: T,
  message: string,
  statusCode: number
}
interface SuccessResponse<T> {
  success: true;
  message: string;
  body: T;
  statusCode:number
}
interface ErrorResponse {
  success: false;
  message: string;
  error?: unknown;
  statusCode:number;
  isSessionExpired?:boolean
}
interface SendErrorParams{
  res: Response;
  message: string; 
  statusCode: number; 
  error?: unknown;
  isSessionExpired?:boolean;
}

export const sendSuccess = <T>(
  {res,message,statusCode,data}:SendSuccessParams<T>
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    statusCode:statusCode,
    message,
    body: data,
  };
  
  res.status(statusCode).json(response);
};

export const sendError = (
  {res,message,statusCode,error,isSessionExpired}:SendErrorParams
): void => {
  const response: ErrorResponse = {
    success: false,
    statusCode:statusCode,
    message,
    ...(error !== undefined && { error }),
    isSessionExpired:isSessionExpired
  };

  res.status(statusCode).json(response);
};