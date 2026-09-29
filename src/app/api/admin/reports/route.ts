import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { isCurrentAdmin } from "@/lib/auth/admin-auth";
import {
  getReportedQuestions,
  resolveQuestionReports,
} from "@/lib/reports/report-service";
import { getAppConfig, updateAppConfig } from "@/lib/config/app-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAdmin = await isCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  const user = await getCurrentUser();
  const reports = await getReportedQuestions();
  const config = await getAppConfig();

  return NextResponse.json({
    reports,
    config,
    currentUser: user,
  });
}

export async function POST(request: NextRequest) {
  const isAdmin = await isCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action, questionId, configUpdates } = body;

    if (configUpdates) {
      const updatedConfig = await updateAppConfig(configUpdates);
      return NextResponse.json({ success: true, config: updatedConfig });
    }

    if (!questionId || !["dismiss", "hide", "restore"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action or questionId" },
        { status: 400 }
      );
    }

    const result = await resolveQuestionReports(questionId, action);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Admin reports action error:", error);
    return NextResponse.json(
      { error: "Failed to perform admin action" },
      { status: 500 }
    );
  }
}
