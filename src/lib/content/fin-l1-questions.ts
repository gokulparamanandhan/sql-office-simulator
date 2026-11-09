import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L1-001",
    "domain": "finance",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Active Banking Branches Directory",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Morning! I need a clean directory of our banking branches with their physical location. Please pull the branch name, city, and state, sorted alphabetically by branch name.",
    "context_notes": "Query the branches table for branch_name, city, and state.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state"
    ],
    "reference_sql": "SELECT branch_name, city, state FROM branches ORDER BY branch_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select branch_name, city, state from branches.",
      "Order alphabetically by branch_name."
    ],
    "solution_explanation": "Retrieves active bank branches across regional banking divisions.",
    "xp": 15,
    "estimated_minutes": 3
  },
  {
    "id": "fin-L1-002",
    "domain": "finance",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "High Credit Score Commercial Customers",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Victor here from Risk. Can you bring up our prime credit clients? I need customer name, credit score, and annual income for everyone with a credit score of 780 or higher, ordered highest score first.",
    "context_notes": "Filter customers WHERE credit_score >= 780.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE credit_score >= 780 ORDER BY credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE credit_score >= 780.",
      "Order descending by credit_score."
    ],
    "solution_explanation": "Identifies prime credit score accounts for preferred institutional services.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-003",
    "domain": "finance",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "High Net Worth Depository Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Arthur from Wealth Management. Could you pull all active accounts holding a balance of $100,000 or greater? Show account id, customer id, and balance, highest balance first.",
    "context_notes": "Query accounts table WHERE balance >= 100000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, balance FROM accounts WHERE balance >= 100000.00 AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where balance >= 100000.00 AND status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Surfaces private wealth tier account relationships.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-004",
    "domain": "finance",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Merchants Classified as High Risk",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "We are running our weekly AML and anti-fraud merchant audit. Bring me the name, category, and city of all merchants flagged with risk_level High_Risk.",
    "context_notes": "Filter merchants WHERE risk_level = High_Risk.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "city"
    ],
    "reference_sql": "SELECT name, category, city FROM merchants WHERE risk_level = 'High_Risk' ORDER BY name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query merchants table where risk_level = High_Risk.",
      "Select name, category, city."
    ],
    "solution_explanation": "Surfaces high-risk commercial payment terminals subject to enhanced scrutiny.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-005",
    "domain": "finance",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Recent High-Value Wire Transactions",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Compliance review: I need to review large wire transfers. Pull transaction id, account id, amount, and description for all wire transactions of $5,000 or more, latest first. Limit to top 20.",
    "context_notes": "Filter transactions WHERE transaction_type = wire AND amount >= 5000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "description"
    ],
    "reference_sql": "SELECT id, account_id, amount, description FROM transactions WHERE transaction_type = 'wire' AND amount >= 5000.00 ORDER BY created_at DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type = wire AND amount >= 5000.00.",
      "Order by created_at DESC LIMIT 20."
    ],
    "solution_explanation": "Isolates high-dollar electronic wire transfers for AML currency monitoring.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-006",
    "domain": "finance",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Active Credit Cards with Premium Limits",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card portfolio audit: Show me all active cards that have a daily limit of $8,000 or higher. Return card id, card type, masked card number, and daily limit.",
    "context_notes": "Filter cards WHERE daily_limit >= 8000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "card_number_masked",
      "daily_limit"
    ],
    "reference_sql": "SELECT id, card_type, card_number_masked, daily_limit FROM cards WHERE daily_limit >= 8000.00 AND status = 'active' ORDER BY daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter cards where daily_limit >= 8000.00 and status = active.",
      "Order by daily_limit DESC."
    ],
    "solution_explanation": "Monitors premier credit and debit card cardholder facilities.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-007",
    "domain": "finance",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Branches With Over $20M Vault Cash Limit",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Treasury review: Which of our regional branches are authorized to hold more than $20,000,000 in physical vault cash? Return branch name, city, and vault cash limit.",
    "context_notes": "Filter branches WHERE vault_cash_limit > 20000000.00.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, city, vault_cash_limit FROM branches WHERE vault_cash_limit > 20000000.00 ORDER BY vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE vault_cash_limit > 20000000.00.",
      "Order descending by vault_cash_limit."
    ],
    "solution_explanation": "Identifies primary regional depository vaults managing large cash reserves.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-008",
    "domain": "finance",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Frozen or Monitored Accounts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Risk alert: Pull all accounts currently flagged with status frozen. Show account id, customer id, account type, and balance.",
    "context_notes": "Filter accounts WHERE status = frozen.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE status = 'frozen' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where status = frozen.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Audits frozen depository assets under compliance hold.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-009",
    "domain": "finance",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Customers in New York or Boston",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Northeast regional outreach: Show me customer name, branch city, and annual income for account holders located in New York or Boston, ordered by city.",
    "context_notes": "Filter customers WHERE branch_city IN (New York, Boston).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "branch_city",
      "annual_income"
    ],
    "reference_sql": "SELECT name, branch_city, annual_income FROM customers WHERE branch_city IN ('New York', 'Boston') ORDER BY branch_city ASC, name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE branch_city IN ('New York', 'Boston').",
      "Order by branch_city and name."
    ],
    "solution_explanation": "Targets Northeast wealth advisory client prospect lists.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-010",
    "domain": "finance",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Transactions Involving Regulatory or Settlement Fees",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Fee audit: Pull all ledger transactions categorized as fee. Display transaction id, account id, amount, and description.",
    "context_notes": "Filter transactions WHERE transaction_type = fee.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "description"
    ],
    "reference_sql": "SELECT id, account_id, amount, description FROM transactions WHERE transaction_type = 'fee' ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter transactions where transaction_type = fee.",
      "Order by amount DESC."
    ],
    "solution_explanation": "Reviews assessed maintenance, overdraft, and transaction fees.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-011",
    "domain": "finance",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Speculative Risk Rated Customers",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Credit risk mitigation: Pull customer name, credit score, and annual income for customers marked with risk_rating Speculative.",
    "context_notes": "Filter customers WHERE risk_rating = Speculative.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income FROM customers WHERE risk_rating = 'Speculative' ORDER BY credit_score ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE risk_rating = Speculative.",
      "Order by credit_score ASC."
    ],
    "solution_explanation": "Surfaces accounts subject to strict borrowing and credit exposure caps.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-012",
    "domain": "finance",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Active Money Market Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Money market yield check: List all active accounts under account_type money_market. Show account id, customer id, and balance, sorted highest balance first.",
    "context_notes": "Filter accounts WHERE account_type = money_market and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, balance FROM accounts WHERE account_type = 'money_market' AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where account_type = money_market and status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Reviews liquid yield-bearing money market deposits.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-013",
    "domain": "finance",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Platinum Amex Cards Portfolio",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card issuer report: Show all cards of card_type Platinum_Amex. Return card id, masked card number, daily limit, and status.",
    "context_notes": "Filter cards WHERE card_type = Platinum_Amex.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "card_number_masked",
      "daily_limit",
      "status"
    ],
    "reference_sql": "SELECT id, card_number_masked, daily_limit, status FROM cards WHERE card_type = 'Platinum_Amex' ORDER BY daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE card_type = Platinum_Amex.",
      "Order by daily_limit DESC."
    ],
    "solution_explanation": "Audits the bank co-branded ultra-high-limit charge card tier.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-014",
    "domain": "finance",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Merchants in San Francisco and Miami",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Merchant acquiring coverage: List all merchant names, categories, and cities for merchants operating in San Francisco or Miami.",
    "context_notes": "Filter merchants WHERE city IN (San Francisco, Miami).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "category",
      "city"
    ],
    "reference_sql": "SELECT name, category, city FROM merchants WHERE city IN ('San Francisco', 'Miami') ORDER BY city ASC, name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE city IN ('San Francisco', 'Miami').",
      "Order by city, name."
    ],
    "solution_explanation": "Assesses commercial merchant penetration in key metropolitan markets.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-015",
    "domain": "finance",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Cash Deposit Transactions Over $3,000",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Bank Secrecy Act monitoring: Retrieve transaction id, account id, amount, and timestamp for all transactions categorized as deposit with amount >= $3,000, newest first. Limit to top 25.",
    "context_notes": "Filter transactions WHERE transaction_type = deposit AND amount >= 3000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, created_at FROM transactions WHERE transaction_type = 'deposit' AND amount >= 3000.00 ORDER BY created_at DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type = deposit AND amount >= 3000.00.",
      "Order by created_at DESC LIMIT 25."
    ],
    "solution_explanation": "Screens cash inflows nearing institutional anti-structuring thresholds.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-016",
    "domain": "finance",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Branches Managed in California and Texas",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Western and Southern expansion: List branch name, state, and manager name for all branches located in California (CA) or Texas (TX).",
    "context_notes": "Filter branches WHERE state IN (CA, TX).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "branch_name",
      "state",
      "manager_name"
    ],
    "reference_sql": "SELECT branch_name, state, manager_name FROM branches WHERE state IN ('CA', 'TX') ORDER BY state ASC, branch_name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE state IN ('CA', 'TX').",
      "Order by state, branch_name."
    ],
    "solution_explanation": "Directories regional branch management across CA and TX banking networks.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-017",
    "domain": "finance",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Customers With Annual Income Exceeding $300,000",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Affluent customer prospecting: Pull customer name, branch city, and annual income for customers whose annual income is strictly greater than $300,000.",
    "context_notes": "Filter customers WHERE annual_income > 300000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "branch_city",
      "annual_income"
    ],
    "reference_sql": "SELECT name, branch_city, annual_income FROM customers WHERE annual_income > 300000.00 ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE annual_income > 300000.00.",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Segments top-tier wage earners for private banking onboarding.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-018",
    "domain": "finance",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Investment Account Balances",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Brokerage balances review: Show account id, customer id, and balance for all accounts under account_type investment.",
    "context_notes": "Filter accounts WHERE account_type = investment.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, balance FROM accounts WHERE account_type = 'investment' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE account_type = investment.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Audits customer self-directed and managed brokerage cash balances.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-019",
    "domain": "finance",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Low Risk Customers With Moderate Income",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Safe retail lending: Find all customers with risk_rating Low and credit_score strictly greater than 700. Return customer name, credit score, and risk rating.",
    "context_notes": "Filter customers WHERE risk_rating = Low AND credit_score > 700.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "risk_rating"
    ],
    "reference_sql": "SELECT name, credit_score, risk_rating FROM customers WHERE risk_rating = 'Low' AND credit_score > 700 ORDER BY credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE risk_rating = Low AND credit_score > 700.",
      "Order by credit_score DESC."
    ],
    "solution_explanation": "Identifies low-default credit candidates for auto and mortgage originations.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-020",
    "domain": "finance",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "International or Non-Domestic Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Cross-border transaction risk: List merchant name, category, and country for any merchant where country is NOT USA.",
    "context_notes": "Filter merchants WHERE country != USA.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "country"
    ],
    "reference_sql": "SELECT name, category, country FROM merchants WHERE country != 'USA' ORDER BY name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE country != USA.",
      "Select name, category, country."
    ],
    "solution_explanation": "Surfaces non-domestic merchant payment entities for foreign exchange fee audits.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-021",
    "domain": "finance",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Debit Cards Issued on Active Accounts",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Everyday banking card volume: Show card id, masked card number, daily limit, and status for cards with card_type Visa_Debit.",
    "context_notes": "Filter cards WHERE card_type = Visa_Debit.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "card_number_masked",
      "daily_limit",
      "status"
    ],
    "reference_sql": "SELECT id, card_number_masked, daily_limit, status FROM cards WHERE card_type = 'Visa_Debit' ORDER BY daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE card_type = Visa_Debit.",
      "Order by daily_limit DESC."
    ],
    "solution_explanation": "Reviews standard debit card issuing limits and card status.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-022",
    "domain": "finance",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Large Withdrawal Transactions ($4,000+)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Liquidity outflow surveillance: Pull transaction id, account id, amount, and timestamp for all transactions of transaction_type withdrawal where amount >= $4,000. Limit to top 20.",
    "context_notes": "Filter transactions WHERE transaction_type = withdrawal AND amount >= 4000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, created_at FROM transactions WHERE transaction_type = 'withdrawal' AND amount >= 4000.00 ORDER BY created_at DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type = withdrawal AND amount >= 4000.00.",
      "Order by created_at DESC LIMIT 20."
    ],
    "solution_explanation": "Tracks significant depository cash and wire withdrawals.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-023",
    "domain": "finance",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Closed Depository Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Account attrition audit: Show account id, customer id, account type, and balance for accounts flagged with status closed.",
    "context_notes": "Filter accounts WHERE status = closed.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE status = 'closed' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where status = closed.",
      "Select id, customer_id, account_type, balance."
    ],
    "solution_explanation": "Surfaces closed customer account ledgers for customer churn analysis.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-024",
    "domain": "finance",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Branch Vault Capacity Below $15M",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Regional branch liquidity: Find all branches where vault_cash_limit is strictly less than $15,000,000. Return branch name, city, state, and vault cash limit.",
    "context_notes": "Filter branches WHERE vault_cash_limit < 15000000.00.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, city, state, vault_cash_limit FROM branches WHERE vault_cash_limit < 15000000.00 ORDER BY vault_cash_limit ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE vault_cash_limit < 15000000.00.",
      "Order by vault_cash_limit ASC."
    ],
    "solution_explanation": "Identifies smaller satellite branch offices with lean vault storage thresholds.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-025",
    "domain": "finance",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Customers With Credit Score Below 650",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Subprime portfolio monitoring: Find customers whose credit score is strictly less than 650. Show customer name, credit score, annual income, and risk rating.",
    "context_notes": "Filter customers WHERE credit_score < 650.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income",
      "risk_rating"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income, risk_rating FROM customers WHERE credit_score < 650 ORDER BY credit_score ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE credit_score < 650.",
      "Order by credit_score ASC."
    ],
    "solution_explanation": "Flags credit-impaired retail customers for risk pricing and loan reserve allocations.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-026",
    "domain": "finance",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Total Depository Balances by Account Type",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Balance sheet breakdown: For each account type (checking, savings, money_market, investment, credit), calculate total balance and total active accounts. Order highest balance first.",
    "context_notes": "GROUP BY account_type on accounts WHERE status = active.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "account_type",
      "total_balance",
      "active_accounts"
    ],
    "reference_sql": "SELECT account_type, ROUND(SUM(balance), 2) AS total_balance, COUNT(id) AS active_accounts FROM accounts WHERE status = 'active' GROUP BY account_type ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group accounts by account_type filtering for status = active.",
      "Calculate SUM(balance) and COUNT(id)."
    ],
    "solution_explanation": "Executive asset breakdown summarizing active deposits by account class.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-027",
    "domain": "finance",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Customer Count by Risk Rating Category",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Risk distribution: How many customers fall into each risk rating tier (Low, Moderate, High, Speculative)? Return risk rating and customer count, most populated first.",
    "context_notes": "GROUP BY risk_rating on customers.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "risk_rating",
      "customer_count"
    ],
    "reference_sql": "SELECT risk_rating, COUNT(id) AS customer_count FROM customers GROUP BY risk_rating ORDER BY customer_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by risk_rating.",
      "Count customer IDs."
    ],
    "solution_explanation": "Enterprise credit risk profile illustrating customer risk segmentation.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-028",
    "domain": "finance",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Total Vault Cash Reserves by State",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Regional cash reserves: Calculate total vault cash limit and total branch count grouped by state. Order highest vault cash first.",
    "context_notes": "GROUP BY state on branches.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "state",
      "total_vault_cash",
      "branch_count"
    ],
    "reference_sql": "SELECT state, ROUND(SUM(vault_cash_limit), 2) AS total_vault_cash, COUNT(id) AS branch_count FROM branches GROUP BY state ORDER BY total_vault_cash DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group branches by state.",
      "Sum vault_cash_limit and count branches."
    ],
    "solution_explanation": "Quantifies regulatory vault cash holdings across state jurisdictions.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-029",
    "domain": "finance",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Transaction Volume and Dollars by Transaction Type",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Payment rail analytics: For each transaction type (deposit, withdrawal, transfer, fee, wire), compute total transactions count and total dollar volume.",
    "context_notes": "GROUP BY transaction_type on transactions.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "transaction_type",
      "tx_count",
      "total_volume"
    ],
    "reference_sql": "SELECT transaction_type, COUNT(id) AS tx_count, ROUND(SUM(amount), 2) AS total_volume FROM transactions GROUP BY transaction_type ORDER BY total_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group transactions by transaction_type.",
      "Count transactions and sum amount."
    ],
    "solution_explanation": "Provides operational overview of settlement volumes across payment channels.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-030",
    "domain": "finance",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Average Customer Income by Branch City",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Regional purchasing power: What is the average annual income and total customer count across each branch city? Highest average income first.",
    "context_notes": "GROUP BY branch_city on customers.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_city",
      "avg_income",
      "customer_count"
    ],
    "reference_sql": "SELECT branch_city, ROUND(AVG(annual_income), 2) AS avg_income, COUNT(id) AS customer_count FROM customers GROUP BY branch_city ORDER BY avg_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by branch_city.",
      "Compute AVG(annual_income) and COUNT(id)."
    ],
    "solution_explanation": "Identifies high-income metropolitan areas for branch footprint expansion.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-031",
    "domain": "finance",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Accounts Distribution by Operational Status",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Depository health check: Count accounts and calculate total balance for each account status (active, frozen, closed).",
    "context_notes": "GROUP BY status on accounts.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "account_count",
      "total_balance"
    ],
    "reference_sql": "SELECT status, COUNT(id) AS account_count, ROUND(SUM(balance), 2) AS total_balance FROM accounts GROUP BY status ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group accounts by status.",
      "Sum balance and count accounts."
    ],
    "solution_explanation": "Summarizes operational disposition of total bank depository accounts.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-032",
    "domain": "finance",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Average Credit Score by Risk Rating Category",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit score benchmarking: Calculate average credit score, minimum score, and maximum score for each customer risk rating.",
    "context_notes": "GROUP BY risk_rating on customers, AVG, MIN, MAX.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "MIN",
      "MAX"
    ],
    "expected_columns": [
      "risk_rating",
      "avg_score",
      "min_score",
      "max_score"
    ],
    "reference_sql": "SELECT risk_rating, ROUND(AVG(credit_score), 1) AS avg_score, MIN(credit_score) AS min_score, MAX(credit_score) AS max_score FROM customers GROUP BY risk_rating ORDER BY avg_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by risk_rating.",
      "Compute AVG, MIN, MAX on credit_score."
    ],
    "solution_explanation": "Validates credit scoring models against assigned customer risk ratings.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-033",
    "domain": "finance",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Total Card Daily Limits by Card Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card exposure liability: For each card type, calculate total daily limits authorized and total issued cards. Order highest aggregate limit first.",
    "context_notes": "GROUP BY card_type on cards.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "card_type",
      "total_daily_limit",
      "cards_issued"
    ],
    "reference_sql": "SELECT card_type, ROUND(SUM(daily_limit), 2) AS total_daily_limit, COUNT(id) AS cards_issued FROM cards GROUP BY card_type ORDER BY total_daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group cards by card_type.",
      "Sum daily_limit and count cards."
    ],
    "solution_explanation": "Measures maximum 24-hour liquidity exposure across payment card categories.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-034",
    "domain": "finance",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Merchant Category Distribution and Risk Counts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant underwriting portfolio: How many merchants do we acquire in each business category (Grocery, Travel, Electronics, etc.)? Return category and merchant count.",
    "context_notes": "GROUP BY category on merchants.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "merchant_count"
    ],
    "reference_sql": "SELECT category, COUNT(id) AS merchant_count FROM merchants GROUP BY category ORDER BY merchant_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group merchants by category.",
      "Count merchant IDs."
    ],
    "solution_explanation": "Analyzes merchant business sector diversification.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-035",
    "domain": "finance",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Average Depository Balance by Account Type",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Account size metrics: Calculate the average balance and maximum single balance for each account type. Order highest average balance first.",
    "context_notes": "GROUP BY account_type on accounts, AVG, MAX.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "MAX",
      "ORDER BY"
    ],
    "expected_columns": [
      "account_type",
      "avg_balance",
      "max_balance"
    ],
    "reference_sql": "SELECT account_type, ROUND(AVG(balance), 2) AS avg_balance, ROUND(MAX(balance), 2) AS max_balance FROM accounts GROUP BY account_type ORDER BY avg_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group accounts by account_type.",
      "Compute AVG(balance) and MAX(balance)."
    ],
    "solution_explanation": "Evaluates depository product balance sizes across retail and commercial tiers.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-036",
    "domain": "finance",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Branch Count by City with Vault Totals",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Municipal banking presence: Calculate total branches and combined vault cash limits grouped by city for cities with at least 1 branch.",
    "context_notes": "GROUP BY city on branches.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "branch_count",
      "total_vault_limit"
    ],
    "reference_sql": "SELECT city, COUNT(id) AS branch_count, ROUND(SUM(vault_cash_limit), 2) AS total_vault_limit FROM branches GROUP BY city ORDER BY total_vault_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group branches by city.",
      "Count branches and sum vault_cash_limit."
    ],
    "solution_explanation": "Summarizes physical branch footprint and cash staging by metropolitan market.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-037",
    "domain": "finance",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Largest Single Transactions Handled",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Top transfer audit: What are the 15 largest individual transactions recorded in our ledger? Return id, account id, amount, transaction type, and timestamp.",
    "context_notes": "Query transactions ORDER BY amount DESC LIMIT 15.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "transaction_type",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, transaction_type, created_at FROM transactions ORDER BY amount DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order transactions by amount DESC.",
      "Limit to top 15 records."
    ],
    "solution_explanation": "Reviews the single largest individual fund movements across the core ledger.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-038",
    "domain": "finance",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Total Customer Inflow Dollars From Deposits",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Retail deposit velocity: Calculate total dollars deposited and average deposit size across all deposit transactions in the ledger.",
    "context_notes": "SUM and AVG amount on transactions WHERE transaction_type = deposit.",
    "concepts": [
      "SELECT",
      "SUM",
      "AVG",
      "WHERE"
    ],
    "expected_columns": [
      "total_deposits",
      "avg_deposit_amount"
    ],
    "reference_sql": "SELECT ROUND(SUM(amount), 2) AS total_deposits, ROUND(AVG(amount), 2) AS avg_deposit_amount FROM transactions WHERE transaction_type = 'deposit';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter transactions where transaction_type = deposit.",
      "Compute SUM(amount) and AVG(amount)."
    ],
    "solution_explanation": "Measures retail deposit inflow totals and standard customer deposit tickets.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-039",
    "domain": "finance",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Customer Count by Credit Score Tiers",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Underwriting scorecard: Group customers into credit tiers: Excellent (>= 750), Good (700 to 749), Fair (650 to 699), Subprime (< 650) using CASE. Return credit tier and customer count.",
    "context_notes": "CASE on credit_score GROUP BY credit tier.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "credit_tier",
      "customer_count"
    ],
    "reference_sql": "SELECT CASE WHEN credit_score >= 750 THEN 'Excellent' WHEN credit_score BETWEEN 700 AND 749 THEN 'Good' WHEN credit_score BETWEEN 650 AND 699 THEN 'Fair' ELSE 'Subprime' END AS credit_tier, COUNT(id) AS customer_count FROM customers GROUP BY (CASE WHEN credit_score >= 750 THEN 'Excellent' WHEN credit_score BETWEEN 700 AND 749 THEN 'Good' WHEN credit_score BETWEEN 650 AND 699 THEN 'Fair' ELSE 'Subprime' END) ORDER BY customer_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by credit tier using CASE statement.",
      "Count customers in each tier."
    ],
    "solution_explanation": "Portfolio risk segmentation by FICO credit score bands.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-040",
    "domain": "finance",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Top 10 Affluent Customers by Annual Income",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Executive outreach: List the top 10 customers with the highest annual income. Show customer id, name, annual income, credit score, and branch city.",
    "context_notes": "Query customers ORDER BY annual_income DESC LIMIT 10.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name",
      "annual_income",
      "credit_score",
      "branch_city"
    ],
    "reference_sql": "SELECT id, name, annual_income, credit_score, branch_city FROM customers ORDER BY annual_income DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order customers by annual_income DESC LIMIT 10.",
      "Select id, name, annual_income, credit_score, branch_city."
    ],
    "solution_explanation": "Identifies ultra-high-earning commercial accounts for executive relationship coverage.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-041",
    "domain": "finance",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Wire Transfer Transaction Volume by Date",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Wire activity timeline: Calculate total wire transaction count and total wire amount grouped by transaction date (created_at::DATE). Order latest date first.",
    "context_notes": "GROUP BY created_at::DATE on transactions WHERE transaction_type = wire.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "tx_date",
      "wire_count",
      "total_wire_amount"
    ],
    "reference_sql": "SELECT created_at::DATE AS tx_date, COUNT(id) AS wire_count, ROUND(SUM(amount), 2) AS total_wire_amount FROM transactions WHERE transaction_type = 'wire' GROUP BY created_at::DATE ORDER BY tx_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Cast created_at to DATE and group by date.",
      "Filter for transaction_type = wire.",
      "Sum amount and count wires."
    ],
    "solution_explanation": "Daily wire settlement velocity tracking for daylight overdraft monitoring.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-042",
    "domain": "finance",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Total Depository Balances Held in Frozen Accounts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Restricted asset exposure: Calculate the total dollar balance currently locked in frozen accounts across each account type. Order highest balance first.",
    "context_notes": "GROUP BY account_type on accounts WHERE status = frozen.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "account_type",
      "frozen_balance",
      "account_count"
    ],
    "reference_sql": "SELECT account_type, ROUND(SUM(balance), 2) AS frozen_balance, COUNT(id) AS account_count FROM accounts WHERE status = 'frozen' GROUP BY account_type ORDER BY frozen_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = frozen.",
      "Group by account_type and sum balance."
    ],
    "solution_explanation": "Quantifies compliance-restricted funds by product type.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-043",
    "domain": "finance",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Active Account Balances Between $25,000 and $75,000",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Mid-market depository segment: Find all active accounts holding a balance between $25,000 and $75,000. Return account id, customer id, account type, and balance.",
    "context_notes": "Filter accounts WHERE balance BETWEEN 25000.00 AND 75000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "AND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE balance BETWEEN 25000.00 AND 75000.00 AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where balance BETWEEN 25000 AND 75000 and status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Targets mid-market commercial accounts for treasury management services.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-044",
    "domain": "finance",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Average Daily Limit by Card Type and Status",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Payment card risk policy: Calculate average daily limit and total cards for each card type and status combination.",
    "context_notes": "GROUP BY card_type, status on cards.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "COUNT"
    ],
    "expected_columns": [
      "card_type",
      "status",
      "avg_daily_limit",
      "cards_count"
    ],
    "reference_sql": "SELECT card_type, status, ROUND(AVG(daily_limit), 2) AS avg_daily_limit, COUNT(id) AS cards_count FROM cards GROUP BY card_type, status ORDER BY card_type, status;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group cards by card_type and status.",
      "Compute AVG(daily_limit) and COUNT(id)."
    ],
    "solution_explanation": "Assesses card portfolio credit limits across active and restricted statuses.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-045",
    "domain": "finance",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Total Withdrawal Outflows by Date",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Liquidity stress testing: For transactions of type withdrawal, compute total dollars withdrawn and transaction count for each transaction date (created_at::DATE).",
    "context_notes": "GROUP BY created_at::DATE on transactions WHERE transaction_type = withdrawal.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "tx_date",
      "withdrawal_count",
      "total_outflow"
    ],
    "reference_sql": "SELECT created_at::DATE AS tx_date, COUNT(id) AS withdrawal_count, ROUND(SUM(amount), 2) AS total_outflow FROM transactions WHERE transaction_type = 'withdrawal' GROUP BY created_at::DATE ORDER BY tx_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group transactions by date where transaction_type = withdrawal.",
      "Sum amount and count withdrawals."
    ],
    "solution_explanation": "Monitors daily cash outflows for branch and treasury liquidity planning.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-046",
    "domain": "finance",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Branches With Average Vault Cash Above $15M",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Regional cash hub identification: List all branches where vault_cash_limit is at least $15,000,000, showing branch name, manager, and vault cash limit.",
    "context_notes": "Filter branches WHERE vault_cash_limit >= 15000000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "manager_name",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, manager_name, vault_cash_limit FROM branches WHERE vault_cash_limit >= 15000000.00 ORDER BY vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE vault_cash_limit >= 15000000.00.",
      "Order by vault_cash_limit DESC."
    ],
    "solution_explanation": "Identifies primary regional depository vaults managing large cash reserves.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-047",
    "domain": "finance",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Customer Registration Volume by Creation Month",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Account acquisition growth: Calculate new customer onboarding count grouped by year and month (EXTRACT(MONTH FROM created_at)). Order by month.",
    "context_notes": "GROUP BY EXTRACT(MONTH FROM created_at) on customers.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "EXTRACT"
    ],
    "expected_columns": [
      "reg_month",
      "new_customers_count"
    ],
    "reference_sql": "SELECT EXTRACT(MONTH FROM created_at) AS reg_month, COUNT(id) AS new_customers_count FROM customers GROUP BY EXTRACT(MONTH FROM created_at) ORDER BY reg_month ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract month from created_at and group by month.",
      "Count customer IDs."
    ],
    "solution_explanation": "Measures retail and commercial customer onboarding seasonality.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-048",
    "domain": "finance",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Fee Income Totals by Month",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Non-interest income: Calculate total fee revenue generated grouped by month from transactions of type fee. Order by month.",
    "context_notes": "GROUP BY EXTRACT(MONTH FROM created_at) on transactions WHERE transaction_type = fee.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "EXTRACT"
    ],
    "expected_columns": [
      "fee_month",
      "total_fee_income"
    ],
    "reference_sql": "SELECT EXTRACT(MONTH FROM created_at) AS fee_month, ROUND(SUM(amount), 2) AS total_fee_income FROM transactions WHERE transaction_type = 'fee' GROUP BY EXTRACT(MONTH FROM created_at) ORDER BY fee_month ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group fee transactions by month.",
      "Sum fee amounts."
    ],
    "solution_explanation": "Tracks non-interest fee revenue generation across calendar months.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-049",
    "domain": "finance",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "High Risk Merchants by Country of Operation",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant geographic risk: For merchants flagged as High_Risk, count how many operate in each country.",
    "context_notes": "GROUP BY country on merchants WHERE risk_level = High_Risk.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "WHERE"
    ],
    "expected_columns": [
      "country",
      "high_risk_merchants_count"
    ],
    "reference_sql": "SELECT country, COUNT(id) AS high_risk_merchants_count FROM merchants WHERE risk_level = 'High_Risk' GROUP BY country ORDER BY high_risk_merchants_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE risk_level = High_Risk.",
      "Group by country and count merchants."
    ],
    "solution_explanation": "Surfaces jurisdiction risk concentrations among high-risk merchant accounts.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-050",
    "domain": "finance",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Top 5 Branches with Largest Vault Cash Capacity",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Capital infrastructure: Identify the top 5 banking branches with the largest vault cash limits. Return branch name, city, state, manager name, and vault cash limit.",
    "context_notes": "Query branches ORDER BY vault_cash_limit DESC LIMIT 5.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state",
      "manager_name",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, city, state, manager_name, vault_cash_limit FROM branches ORDER BY vault_cash_limit DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order branches by vault_cash_limit DESC.",
      "Limit to top 5."
    ],
    "solution_explanation": "Recognizes premier regional depository vaults holding the highest physical cash reserves.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-051",
    "domain": "finance",
    "level": 1,
    "order": 51,
    "difficulty": "advanced",
    "title": "Customer Credit Score and Income Ratio Analysis",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Underwriting metric: For customers with annual income > $100,000, calculate income-to-credit-score ratio (annual_income / credit_score). Show customer name, income, credit score, and ratio.",
    "context_notes": "Compute annual_income / credit_score as income_credit_ratio.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "credit_score",
      "income_credit_ratio"
    ],
    "reference_sql": "SELECT name, annual_income, credit_score, ROUND(annual_income / credit_score, 2) AS income_credit_ratio FROM customers WHERE annual_income > 100000.00 ORDER BY income_credit_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter customers where annual_income > 100000.00.",
      "Calculate annual_income / credit_score rounded to 2 decimal places."
    ],
    "solution_explanation": "Evaluates financial earning leverage relative to established creditworthiness.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-052",
    "domain": "finance",
    "level": 1,
    "order": 52,
    "difficulty": "advanced",
    "title": "Depository Account Balance Quartile Brackets",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Balance tier categorization: Classify each active account into brackets: Tier 1 ($100k+), Tier 2 ($50k-$99k), Tier 3 ($10k-$49k), Tier 4 (<$10k) using CASE. Return account id, account type, balance, and balance tier.",
    "context_notes": "CASE on balance on accounts WHERE status = active.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "balance_tier"
    ],
    "reference_sql": "SELECT id, account_type, balance, CASE WHEN balance >= 100000.00 THEN 'Tier 1' WHEN balance BETWEEN 50000.00 AND 99999.99 THEN 'Tier 2' WHEN balance BETWEEN 10000.00 AND 49999.99 THEN 'Tier 3' ELSE 'Tier 4' END AS balance_tier FROM accounts WHERE status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify accounts into balance tiers using CASE WHEN.",
      "Filter for status = active."
    ],
    "solution_explanation": "Structures commercial and retail accounts into actionable private banking tiers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-053",
    "domain": "finance",
    "level": 1,
    "order": 53,
    "difficulty": "advanced",
    "title": "Transfer vs Wire Transaction Ratio Analysis",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Rail volume comparison: For transactions of type transfer or wire, calculate total transaction count and average dollar value per transaction type.",
    "context_notes": "GROUP BY transaction_type on transactions WHERE transaction_type IN (transfer, wire).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "AVG",
      "WHERE"
    ],
    "expected_columns": [
      "transaction_type",
      "tx_count",
      "avg_amount"
    ],
    "reference_sql": "SELECT transaction_type, COUNT(id) AS tx_count, ROUND(AVG(amount), 2) AS avg_amount FROM transactions WHERE transaction_type IN ('transfer', 'wire') GROUP BY transaction_type ORDER BY avg_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type IN ('transfer', 'wire').",
      "Group by transaction_type and compute COUNT and AVG."
    ],
    "solution_explanation": "Compares internal book transfers against external high-value wire transfers.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-054",
    "domain": "finance",
    "level": 1,
    "order": 54,
    "difficulty": "advanced",
    "title": "Active Card Daily Limit Utilization Potential",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Cardholder line exposure: For active cards, calculate total potential 30-day card spending (daily_limit * 30). Return card id, card type, daily limit, and monthly exposure potential.",
    "context_notes": "Compute daily_limit * 30 as monthly_exposure.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "daily_limit",
      "monthly_exposure"
    ],
    "reference_sql": "SELECT id, card_type, daily_limit, ROUND(daily_limit * 30.0, 2) AS monthly_exposure FROM cards WHERE status = 'active' ORDER BY monthly_exposure DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate daily_limit * 30.0 for active cards.",
      "Order by monthly_exposure DESC."
    ],
    "solution_explanation": "Models potential monthly liquidity draw against outstanding payment cards.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-055",
    "domain": "finance",
    "level": 1,
    "order": 55,
    "difficulty": "advanced",
    "title": "Customer Geographic Concentration and Risk Rating Matrix",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Regional credit exposure: Group customers by branch_city and risk_rating. Count customer accounts in each combination where branch_city is New York, Boston, or San Francisco.",
    "context_notes": "GROUP BY branch_city, risk_rating WHERE branch_city IN (...).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "branch_city",
      "risk_rating",
      "customer_count"
    ],
    "reference_sql": "SELECT branch_city, risk_rating, COUNT(id) AS customer_count FROM customers WHERE branch_city IN ('New York', 'Boston', 'San Francisco') GROUP BY branch_city, risk_rating ORDER BY branch_city, risk_rating;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter for primary metropolitan cities.",
      "Group by branch_city and risk_rating."
    ],
    "solution_explanation": "Maps metropolitan risk-rating distribution across major regional offices.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-056",
    "domain": "finance",
    "level": 1,
    "order": 56,
    "difficulty": "advanced",
    "title": "Branches Vault Limits as Share of State Total",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity proportion: List branches in NY and CA, showing branch name, state, and vault cash limit, ordered by vault limit descending.",
    "context_notes": "Filter branches WHERE state IN (NY, CA).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "state",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, state, vault_cash_limit FROM branches WHERE state IN ('NY', 'CA') ORDER BY state ASC, vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter branches where state IN ('NY', 'CA').",
      "Order by state, vault_cash_limit DESC."
    ],
    "solution_explanation": "Evaluates cash distribution across high-volume commercial centers.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-057",
    "domain": "finance",
    "level": 1,
    "order": 57,
    "difficulty": "advanced",
    "title": "Depository Accounts With Balances Under Minimum Thresholds",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Low balance alerts: Find active checking or savings accounts holding less than $5,000 in balance. Show account id, customer id, account type, and balance.",
    "context_notes": "Filter accounts WHERE account_type IN (checking, savings) AND balance < 5000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "AND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE account_type IN ('checking', 'savings') AND balance < 5000.00 AND status = 'active' ORDER BY balance ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter checking and savings accounts where balance < 5000 and status = active.",
      "Order by balance ASC."
    ],
    "solution_explanation": "Surfaces accounts subject to minimum maintenance balance fee assessments.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-058",
    "domain": "finance",
    "level": 1,
    "order": 58,
    "difficulty": "advanced",
    "title": "High Value Settlement Transactions With Specific Descriptions",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Settlement audit: Find transactions where description contains Settlement and amount > $5,000. Return id, account id, amount, and description.",
    "context_notes": "Filter transactions WHERE description LIKE %Settlement% AND amount > 5000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "LIKE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "description"
    ],
    "reference_sql": "SELECT id, account_id, amount, description FROM transactions WHERE description LIKE '%Settlement%' AND amount > 5000.00 ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE description LIKE '%Settlement%' AND amount > 5000.00.",
      "Order by amount DESC."
    ],
    "solution_explanation": "Audits institutional settlement transactions exceeding $5,000 thresholds.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-059",
    "domain": "finance",
    "level": 1,
    "order": 59,
    "difficulty": "advanced",
    "title": "Customer Wealth Bracket Distribution",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Wealth segmentation: Categorize customers into income brackets: Affluent ($300k+), Upper Middle ($200k-$299k), Middle ($100k-$199k), Entry (<$100k) using CASE. Return wealth tier and customer count.",
    "context_notes": "CASE statement on annual_income GROUP BY wealth tier.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "wealth_tier",
      "customer_count"
    ],
    "reference_sql": "SELECT CASE WHEN annual_income >= 300000.00 THEN 'Affluent' WHEN annual_income BETWEEN 200000.00 AND 299999.99 THEN 'Upper Middle' WHEN annual_income BETWEEN 100000.00 AND 199999.99 THEN 'Middle' ELSE 'Entry' END AS wealth_tier, COUNT(id) AS customer_count FROM customers GROUP BY (CASE WHEN annual_income >= 300000.00 THEN 'Affluent' WHEN annual_income BETWEEN 200000.00 AND 299999.99 THEN 'Upper Middle' WHEN annual_income BETWEEN 100000.00 AND 199999.99 THEN 'Middle' ELSE 'Entry' END) ORDER BY customer_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Segment annual_income using CASE.",
      "Count customers per wealth bracket."
    ],
    "solution_explanation": "Structures customer base for targeted wealth advisory wealth products.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-060",
    "domain": "finance",
    "level": 1,
    "order": 60,
    "difficulty": "advanced",
    "title": "Active Card Limits by Risk Level and Issuer Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Issuer exposure: For cards with status active, calculate total daily limits and card count grouped by card_type.",
    "context_notes": "GROUP BY card_type on cards WHERE status = active.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "WHERE"
    ],
    "expected_columns": [
      "card_type",
      "active_daily_limits",
      "active_cards_count"
    ],
    "reference_sql": "SELECT card_type, ROUND(SUM(daily_limit), 2) AS active_daily_limits, COUNT(id) AS active_cards_count FROM cards WHERE status = 'active' GROUP BY card_type ORDER BY active_daily_limits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = active.",
      "Group by card_type and sum daily_limit."
    ],
    "solution_explanation": "Tracks aggregate daily settlement exposure across active payment card portfolios.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-061",
    "domain": "finance",
    "level": 1,
    "order": 61,
    "difficulty": "advanced",
    "title": "Transactions Occurring During Weekend or Specific Days",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Off-hours ledger activity: Extract day of week (EXTRACT(DOW FROM created_at)) for all transactions and calculate transaction count and total volume for each day of the week.",
    "context_notes": "GROUP BY EXTRACT(DOW FROM created_at) on transactions.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "EXTRACT"
    ],
    "expected_columns": [
      "day_of_week",
      "tx_count",
      "total_volume"
    ],
    "reference_sql": "SELECT EXTRACT(DOW FROM created_at) AS day_of_week, COUNT(id) AS tx_count, ROUND(SUM(amount), 2) AS total_volume FROM transactions GROUP BY EXTRACT(DOW FROM created_at) ORDER BY day_of_week ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract DOW from created_at.",
      "Compute transaction count and total dollar volume per day."
    ],
    "solution_explanation": "Monitors weekend vs weekday payment processing liquidity.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-062",
    "domain": "finance",
    "level": 1,
    "order": 62,
    "difficulty": "advanced",
    "title": "Depository Accounts in Frozen Status with Substantial Funds",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "High value freeze audit: Find all frozen accounts holding a balance of $50,000 or greater. Return account id, customer id, account type, and balance.",
    "context_notes": "Filter accounts WHERE status = frozen AND balance >= 50000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE status = 'frozen' AND balance >= 50000.00 ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = frozen AND balance >= 50000.00.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Audits substantial blocked deposits under legal or anti-money laundering restraint.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-063",
    "domain": "finance",
    "level": 1,
    "order": 63,
    "difficulty": "advanced",
    "title": "Merchants Categorized Under Travel or Crypto",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Volatile sector merchant portfolio: Show merchant name, category, city, country, and risk level for merchants in Travel or Crypto categories.",
    "context_notes": "Filter merchants WHERE category IN (Travel, Crypto).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "category",
      "city",
      "country",
      "risk_level"
    ],
    "reference_sql": "SELECT name, category, city, country, risk_level FROM merchants WHERE category IN ('Travel', 'Crypto') ORDER BY category ASC, name ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE category IN ('Travel', 'Crypto').",
      "Select merchant identity and risk parameters."
    ],
    "solution_explanation": "Screens merchants in high-chargeback and high-volatility business sectors.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-064",
    "domain": "finance",
    "level": 1,
    "order": 64,
    "difficulty": "advanced",
    "title": "Customer Account Creation Trajectory for 2023",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Historical acquisition cohort: Find customers created between January 1, 2023 and June 30, 2023. Show customer id, name, branch city, and creation date.",
    "context_notes": "Filter customers WHERE created_at BETWEEN 2023-01-01 AND 2023-06-30.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "AND"
    ],
    "expected_columns": [
      "id",
      "name",
      "branch_city",
      "created_at"
    ],
    "reference_sql": "SELECT id, name, branch_city, created_at FROM customers WHERE created_at BETWEEN '2023-01-01' AND '2023-06-30' ORDER BY created_at ASC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE created_at BETWEEN '2023-01-01' AND '2023-06-30'.",
      "Order by created_at."
    ],
    "solution_explanation": "Reviews early 2023 customer onboarding cohort demographics.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-065",
    "domain": "finance",
    "level": 1,
    "order": 65,
    "difficulty": "advanced",
    "title": "Small Value Transaction Volume and Fee Yield Potential",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Micro-transactions: Count transactions where amount is strictly less than $100.00. Calculate total dollar amount and transaction count across all micro-transactions.",
    "context_notes": "Filter transactions WHERE amount < 100.00, compute COUNT and SUM.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "WHERE"
    ],
    "expected_columns": [
      "micro_tx_count",
      "total_micro_volume"
    ],
    "reference_sql": "SELECT COUNT(id) AS micro_tx_count, ROUND(SUM(amount), 2) AS total_micro_volume FROM transactions WHERE amount < 100.00;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE amount < 100.00.",
      "Calculate count and sum amount."
    ],
    "solution_explanation": "Measures retail micro-transaction frequency and interchange fee exposure.",
    "xp": 25,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-066",
    "domain": "finance",
    "level": 1,
    "order": 66,
    "difficulty": "advanced",
    "title": "High Balance Checking Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Commercial operating cash: Show checking accounts holding over $50,000 in liquid balance. Show account id, customer id, and balance, highest balance first.",
    "context_notes": "Filter accounts WHERE account_type = checking AND balance >= 50000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, balance FROM accounts WHERE account_type = 'checking' AND balance >= 50000.00 AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where account_type = checking and balance >= 50000 and status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Surfaces non-interest-bearing operational checking deposits.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-067",
    "domain": "finance",
    "level": 1,
    "order": 67,
    "difficulty": "advanced",
    "title": "Customer Concentration by Branch City with Income Totals",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Metropolitan deposit capacity: For each branch city, calculate total customers, average credit score, and aggregate annual income. Order by total income descending.",
    "context_notes": "GROUP BY branch_city on customers, COUNT, AVG, SUM.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "AVG",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_city",
      "customer_count",
      "avg_credit_score",
      "total_income"
    ],
    "reference_sql": "SELECT branch_city, COUNT(id) AS customer_count, ROUND(AVG(credit_score), 1) AS avg_credit_score, ROUND(SUM(annual_income), 2) AS total_income FROM customers GROUP BY branch_city ORDER BY total_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by branch_city.",
      "Compute count, avg credit score, and sum income."
    ],
    "solution_explanation": "Profiles regional customer wealth capacity by metropolitan market.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-068",
    "domain": "finance",
    "level": 1,
    "order": 68,
    "difficulty": "advanced",
    "title": "Top Limit Active Debit Cards",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Debit card ceiling: List the top 10 active debit cards (card_type = Visa_Debit) with the highest daily limits. Return card id, masked card number, and daily limit.",
    "context_notes": "Filter cards WHERE card_type = Visa_Debit AND status = active ORDER BY daily_limit DESC LIMIT 10.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "card_number_masked",
      "daily_limit"
    ],
    "reference_sql": "SELECT id, card_number_masked, daily_limit FROM cards WHERE card_type = 'Visa_Debit' AND status = 'active' ORDER BY daily_limit DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter for active Visa_Debit cards.",
      "Order by daily_limit DESC LIMIT 10."
    ],
    "solution_explanation": "Identifies cardholders with highest daily ATM/point-of-sale withdrawal limits.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-069",
    "domain": "finance",
    "level": 1,
    "order": 69,
    "difficulty": "advanced",
    "title": "Branch Vault Limit Capacity Distribution Tiers",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Vault tiering: Classify branches into vault capacity tiers: Primary Fortress ($25M+), Major Hub ($15M-$24.9M), Standard Branch (<$15M) using CASE. Return branch name, state, vault limit, and vault tier.",
    "context_notes": "CASE on vault_cash_limit in branches table.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "state",
      "vault_cash_limit",
      "vault_tier"
    ],
    "reference_sql": "SELECT branch_name, state, vault_cash_limit, CASE WHEN vault_cash_limit >= 25000000.00 THEN 'Primary Fortress' WHEN vault_cash_limit BETWEEN 15000000.00 AND 24999999.99 THEN 'Major Hub' ELSE 'Standard Branch' END AS vault_tier FROM branches ORDER BY vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify branches using CASE WHEN on vault_cash_limit.",
      "Order by vault_cash_limit DESC."
    ],
    "solution_explanation": "Categorizes physical branch vaults into operational security tiers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-070",
    "domain": "finance",
    "level": 1,
    "order": 70,
    "difficulty": "advanced",
    "title": "Recent High-Value Deposits Exceeding $7,000",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Large cash intake: Retrieve transaction id, account id, amount, and timestamp for deposit transactions of $7,000 or more, sorted by amount descending.",
    "context_notes": "Filter transactions WHERE transaction_type = deposit AND amount >= 7000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, created_at FROM transactions WHERE transaction_type = 'deposit' AND amount >= 7000.00 ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type = deposit AND amount >= 7000.00.",
      "Order by amount DESC."
    ],
    "solution_explanation": "Flags large cash deposits for anti-money laundering review.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-071",
    "domain": "finance",
    "level": 1,
    "order": 71,
    "difficulty": "advanced",
    "title": "Customer Risk Rating and Average Annual Income",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Income by risk tier: For each risk rating category, calculate average annual income, minimum income, and maximum income. Order highest average income first.",
    "context_notes": "GROUP BY risk_rating on customers, AVG, MIN, MAX.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "MIN",
      "MAX",
      "ORDER BY"
    ],
    "expected_columns": [
      "risk_rating",
      "avg_income",
      "min_income",
      "max_income"
    ],
    "reference_sql": "SELECT risk_rating, ROUND(AVG(annual_income), 2) AS avg_income, ROUND(MIN(annual_income), 2) AS min_income, ROUND(MAX(annual_income), 2) AS max_income FROM customers GROUP BY risk_rating ORDER BY avg_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by risk_rating.",
      "Compute AVG, MIN, MAX on annual_income."
    ],
    "solution_explanation": "Analyzes relationship between customer earning power and institutional risk rating.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-072",
    "domain": "finance",
    "level": 1,
    "order": 72,
    "difficulty": "advanced",
    "title": "Active Accounts with Extreme Balance Over $150,000",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Ultra-high net worth accounts: List all active accounts holding a balance of $150,000 or greater. Show account id, customer id, account type, and balance.",
    "context_notes": "Filter accounts WHERE balance >= 150000.00 AND status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE balance >= 150000.00 AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE balance >= 150000.00 and status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Surfaces top depository relationships for executive wealth relationship coverage.",
    "xp": 25,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-073",
    "domain": "finance",
    "level": 1,
    "order": 73,
    "difficulty": "advanced",
    "title": "Transaction Volume by Specific Ledger Description Patterns",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Reference tracking: Count transactions and calculate total dollar volume where description starts with Settlement ref. Return total count and total amount.",
    "context_notes": "Filter transactions WHERE description LIKE Settlement ref%, compute COUNT and SUM.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "settlement_tx_count",
      "total_settled_volume"
    ],
    "reference_sql": "SELECT COUNT(id) AS settlement_tx_count, ROUND(SUM(amount), 2) AS total_settled_volume FROM transactions WHERE description LIKE 'Settlement ref%';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE description LIKE 'Settlement ref%'.",
      "Calculate count and sum."
    ],
    "solution_explanation": "Reconciles core ledger settlement entries.",
    "xp": 25,
    "estimated_minutes": 4
  },
  {
    "id": "fin-L1-074",
    "domain": "finance",
    "level": 1,
    "order": 74,
    "difficulty": "advanced",
    "title": "Customer Account Openings in First Quarter 2023",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Q1 2023 cohort: Find customers created between January 1, 2023 and March 31, 2023 with credit score >= 700. Return customer name, credit score, branch city, and creation date.",
    "context_notes": "Filter customers WHERE created_at BETWEEN 2023-01-01 AND 2023-03-31 AND credit_score >= 700.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "branch_city",
      "created_at"
    ],
    "reference_sql": "SELECT name, credit_score, branch_city, created_at FROM customers WHERE created_at BETWEEN '2023-01-01' AND '2023-03-31' AND credit_score >= 700 ORDER BY credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter for Q1 2023 customer creations with credit_score >= 700.",
      "Order by credit_score DESC."
    ],
    "solution_explanation": "Tracks high-credit customer onboarding cohort for quarterly reviews.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-075",
    "domain": "finance",
    "level": 1,
    "order": 75,
    "difficulty": "advanced",
    "title": "Total Balance Held Across Top 20 Depository Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Depository concentration: Calculate the sum of balances across the top 20 largest active accounts. Return the top 20 accounts total balance.",
    "context_notes": "Subquery or derived table summing top 20 accounts by balance.",
    "concepts": [
      "SELECT",
      "SUBQUERY",
      "SUM"
    ],
    "expected_columns": [
      "top_20_balance_sum"
    ],
    "reference_sql": "SELECT ROUND(SUM(balance), 2) AS top_20_balance_sum FROM (SELECT balance FROM accounts WHERE status = 'active' ORDER BY balance DESC LIMIT 20) top_accs;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order active accounts by balance DESC LIMIT 20.",
      "Calculate SUM(balance) across the subquery."
    ],
    "solution_explanation": "Measures deposit concentration among the bank largest 20 customer accounts.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-076",
    "domain": "finance",
    "level": 1,
    "order": 76,
    "difficulty": "boss",
    "title": "Customer Credit Score Decile Distribution Analysis",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Underwriting portfolio review: Divide customers into credit brackets using CASE: Tier 1 (780+), Tier 2 (740-779), Tier 3 (700-739), Tier 4 (660-699), Tier 5 (<660). Calculate customer count, average annual income, and minimum income in each tier.",
    "context_notes": "CASE on credit_score with COUNT, AVG, MIN grouped by credit tier.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "COUNT",
      "AVG",
      "MIN"
    ],
    "expected_columns": [
      "credit_bracket",
      "customer_count",
      "avg_income",
      "min_income"
    ],
    "reference_sql": "SELECT CASE WHEN credit_score >= 780 THEN 'Tier 1' WHEN credit_score BETWEEN 740 AND 779 THEN 'Tier 2' WHEN credit_score BETWEEN 700 AND 739 THEN 'Tier 3' WHEN credit_score BETWEEN 660 AND 699 THEN 'Tier 4' ELSE 'Tier 5' END AS credit_bracket, COUNT(id) AS customer_count, ROUND(AVG(annual_income), 2) AS avg_income, ROUND(MIN(annual_income), 2) AS min_income FROM customers GROUP BY (CASE WHEN credit_score >= 780 THEN 'Tier 1' WHEN credit_score BETWEEN 740 AND 779 THEN 'Tier 2' WHEN credit_score BETWEEN 700 AND 739 THEN 'Tier 3' WHEN credit_score BETWEEN 660 AND 699 THEN 'Tier 4' ELSE 'Tier 5' END) ORDER BY credit_bracket ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers into 5 credit brackets using CASE WHEN.",
      "Compute count, avg income, min income."
    ],
    "solution_explanation": "Institutional credit risk distribution linking FICO bands to verified income.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-077",
    "domain": "finance",
    "level": 1,
    "order": 77,
    "difficulty": "boss",
    "title": "Depository Balance Outlier Accounts Exceeding Branch Average",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Large deposit outlier check: Find all active accounts whose balance is strictly greater than the average balance of all active accounts in the entire bank. Return account id, customer id, account type, and balance.",
    "context_notes": "Subquery: balance > (SELECT AVG(balance) FROM accounts WHERE status = active).",
    "concepts": [
      "SELECT",
      "WHERE",
      "SCALAR SUBQUERY"
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
      "Compute overall active account average balance in scalar subquery.",
      "Filter accounts where balance exceeds that benchmark."
    ],
    "solution_explanation": "Isolates above-average deposit relationships contributing to liquidity reserves.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-078",
    "domain": "finance",
    "level": 1,
    "order": 78,
    "difficulty": "boss",
    "title": "Regional Branch Vault Cash Reserve Concentration Index",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Regional cash audit: For each state, calculate total vault cash limit, average vault cash limit per branch, and branch count. Filter for states having total vault cash >= $25,000,000. Order highest vault cash first.",
    "context_notes": "GROUP BY state on branches HAVING SUM(vault_cash_limit) >= 25000000.00.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "state",
      "branch_count",
      "total_vault_cash",
      "avg_vault_cash"
    ],
    "reference_sql": "SELECT state, COUNT(id) AS branch_count, ROUND(SUM(vault_cash_limit), 2) AS total_vault_cash, ROUND(AVG(vault_cash_limit), 2) AS avg_vault_cash FROM branches GROUP BY state HAVING SUM(vault_cash_limit) >= 25000000.00 ORDER BY total_vault_cash DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group branches by state.",
      "Filter in HAVING for SUM(vault_cash_limit) >= 25000000.00.",
      "Order by total_vault_cash DESC."
    ],
    "solution_explanation": "Surfaces critical state jurisdictions managing heavy physical currency volume.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-079",
    "domain": "finance",
    "level": 1,
    "order": 79,
    "difficulty": "boss",
    "title": "High Value Ledger Transactions with Cumulative Share Potential",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Large exposure ledger: Retrieve the top 20 largest transactions recorded in the ledger. Return transaction id, account id, amount, transaction type, description, and timestamp.",
    "context_notes": "ORDER BY amount DESC LIMIT 20 on transactions.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "transaction_type",
      "description",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, transaction_type, description, created_at FROM transactions ORDER BY amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order transactions by amount DESC LIMIT 20.",
      "Select full transaction detail."
    ],
    "solution_explanation": "AML inspection of the 20 largest individual transactions across the core ledger.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-080",
    "domain": "finance",
    "level": 1,
    "order": 80,
    "difficulty": "boss",
    "title": "Customer Earning and Credit Score Matrix by Metropolitan Area",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Metropolitan wealth index: For each branch city, calculate customer count, average credit score, average annual income, and total annual income. Filter for cities with customer count >= 5. Order by total income descending.",
    "context_notes": "GROUP BY branch_city on customers HAVING COUNT(id) >= 5.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "SUM"
    ],
    "expected_columns": [
      "branch_city",
      "customer_count",
      "avg_credit_score",
      "avg_income",
      "total_income"
    ],
    "reference_sql": "SELECT branch_city, COUNT(id) AS customer_count, ROUND(AVG(credit_score), 1) AS avg_credit_score, ROUND(AVG(annual_income), 2) AS avg_income, ROUND(SUM(annual_income), 2) AS total_income FROM customers GROUP BY branch_city HAVING COUNT(id) >= 5 ORDER BY total_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by branch_city.",
      "Filter HAVING COUNT(id) >= 5.",
      "Compute customer count, avg score, avg income, total income."
    ],
    "solution_explanation": "Evaluates metropolitan market wealth clusters for commercial lending and wealth offices.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-081",
    "domain": "finance",
    "level": 1,
    "order": 81,
    "difficulty": "boss",
    "title": "Card Portfolio Aggregate Exposure by Card Type and Status",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card exposure scorecard: Calculate total daily limits, average daily limit, and total card count grouped by card_type and status. Order by total daily limit descending.",
    "context_notes": "GROUP BY card_type, status on cards, SUM, AVG, COUNT.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "AVG",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "card_type",
      "status",
      "total_limit",
      "avg_daily_limit",
      "cards_count"
    ],
    "reference_sql": "SELECT card_type, status, ROUND(SUM(daily_limit), 2) AS total_limit, ROUND(AVG(daily_limit), 2) AS avg_daily_limit, COUNT(id) AS cards_count FROM cards GROUP BY card_type, status ORDER BY total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group cards by card_type and status.",
      "Calculate sum, avg, and count.",
      "Order by total_limit DESC."
    ],
    "solution_explanation": "Comprehensive card portfolio exposure report balancing credit lines against card status.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-082",
    "domain": "finance",
    "level": 1,
    "order": 82,
    "difficulty": "boss",
    "title": "Depository Balances Stratification Across Active Account Classes",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Product profitability summary: For each account type where status is active, calculate total balance, average balance, minimum balance, and maximum balance. Order by total balance descending.",
    "context_notes": "GROUP BY account_type on accounts WHERE status = active, SUM, AVG, MIN, MAX.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "AVG",
      "MIN",
      "MAX",
      "ORDER BY"
    ],
    "expected_columns": [
      "account_type",
      "total_balance",
      "avg_balance",
      "min_balance",
      "max_balance"
    ],
    "reference_sql": "SELECT account_type, ROUND(SUM(balance), 2) AS total_balance, ROUND(AVG(balance), 2) AS avg_balance, ROUND(MIN(balance), 2) AS min_balance, ROUND(MAX(balance), 2) AS max_balance FROM accounts WHERE status = 'active' GROUP BY account_type ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts for status = active.",
      "Group by account_type.",
      "Compute SUM, AVG, MIN, MAX on balance."
    ],
    "solution_explanation": "Depository balance matrix detailing asset size variance across core banking products.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-083",
    "domain": "finance",
    "level": 1,
    "order": 83,
    "difficulty": "boss",
    "title": "Wire and Transfer Outflows Exceeding Daily Thresholds",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Outflow risk screening: Find all transactions of type wire or transfer where amount >= $6,000. Return transaction id, account id, amount, transaction type, and timestamp, ordered by amount descending.",
    "context_notes": "Filter transactions WHERE transaction_type IN (wire, transfer) AND amount >= 6000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "account_id",
      "amount",
      "transaction_type",
      "created_at"
    ],
    "reference_sql": "SELECT id, account_id, amount, transaction_type, created_at FROM transactions WHERE transaction_type IN ('wire', 'transfer') AND amount >= 6000.00 ORDER BY amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE transaction_type IN ('wire', 'transfer') AND amount >= 6000.00.",
      "Order by amount DESC."
    ],
    "solution_explanation": "High-dollar liquidity outflow screening for fraudulent transfer interception.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-084",
    "domain": "finance",
    "level": 1,
    "order": 84,
    "difficulty": "boss",
    "title": "High Income Customers with Moderate or Low Risk Ratings",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Preferred private wealth prospects: Find customers with annual income >= $250,000 and risk_rating IN (Low, Moderate). Return customer id, name, annual income, credit score, and risk rating.",
    "context_notes": "Filter customers WHERE annual_income >= 250000.00 AND risk_rating IN (Low, Moderate).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "name",
      "annual_income",
      "credit_score",
      "risk_rating"
    ],
    "reference_sql": "SELECT id, name, annual_income, credit_score, risk_rating FROM customers WHERE annual_income >= 250000.00 AND risk_rating IN ('Low', 'Moderate') ORDER BY annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE annual_income >= 250000.00 AND risk_rating IN ('Low', 'Moderate').",
      "Order by annual_income DESC."
    ],
    "solution_explanation": "Surfaces affluent, low-risk clients for bespoke wealth management and lending.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-085",
    "domain": "finance",
    "level": 1,
    "order": 85,
    "difficulty": "boss",
    "title": "Merchant Category Risk and Geography Profile",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant underwriting portfolio: Group merchants by category and risk_level. Count total merchants in each combination. Order by category and merchant count descending.",
    "context_notes": "GROUP BY category, risk_level on merchants.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "risk_level",
      "merchant_count"
    ],
    "reference_sql": "SELECT category, risk_level, COUNT(id) AS merchant_count FROM merchants GROUP BY category, risk_level ORDER BY category ASC, merchant_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group merchants by category and risk_level.",
      "Count merchant accounts."
    ],
    "solution_explanation": "Examines merchant acquiring portfolio risk profiles by commerce vertical.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-086",
    "domain": "finance",
    "level": 1,
    "order": 86,
    "difficulty": "boss",
    "title": "Branch Vault Utilization Density by Regional Office",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Vault cash distribution: Rank all regional branches by vault cash limit descending. Return branch name, city, state, manager name, and vault cash limit.",
    "context_notes": "Query branches ORDER BY vault_cash_limit DESC.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state",
      "manager_name",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT branch_name, city, state, manager_name, vault_cash_limit FROM branches ORDER BY vault_cash_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order all branches by vault_cash_limit DESC.",
      "Select full branch metadata."
    ],
    "solution_explanation": "Comprehensive physical vault cash reserve listing for central treasury management.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-087",
    "domain": "finance",
    "level": 1,
    "order": 87,
    "difficulty": "boss",
    "title": "Depository Balance Ratio: Active vs Frozen Accounts",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Liquidity availability ratio: Compute total balance held in active accounts vs total balance held in frozen accounts using conditional SUM(CASE). Return active balance, frozen balance, and total depository balance.",
    "context_notes": "Conditional SUM(CASE WHEN status = active) and SUM(CASE WHEN status = frozen).",
    "concepts": [
      "SELECT",
      "SUM CASE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "active_balance",
      "frozen_balance",
      "total_depository_balance"
    ],
    "reference_sql": "SELECT ROUND(SUM(CASE WHEN status = 'active' THEN balance ELSE 0 END), 2) AS active_balance, ROUND(SUM(CASE WHEN status = 'frozen' THEN balance ELSE 0 END), 2) AS frozen_balance, ROUND(SUM(balance), 2) AS total_depository_balance FROM accounts;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use conditional SUM(CASE) to separate active and frozen balances.",
      "Compute grand total balance."
    ],
    "solution_explanation": "Quantifies available operational depository liquidity vs legally restricted funds.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-088",
    "domain": "finance",
    "level": 1,
    "order": 88,
    "difficulty": "boss",
    "title": "Transactions Aggregate Outflow vs Inflow Balance",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Net cash flow audit: Calculate total inflow volume (deposits) vs total outflow volume (withdrawals, transfers, fees, wires) across all ledger transactions using conditional SUM(CASE). Return total inflows, total outflows, and net cash movement.",
    "context_notes": "Conditional SUM(CASE) on transaction_type to compute inflows vs outflows.",
    "concepts": [
      "SELECT",
      "SUM CASE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "total_inflows",
      "total_outflows",
      "net_cash_movement"
    ],
    "reference_sql": "SELECT ROUND(SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END), 2) AS total_inflows, ROUND(SUM(CASE WHEN transaction_type != 'deposit' THEN amount ELSE 0 END), 2) AS total_outflows, ROUND(SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE -amount END), 2) AS net_cash_movement FROM transactions;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Sum deposits as total_inflows.",
      "Sum non-deposits as total_outflows.",
      "Compute net cash movement."
    ],
    "solution_explanation": "Institutional ledger reconciliation balancing overall cash inflows against customer outflows.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-089",
    "domain": "finance",
    "level": 1,
    "order": 89,
    "difficulty": "boss",
    "title": "Customer Credit Score and Annual Income Deciles",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit score decile analysis: Find all customers with credit score >= 700 and annual income >= $200,000. Return customer name, credit score, annual income, branch city, and risk rating, ordered by credit score descending.",
    "context_notes": "Filter customers WHERE credit_score >= 700 AND annual_income >= 200000.00.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "annual_income",
      "branch_city",
      "risk_rating"
    ],
    "reference_sql": "SELECT name, credit_score, annual_income, branch_city, risk_rating FROM customers WHERE credit_score >= 700 AND annual_income >= 200000.00 ORDER BY credit_score DESC, annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE credit_score >= 700 AND annual_income >= 200000.00.",
      "Order by credit_score DESC, annual_income DESC."
    ],
    "solution_explanation": "Surfaces prime affluent retail customers eligible for jumbo mortgages and premium lines.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-090",
    "domain": "finance",
    "level": 1,
    "order": 90,
    "difficulty": "boss",
    "title": "Card Daily Limits Exceeding Standard Retail Ceiling",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card portfolio risk ceiling: Find all active cards with daily limit strictly greater than $7,500. Return card id, card type, masked card number, and daily limit, ordered by limit descending.",
    "context_notes": "Filter cards WHERE daily_limit > 7500.00 AND status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "card_number_masked",
      "daily_limit"
    ],
    "reference_sql": "SELECT id, card_type, card_number_masked, daily_limit FROM cards WHERE daily_limit > 7500.00 AND status = 'active' ORDER BY daily_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE daily_limit > 7500.00 AND status = active.",
      "Order by daily_limit DESC."
    ],
    "solution_explanation": "Monitors high-exposure debit and credit card issuing facilities.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-091",
    "domain": "finance",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Branch Network Summary by State and City",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Regional network hierarchy: Calculate total branches, total vault cash limit, and average vault cash limit for each state and city. Order by state, city.",
    "context_notes": "GROUP BY state, city on branches, COUNT, SUM, AVG.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "state",
      "city",
      "branch_count",
      "total_vault_cash",
      "avg_vault_cash"
    ],
    "reference_sql": "SELECT state, city, COUNT(id) AS branch_count, ROUND(SUM(vault_cash_limit), 2) AS total_vault_cash, ROUND(AVG(vault_cash_limit), 2) AS avg_vault_cash FROM branches GROUP BY state, city ORDER BY state ASC, city ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group branches by state and city.",
      "Compute branch count, total vault cash, and avg vault cash."
    ],
    "solution_explanation": "Comprehensive branch infrastructure summary across metropolitan banking centers.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-092",
    "domain": "finance",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Active Accounts Holding Greater Than Median Balance",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Depository core percentile check: Find all active accounts with balance greater than $50,000. Return account id, customer id, account type, and balance, ordered by balance descending.",
    "context_notes": "Filter accounts WHERE balance > 50000.00 and status = active.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, customer_id, account_type, balance FROM accounts WHERE balance > 50000.00 AND status = 'active' ORDER BY balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter accounts where balance > 50000 and status = active.",
      "Order by balance DESC."
    ],
    "solution_explanation": "Isolates key funding relationships driving core bank liquidity reserves.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-093",
    "domain": "finance",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Wire Transactions Volume Aggregated by Day of Week",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Payment rail timing: For transactions of type wire, calculate wire transaction count, total dollar volume, and average wire amount for each day of the week (EXTRACT(DOW FROM created_at)).",
    "context_notes": "GROUP BY EXTRACT(DOW FROM created_at) on transactions WHERE transaction_type = wire.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "EXTRACT"
    ],
    "expected_columns": [
      "day_of_week",
      "wire_count",
      "total_wire_volume",
      "avg_wire_amount"
    ],
    "reference_sql": "SELECT EXTRACT(DOW FROM created_at) AS day_of_week, COUNT(id) AS wire_count, ROUND(SUM(amount), 2) AS total_wire_volume, ROUND(AVG(amount), 2) AS avg_wire_amount FROM transactions WHERE transaction_type = 'wire' GROUP BY EXTRACT(DOW FROM created_at) ORDER BY day_of_week ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter for transaction_type = wire.",
      "Extract DOW and compute count, sum, avg."
    ],
    "solution_explanation": "Tracks institutional wire flow patterns across the weekly banking cycle.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-094",
    "domain": "finance",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Customer Credit Risk and Earning Capacity Profile",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Credit risk underwriting review: Calculate total customers, average credit score, and average annual income for each customer risk rating where customer count >= 10. Order by avg credit score descending.",
    "context_notes": "GROUP BY risk_rating on customers HAVING COUNT(id) >= 10.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "risk_rating",
      "customer_count",
      "avg_credit_score",
      "avg_income"
    ],
    "reference_sql": "SELECT risk_rating, COUNT(id) AS customer_count, ROUND(AVG(credit_score), 1) AS avg_credit_score, ROUND(AVG(annual_income), 2) AS avg_income FROM customers GROUP BY risk_rating HAVING COUNT(id) >= 10 ORDER BY avg_credit_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group customers by risk_rating.",
      "Filter HAVING COUNT(id) >= 10.",
      "Compute count, avg credit score, avg annual income."
    ],
    "solution_explanation": "Evaluates credit scoring consistency and income underwriting by risk grade.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L1-095",
    "domain": "finance",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Top 15 Most Active Merchant Accounts by City and Risk",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant roster: List merchant name, category, city, country, and risk level for all merchants in standard or high-risk categories, ordered by risk level descending and merchant name.",
    "context_notes": "Filter merchants ORDER BY risk_level DESC, name ASC LIMIT 15.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "name",
      "category",
      "city",
      "country",
      "risk_level"
    ],
    "reference_sql": "SELECT name, category, city, country, risk_level FROM merchants ORDER BY risk_level DESC, name ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order merchants by risk_level DESC, name ASC.",
      "Limit to top 15."
    ],
    "solution_explanation": "Commercial merchant underwriting directory identifying elevated risk counterparties.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-096",
    "domain": "finance",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Total Depository Balances Grouped by Balance Size Tiers",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Balance tier summary: Group active accounts into balance tiers: Premium ($100k+), Standard ($25k-$99k), Entry (<$25k) using CASE. Calculate total dollar balance and account count in each tier.",
    "context_notes": "CASE on balance on accounts WHERE status = active, SUM, COUNT.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "balance_tier",
      "total_balance",
      "account_count"
    ],
    "reference_sql": "SELECT CASE WHEN balance >= 100000.00 THEN 'Premium ($100k+)' WHEN balance BETWEEN 25000.00 AND 99999.99 THEN 'Standard ($25k-$99k)' ELSE 'Entry (<$25k)' END AS balance_tier, ROUND(SUM(balance), 2) AS total_balance, COUNT(id) AS account_count FROM accounts WHERE status = 'active' GROUP BY (CASE WHEN balance >= 100000.00 THEN 'Premium ($100k+)' WHEN balance BETWEEN 25000.00 AND 99999.99 THEN 'Standard ($25k-$99k)' ELSE 'Entry (<$25k)' END) ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify accounts using CASE WHEN.",
      "Sum balance and count accounts per balance bracket."
    ],
    "solution_explanation": "Strategic deposit stratification illustrating concentration of retail and commercial deposits.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-097",
    "domain": "finance",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Cash Inflows vs Outflows for Largest Transaction Dates",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Daily net ledger settlement: For each transaction date (created_at::DATE), calculate total transaction count and net volume (deposits positive, all other types negative). Order by net volume descending LIMIT 15.",
    "context_notes": "GROUP BY created_at::DATE with conditional SUM(CASE).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM CASE",
      "COUNT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "tx_date",
      "tx_count",
      "net_settlement_volume"
    ],
    "reference_sql": "SELECT created_at::DATE AS tx_date, COUNT(id) AS tx_count, ROUND(SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE -amount END), 2) AS net_settlement_volume FROM transactions GROUP BY created_at::DATE ORDER BY net_settlement_volume DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group transactions by date.",
      "Sum deposits as positive and non-deposits as negative.",
      "Order by net_settlement_volume DESC LIMIT 15."
    ],
    "solution_explanation": "Identifies dates with top positive liquidity accretion in the central ledger.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-098",
    "domain": "finance",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Top 10 High Limit Credit and Charge Cards Active in Portfolio",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Top credit limits: Find the 10 active cards with the largest daily limits. Return card id, card type, masked card number, and daily limit, ordered by daily limit descending.",
    "context_notes": "Filter cards WHERE status = active ORDER BY daily_limit DESC LIMIT 10.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "card_number_masked",
      "daily_limit"
    ],
    "reference_sql": "SELECT id, card_type, card_number_masked, daily_limit FROM cards WHERE status = 'active' ORDER BY daily_limit DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter active cards.",
      "Order by daily_limit DESC LIMIT 10."
    ],
    "solution_explanation": "Surfaces the highest single-card transactional limits authorized on active accounts.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-099",
    "domain": "finance",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Total Inactive and Frozen Depository Balances Exposure",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Restricted capital audit: Calculate total balance, account count, and average balance for all accounts that are NOT active (status != active).",
    "context_notes": "Filter accounts WHERE status != active, compute SUM, COUNT, AVG.",
    "concepts": [
      "SELECT",
      "SUM",
      "COUNT",
      "AVG",
      "WHERE"
    ],
    "expected_columns": [
      "non_active_accounts_count",
      "total_restricted_balance",
      "avg_restricted_balance"
    ],
    "reference_sql": "SELECT COUNT(id) AS non_active_accounts_count, ROUND(SUM(balance), 2) AS total_restricted_balance, ROUND(AVG(balance), 2) AS avg_restricted_balance FROM accounts WHERE status != 'active';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status != active.",
      "Calculate COUNT, SUM, and AVG on balance."
    ],
    "solution_explanation": "Measures total restricted and dormant funds under institutional hold.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L1-100",
    "domain": "finance",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "The Grand Level 1 Bank Executive Operations Dashboard",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Final Level 1 Challenge: Consolidated Bank Balance Sheet & Operational Health Card — Calculate: (1) Total active regional branches, (2) Total registered bank customers, (3) Total active depository accounts, (4) Grand total depository balance across active accounts, and (5) Grand total vault cash limit authorized across all branches. Return all five key metrics in a single row.",
    "context_notes": "Consolidated cross-table financial KPI dashboard using scalar subqueries.",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "COUNT",
      "SUM"
    ],
    "expected_columns": [
      "total_active_branches",
      "total_customers",
      "total_active_accounts",
      "total_active_depository_balance",
      "total_vault_cash_authorized"
    ],
    "reference_sql": "SELECT (SELECT COUNT(id) FROM branches) AS total_active_branches, (SELECT COUNT(id) FROM customers) AS total_customers, (SELECT COUNT(id) FROM accounts WHERE status = 'active') AS total_active_accounts, (SELECT ROUND(SUM(balance), 2) FROM accounts WHERE status = 'active') AS total_active_depository_balance, (SELECT ROUND(SUM(vault_cash_limit), 2) FROM branches) AS total_vault_cash_authorized;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Combine 5 scalar subqueries querying branches, customers, and accounts.",
      "Return unified single-row executive banking health scorecard."
    ],
    "solution_explanation": "Grand Level 1 Capstone Dashboard: Synthesizes core depository balances, customer base scale, and regional branch cash reserves into a premier executive state-of-the-bank summary.",
    "xp": 30,
    "estimated_minutes": 12
  }
];
