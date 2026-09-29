import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import {
  getUserProgress,
  recordUserQuestionSolved,
  recordUserAcademySolved,
} from "@/lib/user/user-progress-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await getUserProgress(user.id, user.email);
  return NextResponse.json({ success: true, progress, user });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, domain, level, questionId, xpEarned } = body;

    if (type === "academy") {
      const updated = await recordUserAcademySolved(
        user.id,
        Number(questionId),
        Number(xpEarned || 10),
        user.email
      );
      return NextResponse.json({ success: true, progress: updated });
    }

    // Default: Workplace question solved
    if (!domain || !level || !questionId) {
      return NextResponse.json(
        { error: "domain, level, and questionId are required." },
        { status: 400 }
      );
    }

    const updated = await recordUserQuestionSolved(
      user.id,
      domain,
      Number(level),
      String(questionId),
      Number(xpEarned || 10),
      user.email
    );

    return NextResponse.json({ success: true, progress: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record progress.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
