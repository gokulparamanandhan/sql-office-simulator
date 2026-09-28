import { appDb } from "@/lib/db/app-db";
import { getAppConfig } from "@/lib/config/app-config";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";

export interface QuestionReportItem {
  id: string;
  questionId: string;
  userId: string;
  userEmail?: string;
  category: "wrong_answer" | "unclear_wording" | "data_issue" | "other";
  message: string;
  createdAt: string;
}

export interface ReportedQuestionSummary {
  questionId: string;
  questionTitle: string;
  domain: string;
  levelNumber: number;
  reportCount: number;
  status: "active" | "hidden" | "pending_regeneration";
  categories: Record<string, number>;
  latestReports: QuestionReportItem[];
}

// In-memory fallback stores for local resilience
const inMemoryReports: QuestionReportItem[] = [];
const questionStatusOverrides = new Map<string, "active" | "hidden" | "pending_regeneration">();

// Helper for fast non-blocking DB calls with fallback
async function tryDb<T>(op: () => Promise<T>, timeoutMs = 400): Promise<T | null> {
  try {
    return await Promise.race([
      op(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
    ]);
  } catch {
    return null;
  }
}

export async function submitQuestionReport(params: {
  questionId: string;
  userId: string;
  category: string;
  message: string;
}): Promise<{
  reportId: string;
  reportCount: number;
  autoHidden: boolean;
  questionStatus: "active" | "hidden" | "pending_regeneration";
}> {
  const { questionId, userId, category, message } = params;
  const config = await getAppConfig();
  const threshold = config.reportAutoHideThreshold || 3;

  const validCategory = (
    ["wrong_answer", "unclear_wording", "data_issue", "other"].includes(category)
      ? category
      : "other"
  ) as QuestionReportItem["category"];

  const newReport: QuestionReportItem = {
    id: "rep_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    questionId,
    userId,
    category: validCategory,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  // Add to in-memory store
  inMemoryReports.unshift(newReport);

  // Try DB persist with fast timeout
  tryDb(() =>
    appDb.questionReport.create({
      data: {
        questionId,
        userId,
        category: validCategory,
        message: message.trim(),
      },
    })
  );

  // Count reports for this question
  let reportCount = inMemoryReports.filter((r) => r.questionId === questionId).length;

  const dbCount = await tryDb(() =>
    appDb.questionReport.count({
      where: { questionId },
    })
  );
  if (typeof dbCount === "number") {
    reportCount = Math.max(reportCount, dbCount);
  }

  let autoHidden = false;
  let currentStatus: "active" | "hidden" | "pending_regeneration" =
    questionStatusOverrides.get(questionId) || "active";

  if (reportCount >= threshold && currentStatus === "active") {
    autoHidden = true;
    currentStatus = "hidden";
    questionStatusOverrides.set(questionId, "hidden");

    tryDb(() =>
      appDb.question.update({
        where: { id: questionId },
        data: { status: "hidden" },
      })
    );
  }

  return {
    reportId: newReport.id,
    reportCount,
    autoHidden,
    questionStatus: currentStatus,
  };
}

export function getQuestionStatus(questionId: string): "active" | "hidden" | "pending_regeneration" {
  return questionStatusOverrides.get(questionId) || "active";
}

export function isQuestionActive(questionId: string): boolean {
  return getQuestionStatus(questionId) === "active";
}

export async function getReportedQuestions(): Promise<ReportedQuestionSummary[]> {
  const config = await getAppConfig();
  const threshold = config.reportAutoHideThreshold || 3;

  // Group by questionId
  const questionMap = new Map<string, QuestionReportItem[]>();

  for (const rep of inMemoryReports) {
    const list = questionMap.get(rep.questionId) || [];
    list.push(rep);
    questionMap.set(rep.questionId, list);
  }

  const results: ReportedQuestionSummary[] = [];

  questionMap.forEach((reports, questionId) => {
    // Find title from static questions or fallback
    const staticQ = ECOM_L1_QUESTIONS.find((q) => q.id === questionId);
    const title = staticQ ? staticQ.title : `Question ${questionId}`;
    const domain = staticQ?.stakeholder ? "e-commerce" : "general";
    const levelNumber = 1;

    const categories: Record<string, number> = {};
    reports.forEach((r) => {
      categories[r.category] = (categories[r.category] || 0) + 1;
    });

    const reportCount = reports.length;
    let status = questionStatusOverrides.get(questionId);
    if (!status) {
      status = reportCount >= threshold ? "hidden" : "active";
    }

    results.push({
      questionId,
      questionTitle: title,
      domain,
      levelNumber,
      reportCount,
      status,
      categories,
      latestReports: reports.slice(0, 5),
    });
  });

  // Sort by highest reports first
  results.sort((a, b) => b.reportCount - a.reportCount);
  return results;
}

export async function resolveQuestionReports(
  questionId: string,
  action: "dismiss" | "hide" | "restore"
): Promise<{ success: boolean; newStatus: "active" | "hidden" | "pending_regeneration" }> {
  let newStatus: "active" | "hidden" | "pending_regeneration" = "active";

  if (action === "hide") {
    newStatus = "hidden";
    questionStatusOverrides.set(questionId, "hidden");
  } else if (action === "restore") {
    newStatus = "active";
    questionStatusOverrides.set(questionId, "active");
  } else if (action === "dismiss") {
    // Clear reports from in-memory
    const remaining = inMemoryReports.filter((r) => r.questionId !== questionId);
    inMemoryReports.length = 0;
    inMemoryReports.push(...remaining);

    newStatus = "active";
    questionStatusOverrides.set(questionId, "active");

    try {
      await appDb.questionReport.deleteMany({
        where: { questionId },
      });
    } catch {
      // Local fallback
    }
  }

  try {
    await appDb.question.update({
      where: { id: questionId },
      data: { status: newStatus },
    });
  } catch {
    // Local fallback
  }

  return { success: true, newStatus };
}
