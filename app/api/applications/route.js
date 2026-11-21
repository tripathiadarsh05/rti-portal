import { NextResponse } from "next/server"; import { z } from "zod"; import { connectDb } from "@/lib/db"; import { Application } from "@/lib/models"; import { requireUser } from "@/lib/auth"; import { errorResponse,reference } from "@/lib/http"; import { analyzeRequest } from "@/lib/ai"; import { audit } from "@/lib/audit";
const input=z.object({subject:z.string().trim().min(10).max(180),body:z.string().trim().min(30).max(12000),mobile:z.string().regex(/^[6-9]\d{9}$/).optional()});
export async function GET(){try{const user=await requireUser();await connectDb();const officerScope=[{assignedOfficer:user.id}];if(user.department)officerScope.push({department:user.department});const query=user.role==="citizen"?{citizen:user.id}:user.role==="officer"?{$or:officerScope}:{};const apps=await Application.find(query).populate("citizen","name email").populate("assignedOfficer","name").sort({updatedAt:-1}).lean();return NextResponse.json({applications:apps})}catch(e){return errorResponse(e)}}
export async function POST(req){try{const user=await requireUser(["citizen"]);const data=input.parse(await req.json());await connectDb();
let ai;
try{
  const result=await analyzeRequest(data.subject,data.body);
  ai={summary:"Automatic department classification completed",keywords:[],classification:{department:result.department,confidence:result.confidence,reason:result.reason},manualDepartmentReview:result.manualDepartmentReview};
}catch{ai=undefined}
const applicant=await import("@/lib/models").then(m=>m.User.findById(user.id).select("name mobile"));
let app;
for(let attempt=0;attempt<5;attempt++){
  try{
    app=await Application.create({reference:reference(),applicantName:applicant?.name||user.name,mobile:data.mobile||applicant?.mobile||"",subject:data.subject,description:data.body,body:data.body,department:ai?.classification?.department==="Other / Unclassified"?undefined:ai?.classification?.department,category:ai?.classification?.department,recommendedDepartment:ai?.classification?.department,aiClassification:ai?.classification?.department,aiConfidence:ai?.classification?.confidence,aiReason:ai?.classification?.reason,manualDepartmentReview:!ai||ai.classification.manualDepartmentReview,ai,citizen:user.id,status:ai?.classification?.department?"assigned":"submitted",timeline:[{status:"submitted",message:"Application submitted",actor:user.id}]});
    break;
  }catch(error){if(error?.code!==11000||attempt===4)throw error}
}
if(app.assignedOfficer===undefined){
  const {User}=await import("@/lib/models");
  const officers=await User.find({role:"officer",department:{$exists:true,$ne:""}}).select("_id department").lean();
  const normalize=(value)=>String(value||"").toLowerCase().replace(/\bdepartment\b/g,"").replace(/[^a-z]/g,"");
  const officer=officers.find(candidate=>normalize(candidate.department)==normalize(app.department||app.recommendedDepartment));
  if(officer){
    app.assignedOfficer=officer._id;
    app.timeline.push({status:app.status,message:"Application routed to an authorised department officer",actor:user.id});
    await app.save();
  }
}
await audit(user.id,"application.created","Application",app._id);return NextResponse.json({application:app},{status:201})}catch(e){return errorResponse(e)}}
