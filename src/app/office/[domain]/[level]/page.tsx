"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Inbox,
  Users,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  ArrowLeft,
  Briefcase,
  Flame,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { getDomainOfficeMetadata } from "@/lib/office/all-domains-metadata";
import { getQuestionsForDomainAndLevel } from "@/lib/content/content-registry";
import FeedbackLink from "@/components/FeedbackLink";

export default function OfficeLevelPage({
  params,
}: {
  params: Promise<{ domain: string; level: string }>;
}) {
  const router = useRouter();
  const { domain, level } = use(params);
  const cleanLevel = (!level || level === "level-undefined" || level === "undefined") ? "1" : level.replace(/^level-/, "");
  const levelRoute = `level-${cleanLevel}`;
  const office = getDomainOfficeMetadata(domain, cleanLevel);
  const questions = getQuestionsForDomainAndLevel(domain, parseInt(cleanLevel, 10));

  const [activeTab, setActiveTab] = useState<"inbox" | "team" | "schema">("inbox");
  const [selectedTable, setSelectedTable] = useState<string>(office.schema[0]?.name || "customers");

  // In local browser state, track which questions are solved
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});
  const [pledgeModalOpen, setPledgeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Verify user is authenticated; redirect to signup if not
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
      })
      .catch(() => {
        router.push(`/auth/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
      });

    // Load solved states from user-scoped storage
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      const stored = localStorage.getItem(`sql_office_${currentUserId}_${domain}_l${cleanLevel}_solved`);
      if (stored) {
        setSolvedMap(JSON.parse(stored));
      }

      // Check if learner has acknowledged level honor pledge
      const ack = localStorage.getItem(`sql_office_${currentUserId}_level_pledge_ack_${domain}_${cleanLevel}`);
      if (!ack) {
        setPledgeModalOpen(true);
      }
    } catch {
      // Ignore
    }
  }, [domain, cleanLevel, router]);

  const handleAcknowledgePledge = () => {
    try {
      const currentUserId = localStorage.getItem("sql_office_last_user_id") || "guest";
      localStorage.setItem(`sql_office_${currentUserId}_level_pledge_ack_${domain}_${cleanLevel}`, "true");
    } catch {
      // Ignore
    }
    setPledgeModalOpen(false);
  };

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const totalQuestions = questions.length;
  const company = office.company;
  const team = office.team;
  const schema = office.schema;

  const currentTableDef = schema.find((t) => t.name === selectedTable) || schema[0];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Office Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors"
              title="Return to Career Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
                <Building2 className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-[var(--ink)]">
                    {company.name}
                  </span>
                  <span className="bg-[var(--sun)] text-[var(--ink)] border border-[var(--ink)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {company.stageName}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--ink)] opacity-75 font-medium">
                  {company.employeeCount} • {company.dataHireRole}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPledgeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--sky)] bg-[var(--surface)] hover:bg-[var(--mist)] text-xs font-bold text-[var(--ink)] transition-colors"
              title="Read the workplace honor pledge"
            >
              <span>🛡️</span>
              <span className="hidden sm:inline">Honor Policy</span>
            </button>

            <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--sky)] px-3 py-1.5 rounded-full text-xs font-bold text-[var(--ink)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {solvedCount} / {totalQuestions} Solved
              </span>
            </div>

            <FeedbackLink variant="button" />

            <Link
              href={`/office/${domain}/${levelRoute}/question/${questions[0]?.id || "ecom-L1-001"}`}
              className="btn-primary text-xs py-2 px-3.5"
            >
              <span>Open First Request</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ink)]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Office Simulation Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Office Level XP & Completion Bar */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-4 shadow-[4px_4px_0px_var(--ink)] space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-[var(--ink)]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[var(--sun)] border border-[var(--ink)] text-[10px] font-black">
                LEVEL PROGRESS
              </span>
              <span>{solvedCount} of {totalQuestions} Requests Completed ({solvedCount * 10} XP Earned)</span>
            </div>
            <span className="font-mono">{Math.round((solvedCount / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full h-3.5 bg-[var(--paper-beige)] border-2 border-[var(--ink)] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[var(--accent-teal)] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(solvedCount > 0 ? 3 : 0, Math.round((solvedCount / totalQuestions) * 100))}%` }}
            />
          </div>
        </div>

        {/* CEO Welcome Memo Card */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-[4px_4px_0px_var(--ink)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">
                Internal Memo • All Hands
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--ink)] opacity-70">
              Day 1 at OmniCart Direct
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed italic">
            &ldquo;{company.welcomeMemo}&rdquo;
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-[var(--sky)] gap-2">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 -mb-[2px] transition-all ${
              activeTab === "inbox"
                ? "border-[var(--ink)] text-[var(--ink)] bg-[var(--white)] rounded-t-lg shadow-sm"
                : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
            }`}
          >
            <Inbox className="w-4 h-4 text-[var(--ink)]" />
            <span>Requests Inbox ({totalQuestions})</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 -mb-[2px] transition-all ${
              activeTab === "team"
                ? "border-[var(--ink)] text-[var(--ink)] bg-[var(--white)] rounded-t-lg shadow-sm"
                : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
            }`}
          >
            <Users className="w-4 h-4 text-[var(--ink)]" />
            <span>Team Directory ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("schema")}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 -mb-[2px] transition-all ${
              activeTab === "schema"
                ? "border-[var(--ink)] text-[var(--ink)] bg-[var(--white)] rounded-t-lg shadow-sm"
                : "border-transparent text-[var(--ink)] opacity-70 hover:opacity-100"
            }`}
          >
            <Database className="w-4 h-4 text-[var(--ink)]" />
            <span>Data Dictionary &amp; ER Schema ({schema.length} Tables)</span>
          </button>
        </div>

        {/* TAB 1: INBOX */}
        {activeTab === "inbox" && (
          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0px_var(--ocean)] overflow-hidden">
            <div className="bg-[var(--surface)] border-b-2 border-[var(--sky)] px-5 py-3 flex items-center justify-between text-xs font-bold text-[var(--ink)]">
              <span>INCOMING WORKPLACE REQUESTS</span>
              <span className="opacity-75">Click any request to open the SQL workspace</span>
            </div>

            <div className="divide-y divide-[var(--sky)]">
              {questions.map((q) => {
                const isSolved = Boolean(solvedMap[q.id]);
                return (
                  <Link
                    key={q.id}
                    href={`/office/${domain}/${levelRoute}/question/${q.id}`}
                    className={`block p-4 sm:p-5 transition-all hover:bg-[var(--surface)] ${
                      isSolved ? "bg-emerald-50/40" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[var(--mist)] border-2 border-[var(--ink)] flex items-center justify-center font-black text-xs text-[var(--ink)] shrink-0 mt-0.5">
                          {q.stakeholder.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm text-[var(--ink)]">
                              #{q.order}. {q.title}
                            </span>
                            {q.difficulty === "boss" ? (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[var(--sun)] border border-[var(--ink)] text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]">
                                👑 Boss Question
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--sky)] text-[var(--ink)]">
                                {q.difficulty}
                              </span>
                            )}
                            {isSolved && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Solved
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[var(--ink)] opacity-75">
                            From <strong>{q.stakeholder.name}</strong> ({q.stakeholder.role})
                          </p>
                          <p className="text-xs text-[var(--ink)] opacity-90 line-clamp-2 italic">
                            &ldquo;{q.request}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="flex items-center gap-1 text-xs font-bold text-[var(--ink)]">
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>+{q.xp} XP</span>
                        </div>
                        <span className="btn-secondary text-xs py-1.5 px-3">
                          Open Request
                          <ArrowRight className="w-3 h-3 text-[var(--ink)]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TEAM DIRECTORY */}
        {activeTab === "team" && (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-[var(--ink)] opacity-80">
              Meet the team members sending requests to your inbox. Each stakeholder has specific business questions based on their domain responsibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--ocean)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full border-2 border-[var(--ink)] flex items-center justify-center font-black text-sm text-[var(--ink)] shrink-0"
                      style={{ backgroundColor: member.avatarBg }}
                    >
                      {member.avatarText}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[var(--ink)]">{member.name}</h4>
                      <p className="text-xs font-semibold text-[var(--ocean-hover)]">{member.role}</p>
                      <span className="text-[10px] font-bold uppercase text-[var(--ink)] opacity-60">
                        {member.department}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--ink)] opacity-85 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCHEMA & DATA DICTIONARY */}
        {activeTab === "schema" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Table Selector Sidebar */}
            <div className="lg:col-span-4 bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-4 space-y-2">
              <div className="text-xs font-extrabold uppercase text-[var(--ink)] opacity-75 mb-2">
                Operational Tables ({schema.length})
              </div>
              {schema.map((tbl) => (
                <button
                  key={tbl.name}
                  onClick={() => setSelectedTable(tbl.name)}
                  className={`w-full text-left p-2.5 rounded-lg border-2 text-xs font-bold transition-all flex items-center justify-between ${
                    selectedTable === tbl.name
                      ? "bg-[var(--ocean)] border-[var(--ink)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                      : "bg-[var(--surface)] border-[var(--sky)] text-[var(--ink)] hover:bg-[var(--mist)]"
                  }`}
                >
                  <span className="font-mono">{tbl.name}</span>
                  <span className="text-[10px] opacity-75">{tbl.columns.length} cols</span>
                </button>
              ))}
            </div>

            {/* Table Column Detail */}
            <div className="lg:col-span-8 bg-[var(--white)] border-2 border-[var(--ink)] rounded-xl p-6 shadow-[3px_3px_0px_var(--ocean)] space-y-4">
              <div className="border-b border-[var(--sky)] pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xl font-black text-[var(--ink)]">
                    {currentTableDef.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)]">
                    Schema: ecom_l1
                  </span>
                </div>
                <p className="text-xs text-[var(--ink)] opacity-80 mt-1">
                  {currentTableDef.description}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface)] border-b-2 border-[var(--sky)] text-[var(--ink)]">
                      <th className="py-2 px-3 font-bold">Column Name</th>
                      <th className="py-2 px-3 font-bold">Data Type</th>
                      <th className="py-2 px-3 font-bold">Attributes</th>
                      <th className="py-2 px-3 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--sky)]">
                    {currentTableDef.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-[var(--surface)]">
                        <td className="py-2 px-3 font-mono font-bold text-[var(--ink)]">
                          {col.name}
                        </td>
                        <td className="py-2 px-3 font-mono text-[var(--ocean-hover)]">
                          {col.type}
                        </td>
                        <td className="py-2 px-3">
                          {col.isPk && (
                            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              PK
                            </span>
                          )}
                          {col.fkTarget && (
                            <span className="bg-sky-100 text-sky-900 border border-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
                              FK &rarr; {col.fkTarget}
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-[var(--ink)] opacity-85">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t-2 border-[var(--sky)] py-6 px-4 sm:px-8 mt-12 text-center text-xs font-semibold text-[var(--ink)]">
        &ldquo;Real data analysts don&apos;t wait for answers—they query the truth directly.&rdquo; — SQL Office Simulator
      </footer>

      {/* LEVEL HONOR PLEDGE REMINDER MODAL (SPEC SECTION 8 & PHASE 5) */}
      {pledgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--white)] border-3 border-[var(--ink)] rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-[6px_6px_0px_var(--ocean)]">
            <div className="flex items-center gap-3 border-b-2 border-[var(--sky)] pb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center text-2xl shadow-[2px_2px_0px_var(--ink)] shrink-0">
                🛡️
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--ocean-hover)]">
                  Level Onboarding Reminder
                </span>
                <h2 className="text-lg font-black text-[var(--ink)]">
                  The Workplace Honor Pledge
                </h2>
              </div>
            </div>

            <div className="bg-[var(--surface)] border-2 border-[var(--sky)] rounded-xl p-4 space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[var(--ink)] leading-relaxed italic">
                &ldquo;This simulator works only if you do the work yourself. Please don&apos;t use AI tools or copy solutions. You&apos;re here to build real skills, and the only person you&apos;d be fooling is you. Be honest, and enjoy the learning.&rdquo;
              </p>
              <div className="text-[11px] text-[var(--ink)] opacity-70 text-right font-bold">
                — SQL Office Simulator Core Policy
              </div>
            </div>

            <div className="space-y-2 text-xs text-[var(--ink)]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong>Realistic business practice:</strong> You will query real tables with {company.employeeCount} coworkers counting on your answers.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong>Stuck? Use the hints:</strong> Progressive guidance and schema explorers are available directly in your workspace.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong>Authentic career progression:</strong> Earn genuine XP, streaks, and unlock senior levels by solving requests yourself.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAcknowledgePledge}
                className="btn-primary w-full py-3 text-sm font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_var(--ink)]"
              >
                <span>I Understand — Let&apos;s Build Real Skills</span>
                <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
