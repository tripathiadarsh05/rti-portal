import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { Department } from "@/lib/models";
import { requireUser } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { errorResponse } from "@/lib/http";

export async function GET(){
  try{await requireUser(["admin"]);await connectDb();return NextResponse.json({departments:await Department.find().sort({name:1}).lean()})}catch(error){return errorResponse(error)}
}
export async function POST(req){
  try{const admin=await requireUser(["admin"]);const data=z.object({name:z.string().trim().min(2).max(100),description:z.string().trim().max(500).optional()}).parse(await req.json());await connectDb();const department=await Department.create(data);await audit(admin.id,"department.created","Department",department._id,{name:department.name});return NextResponse.json({department},{status:201})}catch(error){return errorResponse(error)}
}
