import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Application } from "@/lib/models";
import { requireUser } from "@/lib/auth";
import { canManageApplication } from "@/lib/permissions";
import { errorResponse } from "@/lib/http";

function escapePdf(value){return String(value).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}
function simplePdf(lines){
  const stream=lines.slice(0,80).map((line,index)=>`${index===0?"":"1 0 0 1 72 "+(790-index*18)+" cm\n"}BT /F1 11 Tf 72 790 Td (${escapePdf(line).slice(0,95)}) Tj ET`).join("\n");
  const objects=[
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`
  ];
  let pdf="%PDF-1.4\n"; const offsets=[0];
  objects.forEach((obj,index)=>{offsets.push(Buffer.byteLength(pdf));pdf+=`${index+1} 0 obj\n${obj}\nendobj\n`});
  const xref=Buffer.byteLength(pdf);
  pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
  for(let i=1;i<=objects.length;i++)pdf+=`${String(offsets[i]).padStart(10,"0")} 00000 n \n`;
  pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf,"ascii");
}

export async function GET(_,{params}) {
  try{
    const user=await requireUser();
    await connectDb();
    const app=await Application.findById((await params).id).populate("citizen","name");
    if(!app)throw new Error("Application not found");
    if(user.role==="citizen"&&String(app.citizen._id)!==user.id)throw new Error("FORBIDDEN");
    if(user.role==="officer"&&!canManageApplication(user,app))throw new Error("FORBIDDEN");
    if(!app.officialResponse?.body)throw new Error("Official response not published");
    const lines=[`RTI Reference: ${app.reference}`,`Subject: ${app.subject}`,"","Official Response","",...app.officialResponse.body.split(/\r?\n/)];
    return new NextResponse(simplePdf(lines),{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${app.reference}-response.pdf"`}});
  }catch(error){return errorResponse(error)}
}
