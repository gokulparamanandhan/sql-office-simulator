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

export function getRealLeaderboard(currentUserId?: string): LeaderboardEntry[] {
  try {
    const localUsers = safeReadJson<{ users: Array<{ id: string; name: string; email: string; avatar?: string; createdAt: string }> }>(
      "local-users.json",
      { users: [] }
    );
    const userProgress = safeReadJson<Record<string, any>>("user-progress.json", {});

    // Only compute for real users in the system
    const realUserEntries: LeaderboardEntry[] = (localUsers.users || []).map((u) => {
      const prog = userProgress[u.id] || {};
      const domains = prog.domains || {};

      let totalSolved = 0;
      let l1 = 0;
      let l2 = 0;
      let l3 = 0;

      if (prog.tiers) {
        l1 = Number(prog.tiers[1]?.solvedCount || 0);
        l2 = Number(prog.tiers[2]?.solvedCount || 0);
        l3 = Number(prog.tiers[3]?.solvedCount || 0);
        totalSolved = l1 + l2 + l3;
      } else {
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

      l1 = Math.min(100, l1);
      l2 = Math.min(100, l2);
      l3 = Math.min(100, l3);
      totalSolved = Math.min(300, totalSolved);

      const calculatedXp = Number(prog.totalXp) || (l1 * 25 + l2 * 45 + l3 * 80);

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

    // Sort descending by totalLevelsCompleted, then totalXp
    realUserEntries.sort((a, b) => {
      if (b.totalLevelsCompleted !== a.totalLevelsCompleted) {
        return b.totalLevelsCompleted - a.totalLevelsCompleted;
      }
      return b.totalXp - a.totalXp;
    });

    // Assign final ranks
    return realUserEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isCurrentUser: Boolean(currentUserId && entry.id === currentUserId),
    }));
  } catch {
    return [];
  }
}
