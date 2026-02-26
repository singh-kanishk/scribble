import { JWT_ACCESS_TOKEN_KEY,JWT_REFRESH_TOKEN_KEY} from "../config/env.ts"
import jwt,  {type JwtPayload,type SignOptions } from "jsonwebtoken";


const JWT_SECRET_KEY_ACCESS_TOKEN = JWT_ACCESS_TOKEN_KEY||'little-secret'
const JWT_SECRET_KEY_REFRESH_TOKEN= JWT_REFRESH_TOKEN_KEY||'longer-secret'

export interface UserPayload extends JwtPayload {
  userId: string;
  username: string;
  role?: string;
}

export const generateAccessToken = (payload:UserPayload, options:SignOptions = {expiresIn:'15m'})=>{
    return jwt.sign(payload,JWT_SECRET_KEY_ACCESS_TOKEN,options)   
}

export const generateRefreshToken = (payload:UserPayload, options:SignOptions = {expiresIn:'7d'})=>{
    return jwt.sign(payload,JWT_SECRET_KEY_REFRESH_TOKEN,options)
}

export const verifyAccessToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY_ACCESS_TOKEN) as UserPayload;
  } catch (error) {
    console.error('Token verification failed:', (error as Error).message);
    return null; 
  }
};
export const verifyRefreshToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY_REFRESH_TOKEN) as UserPayload;
  } catch (error) {
    console.error('Token verification failed:', (error as Error).message);
    return null; 
  }
};