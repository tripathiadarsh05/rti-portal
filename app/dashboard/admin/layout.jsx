import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

export default async function AdminLayout({children}){
  const user=await currentUser();
  if(!user)redirect("/login");
  if(user.role!=="admin")redirect(user.role==="officer"?"/dashboard/officer":"/dashboard/citizen");
  return children;
}
