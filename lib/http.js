import { NextResponse } from "next/server";
export function errorResponse(error){const message=error instanceof Error?error.message:"Unexpected error";const status=message==="UNAUTHORIZED"?401:message==="FORBIDDEN"?403:message.includes("not found")?404:400;return NextResponse.json({error:message},{status})}
export const reference=()=>`RTI-${new Date().getFullYear()}-${String(Math.floor(100000+Math.random()*900000))}`;
