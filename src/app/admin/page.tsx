"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Sliders,
  CheckCircle,
  EyeOff,
  Eye,
  Trash2,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  Building,
  Filter,
  Check,
  Zap,
} from "lucide-react";
import { ReportedQuestionSummary } from "@/lib/reports/report-service";
import { UnlockRuleConfig } from "@/lib/config/app-config";

export default function AdminPage() {
  const [reports, setReports] = useState<ReportedQuestionSummary[]>([]);
  const [config, setConfig] = useState<UnlockRuleConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Editable config state
  const [formConfig, setFormConfig] = useState<UnlockRuleConfig>({
    minSolved: 70,
    minBossSolved: 5,
    hintPenaltyPct: 0.25,
    maxAttemptsBeforeSolution: 3,
    rateLimitSeconds: 5,
    reportAutoHideThreshold: 3,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reports");
      const data = await res.json();
      if (data.reports) setReports(data.reports);
      if (data.config) {
        setConfig(data.config);
        setFormConfig(data.config);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResolveAction = async (
    questionId: string,
    action: "dismiss" | "hide" | "restore"
  ) => {
    try {
      setActionLoading(`${questionId}:${action}`);
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, action }),
      });
      if (res.ok) {
        await loadData();
        setSaveSuccess(`Successfully updated ${questionId}`);
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Error executing report resolution:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading("config");
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configUpdates: formConfig }),
      });
      const data = await res.json();
      if (data.config) {
        setConfig(data.config);
        setSaveSuccess("Configuration rules saved successfully!");
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save config:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <ShieldAlert className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <h1 className="font-black text-lg tracking-tight text-[var(--ink)]">
                  Quality Assurance & Admin Console
                </h1>
                <p className="text-[11px] text-[var(--ink)] opacity-75 font-semibold">
                  Honor Policy Enforcement • Question Reports • Auto-Hide Thresholds
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Queue</span>
            </button>
            <Link href="/office/ecommerce/level-1" className="btn-primary text-xs py-2 px-3.5">
              Open Simulator
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {saveSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Global Config Settings */}
        <section className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 shadow-[3px_3px_0px_var(--ocean)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[var(--ocean-hover)]" />
              <h2 className="font-extrabold text-base text-[var(--ink)]">
                Quality & Platform Thresholds (Spec Section 9.7)
              </h2>
            </div>
            <span className="text-xs font-bold text-[var(--ink)] opacity-70">
              Live Configuration
            </span>
          </div>

          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--sky)] space-y-1">
              <label className="font-extrabold text-[var(--ink)] block">
                Auto-Hide Question Threshold
              </label>
              <p className="text-[11px] text-[var(--ink)] opacity-70">
                Number of user reports before a question is quarantined.
              </p>
              <input
                type="number"
                min="1"
                max="20"
                value={formConfig.reportAutoHideThreshold}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    reportAutoHideThreshold: parseInt(e.target.value) || 3,
                  })
                }
                className="w-full mt-2 px-3 py-1.5 border-2 border-[var(--sky)] rounded-lg font-bold text-[var(--ink)] bg-[var(--white)]"
              />
            </div>

            <div className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--sky)] space-y-1">
              <label className="font-extrabold text-[var(--ink)] block">
                Submit Rate Limit (Seconds)
              </label>
              <p className="text-[11px] text-[var(--ink)] opacity-70">
                Cooldown period between learner query submissions.
              </p>
              <input
                type="number"
                min="1"
                max="60"
                value={formConfig.rateLimitSeconds}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    rateLimitSeconds: parseInt(e.target.value) || 5,
                  })
                }
                className="w-full mt-2 px-3 py-1.5 border-2 border-[var(--sky)] rounded-lg font-bold text-[var(--ink)] bg-[var(--white)]"
              />
            </div>

            <div className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--sky)] space-y-1">
              <label className="font-extrabold text-[var(--ink)] block">
                Level 2 Unlock Minimums
              </label>
              <p className="text-[11px] text-[var(--ink)] opacity-70">
                Required regular + boss questions solved.
              </p>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formConfig.minSolved}
                  onChange={(e) =>
                    setFormConfig({
                      ...formConfig,
                      minSolved: parseInt(e.target.value) || 70,
                    })
                  }
                  className="w-1/2 px-3 py-1.5 border-2 border-[var(--sky)] rounded-lg font-bold text-[var(--ink)] bg-[var(--white)]"
                  placeholder="Min Solved"
                />
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formConfig.minBossSolved}
                  onChange={(e) =>
                    setFormConfig({
                      ...formConfig,
                      minBossSolved: parseInt(e.target.value) || 5,
                    })
                  }
                  className="w-1/2 px-3 py-1.5 border-2 border-[var(--sky)] rounded-lg font-bold text-[var(--ink)] bg-[var(--white)]"
                  placeholder="Boss"
                />
              </div>
            </div>

            <div className="md:col-span-3 flex justify-end pt-1">
              <button
                type="submit"
                disabled={actionLoading === "config"}
                className="btn-primary text-xs py-2 px-5 font-bold flex items-center gap-1.5"
              >
                {actionLoading === "config" ? "Saving..." : "Save Platform Thresholds"}
              </button>
            </div>
          </form>
        </section>

        {/* Reported Questions Queue */}
        <section className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-2xl p-6 shadow-[3px_3px_0px_var(--ocean)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sky)] pb-3">
            <div>
              <h2 className="font-extrabold text-base text-[var(--ink)] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Reported Questions & Auto-Quarantine Queue
              </h2>
              <p className="text-xs text-[var(--ink)] opacity-70">
                Questions reported by learners. Questions with ≥{" "}
                {config?.reportAutoHideThreshold || 3} reports are automatically hidden from active
                rotation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)] text-xs font-bold px-3 py-1 rounded-full">
                {reports.length} Questions with Feedback
              </span>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-[var(--ink)]">
                QA Queue Clean — No Active Reports
              </h3>
              <p className="text-xs text-[var(--ink)] opacity-70 max-w-sm mx-auto">
                No questions have pending discrepancy flags. Learners are progressing smoothly
                through active questions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((item) => {
                const isAutoHidden =
                  item.status === "hidden" ||
                  item.reportCount >= (config?.reportAutoHideThreshold || 3);

                return (
                  <div
                    key={item.questionId}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isAutoHidden
                        ? "bg-amber-50/60 border-amber-300"
                        : "bg-[var(--surface)] border-[var(--sky)]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-black/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[var(--ocean-hover)]">
                            {item.questionId}
                          </span>
                          <span className="text-xs font-black text-[var(--ink)]">
                            {item.questionTitle}
                          </span>
                          {isAutoHidden ? (
                            <span className="bg-red-100 text-red-900 border border-red-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <EyeOff className="w-3 h-3 text-red-700" />
                              AUTO-HIDDEN ({item.reportCount} Reports)
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Eye className="w-3 h-3 text-emerald-700" />
                              Active ({item.reportCount} Reports)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[var(--ink)] opacity-70 mt-0.5">
                          Domain: {item.domain} • Level {item.levelNumber}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {isAutoHidden ? (
                          <button
                            onClick={() => handleResolveAction(item.questionId, "restore")}
                            disabled={actionLoading === `${item.questionId}:restore`}
                            className="btn-primary text-xs py-1 px-3 flex items-center gap-1"
                            title="Restore question to active rotation"
                          >
                            <Eye className="w-3.5 h-3.5 text-[var(--ink)]" />
                            <span>Restore to Active</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleResolveAction(item.questionId, "hide")}
                            disabled={actionLoading === `${item.questionId}:hide`}
                            className="btn-secondary text-xs py-1 px-3 flex items-center gap-1 text-amber-800"
                            title="Quarantine question manually"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Question</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleResolveAction(item.questionId, "dismiss")}
                          disabled={actionLoading === `${item.questionId}:dismiss`}
                          className="p-1.5 rounded-lg border border-[var(--sky)] bg-[var(--white)] hover:bg-red-50 text-red-700 transition-colors"
                          title="Dismiss all reports and reset counter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Breakdown & Recent feedback */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-bold text-[var(--ink)] block mb-1">
                          Report Categories:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(item.categories).map(([cat, count]) => (
                            <span
                              key={cat}
                              className="bg-[var(--white)] border border-[var(--sky)] px-2 py-0.5 rounded text-[11px] font-semibold text-[var(--ink)]"
                            >
                              {cat.replace("_", " ")}: <strong>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[var(--ink)] block mb-1">
                          Latest Feedback:
                        </span>
                        <div className="space-y-1">
                          {item.latestReports.slice(0, 2).map((r) => (
                            <div
                              key={r.id}
                              className="text-[11px] bg-[var(--white)] border border-[var(--sky)] p-1.5 rounded font-medium text-[var(--ink)]"
                            >
                              &ldquo;{r.message}&rdquo;
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t-2 border-[var(--sky)] py-6 px-4 text-center text-xs font-semibold text-[var(--ink)]">
        SQL Office Simulator • Quality Assurance & Administrative System
      </footer>
    </div>
  );
}
