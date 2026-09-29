"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowRight, AlertCircle, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialToken = searchParams.get("token") || "";

  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--white)] py-8 px-6 sm:px-10 border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0px_var(--ocean)] space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-[var(--ink)]">
            Password Reset Complete!
          </h3>
          <p className="text-xs text-[var(--ink)] opacity-80 leading-relaxed font-medium">
            Your learning account password has been updated. You can now sign in with your new password.
          </p>

          <Link
            href="/auth/login"
            className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In Now</span>
            <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {!initialToken && (
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Password Reset Security Token
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste the secret token from your email"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)] font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="Repeat your new password"
              className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? "Updating Password..." : "Save New Password"}</span>
            <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
          </button>
        </form>
      )}

      <div className="text-center text-xs font-semibold text-[var(--ink)] opacity-80 pt-2 border-t border-[var(--sky)]">
        Return to{" "}
        <Link
          href="/auth/login"
          className="font-extrabold text-[var(--ocean-hover)] underline hover:text-[var(--ink)]"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
            Set Your New Password
          </h2>
          <p className="mt-1 text-xs font-semibold text-[var(--ink)] opacity-80">
            Create a secure password for your SQL Office learning account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Suspense fallback={
          <div className="p-8 bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] text-center text-xs font-bold">
            Loading reset form...
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
