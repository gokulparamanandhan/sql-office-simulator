import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { getRealLeaderboard } from "@/lib/gamification/leaderboard-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const leaderboard = getRealLeaderboard(user?.id);

    return NextResponse.json({
      success: true,
      totalUsers: leaderboard.length,
      leaderboard,
      currentUserRank: user ? leaderboard.find((u) => u.isCurrentUser) || null : null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

