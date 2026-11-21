import { redirect } from "next/navigation"; import { currentUser } from "@/lib/auth";
export default async function Dashboard(){const user=await currentUser();if(!user)redirect("/login");redirect(user.role==="admin"?"/dashboard/admin":user.role==="officer"?"/dashboard/officer":"/dashboard/citizen")}
