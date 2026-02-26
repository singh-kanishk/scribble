
import { db } from "../../server.ts";
import { users } from "../schema.ts";


interface PostUserInterface{
    name:string;
    username:string;
    hashedPassword:string
}

export async function postUser({name,username,hashedPassword}:PostUserInterface){
    if(!(username&&hashedPassword)){
        throw new Error('Incomplete Values for SignUp')
    }
    const result= await db.insert(users).values({name:name,username:username,password:hashedPassword}).returning({insertedId:users.id})
    return result[0].insertedId;
}