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
  BookOpen
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackLink from "@/components/FeedbackLink";
import { INTERVIEW_QUESTIONS, INTERVIEW_COMPANIES, INTERVIEW_CATEGORIES } from "@/lib/content/interview-questions";

export default function InterviewPrepCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
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

      // Company
      const matchesCompany =
        selectedCompany === "All" || q.companies.includes(selectedCompany);

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

      // Category
      const matchesCategory =
        selectedCategory === "All" || q.category === selectedCategory;

      return matchesSearch && matchesCompany && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedCompany, selectedDifficulty, selectedCategory]);

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
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)] hover:opacity-90 transition-opacity"
            >
              <Building2 className="w-5 h-5 text-[var(--ink)]" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[var(--ink)]">
                  SQL INTERVIEW PREP
                </span>
                <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  MAANG Edition
                </span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-75 font-medium">
                Real Technical Interview Challenges &amp; Company Screenings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPlaybook(!showPlaybook)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--sun)] text-xs font-extrabold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>30-Day Game Plan</span>
            </button>
            <ThemeToggle />
            <FeedbackLink variant="button" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* 30-Day Strategy Playbook Banner / Drawer */}
        {showPlaybook && (
          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[4px_4px_0px_var(--ink)] animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--sky)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--ocean)] border border-[var(--ink)] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[var(--ink)]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[var(--ink)]">
                    The 30-Day Data Analyst SQL Interview Playbook
                  </h3>
                  <p className="text-xs text-[var(--ink)] opacity-75">
                    How to move from syntax beginner to cracking technical screens in 4 weeks.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPlaybook(false)}
                className="text-xs font-bold text-[var(--ink)] opacity-60 hover:opacity-100"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
              <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Week 1: Foundations
                </span>
                <h4 className="font-extrabold text-sm mt-2 text-[var(--ink)]">
                  Aggregations & Multi-Joins
                </h4>
                <ul className="text-xs text-[var(--ink)] opacity-80 mt-2 space-y-1 list-disc list-inside">
                  <li>CASE WHEN inside SUM/COUNT</li>
                  <li>Multi-table LEFT JOINs</li>
                  <li>Preventing integer division</li>
                  <li>NULLs with NOT IN vs EXISTS</li>
                </ul>
              </div>

              <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Week 2: The Filter
                </span>
                <h4 className="font-extrabold text-sm mt-2 text-[var(--ink)]">
                  Window Functions Mastery
                </h4>
                <ul className="text-xs text-[var(--ink)] opacity-80 mt-2 space-y-1 list-disc list-inside">
                  <li>DENSE_RANK vs RANK vs ROW_NUMBER</li>
                  <li>Partitioning & Top-N per group</li>
                  <li>LEAD & LAG for time deltas</li>
                  <li>ROWS BETWEEN frame clauses</li>
                </ul>
              </div>

              <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Week 3: Business Metrics
                </span>
                <h4 className="font-extrabold text-sm mt-2 text-[var(--ink)]">
                  Cohorts & Advanced Logic
                </h4>
                <ul className="text-xs text-[var(--ink)] opacity-80 mt-2 space-y-1 list-disc list-inside">
                  <li>Day 1 / Day 30 Retention Cohorts</li>
                  <li>Gaps & Islands (Active streaks)</li>
                  <li>Sessionization with time gaps</li>
                  <li>Month-over-Month (MoM) growth</li>
                </ul>
              </div>

              <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  Week 4: Mock Readiness
                </span>
                <h4 className="font-extrabold text-sm mt-2 text-[var(--ink)]">
                  Speed & Communication
                </h4>
                <ul className="text-xs text-[var(--ink)] opacity-80 mt-2 space-y-1 list-disc list-inside">
                  <li>Timed 25-min mock challenges</li>
                  <li>Verbalizing query architecture aloud</li>
                  <li>Clarifying edge cases upfront</li>
                  <li>Handling ties and NULL defense</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sun)] border border-[var(--ink)] text-xs font-black text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Real MAANG & Tier-1 Startup Questions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
              Crush Your Data Analyst SQL Technical Interviews
            </h1>
            <p className="text-sm text-[var(--ink)] opacity-80 leading-relaxed">
              No more trivial syntax drills. Practice the actual algorithmic SQL challenges asked at 
              <span className="font-extrabold text-[var(--ink)]"> Meta, Amazon, Google, Uber, Netflix, Stripe, and Walmart</span>. 
              Run against realistic databases in our client-side PostgreSQL engine and get instant row-by-row verification.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[var(--mist)] border-2 border-[var(--ink)] rounded-xl p-5 shrink-0 w-full md:w-80 shadow-[3px_3px_0px_var(--ink)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)]">
                Interview Readiness
              </span>
              <span className="text-xs font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                {solvedPct}% Complete
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full bg-[var(--white)] border border-[var(--ink)] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[var(--ocean)] h-full transition-all duration-300"
                style={{ width: `${solvedPct}%` }}
              />
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-[var(--white)] border border-[var(--sky)] rounded-lg p-2">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">Easy</span>
                <span className="text-xs font-black text-[var(--ink)]">{easySolved}/{easyTotal}</span>
              </div>
              <div className="bg-[var(--white)] border border-[var(--sky)] rounded-lg p-2">
                <span className="text-[10px] font-extrabold text-amber-600 uppercase block">Medium</span>
                <span className="text-xs font-black text-[var(--ink)]">{medSolved}/{medTotal}</span>
              </div>
              <div className="bg-[var(--white)] border border-[var(--sky)] rounded-lg p-2">
                <span className="text-[10px] font-extrabold text-red-600 uppercase block">Hard</span>
                <span className="text-xs font-black text-[var(--ink)]">{hardSolved}/{hardTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink)] opacity-50" />
              <input
                type="text"
                placeholder="Search challenges by title, topic (e.g. 'DENSE_RANK', 'Retention', 'Rolling')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[var(--surface)] border border-[var(--sky)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ocean)] text-[var(--ink)] font-medium"
              />
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedCompany !== "All" || selectedDifficulty !== "All" || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCompany("All");
                  setSelectedDifficulty("All");
                  setSelectedCategory("All");
                }}
                className="flex items-center gap-1 text-xs font-bold text-[var(--ink)] opacity-70 hover:opacity-100 px-3 py-2 border border-[var(--sky)] rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--sky)]">
            <span className="text-xs font-black text-[var(--ink)] mr-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> Company:
            </span>
            {["All", ...INTERVIEW_COMPANIES].map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`text-xs font-extrabold px-3 py-1 rounded-full border transition-all ${
                  selectedCompany === comp
                    ? "bg-[var(--ink)] text-[var(--white)] border-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]"
                    : "bg-[var(--surface)] text-[var(--ink)] border-[var(--sky)] hover:bg-[var(--mist)]"
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--sky)]">
            <span className="text-xs font-black text-[var(--ink)] mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`text-xs font-extrabold px-3 py-1 rounded-full border transition-all ${
                  selectedDifficulty === diff
                    ? "bg-[var(--ink)] text-[var(--white)] border-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]"
                    : diff === "Easy"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : diff === "Medium"
                    ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                    : diff === "Hard"
                    ? "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                    : "bg-[var(--surface)] text-[var(--ink)] border-[var(--sky)]"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl overflow-hidden shadow-[4px_4px_0px_var(--ink)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--mist)] border-b-2 border-[var(--ink)] text-[11px] font-black uppercase tracking-wider text-[var(--ink)]">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Problem Title</th>
                  <th className="py-3 px-4">Companies</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sky)] text-xs">
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm font-bold text-[var(--ink)] opacity-60">
                      No interview questions matched your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.map((q) => {
                    const isSolved = Boolean(solvedMap[q.id]);
                    return (
                      <tr
                        key={q.id}
                        className="hover:bg-[var(--mist)] transition-colors group"
                      >
                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline-block" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                          )}
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4 font-bold text-[var(--ink)]">
                          <Link
                            href={`/interview/${q.id}`}
                            className="hover:underline flex items-center gap-1.5"
                          >
                            <span>{q.title}</span>
                          </Link>
                          <div className="flex items-center gap-1.5 mt-1">
                            {q.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="text-[10px] bg-[var(--surface)] text-[var(--ink)] opacity-80 px-1.5 py-0.5 rounded border border-[var(--sky)]"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Companies */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {q.companies.map((c) => (
                              <span
                                key={c}
                                className="text-[10px] font-extrabold bg-[var(--mist)] text-[var(--ink)] px-2 py-0.5 rounded border border-[var(--sky)]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 font-medium text-[var(--ink)] opacity-90">
                          {q.category}
                        </td>

                        {/* Difficulty */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              q.difficulty === "Easy"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : q.difficulty === "Medium"
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : "bg-red-50 text-red-700 border-red-300"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/interview/${q.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--ocean)] hover:bg-[var(--ocean-hover)] text-xs font-black text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                          >
                            <span>{isSolved ? "Solve Again" : "Solve Challenge"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

