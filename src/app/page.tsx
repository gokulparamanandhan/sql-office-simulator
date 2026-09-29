"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Database,
  ShieldCheck,
  Terminal,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Server,
  Layers,
  Users,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

export default function Home() {
  const [activeDomainTab, setActiveDomainTab] = useState<string>("ecommerce");

  const domains = [
    {
      id: "ecommerce",
      name: "E-Commerce",
      tagline: "OmniCart Retail Group",
      desc: "Analyze customer repeat rates, warehouse returns, basket sizes, and regional marketing attribution.",
      tables: ["customers", "orders", "order_items", "products", "shipments", "returns"],
      sampleStakeholder: "Maya Lin, Head of Growth",
      sampleRequest: "Which regions have the highest share of customers who ordered more than once in 2025?",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      tagline: "St. Jude Clinical Network",
      desc: "Query patient treatment histories, emergency room admission wait times, and insurance claim loss ratios.",
      tables: ["patients", "appointments", "doctors", "diagnoses", "prescriptions", "billing"],
      sampleStakeholder: "Dr. Robert Vance, Chief Medical Officer",
      sampleRequest: "Identify the top 5 medication interaction alerts that were overridden in Q3.",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "finance",
      name: "Finance & Banking",
      tagline: "Apex Capital Bank",
      desc: "Audit high-frequency debit card fraud spikes, cross-border remittance fees, and loan default indicators.",
      tables: ["accounts", "customers", "transactions", "loans", "cards", "fraud_alerts"],
      sampleStakeholder: "Elena Rostova, VP Risk Management",
      sampleRequest: "Flag all merchant categories showing a >40% surge in chargeback disputes this month.",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "hr",
      name: "Human Resources",
      tagline: "Vanguard Global HR",
      desc: "Calculate engineering attrition cohorts, compensation equity ratios, and hiring funnel velocity.",
      tables: ["employees", "departments", "salaries", "attendance", "performance_reviews"],
      sampleStakeholder: "Marcus Chen, Chief People Officer",
      sampleRequest: "Calculate median tenure by department for managers vs individual contributors.",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "logistics",
      name: "Logistics & Supply",
      tagline: "Atlas Freight Solutions",
      desc: "Track carrier route delays, container dwell time, fleet telematics, and warehouse dock utilization.",
      tables: ["shipments", "vehicles", "drivers", "routes", "warehouses", "delivery_events"],
      sampleStakeholder: "David O'Connor, Dispatch Director",
      sampleRequest: "Rank the top 3 bottlenecks in our Midwest fulfillment hub by average dwell hours.",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "restaurants",
      name: "Restaurants & Hospitality",
      tagline: "Palate Group Dining",
      desc: "Audit peak-hour table turn times, food waste margins, supplier contract variances, and tips.",
      tables: ["restaurants", "menu_items", "orders", "staff", "shifts", "reservations"],
      sampleStakeholder: "Chef Julian Rossi, Culinary Director",
      sampleRequest: "Which signature entrees had the lowest margin-to-labor ratio during dinner rushes?",
      xp: "500 Questions • 5 Levels",
    },
    {
      id: "saas",
      name: "Software (B2B SaaS)",
      tagline: "CloudScale Platform",
      desc: "Analyze annual recurring revenue (ARR), seat expansions, monthly churn cohorts, and feature adoption.",
      tables: ["users", "accounts", "subscriptions", "feature_usage", "incidents", "invoices"],
      sampleStakeholder: "Alicia Torres, VP Product",
      sampleRequest: "Find organizations whose active seats dropped by >25% in the 30 days before renewal.",
      xp: "500 Questions • 5 Levels",
    },
  ];

  const levels = [
    {
      num: 1,
      name: "The Startup",
      scale: "5–20 employees",
      rows: "1K–10K rows",
      role: "Solo Data Generalist",
      desc: "You are the first data hire. Answer leadership's daily questions covering every department.",
      concepts: "SELECT, WHERE, GROUP BY, HAVING, basic INNER/LEFT JOIN, aggregates",
    },
    {
      num: 2,
      name: "Growing Company",
      scale: "50–100 employees",
      rows: "~100K rows",
      role: "Junior Data Analyst",
      desc: "Dedicated functional teams, expanding database schemas, and multi-table business reconciliations.",
      concepts: "Multi-table JOINs, subqueries, CTEs, CASE WHEN, date/string functions, UNION",
    },
    {
      num: 3,
      name: "Scale-Up",
      scale: "200–500 employees",
      rows: "~1M rows",
      role: "Senior Data Analyst",
      desc: "Multiple international regions and high-velocity transactional databases. Analytical depth required.",
      concepts: "Window functions (ROW_NUMBER, RANK, LAG/LEAD), conditional aggregation, cohorts",
    },
    {
      num: 4,
      name: "Enterprise",
      scale: "1,000+ employees",
      rows: "~5M rows",
      role: "Lead Analytics Engineer",
      desc: "Messy, fragmented data across merged business units. Performance-aware and investigative queries.",
      concepts: "Recursive CTEs, complex window frames, gaps & islands, deduplication, EXPLAIN",
    },
    {
      num: 5,
      name: "Global Corporation",
      scale: "5,000+ employees",
      rows: "10M+ rows",
      role: "Head of Data / Principal",
      desc: "Multinational conglomerate, billions in revenue, slowly changing dimensions, and C-suite asks.",
      concepts: "Query optimization, percentiles, moving averages, YoY/MoM, SCD, cross-system audits",
    },
  ];

  const selectedDomain = domains.find((d) => d.id === activeDomainTab) || domains[0];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Top Office Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
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
                Phase 0 Foundation • Real SQL Workplace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Honor Pledge Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--mist)] border border-[var(--sky)] text-xs font-semibold text-[var(--ink)]">
              <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
              <span>Honor Code: Human SQL Only</span>
            </div>

            {/* Highlighted Feedback Link */}
            <FeedbackLink variant="button" />

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
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-[var(--white)] border-2 border-[var(--sky)] p-6 sm:p-10 shadow-[4px_4px_0px_var(--ocean)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sun)] border border-[var(--ink)] text-xs font-extrabold text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--ink)]" />
                <span>3,500 Real-World Business Challenges</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[var(--ink)]">
                Learn SQL by working inside a simulated company.
              </h1>

              <p className="text-base sm:text-lg text-[var(--ink)] opacity-90 leading-relaxed">
                Forget artificial textbook puzzles. Inside the SQL Office Simulator, you are the company’s data analyst.
                Executives, VPs, and managers send you urgent requests—you inspect real schemas, write SQL queries, and deliver answers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#domains"
                  className="btn-primary"
                >
                  <Briefcase className="w-4 h-4 text-[var(--ink)]" />
                  <span>Choose Your Industry Domain</span>
                  <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
                </a>

                <a
                  href="#career"
                  className="btn-secondary"
                >
                  <span>Explore 5 Career Levels</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--sky)]">
                <div>
                  <div className="text-2xl font-black text-[var(--ink)]">7</div>
                  <div className="text-xs font-semibold text-[var(--ink)] opacity-70">
                    Industry Domains
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[var(--ink)]">5 Levels</div>
                  <div className="text-xs font-semibold text-[var(--ink)] opacity-70">
                    Startup to Global Corp
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[var(--ink)]">100% Free</div>
                  <div className="text-xs font-semibold text-[var(--ink)] opacity-70">
                    No Paywalls or Subscriptions
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Slack/Inbox Card */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--surface)] border-2 border-[var(--ink)] rounded-xl p-5 shadow-[4px_4px_0px_var(--ink)] space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--sky)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400 border border-[var(--ink)]" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 border border-[var(--ink)]" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border border-[var(--ink)]" />
                    <span className="text-xs font-bold text-[var(--ink)] ml-2">
                      INBOX • PRIORITY REQUEST
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--sun)] border border-[var(--ink)] text-[var(--ink)]">
                    Level 1 • Startup
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center font-bold text-sm text-[var(--ink)] shrink-0">
                      ML
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--ink)]">Maya Lin</span>
                        <span className="text-xs text-[var(--ink)] opacity-75">
                          Head of Growth
                        </span>
                      </div>
                      <p className="text-xs text-[var(--ink)] opacity-70">Today at 10:14 AM</p>
                    </div>
                  </div>

                  <div className="bg-[var(--white)] border border-[var(--sky)] rounded-lg p-3 text-xs text-[var(--ink)] leading-relaxed space-y-2">
                    <p className="font-bold text-[var(--ink)]">
                      Subject: Repeat buyers by region for Q3 loyalty push
                    </p>
                    <p>
                      &quot;We&apos;re planning next month&apos;s loyalty campaign. Which regions have the highest share of customers who ordered more than once in 2025? Exclude cancelled orders.&quot;
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["JOIN", "GROUP BY", "HAVING", "subquery"].map((concept) => (
                      <span
                        key={concept}
                        className="text-[11px] font-bold bg-[var(--mist)] border border-[var(--sky)] text-[var(--ink)] px-2 py-0.5 rounded"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[var(--ink)]">
                    <span className="flex items-center gap-1 text-[var(--ink)]">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> +20 XP on completion
                    </span>
                    <span className="text-[var(--ink)] opacity-70">Est. 8 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Domains Section */}
        <section id="domains" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-75">
                Practice in Your Target Field
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
                7 Industry Domains Available at Launch
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink)] opacity-80 max-w-md">
              Each domain features 5 progressive company stages, 500 questions, and isolated PostgreSQL schemas.
            </p>
          </div>

          {/* Domain Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {domains.map((dom) => (
              <button
                key={dom.id}
                onClick={() => setActiveDomainTab(dom.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border-2 ${
                  activeDomainTab === dom.id
                    ? "bg-[var(--ocean)] text-[var(--ink)] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                    : "bg-[var(--white)] text-[var(--ink)] border-[var(--sky)] hover:bg-[var(--mist)]"
                }`}
              >
                {dom.name}
              </button>
            ))}
          </div>

          {/* Active Domain Spotlight Card */}
          <div className="card-office bg-[var(--white)] border-2 border-[var(--ink)] shadow-[4px_4px_0px_var(--ocean)] p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--sky)] pb-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wide text-[var(--ocean-hover)]">
                  Simulated Organization
                </span>
                <h3 className="text-2xl font-black text-[var(--ink)]">{selectedDomain.name}</h3>
                <p className="text-sm font-semibold text-[var(--ink)] opacity-75">
                  {selectedDomain.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--sun)] border border-[var(--ink)] text-[var(--ink)]">
                  {selectedDomain.xp}
                </span>
                <Link
                  href={`/office/${selectedDomain.id}/level-1`}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Start Level 1
                </Link>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
              {selectedDomain.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] border border-[var(--sky)] rounded-lg p-4 space-y-2">
                <div className="text-xs font-extrabold uppercase text-[var(--ink)] opacity-80 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[var(--ink)]" />
                  Primary Tables in Practice Sandbox
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDomain.tables.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[var(--white)] border border-[var(--sky)] rounded text-xs font-mono font-bold text-[var(--ink)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--sky)] rounded-lg p-4 space-y-2">
                <div className="text-xs font-extrabold uppercase text-[var(--ink)] opacity-80 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--ink)]" />
                  Sample Level 1 Stakeholder Request
                </div>
                <div className="text-xs font-bold text-[var(--ink)]">
                  From: {selectedDomain.sampleStakeholder}
                </div>
                <p className="text-xs italic text-[var(--ink)] opacity-90">
                  &quot;{selectedDomain.sampleRequest}&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Career Levels Progression */}
        <section id="career" className="space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-75">
              Realistic Career Progression
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
              5 Company Stages: From Tiny Startup to Global Corp
            </h2>
            <p className="text-sm text-[var(--ink)] opacity-80 mt-1">
              Unlock rule: ≥ 70 of 100 correct, including ≥ 5 of the 10 boss questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {levels.map((lvl) => (
              <div
                key={lvl.num}
                className="bg-[var(--white)] border-2 border-[var(--sky)] rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-[var(--ocean)] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-md bg-[var(--sun)] border border-[var(--ink)] flex items-center justify-center font-black text-xs text-[var(--ink)]">
                      L{lvl.num}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--ink)] opacity-70">
                      100 Qs
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-[var(--ink)]">{lvl.name}</h4>
                  <div className="text-xs font-bold text-[var(--ocean-hover)]">{lvl.role}</div>
                  <div className="text-[11px] font-semibold text-[var(--ink)] opacity-75">
                    {lvl.scale} • {lvl.rows}
                  </div>

                  <p className="text-xs text-[var(--ink)] opacity-85 leading-snug">
                    {lvl.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--sky)] text-[11px] font-mono text-[var(--ink)] opacity-90 leading-tight">
                  <span className="font-bold font-sans block text-[10px] text-[var(--ink)] opacity-60 uppercase">
                    Core Focus
                  </span>
                  {lvl.concepts}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlighted Feedback Section */}
        <FeedbackLink variant="banner" />

        {/* Honor Policy Section */}
        <section className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--sun)] space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[var(--ink)]" />
            <h3 className="text-xl font-black text-[var(--ink)]">
              Our Honor Policy (No Proctoring, Just Real Honesty)
            </h3>
          </div>
          <p className="text-sm text-[var(--ink)] leading-relaxed">
            &ldquo;This simulator works only if you do the work yourself. Please don&apos;t use AI tools or copy solutions.
            You&apos;re here to build real skills, and the only person you&apos;d be fooling is you. Be honest, and enjoy the learning.&rdquo;
          </p>
          <div className="text-xs text-[var(--ink)] opacity-75 font-semibold">
            We don&apos;t block copy/paste, track tab switching, or spy on your keystrokes. We treat you as a professional.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t-2 border-[var(--sky)] py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold text-[var(--ink)]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--ink)]" />
            <span>SQL Office Simulator • Spec v1.1 Production</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[var(--ink)]">
            <Link href="/terms" className="hover:underline font-bold">
              Terms & Honor Code
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline font-bold">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:underline font-bold">
              Dashboard
            </Link>
            <span>•</span>
            <Link href="/progress" className="hover:underline font-bold">
              Progress & Mastery
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:underline font-bold text-slate-400">
              Admin Portal
            </Link>
            <span>•</span>
            <FeedbackLink variant="pill" />
          </div>

          <div className="flex items-center gap-2 text-[var(--ink)] opacity-75">
            <span>WCAG AA Verified</span>
            <span>•</span>
            <span>100% Free Forever</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
