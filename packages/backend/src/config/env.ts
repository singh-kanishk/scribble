import { configDotenv } from "dotenv";

configDotenv(); 


export const JWT_ACCESS_TOKEN_KEY = process.env.JWT_SECRET_KEY_ACCESS_TOKEN;
export const JWT_REFRESH_TOKEN_KEY = process.env.JWT_SECRET_KEY_REFRESH_TOKEN;
export const JWT_REFRESH_ACCESS_TOKEN = process.env.JWT_SECRET_KEY_REFRESH_ACCESS_TOKEN;