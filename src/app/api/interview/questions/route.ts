import { NextResponse } from "next/server";
import { INTERVIEW_QUESTIONS, INTERVIEW_COMPANIES, INTERVIEW_CATEGORIES } from "@/lib/content/interview-questions";

export async function GET() {
  // Never leak referenceSql or hiddenTestSql to the client
  const safeQuestions = INTERVIEW_QUESTIONS.map((q) => ({
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    companies: q.companies,
    topics: q.topics,
    frequency: q.frequency,
    category: q.category,
    description: q.description,
    starterSql: q.starterSql,
    expectedColumns: q.expectedColumns,
    hints: q.hints,
    explanation: q.explanation,
    orderSensitive: q.orderSensitive,
  }));

  return NextResponse.json({
    questions: safeQuestions,
    companies: INTERVIEW_COMPANIES,
    categories: INTERVIEW_CATEGORIES,
  });
}

