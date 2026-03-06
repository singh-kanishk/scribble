import express from "express";
import type { Request,Response } from "express";
import {type SignUpFormParams,type LogInFormParams } from "@my-app/shared";
import { getHashedPassword,isUsernamePresent ,comparePassword, getUsersPropertyFromUsername} from "../../utils/queries.ts";
import type { ApiResponse } from "@my-app/shared";
import { sendError,sendSuccess } from "../../utils/responseHandler.ts";
import { generateAccessToken,generateRefreshToken, type UserPayload } from "../../utils/jwtHandler.ts";
import { postUser } from "../../db/queries/query.ts";
import { refreshSession } from "./sessionHandler.ts";
export const authRouter = express.Router();


export interface SignUpResponseHeader {
    userId:string;
    jwt:string;
}
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  };

authRouter.get('/refresh',refreshSession)

authRouter.post('/signup',async (req:Request,res:Response<ApiResponse<null>>)=>{
    try{
        const body:SignUpFormParams= req.body

        const username= await isUsernamePresent(body.username)  
        if(username!==null){
           return sendError({res:res , message:'username already present', statusCode:400})
        }

        const hashPassword= await getHashedPassword(body.password)
        if(hashPassword===null){
            return sendError({res:res , message:'Server Error' , statusCode:400})
        }

        const insertedId = await postUser({name:body.name,username:body.username,hashedPassword:hashPassword})

        const payload:UserPayload= {
            userId:insertedId,
            username:body.username
        }
const accessToken = generateAccessToken(payload,{expiresIn:'15m'})
const refreshToken = generateRefreshToken(payload,{expiresIn:'7d'})


res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  res.cookie('refreshToken',refreshToken,
    {...cookieOptions,
        maxAge:7*24*60*60*1000 // 7 day
    })
        return sendSuccess<null>( { res:res , message:'Successfully Signed Up' , statusCode:200 , data:null} )
    }
    catch(error){
       const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
       return sendError({res:res,error:errorMessage,message:errorMessage,statusCode:400})
    }
})
authRouter.post('/login',async (req:Request,res:Response<ApiResponse<null>>)=>{
    try{
        
        const body:LogInFormParams = req.body
        const userData = await getUsersPropertyFromUsername(body.username)
        
        const isPasswordCorrect = await comparePassword({rawPassword:body.password,hashPassword:userData?.password||''})
        
        if(!isPasswordCorrect|| !userData){
            return sendError({res:res ,message:'Either UserName or Password Incorrect', statusCode:400})
        }
        const payload:UserPayload={
            userId:userData.id||'',
            username:body.username
        }
        const accessToken = generateAccessToken(payload,{expiresIn:'15m'})
        const refreshToken = generateRefreshToken(payload,{expiresIn:'7d'})

    res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
    res.cookie('refreshToken',refreshToken,
    {...cookieOptions,
        maxAge:7*24*60*60*1000 // 7 day
    })

    return sendSuccess<null>( { res:res , message:'Successfully Logged In' , statusCode:200 , data:null} )
    }
    catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
        return sendError({res:res,error:errorMessage,message:errorMessage,statusCode:400})
    }


//  try{
//         const body:LogInFormParams= req.body

//         const username= await isUsernamePresent(body.username)  
//         if(username!==null){
//            return sendError({res:res , message:'username already present', statusCode:400})
//         }

//         const hashPassword= await getHashedPassword(body.password)
//         if(hashPassword===null){
//             return sendError({res:res , message:'Server Error' , statusCode:400})
//         }

//         // const insertedId = await postUser({name:body.name ,username:body.username,hashedPassword:hashPassword})

//         // const payload:UserPayload= {
//         //     userId:insertedId,
//         //     username:body.username
// //         // }
// // const accessToken = generateAccessToken(payload,{expiresIn:'15m'})
// // const refreshToken = generateRefreshToken(payload,{expiresIn:'7d'})
// // const cookieOptions = {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === 'production',
// //     sameSite: 'strict' as const,
// //   };

// // res.cookie('accessToken', accessToken, {
// //     ...cookieOptions,
// //     maxAge: 15 * 60 * 1000 // 15 minutes
//   });
//   res.cookie('refreshToken',refreshToken,
//     {...cookieOptions,
//         maxAge:7*24*60*60*1000 // 7 day
//     })
//         return sendSuccess<null>( { res:res , message:'Successfully Signed Up' , statusCode:200 , data:null} )
//     }
//     catch(error){
//        const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
//        return sendError({res:res,error:errorMessage,message:errorMessage,statusCode:400})
//     }
})