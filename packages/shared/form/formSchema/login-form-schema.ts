import { z } from "zod";
export const LogInSchema= z.object(
    {
        
        username:z
        .string()
        .regex(/^([a-zA-Z0-9]+)$/,{message:"Must Contain atleast a letter and a number"})
        ,
        password:z
        .string()
        .min(8,{message:"Invalid Password"})
        .max(20,{message:"Invalid Password"})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=?]+$/,{message:"Invalid Password"})
        
    }
)

export type LogInFormParams = z.infer<typeof LogInSchema>