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

async function runE2E() {
  console.log("=== Testing Phase 5 End-to-End API Integration ===");

  const BASE_URL = "http://localhost:3000";

  // 1. Initial State Check
  console.log("\n[1] Fetching active questions list:");
  const initialRes = await fetch(`${BASE_URL}/api/levels/1/questions`);
  const initialData = await initialRes.json();
  const qExistsInitially = initialData.questions.some((q: any) => q.id === "ecom-L1-001");
  assert(qExistsInitially, "Question ecom-L1-001 is initially present in active questions");

  // 2. Submit 1st Report
  console.log("\n[2] Submitting 1st Problem Report:");
  const rep1Res = await fetch(`${BASE_URL}/api/questions/ecom-L1-001/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: "unclear_wording",
      message: "The question does not specify sorting direction.",
    }),
  });
  const rep1Data = await rep1Res.json();
  assert(rep1Res.ok, "POST /api/questions/[id]/report returns 200 OK");
  assert(rep1Data.success === true, "Report response contains success: true");
  assert(rep1Data.reportCount >= 1, "Report count is at least 1");

  // 3. Admin View Verification
  console.log("\n[3] Verifying Report in Admin Panel:");
  const adminRes = await fetch(`${BASE_URL}/api/admin/reports`);
  const adminData = await adminRes.json();
  const reportedItem = adminData.reports.find((r: any) => r.questionId === "ecom-L1-001");
  assert(!!reportedItem, "Reported question appears in admin reports list");
  assert(reportedItem?.categories["unclear_wording"] >= 1, "Category count reflected in admin summary");

  // 4. Rate Limiting Check (Concurrent requests to verify 429 rate limit trigger)
  console.log("\n[4] Testing Report Rate Limit:");
  const [resA, resB] = await Promise.all([
    fetch(`${BASE_URL}/api/questions/ecom-L1-001/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "other",
        message: "First concurrent report.",
      }),
    }),
    fetch(`${BASE_URL}/api/questions/ecom-L1-001/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "other",
        message: "Second concurrent report arriving immediately.",
      }),
    }),
  ]);

  const has429 = resA.status === 429 || resB.status === 429;
  assert(has429, "Immediate concurrent report triggers 429 Too Many Requests");

  console.log(`\n========================================`);
  console.log(`Results: ${testsPassed}/${testsRun} E2E tests passed.`);
}

runE2E().catch((err) => {
  console.error("E2E Test failed:", err);
  process.exit(1);
});
