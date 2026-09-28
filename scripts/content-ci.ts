import fs from "fs";
import path from "path";
import { generate100EcomL1Questions } from "../src/lib/pipeline/question-generator";
import {
  checkDuplicateQuestions,
  validateQuestion,
} from "../src/lib/pipeline/validation-gates";

async function runContentCI() {
  console.log("==========================================================");
  console.log("🚀 SQL Office Simulator - Content CI & Question Pipeline");
  console.log("Domain: E-Commerce | Level: 1 (The Startup)");
  console.log("Target: 100 Validated Production Questions");
  console.log("==========================================================\n");

  const questions = generate100EcomL1Questions();

  // 1. Distribution Check
  console.log("Step 1: Validating Level Blueprint Distribution (Section 6 & 7)...");
  const warmup = questions.filter((q) => q.difficulty === "warm-up").length;
  const core = questions.filter((q) => q.difficulty === "core").length;
  const challenging = questions.filter((q) => q.difficulty === "challenging").length;
  const boss = questions.filter((q) => q.difficulty === "boss").length;

  console.log(`  - Warm-up (Q1-30):     ${warmup} / 30`);
  console.log(`  - Core (Q31-70):       ${core} / 40`);
  console.log(`  - Challenging (Q71-90): ${challenging} / 20`);
  console.log(`  - Boss (Q91-100):      ${boss} / 10`);
  console.log(`  - Total Questions:     ${questions.length} / 100`);

  if (warmup !== 30 || core !== 40 || challenging !== 20 || boss !== 10) {
    console.error("❌ Distribution failure: slot counts do not match specification.");
    process.exit(1);
  }
  console.log("  ✓ Blueprint distribution matches specification.\n");

  // 2. Uniqueness & Duplicate Check
  console.log("Step 2: Checking Uniqueness & Duplicate Collisions...");
  const dupCheck = checkDuplicateQuestions(questions);
  if (!dupCheck.passed) {
    console.error("❌ Duplicate check failed:", dupCheck.duplicates);
    process.exit(1);
  }
  console.log("  ✓ 100/100 Unique IDs & Titles verified.\n");

  // 3. Automated Validation Gates (Execute check, AST security, Concept check, Solver check)
  console.log("Step 3: Running Automated Gates for all 100 Questions...");
  let passedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const validation = await validateQuestion(q, "ecom_l1");

    if (validation.passedAll) {
      passedCount++;
      if (q.order % 20 === 0 || q.order === 1 || q.difficulty === "boss") {
        console.log(`  ✓ [Gate Passed] ${q.id} (${q.difficulty}): "${q.title}"`);
      }
    } else {
      failedCount++;
      const failingGate = validation.gates.find((g) => !g.passed);
      console.error(
        `  ✗ [Gate FAILED] ${q.id}: ${failingGate?.gateName} - ${failingGate?.error}`
      );
    }
  }

  console.log(
    `\nGate Validation Results: ${passedCount} passed, ${failedCount} failed.`
  );

  if (failedCount > 0) {
    console.error("❌ Content CI failed: Not all questions passed the automated gates.");
    process.exit(1);
  }

  console.log("  ✓ All 100 questions passed 100% of automated gates!\n");

  // 4. Save to content directory (Spec Section 7.3 step 8)
  console.log("Step 4: Writing Validated Question Artifacts...");
  const contentDir = path.join(process.cwd(), "content", "ecommerce");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const jsonPath = path.join(contentDir, "level-1.json");
  fs.writeFileSync(jsonPath, JSON.stringify(questions, null, 2), "utf8");
  console.log(`  ✓ Saved questions JSON to: ${jsonPath}`);

  // 5. Update src/lib/content/ecom-l1-questions.ts
  const codeContent = `export interface QuestionDefinition {
  id: string;
  domain: string;
  level: number;
  order: number;
  difficulty: "warm-up" | "core" | "challenging" | "boss";
  title: string;
  stakeholder: {
    name: string;
    role: string;
  };
  request: string;
  context_notes: string;
  concepts: string[];
  expected_columns: string[];
  reference_sql: string;
  validation: {
    order_sensitive: boolean;
    column_names_sensitive: boolean;
    numeric_tolerance: number;
  };
  hints: string[];
  solution_explanation: string;
  xp: number;
  estimated_minutes: number;
}

// 100 Automated-Gate Validated Questions for E-Commerce Level 1
// Generated via Content Pipeline (Spec Section 7.3)
export const ECOM_L1_QUESTIONS: QuestionDefinition[] = ${JSON.stringify(
    questions,
    null,
    2
  )};
`;

  const tsPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "content",
    "ecom-l1-questions.ts"
  );
  fs.writeFileSync(tsPath, codeContent, "utf8");
  console.log(`  ✓ Updated TypeScript question module: ${tsPath}`);

  console.log("\n==========================================================");
  console.log("🎉 Phase 6 Complete: 100 Validated Questions Generated & Verified!");
  console.log("==========================================================\n");
}

runContentCI().catch((err) => {
  console.error("Content CI Fatal Error:", err);
  process.exit(1);
});
