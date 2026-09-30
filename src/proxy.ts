import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sql_office_session")?.value;

  // Protect office simulation workspaces - require authentication
  if (pathname.startsWith("/office")) {
    if (!sessionToken) {
      const signupUrl = new URL("/auth/signup", request.url);
      signupUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signupUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/office/:path*"],
};
