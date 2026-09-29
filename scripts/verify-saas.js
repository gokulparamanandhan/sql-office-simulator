const fs = require('fs');

console.log("Verifying SaaS Questions (Levels 1 to 5)...");

const files = [
  { name: "Level 1", path: "src/lib/content/saas-l1-questions.ts" },
  { name: "Level 2", path: "src/lib/content/saas-l2-questions.ts" },
  { name: "Level 3", path: "src/lib/content/saas-l3-questions.ts" },
  { name: "Level 4", path: "src/lib/content/saas-l4-questions.ts" },
  { name: "Level 5", path: "src/lib/content/saas-l5-questions.ts" },
];

let totalQuestions = 0;
let errors = 0;

for (const f of files) {
  const content = fs.readFileSync(f.path, 'utf-8');
  const idMatches = content.match(/"?id"?:\s*"saas-L\d-\d{3}"/gi);
  const count = idMatches ? idMatches.length : 0;
  totalQuestions += count;

  if (count !== 100) {
    console.error(`ERROR: ${f.name} has ${count} questions instead of 100!`);
    errors++;
  } else {
    console.log(`✓ ${f.name}: exactly ${count} questions.`);
  }

  const hasRefSql = /"?reference_sql"?:/i.test(content);
  const hasStakeholder = /"?stakeholder"?:/i.test(content);
  const hasReq = /"?request"?:/i.test(content);
  const hasCols = /"?expected_columns"?:/i.test(content);

  if (!hasRefSql || !hasStakeholder || !hasReq || !hasCols) {
    console.error(`ERROR: ${f.name} missing essential properties!`);
    errors++;
  }
}

console.log(`\nSaaS Verification Result: Total ${totalQuestions} questions verified. Errors: ${errors}.`);
if (errors === 0 && totalQuestions === 500) {
  console.log("ALL 500 SAAS QUESTIONS (LEVELS 1 TO 5) ARE 100% COMPLETE & VALID!");
} else {
  process.exit(1);
}
