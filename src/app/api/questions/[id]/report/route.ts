import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { submitQuestionReport } from "@/lib/reports/report-service";
import { getAppConfig } from "@/lib/config/app-config";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await context.params;
    const user = await getCurrentUser();
    const userId = user?.id || "guest_learner";

    const config = await getAppConfig();
    const rateCheck = checkRateLimit(
      `report:${userId}`,
      config.rateLimitSeconds,
      1
    );
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.reason, waitSeconds: rateCheck.waitSeconds },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { category, message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a short description of the problem." },
        { status: 400 }
      );
    }

    const result = await submitQuestionReport({
      questionId,
      userId,
      category: category || "other",
      message,
    });

    return NextResponse.json({
      success: true,
      reportId: result.reportId,
      reportCount: result.reportCount,
      autoHidden: result.autoHidden,
      questionStatus: result.questionStatus,
      message: result.autoHidden
        ? "Thank you! This question received multiple reports and has been automatically removed from active rotation for investigation."
        : "Thank you! Your feedback has been sent to the QA queue.",
    });
  } catch (error: any) {
    console.error("Report submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit report. Please try again." },
      { status: 500 }
    );
  }
}
