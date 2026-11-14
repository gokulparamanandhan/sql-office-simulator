"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Zap,
  Crown,
  Medal,
  Award,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  Layers,
  Terminal,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { LeaderboardEntry } from "@/lib/gamification/leaderboard-service";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterTab, setFilterTab] = useState<"all" | "maang" | "speed">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.leaderboard) {
          setLeaderboard(data.leaderboard);
          if (data.currentUserRank) {
            setCurrentUserRank(data.currentUserRank);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredLeaderboard = leaderboard.filter((entry) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.company && entry.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === "maang") {
      const maangCompanies = ["Meta", "Amazon", "Apple", "Netflix", "Google", "Uber", "Stripe"];
      return entry.company && maangCompanies.includes(entry.company);
    }
    if (filterTab === "speed") {
      return entry.streakDays >= 14;
    }

    return true;
  });

  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#000000] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Vintage Neo-Brutalist Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#000000] px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[#FFE600] border-2 border-[#000000] flex items-center justify-center shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight uppercase text-black">
                  SQL GRIT
                </span>
                <span className="bg-[#00E599] text-black border-2 border-black text-[10px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] uppercase tracking-wider">
                  Live Standings
                </span>
              </div>
              <p className="text-xs text-black/70 font-bold">
                Global Dirty SQL Leaderboard • Top 300 Solvers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/badges"
              className="px-3 py-1.5 rounded-lg border-2 border-black bg-[#FFFFFF] hover:bg-[#F5EFEB] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Level Badges</span>
            </Link>

            <Link
              href="/interview"
              className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] hover:bg-[#FDD835] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-4 h-4 text-black fill-black" />
              <span>Practice 300 Qs</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Banner with Vintage Stamp */}
        <div className="relative overflow-hidden rounded-2xl bg-[#FFF9D2] border-3 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000]">
          <div className="absolute top-3 right-4 rotate-3 hidden sm:block">
            <span className="inline-block px-3 py-1 bg-[#FF5555] text-white border-2 border-black text-xs font-mono font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000]">
              VERIFIED HUMAN SQL ONLY
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000000]">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>THE 300 PRODUCTION CHALLENGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none">
              GLOBAL LEADERBOARD
            </h1>
            <p className="text-sm sm:text-base font-medium text-black/85 leading-relaxed">
              Real rankings for engineers and analysts solving the 300 dirty production challenges.
              Track who conquered <strong>Level 1 (Basic)</strong>, <strong>Level 2 (Intermediate)</strong>, and the dreaded <strong>Level 3 (Advanced)</strong>.
            </p>
          </div>
        </div>

        {/* Current User Standings Card if Logged In */}
        {currentUserRank && (
          <div className="bg-[#00E599] border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center text-lg font-black shadow-[2px_2px_0px_#000000]">
                #{currentUserRank.rank}
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                  Your Current Rank
                </span>
                <div className="font-black text-base mt-0.5">{currentUserRank.name}</div>
                <div className="text-xs font-bold text-black/75">
                  Completed {currentUserRank.totalLevelsCompleted} / 300 Levels • {currentUserRank.totalXp} XP • {currentUserRank.streakDays} Day Streak 🔥
                </div>
              </div>
            </div>
            <Link
              href="/interview"
              className="px-4 py-2 bg-white text-black border-2 border-black font-black text-xs rounded-lg shadow-[2px_2px_0px_#000000] hover:bg-slate-100 shrink-0"
            >
              Solve Next Level →
            </Link>
          </div>
        )}

        {/* Empty State when no users on board */}
        {!loading && leaderboard.length === 0 && (
          <div className="bg-white border-3 border-black rounded-2xl p-10 text-center space-y-4 shadow-[6px_6px_0px_#000000]">
            <div className="text-5xl">🏆</div>
            <h3 className="font-black text-2xl uppercase">No Ranked Learners Yet!</h3>
            <p className="text-sm font-medium text-black/75 max-w-md mx-auto leading-relaxed">
              Be the first to solve a query and claim the #1 spot on the global leaderboard.
            </p>
            <div className="pt-2">
              <Link
                href="/interview"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE600] text-black border-2 border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_#000000] hover:bg-[#FDD835]"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Start Solving to Rank #1 →</span>
              </Link>
            </div>
          </div>
        )}

        {/* Podium: Top 3 Solvers */}
        {topThree.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Rank 2 */}
            <div className="order-2 md:order-1 bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4 relative">
              <div className="absolute -top-3.5 left-5 bg-slate-300 text-black border-2 border-black px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] flex items-center gap-1">
                <Medal className="w-3.5 h-3.5" /> Rank #2
              </div>
              <div className="pt-2 text-center space-y-2">
                <img
                  src={topThree[1].avatar}
                  alt={topThree[1].name}
                  className="w-16 h-16 rounded-full border-3 border-black mx-auto object-cover shadow-[2px_2px_0px_#000000]"
                />
                <h3 className="font-black text-lg">{topThree[1].name}</h3>
                <p className="text-xs font-bold text-black/70">
                  {topThree[1].role} {topThree[1].company && `• ${topThree[1].company}`}
                </p>
              </div>

              <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>Levels Done:</span>
                  <span className="font-black text-black">{topThree[1].totalLevelsCompleted} / 300</span>
                </div>
                <div className="w-full h-3 bg-white border border-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400"
                    style={{ width: `${(topThree[1].totalLevelsCompleted / 300) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center pt-1 font-bold">
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame className="w-3.5 h-3.5" /> {topThree[1].streakDays}d Streak
                  </span>
                  <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black font-black">
                    {topThree[1].totalXp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Rank 1 (Champion) */}
            <div className="order-1 md:order-2 bg-[#FFF4B8] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between space-y-4 relative -translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFE600] text-black border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-600 fill-amber-500" /> #1 GRANDMASTER
              </div>

              <div className="pt-3 text-center space-y-2">
                <div className="relative inline-block">
                  <img
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="w-20 h-20 rounded-full border-3 border-black mx-auto object-cover shadow-[3px_3px_0px_#000000]"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-amber-400 border-2 border-black rounded-full p-1 shadow-[1px_1px_0px_#000000]">
                    👑
                  </span>
                </div>
                <h3 className="font-black text-xl">{topThree[0].name}</h3>
                <p className="text-xs font-bold text-black/75">
                  {topThree[0].role} {topThree[0].company && `• ${topThree[0].company}`}
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>Levels Conquered:</span>
                  <span className="font-black text-emerald-600 text-sm">{topThree[0].totalLevelsCompleted} / 300</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 border border-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E599]"
                    style={{ width: `${(topThree[0].totalLevelsCompleted / 300) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center pt-1 font-bold">
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame className="w-4 h-4 fill-orange-500" /> {topThree[0].streakDays}d Streak
                  </span>
                  <span className="bg-[#00E599] text-black px-2.5 py-0.5 rounded border border-black font-black">
                    {topThree[0].totalXp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="order-3 bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4 relative">
              <div className="absolute -top-3.5 left-5 bg-amber-200 text-black border-2 border-black px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-amber-800" /> Rank #3
              </div>
              <div className="pt-2 text-center space-y-2">
                <img
                  src={topThree[2].avatar}
                  alt={topThree[2].name}
                  className="w-16 h-16 rounded-full border-3 border-black mx-auto object-cover shadow-[2px_2px_0px_#000000]"
                />
                <h3 className="font-black text-lg">{topThree[2].name}</h3>
                <p className="text-xs font-bold text-black/70">
                  {topThree[2].role} {topThree[2].company && `• ${topThree[2].company}`}
                </p>
              </div>

              <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>Levels Done:</span>
                  <span className="font-black text-black">{topThree[2].totalLevelsCompleted} / 300</span>
                </div>
                <div className="w-full h-3 bg-white border border-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${(topThree[2].totalLevelsCompleted / 300) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center pt-1 font-bold">
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame className="w-3.5 h-3.5" /> {topThree[2].streakDays}d Streak
                  </span>
                  <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black font-black">
                    {topThree[2].totalXp} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3.5 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all ${
                filterTab === "all"
                  ? "bg-[#FFE600] shadow-[2px_2px_0px_#000000]"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              All Top Solvers
            </button>
            <button
              onClick={() => setFilterTab("maang")}
              className={`px-3.5 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all ${
                filterTab === "maang"
                  ? "bg-[#FFE600] shadow-[2px_2px_0px_#000000]"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              MAANG &amp; Big Tech
            </button>
            <button
              onClick={() => setFilterTab("speed")}
              className={`px-3.5 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all ${
                filterTab === "speed"
                  ? "bg-[#FFE600] shadow-[2px_2px_0px_#000000]"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              Active Streaks (14+ Days)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or company..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[2px_2px_0px_#000000]"
            />
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b-3 border-black text-xs font-black uppercase tracking-wider text-black">
                  <th className="py-3 px-4 w-16 text-center">Rank</th>
                  <th className="py-3 px-4">Learner</th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">L1: Basic (100)</th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">L2: Inter (100)</th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">L3: Adv (100)</th>
                  <th className="py-3 px-4 text-center">Total Solved</th>
                  <th className="py-3 px-4 text-center">Total XP</th>
                  <th className="py-3 px-4 text-center">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10 text-xs font-medium">
                {filteredLeaderboard.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`hover:bg-[#FFFDE6] transition-colors ${
                      entry.isCurrentUser ? "bg-[#E6FAF1] font-bold" : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center">
                      {entry.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#FFE600] border-2 border-black font-black text-xs shadow-[1px_1px_0px_#000000]">
                          1
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-300 border-2 border-black font-black text-xs shadow-[1px_1px_0px_#000000]">
                          2
                        </span>
                      ) : entry.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-200 border-2 border-black font-black text-xs shadow-[1px_1px_0px_#000000]">
                          3
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-black/70">#{entry.rank}</span>
                      )}
                    </td>

                    {/* Learner */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-9 h-9 rounded-full border-2 border-black object-cover shrink-0"
                        />
                        <div>
                          <div className="font-black text-sm text-black flex items-center gap-1.5">
                            <span>{entry.name}</span>
                            {entry.isCurrentUser && (
                              <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.2 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-black/60 font-semibold">
                            {entry.role} {entry.company && `• ${entry.company}`}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* L1 Basic */}
                    <td className="py-3.5 px-4 text-center hidden md:table-cell">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-emerald-100 border border-black/30">
                        {entry.level1Solved}/100
                      </span>
                    </td>

                    {/* L2 Intermediate */}
                    <td className="py-3.5 px-4 text-center hidden md:table-cell">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-amber-100 border border-black/30">
                        {entry.level2Solved}/100
                      </span>
                    </td>

                    {/* L3 Advanced */}
                    <td className="py-3.5 px-4 text-center hidden md:table-cell">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-rose-100 border border-black/30">
                        {entry.level3Solved}/100
                      </span>
                    </td>

                    {/* Total Solved */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-black text-sm text-black">
                        {entry.totalLevelsCompleted}
                        <span className="text-black/50 text-[10px] font-bold"> / 300</span>
                      </div>
                      <div className="w-20 mx-auto h-2 bg-slate-100 border border-black/40 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#00E599]"
                          style={{ width: `${(entry.totalLevelsCompleted / 300) * 100}%` }}
                        />
                      </div>
                    </td>

                    {/* Total XP */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#FFE600] border border-black font-black text-xs shadow-[1px_1px_0px_#000000]">
                        {entry.totalXp.toLocaleString()} XP
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        <span>{entry.streakDays}d</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

