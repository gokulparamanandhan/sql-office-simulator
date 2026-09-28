import { NextRequest, NextResponse } from "next/server";
import { runSandboxQuery } from "@/lib/sandbox/sandbox-engine";
import { getQuestionById } from "@/lib/content/content-registry";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { sql, schema } = body;

    if (!sql || typeof sql !== "string") {
      return NextResponse.json(
        { error: "SQL query string is required." },
        { status: 400 }
      );
    }

    // Determine target schema dynamically
    let targetSchema = schema;
    if (!targetSchema || targetSchema === "ecom_l1") {
      const q = getQuestionById(id);
      if (q && q.domain && q.domain !== "ecommerce") {
        targetSchema = `${q.domain}_l${q.level || 1}`;
      } else {
        targetSchema = "ecom_l1";
      }
    }

    // Execute query preview (max 100 rows)
    const result = await runSandboxQuery(sql, targetSchema, 100);

    return NextResponse.json({
      questionId: id,
      columns: result.columns,
      rows: result.rows,
      rowCount: result.rowCount,
      durationMs: result.durationMs,
      error: result.error,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Query execution failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
