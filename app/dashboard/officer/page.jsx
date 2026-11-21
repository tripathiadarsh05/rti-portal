import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import OfficerWorkspace from "@/components/officer-workspace";

export default async function OfficerDashboard(){
  const user=await currentUser();
  if(!user)redirect("/login");
  if(user.role!=="officer")redirect(user.role==="admin"?"/dashboard/admin":"/dashboard/citizen");
  return <OfficerWorkspace user={user}/>;
}
