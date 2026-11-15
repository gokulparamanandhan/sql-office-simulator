import { PGlite } from "@electric-sql/pglite";
import { getBasicQuestions } from "./questions-data-basic";
import { getIntermediateQuestions } from "./questions-data-intermediate";
import { getAdvancedQuestions } from "./questions-data-advanced";
import { InterviewQuestion } from "../src/lib/content/interview-questions";

async function verifyQuestion(pg: PGlite, q: InterviewQuestion, index: number) {
  const schemaName = `test_q_${index}`;
  await pg.exec(`CREATE SCHEMA IF NOT EXISTS "${schemaName}";`);
  await pg.exec(`SET search_path = "${schemaName}";`);
  await pg.exec(q.schemaSql);

  const res = await pg.query(q.referenceSql);
  const rows = res.rows as Record<string, unknown>[];

  if (rows.length === 0) {
    throw new Error(`[${q.id}] ${q.title} returned 0 rows! Reference SQL must produce test output.`);
  }

  const returnedCols = Object.keys(rows[0] || {}).map((c) => c.toLowerCase());
  for (const expected of q.expectedColumns) {
    if (!returnedCols.includes(expected.toLowerCase())) {
      throw new Error(`[${q.id}] ${q.title} missing expected column: '${expected}'. Returned: ${returnedCols.join(", ")}`);
    }
  }
}

async function main() {
  console.log("Verifying ALL 300 Questions in PGlite...");
  const basic = getBasicQuestions();
  const intermediate = getIntermediateQuestions();
  const advanced = getAdvancedQuestions();

  const all: InterviewQuestion[] = [...basic, ...intermediate, ...advanced];
  console.log(`Loaded ${all.length} total questions.`);

  const pg = new PGlite();
  let passed = 0;

  for (let i = 0; i < all.length; i++) {
    const q = all[i];
    try {
      await verifyQuestion(pg, q, i);
      passed++;
      if (passed % 50 === 0 || passed === all.length) {
        console.log(`[PASS ${passed}/${all.length}] Verified up to ${q.id} (${q.title})`);
      }
    } catch (err: unknown) {
      console.error(`FAILED question:`, q.id, q.title);
      console.error("Reference SQL:\n", q.referenceSql);
      throw err;
    }
  }

  console.log(`\n===========================================`);
  console.log(`SUCCESS! 100% OF ALL ${passed} QUESTIONS PASSED PGLITE EVALUATION!`);
  console.log(`===========================================`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
