"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";
import { SECURITY_QUESTIONS } from "@/lib/auth/security-questions-constants";

export default function SignUpPage() {
  const router = useRouter();
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

      router.push("/dashboard");
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
        <FeedbackLink variant="pill" />
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
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Lee"
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
                placeholder="name@email.com"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 chars"
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
                  placeholder="Repeat password"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>
            </div>

            {/* Account Recovery Security Question */}
            <div className="bg-[var(--surface)] border-2 border-[var(--sky)] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink)]">
                <HelpCircle className="w-4 h-4 text-[var(--ocean-hover)]" />
                <span>Account Recovery Security Question</span>
              </div>
              <p className="text-[11px] text-[var(--ink)] opacity-75 font-medium">
                Used to verify your identity if you ever forget your password.
              </p>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--ink)] opacity-80 mb-1">
                    Select Question
                  </label>
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full px-2.5 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold bg-[var(--white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                  >
                    {SECURITY_QUESTIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--ink)] opacity-80 mb-1">
                    Secret Answer
                  </label>
                  <input
                    type="text"
                    required
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Your secret answer (e.g. Fluffy)"
                    className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold bg-[var(--white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY HONOR PLEDGE BOX */}
            <div className="bg-[var(--mist)] border-2 border-[var(--sky)] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--ink)] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-[var(--ink)]">
                    The Learner Honor Pledge
                  </div>
                  <p className="text-[11px] text-[var(--ink)] opacity-90 leading-relaxed italic">
                    &ldquo;This simulator works only if you do the work yourself. Please don&apos;t use AI tools or copy solutions. You&apos;re here to build real skills, and the only person you&apos;d be fooling is you. Be honest, and enjoy the learning.&rdquo;
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1.5 border-t border-[var(--sky)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={honorPledge}
                  onChange={(e) => setHonorPledge(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[var(--ink)] text-[var(--ocean)] focus:ring-[var(--ocean)]"
                />
                <span className="text-xs font-bold text-[var(--ink)] leading-snug">
                  I will not rely on AI tools to solve questions. I am here to build real SQL mastery.
                </span>
              </label>
            </div>

            {/* Single-line Terms & Conditions Agreement */}
            <label className="flex items-center gap-2.5 cursor-pointer py-1 px-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--ink)] text-[var(--ocean)] focus:ring-[var(--ocean)]"
              />
              <span className="text-xs font-bold text-[var(--ink)] leading-snug">
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="font-extrabold text-[var(--ocean-hover)] underline hover:text-[var(--ink)] inline-flex items-center gap-0.5"
                >
                  Terms &amp; Conditions
                  <ExternalLink className="w-3 h-3 inline" />
                </Link>
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
                : "Accept Terms & Create Account"}
              <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
            </button>
          </form>

          <div className="text-center text-xs font-semibold text-[var(--ink)] opacity-80 pt-2 border-t border-[var(--sky)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
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
