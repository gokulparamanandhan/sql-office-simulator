import { appDb } from "@/lib/db/app-db";
import { safeReadJson, safeWriteJson } from "@/lib/storage/file-storage";
import { updateStreak, getLocalDateString } from "@/lib/gamification/gamification-service";

const PROGRESS_FILENAME = "user-progress.json";

export interface LevelProgressRecord {
  solvedCount: number;
  solvedQuestions: string[];
}

export interface UserProgressData {
  userId: string;
  email: string;
  totalXp: number;
  streakDays: number;
  longestStreak?: number;
  lastActiveDate?: string;
  activeDates?: string[];
  domains: Record<string, Record<number, LevelProgressRecord>>;
  academySolved: number[];
  updatedAt: string;
}

function getAllUserProgress(): Record<string, UserProgressData> {
  return safeReadJson<Record<string, UserProgressData>>(PROGRESS_FILENAME, {});
}

function saveAllUserProgress(data: Record<string, UserProgressData>) {
  safeWriteJson(PROGRESS_FILENAME, data);
}

function getUserCreatedAt(userId: string): string | null {
  try {
    const data = safeReadJson<{ users: Array<{ id: string; createdAt: string }> }>("local-users.json", { users: [] });
    const u = data.users?.find((x) => x.id === userId);
    return u?.createdAt || null;
  } catch {
    return null;
  }
}

/**
 * Get progress data strictly isolated for a given user
 */
export async function getUserProgress(userId: string, email: string = ""): Promise<UserProgressData> {
  const all = getAllUserProgress();
  const createdAt = getUserCreatedAt(userId);
  const todayStr = getLocalDateString();

  if (!all[userId]) {
    // New user starts completely fresh with 0 progress
    all[userId] = {
      userId,
      email,
      totalXp: 0,
      streakDays: 1,
      longestStreak: 1,
      lastActiveDate: todayStr,
      activeDates: [todayStr],
      domains: {
        ecommerce: {
          1: { solvedCount: 0, solvedQuestions: [] },
          2: { solvedCount: 0, solvedQuestions: [] },
          3: { solvedCount: 0, solvedQuestions: [] },
          4: { solvedCount: 0, solvedQuestions: [] },
          5: { solvedCount: 0, solvedQuestions: [] },
        },
      },
      academySolved: [],
      updatedAt: new Date().toISOString(),
    };
    saveAllUserProgress(all);
  } else {
    // Ensure streak is updated for today
    const userProg = all[userId];
    const streakResult = updateStreak(
      userProg.streakDays || 1,
      userProg.longestStreak || userProg.streakDays || 1,
      userProg.lastActiveDate || userProg.updatedAt,
      {
        createdAtStr: createdAt,
        totalXp: userProg.totalXp,
        activeDates: userProg.activeDates,
      }
    );

    if (
      userProg.streakDays !== streakResult.currentStreak ||
      userProg.lastActiveDate !== streakResult.lastActiveDate ||
      (userProg.activeDates?.length || 0) !== streakResult.activeDates.length
    ) {
      userProg.streakDays = streakResult.currentStreak;
      userProg.longestStreak = streakResult.longestStreak;
      userProg.lastActiveDate = streakResult.lastActiveDate;
      userProg.activeDates = streakResult.activeDates;
      userProg.updatedAt = new Date().toISOString();
      saveAllUserProgress(all);
    }
  }

  return all[userId];
}

/**
 * Record a solved question for a specific user
 */
export async function recordUserQuestionSolved(
  userId: string,
  domain: string,
  level: number,
  questionId: string,
  xpEarned: number,
  email: string = ""
): Promise<UserProgressData> {
  const all = getAllUserProgress();
  const userProg = await getUserProgress(userId, email);

  if (!userProg.domains[domain]) {
    userProg.domains[domain] = {};
  }
  if (!userProg.domains[domain][level]) {
    userProg.domains[domain][level] = { solvedCount: 0, solvedQuestions: [] };
  }

  const lvlRecord = userProg.domains[domain][level];
  const isNewQuestion = !lvlRecord.solvedQuestions.includes(questionId);
  if (isNewQuestion) {
    lvlRecord.solvedQuestions.push(questionId);
    lvlRecord.solvedCount = lvlRecord.solvedQuestions.length;
    userProg.totalXp += xpEarned;
  }

  // Update streak on question solve
  const createdAt = getUserCreatedAt(userId);
  const streakResult = updateStreak(
    userProg.streakDays || 1,
    userProg.longestStreak || userProg.streakDays || 1,
    userProg.lastActiveDate || userProg.updatedAt,
    {
      createdAtStr: createdAt,
      totalXp: userProg.totalXp,
      activeDates: userProg.activeDates,
    }
  );
  userProg.streakDays = streakResult.currentStreak;
  userProg.longestStreak = streakResult.longestStreak;
  userProg.lastActiveDate = streakResult.lastActiveDate;
  userProg.activeDates = streakResult.activeDates;
  userProg.updatedAt = new Date().toISOString();

  all[userId] = userProg;
  saveAllUserProgress(all);

  // Sync to database if available
  try {
    const dbDomain = await appDb.domain.findUnique({ where: { slug: domain } });
    if (dbDomain) {
      await appDb.userDomainProgress.upsert({
        where: {
          userId_domainId: { userId, domainId: dbDomain.id },
        },
        create: {
          userId,
          domainId: dbDomain.id,
          totalXp: userProg.totalXp,
          currentLevel: level,
        },
        update: {
          totalXp: userProg.totalXp,
        },
      });
    }

    await appDb.streak.upsert({
      where: { userId },
      create: {
        userId,
        currentStreak: userProg.streakDays,
        longestStreak: userProg.longestStreak || userProg.streakDays,
        lastActiveDate: new Date(),
      },
      update: {
        currentStreak: userProg.streakDays,
        longestStreak: userProg.longestStreak || userProg.streakDays,
        lastActiveDate: new Date(),
      },
    });
  } catch {
    // Database offline, local store is primary
  }

  return userProg;
}

/**
 * Record an academy challenge solved for a specific user
 */
export async function recordUserAcademySolved(
  userId: string,
  questionId: number,
  xpEarned: number = 10,
  email: string = ""
): Promise<UserProgressData> {
  const all = getAllUserProgress();
  const userProg = await getUserProgress(userId, email);

  const isNew = !userProg.academySolved.includes(questionId);
  if (isNew) {
    userProg.academySolved.push(questionId);
    userProg.totalXp += xpEarned;
  }

  // Update streak on academy solve
  const createdAt = getUserCreatedAt(userId);
  const streakResult = updateStreak(
    userProg.streakDays || 1,
    userProg.longestStreak || userProg.streakDays || 1,
    userProg.lastActiveDate || userProg.updatedAt,
    {
      createdAtStr: createdAt,
      totalXp: userProg.totalXp,
      activeDates: userProg.activeDates,
    }
  );
  userProg.streakDays = streakResult.currentStreak;
  userProg.longestStreak = streakResult.longestStreak;
  userProg.lastActiveDate = streakResult.lastActiveDate;
  userProg.activeDates = streakResult.activeDates;
  userProg.updatedAt = new Date().toISOString();

  all[userId] = userProg;
  saveAllUserProgress(all);
  return userProg;
}

/**
 * Sync user progress stats (XP and Streak) from client localStorage
 */
export async function syncUserProgressStats(
  userId: string,
  stats: {
    totalXp?: number;
    streakDays?: number;
    longestStreak?: number;
    lastActiveDate?: string;
    activeDates?: string[];
  },
  email: string = ""
): Promise<UserProgressData> {
  const all = getAllUserProgress();
  const userProg = await getUserProgress(userId, email);

  if (typeof stats.totalXp === "number" && stats.totalXp > userProg.totalXp) {
    userProg.totalXp = stats.totalXp;
  }
  if (typeof stats.streakDays === "number" && stats.streakDays > (userProg.streakDays || 0)) {
    userProg.streakDays = stats.streakDays;
  }
  if (typeof stats.longestStreak === "number" && stats.longestStreak > (userProg.longestStreak || 0)) {
    userProg.longestStreak = stats.longestStreak;
  }
  if (stats.lastActiveDate) {
    userProg.lastActiveDate = stats.lastActiveDate;
  }
  if (Array.isArray(stats.activeDates) && stats.activeDates.length > 0) {
    const set = new Set([...(userProg.activeDates || []), ...stats.activeDates]);
    userProg.activeDates = Array.from(set).sort();
  }
  userProg.updatedAt = new Date().toISOString();

  all[userId] = userProg;
  saveAllUserProgress(all);

  try {
    await appDb.streak.upsert({
      where: { userId },
      create: {
        userId,
        currentStreak: userProg.streakDays,
        longestStreak: userProg.longestStreak || userProg.streakDays,
        lastActiveDate: new Date(),
      },
      update: {
        currentStreak: userProg.streakDays,
        longestStreak: userProg.longestStreak || userProg.streakDays,
        lastActiveDate: new Date(),
      },
    });
  } catch {
    // Database offline
  }

  return userProg;
}
