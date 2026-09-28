"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [honorPledge, setHonorPledge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!honorPledge) {
      setError("You must accept the honor pledge to proceed.");
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "alex.learner@gmail.com",
          name: "Alex Vance",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Google Sign-In failed.");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--ocean)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
            <Building2 className="w-5 h-5 text-[var(--ink)]" />
          </div>
          <span className="font-black text-xl tracking-tight text-[var(--ink)]">
            SQL OFFICE SIMULATOR
          </span>
        </Link>
        <h2 className="text-center text-2xl font-black text-[var(--ink)]">
          Join the Simulated Company
        </h2>
        <p className="mt-1 text-center text-xs font-semibold text-[var(--ink)] opacity-80">
          Create your learner account • Free forever • No credit card
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[var(--white)] py-8 px-6 sm:px-10 border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0px_var(--ocean)] space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* One-Click Google OAuth */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border-2 border-[var(--ink)] rounded-lg font-bold text-xs text-[var(--ink)] bg-[var(--white)] hover:bg-[var(--mist)] transition-all shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[var(--sky)]"></div>
            <span className="flex-shrink mx-3 text-[11px] font-bold uppercase text-[var(--ink)] opacity-60">
              Or with email
            </span>
            <div className="flex-grow border-t border-[var(--sky)]"></div>
          </div>

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
                placeholder="name@company.com"
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

            {/* MANDATORY HONOR PLEDGE BOX (Section 8) */}
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

            <button
              type="submit"
              disabled={loading || !honorPledge}
              className={`w-full btn-primary text-xs py-2.5 ${
                !honorPledge ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating your account..." : "Accept Pledge & Create Account"}
              <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
            </button>
          </form>

          <div className="text-center text-xs font-semibold text-[var(--ink)] opacity-80">
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
