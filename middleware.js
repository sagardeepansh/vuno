import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  // If not logged in → redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in → prevent going to login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};