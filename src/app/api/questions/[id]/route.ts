import { NextRequest, NextResponse } from "next/server";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const question = ECOM_L1_QUESTIONS.find((q) => q.id === id);

  if (!question) {
    return NextResponse.json({ error: "Question not found." }, { status: 404 });
  }

  // Security: NEVER return reference_sql or expected rows in response (Section 8)
  const safeQuestion = {
    id: question.id,
    domain: question.domain,
    level: question.level,
    order: question.order,
    difficulty: question.difficulty,
    title: question.title,
    stakeholder: question.stakeholder,
    request: question.request,
    context_notes: question.context_notes,
    concepts: question.concepts,
    expected_columns: question.expected_columns,
    hints: question.hints,
    xp: question.xp,
    estimated_minutes: question.estimated_minutes,
  };

  return NextResponse.json({ question: safeQuestion });
}
