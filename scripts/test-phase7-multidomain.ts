import { getAllSupportedDomains, getQuestionsForDomainAndLevel, getQuestionById } from "../src/lib/content/content-registry";
import { generateDomainSql } from "../src/lib/datasets/multi-domain-generators";
import { runSandboxQuery } from "../src/lib/sandbox/sandbox-engine";
import { validateSubmission } from "../src/lib/sandbox/validation-engine";

async function runPhase7Tests() {
  console.log("=== PHASE 7 MULTI-DOMAIN VERIFICATION ===");
  let passed = 0;
  let total = 0;

  function assert(cond: boolean, name: string) {
    total++;
    if (cond) {
      console.log(`  [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${name}`);
      process.exitCode = 1;
    }
  }

  // 1. Verify all 7 domains supported
  const domains = getAllSupportedDomains();
  assert(domains.length === 7, `All 7 domains registered (found ${domains.length})`);

  for (const d of domains) {
    // 2. Generate SQL for domain
    const mainSql = generateDomainSql(d, "main");
    const valSql = generateDomainSql(d, "validation");
    assert(mainSql.length > 50, `Main dataset SQL generated for domain '${d}' (${mainSql.length} chars)`);
    assert(valSql.length > 50, `Validation dataset SQL generated for domain '${d}' (${valSql.length} chars)`);

    // 3. Check questions for domain
    const questions = getQuestionsForDomainAndLevel(d, 1);
    assert(questions.length > 0, `Questions present for domain '${d}' (count: ${questions.length})`);

    // 4. Verify question lookup by ID
    const q1 = questions[0];
    const foundQ = getQuestionById(q1.id);
    assert(foundQ?.id === q1.id, `getQuestionById resolves '${q1.id}' for domain '${d}'`);
  }

  // 5. Test Live Sandbox Execution and Submission Validation on non-ecommerce domains
  console.log("\n--- Testing Sandbox & Validation on Healthcare ---");
  const hcQ1 = getQuestionById("hc-L1-001");
  assert(Boolean(hcQ1), "Found Healthcare question 1");
  if (hcQ1) {
    const feedback = await validateSubmission(hcQ1.reference_sql, hcQ1);
    assert(feedback.isCorrect, `Healthcare Q1 validated successfully: ${feedback.message} (${feedback.rowCount} rows)`);
  }

  console.log("\n--- Testing Sandbox & Validation on Finance ---");
  const finQ1 = getQuestionById("fin-L1-001");
  assert(Boolean(finQ1), "Found Finance question 1");
  if (finQ1) {
    const feedback = await validateSubmission(finQ1.reference_sql, finQ1);
    assert(feedback.isCorrect, `Finance Q1 validated successfully: ${feedback.message} (${feedback.rowCount} rows)`);
  }

  console.log("\n--- Testing Sandbox & Validation on HR ---");
  const hrQ1 = getQuestionById("hr-L1-001");
  assert(Boolean(hrQ1), "Found HR question 1");
  if (hrQ1) {
    const feedback = await validateSubmission(hrQ1.reference_sql, hrQ1);
    assert(feedback.isCorrect, `HR Q1 validated successfully: ${feedback.message} (${feedback.rowCount} rows)`);
  }

  console.log("\n--- Testing Sandbox & Validation on Logistics ---");
  const logQ1 = getQuestionById("log-L1-001");
  assert(Boolean(logQ1), "Found Logistics question 1");
  if (logQ1) {
    const feedback = await validateSubmission(logQ1.reference_sql, logQ1);
    assert(feedback.isCorrect, `Logistics Q1 validated successfully: ${feedback.message} (${feedback.rowCount} rows)`);
  }

  console.log(`\nPhase 7 Tests Complete: ${passed}/${total} passed.`);
}

runPhase7Tests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
