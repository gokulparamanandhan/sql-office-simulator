"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  Smartphone,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2FA state
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Administrative authentication failed.");
      }

      // If Google Authenticator 2FA is required
      if (data.requires2FA && data.challengeToken) {
        setChallengeToken(data.challengeToken);
        setStep("2fa");
        setLoading(false);
        return;
      }

      // No 2FA required: redirect directly to Admin Console
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error.");
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: totpCode,
          challengeToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid 2FA verification code.");
      }

      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "2FA verification failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 border-2 border-slate-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
            {step === "credentials" ? (
              <ShieldCheck className="w-8 h-8 text-slate-950" />
            ) : (
              <Smartphone className="w-8 h-8 text-slate-950" />
            )}
          </div>
        </div>
        <h2 className="text-center text-2xl font-black tracking-tight text-white">
          {step === "credentials" ? "SQL Office Admin Portal" : "Two-Factor Authentication"}
        </h2>
        <p className="mt-1 text-center text-xs font-semibold text-slate-400">
          {step === "credentials"
            ? "Restricted Access • System Operations & User Data Protection"
            : "Google Authenticator MFA Protection"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800/90 border border-slate-700 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Admin Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoFocus
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 active:scale-[0.99] disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? "Verifying Credentials..." : "Authenticate as Admin"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 text-[11px] font-bold border border-slate-700">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Google Authenticator Required</span>
                </div>
                <p className="text-xs text-slate-300">
                  {useBackupCode
                    ? "Enter an unused 8-character emergency backup code."
                    : "Enter the 6-digit code shown in your Google Authenticator app."}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.trim())}
                  placeholder={useBackupCode ? "e.g. A7X9-4K2P" : "000000"}
                  maxLength={useBackupCode ? 12 : 6}
                  className="w-full text-center tracking-widest text-xl font-mono py-3 bg-slate-900 border-2 border-amber-500/70 rounded-xl text-amber-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !totpCode}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 active:scale-[0.99] disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? "Verifying 2FA..." : "Verify & Complete Login"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setUseBackupCode(!useBackupCode);
                    setTotpCode("");
                    setError(null);
                  }}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  {useBackupCode ? "← Use 6-digit Authenticator code" : "Lost phone? Use backup code"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError(null);
                    setTotpCode("");
                  }}
                  className="hover:underline"
                >
                  Back to credentials
                </button>
              </div>
            </form>
          )}

          <div className="text-center pt-2 border-t border-slate-700/60">
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Main Simulator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
