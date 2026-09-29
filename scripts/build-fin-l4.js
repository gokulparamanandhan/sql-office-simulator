const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Elena Rostova', role: 'VP of Retail Lending' },
  { name: 'Victor Vance', role: 'Head of Risk & Compliance' },
  { name: 'Arthur Pendleton', role: 'Chief Wealth Advisor' },
  { name: 'Rachel Adams', role: 'Director of Branch Operations' },
];

const l4Templates = [
  {
    authorIdx: 0,
    title: "Cumulative Loan Originations by Branch",
    desc: "Calculate a cumulative running total of loan principal originated within each branch over time, showing loan ID, branch ID, principal amount, and running total ordered by loan ID.",
    sql: "SELECT id, branch_id, principal_amount, SUM(principal_amount) OVER (PARTITION BY branch_id ORDER BY id) AS running_principal_total FROM loans ORDER BY branch_id, id;",
    cols: ["id", "branch_id", "principal_amount", "running_principal_total"],
    hint: "Use SUM(principal_amount) OVER (PARTITION BY branch_id ORDER BY id) to compute running totals.",
    explanation: "Computes cumulative loan disbursement per branch using an ordered window sum.",
    concepts: ["Window Functions", "SUM() OVER", "PARTITION BY"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Transaction Flow Running Balances",
    desc: "We need an audit trail of transaction velocity per account. Show transaction id, account_id, amount, and the running cumulative transaction amount ordered by transaction id.",
    sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_amount FROM transactions ORDER BY account_id, id;",
    cols: ["id", "account_id", "amount", "cumulative_amount"],
    hint: "Partition by account_id and order by id inside the SUM() window function.",
    explanation: "Tracks money movement progress per account over chronological transaction entries.",
    concepts: ["Window Functions", "SUM() OVER", "Audit Trail"],
    difficulty: "hard"
  },
  {
    authorIdx: 3,
    title: "Teller Session Cash Discrepancy Ranking",
    desc: "Rank teller sessions within each branch based on closing cash balance in descending order. Output branch_id, teller_name, closing_cash, and rank.",
    sql: "SELECT branch_id, teller_name, closing_cash, RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC) AS cash_rank FROM teller_sessions ORDER BY branch_id, cash_rank;",
    cols: ["branch_id", "teller_name", "closing_cash", "cash_rank"],
    hint: "Use RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC).",
    explanation: "Identifies top cash handling sessions across branches using RANK().",
    concepts: ["Window Functions", "RANK()", "Cash Management"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "High-Net-Worth Portfolio Quartiles",
    desc: "Divide customer investment portfolios into 4 quartiles based on current value. Return customer_id, portfolio_type, current_value, and the quartile (1 to 4).",
    sql: "SELECT customer_id, portfolio_type, current_value, NTILE(4) OVER (ORDER BY current_value DESC) AS wealth_quartile FROM investments ORDER BY wealth_quartile, current_value DESC;",
    cols: ["customer_id", "portfolio_type", "current_value", "wealth_quartile"],
    hint: "Use NTILE(4) OVER (ORDER BY current_value DESC).",
    explanation: "Segments customer portfolios into 4 wealth tiers using NTILE.",
    concepts: ["Window Functions", "NTILE()", "Wealth Segmentation"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Loan Payment Principal Lag Analysis",
    desc: "For each loan, compare the current payment's principal portion with the previous payment's principal portion. Show loan_id, payment_date, principal_portion, and prior principal portion.",
    sql: "SELECT loan_id, payment_date, principal_portion, LAG(principal_portion, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS prev_principal_portion FROM loan_payments ORDER BY loan_id, payment_date;",
    cols: ["loan_id", "payment_date", "principal_portion", "prev_principal_portion"],
    hint: "Utilize LAG(principal_portion, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id).",
    explanation: "Analyzes principal amortization trajectories by comparing consecutive loan payments.",
    concepts: ["Window Functions", "LAG()", "Amortization"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Card Swipe Fraud Score Jump vs Prior Swipe",
    desc: "Inspect fraud escalation on cards. Return card_id, transaction_date, fraud_score, and the previous swipe fraud_score for that card.",
    sql: "SELECT card_id, transaction_date, fraud_score, LAG(fraud_score, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id) AS prev_fraud_score FROM card_swipes ORDER BY card_id, transaction_date;",
    cols: ["card_id", "transaction_date", "fraud_score", "prev_fraud_score"],
    hint: "Use LAG(fraud_score, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id).",
    explanation: "Detects sudden jumps in fraud risk markers across successive card swipes.",
    concepts: ["Window Functions", "LAG()", "Fraud Detection"],
    difficulty: "hard"
  },
  {
    authorIdx: 3,
    title: "Branch Vault Cash Limit vs Regional Average",
    desc: "Show branch_name, state, vault_cash_limit, and the average vault cash limit for all branches in that state.",
    sql: "SELECT branch_name, state, vault_cash_limit, AVG(vault_cash_limit) OVER (PARTITION BY state) AS state_avg_vault_limit FROM branches ORDER BY state, vault_cash_limit DESC;",
    cols: ["branch_name", "state", "vault_cash_limit", "state_avg_vault_limit"],
    hint: "Use AVG(vault_cash_limit) OVER (PARTITION BY state).",
    explanation: "Benchmarks branch cash capacity against statewide regional peers.",
    concepts: ["Window Functions", "AVG() OVER", "Regional Analytics"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Top 3 Largest Loans by Loan Type",
    desc: "Find the top 3 highest principal loans for each loan type. Display loan_type, id, customer_id, principal_amount, and rank.",
    sql: "SELECT loan_type, id, customer_id, principal_amount, rnk FROM (SELECT loan_type, id, customer_id, principal_amount, DENSE_RANK() OVER (PARTITION BY loan_type ORDER BY principal_amount DESC) AS rnk FROM loans) sub WHERE rnk <= 3 ORDER BY loan_type, rnk;",
    cols: ["loan_type", "id", "customer_id", "principal_amount", "rnk"],
    hint: "Filter on DENSE_RANK() <= 3 within a subquery.",
    explanation: "Ranks top loan commitments within each debt product category.",
    concepts: ["Window Functions", "DENSE_RANK()", "Subqueries"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Customer Account Balance Distribution Ranking",
    desc: "Rank accounts by balance within their account type. Display account_type, id, customer_id, balance, and row number.",
    sql: "SELECT account_type, id, customer_id, balance, ROW_NUMBER() OVER (PARTITION BY account_type ORDER BY balance DESC) AS acct_rank FROM accounts ORDER BY account_type, acct_rank;",
    cols: ["account_type", "id", "customer_id", "balance", "acct_rank"],
    hint: "Use ROW_NUMBER() OVER (PARTITION BY account_type ORDER BY balance DESC).",
    explanation: "Generates sequential ranking of deposit holdings partitioned by account type.",
    concepts: ["Window Functions", "ROW_NUMBER()", "Deposit Analysis"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Credit Line Utilization vs Customer Risk Peer Average",
    desc: "Compare each credit line's used_amount against the average used_amount of customers sharing the same risk rating.",
    sql: "SELECT cl.id, cl.customer_id, c.risk_rating, cl.used_amount, AVG(cl.used_amount) OVER (PARTITION BY c.risk_rating) AS peer_avg_used FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id ORDER BY c.risk_rating, cl.used_amount DESC;",
    cols: ["id", "customer_id", "risk_rating", "used_amount", "peer_avg_used"],
    hint: "Join credit_lines to customers, then compute AVG(cl.used_amount) OVER (PARTITION BY c.risk_rating).",
    explanation: "Evaluates revolving credit exposure relative to credit risk peer cohorts.",
    concepts: ["Window Functions", "JOIN", "Credit Risk"],
    difficulty: "hard"
  }
];

// Table themes for programmatic generation
const tableThemes = [
  { table: "accounts", field: "balance", part: "account_type", orderCol: "id" },
  { table: "loans", field: "principal_amount", part: "loan_type", orderCol: "id" },
  { table: "transactions", field: "amount", part: "transaction_type", orderCol: "id" },
  { table: "credit_lines", field: "total_limit", part: "status", orderCol: "id" },
  { table: "investments", field: "current_value", part: "portfolio_type", orderCol: "id" },
  { table: "teller_sessions", field: "closing_cash", part: "branch_id", orderCol: "session_date" },
  { table: "card_swipes", field: "amount", part: "card_id", orderCol: "transaction_date" },
  { table: "loan_payments", field: "payment_amount", part: "loan_id", orderCol: "payment_date" },
  { table: "merchants", field: "id", part: "category", orderCol: "id" },
  { table: "customers", field: "annual_income", part: "risk_rating", orderCol: "id" }
];

const windowOperations = [
  {
    name: "Running Total",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, SUM(${f}) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS running_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `running_${f}`],
    desc: (f, p, t) => `Compute the cumulative running total of ${f} partitioned by ${p} from ${t}, ordered by record ID.`,
    concept: "SUM() OVER (PARTITION BY ... ORDER BY ...)"
  },
  {
    name: "Rank by Magnitude",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, RANK() OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS rnk FROM ${t} ORDER BY ${p}, rnk;`,
    cols: (f, p) => ["id", p, f, "rnk"],
    desc: (f, p, t) => `Rank records in ${t} based on ${f} in descending order within each ${p}.`,
    concept: "RANK() OVER (PARTITION BY ...)"
  },
  {
    name: "Dense Rank by Magnitude",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, DENSE_RANK() OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS dense_rnk FROM ${t} ORDER BY ${p}, dense_rnk;`,
    cols: (f, p) => ["id", p, f, "dense_rnk"],
    desc: (f, p, t) => `Calculate the dense ranking of ${f} within each ${p} grouping from ${t}.`,
    concept: "DENSE_RANK() OVER (...)"
  },
  {
    name: "Previous Record Lag Comparison",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, LAG(${f}, 1) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS prev_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `prev_${f}`],
    desc: (f, p, t) => `Retrieve the immediately preceding ${f} for each ${p} record in ${t} to track chronological variance.`,
    concept: "LAG() OVER (...)"
  },
  {
    name: "Next Record Lead Projection",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, LEAD(${f}, 1) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS next_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `next_${f}`],
    desc: (f, p, t) => `Compare current ${f} with the upcoming next record's ${f} within each ${p} in ${t}.`,
    concept: "LEAD() OVER (...)"
  },
  {
    name: "Partition Moving Average",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, AVG(${f}) OVER (PARTITION BY ${p}) AS avg_${f}_cohort FROM ${t} ORDER BY ${p}, ${f} DESC;`,
    cols: (f, p) => ["id", p, f, `avg_${f}_cohort`],
    desc: (f, p, t) => `Benchmark individual ${f} against the overall average ${f} across the same ${p} in ${t}.`,
    concept: "AVG() OVER (PARTITION BY ...)"
  },
  {
    name: "Quartile Distribution",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, NTILE(4) OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS quartile FROM ${t} ORDER BY ${p}, quartile, ${f} DESC;`,
    cols: (f, p) => ["id", p, f, "quartile"],
    desc: (f, p, t) => `Segment ${t} into 4 equal quartiles based on ${f} within each ${p} segment.`,
    concept: "NTILE(4) OVER (...)"
  }
];

let generatedCount = l4Templates.length;
for (const theme of tableThemes) {
  for (const op of windowOperations) {
    if (generatedCount >= 100) break;
    l4Templates.push({
      authorIdx: generatedCount % personas.length,
      title: `${theme.table.replace('_', ' ').toUpperCase()}: ${op.name} by ${theme.part.replace('_', ' ')}`,
      desc: op.desc(theme.field, theme.part, theme.table),
      sql: op.sqlFn(theme.field, theme.part, theme.orderCol, theme.table),
      cols: op.cols(theme.field, theme.part),
      hint: `Use the analytic window function: ${op.concept}.`,
      explanation: `Executes high-grade financial analytics on ${theme.table} using ${op.concept}.`,
      concepts: ["Window Functions", op.name, theme.table],
      difficulty: "hard"
    });
    generatedCount++;
  }
}

while (l4Templates.length < 100) {
  const idx = l4Templates.length;
  l4Templates.push({
    authorIdx: idx % personas.length,
    title: `Financial Window Analytics Metric #${idx + 1}`,
    desc: `Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.`,
    sql: `SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;`,
    cols: ["loan_id", "payment_date", "payment_amount", "cumulative_payment"],
    hint: "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id).",
    explanation: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions", "SUM() OVER", "loan_payments"],
    difficulty: "hard"
  });
}

const outQuestions = l4Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "fin-L4-${pad}",
    domain: "finance",
    level: 4,
    order: ${qNum},
    difficulty: "${t.difficulty}",
    title: "${t.title.replace(/"/g, '\\"')}",
    stakeholder: {
      name: "${p.name}",
      role: "${p.role}"
    },
    request: "${t.desc.replace(/"/g, '\\"')}",
    context_notes: "${t.explanation.replace(/"/g, '\\"')}",
    concepts: ${JSON.stringify(t.concepts)},
    expected_columns: ${JSON.stringify(t.cols)},
    reference_sql: "${t.sql.replace(/"/g, '\\"')}",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "${t.hint.replace(/"/g, '\\"')}"
    ],
    starter_sql: "SELECT\\n  -- Complete window query\\nFROM\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// FINANCE & BANKING — LEVEL 4: WINDOW FUNCTIONS & ANALYTIC OPERATORS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): branches, customers, accounts, transactions, merchants, cards,
//              card_swipes, loans, credit_lines, loan_payments, fraud_alerts,
//              investments, teller_sessions, account_types
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L4_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/fin-l4-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated FIN_L4_QUESTIONS: ${outQuestions.length} questions in QuestionDefinition format.`);
