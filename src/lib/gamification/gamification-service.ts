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

/**
 * Formats a Date object to YYYY-MM-DD
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates calendar day difference between two date strings (YYYY-MM-DD).
 * Returns positive integer if dateStr2 is after dateStr1.
 */
export function getCalendarDayDiff(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 0;
  const d1 = dateStr1.includes("T") ? dateStr1.split("T")[0] : dateStr1;
  const d2 = dateStr2.includes("T") ? dateStr2.split("T")[0] : dateStr2;
  const [y1, m1, day1] = d1.split("-").map(Number);
  const [y2, m2, day2] = d2.split("-").map(Number);
  if (isNaN(y1) || isNaN(m1) || isNaN(day1) || isNaN(y2) || isNaN(m2) || isNaN(day2)) {
    return 0;
  }
  const utc1 = Date.UTC(y1, m1 - 1, day1);
  const utc2 = Date.UTC(y2, m2 - 1, day2);
  return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

export interface CareerProgression {
  currentLevel: number;
  currentRank: string;
  currentXp: number;
  levelStartXp: number;
  nextLevelXp: number;
  xpInLevel: number;
  xpRequiredForLevel: number;
  xpToNextMilestone: number;
  progressPct: number;
  nextLevel: number;
  isMaxLevel: boolean;
}

export function calculateCareerRank(xp: number): string {
  const safeXp = Math.max(0, Math.round(xp || 0));
  if (safeXp >= 10000) return "Head of Data / Chief Analytics Officer";
  if (safeXp >= 5000) return "Data Lead";
  if (safeXp >= 2000) return "Senior Data Analyst";
  if (safeXp >= 500) return "Data Analyst";
  return "Intern (Solo Data Hire)";
}

export function getCareerProgression(xp: number): CareerProgression {
  const safeXp = Math.max(0, Math.round(xp || 0));

  if (safeXp >= 10000) {
    return {
      currentLevel: 5,
      currentRank: "Head of Data / Chief Analytics Officer",
      currentXp: safeXp,
      levelStartXp: 10000,
      nextLevelXp: 10000,
      xpInLevel: safeXp - 10000,
      xpRequiredForLevel: 0,
      xpToNextMilestone: 0,
      progressPct: 100,
      nextLevel: 5,
      isMaxLevel: true,
    };
  }

  if (safeXp >= 5000) {
    const xpInLevel = safeXp - 5000;
    const required = 5000; // 10000 - 5000
    return {
      currentLevel: 4,
      currentRank: "Data Lead",
      currentXp: safeXp,
      levelStartXp: 5000,
      nextLevelXp: 10000,
      xpInLevel,
      xpRequiredForLevel: required,
      xpToNextMilestone: 10000 - safeXp,
      progressPct: Math.min(100, Math.round((xpInLevel / required) * 100)),
      nextLevel: 5,
      isMaxLevel: false,
    };
  }

  if (safeXp >= 2000) {
    const xpInLevel = safeXp - 2000;
    const required = 3000; // 5000 - 2000
    return {
      currentLevel: 3,
      currentRank: "Senior Data Analyst",
      currentXp: safeXp,
      levelStartXp: 2000,
      nextLevelXp: 5000,
      xpInLevel,
      xpRequiredForLevel: required,
      xpToNextMilestone: 5000 - safeXp,
      progressPct: Math.min(100, Math.round((xpInLevel / required) * 100)),
      nextLevel: 4,
      isMaxLevel: false,
    };
  }

  if (safeXp >= 500) {
    const xpInLevel = safeXp - 500;
    const required = 1500; // 2000 - 500
    return {
      currentLevel: 2,
      currentRank: "Data Analyst",
      currentXp: safeXp,
      levelStartXp: 500,
      nextLevelXp: 2000,
      xpInLevel,
      xpRequiredForLevel: required,
      xpToNextMilestone: 2000 - safeXp,
      progressPct: Math.min(100, Math.round((xpInLevel / required) * 100)),
      nextLevel: 3,
      isMaxLevel: false,
    };
  }

  // Level 1: Intern (0 - 499 XP)
  const required = 500;
  return {
    currentLevel: 1,
    currentRank: "Intern (Solo Data Hire)",
    currentXp: safeXp,
    levelStartXp: 0,
    nextLevelXp: 500,
    xpInLevel: safeXp,
    xpRequiredForLevel: required,
    xpToNextMilestone: 500 - safeXp,
    progressPct: Math.min(100, Math.round((safeXp / required) * 100)),
    nextLevel: 2,
    isMaxLevel: false,
  };
}

export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActiveDateStr?: string | null,
  options?: {
    todayDateStr?: string;
    createdAtStr?: string | null;
    totalXp?: number;
    activeDates?: string[];
  }
): {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  activeDates: string[];
} {
  const todayStr = options?.todayDateStr || getLocalDateString();
  const activeDatesSet = new Set<string>(options?.activeDates || []);

  let effCurrentStreak = currentStreak || 0;
  let effLongestStreak = longestStreak || 0;

  // Auto-backfill for users whose streak calculation was previously stuck at 1:
  // If account was created >= 5 days ago or user has significant XP (>= 300)
  // and current streak is <= 1 with empty or 1 active date:
  if (effCurrentStreak <= 1 && activeDatesSet.size <= 1) {
    let daysEstimate = 1;
    if (options?.createdAtStr) {
      const createdStr = options.createdAtStr.split("T")[0];
      const daysSinceCreated = getCalendarDayDiff(createdStr, todayStr) + 1;
      if (daysSinceCreated >= 2) {
        daysEstimate = Math.min(daysSinceCreated, 5);
      }
    } else if ((options?.totalXp || 0) >= 300) {
      daysEstimate = 5;
    }

    if (daysEstimate > 1) {
      effCurrentStreak = daysEstimate;
      effLongestStreak = Math.max(effLongestStreak, daysEstimate);
      for (let i = daysEstimate - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        activeDatesSet.add(getLocalDateString(d));
      }
    }
  }

  // Mark today as active
  activeDatesSet.add(todayStr);

  if (!lastActiveDateStr) {
    const streak = Math.max(1, effCurrentStreak);
    return {
      currentStreak: streak,
      longestStreak: Math.max(effLongestStreak, streak),
      lastActiveDate: todayStr,
      activeDates: Array.from(activeDatesSet).sort(),
    };
  }

  const lastStr = lastActiveDateStr.includes("T")
    ? lastActiveDateStr.split("T")[0]
    : lastActiveDateStr;

  const dayDiff = getCalendarDayDiff(lastStr, todayStr);

  if (dayDiff === 0) {
    // Already active today, streak unchanged
    const streak = Math.max(1, effCurrentStreak);
    return {
      currentStreak: streak,
      longestStreak: Math.max(effLongestStreak, streak),
      lastActiveDate: todayStr,
      activeDates: Array.from(activeDatesSet).sort(),
    };
  }

  if (dayDiff === 1) {
    // Consecutive day
    const nextStreak = effCurrentStreak + 1;
    return {
      currentStreak: nextStreak,
      longestStreak: Math.max(effLongestStreak, nextStreak),
      lastActiveDate: todayStr,
      activeDates: Array.from(activeDatesSet).sort(),
    };
  }

  if (dayDiff < 0) {
    // Clock skew / anomaly
    const streak = Math.max(1, effCurrentStreak);
    return {
      currentStreak: streak,
      longestStreak: Math.max(effLongestStreak, streak),
      lastActiveDate: todayStr,
      activeDates: Array.from(activeDatesSet).sort(),
    };
  }

  // Broken streak (dayDiff > 1)
  return {
    currentStreak: 1,
    longestStreak: Math.max(effLongestStreak, effCurrentStreak, 1),
    lastActiveDate: todayStr,
    activeDates: Array.from(activeDatesSet).sort(),
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
