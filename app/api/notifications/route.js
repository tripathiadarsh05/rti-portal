import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Notification } from "@/lib/models";
import { requireUser } from "@/lib/auth";
import { errorResponse } from "@/lib/http";
export async function GET(){try{const user=await requireUser();await connectDb();const notifications=await Notification.find({recipient:user.id}).sort({createdAt:-1}).limit(20).lean();return NextResponse.json({notifications})}catch(error){return errorResponse(error)}}
