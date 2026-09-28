import { BADGES_DATA } from "./badges-data";
import { appDb } from "@/lib/db/app-db";
import { getAppConfig } from "@/lib/config/app-config";

export interface ConceptMastery {
  concept: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracyPct: number;
}

export interface GamificationProfile {
  totalXp: number;
  currentRank: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  badges: Array<{
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedAt?: string;
  }>;
  conceptMastery: ConceptMastery[];
  weakAreas: string[];
  totalSolved: number;
  totalAttempts: number;
  accuracyRate: number;
}

export function calculateXp(
  baseXp: number,
  hintsUsed: number = 0,
  solutionViewedBeforeSolving: boolean = false,
  hintPenaltyPct: number = 0.25
): number {
  if (solutionViewedBeforeSolving) return 0; // Spec Section 9.4: viewing solution gives 0 XP
  const penalty = Math.min(hintsUsed * hintPenaltyPct, 0.75);
  return Math.max(Math.round(baseXp * (1 - penalty)), 1);
}

export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActiveDateStr?: string | null
): { currentStreak: number; longestStreak: number; lastActiveDate: string } {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  if (!lastActiveDateStr) {
    return { currentStreak: 1, longestStreak: Math.max(longestStreak, 1), lastActiveDate: todayStr };
  }

  const lastActiveDate = new Date(lastActiveDateStr);
  const lastStr = lastActiveDate.toISOString().split("T")[0];

  if (lastStr === todayStr) {
    // Already active today, streak unchanged
    return { currentStreak, longestStreak, lastActiveDate: todayStr };
  }

  const diffTime = Math.abs(now.getTime() - lastActiveDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 2) {
    // Consecutive day
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      longestStreak: Math.max(longestStreak, nextStreak),
      lastActiveDate: todayStr,
    };
  }

  // Broken streak
  return {
    currentStreak: 1,
    longestStreak,
    lastActiveDate: todayStr,
  };
}

export function evaluateBadges(
  stats: {
    totalQueries: number;
    consecutiveCorrect: number;
    hintsUsedInLevel: number;
    levelCompleted: boolean;
    bossQuestionsSolved: number;
    levelsCompletedInDomain: number;
  },
  existingBadgeSlugs: Set<string>
): string[] {
  const newlyEarned: string[] = [];

  if (stats.totalQueries >= 1 && !existingBadgeSlugs.has("first-query")) {
    newlyEarned.push("first-query");
  }

  if (stats.consecutiveCorrect >= 10 && !existingBadgeSlugs.has("ten-in-a-row")) {
    newlyEarned.push("ten-in-a-row");
  }

  if (stats.levelCompleted && stats.hintsUsedInLevel === 0 && !existingBadgeSlugs.has("no-hints-level")) {
    newlyEarned.push("no-hints-level");
  }

  if (stats.bossQuestionsSolved >= 1 && !existingBadgeSlugs.has("boss-slayer")) {
    newlyEarned.push("boss-slayer");
  }

  if (stats.levelsCompletedInDomain >= 5 && !existingBadgeSlugs.has("domain-master")) {
    newlyEarned.push("domain-master");
  }

  return newlyEarned;
}

export function analyzeConceptMastery(
  attempts: Array<{ concepts: string[]; isCorrect: boolean }>
): { mastery: ConceptMastery[]; weakAreas: string[] } {
  const conceptStats = new Map<string, { total: number; correct: number }>();

  for (const att of attempts) {
    for (const c of att.concepts) {
      const cur = conceptStats.get(c) || { total: 0, correct: 0 };
      cur.total += 1;
      if (att.isCorrect) cur.correct += 1;
      conceptStats.set(c, cur);
    }
  }

  const mastery: ConceptMastery[] = [];
  const weakAreas: string[] = [];

  conceptStats.forEach((val, key) => {
    const accuracy = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 100;
    mastery.push({
      concept: key,
      totalAttempts: val.total,
      correctAttempts: val.correct,
      accuracyPct: accuracy,
    });

    if (val.total >= 2 && accuracy < 70) {
      weakAreas.push(key);
    }
  });

  mastery.sort((a, b) => a.accuracyPct - b.accuracyPct);
  return { mastery, weakAreas };
}
