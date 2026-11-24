"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Database,
  Layers,
  Zap,
  Flame,
  Award,
  Search,
  Filter,
  Trophy,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { INTERVIEW_QUESTIONS, INTERVIEW_COMPANIES, INTERVIEW_CATEGORIES } from "@/lib/content/interview-questions";
import {
  BASIC_STAGES,
  SKILL_TRACKS,
  SkillTrack,
  getQuestionSkillTrack,
} from "@/lib/interview/sql-learning-helpers";

export default function InterviewPrepCatalogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedSkillTrack, setSelectedSkillTrack] = useState<string>("All");
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});
  const [metaMap, setMetaMap] = useState<Record<string, { attempts?: number; usedHintOrSolution?: boolean }>>({});
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Authentication gate: redirect to signup if unauthenticated
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data?.authenticated) {
          router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => {
        router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
      });
  }, [router]);

  // Load solved map and tier query from URL
  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const stored = localStorage.getItem(`sql_office_${currentUserId}_interview_solved`);
      if (stored) {
        setSolvedMap(JSON.parse(stored));
      }
      const storedMeta = localStorage.getItem(`sql_office_${currentUserId}_interview_meta`);
      if (storedMeta) {
        setMetaMap(JSON.parse(storedMeta));
      }
      const lastQ = localStorage.getItem(`sql_office_${currentUserId}_interview_last_question`);
      if (lastQ) {
        setLastQuestionId(lastQ);
      }

      // Pre-select tier if present in URL
      // Pre-select tier, skill, or stage if present in URL
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const tierParam = urlParams.get("tier");
        if (tierParam) {
          if (tierParam.includes("1") || tierParam.toLowerCase().includes("basic")) {
            setSelectedTier("Level 1: Basic");
          } else if (tierParam.includes("2") || tierParam.toLowerCase().includes("inter")) {
            setSelectedTier("Level 2: Intermediate");
          } else if (tierParam.includes("3") || tierParam.toLowerCase().includes("adv")) {
            setSelectedTier("Level 3: Advanced");
          }
        }
        const skillParam = urlParams.get("skill");
        if (skillParam && SKILL_TRACKS.includes(skillParam as SkillTrack)) {
          setSelectedSkillTrack(skillParam);
        }
        const stageParam = urlParams.get("stage");
        if (stageParam) {
          setSelectedStage(stageParam);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Determine the continue question (last question solving or next question in sequence)
  const continueQuestion = useMemo(() => {
    if (lastQuestionId) {
      const lastQ = INTERVIEW_QUESTIONS.find(
        (q) => q.id.toLowerCase() === lastQuestionId.toLowerCase()
      );
      if (lastQ) {
        // If the user hasn't solved it yet, resume solving it
        if (!solvedMap[lastQ.id]) {
          return { question: lastQ, status: "in-progress" as const };
        }
        // If solved, automatically direct to the next question in sequence
        const idx = INTERVIEW_QUESTIONS.findIndex((q) => q.id === lastQ.id);
        if (idx >= 0 && idx < INTERVIEW_QUESTIONS.length - 1) {
          return { question: INTERVIEW_QUESTIONS[idx + 1], status: "next" as const };
        }
      }
    }

    // Otherwise find the first unsolved question
    const firstUnsolved = INTERVIEW_QUESTIONS.find((q) => !solvedMap[q.id]);
    if (firstUnsolved) {
      const isStart =
        firstUnsolved.id === INTERVIEW_QUESTIONS[0].id &&
        Object.keys(solvedMap).filter((k) => solvedMap[k]).length === 0;
      return { question: firstUnsolved, status: isStart ? ("start" as const) : ("next" as const) };
    }

    return null;
  }, [lastQuestionId, solvedMap]);

  const filteredQuestions = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase().replace(/^#/, "");
    return INTERVIEW_QUESTIONS.filter((q) => {
      // Search
      const matchesSearch =
        cleanSearch === "" ||
        q.title.toLowerCase().includes(cleanSearch) ||
        String(q.number || "").includes(cleanSearch) ||
        (q.stage && q.stage.toLowerCase().includes(cleanSearch)) ||
        (q.patternTag && q.patternTag.toLowerCase().includes(cleanSearch)) ||
        q.topics.some((t) => t.toLowerCase().includes(cleanSearch)) ||
        q.companies.some((c) => c.toLowerCase().includes(cleanSearch));

      // Tier:
      // Level 1: Basic (Easy) - 100 questions
      // Level 2: Intermediate (Medium) - 100 questions
      // Level 3: Advanced (Hard) - 100 questions
      const matchesTier =
        selectedTier === "All" ||
        (selectedTier === "Level 1: Basic" && q.difficulty === "Easy") ||
        (selectedTier === "Level 2: Intermediate" && q.difficulty === "Medium") ||
        (selectedTier === "Level 3: Advanced" && q.difficulty === "Hard");

      // Company
      const matchesCompany =
        selectedCompany === "All" || q.companies.includes(selectedCompany);

      // Category
      const matchesCategory =
        selectedCategory === "All" || q.category === selectedCategory;

      return matchesSearch && matchesTier && matchesCompany && matchesCategory;
      // Curriculum Stage
      const matchesStage =
        selectedStage === "All" || q.stage === selectedStage;

      // Skill Track
      const matchesSkill =
        selectedSkillTrack === "All" || getQuestionSkillTrack(q) === selectedSkillTrack;

      return (
        matchesSearch &&
        matchesTier &&
        matchesCompany &&
        matchesCategory &&
        matchesStage &&
        matchesSkill
      );
    });
  }, [searchQuery, selectedTier, selectedCompany, selectedCategory]);
}, [searchQuery, selectedTier, selectedCompany, selectedCategory, selectedStage, selectedSkillTrack]);

const totalQuestions = INTERVIEW_QUESTIONS.length;
const solvedCount = Object.keys(solvedMap).filter((k) => solvedMap[k]).length;
const solvedPct = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

const easyTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Easy").length;
const easySolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Easy" && solvedMap[q.id]).length;

const medTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Medium").length;
const medSolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Medium" && solvedMap[q.id]).length;

const hardTotal = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Hard").length;
const hardSolved = INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "Hard" && solvedMap[q.id]).length;

const skillStats = useMemo(() => {
  return SKILL_TRACKS.map((track) => {
    const qs = INTERVIEW_QUESTIONS.filter((q) => getQuestionSkillTrack(q) === track);
    const solved = qs.filter((q) => solvedMap[q.id]).length;
    const struggled = qs.filter((q) => {
      const m = metaMap[q.id];
      return m && (m.usedHintOrSolution || (!solvedMap[q.id] && (m.attempts || 0) >= 2));
    }).length;
    const pct = qs.length > 0 ? Math.round((solved / qs.length) * 100) : 0;
    const nextUnsolved = qs.find((q) => !solvedMap[q.id]) || qs[0];
    return {
      track,
      total: qs.length,
      solved,
      struggled,
      pct,
      nextQuestionId: nextUnsolved?.id || "basic-001",
    };
  });
}, [solvedMap, metaMap]);

const weakestSkill = useMemo(() => {
  const candidates = skillStats.filter((s) => s.solved < s.total);
  if (candidates.length === 0) return skillStats[0];
  return [...candidates].sort((a, b) => {
    if (b.struggled !== a.struggled) return b.struggled - a.struggled;
    return a.pct - b.pct;
  })[0];
}, [skillStats]);

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
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/learn"
              className="px-3 py-1.5 rounded-lg border-2 border-black bg-[#FFF9D2] hover:bg-[#FFE600] text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>SQL Academy (100 Qs)</span>
            </Link>

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

            <FeedbackLink variant="button" />
          </div>
        </div>
    </header>

    {/* Main Container */}
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
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

      {/* Skill Mastery Matrix + Weak-Spot Drill */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <h2 className="font-black text-sm sm:text-base uppercase tracking-tight">
                8-Track SQL Skill Mastery (Basic → Advanced Spiral)
              </h2>
            </div>
            <p className="text-xs text-black/70 font-medium mt-0.5">
              Level 1 Basic now teaches foundations of Subqueries, CTEs, Window Functions, and Frame Clauses before ramping into Intermediate &amp; Advanced.
            </p>
          </div>
          {weakestSkill && (
            <Link
              href={`/interview/${weakestSkill.nextQuestionId}`}
              className="px-3.5 py-2 rounded-xl border-2 border-black bg-[#FFDF00] hover:bg-[#FDD835] text-black text-xs font-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 shrink-0 transition-transform hover:-translate-y-0.5"
            >
              <Target className="w-3.5 h-3.5 text-rose-700" />
              <span>Drill Focus: {weakestSkill.track}</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {skillStats.map((s) => {
            const isSelected = selectedSkillTrack === s.track;
            return (
              <button
                key={s.track}
                type="button"
                onClick={() =>
                  setSelectedSkillTrack(isSelected ? "All" : s.track)
                }
                className={`text-left p-2.5 rounded-xl border-2 border-black transition-all ${isSelected
                  ? "bg-[#FFE600] shadow-[2px_2px_0px_#000000] -translate-y-0.5"
                  : "bg-[#FAF8F5] hover:bg-[#FFF9D2]"
                  }`}
              >
                <div className="flex items-center justify-between text-[10px] font-black mb-1">
                  <span className="truncate">{s.track}</span>
                </div>
                <div className="w-full h-1.5 bg-white border border-black rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-[#00E599]"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-black/75">
                  <span>{s.solved}/{s.total}</span>
                  <span>{s.pct}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-3 bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000]">
        {/* Top row: Search and Tier Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Tier Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { label: `All Tiers (${totalQuestions})`, val: "All" },
              { label: `Level 1: Basic (${easyTotal} Qs)`, val: "Level 1: Basic" },
              { label: `Level 2: Intermediate (${medTotal} Qs)`, val: "Level 2: Intermediate" },
              { label: `Level 3: Advanced (${hardTotal} Qs)`, val: "Level 3: Advanced" },
            ].map((tier) => (
              <button
                key={tier.val}
                onClick={() => setSelectedTier(tier.val)}
                onClick={() => {
                  setSelectedTier(tier.val);
                  if (tier.val !== "Level 1: Basic" && tier.val !== "All") {
                    setSelectedStage("All");
                  }
                }}
                className={`px-3.5 py-2 rounded-lg border-2 border-black text-xs font-black uppercase whitespace-nowrap transition-all ${selectedTier === tier.val
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
              placeholder="Search by topic, pattern, stage, or company..."
              className="w-full pl-9 pr-3 py-2 bg-white border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[2px_2px_0px_#000000]"
            />
          </div>
        </div>

        {/* Sub Filters: Company & Category */}
        {/* Basic 10-Stage Spiral Selector (when viewing Basic or All) */}
        {(selectedTier === "Level 1: Basic" || selectedTier === "All") && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t-2 border-black/10 pb-1">
            <span className="text-[10px] font-black uppercase text-black/60 shrink-0 mr-1">
              Basic 10-Stage Path:
            </span>
            <button
              type="button"
              onClick={() => setSelectedStage("All")}
              className={`px-2 py-1 rounded border text-[10px] font-black whitespace-nowrap ${selectedStage === "All"
                ? "bg-black text-white border-black"
                : "bg-white border-black/30 hover:border-black"
                }`}
            >
              All Stages
            </button>
            {BASIC_STAGES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setSelectedTier("Level 1: Basic");
                  setSelectedStage(selectedStage === st.id ? "All" : st.id);
                }}
                className={`px-2 py-1 rounded border text-[10px] font-black whitespace-nowrap transition-colors ${selectedStage === st.id
                  ? "bg-[#E3F2FD] text-black border-black shadow-[1px_1px_0px_#000]"
                  : "bg-[#FAF8F5] text-black/80 border-black/30 hover:border-black"
                  }`}
              >
                {st.shortLabel} ({st.range})
              </button>
            ))}
          </div>
        )}

        {/* Sub Filters: Company, Category, Skill Track */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t-2 border-black/10 text-xs">
          {/* Skill Track Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="font-black uppercase text-black/60">Skill:</span>
            <select
              value={selectedSkillTrack}
              onChange={(e) => setSelectedSkillTrack(e.target.value)}
              className="px-2.5 py-1.5 bg-[#FAF8F5] border-2 border-black rounded-lg text-xs font-black shadow-[1px_1px_0px_#000000]"
            >
              <option value="All">All 8 Skills</option>
              {SKILL_TRACKS.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>

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
            {(selectedTier !== "All" ||
              selectedCompany !== "All" ||
              selectedCategory !== "All" ||
              selectedStage !== "All" ||
              selectedSkillTrack !== "All" ||
              searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedTier("All");
                  setSelectedCompany("All");
                  setSelectedCategory("All");
                  setSelectedStage("All");
                  setSelectedSkillTrack("All");
                  setSearchQuery("");
                }}
                className="text-xs font-black text-rose-600 underline ml-auto"
              >
                Reset All Filters
              </button>
            )}
        </div>
      </div>

      {/* Continue Practicing Card (Directs to last active / next unsolved question) */}
      {continueQuestion && (
        <div className="bg-gradient-to-r from-[#FFFDF0] via-white to-[#F0FFF8] border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE600] border-2 border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000000]">
                <Play className="w-3 h-3 fill-black text-black" />
                <span>
                  {continueQuestion.status === "in-progress"
                    ? "Resume Solving"
                    : continueQuestion.status === "start"
                      ? "Start Here"
                      : "Next Question Up"}
                </span>
              </span>
              <span className="text-xs font-black text-black/60 font-mono">
                Question #{continueQuestion.question.number || (INTERVIEW_QUESTIONS.indexOf(continueQuestion.question) + 1)}
              </span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${continueQuestion.question.difficulty === "Easy"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                  : continueQuestion.question.difficulty === "Medium"
                    ? "bg-amber-100 text-amber-800 border-amber-400"
                    : "bg-rose-100 text-rose-800 border-rose-400"
                  }`}
              >
                {continueQuestion.question.difficulty}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-black text-black leading-snug">
              {continueQuestion.question.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/70">
              <span>{continueQuestion.question.companies.slice(0, 3).join(", ")}</span>
              <span>•</span>
              <span>{continueQuestion.question.category}</span>
              <span>•</span>
              <span className="text-black/50">
                {continueQuestion.status === "in-progress"
                  ? "Pick up right where you left off"
                  : "Ready for your next challenge"}
              </span>
            </div>
          </div>

          <Link
            href={`/interview/${continueQuestion.question.id}`}
            className="px-6 py-3.5 bg-[#00E599] hover:bg-[#00D084] text-black border-2 border-black rounded-xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-2 shrink-0 transition-all uppercase tracking-wider"
          >
            <span>Continue Solving</span>
            <Play className="w-4 h-4 fill-black text-black" />
          </Link>
        </div>
      )}

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
                className={`bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] ${isSolved ? "border-emerald-600 bg-[#F4FBF7]" : ""
                  }`}
              >
                <div className="space-y-3">
                  {/* Header: Tier + Company */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-black bg-black text-white px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                        #{q.number || (INTERVIEW_QUESTIONS.indexOf(q) + 1)}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 ${tierBadge.color}`}>
                        {tierBadge.label}
                      </span>
                    </div>
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
                  {/* Stage / RampStep / Topic Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {q.stage && (
                      <span className="text-[10px] font-black bg-[#E3F2FD] border border-black/60 text-black px-1.5 py-0.5 rounded">
                        {q.stage.split(":")[0]}
                      </span>
                    )}
                    {q.rampStep && (
                      <span className="text-[10px] font-black bg-[#FFF9D2] border border-black/50 text-black px-1.5 py-0.5 rounded">
                        {q.rampStep}
                      </span>
                    )}
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
