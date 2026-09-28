import { checkRateLimit, resetRateLimit } from "../src/lib/security/rate-limiter";
import {
  submitQuestionReport,
  getReportedQuestions,
  resolveQuestionReports,
  isQuestionActive,
} from "../src/lib/reports/report-service";
import { updateAppConfig } from "../src/lib/config/app-config";

let testsRun = 0;
let testsPassed = 0;

function assert(condition: boolean, name: string) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ FAIL: ${name}`);
    process.exitCode = 1;
  }
}

async function runPhase5Tests() {
  console.log("=== Testing Phase 5: Honor Policy, Rate Limiting & Question Reporting ===");

  // 1. Rate Limiting Tests (Spec Section 8 & 10.3)
  console.log("\n[1] Testing Submission Rate Limiter:");
  resetRateLimit();

  const firstSubmit = checkRateLimit("user_test:submit", 5, 1);
  assert(firstSubmit.allowed, "First submission is allowed immediately");

  const immediateSubmit = checkRateLimit("user_test:submit", 5, 1);
  assert(!immediateSubmit.allowed, "Immediate second submission is blocked by rate limit");
  assert(immediateSubmit.waitSeconds > 0, "Rate limiter returns positive wait cooldown");

  // Different user is not blocked
  const otherUserSubmit = checkRateLimit("other_user:submit", 5, 1);
  assert(otherUserSubmit.allowed, "Different user key is not blocked by first user's rate limit");

  // Reset and verify recovery
  resetRateLimit("user_test:submit");
  const postResetSubmit = checkRateLimit("user_test:submit", 5, 1);
  assert(postResetSubmit.allowed, "Submission succeeds after cooldown/reset");

  // 2. Question Reporting & Auto-Hide Threshold (Spec Section 7.4, 8 & Phase 5)
  console.log("\n[2] Testing Question Reporting & Auto-Hide Threshold:");
  // Ensure config threshold is 3
  await updateAppConfig({ reportAutoHideThreshold: 3 });

  const testQuestionId = "ecom-L1-005";

  // Initially active
  assert(isQuestionActive(testQuestionId), "Question is active before reports");

  // First report
  const rep1 = await submitQuestionReport({
    questionId: testQuestionId,
    userId: "learner_alice",
    category: "unclear_wording",
    message: "The instructions could be clearer on what timestamp format to use.",
  });
  assert(rep1.reportCount === 1, "First report recorded with count 1");
  assert(!rep1.autoHidden, "Question is NOT auto-hidden at 1 report (threshold 3)");
  assert(isQuestionActive(testQuestionId), "Question remains active at 1 report");

  // Second report
  const rep2 = await submitQuestionReport({
    questionId: testQuestionId,
    userId: "learner_bob",
    category: "data_issue",
    message: "NULL values in customer email column make inner join exclude rows.",
  });
  assert(rep2.reportCount === 2, "Second report recorded with count 2");
  assert(!rep2.autoHidden, "Question is NOT auto-hidden at 2 reports");
  assert(isQuestionActive(testQuestionId), "Question remains active at 2 reports");

  // Third report -> triggers AUTO-HIDE
  const rep3 = await submitQuestionReport({
    questionId: testQuestionId,
    userId: "learner_charlie",
    category: "wrong_answer",
    message: "Reference query output doesn't match the requested sort order.",
  });
  assert(rep3.reportCount >= 3, "Third report brings count to threshold");
  assert(rep3.autoHidden, "Question IS auto-hidden when report threshold (3) is reached");
  assert(!isQuestionActive(testQuestionId), "isQuestionActive returns false for auto-hidden question");

  // 3. Admin View Aggregation
  console.log("\n[3] Testing Admin Reports Aggregation:");
  const adminReports = await getReportedQuestions();
  const targetReport = adminReports.find((r) => r.questionId === testQuestionId);

  assert(!!targetReport, "Reported question appears in admin QA list");
  assert(targetReport?.status === "hidden", "Admin summary shows status 'hidden'");
  assert(
    (targetReport?.categories["unclear_wording"] || 0) >= 1 &&
      (targetReport?.categories["data_issue"] || 0) >= 1 &&
      (targetReport?.categories["wrong_answer"] || 0) >= 1,
    "Category breakdown properly tracks each reported issue type"
  );
  assert(
    targetReport?.latestReports.length === 3,
    "Admin summary includes latest learner feedback comments"
  );

  // 4. Admin Resolution Flow
  console.log("\n[4] Testing Admin Resolution Flow (Restore & Dismiss):");
  // Admin restores question to active
  const restoreResult = await resolveQuestionReports(testQuestionId, "restore");
  assert(restoreResult.newStatus === "active", "Admin restore updates status to active");
  assert(isQuestionActive(testQuestionId), "Question is active again after admin restore");

  // Admin dismisses reports
  const dismissResult = await resolveQuestionReports(testQuestionId, "dismiss");
  assert(dismissResult.success, "Admin dismiss succeeds");
  const postDismissReports = await getReportedQuestions();
  const dismissedQuestion = postDismissReports.find((r) => r.questionId === testQuestionId);
  assert(!dismissedQuestion, "Dismissed question reports are pruned from pending queue");

  console.log(`\n========================================`);
  console.log(`Results: ${testsPassed}/${testsRun} tests passed.`);
  if (testsPassed === testsRun) {
    console.log("All Phase 5 tests passed successfully!\n");
  }
}

runPhase5Tests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
