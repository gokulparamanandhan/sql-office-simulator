import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Gavel,
  ShieldAlert,
  Lock,
  ExternalLink,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

export const metadata = {
  title: "Terms of Service, Commercial Prohibition & Honor Policy | SQL Office Simulator",
  description:
    "Official Terms of Service: Strict prohibition on unauthorized commercial use under penalty of lawsuit, data security disclaimers, workplace honor code, and open-source personal learning license.",
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
            <FeedbackLink variant="pill" />
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
            Legal Terms of Service & Licensing Agreement
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
            Terms of Use, Commercial Lawsuit Warning & Liability Disclaimers
          </h1>
          <p className="text-sm text-[var(--ink)] opacity-80 leading-relaxed">
            Last Updated & Effective: 2026. This platform is open-source for personal education. Please read these terms carefully before accessing, cloning, executing, or contributing to the codebase.
          </p>
        </div>

        {/* Highlighted Feedback Banner */}
        <FeedbackLink variant="banner" />

        {/* SECTION 1: STRICT COMMERCIAL USE PROHIBITION & LAWSUIT WARNING */}
        <div className="bg-red-50/80 border-2 border-red-600 rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#DC2626] space-y-4">
          <div className="flex items-center gap-2.5 text-red-900 font-black text-xl">
            <Gavel className="w-6 h-6 text-red-600 shrink-0" />
            <h2>1. Strict Commercial Use Prohibition & Lawsuit Notice</h2>
          </div>
          <div className="text-sm text-red-950 leading-relaxed space-y-3 font-medium">
            <p>
              This software, including all underlying source code, database architectures, domain business logic, curriculum designs, 2,500+ simulation challenges, automated grading rubrics, datasets, and stakeholder scenario personas, is published as an open-source project on GitHub <strong>STRICTLY AND SOLELY FOR NON-COMMERCIAL, INDIVIDUAL EDUCATIONAL AND RESEARCH PURPOSES</strong>.
            </p>
            <div className="p-4 bg-white/90 border-2 border-red-500 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-black text-red-700 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>EXPLICIT LEGAL WARNING — IMMEDIATE LITIGATION:</span>
              </div>
              <p className="text-xs text-red-900 leading-relaxed font-semibold">
                If any individual, corporation, organization, bootcamp, EdTech entity, or third party copies, clones, forks, scrapes, redistributes, white-labels, sublicenses, sells, monetizes, or uses any portion of this source code or platform for commercial purposes without the explicit prior written authorization of the copyright author, <strong>IT WILL RESULT IN IMMEDIATE LEGAL ACTION AND COPYRIGHT INFRINGEMENT LAWSUITS</strong> in all applicable jurisdictions. We vigorously enforce our intellectual property rights and will seek full statutory damages, disgorgement of profits, legal fees, and injunctive orders against violators.
              </p>
            </div>
            <p className="text-xs text-red-900 opacity-90">
              Commercial purposes include, but are not limited to: charging subscription fees, packaging into paid courses or corporate bootcamps, embedding into commercial SaaS platforms, selling derivative software licenses, or running paid enterprise trainings using this curriculum or simulation engine.
            </p>
          </div>
        </div>

        {/* SECTION 2: DATA SECURITY, HACKING & BREACH DISCLAIMER */}
        <div className="bg-amber-50/70 border-2 border-amber-600 rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#D97706] space-y-4">
          <div className="flex items-center gap-2.5 text-amber-950 font-black text-xl">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
            <h2>2. Limitation of Liability & Zero-Liability Data Hack Disclaimer</h2>
          </div>
          <div className="text-sm text-amber-950 leading-relaxed space-y-3">
            <p>
              THE PLATFORM, CODEBASE, SQL EXECUTION SANDBOXES, AND STORAGE SYSTEMS ARE PROVIDED <strong>&ldquo;AS IS&rdquo;</strong> AND <strong>&ldquo;AS AVAILABLE&rdquo;</strong>, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED SECURITY.
            </p>
            <div className="p-4 bg-white/90 border border-amber-400 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-900 text-xs">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>DATA BREACH & HACK DISCLAIMER:</span>
              </div>
              <p className="text-xs text-[var(--ink)] leading-relaxed font-medium">
                The authors, creators, maintainers, contributors, and hosting providers of SQL Office Simulator <strong>ARE NOT RESPONSIBLE OR LEGALLY LIABLE</strong> if any data, accounts, passwords, queries, or user information are breached, hacked, intercepted, leaked, decrypted, stolen, or compromised by unauthorized third parties without our knowledge or control. You use this platform, create credentials, and execute sandbox queries entirely at your own risk.
              </p>
            </div>
            <p className="text-xs text-amber-900 opacity-80 leading-relaxed">
              In no event shall the authors or copyright holders be liable for any direct, indirect, incidental, special, exemplary, punitive, or consequential damages (including, but not limited to, procurement of substitute goods or services, loss of use, data, or profits, business interruption, or security incidents) arising in any way out of the use or inability to use this software.
            </p>
          </div>
        </div>

        {/* SECTION 3: THE WORKPLACE HONOR POLICY */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--ocean)] space-y-4">
          <div className="flex items-center gap-2.5 text-[var(--ink)] font-black text-xl">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <h2>3. The Workplace Honor Policy (Integrity First)</h2>
          </div>
          <p className="text-sm text-[var(--ink)] leading-relaxed">
            In real data roles, stakeholders rely on your genuine problem-solving ability. To preserve this learning standard, all registered learners agree to the following code of conduct:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-[var(--mist)] border border-[var(--sky)] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--ink)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1. Independent Problem Solving</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Write every SQL query yourself. Do not paste third-party solutions or rely on automated LLM agents to generate query answers for you.
              </p>
            </div>

            <div className="bg-[var(--mist)] border border-[var(--sky)] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--ink)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2. No Solution Cheatsheet Dumps</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Do not publish complete answer dumps, cheatsheets, or automated solver bots on public forums, repositories, or social media.
              </p>
            </div>

            <div className="bg-[var(--mist)] border border-[var(--sky)] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--ink)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3. No Malicious Scraping or Flooding</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Do not overwhelm sandbox execution endpoints with automated load testers, headless spiders, denial-of-service scripts, or query bombs.
              </p>
            </div>

            <div className="bg-[var(--mist)] border border-[var(--sky)] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--ink)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>4. Safe Sandbox Execution</span>
              </div>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed">
                Respect security boundaries. Queries must be read-only analytical statements (SELECT / CTEs) and never attempt system command execution.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: PERMITTED PERSONAL & ACADEMIC USE */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[var(--ink)] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">4. Permitted Personal & Academic Use</h3>
            <p className="opacity-80">
              You are welcome to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs opacity-85">
              <li>Clone or run this repository locally on your personal machine for your own personal SQL skill development.</li>
              <li>Submit GitHub pull requests for bug fixes, performance improvements, and documentation enhancements.</li>
              <li>Teachers and academic professors may use this platform for free classroom live demonstrations, provided no fees are charged specifically for access to this tool.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">5. Fictional Entities & Disclaimers</h3>
            <p className="opacity-80">
              All company brands (OmniCart, PulseHealth, Apex Capital, TalentFlow, Atlas Freight, Palate Dining, CloudScale Metrics), employee names, customer records, and email communications are entirely fictional simulated scenarios designed for pedagogical realism. Any resemblance to real persons, entities, or living individuals is purely coincidental.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">6. User Indemnification</h3>
            <p className="opacity-80">
              By using this site or source code, you agree to indemnify, defend, and hold harmless the project creator and maintainers from and against any claims, losses, damages, liabilities, costs, and expenses (including legal fees) arising from your breach of these Terms, unauthorized commercial use, or misuse of sandbox endpoints.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-extrabold text-base text-[var(--ink)]">7. User Feedback & Inquiries</h3>
            <p className="opacity-80">
              We welcome learner feedback, bug reports, and suggestions for improvement. Please submit your feedback through our official{" "}
              <a
                href="https://forms.gle/BwdcTBKeKJAkXSsn8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-amber-700 underline hover:text-amber-900 inline-flex items-center gap-1"
              >
                Feedback & Suggestions Form <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--sky)] bg-[var(--white)] py-6 text-center text-xs text-[var(--ink)] opacity-75 space-y-2">
        <p>© 2026 SQL Office Simulator. Built with dedication for open-source learners.</p>
        <p>Strictly non-commercial personal use. Commercial exploitation subject to litigation.</p>
      </footer>
    </div>
  );
}
