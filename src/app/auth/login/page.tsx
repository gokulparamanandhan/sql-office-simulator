"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Building2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import FeedbackLink from "@/components/FeedbackLink";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      if (data.user?.id) {
        localStorage.setItem("sql_office_last_user_id", data.user.id);
      }

      // If logged in as admin, redirect directly to admin console
      if (data.isAdmin || data.user?.role === "admin") {
        router.push("/admin");
      } else if (redirectUrl && redirectUrl.startsWith("/")) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Header Feedback Callout */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 flex justify-between items-center mb-4">
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
          Welcome Back to the Office
        </h2>
        <p className="mt-1 text-center text-xs font-semibold text-[var(--ink)] opacity-80">
          Pick up where you left off in your company inbox
        </p>

        {redirectUrl && (
          <div className="mt-3 p-2.5 rounded-lg bg-[var(--sun)]/30 border border-[var(--sun)] text-xs font-bold text-[var(--ink)] text-center">
            Sign in to continue into your chosen workplace domain & database sandbox.
          </div>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
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
                Email Address
              </label>
              <input
                type="text"
                required
                autoCapitalize="none"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[var(--ink)]">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] font-bold text-[var(--ocean-hover)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-3 py-2 border-2 border-[var(--sky)] rounded-lg text-xs font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--ocean)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xs py-2.5 mt-2"
            >
              {loading ? "Signing in..." : "Sign In to Office"}
              <ArrowRight className="w-4 h-4 text-[var(--ink)]" />
            </button>
          </form>

          <div className="pt-2 border-t border-[var(--sky)] text-center text-xs font-semibold text-[var(--ink)] opacity-80">
            Don&apos;t have an account yet?{" "}
            <Link
              href={`/auth/signup${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="font-extrabold text-[var(--ocean-hover)] underline hover:text-[var(--ink)]"
            >
              Sign Up with Honor Pledge & Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center font-bold text-xs text-[var(--ink)]">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
