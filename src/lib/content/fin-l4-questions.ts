// ============================================================================
// FINANCE & BANKING — LEVEL 4: WINDOW FUNCTIONS & ANALYTIC OPERATORS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): branches, customers, accounts, transactions, merchants, cards,
//              card_swipes, loans, credit_lines, loan_payments, fraud_alerts,
//              investments, teller_sessions, account_types
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L4_QUESTIONS: QuestionDefinition[] = [
  {
    id: "fin-L4-001",
    domain: "finance",
    level: 4,
    order: 1,
    difficulty: "hard",
    title: "Cumulative Loan Originations by Branch",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Calculate a cumulative running total of loan principal originated within each branch over time, showing loan ID, branch ID, principal amount, and running total ordered by loan ID.",
    context_notes: "Computes cumulative loan disbursement per branch using an ordered window sum.",
    concepts: ["Window Functions","SUM() OVER","PARTITION BY"],
    expected_columns: ["id","branch_id","principal_amount","running_principal_total"],
    reference_sql: "SELECT id, branch_id, principal_amount, SUM(principal_amount) OVER (PARTITION BY branch_id ORDER BY id) AS running_principal_total FROM loans ORDER BY branch_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(principal_amount) OVER (PARTITION BY branch_id ORDER BY id) to compute running totals."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-002",
    domain: "finance",
    level: 4,
    order: 2,
    difficulty: "hard",
    title: "Transaction Flow Running Balances",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "We need an audit trail of transaction velocity per account. Show transaction id, account_id, amount, and the running cumulative transaction amount ordered by transaction id.",
    context_notes: "Tracks money movement progress per account over chronological transaction entries.",
    concepts: ["Window Functions","SUM() OVER","Audit Trail"],
    expected_columns: ["id","account_id","amount","cumulative_amount"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_amount FROM transactions ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Partition by account_id and order by id inside the SUM() window function."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-003",
    domain: "finance",
    level: 4,
    order: 3,
    difficulty: "hard",
    title: "Teller Session Cash Discrepancy Ranking",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Rank teller sessions within each branch based on closing cash balance in descending order. Output branch_id, teller_name, closing_cash, and rank.",
    context_notes: "Identifies top cash handling sessions across branches using RANK().",
    concepts: ["Window Functions","RANK()","Cash Management"],
    expected_columns: ["branch_id","teller_name","closing_cash","cash_rank"],
    reference_sql: "SELECT branch_id, teller_name, closing_cash, RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC) AS cash_rank FROM teller_sessions ORDER BY branch_id, cash_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-004",
    domain: "finance",
    level: 4,
    order: 4,
    difficulty: "hard",
    title: "High-Net-Worth Portfolio Quartiles",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Divide customer investment portfolios into 4 quartiles based on current value. Return customer_id, portfolio_type, current_value, and the quartile (1 to 4).",
    context_notes: "Segments customer portfolios into 4 wealth tiers using NTILE.",
    concepts: ["Window Functions","NTILE()","Wealth Segmentation"],
    expected_columns: ["customer_id","portfolio_type","current_value","wealth_quartile"],
    reference_sql: "SELECT customer_id, portfolio_type, current_value, NTILE(4) OVER (ORDER BY current_value DESC) AS wealth_quartile FROM investments ORDER BY wealth_quartile, current_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use NTILE(4) OVER (ORDER BY current_value DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-005",
    domain: "finance",
    level: 4,
    order: 5,
    difficulty: "hard",
    title: "Loan Payment Principal Lag Analysis",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "For each loan, compare the current payment's principal portion with the previous payment's principal portion. Show loan_id, payment_date, principal_portion, and prior principal portion.",
    context_notes: "Analyzes principal amortization trajectories by comparing consecutive loan payments.",
    concepts: ["Window Functions","LAG()","Amortization"],
    expected_columns: ["loan_id","payment_date","principal_portion","prev_principal_portion"],
    reference_sql: "SELECT loan_id, payment_date, principal_portion, LAG(principal_portion, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS prev_principal_portion FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Utilize LAG(principal_portion, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-006",
    domain: "finance",
    level: 4,
    order: 6,
    difficulty: "hard",
    title: "Card Swipe Fraud Score Jump vs Prior Swipe",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Inspect fraud escalation on cards. Return card_id, transaction_date, fraud_score, and the previous swipe fraud_score for that card.",
    context_notes: "Detects sudden jumps in fraud risk markers across successive card swipes.",
    concepts: ["Window Functions","LAG()","Fraud Detection"],
    expected_columns: ["card_id","transaction_date","fraud_score","prev_fraud_score"],
    reference_sql: "SELECT card_id, transaction_date, fraud_score, LAG(fraud_score, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id) AS prev_fraud_score FROM card_swipes ORDER BY card_id, transaction_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LAG(fraud_score, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-007",
    domain: "finance",
    level: 4,
    order: 7,
    difficulty: "hard",
    title: "Branch Vault Cash Limit vs Regional Average",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Show branch_name, state, vault_cash_limit, and the average vault cash limit for all branches in that state.",
    context_notes: "Benchmarks branch cash capacity against statewide regional peers.",
    concepts: ["Window Functions","AVG() OVER","Regional Analytics"],
    expected_columns: ["branch_name","state","vault_cash_limit","state_avg_vault_limit"],
    reference_sql: "SELECT branch_name, state, vault_cash_limit, AVG(vault_cash_limit) OVER (PARTITION BY state) AS state_avg_vault_limit FROM branches ORDER BY state, vault_cash_limit DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use AVG(vault_cash_limit) OVER (PARTITION BY state)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-008",
    domain: "finance",
    level: 4,
    order: 8,
    difficulty: "hard",
    title: "Top 3 Largest Loans by Loan Type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Find the top 3 highest principal loans for each loan type. Display loan_type, id, customer_id, principal_amount, and rank.",
    context_notes: "Ranks top loan commitments within each debt product category.",
    concepts: ["Window Functions","DENSE_RANK()","Subqueries"],
    expected_columns: ["loan_type","id","customer_id","principal_amount","rnk"],
    reference_sql: "SELECT loan_type, id, customer_id, principal_amount, rnk FROM (SELECT loan_type, id, customer_id, principal_amount, DENSE_RANK() OVER (PARTITION BY loan_type ORDER BY principal_amount DESC) AS rnk FROM loans) sub WHERE rnk <= 3 ORDER BY loan_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter on DENSE_RANK() <= 3 within a subquery."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-009",
    domain: "finance",
    level: 4,
    order: 9,
    difficulty: "hard",
    title: "Customer Account Balance Distribution Ranking",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Rank accounts by balance within their account type. Display account_type, id, customer_id, balance, and row number.",
    context_notes: "Generates sequential ranking of deposit holdings partitioned by account type.",
    concepts: ["Window Functions","ROW_NUMBER()","Deposit Analysis"],
    expected_columns: ["account_type","id","customer_id","balance","acct_rank"],
    reference_sql: "SELECT account_type, id, customer_id, balance, ROW_NUMBER() OVER (PARTITION BY account_type ORDER BY balance DESC) AS acct_rank FROM accounts ORDER BY account_type, acct_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ROW_NUMBER() OVER (PARTITION BY account_type ORDER BY balance DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-010",
    domain: "finance",
    level: 4,
    order: 10,
    difficulty: "hard",
    title: "Credit Line Utilization vs Customer Risk Peer Average",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compare each credit line's used_amount against the average used_amount of customers sharing the same risk rating.",
    context_notes: "Evaluates revolving credit exposure relative to credit risk peer cohorts.",
    concepts: ["Window Functions","JOIN","Credit Risk"],
    expected_columns: ["id","customer_id","risk_rating","used_amount","peer_avg_used"],
    reference_sql: "SELECT cl.id, cl.customer_id, c.risk_rating, cl.used_amount, AVG(cl.used_amount) OVER (PARTITION BY c.risk_rating) AS peer_avg_used FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id ORDER BY c.risk_rating, cl.used_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join credit_lines to customers, then compute AVG(cl.used_amount) OVER (PARTITION BY c.risk_rating)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-011",
    domain: "finance",
    level: 4,
    order: 11,
    difficulty: "hard",
    title: "ACCOUNTS: Running Total by account type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute the cumulative running total of balance partitioned by account_type from accounts, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on accounts using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","accounts"],
    expected_columns: ["id","account_type","balance","running_balance"],
    reference_sql: "SELECT id, account_type, balance, SUM(balance) OVER (PARTITION BY account_type ORDER BY id, id) AS running_balance FROM accounts ORDER BY account_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-012",
    domain: "finance",
    level: 4,
    order: 12,
    difficulty: "hard",
    title: "ACCOUNTS: Rank by Magnitude by account type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Rank records in accounts based on balance in descending order within each account_type.",
    context_notes: "Executes high-grade financial analytics on accounts using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","accounts"],
    expected_columns: ["id","account_type","balance","rnk"],
    reference_sql: "SELECT id, account_type, balance, RANK() OVER (PARTITION BY account_type ORDER BY balance DESC) AS rnk FROM accounts ORDER BY account_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-013",
    domain: "finance",
    level: 4,
    order: 13,
    difficulty: "hard",
    title: "ACCOUNTS: Dense Rank by Magnitude by account type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Calculate the dense ranking of balance within each account_type grouping from accounts.",
    context_notes: "Executes high-grade financial analytics on accounts using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","accounts"],
    expected_columns: ["id","account_type","balance","dense_rnk"],
    reference_sql: "SELECT id, account_type, balance, DENSE_RANK() OVER (PARTITION BY account_type ORDER BY balance DESC) AS dense_rnk FROM accounts ORDER BY account_type, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-014",
    domain: "finance",
    level: 4,
    order: 14,
    difficulty: "hard",
    title: "ACCOUNTS: Previous Record Lag Comparison by account type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Retrieve the immediately preceding balance for each account_type record in accounts to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on accounts using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","accounts"],
    expected_columns: ["id","account_type","balance","prev_balance"],
    reference_sql: "SELECT id, account_type, balance, LAG(balance, 1) OVER (PARTITION BY account_type ORDER BY id, id) AS prev_balance FROM accounts ORDER BY account_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-015",
    domain: "finance",
    level: 4,
    order: 15,
    difficulty: "hard",
    title: "ACCOUNTS: Next Record Lead Projection by account type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compare current balance with the upcoming next record's balance within each account_type in accounts.",
    context_notes: "Executes high-grade financial analytics on accounts using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","accounts"],
    expected_columns: ["id","account_type","balance","next_balance"],
    reference_sql: "SELECT id, account_type, balance, LEAD(balance, 1) OVER (PARTITION BY account_type ORDER BY id, id) AS next_balance FROM accounts ORDER BY account_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-016",
    domain: "finance",
    level: 4,
    order: 16,
    difficulty: "hard",
    title: "ACCOUNTS: Partition Moving Average by account type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Benchmark individual balance against the overall average balance across the same account_type in accounts.",
    context_notes: "Executes high-grade financial analytics on accounts using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","accounts"],
    expected_columns: ["id","account_type","balance","avg_balance_cohort"],
    reference_sql: "SELECT id, account_type, balance, AVG(balance) OVER (PARTITION BY account_type) AS avg_balance_cohort FROM accounts ORDER BY account_type, balance DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-017",
    domain: "finance",
    level: 4,
    order: 17,
    difficulty: "hard",
    title: "ACCOUNTS: Quartile Distribution by account type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Segment accounts into 4 equal quartiles based on balance within each account_type segment.",
    context_notes: "Executes high-grade financial analytics on accounts using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","accounts"],
    expected_columns: ["id","account_type","balance","quartile"],
    reference_sql: "SELECT id, account_type, balance, NTILE(4) OVER (PARTITION BY account_type ORDER BY balance DESC) AS quartile FROM accounts ORDER BY account_type, quartile, balance DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-018",
    domain: "finance",
    level: 4,
    order: 18,
    difficulty: "hard",
    title: "LOANS: Running Total by loan type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute the cumulative running total of principal_amount partitioned by loan_type from loans, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on loans using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","loans"],
    expected_columns: ["id","loan_type","principal_amount","running_principal_amount"],
    reference_sql: "SELECT id, loan_type, principal_amount, SUM(principal_amount) OVER (PARTITION BY loan_type ORDER BY id, id) AS running_principal_amount FROM loans ORDER BY loan_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-019",
    domain: "finance",
    level: 4,
    order: 19,
    difficulty: "hard",
    title: "LOANS: Rank by Magnitude by loan type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Rank records in loans based on principal_amount in descending order within each loan_type.",
    context_notes: "Executes high-grade financial analytics on loans using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","loans"],
    expected_columns: ["id","loan_type","principal_amount","rnk"],
    reference_sql: "SELECT id, loan_type, principal_amount, RANK() OVER (PARTITION BY loan_type ORDER BY principal_amount DESC) AS rnk FROM loans ORDER BY loan_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-020",
    domain: "finance",
    level: 4,
    order: 20,
    difficulty: "hard",
    title: "LOANS: Dense Rank by Magnitude by loan type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Calculate the dense ranking of principal_amount within each loan_type grouping from loans.",
    context_notes: "Executes high-grade financial analytics on loans using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","loans"],
    expected_columns: ["id","loan_type","principal_amount","dense_rnk"],
    reference_sql: "SELECT id, loan_type, principal_amount, DENSE_RANK() OVER (PARTITION BY loan_type ORDER BY principal_amount DESC) AS dense_rnk FROM loans ORDER BY loan_type, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-021",
    domain: "finance",
    level: 4,
    order: 21,
    difficulty: "hard",
    title: "LOANS: Previous Record Lag Comparison by loan type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Retrieve the immediately preceding principal_amount for each loan_type record in loans to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on loans using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","loans"],
    expected_columns: ["id","loan_type","principal_amount","prev_principal_amount"],
    reference_sql: "SELECT id, loan_type, principal_amount, LAG(principal_amount, 1) OVER (PARTITION BY loan_type ORDER BY id, id) AS prev_principal_amount FROM loans ORDER BY loan_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-022",
    domain: "finance",
    level: 4,
    order: 22,
    difficulty: "hard",
    title: "LOANS: Next Record Lead Projection by loan type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compare current principal_amount with the upcoming next record's principal_amount within each loan_type in loans.",
    context_notes: "Executes high-grade financial analytics on loans using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","loans"],
    expected_columns: ["id","loan_type","principal_amount","next_principal_amount"],
    reference_sql: "SELECT id, loan_type, principal_amount, LEAD(principal_amount, 1) OVER (PARTITION BY loan_type ORDER BY id, id) AS next_principal_amount FROM loans ORDER BY loan_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-023",
    domain: "finance",
    level: 4,
    order: 23,
    difficulty: "hard",
    title: "LOANS: Partition Moving Average by loan type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Benchmark individual principal_amount against the overall average principal_amount across the same loan_type in loans.",
    context_notes: "Executes high-grade financial analytics on loans using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","loans"],
    expected_columns: ["id","loan_type","principal_amount","avg_principal_amount_cohort"],
    reference_sql: "SELECT id, loan_type, principal_amount, AVG(principal_amount) OVER (PARTITION BY loan_type) AS avg_principal_amount_cohort FROM loans ORDER BY loan_type, principal_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-024",
    domain: "finance",
    level: 4,
    order: 24,
    difficulty: "hard",
    title: "LOANS: Quartile Distribution by loan type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Segment loans into 4 equal quartiles based on principal_amount within each loan_type segment.",
    context_notes: "Executes high-grade financial analytics on loans using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","loans"],
    expected_columns: ["id","loan_type","principal_amount","quartile"],
    reference_sql: "SELECT id, loan_type, principal_amount, NTILE(4) OVER (PARTITION BY loan_type ORDER BY principal_amount DESC) AS quartile FROM loans ORDER BY loan_type, quartile, principal_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-025",
    domain: "finance",
    level: 4,
    order: 25,
    difficulty: "hard",
    title: "TRANSACTIONS: Running Total by transaction type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute the cumulative running total of amount partitioned by transaction_type from transactions, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on transactions using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","transactions"],
    expected_columns: ["id","transaction_type","amount","running_amount"],
    reference_sql: "SELECT id, transaction_type, amount, SUM(amount) OVER (PARTITION BY transaction_type ORDER BY id, id) AS running_amount FROM transactions ORDER BY transaction_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-026",
    domain: "finance",
    level: 4,
    order: 26,
    difficulty: "hard",
    title: "TRANSACTIONS: Rank by Magnitude by transaction type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Rank records in transactions based on amount in descending order within each transaction_type.",
    context_notes: "Executes high-grade financial analytics on transactions using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","transactions"],
    expected_columns: ["id","transaction_type","amount","rnk"],
    reference_sql: "SELECT id, transaction_type, amount, RANK() OVER (PARTITION BY transaction_type ORDER BY amount DESC) AS rnk FROM transactions ORDER BY transaction_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-027",
    domain: "finance",
    level: 4,
    order: 27,
    difficulty: "hard",
    title: "TRANSACTIONS: Dense Rank by Magnitude by transaction type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Calculate the dense ranking of amount within each transaction_type grouping from transactions.",
    context_notes: "Executes high-grade financial analytics on transactions using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","transactions"],
    expected_columns: ["id","transaction_type","amount","dense_rnk"],
    reference_sql: "SELECT id, transaction_type, amount, DENSE_RANK() OVER (PARTITION BY transaction_type ORDER BY amount DESC) AS dense_rnk FROM transactions ORDER BY transaction_type, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-028",
    domain: "finance",
    level: 4,
    order: 28,
    difficulty: "hard",
    title: "TRANSACTIONS: Previous Record Lag Comparison by transaction type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Retrieve the immediately preceding amount for each transaction_type record in transactions to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on transactions using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","transactions"],
    expected_columns: ["id","transaction_type","amount","prev_amount"],
    reference_sql: "SELECT id, transaction_type, amount, LAG(amount, 1) OVER (PARTITION BY transaction_type ORDER BY id, id) AS prev_amount FROM transactions ORDER BY transaction_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-029",
    domain: "finance",
    level: 4,
    order: 29,
    difficulty: "hard",
    title: "TRANSACTIONS: Next Record Lead Projection by transaction type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compare current amount with the upcoming next record's amount within each transaction_type in transactions.",
    context_notes: "Executes high-grade financial analytics on transactions using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","transactions"],
    expected_columns: ["id","transaction_type","amount","next_amount"],
    reference_sql: "SELECT id, transaction_type, amount, LEAD(amount, 1) OVER (PARTITION BY transaction_type ORDER BY id, id) AS next_amount FROM transactions ORDER BY transaction_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-030",
    domain: "finance",
    level: 4,
    order: 30,
    difficulty: "hard",
    title: "TRANSACTIONS: Partition Moving Average by transaction type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Benchmark individual amount against the overall average amount across the same transaction_type in transactions.",
    context_notes: "Executes high-grade financial analytics on transactions using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","transactions"],
    expected_columns: ["id","transaction_type","amount","avg_amount_cohort"],
    reference_sql: "SELECT id, transaction_type, amount, AVG(amount) OVER (PARTITION BY transaction_type) AS avg_amount_cohort FROM transactions ORDER BY transaction_type, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-031",
    domain: "finance",
    level: 4,
    order: 31,
    difficulty: "hard",
    title: "TRANSACTIONS: Quartile Distribution by transaction type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Segment transactions into 4 equal quartiles based on amount within each transaction_type segment.",
    context_notes: "Executes high-grade financial analytics on transactions using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","transactions"],
    expected_columns: ["id","transaction_type","amount","quartile"],
    reference_sql: "SELECT id, transaction_type, amount, NTILE(4) OVER (PARTITION BY transaction_type ORDER BY amount DESC) AS quartile FROM transactions ORDER BY transaction_type, quartile, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-032",
    domain: "finance",
    level: 4,
    order: 32,
    difficulty: "hard",
    title: "CREDIT LINES: Running Total by status",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute the cumulative running total of total_limit partitioned by status from credit_lines, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on credit_lines using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","credit_lines"],
    expected_columns: ["id","status","total_limit","running_total_limit"],
    reference_sql: "SELECT id, status, total_limit, SUM(total_limit) OVER (PARTITION BY status ORDER BY id, id) AS running_total_limit FROM credit_lines ORDER BY status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-033",
    domain: "finance",
    level: 4,
    order: 33,
    difficulty: "hard",
    title: "CREDIT LINES: Rank by Magnitude by status",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Rank records in credit_lines based on total_limit in descending order within each status.",
    context_notes: "Executes high-grade financial analytics on credit_lines using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","credit_lines"],
    expected_columns: ["id","status","total_limit","rnk"],
    reference_sql: "SELECT id, status, total_limit, RANK() OVER (PARTITION BY status ORDER BY total_limit DESC) AS rnk FROM credit_lines ORDER BY status, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-034",
    domain: "finance",
    level: 4,
    order: 34,
    difficulty: "hard",
    title: "CREDIT LINES: Dense Rank by Magnitude by status",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Calculate the dense ranking of total_limit within each status grouping from credit_lines.",
    context_notes: "Executes high-grade financial analytics on credit_lines using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","credit_lines"],
    expected_columns: ["id","status","total_limit","dense_rnk"],
    reference_sql: "SELECT id, status, total_limit, DENSE_RANK() OVER (PARTITION BY status ORDER BY total_limit DESC) AS dense_rnk FROM credit_lines ORDER BY status, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-035",
    domain: "finance",
    level: 4,
    order: 35,
    difficulty: "hard",
    title: "CREDIT LINES: Previous Record Lag Comparison by status",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Retrieve the immediately preceding total_limit for each status record in credit_lines to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on credit_lines using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","credit_lines"],
    expected_columns: ["id","status","total_limit","prev_total_limit"],
    reference_sql: "SELECT id, status, total_limit, LAG(total_limit, 1) OVER (PARTITION BY status ORDER BY id, id) AS prev_total_limit FROM credit_lines ORDER BY status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-036",
    domain: "finance",
    level: 4,
    order: 36,
    difficulty: "hard",
    title: "CREDIT LINES: Next Record Lead Projection by status",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compare current total_limit with the upcoming next record's total_limit within each status in credit_lines.",
    context_notes: "Executes high-grade financial analytics on credit_lines using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","credit_lines"],
    expected_columns: ["id","status","total_limit","next_total_limit"],
    reference_sql: "SELECT id, status, total_limit, LEAD(total_limit, 1) OVER (PARTITION BY status ORDER BY id, id) AS next_total_limit FROM credit_lines ORDER BY status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-037",
    domain: "finance",
    level: 4,
    order: 37,
    difficulty: "hard",
    title: "CREDIT LINES: Partition Moving Average by status",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Benchmark individual total_limit against the overall average total_limit across the same status in credit_lines.",
    context_notes: "Executes high-grade financial analytics on credit_lines using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","credit_lines"],
    expected_columns: ["id","status","total_limit","avg_total_limit_cohort"],
    reference_sql: "SELECT id, status, total_limit, AVG(total_limit) OVER (PARTITION BY status) AS avg_total_limit_cohort FROM credit_lines ORDER BY status, total_limit DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-038",
    domain: "finance",
    level: 4,
    order: 38,
    difficulty: "hard",
    title: "CREDIT LINES: Quartile Distribution by status",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Segment credit_lines into 4 equal quartiles based on total_limit within each status segment.",
    context_notes: "Executes high-grade financial analytics on credit_lines using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","credit_lines"],
    expected_columns: ["id","status","total_limit","quartile"],
    reference_sql: "SELECT id, status, total_limit, NTILE(4) OVER (PARTITION BY status ORDER BY total_limit DESC) AS quartile FROM credit_lines ORDER BY status, quartile, total_limit DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-039",
    domain: "finance",
    level: 4,
    order: 39,
    difficulty: "hard",
    title: "INVESTMENTS: Running Total by portfolio type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute the cumulative running total of current_value partitioned by portfolio_type from investments, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on investments using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","investments"],
    expected_columns: ["id","portfolio_type","current_value","running_current_value"],
    reference_sql: "SELECT id, portfolio_type, current_value, SUM(current_value) OVER (PARTITION BY portfolio_type ORDER BY id, id) AS running_current_value FROM investments ORDER BY portfolio_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-040",
    domain: "finance",
    level: 4,
    order: 40,
    difficulty: "hard",
    title: "INVESTMENTS: Rank by Magnitude by portfolio type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Rank records in investments based on current_value in descending order within each portfolio_type.",
    context_notes: "Executes high-grade financial analytics on investments using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","investments"],
    expected_columns: ["id","portfolio_type","current_value","rnk"],
    reference_sql: "SELECT id, portfolio_type, current_value, RANK() OVER (PARTITION BY portfolio_type ORDER BY current_value DESC) AS rnk FROM investments ORDER BY portfolio_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-041",
    domain: "finance",
    level: 4,
    order: 41,
    difficulty: "hard",
    title: "INVESTMENTS: Dense Rank by Magnitude by portfolio type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Calculate the dense ranking of current_value within each portfolio_type grouping from investments.",
    context_notes: "Executes high-grade financial analytics on investments using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","investments"],
    expected_columns: ["id","portfolio_type","current_value","dense_rnk"],
    reference_sql: "SELECT id, portfolio_type, current_value, DENSE_RANK() OVER (PARTITION BY portfolio_type ORDER BY current_value DESC) AS dense_rnk FROM investments ORDER BY portfolio_type, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-042",
    domain: "finance",
    level: 4,
    order: 42,
    difficulty: "hard",
    title: "INVESTMENTS: Previous Record Lag Comparison by portfolio type",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Retrieve the immediately preceding current_value for each portfolio_type record in investments to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on investments using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","investments"],
    expected_columns: ["id","portfolio_type","current_value","prev_current_value"],
    reference_sql: "SELECT id, portfolio_type, current_value, LAG(current_value, 1) OVER (PARTITION BY portfolio_type ORDER BY id, id) AS prev_current_value FROM investments ORDER BY portfolio_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-043",
    domain: "finance",
    level: 4,
    order: 43,
    difficulty: "hard",
    title: "INVESTMENTS: Next Record Lead Projection by portfolio type",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compare current current_value with the upcoming next record's current_value within each portfolio_type in investments.",
    context_notes: "Executes high-grade financial analytics on investments using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","investments"],
    expected_columns: ["id","portfolio_type","current_value","next_current_value"],
    reference_sql: "SELECT id, portfolio_type, current_value, LEAD(current_value, 1) OVER (PARTITION BY portfolio_type ORDER BY id, id) AS next_current_value FROM investments ORDER BY portfolio_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-044",
    domain: "finance",
    level: 4,
    order: 44,
    difficulty: "hard",
    title: "INVESTMENTS: Partition Moving Average by portfolio type",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Benchmark individual current_value against the overall average current_value across the same portfolio_type in investments.",
    context_notes: "Executes high-grade financial analytics on investments using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","investments"],
    expected_columns: ["id","portfolio_type","current_value","avg_current_value_cohort"],
    reference_sql: "SELECT id, portfolio_type, current_value, AVG(current_value) OVER (PARTITION BY portfolio_type) AS avg_current_value_cohort FROM investments ORDER BY portfolio_type, current_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-045",
    domain: "finance",
    level: 4,
    order: 45,
    difficulty: "hard",
    title: "INVESTMENTS: Quartile Distribution by portfolio type",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Segment investments into 4 equal quartiles based on current_value within each portfolio_type segment.",
    context_notes: "Executes high-grade financial analytics on investments using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","investments"],
    expected_columns: ["id","portfolio_type","current_value","quartile"],
    reference_sql: "SELECT id, portfolio_type, current_value, NTILE(4) OVER (PARTITION BY portfolio_type ORDER BY current_value DESC) AS quartile FROM investments ORDER BY portfolio_type, quartile, current_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-046",
    domain: "finance",
    level: 4,
    order: 46,
    difficulty: "hard",
    title: "TELLER SESSIONS: Running Total by branch id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute the cumulative running total of closing_cash partitioned by branch_id from teller_sessions, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","running_closing_cash"],
    reference_sql: "SELECT id, branch_id, closing_cash, SUM(closing_cash) OVER (PARTITION BY branch_id ORDER BY session_date, id) AS running_closing_cash FROM teller_sessions ORDER BY branch_id, session_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-047",
    domain: "finance",
    level: 4,
    order: 47,
    difficulty: "hard",
    title: "TELLER SESSIONS: Rank by Magnitude by branch id",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Rank records in teller_sessions based on closing_cash in descending order within each branch_id.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","rnk"],
    reference_sql: "SELECT id, branch_id, closing_cash, RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC) AS rnk FROM teller_sessions ORDER BY branch_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-048",
    domain: "finance",
    level: 4,
    order: 48,
    difficulty: "hard",
    title: "TELLER SESSIONS: Dense Rank by Magnitude by branch id",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Calculate the dense ranking of closing_cash within each branch_id grouping from teller_sessions.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","dense_rnk"],
    reference_sql: "SELECT id, branch_id, closing_cash, DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY closing_cash DESC) AS dense_rnk FROM teller_sessions ORDER BY branch_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-049",
    domain: "finance",
    level: 4,
    order: 49,
    difficulty: "hard",
    title: "TELLER SESSIONS: Previous Record Lag Comparison by branch id",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Retrieve the immediately preceding closing_cash for each branch_id record in teller_sessions to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","prev_closing_cash"],
    reference_sql: "SELECT id, branch_id, closing_cash, LAG(closing_cash, 1) OVER (PARTITION BY branch_id ORDER BY session_date, id) AS prev_closing_cash FROM teller_sessions ORDER BY branch_id, session_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-050",
    domain: "finance",
    level: 4,
    order: 50,
    difficulty: "hard",
    title: "TELLER SESSIONS: Next Record Lead Projection by branch id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compare current closing_cash with the upcoming next record's closing_cash within each branch_id in teller_sessions.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","next_closing_cash"],
    reference_sql: "SELECT id, branch_id, closing_cash, LEAD(closing_cash, 1) OVER (PARTITION BY branch_id ORDER BY session_date, id) AS next_closing_cash FROM teller_sessions ORDER BY branch_id, session_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-051",
    domain: "finance",
    level: 4,
    order: 51,
    difficulty: "hard",
    title: "TELLER SESSIONS: Partition Moving Average by branch id",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Benchmark individual closing_cash against the overall average closing_cash across the same branch_id in teller_sessions.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","avg_closing_cash_cohort"],
    reference_sql: "SELECT id, branch_id, closing_cash, AVG(closing_cash) OVER (PARTITION BY branch_id) AS avg_closing_cash_cohort FROM teller_sessions ORDER BY branch_id, closing_cash DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-052",
    domain: "finance",
    level: 4,
    order: 52,
    difficulty: "hard",
    title: "TELLER SESSIONS: Quartile Distribution by branch id",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Segment teller_sessions into 4 equal quartiles based on closing_cash within each branch_id segment.",
    context_notes: "Executes high-grade financial analytics on teller_sessions using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","teller_sessions"],
    expected_columns: ["id","branch_id","closing_cash","quartile"],
    reference_sql: "SELECT id, branch_id, closing_cash, NTILE(4) OVER (PARTITION BY branch_id ORDER BY closing_cash DESC) AS quartile FROM teller_sessions ORDER BY branch_id, quartile, closing_cash DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-053",
    domain: "finance",
    level: 4,
    order: 53,
    difficulty: "hard",
    title: "CARD SWIPES: Running Total by card id",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute the cumulative running total of amount partitioned by card_id from card_swipes, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on card_swipes using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","card_swipes"],
    expected_columns: ["id","card_id","amount","running_amount"],
    reference_sql: "SELECT id, card_id, amount, SUM(amount) OVER (PARTITION BY card_id ORDER BY transaction_date, id) AS running_amount FROM card_swipes ORDER BY card_id, transaction_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-054",
    domain: "finance",
    level: 4,
    order: 54,
    difficulty: "hard",
    title: "CARD SWIPES: Rank by Magnitude by card id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Rank records in card_swipes based on amount in descending order within each card_id.",
    context_notes: "Executes high-grade financial analytics on card_swipes using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","card_swipes"],
    expected_columns: ["id","card_id","amount","rnk"],
    reference_sql: "SELECT id, card_id, amount, RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS rnk FROM card_swipes ORDER BY card_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-055",
    domain: "finance",
    level: 4,
    order: 55,
    difficulty: "hard",
    title: "CARD SWIPES: Dense Rank by Magnitude by card id",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Calculate the dense ranking of amount within each card_id grouping from card_swipes.",
    context_notes: "Executes high-grade financial analytics on card_swipes using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","card_swipes"],
    expected_columns: ["id","card_id","amount","dense_rnk"],
    reference_sql: "SELECT id, card_id, amount, DENSE_RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS dense_rnk FROM card_swipes ORDER BY card_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-056",
    domain: "finance",
    level: 4,
    order: 56,
    difficulty: "hard",
    title: "CARD SWIPES: Previous Record Lag Comparison by card id",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Retrieve the immediately preceding amount for each card_id record in card_swipes to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on card_swipes using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","card_swipes"],
    expected_columns: ["id","card_id","amount","prev_amount"],
    reference_sql: "SELECT id, card_id, amount, LAG(amount, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id) AS prev_amount FROM card_swipes ORDER BY card_id, transaction_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-057",
    domain: "finance",
    level: 4,
    order: 57,
    difficulty: "hard",
    title: "CARD SWIPES: Next Record Lead Projection by card id",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compare current amount with the upcoming next record's amount within each card_id in card_swipes.",
    context_notes: "Executes high-grade financial analytics on card_swipes using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","card_swipes"],
    expected_columns: ["id","card_id","amount","next_amount"],
    reference_sql: "SELECT id, card_id, amount, LEAD(amount, 1) OVER (PARTITION BY card_id ORDER BY transaction_date, id) AS next_amount FROM card_swipes ORDER BY card_id, transaction_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-058",
    domain: "finance",
    level: 4,
    order: 58,
    difficulty: "hard",
    title: "CARD SWIPES: Partition Moving Average by card id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Benchmark individual amount against the overall average amount across the same card_id in card_swipes.",
    context_notes: "Executes high-grade financial analytics on card_swipes using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","card_swipes"],
    expected_columns: ["id","card_id","amount","avg_amount_cohort"],
    reference_sql: "SELECT id, card_id, amount, AVG(amount) OVER (PARTITION BY card_id) AS avg_amount_cohort FROM card_swipes ORDER BY card_id, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-059",
    domain: "finance",
    level: 4,
    order: 59,
    difficulty: "hard",
    title: "CARD SWIPES: Quartile Distribution by card id",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Segment card_swipes into 4 equal quartiles based on amount within each card_id segment.",
    context_notes: "Executes high-grade financial analytics on card_swipes using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","card_swipes"],
    expected_columns: ["id","card_id","amount","quartile"],
    reference_sql: "SELECT id, card_id, amount, NTILE(4) OVER (PARTITION BY card_id ORDER BY amount DESC) AS quartile FROM card_swipes ORDER BY card_id, quartile, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-060",
    domain: "finance",
    level: 4,
    order: 60,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Running Total by loan id",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute the cumulative running total of payment_amount partitioned by loan_id from loan_payments, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on loan_payments using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","running_payment_amount"],
    reference_sql: "SELECT id, loan_id, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS running_payment_amount FROM loan_payments ORDER BY loan_id, payment_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-061",
    domain: "finance",
    level: 4,
    order: 61,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Rank by Magnitude by loan id",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Rank records in loan_payments based on payment_amount in descending order within each loan_id.",
    context_notes: "Executes high-grade financial analytics on loan_payments using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","rnk"],
    reference_sql: "SELECT id, loan_id, payment_amount, RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS rnk FROM loan_payments ORDER BY loan_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-062",
    domain: "finance",
    level: 4,
    order: 62,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Dense Rank by Magnitude by loan id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Calculate the dense ranking of payment_amount within each loan_id grouping from loan_payments.",
    context_notes: "Executes high-grade financial analytics on loan_payments using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","dense_rnk"],
    reference_sql: "SELECT id, loan_id, payment_amount, DENSE_RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS dense_rnk FROM loan_payments ORDER BY loan_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-063",
    domain: "finance",
    level: 4,
    order: 63,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Previous Record Lag Comparison by loan id",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Retrieve the immediately preceding payment_amount for each loan_id record in loan_payments to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on loan_payments using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","prev_payment_amount"],
    reference_sql: "SELECT id, loan_id, payment_amount, LAG(payment_amount, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS prev_payment_amount FROM loan_payments ORDER BY loan_id, payment_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-064",
    domain: "finance",
    level: 4,
    order: 64,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Next Record Lead Projection by loan id",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compare current payment_amount with the upcoming next record's payment_amount within each loan_id in loan_payments.",
    context_notes: "Executes high-grade financial analytics on loan_payments using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","next_payment_amount"],
    reference_sql: "SELECT id, loan_id, payment_amount, LEAD(payment_amount, 1) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS next_payment_amount FROM loan_payments ORDER BY loan_id, payment_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-065",
    domain: "finance",
    level: 4,
    order: 65,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Partition Moving Average by loan id",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Benchmark individual payment_amount against the overall average payment_amount across the same loan_id in loan_payments.",
    context_notes: "Executes high-grade financial analytics on loan_payments using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","avg_payment_amount_cohort"],
    reference_sql: "SELECT id, loan_id, payment_amount, AVG(payment_amount) OVER (PARTITION BY loan_id) AS avg_payment_amount_cohort FROM loan_payments ORDER BY loan_id, payment_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-066",
    domain: "finance",
    level: 4,
    order: 66,
    difficulty: "hard",
    title: "LOAN PAYMENTS: Quartile Distribution by loan id",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Segment loan_payments into 4 equal quartiles based on payment_amount within each loan_id segment.",
    context_notes: "Executes high-grade financial analytics on loan_payments using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","loan_payments"],
    expected_columns: ["id","loan_id","payment_amount","quartile"],
    reference_sql: "SELECT id, loan_id, payment_amount, NTILE(4) OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS quartile FROM loan_payments ORDER BY loan_id, quartile, payment_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-067",
    domain: "finance",
    level: 4,
    order: 67,
    difficulty: "hard",
    title: "MERCHANTS: Running Total by category",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute the cumulative running total of id partitioned by category from merchants, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on merchants using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","merchants"],
    expected_columns: ["id","category","id","running_id"],
    reference_sql: "SELECT id, category, id, SUM(id) OVER (PARTITION BY category ORDER BY id, id) AS running_id FROM merchants ORDER BY category, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-068",
    domain: "finance",
    level: 4,
    order: 68,
    difficulty: "hard",
    title: "MERCHANTS: Rank by Magnitude by category",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Rank records in merchants based on id in descending order within each category.",
    context_notes: "Executes high-grade financial analytics on merchants using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","merchants"],
    expected_columns: ["id","category","id","rnk"],
    reference_sql: "SELECT id, category, id, RANK() OVER (PARTITION BY category ORDER BY id DESC) AS rnk FROM merchants ORDER BY category, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-069",
    domain: "finance",
    level: 4,
    order: 69,
    difficulty: "hard",
    title: "MERCHANTS: Dense Rank by Magnitude by category",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Calculate the dense ranking of id within each category grouping from merchants.",
    context_notes: "Executes high-grade financial analytics on merchants using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","merchants"],
    expected_columns: ["id","category","id","dense_rnk"],
    reference_sql: "SELECT id, category, id, DENSE_RANK() OVER (PARTITION BY category ORDER BY id DESC) AS dense_rnk FROM merchants ORDER BY category, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-070",
    domain: "finance",
    level: 4,
    order: 70,
    difficulty: "hard",
    title: "MERCHANTS: Previous Record Lag Comparison by category",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Retrieve the immediately preceding id for each category record in merchants to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on merchants using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","merchants"],
    expected_columns: ["id","category","id","prev_id"],
    reference_sql: "SELECT id, category, id, LAG(id, 1) OVER (PARTITION BY category ORDER BY id, id) AS prev_id FROM merchants ORDER BY category, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-071",
    domain: "finance",
    level: 4,
    order: 71,
    difficulty: "hard",
    title: "MERCHANTS: Next Record Lead Projection by category",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compare current id with the upcoming next record's id within each category in merchants.",
    context_notes: "Executes high-grade financial analytics on merchants using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","merchants"],
    expected_columns: ["id","category","id","next_id"],
    reference_sql: "SELECT id, category, id, LEAD(id, 1) OVER (PARTITION BY category ORDER BY id, id) AS next_id FROM merchants ORDER BY category, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-072",
    domain: "finance",
    level: 4,
    order: 72,
    difficulty: "hard",
    title: "MERCHANTS: Partition Moving Average by category",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Benchmark individual id against the overall average id across the same category in merchants.",
    context_notes: "Executes high-grade financial analytics on merchants using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","merchants"],
    expected_columns: ["id","category","id","avg_id_cohort"],
    reference_sql: "SELECT id, category, id, AVG(id) OVER (PARTITION BY category) AS avg_id_cohort FROM merchants ORDER BY category, id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-073",
    domain: "finance",
    level: 4,
    order: 73,
    difficulty: "hard",
    title: "MERCHANTS: Quartile Distribution by category",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Segment merchants into 4 equal quartiles based on id within each category segment.",
    context_notes: "Executes high-grade financial analytics on merchants using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","merchants"],
    expected_columns: ["id","category","id","quartile"],
    reference_sql: "SELECT id, category, id, NTILE(4) OVER (PARTITION BY category ORDER BY id DESC) AS quartile FROM merchants ORDER BY category, quartile, id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-074",
    domain: "finance",
    level: 4,
    order: 74,
    difficulty: "hard",
    title: "CUSTOMERS: Running Total by risk rating",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute the cumulative running total of annual_income partitioned by risk_rating from customers, ordered by record ID.",
    context_notes: "Executes high-grade financial analytics on customers using SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","customers"],
    expected_columns: ["id","risk_rating","annual_income","running_annual_income"],
    reference_sql: "SELECT id, risk_rating, annual_income, SUM(annual_income) OVER (PARTITION BY risk_rating ORDER BY id, id) AS running_annual_income FROM customers ORDER BY risk_rating, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-075",
    domain: "finance",
    level: 4,
    order: 75,
    difficulty: "hard",
    title: "CUSTOMERS: Rank by Magnitude by risk rating",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Rank records in customers based on annual_income in descending order within each risk_rating.",
    context_notes: "Executes high-grade financial analytics on customers using RANK() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Rank by Magnitude","customers"],
    expected_columns: ["id","risk_rating","annual_income","rnk"],
    reference_sql: "SELECT id, risk_rating, annual_income, RANK() OVER (PARTITION BY risk_rating ORDER BY annual_income DESC) AS rnk FROM customers ORDER BY risk_rating, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-076",
    domain: "finance",
    level: 4,
    order: 76,
    difficulty: "hard",
    title: "CUSTOMERS: Dense Rank by Magnitude by risk rating",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Calculate the dense ranking of annual_income within each risk_rating grouping from customers.",
    context_notes: "Executes high-grade financial analytics on customers using DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","customers"],
    expected_columns: ["id","risk_rating","annual_income","dense_rnk"],
    reference_sql: "SELECT id, risk_rating, annual_income, DENSE_RANK() OVER (PARTITION BY risk_rating ORDER BY annual_income DESC) AS dense_rnk FROM customers ORDER BY risk_rating, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-077",
    domain: "finance",
    level: 4,
    order: 77,
    difficulty: "hard",
    title: "CUSTOMERS: Previous Record Lag Comparison by risk rating",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Retrieve the immediately preceding annual_income for each risk_rating record in customers to track chronological variance.",
    context_notes: "Executes high-grade financial analytics on customers using LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","customers"],
    expected_columns: ["id","risk_rating","annual_income","prev_annual_income"],
    reference_sql: "SELECT id, risk_rating, annual_income, LAG(annual_income, 1) OVER (PARTITION BY risk_rating ORDER BY id, id) AS prev_annual_income FROM customers ORDER BY risk_rating, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-078",
    domain: "finance",
    level: 4,
    order: 78,
    difficulty: "hard",
    title: "CUSTOMERS: Next Record Lead Projection by risk rating",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compare current annual_income with the upcoming next record's annual_income within each risk_rating in customers.",
    context_notes: "Executes high-grade financial analytics on customers using LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","customers"],
    expected_columns: ["id","risk_rating","annual_income","next_annual_income"],
    reference_sql: "SELECT id, risk_rating, annual_income, LEAD(annual_income, 1) OVER (PARTITION BY risk_rating ORDER BY id, id) AS next_annual_income FROM customers ORDER BY risk_rating, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-079",
    domain: "finance",
    level: 4,
    order: 79,
    difficulty: "hard",
    title: "CUSTOMERS: Partition Moving Average by risk rating",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Benchmark individual annual_income against the overall average annual_income across the same risk_rating in customers.",
    context_notes: "Executes high-grade financial analytics on customers using AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Partition Moving Average","customers"],
    expected_columns: ["id","risk_rating","annual_income","avg_annual_income_cohort"],
    reference_sql: "SELECT id, risk_rating, annual_income, AVG(annual_income) OVER (PARTITION BY risk_rating) AS avg_annual_income_cohort FROM customers ORDER BY risk_rating, annual_income DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-080",
    domain: "finance",
    level: 4,
    order: 80,
    difficulty: "hard",
    title: "CUSTOMERS: Quartile Distribution by risk rating",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Segment customers into 4 equal quartiles based on annual_income within each risk_rating segment.",
    context_notes: "Executes high-grade financial analytics on customers using NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","customers"],
    expected_columns: ["id","risk_rating","annual_income","quartile"],
    reference_sql: "SELECT id, risk_rating, annual_income, NTILE(4) OVER (PARTITION BY risk_rating ORDER BY annual_income DESC) AS quartile FROM customers ORDER BY risk_rating, quartile, annual_income DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-081",
    domain: "finance",
    level: 4,
    order: 81,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #81",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-082",
    domain: "finance",
    level: 4,
    order: 82,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #82",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-083",
    domain: "finance",
    level: 4,
    order: 83,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #83",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-084",
    domain: "finance",
    level: 4,
    order: 84,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #84",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-085",
    domain: "finance",
    level: 4,
    order: 85,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #85",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-086",
    domain: "finance",
    level: 4,
    order: 86,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #86",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-087",
    domain: "finance",
    level: 4,
    order: 87,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #87",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-088",
    domain: "finance",
    level: 4,
    order: 88,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #88",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-089",
    domain: "finance",
    level: 4,
    order: 89,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #89",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-090",
    domain: "finance",
    level: 4,
    order: 90,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #90",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-091",
    domain: "finance",
    level: 4,
    order: 91,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #91",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-092",
    domain: "finance",
    level: 4,
    order: 92,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #92",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-093",
    domain: "finance",
    level: 4,
    order: 93,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #93",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-094",
    domain: "finance",
    level: 4,
    order: 94,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #94",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-095",
    domain: "finance",
    level: 4,
    order: 95,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #95",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-096",
    domain: "finance",
    level: 4,
    order: 96,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #96",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-097",
    domain: "finance",
    level: 4,
    order: 97,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #97",
    stakeholder: {
      name: "Elena Rostova",
      role: "VP of Retail Lending"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-098",
    domain: "finance",
    level: 4,
    order: 98,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #98",
    stakeholder: {
      name: "Victor Vance",
      role: "Head of Risk & Compliance"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-099",
    domain: "finance",
    level: 4,
    order: 99,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #99",
    stakeholder: {
      name: "Arthur Pendleton",
      role: "Chief Wealth Advisor"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  },
  {
    id: "fin-L4-100",
    domain: "finance",
    level: 4,
    order: 100,
    difficulty: "hard",
    title: "Financial Window Analytics Metric #100",
    stakeholder: {
      name: "Rachel Adams",
      role: "Director of Branch Operations"
    },
    request: "Compute running cumulative metrics on loan payments. Show loan_id, payment_date, payment_amount, and cumulative sum of payment amounts.",
    context_notes: "Tracks cumulative payment amounts made per loan over time.",
    concepts: ["Window Functions","SUM() OVER","loan_payments"],
    expected_columns: ["loan_id","payment_date","payment_amount","cumulative_payment"],
    reference_sql: "SELECT loan_id, payment_date, payment_amount, SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id) AS cumulative_payment FROM loan_payments ORDER BY loan_id, payment_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(payment_amount) OVER (PARTITION BY loan_id ORDER BY payment_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window query\nFROM\n;"
  }
];
