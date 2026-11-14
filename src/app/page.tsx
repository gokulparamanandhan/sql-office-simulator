"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Database,
  ShieldCheck,
  Terminal,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Server,
  Layers,
  Users,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Zap,
  Lock,
  Globe,
  BookOpen,
  X,
  Compass,
  Flame,
  Trophy,
  AlertTriangle,
  Bug,
  Crown,
  Play,
  RotateCcw,
  Check,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { CURRICULUM_TIERS, CURRICULUM_300_QUESTIONS } from "@/lib/content/curriculum-300";
import { BADGES_DATA } from "@/lib/gamification/badges-data";
import { LeaderboardEntry } from "@/lib/gamification/leaderboard-service";

export default function Home() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [comparisonMode, setComparisonMode] = useState<"tutorial" | "production">("production");
  const [leaderboardPreview, setLeaderboardPreview] = useState<LeaderboardEntry[]>([]);
  const [activeTierTab, setActiveTierTab] = useState<"basic" | "intermediate" | "advanced">("basic");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setAuthChecked(true));

    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.leaderboard) {
          setLeaderboardPreview(data.leaderboard.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  // Auto-toggle comparison animation every 5 seconds if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setComparisonMode((prev) => (prev === "tutorial" ? "production" : "tutorial"));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("sql_office_last_user_id");
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const selectedTier = CURRICULUM_TIERS.find((t) => t.id === activeTierTab) || CURRICULUM_TIERS[0];
  const sampleTierQuestions = CURRICULUM_300_QUESTIONS.filter((q) => q.tier === activeTierTab);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#000000] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Vintage Neo-Brutalist Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#000000] px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
              <Database className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight uppercase text-black">
                  SQL GRIT
                </span>
                <span className="bg-[#FF5555] text-white border-2 border-black text-[10px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] uppercase tracking-wider">
                  DIRTY DATA ONLY
                </span>
              </div>
              <p className="text-xs text-black/70 font-bold">
                The 300 MAANG &amp; Startup Interview Curriculum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 3 Tiers Quick Link */}
            <a
              href="#curriculum"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0px_#000000] transition-transform"
            >
              <Layers className="w-3.5 h-3.5 text-black" />
              <span>300 Questions</span>
            </a>

            {/* Badges Link */}
            <Link
              href="/badges"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0px_#000000] transition-transform"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Level Badges</span>
            </Link>

            {/* Leaderboard Link */}
            <Link
              href="/leaderboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#00E599] hover:bg-[#00D084] text-xs font-black shadow-[2px_2px_0px_#000000] transition-transform"
            >
              <Trophy className="w-3.5 h-3.5 text-black" />
              <span>Leaderboard</span>
            </Link>

            {/* Feedback Link */}
            <FeedbackLink variant="button" />

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-black text-black bg-[#FFF9D2] px-2.5 py-1.5 rounded-md border-2 border-black shadow-[1px_1px_0px_#000000]">
                  Hi, {user.name}
                </span>
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#FDD835]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg border-2 border-black bg-white font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 rounded-lg border-2 border-black bg-white font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#FDD835]"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* User Logged-in Banner */}
        {user && (
          <div className="bg-[#FFF9D2] border-3 border-black rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <span className="font-black text-sm text-black">
                  Welcome back, {user.name}! Ready for your next dirty query challenge?
                </span>
                <p className="text-xs text-black/80 font-bold">
                  Track your standing on the live leaderboard and unlock the Level 1, 2, and 3 badges.
                </p>
              </div>
            </div>
            <Link
              href="/interview"
              className="px-3.5 py-1.5 rounded-lg border-2 border-black bg-[#00E599] font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#00D084] shrink-0"
            >
              Continue Practice →
            </Link>
          </div>
        )}

        {/* HERO SECTION: The Funny & Instant-Understanding Animation */}
        <section className="relative overflow-hidden rounded-2xl bg-white border-3 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000000]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600] border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Zero Fake Toy Schemas • 100% Free Forever</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
                STOP WRITING QUERIES ON FAKE CLEAN DATA.
              </h1>

              <p className="text-base sm:text-lg text-black/90 font-medium leading-relaxed">
                Solving 500 simple queries on a clean, single-table tutorial database will teach you less than solving <strong>30 messy multi-table business problems</strong> with missing values, duplicate keys, and performance bottlenecks.
              </p>

              <div className="p-3.5 bg-[#F5EFEB] border-2 border-black rounded-xl text-xs font-mono font-bold space-y-1 shadow-[2px_2px_0px_#000000]">
                <div className="text-rose-600 uppercase font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> The 300 Questions Master Roadmap:
                </div>
                <div>• Level 1: 100 Basic Questions (SELECT, WHERE, NULLs, dirty JOINs)</div>
                <div>• Level 2: 100 Intermediate Questions (CTEs, Window Functions, DENSE_RANK)</div>
                <div>• Level 3: 100 Advanced Questions (Shitty schemas, recursive CTEs, cohorts)</div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/interview"
                  className="px-5 py-3 rounded-xl border-3 border-black bg-[#FFE600] hover:bg-[#FDD835] font-black text-sm shadow-[4px_4px_0px_#000000] flex items-center gap-2 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>Start Solving Dirty SQL (Free)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>

                <Link
                  href="/leaderboard"
                  className="px-4 py-3 rounded-xl border-3 border-black bg-white hover:bg-slate-50 font-black text-sm shadow-[4px_4px_0px_#000000] flex items-center gap-2 transition-transform"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>View Leaderboard</span>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs font-black text-black/70">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real MAANG Questions
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Expensive Paywalls
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated Level Badges
                </span>
              </div>
            </div>

            {/* Right Interactive Animation: The Joke (Tutorial SQL vs Production Reality) */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF8F5] border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000] space-y-4">
                {/* Animation Toggle Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400 border border-black" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 border border-black" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border border-black" />
                    <span className="text-xs font-black uppercase tracking-wider ml-2">
                      REALITY CHECK SIMULATOR
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-white border-2 border-black rounded-lg p-0.5">
                    <button
                      onClick={() => setComparisonMode("tutorial")}
                      className={`px-2 py-1 rounded text-[11px] font-black transition-all ${
                        comparisonMode === "tutorial"
                          ? "bg-rose-400 text-black shadow-[1px_1px_0px_#000000]"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      🍼 Tutorial SQL
                    </button>
                    <button
                      onClick={() => setComparisonMode("production")}
                      className={`px-2 py-1 rounded text-[11px] font-black transition-all ${
                        comparisonMode === "production"
                          ? "bg-[#FFE600] text-black shadow-[1px_1px_0px_#000000]"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      💀 Real Production SQL
                    </button>
                  </div>
                </div>

                {/* Animated Screen Card */}
                {comparisonMode === "tutorial" ? (
                  /* TUTORIAL SQL (THE LIE) */
                  <div className="bg-[#FFF5F7] border-2 border-black rounded-xl p-4 space-y-3 transition-all animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-rose-700 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded">
                        WHAT OTHER PLATFORMS CHARGE $299/YR FOR:
                      </span>
                      <span className="text-lg">🧸</span>
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-3 font-mono text-[11px] text-black space-y-1 shadow-[2px_2px_0px_#000000]">
                      <div className="text-black/50 font-bold">-- Pristine fake 3-row table:</div>
                      <div className="text-blue-600 font-bold">SELECT * FROM employees WHERE salary &gt; 50000;</div>
                      <div className="text-emerald-700 pt-1">
                        ✓ 3 rows returned. Zero NULL values. Zero duplicates. Zero stress.
                      </div>
                    </div>

                    <div className="bg-[#FFE4E8] border border-rose-300 rounded-lg p-3 text-xs text-rose-950 font-medium">
                      <p className="font-bold flex items-center gap-1">
                        <span>🤖 Generic Tutorial Voice:</span>
                      </p>
                      <p className="italic mt-1">
                        &quot;Congratulations! You wrote a single SELECT statement! You are now officially ready to be a Senior Data Scientist at Meta! Here is your Certificate of Participation! 🎉&quot;
                      </p>
                    </div>

                    <div className="text-[11px] text-black/60 font-bold text-center">
                      (Then you get into the interview and fail the first multi-table join...)
                    </div>
                  </div>
                ) : (
                  /* REAL PRODUCTION SQL (THE REALITY) */
                  <div className="bg-[#FFFDE6] border-2 border-black rounded-xl p-4 space-y-3 transition-all animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-black bg-[#FFE600] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000]">
                        WHAT HAPPENS AT REAL JOBS &amp; MAANG INTERVIEWS:
                      </span>
                      <span className="text-lg">🔥💀</span>
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-3 font-mono text-[11px] text-black space-y-1 shadow-[2px_2px_0px_#000000]">
                      <div className="text-rose-600 font-black">
                        -- Shitty schema alert: No foreign keys, trailing spaces, duplicate IDs!
                      </div>
                      <div className="text-purple-700 font-bold">
                        WITH deduplicated_orders AS (
                      </div>
                      <div className="pl-3 text-black">
                        SELECT order_id, TRIM(both &apos; &apos; from user_id) as uid,
                      </div>
                      <div className="pl-3 text-blue-600 font-bold">
                        DENSE_RANK() OVER (PARTITION BY uid ORDER BY timestamp DESC)
                      </div>
                      <div className="text-purple-700 font-bold">)</div>
                    </div>

                    <div className="bg-[#FFEBEE] border-2 border-rose-400 rounded-lg p-3 text-xs text-rose-950 font-medium space-y-1">
                      <div className="font-black text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>URGENT SLACK MESSAGE FROM VP OF FINANCE:</span>
                      </div>
                      <p className="italic">
                        &quot;@here The board meeting is in 12 minutes! The investor deck says our ARR is negative $3.2M because of webhook double-charging and duplicate currency conversions! Exclude refunded transactions with missing dates and fix this query NOW!&quot;
                      </p>
                    </div>

                    <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-300 rounded p-1.5 font-bold text-center">
                      ✓ This is what SQL GRIT trains you to solve across 300 real levels.
                    </div>
                  </div>
                )}

                {/* Funny Footer Stamp */}
                <div className="flex items-center justify-between text-xs font-black pt-1">
                  <span className="flex items-center gap-1.5 text-black">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span>Real Interview Tested</span>
                  </span>
                  <button
                    onClick={() =>
                      setComparisonMode((prev) => (prev === "tutorial" ? "production" : "tutorial"))
                    }
                    className="underline text-black/70 hover:text-black flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Toggle Reality Check</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE 3-TIER ROADMAP (100 QUESTIONS EACH = 300 TOTAL) */}
        <section id="curriculum" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-black uppercase tracking-wider text-black/70 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-black" />
                <span>The Master Curriculum</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                3 TIERS • 100 QUESTIONS EACH • 300 TOTAL
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-medium text-black/80 max-w-md">
              Complete these 300 levels on messy real-world databases and you can crack any SQL technical screen in the world.
            </p>
          </div>

          {/* Tier Navigation Tabs */}
          <div className="flex overflow-x-auto gap-3 pb-2">
            {CURRICULUM_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setActiveTierTab(tier.id)}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-3 border-black flex items-center gap-2 ${
                  activeTierTab === tier.id
                    ? `${tier.badgeColor} shadow-[4px_4px_0px_#000000] -translate-y-0.5`
                    : "bg-white text-black hover:bg-slate-50 shadow-[2px_2px_0px_#000000]"
                }`}
              >
                <span className="text-base">{tier.badgeIcon}</span>
                <span>Level {tier.levelNumber}: {tier.badgeName} (100 Qs)</span>
              </button>
            ))}
          </div>

          {/* Active Tier Spotlight Card */}
          <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000000] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded border-2 border-black ${selectedTier.badgeColor}`}>
                    Level {selectedTier.levelNumber} Milestone
                  </span>
                  <span className="text-xs font-mono font-bold text-black/70">
                    100 Curated Challenges
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase mt-1">
                  {selectedTier.name}
                </h3>
                <p className="text-sm font-bold text-black/70 mt-0.5">
                  {selectedTier.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/interview"
                  className="px-4 py-2.5 bg-[#FFE600] text-black border-2 border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_#000000] hover:bg-[#FDD835] flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Start Level {selectedTier.levelNumber} (100 Qs)</span>
                </Link>
              </div>
            </div>

            <p className="text-sm sm:text-base font-medium text-black/85 leading-relaxed">
              {selectedTier.description}
            </p>

            {/* Focus Topics vs Messy Data Traps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Focus Topics */}
              <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 space-y-3 shadow-[2px_2px_0px_#000000]">
                <div className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Core SQL Concepts Mastered</span>
                </div>
                <ul className="space-y-1.5 text-xs font-medium text-black/90">
                  {selectedTier.focusTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-emerald-700">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Messy Data Traps */}
              <div className="bg-[#FFF5F5] border-2 border-black rounded-xl p-4 space-y-3 shadow-[2px_2px_0px_#000000]">
                <div className="text-xs font-black uppercase text-rose-700 flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-rose-600" />
                  <span>The Real Messy Data Traps You Will Face</span>
                </div>
                <ul className="space-y-1.5 text-xs font-medium text-black/90">
                  {selectedTier.messyDataFeatures.map((trap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-rose-600">⚠</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Target Outcome & Companies */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t-2 border-black/10 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black uppercase text-black/70">Sample Companies:</span>
                {selectedTier.sampleCompanies.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 bg-slate-100 border border-black rounded font-black text-[11px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                🎯 {selectedTier.targetOutcome}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEDICATED BADGES SHOWCASE */}
        <section className="bg-[#FFF9D2] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-black uppercase tracking-wider text-black/70 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Dedicated Progression Badges</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                EARN YOUR DEDICATED BADGE FOR EACH LEVEL
              </h2>
            </div>
            <Link
              href="/badges"
              className="px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-slate-50 flex items-center gap-1.5"
            >
              <span>View All Badges &amp; Trophies →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Level 1 Badge */}
            <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000000] space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center text-2xl shadow-[1px_1px_0px_#000000]">
                🚜
              </div>
              <div>
                <span className="text-[10px] font-black uppercase bg-emerald-300 text-black px-2 py-0.5 rounded border border-black">
                  Level 1 Dedicated Badge
                </span>
                <h4 className="font-black text-base mt-1">The Mud Scrapper</h4>
                <p className="text-xs text-black/70 font-medium">
                  Complete all 100 basic messy questions (SELECT, NULLs, dirty JOINs).
                </p>
              </div>
            </div>

            {/* Level 2 Badge */}
            <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000000] space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center text-2xl shadow-[1px_1px_0px_#000000]">
                🧙‍♂️
              </div>
              <div>
                <span className="text-[10px] font-black uppercase bg-amber-300 text-black px-2 py-0.5 rounded border border-black">
                  Level 2 Dedicated Badge
                </span>
                <h4 className="font-black text-base mt-1">The Window Wizard</h4>
                <p className="text-xs text-black/70 font-medium">
                  Complete all 100 intermediate questions (CTEs, DENSE_RANK, LEAD, LAG).
                </p>
              </div>
            </div>

            {/* Level 3 Badge */}
            <div className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000000] space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-rose-100 border-2 border-black flex items-center justify-center text-2xl shadow-[1px_1px_0px_#000000]">
                👹
              </div>
              <div>
                <span className="text-[10px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded border border-black">
                  Level 3 Dedicated Badge
                </span>
                <h4 className="font-black text-base mt-1">The Schema Exorcist</h4>
                <p className="text-xs text-black/70 font-medium">
                  Complete all 100 advanced nightmare queries (recursive CTEs, sessionization).
                </p>
              </div>
            </div>

            {/* Final Grandmaster Badge */}
            <div className="bg-[#FAF5FF] border-3 border-purple-950 rounded-xl p-4 shadow-[3px_3px_0px_#000000] space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 border-2 border-black flex items-center justify-center text-2xl shadow-[1px_1px_0px_#000000]">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase bg-[#9D00FF] text-white px-2 py-0.5 rounded border border-black">
                  All 300 Completed
                </span>
                <h4 className="font-black text-base mt-1">SQL Demigod</h4>
                <p className="text-xs text-black/70 font-medium">
                  100% mastery. Guaranteed to crack any SQL interview on Earth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: REAL LEADERBOARD PREVIEW */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-black uppercase tracking-wider text-black/70 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Global Hall of Fame</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                REAL LEADERBOARD: TOP 300 CHALLENGE SOLVERS
              </h2>
            </div>
            <Link
              href="/leaderboard"
              className="px-4 py-2 bg-[#00E599] text-black border-2 border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#00D084] flex items-center gap-1.5"
            >
              <span>See Full Live Standings →</span>
            </Link>
          </div>

          <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b-2 border-black text-xs font-black uppercase tracking-wider text-black">
                    <th className="py-3 px-4 w-16 text-center">Rank</th>
                    <th className="py-3 px-4">Learner</th>
                    <th className="py-3 px-4 text-center">Levels Conquered</th>
                    <th className="py-3 px-4 text-center">Total XP</th>
                    <th className="py-3 px-4 text-center">Active Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10 text-xs font-medium">
                  {leaderboardPreview.map((entry) => (
                    <tr key={entry.id} className="hover:bg-[#FFFDE6] transition-colors">
                      <td className="py-3.5 px-4 text-center font-black">
                        {entry.rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#FFE600] border-2 border-black shadow-[1px_1px_0px_#000000]">
                            1
                          </span>
                        ) : entry.rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-slate-300 border-2 border-black shadow-[1px_1px_0px_#000000]">
                            2
                          </span>
                        ) : entry.rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-amber-200 border-2 border-black shadow-[1px_1px_0px_#000000]">
                            3
                          </span>
                        ) : (
                          `#${entry.rank}`
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={entry.avatar}
                            alt={entry.name}
                            className="w-8 h-8 rounded-full border-2 border-black object-cover"
                          />
                          <div>
                            <div className="font-black text-sm">{entry.name}</div>
                            <div className="text-[11px] text-black/60 font-semibold">
                              {entry.role} {entry.company && `• ${entry.company}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-black text-sm text-black">
                          {entry.totalLevelsCompleted}
                        </span>
                        <span className="text-black/50 font-bold"> / 300</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#FFE600] border border-black font-black text-xs shadow-[1px_1px_0px_#000000]">
                          {entry.totalXp.toLocaleString()} XP
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                          <Flame className="w-3 h-3 fill-orange-500" />
                          <span>{entry.streakDays}d</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HONOR CODE MANIFESTO */}
        <section className="bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-black" />
            <h3 className="text-xl font-black uppercase text-black">
              THE SQL GRIT HONOR CODE: HUMAN MUSCLE ONLY
            </h3>
          </div>
          <p className="text-sm text-black/90 font-medium leading-relaxed">
            There are no proctors, no browser locks, and no webcam spyware. If you feed these 300 questions to ChatGPT, you will get a green checkmark on our site and then fail your live technical screen in front of an interviewer.
            Solve them yourself, wrestle with the dirty schemas, and build real muscle.
          </p>
          <div className="text-xs text-black/70 font-mono font-bold">
            Built for serious Data Analysts, Analytics Engineers, and Data Scientists.
          </div>
        </section>
      </main>

      {/* Retro Neo-Brutalist Footer */}
      <footer className="mt-12 bg-white border-t-3 border-black py-8 px-4 sm:px-8 text-xs font-bold text-black/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase">SQL GRIT</span>
            <span>• 300 Messy Production &amp; MAANG Interview Questions</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/interview" className="hover:underline">300 Questions</Link>
            <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
            <Link href="/badges" className="hover:underline">Level Badges</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
