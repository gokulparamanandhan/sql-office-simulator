import React from "react";
import { MessageSquareHeart, ExternalLink, Sparkles } from "lucide-react";

interface FeedbackLinkProps {
  variant?: "button" | "banner" | "pill";
  className?: string;
}

export const FEEDBACK_URL = "https://forms.gle/BwdcTBKeKJAkXSsn8";

export default function FeedbackLink({
  variant = "button",
  className = "",
}: FeedbackLinkProps) {
  if (variant === "banner") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border-2 border-amber-500 p-5 sm:p-6 shadow-[4px_4px_0px_#D97706] text-[var(--ink)] ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We Value Your Voice</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-amber-950 tracking-tight">
              Help Shape the Future of SQL Office Simulator
            </h4>
            <p className="text-xs sm:text-sm text-amber-900/90 max-w-xl leading-relaxed font-medium">
              Found a bug, want more business domains, or have ideas to improve simulated company workflows? Share your candid thoughts with the creator!
            </p>
          </div>

          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wide border-2 border-amber-900 shadow-[3px_3px_0px_#78350F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all shrink-0"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Open Feedback Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <a
        href={FEEDBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Open Feedback & Suggestions Google Form"
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/90 hover:bg-amber-300 text-amber-950 border border-amber-600 font-extrabold text-[11px] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all ${className}`}
      >
        <MessageSquareHeart className="w-3.5 h-3.5 text-amber-700" />
        <span>Feedback</span>
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>
    );
  }

  // Default "button" variant (header highlighted button)
  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Give Feedback or Report an Issue (Google Forms)"
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-amber-600 bg-amber-300 hover:bg-amber-400 text-amber-950 text-xs font-black shadow-[2px_2px_0px_#92400E] active:translate-x-[1px] active:translate-y-[1px] transition-all ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-700"></span>
      </span>
      <MessageSquareHeart className="w-3.5 h-3.5 text-amber-900 group-hover:scale-110 transition-transform" />
      <span className="tracking-tight">Feedback</span>
      <ExternalLink className="w-3 h-3 text-amber-800 opacity-75" />
    </a>
  );
}
