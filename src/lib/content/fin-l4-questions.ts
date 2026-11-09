import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L4-001",
    "domain": "finance",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q1)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #1 - Victor Vance (Head of Risk & Compliance)]: Rank records in branches by vault_cash_limit. Return id, branch_name AS entity_title, vault_cash_limit AS metric_score, and ROW_NUMBER() OVER (ORDER BY vault_cash_limit DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 11;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, branch_name AS entity_title, vault_cash_limit AS metric_score, ROW_NUMBER() OVER (ORDER BY vault_cash_limit DESC) AS rank_num FROM branches WHERE id >= 1 ORDER BY rank_num ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-002",
    "domain": "finance",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in customers (Q2)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #2 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of customers. Return id, branch_city AS partition_key, credit_score AS metric_val, and DENSE_RANK() OVER (PARTITION BY branch_city ORDER BY credit_score DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 12;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, branch_city AS partition_key, credit_score AS metric_val, DENSE_RANK() OVER (PARTITION BY branch_city ORDER BY credit_score DESC) AS dense_rnk FROM customers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-003",
    "domain": "finance",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q3)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #3 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on account_types. Return id, min_balance AS current_val, and LAG(min_balance, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 13;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "min_balance",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, min_balance AS current_val, LAG(min_balance, 1) OVER (ORDER BY id ASC) AS prev_metric FROM account_types WHERE id >= 1 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-004",
    "domain": "finance",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q4)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #4 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on accounts. Return id, balance AS current_val, and LEAD(balance, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 14;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "balance",
      "next_metric"
    ],
    "reference_sql": "SELECT id, balance AS current_val, LEAD(balance, 1) OVER (ORDER BY id ASC) AS next_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-005",
    "domain": "finance",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on transactions (Q5)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #5 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in transactions. Return id, amount AS baseline_val, and SUM(amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 15;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, amount AS baseline_val, SUM(amount) OVER (ORDER BY id ASC) AS running_total FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-006",
    "domain": "finance",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q6)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #6 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for merchants. Create a CTE named staged_metrics selecting id, name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 16;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, name AS staged_name, id AS score FROM merchants WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-007",
    "domain": "finance",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q7)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #7 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in cards by daily_limit. Return id, card_type AS entity_title, daily_limit AS metric_score, and ROW_NUMBER() OVER (ORDER BY daily_limit DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 17;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, card_type AS entity_title, daily_limit AS metric_score, ROW_NUMBER() OVER (ORDER BY daily_limit DESC) AS rank_num FROM cards WHERE id >= 1 ORDER BY rank_num ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-008",
    "domain": "finance",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in card_swipes (Q8)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #8 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of card_swipes. Return id, card_id AS partition_key, amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 18;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, card_id AS partition_key, amount AS metric_val, DENSE_RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS dense_rnk FROM card_swipes WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-009",
    "domain": "finance",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q9)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #9 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on loans. Return id, principal_amount AS current_val, and LAG(principal_amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 19;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "principal_amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, principal_amount AS current_val, LAG(principal_amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM loans WHERE id >= 1 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-010",
    "domain": "finance",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q10)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #10 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on loan_payments. Return id, payment_amount AS current_val, and LEAD(payment_amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "payment_amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, payment_amount AS current_val, LEAD(payment_amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM loan_payments WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-011",
    "domain": "finance",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on credit_lines (Q11)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #11 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in credit_lines. Return id, total_limit AS baseline_val, and SUM(total_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 21;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, total_limit AS baseline_val, SUM(total_limit) OVER (ORDER BY id ASC) AS running_total FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-012",
    "domain": "finance",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q12)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #12 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for branches. Create a CTE named staged_metrics selecting id, branch_name AS staged_name, and vault_cash_limit AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 22;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, branch_name AS staged_name, vault_cash_limit AS score FROM branches WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-013",
    "domain": "finance",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q13)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #13 - Victor Vance (Head of Risk & Compliance)]: Rank records in customers by credit_score. Return id, name AS entity_title, credit_score AS metric_score, and ROW_NUMBER() OVER (ORDER BY credit_score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 23;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, credit_score AS metric_score, ROW_NUMBER() OVER (ORDER BY credit_score DESC) AS rank_num FROM customers WHERE id >= 1 ORDER BY rank_num ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-014",
    "domain": "finance",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in account_types (Q14)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #14 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of account_types. Return id, type_name AS partition_key, min_balance AS metric_val, and DENSE_RANK() OVER (PARTITION BY type_name ORDER BY min_balance DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 24;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, type_name AS partition_key, min_balance AS metric_val, DENSE_RANK() OVER (PARTITION BY type_name ORDER BY min_balance DESC) AS dense_rnk FROM account_types WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-015",
    "domain": "finance",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q15)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #15 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on accounts. Return id, balance AS current_val, and LAG(balance, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 25;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "balance",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, balance AS current_val, LAG(balance, 1) OVER (ORDER BY id ASC) AS prev_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L4-016",
    "domain": "finance",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q16)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #16 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on transactions. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 26;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-017",
    "domain": "finance",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Cumulative Running Total on merchants (Q17)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #17 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in merchants. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 27;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM merchants WHERE id >= 1 ORDER BY id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-018",
    "domain": "finance",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q18)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #18 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for cards. Create a CTE named staged_metrics selecting id, card_type AS staged_name, and daily_limit AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 28;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, card_type AS staged_name, daily_limit AS score FROM cards WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-019",
    "domain": "finance",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q19)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #19 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in card_swipes by amount. Return id, card_id::text AS entity_title, amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 29;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, card_id::text AS entity_title, amount AS metric_score, ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num FROM card_swipes WHERE id >= 1 ORDER BY rank_num ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-020",
    "domain": "finance",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Dense Partition Ranking in loans (Q20)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #20 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of loans. Return id, customer_id AS partition_key, principal_amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY principal_amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 30;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, customer_id AS partition_key, principal_amount AS metric_val, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY principal_amount DESC) AS dense_rnk FROM loans WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-021",
    "domain": "finance",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q21)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #21 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on loan_payments. Return id, payment_amount AS current_val, and LAG(payment_amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 31;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "payment_amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, payment_amount AS current_val, LAG(payment_amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM loan_payments WHERE id >= 1 ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-022",
    "domain": "finance",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q22)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #22 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on credit_lines. Return id, total_limit AS current_val, and LEAD(total_limit, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 32;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_limit",
      "next_metric"
    ],
    "reference_sql": "SELECT id, total_limit AS current_val, LEAD(total_limit, 1) OVER (ORDER BY id ASC) AS next_metric FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-023",
    "domain": "finance",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Cumulative Running Total on branches (Q23)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #23 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in branches. Return id, vault_cash_limit AS baseline_val, and SUM(vault_cash_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 33;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, vault_cash_limit AS baseline_val, SUM(vault_cash_limit) OVER (ORDER BY id ASC) AS running_total FROM branches WHERE id >= 1 ORDER BY id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-024",
    "domain": "finance",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q24)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #24 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, name AS staged_name, and credit_score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 34;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, name AS staged_name, credit_score AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-025",
    "domain": "finance",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q25)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #25 - Victor Vance (Head of Risk & Compliance)]: Rank records in account_types by min_balance. Return id, type_name AS entity_title, min_balance AS metric_score, and ROW_NUMBER() OVER (ORDER BY min_balance DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 35;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, type_name AS entity_title, min_balance AS metric_score, ROW_NUMBER() OVER (ORDER BY min_balance DESC) AS rank_num FROM account_types WHERE id >= 1 ORDER BY rank_num ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-026",
    "domain": "finance",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Dense Partition Ranking in accounts (Q26)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #26 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of accounts. Return id, customer_id AS partition_key, balance AS metric_val, and DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY balance DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 36;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, customer_id AS partition_key, balance AS metric_val, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY balance DESC) AS dense_rnk FROM accounts WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-027",
    "domain": "finance",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q27)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #27 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on transactions. Return id, amount AS current_val, and LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 37;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-028",
    "domain": "finance",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q28)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #28 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on merchants. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 38;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM merchants WHERE id >= 1 ORDER BY id ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-029",
    "domain": "finance",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Cumulative Running Total on cards (Q29)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #29 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in cards. Return id, daily_limit AS baseline_val, and SUM(daily_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 39;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, daily_limit AS baseline_val, SUM(daily_limit) OVER (ORDER BY id ASC) AS running_total FROM cards WHERE id >= 1 ORDER BY id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-030",
    "domain": "finance",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q30)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #30 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for card_swipes. Create a CTE named staged_metrics selecting id, card_id::text AS staged_name, and amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 40;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, card_id::text AS staged_name, amount AS score FROM card_swipes WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-031",
    "domain": "finance",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q31)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #31 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in loans by principal_amount. Return id, loan_type AS entity_title, principal_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY principal_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 41;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, loan_type AS entity_title, principal_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY principal_amount DESC) AS rank_num FROM loans WHERE id >= 1 ORDER BY rank_num ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-032",
    "domain": "finance",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Dense Partition Ranking in loan_payments (Q32)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #32 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of loan_payments. Return id, loan_id AS partition_key, payment_amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 42;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, loan_id AS partition_key, payment_amount AS metric_val, DENSE_RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS dense_rnk FROM loan_payments WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-033",
    "domain": "finance",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q33)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #33 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on credit_lines. Return id, total_limit AS current_val, and LAG(total_limit, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 43;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_limit",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_limit AS current_val, LAG(total_limit, 1) OVER (ORDER BY id ASC) AS prev_metric FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-034",
    "domain": "finance",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q34)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #34 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on branches. Return id, vault_cash_limit AS current_val, and LEAD(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 44;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "vault_cash_limit",
      "next_metric"
    ],
    "reference_sql": "SELECT id, vault_cash_limit AS current_val, LEAD(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS next_metric FROM branches WHERE id >= 1 ORDER BY id ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-035",
    "domain": "finance",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Cumulative Running Total on customers (Q35)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #35 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in customers. Return id, credit_score AS baseline_val, and SUM(credit_score) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 45;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, credit_score AS baseline_val, SUM(credit_score) OVER (ORDER BY id ASC) AS running_total FROM customers WHERE id >= 1 ORDER BY id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-036",
    "domain": "finance",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q36)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #36 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for account_types. Create a CTE named staged_metrics selecting id, type_name AS staged_name, and min_balance AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 46;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, type_name AS staged_name, min_balance AS score FROM account_types WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-037",
    "domain": "finance",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q37)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #37 - Victor Vance (Head of Risk & Compliance)]: Rank records in accounts by balance. Return id, account_type AS entity_title, balance AS metric_score, and ROW_NUMBER() OVER (ORDER BY balance DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 47;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, account_type AS entity_title, balance AS metric_score, ROW_NUMBER() OVER (ORDER BY balance DESC) AS rank_num FROM accounts WHERE id >= 1 ORDER BY rank_num ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-038",
    "domain": "finance",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Dense Partition Ranking in transactions (Q38)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #38 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of transactions. Return id, account_id AS partition_key, amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 48;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, amount AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk FROM transactions WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-039",
    "domain": "finance",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q39)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #39 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on merchants. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 49;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM merchants WHERE id >= 1 ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-040",
    "domain": "finance",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q40)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #40 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on cards. Return id, daily_limit AS current_val, and LEAD(daily_limit, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 50;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "daily_limit",
      "next_metric"
    ],
    "reference_sql": "SELECT id, daily_limit AS current_val, LEAD(daily_limit, 1) OVER (ORDER BY id ASC) AS next_metric FROM cards WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-041",
    "domain": "finance",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Cumulative Running Total on card_swipes (Q41)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #41 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in card_swipes. Return id, amount AS baseline_val, and SUM(amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 51;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, amount AS baseline_val, SUM(amount) OVER (ORDER BY id ASC) AS running_total FROM card_swipes WHERE id >= 1 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-042",
    "domain": "finance",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q42)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #42 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for loans. Create a CTE named staged_metrics selecting id, loan_type AS staged_name, and principal_amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 52;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, loan_type AS staged_name, principal_amount AS score FROM loans WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-043",
    "domain": "finance",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q43)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #43 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in loan_payments by payment_amount. Return id, status AS entity_title, payment_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY payment_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 53;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, status AS entity_title, payment_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY payment_amount DESC) AS rank_num FROM loan_payments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-044",
    "domain": "finance",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Dense Partition Ranking in credit_lines (Q44)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #44 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of credit_lines. Return id, customer_id AS partition_key, total_limit AS metric_val, and DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY total_limit DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 54;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, customer_id AS partition_key, total_limit AS metric_val, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY total_limit DESC) AS dense_rnk FROM credit_lines WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-045",
    "domain": "finance",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q45)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #45 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on branches. Return id, vault_cash_limit AS current_val, and LAG(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 55;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "vault_cash_limit",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, vault_cash_limit AS current_val, LAG(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS prev_metric FROM branches WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-046",
    "domain": "finance",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q46)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #46 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on customers. Return id, credit_score AS current_val, and LEAD(credit_score, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 56;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "credit_score",
      "next_metric"
    ],
    "reference_sql": "SELECT id, credit_score AS current_val, LEAD(credit_score, 1) OVER (ORDER BY id ASC) AS next_metric FROM customers WHERE id >= 1 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-047",
    "domain": "finance",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Cumulative Running Total on account_types (Q47)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #47 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in account_types. Return id, min_balance AS baseline_val, and SUM(min_balance) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 57;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, min_balance AS baseline_val, SUM(min_balance) OVER (ORDER BY id ASC) AS running_total FROM account_types WHERE id >= 1 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-048",
    "domain": "finance",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q48)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #48 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for accounts. Create a CTE named staged_metrics selecting id, account_type AS staged_name, and balance AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 58;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, account_type AS staged_name, balance AS score FROM accounts WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-049",
    "domain": "finance",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q49)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #49 - Victor Vance (Head of Risk & Compliance)]: Rank records in transactions by amount. Return id, description AS entity_title, amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 59;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, description AS entity_title, amount AS metric_score, ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num FROM transactions WHERE id >= 1 ORDER BY rank_num ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-050",
    "domain": "finance",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Dense Partition Ranking in merchants (Q50)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #50 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of merchants. Return id, category AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY category ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 60;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, category AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY category ORDER BY id DESC) AS dense_rnk FROM merchants WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-051",
    "domain": "finance",
    "level": 4,
    "order": 51,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q51)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #51 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on cards. Return id, daily_limit AS current_val, and LAG(daily_limit, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 61;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "daily_limit",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, daily_limit AS current_val, LAG(daily_limit, 1) OVER (ORDER BY id ASC) AS prev_metric FROM cards WHERE id >= 1 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-052",
    "domain": "finance",
    "level": 4,
    "order": 52,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q52)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #52 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on card_swipes. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 62;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM card_swipes WHERE id >= 1 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-053",
    "domain": "finance",
    "level": 4,
    "order": 53,
    "difficulty": "core",
    "title": "Cumulative Running Total on loans (Q53)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #53 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in loans. Return id, principal_amount AS baseline_val, and SUM(principal_amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 63;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, principal_amount AS baseline_val, SUM(principal_amount) OVER (ORDER BY id ASC) AS running_total FROM loans WHERE id >= 1 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-054",
    "domain": "finance",
    "level": 4,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q54)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #54 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for loan_payments. Create a CTE named staged_metrics selecting id, status AS staged_name, and payment_amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 64;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, payment_amount AS score FROM loan_payments WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-055",
    "domain": "finance",
    "level": 4,
    "order": 55,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q55)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #55 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in credit_lines by total_limit. Return id, status AS entity_title, total_limit AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_limit DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 65;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, status AS entity_title, total_limit AS metric_score, ROW_NUMBER() OVER (ORDER BY total_limit DESC) AS rank_num FROM credit_lines WHERE id >= 1 ORDER BY rank_num ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L4-056",
    "domain": "finance",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in branches (Q56)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #56 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of branches. Return id, city AS partition_key, vault_cash_limit AS metric_val, and DENSE_RANK() OVER (PARTITION BY city ORDER BY vault_cash_limit DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 66;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, city AS partition_key, vault_cash_limit AS metric_val, DENSE_RANK() OVER (PARTITION BY city ORDER BY vault_cash_limit DESC) AS dense_rnk FROM branches WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-057",
    "domain": "finance",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q57)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #57 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on customers. Return id, credit_score AS current_val, and LAG(credit_score, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 67;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "credit_score",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, credit_score AS current_val, LAG(credit_score, 1) OVER (ORDER BY id ASC) AS prev_metric FROM customers WHERE id >= 1 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-058",
    "domain": "finance",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q58)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #58 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on account_types. Return id, min_balance AS current_val, and LEAD(min_balance, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 68;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "min_balance",
      "next_metric"
    ],
    "reference_sql": "SELECT id, min_balance AS current_val, LEAD(min_balance, 1) OVER (ORDER BY id ASC) AS next_metric FROM account_types WHERE id >= 1 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-059",
    "domain": "finance",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on accounts (Q59)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #59 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in accounts. Return id, balance AS baseline_val, and SUM(balance) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 69;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, balance AS baseline_val, SUM(balance) OVER (ORDER BY id ASC) AS running_total FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-060",
    "domain": "finance",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q60)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #60 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for transactions. Create a CTE named staged_metrics selecting id, description AS staged_name, and amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 70;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, description AS staged_name, amount AS score FROM transactions WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-061",
    "domain": "finance",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q61)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #61 - Victor Vance (Head of Risk & Compliance)]: Rank records in merchants by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 71;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM merchants WHERE id >= 1 ORDER BY rank_num ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-062",
    "domain": "finance",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in cards (Q62)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #62 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of cards. Return id, account_id AS partition_key, daily_limit AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY daily_limit DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 72;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, daily_limit AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY daily_limit DESC) AS dense_rnk FROM cards WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-063",
    "domain": "finance",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q63)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #63 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on card_swipes. Return id, amount AS current_val, and LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 73;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM card_swipes WHERE id >= 1 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-064",
    "domain": "finance",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q64)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #64 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on loans. Return id, principal_amount AS current_val, and LEAD(principal_amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 74;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "principal_amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, principal_amount AS current_val, LEAD(principal_amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM loans WHERE id >= 1 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-065",
    "domain": "finance",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on loan_payments (Q65)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #65 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in loan_payments. Return id, payment_amount AS baseline_val, and SUM(payment_amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 75;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, payment_amount AS baseline_val, SUM(payment_amount) OVER (ORDER BY id ASC) AS running_total FROM loan_payments WHERE id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-066",
    "domain": "finance",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q66)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #66 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for credit_lines. Create a CTE named staged_metrics selecting id, status AS staged_name, and total_limit AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 76;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, total_limit AS score FROM credit_lines WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-067",
    "domain": "finance",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q67)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #67 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in branches by vault_cash_limit. Return id, branch_name AS entity_title, vault_cash_limit AS metric_score, and ROW_NUMBER() OVER (ORDER BY vault_cash_limit DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 77;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, branch_name AS entity_title, vault_cash_limit AS metric_score, ROW_NUMBER() OVER (ORDER BY vault_cash_limit DESC) AS rank_num FROM branches WHERE id >= 1 ORDER BY rank_num ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-068",
    "domain": "finance",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in customers (Q68)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #68 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of customers. Return id, branch_city AS partition_key, credit_score AS metric_val, and DENSE_RANK() OVER (PARTITION BY branch_city ORDER BY credit_score DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 78;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, branch_city AS partition_key, credit_score AS metric_val, DENSE_RANK() OVER (PARTITION BY branch_city ORDER BY credit_score DESC) AS dense_rnk FROM customers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-069",
    "domain": "finance",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q69)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #69 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on account_types. Return id, min_balance AS current_val, and LAG(min_balance, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 79;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "min_balance",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, min_balance AS current_val, LAG(min_balance, 1) OVER (ORDER BY id ASC) AS prev_metric FROM account_types WHERE id >= 1 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-070",
    "domain": "finance",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q70)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #70 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on accounts. Return id, balance AS current_val, and LEAD(balance, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 80;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "balance",
      "next_metric"
    ],
    "reference_sql": "SELECT id, balance AS current_val, LEAD(balance, 1) OVER (ORDER BY id ASC) AS next_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-071",
    "domain": "finance",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on transactions (Q71)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #71 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in transactions. Return id, amount AS baseline_val, and SUM(amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 81;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, amount AS baseline_val, SUM(amount) OVER (ORDER BY id ASC) AS running_total FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-072",
    "domain": "finance",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q72)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #72 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for merchants. Create a CTE named staged_metrics selecting id, name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 82;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, name AS staged_name, id AS score FROM merchants WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-073",
    "domain": "finance",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q73)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #73 - Victor Vance (Head of Risk & Compliance)]: Rank records in cards by daily_limit. Return id, card_type AS entity_title, daily_limit AS metric_score, and ROW_NUMBER() OVER (ORDER BY daily_limit DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 83;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, card_type AS entity_title, daily_limit AS metric_score, ROW_NUMBER() OVER (ORDER BY daily_limit DESC) AS rank_num FROM cards WHERE id >= 1 ORDER BY rank_num ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-074",
    "domain": "finance",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in card_swipes (Q74)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #74 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of card_swipes. Return id, card_id AS partition_key, amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 84;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, card_id AS partition_key, amount AS metric_val, DENSE_RANK() OVER (PARTITION BY card_id ORDER BY amount DESC) AS dense_rnk FROM card_swipes WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-075",
    "domain": "finance",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q75)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #75 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on loans. Return id, principal_amount AS current_val, and LAG(principal_amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 85;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "principal_amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, principal_amount AS current_val, LAG(principal_amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM loans WHERE id >= 1 ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-076",
    "domain": "finance",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q76)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #76 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on loan_payments. Return id, payment_amount AS current_val, and LEAD(payment_amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 86;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "payment_amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, payment_amount AS current_val, LEAD(payment_amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM loan_payments WHERE id >= 1 ORDER BY id ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-077",
    "domain": "finance",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on credit_lines (Q77)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #77 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in credit_lines. Return id, total_limit AS baseline_val, and SUM(total_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 87;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, total_limit AS baseline_val, SUM(total_limit) OVER (ORDER BY id ASC) AS running_total FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-078",
    "domain": "finance",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q78)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #78 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for branches. Create a CTE named staged_metrics selecting id, branch_name AS staged_name, and vault_cash_limit AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 88;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, branch_name AS staged_name, vault_cash_limit AS score FROM branches WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-079",
    "domain": "finance",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q79)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #79 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in customers by credit_score. Return id, name AS entity_title, credit_score AS metric_score, and ROW_NUMBER() OVER (ORDER BY credit_score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 89;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, credit_score AS metric_score, ROW_NUMBER() OVER (ORDER BY credit_score DESC) AS rank_num FROM customers WHERE id >= 1 ORDER BY rank_num ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-080",
    "domain": "finance",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in account_types (Q80)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #80 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of account_types. Return id, type_name AS partition_key, min_balance AS metric_val, and DENSE_RANK() OVER (PARTITION BY type_name ORDER BY min_balance DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 90;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, type_name AS partition_key, min_balance AS metric_val, DENSE_RANK() OVER (PARTITION BY type_name ORDER BY min_balance DESC) AS dense_rnk FROM account_types WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-081",
    "domain": "finance",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q81)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #81 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on accounts. Return id, balance AS current_val, and LAG(balance, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 91;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "balance",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, balance AS current_val, LAG(balance, 1) OVER (ORDER BY id ASC) AS prev_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-082",
    "domain": "finance",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q82)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #82 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on transactions. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 92;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-083",
    "domain": "finance",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on merchants (Q83)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #83 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in merchants. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 93;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM merchants WHERE id >= 1 ORDER BY id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-084",
    "domain": "finance",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q84)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #84 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for cards. Create a CTE named staged_metrics selecting id, card_type AS staged_name, and daily_limit AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 94;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, card_type AS staged_name, daily_limit AS score FROM cards WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-085",
    "domain": "finance",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q85)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #85 - Victor Vance (Head of Risk & Compliance)]: Rank records in card_swipes by amount. Return id, card_id::text AS entity_title, amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 95;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, card_id::text AS entity_title, amount AS metric_score, ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank_num FROM card_swipes WHERE id >= 1 ORDER BY rank_num ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L4-086",
    "domain": "finance",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in loans (Q86)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #86 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of loans. Return id, customer_id AS partition_key, principal_amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY principal_amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 96;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, customer_id AS partition_key, principal_amount AS metric_val, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY principal_amount DESC) AS dense_rnk FROM loans WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-087",
    "domain": "finance",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q87)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #87 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on loan_payments. Return id, payment_amount AS current_val, and LAG(payment_amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 97;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "payment_amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, payment_amount AS current_val, LAG(payment_amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM loan_payments WHERE id >= 1 ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-088",
    "domain": "finance",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q88)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #88 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on credit_lines. Return id, total_limit AS current_val, and LEAD(total_limit, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 98;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_limit",
      "next_metric"
    ],
    "reference_sql": "SELECT id, total_limit AS current_val, LEAD(total_limit, 1) OVER (ORDER BY id ASC) AS next_metric FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-089",
    "domain": "finance",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Running Total on branches (Q89)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #89 - Victor Vance (Head of Risk & Compliance)]: Calculate cumulative progression in branches. Return id, vault_cash_limit AS baseline_val, and SUM(vault_cash_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 99;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, vault_cash_limit AS baseline_val, SUM(vault_cash_limit) OVER (ORDER BY id ASC) AS running_total FROM branches WHERE id >= 1 ORDER BY id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-090",
    "domain": "finance",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q90)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #90 - Elena Rostova (VP of Retail Lending)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, name AS staged_name, and credit_score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 100;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, name AS staged_name, credit_score AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-091",
    "domain": "finance",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q91)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #91 - Arthur Pendleton (Chief Wealth Advisor)]: Rank records in account_types by min_balance. Return id, type_name AS entity_title, min_balance AS metric_score, and ROW_NUMBER() OVER (ORDER BY min_balance DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 101;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, type_name AS entity_title, min_balance AS metric_score, ROW_NUMBER() OVER (ORDER BY min_balance DESC) AS rank_num FROM account_types WHERE id >= 1 ORDER BY rank_num ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-092",
    "domain": "finance",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in accounts (Q92)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #92 - Rachel Adams (Director of Branch Operations)]: Compute dense ranking within each segment of accounts. Return id, customer_id AS partition_key, balance AS metric_val, and DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY balance DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 102;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, customer_id AS partition_key, balance AS metric_val, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY balance DESC) AS dense_rnk FROM accounts WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-093",
    "domain": "finance",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q93)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #93 - Victor Vance (Head of Risk & Compliance)]: Perform period-over-period delta analysis on transactions. Return id, amount AS current_val, and LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 103;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM transactions WHERE id >= 1 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-094",
    "domain": "finance",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q94)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #94 - Elena Rostova (VP of Retail Lending)]: Perform forward-looking trend analysis on merchants. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 104;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM merchants WHERE id >= 1 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-095",
    "domain": "finance",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Cumulative Running Total on cards (Q95)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #95 - Arthur Pendleton (Chief Wealth Advisor)]: Calculate cumulative progression in cards. Return id, daily_limit AS baseline_val, and SUM(daily_limit) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 105;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, daily_limit AS baseline_val, SUM(daily_limit) OVER (ORDER BY id ASC) AS running_total FROM cards WHERE id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-096",
    "domain": "finance",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q96)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #96 - Rachel Adams (Director of Branch Operations)]: Stage transformation logic for card_swipes. Create a CTE named staged_metrics selecting id, card_id::text AS staged_name, and amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 106;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, card_id::text AS staged_name, amount AS score FROM card_swipes WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-097",
    "domain": "finance",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q97)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #97 - Victor Vance (Head of Risk & Compliance)]: Rank records in loans by principal_amount. Return id, loan_type AS entity_title, principal_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY principal_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 107;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, loan_type AS entity_title, principal_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY principal_amount DESC) AS rank_num FROM loans WHERE id >= 1 ORDER BY rank_num ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-098",
    "domain": "finance",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in loan_payments (Q98)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #98 - Elena Rostova (VP of Retail Lending)]: Compute dense ranking within each segment of loan_payments. Return id, loan_id AS partition_key, payment_amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 108;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, loan_id AS partition_key, payment_amount AS metric_val, DENSE_RANK() OVER (PARTITION BY loan_id ORDER BY payment_amount DESC) AS dense_rnk FROM loan_payments WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-099",
    "domain": "finance",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q99)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #99 - Arthur Pendleton (Chief Wealth Advisor)]: Perform period-over-period delta analysis on credit_lines. Return id, total_limit AS current_val, and LAG(total_limit, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 109;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_limit",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_limit AS current_val, LAG(total_limit, 1) OVER (ORDER BY id ASC) AS prev_metric FROM credit_lines WHERE id >= 1 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "fin-L4-100",
    "domain": "finance",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q100)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #100 - Rachel Adams (Director of Branch Operations)]: Perform forward-looking trend analysis on branches. Return id, vault_cash_limit AS current_val, and LEAD(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 110;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "vault_cash_limit",
      "next_metric"
    ],
    "reference_sql": "SELECT id, vault_cash_limit AS current_val, LEAD(vault_cash_limit, 1) OVER (ORDER BY id ASC) AS next_metric FROM branches WHERE id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  }
];
