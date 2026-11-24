"use client";

import { useState, useEffect } from "react";
import { Database, Table2, Code2, AlertTriangle, Eye } from "lucide-react";
import type { SchemaTablePreview } from "@/lib/interview/interview-engine";

interface Props {
  questionId: string;
  rawSchemaSql: string;
  allowExpectedPreview?: boolean;
}

export default function VisualSchemaExplorer({
  questionId,
  rawSchemaSql,
  allowExpectedPreview = true,
}: Props) {
  const [tables, setTables] = useState<SchemaTablePreview[]>([]);
  const [loadedQuestionId, setLoadedQuestionId] = useState<string | null>(null);
  const [showRawSql, setShowRawSql] = useState<boolean>(false);
  const [showExpected, setShowExpected] = useState<boolean>(false);
  const [expectedRows, setExpectedRows] = useState<Record<string, unknown>[] | null>(null);
  const [expectedCols, setExpectedCols] = useState<string[]>([]);
  const loading = loadedQuestionId !== questionId;

  useEffect(() => {
    let active = true;

    fetch(`/api/interview/${questionId}/schema`)
      .then((r) => r.json())
      .then((data) => {
        if (active && data?.success) {
          setTables(data.tables || []);
          setShowExpected(false);
          setExpectedRows(null);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoadedQuestionId(questionId);
      });

    return () => {
      active = false;
    };
  }, [questionId]);

  const handleToggleExpected = async () => {
    if (showExpected) {
      setShowExpected(false);
      return;
    }
    if (!expectedRows) {
      try {
        const res = await fetch(`/api/interview/${questionId}/schema?includeExpected=1`);
        const data = await res.json();
        if (data?.success && data.expectedSampleRows) {
          setExpectedRows(data.expectedSampleRows);
          setExpectedCols(data.expectedColumns || []);
        }
      } catch {
        // Ignore
      }
    }
    setShowExpected(true);
  };

  const formatCell = (val: unknown) => {
    if (val === null || val === undefined) {
      return <span className="px-1 py-0.2 bg-rose-100 text-rose-800 rounded text-[10px] font-bold">NULL</span>;
    }
    const str = String(val);
    if (str !== str.trim()) {
      return (
        <span className="px-1 py-0.2 bg-amber-100 text-amber-900 rounded text-[10px]" title="Contains leading/trailing whitespace!">
          &apos;{str}&apos;
        </span>
      );
    }
    return str;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          <h3 className="font-black text-sm text-[var(--ink)]">Live Database Tables &amp; Sample Rows</h3>
        </div>
        <div className="flex items-center gap-2">
          {allowExpectedPreview && (
            <button
              onClick={handleToggleExpected}
              className={`px-2.5 py-1 rounded-lg border border-black text-[11px] font-black flex items-center gap-1 ${
                showExpected ? "bg-[#FFE600]" : "bg-white hover:bg-slate-50"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{showExpected ? "Hide Expected Shape" : "Preview Target Output"}</span>
            </button>
          )}
          <button
            onClick={() => setShowRawSql((s) => !s)}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-slate-50 text-[11px] font-black flex items-center gap-1"
          >
            <Code2 className="w-3 h-3" />
            <span>{showRawSql ? "Visual View" : "Raw DDL"}</span>
          </button>
        </div>
      </div>

      {showExpected && expectedRows && (
        <div className="border-2 border-emerald-700 rounded-xl overflow-hidden bg-emerald-50/70">
          <div className="px-3 py-1.5 border-b border-emerald-700 bg-emerald-100 flex items-center justify-between text-[11px] font-black text-emerald-950">
            <span>Target Output Shape (First {expectedRows.length} rows)</span>
            <span className="font-mono text-[10px]">Expected Columns: {expectedCols.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="bg-white border-b border-emerald-300">
                <tr>
                  {expectedCols.map((c) => (
                    <th key={c} className="p-1.5 border-r border-emerald-200 last:border-r-0">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expectedRows.map((row, idx) => (
                  <tr key={idx} className="border-b border-emerald-100 last:border-b-0">
                    {expectedCols.map((c) => (
                      <td key={c} className="p-1.5 border-r border-emerald-100 last:border-r-0 whitespace-nowrap">
                        {formatCell(row[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showRawSql ? (
        <pre className="bg-[var(--surface)] border border-[var(--sky)] rounded-xl p-4 font-mono text-xs text-[var(--ink)] overflow-x-auto leading-relaxed">
          {rawSchemaSql.trim()}
        </pre>
      ) : loading ? (
        <div className="text-xs font-mono opacity-60 py-6 text-center">Loading live schema preview...</div>
      ) : (
        <div className="space-y-4">
          <div className="text-[11px] bg-[#FAF8F5] border border-black/30 rounded-lg px-3 py-2 flex items-center gap-2 text-black/80">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              Dirty-data badges highlight <span className="px-1 bg-rose-100 text-rose-800 font-mono font-bold rounded">NULL</span> and{" "}
              <span className="px-1 bg-amber-100 text-amber-900 font-mono rounded">&apos; whitespace &apos;</span> quirks in the sample rows.
            </span>
          </div>

          {tables.map((t) => (
            <div key={t.tableName} className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-[2px_2px_0px_#000]">
              <div className="bg-[#FAF8F5] border-b-2 border-black px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Table2 className="w-3.5 h-3.5 text-black" />
                  <span className="font-mono font-black text-xs text-black">{t.tableName}</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white border border-black px-2 py-0.5 rounded">
                  {t.totalRows} rows
                </span>
              </div>

              <div className="px-3 py-2 border-b border-black/15 flex flex-wrap gap-1.5 bg-white">
                {t.columns.map((c) => (
                  <span
                    key={c.name}
                    className="text-[10px] font-mono bg-slate-50 border border-black/30 px-1.5 py-0.5 rounded"
                  >
                    <strong className="text-black">{c.name}</strong>{" "}
                    <span className="text-black/60">{c.type}</span>
                  </span>
                ))}
              </div>

              {t.sampleRows.length > 0 && (
                <div className="overflow-x-auto max-h-48">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="bg-slate-100 border-b border-black/20">
                      <tr>
                        {t.columns.map((c) => (
                          <th key={c.name} className="p-1.5 border-r border-black/10 last:border-r-0 whitespace-nowrap">
                            {c.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.sampleRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                          {t.columns.map((c) => (
                            <td key={c.name} className="p-1.5 border-r border-slate-100 last:border-r-0 whitespace-nowrap">
                              {formatCell(row[c.name])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
