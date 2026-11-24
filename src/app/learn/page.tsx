"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Award,
  AlertCircle,
  Code2,
  HelpCircle,
  Eye,
  Check,
  Database,
  Layers,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { updateStreak } from "@/lib/gamification/gamification-service";
import { LEARNING_QUESTIONS, LEARNING_LEVELS } from "@/lib/content/learning-curriculum";
import { extractCtesFromSql, buildCtePreviewSql } from "@/lib/interview/sql-learning-helpers";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-44 w-full bg-[#1e1e1e] text-slate-300 flex items-center justify-center font-mono text-xs">
      Loading SQL Editor...
    </div>
  ),
});

const ACADEMY_TABLES = [
  { name: "products", cols: "id, name, category_id, price, cost, stock_quantity" },
  { name: "categories", cols: "id, name, department_id" },
  { name: "departments", cols: "id, name, head_name" },
  { name: "customers", cols: "id, first_name, last_name, email, region, created_at" },
  { name: "orders", cols: "id, customer_id, status, total_amount, shipping_fee, order_date" },
  { name: "order_items", cols: "id, order_id, product_id, quantity, unit_price" },
  { name: "shipments", cols: "id, order_id, carrier, tracking_number, shipped_at, delivered_at" },
  { name: "returns", cols: "id, order_id, product_id, reason, refund_amount, status" },
  { name: "coupons", cols: "id, code, discount_percent, max_uses, current_uses, is_active" },
  { name: "customer_reviews", cols: "id, customer_id, product_id, rating, title, is_verified_purchase, review_date" },
  { name: "inventory", cols: "id, product_id, warehouse_id, quantity_on_hand, reserved_quantity" },
  { name: "support_tickets", cols: "id, customer_id, order_id, category, priority, status, created_at" },
];

export default function LearnAcademyPage() {
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [userSql, setUserSql] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [solvedMap, setSolvedMap] = useState<Record<number, boolean>>({});
  const [activeCteLabel, setActiveCteLabel] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<{
    success: boolean;
    columns: string[];
    rows: Record<string, unknown>[];
    expectedPreview?: Record<string, unknown>[];
    message: string;
    isCorrect?: boolean;
    durationMs?: number;
  } | null>(null);

  const levelQuestions = LEARNING_QUESTIONS.filter((q) => q.level === activeLevel);
  const currentQuestion =
    LEARNING_QUESTIONS.find((q) => q.id === selectedQuestionId) || levelQuestions[0] || LEARNING_QUESTIONS[0];

  const parsedCtes = useMemo(() => extractCtesFromSql(userSql).ctes, [userSql]);

  const submitRef = useRef<(mode: "run" | "submit", overrideSql?: string, cteLabel?: string | null) => void>(() => {});

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
        const stored = localStorage.getItem(`sql_office_${currentUserId}_academy_solved`);
        if (stored) {
          setSolvedMap(JSON.parse(stored));
        }
      } catch {
        // Ignore
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setUserSql(currentQuestion.starterSql);
      setRunResult(null);
      setShowHint(false);
      setShowSolution(false);
      setActiveCteLabel(null);
    });
    return () => {
      cancelled = true;
    };
  }, [currentQuestion]);

  const solvedCount = Object.keys(solvedMap).filter((k) => solvedMap[Number(k)]).length;
  const progressPct = Math.min(100, Math.round((solvedCount / 100) * 100));

  const executeQuery = async (mode: "run" | "submit", overrideSql?: string, cteLabel?: string | null) => {
    setIsRunning(true);
    setRunResult(null);
    setActiveCteLabel(cteLabel ?? null);
    try {
      const res = await fetch("/api/learn/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          sql: overrideSql ?? userSql,
          mode,
        }),
      });
      const data = await res.json();

      if (data.error && !data.message) {
        setRunResult({
          success: false,
          columns: [],
          rows: [],
          message: data.error,
          isCorrect: false,
        });
      } else {
        if (mode === "submit" && data.isCorrect) {
          const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
          const updated = { ...solvedMap, [currentQuestion.id]: true };
          setSolvedMap(updated);
          localStorage.setItem(`sql_office_${currentUserId}_academy_solved`, JSON.stringify(updated));

          fetch("/api/user/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "academy",
              questionId: currentQuestion.id,
              xpEarned: 10,
            }),
          }).catch(() => {});

          try {
            const statsKey = `sql_office_${currentUserId}_user_stats`;
            const stats = JSON.parse(localStorage.getItem(statsKey) || '{"xp":0,"streak":1,"solvedCount":0}');
            stats.xp = (stats.xp || 0) + 10;
            stats.solvedCount = (stats.solvedCount || 0) + 1;

            const streakResult = updateStreak(
              stats.streak || 1,
              stats.longestStreak || stats.streak || 1,
              stats.lastActiveDate,
              { totalXp: stats.xp, activeDates: stats.activeDates }
            );
            stats.streak = streakResult.currentStreak;
            stats.longestStreak = streakResult.longestStreak;
            stats.lastActiveDate = streakResult.lastActiveDate;
            stats.activeDates = streakResult.activeDates;
            localStorage.setItem(statsKey, JSON.stringify(stats));
          } catch {
            // Ignore
          }
        }

        setRunResult({
          success: Boolean(data.success),
          columns: data.columns || [],
          rows: data.rows || [],
          expectedPreview: data.expectedPreview,
          durationMs: data.durationMs || 10,
          isCorrect: Boolean(data.isCorrect),
          message: data.message || "Query executed.",
        });
      }
    } catch (err: unknown) {
      setRunResult({
        success: false,
        columns: [],
        rows: [],
        message: err instanceof Error ? err.message : "Execution failed.",
        isCorrect: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    submitRef.current = executeQuery;
  });

  const handlePreviewCte = (cteName: string) => {
    const previewSql = buildCtePreviewSql(userSql, cteName);
    if (previewSql) {
      executeQuery("run", previewSql, cteName);
    }
  };

  const goToLesson = (id: number) => {
    const target = LEARNING_QUESTIONS.find((q) => q.id === id);
    if (!target) return;
    setActiveLevel(target.level);
    setSelectedQuestionId(target.id);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--ink)] px-4 sm:px-8 py-3.5 shadow-[0px_4px_0px_var(--ink)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--paper-beige)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all flex items-center gap-1.5 text-xs font-black"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-[2px] bg-[var(--ink)]" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-teal)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <BookOpen className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <h1 className="font-black text-base tracking-tight text-[var(--ink)]">
                  SQL ACADEMY (100 INTERACTIVE LESSONS)
                </h1>
                <p className="text-[11px] font-bold text-[var(--ink)] opacity-75">
                  Concept-first syntax drills from SELECT to CTEs, Window Frames &amp; Engineering
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/interview"
              className="btn-primary text-xs py-2 px-4 shadow-[2px_2px_0px_var(--ink)] flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>300 Interview Qs</span>
              <ChevronRight className="w-4 h-4 text-[var(--ink)]" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full flex-1 p-4 sm:p-8 space-y-6">
        {/* Progress Bar */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-5 shadow-[6px_6px_0px_var(--ink)] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <Award className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[var(--ink)] opacity-70">
                  SQL ACADEMY MASTERY PROGRESS
                </div>
                <h3 className="text-lg font-black text-[var(--ink)]">
                  {solvedCount} / 100 Lessons Verified ({solvedCount * 10} XP Earned)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSchema((s) => !s)}
                className="px-3 py-1.5 bg-[var(--white)] hover:bg-[var(--paper-beige)] border-2 border-[var(--ink)] text-xs font-black rounded-lg shadow-[2px_2px_0px_var(--ink)] flex items-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{showSchema ? "Hide Tables" : "E-Commerce Tables"}</span>
              </button>
              <span className="px-3 py-1.5 bg-[var(--accent-teal)] border-2 border-[var(--ink)] text-xs font-black rounded-lg shadow-[2px_2px_0px_var(--ink)]">
                {progressPct}% COMPLETE
              </span>
            </div>
          </div>

          <div className="w-full h-4 bg-[var(--paper-beige)] border-2 border-[var(--ink)] rounded-lg overflow-hidden shadow-[2px_2px_0px_var(--ink)] p-0.5">
            <div
              className="h-full bg-[var(--accent-teal)] rounded-sm border-r-2 border-[var(--ink)] transition-all duration-300"
              style={{ width: `${Math.max(solvedCount > 0 ? 3 : 0, progressPct)}%` }}
            />
          </div>

          {showSchema && (
            <div className="pt-3 border-t-2 border-[var(--ink)]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {ACADEMY_TABLES.map((t) => (
                <div key={t.name} className="p-2.5 rounded-lg border border-[var(--ink)] bg-[var(--paper-beige)] text-[11px] font-mono">
                  <div className="font-black text-[var(--ink)]">{t.name}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{t.cols}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Level Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LEARNING_LEVELS.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
            const lvlSolved = LEARNING_QUESTIONS.filter((q) => q.level === lvl.level && solvedMap[q.id]).length;
            return (
              <button
                key={lvl.level}
                onClick={() => {
                  setActiveLevel(lvl.level);
                  const firstOfLvl = LEARNING_QUESTIONS.find((q) => q.level === lvl.level);
                  if (firstOfLvl) setSelectedQuestionId(firstOfLvl.id);
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "bg-[var(--sun)] border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)] font-black"
                    : "bg-[var(--white)] border-[var(--ink)] hover:bg-[var(--paper-beige)] shadow-[2px_2px_0px_var(--ink)] font-bold"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[var(--ink)] uppercase">Level {lvl.level}</span>
                  <span className="text-[10px] font-mono bg-white/80 px-1.5 rounded border border-black/30">
                    {lvlSolved}/20
                  </span>
                </div>
                <div className="text-[11px] text-[var(--ink)] opacity-80 mt-0.5 truncate">{lvl.name.replace(/^Level \d+:\s*/, "")}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-4 bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-4 shadow-[6px_6px_0px_var(--ink)] space-y-3 max-h-[800px] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5">
              <span className="text-xs font-black uppercase text-[var(--ink)] flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[var(--accent-teal)]" />
                <span>Level {activeLevel} Lessons</span>
              </span>
              <span className="text-[10px] font-black bg-[var(--paper-beige)] border border-[var(--ink)] px-2 py-0.5 rounded">
                {levelQuestions.length} Lessons
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {levelQuestions.map((q) => {
                const isSelected = q.id === currentQuestion.id;
                const isSolved = solvedMap[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-[var(--accent-teal)] border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] text-[var(--ink)] font-black"
                        : "bg-[var(--white)] border-[var(--ink)] hover:bg-[var(--paper-beige)] text-[var(--ink)] font-bold shadow-[2px_2px_0px_var(--ink)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-6 h-6 rounded bg-[var(--white)] border border-[var(--ink)] flex items-center justify-center text-[10px] font-mono shrink-0">
                        {q.id}
                      </span>
                      <span className="text-xs truncate">{q.title.replace(/^\d+\.\s*/, "")}</span>
                    </div>

                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 bg-[var(--white)] border border-[var(--ink)] rounded shrink-0 font-mono">
                        {q.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[6px_6px_0px_var(--ink)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)] pb-3">
                <div>
                  <span className="px-2.5 py-0.5 bg-[var(--sun)] border border-[var(--ink)] text-[11px] font-black rounded-full">
                    {currentQuestion.topic}
                  </span>
                  <h2 className="text-xl font-black text-[var(--ink)] mt-1.5">{currentQuestion.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {solvedMap[currentQuestion.id] && (
                    <span className="px-2.5 py-1 bg-emerald-100 border-2 border-[var(--ink)] text-emerald-900 text-xs font-black rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Verified (+10 XP)
                    </span>
                  )}
                  <button
                    onClick={() => goToLesson(currentQuestion.id - 1)}
                    disabled={currentQuestion.id <= 1}
                    className="p-1.5 rounded-lg border-2 border-[var(--ink)] bg-white disabled:opacity-40"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToLesson(currentQuestion.id + 1)}
                    disabled={currentQuestion.id >= LEARNING_QUESTIONS.length}
                    className="p-1.5 rounded-lg border-2 border-[var(--ink)] bg-white disabled:opacity-40"
                    title="Next Lesson"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[var(--paper-beige)] border-2 border-[var(--ink)] p-3.5 rounded-xl text-xs font-bold text-[var(--ink)] leading-relaxed shadow-[2px_2px_0px_var(--ink)]">
                {currentQuestion.conceptSummary}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase text-[var(--ink)] opacity-75">
                  Syntax Pattern Example:
                </span>
                <pre className="font-mono text-xs bg-[#1E293B] text-slate-100 p-3 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] overflow-x-auto whitespace-pre-wrap">
                  {currentQuestion.conceptExample}
                </pre>
              </div>

              <div className="bg-[#FFF4D2] border-2 border-[var(--ink)] p-4 rounded-xl shadow-[3px_3px_0px_var(--ink)] space-y-2.5">
                <div className="text-xs font-black uppercase text-[var(--ink)] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--ink)]" />
                  <span>Your Practice Challenge:</span>
                </div>
                <p className="text-xs font-extrabold text-[var(--ink)] leading-snug">{currentQuestion.task}</p>
                {currentQuestion.expectedColumns?.length > 0 && (
                  <div className="pt-2 border-t border-[var(--ink)]/20 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-black uppercase text-[var(--ink)] opacity-75">
                      Required Columns ({currentQuestion.expectedColumns.length}):
                    </span>
                    {currentQuestion.expectedColumns.map((col) => (
                      <span
                        key={col}
                        className="px-2 py-0.5 bg-[var(--white)] border border-[var(--ink)] rounded text-[11px] font-mono font-bold text-[var(--ink)]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {currentQuestion.hint && (
                    <button
                      onClick={() => setShowHint((h) => !h)}
                      className="px-2.5 py-1 rounded-lg border border-black bg-white text-[11px] font-black flex items-center gap-1 hover:bg-slate-50"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{showHint ? "Hide Hint" : "Show Hint"}</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowSolution((s) => !s)}
                    className="px-2.5 py-1 rounded-lg border border-black bg-white text-[11px] font-black flex items-center gap-1 hover:bg-slate-50"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-600" />
                    <span>{showSolution ? "Hide Solution" : "Reveal Solution"}</span>
                  </button>
                </div>

                {showHint && currentQuestion.hint && (
                  <div className="p-2.5 bg-white border border-black rounded-lg text-xs font-bold">
                    💡 {currentQuestion.hint}
                  </div>
                )}

                {showSolution && (
                  <div className="space-y-1.5">
                    <pre className="font-mono text-[11px] bg-[#1e1e1e] text-emerald-300 p-3 rounded-lg border border-black overflow-x-auto whitespace-pre-wrap">
                      {currentQuestion.referenceSql}
                    </pre>
                    <button
                      onClick={() => setUserSql(currentQuestion.referenceSql)}
                      className="text-[11px] font-black underline text-purple-800"
                    >
                      Copy Solution to Editor
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Editor & Test Console */}
            <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_var(--ink)]">
              <div className="bg-[var(--sun)] border-b-2 border-[var(--ink)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black uppercase text-[var(--ink)]">
                    PostgreSQL Practice Editor
                  </span>
                  <span className="ml-2 text-[10px] font-mono opacity-75 hidden sm:inline">
                    Ctrl+Enter Run • Ctrl+Shift+Enter Verify
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setUserSql(currentQuestion.starterSql);
                      setRunResult(null);
                    }}
                    className="p-1.5 rounded-lg border border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--paper-beige)] text-xs font-bold text-[var(--ink)]"
                    title="Reset SQL"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => executeQuery("run")}
                    disabled={isRunning}
                    className="px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-white hover:bg-slate-50 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_var(--ink)]"
                  >
                    <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                    <span>Preview Output</span>
                  </button>
                  <button
                    onClick={() => executeQuery("submit")}
                    disabled={isRunning}
                    className="px-3.5 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_var(--ink)]"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{isRunning ? "Checking..." : "Check Answer"}</span>
                  </button>
                </div>
              </div>

              {/* CTE X-Ray Bar */}
              {parsedCtes.length > 0 && (
                <div className="bg-[#EEF7FF] border-b border-[var(--ink)]/30 px-3 py-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-black uppercase text-blue-900">CTE X-Ray:</span>
                  {parsedCtes.map((cte) => (
                    <button
                      key={cte.name}
                      onClick={() => handlePreviewCte(cte.name)}
                      className={`px-2 py-0.5 rounded border border-black font-mono font-bold transition-all ${
                        activeCteLabel === cte.name ? "bg-[#FFE600]" : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      Inspect {cte.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="h-44">
                <MonacoEditor
                  height="100%"
                  language="pgsql"
                  theme="vs-dark"
                  value={userSql}
                  onChange={(val) => setUserSql(val || "")}
                  onMount={(editor, monaco) => {
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                      submitRef.current("run");
                    });
                    editor.addCommand(
                      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
                      () => {
                        submitRef.current("submit");
                      }
                    );
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    padding: { top: 10, bottom: 10 },
                    automaticLayout: true,
                  }}
                />
              </div>

              {runResult && (
                <div className="border-t-2 border-[var(--ink)] p-4 space-y-3 bg-[var(--paper-beige)]">
                  <div
                    className={`p-3 rounded-xl border-2 border-[var(--ink)] text-xs font-black flex items-center justify-between gap-2 shadow-[2px_2px_0px_var(--ink)] ${
                      runResult.isCorrect
                        ? "bg-[#bbf7d0] text-emerald-950"
                        : runResult.success
                          ? "bg-[#fef9c3] text-amber-950"
                          : "bg-[#fecdd3] text-rose-950"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {runResult.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                      )}
                      <span>
                        {activeCteLabel ? `[CTE Preview: ${activeCteLabel}] ` : ""}
                        {runResult.message}
                      </span>
                    </div>
                    {runResult.isCorrect && currentQuestion.id < LEARNING_QUESTIONS.length && (
                      <button
                        onClick={() => goToLesson(currentQuestion.id + 1)}
                        className="px-3 py-1 bg-[#FFE600] text-black border border-black rounded-lg text-[11px] font-black flex items-center gap-1 shrink-0"
                      >
                        <span>Next Lesson</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {runResult.rows && runResult.rows.length > 0 && (
                    <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden bg-[var(--white)] shadow-[2px_2px_0px_var(--ink)]">
                      <div className="bg-[var(--white)] px-3 py-1.5 border-b-2 border-[var(--ink)] flex items-center justify-between text-[11px] font-black">
                        <span>Output Preview ({runResult.rows.length} rows)</span>
                        <span className="font-mono">{runResult.durationMs}ms</span>
                      </div>
                      <div className="overflow-x-auto max-h-52">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-[var(--paper-beige)] border-b-2 border-[var(--ink)]">
                            <tr>
                              {runResult.columns.map((col) => (
                                <th key={col} className="p-2 border-r border-[var(--ink)] last:border-r-0">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {runResult.rows.slice(0, 12).map((row, idx) => (
                              <tr key={idx} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                {runResult.columns.map((col) => (
                                  <td key={col} className="p-2 border-r border-slate-200 last:border-r-0">
                                    {String(row[col] ?? "NULL")}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {runResult.expectedPreview && runResult.expectedPreview.length > 0 && !runResult.isCorrect && (
                    <div className="border-2 border-emerald-700 rounded-xl overflow-hidden bg-emerald-50">
                      <div className="px-3 py-1.5 border-b border-emerald-700 text-[11px] font-black text-emerald-900">
                        Expected Target Output (First {runResult.expectedPreview.length} rows)
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] font-mono">
                          <thead className="bg-emerald-100 border-b border-emerald-300">
                            <tr>
                              {Object.keys(runResult.expectedPreview[0]).map((col) => (
                                <th key={col} className="p-2 border-r border-emerald-200 last:border-r-0">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {runResult.expectedPreview.map((row, idx) => (
                              <tr key={idx} className="border-b border-emerald-100 last:border-b-0">
                                {Object.keys(runResult.expectedPreview![0]).map((col) => (
                                  <td key={col} className="p-2 border-r border-emerald-100 last:border-r-0">
                                    {String(row[col] ?? "NULL")}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
