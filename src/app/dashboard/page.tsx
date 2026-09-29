"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Zap,
  Flame,
  Award,
  Lock,
  Unlock,
  CheckCircle2,
  LogOut,
  ChevronRight,
  Database,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { DomainProgressSummary } from "@/lib/domains/domains-service";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackLink from "@/components/FeedbackLink";

interface DashboardData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    honorPledgeAccepted: boolean;
    honorPledgeAcceptedAt?: string;
  };
  domains: DomainProgressSummary[];
  totalXp: number;
  currentRank: string;
  streakDays: number;
  badgesEarned: number;
  totalBadges: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDomainSlug, setSelectedDomainSlug] = useState<string>("ecommerce");

  const mergeLocalProgress = (dashboard: DashboardData): DashboardData => {
    if (typeof window === "undefined" || !dashboard.user?.id) return dashboard;

    const currentUserId = dashboard.user.id;
    const lastUserId = localStorage.getItem("sql_office_last_user_id");

    // If switching users, purge legacy un-scoped cache
    if (lastUserId && lastUserId !== currentUserId) {
      localStorage.removeItem("sql_office_user_stats");
      localStorage.removeItem("sql_office_ecommerce_l1_solved");
      localStorage.removeItem("sql_office_academy_solved");
    }
    localStorage.setItem("sql_office_last_user_id", currentUserId);

    let calculatedTotalXp = dashboard.totalXp;
    let totalSolvedAllDomains = 0;
    try {
      const userStats = JSON.parse(
        localStorage.getItem(`sql_office_${currentUserId}_user_stats`) || "{}"
      );
      if (userStats.xp && userStats.xp > calculatedTotalXp) {
        calculatedTotalXp = userStats.xp;
      }
    } catch {
      // Ignore
    }

    const updatedDomains = dashboard.domains.map((dom) => {
      let domainCompletedCount = 0;
      const updatedLevels = dom.levels.map((lvl) => {
        let solved = lvl.solvedCount;
        try {
          const stored = localStorage.getItem(`sql_office_${currentUserId}_${dom.slug}_l${lvl.number}_solved`);
          if (stored) {
            const solvedMap = JSON.parse(stored);
            const localCount = Object.keys(solvedMap).filter((k) => solvedMap[k]).length;
            if (localCount > solved) solved = localCount;
          }
        } catch {
          // Ignore
        }
        domainCompletedCount += solved;
        totalSolvedAllDomains += solved;
        return {
          ...lvl,
          solvedCount: solved,
          unlocked: lvl.number === 1 || solved >= 1 || lvl.unlocked,
        };
      });

      return {
        ...dom,
        completedQuestions: domainCompletedCount > dom.completedQuestions ? domainCompletedCount : dom.completedQuestions,
        levels: updatedLevels,
      };
    });

    if (calculatedTotalXp === 0 && totalSolvedAllDomains > 0) {
      calculatedTotalXp = totalSolvedAllDomains * 10;
    }

    return {
      ...dashboard,
      totalXp: calculatedTotalXp,
      domains: updatedDomains,
    };
  };

  useEffect(() => {
    fetch("/api/dashboard")
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/auth/login");
          return null;
        }
        return res.json();
      })
      .then((resData) => {
        if (resData) {
          const merged = mergeLocalProgress(resData);
          setData(merged);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("sql_office_last_user_id");
    localStorage.removeItem("sql_office_user_stats");
    localStorage.removeItem("sql_office_ecommerce_l1_solved");
    localStorage.removeItem("sql_office_academy_solved");
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-8 max-w-sm w-full text-center space-y-4 shadow-[4px_4px_0px_var(--ocean)]">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center animate-bounce">
            <Building2 className="w-6 h-6 text-[var(--ink)]" />
          </div>
          <h3 className="font-black text-lg text-[var(--ink)]">Loading Your Office...</h3>
          <p className="text-xs text-[var(--ink)] opacity-75">
            Connecting to simulated company records...
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const currentDomain =
    data.domains.find((d) => d.slug === selectedDomainSlug) || data.domains[0];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Top Workplace Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <Building2 className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-[var(--ink)]">
                  SQL OFFICE
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--sun)] border border-[var(--ink)]">
                  SIMULATOR
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Honor Pledge Badge & Admin QA */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--mist)] border border-[var(--sky)] text-xs font-bold text-[var(--ink)]">
                <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
                <span>Honor Pledged</span>
              </div>
              {data.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-2.5 py-1 rounded-full border border-amber-500 bg-amber-100 hover:bg-amber-200 text-[11px] font-bold text-amber-950 transition-colors"
                  title="QA Reports & Platform Thresholds"
                >
                  Admin Console
                </Link>
              )}
            </div>

            {/* Streak & XP */}
            <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--sky)] px-3 py-1 rounded-full text-xs font-bold text-[var(--ink)]">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{data.streakDays} Day Streak</span>
              <span className="text-[var(--sky)]">•</span>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{data.totalXp} XP</span>
            </div>

            {/* Learn SQL Academy & Theme Toggle */}
            <Link
              href="/learn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--sun)] text-xs font-extrabold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] hover:brightness-105 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[var(--ink)]" />
              <span>Learn SQL</span>
            </Link>
            <FeedbackLink variant="button" />
            <ThemeToggle />

            {/* User Profile Pill & Logout */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <div className="text-xs font-extrabold text-[var(--ink)]">{data.user.name}</div>
                <div className="text-[10px] font-bold text-[var(--ocean-hover)]">{data.currentRank}</div>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-lg bg-[var(--white)] border border-[var(--sky)] hover:bg-[var(--mist)] transition-colors text-[var(--ink)]"
              >
                <LogOut className="w-4 h-4 text-[var(--ink)]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[var(--sun)] border border-[var(--ink)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>Your Simulated Workplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
              Welcome to the Team, {data.user.name.split(" ")[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink)] opacity-85 max-w-xl">
              You are currently an <strong>{data.currentRank}</strong>. Choose an industry domain below to enter your company office, meet your stakeholders, and start answering real requests.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[var(--surface)] border border-[var(--sky)] p-4 rounded-xl shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--ink)]">{data.domains.length}</div>
              <div className="text-[10px] font-bold uppercase text-[var(--ink)] opacity-70">Domains</div>
            </div>
            <div className="h-8 w-px bg-[var(--sky)]" />
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--ink)]">35</div>
              <div className="text-[10px] font-bold uppercase text-[var(--ink)] opacity-70">Company Levels</div>
            </div>
            <div className="h-8 w-px bg-[var(--sky)]" />
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--ink)]">3,500</div>
              <div className="text-[10px] font-bold uppercase text-[var(--ink)] opacity-70">Questions</div>
            </div>
          </div>
        </div>

        {/* Neo-Brutalist Career XP & Progression Bar (Image 4 Design) */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[6px_6px_0px_var(--ink)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <Zap className="w-5 h-5 text-[var(--ink)] fill-[var(--ink)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[var(--ink)] opacity-70">
                    Current Career Rank
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-teal)] border border-[var(--ink)] text-[10px] font-black text-[var(--ink)]">
                    {data.currentRank}
                  </span>
                </div>
                <h2 className="text-xl font-black text-[var(--ink)] mt-0.5">
                  Level {data.domains[0]?.currentLevel || 1} • {data.totalXp} Total XP Earned
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--white)] text-xs font-extrabold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{data.streakDays} Day Streak</span>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-xs font-black text-[var(--ink)]">
                  {data.totalXp >= 100 ? `${data.totalXp} / 300 XP` : `${data.totalXp} / 100 XP`}
                </span>
                <div className="text-[10px] font-bold text-[var(--ink)] opacity-70">
                  {Math.max(0, (data.totalXp >= 100 ? 300 : 100) - data.totalXp)} XP to next milestone
                </div>
              </div>
            </div>
          </div>

          {/* Prominent High-Contrast Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black text-[var(--ink)]">
              <span>PROGRESS TO LEVEL {data.totalXp >= 100 ? "3" : "2"}</span>
              <span className="font-mono">{Math.min(100, Math.round((data.totalXp / (data.totalXp >= 100 ? 300 : 100)) * 100))}%</span>
            </div>
            <div className="w-full h-5 bg-[var(--paper-beige)] border-2 border-[var(--ink)] rounded-lg overflow-hidden shadow-[2px_2px_0px_var(--ink)] p-0.5">
              <div
                className="h-full bg-[var(--accent-teal)] rounded-sm border-r-2 border-[var(--ink)] transition-all duration-500"
                style={{
                  width: `${Math.max(3, Math.min(100, Math.round((data.totalXp / (data.totalXp >= 100 ? 300 : 100)) * 100)))}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[var(--ink)] tracking-tight">
              Select Your Industry Domain
            </h2>
            <span className="text-xs font-semibold text-[var(--ink)] opacity-75">
              Switch anytime • Progress saved per domain
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {data.domains.map((dom) => (
              <button
                key={dom.slug}
                onClick={() => setSelectedDomainSlug(dom.slug)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedDomainSlug === dom.slug
                    ? "bg-[var(--accent-teal)] border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)]"
                    : "bg-[var(--white)] border-[var(--ink)] hover:bg-[var(--paper-beige)] shadow-[2px_2px_0px_var(--ink)]"
                }`}
              >
                <div className="text-xs font-black text-[var(--ink)] truncate">{dom.name}</div>
                <div className="text-[11px] font-bold text-[var(--ink)] opacity-90 mt-0.5">
                  L{dom.currentLevel} • {dom.completedQuestions}/500
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Domain Overview & Company Stages */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_var(--ink)] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[var(--ink)] pb-5">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-[var(--accent-teal)]">
                Active Domain
              </div>
              <h3 className="text-2xl font-black text-[var(--ink)]">{currentDomain.name}</h3>
              <p className="text-xs sm:text-sm text-[var(--ink)] opacity-80 mt-1">
                {currentDomain.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold text-[var(--ink)]">Domain Progress</div>
                <div className="text-base font-black text-[var(--ink)]">
                  {currentDomain.completedQuestions} / 500 Solved
                </div>
              </div>
            </div>
          </div>

          {/* 5 Levels in this Domain */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-[var(--ink)] opacity-80">
              Company Progression: Levels 1–5
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentDomain.levels.map((lvl) => (
                <div
                  key={lvl.number}
                  className={`rounded-2xl border-2 p-4 flex flex-col justify-between space-y-4 transition-all ${
                    lvl.unlocked
                      ? "bg-[var(--white)] border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)] hover:shadow-[6px_6px_0px_var(--ink)]"
                      : "bg-[var(--paper-beige)] border-[var(--ink)] opacity-70"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-black text-xs ${
                          lvl.unlocked
                            ? "bg-[var(--sun)] border-[var(--ink)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                            : "bg-slate-200 border-slate-400 text-slate-600"
                        }`}
                      >
                        L{lvl.number}
                      </span>
                      {lvl.unlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-extrabold text-[var(--ink)] bg-[#bbf7d0] border border-[var(--ink)] px-2 py-0.5 rounded-full">
                          <Unlock className="w-3 h-3 text-[var(--ink)]" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3 text-slate-600" />
                          Locked
                        </span>
                      )}
                    </div>

                    <h5 className="font-black text-sm text-[var(--ink)] leading-snug">{lvl.name}</h5>
                    <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                      {lvl.company}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t-2 border-[var(--ink)]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
                        <span>Solved</span>
                        <span className="font-mono font-black">
                          {lvl.solvedCount} / {lvl.totalQuestions}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[var(--paper-beige)] border border-[var(--ink)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--accent-teal)] transition-all duration-300"
                          style={{
                            width: `${Math.min(100, Math.round((lvl.solvedCount / lvl.totalQuestions) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>

                    {lvl.unlocked ? (
                      <Link
                        href={`/office/${currentDomain.slug}/level-${lvl.number}`}
                        className="w-full btn-primary text-xs py-2 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        <span>Enter Office</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)]" />
                      </Link>
                    ) : (
                      <div className="text-[10px] text-center font-semibold text-slate-600 bg-slate-100 p-2 rounded border border-slate-300">
                        Unlocks at ≥ 70 solved &amp; 5 boss questions in Level {lvl.number - 1}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Honor Reminder */}
        <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-4 text-center text-xs font-bold text-[var(--ink)]">
          &ldquo;Mastering SQL gives you a direct, unfiltered conversation with business reality.&rdquo; — The SQL Office Simulator Team
        </div>

        <footer className="pt-4 pb-6 text-center text-xs text-[var(--ink)] opacity-75 flex flex-wrap items-center justify-center gap-4">
          <Link href="/terms" className="hover:underline font-bold">
            Terms & Honor Code
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline font-bold">
            Privacy Policy
          </Link>
          <span>•</span>
          <FeedbackLink variant="pill" />
          <span>•</span>
          <span>© 2026 SQL Office Simulator • 100% Free Forever</span>
        </footer>
      </main>
    </div>
  );
}
