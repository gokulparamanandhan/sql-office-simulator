"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Database,
  Briefcase,
  Users,
  Layers,
  Terminal,
  Zap,
  Lock,
  Globe,
  HelpCircle,
  Clock,
  Compass,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

export default function OnboardingPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const domains = [
    {
      name: "E-Commerce",
      company: "OmniCart Retail Group",
      role: "E-Commerce Growth Analyst",
      tables: "customers, orders, order_items, products, shipments, returns",
      focus: "Customer cohort analysis, repeat buyers, basket sizes, warehouse fulfillment, regional returns",
    },
    {
      name: "Healthcare",
      company: "St. Jude Clinical Network",
      role: "Clinical Informatics Analyst",
      tables: "patients, appointments, doctors, diagnoses, prescriptions, billing",
      focus: "Treatment protocols, ER wait times, physician load, prescription alerts, insurance claims",
    },
    {
      name: "Finance & Banking",
      company: "Apex Capital Bank",
      role: "Risk & Fraud Data Analyst",
      tables: "accounts, customers, transactions, loans, cards, fraud_alerts",
      focus: "Debit card fraud surges, high-frequency transactions, loan defaults, AML compliance",
    },
    {
      name: "Human Resources",
      company: "Vanguard Global HR",
      role: "People Analytics Specialist",
      tables: "employees, departments, salaries, attendance, performance_reviews",
      focus: "Attrition cohorts, compensation parity, departmental tenure, promotion velocity",
    },
    {
      name: "Logistics & Supply",
      company: "Atlas Freight Solutions",
      role: "Supply Chain Analytics Engineer",
      tables: "shipments, vehicles, drivers, routes, warehouses, delivery_events",
      focus: "Carrier route delays, container dwell time, dock utilization, delivery bottlenecks",
    },
    {
      name: "Restaurants & Hospitality",
      company: "Palate Group Dining",
      role: "Hospitality Operations Analyst",
      tables: "restaurants, menu_items, orders, staff, shifts, reservations",
      focus: "Table turnaround times, peak-hour kitchen throughput, food waste variance, server gratuity",
    },
    {
      name: "Software (B2B SaaS)",
      company: "CloudScale Platform",
      role: "SaaS Product Analyst",
      tables: "users, accounts, subscriptions, feature_usage, incidents, invoices",
      focus: "ARR expansion, churn cohorts, seat utilization, feature drop-off, renewal health",
    },
  ];

  const levels = [
    {
      level: 1,
      title: "The Startup",
      scale: "5–20 employees • 1K–10K rows",
      role: "Solo Data Generalist",
      desc: "Fast-moving founding team. Answer leadership requests using foundational SQL (SELECT, WHERE, GROUP BY, aggregations, INNER/LEFT JOIN).",
    },
    {
      level: 2,
      title: "Growing Company",
      scale: "50–100 employees • ~100K rows",
      role: "Junior Data Analyst",
      desc: "Multiple functional teams and expanding schemas. Write multi-table JOINs, Common Table Expressions (CTEs), CASE WHEN logic, and date math.",
    },
    {
      level: 3,
      title: "Scale-Up",
      scale: "200–500 employees • ~1M rows",
      role: "Senior Data Analyst",
      desc: "High transaction volume and international cohorts. Master window functions (ROW_NUMBER, RANK, LAG/LEAD) and multi-step CTE analytics.",
    },
    {
      level: 4,
      title: "Enterprise",
      scale: "1,000+ employees • ~5M rows",
      role: "Lead Analytics Engineer",
      desc: "Legacy systems and merged databases. Execute recursive queries, gap-and-island problems, deduplication algorithms, and query performance audits.",
    },
    {
      level: 5,
      title: "Global Corporation",
      scale: "5,000+ employees • 10M+ rows",
      role: "Head of Data / Principal",
      desc: "Billion-dollar conglomerate. Formulate executive C-suite summaries, slowly changing dimensions (SCD), complex percentiles, and YoY variance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
              <Building2 className="w-5 h-5 text-[var(--ink)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[var(--ink)]">
                  SQL OFFICE SIMULATOR
                </span>
                <span className="bg-[var(--sun)] text-[var(--ink)] border border-[var(--ink)] text-xs font-bold px-2 py-0.5 rounded-full">
                  FREE
                </span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-75 font-medium">
                Platform Orientation &amp; Onboarding
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[var(--ink)] hover:underline"
            >
              ← Back to Homepage
            </Link>

            <FeedbackLink variant="button" />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--ink)] bg-[var(--mist)] px-2.5 py-1.5 rounded-md border border-[var(--sky)]">
                  Signed In: {user.name}
                </span>
                <Link href="/dashboard" className="btn-primary text-xs py-2 px-3.5">
                  My Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="btn-secondary text-xs py-2 px-3.5"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 space-y-12">
        {/* Hero Onboarding Card */}
        <section className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_var(--ocean)] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sun)] border border-[var(--ink)] text-xs font-black shadow-[1px_1px_0px_var(--ink)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--ink)]" />
            <span>WELCOME TO YOUR FIRST DAY AT WORK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[var(--ink)]">
            Welcome to SQL Office Simulator
          </h1>

          <p className="text-base sm:text-lg text-[var(--ink)] opacity-90 leading-relaxed max-w-3xl">
            You are no longer solving abstract multiple-choice quizzes or artificial toy problems.
            Inside the SQL Office Simulator, you step into the role of a data analyst working for real organizations.
            Your coworkers and executives message you with realistic analytical questions—you query actual PostgreSQL schemas in Monaco editor and report your answers.
          </p>

          {/* Quick Action Buttons for Onboarding */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!user ? (
              <>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-sm py-3 px-6 shadow-[3px_3px_0px_var(--ink)]"
                >
                  <Sparkles className="w-4 h-4 text-[var(--ink)]" />
                  <span>Create Free Account (Sign Up)</span>
                  <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
                </Link>
                <Link
                  href="/auth/login"
                  className="btn-secondary text-sm py-3 px-6 shadow-[3px_3px_0px_var(--ink)]"
                >
                  <span>Already Have an Account? Sign In</span>
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="btn-primary text-sm py-3 px-6"
              >
                <span>Go to Your Career Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <a
              href="https://sql-office-simulator.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[var(--mist)] border-2 border-[var(--sky)] hover:border-[var(--ink)] text-xs font-bold text-[var(--ink)] transition-colors"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Hosted Live at sql-office-simulator.vercel.app</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--sky)] text-xs font-semibold text-[var(--ink)] opacity-85 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Account Requirement:</strong> An account (100% free) is required to access the interactive PostgreSQL database sandboxes, save your completed SQL queries, and track your career progression through the 5 levels.
            </span>
          </div>
        </section>

        {/* How It Works: 4 Steps */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-75">
              Orientation Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              How the Simulator Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--ink)] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[var(--sun)] border border-[var(--ink)] flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="font-black text-sm text-[var(--ink)]">Sign Up &amp; Honor Code</h3>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Create your learner profile in 30 seconds. Accept our human-first honor pledge to build genuine problem-solving skills without AI copy-pasting.
              </p>
            </div>

            <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--ink)] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[var(--ocean)] border border-[var(--ink)] flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="font-black text-sm text-[var(--ink)]">Choose Your Domain</h3>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Pick from 7 simulated companies including E-Commerce, Healthcare, Banking, SaaS, and Logistics. Every domain features isolated relational schemas.
              </p>
            </div>

            <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--ink)] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[var(--sun)] border border-[var(--ink)] flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="font-black text-sm text-[var(--ink)]">Query Live Database</h3>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Read stakeholder tickets in your company inbox. Inspect real database tables and write queries in a Monaco SQL editor with autocomplete and schema docs.
              </p>
            </div>

            <div className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--ink)] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[var(--ocean)] border border-[var(--ink)] flex items-center justify-center font-black text-sm">
                4
              </div>
              <h3 className="font-black text-sm text-[var(--ink)]">Dual-Dataset Anti-Cheat</h3>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Your submitted queries are tested against both visible and hidden validation datasets to guarantee robust logic, earning XP and unlocking higher levels.
              </p>
            </div>
          </div>
        </section>

        {/* 7 Domains Overview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-75">
                Work Environments
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
                The 7 Simulated Organizations
              </h2>
            </div>
            <p className="text-xs text-[var(--ink)] opacity-80 max-w-sm">
              Each organization features custom PostgreSQL tables matching real industry architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((dom) => (
              <div
                key={dom.name}
                className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-5 space-y-3 shadow-sm hover:shadow-[3px_3px_0px_var(--ocean)] transition-all"
              >
                <div className="flex items-center justify-between border-b border-[var(--sky)] pb-2">
                  <h3 className="font-black text-base text-[var(--ink)]">{dom.name}</h3>
                  <span className="text-[10px] font-bold bg-[var(--sun)] text-[var(--ink)] px-2 py-0.5 rounded border border-[var(--ink)]">
                    500 Qs
                  </span>
                </div>

                <div>
                  <div className="text-xs font-extrabold text-[var(--ocean-hover)]">
                    {dom.company}
                  </div>
                  <div className="text-[11px] font-semibold text-[var(--ink)] opacity-70">
                    Role: {dom.role}
                  </div>
                </div>

                <p className="text-xs text-[var(--ink)] opacity-85 leading-snug">
                  {dom.focus}
                </p>

                <div className="pt-2 border-t border-[var(--sky)]">
                  <span className="text-[10px] font-bold uppercase text-[var(--ink)] opacity-60 block">
                    Tables
                  </span>
                  <p className="text-[11px] font-mono text-[var(--ink)] opacity-85 font-semibold">
                    {dom.tables}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Career Levels */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-75">
              Career Trajectory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              5 Career Levels: From Seed Startup to Global Giant
            </h2>
            <p className="text-xs text-[var(--ink)] opacity-80 mt-1">
              Every level increases schema complexity, table volume, and the seniority of your analytical answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {levels.map((lvl) => (
              <div
                key={lvl.level}
                className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-md bg-[var(--sun)] border border-[var(--ink)] flex items-center justify-center font-black text-xs">
                      L{lvl.level}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--ink)] opacity-70">
                      100 Qs
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-[var(--ink)]">{lvl.title}</h4>
                  <div className="text-xs font-bold text-[var(--ocean-hover)]">{lvl.role}</div>
                  <div className="text-[11px] font-semibold text-[var(--ink)] opacity-75">
                    {lvl.scale}
                  </div>
                  <p className="text-xs text-[var(--ink)] opacity-85 leading-snug">
                    {lvl.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zero-Installation Cloud Option Callout */}
        <section className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--sun)] space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-black text-[var(--ink)]">
              Two Ways to Practice: Cloud Online or Local Machine
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--sky)] space-y-2">
              <span className="text-xs font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                Recommended for Learners
              </span>
              <h4 className="text-sm font-black text-[var(--ink)]">Use the Hosted Vercel Platform</h4>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Zero installation, no Docker or Node.js required. Open your browser and immediately begin practicing SQL in WebAssembly PostgreSQL.
              </p>
              <a
                href="https://sql-office-simulator.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[var(--ocean-hover)] underline block pt-1"
              >
                Launch sql-office-simulator.vercel.app →
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--sky)] space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-700 bg-slate-200 px-2 py-0.5 rounded border border-slate-300">
                For Developers &amp; Contributors
              </span>
              <h4 className="text-sm font-black text-[var(--ink)]">Run Locally via Git</h4>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Clone the repository from GitHub, configure Supabase credentials, and contribute questions or features using Next.js 16 and TypeScript.
              </p>
              <a
                href="https://github.com/gokulparamanandhan/sql-office-simulator"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[var(--ocean-hover)] underline block pt-1"
              >
                View Repository on GitHub →
              </a>
            </div>
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="bg-[var(--white)] border-3 border-[var(--ink)] rounded-2xl p-8 text-center space-y-5 shadow-[6px_6px_0px_var(--ocean)]">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
            Ready to Begin Your SQL Career?
          </h2>
          <p className="text-sm text-[var(--ink)] opacity-85 max-w-xl mx-auto">
            Create your account today, review the honor policy, choose your starting company, and tackle your first assignment from leadership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {!user ? (
              <>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-sm py-3 px-6"
                >
                  <Sparkles className="w-4 h-4 text-[var(--ink)]" />
                  <span>Create Free Account (Sign Up)</span>
                  <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
                </Link>
                <Link
                  href="/auth/login"
                  className="btn-secondary text-sm py-3 px-6"
                >
                  <span>Sign In</span>
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="btn-primary text-sm py-3 px-6"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-[var(--sky)] text-xs font-extrabold hover:bg-[var(--mist)] text-[var(--ink)]"
            >
              <Compass className="w-4 h-4" />
              <span>Browse 7 Domains on Homepage</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t-2 border-[var(--sky)] py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold text-[var(--ink)]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--ink)]" />
            <span>SQL Office Simulator • Open-Source Platform</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[var(--ink)]">
            <Link href="/" className="hover:underline font-bold">
              Homepage
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline font-bold">
              Terms &amp; Honor Code
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline font-bold">
              Privacy Policy
            </Link>
            <span>•</span>
            <FeedbackLink variant="pill" />
          </div>

          <div className="flex items-center gap-2 text-[var(--ink)] opacity-75">
            <span>100% Free Forever</span>
            <span>•</span>
            <span>No AI Shortcuts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
