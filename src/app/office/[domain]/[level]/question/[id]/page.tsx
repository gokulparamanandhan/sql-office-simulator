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
  ChevronLeft,
  Flame,
  Key,
  ShieldCheck,
  Flag,
  FileText,
  RotateCcw,
  Sparkles,
  Trophy,
  PartyPopper,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { getQuestionsForDomainAndLevel, getQuestionById } from "@/lib/content/content-registry";
import { getDomainOfficeMetadata } from "@/lib/office/all-domains-metadata";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackLink from "@/components/FeedbackLink";

// Dynamically import Monaco Editor to avoid SSR hydration issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[var(--surface)] flex items-center justify-center font-mono text-xs text-[var(--ink)]">
      Loading SQL Editor...
    </div>
  ),
});

export default function QuestionWorkspacePage({
  params,
}: {
  params: Promise<{ domain: string; level: string; id: string }>;
}) {
  const router = useRouter();
  const { domain, level, id } = use(params);
  const cleanLevel = (!level || level === "level-undefined" || level === "undefined") ? "1" : level.replace(/^level-/, "");
  const levelRoute = `level-${cleanLevel}`;
  const office = getDomainOfficeMetadata(domain, cleanLevel);
  const domainQuestions = getQuestionsForDomainAndLevel(domain, parseInt(cleanLevel, 10));

  const question =
    getQuestionById(id) || domainQuestions.find((q) => q.id === id) || domainQuestions[0];
  const questionIndex = domainQuestions.findIndex((q) => q.id === question.id);
  const prevQuestion = questionIndex > 0 ? domainQuestions[questionIndex - 1] : null;
  const nextQuestion =
    questionIndex < domainQuestions.length - 1
      ? domainQuestions[questionIndex + 1]
      : null;

  // Editor and execution state
  const [sql, setSql] = useState<string>("SELECT ");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Result state
  const [runResult, setRunResult] = useState<{
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
    rowCount?: number;
    columnCount?: number;
    xpEarned?: number;
  } | null>(null);

  // Hints and solutions
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [solutionUnlocked, setSolutionUnlocked] = useState<boolean>(false);
  const [viewingSolution, setViewingSolution] = useState<boolean>(false);
  const [solutionPenalized, setSolutionPenalized] = useState<boolean>(false);

  // Scratchpad
  const [scratchpad, setScratchpad] = useState<string>("");
  const [activeLeftTab, setActiveLeftTab] = useState<"brief" | "hints" | "scratchpad" | "schema">("brief");

  // Report issue modal
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportCategory, setReportCategory] = useState<string>("unclear_wording");
  const [reportMessage, setReportMessage] = useState<string>("");
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [reportError, setReportError] = useState<string>("");
  const [reportMessageText, setReportMessageText] = useState<string>("");

  // Celebration state
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [editorTheme, setEditorTheme] = useState<"vs-light" | "vs-dark">("vs-light");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") setEditorTheme("vs-dark");

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      setEditorTheme(t === "dark" ? "vs-dark" : "vs-light");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
      })
      .catch(() => {
        router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
      });
  }, [router]);

  // Load saved state for this question
  useEffect(() => {
    try {
      let savedSql = localStorage.getItem(`sql_office_${id}_code`);
      if (savedSql) {
        savedSql = savedSql.replace(/^-- Write your query below\. Press Ctrl\+Enter to Run Preview\.\r?\n?/i, "");
        setSql(savedSql);
      }

      const savedScratch = localStorage.getItem(`sql_office_${id}_notes`);
      if (savedScratch) setScratchpad(savedScratch);

      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const savedSolved = localStorage.getItem(`sql_office_${currentUserId}_${domain}_l${cleanLevel}_solved`);
      if (savedSolved) {
        const solvedMap = JSON.parse(savedSolved);
        if (solvedMap[id]) {
          setSubmitResult({
            isCorrect: true,
            code: "CORRECT",
            message: "Previously solved!",
            durationMs: 0,
            xpEarned: question.xp,
          });
          setSolutionUnlocked(true);
        }
      }
    } catch {
      // Ignore
    }
  }, [id, domain, cleanLevel, question.xp]);

  // Persist code on change
  const handleEditorChange = (value?: string) => {
    if (value !== undefined) {
      setSql(value);
      try {
        localStorage.setItem(`sql_office_${id}_code`, value);
      } catch {
        // Ignore
      }
    }
  };

  // Custom Schema-Aware Monaco Autocomplete Provider
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorMount = (_editor: any, monaco: any) => {
    if (!monaco || !monaco.languages) return;
    const tables = office.schema.map((t) => t.name);
    const columns = Array.from(new Set(office.schema.flatMap((t) => t.columns.map((c) => c.name))));
    const keywords = [
      "SELECT", "FROM", "WHERE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON",
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "WITH", "AS", "AND", "OR", "IN",
      "LIKE", "BETWEEN", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END",
      "COUNT", "SUM", "AVG", "MIN", "MAX", "DISTINCT", "COALESCE"
    ];

    monaco.languages.registerCompletionItemProvider("sql", {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          ...keywords.map((kw) => ({
            label: kw,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: kw,
            range,
          })),
          ...tables.map((t) => ({
            label: t,
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: t,
            detail: `Table (${office.company.name})`,
            range,
          })),
          ...columns.map((col) => ({
            label: col,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: col,
            detail: "Column",
            range,
          })),
        ];

        return { suggestions };
      },
    });
  };

  // Run Preview (does NOT count as attempt)
  const handleRun = async () => {
    setIsRunning(true);
    setSubmitResult(null);

    try {
      const res = await fetch(`/api/questions/${id}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sql,
          schema: `${domain === "ecommerce" ? "ecom" : domain}_l${cleanLevel}`,
        }),
      });
      const data = await res.json();
      setRunResult(data);
    } catch (err: unknown) {
      setRunResult({
        columns: [],
        rows: [],
        rowCount: 0,
        durationMs: 0,
        error: String(err),
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit for Grading (counts as attempt, awards XP)
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/questions/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sql,
          hintsUsed: hintsRevealed,
        }),
      });
      const data = await res.json();
      setSubmitResult(data);

      if (data.isCorrect) {
        // Mark question as solved in user-scoped storage
        try {
          const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
          const solvedKey = `sql_office_${currentUserId}_${domain}_l${cleanLevel}_solved`;
          const current = JSON.parse(localStorage.getItem(solvedKey) || "{}");
          current[id] = true;
          localStorage.setItem(solvedKey, JSON.stringify(current));

          // Also notify /api/user/progress
          fetch("/api/user/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              domain,
              level: cleanLevel,
              questionId: id,
              xpEarned: data.xpEarned || question.xp || 10,
            }),
          }).catch(() => {});

          // Track total user-scoped XP & streak
          const xpGained = data.xpEarned || question.xp || 10;
          const statsKey = `sql_office_${currentUserId}_user_stats`;
          const userStats = JSON.parse(localStorage.getItem(statsKey) || '{"xp":0,"streak":1,"solvedCount":0}');
          userStats.xp = (userStats.xp || 0) + xpGained;
          userStats.solvedCount = (userStats.solvedCount || 0) + 1;
          localStorage.setItem(statsKey, JSON.stringify(userStats));

          // Check if celebration threshold reached
          const allCount = Object.keys(current).length;
          if (allCount >= 10 || question.difficulty === "boss") {
            setShowCelebration(true);
          }
        } catch {
          // Ignore
        }
        setSolutionUnlocked(true);
      } else {
        const nextFails = failedAttempts + 1;
        setFailedAttempts(nextFails);
        if (nextFails >= 3) {
          setSolutionUnlocked(true);
        }
      }
    } catch (err: unknown) {
      setSubmitResult({
        isCorrect: false,
        code: "ERROR",
        message: String(err),
        durationMs: 0,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reveal next hint (-25% XP each)
  const handleRevealHint = () => {
    if (hintsRevealed < question.hints.length) {
      setHintsRevealed((prev) => prev + 1);
    }
  };

  // View Solution
  const handleViewSolution = () => {
    if (!submitResult?.isCorrect) {
      setSolutionPenalized(true);
    }
    setViewingSolution(true);
  };

  // Submit Question Report
  const handleSendReport = async () => {
    if (!reportMessage.trim()) {
      setReportError("Please enter a brief note describing the issue.");
      return;
    }
    setReportLoading(true);
    setReportError("");
    try {
      const res = await fetch(`/api/questions/${question.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: reportCategory,
          message: reportMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReportError(data.error || "Failed to submit report.");
      } else {
        setReportSubmitted(true);
        setReportMessageText(
          data.message || "Thank you! Your report has been submitted to the QA queue."
        );
        setTimeout(() => {
          setReportModalOpen(false);
          setReportSubmitted(false);
          setReportMessage("");
          setReportError("");
        }, 2200);
      }
    } catch {
      setReportError("Network error while submitting report.");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans overflow-hidden">
      {/* Workspace Top Navigation */}
      <header className="bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 py-2.5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href={`/office/${domain}/${levelRoute}`}
            className="p-1.5 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Inbox</span>
          </Link>

          <div className="h-4 w-px bg-[var(--sky)]" />

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-[var(--ink)]">
              #{question.order}. {question.title}
            </span>
            {question.difficulty === "boss" ? (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[var(--sun)] border border-[var(--ink)] text-[var(--ink)]">
                👑 Boss Question
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)]">
                {question.difficulty}
              </span>
            )}
            {submitResult?.isCorrect && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Solved
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Previous / Next Question Navigation */}
          <div className="flex items-center border border-[var(--sky)] rounded-lg overflow-hidden bg-[var(--surface)]">
            <button
              disabled={!prevQuestion}
              onClick={() =>
                prevQuestion &&
                router.push(
                  `/office/${domain}/${levelRoute}/question/${prevQuestion.id}`
                )
              }
              className="p-1.5 text-[var(--ink)] hover:bg-[var(--mist)] disabled:opacity-40 transition-colors"
              title="Previous Question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-bold text-[var(--ink)]">
              {question.order} / {domainQuestions.length}
            </span>
            <button
              disabled={!nextQuestion}
              onClick={() =>
                nextQuestion &&
                router.push(
                  `/office/${domain}/${levelRoute}/question/${nextQuestion.id}`
                )
              }
              className="p-1.5 text-[var(--ink)] hover:bg-[var(--mist)] disabled:opacity-40 transition-colors"
              title="Next Question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <FeedbackLink variant="button" />

          <button
            onClick={() => setReportModalOpen(true)}
            className="p-1.5 rounded-lg border border-[var(--sky)] text-[var(--ink)] hover:bg-[var(--mist)] transition-colors text-xs"
            title="Report a problem with this question"
          >
            <Flag className="w-4 h-4 text-[var(--ink)]" />
          </button>
        </div>
      </header>

      {/* Workspace Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANE: Stakeholder Request & Context (5 cols) */}
        <div className="lg:col-span-5 bg-[var(--white)] border-r-2 border-[var(--sky)] flex flex-col h-full overflow-hidden">
          {/* Left Tabs */}
          <div className="flex border-b border-[var(--sky)] bg-[var(--surface)] px-3 pt-2 gap-1 shrink-0">
            <button
              onClick={() => setActiveLeftTab("brief")}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-all border-t border-x ${
                activeLeftTab === "brief"
                  ? "bg-[var(--white)] border-[var(--sky)] text-[var(--ink)] shadow-sm"
                  : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
              }`}
            >
              Business Request
            </button>
            <button
              onClick={() => setActiveLeftTab("hints")}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-all border-t border-x flex items-center gap-1 ${
                activeLeftTab === "hints"
                  ? "bg-[var(--white)] border-[var(--sky)] text-[var(--ink)] shadow-sm"
                  : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
              }`}
            >
              <span>Hints</span>
              {hintsRevealed > 0 && (
                <span className="w-4 h-4 rounded-full bg-[var(--sun)] text-[10px] font-black flex items-center justify-center border border-[var(--ink)]">
                  {hintsRevealed}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveLeftTab("schema")}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-all border-t border-x ${
                activeLeftTab === "schema"
                  ? "bg-[var(--white)] border-[var(--sky)] text-[var(--ink)] shadow-sm"
                  : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
              }`}
            >
              Schema
            </button>
            <button
              onClick={() => setActiveLeftTab("scratchpad")}
              className={`px-3 py-1.5 text-xs font-bold rounded-t-lg transition-all border-t border-x ${
                activeLeftTab === "scratchpad"
                  ? "bg-[var(--white)] border-[var(--sky)] text-[var(--ink)] shadow-sm"
                  : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
              }`}
            >
              Scratchpad
            </button>
          </div>

          {/* Left Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* TAB: BRIEF */}
            {activeLeftTab === "brief" && (
              <div className="space-y-4">
                {/* Stakeholder Message Card */}
                <div className="bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-4 shadow-[3px_3px_0px_var(--ink)] space-y-3">
                  <div className="flex items-center gap-3 border-b border-[var(--sky)] pb-2.5">
                    <div className="w-10 h-10 rounded-full bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center font-black text-xs text-[var(--ink)] shrink-0">
                      {question.stakeholder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-black text-sm text-[var(--ink)]">
                        {question.stakeholder.name}
                      </div>
                      <div className="text-xs font-semibold text-[var(--ocean-hover)]">
                        {question.stakeholder.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--ink)] leading-relaxed italic bg-[var(--white)] p-3 rounded-lg border border-[var(--sky)]">
                    &ldquo;{question.request}&rdquo;
                  </div>
                </div>



                {/* Solution Reveal Option */}
                {solutionUnlocked && (
                  <div className="pt-2 border-t border-[var(--sky)]">
                    {!viewingSolution ? (
                      <button
                        onClick={handleViewSolution}
                        className="w-full btn-secondary text-xs py-2"
                      >
                        <Key className="w-3.5 h-3.5 text-[var(--ink)]" />
                        <span>View Verified Solution Explanation</span>
                      </button>
                    ) : (
                      <div className="bg-[var(--sun)] border-2 border-[var(--ink)] p-3.5 rounded-xl space-y-2 text-xs">
                        <div className="font-extrabold text-[var(--ink)] flex items-center justify-between">
                          <span>Verified Solution</span>
                          {solutionPenalized && (
                            <span className="text-[10px] text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-300">
                              0 XP awarded (viewed before solving)
                            </span>
                          )}
                        </div>
                        <pre className="font-mono text-[11px] bg-[var(--white)] p-2.5 rounded border border-[var(--ink)] overflow-x-auto whitespace-pre-wrap">
                          {question.reference_sql.trim()}
                        </pre>
                        <p className="text-[11px] text-[var(--ink)] leading-snug">
                          {question.solution_explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB: HINTS */}
            {activeLeftTab === "hints" && (
              <div className="space-y-4">
                <div className="bg-[var(--mist)] border border-[var(--sky)] p-3 rounded-lg text-xs text-[var(--ink)] leading-relaxed">
                  <strong>Hint Policy:</strong> Each hint you reveal reduces the question&apos;s earned XP by 25%.
                </div>

                {question.hints.map((hint, idx) => {
                  const isRevealed = idx < hintsRevealed;
                  return (
                    <div
                      key={idx}
                      className={`border-2 rounded-xl p-3.5 space-y-1.5 transition-all ${
                        isRevealed
                          ? "bg-[var(--white)] border-[var(--ink)] shadow-sm"
                          : "bg-[var(--surface)] border-[var(--sky)] opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
                        <span>Hint {idx + 1}</span>
                        {isRevealed ? (
                          <span className="text-[10px] text-emerald-800 font-bold">Revealed</span>
                        ) : (
                          <span className="text-[10px] text-amber-900 font-bold">-25% XP to unlock</span>
                        )}
                      </div>
                      {isRevealed ? (
                        <p className="text-xs text-[var(--ink)] leading-relaxed">{hint}</p>
                      ) : (
                        <p className="text-xs italic text-[var(--ink)] opacity-70">
                          Locked. Click below to reveal this hint.
                        </p>
                      )}
                    </div>
                  );
                })}

                {hintsRevealed < question.hints.length && (
                  <button
                    onClick={handleRevealHint}
                    className="w-full btn-sun text-xs py-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[var(--ink)]" />
                    <span>Reveal Hint #{hintsRevealed + 1} (-25% XP)</span>
                  </button>
                )}
              </div>
            )}

            {/* TAB: SCHEMA */}
            {activeLeftTab === "schema" && (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[var(--ink)] opacity-80">
                  Quick schema lookup for {office.company.name} tables:
                </p>
                {office.schema.map((tbl) => (
                  <div
                    key={tbl.name}
                    className="bg-[var(--surface)] border border-[var(--sky)] rounded-lg p-3 space-y-2 text-xs"
                  >
                    <div className="font-mono font-black text-[var(--ink)] flex items-center justify-between">
                      <span>{tbl.name}</span>
                      <span className="text-[10px] opacity-60 font-sans">{tbl.columns.length} columns</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tbl.columns.map((c) => (
                        <span
                          key={c.name}
                          className="font-mono text-[11px] bg-[var(--white)] border border-[var(--sky)] px-1.5 py-0.5 rounded text-[var(--ink)]"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SCRATCHPAD */}
            {activeLeftTab === "scratchpad" && (
              <div className="space-y-3 h-full flex flex-col">
                <p className="text-xs font-semibold text-[var(--ink)] opacity-80">
                  Private notes for this question (persisted locally in your workspace):
                </p>
                <textarea
                  value={scratchpad}
                  onChange={(e) => {
                    setScratchpad(e.target.value);
                    try {
                      localStorage.setItem(`sql_office_${id}_notes`, e.target.value);
                    } catch {
                      // Ignore
                    }
                  }}
                  placeholder="Jot down table relationships, column filters, or query drafts..."
                  className="w-full flex-1 min-h-[220px] p-3 rounded-lg border-2 border-[var(--sky)] bg-[var(--surface)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>
            )}
          </div>

          {/* Left Footer Honor Reminder (Section 8) */}
          <div className="bg-[var(--surface)] border-t border-[var(--sky)] p-2.5 text-center text-[11px] font-bold text-[var(--ink)] opacity-75 shrink-0">
            &ldquo;First map the table relationships, then let your SELECT statement tell the story.&rdquo;
          </div>
        </div>

        {/* RIGHT PANE: Monaco Code Editor & Results Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-[var(--white)] overflow-hidden">
          {/* Editor Header Toolbar */}
          <div className="bg-[var(--surface)] border-b border-[var(--sky)] px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[var(--ink)] uppercase">
                SQL Editor (PostgreSQL)
              </span>
              <span className="text-[10px] text-[var(--ink)] opacity-60 hidden sm:inline">
                Ctrl+Enter to Run
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                disabled={isRunning || isSubmitting}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                title="Execute query and preview first 100 rows (no penalty)"
              >
                <Play className="w-3.5 h-3.5 text-[var(--ink)] fill-[var(--ink)]" />
                <span>{isRunning ? "Running..." : "Run Preview"}</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isRunning}
                className="btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5"
                title="Validate against primary & hidden datasets to earn XP"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ink)]" />
                <span>{isSubmitting ? "Validating..." : "Submit Answer"}</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Container (50% height) */}
          <div className="h-[46%] w-full border-b-2 border-[var(--sky)] bg-[#ffffff]">
            <MonacoEditor
              height="100%"
              language="sql"
              theme={editorTheme}
              value={sql}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "var(--font-mono), monospace",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                tabSize: 2,
                quickSuggestions: { other: true, comments: false, strings: false },
                acceptSuggestionOnEnter: "smart",
                suggestOnTriggerCharacters: true,
                snippetSuggestions: "inline",
                wordBasedSuggestions: "currentDocument",
              }}
            />
          </div>

          {/* Results Table & Feedback Panel (54% height) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[var(--white)]">
            {/* Feedback Alert Banner (if submitted) */}
            {submitResult && (
              <div
                className={`p-3 border-b-2 text-xs font-semibold flex items-center justify-between shrink-0 ${
                  submitResult.isCorrect
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                    : "bg-rose-50 text-rose-900 border-rose-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {submitResult.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{submitResult.message}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {submitResult.isCorrect && submitResult.xpEarned !== undefined && (
                    <span className="font-extrabold text-xs text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      +{submitResult.xpEarned} XP
                    </span>
                  )}
                  {submitResult.isCorrect && nextQuestion && (
                    <button
                      onClick={() =>
                        router.push(
                          `/office/${domain}/${levelRoute}/question/${nextQuestion.id}`
                        )
                      }
                      className="btn-primary text-xs py-1 px-2.5"
                    >
                      <span>Next Request</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--ink)]" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {runResult?.error && (
              <div className="p-3 bg-rose-50 border-b border-rose-300 text-rose-900 text-xs font-mono shrink-0 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{runResult.error}</span>
              </div>
            )}

            {/* Results Table Header */}
            <div className="bg-[var(--surface)] border-b border-[var(--sky)] px-4 py-1.5 flex items-center justify-between text-xs font-bold text-[var(--ink)] shrink-0">
              <span className="font-mono text-[11px]">
                {runResult ? `Results Preview (${runResult.rowCount} rows)` : "Results Preview"}
              </span>
              {runResult && (
                <span className="text-[10px] opacity-75 font-mono">
                  Execution: {runResult.durationMs}ms
                </span>
              )}
            </div>

            {/* Table Scrollable Container */}
            <div className="flex-1 overflow-auto">
              {runResult && runResult.rows.length > 0 ? (
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead className="sticky top-0 bg-[var(--mist)] text-[var(--ink)] border-b-2 border-[var(--sky)] z-10">
                    <tr>
                      <th className="py-1.5 px-3 font-bold w-12 text-center text-[10px] opacity-70">
                        #
                      </th>
                      {runResult.columns.map((c) => (
                        <th key={c} className="py-1.5 px-3 font-bold whitespace-nowrap">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--sky)]">
                    {runResult.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[var(--surface)]">
                        <td className="py-1.5 px-3 text-center text-[10px] opacity-60">
                          {idx + 1}
                        </td>
                        {runResult.columns.map((c) => (
                          <td key={c} className="py-1.5 px-3 whitespace-nowrap text-[var(--ink)]">
                            {row[c] === null || row[c] === undefined ? (
                              <span className="italic opacity-50">NULL</span>
                            ) : (
                              String(row[c])
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="h-full flex items-center justify-center p-6 text-center text-xs text-[var(--ink)] opacity-60">
                  {runResult?.error
                    ? "Fix query error above to view results"
                    : "Click 'Run Preview' to test your SQL against the sandbox database."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* WORKSPACE FOOTER - HONOR POLICY REMINDER (SPEC SECTION 8) */}
      <footer className="bg-[var(--white)] border-t border-[var(--sky)] px-4 py-2 flex flex-wrap items-center justify-between text-xs text-[var(--ink)] shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[11px] opacity-80">Sandbox: PostgreSQL 16 (Read-Only)</span>
        </div>

        <div className="flex items-center gap-2 text-[var(--ink)] font-medium text-xs">
          <span>🛡️</span>
          <span className="italic font-semibold text-[var(--ink)]">
            &ldquo;In God we trust. All others must bring clean data.&rdquo;
          </span>
          <span className="opacity-50 text-[10px] hidden md:inline">— W. Edwards Deming</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReportModalOpen(true)}
            className="text-xs font-bold text-[var(--ink)] opacity-75 hover:opacity-100 hover:text-[var(--ocean-hover)] flex items-center gap-1.5 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" />
            Report Issue
          </button>
        </div>
      </footer>

      {/* REPORT ISSUE MODAL */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 max-w-md w-full shadow-[4px_4px_0px_var(--ink)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
              <h3 className="font-extrabold text-sm text-[var(--ink)] flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-[var(--ink)]" />
                Report a Problem with this Question
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-xs font-bold text-[var(--ink)] opacity-60 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <div className="text-emerald-700 font-bold text-sm">
                  ✅ {reportMessageText || "Report Submitted"}
                </div>
                <p className="text-xs text-[var(--ink)] opacity-70">
                  Our quality assurance pipeline monitors reported questions to maintain standard coverage.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {reportError && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {reportError}
                  </div>
                )}

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Issue Category
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] bg-[var(--white)]"
                  >
                    <option value="unclear_wording">Unclear or ambiguous wording</option>
                    <option value="wrong_answer">Result set or reference query incorrect</option>
                    <option value="data_issue">Underlying dataset discrepancy</option>
                    <option value="other">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Details
                  </label>
                  <textarea
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Describe what went wrong or why the query/result seems incorrect..."
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="btn-secondary text-xs py-1.5 px-3"
                    disabled={reportLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReport}
                    className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5"
                    disabled={reportLoading}
                  >
                    {reportLoading ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL PROMOTION CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--white)] border-3 border-[var(--ink)] rounded-2xl p-8 max-w-lg w-full text-center space-y-5 shadow-[6px_6px_0px_var(--sun)]">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center animate-bounce">
              <Trophy className="w-8 h-8 text-[var(--ink)]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--ocean-hover)]">
                Level 1 Complete!
              </span>
              <h2 className="text-2xl font-black text-[var(--ink)]">
                Outstanding Performance, Analyst!
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink)] opacity-85 leading-relaxed">
                You have answered leadership&apos;s requests and successfully cleared the Startup stage at OmniCart Direct. Level 2 (Growing Company) is now ready to unlock!
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/dashboard"
                className="btn-primary text-xs py-2.5 px-6"
              >
                Return to Career Dashboard
              </Link>
              <button
                onClick={() => setShowCelebration(false)}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
