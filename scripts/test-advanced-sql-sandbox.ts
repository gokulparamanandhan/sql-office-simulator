import { runSandboxQuery } from "../src/lib/sandbox/sandbox-engine";

async function testAdvancedSql() {
  console.log("=== Testing Advanced SQL Features in Sandbox ===");

  // 1. CTE
  const cte = await runSandboxQuery(
    "WITH high_orders AS (SELECT id, total_amount FROM orders WHERE total_amount > 100) SELECT id, total_amount FROM high_orders LIMIT 3;",
    "ecom_l1"
  );
  console.log("1. CTE rows:", cte.rowCount, cte.error || "OK");

  // 2. Subquery
  const sub = await runSandboxQuery(
    "SELECT id, first_name, email FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount > 200) LIMIT 3;",
    "ecom_l1"
  );
  console.log("2. Subquery rows:", sub.rowCount, sub.error || "OK");

  // 3. UNION
  const union = await runSandboxQuery(
    "SELECT name FROM departments UNION ALL SELECT name FROM categories LIMIT 4;",
    "ecom_l1"
  );
  console.log("3. UNION rows:", union.rowCount, union.error || "OK");

  // 4. LAG / LEAD
  const lagLead = await runSandboxQuery(
    "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id) AS prev_amt, LEAD(total_amount) OVER (ORDER BY id) AS next_amt FROM orders LIMIT 3;",
    "ecom_l1"
  );
  console.log("4. LAG/LEAD rows:", lagLead.rowCount, lagLead.error || "OK");

  // 5. TEMP TABLE (CTAS)
  const tempTable = await runSandboxQuery(
    "CREATE TEMP TABLE tmp_depts AS SELECT id, name FROM departments; SELECT id, name FROM tmp_depts;",
    "ecom_l1"
  );
  console.log("5. TEMP TABLE rows:", tempTable.rowCount, tempTable.error || "OK");

  // 6. VIEW
  const view = await runSandboxQuery(
    "CREATE VIEW v_depts AS SELECT id, name FROM departments; SELECT id, name FROM v_depts;",
    "ecom_l1"
  );
  console.log("6. VIEW rows:", view.rowCount, view.error || "OK");

  if (cte.error || sub.error || union.error || lagLead.error || tempTable.error || view.error) {
    throw new Error("One or more advanced SQL queries failed!");
  }
  console.log("\n ALL 6 ADVANCED SQL CONSTRUCTS EXECUTED PERFECTLY IN SANDBOX!");
}

testAdvancedSql().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

