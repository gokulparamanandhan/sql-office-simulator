const fs = require('fs');

console.log("=================================================");
console.log("MASTER VERIFICATION ACROSS ALL TARGET DOMAINS");
console.log("=================================================");

const domains = [
  {
    name: "Healthcare",
    prefix: "hc",
    files: [
      "src/lib/content/hc-l1-questions.ts",
      "src/lib/content/hc-l2-questions.ts",
      "src/lib/content/hc-l3-questions.ts",
      "src/lib/content/hc-l4-questions.ts",
      "src/lib/content/hc-l5-questions.ts",
    ]
  },
  {
    name: "Finance & Banking",
    prefix: "fin",
    files: [
      "src/lib/content/fin-l1-questions.ts",
      "src/lib/content/fin-l2-questions.ts",
      "src/lib/content/fin-l3-questions.ts",
      "src/lib/content/fin-l4-questions.ts",
      "src/lib/content/fin-l5-questions.ts",
    ]
  },
  {
    name: "Human Resources",
    prefix: "hr",
    files: [
      "src/lib/content/hr-l1-questions.ts",
      "src/lib/content/hr-l2-questions.ts",
      "src/lib/content/hr-l3-questions.ts",
      "src/lib/content/hr-l4-questions.ts",
      "src/lib/content/hr-l5-questions.ts",
    ]
  },
  {
    name: "Logistics & Supply",
    prefix: "log",
    files: [
      "src/lib/content/log-l1-questions.ts",
      "src/lib/content/log-l2-questions.ts",
      "src/lib/content/log-l3-questions.ts",
      "src/lib/content/log-l4-questions.ts",
      "src/lib/content/log-l5-questions.ts",
    ]
  },
  {
    name: "SaaS",
    prefix: "saas",
    files: [
      "src/lib/content/saas-l1-questions.ts",
      "src/lib/content/saas-l2-questions.ts",
      "src/lib/content/saas-l3-questions.ts",
      "src/lib/content/saas-l4-questions.ts",
      "src/lib/content/saas-l5-questions.ts",
    ]
  }
];

let grandTotal = 0;
let domainErrors = 0;

for (const d of domains) {
  let domainCount = 0;
  console.log(`\nChecking Domain: ${d.name}...`);
  for (let l = 0; l < d.files.length; l++) {
    const fPath = d.files[l];
    const content = fs.readFileSync(fPath, 'utf-8');
    const regex = new RegExp(`"?id"?:\\s*"${d.prefix}-L${l + 1}-\\d{3}"`, 'gi');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    domainCount += count;
    grandTotal += count;

    if (count !== 100) {
      console.error(`  ❌ Level ${l + 1} (${fPath}): Expected 100 questions, got ${count}`);
      domainErrors++;
    } else {
      console.log(`  ✓ Level ${l + 1}: 100 questions verified.`);
    }
  }
  console.log(`  -> ${d.name} Total: ${domainCount}/500 questions.`);
}

console.log("\n=================================================");
console.log(`GRAND TOTAL: ${grandTotal}/2500 questions verified across all 5 domains.`);
console.log(`TOTAL ERRORS: ${domainErrors}`);
console.log("=================================================");

if (domainErrors === 0 && grandTotal === 2500) {
  console.log("🎉 ALL 2,500 QUESTIONS ACROSS ALL 5 REQUESTED DOMAINS ARE 100% COMPLETE!");
} else {
  process.exit(1);
}
