import { NextResponse } from "next/server";
import { isCurrentAdmin } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAdmin = await isCurrentAdmin();
  return NextResponse.json({
    authenticated: isAdmin,
    role: isAdmin ? "admin" : null,
  });
}
