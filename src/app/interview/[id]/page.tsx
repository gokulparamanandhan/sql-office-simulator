"use client";

import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Building2,
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Zap,
  ChevronRight,
  Flame,
  RotateCcw,
  Sparkles,
  BookOpen,
  Table2,
  Database,
  Code2,
  Pause,
  Timer as TimerIcon,
  Eye,
  Check,
  ChevronDown
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackLink from "@/components/FeedbackLink";
import { getInterviewQuestionById, INTERVIEW_QUESTIONS } from "@/lib/content/interview-questions";

// Dynamically import Monaco Editor to avoid SSR hydration issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[var(--surface)] flex items-center justify-center font-mono text-xs text-[var(--ink)]">
      Loading SQL Editor...
    </div>
  ),
});

export default function InterviewProblemWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const question = getInterviewQuestionById(id) || INTERVIEW_QUESTIONS[0];

  const [activeTab, setActiveTab] = useState<"problem" | "schema" | "hints" | "solution">("problem");
  const [activeResultTab, setActiveResultTab] = useState<"results" | "output" | "diff">("results");
  const [userSql, setUserSql] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState<boolean>(false);
  const [solutionRevealed, setSolutionRevealed] = useState<boolean>(false);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([0]);

  // Timer State (Default 25 minutes)
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Results State
  const [runResult, setRunResult] = useState<{
    success: boolean;
    columns: string[];
    rows: Record<string, unknown>[];
    rowCount: number;
    durationMs: number;
    error?: string;
  } | null>(null);

  const [submitResult, setSubmitResult] = useState<{
    isCorrect: boolean;
    code: string;
    message: string;
    durationMs: number;
    actualRows?: Record<string, unknown>[];
    expectedRows?: Record<string, unknown>[];
    actualColumns?: string[];
    expectedColumns?: string[];
    diff?: {
      rowIndex: number;
      column: string;
      expected: unknown;
      actual: unknown;
    };
  } | null>(null);

  // Initialize SQL from starter
  useEffect(() => {
    if (question) {
      setUserSql(question.starterSql);
      setRunResult(null);
      setSubmitResult(null);
      setShowSolutionConfirm(false);
      setSolutionRevealed(false);
      setUnlockedHints([0]);
      setTimerSeconds(25 * 60);
      setIsTimerRunning(false);
    }
  }, [question?.id]);

  // Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleRunQuery = async () => {
    if (!question) return;
    setIsRunning(true);
    setRunResult(null);
    try {
      const res = await fetch(`/api/interview/${question.id}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: userSql }),
      });
      const data = await res.json();
      setRunResult(data);
      setActiveResultTab("output");
    } catch (err: any) {
      setRunResult({
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        durationMs: 0,
        error: err.message || "Failed to execute query",
      });
      setActiveResultTab("output");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitQuery = async () => {
    if (!question) return;
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const res = await fetch(`/api/interview/${question.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: userSql }),
      });
      const data = await res.json();
      setSubmitResult(data);
      setActiveResultTab("results");

      if (data.isCorrect) {
        // Save to localStorage solved map
        try {
          const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
          const key = `sql_office_${currentUserId}_interview_solved`;
          const stored = JSON.parse(localStorage.getItem(key) || "{}");
          stored[question.id] = true;
          localStorage.setItem(key, JSON.stringify(stored));
        } catch {
          // Ignore
        }
      }
    } catch (err: any) {
      setSubmitResult({
        isCorrect: false,
        code: "SYNTAX_ERROR",
        message: err.message || "Submission failed",
        durationMs: 0,
      });
      setActiveResultTab("results");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-bold text-sm">Question not found.</p>
          <Link href="/interview" className="btn-primary text-xs py-2 px-4">
            Back to Interview Prep
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-xs font-bold text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Problem Catalog</span>
          </Link>

          <div className="h-4 w-[1px] bg-[var(--sky)]" />

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-[var(--ink)] tracking-tight truncate max-w-[200px] sm:max-w-xs">
              {question.title}
            </span>
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                question.difficulty === "Easy"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : question.difficulty === "Medium"
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-red-50 text-red-700 border-red-300"
              }`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Mock Interview Countdown Timer */}
          <div className="flex items-center gap-1.5 bg-[var(--mist)] border border-[var(--sky)] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-[var(--ink)]">
            <TimerIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 hover:bg-[var(--white)] rounded text-[var(--ink)] ml-1"
              title={isTimerRunning ? "Pause Timer" : "Start Timer"}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
              className="p-1 hover:bg-[var(--white)] rounded text-[var(--ink)] opacity-60 hover:opacity-100"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <ThemeToggle />
          <FeedbackLink variant="button" />
        </div>
      </header>

      {/* Main Workspace (Split Pane) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Problem, Schema, Hints, Solution */}
        <div className="w-full md:w-1/2 lg:w-5/12 h-1/2 md:h-full bg-[var(--white)] border-r-2 border-[var(--sky)] flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="flex items-center border-b border-[var(--sky)] bg-[var(--surface)] px-2 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab("problem")}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "problem"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "schema"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Schema</span>
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "hints"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Hints ({unlockedHints.length}/3)</span>
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "solution"
                  ? "border-[var(--ink)] text-[var(--ink)]"
                  : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Solution & Tips</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeTab === "problem" && (
              <div className="space-y-5">
                {/* Company & Topic Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase text-[var(--ink)] opacity-60 mr-1">
                    Asked At:
                  </span>
                  {question.companies.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-black bg-[var(--mist)] text-[var(--ink)] px-2.5 py-1 rounded-md border border-[var(--sky)] shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                  <div className="h-3 w-[1px] bg-[var(--sky)] mx-1" />
                  {question.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold bg-[var(--surface)] text-[var(--ink)] opacity-80 px-2 py-0.5 rounded border border-[var(--sky)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Markdown Description */}
                <div className="prose prose-sm max-w-none text-[var(--ink)] space-y-4 text-xs sm:text-sm leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: question.description
                        .replace(/### (.*?)\n/g, '<h3 class="font-black text-sm text-[var(--ink)] mt-4 mb-2 pb-1 border-b border-[var(--sky)]">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-[var(--ink)]">$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-[var(--mist)] border border-[var(--sky)] text-pink-600 font-mono text-[11px] px-1.5 py-0.5 rounded">$1</code>')
                        .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc text-xs">$1</li>')
                    }}
                  />
                </div>

                {/* Expected Columns Box */}
                <div className="bg-[var(--mist)] border border-[var(--sky)] rounded-xl p-3.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--ink)] block mb-1.5">
                    Required Output Columns:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {question.expectedColumns.map((col) => (
                      <span
                        key={col}
                        className="font-mono text-xs font-black bg-[var(--white)] text-[var(--ink)] px-2 py-1 rounded border border-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-[var(--ink)]">
                    PostgreSQL 16 Seed Schema
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--ink)] opacity-70">
                    Auto-seeded in PGlite
                  </span>
                </div>
                <pre className="bg-[var(--surface)] border border-[var(--sky)] rounded-xl p-4 font-mono text-xs text-[var(--ink)] overflow-x-auto leading-relaxed">
                  {question.schemaSql.trim()}
                </pre>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-4">
                <p className="text-xs text-[var(--ink)] opacity-80">
                  Try solving without hints first to build interview muscle memory. Reveal progressively if stuck:
                </p>

                {question.hints.map((hint, idx) => {
                  const isUnlocked = unlockedHints.includes(idx);
                  return (
                    <div
                      key={idx}
                      className="bg-[var(--surface)] border-2 border-[var(--sky)] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-amber-600">
                          Hint {idx + 1}
                        </span>
                        {!isUnlocked && (
                          <button
                            onClick={() => setUnlockedHints([...unlockedHints, idx])}
                            className="text-[11px] font-extrabold text-[var(--ink)] bg-[var(--sun)] border border-[var(--ink)] px-2 py-0.5 rounded shadow-[1px_1px_0px_var(--ink)]"
                          >
                            Reveal Hint
                          </button>
                        )}
                      </div>
                      {isUnlocked ? (
                        <p className="text-xs text-[var(--ink)] leading-relaxed">{hint}</p>
                      ) : (
                        <p className="text-xs text-[var(--ink)] opacity-40 italic">
                          Click Reveal Hint to unlock this clue.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "solution" && (
              <div className="space-y-4">
                {!solutionRevealed ? (
                  <div className="bg-[var(--mist)] border-2 border-[var(--ink)] rounded-xl p-5 text-center space-y-3">
                    <Sparkles className="w-6 h-6 text-purple-600 mx-auto" />
                    <h4 className="font-extrabold text-sm text-[var(--ink)]">
                      Want to inspect the canonical solution?
                    </h4>
                    <p className="text-xs text-[var(--ink)] opacity-75 max-w-sm mx-auto">
                      In a real interview, you won't have answers. We recommend attempting at least 2 queries before revealing.
                    </p>
                    <button
                      onClick={() => setSolutionRevealed(true)}
                      className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Reveal Canonical Solution</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div>
                      <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider block mb-2">
                        Canonical Reference SQL (PostgreSQL):
                      </span>
                      <pre className="bg-[#1e1e1e] text-[#d4d4d4] rounded-xl p-4 font-mono text-xs overflow-x-auto border-2 border-[var(--ink)]">
                        {question.referenceSql}
                      </pre>
                    </div>

                    <div className="bg-[var(--surface)] border border-[var(--sky)] rounded-xl p-4 space-y-3">
                      <h4 className="font-black text-sm text-[var(--ink)]">
                        Technical Walkthrough & Interview Tips
                      </h4>
                      <div
                        className="text-xs text-[var(--ink)] space-y-3 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: question.explanation
                            .replace(/### (.*?)\n/g, '<h5 class="font-extrabold text-xs text-[var(--ink)] mt-2">$1</h5>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-[var(--ink)]">$1</strong>')
                            .replace(/`([^`]+)`/g, '<code class="bg-[var(--mist)] border border-[var(--sky)] text-pink-600 font-mono text-[11px] px-1 py-0.5 rounded">$1</code>')
                            .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc text-xs">$1</li>')
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Monaco Editor & Output Console */}
        <div className="w-full md:w-1/2 lg:w-7/12 h-1/2 md:h-full flex flex-col bg-[var(--white)] overflow-hidden">
          {/* Editor Header Bar */}
          <div className="h-10 bg-[var(--surface)] border-b border-[var(--sky)] px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span className="font-mono text-xs font-bold text-[var(--ink)]">SQL Query Editor</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setUserSql(question.starterSql)}
                className="flex items-center gap-1 text-[11px] font-bold text-[var(--ink)] opacity-70 hover:opacity-100 px-2 py-1 rounded hover:bg-[var(--mist)]"
                title="Reset to starter query"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[160px] relative">
            <MonacoEditor
              height="100%"
              language="sql"
              theme="vs-dark"
              value={userSql}
              onChange={(val) => setUserSql(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                lineNumbers: "on",
                roundedSelection: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>

          {/* Actions Bar (Run & Submit) */}
          <div className="bg-[var(--surface)] border-t border-[var(--sky)] px-4 py-2.5 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-[var(--ink)] opacity-60 font-mono hidden sm:inline">
              Ctrl+Enter to Run
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleRunQuery}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--white)] hover:bg-[var(--mist)] text-xs font-bold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 text-blue-600 fill-current" />
                <span>{isRunning ? "Running..." : "Run Query"}</span>
              </button>

              <button
                onClick={handleSubmitQuery}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border-2 border-[var(--ink)] bg-emerald-500 hover:bg-emerald-600 text-xs font-black text-white shadow-[2px_2px_0px_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{isSubmitting ? "Grading..." : "Submit Code"}</span>
              </button>
            </div>
          </div>

          {/* Bottom Results & Console Drawer */}
          <div className="h-56 bg-[var(--white)] border-t-2 border-[var(--sky)] flex flex-col overflow-hidden shrink-0">
            {/* Console Tab Bar */}
            <div className="flex items-center border-b border-[var(--sky)] bg-[var(--surface)] px-2 shrink-0">
              <button
                onClick={() => setActiveResultTab("results")}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition-colors ${
                  activeResultTab === "results"
                    ? "border-[var(--ink)] text-[var(--ink)]"
                    : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
                }`}
              >
                Test Results
              </button>
              <button
                onClick={() => setActiveResultTab("output")}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition-colors ${
                  activeResultTab === "output"
                    ? "border-[var(--ink)] text-[var(--ink)]"
                    : "border-transparent text-[var(--ink)] opacity-60 hover:opacity-100"
                }`}
              >
                Query Output ({runResult?.rowCount ?? 0})
              </button>
              {submitResult && !submitResult.isCorrect && (
                <button
                  onClick={() => setActiveResultTab("diff")}
                  className={`py-2 px-3 text-xs font-bold border-b-2 transition-colors text-red-600 ${
                    activeResultTab === "diff"
                      ? "border-red-600"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  Expected Diff View
                </button>
              )}
            </div>

            {/* Console Body */}
            <div className="flex-1 overflow-auto p-3 text-xs font-mono">
              {activeResultTab === "results" && (
                <div>
                  {!submitResult && !runResult ? (
                    <div className="h-full flex items-center justify-center text-[var(--ink)] opacity-50 py-10">
                      Write your SQL query and click "Run Query" or "Submit Code".
                    </div>
                  ) : submitResult ? (
                    <div className="space-y-3">
                      {submitResult.isCorrect ? (
                        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-black text-sm text-emerald-900 block">
                              Accepted! All Test Cases Passed
                            </span>
                            <span className="text-xs text-emerald-700">
                              Runtime: {submitResult.durationMs}ms • Both sample data and hidden edge cases verified.
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 space-y-2">
                          <div className="flex items-center gap-2 text-red-800 font-black">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                            <span>{submitResult.code}: {submitResult.message}</span>
                          </div>
                          {submitResult.diff && (
                            <div className="text-[11px] bg-red-100 border border-red-300 rounded p-2 text-red-900 font-mono">
                              Discrepancy at Row {submitResult.diff.rowIndex + 1}, column '{submitResult.diff.column}':
                              <div className="mt-1">Expected: <span className="font-bold text-emerald-700">{String(submitResult.diff.expected)}</span></div>
                              <div>Actual: <span className="font-bold text-red-700">{String(submitResult.diff.actual)}</span></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-[var(--ink)]">
                      Ran query in {runResult?.durationMs}ms. Switched to Query Output tab.
                    </div>
                  )}
                </div>
              )}

              {activeResultTab === "output" && (
                <div>
                  {runResult?.error ? (
                    <div className="bg-red-50 border border-red-300 rounded p-3 text-red-700">
                      {runResult.error}
                    </div>
                  ) : runResult && runResult.rows.length > 0 ? (
                    <div className="border border-[var(--sky)] rounded overflow-x-auto">
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="bg-[var(--mist)] border-b border-[var(--sky)] font-bold text-[var(--ink)]">
                            {runResult.columns.map((c) => (
                              <th key={c} className="p-2 border-r border-[var(--sky)] last:border-r-0">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--sky)]">
                          {runResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[var(--surface)]">
                              {runResult.columns.map((c, cIdx) => (
                                <td key={cIdx} className="p-2 border-r border-[var(--sky)] last:border-r-0">
                                  {String(row[c] ?? "NULL")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-[var(--ink)] opacity-50">
                      No rows returned.
                    </div>
                  )}
                </div>
              )}

              {activeResultTab === "diff" && submitResult && !submitResult.isCorrect && (
                <div className="space-y-3">
                  <div className="text-[11px] text-[var(--ink)] font-bold">
                    Comparing Your Output vs Expected Output (First 5 rows):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* User Output */}
                    <div className="border border-red-300 rounded bg-red-50/50 p-2 overflow-x-auto">
                      <span className="font-bold text-[10px] text-red-700 block mb-1 uppercase">
                        Your Query Output ({submitResult.actualRows?.length || 0} rows)
                      </span>
                      <pre className="text-[10px] text-[var(--ink)]">
                        {JSON.stringify(submitResult.actualRows?.slice(0, 5), null, 2)}
                      </pre>
                    </div>

                    {/* Expected Output */}
                    <div className="border border-emerald-300 rounded bg-emerald-50/50 p-2 overflow-x-auto">
                      <span className="font-bold text-[10px] text-emerald-700 block mb-1 uppercase">
                        Expected Output ({submitResult.expectedRows?.length || 0} rows)
                      </span>
                      <pre className="text-[10px] text-[var(--ink)]">
                        {JSON.stringify(submitResult.expectedRows?.slice(0, 5), null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

