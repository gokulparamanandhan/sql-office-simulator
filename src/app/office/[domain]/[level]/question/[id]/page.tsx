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
  Table2,
  Copy,
  Check,
  Search,
  Database,
} from "lucide-react";
import { getQuestionsForDomainAndLevel, getQuestionById } from "@/lib/content/content-registry";
import { getDomainOfficeMetadata } from "@/lib/office/all-domains-metadata";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackLink from "@/components/FeedbackLink";
import { updateStreak } from "@/lib/gamification/gamification-service";

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
    expectedRowCount?: number;
    expectedColumnCount?: number;
    actualColumns?: string[];
    expectedColumns?: string[];
    xpEarned?: number;
  } | null>(null);

  // Expected deliverable specification & preview state
  const [expectedInfo, setExpectedInfo] = useState<{
    expectedColumns: string[];
    columnCount: number;
    rowCount: number;
    sampleRows: Record<string, unknown>[];
    orderSensitive: boolean;
  } | null>(null);
  const [copiedCol, setCopiedCol] = useState<string | null>(null);
  const [insertedFeedback, setInsertedFeedback] = useState<boolean>(false);

  // Hints and solutions
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [solutionUnlocked, setSolutionUnlocked] = useState<boolean>(false);
  const [viewingSolution, setViewingSolution] = useState<boolean>(false);
  const [solutionPenalized, setSolutionPenalized] = useState<boolean>(false);

  // Scratchpad & Schema lookup state
  const [scratchpad, setScratchpad] = useState<string>("");
  const [activeLeftTab, setActiveLeftTab] = useState<"brief" | "hints" | "scratchpad" | "schema">("brief");
  const [schemaSearch, setSchemaSearch] = useState<string>("");
  const [copiedSchemaText, setCopiedSchemaText] = useState<string | null>(null);
  const [schemaToast, setSchemaToast] = useState<string | null>(null);

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
  const completionDisposableRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    return () => {
      if (completionDisposableRef.current) {
        completionDisposableRef.current.dispose();
        completionDisposableRef.current = null;
      }
    };
  }, []);

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

  // Load expected deliverable details & sample rows
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/questions/${id}/expected`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && !data.error) {
          setExpectedInfo(data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyColumn = (col: string) => {
    navigator.clipboard?.writeText(col);
    setCopiedCol(col);
    setTimeout(() => setCopiedCol(null), 1800);
  };

  const handleInsertExpectedColumns = () => {
    const cols = question.expected_columns || [];
    if (!cols.length) return;
    const colList = cols.join(", ");

    let newSql = sql;
    if (!sql || sql.trim() === "SELECT" || sql.trim() === "SELECT " || sql.trim() === "") {
      newSql = `SELECT ${colList}\nFROM `;
    } else if (sql.includes("SELECT *")) {
      newSql = sql.replace("SELECT *", `SELECT ${colList}`);
    } else if (/^SELECT\s+/i.test(sql) && !sql.toUpperCase().includes("FROM")) {
      newSql = `SELECT ${colList} `;
    } else {
      navigator.clipboard?.writeText(colList);
    }
    setSql(newSql);
    try {
      localStorage.setItem(`sql_office_${id}_code`, newSql);
    } catch {}
    setInsertedFeedback(true);
    setTimeout(() => setInsertedFeedback(false), 2000);
  };

  const handleCopySchemaText = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSchemaText(text);
    setSchemaToast(`Copied "${text}"`);
    setTimeout(() => {
      setCopiedSchemaText(null);
      setSchemaToast(null);
    }, 1800);
  };

  const handleInsertSchemaText = (text: string) => {
    setSql((prev) => {
      const trimmed = prev.trimEnd();
      let updated: string;
      if (!trimmed || trimmed === "SELECT") {
        updated = trimmed + " " + text;
      } else {
        updated = trimmed + " " + text;
      }
      try {
        localStorage.setItem(`sql_office_${id}_code`, updated);
      } catch {}
      return updated;
    });
    setSchemaToast(`Inserted "${text}" into editor`);
    setTimeout(() => setSchemaToast(null), 1800);
  };

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

    // Dispose existing provider before registering a new one to prevent duplicated suggestions
    if (completionDisposableRef.current) {
      completionDisposableRef.current.dispose();
      completionDisposableRef.current = null;
    }
    // Also check global window tracker across remounts / StrictMode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).__sqlCompletionDisposable) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__sqlCompletionDisposable.dispose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__sqlCompletionDisposable = null;
    }

    const tables = office.schema.map((t) => t.name);
    const columns = Array.from(new Set(office.schema.flatMap((t) => t.columns.map((c) => c.name))));
    const keywords = [
      "SELECT", "FROM", "WHERE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON",
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "WITH", "AS", "AND", "OR", "IN",
      "LIKE", "BETWEEN", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END",
      "COUNT", "SUM", "AVG", "MIN", "MAX", "DISTINCT", "COALESCE"
    ];

    const provider = monaco.languages.registerCompletionItemProvider("sql", {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const rawSuggestions = [
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

        // Deduplicate suggestions by label to ensure no duplicate items
        const seen = new Set<string>();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const suggestions: any[] = [];
        for (const item of rawSuggestions) {
          const key = item.label.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            suggestions.push(item);
          }
        }

        return { suggestions };
      },
    });

    completionDisposableRef.current = provider;
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__sqlCompletionDisposable = provider;
    }
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

          const streakResult = updateStreak(
            userStats.streak || 1,
            userStats.longestStreak || userStats.streak || 1,
            userStats.lastActiveDate,
            {
              totalXp: userStats.xp,
              activeDates: userStats.activeDates,
            }
          );
          userStats.streak = streakResult.currentStreak;
          userStats.longestStreak = streakResult.longestStreak;
          userStats.lastActiveDate = streakResult.lastActiveDate;
          userStats.activeDates = streakResult.activeDates;

          localStorage.setItem(statsKey, JSON.stringify(userStats));

          // Check if level completion celebration threshold reached (all questions in this level completed)
          const allCount = Object.keys(current).length;
          const totalInLevel = domainQuestions.length;
          if (totalInLevel > 0 && allCount >= totalInLevel) {
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

                {/* Expected Output Specification & Sample Preview Card */}
                <div className="bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-4 shadow-[3px_3px_0px_var(--ink)] space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[var(--sky)] pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)] shrink-0">
                        <Table2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-xs uppercase tracking-wider text-[var(--ink)] flex items-center gap-1.5">
                          <span>Expected Output</span>
                          <span className="text-[10px] lowercase text-[var(--ocean-hover)] font-mono font-bold">
                            ({question.expected_columns.length} {question.expected_columns.length === 1 ? "col" : "cols"})
                          </span>
                        </div>
                        <div className="text-[10px] text-[var(--ink)] opacity-70">
                          Required schema for stakeholder verification
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[var(--white)] border border-[var(--ink)] text-[var(--ink)] shadow-xs">
                        {question.expected_columns.length} {question.expected_columns.length === 1 ? "column" : "columns"}
                      </span>
                      {question.validation?.order_sensitive ? (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300"
                          title="ORDER BY clause is required for grading"
                        >
                          Ordered
                        </span>
                      ) : (
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300"
                          title="Any row order accepted"
                        >
                          Any Order
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Required Columns Pill List */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
                      <span className="text-[11px]">Required Columns ({question.expected_columns.length}):</span>
                      <button
                        onClick={handleInsertExpectedColumns}
                        className="text-[10px] font-bold text-[var(--ocean-hover)] hover:underline flex items-center gap-1 transition-colors"
                        title="Fill SELECT statement with these expected columns"
                      >
                        {insertedFeedback ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Inserted into Editor!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Copy className="w-3 h-3" />
                            <span>Use in Editor</span>
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {question.expected_columns.map((col, idx) => {
                        const isCopied = copiedCol === col;
                        return (
                          <button
                            key={col}
                            onClick={() => handleCopyColumn(col)}
                            className="group flex items-center gap-1 font-mono text-[11px] bg-[var(--white)] hover:bg-[var(--mist)] border border-[var(--sky)] px-2 py-0.5 rounded text-[var(--ink)] transition-colors shadow-xs"
                            title={`Click to copy "${col}"`}
                          >
                            <span className="text-[9px] opacity-40 font-bold">#{idx + 1}</span>
                            <span className="font-bold">{col}</span>
                            {isCopied ? (
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                            ) : (
                              <span className="opacity-0 group-hover:opacity-70 text-[9px]">📋</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sample Format Preview Table */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] opacity-80">
                      <span className="text-[11px]">Deliverable Format Preview:</span>
                      <span className="text-[10px] font-normal opacity-60">
                        {expectedInfo?.rowCount !== undefined
                          ? `${expectedInfo.rowCount} rows expected`
                          : "Evaluating sample rows..."}
                      </span>
                    </div>

                    <div className="border border-[var(--sky)] rounded-lg overflow-x-auto bg-[var(--white)] shadow-xs">
                      <table className="w-full text-left text-[11px] font-mono border-collapse">
                        <thead className="bg-[var(--mist)] border-b border-[var(--sky)] text-[var(--ink)]">
                          <tr>
                            <th className="py-1 px-2 text-center text-[10px] opacity-50 w-7">#</th>
                            {question.expected_columns.map((col) => (
                              <th key={col} className="py-1 px-2.5 font-bold whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--sky)]">
                          {expectedInfo && expectedInfo.sampleRows && expectedInfo.sampleRows.length > 0 ? (
                            expectedInfo.sampleRows.map((row, idx) => (
                              <tr key={idx} className="hover:bg-[var(--surface)]">
                                <td className="py-1 px-2 text-center text-[10px] opacity-40">{idx + 1}</td>
                                {question.expected_columns.map((col) => (
                                  <td key={col} className="py-1 px-2.5 whitespace-nowrap text-[var(--ink)]">
                                    {row[col] !== undefined && row[col] !== null ? (
                                      String(row[col])
                                    ) : (
                                      <span className="italic opacity-40">NULL</span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="py-1.5 px-2 text-center text-[10px] opacity-40">1</td>
                              {question.expected_columns.map((col) => (
                                <td key={col} className="py-1.5 px-2.5 whitespace-nowrap text-xs text-gray-400 italic">
                                  ...
                                </td>
                              ))}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-[var(--ink)] opacity-60 italic">
                      * First {expectedInfo?.sampleRows?.length || 1} sample rows shown for structure. Your query must produce these exact columns.
                    </p>
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
                <div className="bg-[var(--surface)] border border-[var(--sky)] p-3 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-[var(--ink)] flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-[var(--ocean)]" />
                        <span>Database Schema Explorer</span>
                      </h4>
                      <p className="text-[11px] text-[var(--ink)] opacity-70">
                        {office.company.name} • {office.schema.length} Operational Tables
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)]">
                      {(domain === "ecommerce" ? "ecom" : domain)}_l{cleanLevel}
                    </span>
                  </div>

                  {/* Schema Search / Filter Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--ink)] opacity-50 pointer-events-none" />
                    <input
                      type="text"
                      value={schemaSearch}
                      onChange={(e) => setSchemaSearch(e.target.value)}
                      placeholder="Search tables, columns, or keys (e.g. shipments, carrier)..."
                      className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-[var(--sky)] bg-[var(--white)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)] transition-all shadow-xs"
                    />
                    {schemaSearch && (
                      <button
                        onClick={() => setSchemaSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--ink)] opacity-60 hover:opacity-100 font-bold"
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Toast feedback */}
                  {schemaToast && (
                    <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-1 rounded flex items-center gap-1 animate-fade-in">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>{schemaToast}</span>
                    </div>
                  )}
                </div>

                {/* Table Cards List */}
                {(() => {
                  const filteredTables = office.schema.filter((tbl) => {
                    if (!schemaSearch.trim()) return true;
                    const q = schemaSearch.toLowerCase();
                    return (
                      tbl.name.toLowerCase().includes(q) ||
                      tbl.description.toLowerCase().includes(q) ||
                      tbl.columns.some(
                        (c) =>
                          c.name.toLowerCase().includes(q) ||
                          c.type.toLowerCase().includes(q) ||
                          c.description.toLowerCase().includes(q)
                      )
                    );
                  });

                  if (filteredTables.length === 0) {
                    return (
                      <div className="bg-[var(--surface)] border-2 border-dashed border-[var(--sky)] rounded-xl p-6 text-center space-y-2">
                        <p className="text-xs font-bold text-[var(--ink)]">
                          No tables or columns match &ldquo;{schemaSearch}&rdquo;
                        </p>
                        <p className="text-[11px] text-[var(--ink)] opacity-70">
                          Try searching for table names like &ldquo;shipments&rdquo;, &ldquo;orders&rdquo;, or &ldquo;products&rdquo;.
                        </p>
                        <button
                          onClick={() => setSchemaSearch("")}
                          className="btn-secondary text-xs px-3 py-1 mt-2 inline-flex items-center gap-1"
                        >
                          Clear Search &amp; Show All {office.schema.length} Tables
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[var(--ink)] opacity-70 px-1">
                        <span>
                          {filteredTables.length === office.schema.length
                            ? `All ${office.schema.length} Tables Available`
                            : `Showing ${filteredTables.length} of ${office.schema.length} Tables`}
                        </span>
                        <span className="text-[10px] font-normal">Click column to copy • &ldquo;Use&rdquo; to insert</span>
                      </div>

                      {filteredTables.map((tbl) => {
                        const isTargetMatched =
                          schemaSearch.trim() && tbl.name.toLowerCase().includes(schemaSearch.toLowerCase());

                        return (
                          <div
                            key={tbl.name}
                            className={`bg-[var(--surface)] border-2 rounded-xl p-3.5 space-y-2.5 text-xs transition-all shadow-xs ${
                              isTargetMatched
                                ? "border-[var(--ocean)] shadow-[2px_2px_0px_var(--ocean)]"
                                : "border-[var(--sky)] hover:border-[var(--ink)]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 border-b border-[var(--sky)] pb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-sm text-[var(--ink)]">
                                    {tbl.name}
                                  </span>
                                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)] opacity-80">
                                    {tbl.columns.length} cols
                                  </span>
                                </div>
                                <p className="text-[11px] text-[var(--ink)] opacity-75 mt-0.5 leading-snug">
                                  {tbl.description}
                                </p>
                              </div>

                              <button
                                onClick={() => handleInsertSchemaText(`FROM ${tbl.name}`)}
                                className="text-[10px] font-bold text-[var(--ocean-hover)] hover:underline flex items-center gap-1 shrink-0 bg-[var(--white)] px-2 py-1 rounded border border-[var(--sky)] shadow-xs transition-colors"
                                title={`Insert "FROM ${tbl.name}" into editor`}
                              >
                                <Copy className="w-3 h-3" />
                                <span>Use Table</span>
                              </button>
                            </div>

                            {/* Columns Chips Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {tbl.columns.map((c) => {
                                const isColMatched =
                                  schemaSearch.trim() &&
                                  (c.name.toLowerCase().includes(schemaSearch.toLowerCase()) ||
                                    c.description.toLowerCase().includes(schemaSearch.toLowerCase()));
                                const isCopied = copiedSchemaText === c.name;

                                return (
                                  <div
                                    key={c.name}
                                    onClick={() => handleCopySchemaText(c.name)}
                                    className={`group flex items-center justify-between p-1.5 rounded-lg border font-mono text-[11px] cursor-pointer transition-all ${
                                      isCopied
                                        ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                                        : isColMatched
                                        ? "bg-amber-50 border-amber-400 text-[var(--ink)] font-bold shadow-xs"
                                        : "bg-[var(--white)] hover:bg-[var(--mist)] border-[var(--sky)] text-[var(--ink)]"
                                    }`}
                                    title={`${c.description} • Click to copy "${c.name}"`}
                                  >
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span className="font-bold truncate">{c.name}</span>
                                      {c.isPk && (
                                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1 rounded shrink-0">
                                          PK
                                        </span>
                                      )}
                                      {c.fkTarget && (
                                        <span className="bg-sky-100 text-sky-900 border border-sky-300 text-[9px] font-bold px-1 rounded shrink-0" title={`Foreign Key to ${c.fkTarget}`}>
                                          FK
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0 ml-1">
                                      <span className="text-[9px] opacity-60 font-sans">{c.type}</span>
                                      {isCopied ? (
                                        <Check className="w-3 h-3 text-emerald-600" />
                                      ) : (
                                        <span className="opacity-0 group-hover:opacity-70 text-[9px]">📋</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
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
              <button
                onClick={handleInsertExpectedColumns}
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--sun)] hover:bg-amber-300 border border-[var(--ink)] text-[var(--ink)] transition-colors flex items-center gap-1 shadow-xs"
                title="Populate SELECT statement with expected columns"
              >
                {insertedFeedback ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-800" />
                    <span>Columns Inserted!</span>
                  </>
                ) : (
                  <>
                    <Table2 className="w-3 h-3 text-[var(--ink)]" />
                    <span>Columns ({question.expected_columns.length})</span>
                  </>
                )}
              </button>
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
                className={`p-3 border-b-2 text-xs font-semibold flex flex-col gap-2 shrink-0 ${
                  submitResult.isCorrect
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                    : "bg-rose-50 text-rose-900 border-rose-300"
                }`}
              >
                <div className="flex items-center justify-between">
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

                {!submitResult.isCorrect && submitResult.code === "COLUMN_COUNT_MISMATCH" && (
                  <div className="pt-2 border-t border-rose-200 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="font-bold text-rose-950">
                      Expected {question.expected_columns.length} columns:
                    </span>
                    {question.expected_columns.map((c) => (
                      <span
                        key={c}
                        className="font-mono px-1.5 py-0.5 bg-white border border-rose-300 rounded text-rose-950 font-bold"
                      >
                        {c}
                      </span>
                    ))}
                    <button
                      onClick={handleInsertExpectedColumns}
                      className="ml-auto underline font-bold text-rose-800 hover:text-rose-950 text-[10px]"
                    >
                      Insert into editor
                    </button>
                  </div>
                )}
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
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px]">
                  {runResult ? `Results Preview (${runResult.rowCount} rows)` : "Results Preview"}
                </span>
                {runResult && (
                  runResult.columns.length === question.expected_columns.length ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      ✓ {runResult.columns.length}/{question.expected_columns.length} cols match
                    </span>
                  ) : (
                    <span
                      className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded-full flex items-center gap-1"
                      title={`Expected ${question.expected_columns.length} columns: ${question.expected_columns.join(', ')}`}
                    >
                      ⚠️ {runResult.columns.length}/{question.expected_columns.length} cols ({question.expected_columns.length} expected)
                    </span>
                  )
                )}
              </div>
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
                Level {cleanLevel} Complete!
              </span>
              <h2 className="text-2xl font-black text-[var(--ink)]">
                Outstanding Performance, Analyst!
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink)] opacity-85 leading-relaxed">
                You have answered leadership&apos;s requests and successfully cleared Level {cleanLevel} at {office.company.name}. Level {Number(cleanLevel) + 1} is now ready to unlock!
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
