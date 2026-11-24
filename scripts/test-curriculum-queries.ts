import { PGlite } from "@electric-sql/pglite";
import { generateDomainSql } from "../src/lib/datasets/multi-domain-generators";
import { LEARNING_QUESTIONS } from "../src/lib/content/learning-curriculum";

async function testCurriculumQueries() {
  const pg = new PGlite();
  const initSql = generateDomainSql("ecommerce", "main", "ecom_l1");
  await pg.exec(initSql);
  await pg.exec(`SET search_path = "ecom_l1";`);

  if (LEARNING_QUESTIONS.length !== 100) {
    throw new Error(`Expected 100 Academy questions, found ${LEARNING_QUESTIONS.length}`);
  }

  for (const q of LEARNING_QUESTIONS) {
    const res = await pg.exec(q.referenceSql);
    let finalRes = res[res.length - 1];
    for (let i = res.length - 1; i >= 0; i--) {
      if (res[i]?.fields && res[i].fields.length > 0) {
        finalRes = res[i];
        break;
      }
    }
    const cols = (finalRes?.fields || []).map((f) => f.name.toLowerCase());
    const rows = finalRes?.rows || [];
    if (rows.length === 0) {
      throw new Error(`Academy Q${q.id} (${q.title}) returned 0 rows!`);
    }
    for (const exp of q.expectedColumns) {
      if (!cols.includes(exp.toLowerCase())) {
        throw new Error(`Academy Q${q.id} missing column '${exp}'. Returned: ${cols.join(", ")}`);
      }
    }
    if (q.id % 20 === 0) {
      console.log(`[ACADEMY PASS ${q.id}/100] ${q.title} (${rows.length} rows)`);
    }
  }

  console.log("SUCCESS: ALL 100 LEARN ACADEMY QUESTIONS VERIFIED IN PGLITE!");
}

testCurriculumQueries().catch((err) => {
  console.error("Academy verification failed:", err);
  process.exit(1);
});
