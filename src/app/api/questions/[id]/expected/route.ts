import { NextRequest, NextResponse } from "next/server";
import { getQuestionById } from "@/lib/content/content-registry";
import { runSandboxQuery } from "@/lib/sandbox/sandbox-engine";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = getQuestionById(id);

    if (!question) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }

    const domain = question.domain === "ecommerce" ? "ecom" : question.domain;
    const targetSchema = `${domain}_l${question.level || 1}`;

    // Execute reference query on primary dataset to get sample rows & total count
    const previewResult = await runSandboxQuery(question.reference_sql, targetSchema, 100);

    return NextResponse.json({
      questionId: id,
      expectedColumns: question.expected_columns,
      columnCount: question.expected_columns.length,
      rowCount: previewResult.rowCount,
      sampleRows: previewResult.rows ? previewResult.rows.slice(0, 3) : [],
      orderSensitive: question.validation?.order_sensitive ?? false,
      error: previewResult.error,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load expected output.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
