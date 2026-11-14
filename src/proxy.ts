import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sql_office_session")?.value;

  const protectedPrefixes = ["/office", "/interview", "/badges", "/dashboard"];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  // Protect internal practice and workspace routes - require authentication
  if (isProtected && !sessionToken) {
    const signupUrl = new URL("/auth/signup", request.url);
    signupUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signupUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/office/:path*", "/interview/:path*", "/badges/:path*", "/dashboard/:path*"],
};
