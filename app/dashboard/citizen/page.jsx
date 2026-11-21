import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import Portal from "@/components/portal";

export default async function CitizenDashboard(){
  const user=await currentUser();
  if(!user)redirect("/login");
  if(user.role!=="citizen")redirect(user.role==="officer"?"/dashboard/officer":"/dashboard/admin");
  return <Portal user={user}/>;
}
