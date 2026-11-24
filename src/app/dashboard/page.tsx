"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Flame,
  Award,
  CheckCircle2,
  LogOut,
  ChevronRight,
  Database,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  Trophy,
  Play,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { CURRICULUM_TIERS } from "@/lib/content/curriculum-300";
import { BADGES_DATA } from "@/lib/gamification/badges-data";
import { INTERVIEW_QUESTIONS } from "@/lib/content/interview-questions";
import { SKILL_TRACKS, getQuestionSkillTrack } from "@/lib/interview/sql-learning-helpers";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [solvedStats, setSolvedStats] = useState<{
    l1: number;
    l2: number;
    l3: number;
    totalSolved: number;
    academySolved: number;
    totalXp: number;
    streakDays: number;
    skillBreakdown: { track: string; total: number; solved: number; pct: number }[];
  }>({
    l1: 0,
    l2: 0,
    l3: 0,
    totalSolved: 0,
    academySolved: 0,
    totalXp: 0,
    streakDays: 1,
    skillBreakdown: [],
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/auth/login?redirect=/dashboard");
          return null;
        }
        return res.json();
      })
      .then((authData) => {
        if (authData?.user) {
          setUser(authData.user);
          loadProgress(authData.user.id);
        } else {
          router.push("/auth/login?redirect=/dashboard");
        }
      })
      .catch(() => {
        router.push("/auth/login?redirect=/dashboard");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const loadProgress = (userId: string) => {
    try {
      const statsKey = `sql_office_${userId}_user_stats`;
      const interviewSolvedKey = `sql_office_${userId}_interview_solved`;
      const academySolvedKey = `sql_office_${userId}_academy_solved`;
      const stats = JSON.parse(localStorage.getItem(statsKey) || "{}");
      const interviewSolved = JSON.parse(localStorage.getItem(interviewSolvedKey) || "{}");
      const academySolvedMap = JSON.parse(localStorage.getItem(academySolvedKey) || "{}");

      const l1Real = INTERVIEW_QUESTIONS.filter(
        (q) => q.difficulty === "Easy" && interviewSolved[q.id]
      ).length;
      const l2Real = INTERVIEW_QUESTIONS.filter(
        (q) => q.difficulty === "Medium" && interviewSolved[q.id]
      ).length;
      const l3Real = INTERVIEW_QUESTIONS.filter(
        (q) => q.difficulty === "Hard" && interviewSolved[q.id]
      ).length;
      const realTotal = l1Real + l2Real + l3Real;

      const count = realTotal > 0 ? realTotal : (stats.solvedCount || 0);
      const l1 = realTotal > 0 ? l1Real : Math.min(100, count);
      const l2 = realTotal > 0 ? l2Real : Math.min(100, Math.max(0, count - 100));
      const l3 = realTotal > 0 ? l3Real : Math.min(100, Math.max(0, count - 200));

      const academySolved = Object.keys(academySolvedMap).filter(
        (k) => academySolvedMap[k]
      ).length;

      const skillBreakdown = SKILL_TRACKS.map((track) => {
        const qs = INTERVIEW_QUESTIONS.filter((q) => getQuestionSkillTrack(q) === track);
        const solved = qs.filter((q) => Boolean(interviewSolved[q.id])).length;
        return {
          track,
          total: qs.length,
          solved,
          pct: qs.length > 0 ? Math.round((solved / qs.length) * 100) : 0,
        };
      });

      const calculatedXp = stats.xp || (l1 * 25 + l2 * 45 + l3 * 80 + academySolved * 15) || 50;

      setSolvedStats({
        l1,
        l2,
        l3,
        totalSolved: count,
        academySolved,
        totalXp: calculatedXp,
        streakDays: stats.streak || 1,
        skillBreakdown,
      });
    } catch {
      // Ignore
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("sql_office_last_user_id");
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-mono text-xs font-black">
        Loading Career Dashboard...
      </div>
    );
  }

  const completionPct = Math.round((solvedStats.totalSolved / 300) * 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#000000] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#000000] px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]"
            >
              <Database className="w-5 h-5 text-black" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight uppercase text-black">
                  SQL GRIT
                </span>
                <span className="bg-[#FFE600] text-black border-2 border-black text-[10px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] uppercase tracking-wider">
                  Learner Dashboard
                </span>
              </div>
              <p className="text-xs text-black/70 font-bold">
                Logged in as {user.name} ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/learn"
                className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#FFF9D2] hover:bg-[#FFE600] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>SQL Academy (100 Qs)</span>
              </Link>

              <Link
                href="/interview"
                className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] hover:bg-[#FDD835] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
              >
                <Zap className="w-4 h-4 text-black fill-black" />
                <span>Practice 300 Qs</span>
              </Link>

              <Link
                href="/leaderboard"
                className="px-3 py-1.5 rounded-lg border-2 border-black bg-[#00E599] hover:bg-[#00D084] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
              >
                <Trophy className="w-4 h-4 text-black" />
                <span>Leaderboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-slate-100 text-xs font-black shadow-[2px_2px_0px_#000000]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Welcome Card */}
        <div className="bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FFE600] border-2 border-black text-xs font-black shadow-[1px_1px_0px_#000000]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Your Dirty SQL Career Progress</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              WELCOME BACK, {user.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-black/80 leading-relaxed">
              You are mastering SQL through 300 real-world, un-sanitized business challenges.
              Track your completion of <strong>Level 1 (Basic)</strong>, <strong>Level 2 (Intermediate)</strong>, and <strong>Level 3 (Advanced)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FAF8F5] border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_#000000] shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-black">{solvedStats.totalSolved} / 300</div>
              <div className="text-[10px] font-black uppercase text-black/60">Levels Conquered</div>
            </div>
            <div className="h-8 w-[2px] bg-black/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-indigo-700">{solvedStats.academySolved} / 100</div>
              <div className="text-[10px] font-black uppercase text-black/60">Academy Lessons</div>
            </div>
            <div className="h-8 w-[2px] bg-black/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">{solvedStats.totalXp}</div>
              <div className="text-[10px] font-black uppercase text-black/60">Total XP</div>
            </div>
            <div className="h-8 w-[2px] bg-black/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-orange-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500" />
                <span>{solvedStats.streakDays}d</span>
              </div>
              <div className="text-[10px] font-black uppercase text-black/60">Active Streak</div>
            </div>
          </div>
        </div>

        {/* SQL Academy + 8-Track Skill Mastery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#FFF9D2] border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase bg-white border border-black px-2 py-0.5 rounded">
                  Structured Foundations
                </span>
                <span className="text-xs font-black">{solvedStats.academySolved}/100</span>
              </div>
              <h2 className="text-lg font-black uppercase flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>SQL Academy (100 Qs)</span>
              </h2>
              <p className="text-xs text-black/80 font-medium leading-relaxed">
                Step-by-step interactive SQL lessons from SELECT, JOINs &amp; Subqueries to CTEs, Window Functions, Frame Clauses, and JSONB/EXPLAIN with exact PostgreSQL row verification.
              </p>
              <div className="w-full h-2.5 bg-white border-2 border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600"
                  style={{ width: `${Math.min(100, solvedStats.academySolved)}%` }}
                />
              </div>
            </div>
            <Link
              href="/learn"
              className="w-full py-2 bg-[#FFE600] hover:bg-[#FDD835] text-black border-2 border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Continue SQL Academy</span>
            </Link>
          </div>

          <div className="lg:col-span-2 bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight">
                Your 8-Track SQL Skill Mastery (Click a Skill to Practice)
              </h2>
              <Link href="/interview" className="text-xs font-black underline text-black/75 hover:text-black">
                Full Catalog →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {solvedStats.skillBreakdown.map((sk) => (
                <Link
                  key={sk.track}
                  href={`/interview?skill=${encodeURIComponent(sk.track)}`}
                  className="p-2.5 rounded-xl border-2 border-black bg-[#FAF8F5] hover:bg-[#FFE600]/40 transition-colors space-y-1.5"
                >
                  <div className="text-[11px] font-black text-black truncate">{sk.track}</div>
                  <div className="w-full h-2 bg-white border border-black rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00E599]"
                      style={{ width: `${sk.pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-black/70">
                    <span>{sk.solved}/{sk.total}</span>
                    <span>{sk.pct}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Tier Progression Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-black" />
              <span>The 300 Questions Master Roadmap</span>
            </h2>
            <Link
              href="/interview"
              className="text-xs font-black underline text-black/80 hover:text-black"
            >
              Open Interview Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURRICULUM_TIERS.map((tier) => {
              const solvedInTier =
                tier.levelNumber === 1
                  ? solvedStats.l1
                  : tier.levelNumber === 2
                    ? solvedStats.l2
                    : solvedStats.l3;
              const tierPct = Math.round((solvedInTier / tier.questionsCount) * 100);

              return (
                <div
                  key={tier.id}
                  className="bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded border-2 ${tier.badgeColor}`}>
                        Level {tier.levelNumber}
                      </span>
                      <span className="text-xs font-black">
                        {solvedInTier} / {tier.questionsCount} Solved
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{tier.badgeIcon}</span>
                      <div>
                        <h3 className="font-black text-lg uppercase leading-tight">{tier.badgeName}</h3>
                        <p className="text-xs font-bold text-black/60">{tier.tagline}</p>
                      </div>
                    </div>

                    <div className="w-full h-3 bg-slate-100 border-2 border-black rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00E599]"
                        style={{ width: `${tierPct}%` }}
                      />
                    </div>

                    <p className="text-xs text-black/80 font-medium leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <Link
                    href={`/interview?tier=${tier.name}`}
                    className="w-full py-2 bg-[#FFE600] text-black border-2 border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#FDD835] text-center flex items-center justify-center gap-1.5 transition-transform"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    <span>Practice Level {tier.levelNumber}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Level Badges Section */}
        <div className="bg-[#FFF9D2] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="font-black text-lg uppercase">Dedicated Level Badges</h3>
            </div>
            <Link
              href="/badges"
              className="text-xs font-black underline text-black/80 hover:text-black"
            >
              View Badge Details →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000000] text-center space-y-1.5 ${solvedStats.l1 >= 100 ? "border-emerald-600 bg-emerald-50" : ""}`}>
              <div className="text-3xl">🚜</div>
              <div className="font-black text-xs">The Mud Scrapper</div>
              <div className="text-[10px] font-bold text-black/60">
                {solvedStats.l1 >= 100 ? "✓ UNLOCKED" : `${solvedStats.l1}/100 Solved`}
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000000] text-center space-y-1.5 ${solvedStats.l2 >= 100 ? "border-amber-600 bg-amber-50" : ""}`}>
              <div className="text-3xl">🧙‍♂️</div>
              <div className="font-black text-xs">The Window Wizard</div>
              <div className="text-[10px] font-bold text-black/60">
                {solvedStats.l2 >= 100 ? "✓ UNLOCKED" : `${solvedStats.l2}/100 Solved`}
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000000] text-center space-y-1.5 ${solvedStats.l3 >= 100 ? "border-rose-600 bg-rose-50" : ""}`}>
              <div className="text-3xl">👹</div>
              <div className="font-black text-xs">The Schema Exorcist</div>
              <div className="text-[10px] font-bold text-black/60">
                {solvedStats.l3 >= 100 ? "✓ UNLOCKED" : `${solvedStats.l3}/100 Solved`}
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000000] text-center space-y-1.5 ${solvedStats.totalSolved >= 300 ? "border-purple-600 bg-purple-50" : ""}`}>
              <div className="text-3xl">⚡</div>
              <div className="font-black text-xs">SQL Demigod</div>
              <div className="text-[10px] font-bold text-black/60">
                {solvedStats.totalSolved >= 300 ? "✓ UNLOCKED" : `${solvedStats.totalSolved}/300 Total`}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
