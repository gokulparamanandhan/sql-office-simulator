"use client";

import { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";
import type { ConceptPrimer } from "@/lib/interview/sql-learning-helpers";
import WindowFrameVisualizer from "./WindowFrameVisualizer";

interface Props {
  primer: ConceptPrimer;
  stage?: string;
  rampStep?: string;
}

export default function ConceptPrimerPanel({ primer, stage, rampStep }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(primer.syntaxTemplate).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#FFF9D2] border-2 border-black rounded-xl p-4 space-y-2.5 shadow-[3px_3px_0px_#000000]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <h3 className="font-black text-sm text-black">{primer.title}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {stage && (
              <span className="text-[10px] font-black bg-white border border-black px-2 py-0.5 rounded">
                {stage}
              </span>
            )}
            {rampStep && (
              <span className="text-[10px] font-black bg-[#00E599] border border-black px-2 py-0.5 rounded">
                {rampStep}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs font-medium text-black/90 leading-relaxed">{primer.mentalModel}</p>
        {primer.exampleWalkthrough && (
          <p className="text-[11px] font-bold text-amber-950 bg-white/70 border border-black/20 rounded-lg p-2">
            Key Insight: {primer.exampleWalkthrough}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase text-[var(--ink)] opacity-75">
            Minimal Syntax Pattern
          </span>
          <button
            onClick={handleCopy}
            className="text-[10px] font-black px-2 py-0.5 rounded border border-black bg-white hover:bg-slate-50 flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Template"}</span>
          </button>
        </div>
        <pre className="bg-[#1e1e1e] text-slate-100 border-2 border-black rounded-xl p-3 font-mono text-xs overflow-x-auto leading-relaxed">
          {primer.syntaxTemplate}
        </pre>
      </div>

      {primer.visualType && <WindowFrameVisualizer visualType={primer.visualType} />}
    </div>
  );
}
