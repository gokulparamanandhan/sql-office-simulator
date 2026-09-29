"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, AlertCircle, RefreshCw, KeyRound, Check, ArrowRight, UserCheck } from "lucide-react";

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialEmail?: string;
  initialName?: string;
}

export default function TwoFactorModal({
  isOpen,
  onClose,
  onSuccess,
  initialEmail = "",
  initialName = "",
}: TwoFactorModalProps) {
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [code, setCode] = useState("");
  const [dispatchedCode, setDispatchedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
    if (initialName) setName(initialName);
  }, [initialEmail, initialName]);

  // Cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Step 1: Dispatch Two-Factor Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid Google email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || email.split("@")[0],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch verification code.");

      if (data.requires2FA) {
        setDispatchedCode(data.codePreview);
        setStep("2fa");
        setResendCooldown(30);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to initiate verification.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || email.split("@")[0],
          code: cleanCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.attemptsRemaining !== undefined) {
          setAttemptsRemaining(data.attemptsRemaining);
        }
        throw new Error(data.error || "Invalid verification code.");
      }

      // Success! Clear any old un-scoped local storage progress
      try {
        localStorage.removeItem("sql_office_user_stats");
        localStorage.removeItem("sql_office_ecommerce_l1_solved");
        localStorage.removeItem("sql_office_academy_solved");
        if (data.user?.id) {
          localStorage.setItem("sql_office_last_user_id", data.user.id);
        }
      } catch {
        // Ignore
      }

      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Resend code
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/2fa/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not resend code.");
      setDispatchedCode(data.codePreview);
      setResendCooldown(30);
      setCode("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--white)] border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-[6px_6px_0px_var(--ink)] space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--sun)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]">
              {step === "credentials" ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              ) : (
                <ShieldCheck className="w-5 h-5 text-[var(--ink)]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-[var(--ink)] uppercase">
                  {step === "credentials" ? "Google Authentication" : "Two-Step Verification"}
                </h3>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[var(--accent-teal)] border border-[var(--ink)]">
                  {step === "credentials" ? "STEP 1/2" : "STEP 2/2"}
                </span>
              </div>
              <p className="text-[11px] font-bold text-[var(--ink)] opacity-70">
                {step === "credentials"
                  ? "Enter your Google credentials to continue"
                  : "Verify your human identity with 6-digit security code"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper-beige)] hover:bg-slate-200 text-xs font-black flex items-center justify-center shadow-[1px_1px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            ✕
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border-2 border-rose-400 text-rose-900 text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_rgba(244,63,94,0.3)]">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <div className="flex-1">
              <span>{error}</span>
              {attemptsRemaining !== null && (
                <span className="block text-[11px] opacity-80 mt-0.5">
                  Remaining attempts: {attemptsRemaining}
                </span>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: Enter Credentials */}
        {step === "credentials" ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-[var(--ink)] mb-1">
                Google Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@gmail.com"
                className="w-full px-3 py-2 border-2 border-[var(--ink)] rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--paper-beige)] focus:outline-none focus:bg-white shadow-[2px_2px_0px_var(--ink)]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[var(--ink)] mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-3 py-2 border-2 border-[var(--ink)] rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--paper-beige)] focus:outline-none focus:bg-white shadow-[2px_2px_0px_var(--ink)]"
              />
            </div>

            {/* Anti-Pen-Test Security Banner */}
            <div className="bg-[var(--paper-beige)] border-2 border-[var(--ink)] rounded-xl p-3 text-[11px] text-[var(--ink)] space-y-1 shadow-[2px_2px_0px_var(--ink)]">
              <div className="font-black flex items-center gap-1.5 uppercase text-[10px]">
                <Lock className="w-3.5 h-3.5 text-[var(--ink)]" />
                <span>Anti-Intrusion & Security Protection Active</span>
              </div>
              <p className="font-semibold leading-relaxed opacity-85">
                To prevent bot intrusions and unauthorized penetration testing, all logins require two-step verification before accessing simulated enterprise databases.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 border-2 border-[var(--ink)] rounded-xl font-black text-xs text-[var(--ink)] bg-slate-100 hover:bg-slate-200 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary text-xs py-2.5 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5"
              >
                {loading ? "Generating 2FA..." : "Next: Verify Identity"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: 2FA Security Code Verification */
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="text-xs font-black text-[var(--ink)]">
                Security Code Issued for:
              </div>
              <div className="font-mono text-xs font-black text-[var(--ink)] px-2.5 py-1 bg-[var(--paper-beige)] rounded-lg border border-[var(--ink)] inline-block">
                {email}
              </div>
            </div>

            {/* Live Security Code Banner (For easy localhost testing & human verification) */}
            {dispatchedCode && (
              <div className="bg-[var(--sun)] border-2 border-[var(--ink)] rounded-xl p-3 shadow-[3px_3px_0px_var(--ink)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-[var(--ink)] flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>One-Time Security Code</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[var(--white)] px-1.5 py-0.5 rounded border border-[var(--ink)]">
                    VALID 10 MIN
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-[var(--white)] border-2 border-[var(--ink)] p-2 rounded-lg">
                  <span className="font-mono text-lg font-black tracking-widest text-[var(--ink)]">
                    {dispatchedCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCode(dispatchedCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2.5 py-1 text-[11px] font-black rounded border border-[var(--ink)] bg-[var(--accent-teal)] hover:bg-[#00b0b8] text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)] flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{copied ? "Filled!" : "Auto-fill Code"}</span>
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase text-[var(--ink)] mb-1 text-center">
                Enter 6-Digit Verification PIN
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                autoFocus
                className="w-full text-center tracking-[0.5em] font-mono text-xl font-black py-2.5 px-3 border-2 border-[var(--ink)] rounded-xl text-[var(--ink)] bg-[var(--paper-beige)] focus:outline-none focus:bg-white shadow-[3px_3px_0px_var(--ink)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="text-[11px] font-bold text-[var(--ink)] hover:underline opacity-80"
              >
                ← Change Email
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className={`text-[11px] font-bold flex items-center gap-1 ${
                  resendCooldown > 0
                    ? "opacity-50 cursor-not-allowed text-[var(--ink)]"
                    : "text-[var(--ink)] font-black hover:underline"
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                <span>
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
                </span>
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 border-2 border-[var(--ink)] rounded-xl font-black text-xs text-[var(--ink)] bg-slate-100 hover:bg-slate-200 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || code.length < 6}
                className={`flex-1 btn-primary text-xs py-2.5 shadow-[2px_2px_0px_var(--ink)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 ${
                  code.length < 6 ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <UserCheck className="w-4 h-4 text-[var(--ink)]" />
                <span>{loading ? "Verifying PIN..." : "Verify & Access Office"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
