import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { BADGES_DATA } from "@/lib/gamification/badges-data";
import { getAppConfig } from "@/lib/config/app-config";
import { analyzeConceptMastery } from "@/lib/gamification/gamification-service";
import { calculateRank } from "@/lib/domains/domains-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await getAppConfig();

  // Synthetic sample attempts data for analytics demo
  const sampleAttempts = [
    { concepts: ["SELECT", "WHERE"], isCorrect: true },
    { concepts: ["INNER JOIN", "GROUP BY"], isCorrect: true },
    { concepts: ["HAVING", "GROUP BY"], isCorrect: false },
    { concepts: ["HAVING", "GROUP BY"], isCorrect: true },
    { concepts: ["ORDER BY", "LIMIT"], isCorrect: true },
    { concepts: ["LEFT JOIN", "NULL HANDLING"], isCorrect: true },
  ];

  const { mastery, weakAreas } = analyzeConceptMastery(sampleAttempts);

  const badges = BADGES_DATA.map((b, idx) => ({
    ...b,
    earned: idx === 0, // First day on the job badge unlocked
    earnedAt: idx === 0 ? new Date().toISOString() : undefined,
  }));

  const { getUserProgress } = await import("@/lib/user/user-progress-service");
  const userProg = await getUserProgress(user.id, user.email);

  let totalSolvedCount = 0;
  if (userProg.domains) {
    for (const d of Object.values(userProg.domains)) {
      for (const lvl of Object.values(d)) {
        totalSolvedCount += lvl.solvedCount || 0;
      }
    }
  }
  totalSolvedCount += (userProg.academySolved?.length || 0);

  const totalXp = userProg.totalXp || 0;
  const streakDays = userProg.streakDays || 1;
  const longestStreak = userProg.longestStreak || streakDays;

  return NextResponse.json({
    user,
    totalXp,
    currentRank: calculateRank(totalXp),
    streakDays,
    longestStreak,
    accuracyRate: totalSolvedCount > 0 ? 88 : 100,
    totalSolved: Math.max(totalSolvedCount, totalXp > 0 ? Math.ceil(totalXp / 15) : 0),
    totalAttempts: Math.max(totalSolvedCount + 2, totalXp > 0 ? Math.ceil(totalXp / 12) : 0),
    badges,
    conceptMastery: mastery,
    weakAreas: weakAreas.length > 0 ? weakAreas : ["HAVING clauses", "Multi-table JOIN filters"],
    config,
  });
}
