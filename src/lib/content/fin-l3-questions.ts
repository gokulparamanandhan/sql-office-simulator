import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L3-001",
    "domain": "finance",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Transactions Triggering Critical Fraud Alerts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "AML emergency review: Find all transactions that triggered a fraud alert with severity CRITICAL using an IN subquery. Return transaction id, account id, amount, and description.",
    "context_notes": "Subquery with IN on fraud_alerts WHERE severity = CRITICAL.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "description"
    ],
    "reference_sql": "SELECT id, account_id, amount, description FROM transactions WHERE id IN (SELECT transaction_id FROM fraud_alerts WHERE severity = 'CRITICAL') ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE id IN (SELECT transaction_id FROM fraud_alerts WHERE severity = 'CRITICAL').",
      "Order by amount DESC."
    ],
    "solution_explanation": "Isolates transactions prompting critical regulatory fraud investigations.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-002",
    "domain": "finance",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Borrowers Who Have Never Made a Loan Payment",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "First payment default risk: Which loans have never recorded a single loan payment in our loan_payments ledger? Return loan id, customer id, loan type, and principal amount.",
    "context_notes": "Subquery with NOT IN on loan_payments.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT id, customer_id, loan_type, principal_amount FROM loans WHERE id NOT IN (SELECT DISTINCT loan_id FROM loan_payments WHERE loan_id IS NOT NULL) ORDER BY principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id NOT IN (SELECT DISTINCT loan_id FROM loan_payments).",
      "Order by principal_amount DESC."
    ],
    "solution_explanation": "Flags loans exhibiting immediate zero-payment default risk.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-003",
    "domain": "finance",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Accounts With Balances Above Bank-Wide Active Average",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Depository balance benchmark: Retrieve all active accounts whose balance is strictly greater than the average balance of all active accounts in the bank. Return account id, customer id, account type, and balance.",
    "context_notes": "Scalar subquery: balance > (SELECT AVG(balance) FROM accounts WHERE status = active).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE status = 'active' AND balance > (SELECT AVG(balance) FROM accounts WHERE status = 'active') ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE status = active AND balance > (SELECT AVG(balance)...).",
      "Order by balance DESC."
    ],
    "solution_explanation": "Surfaces accounts holding above-average deposit capital.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-004",
    "domain": "finance",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Customers Who Have Never Opened an Investment Portfolio",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Wealth advisory prospect list: Find all customers who do NOT have an investment portfolio on file using a NOT IN subquery. Return customer id, name, annual income, and credit score.",
    "context_notes": "Subquery with NOT IN on investments.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "annual_income",
      "credit_score"
    ],
    "reference_sql": "SELECT id, name, annual_income, credit_score FROM customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM investments WHERE customer_id IS NOT NULL) ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id NOT IN (SELECT DISTINCT customer_id FROM investments).",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Targets high-earning bank customers lacking wealth management relationships.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-005",
    "domain": "finance",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Loans With Principal Greater Than Overall Loan Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Large credit commitments: Retrieve all active loans whose principal amount is strictly higher than the average principal of all active loans. Return loan id, customer id, loan type, and principal amount.",
    "context_notes": "Scalar subquery: principal_amount > (SELECT AVG(principal_amount) FROM loans WHERE status = current).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT id, customer_id, loan_type, principal_amount FROM loans WHERE status = 'current' AND principal_amount > (SELECT AVG(principal_amount) FROM loans WHERE status = 'current') ORDER BY principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare principal_amount against scalar average of current loans.",
      "Order by principal_amount DESC."
    ],
    "solution_explanation": "Isolates top-tier credit asset commitments exceeding baseline portfolio size.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-006",
    "domain": "finance",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Merchants Processing Swipes Above Merchant Average Ticket",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant volume outliers: Find all merchants that have processed card swipes with an amount strictly greater than the average card swipe amount across all merchants. Return distinct merchant name and category.",
    "context_notes": "Subquery: merchant_id IN (SELECT merchant_id FROM card_swipes WHERE amount > (SELECT AVG(amount) FROM card_swipes)).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "SCALAR SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "name",
      "category"
    ],
    "reference_sql": "SELECT DISTINCT m.name, m.category FROM merchants m WHERE m.id IN (SELECT cs.merchant_id FROM card_swipes cs WHERE cs.amount > (SELECT AVG(amount) FROM card_swipes)) ORDER BY m.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter merchants with swipes exceeding the global swipe average.",
      "Select distinct name, category."
    ],
    "solution_explanation": "Surfaces acquiring counterparties handling above-average ticket sizes.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-007",
    "domain": "finance",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Customers Holding Portfolios in Aggressive Growth",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "High-risk investment clients: Find all customers who have invested in an Aggressive_Growth portfolio using an IN subquery. Return customer name, credit score, and annual income.",
    "context_notes": "Subquery with IN on investments WHERE portfolio_type = Aggressive_Growth.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE id IN (SELECT customer_id FROM investments WHERE portfolio_type = 'Aggressive_Growth') ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT customer_id FROM investments WHERE portfolio_type = 'Aggressive_Growth').",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces clients with high risk tolerance for equity products.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-008",
    "domain": "finance",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Branches With Total Originated Loans Above Branch Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "High origination branch offices: Find branches whose total originated current loan principal exceeds the average total loan principal originated across branches. Return branch name, city, and state.",
    "context_notes": "Subquery comparing branch loan totals against average branch loan volume.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state"
    ],
    "reference_sql": "SELECT branch_name, city, state FROM branches WHERE id IN (SELECT branch_id FROM loans WHERE status = 'current' GROUP BY branch_id HAVING SUM(principal_amount) > (SELECT AVG(sub.tot) FROM (SELECT SUM(principal_amount) AS tot FROM loans WHERE status = 'current' GROUP BY branch_id) sub)) ORDER BY branch_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate loan principal per branch in subquery.",
      "Compare in HAVING against average branch loan volume."
    ],
    "solution_explanation": "Highlights high-performing regional branch lending desks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-009",
    "domain": "finance",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Credit Lines With Limits Higher Than Credit Line Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Large revolving facilities: List all active credit lines where total_limit exceeds the average limit across all active credit lines. Return id, customer_id, total limit, and used amount.",
    "context_notes": "Scalar subquery: total_limit > (SELECT AVG(total_limit) FROM credit_lines WHERE status = active).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "total_limit",
      "used_amount"
    ],
    "reference_sql": "SELECT id, customer_id, total_limit, used_amount FROM credit_lines WHERE status = 'active' AND total_limit > (SELECT AVG(total_limit) FROM credit_lines WHERE status = 'active') ORDER BY total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter credit lines where total_limit exceeds average limit.",
      "Order by total_limit DESC."
    ],
    "solution_explanation": "Monitors large revolving commercial credit facilities.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-010",
    "domain": "finance",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Transactions With Fraud Alerts Under Review",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Compliance workflow: Pull transaction details for all transactions that currently have a fraud alert with status under_review. Return transaction id, account id, amount, and description.",
    "context_notes": "Subquery with IN on fraud_alerts WHERE status = under_review.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "description"
    ],
    "reference_sql": "SELECT id, account_id, amount, description FROM transactions WHERE id IN (SELECT transaction_id FROM fraud_alerts WHERE status = 'under_review') ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT transaction_id FROM fraud_alerts WHERE status = 'under_review').",
      "Order by amount DESC."
    ],
    "solution_explanation": "Reviews transaction items pending compliance analyst adjudication.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-011",
    "domain": "finance",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Customers With Overdue Loans (IN Subquery)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Collections roster: Find customer name, credit score, and branch city for all customers who have at least one loan with status late using an IN subquery.",
    "context_notes": "Subquery with IN on loans WHERE status = late.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "branch_city"
    ],
    "reference_sql": "SELECT name, credit_score, branch_city FROM customers WHERE id IN (SELECT customer_id FROM loans WHERE status = 'late') ORDER BY credit_score ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter customers WHERE id IN (SELECT customer_id FROM loans WHERE status = 'late').",
      "Order by credit_score ASC."
    ],
    "solution_explanation": "Isolates delinquent borrowers for loss mitigation outreach.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-012",
    "domain": "finance",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Investment Portfolios With Current Value Exceeding Invested Cost",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Capital gains surveillance: Retrieve all investment records where current_value is strictly greater than total_invested. Return id, customer_id, portfolio type, total invested, and current value.",
    "context_notes": "Filter investments WHERE current_value > total_invested.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "portfolio_type",
      "total_invested",
      "current_value"
    ],
    "reference_sql": "SELECT id, customer_id, portfolio_type, total_invested, current_value FROM investments WHERE current_value > total_invested ORDER BY (current_value - total_invested) DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter investments where current_value > total_invested.",
      "Order by capital gain descending."
    ],
    "solution_explanation": "Identifies wealth portfolios generating positive unrealized returns.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-013",
    "domain": "finance",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Branches Managing Depository Accounts for Speculative Risk Clients",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Branch risk exposure: Find distinct branch names that manage accounts for customers classified with risk_rating Speculative using an IN subquery.",
    "context_notes": "Subquery: branch_id IN (SELECT branch_id FROM accounts WHERE customer_id IN (SELECT id FROM customers WHERE risk_rating = Speculative)).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "branch_name",
      "city"
    ],
    "reference_sql": "SELECT DISTINCT branch_name, city FROM branches WHERE id IN (SELECT branch_id FROM accounts WHERE customer_id IN (SELECT id FROM customers WHERE risk_rating = 'Speculative')) ORDER BY branch_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Nest IN subqueries to connect branches to speculative risk customers.",
      "Select distinct branch_name, city."
    ],
    "solution_explanation": "Surfaces regional offices holding speculative credit accounts.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-014",
    "domain": "finance",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Loans With Single Payments Exceeding $2,500",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Accelerated amortization: Find loans that have received at least one payment where payment_amount >= $2,500. Return loan id, loan type, and principal amount.",
    "context_notes": "Subquery with IN on loan_payments WHERE payment_amount >= 2500.00.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT id, loan_type, principal_amount FROM loans WHERE id IN (SELECT DISTINCT loan_id FROM loan_payments WHERE payment_amount >= 2500.00) ORDER BY principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter loans WHERE id IN (SELECT loan_id FROM loan_payments WHERE payment_amount >= 2500.00).",
      "Order by principal_amount DESC."
    ],
    "solution_explanation": "Identifies borrowers making large debt service installments.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-015",
    "domain": "finance",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Customers Holding Multiple Active Depository Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Multi-account customer cohort: Find customers who maintain strictly more than 1 active account using an IN subquery with GROUP BY and HAVING. Return customer name, credit score, and annual income.",
    "context_notes": "Subquery: customer_id IN (SELECT customer_id FROM accounts WHERE status = active GROUP BY customer_id HAVING COUNT(id) > 1).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "HAVING"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE id IN (SELECT customer_id FROM accounts WHERE status = 'active' GROUP BY customer_id HAVING COUNT(id) > 1) ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT customer_id FROM accounts WHERE status = active GROUP BY customer_id HAVING COUNT > 1).",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces relationship clients holding multi-account depository portfolios.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-016",
    "domain": "finance",
    "level": 3,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Card Swipes Resulting in High Fraud Alerts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Card fraud linking: Find all card swipes where fraud_score >= 80. Return swipe id, card id, amount, fraud score, and date.",
    "context_notes": "Filter card_swipes WHERE fraud_score >= 80.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "card_id",
      "amount",
      "fraud_score",
      "transaction_date"
    ],
    "reference_sql": "SELECT id, card_id, amount, fraud_score, transaction_date FROM card_swipes WHERE fraud_score >= 80 ORDER BY fraud_score DESC, amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter card_swipes for fraud_score >= 80.",
      "Order by fraud_score DESC, amount DESC."
    ],
    "solution_explanation": "Identifies severe POS anomalies for immediate card block and callout.",
    "xp": 25,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L3-017",
    "domain": "finance",
    "level": 3,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Accounts With Total Withdrawals Greater Than Deposits",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Depository drainage check: Find accounts where total withdrawal dollars exceed total deposit dollars using a subquery or derived table. Return account id and net outflow amount.",
    "context_notes": "Subquery comparing SUM(withdrawals) to SUM(deposits).",
    "concepts": [
      "SELECT",
      "DERIVED TABLE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "account_id",
      "net_outflow"
    ],
    "reference_sql": "SELECT account_id, ROUND(SUM(CASE WHEN transaction_type = 'withdrawal' THEN amount ELSE -amount END), 2) AS net_outflow FROM transactions GROUP BY account_id HAVING SUM(CASE WHEN transaction_type = 'withdrawal' THEN amount ELSE 0 END) > SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END) ORDER BY net_outflow DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group transactions by account_id.",
      "Filter in HAVING for withdrawal sum > deposit sum."
    ],
    "solution_explanation": "Surfaces depository accounts experiencing net capital depletion.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-018",
    "domain": "finance",
    "level": 3,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Customers Invested in Balanced or Fixed Income Portfolios",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Conservative investor directory: List customer name, credit score, and annual income for customers holding portfolios of type Balanced or Fixed_Income using an IN subquery.",
    "context_notes": "Subquery with IN on investments WHERE portfolio_type IN (Balanced, Fixed_Income).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE id IN (SELECT customer_id FROM investments WHERE portfolio_type IN ('Balanced', 'Fixed_Income')) ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT customer_id FROM investments WHERE portfolio_type IN ('Balanced', 'Fixed_Income')).",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces wealth management clients prioritizing capital preservation.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-019",
    "domain": "finance",
    "level": 3,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Loans With Interest Rate Below Commercial Benchmark",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Low-rate loan asset audit: Retrieve loans where interest_rate is strictly lower than the overall average loan interest rate. Return loan id, customer id, loan type, and interest rate.",
    "context_notes": "Scalar subquery: interest_rate < (SELECT AVG(interest_rate) FROM loans).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "loan_type",
      "interest_rate"
    ],
    "reference_sql": "SELECT id, customer_id, loan_type, interest_rate FROM loans WHERE interest_rate < (SELECT AVG(interest_rate) FROM loans) ORDER BY interest_rate ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare interest_rate < (SELECT AVG(interest_rate) FROM loans).",
      "Order by interest_rate ASC."
    ],
    "solution_explanation": "Identifies low-margin loan assets in the bank portfolio.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-020",
    "domain": "finance",
    "level": 3,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Merchants Never Processing Any High-Risk Card Swipes",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Clean merchant terminals: Find merchants that have processed card swipes, but have NEVER had a card swipe with fraud_score >= 60 using NOT IN. Return merchant name and category.",
    "context_notes": "Subquery with NOT IN on card_swipes WHERE fraud_score >= 60.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "category"
    ],
    "reference_sql": "SELECT name, category FROM merchants WHERE id NOT IN (SELECT DISTINCT merchant_id FROM card_swipes WHERE fraud_score >= 60 AND merchant_id IS NOT NULL) ORDER BY name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter merchants where id NOT IN (SELECT merchant_id WHERE fraud_score >= 60).",
      "Select name, category."
    ],
    "solution_explanation": "Recognizes merchant terminals with spotless fraud records.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-021",
    "domain": "finance",
    "level": 3,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Customers Holding Revolving Lines with 100% Zero Draw",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Untapped credit facility cohort: Find customers who have an active credit line with used_amount = 0 using an IN subquery. Return customer name, credit score, and annual income.",
    "context_notes": "Subquery with IN on credit_lines WHERE used_amount = 0 and status = active.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE id IN (SELECT customer_id FROM credit_lines WHERE used_amount = 0.00 AND status = 'active') ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter customers WHERE id IN (SELECT customer_id FROM credit_lines WHERE used_amount = 0).",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces pristine credit accounts with fully available liquidity facilities.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-022",
    "domain": "finance",
    "level": 3,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Branches With Total Active Deposits Exceeding $500,000",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "High deposit branch centers: List branch name, city, and state for branches whose active customer deposit balance total is strictly greater than $500,000.",
    "context_notes": "Subquery with IN on accounts WHERE status = active GROUP BY branch_id HAVING SUM(balance) > 500000.00.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "HAVING"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state"
    ],
    "reference_sql": "SELECT branch_name, city, state FROM branches WHERE id IN (SELECT branch_id FROM accounts WHERE status = 'active' GROUP BY branch_id HAVING SUM(balance) > 500000.00) ORDER BY branch_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter branches where id IN (accounts group by branch_id with sum > 500000).",
      "Select branch_name, city, state."
    ],
    "solution_explanation": "Surfaces major commercial branches holding substantial deposit liquidity.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-023",
    "domain": "finance",
    "level": 3,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Transactions With Fraud Alerts Triggering Velocity Rules",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Velocity anomaly detection: Find all transactions that triggered a fraud alert containing Velocity in the rule_triggered column. Return transaction id, account id, amount, and timestamp.",
    "context_notes": "Subquery with IN on fraud_alerts WHERE rule_triggered LIKE %Velocity%.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, created_at FROM transactions WHERE id IN (SELECT transaction_id FROM fraud_alerts WHERE rule_triggered LIKE '%Velocity%') ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter transactions where id IN (fraud alerts rule_triggered LIKE %Velocity%).",
      "Order by amount DESC."
    ],
    "solution_explanation": "Reviews transactions violating transaction frequency and burst rate thresholds.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-024",
    "domain": "finance",
    "level": 3,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Customers With Mortgages Originated at San Francisco Branches",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Bay Area mortgage borrowers: Find customer name, credit score, and annual income for customers who have a Mortgage loan originated at a branch located in San Francisco.",
    "context_notes": "Subquery: customer_id IN (SELECT customer_id FROM loans WHERE loan_type = Mortgage AND branch_id IN (SELECT id FROM branches WHERE city = San Francisco)).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE id IN (SELECT customer_id FROM loans WHERE loan_type = 'Mortgage' AND branch_id IN (SELECT id FROM branches WHERE city = 'San Francisco')) ORDER BY credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Nest IN subqueries to connect customers to SF branch mortgages.",
      "Order by credit_score DESC."
    ],
    "solution_explanation": "Tracks residential real estate debt extended in high-value San Francisco markets.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-025",
    "domain": "finance",
    "level": 3,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Loan Payments With Principal Portion Above Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "High principal amortization: List all loan payment records where principal_portion is strictly greater than the average principal portion across all payments. Return id, loan_id, payment amount, and principal portion.",
    "context_notes": "Scalar subquery: principal_portion > (SELECT AVG(principal_portion) FROM loan_payments).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "loan_id",
      "payment_amount",
      "principal_portion"
    ],
    "reference_sql": "SELECT id, loan_id, payment_amount, principal_portion FROM loan_payments WHERE principal_portion > (SELECT AVG(principal_portion) FROM loan_payments) ORDER BY principal_portion DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE principal_portion > (SELECT AVG(principal_portion) FROM loan_payments).",
      "Order by principal_portion DESC."
    ],
    "solution_explanation": "Surfaces rapid debt paydown installments reducing loan book exposure.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L3-026",
    "domain": "finance",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Customers With Active Depository Accounts (EXISTS)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Verified account holder roster: Identify customers who have at least one active account using an EXISTS clause. Return customer id, name, and annual income.",
    "context_notes": "EXISTS clause correlating customers with accounts WHERE status = active.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "annual_income"
    ],
    "reference_sql": "SELECT c.id, c.name, c.annual_income FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id AND a.status = 'active') ORDER BY c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate outer customer c with accounts a on a.customer_id = c.id.",
      "Filter for a.status = active."
    ],
    "solution_explanation": "Verifies customer records holding funded and active depository accounts.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-027",
    "domain": "finance",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Borrowers With No Recorded Loan Payments (NOT EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Default risk monitoring: Find all current loans where NO payment has ever been recorded in the loan_payments table using NOT EXISTS. Return loan id, customer id, loan type, and principal amount.",
    "context_notes": "NOT EXISTS correlating loans with loan_payments.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT l.id, l.customer_id, l.loan_type, l.principal_amount FROM loans l WHERE l.status = 'current' AND NOT EXISTS (SELECT 1 FROM loan_payments lp WHERE lp.loan_id = l.id) ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate loans with loan_payments in NOT EXISTS.",
      "Filter for l.status = current."
    ],
    "solution_explanation": "Surfaces loans lacking any payment history for early intervention.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-028",
    "domain": "finance",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Customers With Accounts Exceeding Branch Average Balance",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Branch deposit outperformance: Find active accounts whose balance is strictly greater than the average balance of all active accounts in that specific branch. Return account id, branch id, and balance.",
    "context_notes": "Correlated subquery: balance > (SELECT AVG(a2.balance) FROM accounts a2 WHERE a2.branch_id = a.branch_id AND a2.status = active).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "branch_id",
      "balance"
    ],
    "reference_sql": "SELECT a.id, a.branch_id, a.balance FROM accounts a WHERE a.status = 'active' AND a.balance > (SELECT AVG(a2.balance) FROM accounts a2 WHERE a2.branch_id = a.branch_id AND a2.status = 'active') ORDER BY a.branch_id, a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare balance against branch average balance in correlated subquery.",
      "Filter for active status."
    ],
    "solution_explanation": "Identifies key accounts anchoring branch deposit liquidity.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-029",
    "domain": "finance",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Customers Holding Both an Investment and a Current Loan (EXISTS)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Asset and liability relationship: Find customers who hold at least one active investment portfolio AND at least one current loan using dual EXISTS. Return customer name, credit score, and annual income.",
    "context_notes": "Dual EXISTS for investments and current loans.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, c.annual_income FROM customers c WHERE EXISTS (SELECT 1 FROM investments inv WHERE inv.customer_id = c.id) AND EXISTS (SELECT 1 FROM loans l WHERE l.customer_id = c.id AND l.status = 'current') ORDER BY c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customer with investments and loans using two EXISTS clauses.",
      "Select customer demographic attributes."
    ],
    "solution_explanation": "Identifies dual-relationship wealth clients carrying active credit facilities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-030",
    "domain": "finance",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Branches Where Every Loan is Performing (NOT EXISTS Late Loans)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Impeccable credit branches: List branches that have originated at least one loan, and have ZERO loans with status late using NOT EXISTS. Return branch name, city, and state.",
    "context_notes": "EXISTS current loans AND NOT EXISTS late loans.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, b.state FROM branches b WHERE EXISTS (SELECT 1 FROM loans l WHERE l.branch_id = b.id) AND NOT EXISTS (SELECT 1 FROM loans l2 WHERE l2.branch_id = b.id AND l2.status = 'late') ORDER BY b.branch_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Verify branch has originated loans with EXISTS.",
      "Ensure no late loans exist with NOT EXISTS."
    ],
    "solution_explanation": "Recognizes regional offices maintaining 100% performing loan portfolios.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-031",
    "domain": "finance",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Customers With Fraud Alerts on Their Transactions (EXISTS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Targeted compliance outreach: Identify customers whose account transactions have generated at least one fraud alert using an EXISTS clause. Return customer id, name, and risk rating.",
    "context_notes": "EXISTS correlating customers → accounts → transactions → fraud_alerts.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "risk_rating"
    ],
    "reference_sql": "SELECT c.id, c.name, c.risk_rating FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a JOIN transactions t ON a.id = t.account_id JOIN fraud_alerts fa ON t.id = fa.transaction_id WHERE a.customer_id = c.id) ORDER BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customer through accounts and transactions to fraud_alerts.",
      "Select id, name, risk_rating."
    ],
    "solution_explanation": "Maps security alerts back to the primary customer relationship.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-032",
    "domain": "finance",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Loans Priced Above Loan Type Average Interest Rate",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Loan rate premium audit: Find active loans whose interest rate is strictly greater than the average interest rate for that specific loan type (e.g. Mortgage, Auto). Return loan id, loan type, principal amount, and interest rate.",
    "context_notes": "Correlated subquery: interest_rate > (SELECT AVG(l2.interest_rate) FROM loans l2 WHERE l2.loan_type = l.loan_type).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "loan_type",
      "principal_amount",
      "interest_rate"
    ],
    "reference_sql": "SELECT l.id, l.loan_type, l.principal_amount, l.interest_rate FROM loans l WHERE l.status = 'current' AND l.interest_rate > (SELECT AVG(l2.interest_rate) FROM loans l2 WHERE l2.loan_type = l.loan_type AND l2.status = 'current') ORDER BY l.loan_type, l.interest_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute loan type average interest rate in correlated subquery.",
      "Filter where interest_rate > type average."
    ],
    "solution_explanation": "Surfaces loans commanding premium risk-adjusted interest margins.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-033",
    "domain": "finance",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Customers With Investment Value Exceeding Total Invested Cost (EXISTS)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Profitable portfolio holders: Find customers who have an investment where current_value exceeds total_invested using an EXISTS clause. Return customer name, credit score, and annual income.",
    "context_notes": "EXISTS correlating customers with investments WHERE current_value > total_invested.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, c.annual_income FROM customers c WHERE EXISTS (SELECT 1 FROM investments inv WHERE inv.customer_id = c.id AND inv.current_value > inv.total_invested) ORDER BY c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customers with investments where current_value > total_invested.",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces affluent investors experiencing positive portfolio capital growth.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-034",
    "domain": "finance",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Credit Lines With Used Amount Exceeding Risk Tier Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving debt anomaly: Find active credit lines where used_amount is greater than the average used amount for customers in that same risk rating tier. Return id, customer_id, total limit, and used amount.",
    "context_notes": "Correlated subquery joining credit_lines with customers on risk_rating.",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG",
      "JOIN"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "total_limit",
      "used_amount"
    ],
    "reference_sql": "SELECT cl.id, cl.customer_id, cl.total_limit, cl.used_amount FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' AND cl.used_amount > (SELECT AVG(cl2.used_amount) FROM credit_lines cl2 JOIN customers c2 ON cl2.customer_id = c2.id WHERE c2.risk_rating = c.risk_rating AND cl2.status = 'active') ORDER BY cl.used_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate risk-tier average used amount in correlated subquery.",
      "Filter credit lines where used_amount exceeds benchmark."
    ],
    "solution_explanation": "Identifies revolving borrowers over-leveraged relative to peers in the same risk band.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-035",
    "domain": "finance",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Merchants With Card Swipes Exceeding Category Average Ticket",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant ticket outliers: Find merchants who have processed a card swipe whose amount exceeds the average swipe amount for that merchant category. Return distinct merchant name and category.",
    "context_notes": "Correlated subquery: amount > (SELECT AVG(cs2.amount) FROM card_swipes cs2 JOIN merchants m2 ON cs2.merchant_id = m2.id WHERE m2.category = m.category).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "name",
      "category"
    ],
    "reference_sql": "SELECT DISTINCT m.name, m.category FROM merchants m JOIN card_swipes cs ON m.id = cs.merchant_id WHERE cs.amount > (SELECT AVG(cs2.amount) FROM card_swipes cs2 JOIN merchants m2 ON cs2.merchant_id = m2.id WHERE m2.category = m.category) ORDER BY m.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare swipe amount against category average in correlated subquery.",
      "Select distinct merchant name and category."
    ],
    "solution_explanation": "Surfaces merchants processing transaction amounts substantially above category norms.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-036",
    "domain": "finance",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Customers With Zero Recorded Credit Lines (NOT EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Unleveraged credit candidates: Find customers with credit score >= 720 who have NO active credit lines on file using NOT EXISTS. Return customer id, name, credit score, and annual income.",
    "context_notes": "NOT EXISTS correlating customers with credit_lines.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT c.id, c.name, c.credit_score, c.annual_income FROM customers c WHERE c.credit_score >= 720 AND NOT EXISTS (SELECT 1 FROM credit_lines cl WHERE cl.customer_id = c.id AND cl.status = 'active') ORDER BY c.credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter credit_score >= 720 with NOT EXISTS in active credit_lines.",
      "Order by credit_score DESC."
    ],
    "solution_explanation": "Identifies prime credit prospects for revolving credit card pre-approvals.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-037",
    "domain": "finance",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Branches Managing Greater Than Average Number of Accounts (Derived Table)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch workload scale: Find branches managing strictly more accounts than the average account count per branch. Return branch name, city, and managed accounts count.",
    "context_notes": "Derived table computing accounts per branch, compared to average in outer query.",
    "concepts": [
      "SELECT",
      "DERIVED TABLE",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "accounts_count"
    ],
    "reference_sql": "SELECT b_accs.branch_name, b_accs.city, b_accs.cnt AS accounts_count FROM (SELECT b.branch_name, b.city, COUNT(a.id) AS cnt FROM branches b JOIN accounts a ON b.id = a.branch_id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city) b_accs WHERE b_accs.cnt > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(a2.id) AS cnt FROM accounts a2 WHERE a2.status = 'active' GROUP BY a2.branch_id) sub) ORDER BY accounts_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute active accounts per branch in derived table.",
      "Filter branches exceeding average account count across all branches."
    ],
    "solution_explanation": "Identifies high-traffic branch offices requiring expanded customer service desks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-038",
    "domain": "finance",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Customers Holding Both a Mortgage and a Checking Account (EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Mortgage banking relationship: Find customers who hold an active checking account AND an active Mortgage loan using dual EXISTS. Return customer name, credit score, and annual income.",
    "context_notes": "Dual EXISTS for checking accounts and Mortgage loans.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, c.annual_income FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id AND a.account_type = 'checking' AND a.status = 'active') AND EXISTS (SELECT 1 FROM loans l WHERE l.customer_id = c.id AND l.loan_type = 'Mortgage' AND l.status = 'current') ORDER BY c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customers with checking accounts and mortgage loans.",
      "Select name, credit_score, annual_income."
    ],
    "solution_explanation": "Surfaces prime mortgage borrowers utilizing bank depository checking services.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-039",
    "domain": "finance",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Accounts With Recent High-Value Wire Transactions (EXISTS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "High-dollar wire accounts: Find active accounts that have executed at least one wire transaction of $5,000 or greater using an EXISTS clause. Return account id, customer id, and balance.",
    "context_notes": "EXISTS correlating accounts with transactions WHERE transaction_type = wire AND amount >= 5000.00.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT a.id, a.customer_id, a.balance FROM accounts a WHERE a.status = 'active' AND EXISTS (SELECT 1 FROM transactions t WHERE t.account_id = a.id AND t.transaction_type = 'wire' AND t.amount >= 5000.00) ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate accounts with wire transactions >= 5000 in EXISTS.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Isolates accounts actively transacting high-value wire transfers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-040",
    "domain": "finance",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Borrowers Whose Cumulative Payments Exceed 10% of Principal",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Amortization milestones: Find current loans where total loan payments made exceed 10% of the loan principal amount. Return loan id, customer id, principal amount, and total payments made.",
    "context_notes": "JOIN loans with loan_payments GROUP BY loan HAVING SUM(payment_amount) > 0.10 * principal_amount.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "principal_amount",
      "total_payments"
    ],
    "reference_sql": "SELECT l.id, l.customer_id, l.principal_amount, ROUND(SUM(lp.payment_amount), 2) AS total_payments FROM loans l JOIN loan_payments lp ON l.id = lp.loan_id WHERE l.status = 'current' GROUP BY l.id, l.customer_id, l.principal_amount HAVING SUM(lp.payment_amount) > (0.10 * l.principal_amount) ORDER BY total_payments DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to loan_payments.",
      "Filter in HAVING for SUM(payment_amount) > 0.10 * principal_amount."
    ],
    "solution_explanation": "Identifies seasoned borrowers who have paid down over 10% of debt obligations.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-041",
    "domain": "finance",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Customers With Overdue Loans and No Investment Assets (NOT EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Uncollateralized credit distress: Find customers who have a loan with status late and have NO investments on file using NOT EXISTS. Return customer id, name, credit score, and risk rating.",
    "context_notes": "EXISTS late loans AND NOT EXISTS investments.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "credit_score",
      "risk_rating"
    ],
    "reference_sql": "SELECT c.id, c.name, c.credit_score, c.risk_rating FROM customers c WHERE EXISTS (SELECT 1 FROM loans l WHERE l.customer_id = c.id AND l.status = 'late') AND NOT EXISTS (SELECT 1 FROM investments inv WHERE inv.customer_id = c.id) ORDER BY c.credit_score ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Verify customer has late loan with EXISTS.",
      "Ensure no investment portfolio exists with NOT EXISTS."
    ],
    "solution_explanation": "Flags vulnerable borrowers in default without secondary investment wealth.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-042",
    "domain": "finance",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Branches Originating More Commercial Loans Than Branch Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Corporate banking hubs: Find branches that have originated more Business loans than the average Business loan count per branch. Return branch name, city, and business loan count.",
    "context_notes": "Subquery comparing branch Business loan count against average Business loan count.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "business_loans_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, COUNT(l.id) AS business_loans_count FROM branches b JOIN loans l ON b.id = l.branch_id WHERE l.loan_type = 'Business' GROUP BY b.id, b.branch_name, b.city HAVING COUNT(l.id) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(l2.id) AS cnt FROM loans l2 WHERE l2.loan_type = 'Business' GROUP BY l2.branch_id) sub) ORDER BY business_loans_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Count business loans per branch.",
      "Filter in HAVING against average business loans per branch."
    ],
    "solution_explanation": "Highlights top corporate banking centers driving commercial debt origination.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-043",
    "domain": "finance",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Cards With No Swipes Recorded in Recent Cycles (NOT EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Dormant card portfolio: Find all active cards that have ZERO card swipes recorded in our card_swipes table using NOT EXISTS. Return card id, card type, masked card number, and daily limit.",
    "context_notes": "NOT EXISTS correlating cards with card_swipes.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "card_number_masked",
      "daily_limit"
    ],
    "reference_sql": "SELECT c.id, c.card_type, c.card_number_masked, c.daily_limit FROM cards c WHERE c.status = 'active' AND NOT EXISTS (SELECT 1 FROM card_swipes cs WHERE cs.card_id = c.id) ORDER BY c.daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter active cards with NOT EXISTS in card_swipes.",
      "Order by daily_limit DESC."
    ],
    "solution_explanation": "Isolates dormant cardholder accounts for activation marketing campaigns.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-044",
    "domain": "finance",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Customers With Balance Across Accounts Exceeding City Average",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Metropolitan deposit outperformance: Find customers whose total active deposit balance is strictly greater than the average customer deposit balance in their branch city. Return customer name, branch city, and total deposits.",
    "context_notes": "Correlated subquery comparing customer deposit total against city average.",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "branch_city",
      "total_deposits"
    ],
    "reference_sql": "SELECT c.name, c.branch_city, ROUND(SUM(a.balance), 2) AS total_deposits FROM customers c JOIN accounts a ON c.id = a.customer_id WHERE a.status = 'active' GROUP BY c.id, c.name, c.branch_city HAVING SUM(a.balance) > (SELECT AVG(sub.tot) FROM (SELECT SUM(a2.balance) AS tot FROM accounts a2 JOIN customers c2 ON a2.customer_id = c2.id WHERE c2.branch_city = c.branch_city AND a2.status = 'active' GROUP BY c2.id) sub) ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute customer total balance.",
      "Compare in HAVING against average customer balance in that city."
    ],
    "solution_explanation": "Identifies anchor deposit relationships outperforming local market peers.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-045",
    "domain": "finance",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Borrowers Paying More Interest Than Principal on Loans",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Interest-heavy debt service: Find loans where the cumulative interest portion paid strictly exceeds the cumulative principal portion paid. Return loan id, customer id, principal paid, and interest paid.",
    "context_notes": "JOIN loans with loan_payments GROUP BY loan HAVING SUM(interest_portion) > SUM(principal_portion).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "total_principal_paid",
      "total_interest_paid"
    ],
    "reference_sql": "SELECT l.id, l.customer_id, ROUND(SUM(lp.principal_portion), 2) AS total_principal_paid, ROUND(SUM(lp.interest_portion), 2) AS total_interest_paid FROM loans l JOIN loan_payments lp ON l.id = lp.loan_id GROUP BY l.id, l.customer_id HAVING SUM(lp.interest_portion) > SUM(lp.principal_portion) ORDER BY total_interest_paid DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to loan_payments.",
      "Filter in HAVING for SUM(interest_portion) > SUM(principal_portion)."
    ],
    "solution_explanation": "Identifies loans in early amortization schedules where interest dominates monthly payments.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-046",
    "domain": "finance",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "High Fraud Score Cardholders Holding Checking Accounts (EXISTS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Compromised account monitoring: Find customers holding active checking accounts whose cards have swiped with fraud_score >= 75 using an EXISTS clause. Return customer id, name, and checking balance.",
    "context_notes": "EXISTS correlating customers → accounts → cards → card_swipes WHERE fraud_score >= 75.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "checking_balance"
    ],
    "reference_sql": "SELECT c.id, c.name, a.balance AS checking_balance FROM customers c JOIN accounts a ON c.id = a.customer_id WHERE a.account_type = 'checking' AND a.status = 'active' AND EXISTS (SELECT 1 FROM cards cr JOIN card_swipes cs ON cr.id = cs.card_id WHERE cr.account_id = a.id AND cs.fraud_score >= 75) ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate checking account with cards and high-fraud card swipes in EXISTS.",
      "Select customer identity and balance."
    ],
    "solution_explanation": "Flags depository accounts linked to suspect debit card transactions.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-047",
    "domain": "finance",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Branches Holding Vault Cash Greater Than Average of Other Branches in State",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "State vault cash centralization: Find branches whose vault cash limit exceeds the average vault limit of all other branches in that same state. Return branch name, state, and vault cash limit.",
    "context_notes": "Correlated subquery: vault_cash_limit > (SELECT AVG(b2.vault_cash_limit) FROM branches b2 WHERE b2.state = b.state AND b2.id != b.id).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "branch_name",
      "state",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.state, b.vault_cash_limit FROM branches b WHERE b.vault_cash_limit > (SELECT AVG(b2.vault_cash_limit) FROM branches b2 WHERE b2.state = b.state AND b2.id != b.id) ORDER BY b.state, b.vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate other branches state average vault cash in correlated subquery.",
      "Filter branches exceeding that benchmark."
    ],
    "solution_explanation": "Identifies central cash vault hubs within multi-branch state networks.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-048",
    "domain": "finance",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Customers With Multiple Loan Payments Completed",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Seasoned debt service cohort: Find customers who have made strictly more than 1 completed loan payment across their loan portfolio. Return customer name, credit score, and payments count.",
    "context_notes": "JOIN customers → loans → loan_payments WHERE lp.status = completed, GROUP BY customer HAVING COUNT > 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "payments_count"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, COUNT(lp.id) AS payments_count FROM customers c JOIN loans l ON c.id = l.customer_id JOIN loan_payments lp ON l.id = lp.loan_id WHERE lp.status = 'completed' GROUP BY c.id, c.name, c.credit_score HAVING COUNT(lp.id) > 1 ORDER BY payments_count DESC, c.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to loans and loan_payments.",
      "Group by customer with HAVING COUNT(lp.id) > 1."
    ],
    "solution_explanation": "Surfaces reliable borrowers building verified repayment track records.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-049",
    "domain": "finance",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Investment Portfolios With Current Value Greater Than Portfolio Type Average",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Asset management benchmark: Find investment accounts whose current value is strictly greater than the average current value of portfolios sharing the same portfolio_type. Return id, customer_id, portfolio type, and current value.",
    "context_notes": "Correlated subquery: current_value > (SELECT AVG(inv2.current_value) FROM investments inv2 WHERE inv2.portfolio_type = inv.portfolio_type).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "portfolio_type",
      "current_value"
    ],
    "reference_sql": "SELECT inv.id, inv.customer_id, inv.portfolio_type, inv.current_value FROM investments inv WHERE inv.current_value > (SELECT AVG(inv2.current_value) FROM investments inv2 WHERE inv2.portfolio_type = inv.portfolio_type) ORDER BY inv.portfolio_type, inv.current_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute portfolio type average value in correlated subquery.",
      "Select investment portfolios exceeding category average."
    ],
    "solution_explanation": "Identifies premier client holdings within each investment strategy.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-050",
    "domain": "finance",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Borrowers With Credit Lines Exceeding 80% Utilization (EXISTS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit stress: Find customers who maintain an active credit line where utilization percentage (used_amount / total_limit) >= 0.80 using an EXISTS clause. Return customer id, name, credit score, and risk rating.",
    "context_notes": "EXISTS correlating customers with credit_lines WHERE used_amount / total_limit >= 0.80.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "credit_score",
      "risk_rating"
    ],
    "reference_sql": "SELECT c.id, c.name, c.credit_score, c.risk_rating FROM customers c WHERE EXISTS (SELECT 1 FROM credit_lines cl WHERE cl.customer_id = c.id AND cl.status = 'active' AND (cl.used_amount / cl.total_limit) >= 0.80) ORDER BY c.credit_score ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customers with credit_lines exceeding 80% utilization in EXISTS.",
      "Select customer identity and credit parameters."
    ],
    "solution_explanation": "Surfaces highly leveraged revolving borrowers nearing credit line caps.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-051",
    "domain": "finance",
    "level": 3,
    "order": 51,
    "difficulty": "advanced",
    "title": "Customer Credit Worthiness and Loan Eligibility Brackets",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Underwriting eligibility matrix: Classify each customer into creditworthiness tiers: Super Prime (credit_score >= 760), Prime (700 to 759), Near Prime (650 to 699), Subprime (< 650). Return customer name, credit score, annual income, and eligibility tier.",
    "context_notes": "CASE statement on credit_score.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income",
      "eligibility_tier"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income, CASE WHEN credit_score >= 760 THEN 'Super Prime' WHEN credit_score BETWEEN 700 AND 759 THEN 'Prime' WHEN credit_score BETWEEN 650 AND 699 THEN 'Near Prime' ELSE 'Subprime' END AS eligibility_tier FROM customers ORDER BY credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify credit_score into 4 underwriting tiers using CASE WHEN.",
      "Order by credit_score DESC."
    ],
    "solution_explanation": "Standardizes customer credit scoring into automated lending approval bands.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-052",
    "domain": "finance",
    "level": 3,
    "order": 52,
    "difficulty": "advanced",
    "title": "Investment Portfolio Performance Stratification",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Asset management return tiers: For each investment account, calculate capital gain percentage ((current_value - total_invested) / total_invested * 100) and categorize into: High Performer (>= 15%), Moderate Gain (5% to 14.9%), Flat/Loss (< 5%). Return id, customer_id, portfolio type, gain pct, and performance tier.",
    "context_notes": "CASE on capital gain percentage on investments.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "portfolio_type",
      "gain_pct",
      "performance_tier"
    ],
    "reference_sql": "SELECT id, customer_id, portfolio_type, ROUND((current_value - total_invested) / total_invested * 100.0, 1) AS gain_pct, CASE WHEN ((current_value - total_invested) / total_invested * 100.0) >= 15.0 THEN 'High Performer' WHEN ((current_value - total_invested) / total_invested * 100.0) BETWEEN 5.0 AND 14.99 THEN 'Moderate Gain' ELSE 'Flat/Loss' END AS performance_tier FROM investments ORDER BY gain_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate capital gain percentage.",
      "Classify into performance tiers using CASE."
    ],
    "solution_explanation": "Stratifies investment portfolios by unrealized capital appreciation.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-053",
    "domain": "finance",
    "level": 3,
    "order": 53,
    "difficulty": "advanced",
    "title": "Fraud Alert Escalation Matrix by Severity and Status",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "AML alert triage: Classify fraud alerts into operational action tiers: Immediate Freeze (severity = CRITICAL), Escalated Review (severity = HIGH), Standard Monitoring (MEDIUM or LOW) using CASE. Return alert id, transaction id, severity, rule triggered, and action tier.",
    "context_notes": "CASE on severity in fraud_alerts.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "id",
      "transaction_id",
      "severity",
      "rule_triggered",
      "action_tier"
    ],
    "reference_sql": "SELECT id, transaction_id, severity, rule_triggered, CASE WHEN severity = 'CRITICAL' THEN 'Immediate Freeze' WHEN severity = 'HIGH' THEN 'Escalated Review' ELSE 'Standard Monitoring' END AS action_tier FROM fraud_alerts ORDER BY severity ASC, id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Map severity to action tiers using CASE WHEN.",
      "Select alert attributes."
    ],
    "solution_explanation": "Structures compliance alert workflows based on severity thresholds.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-054",
    "domain": "finance",
    "level": 3,
    "order": 54,
    "difficulty": "advanced",
    "title": "Loan Repayment Structure: Principal vs Interest Amortization",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Loan installment composition: For loan payments, calculate what percentage of the payment went toward principal vs interest, and classify payments into: Principal Heavy (principal_portion >= 60%), Balanced (40%-59%), Interest Heavy (< 40%). Return payment id, loan id, payment amount, and amortization tier.",
    "context_notes": "CASE on principal_portion / payment_amount.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "id",
      "loan_id",
      "payment_amount",
      "principal_pct",
      "amortization_tier"
    ],
    "reference_sql": "SELECT id, loan_id, payment_amount, ROUND(principal_portion / payment_amount * 100.0, 1) AS principal_pct, CASE WHEN (principal_portion / payment_amount * 100.0) >= 60.0 THEN 'Principal Heavy' WHEN (principal_portion / payment_amount * 100.0) BETWEEN 40.0 AND 59.99 THEN 'Balanced' ELSE 'Interest Heavy' END AS amortization_tier FROM loan_payments ORDER BY principal_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute principal percentage of payment.",
      "Classify into amortization tiers via CASE."
    ],
    "solution_explanation": "Analyzes debt service equity accumulation across borrower repayments.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-055",
    "domain": "finance",
    "level": 3,
    "order": 55,
    "difficulty": "advanced",
    "title": "Customer Total Depository Liquidity Brackets",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Private banking qualification: For customers with active accounts, calculate their total deposit balance and classify them into relationship tiers: Private Client ($100k+), Premier ($50k-$99k), Preferred ($25k-$49k), Standard (< $25k). Return customer name, total deposits, and relationship tier.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY customer, CASE on SUM(balance).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "total_deposits",
      "relationship_tier"
    ],
    "reference_sql": "SELECT c.name, ROUND(SUM(a.balance), 2) AS total_deposits, CASE WHEN SUM(a.balance) >= 100000.00 THEN 'Private Client' WHEN SUM(a.balance) BETWEEN 50000.00 AND 99999.99 THEN 'Premier' WHEN SUM(a.balance) BETWEEN 25000.00 AND 49999.99 THEN 'Preferred' ELSE 'Standard' END AS relationship_tier FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.id, c.name ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers for active accounts.",
      "Sum balance per customer and categorize using CASE."
    ],
    "solution_explanation": "Defines tiered wealth management service levels based on customer liquidity.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-056",
    "domain": "finance",
    "level": 3,
    "order": 56,
    "difficulty": "advanced",
    "title": "Loan Portfolio Delinquency Breakdown by Branch",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Branch credit quality index: For each branch, calculate total loans originated, total current loans count, and total late loans count using conditional SUM(CASE). Return branch name, city, current count, and late count.",
    "context_notes": "JOIN loans with branches, GROUP BY branch, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "current_loans",
      "late_loans"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, SUM(CASE WHEN l.status = 'current' THEN 1 ELSE 0 END) AS current_loans, SUM(CASE WHEN l.status = 'late' THEN 1 ELSE 0 END) AS late_loans FROM loans l JOIN branches b ON l.branch_id = b.id GROUP BY b.id, b.branch_name, b.city ORDER BY late_loans DESC, current_loans DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Pivot current vs late loan counts using conditional SUM."
    ],
    "solution_explanation": "Assesses loan portfolio asset performance and default risk by branch location.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-057",
    "domain": "finance",
    "level": 3,
    "order": 57,
    "difficulty": "advanced",
    "title": "Merchant Point-of-Sale Fraud Rate and Transaction Density",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant acquiring risk scorecard: For each merchant, calculate total swipes count, high-risk swipes count (fraud_score >= 60), and high-risk percentage. Return merchant name, category, total swipes, high risk swipes, and high risk percentage.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY merchant, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "category",
      "total_swipes",
      "high_risk_swipes",
      "high_risk_pct"
    ],
    "reference_sql": "SELECT m.name, m.category, COUNT(cs.id) AS total_swipes, SUM(CASE WHEN cs.fraud_score >= 60 THEN 1 ELSE 0 END) AS high_risk_swipes, ROUND(SUM(CASE WHEN cs.fraud_score >= 60 THEN 1.0 ELSE 0.0 END) / COUNT(cs.id) * 100.0, 1) AS high_risk_pct FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.id, m.name, m.category ORDER BY high_risk_pct DESC, high_risk_swipes DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant.",
      "Calculate high-risk swipe count and percentage."
    ],
    "solution_explanation": "Measures counterparty risk and chargeback exposure for commercial merchant acquiring.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-058",
    "domain": "finance",
    "level": 3,
    "order": 58,
    "difficulty": "advanced",
    "title": "Credit Line Risk Exposure: High Limit vs High Utilization Matrix",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit stress quadrant: For active credit lines, classify credit risk into: Over-Leveraged (utilization >= 70%), Active Usage (30%-69%), Low Draw (< 30%). Return customer_id, total limit, used amount, and risk quadrant.",
    "context_notes": "CASE on used_amount / total_limit in credit_lines WHERE status = active.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "customer_id",
      "total_limit",
      "used_amount",
      "risk_quadrant"
    ],
    "reference_sql": "SELECT customer_id, total_limit, used_amount, CASE WHEN (used_amount / total_limit) >= 0.70 THEN 'Over-Leveraged' WHEN (used_amount / total_limit) BETWEEN 0.30 AND 0.6999 THEN 'Active Usage' ELSE 'Low Draw' END AS risk_quadrant FROM credit_lines WHERE status = 'active' ORDER BY (used_amount / total_limit) DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute utilization ratio in CASE statement.",
      "Filter for active credit lines."
    ],
    "solution_explanation": "Structures revolving debt portfolio into operational credit management cohorts.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-059",
    "domain": "finance",
    "level": 3,
    "order": 59,
    "difficulty": "advanced",
    "title": "Branch Vault Cash Ceiling vs Depository Balance Proportion",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity backing: For branches managing active accounts, calculate total deposit balance, vault cash limit, and classify branches into: Highly Backed (vault >= 25% of deposits), Moderately Backed (10%-24%), Lean Vault (< 10%). Return branch name, city, deposits, vault limit, and backing tier.",
    "context_notes": "JOIN accounts with branches WHERE status = active, GROUP BY branch, CASE on vault / SUM(balance).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "vault_cash_limit",
      "backing_tier"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_deposits, b.vault_cash_limit, CASE WHEN (b.vault_cash_limit / SUM(a.balance)) >= 0.25 THEN 'Highly Backed' WHEN (b.vault_cash_limit / SUM(a.balance)) BETWEEN 0.10 AND 0.2499 THEN 'Moderately Backed' ELSE 'Lean Vault' END AS backing_tier FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches for active accounts.",
      "Calculate vault-to-deposit ratio in CASE statement."
    ],
    "solution_explanation": "Evaluates cash liquidity reserves relative to depository commitments per branch.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-060",
    "domain": "finance",
    "level": 3,
    "order": 60,
    "difficulty": "advanced",
    "title": "Loan Repayment Pace: Paid Off vs Active Loans by Branch",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Loan maturity and payoff tracking: For each branch, count loans currently active (current), late loans (late), and fully settled loans (paid_off) using conditional SUM(CASE). Return branch name, city, current count, late count, and paid off count.",
    "context_notes": "JOIN loans with branches, GROUP BY branch, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "current_count",
      "late_count",
      "paid_off_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, SUM(CASE WHEN l.status = 'current' THEN 1 ELSE 0 END) AS current_count, SUM(CASE WHEN l.status = 'late' THEN 1 ELSE 0 END) AS late_count, SUM(CASE WHEN l.status = 'paid_off' THEN 1 ELSE 0 END) AS paid_off_count FROM loans l JOIN branches b ON l.branch_id = b.id GROUP BY b.id, b.branch_name, b.city ORDER BY current_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Pivot loan status counts using conditional SUM."
    ],
    "solution_explanation": "Tracks credit asset maturation and portfolio seasoning across regional branch offices.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-061",
    "domain": "finance",
    "level": 3,
    "order": 61,
    "difficulty": "advanced",
    "title": "Investment Asset Distribution by Portfolio Strategy",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Strategy allocation breakdown: For each portfolio type (Aggressive_Growth, Balanced, Fixed_Income, ESG), calculate total invested principal, total current valuation, and overall capital gain percentage. Return portfolio type, total invested, current valuation, and gain percentage.",
    "context_notes": "GROUP BY portfolio_type on investments, SUM, ARITHMETIC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "portfolio_type",
      "total_invested",
      "current_valuation",
      "gain_pct"
    ],
    "reference_sql": "SELECT portfolio_type, ROUND(SUM(total_invested), 2) AS total_invested, ROUND(SUM(current_value), 2) AS current_valuation, ROUND((SUM(current_value) - SUM(total_invested)) / SUM(total_invested) * 100.0, 1) AS gain_pct FROM investments GROUP BY portfolio_type ORDER BY current_valuation DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group investments by portfolio_type.",
      "Sum invested and current value.",
      "Compute aggregate gain percentage."
    ],
    "solution_explanation": "Monitors capital allocation and performance yield across investment strategies.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-062",
    "domain": "finance",
    "level": 3,
    "order": 62,
    "difficulty": "advanced",
    "title": "Fraud Alert Rule Violation Frequency and Criticality",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Rule engine effectiveness: For each rule_triggered in fraud_alerts, count total alerts generated, critical alerts count (severity = CRITICAL), and high alerts count (severity = HIGH). Return rule name, total alerts, critical count, and high count.",
    "context_notes": "GROUP BY rule_triggered on fraud_alerts, conditional SUM.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM CASE"
    ],
    "expected_columns": [
      "rule_triggered",
      "total_alerts",
      "critical_count",
      "high_count"
    ],
    "reference_sql": "SELECT rule_triggered, COUNT(id) AS total_alerts, SUM(CASE WHEN severity = 'CRITICAL' THEN 1 ELSE 0 END) AS critical_count, SUM(CASE WHEN severity = 'HIGH' THEN 1 ELSE 0 END) AS high_count FROM fraud_alerts GROUP BY rule_triggered ORDER BY total_alerts DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group fraud alerts by rule_triggered.",
      "Pivot critical and high severity counts using conditional SUM."
    ],
    "solution_explanation": "Assesses fraud detection rule trigger frequency and severity distribution.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-063",
    "domain": "finance",
    "level": 3,
    "order": 63,
    "difficulty": "advanced",
    "title": "Customer Cross-Holdings: Deposits and Revolving Credit Utilization",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Balance sheet liquidity vs debt: For customers holding both active checking accounts and active credit lines, calculate total checking balance and credit line used amount. Classify customers into: Net Cash Positive (checking > used amount) vs Net Debt Negative. Return customer name, checking balance, credit used, and balance position.",
    "context_notes": "JOIN customers with accounts and credit_lines, CASE comparing checking balance to credit used.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "checking_balance",
      "credit_used",
      "balance_position"
    ],
    "reference_sql": "SELECT c.name, a.balance AS checking_balance, cl.used_amount AS credit_used, CASE WHEN a.balance >= cl.used_amount THEN 'Net Cash Positive' ELSE 'Net Debt Negative' END AS balance_position FROM customers c JOIN accounts a ON c.id = a.customer_id AND a.account_type = 'checking' AND a.status = 'active' JOIN credit_lines cl ON c.id = cl.customer_id AND cl.status = 'active' ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join checking accounts to active credit lines.",
      "Compare checking_balance with credit_used in CASE statement."
    ],
    "solution_explanation": "Profiles customer net liquidity position across deposit and revolving credit facilities.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-064",
    "domain": "finance",
    "level": 3,
    "order": 64,
    "difficulty": "advanced",
    "title": "Commercial Business Loan Concentration by Customer Risk Rating",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Corporate lending risk: For loans of loan_type Business, calculate total principal outstanding and loan count grouped by customer risk_rating. Order by total principal descending.",
    "context_notes": "JOIN loans with customers WHERE loan_type = Business AND loans.status = current, GROUP BY risk_rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "risk_rating",
      "total_business_principal",
      "loans_count"
    ],
    "reference_sql": "SELECT c.risk_rating, ROUND(SUM(l.principal_amount), 2) AS total_business_principal, COUNT(l.id) AS loans_count FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.loan_type = 'Business' AND l.status = 'current' GROUP BY c.risk_rating ORDER BY total_business_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join current business loans to customers.",
      "Group by customer risk rating and sum principal."
    ],
    "solution_explanation": "Examines credit risk allocation across commercial business debt portfolios.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-065",
    "domain": "finance",
    "level": 3,
    "order": 65,
    "difficulty": "advanced",
    "title": "Card Swipes Average Ticket and Fraud Velocity by Hour of Day",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Hourly POS fraud velocity: Group card swipes by hour of the day (EXTRACT(HOUR FROM transaction_date)). Calculate total swipes count, average ticket size, and average fraud score. Order chronologically by hour.",
    "context_notes": "GROUP BY EXTRACT(HOUR FROM transaction_date) on card_swipes.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "AVG",
      "EXTRACT",
      "ROUND"
    ],
    "expected_columns": [
      "hour_of_day",
      "swipes_count",
      "avg_ticket",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT EXTRACT(HOUR FROM transaction_date) AS hour_of_day, COUNT(id) AS swipes_count, ROUND(AVG(amount), 2) AS avg_ticket, ROUND(AVG(fraud_score), 1) AS avg_fraud_score FROM card_swipes GROUP BY EXTRACT(HOUR FROM transaction_date) ORDER BY hour_of_day ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract hour from transaction_date.",
      "Compute count, avg amount, and avg fraud score per hour."
    ],
    "solution_explanation": "Identifies peak hours for point-of-sale card transactions and suspicious velocity.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-066",
    "domain": "finance",
    "level": 3,
    "order": 66,
    "difficulty": "advanced",
    "title": "Loan Payment Amortization Pace by Loan Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Amortization velocity by product: For each loan type, calculate total payment amount received, total principal paid down, and total interest collected across completed payments. Return loan type, total payments, principal paid down, and interest collected.",
    "context_notes": "JOIN loans with loan_payments WHERE loan_payments.status = completed, GROUP BY loan_type.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "loan_type",
      "total_payments_received",
      "principal_paid_down",
      "interest_collected"
    ],
    "reference_sql": "SELECT l.loan_type, ROUND(SUM(lp.payment_amount), 2) AS total_payments_received, ROUND(SUM(lp.principal_portion), 2) AS principal_paid_down, ROUND(SUM(lp.interest_portion), 2) AS interest_collected FROM loans l JOIN loan_payments lp ON l.id = lp.loan_id WHERE lp.status = 'completed' GROUP BY l.loan_type ORDER BY total_payments_received DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to completed loan_payments.",
      "Group by loan_type and sum payments, principal, and interest."
    ],
    "solution_explanation": "Analyzes principal paydown and interest income across credit asset classes.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-067",
    "domain": "finance",
    "level": 3,
    "order": 67,
    "difficulty": "advanced",
    "title": "Customer Investment Exposure vs Annual Income Multiplier",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Wealth-to-income multiplier: For customers with investments, calculate total invested amount and the ratio of investment to annual income (invested / annual_income). Classify into: High Wealth (ratio >= 1.0), Moderate Wealth (0.5 to 0.99), Emerging (< 0.5). Return customer name, annual income, total invested, and wealth tier.",
    "context_notes": "JOIN investments with customers, GROUP BY customer, CASE on SUM(total_invested) / annual_income.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "total_invested",
      "wealth_multiplier_tier"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, ROUND(SUM(inv.total_invested), 2) AS total_invested, CASE WHEN (SUM(inv.total_invested) / c.annual_income) >= 1.0 THEN 'High Wealth' WHEN (SUM(inv.total_invested) / c.annual_income) BETWEEN 0.5 AND 0.9999 THEN 'Moderate Wealth' ELSE 'Emerging' END AS wealth_multiplier_tier FROM investments inv JOIN customers c ON inv.customer_id = c.id GROUP BY c.id, c.name, c.annual_income ORDER BY total_invested DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join investments to customers.",
      "Divide total invested by annual_income in CASE statement."
    ],
    "solution_explanation": "Measures customer accumulated wealth relative to annual salary.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-068",
    "domain": "finance",
    "level": 3,
    "order": 68,
    "difficulty": "advanced",
    "title": "Branch Vault Cash Adequacy vs Regional Loan Delinquencies",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Stress testing regional liquidity: For each branch, calculate vault cash limit and total overdue principal on late loans. Return branch name, city, vault cash limit, and late loan principal.",
    "context_notes": "JOIN branches with loans, GROUP BY branch, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "vault_cash_limit",
      "late_loan_principal"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, b.vault_cash_limit, ROUND(SUM(CASE WHEN l.status = 'late' THEN l.principal_amount ELSE 0 END), 2) AS late_loan_principal FROM branches b LEFT JOIN loans l ON b.id = l.branch_id GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY late_loan_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to loans with LEFT JOIN.",
      "Sum principal_amount where status = late per branch."
    ],
    "solution_explanation": "Compares branch physical cash reserves against non-performing credit assets.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-069",
    "domain": "finance",
    "level": 3,
    "order": 69,
    "difficulty": "advanced",
    "title": "High Value Customer Deposits With Zero Wire Outflows",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Stable deposit accumulation: Find customers whose active account balances exceed $50,000 and who have NEVER initiated an outgoing wire transaction using NOT EXISTS. Return customer name, credit score, and total balance.",
    "context_notes": "JOIN accounts with customers WHERE status = active, NOT EXISTS wire transactions.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "NOT EXISTS",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_balance"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(SUM(a.balance), 2) AS total_balance FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' AND NOT EXISTS (SELECT 1 FROM transactions t WHERE t.account_id = a.id AND t.transaction_type = 'wire') GROUP BY c.id, c.name, c.credit_score HAVING SUM(a.balance) >= 50000.00 ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers for active status.",
      "Filter NOT EXISTS for wire transactions with HAVING balance >= 50000."
    ],
    "solution_explanation": "Identifies sticky, non-volatile depository relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-070",
    "domain": "finance",
    "level": 3,
    "order": 70,
    "difficulty": "advanced",
    "title": "Credit Lines Near Maximum Draw: Overdue Borrowers",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Double distress indicator: Find customers who have a loan with status late AND also hold an active credit line with used_amount >= 0.50 * total_limit. Return customer name, credit score, loan principal, and credit line limit.",
    "context_notes": "JOIN customers with loans and credit_lines WHERE l.status = late AND cl.used_amount >= 0.50 * cl.total_limit.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "loan_principal",
      "credit_limit"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, l.principal_amount AS loan_principal, cl.total_limit AS credit_limit FROM customers c JOIN loans l ON c.id = l.customer_id JOIN credit_lines cl ON c.id = cl.customer_id WHERE l.status = 'late' AND cl.status = 'active' AND cl.used_amount >= (0.50 * cl.total_limit) ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to late loans and heavily drawn active credit lines.",
      "Select identity and credit parameters."
    ],
    "solution_explanation": "Pinpoints high-risk borrowers in active default on term loans and credit lines.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-071",
    "domain": "finance",
    "level": 3,
    "order": 71,
    "difficulty": "advanced",
    "title": "Merchant Category Acquiring Volumes and Average Fraud Scores",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant vertical risk matrix: For each merchant category, calculate total swipes, gross dollar volume, and average fraud score. Classify categories into: Low Risk (fraud score < 30), Moderate Risk (30-49), Elevated Risk (>= 50). Return category, total volume, avg fraud score, and risk tier.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY category, CASE on AVG(fraud_score).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "AVG",
      "CASE WHEN"
    ],
    "expected_columns": [
      "category",
      "gross_volume",
      "avg_fraud_score",
      "risk_tier"
    ],
    "reference_sql": "SELECT m.category, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score, CASE WHEN AVG(cs.fraud_score) >= 50.0 THEN 'Elevated Risk' WHEN AVG(cs.fraud_score) BETWEEN 30.0 AND 49.99 THEN 'Moderate Risk' ELSE 'Low Risk' END AS risk_tier FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.category ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by category.",
      "Classify average fraud score into risk tiers using CASE."
    ],
    "solution_explanation": "Synthesizes commercial merchant payment volumes with fraud vulnerability.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-072",
    "domain": "finance",
    "level": 3,
    "order": 72,
    "difficulty": "advanced",
    "title": "Customers With Multi-Branch Depository Accounts",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Multi-branch relationship banking: Find customers who hold active depository accounts across 2 or more distinct bank branches. Return customer name, credit score, distinct branch count, and total depository balance.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY customer HAVING COUNT(DISTINCT branch_id) >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "distinct_branches",
      "total_deposits"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, COUNT(DISTINCT a.branch_id) AS distinct_branches, ROUND(SUM(a.balance), 2) AS total_deposits FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.id, c.name, c.credit_score HAVING COUNT(DISTINCT a.branch_id) >= 2 ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers for active accounts.",
      "Filter HAVING COUNT(DISTINCT a.branch_id) >= 2."
    ],
    "solution_explanation": "Surfaces clients actively banking across multiple regional branch locations.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-073",
    "domain": "finance",
    "level": 3,
    "order": 73,
    "difficulty": "advanced",
    "title": "Loan Repayment Speed: Early Amortization vs Baseline Schedule",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Repayment speed index: For completed loan payments, calculate principal portion as percentage of payment amount. Classify payments into: Rapid Amortization (principal >= 75%), Standard (65%-74%), Slow (< 65%). Return payment id, loan id, payment amount, and amortization tier.",
    "context_notes": "CASE on principal_portion / payment_amount on loan_payments.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "loan_id",
      "payment_amount",
      "principal_pct",
      "amortization_tier"
    ],
    "reference_sql": "SELECT id, loan_id, payment_amount, ROUND(principal_portion / payment_amount * 100.0, 1) AS principal_pct, CASE WHEN (principal_portion / payment_amount) >= 0.75 THEN 'Rapid Amortization' WHEN (principal_portion / payment_amount) BETWEEN 0.65 AND 0.7499 THEN 'Standard' ELSE 'Slow' END AS amortization_tier FROM loan_payments WHERE status = 'completed' ORDER BY principal_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter completed payments.",
      "Classify principal_portion percentage via CASE statement."
    ],
    "solution_explanation": "Evaluates principal recovery velocity across consumer loan schedules.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-074",
    "domain": "finance",
    "level": 3,
    "order": 74,
    "difficulty": "advanced",
    "title": "Customer Investment Valuation Multiplier Distribution",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Portfolio capital growth: For each investment record, compute current value as percentage of invested cost (current_value / total_invested * 100). Return id, customer_id, portfolio type, invested cost, current value, and valuation multiplier pct.",
    "context_notes": "Compute (current_value / total_invested * 100.0) on investments.",
    "concepts": [
      "SELECT",
      "ARITHMETIC",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "portfolio_type",
      "total_invested",
      "current_value",
      "valuation_pct"
    ],
    "reference_sql": "SELECT id, customer_id, portfolio_type, total_invested, current_value, ROUND(current_value / total_invested * 100.0, 1) AS valuation_pct FROM investments ORDER BY valuation_pct DESC, current_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate (current_value / total_invested) * 100.0.",
      "Order by valuation_pct DESC."
    ],
    "solution_explanation": "Monitors capital multiplier performance across customer investment portfolios.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L3-075",
    "domain": "finance",
    "level": 3,
    "order": 75,
    "difficulty": "advanced",
    "title": "Branches Vault Cash Ratio to Active Loan Portfolio",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity-to-credit balance: For branches with both active deposits and current loans, calculate total deposits, total loans, and vault cash limit. Return branch name, city, deposits, loans, and vault limit.",
    "context_notes": "JOIN branches with accounts and loans, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "total_loans",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(DISTINCT a.balance), 2) AS total_deposits, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans, b.vault_cash_limit FROM branches b JOIN accounts a ON b.id = a.branch_id AND a.status = 'active' JOIN loans l ON b.id = l.branch_id AND l.status = 'current' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to active accounts and current loans.",
      "Sum distinct deposits and loans."
    ],
    "solution_explanation": "Assesses branch asset-liability funding balance alongside vault reserves.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-076",
    "domain": "finance",
    "level": 3,
    "order": 76,
    "difficulty": "boss",
    "title": "Master Entity Unified Contacts Directory (UNION)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Unified enterprise directory: Combine all regional branch managers and all commercial merchant business names into a single contact list showing entity name, entity role (Branch Manager vs Merchant), and city location. Return entity name, role, and city.",
    "context_notes": "UNION combining branches and merchants.",
    "concepts": [
      "SELECT",
      "UNION",
      "ORDER BY"
    ],
    "expected_columns": [
      "entity_name",
      "entity_role",
      "city"
    ],
    "reference_sql": "SELECT manager_name AS entity_name, 'Branch Manager' AS entity_role, city FROM branches UNION SELECT name AS entity_name, 'Merchant' AS entity_role, city FROM merchants ORDER BY city, entity_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select manager_name, 'Branch Manager', city from branches.",
      "UNION select name, 'Merchant', city from merchants.",
      "Order by city, entity_name."
    ],
    "solution_explanation": "Creates an integrated master directory of internal branch leadership and commercial merchant partners.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-077",
    "domain": "finance",
    "level": 3,
    "order": 77,
    "difficulty": "boss",
    "title": "Unleveraged Prime Customer Prospects (EXCEPT)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Prime lending acquisition: Find customer IDs of all customers with credit score >= 750 EXCEPT customers who currently hold an active loan. Return customer id.",
    "context_notes": "EXCEPT comparing prime credit customers against active loan customers.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id FROM customers WHERE credit_score >= 750 EXCEPT SELECT DISTINCT customer_id AS id FROM loans WHERE status = 'current' AND customer_id IS NOT NULL ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select id from customers with credit_score >= 750.",
      "EXCEPT select customer_id from current loans.",
      "Order by id."
    ],
    "solution_explanation": "Identifies prime credit score customers with zero outstanding bank debt for mortgage promotions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-078",
    "domain": "finance",
    "level": 3,
    "order": 78,
    "difficulty": "boss",
    "title": "Customers Holding Both an Investment and a Mortgage (INTERSECT)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Affluent mortgage cross-sell: Find customer IDs of clients who hold an active investment portfolio AND also hold a residential Mortgage loan. Return customer id.",
    "context_notes": "INTERSECT comparing customer IDs with investments and mortgages.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id"
    ],
    "reference_sql": "SELECT customer_id FROM investments INTERSECT SELECT customer_id FROM loans WHERE loan_type = 'Mortgage' AND status = 'current' ORDER BY customer_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select customer_id from investments.",
      "INTERSECT select customer_id from loans WHERE loan_type = Mortgage.",
      "Order by customer_id."
    ],
    "solution_explanation": "Surfaces dual-relationship private wealth clients carrying mortgage assets.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-079",
    "domain": "finance",
    "level": 3,
    "order": 79,
    "difficulty": "boss",
    "title": "Unified Bank Transaction and Payment Cash Ledger (UNION ALL)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Consolidated cash flow ledger: Combine all ledger transactions and all completed loan payments into a single unified cash movement log showing source, reference id, dollar amount, and date. Return top 25 records.",
    "context_notes": "UNION ALL combining transactions and loan_payments.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "cash_flow_source",
      "reference_id",
      "amount",
      "movement_date"
    ],
    "reference_sql": "SELECT 'Core Ledger Transaction' AS cash_flow_source, id AS reference_id, amount, created_at::DATE AS movement_date FROM transactions UNION ALL SELECT 'Loan Installment Payment' AS cash_flow_source, id AS reference_id, payment_amount AS amount, payment_date AS movement_date FROM loan_payments WHERE status = 'completed' ORDER BY movement_date DESC, amount DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select transactions as Core Ledger Transaction.",
      "UNION ALL select completed loan_payments as Loan Installment Payment.",
      "Order by date DESC LIMIT 25."
    ],
    "solution_explanation": "Integrates core banking transactions and loan repayment cash flows into a master timeline.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-080",
    "domain": "finance",
    "level": 3,
    "order": 80,
    "difficulty": "boss",
    "title": "Branches With High Vault Cash Lacking Commercial Loans (EXCEPT)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Vault cash allocation review: Find branch IDs authorized for more than $15,000,000 in vault cash EXCEPT branches that have originated any commercial Business loans. Return branch id.",
    "context_notes": "EXCEPT comparing high-vault branches with business-lending branches.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_id"
    ],
    "reference_sql": "SELECT id AS branch_id FROM branches WHERE vault_cash_limit >= 15000000.00 EXCEPT SELECT DISTINCT branch_id FROM loans WHERE loan_type = 'Business' AND branch_id IS NOT NULL ORDER BY branch_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select id from branches with vault_cash_limit >= 15000000.",
      "EXCEPT select branch_id from business loans.",
      "Order by branch_id."
    ],
    "solution_explanation": "Identifies large vault centers not originating commercial corporate loans.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-081",
    "domain": "finance",
    "level": 3,
    "order": 81,
    "difficulty": "boss",
    "title": "Customers Holding Checking in New York and Boston (INTERSECT)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Multi-city regional banking: Find customer IDs of clients who maintain active accounts linked to branches in New York AND accounts linked to branches in Boston. Return customer id.",
    "context_notes": "INTERSECT comparing customer IDs in NY branches and Boston branches.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id"
    ],
    "reference_sql": "SELECT a.customer_id FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE b.city = 'New York' AND a.status = 'active' INTERSECT SELECT a2.customer_id FROM accounts a2 JOIN branches b2 ON a2.branch_id = b2.id WHERE b2.city = 'Boston' AND a2.status = 'active' ORDER BY customer_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select customer_id with active accounts in New York branches.",
      "INTERSECT select customer_id with active accounts in Boston branches."
    ],
    "solution_explanation": "Surfaces bi-coastal or multi-city commercial banking customers.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-082",
    "domain": "finance",
    "level": 3,
    "order": 82,
    "difficulty": "boss",
    "title": "Delinquent Borrowers With Zero Deposit Balances (EXCEPT)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Unbacked delinquent debt: Find customer IDs who have loans with status late EXCEPT customers who hold any active depository accounts. Return customer id.",
    "context_notes": "EXCEPT comparing late loan customer IDs with active depository customer IDs.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id"
    ],
    "reference_sql": "SELECT DISTINCT customer_id FROM loans WHERE status = 'late' EXCEPT SELECT DISTINCT customer_id FROM accounts WHERE status = 'active' ORDER BY customer_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select customer_id from late loans.",
      "EXCEPT select customer_id from active accounts.",
      "Order by customer_id."
    ],
    "solution_explanation": "Flags delinquent borrowers who maintain zero offset deposit liquidity at the bank.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-083",
    "domain": "finance",
    "level": 3,
    "order": 83,
    "difficulty": "boss",
    "title": "Top 5 Largest Loan Principals vs Top 5 Investment Valuations (UNION ALL)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Credit asset vs wealth asset ceilings: Combine the 5 largest current loans (by principal amount) with the 5 largest investment portfolios (by current value). Return asset type, reference id, and total dollar amount.",
    "context_notes": "UNION ALL combining two top-5 subqueries.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "SUBQUERY",
      "LIMIT"
    ],
    "expected_columns": [
      "asset_type",
      "reference_id",
      "dollar_amount"
    ],
    "reference_sql": "(SELECT 'Loan Asset' AS asset_type, id AS reference_id, principal_amount AS dollar_amount FROM loans WHERE status = 'current' ORDER BY principal_amount DESC LIMIT 5) UNION ALL (SELECT 'Investment Portfolio' AS asset_type, id AS reference_id, current_value AS dollar_amount FROM investments ORDER BY current_value DESC LIMIT 5) ORDER BY dollar_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select top 5 current loans by principal.",
      "UNION ALL select top 5 investments by current value.",
      "Order combined result by dollar amount DESC."
    ],
    "solution_explanation": "Compares institutional asset ceilings across lending books and wealth management portfolios.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-084",
    "domain": "finance",
    "level": 3,
    "order": 84,
    "difficulty": "boss",
    "title": "High Income Customers With Portfolios in Positive Return (INTERSECT)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Affluent profitable investors: Find customer IDs of customers with annual income >= $200,000 AND who hold an investment where current_value > total_invested. Return customer id.",
    "context_notes": "INTERSECT comparing high-income customers with profitable investment customers.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id"
    ],
    "reference_sql": "SELECT id AS customer_id FROM customers WHERE annual_income >= 200000.00 INTERSECT SELECT customer_id FROM investments WHERE current_value > total_invested ORDER BY customer_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select id from customers with income >= 200000.",
      "INTERSECT select customer_id from investments where current_value > total_invested."
    ],
    "solution_explanation": "Surfaces affluent clients realizing substantial investment capital gains.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-085",
    "domain": "finance",
    "level": 3,
    "order": 85,
    "difficulty": "boss",
    "title": "Transactions With High Severity Fraud Alerts (EXCEPT Clean Transactions)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Fraudulent transaction isolation: Find transaction IDs that triggered CRITICAL or HIGH severity fraud alerts EXCEPT transactions that have alert status dismissed or resolved. Return transaction id.",
    "context_notes": "EXCEPT comparing critical/high fraud alert transactions against resolved transactions.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "transaction_id"
    ],
    "reference_sql": "SELECT transaction_id FROM fraud_alerts WHERE severity IN ('CRITICAL', 'HIGH') EXCEPT SELECT transaction_id FROM fraud_alerts WHERE status IN ('dismissed', 'resolved') ORDER BY transaction_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select transaction_id with CRITICAL or HIGH severity.",
      "EXCEPT select transaction_id where status is dismissed or resolved."
    ],
    "solution_explanation": "Pinpoints active, unresolved severe fraud alert transactions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-086",
    "domain": "finance",
    "level": 3,
    "order": 86,
    "difficulty": "boss",
    "title": "Multi-Tier Customer Loan Outliers Exceeding Risk Tier Average",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit commitment outlier: Find current loans whose principal amount is strictly higher than the average principal amount for all loans belonging to customers of that same risk rating tier. Return loan id, customer id, principal amount, and risk rating.",
    "context_notes": "JOIN loans to customers, correlated subquery on risk_rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "CORRELATED SUBQUERY",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "principal_amount",
      "risk_rating"
    ],
    "reference_sql": "SELECT l.id, l.customer_id, l.principal_amount, c.risk_rating FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.status = 'current' AND l.principal_amount > (SELECT AVG(l2.principal_amount) FROM loans l2 JOIN customers c2 ON l2.customer_id = c2.id WHERE c2.risk_rating = c.risk_rating AND l2.status = 'current') ORDER BY c.risk_rating, l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Correlate subquery on c.risk_rating to calculate tier-specific average loan principal.",
      "Filter loans exceeding that benchmark."
    ],
    "solution_explanation": "Isolates outsized loan commitments relative to borrower risk grades.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-087",
    "domain": "finance",
    "level": 3,
    "order": 87,
    "difficulty": "boss",
    "title": "Comprehensive Customer Relationship Matrix (Accounts, Loans, Credit & Wealth)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "360-degree customer continuum: Find all customers who maintain an active depository account, hold a current loan, have an active credit line, AND own an investment portfolio. Return customer id, name, credit score, and annual income.",
    "context_notes": "Quadruple EXISTS verifying multi-product customer relationship.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "id",
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT c.id, c.name, c.credit_score, c.annual_income FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id AND a.status = 'active') AND EXISTS (SELECT 1 FROM loans l WHERE l.customer_id = c.id AND l.status = 'current') AND EXISTS (SELECT 1 FROM credit_lines cl WHERE cl.customer_id = c.id AND cl.status = 'active') AND EXISTS (SELECT 1 FROM investments inv WHERE inv.customer_id = c.id) ORDER BY c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate 4 separate EXISTS clauses for active accounts, current loans, credit lines, and investments.",
      "Select customer identity."
    ],
    "solution_explanation": "Identifies full-spectrum commercial relationship clients utilizing every bank product line.",
    "xp": 30,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L3-088",
    "domain": "finance",
    "level": 3,
    "order": 88,
    "difficulty": "boss",
    "title": "Branches With High Loan Volume Exceeding Regional Benchmark",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Regional origination leaders: Find branches whose total active loan principal exceeds the average total loan principal of all branches in the bank. Return branch name, city, and total loan principal.",
    "context_notes": "Subquery in HAVING comparing SUM(principal) against average branch loan volume.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_loans"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(l.principal_amount), 2) AS total_loans FROM branches b JOIN loans l ON b.id = l.branch_id WHERE l.status = 'current' GROUP BY b.id, b.branch_name, b.city HAVING SUM(l.principal_amount) > (SELECT AVG(sub.tot) FROM (SELECT SUM(l2.principal_amount) AS tot FROM loans l2 WHERE l2.status = 'current' GROUP BY l2.branch_id) sub) ORDER BY total_loans DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group loans by branch for current loans.",
      "Compare in HAVING against average branch total loan volume."
    ],
    "solution_explanation": "Highlights high-performing regional lending desks anchoring bank credit growth.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-089",
    "domain": "finance",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Active Cardholders With Swipes at Both Travel and Dining (INTERSECT)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Lifestyle cardholders: Find card IDs of cards that have executed swipes at Travel merchants AND swipes at Dining merchants. Return card id.",
    "context_notes": "INTERSECT comparing card IDs swiping at Travel and Dining merchants.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "card_id"
    ],
    "reference_sql": "SELECT cs.card_id FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.category = 'Travel' INTERSECT SELECT cs2.card_id FROM card_swipes cs2 JOIN merchants m2 ON cs2.merchant_id = m2.id WHERE m2.category = 'Dining' ORDER BY card_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select card_id with swipes at Travel merchants.",
      "INTERSECT select card_id with swipes at Dining merchants."
    ],
    "solution_explanation": "Identifies frequent travel and entertainment commercial cardholders.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-090",
    "domain": "finance",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Customer Depository Balance Exceeding Loan Debt (Net Creditor Customers)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Net creditor analysis: Find customers whose total active deposit balance strictly exceeds their total current loan principal. Return customer name, credit score, total deposits, and total loans.",
    "context_notes": "JOIN customers with accounts and loans, GROUP BY customer HAVING SUM(a.balance) > SUM(l.principal).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_deposits",
      "total_loans"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(SUM(DISTINCT a.balance), 2) AS total_deposits, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans FROM customers c JOIN accounts a ON c.id = a.customer_id AND a.status = 'active' JOIN loans l ON c.id = l.customer_id AND l.status = 'current' GROUP BY c.id, c.name, c.credit_score HAVING SUM(DISTINCT a.balance) > SUM(DISTINCT l.principal_amount) ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to active accounts and current loans.",
      "Filter in HAVING for total deposits > total loans."
    ],
    "solution_explanation": "Surfaces net-creditor clients whose deposits fully collateralize their bank borrowing.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-091",
    "domain": "finance",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Customers Holding Revolving Lines But No Depository Accounts (EXCEPT)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Pure credit card / line customers: Find customer IDs who hold active credit lines EXCEPT customers who have an active depository account. Return customer id.",
    "context_notes": "EXCEPT comparing credit line customers with active account customers.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id"
    ],
    "reference_sql": "SELECT DISTINCT customer_id FROM credit_lines WHERE status = 'active' EXCEPT SELECT DISTINCT customer_id FROM accounts WHERE status = 'active' ORDER BY customer_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select customer_id from active credit_lines.",
      "EXCEPT select customer_id from active accounts.",
      "Order by customer_id."
    ],
    "solution_explanation": "Targets credit-only borrowers for deposit account opening campaigns.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-092",
    "domain": "finance",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "High Balance Checking Outliers Exceeding Account Type Average",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Commercial liquidity concentration: Find active checking accounts whose balance is strictly higher than 1.5 times the average checking account balance in the bank. Return account id, customer id, and balance.",
    "context_notes": "Scalar subquery: balance > 1.5 * (SELECT AVG(balance) FROM accounts WHERE account_type = checking AND status = active).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, balance FROM accounts WHERE account_type = 'checking' AND status = 'active' AND balance > (1.5 * (SELECT AVG(balance) FROM accounts WHERE account_type = 'checking' AND status = 'active')) ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate average checking balance in scalar subquery.",
      "Filter accounts where balance > 1.5 * average."
    ],
    "solution_explanation": "Surfaces non-interest checking balance concentrations.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L3-093",
    "domain": "finance",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Branches Originating Both Mortgages and Business Loans (INTERSECT)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Full-service branch origination: Find branch IDs that have originated both residential Mortgages AND commercial Business loans. Return branch id.",
    "context_notes": "INTERSECT comparing branch IDs for Mortgages and Business loans.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_id"
    ],
    "reference_sql": "SELECT DISTINCT branch_id FROM loans WHERE loan_type = 'Mortgage' AND status = 'current' INTERSECT SELECT DISTINCT branch_id FROM loans WHERE loan_type = 'Business' AND status = 'current' ORDER BY branch_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select branch_id from current Mortgage loans.",
      "INTERSECT select branch_id from current Business loans."
    ],
    "solution_explanation": "Identifies full-spectrum regional branches capable of consumer and corporate credit origination.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-094",
    "domain": "finance",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Transactions With Multiple Fraud Alerts Recorded",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Compound fraud risk: Find transaction IDs that have generated more than 1 distinct fraud alert record. Return transaction id, account id, amount, and alert count.",
    "context_notes": "JOIN transactions with fraud_alerts GROUP BY transaction HAVING COUNT(fa.id) > 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "alert_count"
    ],
    "reference_sql": "SELECT t.id, t.account_id, t.amount, COUNT(fa.id) AS alert_count FROM transactions t JOIN fraud_alerts fa ON t.id = fa.transaction_id GROUP BY t.id, t.account_id, t.amount HAVING COUNT(fa.id) > 1 ORDER BY alert_count DESC, t.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join transactions to fraud_alerts.",
      "Group by transaction and filter in HAVING for alert count > 1."
    ],
    "solution_explanation": "Pins down multi-trigger fraudulent transaction anomalies.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-095",
    "domain": "finance",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Consolidated Master Lending Portfolio Ledger (UNION ALL)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Master credit ledger: Combine all active term loans and all active revolving credit lines into a unified credit asset view showing credit facility type, reference id, customer id, and committed limit or principal. Return top 25 records.",
    "context_notes": "UNION ALL combining loans and credit_lines.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "credit_facility_type",
      "facility_id",
      "customer_id",
      "committed_amount"
    ],
    "reference_sql": "SELECT 'Term Loan' AS credit_facility_type, id AS facility_id, customer_id, principal_amount AS committed_amount FROM loans WHERE status = 'current' UNION ALL SELECT 'Revolving Credit Line' AS credit_facility_type, id AS facility_id, customer_id, total_limit AS committed_amount FROM credit_lines WHERE status = 'active' ORDER BY committed_amount DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select loans as Term Loan.",
      "UNION ALL select active credit_lines as Revolving Credit Line.",
      "Order by committed amount DESC LIMIT 25."
    ],
    "solution_explanation": "Integrates term debt and revolving credit commitments into a single executive credit ledger.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-096",
    "domain": "finance",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Customers With Performing Loans and Growing Investments",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Premier wealth borrowers: Find customers who have made completed loan payments AND whose investment current value exceeds total invested. Return customer name, credit score, annual income, and investment current value.",
    "context_notes": "JOIN customers with loans, loan_payments, and investments.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "DISTINCT"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income",
      "current_value"
    ],
    "reference_sql": "SELECT DISTINCT c.name, c.credit_score, c.annual_income, inv.current_value FROM customers c JOIN loans l ON c.id = l.customer_id AND l.status = 'current' JOIN loan_payments lp ON l.id = lp.loan_id AND lp.status = 'completed' JOIN investments inv ON c.id = inv.customer_id AND inv.current_value > inv.total_invested ORDER BY inv.current_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to performing loans, payments, and profitable investments.",
      "Select distinct customer details."
    ],
    "solution_explanation": "Profiles prime wealth management clients actively servicing bank loans with profitable investment equity.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-097",
    "domain": "finance",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "High Value Card Swipes at Outlier Merchant Terminals",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "POS terminal outlier audit: Find card swipes whose amount exceeds the average swipe amount of that specific merchant by more than $500. Return swipe id, merchant name, swipe amount, and merchant average swipe amount.",
    "context_notes": "JOIN card_swipes with merchants, correlated subquery comparing swipe amount with merchant average.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "amount",
      "merchant_avg_amount"
    ],
    "reference_sql": "SELECT cs.id, m.name, cs.amount, ROUND((SELECT AVG(cs2.amount) FROM card_swipes cs2 WHERE cs2.merchant_id = cs.merchant_id), 2) AS merchant_avg_amount FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.amount > ((SELECT AVG(cs2.amount) FROM card_swipes cs2 WHERE cs2.merchant_id = cs.merchant_id) + 500.00) ORDER BY cs.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Correlate subquery on merchant_id to compute terminal average.",
      "Filter swipes exceeding average by $500."
    ],
    "solution_explanation": "Identifies extreme ticket size anomalies on merchant payment terminals.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-098",
    "domain": "finance",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Top 5 Highest Vault Branches vs Top 5 Depository Branches (UNION ALL)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Physical cash vs deposit balance comparison: Combine the top 5 branches by vault cash limit with the top 5 branches by active customer deposit balance. Return metric type, branch name, city, and total dollars.",
    "context_notes": "UNION ALL combining two top-5 subqueries on branches and accounts.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "SUBQUERY",
      "LIMIT"
    ],
    "expected_columns": [
      "metric_type",
      "branch_name",
      "city",
      "total_dollars"
    ],
    "reference_sql": "(SELECT 'Vault Cash Limit' AS metric_type, branch_name, city, vault_cash_limit AS total_dollars FROM branches ORDER BY vault_cash_limit DESC LIMIT 5) UNION ALL (SELECT 'Customer Deposit Total' AS metric_type, b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_dollars FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city ORDER BY total_dollars DESC LIMIT 5) ORDER BY total_dollars DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select top 5 vault cash branches.",
      "UNION ALL select top 5 deposit gathering branches.",
      "Order combined result by total dollars DESC."
    ],
    "solution_explanation": "Compares physical vault cash holdings against customer deposit volume ceilings.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L3-099",
    "domain": "finance",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Customers Incurring Transactions Flagged for Review (EXISTS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Active compliance case subjects: Find customers whose accounts have experienced transactions that currently have a fraud alert with status under_review. Return customer id, name, credit score, and risk rating.",
    "context_notes": "EXISTS correlating customers to transactions with under_review fraud alerts.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "name",
      "credit_score",
      "risk_rating"
    ],
    "reference_sql": "SELECT c.id, c.name, c.credit_score, c.risk_rating FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a JOIN transactions t ON a.id = t.account_id JOIN fraud_alerts fa ON t.id = fa.transaction_id WHERE a.customer_id = c.id AND fa.status = 'under_review') ORDER BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate customers with transactions flagged with under_review alerts in EXISTS.",
      "Select customer identity."
    ],
    "solution_explanation": "Compiles list of account holders subject to active fraud compliance investigation.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L3-100",
    "domain": "finance",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Chief Risk Officer Master Institutional Exposure Index",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Executive Board Risk Audit: Construct a composite risk profile of our highest-exposure customers. Identify customers who hold an active credit line with utilization >= 50%, hold an active loan with principal >= $100,000, and have an active depository account. Return customer name, credit score, annual income, loan principal, and credit line limit.",
    "context_notes": "Composite multi-criteria join across customers, loans, credit lines, and accounts.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income",
      "principal_amount",
      "total_limit"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, c.annual_income, l.principal_amount, cl.total_limit FROM customers c JOIN loans l ON c.id = l.customer_id AND l.status = 'current' JOIN credit_lines cl ON c.id = cl.customer_id AND cl.status = 'active' JOIN accounts a ON c.id = a.customer_id AND a.status = 'active' WHERE l.principal_amount >= 100000.00 AND (cl.used_amount / cl.total_limit) >= 0.50 ORDER BY l.principal_amount DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to current loans, active credit lines, and active accounts.",
      "Filter for large loans >= 100k and high line draw >= 50%.",
      "Order by principal DESC LIMIT 10."
    ],
    "solution_explanation": "Grand Level 3 Capstone: Comprehensive institutional risk audit pinpointing heavily leveraged commercial borrowers carrying substantial term debt and revolving credit exposure.",
    "xp": 30,
    "estimated_minutes": 12
  }
];
