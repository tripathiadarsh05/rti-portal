import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { Application } from "@/lib/models";
import { currentUser } from "@/lib/auth";
import { errorResponse } from "@/lib/http";

export async function GET(_,{params}) {
  try {
    const user=await currentUser();
    if(!user)throw new Error("UNAUTHORIZED");
    const reference=z.string().trim().regex(/^RTI-\d{4}-\d{6}$/).parse((await params).referenceNumber);
    await connectDb();
    const app=await Application.findOne({reference}).select("reference subject description body department status submittedAt createdAt updatedAt officialResponse citizen").populate("citizen","name");
    if(!app)throw new Error("Application not found");
    if(String(app.citizen._id)!==user.id)throw new Error("FORBIDDEN");
    return NextResponse.json({application:{
      referenceNumber:app.reference,
      subject:app.subject,
      submittedAt:app.createdAt,
      department:app.department||app.recommendedDepartment||"Manual assignment required",
      status:app.status,
      updatedAt:app.updatedAt,
      officialResponse:app.status==="response_published"||app.status==="approved"?app.officialResponse:null
    }});
  } catch(error){return errorResponse(error)}
}
