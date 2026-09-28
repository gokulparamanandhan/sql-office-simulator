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
} from "lucide-react";
import { DomainProgressSummary } from "@/lib/domains/domains-service";

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
          setData(resData);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
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
            {/* Honor Pledge Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--mist)] border border-[var(--sky)] text-xs font-bold text-[var(--ink)]">
              <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
              <span>Honor Pledged</span>
            </div>

            {/* Streak & XP */}
            <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--sky)] px-3 py-1 rounded-full text-xs font-bold text-[var(--ink)]">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{data.streakDays} Day Streak</span>
              <span className="text-[var(--sky)]">•</span>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{data.totalXp} XP</span>
            </div>

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
                    ? "bg-[var(--ocean)] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                    : "bg-[var(--white)] border-[var(--sky)] hover:bg-[var(--mist)]"
                }`}
              >
                <div className="text-xs font-black text-[var(--ink)] truncate">{dom.name}</div>
                <div className="text-[11px] font-semibold text-[var(--ink)] opacity-80 mt-0.5">
                  L{dom.currentLevel} • {dom.completedQuestions}/500
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Domain Overview & Company Stages */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--sky)] pb-5">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-[var(--ocean-hover)]">
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
                <div className="text-sm font-black text-[var(--ink)]">
                  {currentDomain.completedQuestions} / 500 Questions Solved
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
                  className={`rounded-xl border-2 p-4 flex flex-col justify-between space-y-4 transition-all ${
                    lvl.unlocked
                      ? "bg-[var(--white)] border-[var(--ink)] shadow-[3px_3px_0px_var(--ocean)]"
                      : "bg-[var(--surface)] border-[var(--sky)] opacity-75"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-7 h-7 rounded-md border flex items-center justify-center font-black text-xs ${
                          lvl.unlocked
                            ? "bg-[var(--sun)] border-[var(--ink)] text-[var(--ink)]"
                            : "bg-slate-200 border-slate-400 text-slate-600"
                        }`}
                      >
                        L{lvl.number}
                      </span>
                      {lvl.unlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                          <Unlock className="w-3 h-3 text-emerald-700" />
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

                  <div className="space-y-3 pt-2 border-t border-[var(--sky)]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink)]">
                      <span>Solved</span>
                      <span className="font-mono font-bold">
                        {lvl.solvedCount} / {lvl.totalQuestions}
                      </span>
                    </div>

                    {lvl.unlocked ? (
                      <Link
                        href={`/office/${currentDomain.slug}/level-${lvl.number}`}
                        className="w-full btn-primary text-xs py-2"
                      >
                        Enter Office
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
          &ldquo;Solve it yourself. That&apos;s where the learning happens.&rdquo; — The SQL Office Simulator Team
        </div>
      </main>
    </div>
  );
}
