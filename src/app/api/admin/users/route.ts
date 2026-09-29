import { NextResponse } from "next/server";
import { appDb } from "@/lib/db/app-db";
import { isCurrentAdmin } from "@/lib/auth/admin-auth";
import { safeReadJson } from "@/lib/storage/file-storage";

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

  const USERS_FILENAME = "local-users.json";

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

  // If DB didn't return users, check local safe store
  if (users.length === 0) {
    const data = safeReadJson<{ users: any[] }>(USERS_FILENAME, { users: [] });
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
  }

  return NextResponse.json({
    totalUsers: users.length,
    users,
  });
}
