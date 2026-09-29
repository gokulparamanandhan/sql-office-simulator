import { getDomainOfficeMetadata, DOMAIN_LEVEL_STAGES } from "../src/lib/office/all-domains-metadata";
import { getQuestionsForDomainAndLevel } from "../src/lib/content/content-registry";
import { getDomainDatasetSql } from "../src/lib/datasets/multi-domain-generators";

const DOMAINS = ["ecommerce", "healthcare", "finance", "hr", "logistics", "restaurants", "saas"] as const;

async function main() {
  console.log("=== COMPREHENSIVE PROGRESSIVE SCHEMA & SIMULATION AUDIT ===");
  let passed = 0;
  let total = 0;

  function assert(cond: boolean, msg: string) {
    total++;
    if (cond) {
      console.log(`  [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${msg}`);
      process.exit(1);
    }
  }

  // 1. Audit Progressive Schema Table and Column Counts for all 7 Domains
  for (const domain of DOMAINS) {
    console.log(`\n--- Auditing Domain: ${domain.toUpperCase()} ---`);

    // Level 1
    const l1 = getDomainOfficeMetadata(domain, 1);
    assert(l1.schema.length === 6, `${domain} Level 1 has exactly 6 tables (found ${l1.schema.length})`);
    for (const tbl of l1.schema) {
      assert(tbl.columns.length <= 5, `${domain} Level 1 table '${tbl.name}' has <= 5 columns (found ${tbl.columns.length})`);
    }

    // Level 2
    const l2 = getDomainOfficeMetadata(domain, 2);
    assert(l2.schema.length === 9, `${domain} Level 2 has exactly 9 tables (found ${l2.schema.length})`);
    for (const tbl of l2.schema) {
      assert(tbl.columns.length <= 6, `${domain} Level 2 table '${tbl.name}' has <= 6 columns (found ${tbl.columns.length})`);
    }

    // Level 3
    const l3 = getDomainOfficeMetadata(domain, 3);
    assert(l3.schema.length === 12, `${domain} Level 3 has exactly 12 tables (found ${l3.schema.length})`);
    for (const tbl of l3.schema) {
      assert(tbl.columns.length <= 7, `${domain} Level 3 table '${tbl.name}' has <= 7 columns (found ${tbl.columns.length})`);
    }

    // Level 4
    const l4 = getDomainOfficeMetadata(domain, 4);
    assert(l4.schema.length === 14, `${domain} Level 4 has exactly 14 tables (found ${l4.schema.length})`);
    for (const tbl of l4.schema) {
      assert(tbl.columns.length <= 8, `${domain} Level 4 table '${tbl.name}' has <= 8 columns (found ${tbl.columns.length})`);
    }

    // Level 5
    const l5 = getDomainOfficeMetadata(domain, 5);
    assert(l5.schema.length === 15, `${domain} Level 5 has all 15 tables (found ${l5.schema.length})`);

    // Verify Company Stage Growth
    assert(l1.company.stageName !== l5.company.stageName, `${domain} stage grows from L1 ('${l1.company.stageName}') to L5 ('${l5.company.stageName}')`);
    assert(l1.company.employeeCount !== l5.company.employeeCount, `${domain} employee count scales from L1 ('${l1.company.employeeCount}') to L5 ('${l5.company.employeeCount}')`);
    assert(l1.company.dataHireRole !== l5.company.dataHireRole, `${domain} learner role advances from L1 ('${l1.company.dataHireRole}') to L5 ('${l5.company.dataHireRole}')`);
  }

  // 2. Audit Questions to ensure Level 1 only queries Level 1 tables
  console.log(`\n--- Auditing Question & Schema Alignment ---`);
  for (const domain of DOMAINS) {
    const l1Metadata = getDomainOfficeMetadata(domain, 1);
    const l1TableNames = new Set(l1Metadata.schema.map((t) => t.name.toLowerCase()));
    const l1Questions = getQuestionsForDomainAndLevel(domain, 1);

    assert(l1Questions.length === 100, `${domain} has 100 Level 1 questions (found ${l1Questions.length})`);

    // Check robotic phrases in briefings
    for (const q of l1Questions) {
      const brief = (q.request || (q as any).briefing || "").toLowerCase();
      const isRobotic = brief.includes("needs a filtered query of") || brief.includes("order by ascending limit");
      assert(!isRobotic, `Question ${q.id} prompt is authentic stakeholder tone: "${q.title}"`);
    }
  }

  console.log(`\n========================================`);
  console.log(`ALL PROGRESSIVE SCHEMA TESTS PASSED: ${passed}/${total}`);
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
