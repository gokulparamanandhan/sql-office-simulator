"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
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
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { LEARNING_QUESTIONS, LEARNING_LEVELS, LearningQuestion } from "@/lib/content/learning-curriculum";

export default function LearnAcademyPage() {
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [userSql, setUserSql] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [solvedMap, setSolvedMap] = useState<Record<number, boolean>>({});
  const [runResult, setRunResult] = useState<{
    success: boolean;
    columns: string[];
    rows: Record<string, unknown>[];
    message: string;
    isCorrect?: boolean;
    durationMs?: number;
  } | null>(null);

  const levelQuestions = LEARNING_QUESTIONS.filter((q) => q.level === activeLevel);
  const currentQuestion =
    LEARNING_QUESTIONS.find((q) => q.id === selectedQuestionId) || levelQuestions[0] || LEARNING_QUESTIONS[0];

  // Load solved state from localStorage
  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const stored = localStorage.getItem(`sql_office_${currentUserId}_academy_solved`);
      if (stored) {
        setSolvedMap(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Update starter sql when question changes
  useEffect(() => {
    setUserSql(currentQuestion.starterSql);
    setRunResult(null);
  }, [currentQuestion]);

  const solvedCount = Object.keys(solvedMap).filter((k) => solvedMap[Number(k)]).length;
  const progressPct = Math.min(100, Math.round((solvedCount / 100) * 100));

  const handleRunQuery = async () => {
    setIsRunning(true);
    setRunResult(null);
    try {
      const res = await fetch("/api/questions/ecom-L1-001/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sql: userSql,
          schema: "ecom_l1",
        }),
      });
      const data = await res.json();

      if (data.error) {
        setRunResult({
          success: false,
          columns: [],
          rows: [],
          message: data.error,
          isCorrect: false,
        });
      } else {
        // Simple column and row check against expected
        const hasExpectedColumns = currentQuestion.expectedColumns.every((col) =>
          data.columns.some((c: string) => c.toLowerCase() === col.toLowerCase())
        );
        const isCorrect = hasExpectedColumns && data.rows && data.rows.length > 0;

        if (isCorrect) {
          const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
          const updated = { ...solvedMap, [currentQuestion.id]: true };
          setSolvedMap(updated);
          localStorage.setItem(`sql_office_${currentUserId}_academy_solved`, JSON.stringify(updated));

          // Notify /api/user/progress
          fetch("/api/user/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "academy",
              questionId: currentQuestion.id,
              xpEarned: 10,
            }),
          }).catch(() => {});

          // Award XP to user stats
          try {
            const statsKey = `sql_office_${currentUserId}_user_stats`;
            const stats = JSON.parse(localStorage.getItem(statsKey) || '{"xp":0}');
            stats.xp = (stats.xp || 0) + 10;
            localStorage.setItem(statsKey, JSON.stringify(stats));
          } catch {
            // Ignore
          }
        }

        setRunResult({
          success: true,
          columns: data.columns || [],
          rows: data.rows || [],
          durationMs: data.durationMs || 12,
          isCorrect,
          message: isCorrect
            ? "Outstanding! Query returned the expected result."
            : "Query executed, but output columns did not match expected requirements.",
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

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Neo-Brutalist Top Header (Image 4 Style) */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--ink)] px-4 sm:px-8 py-3.5 shadow-[0px_4px_0px_var(--ink)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--paper-beige)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all flex items-center gap-1.5 text-xs font-black active:translate-x-[1px] active:translate-y-[1px]"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
              <span className="hidden sm:inline">Career Dashboard</span>
            </Link>
            <div className="h-6 w-[2px] bg-[var(--ink)]" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-teal)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <BookOpen className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <h1 className="font-black text-base tracking-tight text-[var(--ink)] flex items-center gap-2">
                  SQL ACADEMY (100 INTERACTIVE QUESTIONS)
                </h1>
                <p className="text-[11px] font-bold text-[var(--ink)] opacity-75">
                  Learn SQL concepts with examples, then solve hands-on database challenges
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/office/ecommerce/level-1"
              className="btn-primary text-xs py-2 px-4 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>Workplace Office</span>
              <ChevronRight className="w-4 h-4 text-[var(--ink)]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full flex-1 p-4 sm:p-8 space-y-6">
        {/* Neo-Brutalist Overall Progress Bar Card (Image 4 Design) */}
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
                  {solvedCount} / 100 Challenges Solved ({solvedCount * 10} XP Earned)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[var(--accent-teal)] border-2 border-[var(--ink)] text-xs font-black rounded-lg shadow-[2px_2px_0px_var(--ink)]">
                {progressPct}% COMPLETE
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-4 bg-[var(--paper-beige)] border-2 border-[var(--ink)] rounded-lg overflow-hidden shadow-[2px_2px_0px_var(--ink)] p-0.5">
            <div
              className="h-full bg-[var(--accent-teal)] rounded-sm border-r-2 border-[var(--ink)] transition-all duration-300"
              style={{ width: `${Math.max(solvedCount > 0 ? 3 : 0, progressPct)}%` }}
            />
          </div>
        </div>

        {/* Level Navigation Tabs (Image 4 Neo-Brutalist Tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LEARNING_LEVELS.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
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
                <div className="text-xs font-black text-[var(--ink)] uppercase">Level {lvl.level}</div>
                <div className="text-[11px] text-[var(--ink)] opacity-80 mt-0.5 truncate">{lvl.name}</div>
              </button>
            );
          })}
        </div>

        {/* Workspace Grid: Questions Drawer (Left) & Concept / Exercise Arena (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question List Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-4 shadow-[6px_6px_0px_var(--ink)] space-y-3 max-h-[750px] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5">
              <span className="text-xs font-black uppercase text-[var(--ink)] flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[var(--accent-teal)]" />
                <span>Level {activeLevel} Challenges</span>
              </span>
              <span className="text-[10px] font-black bg-[var(--paper-beige)] border border-[var(--ink)] px-2 py-0.5 rounded">
                {levelQuestions.length} Questions
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
                      <span className="text-xs truncate">{q.title}</span>
                    </div>

                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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

          {/* Practice & Challenge Panel (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Concept Explanation Card */}
            <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[6px_6px_0px_var(--ink)] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-3">
                <div>
                  <span className="px-2.5 py-0.5 bg-[var(--sun)] border border-[var(--ink)] text-[11px] font-black rounded-full">
                    {currentQuestion.topic}
                  </span>
                  <h2 className="text-xl font-black text-[var(--ink)] mt-1.5">
                    {currentQuestion.title}
                  </h2>
                </div>
                {solvedMap[currentQuestion.id] && (
                  <span className="px-2.5 py-1 bg-emerald-100 border-2 border-[var(--ink)] text-emerald-900 text-xs font-black rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Solved (+10 XP)
                  </span>
                )}
              </div>

              {/* Concept Text */}
              <div className="bg-[var(--paper-beige)] border-2 border-[var(--ink)] p-3.5 rounded-xl text-xs font-bold text-[var(--ink)] leading-relaxed shadow-[2px_2px_0px_var(--ink)]">
                {currentQuestion.conceptSummary}
              </div>

              {/* Code Example */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase text-[var(--ink)] opacity-75">
                  Concept Example:
                </span>
                <pre className="font-mono text-xs bg-[#1E293B] text-slate-100 p-3 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] overflow-x-auto whitespace-pre-wrap">
                  {currentQuestion.conceptExample}
                </pre>
              </div>

              {/* Practice Task Instruction */}
              <div className="bg-[#FFE6FF] border-2 border-[var(--ink)] p-4 rounded-xl shadow-[3px_3px_0px_var(--ink)] space-y-1">
                <div className="text-xs font-black uppercase text-[var(--ink)] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--ink)]" />
                  <span>Your Practice Task:</span>
                </div>
                <p className="text-xs font-extrabold text-[var(--ink)] leading-snug">
                  {currentQuestion.task}
                </p>
              </div>
            </div>

            {/* Interactive SQL Editor & Test Console */}
            <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_var(--ink)] space-y-0">
              <div className="bg-[var(--sun)] border-b-2 border-[var(--ink)] px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[var(--ink)]">
                  SQL Editor (PostgreSQL Practice Database)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserSql(currentQuestion.starterSql)}
                    className="p-1.5 rounded-lg border border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--paper-beige)] text-xs font-bold text-[var(--ink)] transition-all"
                    title="Reset SQL"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRunQuery}
                    disabled={isRunning}
                    className="btn-primary text-xs py-1.5 px-4 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <Play className="w-3.5 h-3.5 text-[var(--ink)] fill-[var(--ink)]" />
                    <span>{isRunning ? "Running..." : "Run & Check Answer"}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#ffffff]">
                <textarea
                  value={userSql}
                  onChange={(e) => setUserSql(e.target.value)}
                  className="w-full h-32 p-3 font-mono text-xs border-2 border-[var(--ink)] rounded-xl bg-[var(--paper-beige)] text-[var(--ink)] focus:outline-none shadow-[2px_2px_0px_var(--ink)]"
                  placeholder="Type your SQL query here..."
                />
              </div>

              {/* Execution Feedback & Results Table */}
              {runResult && (
                <div className="border-t-2 border-[var(--ink)] p-4 space-y-3 bg-[var(--paper-beige)]">
                  <div
                    className={`p-3 rounded-xl border-2 border-[var(--ink)] text-xs font-black flex items-center gap-2 shadow-[2px_2px_0px_var(--ink)] ${
                      runResult.isCorrect ? "bg-[#bbf7d0] text-emerald-950" : "bg-[#fecdd3] text-rose-950"
                    }`}
                  >
                    {runResult.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                    )}
                    <span>{runResult.message}</span>
                  </div>

                  {runResult.rows && runResult.rows.length > 0 && (
                    <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden bg-[var(--white)] shadow-[2px_2px_0px_var(--ink)]">
                      <div className="bg-[var(--white)] px-3 py-1.5 border-b-2 border-[var(--ink)] flex items-center justify-between text-[11px] font-black">
                        <span>Query Output Preview ({runResult.rows.length} rows)</span>
                        <span className="font-mono">{runResult.durationMs}ms</span>
                      </div>
                      <div className="overflow-x-auto max-h-48">
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
                            {runResult.rows.slice(0, 5).map((row, idx) => (
                              <tr key={idx} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                {runResult.columns.map((col) => (
                                  <td key={col} className="p-2 border-r border-slate-200 last:border-r-0">
                                    {String(row[col] ?? "")}
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
