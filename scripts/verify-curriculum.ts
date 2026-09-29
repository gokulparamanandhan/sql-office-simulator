import { getQuestionsForDomainAndLevel, getAllSupportedDomains, getQuestionById } from "../src/lib/content/content-registry";
import { ALL_DOMAINS_OFFICE_METADATA } from "../src/lib/office/all-domains-metadata";
import { runSandboxQuery } from "../src/lib/sandbox/sandbox-engine";

async function main() {
  console.log("=== VERIFYING UNIVERSAL CURRICULUM & SCHEMAS ===");

  const domains = getAllSupportedDomains();
  console.log(`Supported Domains (${domains.length}):`, domains.join(", "));

  // 1. Verify Schemas (Tables count per domain)
  console.log("\n--- Checking Schema Table Definitions ---");
  for (const domain of domains) {
    const meta = ALL_DOMAINS_OFFICE_METADATA[domain];
    const tableCount = meta ? meta.schema.length : 0;
    console.log(`Domain [${domain}]: ${tableCount} tables defined.`);
    if (tableCount < 10) {
      throw new Error(`Domain ${domain} has fewer than 10 tables! Found: ${tableCount}`);
    }
  }

  // 2. Verify 100 Questions per Level across all 5 Levels for all 7 domains
  console.log("\n--- Checking Question Counts (7 Domains × 5 Levels) ---");
  let grandTotal = 0;
  for (const domain of domains) {
    for (let lvl = 1; lvl <= 5; lvl++) {
      const questions = getQuestionsForDomainAndLevel(domain, lvl);
      if (questions.length !== 100) {
        throw new Error(`Domain ${domain} Level ${lvl} has ${questions.length} questions, expected 100!`);
      }
      grandTotal += questions.length;
    }
    console.log(`Domain [${domain}]: Levels 1-5 verified (500 questions).`);
  }
  console.log(`\nGrand Total Questions Across Platform: ${grandTotal} (Expected: 3,500)`);

  // 3. Test getQuestionById lookups
  console.log("\n--- Testing getQuestionById lookups ---");
  const testIds = [
    "ecom-L1-001",
    "ecom-L1-100",
    "hc-L1-001",
    "hc-L2-050",
    "fin-L3-025",
    "hr-L4-010",
    "log-L5-099",
    "rest-L1-001",
    "saas-L2-015",
  ];
  for (const id of testIds) {
    const q = getQuestionById(id);
    if (!q) {
      throw new Error(`Failed to find question by ID: ${id}`);
    }
    console.log(`Lookup [${id}] -> "${q.title}" (XP: ${q.xp}, Level: ${q.level}, Domain: ${q.domain})`);
  }

  // 4. Test Sandbox Database Execution for Healthcare and Finance
  console.log("\n--- Testing Database Execution on Multi-Domain Schemas ---");
  
  // Test Healthcare
  const hcRes = await runSandboxQuery("SELECT name, specialty FROM doctors LIMIT 5;", "healthcare_l1");
  console.log(`Healthcare query returned ${hcRes.rowCount} rows, error: ${hcRes.error || "none"}`);
  if (hcRes.error) throw new Error(`Healthcare query failed: ${hcRes.error}`);

  // Test Finance
  const finRes = await runSandboxQuery("SELECT branch_name, city, vault_cash_limit FROM branches LIMIT 3;", "finance_l1");
  console.log(`Finance query returned ${finRes.rowCount} rows, error: ${finRes.error || "none"}`);
  if (finRes.error) throw new Error(`Finance query failed: ${finRes.error}`);

  // Test HR
  const hrRes = await runSandboxQuery("SELECT name, salary FROM employees LIMIT 3;", "hr_l1");
  console.log(`HR query returned ${hrRes.rowCount} rows, error: ${hrRes.error || "none"}`);
  if (hrRes.error) throw new Error(`HR query failed: ${hrRes.error}`);

  // Test Logistics
  const logRes = await runSandboxQuery("SELECT carrier_name, service_level FROM carriers LIMIT 3;", "logistics_l1");
  console.log(`Logistics query returned ${logRes.rowCount} rows, error: ${logRes.error || "none"}`);
  if (logRes.error) throw new Error(`Logistics query failed: ${logRes.error}`);

  // Test Restaurants
  const restRes = await runSandboxQuery("SELECT name, price FROM menu_items LIMIT 3;", "restaurants_l1");
  console.log(`Restaurants query returned ${restRes.rowCount} rows, error: ${restRes.error || "none"}`);
  if (restRes.error) throw new Error(`Restaurants query failed: ${restRes.error}`);

  // Test SaaS
  const saasRes = await runSandboxQuery("SELECT company_name, tier FROM accounts LIMIT 3;", "saas_l1");
  console.log(`SaaS query returned ${saasRes.rowCount} rows, error: ${saasRes.error || "none"}`);
  if (saasRes.error) throw new Error(`SaaS query failed: ${saasRes.error}`);

  console.log("\nALL VERIFICATIONS PASSED WITH 100% SUCCESS!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
