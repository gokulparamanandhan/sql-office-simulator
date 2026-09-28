import { NextRequest, NextResponse } from "next/server";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";
import { isQuestionActive } from "@/lib/reports/report-service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Filter out any question that has been auto-hidden or deactivated
  const activeQuestions = ECOM_L1_QUESTIONS.filter((q) => isQuestionActive(q.id));

  const safeQuestions = activeQuestions.map((q) => ({
    id: q.id,
    order: q.order,
    difficulty: q.difficulty,
    title: q.title,
    stakeholder: q.stakeholder,
    concepts: q.concepts,
    xp: q.xp,
    estimated_minutes: q.estimated_minutes,
  }));

  return NextResponse.json({
    levelId: id,
    questions: safeQuestions,
  });
}
