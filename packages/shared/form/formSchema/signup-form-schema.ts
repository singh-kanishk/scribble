import { z } from "zod";
export const signUpSchema= z.object(
    {
        name:z
        .string()
        .min(3 ,{message:"Minimum 3 character should be there"})
        .max(20, {message: "Maximum 20 character can be there"})
        .regex(/^[A-Za-z ]+$/,{message:""})
        ,
        username:z
        .string()
        .regex(/^([a-zA-Z0-9]+)$/,{message:"Must Contain atleast a letter and a number"})
        ,
        password:z
        .string()
        .min(8,{message:"Minimum length should be 8"})
        .max(20,{message:"Maximum 20 character can be there"})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=?]+$/,{message:"Should have atleast one letter and one number"})
        ,
        confirmPassword:z.string()
    }
)
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})


export type SignUpFormParams = z.infer<typeof signUpSchema>