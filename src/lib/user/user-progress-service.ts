import { appDb } from "@/lib/db/app-db";
import { safeReadJson, safeWriteJson } from "@/lib/storage/file-storage";

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

/**
 * Get progress data strictly isolated for a given user
 */
export async function getUserProgress(userId: string, email: string = ""): Promise<UserProgressData> {
  const all = getAllUserProgress();

  if (!all[userId]) {
    // New user starts completely fresh with 0 progress
    all[userId] = {
      userId,
      email,
      totalXp: 0,
      streakDays: 1,
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
  if (!lvlRecord.solvedQuestions.includes(questionId)) {
    lvlRecord.solvedQuestions.push(questionId);
    lvlRecord.solvedCount = lvlRecord.solvedQuestions.length;
    userProg.totalXp += xpEarned;
    userProg.updatedAt = new Date().toISOString();
  }

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

  if (!userProg.academySolved.includes(questionId)) {
    userProg.academySolved.push(questionId);
    userProg.totalXp += xpEarned;
    userProg.updatedAt = new Date().toISOString();
  }

  all[userId] = userProg;
  saveAllUserProgress(all);
  return userProg;
}
