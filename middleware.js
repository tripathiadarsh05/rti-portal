import { NextResponse } from "next/server";
export function middleware(req){if(req.nextUrl.pathname.startsWith("/dashboard")&&!req.cookies.get("rti_session")){return NextResponse.redirect(new URL("/login",req.url))}return NextResponse.next()}
export const config={matcher:["/dashboard/:path*"]};
