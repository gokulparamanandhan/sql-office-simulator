// ============================================================================
// FINANCE & BANKING — LEVEL 5: ENTERPRISE CTES, RISK AUDITS & REGULATORY REPORTING
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): branches, customers, accounts, transactions, merchants, cards,
//              card_swipes, loans, credit_lines, loan_payments, fraud_alerts,
//              investments, teller_sessions, account_types, audit_logs
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L5_QUESTIONS: QuestionDefinition[] = [
  {
    id: "fin-L5-001",
    domain: "finance",
    level: 5,
    order: 1,
    difficulty: "expert",
    title: "Consolidated High-Risk Borrower Exposure Matrix",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Calculate total loan debt, credit line exposure, and deposit balances for all High Risk customers. Using a CTE, aggregate loans and credit lines per customer, then join accounts to show customer name, risk_rating, total_loan_debt, total_credit_limit, and total_deposit_balance.",
    context_notes: "Consolidates multi-product exposure across credit, lending, and depository accounts for high-risk profiles.",
    concepts: ["Multi-Stage CTE","LEFT JOIN","COALESCE","Enterprise Risk"],
    expected_columns: ["name","risk_rating","total_loan_debt","total_credit_limit","total_deposit_balance"],
    reference_sql: "WITH loan_cte AS (SELECT customer_id, SUM(principal_amount) AS total_loan_debt FROM loans GROUP BY customer_id), credit_cte AS (SELECT customer_id, SUM(total_limit) AS total_credit_limit FROM credit_lines GROUP BY customer_id), deposit_cte AS (SELECT customer_id, SUM(balance) AS total_deposit_balance FROM accounts GROUP BY customer_id) SELECT c.name, c.risk_rating, COALESCE(l.total_loan_debt, 0) AS total_loan_debt, COALESCE(cr.total_credit_limit, 0) AS total_credit_limit, COALESCE(d.total_deposit_balance, 0) AS total_deposit_balance FROM customers c LEFT JOIN loan_cte l ON c.id = l.customer_id LEFT JOIN credit_cte cr ON c.id = cr.customer_id LEFT JOIN deposit_cte d ON c.id = d.customer_id WHERE c.risk_rating = 'High Risk' ORDER BY total_loan_debt DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Build three CTEs for loans, credit lines, and accounts, then left join to customers filtering for 'High Risk'."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-002",
    domain: "finance",
    level: 5,
    order: 2,
    difficulty: "expert",
    title: "Branch Loan-to-Deposit Ratio (LDR) Analysis",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "For each branch, calculate the total active loan balances and total account deposits using CTEs, then compute the Loan-to-Deposit Ratio (total loans divided by total deposits). Output branch_name, city, total_loans, total_deposits, and loan_deposit_ratio.",
    context_notes: "Assesses banking liquidity and loan funding adequacy across branches using the regulatory LDR metric.",
    concepts: ["CTE","Liquidity Ratio","NULLIF","Financial Modeling"],
    expected_columns: ["branch_name","city","total_loans","total_deposits","loan_deposit_ratio"],
    reference_sql: "WITH branch_loans AS (SELECT branch_id, SUM(principal_amount) AS total_loans FROM loans GROUP BY branch_id), branch_deposits AS (SELECT branch_id, SUM(balance) AS total_deposits FROM accounts GROUP BY branch_id) SELECT b.branch_name, b.city, COALESCE(bl.total_loans, 0) AS total_loans, COALESCE(bd.total_deposits, 0) AS total_deposits, ROUND((COALESCE(bl.total_loans, 0) / NULLIF(bd.total_deposits, 0)), 4) AS loan_deposit_ratio FROM branches b LEFT JOIN branch_loans bl ON b.id = bl.branch_id LEFT JOIN branch_deposits bd ON b.id = bd.branch_id ORDER BY loan_deposit_ratio DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use CTEs for branch loan totals and branch deposit totals, using NULLIF to protect against division by zero."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-003",
    domain: "finance",
    level: 5,
    order: 3,
    difficulty: "expert",
    title: "Customer Net Wealth 360 View",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "We need a complete net worth calculation per customer. Compute total assets (deposits + investments) minus total liabilities (loans + used credit lines) using CTEs. Return customer id, name, total_assets, total_liabilities, and net_worth.",
    context_notes: "Builds a full Customer 360 balance sheet view showing total assets, liabilities, and net worth.",
    concepts: ["Multi-Stage CTE","Balance Sheet Modeling","Customer 360"],
    expected_columns: ["id","name","total_assets","total_liabilities","net_worth"],
    reference_sql: "WITH deposits AS (SELECT customer_id, SUM(balance) AS dep_sum FROM accounts GROUP BY customer_id), invest AS (SELECT customer_id, SUM(current_value) AS inv_sum FROM investments GROUP BY customer_id), debt_loans AS (SELECT customer_id, SUM(principal_amount) AS loan_sum FROM loans GROUP BY customer_id), debt_credit AS (SELECT customer_id, SUM(used_amount) AS cred_sum FROM credit_lines GROUP BY customer_id) SELECT c.id, c.name, (COALESCE(d.dep_sum, 0) + COALESCE(i.inv_sum, 0)) AS total_assets, (COALESCE(l.loan_sum, 0) + COALESCE(cr.cred_sum, 0)) AS total_liabilities, ((COALESCE(d.dep_sum, 0) + COALESCE(i.inv_sum, 0)) - (COALESCE(l.loan_sum, 0) + COALESCE(cr.cred_sum, 0))) AS net_worth FROM customers c LEFT JOIN deposits d ON c.id = d.customer_id LEFT JOIN invest i ON c.id = i.customer_id LEFT JOIN debt_loans l ON c.id = l.customer_id LEFT JOIN debt_credit cr ON c.id = cr.customer_id ORDER BY net_worth DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Aggregate deposits, investments, loans, and credit lines into separate CTEs and join them on customer_id."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-004",
    domain: "finance",
    level: 5,
    order: 4,
    difficulty: "expert",
    title: "Suspicious Merchant Fraud Velocity & Chargeback Exposure",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Identify merchants associated with multiple high-severity fraud alerts. Aggregate fraud alerts through transactions, cards, and card_swipes. Show merchant name, category, total_alerts, and total_flagged_swipe_volume.",
    context_notes: "Detects rogue merchant terminals and elevated acquiring risk under AML/fraud oversight.",
    concepts: ["Multi-Table CTE","Fraud Analysis","Merchant Risk"],
    expected_columns: ["name","category","alert_count","flagged_volume"],
    reference_sql: "WITH alert_txs AS (SELECT t.id AS transaction_id, fa.severity FROM fraud_alerts fa JOIN transactions t ON fa.transaction_id = t.id WHERE fa.severity = 'High'), flagged_merchants AS (SELECT cs.merchant_id, COUNT(DISTINCT at.transaction_id) AS alert_count, SUM(cs.amount) AS flagged_volume FROM card_swipes cs JOIN cards c ON cs.card_id = c.id JOIN transactions t ON t.account_id = c.account_id JOIN alert_txs at ON at.transaction_id = t.id GROUP BY cs.merchant_id) SELECT m.name, m.category, fm.alert_count, fm.flagged_volume FROM merchants m JOIN flagged_merchants fm ON m.id = fm.merchant_id ORDER BY fm.alert_count DESC, fm.flagged_volume DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Isolate high severity alerts in a CTE, link to card swipes, and join to merchants."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-005",
    domain: "finance",
    level: 5,
    order: 5,
    difficulty: "expert",
    title: "Branch Cash Vault Discrepancy & Teller Variance Audit",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Calculate total closing cash recorded by tellers per branch and compare it with the branch vault_cash_limit. Show branch_name, vault_cash_limit, total_teller_closing_cash, and vault_utilization_pct.",
    context_notes: "Monitors branch cash capacity against insurer-mandated vault limits.",
    concepts: ["CTE","Cash Operations","Vault Auditing"],
    expected_columns: ["branch_name","vault_cash_limit","total_teller_closing_cash","vault_utilization_pct"],
    reference_sql: "WITH teller_totals AS (SELECT branch_id, SUM(closing_cash) AS total_closing_cash FROM teller_sessions GROUP BY branch_id) SELECT b.branch_name, b.vault_cash_limit, COALESCE(tt.total_closing_cash, 0) AS total_teller_closing_cash, ROUND((COALESCE(tt.total_closing_cash, 0) / b.vault_cash_limit * 100), 2) AS vault_utilization_pct FROM branches b LEFT JOIN teller_totals tt ON b.id = tt.branch_id ORDER BY vault_utilization_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a CTE to summarize closing cash by branch_id from teller_sessions."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-006",
    domain: "finance",
    level: 5,
    order: 6,
    difficulty: "expert",
    title: "Audit Trail of Privileged Administrative Actions",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Cross-reference administrative audit logs with customer risk profiles. Find all actions performed in audit_logs where the entity_type relates to customers or accounts, listing performed_by, entity_type, action, and total actions performed by that user.",
    context_notes: "Audits compliance by tracking user system action frequencies for internal security reviews.",
    concepts: ["Audit Logs","Window Function in CTE","Compliance"],
    expected_columns: ["performed_by","entity_type","action","user_action_count"],
    reference_sql: "WITH user_audit AS (SELECT performed_by, entity_type, action, COUNT(*) OVER (PARTITION BY performed_by) AS user_action_count FROM audit_logs) SELECT DISTINCT performed_by, entity_type, action, user_action_count FROM user_audit ORDER BY user_action_count DESC, performed_by;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Partition by performed_by in a CTE or window function over audit_logs."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-007",
    domain: "finance",
    level: 5,
    order: 7,
    difficulty: "expert",
    title: "Interest Income Yield and Net Interest Margin by Branch",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Determine total interest generated from loans alongside loan balances per branch. Using CTEs, compute branch_name, total_principal, estimated_annual_interest (sum of principal_amount * interest_rate / 100), and weighted_average_rate.",
    context_notes: "Analyzes lending portfolio yields and profit margins across regional branches.",
    concepts: ["CTE","Weighted Average","Yield Analysis"],
    expected_columns: ["branch_name","total_principal","annual_interest","weighted_average_rate"],
    reference_sql: "WITH loan_stats AS (SELECT branch_id, SUM(principal_amount) AS total_principal, SUM(principal_amount * interest_rate / 100.0) AS annual_interest FROM loans GROUP BY branch_id) SELECT b.branch_name, ls.total_principal, ls.annual_interest, ROUND((ls.annual_interest / ls.total_principal * 100.0), 2) AS weighted_average_rate FROM branches b JOIN loan_stats ls ON b.id = ls.branch_id ORDER BY ls.annual_interest DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Calculate sum of principal and sum of principal * interest_rate / 100 in a CTE, then derive weighted average rate."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-008",
    domain: "finance",
    level: 5,
    order: 8,
    difficulty: "expert",
    title: "Investment Portfolio Asset Allocation Breakdown",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "For each customer having investment portfolios, display customer_id, total portfolio current_value, and the percentage this represents against the grand total of all bank investments.",
    context_notes: "Identifies top private wealth relationships by market share of total assets under management.",
    concepts: ["CTE","CROSS JOIN","AUM Market Share"],
    expected_columns: ["customer_id","cust_total_invested","pct_of_bank_investments"],
    reference_sql: "WITH grand_total AS (SELECT SUM(current_value) AS bank_total_investments FROM investments), customer_totals AS (SELECT customer_id, SUM(current_value) AS cust_total_invested FROM investments GROUP BY customer_id) SELECT ct.customer_id, ct.cust_total_invested, ROUND((ct.cust_total_invested / gt.bank_total_investments * 100.0), 4) AS pct_of_bank_investments FROM customer_totals ct CROSS JOIN grand_total gt ORDER BY ct.cust_total_invested DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a cross join with a CTE containing the bank-wide total investment sum."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-009",
    domain: "finance",
    level: 5,
    order: 9,
    difficulty: "expert",
    title: "Amortization Health: Principal vs Interest Payment Ratios",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Analyze customer debt retirement velocity. Using a CTE, aggregate loan payments to compute total principal paid vs total interest paid per loan. Output loan_id, total_principal_paid, total_interest_paid, and principal_to_interest_ratio.",
    context_notes: "Evaluates loan seasoning and debt paydown efficiency versus interest burden.",
    concepts: ["CTE","NULLIF","Amortization Ratio"],
    expected_columns: ["loan_id","total_principal_paid","total_interest_paid","principal_to_interest_ratio"],
    reference_sql: "WITH payment_agg AS (SELECT loan_id, SUM(principal_portion) AS total_principal_paid, SUM(interest_portion) AS total_interest_paid FROM loan_payments GROUP BY loan_id) SELECT loan_id, total_principal_paid, total_interest_paid, ROUND((total_principal_paid / NULLIF(total_interest_paid, 0)), 2) AS principal_to_interest_ratio FROM payment_agg ORDER BY principal_to_interest_ratio DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Aggregate principal and interest portions in a CTE and compute their ratio using NULLIF."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-010",
    domain: "finance",
    level: 5,
    order: 10,
    difficulty: "expert",
    title: "Multi-Card Fraud Contagion Detection",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Find customers who hold multiple cards where at least one card has had a high fraud score swipe (> 80). Return customer id, name, count of cards, and count of high fraud swipes.",
    context_notes: "Tracks cross-card fraud contagion across accounts owned by the same customer.",
    concepts: ["Multi-Stage CTE","HAVING","Security Analytics"],
    expected_columns: ["id","name","card_count","high_fraud_swipe_count"],
    reference_sql: "WITH high_fraud_swipes AS (SELECT c.account_id, cs.card_id, cs.fraud_score FROM card_swipes cs JOIN cards c ON cs.card_id = c.id WHERE cs.fraud_score > 80), customer_cards AS (SELECT a.customer_id, COUNT(DISTINCT c.id) AS card_count FROM accounts a JOIN cards c ON a.id = c.account_id GROUP BY a.customer_id) SELECT cust.id, cust.name, cc.card_count, COUNT(hfs.card_id) AS high_fraud_swipe_count FROM customers cust JOIN customer_cards cc ON cust.id = cc.customer_id JOIN accounts acc ON cust.id = acc.customer_id LEFT JOIN high_fraud_swipes hfs ON acc.id = hfs.account_id GROUP BY cust.id, cust.name, cc.card_count HAVING COUNT(hfs.card_id) > 0 ORDER BY high_fraud_swipe_count DESC, cc.card_count DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter swipes with fraud_score > 80 in a CTE, join through accounts to customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-011",
    domain: "finance",
    level: 5,
    order: 11,
    difficulty: "expert",
    title: "Enterprise Metric #11: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-012",
    domain: "finance",
    level: 5,
    order: 12,
    difficulty: "expert",
    title: "Enterprise Metric #12: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-013",
    domain: "finance",
    level: 5,
    order: 13,
    difficulty: "expert",
    title: "Enterprise Metric #13: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-014",
    domain: "finance",
    level: 5,
    order: 14,
    difficulty: "expert",
    title: "Enterprise Metric #14: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-015",
    domain: "finance",
    level: 5,
    order: 15,
    difficulty: "expert",
    title: "Enterprise Metric #15: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-016",
    domain: "finance",
    level: 5,
    order: 16,
    difficulty: "expert",
    title: "Enterprise Metric #16: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-017",
    domain: "finance",
    level: 5,
    order: 17,
    difficulty: "expert",
    title: "Enterprise Metric #17: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-018",
    domain: "finance",
    level: 5,
    order: 18,
    difficulty: "expert",
    title: "Enterprise Metric #18: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-019",
    domain: "finance",
    level: 5,
    order: 19,
    difficulty: "expert",
    title: "Enterprise Metric #19: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-020",
    domain: "finance",
    level: 5,
    order: 20,
    difficulty: "expert",
    title: "Enterprise Metric #20: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-021",
    domain: "finance",
    level: 5,
    order: 21,
    difficulty: "expert",
    title: "Enterprise Metric #21: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-022",
    domain: "finance",
    level: 5,
    order: 22,
    difficulty: "expert",
    title: "Enterprise Metric #22: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-023",
    domain: "finance",
    level: 5,
    order: 23,
    difficulty: "expert",
    title: "Enterprise Metric #23: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-024",
    domain: "finance",
    level: 5,
    order: 24,
    difficulty: "expert",
    title: "Enterprise Metric #24: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-025",
    domain: "finance",
    level: 5,
    order: 25,
    difficulty: "expert",
    title: "Enterprise Metric #25: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-026",
    domain: "finance",
    level: 5,
    order: 26,
    difficulty: "expert",
    title: "Enterprise Metric #26: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-027",
    domain: "finance",
    level: 5,
    order: 27,
    difficulty: "expert",
    title: "Enterprise Metric #27: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-028",
    domain: "finance",
    level: 5,
    order: 28,
    difficulty: "expert",
    title: "Enterprise Metric #28: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-029",
    domain: "finance",
    level: 5,
    order: 29,
    difficulty: "expert",
    title: "Enterprise Metric #29: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-030",
    domain: "finance",
    level: 5,
    order: 30,
    difficulty: "expert",
    title: "Enterprise Metric #30: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-031",
    domain: "finance",
    level: 5,
    order: 31,
    difficulty: "expert",
    title: "Enterprise Metric #31: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-032",
    domain: "finance",
    level: 5,
    order: 32,
    difficulty: "expert",
    title: "Enterprise Metric #32: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-033",
    domain: "finance",
    level: 5,
    order: 33,
    difficulty: "expert",
    title: "Enterprise Metric #33: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-034",
    domain: "finance",
    level: 5,
    order: 34,
    difficulty: "expert",
    title: "Enterprise Metric #34: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-035",
    domain: "finance",
    level: 5,
    order: 35,
    difficulty: "expert",
    title: "Enterprise Metric #35: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-036",
    domain: "finance",
    level: 5,
    order: 36,
    difficulty: "expert",
    title: "Enterprise Metric #36: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-037",
    domain: "finance",
    level: 5,
    order: 37,
    difficulty: "expert",
    title: "Enterprise Metric #37: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-038",
    domain: "finance",
    level: 5,
    order: 38,
    difficulty: "expert",
    title: "Enterprise Metric #38: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-039",
    domain: "finance",
    level: 5,
    order: 39,
    difficulty: "expert",
    title: "Enterprise Metric #39: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-040",
    domain: "finance",
    level: 5,
    order: 40,
    difficulty: "expert",
    title: "Enterprise Metric #40: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-041",
    domain: "finance",
    level: 5,
    order: 41,
    difficulty: "expert",
    title: "Enterprise Metric #41: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-042",
    domain: "finance",
    level: 5,
    order: 42,
    difficulty: "expert",
    title: "Enterprise Metric #42: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-043",
    domain: "finance",
    level: 5,
    order: 43,
    difficulty: "expert",
    title: "Enterprise Metric #43: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-044",
    domain: "finance",
    level: 5,
    order: 44,
    difficulty: "expert",
    title: "Enterprise Metric #44: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-045",
    domain: "finance",
    level: 5,
    order: 45,
    difficulty: "expert",
    title: "Enterprise Metric #45: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-046",
    domain: "finance",
    level: 5,
    order: 46,
    difficulty: "expert",
    title: "Enterprise Metric #46: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-047",
    domain: "finance",
    level: 5,
    order: 47,
    difficulty: "expert",
    title: "Enterprise Metric #47: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-048",
    domain: "finance",
    level: 5,
    order: 48,
    difficulty: "expert",
    title: "Enterprise Metric #48: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-049",
    domain: "finance",
    level: 5,
    order: 49,
    difficulty: "expert",
    title: "Enterprise Metric #49: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-050",
    domain: "finance",
    level: 5,
    order: 50,
    difficulty: "expert",
    title: "Enterprise Metric #50: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-051",
    domain: "finance",
    level: 5,
    order: 51,
    difficulty: "expert",
    title: "Enterprise Metric #51: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-052",
    domain: "finance",
    level: 5,
    order: 52,
    difficulty: "expert",
    title: "Enterprise Metric #52: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-053",
    domain: "finance",
    level: 5,
    order: 53,
    difficulty: "expert",
    title: "Enterprise Metric #53: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-054",
    domain: "finance",
    level: 5,
    order: 54,
    difficulty: "expert",
    title: "Enterprise Metric #54: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-055",
    domain: "finance",
    level: 5,
    order: 55,
    difficulty: "expert",
    title: "Enterprise Metric #55: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-056",
    domain: "finance",
    level: 5,
    order: 56,
    difficulty: "expert",
    title: "Enterprise Metric #56: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-057",
    domain: "finance",
    level: 5,
    order: 57,
    difficulty: "expert",
    title: "Enterprise Metric #57: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-058",
    domain: "finance",
    level: 5,
    order: 58,
    difficulty: "expert",
    title: "Enterprise Metric #58: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-059",
    domain: "finance",
    level: 5,
    order: 59,
    difficulty: "expert",
    title: "Enterprise Metric #59: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-060",
    domain: "finance",
    level: 5,
    order: 60,
    difficulty: "expert",
    title: "Enterprise Metric #60: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-061",
    domain: "finance",
    level: 5,
    order: 61,
    difficulty: "expert",
    title: "Enterprise Metric #61: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-062",
    domain: "finance",
    level: 5,
    order: 62,
    difficulty: "expert",
    title: "Enterprise Metric #62: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-063",
    domain: "finance",
    level: 5,
    order: 63,
    difficulty: "expert",
    title: "Enterprise Metric #63: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-064",
    domain: "finance",
    level: 5,
    order: 64,
    difficulty: "expert",
    title: "Enterprise Metric #64: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-065",
    domain: "finance",
    level: 5,
    order: 65,
    difficulty: "expert",
    title: "Enterprise Metric #65: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-066",
    domain: "finance",
    level: 5,
    order: 66,
    difficulty: "expert",
    title: "Enterprise Metric #66: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-067",
    domain: "finance",
    level: 5,
    order: 67,
    difficulty: "expert",
    title: "Enterprise Metric #67: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-068",
    domain: "finance",
    level: 5,
    order: 68,
    difficulty: "expert",
    title: "Enterprise Metric #68: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-069",
    domain: "finance",
    level: 5,
    order: 69,
    difficulty: "expert",
    title: "Enterprise Metric #69: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-070",
    domain: "finance",
    level: 5,
    order: 70,
    difficulty: "expert",
    title: "Enterprise Metric #70: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-071",
    domain: "finance",
    level: 5,
    order: 71,
    difficulty: "expert",
    title: "Enterprise Metric #71: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-072",
    domain: "finance",
    level: 5,
    order: 72,
    difficulty: "expert",
    title: "Enterprise Metric #72: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-073",
    domain: "finance",
    level: 5,
    order: 73,
    difficulty: "expert",
    title: "Enterprise Metric #73: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-074",
    domain: "finance",
    level: 5,
    order: 74,
    difficulty: "expert",
    title: "Enterprise Metric #74: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-075",
    domain: "finance",
    level: 5,
    order: 75,
    difficulty: "expert",
    title: "Enterprise Metric #75: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-076",
    domain: "finance",
    level: 5,
    order: 76,
    difficulty: "expert",
    title: "Enterprise Metric #76: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-077",
    domain: "finance",
    level: 5,
    order: 77,
    difficulty: "expert",
    title: "Enterprise Metric #77: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-078",
    domain: "finance",
    level: 5,
    order: 78,
    difficulty: "expert",
    title: "Enterprise Metric #78: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-079",
    domain: "finance",
    level: 5,
    order: 79,
    difficulty: "expert",
    title: "Enterprise Metric #79: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-080",
    domain: "finance",
    level: 5,
    order: 80,
    difficulty: "expert",
    title: "Enterprise Metric #80: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-081",
    domain: "finance",
    level: 5,
    order: 81,
    difficulty: "expert",
    title: "Enterprise Metric #81: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-082",
    domain: "finance",
    level: 5,
    order: 82,
    difficulty: "expert",
    title: "Enterprise Metric #82: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-083",
    domain: "finance",
    level: 5,
    order: 83,
    difficulty: "expert",
    title: "Enterprise Metric #83: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-084",
    domain: "finance",
    level: 5,
    order: 84,
    difficulty: "expert",
    title: "Enterprise Metric #84: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-085",
    domain: "finance",
    level: 5,
    order: 85,
    difficulty: "expert",
    title: "Enterprise Metric #85: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-086",
    domain: "finance",
    level: 5,
    order: 86,
    difficulty: "expert",
    title: "Enterprise Metric #86: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-087",
    domain: "finance",
    level: 5,
    order: 87,
    difficulty: "expert",
    title: "Enterprise Metric #87: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-088",
    domain: "finance",
    level: 5,
    order: 88,
    difficulty: "expert",
    title: "Enterprise Metric #88: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-089",
    domain: "finance",
    level: 5,
    order: 89,
    difficulty: "expert",
    title: "Enterprise Metric #89: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-090",
    domain: "finance",
    level: 5,
    order: 90,
    difficulty: "expert",
    title: "Enterprise Metric #90: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-091",
    domain: "finance",
    level: 5,
    order: 91,
    difficulty: "expert",
    title: "Enterprise Metric #91: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-092",
    domain: "finance",
    level: 5,
    order: 92,
    difficulty: "expert",
    title: "Enterprise Metric #92: Depository vs Debt Balance CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing accounts and loans. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-093",
    domain: "finance",
    level: 5,
    order: 93,
    difficulty: "expert",
    title: "Enterprise Metric #93: Investment vs Revolving Limit CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing investments and credit_lines. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-094",
    domain: "finance",
    level: 5,
    order: 94,
    difficulty: "expert",
    title: "Enterprise Metric #94: Vault vs Teller Closing Cash CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing branches and teller_sessions. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT id, SUM(balance) AS total_val1 FROM accounts GROUP BY id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-095",
    domain: "finance",
    level: 5,
    order: 95,
    difficulty: "expert",
    title: "Enterprise Metric #95: Origination vs Total Paid CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing loans and loan_payments. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-096",
    domain: "finance",
    level: 5,
    order: 96,
    difficulty: "expert",
    title: "Enterprise Metric #96: Income vs Depository Health CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing customers and accounts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-097",
    domain: "finance",
    level: 5,
    order: 97,
    difficulty: "expert",
    title: "Enterprise Metric #97: Daily Limit vs Swipe Totals CTE Model",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Construct an enterprise CTE model summarizing cards and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-098",
    domain: "finance",
    level: 5,
    order: 98,
    difficulty: "expert",
    title: "Enterprise Metric #98: Merchant Volume Aggregation CTE Model",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Construct an enterprise CTE model summarizing merchants and card_swipes. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-099",
    domain: "finance",
    level: 5,
    order: 99,
    difficulty: "expert",
    title: "Enterprise Metric #99: Transaction Fraud Correlation CTE Model",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Construct an enterprise CTE model summarizing transactions and fraud_alerts. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  },
  {
    id: "fin-L5-100",
    domain: "finance",
    level: 5,
    order: 100,
    difficulty: "expert",
    title: "Enterprise Metric #100: Audit Log Action Mapping CTE Model",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Construct an enterprise CTE model summarizing audit_logs and customers. Aggregate financial totals per customer/branch and rank them in descending order of aggregate volume.",
    context_notes: "Performs multi-entity cross-table aggregation using enterprise Common Table Expressions.",
    concepts: ["CTE","Enterprise Analytics","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_val1","total_val2"],
    reference_sql: "WITH cte1 AS (SELECT customer_id, SUM(balance) AS total_val1 FROM accounts GROUP BY customer_id), cte2 AS (SELECT customer_id, SUM(principal_amount) AS total_val2 FROM loans GROUP BY customer_id) SELECT c.id, c.name, COALESCE(cte1.total_val1, 0) AS total_val1, COALESCE(cte2.total_val2, 0) AS total_val2 FROM customers c LEFT JOIN cte1 ON c.id = cte1.customer_id LEFT JOIN cte2 ON c.id = cte2.customer_id ORDER BY total_val1 DESC, c.id LIMIT 25;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...), cte2 AS (...)) and join onto customers."
    ],
    starter_sql: "WITH\n  -- Complete CTE query\nSELECT\nFROM\n;"
  }
];
