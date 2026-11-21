import OpenAI from "openai";
import { connectDb } from "@/lib/db";
import { Application } from "@/lib/models";

const DEPARTMENTS=["Education Department","Agriculture Department","Health Department","Public Works Department","Police Department","Revenue Department","Transport Department","Electricity Department","Water Supply Department","Municipal Corporation","Rural Development Department","Social Welfare Department","Finance Department","Environment Department","Other / Unclassified"];

const client=()=>{const key=process.env.OPENROUTER_API_KEY;if(!key)throw new Error("AI service is not configured");return new OpenAI({apiKey:key,baseURL:"https://openrouter.ai/api/v1",timeout:25000})};
export async function createEmbedding(text){return []}

export async function analyzeRequest(subject,body){
  const ai=client();
  const prompt=`Classify this RTI application into exactly one department.\nSubject: ${subject.slice(0,180)}\nDescription: ${body.slice(0,12000)}\nAllowed departments: ${DEPARTMENTS.join(" | ")}\nReturn strict JSON: {"department":"...", "confidence":0.0,"reason":"..."}`;
  const r=await ai.chat.completions.create({
    model:process.env.OPENROUTER_MODEL||"openai/gpt-4o-mini",
    temperature:0.1,
    max_tokens:180,
    messages:[{role:"system",content:"You classify Indian RTI requests. Never invent departments or legal facts. Return only valid JSON."},{role:"user",content:prompt}],
    response_format:{type:"json_object"}
  });
  const data=JSON.parse(r.choices[0].message.content||"{}");
  const confidence=Math.max(0,Math.min(1,Number(data.confidence)||0));
  const department=DEPARTMENTS.includes(data.department)?data.department:"Other / Unclassified";
  return {department,confidence,reason:String(data.reason||"The request requires manual department review").slice(0,500),manualDepartmentReview:department==="Other / Unclassified"||confidence<0.7};
}

export async function generateDraft(applicationId,{force=false}={}){
  await connectDb();
  const app=await Application.findById(applicationId);
  if(!app)throw new Error("Application not found");
  if(app.ai?.draft&&!force)return app;
  const documents=(app.documents||[]).filter(doc=>doc.extractedText).map(doc=>`[${doc.originalName}] ${doc.extractedText.slice(0,3000)}`).join("\n");
  const r=await client().chat.completions.create({
    model:process.env.OPENROUTER_MODEL||"openai/gpt-4o-mini",
    temperature:0.2,
    max_tokens:1200,
    messages:[
      {role:"system",content:"Draft a formal preliminary RTI response using only the application and officer-supplied/document evidence below. Do not invent facts or documents. Clearly state unavailable information and officer/legal input needed. Identify potentially applicable RTI Act exemptions for review, but do not claim legal verification. Do not automatically reject."},
      {role:"user",content:`Subject: ${app.subject}\nDepartment: ${app.department||app.recommendedDepartment||"Other / Unclassified"}\nCitizen query: ${app.body}\nSupporting documents: ${documents||"None available"}\n\nWrite the draft only.`}
    ]
  });
  const draft=r.choices[0].message.content||"";
  app.ai={...(app.ai||{}),draft};
  app.status="draft_ready";
  await app.save();
  return app;
}
