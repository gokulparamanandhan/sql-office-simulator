import { DOMAINS_SEED_DATA, LEVELS_CONFIG, BADGES_SEED_DATA } from "../../../prisma/seed";
import { appDb } from "@/lib/db/app-db";

export interface DomainProgressSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  currentLevel: number;
  totalXp: number;
  completedQuestions: number;
  totalQuestions: number;
  levels: Array<{
    number: number;
    name: string;
    unlocked: boolean;
    solvedCount: number;
    bossSolvedCount: number;
    totalQuestions: number;
    company: string;
  }>;
}

export async function getLearnerDashboard(userId: string): Promise<{
  domains: DomainProgressSummary[];
  totalXp: number;
  currentRank: string;
  streakDays: number;
  badgesEarned: number;
  totalBadges: number;
}> {
  // Try loading from App DB first
  try {
    const user = await appDb.user.findUnique({
      where: { id: userId },
      include: {
        domainProgress: { include: { domain: true } },
        levelProgress: { include: { level: true } },
        userBadges: true,
        streak: true,
      },
    });

    if (user) {
      // Map domains
      const domainsSummary: DomainProgressSummary[] = DOMAINS_SEED_DATA.map((d) => {
        const dProg = user.domainProgress.find((dp) => dp.domain.slug === d.slug);
        const currentLevel = dProg ? dProg.currentLevel : 1;
        const totalXp = dProg ? dProg.totalXp : 0;

        const levels = LEVELS_CONFIG.map((lvl) => {
          const lProg = user.levelProgress.find(
            (lp) => lp.level.number === lvl.number
          );
          return {
            number: lvl.number,
            name: lvl.name,
            unlocked: lvl.number === 1 || Boolean(lProg?.unlocked),
            solvedCount: lProg?.solvedCount || 0,
            bossSolvedCount: lProg?.bossSolvedCount || 0,
            totalQuestions: 100,
            company: lvl.company,
          };
        });

        const completedQuestions = levels.reduce((acc, l) => acc + l.solvedCount, 0);

        return {
          id: d.slug,
          slug: d.slug,
          name: d.name,
          description: d.description,
          icon: d.icon,
          currentLevel,
          totalXp,
          completedQuestions,
          totalQuestions: 500,
          levels,
        };
      });

      const totalXp = user.domainProgress.reduce((sum, dp) => sum + dp.totalXp, 0);
      const streakDays = user.streak?.currentStreak || 1;

      return {
        domains: domainsSummary,
        totalXp,
        currentRank: calculateRank(totalXp),
        streakDays,
        badgesEarned: user.userBadges.length,
        totalBadges: BADGES_SEED_DATA.length,
      };
    }
  } catch {
    // Database offline, use user-progress store fallback
  }

  // Load from isolated per-user progress store
  try {
    const { getUserProgress } = await import("@/lib/user/user-progress-service");
    const userProg = await getUserProgress(userId);

    const domainsSummary: DomainProgressSummary[] = DOMAINS_SEED_DATA.map((d) => {
      const domainLevels = userProg.domains[d.slug] || {};
      const levels = LEVELS_CONFIG.map((lvl) => {
        const lvlRecord = domainLevels[lvl.number];
        const solvedCount = lvlRecord ? lvlRecord.solvedCount : 0;
        return {
          number: lvl.number,
          name: lvl.name,
          unlocked: lvl.number === 1 || solvedCount >= 1,
          solvedCount,
          bossSolvedCount: 0,
          totalQuestions: 100,
          company: lvl.company,
        };
      });

      const completedQuestions = levels.reduce((acc, l) => acc + l.solvedCount, 0);

      return {
        id: d.slug,
        slug: d.slug,
        name: d.name,
        description: d.description,
        icon: d.icon,
        currentLevel: 1,
        totalXp: userProg.totalXp,
        completedQuestions,
        totalQuestions: 500,
        levels,
      };
    });

    return {
      domains: domainsSummary,
      totalXp: userProg.totalXp,
      currentRank: calculateRank(userProg.totalXp),
      streakDays: userProg.streakDays || 1,
      badgesEarned: Math.min(Math.floor(userProg.totalXp / 100), BADGES_SEED_DATA.length),
      totalBadges: BADGES_SEED_DATA.length,
    };
  } catch {
    // Absolute fallback default empty/initial state for new user
    const defaultDomains: DomainProgressSummary[] = DOMAINS_SEED_DATA.map((d) => ({
      id: d.slug,
      slug: d.slug,
      name: d.name,
      description: d.description,
      icon: d.icon,
      currentLevel: 1,
      totalXp: 0,
      completedQuestions: 0,
      totalQuestions: 500,
      levels: LEVELS_CONFIG.map((lvl) => ({
        number: lvl.number,
        name: lvl.name,
        unlocked: lvl.number === 1,
        solvedCount: 0,
        bossSolvedCount: 0,
        totalQuestions: 100,
        company: lvl.company,
      })),
    }));

    return {
      domains: defaultDomains,
      totalXp: 0,
      currentRank: "Intern (Solo Data Hire)",
      streakDays: 1,
      badgesEarned: 0,
      totalBadges: BADGES_SEED_DATA.length,
    };
  }
}

export function calculateRank(xp: number): string {
  if (xp >= 10000) return "Head of Data / Chief Analytics Officer";
  if (xp >= 5000) return "Data Lead";
  if (xp >= 2000) return "Senior Data Analyst";
  if (xp >= 500) return "Data Analyst";
  return "Intern (Solo Data Hire)";
}
