"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { SECURITY_QUESTIONS } from "@/lib/auth/security-questions-constants";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [honorPledge, setHonorPledge] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!honorPledge) {
      setError("You must accept the honor pledge to proceed.");
      return;
    }

    if (!termsAccepted) {
      setError(
        "You must agree to the Terms & Conditions and Commercial Prohibition to create an account."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          honorPledgeAccepted: honorPledge,
          termsAccepted: termsAccepted,
          securityQuestion,
          securityAnswer,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      if (data.user?.id) {
        localStorage.setItem("sql_office_last_user_id", data.user.id);
      }

      if (redirectUrl && redirectUrl.startsWith("/")) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const canSubmit = honorPledge && termsAccepted && securityAnswer.trim().length > 0 && !loading;

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      {/* Top Header Feedback Callout */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg px-4 flex justify-between items-center mb-4">
        <Link
          href="/"
          className="text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1"
        >
          ← Back to Simulator
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/onboarding"
            className="text-xs font-bold text-[var(--ocean-hover)] hover:underline flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Onboarding Guide</span>
          </Link>
          <FeedbackLink variant="pill" />
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
              <Building2 className="w-5 h-5 text-[var(--ink)]" />
            </div>
            <span className="font-black text-xl tracking-tight text-[var(--ink)]">
              SQL OFFICE SIMULATOR
            </span>
          </Link>
          <h2 className="text-2xl font-black text-[var(--ink)]">
            Join the Simulated Company
          </h2>
          <p className="mt-1 text-xs font-semibold text-[var(--ink)] opacity-80">
            Create your open-source learner account • 100% Free Forever
          </p>

          {redirectUrl && (
            <div className="mt-3 p-2.5 rounded-lg bg-[var(--sun)]/30 border border-[var(--sun)] text-xs font-bold text-[var(--ink)] text-center">
              Create your account to unlock the workplace sandbox & start your queries.
            </div>
          )}
        </div>

        <div className="bg-[var(--white)] py-8 px-6 sm:px-10 border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0px_var(--ocean)] space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Full Name / Work Pseudonym
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>
            </div>

            {/* Security Question Section (Zero-SMTP Password Recovery) */}
            <div className="pt-2 border-t border-[var(--sky)] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--ink)]">
                <HelpCircle className="w-3.5 h-3.5 text-[var(--ocean-hover)]" />
                <span>Security Recovery Question (Offline Account Reset)</span>
              </div>
              <p className="text-[11px] text-[var(--ink)] opacity-75 leading-tight">
                Used to recover your account if you forget your password without relying on external email delivery.
              </p>

              <div>
                <label className="block text-[11px] font-bold text-[var(--ink)] mb-1">
                  Select Question
                </label>
                <select
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] bg-white focus:outline-none focus:border-[var(--ocean)]"
                >
                  {SECURITY_QUESTIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--ink)] mb-1">
                  Your Answer
                </label>
                <input
                  type="text"
                  required
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Your secret answer (case-insensitive)"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>
            </div>

            {/* Honor Pledge Section */}
            <div className="pt-2 border-t border-[var(--sky)] space-y-2">
              <div className="flex items-start gap-2 bg-[var(--surface)] p-3 rounded-xl border border-[var(--sky)]">
                <input
                  type="checkbox"
                  id="honorPledge"
                  checked={honorPledge}
                  onChange={(e) => setHonorPledge(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-2 border-[var(--ink)] text-[var(--ocean)] focus:ring-[var(--ocean)] cursor-pointer"
                />
                <label
                  htmlFor="honorPledge"
                  className="text-xs text-[var(--ink)] leading-snug cursor-pointer font-medium"
                >
                  <strong className="block text-[var(--ink)] font-bold">
                    Workplace Honor Pledge (Human SQL Only)
                  </strong>
                  &ldquo;I promise to write my own queries, avoid automated AI assistants, and never copy answers from other sources. I am here to build real engineering competence.&rdquo;
                </label>
              </div>
            </div>

            {/* Legal Terms & Commercial Prohibition Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-2 border-[var(--ink)] text-[var(--ocean)] focus:ring-[var(--ocean)] cursor-pointer"
              />
              <span className="text-xs text-[var(--ink)] leading-tight font-medium">
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="font-bold underline text-[var(--ocean-hover)] hover:text-[var(--ink)]"
                >
                  Terms &amp; Conditions
                  <ExternalLink className="w-3 h-3 inline ml-0.5" />
                </Link>
                {" "}and agree not to commercially re-distribute, scrape, or paywall any simulator questions or content.
              </span>
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full btn-primary text-xs py-2.5 ${
                !canSubmit ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Creating your account..."
                : "Accept Terms & Create Free Account"}
              <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
            </button>
          </form>

          <div className="text-center text-xs font-semibold text-[var(--ink)] opacity-80 pt-2 border-t border-[var(--sky)]">
            Already have an account?{" "}
            <Link
              href={`/auth/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="font-extrabold text-[var(--ocean-hover)] underline hover:text-[var(--ink)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center font-bold text-xs text-[var(--ink)]">
          Loading...
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
