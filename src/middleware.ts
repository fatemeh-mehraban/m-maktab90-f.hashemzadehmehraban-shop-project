// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import Cookies from 'universal-cookie';

 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     const cookies = new Cookies();
//     const token = cookies.get("adminToken")?.value
//     if(!token){
//         return NextResponse.redirect(new URL('/', request.url));

//     }
//     NextResponse.next()
// }
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher:'/Dashboard'
// };
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/", request.url));
  NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard","/order","/Inventory"],
};