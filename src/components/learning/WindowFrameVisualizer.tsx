"use client";

import { useState } from "react";
import type { VisualPrimerType } from "@/lib/interview/sql-learning-helpers";

interface Props {
  visualType: VisualPrimerType;
}

const FRAME_SAMPLE = [
  { id: 1, dept: "Audio", day: "Jan 1", val: 10 },
  { id: 2, dept: "Audio", day: "Jan 2", val: 20 },
  { id: 3, dept: "Audio", day: "Jan 2", val: 30 },
  { id: 4, dept: "Audio", day: "Jan 3", val: 40 },
  { id: 5, dept: "Tech", day: "Jan 1", val: 50 },
  { id: 6, dept: "Tech", day: "Jan 2", val: 70 },
];

type FrameMode = "running" | "3row" | "centered" | "unbounded_both" | "range_ties";

const FRAME_LABELS: Record<FrameMode, { label: string; clause: string; note: string }> = {
  running: {
    label: "Running Total",
    clause: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
    note: "Advances strictly 1 physical row at a time inside the same PARTITION BY dept.",
  },
  "3row": {
    label: "3-Row Rolling",
    clause: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
    note: "Takes up to 2 prior rows in the same partition plus the current row.",
  },
  centered: {
    label: "Centered (1↔1)",
    clause: "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
    note: "Looks 1 row back and 1 row forward inside the partition.",
  },
  unbounded_both: {
    label: "Full Partition (LAST_VALUE fix)",
    clause: "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
    note: "Required for LAST_VALUE() so the frame reaches the very last row of the partition!",
  },
  range_ties: {
    label: "Default RANGE (Ties Merge!)",
    clause: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
    note: "Default when you omit ROWS: rows 2 & 3 share 'Jan 2', so both get SUM = 60 immediately!",
  },
};

const RANK_SAMPLE = [
  { name: "Echo Dot", cat: "Audio", rev: 150 },
  { name: "Fire Stick", cat: "Audio", rev: 150 },
  { name: "Kindle", cat: "Audio", rev: 110 },
  { name: "Speaker", cat: "Audio", rev: 90 },
  { name: "Air Fryer", cat: "Home", rev: 85 },
  { name: "Blender", cat: "Home", rev: 85 },
];

export default function WindowFrameVisualizer({ visualType }: Props) {
  const [activeRowIdx, setActiveRowIdx] = useState<number>(2);
  const [frameMode, setFrameMode] = useState<FrameMode>("running");
  const [rankFn, setRankFn] = useState<"ROW_NUMBER" | "RANK" | "DENSE_RANK">("DENSE_RANK");

  if (visualType === "window-frame") {
    const current = FRAME_SAMPLE[activeRowIdx];
    const inFrameIndices = FRAME_SAMPLE.map((row, idx) => {
      if (row.dept !== current.dept) return false;
      const partitionIndices = FRAME_SAMPLE.map((r, i) => (r.dept === current.dept ? i : -1)).filter((i) => i >= 0);
      const posInPart = partitionIndices.indexOf(idx);
      const curPosInPart = partitionIndices.indexOf(activeRowIdx);

      if (frameMode === "running") return posInPart <= curPosInPart;
      if (frameMode === "3row") return posInPart >= curPosInPart - 2 && posInPart <= curPosInPart;
      if (frameMode === "centered") return posInPart >= curPosInPart - 1 && posInPart <= curPosInPart + 1;
      if (frameMode === "unbounded_both") return true;
      // range_ties by day
      return row.day <= current.day;
    });

    const activeValues = FRAME_SAMPLE.filter((_, i) => inFrameIndices[i]).map((r) => r.val);
    const frameSum = activeValues.reduce((a, b) => a + b, 0);
    const frameAvg = (frameSum / Math.max(1, activeValues.length)).toFixed(2);
    const frameLast = activeValues[activeValues.length - 1];

    return (
      <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3.5 space-y-3 shadow-[3px_3px_0px_#000000]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-black uppercase text-black">
            Interactive Window &amp; Frame Simulator (Click Any Row)
          </span>
          <span className="text-[10px] font-mono font-bold bg-[#FFE600] border border-black px-2 py-0.5 rounded">
            PARTITION BY dept ORDER BY day
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(FRAME_LABELS) as FrameMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFrameMode(mode)}
              className={`px-2 py-1 rounded-lg border text-[10px] font-black transition-all ${
                frameMode === mode
                  ? "bg-[#FFE600] border-black shadow-[1px_1px_0px_#000]"
                  : "bg-white border-black/30 hover:border-black"
              }`}
            >
              {FRAME_LABELS[mode].label}
            </button>
          ))}
        </div>

        <div className="bg-[#1e1e1e] text-emerald-300 font-mono text-[10px] px-2.5 py-1.5 rounded-lg border border-black">
          {FRAME_LABELS[frameMode].clause}
        </div>

        <div className="overflow-x-auto border border-black rounded-lg bg-white">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-100 border-b border-black">
              <tr>
                <th className="p-1.5">Row</th>
                <th className="p-1.5">dept</th>
                <th className="p-1.5">day</th>
                <th className="p-1.5">val</th>
                <th className="p-1.5">Frame Role</th>
              </tr>
            </thead>
            <tbody>
              {FRAME_SAMPLE.map((r, i) => {
                const isCur = i === activeRowIdx;
                const isIn = inFrameIndices[i];
                return (
                  <tr
                    key={r.id}
                    onClick={() => setActiveRowIdx(i)}
                    className={`cursor-pointer border-b last:border-b-0 transition-colors ${
                      isCur
                        ? "bg-[#FFE600]/60 font-black"
                        : isIn
                          ? "bg-emerald-100"
                          : r.dept === current.dept
                            ? "bg-white opacity-70"
                            : "bg-slate-100 opacity-40"
                    }`}
                  >
                    <td className="p-1.5">#{r.id}</td>
                    <td className="p-1.5">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] border ${
                          r.dept === "Audio" ? "bg-sky-100 border-sky-400" : "bg-purple-100 border-purple-400"
                        }`}
                      >
                        {r.dept}
                      </span>
                    </td>
                    <td className="p-1.5">{r.day}</td>
                    <td className="p-1.5">{r.val}</td>
                    <td className="p-1.5 text-[10px]">
                      {isCur ? "CURRENT ROW" : isIn ? "IN FRAME" : r.dept !== current.dept ? "Other Partition" : "Outside Frame"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <div className="bg-white border border-black rounded-lg p-1.5">
            <div className="text-[9px] font-sans font-black uppercase text-black/60">SUM(val)</div>
            <div className="font-black text-emerald-700">{frameSum}</div>
          </div>
          <div className="bg-white border border-black rounded-lg p-1.5">
            <div className="text-[9px] font-sans font-black uppercase text-black/60">AVG(val)</div>
            <div className="font-black text-blue-700">{frameAvg}</div>
          </div>
          <div className="bg-white border border-black rounded-lg p-1.5">
            <div className="text-[9px] font-sans font-black uppercase text-black/60">LAST_VALUE</div>
            <div className="font-black text-purple-700">{frameLast}</div>
          </div>
        </div>

        <p className="text-[11px] font-medium text-black/80">{FRAME_LABELS[frameMode].note}</p>
      </div>
    );
  }

  if (visualType === "window-ranking") {
    const computeRank = (idx: number): number => {
      const cur = RANK_SAMPLE[idx];
      const part = RANK_SAMPLE.filter((r) => r.cat === cur.cat);
      const pos = part.findIndex((r) => r.name === cur.name);
      if (rankFn === "ROW_NUMBER") return pos + 1;
      if (rankFn === "RANK") {
        return part.findIndex((r) => r.rev === cur.rev) + 1;
      }
      const distinctHigher = new Set(part.filter((r) => r.rev > cur.rev).map((r) => r.rev)).size;
      return distinctHigher + 1;
    };

    return (
      <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3.5 space-y-3 shadow-[3px_3px_0px_#000000]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-black uppercase text-black">
            Ranking Tie-Behavior Simulator
          </span>
          <div className="flex gap-1">
            {(["ROW_NUMBER", "RANK", "DENSE_RANK"] as const).map((fn) => (
              <button
                key={fn}
                onClick={() => setRankFn(fn)}
                className={`px-2 py-0.5 rounded border text-[10px] font-mono font-black ${
                  rankFn === fn ? "bg-[#FFE600] border-black" : "bg-white border-black/30"
                }`}
              >
                {fn}()
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto border border-black rounded-lg bg-white">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-100 border-b border-black">
              <tr>
                <th className="p-1.5">cat</th>
                <th className="p-1.5">product</th>
                <th className="p-1.5">revenue</th>
                <th className="p-1.5 text-purple-800">{rankFn}() OVER (PARTITION BY cat ORDER BY rev DESC)</th>
              </tr>
            </thead>
            <tbody>
              {RANK_SAMPLE.map((r, i) => {
                const rnk = computeRank(i);
                return (
                  <tr key={r.name} className="border-b last:border-b-0">
                    <td className="p-1.5">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] border ${
                          r.cat === "Audio" ? "bg-sky-100 border-sky-400" : "bg-amber-100 border-amber-400"
                        }`}
                      >
                        {r.cat}
                      </span>
                    </td>
                    <td className="p-1.5">{r.name}</td>
                    <td className="p-1.5">${r.rev}</td>
                    <td className="p-1.5 font-black text-purple-800">
                      #{rnk} {rnk <= 2 ? "✓ (Top 2)" : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] font-medium text-black/80">
          {rankFn === "ROW_NUMBER" && "ROW_NUMBER() always produces 1, 2, 3, 4—even when Echo Dot & Fire Stick tie at $150!"}
          {rankFn === "RANK" && "RANK() gives both $150 products #1, then skips #2 and jumps straight to #3 for Kindle."}
          {rankFn === "DENSE_RANK" && "DENSE_RANK() gives both $150 products #1 and gives Kindle #2—never skipping ranks!"}
        </p>
      </div>
    );
  }

  if (visualType === "lag-lead") {
    const cur = FRAME_SAMPLE[activeRowIdx];
    const prev = activeRowIdx > 0 && FRAME_SAMPLE[activeRowIdx - 1].dept === cur.dept ? FRAME_SAMPLE[activeRowIdx - 1] : null;
    const next =
      activeRowIdx < FRAME_SAMPLE.length - 1 && FRAME_SAMPLE[activeRowIdx + 1].dept === cur.dept
        ? FRAME_SAMPLE[activeRowIdx + 1]
        : null;

    return (
      <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3.5 space-y-3 shadow-[3px_3px_0px_#000000]">
        <span className="text-[11px] font-black uppercase text-black block">
          LAG() &amp; LEAD() Partition Pointer (Click Any Row)
        </span>
        <div className="overflow-x-auto border border-black rounded-lg bg-white">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-100 border-b border-black">
              <tr>
                <th className="p-1.5">dept</th>
                <th className="p-1.5">day</th>
                <th className="p-1.5">val</th>
                <th className="p-1.5">Pointer</th>
              </tr>
            </thead>
            <tbody>
              {FRAME_SAMPLE.map((r, i) => {
                const isCur = i === activeRowIdx;
                const isPrev = prev?.id === r.id;
                const isNext = next?.id === r.id;
                return (
                  <tr
                    key={r.id}
                    onClick={() => setActiveRowIdx(i)}
                    className={`cursor-pointer border-b last:border-b-0 ${
                      isCur ? "bg-[#FFE600]/60 font-black" : isPrev ? "bg-blue-100" : isNext ? "bg-emerald-100" : "bg-white"
                    }`}
                  >
                    <td className="p-1.5">{r.dept}</td>
                    <td className="p-1.5">{r.day}</td>
                    <td className="p-1.5">{r.val}</td>
                    <td className="p-1.5 text-[10px]">
                      {isCur ? "CURRENT" : isPrev ? "← LAG(val, 1)" : isNext ? "→ LEAD(val, 1)" : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <div className="bg-blue-50 border border-black rounded p-1.5">
            <div className="text-[9px] font-sans font-black">LAG(val, 1)</div>
            <div className="font-black text-blue-800">{prev ? prev.val : "NULL"}</div>
          </div>
          <div className="bg-[#FFE600]/40 border border-black rounded p-1.5">
            <div className="text-[9px] font-sans font-black">CURRENT val</div>
            <div className="font-black">{cur.val}</div>
          </div>
          <div className="bg-emerald-50 border border-black rounded p-1.5">
            <div className="text-[9px] font-sans font-black">LEAD(val, 1)</div>
            <div className="font-black text-emerald-800">{next ? next.val : "NULL"}</div>
          </div>
        </div>
      </div>
    );
  }

  // Pipeline / Subquery / Recursive visual diagram
  const steps =
    visualType === "recursive-tree"
      ? [
          { title: "1. Anchor Query", desc: "Select root rows (parent_id IS NULL, depth = 1)" },
          { title: "2. UNION ALL Loop", desc: "Join table back to CTE on child.parent_id = tree.id" },
          { title: "3. Terminate", desc: "Stops automatically when a pass returns 0 new children" },
        ]
      : visualType === "subquery-flow"
        ? [
            { title: "1. Inner Query Runs", desc: "Computes benchmark AVG / list / existence check" },
            { title: "2. Value Passed Out", desc: "Outer WHERE / HAVING / FROM consumes inner output" },
            { title: "3. Final Filter", desc: "Outer rows filtered & sorted cleanly" },
          ]
        : [
            { title: "1. CTE Pass 1", desc: "Clean dirty fields, pre-aggregate, or attach window flags" },
            { title: "2. CTE Pass 2 (Optional)", desc: "Filter ranks, compute running sums, or join safely" },
            { title: "3. Outer SELECT", desc: "Project requested columns & deterministic ORDER BY" },
          ];

  return (
    <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-3.5 space-y-2.5 shadow-[3px_3px_0px_#000000]">
      <span className="text-[11px] font-black uppercase text-black block">
        Visual Execution Flow
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {steps.map((s) => (
          <div key={s.title} className="bg-white border-2 border-black rounded-lg p-2.5 space-y-1">
            <div className="text-[11px] font-black text-purple-900">{s.title}</div>
            <div className="text-[11px] text-black/80 leading-snug">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
