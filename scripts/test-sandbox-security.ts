import { validateSqlSecurity } from "../src/lib/sandbox/security-guard";
import { runSandboxQuery } from "../src/lib/sandbox/sandbox-engine";
import { validateSubmission } from "../src/lib/sandbox/validation-engine";
import { ECOM_L1_QUESTIONS } from "../src/lib/content/ecom-l1-questions";

async function runTests() {
  console.log("\n=======================================================");
  console.log(" 🛡️ SQL Office Simulator: Phase 2 Sandbox Security & Validation Test Suite");
  console.log("=======================================================\n");

  let totalTests = 0;
  let passedTests = 0;

  function assert(name: string, condition: boolean, details?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ [PASS] ${name}`);
    } else {
      console.error(`  ❌ [FAIL] ${name} ${details ? "- " + details : ""}`);
    }
  }

  // ==========================================
  // PART 1: Security Guard Tests (Section 10.3)
  // ==========================================
  console.log("1. Running AST & Security Rejection Tests:");

  const dropTest = validateSqlSecurity("DROP TABLE customers;");
  assert("DROP TABLE is rejected", !dropTest.allowed && Boolean(dropTest.reason?.includes("DROP")));

  const multiStmtTest = validateSqlSecurity("SELECT * FROM customers; DROP TABLE orders;");
  assert("Multi-statement query is rejected", !multiStmtTest.allowed && dropTest.reason !== undefined);

  const readFileTest = validateSqlSecurity("SELECT pg_read_file('/etc/passwd');");
  assert("pg_read_file() is rejected", !readFileTest.allowed && Boolean(readFileTest.reason?.includes("pg_read_file")));

  const insertTest = validateSqlSecurity("INSERT INTO products (id, name, price) VALUES (999, 'Hacked', 1);");
  assert("INSERT INTO is rejected", !insertTest.allowed);

  const updateTest = validateSqlSecurity("UPDATE customers SET region = 'Hacked';");
  assert("UPDATE statement is rejected", !updateTest.allowed);

  const deleteTest = validateSqlSecurity("DELETE FROM orders;");
  assert("DELETE statement is rejected", !deleteTest.allowed);

  const truncateTest = validateSqlSecurity("TRUNCATE TABLE categories;");
  assert("TRUNCATE statement is rejected", !truncateTest.allowed);

  const ctasTest = validateSqlSecurity("CREATE TEMP TABLE t AS SELECT id, name FROM departments; SELECT * FROM t;");
  assert("CREATE TEMP TABLE ... AS SELECT ...; SELECT ... is allowed", ctasTest.allowed);

  const viewTest = validateSqlSecurity("CREATE VIEW v AS SELECT id, name FROM departments; SELECT * FROM v;");
  assert("CREATE VIEW ... AS SELECT ...; SELECT ... is allowed", viewTest.allowed);

  const cteTest = validateSqlSecurity("WITH cte AS (SELECT id, name FROM departments) SELECT * FROM cte;");
  assert("WITH CTE is allowed", cteTest.allowed);

  // ==========================================
  // PART 2: Sandbox Query Execution Engine
  // ==========================================
  console.log("\n2. Testing Sandbox Query Execution (Preview):");

  const previewQuery = "SELECT id, name, price, stock_quantity FROM products LIMIT 5;";
  const previewRes = await runSandboxQuery(previewQuery, "ecom_l1", 5);

  assert("Valid SELECT executes successfully", !previewRes.error && previewRes.rows.length === 5);
  assert("Columns returned properly", previewRes.columns.includes("name") && previewRes.columns.includes("price"));
  assert("Execution duration tracked", previewRes.durationMs >= 0);

  // ==========================================
  // PART 3: Answer Validation Engine (Section 9.5)
  // ==========================================
  console.log("\n3. Testing Grading & Validation Engine (E-Commerce Level 1):");

  const q1 = ECOM_L1_QUESTIONS[0];
  const q1CorrectSql = q1.reference_sql;

  const q1Result = await validateSubmission(q1CorrectSql, q1);
  assert("Q1 Correct submission is marked CORRECT", q1Result.isCorrect && q1Result.code === "CORRECT");

  const q1WrongCols = `SELECT id FROM departments ORDER BY id ASC LIMIT 20;`;
  const q1WrongColsResult = await validateSubmission(q1WrongCols, q1);
  assert("Q1 Column mismatch caught", !q1WrongColsResult.isCorrect && q1WrongColsResult.code === "COLUMN_COUNT_MISMATCH");

  const q1WrongFilter = `SELECT id, name FROM departments WHERE id = 99999;`;
  const q1WrongFilterResult = await validateSubmission(q1WrongFilter, q1);
  assert("Q1 Row count mismatch caught", !q1WrongFilterResult.isCorrect && q1WrongFilterResult.code === "ROW_COUNT_MISMATCH");

  // Q2: Order-sensitive test
  const q2 = ECOM_L1_QUESTIONS[1];
  const q2CorrectSql = q2.reference_sql;
  const q2Result = await validateSubmission(q2CorrectSql, q2);
  assert("Q2 Correct order-sensitive submission passes", q2Result.isCorrect && q2Result.code === "CORRECT");

  const q2WrongOrderSql = q2.reference_sql.includes("ASC")
    ? q2.reference_sql.replace("ASC", "DESC")
    : q2.reference_sql.replace("DESC", "ASC");
  const q2WrongOrderResult = await validateSubmission(q2WrongOrderSql, q2);
  assert("Q2 Wrong ordering caught as ORDER_MISMATCH", !q2WrongOrderResult.isCorrect && (q2WrongOrderResult.code === "ORDER_MISMATCH" || q2WrongOrderResult.code === "VALUE_MISMATCH"));

  // Q10: Boss question
  const q10 = ECOM_L1_QUESTIONS[99];
  const q10Result = await validateSubmission(q10.reference_sql, q10);
  assert("Q100 Boss Question reference SQL passes validation on dual datasets", q10Result.isCorrect && q10Result.code === "CORRECT");

  console.log("\n=======================================================");
  console.log(` Summary: ${passedTests}/${totalTests} Tests Passed`);
  console.log("=======================================================\n");

  process.exit(passedTests === totalTests ? 0 : 1);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
