import { NextRequest, NextResponse } from "next/server";
import { runSandboxQuery } from "@/lib/sandbox/sandbox-engine";
import { compareResultSets } from "@/lib/sandbox/validation-engine";
import { LEARNING_QUESTIONS } from "@/lib/content/learning-curriculum";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, sql, mode } = body;

    if (!sql || typeof sql !== "string") {
      return NextResponse.json({ error: "SQL query string is required." }, { status: 400 });
    }

    const q = LEARNING_QUESTIONS.find((item) => item.id === Number(questionId));
    if (!q) {
      return NextResponse.json({ error: "Academy lesson not found." }, { status: 404 });
    }

    const userRes = await runSandboxQuery(sql, "ecom_l1", 100);
    if (userRes.error) {
      return NextResponse.json({
        success: false,
        isCorrect: false,
        columns: [],
        rows: [],
        durationMs: userRes.durationMs,
        message: userRes.error,
      });
    }

    if (mode === "run") {
      return NextResponse.json({
        success: true,
        isCorrect: false,
        columns: userRes.columns,
        rows: userRes.rows,
        durationMs: userRes.durationMs,
        message: `Query executed (${userRes.rowCount} rows). Click "Check Answer" when ready to verify!`,
      });
    }

    // Check expected column names first
    const actualColsLower = userRes.columns.map((c) => c.toLowerCase());
    const missingCols = q.expectedColumns.filter((exp) => !actualColsLower.includes(exp.toLowerCase()));
    if (missingCols.length > 0 || userRes.columns.length !== q.expectedColumns.length) {
      return NextResponse.json({
        success: true,
        isCorrect: false,
        columns: userRes.columns,
        rows: userRes.rows,
        durationMs: userRes.durationMs,
        message: `Column mismatch. Expected [${q.expectedColumns.join(", ")}], but got [${userRes.columns.join(", ")}].`,
      });
    }

    if (q.skipExactRowCheck) {
      const ok = userRes.rows && userRes.rows.length > 0;
      return NextResponse.json({
        success: true,
        isCorrect: ok,
        columns: userRes.columns,
        rows: userRes.rows,
        durationMs: userRes.durationMs,
        message: ok
          ? "Excellent! Database engineering statement & verification query executed cleanly."
          : "Query ran, but returned 0 rows.",
      });
    }

    const refRes = await runSandboxQuery(q.referenceSql, "ecom_l1", 100);
    if (refRes.error) {
      return NextResponse.json({ error: `Reference error: ${refRes.error}` }, { status: 500 });
    }

    const exactCheck = compareResultSets(userRes.rows, refRes.rows, Boolean(q.orderSensitive), 0.02);
    if (exactCheck.match) {
      return NextResponse.json({
        success: true,
        isCorrect: true,
        columns: userRes.columns,
        rows: userRes.rows,
        durationMs: userRes.durationMs,
        message: "Exact match! Your query output matches the expected dataset and order.",
      });
    }

    // Check if values match ignoring order so we can give a clear ORDER BY hint
    const unorderedCheck = q.orderSensitive
      ? compareResultSets(userRes.rows, refRes.rows, false, 0.02)
      : { match: false };

    const msg = unorderedCheck.match
      ? "Values match, but row ordering is wrong! Check your ORDER BY clause and tie-breakers."
      : `${exactCheck.reason || "Output values do not match expected results."}`;

    return NextResponse.json({
      success: true,
      isCorrect: false,
      columns: userRes.columns,
      rows: userRes.rows,
      expectedPreview: refRes.rows.slice(0, 5),
      durationMs: userRes.durationMs,
      message: msg,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Academy verification failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
