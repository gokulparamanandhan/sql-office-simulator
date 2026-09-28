import { NextRequest, NextResponse } from "next/server";
import { validateSubmission } from "@/lib/sandbox/validation-engine";
import { getQuestionById } from "@/lib/content/content-registry";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { getAppConfig } from "@/lib/config/app-config";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const userId = user?.id || "guest_learner";

    const config = await getAppConfig();
    const rateLimitResult = checkRateLimit(
      `submit:${userId}`,
      config.rateLimitSeconds,
      1
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: rateLimitResult.reason,
          waitSeconds: rateLimitResult.waitSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { sql, hintsUsed = 0 } = body;

    if (!sql || typeof sql !== "string") {
      return NextResponse.json(
        { error: "SQL query string is required." },
        { status: 400 }
      );
    }

    const question = getQuestionById(id);
    if (!question) {
      return NextResponse.json(
        { error: `Question with ID '${id}' not found.` },
        { status: 404 }
      );
    }

    const feedback = await validateSubmission(sql, question);

    // Calculate XP earned if correct
    let xpEarned = 0;
    if (feedback.isCorrect) {
      // Hints penalty: each hint used reduces XP by 25% (Spec Section 9.4)
      const hintPenalty = Math.min(hintsUsed * 0.25, 0.75);
      xpEarned = Math.round(question.xp * (1 - hintPenalty));
    }

    return NextResponse.json({
      questionId: id,
      isCorrect: feedback.isCorrect,
      code: feedback.code,
      message: feedback.message,
      durationMs: feedback.durationMs,
      rowCount: feedback.rowCount,
      columnCount: feedback.columnCount,
      xpEarned,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Validation evaluation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
