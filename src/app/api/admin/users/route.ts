import { NextResponse } from "next/server";
import { appDb } from "@/lib/db/app-db";
import { isCurrentAdmin } from "@/lib/auth/admin-auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  // STRICT ADMIN AUTHENTICATION CHECK
  const isAdmin = await isCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication is required to access stored user records." },
      { status: 401 }
    );
  }

  const LOCAL_STORE_FILE = path.join(process.cwd(), "data", "local-users.json");

  let users: Array<{
    id: string;
    email: string;
    name: string;
    role: string;
    provider?: string;
    avatar?: string;
    createdAt?: string;
    honorPledgeAcceptedAt?: string;
  }> = [];

  // Try Prisma DB first
  try {
    const dbUsers = await appDb.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbUsers && dbUsers.length > 0) {
      users = dbUsers.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        provider: u.passwordHash ? "Password" : "OAuth",
        avatar: u.avatar || undefined,
        createdAt: u.createdAt.toISOString(),
        honorPledgeAcceptedAt: u.honorPledgeAcceptedAt?.toISOString(),
      }));
    }
  } catch {
    // DB offline fallback
  }

  // If DB didn't return users, check local file store
  if (users.length === 0 && fs.existsSync(LOCAL_STORE_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(LOCAL_STORE_FILE, "utf-8"));
      users = (data.users || []).map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role || "learner",
        provider: "Password",
        avatar: u.avatar,
        createdAt: u.createdAt,
        honorPledgeAcceptedAt: u.honorPledgeAcceptedAt,
      }));
    } catch {
      // Ignore
    }
  }

  return NextResponse.json({
    totalUsers: users.length,
    users,
  });
}
