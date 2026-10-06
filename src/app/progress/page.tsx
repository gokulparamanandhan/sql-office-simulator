"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowLeft,
  Flame,
  Zap,
  Award,
  Trophy,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { ConceptMastery, getCareerProgression } from "@/lib/gamification/gamification-service";

interface ProgressData {
  user: {
    name: string;
    email: string;
  };
  totalXp: number;
  currentRank: string;
  streakDays: number;
  longestStreak: number;
  accuracyRate: number;
  totalSolved: number;
  totalAttempts: number;
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
}

export default function ProgressPage() {
  const router = useRouter();
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/progress")
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/auth/login");
          return null;
        }
        return res.json();
      })
      .then((resData) => {
        if (resData) setData(resData);
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-8 max-w-sm w-full text-center space-y-4 shadow-[4px_4px_0px_var(--ocean)]">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center animate-bounce">
            <Trophy className="w-6 h-6 text-[var(--ink)]" />
          </div>
          <h3 className="font-black text-lg text-[var(--ink)]">Loading Career Analytics...</h3>
          <p className="text-xs text-[var(--ink)] opacity-75">
            Calculating mastery and achievement data...
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate rank progression dynamically
  const progression = getCareerProgression(data.totalXp);
  const nextRankName =
    progression.nextLevel === 2
      ? "Data Analyst"
      : progression.nextLevel === 3
      ? "Senior Data Analyst"
      : progression.nextLevel === 4
      ? "Data Lead"
      : "Head of Data / Chief Analytics Officer";

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="h-4 w-px bg-[var(--sky)]" />

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[var(--ink)]">
                Career Progress &amp; Mastery
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)]">
                Live Analytics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sun)] border border-[var(--ink)] text-xs font-bold text-[var(--ink)]">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>{data.totalXp} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Learner Rank Banner */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--sky)] pb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center font-black text-xl text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
                <Trophy className="w-7 h-7 text-[var(--ink)]" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase text-[var(--ocean-hover)] tracking-wider">
                  Current Professional Standing • Level {progression.currentLevel}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
                  {progression.currentRank}
                </h1>
                <p className="text-xs font-semibold text-[var(--ink)] opacity-75">
                  Learner: {data.user.name} ({data.user.email})
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs font-bold text-[var(--ink)] opacity-70">
                {progression.isMaxLevel ? "Max Career Rank" : `Next Rank: ${nextRankName}`}
              </div>
              <div className="text-sm font-black text-[var(--ink)]">
                {progression.isMaxLevel
                  ? `${data.totalXp.toLocaleString()} XP (Mastered)`
                  : `${data.totalXp.toLocaleString()} / ${progression.nextLevelXp.toLocaleString()} XP`}
              </div>
              {!progression.isMaxLevel && (
                <div className="text-[10px] font-bold text-[var(--ink)] opacity-70">
                  {progression.xpToNextMilestone.toLocaleString()} XP to promotion
                </div>
              )}
            </div>
          </div>

          {/* Rank Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-[var(--ink)]">
              <span>Promotion Track (Progress to Level {progression.nextLevel})</span>
              <span>{progression.progressPct}% Complete</span>
            </div>
            <div className="h-3 w-full bg-[var(--surface)] border border-[var(--sky)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--ocean)] transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(progression.progressPct > 0 ? 3 : 0, progression.progressPct)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Analytics Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] opacity-75">
              <span>SOLVED QUESTIONS</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[var(--ink)]">{data.totalSolved}</div>
            <div className="text-[11px] font-semibold text-[var(--ink)] opacity-70">
              Across company levels
            </div>
          </div>

          <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] opacity-75">
              <span>ACCURACY RATE</span>
              <Target className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-[var(--ink)]">{data.accuracyRate}%</div>
            <div className="text-[11px] font-semibold text-[var(--ink)] opacity-70">
              First-try correctness
            </div>
          </div>

          <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] opacity-75">
              <span>CURRENT STREAK</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="text-3xl font-black text-[var(--ink)]">{data.streakDays} Days</div>
            <div className="text-[11px] font-semibold text-[var(--ink)] opacity-70">
              Longest: {data.longestStreak} days
            </div>
          </div>

          <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] opacity-75">
              <span>BADGES EARNED</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-[var(--ink)]">
              {data.badges.filter((b) => b.earned).length} / {data.badges.length}
            </div>
            <div className="text-[11px] font-semibold text-[var(--ink)] opacity-70">
              Career milestones
            </div>
          </div>
        </div>

        {/* Concept Mastery & Weak Areas Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Concept Mastery Bars (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[var(--ink)]" />
                <h3 className="font-black text-sm text-[var(--ink)]">
                  SQL Concept Mastery Radar
                </h3>
              </div>
              <span className="text-xs font-semibold opacity-70 text-[var(--ink)]">
                Based on submitted queries
              </span>
            </div>

            <div className="space-y-3.5">
              {data.conceptMastery.map((cm) => (
                <div key={cm.concept} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-[var(--ink)]">
                    <span className="font-mono">{cm.concept}</span>
                    <span>{cm.accuracyPct}% accuracy ({cm.correctAttempts}/{cm.totalAttempts})</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--surface)] border border-[var(--sky)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cm.accuracyPct >= 80
                          ? "bg-emerald-500"
                          : cm.accuracyPct >= 50
                          ? "bg-[var(--ocean)]"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${cm.accuracyPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak-Area Recommendations & Suggestions (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[3px_3px_0px_var(--sun)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--sky)] pb-3">
              <TrendingUp className="w-4 h-4 text-[var(--ink)]" />
              <h3 className="font-black text-sm text-[var(--ink)]">
                Skill Gaps &amp; Focus Areas
              </h3>
            </div>

            <p className="text-xs text-[var(--ink)] opacity-85 leading-relaxed">
              Based on recent query errors, our simulator recommends reinforcing the following patterns:
            </p>

            <div className="space-y-2.5">
              {data.weakAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--surface)] border border-[var(--sky)] rounded-xl p-3 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-[var(--ink)]">{area}</div>
                    <p className="text-[11px] text-[var(--ink)] opacity-75">
                      Review question #8 and question #10 in Level 1 for real business usage.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/office/ecommerce/level-1"
              className="w-full btn-secondary text-xs py-2 text-center"
            >
              <span>Practice in E-Commerce Office</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)]" />
            </Link>
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--ink)]" />
              <h3 className="font-black text-base text-[var(--ink)]">
                Milestones &amp; Achievement Badges
              </h3>
            </div>
            <span className="text-xs font-semibold text-[var(--ink)] opacity-70">
              Permanent career credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.badges.map((badge) => (
              <div
                key={badge.id || badge.slug}
                className={`border-2 rounded-xl p-4 flex items-start gap-3.5 transition-all ${
                  badge.earned
                    ? "bg-[var(--sun)] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                    : "bg-[var(--surface)] border-[var(--sky)] opacity-60"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--white)] border border-[var(--ink)] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-xs text-[var(--ink)]">{badge.name}</h4>
                    {badge.earned && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 rounded">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--ink)] opacity-85 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t-2 border-[var(--sky)] py-6 px-4 text-center text-xs font-semibold text-[var(--ink)] mt-12">
        &ldquo;Consistency turns raw queries into senior-level engineering instinct.&rdquo; — SQL Office Simulator
      </footer>
    </div>
  );
}
