"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  AlertCircle,
  Mail,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  Lock,
} from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "question" | "success">("email");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Look up account security question
  const handleLookupQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/security-question/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to find security question for this account.");
      }

      setQuestion(data.question);
      setStep("question");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify answer and update password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/security-question/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answer,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect answer or password reset failed.");
      }

      setStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 flex justify-between items-center mb-4">
        <Link
          href="/auth/login"
          className="text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
        <FeedbackLink variant="pill" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
              <Building2 className="w-5 h-5 text-[var(--ink)]" />
            </div>
            <span className="font-black text-xl tracking-tight text-[var(--ink)]">
              SQL OFFICE SIMULATOR
            </span>
          </Link>
          <h2 className="text-2xl font-black text-[var(--ink)]">
            Reset Your Password
          </h2>
          <p className="mt-1 text-xs font-semibold text-[var(--ink)] opacity-80">
            {step === "email" && "Enter your account email to answer your security question"}
            {step === "question" && "Answer your security question to set a new password"}
            {step === "success" && "Your password has been successfully updated"}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[var(--white)] py-8 px-6 sm:px-10 border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0px_var(--ocean)] space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {step === "email" && (
            <form onSubmit={handleLookupQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Your Account Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    autoFocus
                    className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--mist)] border border-[var(--sky)] text-[11px] text-[var(--ink)] opacity-80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
                  <HelpCircle className="w-3.5 h-3.5 text-[var(--ocean-hover)]" />
                  <span>Security Question Recovery</span>
                </div>
                <p>
                  No email or server confirmation needed. You will verify your secret answer to set your new password immediately.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{loading ? "Finding Security Question..." : "Continue to Security Question"}</span>
                <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
              </button>
            </form>
          )}

          {step === "question" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="p-3 bg-[var(--surface)] border border-[var(--sky)] rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between text-[11px] opacity-75 font-semibold">
                  <span>Account Email:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError(null);
                      setAnswer("");
                    }}
                    className="text-[var(--ocean-hover)] underline font-bold"
                  >
                    Change
                  </button>
                </div>
                <div className="font-mono font-bold text-[var(--ink)]">{email}</div>
              </div>

              {/* The Security Question */}
              <div className="p-3.5 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Security Question:</span>
                </div>
                <div className="font-extrabold text-xs text-[var(--ink)] pl-5">
                  &ldquo;{question}&rdquo;
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Your Secret Answer
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your security answer"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !answer || !newPassword}
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? "Verifying & Updating..." : "Verify Answer & Reset Password"}</span>
                <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[var(--ink)]">
                Password Successfully Reset!
              </h3>
              <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed font-medium">
                Your account password has been updated. You can now sign in immediately with your new credentials.
              </p>

              <Link
                href="/auth/login"
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Office Now</span>
                <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
              </Link>
            </div>
          )}

          <div className="text-center text-xs font-semibold text-[var(--ink)] opacity-80 pt-2 border-t border-[var(--sky)]">
            Remembered your password?{" "}
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
