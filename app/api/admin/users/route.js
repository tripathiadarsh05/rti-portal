import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models";
import { requireUser } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { errorResponse } from "@/lib/http";

const officerInput=z.object({name:z.string().trim().min(2).max(100),email:z.string().email().max(200),password:z.string().min(10).max(128),department:z.string().trim().min(2).max(100)});

export async function GET(){try{await requireUser(["admin"]);await connectDb();const users=await User.find().select("name email role department createdAt").sort({createdAt:-1}).lean();return NextResponse.json({users})}catch(error){return errorResponse(error)}}

export async function POST(req){try{const admin=await requireUser(["admin"]);const data=officerInput.parse(await req.json());await connectDb();const email=data.email.toLowerCase();if(await User.exists({email}))throw new Error("An account already exists for this email");const officer=await User.create({name:data.name,email,passwordHash:await bcrypt.hash(data.password,12),role:"officer",department:data.department});await audit(admin.id,"officer.created","User",officer._id,{department:officer.department});return NextResponse.json({user:{id:officer.id,name:officer.name,email:officer.email,role:officer.role,department:officer.department}},{status:201})}catch(error){return errorResponse(error)}}

export async function PATCH(req){try{await requireUser(["admin"]);const data=z.object({id:z.string(),role:z.enum(["citizen","officer","admin"]),department:z.string().max(100).optional()}).parse(await req.json());await connectDb();const user=await User.findByIdAndUpdate(data.id,{role:data.role,department:data.department},{new:true}).select("name email role department");if(!user)throw new Error("User not found");return NextResponse.json({user})}catch(error){return errorResponse(error)}}
