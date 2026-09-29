import Link from "next/link";
import { Lock, ArrowLeft, ShieldCheck, Database, EyeOff } from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

export const metadata = {
  title: "Privacy Policy | SQL Office Simulator",
  description:
    "Learn how SQL Office Simulator handles learner accounts, query telemetry, and privacy. 100% free with no ad trackers.",
};

export default function PrivacyPage() {
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
              <div className="w-8 h-8 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center font-black text-sm">
                <Lock className="w-4 h-4 text-[var(--ink)]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-[var(--ink)]">
                SQL Office Simulator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FeedbackLink variant="pill" />
            <Link href="/terms" className="text-xs font-bold text-[var(--ink)] hover:underline">
              Terms & Honor Code
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
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_var(--sky)] space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--mist)] border border-[var(--ink)] text-xs font-black uppercase tracking-wider text-[var(--ink)]">
            <Lock className="w-3.5 h-3.5" />
            Learner Privacy Commitment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
            Transparent, Minimal, and Dedicated to Education
          </h1>
          <p className="text-sm text-[var(--ink)] opacity-80 leading-relaxed">
            Effective Date: September 2026. We collect only what is strictly necessary to authenticate your profile, calculate your SQL career progress, and run the sandbox simulator.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-xl p-5 shadow-[3px_3px_0px_var(--ink)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--sun)] border border-[var(--ink)] flex items-center justify-center">
              <EyeOff className="w-4 h-4 text-[var(--ink)]" />
            </div>
            <h3 className="font-extrabold text-sm text-[var(--ink)]">Zero Ads & Trackers</h3>
            <p className="text-xs text-[var(--ink)] opacity-75 leading-relaxed">
              We do not embed third-party advertising trackers, pixel beacons, or data broker networks.
            </p>
          </div>

          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-xl p-5 shadow-[3px_3px_0px_var(--ink)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--ocean)] border border-[var(--ink)] flex items-center justify-center">
              <Database className="w-4 h-4 text-[var(--ink)]" />
            </div>
            <h3 className="font-extrabold text-sm text-[var(--ink)]">Query Telemetry</h3>
            <p className="text-xs text-[var(--ink)] opacity-75 leading-relaxed">
              Submitted SQL is executed inside isolated sandboxes to calculate accuracy, XP awards, and streaks.
            </p>
          </div>

          <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-xl p-5 shadow-[3px_3px_0px_var(--ink)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--mist)] border border-[var(--ink)] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
            </div>
            <h3 className="font-extrabold text-sm text-[var(--ink)]">Local Control</h3>
            <p className="text-xs text-[var(--ink)] opacity-75 leading-relaxed">
              Your unfinished query drafts and scratchpad notes stay right in your browser&apos;s localStorage.
            </p>
          </div>
        </div>

        {/* Detailed Privacy Sections */}
        <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[var(--ink)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-extrabold text-base text-[var(--ink)]">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5 opacity-80">
              <li>
                <strong>Account Information:</strong> When you create an account, we store your email address, display name, and securely salted bcrypt password hash.
              </li>
              <li>
                <strong>Learning Activity:</strong> Question completions, XP gained, daily streak counts, hints unlocked, and timestamps of submissions.
              </li>
              <li>
                <strong>Quality Feedback:</strong> If you submit a question report, we log the category and comment to improve our curriculum.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-base text-[var(--ink)]">2. How Information Is Used</h2>
            <p className="opacity-80">
              Your information is exclusively used to provide the educational experience: verifying login sessions via HTTP-only JWT cookies, calculating concept mastery breakdowns, unlocking higher career levels, and preventing automated abuse through rate-limiting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-base text-[var(--ink)]">3. Data Retention & Deletion Rights</h2>
            <p className="opacity-80">
              You own your learning journey. Under applicable data protection regulations (including GDPR and CCPA), you may at any time request an export of your progress records or the permanent deletion of your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-base text-[var(--ink)]">4. Security Measures</h2>
            <p className="opacity-80">
              Passwords are salted and hashed using bcrypt. Database queries run in read-only sandbox schemas protected by AST syntax analysis and statement timeouts. Authentication tokens are digitally signed with cryptographic secrets.
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
