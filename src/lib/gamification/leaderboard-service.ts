import { safeReadJson } from "@/lib/storage/file-storage";

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  level1Solved: number; // out of 100
  level2Solved: number; // out of 100
  level3Solved: number; // out of 100
  totalLevelsCompleted: number; // sum out of 300
  totalXp: number;
  streakDays: number;
  badgesCount: number;
  badges: string[];
  isCurrentUser?: boolean;
}

const SEED_TOP_LEARNERS: LeaderboardEntry[] = [
  {
    rank: 1,
    id: "user-sarah-chen",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    role: "Senior Analytics Engineer",
    company: "Stripe",
    level1Solved: 100,
    level2Solved: 100,
    level3Solved: 94,
    totalLevelsCompleted: 294,
    totalXp: 14850,
    streakDays: 42,
    badgesCount: 9,
    badges: ["mud-scrapper", "window-wizard", "schema-exorcist", "maang-hunter", "zero-hint-purist"],
  },
  {
    rank: 2,
    id: "user-marcus-thorne",
    name: "Marcus Thorne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    role: "Lead Product Analyst",
    company: "Meta",
    level1Solved: 100,
    level2Solved: 100,
    level3Solved: 88,
    totalLevelsCompleted: 288,
    totalXp: 14120,
    streakDays: 29,
    badgesCount: 8,
    badges: ["mud-scrapper", "window-wizard", "schema-exorcist", "maang-hunter"],
  },
  {
    rank: 3,
    id: "user-priya-patel",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    role: "Staff Data Scientist",
    company: "Uber",
    level1Solved: 100,
    level2Solved: 95,
    level3Solved: 81,
    totalLevelsCompleted: 276,
    totalXp: 13340,
    streakDays: 35,
    badgesCount: 8,
    badges: ["mud-scrapper", "window-wizard", "fanout-fighter", "seven-day-streak"],
  },
  {
    rank: 4,
    id: "user-alex-novak",
    name: "Alex Novak",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    role: "Data Analyst II",
    company: "Netflix",
    level1Solved: 100,
    level2Solved: 90,
    level3Solved: 65,
    totalLevelsCompleted: 255,
    totalXp: 11950,
    streakDays: 19,
    badgesCount: 7,
    badges: ["mud-scrapper", "window-wizard", "maang-hunter"],
  },
  {
    rank: 5,
    id: "user-elena-rostova",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    role: "Quantitative Analyst",
    company: "Citadel",
    level1Solved: 100,
    level2Solved: 85,
    level3Solved: 58,
    totalLevelsCompleted: 243,
    totalXp: 11200,
    streakDays: 22,
    badgesCount: 6,
    badges: ["mud-scrapper", "window-wizard", "zero-hint-purist"],
  },
  {
    rank: 6,
    id: "user-david-kim",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    role: "BI Engineer",
    company: "Amazon",
    level1Solved: 100,
    level2Solved: 78,
    level3Solved: 42,
    totalLevelsCompleted: 220,
    totalXp: 9800,
    streakDays: 14,
    badgesCount: 5,
    badges: ["mud-scrapper", "window-wizard"],
  },
  {
    rank: 7,
    id: "user-zainab-almansoori",
    name: "Zainab Al-Mansoori",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    role: "Growth Analyst",
    company: "DoorDash",
    level1Solved: 100,
    level2Solved: 62,
    level3Solved: 31,
    totalLevelsCompleted: 193,
    totalXp: 8650,
    streakDays: 11,
    badgesCount: 5,
    badges: ["mud-scrapper", "dirty-data-survivor"],
  },
];

export function getRealLeaderboard(currentUserId?: string): LeaderboardEntry[] {
  try {
    const localUsers = safeReadJson<{ users: Array<{ id: string; name: string; email: string; avatar?: string; createdAt: string }> }>(
      "local-users.json",
      { users: [] }
    );
    const userProgress = safeReadJson<Record<string, any>>("user-progress.json", {});

    const realUserEntries: LeaderboardEntry[] = (localUsers.users || []).map((u) => {
      const prog = userProgress[u.id] || {};
      const domains = prog.domains || {};

      // Calculate solved questions across any domain or direct tiers
      let totalSolved = 0;
      let l1 = 0;
      let l2 = 0;
      let l3 = 0;

      // Check direct 3-tier structure if recorded
      if (prog.tiers) {
        l1 = Number(prog.tiers[1]?.solvedCount || 0);
        l2 = Number(prog.tiers[2]?.solvedCount || 0);
        l3 = Number(prog.tiers[3]?.solvedCount || 0);
        totalSolved = l1 + l2 + l3;
      } else {
        // Fallback aggregation from domains
        Object.keys(domains).forEach((dKey) => {
          const dom = domains[dKey] || {};
          const d1 = dom[1]?.solvedCount || 0;
          const d2 = dom[2]?.solvedCount || 0;
          const d3 = dom[3]?.solvedCount || 0;
          const d4 = dom[4]?.solvedCount || 0;
          const d5 = dom[5]?.solvedCount || 0;
          l1 += d1;
          l2 += d2 + d3;
          l3 += d4 + d5;
        });
        totalSolved = l1 + l2 + l3;
      }

      // Cap at 100 per level
      l1 = Math.min(100, l1);
      l2 = Math.min(100, l2);
      l3 = Math.min(100, l3);
      totalSolved = Math.min(300, totalSolved);

      const calculatedXp = Number(prog.totalXp) || (l1 * 25 + l2 * 45 + l3 * 80) || 50;

      const badges: string[] = [];
      if (l1 >= 1) badges.push("dirty-data-survivor");
      if (l1 >= 100) badges.push("mud-scrapper");
      if (l2 >= 100) badges.push("window-wizard");
      if (l3 >= 100) badges.push("schema-exorcist");
      if (totalSolved >= 300) badges.push("sql-demigod");

      return {
        rank: 0,
        id: u.id,
        name: u.name || "SQL Analyst",
        avatar: u.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(u.email || u.id)}`,
        role: totalSolved > 200 ? "Lead SQL Practitioner" : totalSolved > 100 ? "Intermediate Analyst" : "Apprentice Analyst",
        company: "SQL Office Explorer",
        level1Solved: l1,
        level2Solved: l2,
        level3Solved: l3,
        totalLevelsCompleted: totalSolved,
        totalXp: calculatedXp,
        streakDays: Number(prog.streakDays) || 1,
        badgesCount: badges.length,
        badges,
        isCurrentUser: currentUserId === u.id,
      };
    });

    // Merge seed top learners and real users, avoiding duplicate current user
    const combined = [...SEED_TOP_LEARNERS];
    realUserEntries.forEach((ru) => {
      const existingIdx = combined.findIndex((c) => c.id === ru.id);
      if (existingIdx >= 0) {
        combined[existingIdx] = ru;
      } else {
        combined.push(ru);
      }
    });

    // Sort descending by totalLevelsCompleted, then totalXp
    combined.sort((a, b) => {
      if (b.totalLevelsCompleted !== a.totalLevelsCompleted) {
        return b.totalLevelsCompleted - a.totalLevelsCompleted;
      }
      return b.totalXp - a.totalXp;
    });

    // Assign final ranks
    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isCurrentUser: Boolean(currentUserId && entry.id === currentUserId),
    }));
  } catch {
    return SEED_TOP_LEARNERS;
  }
}

