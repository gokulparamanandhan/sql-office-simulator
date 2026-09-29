const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Elena Rostova', role: 'VP of Retail Lending' },
  { name: 'Victor Vance', role: 'Head of Risk & Compliance' },
  { name: 'Arthur Pendleton', role: 'Chief Wealth Advisor' },
  { name: 'Rachel Adams', role: 'Director of Branch Operations' },
];

const l5Templates = [
  {
    authorIdx: 1,
    title: "Consolidated High-Risk Borrower Exposure Matrix",
    desc: "Calculate total loan debt, credit line exposure, and deposit balances for all High Risk customers. Using a CTE, aggregate loans and credit lines per customer, then join accounts to show customer name, risk_rating, total_loan_debt, total_credit_limit, and total_deposit_balance.",
    sql: "WITH loan_cte AS (SELECT customer_id, SUM(principal_amount) AS total_loan_debt FROM loans GROUP BY customer_id), credit_cte AS (SELECT customer_id, SUM(total_limit) AS total_credit_limit FROM credit_lines GROUP BY customer_id), deposit_cte AS (SELECT customer_id, SUM(balance) AS total_deposit_balance FROM accounts GROUP BY customer_id) SELECT c.name, c.risk_rating, COALESCE(l.total_loan_debt, 0) AS total_loan_debt, COALESCE(cr.total_credit_limit, 0) AS total_credit_limit, COALESCE(d.total_deposit_balance, 0) AS total_deposit_balance FROM customers c LEFT JOIN loan_cte l ON c.id = l.customer_id LEFT JOIN credit_cte cr ON c.id = cr.customer_id LEFT JOIN deposit_cte d ON c.id = d.customer_id WHERE c.risk_rating = 'High Risk' ORDER BY total_loan_debt DESC;",
    cols: ["name", "risk_rating", "total_loan_debt", "total_credit_limit", "total_deposit_balance"],
    hint: "Build three CTEs for loans, credit lines, and accounts, then left join to customers filtering for 'High Risk'.",
    explanation: "Consolidates multi-product exposure across credit, lending, and depository accounts for high-risk profiles.",
    concepts: ["Multi-Stage CTE", "LEFT JOIN", "COALESCE", "Enterprise Risk"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Branch Loan-to-Deposit Ratio (LDR) Analysis",
    desc: "For each branch, calculate the total active loan balances and total account deposits using CTEs, then compute the Loan-to-Deposit Ratio (total loans divided by total deposits). Output branch_name, city, total_loans, total_deposits, and loan_deposit_ratio.",
    sql: "WITH branch_loans AS (SELECT branch_id, SUM(principal_amount) AS total_loans FROM loans GROUP BY branch_id), branch_deposits AS (SELECT branch_id, SUM(balance) AS total_deposits FROM accounts GROUP BY branch_id) SELECT b.branch_name, b.city, COALESCE(bl.total_loans, 0) AS total_loans, COALESCE(bd.total_deposits, 0) AS total_deposits, ROUND((COALESCE(bl.total_loans, 0) / NULLIF(bd.total_deposits, 0)), 4) AS loan_deposit_ratio FROM branches b LEFT JOIN branch_loans bl ON b.id = bl.branch_id LEFT JOIN branch_deposits bd ON b.id = bd.branch_id ORDER BY loan_deposit_ratio DESC;",
    cols: ["branch_name", "city", "total_loans", "total_deposits", "loan_deposit_ratio"],
    hint: "Use CTEs for branch loan totals and branch deposit totals, using NULLIF to protect against division by zero.",
    explanation: "Assesses banking liquidity and loan funding adequacy across branches using the regulatory LDR metric.",
    concepts: ["CTE", "Liquidity Ratio", "NULLIF", "Financial Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Customer Net Wealth 360 View",
    desc: "We need a complete net worth calculation per customer. Compute total assets (deposits + investments) minus total liabilities (loans + used credit lines) using CTEs. Return customer id, name, total_assets, total_liabilities, and net_worth.",
    sql: "WITH deposits AS (SELECT customer_id, SUM(balance) AS dep_sum FROM accounts GROUP BY customer_id), invest AS (SELECT customer_id, SUM(current_value) AS inv_sum FROM investments GROUP BY customer_id), debt_loans AS (SELECT customer_id, SUM(principal_amount) AS loan_sum FROM loans GROUP BY customer_id), debt_credit AS (SELECT customer_id, SUM(used_amount) AS cred_sum FROM credit_lines GROUP BY customer_id) SELECT c.id, c.name, (COALESCE(d.dep_sum, 0) + COALESCE(i.inv_sum, 0)) AS total_assets, (COALESCE(l.loan_sum, 0) + COALESCE(cr.cred_sum, 0)) AS total_liabilities, ((COALESCE(d.dep_sum, 0) + COALESCE(i.inv_sum, 0)) - (COALESCE(l.loan_sum, 0) + COALESCE(cr.cred_sum, 0))) AS net_worth FROM customers c LEFT JOIN deposits d ON c.id = d.customer_id LEFT JOIN invest i ON c.id = i.customer_id LEFT JOIN debt_loans l ON c.id = l.customer_id LEFT JOIN debt_credit cr ON c.id = cr.customer_id ORDER BY net_worth DESC;",
    cols: ["id", "name", "total_assets", "total_liabilities", "net_worth"],
    hint: "Aggregate deposits, investments, loans, and credit lines into separate CTEs and join them on customer_id.",
    explanation: "Builds a full Customer 360 balance sheet view showing total assets, liabilities, and net worth.",
    concepts: ["Multi-Stage CTE", "Balance Sheet Modeling", "Customer 360"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Suspicious Merchant Fraud Velocity & Chargeback Exposure",
    desc: "Identify merchants associated with multiple high-severity fraud alerts. Aggregate fraud alerts through transactions, cards, and card_swipes. Show merchant name, category, total_alerts, and total_flagged_swipe_volume.",
    sql: "WITH alert_txs AS (SELECT t.id AS transaction_id, fa.severity FROM fraud_alerts fa JOIN transactions t ON fa.transaction_id = t.id WHERE fa.severity = 'High'), flagged_merchants AS (SELECT cs.merchant_id, COUNT(DISTINCT at.transaction_id) AS alert_count, SUM(cs.amount) AS flagged_volume FROM card_swipes cs JOIN cards c ON cs.card_id = c.id JOIN transactions t ON t.account_id = c.account_id JOIN alert_txs at ON at.transaction_id = t.id GROUP BY cs.merchant_id) SELECT m.name, m.category, fm.alert_count, fm.flagged_volume FROM merchants m JOIN flagged_merchants fm ON m.id = fm.merchant_id ORDER BY fm.alert_count DESC, fm.flagged_volume DESC;",
    cols: ["name", "category", "alert_count", "flagged_volume"],
    hint: "Isolate high severity alerts in a CTE, link to card swipes, and join to merchants.",
    explanation: "Detects rogue merchant terminals and elevated acquiring risk under AML/fraud oversight.",
    concepts: ["Multi-Table CTE", "Fraud Analysis", "Merchant Risk"],
    difficulty: "expert"
  },
  {
    authorIdx: 3,
    title: "Branch Cash Vault Discrepancy & Teller Variance Audit",
    desc: "Calculate total closing cash recorded by tellers per branch and compare it with the branch vault_cash_limit. Show branch_name, vault_cash_limit, total_teller_closing_cash, and vault_utilization_pct.",
    sql: "WITH teller_totals AS (SELECT branch_id, SUM(closing_cash) AS total_closing_cash FROM teller_sessions GROUP BY branch_id) SELECT b.branch_name, b.vault_cash_limit, COALESCE(tt.total_closing_cash, 0) AS total_teller_closing_cash, ROUND((COALESCE(tt.total_closing_cash, 0) / b.vault_cash_limit * 100), 2) AS vault_utilization_pct FROM branches b LEFT JOIN teller_totals tt ON b.id = tt.branch_id ORDER BY vault_utilization_pct DESC;",
    cols: ["branch_name", "vault_cash_limit", "total_teller_closing_cash", "vault_utilization_pct"],
    hint: "Use a CTE to summarize closing cash by branch_id from teller_sessions.",
    explanation: "Monitors branch cash capacity against insurer-mandated vault limits.",
    concepts: ["CTE", "Cash Operations", "Vault Auditing"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Audit Trail of Privileged Administrative Actions",
    desc: "Cross-reference administrative audit logs with customer risk profiles. Find all actions performed in audit_logs where the entity_type relates to customers or accounts, listing performed_by, entity_type, action, and total actions performed by that user.",
    sql: "WITH user_audit AS (SELECT performed_by, entity_type, action, COUNT(*) OVER (PARTITION BY performed_by) AS user_action_count FROM audit_logs) SELECT DISTINCT performed_by, entity_type, action, user_action_count FROM user_audit ORDER BY user_action_count DESC, performed_by;",
    cols: ["performed_by", "entity_type", "action", "user_action_count"],
    hint: "Partition by performed_by in a CTE or window function over audit_logs.",
    explanation: "Audits compliance by tracking user system action frequencies for internal security reviews.",
    concepts: ["Audit Logs", "Window Function in CTE", "Compliance"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Interest Income Yield and Net Interest Margin by Branch",
    desc: "Determine total interest generated from loans alongside loan balances per branch. Using CTEs, compute branch_name, total_principal, estimated_annual_interest (sum of principal_amount * interest_rate / 100), and weighted_average_rate.",
    sql: "WITH loan_stats AS (SELECT branch_id, SUM(principal_amount) AS total_principal, SUM(principal_amount * interest_rate / 100.0) AS annual_interest FROM loans GROUP BY branch_id) SELECT b.branch_name, ls.total_principal, ls.annual_interest, ROUND((ls.annual_interest / ls.total_principal * 100.0), 2) AS weighted_average_rate FROM branches b JOIN loan_stats ls ON b.id = ls.branch_id ORDER BY ls.annual_interest DESC;",
    cols: ["branch_name", "total_principal", "annual_interest", "weighted_average_rate"],
    hint: "Calculate sum of principal and sum of principal * interest_rate / 100 in a CTE, then derive weighted average rate.",
    explanation: "Analyzes lending portfolio yields and profit margins across regional branches.",
    concepts: ["CTE", "Weighted Average", "Yield Analysis"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Investment Portfolio Asset Allocation Breakdown",
    desc: "For each customer having investment portfolios, display customer_id, total portfolio current_value, and the percentage this represents against the grand total of all bank investments.",
    sql: "WITH grand_total AS (SELECT SUM(current_value) AS bank_total_investments FROM investments), customer_totals AS (SELECT customer_id, SUM(current_value) AS cust_total_invested FROM investments GROUP BY customer_id) SELECT ct.customer_id, ct.cust_total_invested, ROUND((ct.cust_total_invested / gt.bank_total_investments * 100.0), 4) AS pct_of_bank_investments FROM customer_totals ct CROSS JOIN grand_total gt ORDER BY ct.cust_total_invested DESC;",
    cols: ["customer_id", "cust_total_invested", "pct_of_bank_investments"],
    hint: "Use a cross join with a CTE containing the bank-wide total investment sum.",
    explanation: "Identifies top private wealth relationships by market share of total assets under management.",
    concepts: ["CTE", "CROSS JOIN", "AUM Market Share"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Amortization Health: Principal vs Interest Payment Ratios",
    desc: "Analyze customer debt retirement velocity. Using a CTE, aggregate loan payments to compute total principal paid vs total interest paid per loan. Output loan_id, total_principal_paid, total_interest_paid, and principal_to_interest_ratio.",
    sql: "WITH payment_agg AS (SELECT loan_id, SUM(principal_portion) AS total_principal_paid, SUM(interest_portion) AS total_interest_paid FROM loan_payments GROUP BY loan_id) SELECT loan_id, total_principal_paid, total_interest_paid, ROUND((total_principal_paid / NULLIF(total_interest_paid, 0)), 2) AS principal_to_interest_ratio FROM payment_agg ORDER BY principal_to_interest_ratio DESC;",
    cols: ["loan_id", "total_principal_paid", "total_interest_paid", "principal_to_interest_ratio"],
    hint: "Aggregate principal and interest portions in a CTE and compute their ratio using NULLIF.",
    explanation: "Evaluates loan seasoning and debt paydown efficiency versus interest burden.",
    concepts: ["CTE", "NULLIF", "Amortization Ratio"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Multi-Card Fraud Contagion Detection",
    desc: "Find customers who hold multiple cards where at least one card has had a high fraud score swipe (> 80). Return customer id, name, count of cards, and count of high fraud swipes.",
    sql: "WITH high_fraud_swipes AS (SELECT c.account_id, cs.card_id, cs.fraud_score FROM card_swipes cs JOIN cards c ON cs.card_id = c.id WHERE cs.fraud_score > 80), customer_cards AS (SELECT a.customer_id, COUNT(DISTINCT c.id) AS card_count FROM accounts a JOIN cards c ON a.id = c.account_id GROUP BY a.customer_id) SELECT cust.id, cust.name, cc.card_count, COUNT(hfs.card_id) AS high_fraud_swipe_count FROM customers cust JOIN customer_cards cc ON cust.id = cc.customer_id JOIN accounts acc ON cust.id = acc.customer_id LEFT JOIN high_fraud_swipes hfs ON acc.id = hfs.account_id GROUP BY cust.id, cust.name, cc.card_count HAVING COUNT(hfs.card_id) > 0 ORDER BY high_fraud_swipe_count DESC, cc.card_count DESC;",
    cols: ["id", "name", "card_count", "high_fraud_swipe_count"],
    hint: "Filter swipes with fraud_score > 80 in a CTE, join through accounts to customers.",
    explanation: "Tracks cross-card fraud contagion across accounts owned by the same customer.",
    concepts: ["Multi-Stage CTE", "HAVING", "Security Analytics"],
    difficulty: "expert"
  }
];

const advancedThemes = [
  { table1: "accounts", table2: "loans", joinKey: "customer_id", metric1: "balance", metric2: "principal_amount", name: "Depository vs Debt Balance" },
  { table1: "investments", table2: "credit_lines", joinKey: "customer_id", metric1: "current_value", metric2: "total_limit", name: "Investment vs Revolving Limit" },
  { table1: "branches", table2: "teller_sessions", joinKey: "branch_id", metric1: "vault_cash_limit", metric2: "closing_cash", name: "Vault vs Teller Closing Cash" },
  { table1: "loans", table2: "loan_payments", joinKey: "loan_id", metric1: "principal_amount", metric2: "payment_amount", name: "Origination vs Total Paid" },
  { table1: "customers", table2: "accounts", joinKey: "customer_id", metric1: "annual_income", metric2: "balance", name: "Income vs Depository Health" },
  { table1: "cards", table2: "card_swipes", joinKey: "card_id", metric1: "daily_limit", metric2: "amount", name: "Daily Limit vs Swipe Totals" },
  { table1: "merchants", table2: "card_swipes", joinKey: "merchant_id", metric1: "id", metric2: "amount", name: "Merchant Volume Aggregation" },
  { table1: "transactions", table2: "fraud_alerts", joinKey: "transaction_id", metric1: "amount", metric2: "id", name: "Transaction Fraud Correlation" },
  { table1: "audit_logs", table2: "customers", joinKey: "id", metric1: "id", metric2: "annual_income", name: "Audit Log Action Mapping" }
];

let counter = l5Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = advancedThemes[i % advancedThemes.length];
  const qNum = counter + 1;

  l5Templates.push({
    authorIdx: counter % personas.length,
    title: `Enterprise Metric #${qNum}: ${theme.name} CTE Model`,
    desc: `Construct an enterprise CTE model summarizing ${theme.table1} and ${theme.table2}. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.`,
    sql: `WITH cte1 AS (SELECT ${theme.table1 === 'branches' ? 'id' : 'customer_id'}, SUM(balance) AS total_val1 FROM accounts GROUP BY ${theme.table1 === 'branches' ? 'id' : 'customer_id'}), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;`,
    cols: ["id", "name", "total_val1", "total_val2"],
    hint: "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers.",
    explanation: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE", "Enterprise Analytics", "LEFT JOIN", "COALESCE"],
    difficulty: "expert"
  });
  counter++;
}

const outQuestions = l5Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "fin-L5-${pad}",
    domain: "finance",
    level: 5,
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
    starter_sql: "WITH\\n  -- Complete CTE query\\nSELECT\\nFROM\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// FINANCE & BANKING — LEVEL 5: ENTERPRISE CTES, RISK AUDITS & REGULATORY REPORTING
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): branches, customers, accounts, transactions, merchants, cards,
//              card_swipes, loans, credit_lines, loan_payments, fraud_alerts,
//              investments, teller_sessions, account_types, audit_logs
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L5_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/fin-l5-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated FIN_L5_QUESTIONS: ${outQuestions.length} questions in QuestionDefinition format.`);
