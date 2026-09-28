import Link from "next/link";
import { ShieldCheck, ArrowLeft, Terminal, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Honor Policy | SQL Office Simulator",
  description:
    "Review our Workplace Honor Code, fair use guidelines, and platform terms of service. 100% free forever.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b-2 border-[var(--sky)] px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg border border-[var(--sky)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink)]" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center font-black text-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-[var(--ink)]">
                SQL Office Simulator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/privacy" className="text-xs font-bold text-[var(--ink)] hover:underline">
              Privacy Policy
            </Link>
            <Link href="/dashboard" className="btn-primary text-xs py-1.5 px-3">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Hero Card */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--mist)] border border-[var(--ink)] text-xs font-black uppercase tracking-wider text-[var(--ink)]">
            <FileText className="w-3.5 h-3.5" />
            Terms of Service & Workplace Honor Policy
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
            Learn with Integrity. Build True Competence.
          </h1>
          <p className="text-sm text-[var(--ink)] opacity-80 leading-relaxed">
            Effective Date: September 2026. SQL Office Simulator is completely free, open-access, and designed to replicate the genuine demands of workplace data analysis.
          </p>
        </div>

        {/* Honor Policy Section (Spec Section 8) */}
        <div className="bg-amber-50/60 border-2 border-amber-600 rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_rgba(217,119,6,0.5)] space-y-4">
          <div className="flex items-center gap-2.5 text-amber-900 font-black text-lg">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <h2>The Workplace Honor Policy</h2>
          </div>
          <p className="text-sm text-[var(--ink)] leading-relaxed">
            In a real company, nobody hands you the answer key. When a stakeholder asks for churn metrics, inventory alerts, or financial reconciliations, your team relies on your independent problem-solving skills. To preserve this learning experience, every learner agrees to our four core Honor Code principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-[var(--white)] border border-amber-400 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1. Solve It Yourself</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Write every SQL query independently. Utilize hints when needed, but never copy and paste third-party solutions.
              </p>
            </div>

            <div className="bg-[var(--white)] border border-amber-400 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2. No Solution Leakage</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Do not publish, dump, or distribute question solutions, answer keys, or cheatsheets on public repositories or discussion boards.
              </p>
            </div>

            <div className="bg-[var(--white)] border border-amber-400 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3. No Automated Scraping</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Do not run bots, automated scripts, headless spiders, or AI scrapers against our sandbox execution endpoints.
              </p>
            </div>

            <div className="bg-[var(--white)] border border-amber-400 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>4. Safe Sandbox Execution</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Respect security boundaries. Queries must be read-only (SELECT) and never attempt system command execution or denial-of-service.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Terms Sections */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[var(--ink)] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">1. Platform Access & 100% Free Guarantee</h3>
            <p className="opacity-80">
              SQL Office Simulator is entirely free. There are no paid tiers, no premium subscriptions, no hidden in-app purchases, and no artificial paywalls. All domains, levels, sandbox features, and analytics dashboards are equally accessible to every registered learner.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">2. Account Responsibility</h3>
            <p className="opacity-80">
              You are responsible for maintaining the confidentiality of your login credentials. Account sharing or allowing multiple individuals to log in to a single profile to falsify career progress or gamification badges violates our fair-use policy.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">3. Rate Limiting & Resource Protection</h3>
            <p className="opacity-80">
              To guarantee high responsiveness and uninterrupted service for all learners, our sandbox evaluation engine enforces a client submission cooldown. Rapid-fire requests exceeding standard limits will be temporarily rate-limited.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">4. Disclaimers & Workplace Fiction</h3>
            <p className="opacity-80">
              All companies (OmniCart, PulseHealth, Meridian Capital, TalentFlow, Apex Freight, Gusto Hospitality, CloudScale Metrics), stakeholders, and datasets featured within the platform are fictional simulations created strictly for educational purposes. Any resemblance to real persons, companies, or events is coincidental.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">5. Contact & Support</h3>
            <p className="opacity-80">
              Have questions or suggestions? Report problem questions directly from the workspace UI or visit our Admin QA dashboard.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--sky)] bg-[var(--white)] py-6 text-center text-xs text-[var(--ink)] opacity-75">
        <p>© 2026 SQL Office Simulator. Free educational software built for aspiring data professionals.</p>
      </footer>
    </div>
  );
}
