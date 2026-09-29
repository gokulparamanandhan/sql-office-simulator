"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  LogOut,
  Lock,
  Smartphone,
  KeyRound,
  Copy,
  X,
  ShieldCheck,
} from "lucide-react";
import { ReportedQuestionSummary } from "@/lib/reports/report-service";
import { UnlockRuleConfig } from "@/lib/config/app-config";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [reports, setReports] = useState<ReportedQuestionSummary[]>([]);
  const [config, setConfig] = useState<UnlockRuleConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const [users, setUsers] = useState<
    Array<{ id: string; email: string; name: string; role: string; provider?: string; createdAt?: string }>
  >([]);

  // 2FA Management State
  const [twoFaModalOpen, setTwoFaModalOpen] = useState(false);
  const [twoFaSetup, setTwoFaSetup] = useState<{
    secret: string;
    otpauthUri: string;
    qrCodeUrl: string;
    isEnabled: boolean;
    backupCodes: string[];
  } | null>(null);
  const [twoFaCode, setTwoFaCode] = useState("");
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [twoFaError, setTwoFaError] = useState<string | null>(null);
  const [twoFaSuccess, setTwoFaSuccess] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);

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
      const [reportsRes, usersRes] = await Promise.all([
        fetch("/api/admin/reports"),
        fetch("/api/admin/users"),
      ]);

      if (reportsRes.status === 401 || usersRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await reportsRes.json();
      const usersData = await usersRes.json();

      setAuthorized(true);
      if (data.reports) setReports(data.reports);
      if (data.config) {
        setConfig(data.config);
        setFormConfig(data.config);
      }
      if (usersData.users) setUsers(usersData.users);

      // Load 2FA status
      load2FASetup();
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const load2FASetup = async () => {
    try {
      const res = await fetch("/api/admin/auth/2fa/setup");
      if (res.ok) {
        const data = await res.json();
        setTwoFaSetup(data);
      }
    } catch {
      // Ignore
    }
  };

  const handleVerifyAndEnable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFaError(null);
    setTwoFaSuccess(null);
    setTwoFaLoading(true);

    try {
      const res = await fetch("/api/admin/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: twoFaCode, enableSetup: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to verify 2FA code.");
      }
      setTwoFaSuccess("Google Authenticator 2FA activated successfully!");
      setTwoFaCode("");
      load2FASetup();
    } catch (err: unknown) {
      setTwoFaError(err instanceof Error ? err.message : "Verification error.");
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleDisable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFaError(null);
    setTwoFaSuccess(null);
    setTwoFaLoading(true);

    try {
      const res = await fetch("/api/admin/auth/2fa/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: false, password: disablePassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to disable 2FA.");
      }
      setTwoFaSuccess("2FA has been disabled.");
      setDisablePassword("");
      load2FASetup();
    } catch (err: unknown) {
      setTwoFaError(err instanceof Error ? err.message : "Error disabling 2FA.");
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    router.push("/admin/login");
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

  if (loading && !authorized) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-8 max-w-sm w-full text-center space-y-4 shadow-[4px_4px_0px_var(--ocean)]">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center animate-spin">
            <Lock className="w-6 h-6 text-[var(--ink)]" />
          </div>
          <h3 className="font-black text-lg text-[var(--ink)]">Verifying Administrator Access...</h3>
          <p className="text-xs text-[var(--ink)] opacity-75">
            Checking session credentials and security authorization...
          </p>
        </div>
      </div>
    );
  }

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
              onClick={() => {
                load2FASetup();
                setTwoFaModalOpen(true);
              }}
              className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                twoFaSetup?.isEnabled
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                  : "border-amber-500 bg-amber-100 text-amber-950 hover:bg-amber-200 animate-pulse"
              }`}
              title="Configure Google Authenticator Two-Factor Authentication"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{twoFaSetup?.isEnabled ? "2FA: Google Authenticator Active" : "Setup Google Authenticator 2FA"}</span>
            </button>

            <button
              onClick={loadData}
              disabled={loading}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Queue</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 flex items-center gap-1.5 transition-colors"
              title="Terminate Administrator Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
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

        {/* Security Warning: 2FA Not Configured */}
        {twoFaSetup && !twoFaSetup.isEnabled && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-black text-sm text-[var(--ink)]">
                  Google Authenticator 2FA is Not Configured Yet
                </h3>
                <p className="text-xs text-[var(--ink)] opacity-80 font-medium">
                  Scan the QR code with your mobile device now to protect admin operations with Google Authenticator MFA.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                load2FASetup();
                setTwoFaModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
            >
              <Smartphone className="w-4 h-4" />
              <span>Scan QR & Activate 2FA</span>
            </button>
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

        {/* User Database & Analytics (Image 4 Neo-Brutalist Table) */}
        <section className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[6px_6px_0px_var(--ink)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--ink)] pb-3">
            <div>
              <h2 className="font-black text-base text-[var(--ink)] flex items-center gap-2">
                <Building className="w-5 h-5 text-[var(--accent-teal)]" />
                User Database &amp; Analysis ({users.length} Registered Accounts)
              </h2>
              <p className="text-xs font-bold text-[var(--ink)] opacity-70">
                All registered users stored in database for data analysis and tracking
              </p>
            </div>

            <button
              onClick={() => {
                const csvHeader = "ID,Email,Name,Role,Provider,CreatedAt\n";
                const csvRows = users
                  .map((u) => `"${u.id}","${u.email}","${u.name}","${u.role}","${u.provider || 'Password'}","${u.createdAt || ''}"`)
                  .join("\n");
                const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `sql_office_users_${Date.now()}.csv`;
                a.click();
              }}
              className="btn-secondary text-xs py-2 px-3.5 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
            >
              Export Users CSV
            </button>
          </div>

          <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden shadow-[3px_3px_0px_var(--ink)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[var(--sun)] border-b-2 border-[var(--ink)]">
                  <tr>
                    <th className="p-3 border-r-2 border-[var(--ink)]">Name</th>
                    <th className="p-3 border-r-2 border-[var(--ink)]">Email</th>
                    <th className="p-3 border-r-2 border-[var(--ink)]">Auth Method</th>
                    <th className="p-3 border-r-2 border-[var(--ink)]">Role</th>
                    <th className="p-3">Registered At</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[var(--ink)] bg-[var(--white)]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[var(--paper-beige)]">
                      <td className="p-3 font-bold border-r-2 border-[var(--ink)]">{u.name}</td>
                      <td className="p-3 border-r-2 border-[var(--ink)]">{u.email}</td>
                      <td className="p-3 border-r-2 border-[var(--ink)]">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border border-[var(--ink)] ${
                          u.provider?.includes("Google") ? "bg-[var(--accent-teal)] text-[var(--ink)]" : "bg-[var(--paper-beige)] text-[var(--ink)]"
                        }`}>
                          {u.provider || "Password"}
                        </span>
                      </td>
                      <td className="p-3 border-r-2 border-[var(--ink)] capitalize font-semibold">{u.role}</td>
                      <td className="p-3 text-[11px] text-[var(--ink)] opacity-75">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Active"}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-xs font-bold opacity-60">
                        No user accounts recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
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

      {/* Google Authenticator 2FA Setup Modal */}
      {twoFaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl max-w-lg w-full p-6 shadow-[6px_6px_0px_var(--ink)] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--sky)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 border border-[var(--ink)] flex items-center justify-center font-bold text-white shadow-sm">
                  <Smartphone className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[var(--ink)]">
                    Google Authenticator 2FA
                  </h3>
                  <p className="text-[11px] text-[var(--ink)] opacity-70 font-semibold">
                    Protect Admin Access with Time-Based One-Time Passwords
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTwoFaModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[var(--mist)] text-[var(--ink)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {twoFaError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{twoFaError}</span>
              </div>
            )}

            {twoFaSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{twoFaSuccess}</span>
              </div>
            )}

            {twoFaSetup && (
              <div className="space-y-4">
                {twoFaSetup.isEnabled ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2">
                      <div className="flex items-center gap-2 font-black text-xs text-emerald-800">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span>2FA Protection is Currently Active</span>
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-900/90 font-medium">
                        Admin login requires both your password and a 6-digit code from Google Authenticator.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
                        <span>Emergency Backup Recovery Codes</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(twoFaSetup.backupCodes.join("\n"));
                            setCopiedBackupCodes(true);
                            setTimeout(() => setCopiedBackupCodes(false), 2000);
                          }}
                          className="text-[11px] font-extrabold text-[var(--ocean-hover)] underline hover:text-[var(--ink)] inline-flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedBackupCodes ? "Copied!" : "Copy All"}</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 p-3 bg-[var(--surface)] border border-[var(--sky)] rounded-xl font-mono text-xs text-center font-bold">
                        {twoFaSetup.backupCodes.map((code, idx) => (
                          <div key={idx} className="p-1 bg-[var(--white)] rounded border border-[var(--sky)]">
                            {code}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-[var(--ink)] opacity-70">
                        Each code can be used once if you ever lose access to your Google Authenticator app.
                      </p>
                    </div>

                    <form onSubmit={handleDisable2FA} className="pt-3 border-t border-[var(--sky)] space-y-2">
                      <label className="block text-xs font-bold text-rose-800">
                        Disable Two-Factor Authentication
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          required
                          value={disablePassword}
                          onChange={(e) => setDisablePassword(e.target.value)}
                          placeholder="Confirm admin password"
                          className="flex-1 px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold focus:outline-none focus:border-rose-500"
                        />
                        <button
                          type="submit"
                          disabled={twoFaLoading || !disablePassword}
                          className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0"
                        >
                          Disable 2FA
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[var(--surface)] rounded-xl border border-[var(--sky)]">
                      <div className="p-2 bg-[var(--white)] rounded-xl border border-[var(--sky)] shrink-0 shadow-sm">
                        <img
                          src={twoFaSetup.qrCodeUrl}
                          alt="Google Authenticator QR Code"
                          className="w-36 h-36"
                        />
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="font-black text-sm text-[var(--ink)]">
                          1. Scan in Google Authenticator
                        </div>
                        <p className="text-[11px] text-[var(--ink)] opacity-80 leading-relaxed font-medium">
                          Open Google Authenticator on your mobile phone, tap <strong>&ldquo;+&rdquo;</strong>, and scan the QR code.
                        </p>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[var(--ink)] opacity-60 block">
                            Or enter secret key manually:
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <code className="px-2 py-1 bg-[var(--white)] border border-[var(--sky)] rounded font-mono text-[11px] font-bold text-[var(--ocean-hover)]">
                              {twoFaSetup.secret}
                            </code>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(twoFaSetup.secret);
                                setCopiedKey(true);
                                setTimeout(() => setCopiedKey(false), 2000);
                              }}
                              className="p-1 rounded bg-[var(--white)] border border-[var(--sky)] text-[var(--ink)] hover:bg-[var(--mist)] text-xs"
                              title="Copy key"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            {copiedKey && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleVerifyAndEnable2FA} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                          2. Enter 6-Digit Code from App to Confirm
                        </label>
                        <input
                          type="text"
                          required
                          value={twoFaCode}
                          onChange={(e) => setTwoFaCode(e.target.value.trim())}
                          placeholder="e.g. 123456"
                          maxLength={6}
                          className="w-full text-center tracking-widest text-lg font-mono py-2 border-2 border-[var(--sky)] rounded-lg font-bold text-[var(--ink)] focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={twoFaLoading || twoFaCode.length !== 6}
                        className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{twoFaLoading ? "Verifying..." : "Confirm & Activate Google Authenticator"}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
