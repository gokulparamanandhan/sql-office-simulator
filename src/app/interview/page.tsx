"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowLeft,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  Zap,
  Flame,
  Award,
  AlertCircle,
  Code2,
  Search,
  Filter,
  Check,
  Calendar,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Clock,
  BookOpen,
  Trophy,
  AlertTriangle,
  Bug,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { INTERVIEW_QUESTIONS, INTERVIEW_COMPANIES, INTERVIEW_CATEGORIES } from "@/lib/content/interview-questions";

export default function InterviewPrepCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});
  const [showPlaybook, setShowPlaybook] = useState<boolean>(false);

  // Load solved map from localStorage
  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const stored = localStorage.getItem(`sql_office_${currentUserId}_interview_solved`);
      if (stored) {
        setSolvedMap(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter((q) => {
      // Search
      const matchesSearch =
        searchQuery.trim() === "" ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.companies.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tier (mapped from difficulty or custom tags)
      const matchesTier =
        selectedTier === "All" ||
        (selectedTier === "Level 1: Basic" && q.difficulty === "Easy") ||
        (selectedTier === "Level 2: Intermediate" && q.difficulty === "Medium") ||
        (selectedTier === "Level 3: Advanced" && q.difficulty === "Hard");

      // Company
      const matchesCompany =
        selectedCompany === "All" || q.companies.includes(selectedCompany);

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

      // Category
      const matchesCategory =
        selectedCategory === "All" || q.category === selectedCategory;

      return matchesSearch && matchesTier && matchesCompany && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedTier, selectedCompany, selectedDifficulty, selectedCategory]);

  const totalQuestions = INTERVIEW_QUESTIONS.length;
  const solvedCount = Object.keys(solvedMap).filter((k) => solvedMap[k]).length;
  const solvedPct = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

  const easyTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Easy").length;
  const easySolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Easy" && solvedMap[q.id]).length;

  const medTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Medium").length;
  const medSolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Medium" && solvedMap[q.id]).length;

  const hardTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Hard").length;
  const hardSolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Hard" && solvedMap[q.id]).length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#000000] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-3 border-[#000000] px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight uppercase text-black">
                  SQL GRIT
                </span>
                <span className="bg-[#FF5555] text-white border-2 border-black text-[10px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] uppercase tracking-wider">
                  300 Interview Hub
                </span>
              </div>
              <p className="text-xs text-black/70 font-bold">
                Real MAANG &amp; High-Growth Startup Technical Screens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/badges"
              className="px-3 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-slate-50 text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Level Badges</span>
            </Link>

            <Link
              href="/leaderboard"
              className="px-3 py-1.5 rounded-lg border-2 border-black bg-[#00E599] hover:bg-[#00D084] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>Leaderboard</span>
            </Link>

            <button
              onClick={() => setShowPlaybook(!showPlaybook)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-[#FFE600] hover:bg-[#FDD835] text-xs font-black shadow-[2px_2px_0px_#000000] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>30-Day Game Plan</span>
            </button>
            <FeedbackLink variant="button" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* 30-Day Strategy Playbook Banner / Drawer */}
        {showPlaybook && (
          <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#000000] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                  <Calendar className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-lg uppercase">
                    30-Day MAANG &amp; Startup SQL Interview Game Plan
                  </h3>
                  <p className="text-xs text-black/70 font-bold">
                    Follow this exact sequence to crack the 300 technical challenges.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPlaybook(false)}
                className="text-xs font-black px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000]"
              >
                Close Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 space-y-2 shadow-[2px_2px_0px_#000000]">
                <div className="text-xs font-black uppercase text-emerald-700 flex items-center gap-1.5">
                  <span>Day 1–10: Level 1 (Basic)</span>
                </div>
                <div className="font-black text-sm">Mud Scrapper Track (100 Qs)</div>
                <p className="text-xs text-black/80 font-medium">
                  Master dirty WHERE filters, NULL coercion (`COALESCE`), string trimming, duplicate keys, and basic multi-table joins.
                </p>
              </div>

              <div className="bg-[#FFF9D2] border-2 border-black rounded-xl p-4 space-y-2 shadow-[2px_2px_0px_#000000]">
                <div className="text-xs font-black uppercase text-amber-700 flex items-center gap-1.5">
                  <span>Day 11–20: Level 2 (Intermediate)</span>
                </div>
                <div className="font-black text-sm">Window Wizard Track (100 Qs)</div>
                <p className="text-xs text-black/80 font-medium">
                  Master CTE pipelines, `ROW_NUMBER`, `DENSE_RANK` with ties, `LEAD`/`LAG` deltas, and preventing join fanout.
                </p>
              </div>

              <div className="bg-[#FFF5F5] border-2 border-black rounded-xl p-4 space-y-2 shadow-[2px_2px_0px_#000000]">
                <div className="text-xs font-black uppercase text-rose-700 flex items-center gap-1.5">
                  <span>Day 21–30: Level 3 (Advanced)</span>
                </div>
                <div className="font-black text-sm">Schema Exorcist Track (100 Qs)</div>
                <p className="text-xs text-black/80 font-medium">
                  Recursive CTEs, 30-min sessionization, gaps and islands, cohort retention matrices, and query tuning.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-white border-3 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600] border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000000]">
                <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                <span>300 DIRTY SQL INTERVIEW QUESTIONS</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                CRACK ANY DATA ANALYST &amp; SCIENTIST SQL SCREEN
              </h1>
              <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                Every problem runs on an in-memory PostgreSQL engine with real schemas, hidden edge-case tests, and dirty data quirks.
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 sm:w-72 space-y-3 shrink-0 shadow-[3px_3px_0px_#000000]">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="uppercase">Your Readiness Score</span>
                <span className="text-[#00E599] bg-black px-2 py-0.5 rounded text-[11px]">
                  {solvedPct}%
                </span>
              </div>

              <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00E599]"
                  style={{ width: `${solvedPct}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px] font-black">
                <div className="bg-emerald-100 border border-black/30 rounded p-1">
                  <div>BASIC</div>
                  <div className="text-emerald-800">{easySolved}/{easyTotal}</div>
                </div>
                <div className="bg-amber-100 border border-black/30 rounded p-1">
                  <div>INTER</div>
                  <div className="text-amber-800">{medSolved}/{medTotal}</div>
                </div>
                <div className="bg-rose-100 border border-black/30 rounded p-1">
                  <div>ADV</div>
                  <div className="text-rose-800">{hardSolved}/{hardTotal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="space-y-3 bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000]">
          {/* Top row: Search and Tier Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Tier Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { label: "All Tiers", val: "All" },
                { label: "Level 1: Basic (100 Qs)", val: "Level 1: Basic" },
                { label: "Level 2: Intermediate (100 Qs)", val: "Level 2: Intermediate" },
                { label: "Level 3: Advanced (100 Qs)", val: "Level 3: Advanced" },
              ].map((tier) => (
                <button
                  key={tier.val}
                  onClick={() => setSelectedTier(tier.val)}
                  className={`px-3.5 py-2 rounded-lg border-2 border-black text-xs font-black uppercase whitespace-nowrap transition-all ${
                    selectedTier === tier.val
                      ? "bg-[#FFE600] shadow-[2px_2px_0px_#000000] -translate-y-0.5"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or company..."
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[2px_2px_0px_#000000]"
              />
            </div>
          </div>

          {/* Sub Filters: Company & Category */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t-2 border-black/10 text-xs">
            {/* Company Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="font-black uppercase text-black/60">Company:</span>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border-2 border-black rounded-lg text-xs font-black shadow-[1px_1px_0px_#000000]"
              >
                <option value="All">All Companies</option>
                {INTERVIEW_COMPANIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="font-black uppercase text-black/60">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border-2 border-black rounded-lg text-xs font-black shadow-[1px_1px_0px_#000000]"
              >
                <option value="All">All Categories</option>
                {INTERVIEW_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(selectedTier !== "All" || selectedCompany !== "All" || selectedCategory !== "All" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedTier("All");
                  setSelectedCompany("All");
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-black text-rose-600 underline ml-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-black uppercase text-black/70">
            <span>Showing {filteredQuestions.length} Questions</span>
            <span>In-Browser PGLite Database Evaluation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredQuestions.map((q) => {
              const isSolved = Boolean(solvedMap[q.id]);
              const tierBadge =
                q.difficulty === "Easy"
                  ? { label: "Level 1: Basic", color: "bg-emerald-300 text-black border-black" }
                  : q.difficulty === "Medium"
                  ? { label: "Level 2: Intermediate", color: "bg-amber-300 text-black border-black" }
                  : { label: "Level 3: Advanced", color: "bg-rose-500 text-white border-black" };

              return (
                <div
                  key={q.id}
                  className={`bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] ${
                    isSolved ? "border-emerald-600 bg-[#F4FBF7]" : ""
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header: Tier + Company */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 ${tierBadge.color}`}>
                        {tierBadge.label}
                      </span>
                      <div className="flex items-center gap-1">
                        {q.companies.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-black bg-slate-100 border border-black px-1.5 py-0.5 rounded"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-base leading-snug line-clamp-2">
                      {q.title}
                    </h3>

                    {/* Topic Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {q.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-bold bg-[#FAF8F5] border border-black/40 text-black px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between">
                    {isSolved ? (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" /> Solved
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-bold text-black/60">
                        {q.category}
                      </span>
                    )}

                    <Link
                      href={`/interview/${q.id}`}
                      className="px-3.5 py-1.5 bg-[#FFE600] text-black border-2 border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#FDD835] flex items-center gap-1 transition-transform"
                    >
                      <Play className="w-3 h-3 fill-black" />
                      <span>Solve Query</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
