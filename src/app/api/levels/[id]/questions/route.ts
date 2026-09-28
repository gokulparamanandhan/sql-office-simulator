import { NextRequest, NextResponse } from "next/server";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // For Phase 2 vertical slice, returns E-Commerce Level 1 questions
  const safeQuestions = ECOM_L1_QUESTIONS.map((q) => ({
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
