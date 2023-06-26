
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const rol = request.cookies.get("rol")?.value;
  if (rol==="USER") return NextResponse.redirect(new URL("/", request.url));
  NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard","/Dashboard/order","/Dashboard/Inventory"],
};