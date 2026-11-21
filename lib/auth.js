import jwt from "jsonwebtoken"; import { cookies } from "next/headers"; import { connectDb } from "@/lib/db"; import { User } from "@/lib/models";
const name="rti_session"; const secret=()=>{const s=process.env.JWT_SECRET;if(!s)throw new Error("JWT_SECRET is not configured");return s};
export function signSession(user){return jwt.sign({id:String(user._id),role:user.role,name:user.name,department:user.department},secret(),{expiresIn:"8h"})}
export async function currentUser(){try{const token=(await cookies()).get(name)?.value;if(!token)return null;return jwt.verify(token,secret())}catch{return null}}
export async function requireUser(roles){const user=await currentUser();if(!user)throw new Error("UNAUTHORIZED");if(roles&&!roles.includes(user.role))throw new Error("FORBIDDEN");return user}
export const sessionCookie=(value)=>({name,value,httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*8});
export async function userFromSession(){const s=await currentUser();if(!s)return null;await connectDb();return User.findById(s.id)}
