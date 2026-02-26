import { eq } from "drizzle-orm";
import { users } from "../db/schema.ts";
import { db } from "../server.ts";
import bcrypt from 'bcrypt'


const SALT_ROUNDS=10


export async function isUsernamePresent(username:string){
 const result = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.username,username), 
  columns: { 
    password:true
  }
});

if(result===undefined){
    console.error('Cannot Find username')
    return null
}
return result.password;
}
interface GetRawPasswordParams{
  rawPassword:string,
  hashPassword:string
}
export async function comparePassword({rawPassword,hashPassword}:GetRawPasswordParams) {
  if(!rawPassword||!hashPassword){
    return null
  }
  return await bcrypt.compare(rawPassword,hashPassword)  
}
export async function getHashedPassword(rawPassword:string){
  if(!rawPassword){
    return null
  }
  return await bcrypt.hash(rawPassword,SALT_ROUNDS)
}

export interface AccesibleProperty {
  password?: string;
  role?: 'USER'|'ADMIN'|null;
  name?: string;
  id?:string;
}

export async function getUsersPropertyFromUsername(
  username: string  
) {
  
  const [obj] = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (!obj) return null;
  const result: AccesibleProperty={
    name:obj.username,
    id:obj.id,
    role:obj.role,
    password:obj.password
  } 

  
  return result;
}
