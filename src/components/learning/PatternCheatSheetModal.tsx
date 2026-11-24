"use client";

import { useState } from "react";
import { X, BookOpen, Copy, Check, AlertTriangle } from "lucide-react";
import { PATTERN_CHEATSHEET } from "@/lib/interview/sql-learning-helpers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatternCheatSheetModal({ isOpen, onClose }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyTemplate = (id: string, sql: string) => {
    navigator.clipboard?.writeText(sql).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-3 border-black rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-[8px_8px_0px_#000000] overflow-hidden">
        <div className="bg-[#FFE600] border-b-3 border-black px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-black" />
            <div>
              <h2 className="font-black text-sm sm:text-base uppercase text-black">
                The 8 Reusable SQL Patterns Cheat-Sheet
              </h2>
              <p className="text-[11px] font-bold text-black/75">
                90% of intermediate &amp; advanced SQL questions are variations of these 8 blueprints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]"
            aria-label="Close cheat sheet"
          >
            <X className="w-4 h-4 text-black" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {PATTERN_CHEATSHEET.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_#000000] space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-black">{item.name}</h3>
                  <span className="text-[10px] font-mono font-black bg-[#00E599] border border-black px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                <button
                  onClick={() => copyTemplate(item.id, item.templateSql)}
                  className="px-2.5 py-1 rounded-lg border border-black bg-[#FAF8F5] hover:bg-[#FFE600] text-[11px] font-black flex items-center gap-1"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? "Copied" : "Copy Pattern"}</span>
                </button>
              </div>

              <div className="text-xs font-bold text-black/80">
                When to use: <span className="font-medium">{item.whenToUse}</span>
              </div>
              <div className="text-xs text-black/80 leading-relaxed">{item.mentalModel}</div>

              <pre className="bg-[#1e1e1e] text-slate-100 rounded-xl p-3 font-mono text-[11px] overflow-x-auto border border-black">
                {item.templateSql}
              </pre>

              <div className="bg-rose-50 border border-rose-300 rounded-lg px-3 py-2 text-[11px] font-bold text-rose-950 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Common Pitfall: {item.pitfall}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
