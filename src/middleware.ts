
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/", request.url));
  // return NextResponse.redirect(new URL("/Dashboard", request.url))
  NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard","/Dashboard/order","/Dashboard/Inventory"],
};