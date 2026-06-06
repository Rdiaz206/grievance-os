import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const authenticated = req.cookies.get("grievance-auth")?.value;
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/app");

  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*"],
};
