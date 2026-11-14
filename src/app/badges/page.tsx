"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  ArrowLeft,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Zap,
  Flame,
  ShieldCheck,
  Crown,
} from "lucide-react";
import { BADGES_DATA, BadgeDefinition } from "@/lib/gamification/badges-data";

export default function BadgesShowcasePage() {
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [l1Solved, setL1Solved] = useState<number>(0);
  const [l2Solved, setL2Solved] = useState<number>(0);
  const [l3Solved, setL3Solved] = useState<number>(0);

  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const statsStr = localStorage.getItem(`sql_office_${currentUserId}_user_stats`);
      if (statsStr) {
        const stats = JSON.parse(statsStr);
        setSolvedCount(stats.solvedCount || 0);
      }
    } catch {
      // Ignore
    }
  }, []);

  const levelBadges = BADGES_DATA.filter((b) => b.category === "level" || b.category === "special");
  const skillBadges = BADGES_DATA.filter((b) => b.category === "skill" || b.category === "streak");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#000000] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#000000] px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[#FFE600] border-2 border-[#000000] flex items-center justify-center shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight uppercase text-black">
                  SQL GRIT
                </span>
                <span className="bg-[#FFE600] text-black border-2 border-black text-[10px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] uppercase tracking-wider">
                  Honors &amp; Badges
                </span>
              </div>
              <p className="text-xs text-black/70 font-bold">
                Dedicated Badges for Level 1, 2, and 3 Completion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/leaderboard"
              className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Leaderboard</span>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#FFF9D2] border-3 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000000]">
              <Award className="w-4 h-4 text-amber-500" />
              <span>THE 3 CORNERSTONE LEVEL BADGES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none">
              DEDICATED LEVEL BADGES
            </h1>
            <p className="text-sm sm:text-base font-medium text-black/85 leading-relaxed">
              Earn an iconic badge as you complete each tier of 100 questions. Conquering all 3 tiers unlocks the legendary <strong>SQL Demigod</strong> credential.
            </p>
          </div>
        </div>

        {/* Section 1: The 3 Dedicated Level Badges + Grandmaster */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span>🏆 Tier Milestone Badges (Levels 1, 2, 3)</span>
            </h2>
            <span className="text-xs font-mono font-bold text-black/60 uppercase">
              100 Questions Per Level
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {levelBadges.map((badge) => {
              const isGrandmaster = badge.tierLevel === "master";
              return (
                <div
                  key={badge.slug}
                  className={`bg-white border-3 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between space-y-4 relative ${
                    isGrandmaster ? "bg-[#FAF5FF] border-purple-950" : ""
                  }`}
                >
                  {badge.tierLevel && (
                    <div className="absolute -top-3.5 left-4">
                      <span
                        className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border-2 border-black shadow-[1px_1px_0px_#000000] ${badge.accentColor}`}
                      >
                        {isGrandmaster ? "FINAL TITLE" : `LEVEL ${badge.tierLevel} BADGE`}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5EFEB] border-3 border-black flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000000] mx-auto">
                      {badge.icon}
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="font-black text-lg">{badge.name}</h3>
                      <p className="text-xs font-medium text-black/75 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t-2 border-black/15 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-black/70 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{badge.requirement}</span>
                    </div>
                    <div className="bg-[#FAF8F5] border border-black rounded-lg p-2 text-center text-xs font-black">
                      Locked • Complete Questions to Unlock
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Skill & Interview Badges */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span>⚡ Skill &amp; Edge Case Trophies</span>
            </h2>
            <span className="text-xs font-mono font-bold text-black/60 uppercase">
              Dirty Data Mastery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {skillBadges.map((badge) => (
              <div
                key={badge.slug}
                className="bg-white border-3 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF9D2] border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000000] shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-base">{badge.name}</h3>
                    <p className="text-xs font-medium text-black/75 leading-relaxed mt-0.5">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-bold text-black/60">
                    {badge.requirement}
                  </span>
                  <span className="font-black text-[10px] bg-slate-100 border border-black px-2 py-0.5 rounded">
                    UNLOCKED WITH PROGRESS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

