import { NextRequest, NextResponse } from "next/server";
import { getQuestionsForDomainAndLevel } from "@/lib/content/content-registry";
import { isQuestionActive } from "@/lib/reports/report-service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const domain = req.nextUrl.searchParams.get("domain") || "ecommerce";
  const levelNum = parseInt(id.replace(/\D/g, "") || "1", 10);

  const rawQuestions = getQuestionsForDomainAndLevel(domain, levelNum);

  // Filter out any question that has been auto-hidden or deactivated
  const activeQuestions = rawQuestions.filter((q) => isQuestionActive(q.id));

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
    domain,
    questions: safeQuestions,
  });
}
