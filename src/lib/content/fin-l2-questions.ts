import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L2-001",
    "domain": "finance",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Customer Accounts with Customer Names",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Customer account mapping: Show each account with the customer full name — return customer name, account id, account type, and balance. Order by customer name.",
    "context_notes": "JOIN accounts with customers.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "account_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT c.name, a.id AS account_id, a.account_type, a.balance FROM accounts a JOIN customers c ON a.customer_id = c.id ORDER BY c.name ASC, a.id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts a with customers c on a.customer_id = c.id.",
      "Select c.name, a.id AS account_id, a.account_type, a.balance."
    ],
    "solution_explanation": "Resolves account numbers to customer identity.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-002",
    "domain": "finance",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Accounts Linked to Regional Branches",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch depository ledger: List all active accounts showing the managing branch name — return branch name, account id, account type, and balance.",
    "context_notes": "JOIN accounts with branches WHERE status = active.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "branch_name",
      "account_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT b.branch_name, a.id AS account_id, a.account_type, a.balance FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' ORDER BY b.branch_name ASC, a.balance DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter WHERE a.status = active."
    ],
    "solution_explanation": "Maps depository assets to managing branch locations.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-003",
    "domain": "finance",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Customer Loan Portfolio Details",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Lending portfolio review: List all active loans with customer name — return customer name, loan type, principal amount, and interest rate.",
    "context_notes": "JOIN loans with customers WHERE status = current.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "loan_type",
      "principal_amount",
      "interest_rate"
    ],
    "reference_sql": "SELECT c.name, l.loan_type, l.principal_amount, l.interest_rate FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.status = 'current' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans l with customers c on l.customer_id = c.id.",
      "Filter WHERE l.status = current."
    ],
    "solution_explanation": "Connects credit commitments to customer demographic profiles.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-004",
    "domain": "finance",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Card Swipes with Merchant Details",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Transaction acquiring log: Show recent card swipes with merchant name — return swipe id, merchant name, amount, and transaction date. Order latest first. Limit to top 25.",
    "context_notes": "JOIN card_swipes with merchants.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "swipe_id",
      "merchant_name",
      "amount",
      "transaction_date"
    ],
    "reference_sql": "SELECT cs.id AS swipe_id, m.name AS merchant_name, cs.amount, cs.transaction_date FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id ORDER BY cs.transaction_date DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes cs with merchants m on cs.merchant_id = m.id.",
      "Order by cs.transaction_date DESC LIMIT 25."
    ],
    "solution_explanation": "Tracks point-of-sale card swipes with merchant identities.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-005",
    "domain": "finance",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Revolving Credit Lines Linked to Customer Profile",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit facilities review: Show all active revolving credit lines with customer name and credit score — return customer name, credit score, total limit, and used amount.",
    "context_notes": "JOIN credit_lines with customers WHERE status = active.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_limit",
      "used_amount"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, cl.total_limit, cl.used_amount FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' ORDER BY cl.total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines cl with customers c on cl.customer_id = c.id.",
      "Filter WHERE cl.status = active."
    ],
    "solution_explanation": "Reviews customer revolving credit limits alongside credit scores.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-006",
    "domain": "finance",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Transactions With Account Holder Customer Name",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Audit trail: Retrieve ledger transactions showing customer name — return transaction id, customer name, transaction type, and amount. Order highest amount first. Limit to top 20.",
    "context_notes": "JOIN transactions → accounts → customers.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "SELECT t.id, c.name, t.transaction_type, t.amount FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id ORDER BY t.amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join transactions to accounts to customers.",
      "Order by amount DESC LIMIT 20."
    ],
    "solution_explanation": "Connects ledger entries directly to the ultimate beneficial account owner.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-007",
    "domain": "finance",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Cards Issued on Checking Accounts",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Debit card linkages: Show all cards linked to checking accounts — return card id, card type, masked card number, and account balance.",
    "context_notes": "JOIN cards with accounts WHERE account_type = checking.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "card_number_masked",
      "balance"
    ],
    "reference_sql": "SELECT c.id, c.card_type, c.card_number_masked, a.balance FROM cards c JOIN accounts a ON c.account_id = a.id WHERE a.account_type = 'checking' ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join cards c with accounts a on c.account_id = a.id.",
      "Filter WHERE a.account_type = checking."
    ],
    "solution_explanation": "Monitors payment cards attached to everyday transactional checking deposits.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-008",
    "domain": "finance",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Loans Originated by Wall Street Branch",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Branch loan origination: List all loans originated through the Wall Street Main Financial branch — return loan id, loan type, principal amount, and status.",
    "context_notes": "JOIN loans with branches WHERE branch_name LIKE Wall Street%.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "id",
      "loan_type",
      "principal_amount",
      "status"
    ],
    "reference_sql": "SELECT l.id, l.loan_type, l.principal_amount, l.status FROM loans l JOIN branches b ON l.branch_id = b.id WHERE b.branch_name LIKE 'Wall Street%' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Filter WHERE b.branch_name LIKE 'Wall Street%'."
    ],
    "solution_explanation": "Surfaces loans originated at our flagship Wall Street banking center.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-009",
    "domain": "finance",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "High Fraud Score Card Swipes with Merchant Category",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Suspicious transaction monitor: Find card swipes where fraud_score >= 70 — return swipe id, merchant name, category, amount, and fraud score.",
    "context_notes": "JOIN card_swipes with merchants WHERE fraud_score >= 70.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "category",
      "amount",
      "fraud_score"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, m.category, cs.amount, cs.fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.fraud_score >= 70 ORDER BY cs.fraud_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE cs.fraud_score >= 70."
    ],
    "solution_explanation": "Flags high-risk card transactions for immediate security escalation.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-010",
    "domain": "finance",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Customers With Overdue Loans",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Delinquency notice roster: Find all customers with loans marked status late — return customer name, credit score, loan type, and principal amount.",
    "context_notes": "JOIN loans with customers WHERE status = late.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, l.loan_type, l.principal_amount FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.status = 'late' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE l.status = late."
    ],
    "solution_explanation": "Compiles delinquent loan collection rosters.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-011",
    "domain": "finance",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Contactless Card Swipes at Grocery Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Contactless adoption: Show all contactless card swipes (is_contactless = TRUE) at Grocery merchants — return swipe id, merchant name, amount, and swipe date.",
    "context_notes": "JOIN card_swipes with merchants WHERE is_contactless = TRUE AND category = Grocery.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "amount",
      "transaction_date"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, cs.amount, cs.transaction_date FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.is_contactless = TRUE AND m.category = 'Grocery' ORDER BY cs.transaction_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE cs.is_contactless = TRUE AND m.category = Grocery."
    ],
    "solution_explanation": "Tracks NFC contactless tap payment adoption at retail food outlets.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-012",
    "domain": "finance",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Credit Lines With Over 50% Utilization Ratio",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit line stress: Find active credit lines where used_amount is greater than half of total_limit — return customer name, total limit, used amount, and interest rate.",
    "context_notes": "JOIN credit_lines with customers WHERE used_amount > 0.5 * total_limit.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "total_limit",
      "used_amount",
      "interest_rate"
    ],
    "reference_sql": "SELECT c.name, cl.total_limit, cl.used_amount, cl.interest_rate FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' AND cl.used_amount > (0.5 * cl.total_limit) ORDER BY cl.used_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Filter WHERE cl.used_amount > 0.5 * cl.total_limit."
    ],
    "solution_explanation": "Identifies revolving borrowers heavily utilizing their authorized credit capacity.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-013",
    "domain": "finance",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Accounts in San Francisco Branches",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "West coast branch deposits: List all active accounts managed by branches in San Francisco — return branch name, account id, account type, and balance.",
    "context_notes": "JOIN accounts with branches WHERE branches.city = San Francisco.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "branch_name",
      "account_id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT b.branch_name, a.id AS account_id, a.account_type, a.balance FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE b.city = 'San Francisco' AND a.status = 'active' ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter WHERE b.city = San Francisco AND a.status = active."
    ],
    "solution_explanation": "Reviews depository balances housed in Bay Area banking offices.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-014",
    "domain": "finance",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Mortgage Loans With Customer Income Profile",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Mortgage underwriting review: Show all loans of loan_type Mortgage with customer annual income — return customer name, annual income, principal amount, and term months.",
    "context_notes": "JOIN loans with customers WHERE loan_type = Mortgage.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "principal_amount",
      "term_months"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, l.principal_amount, l.term_months FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.loan_type = 'Mortgage' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE loan_type = Mortgage."
    ],
    "solution_explanation": "Compares residential mortgage obligations against verified customer earnings.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-015",
    "domain": "finance",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Card Swipes on Crypto or High-Risk Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "High-risk acquiring surveillance: Show all card swipes processed at merchants where risk_level = High_Risk — return swipe id, merchant name, amount, fraud score, and date.",
    "context_notes": "JOIN card_swipes with merchants WHERE risk_level = High_Risk.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "amount",
      "fraud_score",
      "transaction_date"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, cs.amount, cs.fraud_score, cs.transaction_date FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.risk_level = 'High_Risk' ORDER BY cs.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE m.risk_level = High_Risk."
    ],
    "solution_explanation": "Isolates card expenditures directed to elevated risk merchant categories.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-016",
    "domain": "finance",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Customer Depository Balances in Boston Branches",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Boston wealth accounts: List customers holding active accounts in Boston branches — return customer name, branch name, account type, and balance.",
    "context_notes": "JOIN customers → accounts → branches WHERE branches.city = Boston.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "customer_name",
      "branch_name",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT c.name AS customer_name, b.branch_name, a.account_type, a.balance FROM accounts a JOIN customers c ON a.customer_id = c.id JOIN branches b ON a.branch_id = b.id WHERE b.city = 'Boston' AND a.status = 'active' ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers and branches.",
      "Filter WHERE b.city = Boston."
    ],
    "solution_explanation": "Cross-references customer depository relationships in the Boston banking market.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-017",
    "domain": "finance",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Active Commercial Business Loans",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Commercial banking asset review: Show all loans of loan_type Business that are currently active — return customer name, principal amount, interest rate, and term months.",
    "context_notes": "JOIN loans with customers WHERE loan_type = Business AND status = current.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "principal_amount",
      "interest_rate",
      "term_months"
    ],
    "reference_sql": "SELECT c.name, l.principal_amount, l.interest_rate, l.term_months FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.loan_type = 'Business' AND l.status = 'current' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE l.loan_type = Business AND l.status = current."
    ],
    "solution_explanation": "Surfaces outstanding commercial business credit facilities.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-018",
    "domain": "finance",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Card Swipes Over $1,000 at Retail Electronics Stores",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "High-dollar electronics fraud review: Pull all card swipes of $1,000 or more processed at Electronics merchants — return swipe id, merchant name, amount, and fraud score.",
    "context_notes": "JOIN card_swipes with merchants WHERE category = Electronics AND amount >= 1000.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "amount",
      "fraud_score"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, cs.amount, cs.fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.category = 'Electronics' AND cs.amount >= 1000.00 ORDER BY cs.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE category = Electronics and amount >= 1000."
    ],
    "solution_explanation": "Flags high-dollar consumer electronics purchases for fraud pattern audits.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-019",
    "domain": "finance",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "High Risk Customers With Outstanding Loans",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Credit risk exposure: List all loans issued to customers categorized with risk_rating High or Speculative — return customer name, risk rating, loan type, and principal amount.",
    "context_notes": "JOIN loans with customers WHERE risk_rating IN (High, Speculative).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "risk_rating",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT c.name, c.risk_rating, l.loan_type, l.principal_amount FROM loans l JOIN customers c ON l.customer_id = c.id WHERE c.risk_rating IN ('High', 'Speculative') ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE c.risk_rating IN ('High', 'Speculative')."
    ],
    "solution_explanation": "Audits lending portfolio commitments extended to higher-risk borrower tiers.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-020",
    "domain": "finance",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Debit Cards Linked to Accounts in Atlanta or Dallas",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Southern card distribution: List active debit cards linked to branches in Atlanta or Dallas — return branch name, masked card number, daily limit, and balance.",
    "context_notes": "JOIN cards → accounts → branches WHERE branches.city IN (Atlanta, Dallas).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "branch_name",
      "card_number_masked",
      "daily_limit",
      "balance"
    ],
    "reference_sql": "SELECT b.branch_name, c.card_number_masked, c.daily_limit, a.balance FROM cards c JOIN accounts a ON c.account_id = a.id JOIN branches b ON a.branch_id = b.id WHERE b.city IN ('Atlanta', 'Dallas') AND c.status = 'active' ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join cards to accounts to branches.",
      "Filter WHERE b.city IN ('Atlanta', 'Dallas')."
    ],
    "solution_explanation": "Reviews payment cards active in key southern metropolitan banking centers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-021",
    "domain": "finance",
    "level": 2,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Customers With Both Checking and Savings Accounts",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Relationship banking: Find customers holding both checking and savings accounts using a self-join or relational condition — return customer name, checking balance, and savings balance.",
    "context_notes": "JOIN accounts chk with accounts sav on customer_id WHERE chk.account_type = checking and sav.account_type = savings.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "checking_balance",
      "savings_balance"
    ],
    "reference_sql": "SELECT c.name, chk.balance AS checking_balance, sav.balance AS savings_balance FROM customers c JOIN accounts chk ON c.id = chk.customer_id AND chk.account_type = 'checking' JOIN accounts sav ON c.id = sav.customer_id AND sav.account_type = 'savings' WHERE chk.status = 'active' AND sav.status = 'active' ORDER BY (chk.balance + sav.balance) DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts twice to customers for checking and savings types.",
      "Order by combined balance DESC."
    ],
    "solution_explanation": "Surfaces dual-depository customer relationships for relationship pricing.",
    "xp": 20,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-022",
    "domain": "finance",
    "level": 2,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Auto Loans with Low Interest Rates (< 6%)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Vehicle finance promotions: List all current loans of loan_type Auto with interest_rate < 6.00% — return customer name, principal amount, interest rate, and term months.",
    "context_notes": "JOIN loans with customers WHERE loan_type = Auto AND interest_rate < 6.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "principal_amount",
      "interest_rate",
      "term_months"
    ],
    "reference_sql": "SELECT c.name, l.principal_amount, l.interest_rate, l.term_months FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.loan_type = 'Auto' AND l.interest_rate < 6.00 ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE loan_type = Auto and interest_rate < 6.00."
    ],
    "solution_explanation": "Identifies low-APR prime automobile loans in the retail asset book.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-023",
    "domain": "finance",
    "level": 2,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Card Swipes at Hotel and Dining Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Hospitality card spending: Show all card swipes processed at Dining or Travel merchants — return swipe id, merchant name, category, amount, and swipe date.",
    "context_notes": "JOIN card_swipes with merchants WHERE category IN (Dining, Travel).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "category",
      "amount",
      "transaction_date"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, m.category, cs.amount, cs.transaction_date FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.category IN ('Dining', 'Travel') ORDER BY cs.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE category IN ('Dining', 'Travel')."
    ],
    "solution_explanation": "Reviews commercial card expenditures across business travel and entertainment.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-024",
    "domain": "finance",
    "level": 2,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Credit Lines With Zero Outstanding Balances",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Undrawn revolving liquidity: Find active credit lines where used_amount is exactly $0.00 — return customer name, total limit, and interest rate.",
    "context_notes": "JOIN credit_lines with customers WHERE used_amount = 0 and status = active.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "total_limit",
      "interest_rate"
    ],
    "reference_sql": "SELECT c.name, cl.total_limit, cl.interest_rate FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' AND cl.used_amount = 0.00 ORDER BY cl.total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Filter WHERE status = active and used_amount = 0."
    ],
    "solution_explanation": "Identifies standby credit commitments with zero current liquidity draw.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-025",
    "domain": "finance",
    "level": 2,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Accounts With Recent High-Dollar Wire Inflows",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Inflow wire verification: Show all transactions of type wire with amount >= $7,500 along with the customer name and account type — return customer name, account type, amount, and timestamp.",
    "context_notes": "JOIN transactions → accounts → customers WHERE transaction_type = wire AND amount >= 7500.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "customer_name",
      "account_type",
      "amount",
      "created_at"
    ],
    "reference_sql": "SELECT c.name AS customer_name, a.account_type, t.amount, t.created_at FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id WHERE t.transaction_type = 'wire' AND t.amount >= 7500.00 ORDER BY t.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join transactions to accounts to customers.",
      "Filter WHERE transaction_type = wire and amount >= 7500."
    ],
    "solution_explanation": "Isolates large institutional incoming wire transfers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-026",
    "domain": "finance",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Total Depository Balances Managed by Branch",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch deposit league table: Calculate total active deposit balance and active account count for each branch. Order highest total balance first.",
    "context_notes": "JOIN accounts with branches WHERE status = active, GROUP BY branch_name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "active_accounts_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_deposits, COUNT(a.id) AS active_accounts_count FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter WHERE a.status = active.",
      "Group by branch and compute SUM(balance) and COUNT(id)."
    ],
    "solution_explanation": "Ranks banking branches by total customer deposit funding.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-027",
    "domain": "finance",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Total Loan Portfolio Originated per Branch",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Branch asset generation: Calculate total principal originated and loan count for each branch. Order highest loan principal first.",
    "context_notes": "JOIN loans with branches, GROUP BY branch_name, SUM(principal_amount).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_loan_principal",
      "loans_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(l.principal_amount), 2) AS total_loan_principal, COUNT(l.id) AS loans_count FROM loans l JOIN branches b ON l.branch_id = b.id GROUP BY b.id, b.branch_name, b.city ORDER BY total_loan_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Group by branch and compute SUM(principal_amount) and COUNT(l.id)."
    ],
    "solution_explanation": "Assesses loan origination volume across regional branch offices.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-028",
    "domain": "finance",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "Loan Principal and Average Interest by Loan Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Credit asset yield: For each loan type (Mortgage, Auto, Business, Personal), calculate total principal amount and average interest rate across active loans.",
    "context_notes": "GROUP BY loan_type on loans WHERE status = current.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "AVG",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "loan_type",
      "total_principal",
      "avg_interest_rate"
    ],
    "reference_sql": "SELECT loan_type, ROUND(SUM(principal_amount), 2) AS total_principal, ROUND(AVG(interest_rate), 2) AS avg_interest_rate FROM loans WHERE status = 'current' GROUP BY loan_type ORDER BY total_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = current.",
      "Group by loan_type and compute SUM(principal_amount) and AVG(interest_rate)."
    ],
    "solution_explanation": "Analyzes yield and capital commitment by loan product category.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-029",
    "domain": "finance",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Card Swipes Volume and Average Spend per Merchant",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant settlement yield: For each merchant, calculate total swipes count, total transaction volume, and average swipe amount. Order highest volume first.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY merchant name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "merchant_name",
      "category",
      "total_swipes",
      "gross_volume",
      "avg_ticket"
    ],
    "reference_sql": "SELECT m.name AS merchant_name, m.category, COUNT(cs.id) AS total_swipes, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.amount), 2) AS avg_ticket FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.id, m.name, m.category ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant.",
      "Compute count, sum, and average ticket size."
    ],
    "solution_explanation": "Measures commercial merchant settlement volume and average ticket size.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-030",
    "domain": "finance",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Credit Line Utilization by Customer Risk Rating",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit risk: For each customer risk rating (Low, Moderate, High, Speculative), calculate total credit limit, total used amount, and overall utilization percentage.",
    "context_notes": "JOIN credit_lines with customers, GROUP BY risk_rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "risk_rating",
      "total_limit",
      "total_used",
      "utilization_pct"
    ],
    "reference_sql": "SELECT c.risk_rating, ROUND(SUM(cl.total_limit), 2) AS total_limit, ROUND(SUM(cl.used_amount), 2) AS total_used, ROUND(SUM(cl.used_amount) / SUM(cl.total_limit) * 100.0, 1) AS utilization_pct FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id GROUP BY c.risk_rating ORDER BY utilization_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Group by c.risk_rating.",
      "Compute total_limit, total_used, and utilization percentage."
    ],
    "solution_explanation": "Evaluates revolving credit draw habits across borrower risk tiers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-031",
    "domain": "finance",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Total Customer Depository Wealth by City",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Metropolitan wealth book: Calculate total active deposit balance, average account balance, and total active accounts for each customer branch city. Order highest total balance first.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY branch_city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "AVG",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_city",
      "total_wealth",
      "avg_balance",
      "accounts_count"
    ],
    "reference_sql": "SELECT c.branch_city, ROUND(SUM(a.balance), 2) AS total_wealth, ROUND(AVG(a.balance), 2) AS avg_balance, COUNT(a.id) AS accounts_count FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.branch_city ORDER BY total_wealth DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers.",
      "Filter WHERE a.status = active.",
      "Group by c.branch_city and compute SUM, AVG, COUNT."
    ],
    "solution_explanation": "Ranks customer home markets by total depository wealth.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-032",
    "domain": "finance",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Late Loan Exposure by Customer Risk Rating",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Delinquency concentration: Calculate total overdue principal amount and late loan count grouped by customer risk rating for loans with status late.",
    "context_notes": "JOIN loans with customers WHERE status = late, GROUP BY risk_rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "risk_rating",
      "late_loans_count",
      "overdue_principal"
    ],
    "reference_sql": "SELECT c.risk_rating, COUNT(l.id) AS late_loans_count, ROUND(SUM(l.principal_amount), 2) AS overdue_principal FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.status = 'late' GROUP BY c.risk_rating ORDER BY overdue_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE l.status = late.",
      "Group by c.risk_rating and sum principal_amount."
    ],
    "solution_explanation": "Quantifies non-performing and delinquent debt exposure by risk grade.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-033",
    "domain": "finance",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Average Fraud Score by Merchant Category",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant sector risk index: Calculate average fraud score, total card swipes, and total dollar volume for each merchant category.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "AVG",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "avg_fraud_score",
      "total_swipes",
      "total_volume"
    ],
    "reference_sql": "SELECT m.category, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score, COUNT(cs.id) AS total_swipes, ROUND(SUM(cs.amount), 2) AS total_volume FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.category ORDER BY avg_fraud_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by m.category.",
      "Compute AVG(fraud_score), COUNT(cs.id), SUM(cs.amount)."
    ],
    "solution_explanation": "Evaluates fraud risk density across retail acquiring sectors.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-034",
    "domain": "finance",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "Customer Multi-Account Depository Holdings",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Customer relationship breadth: For customers holding more than 1 active account, show customer name, active account count, and total depository balance. Order highest balance first.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY customer HAVING COUNT(a.id) > 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "active_accounts",
      "total_balance"
    ],
    "reference_sql": "SELECT c.name, COUNT(a.id) AS active_accounts, ROUND(SUM(a.balance), 2) AS total_balance FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.id, c.name HAVING COUNT(a.id) > 1 ORDER BY total_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers.",
      "Filter for active accounts.",
      "Group by customer with HAVING COUNT(a.id) > 1."
    ],
    "solution_explanation": "Surfaces multi-product relationship clients commanding high aggregate balances.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-035",
    "domain": "finance",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Branch Loan-to-Deposit Balance Comparison",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch balance sheet ratio: For branches managing active accounts, calculate total deposit balance and total vault cash limit. Order by total deposit balance descending.",
    "context_notes": "JOIN accounts with branches WHERE accounts.status = active, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_deposits, b.vault_cash_limit FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter for active accounts.",
      "Group by branch and compare total deposits to vault limit."
    ],
    "solution_explanation": "Compares branch customer deposit volume against physical vault storage.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-036",
    "domain": "finance",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Card Swipes Volume by Card Issuer Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card brand performance: For each card type (Visa_Debit, Mastercard_Credit, Platinum_Amex), calculate total card swipes count and total dollar spend.",
    "context_notes": "JOIN card_swipes with cards, GROUP BY card_type.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "card_type",
      "swipes_count",
      "total_spend"
    ],
    "reference_sql": "SELECT c.card_type, COUNT(cs.id) AS swipes_count, ROUND(SUM(cs.amount), 2) AS total_spend FROM card_swipes cs JOIN cards c ON cs.card_id = c.id GROUP BY c.card_type ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to cards.",
      "Group by card_type.",
      "Compute COUNT(cs.id) and SUM(cs.amount)."
    ],
    "solution_explanation": "Evaluates payment processing revenue across debit and credit card products.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-037",
    "domain": "finance",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Total Credit Line Commitments per Branch City",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit geography: For each branch city, calculate total authorized revolving limit, total drawn amount, and credit lines count.",
    "context_notes": "JOIN credit_lines with customers, GROUP BY branch_city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_city",
      "total_limit",
      "total_used",
      "lines_count"
    ],
    "reference_sql": "SELECT c.branch_city, ROUND(SUM(cl.total_limit), 2) AS total_limit, ROUND(SUM(cl.used_amount), 2) AS total_used, COUNT(cl.id) AS lines_count FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id GROUP BY c.branch_city ORDER BY total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Group by c.branch_city.",
      "Compute sum of limit, sum of used, and count of lines."
    ],
    "solution_explanation": "Assesses revolving credit risk distribution by regional metropolitan area.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-038",
    "domain": "finance",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "High Income Customers with Mortgages",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Affluent mortgage debt: Show all mortgage loans where customer annual income is >= $200,000 — return customer name, annual income, principal amount, and interest rate.",
    "context_notes": "JOIN loans with customers WHERE loan_type = Mortgage AND annual_income >= 200000.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "principal_amount",
      "interest_rate"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, l.principal_amount, l.interest_rate FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.loan_type = 'Mortgage' AND c.annual_income >= 200000.00 ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE loan_type = Mortgage and annual_income >= 200000."
    ],
    "solution_explanation": "Reviews jumbo residential mortgage exposure among high-earning clients.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-039",
    "domain": "finance",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Contactless vs Standard Swipes by Merchant Category",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "NFC payments penetration: For each merchant category, calculate total contactless swipes and total standard swipes using conditional SUM(CASE).",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY category, SUM(CASE WHEN is_contactless).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "category",
      "contactless_swipes",
      "standard_swipes"
    ],
    "reference_sql": "SELECT m.category, SUM(CASE WHEN cs.is_contactless THEN 1 ELSE 0 END) AS contactless_swipes, SUM(CASE WHEN NOT cs.is_contactless THEN 1 ELSE 0 END) AS standard_swipes FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.category ORDER BY contactless_swipes DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by category.",
      "Pivot contactless vs standard swipes using conditional SUM."
    ],
    "solution_explanation": "Tracks contactless adoption metrics across retail trade categories.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-040",
    "domain": "finance",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "Branch Depository Concentration: Checking vs Savings",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Product mix per branch: For each regional branch, compute total checking balance and total savings balance using conditional SUM(CASE).",
    "context_notes": "JOIN accounts with branches WHERE status = active, GROUP BY branch, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "checking_balance",
      "savings_balance"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(CASE WHEN a.account_type = 'checking' THEN a.balance ELSE 0 END), 2) AS checking_balance, ROUND(SUM(CASE WHEN a.account_type = 'savings' THEN a.balance ELSE 0 END), 2) AS savings_balance FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city ORDER BY checking_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter for active accounts.",
      "Pivot checking vs savings balances via conditional SUM."
    ],
    "solution_explanation": "Analyzes low-cost checking vs interest-bearing savings deposit mix by branch.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-041",
    "domain": "finance",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Customers With Delinquent Loans and High Credit Limits",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Cross-product risk contagion: Find customers who have a loan with status late AND also hold an active credit line. Return customer name, credit score, loan principal, and credit line total limit.",
    "context_notes": "JOIN customers with loans and credit_lines WHERE l.status = late.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "principal_amount",
      "total_limit"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, l.principal_amount, cl.total_limit FROM loans l JOIN customers c ON l.customer_id = c.id JOIN credit_lines cl ON c.id = cl.customer_id WHERE l.status = 'late' AND cl.status = 'active' ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to both loans and credit_lines.",
      "Filter for late loan and active credit line."
    ],
    "solution_explanation": "Identifies borrowers in default on term loans who still retain open revolving lines.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-042",
    "domain": "finance",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Average Transaction Size by Account Type",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Transactional ticket size: For each account type, calculate total transactions count and average transaction amount in the ledger.",
    "context_notes": "JOIN transactions with accounts, GROUP BY account_type.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "account_type",
      "tx_count",
      "avg_amount"
    ],
    "reference_sql": "SELECT a.account_type, COUNT(t.id) AS tx_count, ROUND(AVG(t.amount), 2) AS avg_amount FROM transactions t JOIN accounts a ON t.account_id = a.id GROUP BY a.account_type ORDER BY avg_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join transactions to accounts.",
      "Group by a.account_type.",
      "Compute COUNT(t.id) and AVG(t.amount)."
    ],
    "solution_explanation": "Evaluates transactional velocity and ticket size across deposit products.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-043",
    "domain": "finance",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Merchants Generating Swipes With Fraud Score > 50",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Fraud-prone merchants: For merchants that have processed card swipes with fraud_score > 50, count how many suspicious swipes occurred and total dollar amount.",
    "context_notes": "JOIN card_swipes with merchants WHERE fraud_score > 50, GROUP BY merchant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "merchant_name",
      "category",
      "suspicious_swipes",
      "suspicious_volume"
    ],
    "reference_sql": "SELECT m.name AS merchant_name, m.category, COUNT(cs.id) AS suspicious_swipes, ROUND(SUM(cs.amount), 2) AS suspicious_volume FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.fraud_score > 50 GROUP BY m.id, m.name, m.category ORDER BY suspicious_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE fraud_score > 50.",
      "Group by merchant and compute count and sum."
    ],
    "solution_explanation": "Focuses merchant acquiring risk investigations on high-fraud terminals.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-044",
    "domain": "finance",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Branch Total Lending Exposure vs Vault Capacity",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch capital balance sheet: For branches with loans, calculate total principal amount outstanding and compare with vault cash limit. Order by total loan principal descending.",
    "context_notes": "JOIN loans with branches WHERE loans.status = current, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_loans",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(l.principal_amount), 2) AS total_loans, b.vault_cash_limit FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.status = 'current' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_loans DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Filter for current loans.",
      "Group by branch and compute SUM(principal_amount)."
    ],
    "solution_explanation": "Compares credit asset commitments against branch vault cash ceilings.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-045",
    "domain": "finance",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Active Personal Loans Distribution by Term Months",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Personal loan maturities: For loans of loan_type Personal, calculate total principal and loan count grouped by term_months.",
    "context_notes": "GROUP BY term_months on loans WHERE loan_type = Personal.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "COUNT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "term_months",
      "total_principal",
      "loan_count"
    ],
    "reference_sql": "SELECT term_months, ROUND(SUM(principal_amount), 2) AS total_principal, COUNT(id) AS loan_count FROM loans WHERE loan_type = 'Personal' AND status = 'current' GROUP BY term_months ORDER BY term_months ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE loan_type = Personal and status = current.",
      "Group by term_months."
    ],
    "solution_explanation": "Examines maturity profile and volume of unsecured consumer personal debt.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-046",
    "domain": "finance",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "Customer Multi-Product Holdings: Accounts and Loans",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Holistic customer cross-sell: Find customers who hold both an active depository account AND an active loan. Return customer name, credit score, total deposit balance, and total loan principal.",
    "context_notes": "JOIN customers with accounts and loans, GROUP BY customer.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_deposits",
      "total_loans"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(SUM(DISTINCT a.balance), 2) AS total_deposits, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans FROM customers c JOIN accounts a ON c.id = a.customer_id AND a.status = 'active' JOIN loans l ON c.id = l.customer_id AND l.status = 'current' GROUP BY c.id, c.name, c.credit_score ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to both active accounts and current loans.",
      "Group by customer and sum distinct balances."
    ],
    "solution_explanation": "Identifies dual-relationship borrowers with substantial depository equity.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-047",
    "domain": "finance",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Card Swipes at International Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Cross-border payment volume: Calculate total swipe count, total volume, and average fraud score for card swipes at merchants where country != USA.",
    "context_notes": "JOIN card_swipes with merchants WHERE country != USA.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "cross_border_swipes",
      "cross_border_volume",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT COUNT(cs.id) AS cross_border_swipes, ROUND(SUM(cs.amount), 2) AS cross_border_volume, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.country != 'USA';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE country != USA.",
      "Compute count, sum, and avg fraud score."
    ],
    "solution_explanation": "Surfaces foreign point-of-sale volume for cross-border interchange monitoring.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-048",
    "domain": "finance",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Branches With Zero Late Loans in Portfolio",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Flawless credit underwriting branches: Find branches that manage active loans, but have zero loans marked status late.",
    "context_notes": "JOIN loans with branches, GROUP BY branch HAVING SUM(CASE WHEN status = late) = 0.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM CASE"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "current_loans_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, COUNT(l.id) AS current_loans_count FROM branches b JOIN loans l ON b.id = l.branch_id GROUP BY b.id, b.branch_name, b.city HAVING SUM(CASE WHEN l.status = 'late' THEN 1 ELSE 0 END) = 0 ORDER BY current_loans_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to loans.",
      "Filter in HAVING for branches with zero late loans."
    ],
    "solution_explanation": "Recognizes regional offices maintaining 100% performing loan portfolios.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-049",
    "domain": "finance",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "High Limit Cards Linked to High Balance Accounts",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Affluent cardholders: Show active cards where daily_limit >= $5,000 and the underlying account balance is >= $50,000 — return card id, card type, daily limit, and account balance.",
    "context_notes": "JOIN cards with accounts WHERE daily_limit >= 5000 AND balance >= 50000.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "card_type",
      "daily_limit",
      "balance"
    ],
    "reference_sql": "SELECT c.id, c.card_type, c.daily_limit, a.balance FROM cards c JOIN accounts a ON c.account_id = a.id WHERE c.status = 'active' AND a.status = 'active' AND c.daily_limit >= 5000.00 AND a.balance >= 50000.00 ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join cards to accounts.",
      "Filter for active cards with daily_limit >= 5000 and balance >= 50000."
    ],
    "solution_explanation": "Identifies premier debit and credit card limits backed by solid depository reserves.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-050",
    "domain": "finance",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Customer Credit Line Utilization Ranking",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit ranking: For customers with active credit lines, calculate their individual utilization percentage (used_amount / total_limit * 100). Show customer name, total limit, used amount, and utilization pct.",
    "context_notes": "JOIN credit_lines with customers WHERE status = active.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "total_limit",
      "used_amount",
      "utilization_pct"
    ],
    "reference_sql": "SELECT c.name, cl.total_limit, cl.used_amount, ROUND(cl.used_amount / cl.total_limit * 100.0, 1) AS utilization_pct FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' ORDER BY utilization_pct DESC, cl.used_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Compute (used_amount / total_limit) * 100.0.",
      "Order by utilization_pct DESC."
    ],
    "solution_explanation": "Ranks revolving credit borrowers by credit facility utilization.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-051",
    "domain": "finance",
    "level": 2,
    "order": 51,
    "difficulty": "advanced",
    "title": "Customer Total Enterprise Exposure (Deposits, Loans & Credit Lines)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Customer balance sheet summary: For customers holding both loans and credit lines, calculate total outstanding loan principal and total credit line limit. Return customer name, credit score, total loan principal, and total credit limit.",
    "context_notes": "JOIN customers with loans and credit_lines, GROUP BY customer.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_loans",
      "total_credit_limit"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans, ROUND(SUM(DISTINCT cl.total_limit), 2) AS total_credit_limit FROM customers c JOIN loans l ON c.id = l.customer_id AND l.status = 'current' JOIN credit_lines cl ON c.id = cl.customer_id AND cl.status = 'active' GROUP BY c.id, c.name, c.credit_score ORDER BY total_loans DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to current loans and active credit lines.",
      "Group by customer, summing distinct loan and credit commitments."
    ],
    "solution_explanation": "Calculates total borrowing commitments per commercial client.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-052",
    "domain": "finance",
    "level": 2,
    "order": 52,
    "difficulty": "advanced",
    "title": "Branch Net Capital Position: Deposits vs Loans",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity vs credit: For each branch, calculate total active customer deposits and total active loan principal originated. Return branch name, city, total deposits, and total loans.",
    "context_notes": "JOIN branches with accounts and loans, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "total_loans"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(DISTINCT a.balance), 2) AS total_deposits, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans FROM branches b JOIN accounts a ON b.id = a.branch_id AND a.status = 'active' JOIN loans l ON b.id = l.branch_id AND l.status = 'current' GROUP BY b.id, b.branch_name, b.city ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to active accounts and current loans.",
      "Sum distinct deposits and loans per branch."
    ],
    "solution_explanation": "Evaluates branch loan-to-deposit asset and liability funding ratios.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-053",
    "domain": "finance",
    "level": 2,
    "order": 53,
    "difficulty": "advanced",
    "title": "High Velocity Cardholders with Swipes Across Multiple Merchants",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Card fraud velocity: Find cards that have swiped at 2 or more distinct merchants with total spend > $500. Return card id, card type, distinct merchant count, and total spend.",
    "context_notes": "JOIN card_swipes with cards, GROUP BY card HAVING COUNT(DISTINCT merchant_id) >= 2 AND SUM(amount) > 500.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT",
      "SUM"
    ],
    "expected_columns": [
      "card_id",
      "card_type",
      "distinct_merchants",
      "total_spend"
    ],
    "reference_sql": "SELECT c.id AS card_id, c.card_type, COUNT(DISTINCT cs.merchant_id) AS distinct_merchants, ROUND(SUM(cs.amount), 2) AS total_spend FROM card_swipes cs JOIN cards c ON cs.card_id = c.id GROUP BY c.id, c.card_type HAVING COUNT(DISTINCT cs.merchant_id) >= 2 AND SUM(cs.amount) > 500.00 ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to cards.",
      "Group by card and filter HAVING distinct merchants >= 2 and total spend > 500."
    ],
    "solution_explanation": "Identifies active cardholders exhibiting multi-merchant transaction velocity.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-054",
    "domain": "finance",
    "level": 2,
    "order": 54,
    "difficulty": "advanced",
    "title": "Customer Aggregate Ledger Inflows and Outflows",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Customer transaction summary: For each customer, compute total dollar deposits and total dollar withdrawals through their linked accounts. Return customer name, total deposits, and total withdrawals.",
    "context_notes": "JOIN customers → accounts → transactions, GROUP BY customer, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "total_deposits",
      "total_withdrawals"
    ],
    "reference_sql": "SELECT c.name, ROUND(SUM(CASE WHEN t.transaction_type = 'deposit' THEN t.amount ELSE 0 END), 2) AS total_deposits, ROUND(SUM(CASE WHEN t.transaction_type = 'withdrawal' THEN t.amount ELSE 0 END), 2) AS total_withdrawals FROM customers c JOIN accounts a ON c.id = a.customer_id JOIN transactions t ON a.id = t.account_id GROUP BY c.id, c.name ORDER BY total_deposits DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to accounts to transactions.",
      "Compute deposit sum and withdrawal sum per customer using conditional SUM."
    ],
    "solution_explanation": "Reconciles customer-level cash movement across active depository accounts.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-055",
    "domain": "finance",
    "level": 2,
    "order": 55,
    "difficulty": "advanced",
    "title": "Mortgage and Business Loan Exposure by Branch City",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Commercial vs residential loan mix: For each branch city, calculate total Mortgage principal and total Business loan principal using conditional SUM(CASE).",
    "context_notes": "JOIN loans with branches WHERE status = current, GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "city",
      "mortgage_principal",
      "business_principal"
    ],
    "reference_sql": "SELECT b.city, ROUND(SUM(CASE WHEN l.loan_type = 'Mortgage' THEN l.principal_amount ELSE 0 END), 2) AS mortgage_principal, ROUND(SUM(CASE WHEN l.loan_type = 'Business' THEN l.principal_amount ELSE 0 END), 2) AS business_principal FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.status = 'current' GROUP BY b.city ORDER BY mortgage_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Filter for current loans.",
      "Pivot mortgage vs business principal by branch city."
    ],
    "solution_explanation": "Examines real estate vs corporate debt origination by regional market.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-056",
    "domain": "finance",
    "level": 2,
    "order": 56,
    "difficulty": "advanced",
    "title": "High Risk Merchants Generating Large Card Swipes ($500+)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant risk surveillance: List card swipes over $500 processed at merchants marked High_Risk — return swipe id, merchant name, category, amount, fraud score, and date.",
    "context_notes": "JOIN card_swipes with merchants WHERE risk_level = High_Risk AND amount >= 500.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "category",
      "amount",
      "fraud_score",
      "transaction_date"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, m.category, cs.amount, cs.fraud_score, cs.transaction_date FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.risk_level = 'High_Risk' AND cs.amount >= 500.00 ORDER BY cs.amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE risk_level = High_Risk and amount >= 500."
    ],
    "solution_explanation": "Screens high-dollar exposures on elevated risk merchant settlement terminals.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-057",
    "domain": "finance",
    "level": 2,
    "order": 57,
    "difficulty": "advanced",
    "title": "Customer Depository Balance Ratio to Annual Income",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Liquidity-to-income metric: For customers with active accounts, calculate total deposit balance and the ratio of deposits to annual income (deposits / annual_income). Return customer name, annual income, total deposits, and wealth ratio.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY customer, SUM(balance) / annual_income.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "total_deposits",
      "liquidity_ratio"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, ROUND(SUM(a.balance), 2) AS total_deposits, ROUND(SUM(a.balance) / c.annual_income, 2) AS liquidity_ratio FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.id, c.name, c.annual_income ORDER BY liquidity_ratio DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers.",
      "Filter for active accounts.",
      "Divide SUM(balance) by annual_income."
    ],
    "solution_explanation": "Measures customer liquid savings accumulation relative to reported annual earnings.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-058",
    "domain": "finance",
    "level": 2,
    "order": 58,
    "difficulty": "advanced",
    "title": "Branch Average Loan Interest Yield and Portfolio Size",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Branch portfolio pricing: For each branch, calculate total active loans, total loan principal, and weighted average interest rate (SUM(principal * rate) / SUM(principal)). Return branch name, city, total loans, total principal, and weighted avg interest.",
    "context_notes": "JOIN loans with branches WHERE status = current, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_loans",
      "total_principal",
      "weighted_avg_interest"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, COUNT(l.id) AS total_loans, ROUND(SUM(l.principal_amount), 2) AS total_principal, ROUND(SUM(l.principal_amount * l.interest_rate) / SUM(l.principal_amount), 2) AS weighted_avg_interest FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.status = 'current' GROUP BY b.id, b.branch_name, b.city ORDER BY total_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Filter for current loans.",
      "Calculate weighted average interest rate using SUM(principal * rate) / SUM(principal)."
    ],
    "solution_explanation": "Evaluates credit portfolio yield and interest margin across branch offices.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-059",
    "domain": "finance",
    "level": 2,
    "order": 59,
    "difficulty": "advanced",
    "title": "Revolving Credit Line Draw Rate Across Metropolitan Cities",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Regional credit draw: For each customer branch city, calculate total credit limit, total used amount, and average utilization percentage across active credit lines.",
    "context_notes": "JOIN credit_lines with customers WHERE status = active, GROUP BY branch_city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_city",
      "total_limit",
      "total_used",
      "draw_pct"
    ],
    "reference_sql": "SELECT c.branch_city, ROUND(SUM(cl.total_limit), 2) AS total_limit, ROUND(SUM(cl.used_amount), 2) AS total_used, ROUND(SUM(cl.used_amount) / SUM(cl.total_limit) * 100.0, 1) AS draw_pct FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' GROUP BY c.branch_city ORDER BY draw_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Filter for active credit lines.",
      "Calculate draw percentage per branch city."
    ],
    "solution_explanation": "Measures consumer credit utilization pressure across regional cities.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-060",
    "domain": "finance",
    "level": 2,
    "order": 60,
    "difficulty": "advanced",
    "title": "Contactless Swipes Fraud Score Comparison Against Standard Swipes",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "NFC risk comparison: Calculate total swipes, average amount, and average fraud score for contactless swipes (is_contactless = TRUE) vs standard swipes (is_contactless = FALSE).",
    "context_notes": "GROUP BY is_contactless on card_swipes, COUNT, AVG.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "is_contactless",
      "swipes_count",
      "avg_amount",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT is_contactless, COUNT(id) AS swipes_count, ROUND(AVG(amount), 2) AS avg_amount, ROUND(AVG(fraud_score), 1) AS avg_fraud_score FROM card_swipes GROUP BY is_contactless ORDER BY is_contactless DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group card_swipes by is_contactless.",
      "Compute COUNT, AVG(amount), AVG(fraud_score)."
    ],
    "solution_explanation": "Empirically verifies fraud risk differentials between contactless and chip/swipe transactions.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-061",
    "domain": "finance",
    "level": 2,
    "order": 61,
    "difficulty": "advanced",
    "title": "Customer Account Balance by Branch State and Risk Grade",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "State risk exposure: For branches in NY, CA, and MA, calculate total active depository balances grouped by branch state and customer risk rating.",
    "context_notes": "JOIN accounts → customers, branches, GROUP BY state, risk_rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "state",
      "risk_rating",
      "total_balance",
      "accounts_count"
    ],
    "reference_sql": "SELECT b.state, c.risk_rating, ROUND(SUM(a.balance), 2) AS total_balance, COUNT(a.id) AS accounts_count FROM accounts a JOIN customers c ON a.customer_id = c.id JOIN branches b ON a.branch_id = b.id WHERE b.state IN ('NY', 'CA', 'MA') AND a.status = 'active' GROUP BY b.state, c.risk_rating ORDER BY b.state ASC, total_balance DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers and branches.",
      "Filter for NY, CA, MA and active accounts.",
      "Group by state and risk_rating."
    ],
    "solution_explanation": "Maps regional depository holdings against institutional risk grading.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-062",
    "domain": "finance",
    "level": 2,
    "order": 62,
    "difficulty": "advanced",
    "title": "Top Spend Merchants Across Active Card Portfolios",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Top merchant settlement ranking: Find the top 10 merchants generating the highest aggregate card swipe volume. Return merchant name, category, city, country, and total card volume.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY merchant ORDER BY SUM(amount) DESC LIMIT 10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "name",
      "category",
      "city",
      "country",
      "total_volume"
    ],
    "reference_sql": "SELECT m.name, m.category, m.city, m.country, ROUND(SUM(cs.amount), 2) AS total_volume FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.id, m.name, m.category, m.city, m.country ORDER BY total_volume DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant and sum amount.",
      "Order by total_volume DESC LIMIT 10."
    ],
    "solution_explanation": "Identifies top commercial acquiring counterparties by gross settlement dollars.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-063",
    "domain": "finance",
    "level": 2,
    "order": 63,
    "difficulty": "advanced",
    "title": "Customers With Overdue Loans and Low Checking Balances",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Default risk indicator: Find customers who have a loan with status late AND whose total checking account balance is less than $10,000. Return customer name, credit score, loan principal, and checking balance.",
    "context_notes": "JOIN customers with loans and accounts WHERE l.status = late AND a.account_type = checking AND a.balance < 10000.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "principal_amount",
      "checking_balance"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, l.principal_amount, a.balance AS checking_balance FROM loans l JOIN customers c ON l.customer_id = c.id JOIN accounts a ON c.id = a.customer_id AND a.account_type = 'checking' WHERE l.status = 'late' AND a.balance < 10000.00 ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to late loans and checking accounts.",
      "Filter for checking balance < 10000."
    ],
    "solution_explanation": "Pinpoints distressed borrowers lacking sufficient liquid deposits to cure overdue debt.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-064",
    "domain": "finance",
    "level": 2,
    "order": 64,
    "difficulty": "advanced",
    "title": "Branch Vault Cash Coverage of Active Checking Balances",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Vault-to-checking ratio: For each branch, calculate total checking balance and compare with vault cash limit. Calculate the vault coverage percentage (vault_cash_limit / checking_balance * 100).",
    "context_notes": "JOIN accounts with branches WHERE account_type = checking AND status = active, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "checking_deposits",
      "vault_cash_limit",
      "coverage_pct"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS checking_deposits, b.vault_cash_limit, ROUND(b.vault_cash_limit / SUM(a.balance) * 100.0, 1) AS coverage_pct FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.account_type = 'checking' AND a.status = 'active' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY checking_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join checking accounts to branches.",
      "Group by branch.",
      "Calculate vault coverage ratio."
    ],
    "solution_explanation": "Assesses physical branch cash availability relative to instant-demand checking deposits.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-065",
    "domain": "finance",
    "level": 2,
    "order": 65,
    "difficulty": "advanced",
    "title": "Customer Aggregate Transaction Volatility by Transaction Type",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Customer transaction mix: For customers with ledger activity, compute total deposits, total wire transfers, and total withdrawals. Return customer name, deposit total, wire total, and withdrawal total.",
    "context_notes": "JOIN customers → accounts → transactions, GROUP BY customer, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "deposit_total",
      "wire_total",
      "withdrawal_total"
    ],
    "reference_sql": "SELECT c.name, ROUND(SUM(CASE WHEN t.transaction_type = 'deposit' THEN t.amount ELSE 0 END), 2) AS deposit_total, ROUND(SUM(CASE WHEN t.transaction_type = 'wire' THEN t.amount ELSE 0 END), 2) AS wire_total, ROUND(SUM(CASE WHEN t.transaction_type = 'withdrawal' THEN t.amount ELSE 0 END), 2) AS withdrawal_total FROM customers c JOIN accounts a ON c.id = a.customer_id JOIN transactions t ON a.id = t.account_id GROUP BY c.id, c.name ORDER BY wire_total DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to accounts and transactions.",
      "Pivot transaction types using conditional SUM."
    ],
    "solution_explanation": "Profiles transactional payment mix across deposit, wire, and withdrawal rails.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-066",
    "domain": "finance",
    "level": 2,
    "order": 66,
    "difficulty": "advanced",
    "title": "Active Credit Cards With High Daily Limits by Customer Income",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Affluent card issuing: Find customers holding active cards with daily_limit >= $7,500 where annual income is >= $150,000 — return customer name, annual income, card type, and daily limit.",
    "context_notes": "JOIN cards → accounts → customers WHERE daily_limit >= 7500 AND annual_income >= 150000.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "card_type",
      "daily_limit"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, cr.card_type, cr.daily_limit FROM cards cr JOIN accounts a ON cr.account_id = a.id JOIN customers c ON a.customer_id = c.id WHERE cr.status = 'active' AND cr.daily_limit >= 7500.00 AND c.annual_income >= 150000.00 ORDER BY cr.daily_limit DESC, c.annual_income DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join cards to accounts to customers.",
      "Filter for active cards with daily_limit >= 7500 and annual_income >= 150000."
    ],
    "solution_explanation": "Surfaces prime affluent cardholders authorized for premier daily spending limits.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-067",
    "domain": "finance",
    "level": 2,
    "order": 67,
    "difficulty": "advanced",
    "title": "Branch Lending Diversity: Distinct Loan Types Originated",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Origination breadth: For each branch, count how many distinct loan types have been originated and total active loan principal. Filter for branches with at least 2 distinct loan types.",
    "context_notes": "JOIN loans with branches, GROUP BY branch HAVING COUNT(DISTINCT loan_type) >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT",
      "SUM"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "distinct_loan_types",
      "total_principal"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, COUNT(DISTINCT l.loan_type) AS distinct_loan_types, ROUND(SUM(l.principal_amount), 2) AS total_principal FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.status = 'current' GROUP BY b.id, b.branch_name, b.city HAVING COUNT(DISTINCT l.loan_type) >= 2 ORDER BY total_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Group by branch with HAVING distinct loan types >= 2."
    ],
    "solution_explanation": "Evaluates branch lending product diversification across mortgages, auto, and commercial loans.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-068",
    "domain": "finance",
    "level": 2,
    "order": 68,
    "difficulty": "advanced",
    "title": "Card Swipes Processed at Night vs Day (Hour Component)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Off-peak spending patterns: For card swipes, calculate swipe count, total dollar volume, and average fraud score for Night swipes (hours 22 to 05) vs Day swipes using EXTRACT(HOUR).",
    "context_notes": "GROUP BY hour range using CASE on card_swipes.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "EXTRACT"
    ],
    "expected_columns": [
      "time_period",
      "swipes_count",
      "total_volume",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT CASE WHEN EXTRACT(HOUR FROM transaction_date) >= 22 OR EXTRACT(HOUR FROM transaction_date) < 6 THEN 'Night' ELSE 'Day' END AS time_period, COUNT(id) AS swipes_count, ROUND(SUM(amount), 2) AS total_volume, ROUND(AVG(fraud_score), 1) AS avg_fraud_score FROM card_swipes GROUP BY (CASE WHEN EXTRACT(HOUR FROM transaction_date) >= 22 OR EXTRACT(HOUR FROM transaction_date) < 6 THEN 'Night' ELSE 'Day' END) ORDER BY total_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract hour from transaction_date.",
      "Classify into Day vs Night via CASE statement."
    ],
    "solution_explanation": "Examines nocturnal card transaction fraud score escalation.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-069",
    "domain": "finance",
    "level": 2,
    "order": 69,
    "difficulty": "advanced",
    "title": "Revolving Credit Line Utilization Exceeding 75% Threshold",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Critical credit utilization: Find active credit lines where utilization percentage (used_amount / total_limit * 100) exceeds 75% — return customer name, total limit, used amount, and utilization percentage.",
    "context_notes": "JOIN credit_lines with customers WHERE used_amount / total_limit >= 0.75.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "total_limit",
      "used_amount",
      "utilization_pct"
    ],
    "reference_sql": "SELECT c.name, cl.total_limit, cl.used_amount, ROUND(cl.used_amount / cl.total_limit * 100.0, 1) AS utilization_pct FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' AND (cl.used_amount / cl.total_limit) >= 0.75 ORDER BY utilization_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers.",
      "Filter WHERE (used_amount / total_limit) >= 0.75."
    ],
    "solution_explanation": "Flags near-maxed revolving credit borrowers at heightened risk of default.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-070",
    "domain": "finance",
    "level": 2,
    "order": 70,
    "difficulty": "advanced",
    "title": "Branch Average Depository Account Size League Table",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Depository scale benchmark: For each branch, calculate average account balance across active accounts. Order highest average balance first. Filter for branches with average balance >= $50,000.",
    "context_notes": "JOIN accounts with branches WHERE accounts.status = active, GROUP BY branch HAVING AVG(balance) >= 50000.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "avg_account_balance",
      "active_accounts"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(AVG(a.balance), 2) AS avg_account_balance, COUNT(a.id) AS active_accounts FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city HAVING AVG(a.balance) >= 50000.00 ORDER BY avg_account_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter active accounts.",
      "Group by branch with HAVING AVG(balance) >= 50000."
    ],
    "solution_explanation": "Identifies premier private banking and commercial branches with high average account balances.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-071",
    "domain": "finance",
    "level": 2,
    "order": 71,
    "difficulty": "advanced",
    "title": "Customer Cross-Product Debt Exposure (Loans + Credit Lines)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Aggregate borrower debt: For customers with both current loans and active credit lines, calculate total borrowed debt (loan principal + credit used amount). Return customer name, credit score, loan principal, credit used, and total debt.",
    "context_notes": "JOIN customers with loans and credit_lines, compute l.principal_amount + cl.used_amount.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "principal_amount",
      "used_amount",
      "total_borrowed_debt"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, l.principal_amount, cl.used_amount, ROUND(l.principal_amount + cl.used_amount, 2) AS total_borrowed_debt FROM customers c JOIN loans l ON c.id = l.customer_id AND l.status = 'current' JOIN credit_lines cl ON c.id = cl.customer_id AND cl.status = 'active' ORDER BY total_borrowed_debt DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to current loans and active credit lines.",
      "Calculate principal_amount + used_amount."
    ],
    "solution_explanation": "Synthesizes multi-product debt commitments per commercial and consumer borrower.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-072",
    "domain": "finance",
    "level": 2,
    "order": 72,
    "difficulty": "advanced",
    "title": "High Value Merchant Swipes With Elevated Fraud Scores",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Targeted fraud detection: Find card swipes where amount >= $800 AND fraud_score >= 60 — return swipe id, merchant name, category, amount, and fraud score.",
    "context_notes": "JOIN card_swipes with merchants WHERE amount >= 800 AND fraud_score >= 60.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "merchant_name",
      "category",
      "amount",
      "fraud_score"
    ],
    "reference_sql": "SELECT cs.id, m.name AS merchant_name, m.category, cs.amount, cs.fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.amount >= 800.00 AND cs.fraud_score >= 60 ORDER BY cs.amount DESC, cs.fraud_score DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE amount >= 800 and fraud_score >= 60."
    ],
    "solution_explanation": "Isolates high-dollar transactions demonstrating suspicious behavioral fraud indicators.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-073",
    "domain": "finance",
    "level": 2,
    "order": 73,
    "difficulty": "advanced",
    "title": "Customers Holding Only Checking Accounts (No Loans)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Lending prospect identification: Find customers who hold an active checking account but have zero loans on file using a LEFT JOIN. Return customer name, credit score, and checking balance.",
    "context_notes": "LEFT JOIN customers → accounts and loans WHERE l.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "checking_balance"
    ],
    "reference_sql": "SELECT DISTINCT c.name, c.credit_score, a.balance AS checking_balance FROM customers c JOIN accounts a ON c.id = a.customer_id AND a.account_type = 'checking' AND a.status = 'active' LEFT JOIN loans l ON c.id = l.customer_id WHERE l.id IS NULL ORDER BY a.balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to checking accounts.",
      "Left join to loans filtering for l.id IS NULL."
    ],
    "solution_explanation": "Surfaces liquid depository clients with zero debt for credit cross-sell campaigns.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-074",
    "domain": "finance",
    "level": 2,
    "order": 74,
    "difficulty": "advanced",
    "title": "Total Merchant Acquiring Volume by Business Category",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant settlement sector share: Calculate total swipe count, gross dollar volume, and average fraud score grouped by merchant category. Order by gross volume descending.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY category, COUNT, SUM, AVG.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "swipes_count",
      "gross_volume",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT m.category, COUNT(cs.id) AS swipes_count, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.category ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant category.",
      "Compute count, sum, and avg fraud score."
    ],
    "solution_explanation": "Evaluates payment acquiring market share across commercial business sectors.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "fin-L2-075",
    "domain": "finance",
    "level": 2,
    "order": 75,
    "difficulty": "advanced",
    "title": "Branch Liquidity Stress Ratio: Vault Cash to Total Deposits",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity coverage: For branches managing active accounts, compute total active deposit balance, vault cash limit, and the vault-to-deposit ratio (vault / deposits * 100). Return branch name, city, deposits, vault limit, and ratio.",
    "context_notes": "JOIN accounts with branches WHERE accounts.status = active, GROUP BY branch, compute vault / SUM(balance) * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "vault_cash_limit",
      "vault_to_deposit_pct"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_deposits, b.vault_cash_limit, ROUND(b.vault_cash_limit / SUM(a.balance) * 100.0, 1) AS vault_to_deposit_pct FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches for active accounts.",
      "Group by branch.",
      "Calculate vault-to-deposit ratio."
    ],
    "solution_explanation": "Assesses branch physical vault currency backing relative to customer depository obligations.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-076",
    "domain": "finance",
    "level": 2,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Branch Master Scorecard: Deposits, Loans & Vault Capacity",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Executive Board Briefing: Construct a master branch operational performance scorecard. For each regional branch, compute total active customer deposits, total active loan principal originated, and vault cash limit. Return branch name, city, state, total deposits, total loans, and vault limit.",
    "context_notes": "Multi-table join across branches, accounts, and loans.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "state",
      "total_deposits",
      "total_loans",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, b.state, ROUND(COALESCE(SUM(DISTINCT a.balance), 0.00), 2) AS total_deposits, ROUND(COALESCE(SUM(DISTINCT l.principal_amount), 0.00), 2) AS total_loans, b.vault_cash_limit FROM branches b LEFT JOIN accounts a ON b.id = a.branch_id AND a.status = 'active' LEFT JOIN loans l ON b.id = l.branch_id AND l.status = 'current' GROUP BY b.id, b.branch_name, b.city, b.state, b.vault_cash_limit ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to active accounts and current loans with LEFT JOIN.",
      "Group by branch.",
      "Compute total deposits, total loans, and vault limit."
    ],
    "solution_explanation": "Master branch performance overview balancing asset creation against deposit liability gathering.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L2-077",
    "domain": "finance",
    "level": 2,
    "order": 77,
    "difficulty": "boss",
    "title": "Customer Complete Credit & Liquidity Balance Sheet",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Customer 360 overview: For top customers, calculate total active deposit balance, total current loan principal, and total credit line limit. Return customer name, credit score, total deposits, total loans, and total credit limit.",
    "context_notes": "Multi-table join linking customers, accounts, loans, and credit_lines.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_deposits",
      "total_loans",
      "total_credit_limit"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(COALESCE(SUM(DISTINCT a.balance), 0.00), 2) AS total_deposits, ROUND(COALESCE(SUM(DISTINCT l.principal_amount), 0.00), 2) AS total_loans, ROUND(COALESCE(SUM(DISTINCT cl.total_limit), 0.00), 2) AS total_credit_limit FROM customers c LEFT JOIN accounts a ON c.id = a.customer_id AND a.status = 'active' LEFT JOIN loans l ON c.id = l.customer_id AND l.status = 'current' LEFT JOIN credit_lines cl ON c.id = cl.customer_id AND cl.status = 'active' GROUP BY c.id, c.name, c.credit_score ORDER BY total_deposits DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to accounts, loans, and credit lines with LEFT JOIN.",
      "Group by customer.",
      "Order by total_deposits DESC LIMIT 25."
    ],
    "solution_explanation": "Provides holistic customer relationship balance sheet across deposits and credit products.",
    "xp": 35,
    "estimated_minutes": 11
  },
  {
    "id": "fin-L2-078",
    "domain": "finance",
    "level": 2,
    "order": 78,
    "difficulty": "boss",
    "title": "Merchant Payment Acquiring and Fraud Risk Matrix",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant risk scorecard: For each merchant, calculate total swipes, total dollar volume, average fraud score, and count of high-risk swipes (fraud_score >= 60). Order by total volume descending.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY merchant, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "SUM CASE"
    ],
    "expected_columns": [
      "name",
      "category",
      "city",
      "risk_level",
      "total_swipes",
      "gross_volume",
      "avg_fraud_score",
      "high_risk_swipes"
    ],
    "reference_sql": "SELECT m.name, m.category, m.city, m.risk_level, COUNT(cs.id) AS total_swipes, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score, SUM(CASE WHEN cs.fraud_score >= 60 THEN 1 ELSE 0 END) AS high_risk_swipes FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.id, m.name, m.category, m.city, m.risk_level ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant.",
      "Compute swipes count, gross volume, avg fraud score, and high-risk count."
    ],
    "solution_explanation": "Executive merchant acquiring scorecard balancing payment processing revenue against counterparty risk.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L2-079",
    "domain": "finance",
    "level": 2,
    "order": 79,
    "difficulty": "boss",
    "title": "Regional Lending Risk: Delinquent Loans and Borrowers by State",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "State credit delinquency index: For each branch state, calculate total current loan principal, total late loan principal, and late loan percentage (late / total * 100). Return state, current principal, late principal, and delinquency percentage.",
    "context_notes": "JOIN loans with branches, GROUP BY state, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "state",
      "current_principal",
      "late_principal",
      "delinquency_pct"
    ],
    "reference_sql": "SELECT b.state, ROUND(SUM(CASE WHEN l.status = 'current' THEN l.principal_amount ELSE 0 END), 2) AS current_principal, ROUND(SUM(CASE WHEN l.status = 'late' THEN l.principal_amount ELSE 0 END), 2) AS late_principal, ROUND(SUM(CASE WHEN l.status = 'late' THEN l.principal_amount ELSE 0 END) / NULLIF(SUM(l.principal_amount), 0) * 100.0, 1) AS delinquency_pct FROM loans l JOIN branches b ON l.branch_id = b.id GROUP BY b.state ORDER BY late_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Group by state.",
      "Calculate performing vs delinquent principal and delinquency percentage."
    ],
    "solution_explanation": "Measures credit default risk concentration across state banking jurisdictions.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L2-080",
    "domain": "finance",
    "level": 2,
    "order": 80,
    "difficulty": "boss",
    "title": "Customer Deposit Concentration Across Metropolitan Cities",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Metropolitan deposit share: For each customer branch city, calculate total deposit balance, total customers, and average deposit balance per customer across active accounts. Order highest deposit balance first.",
    "context_notes": "JOIN accounts with customers WHERE status = active, GROUP BY branch_city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "COUNT",
      "AVG"
    ],
    "expected_columns": [
      "branch_city",
      "total_deposits",
      "customers_count",
      "avg_customer_deposits"
    ],
    "reference_sql": "SELECT c.branch_city, ROUND(SUM(a.balance), 2) AS total_deposits, COUNT(DISTINCT c.id) AS customers_count, ROUND(SUM(a.balance) / COUNT(DISTINCT c.id), 2) AS avg_customer_deposits FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active' GROUP BY c.branch_city ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to customers.",
      "Filter for active accounts.",
      "Group by branch_city and compute totals."
    ],
    "solution_explanation": "Profiles metropolitan funding centers driving core bank deposit gathering.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L2-081",
    "domain": "finance",
    "level": 2,
    "order": 81,
    "difficulty": "boss",
    "title": "Card Portfolio Settlement and Fraud Score Breakdown by Card Type",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Card portfolio risk yield: For each card type, calculate total active cards, total card swipes, gross dollar volume, and average fraud score. Order highest volume first.",
    "context_notes": "JOIN card_swipes → cards WHERE cards.status = active, GROUP BY card_type.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "card_type",
      "active_cards",
      "total_swipes",
      "gross_volume",
      "avg_fraud_score"
    ],
    "reference_sql": "SELECT c.card_type, COUNT(DISTINCT c.id) AS active_cards, COUNT(cs.id) AS total_swipes, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.fraud_score), 1) AS avg_fraud_score FROM card_swipes cs JOIN cards c ON cs.card_id = c.id WHERE c.status = 'active' GROUP BY c.card_type ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to active cards.",
      "Group by card_type.",
      "Compute distinct card count, swipes count, volume, and avg fraud score."
    ],
    "solution_explanation": "Evaluates card issuing profitability and transactional risk per card product.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L2-082",
    "domain": "finance",
    "level": 2,
    "order": 82,
    "difficulty": "boss",
    "title": "High Income Borrowers With Late Commercial Loans",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Commercial borrower default review: Find customers with annual income >= $200,000 who have a loan with status late — return customer name, annual income, credit score, loan type, and principal amount.",
    "context_notes": "JOIN loans with customers WHERE status = late AND annual_income >= 200000.00.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "annual_income",
      "credit_score",
      "loan_type",
      "principal_amount"
    ],
    "reference_sql": "SELECT c.name, c.annual_income, c.credit_score, l.loan_type, l.principal_amount FROM loans l JOIN customers c ON l.customer_id = c.id WHERE l.status = 'late' AND c.annual_income >= 200000.00 ORDER BY l.principal_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Filter WHERE l.status = late and annual_income >= 200000."
    ],
    "solution_explanation": "Surfaces substantial commercial loan defaults among high-income borrowers.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-083",
    "domain": "finance",
    "level": 2,
    "order": 83,
    "difficulty": "boss",
    "title": "Branch Vault Cash vs Total Customer Credit Exposure",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity to credit ratio: For each branch, calculate vault cash limit and total current loan principal originated, then compute the vault-to-loan ratio (vault / loans * 100). Return branch name, city, vault cash, total loans, and coverage ratio.",
    "context_notes": "JOIN loans with branches WHERE status = current, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "vault_cash_limit",
      "total_loans",
      "vault_coverage_pct"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, b.vault_cash_limit, ROUND(SUM(l.principal_amount), 2) AS total_loans, ROUND(b.vault_cash_limit / SUM(l.principal_amount) * 100.0, 1) AS vault_coverage_pct FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.status = 'current' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY total_loans DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches for current loans.",
      "Group by branch.",
      "Calculate vault-to-loan ratio."
    ],
    "solution_explanation": "Evaluates regional liquidity coverage relative to originated credit commitments.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L2-084",
    "domain": "finance",
    "level": 2,
    "order": 84,
    "difficulty": "boss",
    "title": "Customer Transaction Volumes Across Ledger and Point-of-Sale",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Unified customer activity: For top account holders, calculate total ledger transaction volume through their accounts AND total card swipe volume on their cards. Return customer name, ledger volume, and card swipe volume.",
    "context_notes": "Join customers to accounts, transactions, cards, and card_swipes.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "ledger_volume",
      "card_volume"
    ],
    "reference_sql": "SELECT c.name, ROUND(COALESCE(SUM(DISTINCT t.amount), 0.00), 2) AS ledger_volume, ROUND(COALESCE(SUM(DISTINCT cs.amount), 0.00), 2) AS card_volume FROM customers c LEFT JOIN accounts a ON c.id = a.customer_id LEFT JOIN transactions t ON a.id = t.account_id LEFT JOIN cards cr ON a.id = cr.account_id LEFT JOIN card_swipes cs ON cr.id = cs.card_id GROUP BY c.id, c.name ORDER BY ledger_volume DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers through accounts and cards to transactions and card swipes.",
      "Compute distinct volume sums per customer."
    ],
    "solution_explanation": "Holistic transactional activity monitoring across core banking rails and card networks.",
    "xp": 35,
    "estimated_minutes": 11
  },
  {
    "id": "fin-L2-085",
    "domain": "finance",
    "level": 2,
    "order": 85,
    "difficulty": "boss",
    "title": "Loan Portfolio Quality by Customer Credit Score Tiers",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Underwriting credit score risk matrix: Group customers into credit score tiers (750+, 700-749, 650-699, <650). For each tier, calculate total current loan principal, total late principal, and late loan count.",
    "context_notes": "JOIN loans with customers, GROUP BY credit score tier using CASE.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "COUNT CASE"
    ],
    "expected_columns": [
      "credit_tier",
      "current_principal",
      "late_principal",
      "late_loans_count"
    ],
    "reference_sql": "SELECT CASE WHEN c.credit_score >= 750 THEN '750+' WHEN c.credit_score BETWEEN 700 AND 749 THEN '700-749' WHEN c.credit_score BETWEEN 650 AND 699 THEN '650-699' ELSE '<650' END AS credit_tier, ROUND(SUM(CASE WHEN l.status = 'current' THEN l.principal_amount ELSE 0 END), 2) AS current_principal, ROUND(SUM(CASE WHEN l.status = 'late' THEN l.principal_amount ELSE 0 END), 2) AS late_principal, SUM(CASE WHEN l.status = 'late' THEN 1 ELSE 0 END) AS late_loans_count FROM loans l JOIN customers c ON l.customer_id = c.id GROUP BY (CASE WHEN c.credit_score >= 750 THEN '750+' WHEN c.credit_score BETWEEN 700 AND 749 THEN '700-749' WHEN c.credit_score BETWEEN 650 AND 699 THEN '650-699' ELSE '<650' END) ORDER BY current_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to customers.",
      "Classify credit scores into brackets via CASE.",
      "Compute performing vs late debt totals."
    ],
    "solution_explanation": "Evaluates credit score default predictive power across retail loan assets.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L2-086",
    "domain": "finance",
    "level": 2,
    "order": 86,
    "difficulty": "boss",
    "title": "Branch Vault Limits vs Total Commercial Loan Portfolio",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch asset vs vault comparison: Calculate total commercial business loan principal originated and compare with vault cash limit for each branch. Return branch name, city, business loans total, and vault limit.",
    "context_notes": "JOIN loans with branches WHERE loan_type = Business, GROUP BY branch.",
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
      "business_loans_total",
      "vault_cash_limit"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(l.principal_amount), 2) AS business_loans_total, b.vault_cash_limit FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.loan_type = 'Business' GROUP BY b.id, b.branch_name, b.city, b.vault_cash_limit ORDER BY business_loans_total DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches filtering for Business loan_type.",
      "Group by branch."
    ],
    "solution_explanation": "Compares commercial corporate loan commitments to physical cash staging.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-087",
    "domain": "finance",
    "level": 2,
    "order": 87,
    "difficulty": "boss",
    "title": "Contactless Card Fraud Rate vs Standard Terminal Swipes by City",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Metropolitan point-of-sale risk: For each merchant city, calculate total swipes, contactless swipes count, and average fraud score for contactless swipes.",
    "context_notes": "JOIN card_swipes with merchants WHERE is_contactless = TRUE, GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "AVG"
    ],
    "expected_columns": [
      "city",
      "contactless_swipes",
      "avg_contactless_fraud_score"
    ],
    "reference_sql": "SELECT m.city, COUNT(cs.id) AS contactless_swipes, ROUND(AVG(cs.fraud_score), 1) AS avg_contactless_fraud_score FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE cs.is_contactless = TRUE GROUP BY m.city ORDER BY contactless_swipes DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants for contactless swipes.",
      "Group by merchant city."
    ],
    "solution_explanation": "Tracks metropolitan NFC point-of-sale transaction velocity and fraud patterns.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-088",
    "domain": "finance",
    "level": 2,
    "order": 88,
    "difficulty": "boss",
    "title": "Customer Credit Facility Aggregation: Committed vs Outstanding Lines",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Revolving credit book: Calculate total committed credit lines and total drawn funds for each customer with active credit facilities. Return customer name, credit score, total credit limit, and total used funds.",
    "context_notes": "JOIN credit_lines with customers WHERE status = active, GROUP BY customer.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "credit_score",
      "total_committed_limit",
      "total_used_funds"
    ],
    "reference_sql": "SELECT c.name, c.credit_score, ROUND(SUM(cl.total_limit), 2) AS total_committed_limit, ROUND(SUM(cl.used_amount), 2) AS total_used_funds FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' GROUP BY c.id, c.name, c.credit_score ORDER BY total_committed_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers for active lines.",
      "Group by customer and sum limits and used amounts."
    ],
    "solution_explanation": "Monitors total revolving line commitments across corporate and retail borrowers.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-089",
    "domain": "finance",
    "level": 2,
    "order": 89,
    "difficulty": "boss",
    "title": "Branch Deposit Gathering Efficiency: Depository Balance per Branch Manager",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Managerial deposit performance: Calculate total active deposit balance and account count for each branch manager. Return manager name, branch name, total deposits, and accounts count.",
    "context_notes": "JOIN accounts with branches WHERE status = active, GROUP BY manager.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "manager_name",
      "branch_name",
      "total_deposits",
      "accounts_count"
    ],
    "reference_sql": "SELECT b.manager_name, b.branch_name, ROUND(SUM(a.balance), 2) AS total_deposits, COUNT(a.id) AS accounts_count FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'active' GROUP BY b.id, b.manager_name, b.branch_name ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches for active accounts.",
      "Group by branch manager."
    ],
    "solution_explanation": "Evaluates branch management leadership in depository asset gathering.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "fin-L2-090",
    "domain": "finance",
    "level": 2,
    "order": 90,
    "difficulty": "boss",
    "title": "Customer Multi-Card Spending and Fraud Exposure",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Customer payment card activity: For customers holding payment cards, calculate total cards held, total card swipes, and total card spending. Return customer name, cards count, swipes count, and total spend.",
    "context_notes": "JOIN customers → accounts → cards → card_swipes, GROUP BY customer.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT DISTINCT",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "cards_count",
      "swipes_count",
      "total_card_spend"
    ],
    "reference_sql": "SELECT c.name, COUNT(DISTINCT cr.id) AS cards_count, COUNT(cs.id) AS swipes_count, ROUND(SUM(cs.amount), 2) AS total_card_spend FROM customers c JOIN accounts a ON c.id = a.customer_id JOIN cards cr ON a.id = cr.account_id JOIN card_swipes cs ON cr.id = cs.card_id GROUP BY c.id, c.name ORDER BY total_card_spend DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to accounts, cards, and card_swipes.",
      "Compute card count, swipe count, and total card spend per customer."
    ],
    "solution_explanation": "Surfaces top retail consumer cardholders by transaction spend volume.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L2-091",
    "domain": "finance",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "High Balance Accounts Under Compliance Freeze by Branch",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "AML compliance hold exposure: For branches managing frozen accounts, calculate total frozen balance and frozen account count. Return branch name, city, frozen balance, and frozen accounts count.",
    "context_notes": "JOIN accounts with branches WHERE accounts.status = frozen, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_frozen_balance",
      "frozen_accounts_count"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(a.balance), 2) AS total_frozen_balance, COUNT(a.id) AS frozen_accounts_count FROM accounts a JOIN branches b ON a.branch_id = b.id WHERE a.status = 'frozen' GROUP BY b.id, b.branch_name, b.city ORDER BY total_frozen_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join accounts to branches.",
      "Filter WHERE a.status = frozen.",
      "Group by branch."
    ],
    "solution_explanation": "Quantifies compliance-restrained depository funds across regional branch offices.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-092",
    "domain": "finance",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Commercial Business Loans Weighted Interest Margin by Branch",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Commercial debt pricing yield: For loans of loan_type Business, calculate total principal and weighted average interest rate per branch. Return branch name, city, business principal, and weighted interest rate.",
    "context_notes": "JOIN loans with branches WHERE loan_type = Business AND status = current, GROUP BY branch.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "business_principal",
      "weighted_interest_rate"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(l.principal_amount), 2) AS business_principal, ROUND(SUM(l.principal_amount * l.interest_rate) / SUM(l.principal_amount), 2) AS weighted_interest_rate FROM loans l JOIN branches b ON l.branch_id = b.id WHERE l.loan_type = 'Business' AND l.status = 'current' GROUP BY b.id, b.branch_name, b.city ORDER BY business_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches for current Business loans.",
      "Calculate weighted average interest rate."
    ],
    "solution_explanation": "Benchmarks commercial lending margins across regional corporate banking centers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-093",
    "domain": "finance",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Merchant Category Risk vs Cardholder Spend Volumes",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Merchant vertical scorecard: For each merchant category, calculate total merchants, total card swipes, total gross volume, and average swipe amount. Order by gross volume descending.",
    "context_notes": "JOIN card_swipes with merchants, GROUP BY category, COUNT, SUM, AVG.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT DISTINCT",
      "COUNT",
      "SUM",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "merchants_count",
      "swipes_count",
      "gross_volume",
      "avg_ticket"
    ],
    "reference_sql": "SELECT m.category, COUNT(DISTINCT m.id) AS merchants_count, COUNT(cs.id) AS swipes_count, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.amount), 2) AS avg_ticket FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id GROUP BY m.category ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Group by merchant category.",
      "Compute merchant count, swipe count, volume, and ticket size."
    ],
    "solution_explanation": "Comprehensive acquiring portfolio review detailing business sector payment activity.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-094",
    "domain": "finance",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "Customer Depository Balances vs Credit Card Limits",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Deposit coverage of credit limits: For customers holding both active checking accounts and active credit cards, calculate total checking balance and total card daily limits. Return customer name, checking balance, daily limits total, and balance-to-limit ratio.",
    "context_notes": "JOIN customers with accounts and cards, compute balance / SUM(daily_limit).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "name",
      "checking_balance",
      "total_daily_limits",
      "balance_coverage_ratio"
    ],
    "reference_sql": "SELECT c.name, a.balance AS checking_balance, ROUND(SUM(cr.daily_limit), 2) AS total_daily_limits, ROUND(a.balance / SUM(cr.daily_limit), 2) AS balance_coverage_ratio FROM customers c JOIN accounts a ON c.id = a.customer_id AND a.account_type = 'checking' AND a.status = 'active' JOIN cards cr ON a.id = cr.account_id AND cr.status = 'active' GROUP BY c.id, c.name, a.balance ORDER BY checking_balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to checking accounts and active cards.",
      "Calculate checking_balance / SUM(daily_limit)."
    ],
    "solution_explanation": "Measures liquid cash coverage over authorized 24-hour card spending limits.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-095",
    "domain": "finance",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Branch Total Lending Exposure Breakdown by Loan Status",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Asset quality per branch: For each branch, compute current loan principal, late loan principal, and paid off loan principal using conditional SUM(CASE). Return branch name, current principal, late principal, and paid off principal.",
    "context_notes": "JOIN loans with branches, GROUP BY branch, conditional SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "branch_name",
      "current_principal",
      "late_principal",
      "paid_off_principal"
    ],
    "reference_sql": "SELECT b.branch_name, ROUND(SUM(CASE WHEN l.status = 'current' THEN l.principal_amount ELSE 0 END), 2) AS current_principal, ROUND(SUM(CASE WHEN l.status = 'late' THEN l.principal_amount ELSE 0 END), 2) AS late_principal, ROUND(SUM(CASE WHEN l.status = 'paid_off' THEN l.principal_amount ELSE 0 END), 2) AS paid_off_principal FROM loans l JOIN branches b ON l.branch_id = b.id GROUP BY b.id, b.branch_name ORDER BY current_principal DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join loans to branches.",
      "Pivot loan status principals using conditional SUM."
    ],
    "solution_explanation": "Assesses credit risk distribution and performing vs non-performing assets by branch.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "fin-L2-096",
    "domain": "finance",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Customer Inflows and Card Swipes Velocity Synthesis",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "Customer cash velocity profile: For account holders, calculate total cash deposited into their accounts AND total card swipe spending on their cards. Return customer name, total deposits, and total card spend.",
    "context_notes": "Join customers through accounts to transactions (deposits) and cards to card_swipes.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "total_deposits",
      "total_card_spend"
    ],
    "reference_sql": "SELECT c.name, ROUND(COALESCE(SUM(DISTINCT CASE WHEN t.transaction_type = 'deposit' THEN t.amount ELSE 0 END), 0.00), 2) AS total_deposits, ROUND(COALESCE(SUM(DISTINCT cs.amount), 0.00), 2) AS total_card_spend FROM customers c LEFT JOIN accounts a ON c.id = a.customer_id LEFT JOIN transactions t ON a.id = t.account_id LEFT JOIN cards cr ON a.id = cr.account_id LEFT JOIN card_swipes cs ON cr.id = cs.card_id GROUP BY c.id, c.name ORDER BY total_deposits DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join customers to accounts and cards.",
      "Compute deposit volume and card swipe volume."
    ],
    "solution_explanation": "Synthesizes customer liquidity inflows with point-of-sale consumer expenditures.",
    "xp": 35,
    "estimated_minutes": 11
  },
  {
    "id": "fin-L2-097",
    "domain": "finance",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "High Risk Merchant Acquiring Volume and Average Ticket Size",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance"
    },
    "request": "High risk merchant audit: For merchants categorized with risk_level High_Risk, calculate total swipes, gross dollar volume, and average transaction amount. Return merchant name, category, city, country, swipes count, and gross volume.",
    "context_notes": "JOIN card_swipes with merchants WHERE risk_level = High_Risk, GROUP BY merchant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "name",
      "category",
      "city",
      "country",
      "swipes_count",
      "gross_volume",
      "avg_ticket"
    ],
    "reference_sql": "SELECT m.name, m.category, m.city, m.country, COUNT(cs.id) AS swipes_count, ROUND(SUM(cs.amount), 2) AS gross_volume, ROUND(AVG(cs.amount), 2) AS avg_ticket FROM card_swipes cs JOIN merchants m ON cs.merchant_id = m.id WHERE m.risk_level = 'High_Risk' GROUP BY m.id, m.name, m.category, m.city, m.country ORDER BY gross_volume DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join card_swipes to merchants.",
      "Filter WHERE risk_level = High_Risk.",
      "Group by merchant and calculate volume metrics."
    ],
    "solution_explanation": "Audits transaction concentration across elevated-risk merchant acquiring accounts.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-098",
    "domain": "finance",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Branch Total Revolving Credit Commitments and Drawn Amounts",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending"
    },
    "request": "Regional credit line exposure: For customers linked to each branch city, calculate total revolving credit line limit, total drawn used amount, and average utilization percentage across active credit lines.",
    "context_notes": "JOIN credit_lines with customers, GROUP BY branch_city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_city",
      "total_limit",
      "total_used",
      "avg_utilization_pct"
    ],
    "reference_sql": "SELECT c.branch_city, ROUND(SUM(cl.total_limit), 2) AS total_limit, ROUND(SUM(cl.used_amount), 2) AS total_used, ROUND(SUM(cl.used_amount) / SUM(cl.total_limit) * 100.0, 1) AS avg_utilization_pct FROM credit_lines cl JOIN customers c ON cl.customer_id = c.id WHERE cl.status = 'active' GROUP BY c.branch_city ORDER BY total_limit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join credit_lines to customers for active lines.",
      "Group by branch city.",
      "Calculate total limit, total used, and utilization percentage."
    ],
    "solution_explanation": "Evaluates revolving credit commitments and draw percentages by metropolitan market.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-099",
    "domain": "finance",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Branch Asset-to-Liability Ratio: Active Deposits vs Current Loans",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations"
    },
    "request": "Branch liquidity coverage ratio: For each branch, calculate total active deposit balance, total current loan principal, and the loan-to-deposit ratio (loans / deposits * 100). Return branch name, city, deposits, loans, and loan-to-deposit ratio.",
    "context_notes": "JOIN branches with accounts and loans, compute loans / deposits * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "branch_name",
      "city",
      "total_deposits",
      "total_loans",
      "loan_to_deposit_ratio"
    ],
    "reference_sql": "SELECT b.branch_name, b.city, ROUND(SUM(DISTINCT a.balance), 2) AS total_deposits, ROUND(SUM(DISTINCT l.principal_amount), 2) AS total_loans, ROUND(SUM(DISTINCT l.principal_amount) / SUM(DISTINCT a.balance) * 100.0, 1) AS loan_to_deposit_ratio FROM branches b JOIN accounts a ON b.id = a.branch_id AND a.status = 'active' JOIN loans l ON b.id = l.branch_id AND l.status = 'current' GROUP BY b.id, b.branch_name, b.city ORDER BY total_deposits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join branches to active accounts and current loans.",
      "Calculate loan-to-deposit percentage."
    ],
    "solution_explanation": "Key regulatory banking metric assessing branch asset-liability funding balance.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L2-100",
    "domain": "finance",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "The Grand Level 2 Bank Executive Portfolio Masterpiece",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor"
    },
    "request": "Grand Level 2 Finale: Complete Bank Enterprise Balance Sheet & Risk Scorecard — Construct a comprehensive operational model combining all core bank assets and liabilities. Calculate: (1) Total active regional branches, (2) Total registered bank customers, (3) Total active customer depository balance, (4) Total current loan principal outstanding, (5) Total active revolving credit line limits authorized, and (6) Total gross card swipe transaction volume processed. Return all six enterprise metrics in a single row.",
    "context_notes": "Enterprise multi-table consolidated banking health card.",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "COUNT",
      "SUM"
    ],
    "expected_columns": [
      "total_active_branches",
      "total_customers",
      "total_active_deposits",
      "total_current_loans",
      "total_active_credit_limits",
      "total_card_swipes_volume"
    ],
    "reference_sql": "SELECT (SELECT COUNT(id) FROM branches) AS total_active_branches, (SELECT COUNT(id) FROM customers) AS total_customers, (SELECT ROUND(SUM(balance), 2) FROM accounts WHERE status = 'active') AS total_active_deposits, (SELECT ROUND(SUM(principal_amount), 2) FROM loans WHERE status = 'current') AS total_current_loans, (SELECT ROUND(SUM(total_limit), 2) FROM credit_lines WHERE status = 'active') AS total_active_credit_limits, (SELECT ROUND(SUM(amount), 2) FROM card_swipes) AS total_card_swipes_volume;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Combine 6 scalar subqueries covering branches, customers, deposits, loans, credit lines, and card swipes.",
      "Return single-row enterprise bank state-of-the-union balance sheet."
    ],
    "solution_explanation": "Grand Level 2 Capstone: The complete commercial and retail banking enterprise ledger uniting physical branch network, core depository wealth, outstanding credit assets, revolving commitments, and point-of-sale card settlement volumes.",
    "xp": 35,
    "estimated_minutes": 15
  }
];
