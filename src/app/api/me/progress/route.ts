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

  return NextResponse.json({
    user,
    totalXp: 120,
    currentRank: calculateRank(120),
    streakDays: 3,
    longestStreak: 5,
    accuracyRate: 85,
    totalSolved: 6,
    totalAttempts: 7,
    badges,
    conceptMastery: mastery,
    weakAreas: weakAreas.length > 0 ? weakAreas : ["HAVING clauses", "Multi-table JOIN filters"],
    config,
  });
}
