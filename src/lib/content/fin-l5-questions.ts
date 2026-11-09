import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L5-001",
    "domain": "finance",
    "level": 5,
    "order": 1,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q1)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #1 - Victor Vance (Head of Risk & Compliance)]: Segment records in branches into 4 quartiles. Using a CTE named cohort_analysis, project id, branch_name AS cohort_label, vault_cash_limit AS metric_score, and NTILE(4) OVER (ORDER BY vault_cash_limit DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 21;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, branch_name AS cohort_label, vault_cash_limit AS metric_score, NTILE(4) OVER (ORDER BY vault_cash_limit DESC) AS quartile_tier FROM branches WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-002",
    "domain": "finance",
    "level": 5,
    "order": 2,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q2)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #2 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on customers. Run an EXPLAIN (FORMAT JSON) on a query selecting id and credit_score from customers where id >= 2;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "credit_score"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, credit_score FROM customers WHERE id >= 2;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-003",
    "domain": "finance",
    "level": 5,
    "order": 3,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q3)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #3 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on account_types. Create an Index named idx_account_types_perf_3 ON account_types(id DESC); then select id, type_name AS indexed_label, min_balance AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_account_types_perf_3 ON account_types(id DESC); SELECT id, type_name AS indexed_label, min_balance AS metric_val FROM account_types WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-004",
    "domain": "finance",
    "level": 5,
    "order": 4,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q4)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #4 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_accounts_summary_4 projecting id, account_type AS view_label, and COALESCE(balance, 0) AS safe_metric from accounts WHERE id <= 34; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_accounts_summary_4 AS SELECT id, account_type AS view_label, COALESCE(balance, 0) AS safe_metric FROM accounts WHERE id <= 34; SELECT id, view_label, safe_metric FROM v_accounts_summary_4 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-005",
    "domain": "finance",
    "level": 5,
    "order": 5,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q5)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #5 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_transactions_clean_5 ingesting id, UPPER(TRIM(description::text)) AS clean_name, and amount AS staged_val from transactions WHERE description IS NOT NULL AND id <= 35. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_transactions_clean_5 AS SELECT id, UPPER(TRIM(description::text)) AS clean_name, amount AS staged_val FROM transactions WHERE description IS NOT NULL AND id <= 35; SELECT id, clean_name, staged_val FROM temp_transactions_clean_5 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-006",
    "domain": "finance",
    "level": 5,
    "order": 6,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q6)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #6 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in merchants. Write Stored Procedure sp_routine_merchants_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_merchants_6(1); then select id, name AS confirmed_item from merchants where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_merchants_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_merchants_6(1); SELECT id, name AS confirmed_item FROM merchants WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-007",
    "domain": "finance",
    "level": 5,
    "order": 7,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q7)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #7 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in cards into 4 quartiles. Using a CTE named cohort_analysis, project id, card_type AS cohort_label, daily_limit AS metric_score, and NTILE(4) OVER (ORDER BY daily_limit DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 27;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, card_type AS cohort_label, daily_limit AS metric_score, NTILE(4) OVER (ORDER BY daily_limit DESC) AS quartile_tier FROM cards WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-008",
    "domain": "finance",
    "level": 5,
    "order": 8,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q8)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #8 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on card_swipes. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from card_swipes where id >= 8;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM card_swipes WHERE id >= 8;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-009",
    "domain": "finance",
    "level": 5,
    "order": 9,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q9)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #9 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on loans. Create an Index named idx_loans_perf_9 ON loans(id DESC); then select id, loan_type AS indexed_label, principal_amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_loans_perf_9 ON loans(id DESC); SELECT id, loan_type AS indexed_label, principal_amount AS metric_val FROM loans WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-010",
    "domain": "finance",
    "level": 5,
    "order": 10,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q10)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #10 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_loan_payments_summary_10 projecting id, status AS view_label, and COALESCE(payment_amount, 0) AS safe_metric from loan_payments WHERE id <= 40; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_loan_payments_summary_10 AS SELECT id, status AS view_label, COALESCE(payment_amount, 0) AS safe_metric FROM loan_payments WHERE id <= 40; SELECT id, view_label, safe_metric FROM v_loan_payments_summary_10 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-011",
    "domain": "finance",
    "level": 5,
    "order": 11,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q11)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #11 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_credit_lines_clean_11 ingesting id, UPPER(TRIM(status::text)) AS clean_name, and total_limit AS staged_val from credit_lines WHERE status IS NOT NULL AND id <= 41. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_credit_lines_clean_11 AS SELECT id, UPPER(TRIM(status::text)) AS clean_name, total_limit AS staged_val FROM credit_lines WHERE status IS NOT NULL AND id <= 41; SELECT id, clean_name, staged_val FROM temp_credit_lines_clean_11 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-012",
    "domain": "finance",
    "level": 5,
    "order": 12,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q12)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #12 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in branches. Write Stored Procedure sp_routine_branches_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_branches_12(1); then select id, branch_name AS confirmed_item from branches where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_branches_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_branches_12(1); SELECT id, branch_name AS confirmed_item FROM branches WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-013",
    "domain": "finance",
    "level": 5,
    "order": 13,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q13)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #13 - Victor Vance (Head of Risk & Compliance)]: Segment records in customers into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, credit_score AS metric_score, and NTILE(4) OVER (ORDER BY credit_score DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 33;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, credit_score AS metric_score, NTILE(4) OVER (ORDER BY credit_score DESC) AS quartile_tier FROM customers WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-014",
    "domain": "finance",
    "level": 5,
    "order": 14,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q14)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #14 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on account_types. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_balance from account_types where id >= 14;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_balance"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_balance FROM account_types WHERE id >= 14;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-015",
    "domain": "finance",
    "level": 5,
    "order": 15,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q15)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #15 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on accounts. Create an Index named idx_accounts_perf_15 ON accounts(id DESC); then select id, account_type AS indexed_label, balance AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf_15 ON accounts(id DESC); SELECT id, account_type AS indexed_label, balance AS metric_val FROM accounts WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "fin-L5-016",
    "domain": "finance",
    "level": 5,
    "order": 16,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q16)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #16 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_transactions_summary_16 projecting id, description AS view_label, and COALESCE(amount, 0) AS safe_metric from transactions WHERE id <= 46; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_transactions_summary_16 AS SELECT id, description AS view_label, COALESCE(amount, 0) AS safe_metric FROM transactions WHERE id <= 46; SELECT id, view_label, safe_metric FROM v_transactions_summary_16 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-017",
    "domain": "finance",
    "level": 5,
    "order": 17,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q17)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #17 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_merchants_clean_17 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and id AS staged_val from merchants WHERE name IS NOT NULL AND id <= 47. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_merchants_clean_17 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, id AS staged_val FROM merchants WHERE name IS NOT NULL AND id <= 47; SELECT id, clean_name, staged_val FROM temp_merchants_clean_17 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-018",
    "domain": "finance",
    "level": 5,
    "order": 18,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q18)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #18 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in cards. Write Stored Procedure sp_routine_cards_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_cards_18(1); then select id, card_type AS confirmed_item from cards where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_cards_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_cards_18(1); SELECT id, card_type AS confirmed_item FROM cards WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-019",
    "domain": "finance",
    "level": 5,
    "order": 19,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q19)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #19 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in card_swipes into 4 quartiles. Using a CTE named cohort_analysis, project id, card_id::text AS cohort_label, amount AS metric_score, and NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 39;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, card_id::text AS cohort_label, amount AS metric_score, NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier FROM card_swipes WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-020",
    "domain": "finance",
    "level": 5,
    "order": 20,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q20)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #20 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on loans. Run an EXPLAIN (FORMAT JSON) on a query selecting id and principal_amount from loans where id >= 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "principal_amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, principal_amount FROM loans WHERE id >= 20;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-021",
    "domain": "finance",
    "level": 5,
    "order": 21,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q21)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #21 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on loan_payments. Create an Index named idx_loan_payments_perf_21 ON loan_payments(id DESC); then select id, status AS indexed_label, payment_amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_loan_payments_perf_21 ON loan_payments(id DESC); SELECT id, status AS indexed_label, payment_amount AS metric_val FROM loan_payments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-022",
    "domain": "finance",
    "level": 5,
    "order": 22,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q22)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #22 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_credit_lines_summary_22 projecting id, status AS view_label, and COALESCE(total_limit, 0) AS safe_metric from credit_lines WHERE id <= 52; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_credit_lines_summary_22 AS SELECT id, status AS view_label, COALESCE(total_limit, 0) AS safe_metric FROM credit_lines WHERE id <= 52; SELECT id, view_label, safe_metric FROM v_credit_lines_summary_22 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-023",
    "domain": "finance",
    "level": 5,
    "order": 23,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q23)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #23 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_branches_clean_23 ingesting id, UPPER(TRIM(branch_name::text)) AS clean_name, and vault_cash_limit AS staged_val from branches WHERE branch_name IS NOT NULL AND id <= 53. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_branches_clean_23 AS SELECT id, UPPER(TRIM(branch_name::text)) AS clean_name, vault_cash_limit AS staged_val FROM branches WHERE branch_name IS NOT NULL AND id <= 53; SELECT id, clean_name, staged_val FROM temp_branches_clean_23 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-024",
    "domain": "finance",
    "level": 5,
    "order": 24,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q24)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #24 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_24(1); then select id, name AS confirmed_item from customers where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_24(1); SELECT id, name AS confirmed_item FROM customers WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-025",
    "domain": "finance",
    "level": 5,
    "order": 25,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q25)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #25 - Victor Vance (Head of Risk & Compliance)]: Segment records in account_types into 4 quartiles. Using a CTE named cohort_analysis, project id, type_name AS cohort_label, min_balance AS metric_score, and NTILE(4) OVER (ORDER BY min_balance DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 45;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, type_name AS cohort_label, min_balance AS metric_score, NTILE(4) OVER (ORDER BY min_balance DESC) AS quartile_tier FROM account_types WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-026",
    "domain": "finance",
    "level": 5,
    "order": 26,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q26)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #26 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on accounts. Run an EXPLAIN (FORMAT JSON) on a query selecting id and balance from accounts where id >= 26;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "balance"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, balance FROM accounts WHERE id >= 26;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-027",
    "domain": "finance",
    "level": 5,
    "order": 27,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q27)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #27 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on transactions. Create an Index named idx_transactions_perf_27 ON transactions(id DESC); then select id, description AS indexed_label, amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_perf_27 ON transactions(id DESC); SELECT id, description AS indexed_label, amount AS metric_val FROM transactions WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-028",
    "domain": "finance",
    "level": 5,
    "order": 28,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q28)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #28 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_merchants_summary_28 projecting id, name AS view_label, and COALESCE(id, 0) AS safe_metric from merchants WHERE id <= 58; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_merchants_summary_28 AS SELECT id, name AS view_label, COALESCE(id, 0) AS safe_metric FROM merchants WHERE id <= 58; SELECT id, view_label, safe_metric FROM v_merchants_summary_28 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-029",
    "domain": "finance",
    "level": 5,
    "order": 29,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q29)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #29 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_cards_clean_29 ingesting id, UPPER(TRIM(card_type::text)) AS clean_name, and daily_limit AS staged_val from cards WHERE card_type IS NOT NULL AND id <= 59. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_cards_clean_29 AS SELECT id, UPPER(TRIM(card_type::text)) AS clean_name, daily_limit AS staged_val FROM cards WHERE card_type IS NOT NULL AND id <= 59; SELECT id, clean_name, staged_val FROM temp_cards_clean_29 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-030",
    "domain": "finance",
    "level": 5,
    "order": 30,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q30)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #30 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in card_swipes. Write Stored Procedure sp_routine_card_swipes_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_card_swipes_30(1); then select id, card_id::text AS confirmed_item from card_swipes where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_card_swipes_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_card_swipes_30(1); SELECT id, card_id::text AS confirmed_item FROM card_swipes WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-031",
    "domain": "finance",
    "level": 5,
    "order": 31,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q31)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #31 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in loans into 4 quartiles. Using a CTE named cohort_analysis, project id, loan_type AS cohort_label, principal_amount AS metric_score, and NTILE(4) OVER (ORDER BY principal_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 51;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, loan_type AS cohort_label, principal_amount AS metric_score, NTILE(4) OVER (ORDER BY principal_amount DESC) AS quartile_tier FROM loans WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-032",
    "domain": "finance",
    "level": 5,
    "order": 32,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q32)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #32 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on loan_payments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and payment_amount from loan_payments where id >= 32;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "payment_amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, payment_amount FROM loan_payments WHERE id >= 32;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-033",
    "domain": "finance",
    "level": 5,
    "order": 33,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q33)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #33 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on credit_lines. Create an Index named idx_credit_lines_perf_33 ON credit_lines(id DESC); then select id, status AS indexed_label, total_limit AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_credit_lines_perf_33 ON credit_lines(id DESC); SELECT id, status AS indexed_label, total_limit AS metric_val FROM credit_lines WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-034",
    "domain": "finance",
    "level": 5,
    "order": 34,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q34)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #34 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_branches_summary_34 projecting id, branch_name AS view_label, and COALESCE(vault_cash_limit, 0) AS safe_metric from branches WHERE id <= 64; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_branches_summary_34 AS SELECT id, branch_name AS view_label, COALESCE(vault_cash_limit, 0) AS safe_metric FROM branches WHERE id <= 64; SELECT id, view_label, safe_metric FROM v_branches_summary_34 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-035",
    "domain": "finance",
    "level": 5,
    "order": 35,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q35)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #35 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_customers_clean_35 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and credit_score AS staged_val from customers WHERE name IS NOT NULL AND id <= 65. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_customers_clean_35 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, credit_score AS staged_val FROM customers WHERE name IS NOT NULL AND id <= 65; SELECT id, clean_name, staged_val FROM temp_customers_clean_35 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-036",
    "domain": "finance",
    "level": 5,
    "order": 36,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q36)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #36 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in account_types. Write Stored Procedure sp_routine_account_types_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_account_types_36(1); then select id, type_name AS confirmed_item from account_types where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_account_types_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_account_types_36(1); SELECT id, type_name AS confirmed_item FROM account_types WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-037",
    "domain": "finance",
    "level": 5,
    "order": 37,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q37)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #37 - Victor Vance (Head of Risk & Compliance)]: Segment records in accounts into 4 quartiles. Using a CTE named cohort_analysis, project id, account_type AS cohort_label, balance AS metric_score, and NTILE(4) OVER (ORDER BY balance DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 57;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type AS cohort_label, balance AS metric_score, NTILE(4) OVER (ORDER BY balance DESC) AS quartile_tier FROM accounts WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-038",
    "domain": "finance",
    "level": 5,
    "order": 38,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q38)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #38 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where id >= 38;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE id >= 38;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-039",
    "domain": "finance",
    "level": 5,
    "order": 39,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q39)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #39 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on merchants. Create an Index named idx_merchants_perf_39 ON merchants(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_merchants_perf_39 ON merchants(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM merchants WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-040",
    "domain": "finance",
    "level": 5,
    "order": 40,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q40)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #40 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_cards_summary_40 projecting id, card_type AS view_label, and COALESCE(daily_limit, 0) AS safe_metric from cards WHERE id <= 70; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_cards_summary_40 AS SELECT id, card_type AS view_label, COALESCE(daily_limit, 0) AS safe_metric FROM cards WHERE id <= 70; SELECT id, view_label, safe_metric FROM v_cards_summary_40 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-041",
    "domain": "finance",
    "level": 5,
    "order": 41,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q41)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #41 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_card_swipes_clean_41 ingesting id, UPPER(TRIM(card_id::text::text)) AS clean_name, and amount AS staged_val from card_swipes WHERE card_id::text IS NOT NULL AND id <= 71. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_card_swipes_clean_41 AS SELECT id, UPPER(TRIM(card_id::text::text)) AS clean_name, amount AS staged_val FROM card_swipes WHERE card_id::text IS NOT NULL AND id <= 71; SELECT id, clean_name, staged_val FROM temp_card_swipes_clean_41 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-042",
    "domain": "finance",
    "level": 5,
    "order": 42,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q42)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #42 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in loans. Write Stored Procedure sp_routine_loans_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_loans_42(1); then select id, loan_type AS confirmed_item from loans where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_loans_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_loans_42(1); SELECT id, loan_type AS confirmed_item FROM loans WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-043",
    "domain": "finance",
    "level": 5,
    "order": 43,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q43)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #43 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in loan_payments into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, payment_amount AS metric_score, and NTILE(4) OVER (ORDER BY payment_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 63;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, payment_amount AS metric_score, NTILE(4) OVER (ORDER BY payment_amount DESC) AS quartile_tier FROM loan_payments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-044",
    "domain": "finance",
    "level": 5,
    "order": 44,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q44)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #44 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on credit_lines. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_limit from credit_lines where id >= 44;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "total_limit"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_limit FROM credit_lines WHERE id >= 44;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-045",
    "domain": "finance",
    "level": 5,
    "order": 45,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q45)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #45 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on branches. Create an Index named idx_branches_perf_45 ON branches(id DESC); then select id, branch_name AS indexed_label, vault_cash_limit AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_branches_perf_45 ON branches(id DESC); SELECT id, branch_name AS indexed_label, vault_cash_limit AS metric_val FROM branches WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-046",
    "domain": "finance",
    "level": 5,
    "order": 46,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q46)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #46 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_customers_summary_46 projecting id, name AS view_label, and COALESCE(credit_score, 0) AS safe_metric from customers WHERE id <= 76; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_customers_summary_46 AS SELECT id, name AS view_label, COALESCE(credit_score, 0) AS safe_metric FROM customers WHERE id <= 76; SELECT id, view_label, safe_metric FROM v_customers_summary_46 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-047",
    "domain": "finance",
    "level": 5,
    "order": 47,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q47)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #47 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_account_types_clean_47 ingesting id, UPPER(TRIM(type_name::text)) AS clean_name, and min_balance AS staged_val from account_types WHERE type_name IS NOT NULL AND id <= 77. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_account_types_clean_47 AS SELECT id, UPPER(TRIM(type_name::text)) AS clean_name, min_balance AS staged_val FROM account_types WHERE type_name IS NOT NULL AND id <= 77; SELECT id, clean_name, staged_val FROM temp_account_types_clean_47 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-048",
    "domain": "finance",
    "level": 5,
    "order": 48,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q48)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #48 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in accounts. Write Stored Procedure sp_routine_accounts_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_accounts_48(1); then select id, account_type AS confirmed_item from accounts where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_accounts_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_accounts_48(1); SELECT id, account_type AS confirmed_item FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-049",
    "domain": "finance",
    "level": 5,
    "order": 49,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q49)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #49 - Victor Vance (Head of Risk & Compliance)]: Segment records in transactions into 4 quartiles. Using a CTE named cohort_analysis, project id, description AS cohort_label, amount AS metric_score, and NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 69;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, description AS cohort_label, amount AS metric_score, NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier FROM transactions WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-050",
    "domain": "finance",
    "level": 5,
    "order": 50,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q50)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #50 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on merchants. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from merchants where id >= 50;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "id"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM merchants WHERE id >= 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-051",
    "domain": "finance",
    "level": 5,
    "order": 51,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q51)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #51 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on cards. Create an Index named idx_cards_perf_51 ON cards(id DESC); then select id, card_type AS indexed_label, daily_limit AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_cards_perf_51 ON cards(id DESC); SELECT id, card_type AS indexed_label, daily_limit AS metric_val FROM cards WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-052",
    "domain": "finance",
    "level": 5,
    "order": 52,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q52)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #52 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_card_swipes_summary_52 projecting id, card_id::text AS view_label, and COALESCE(amount, 0) AS safe_metric from card_swipes WHERE id <= 82; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_card_swipes_summary_52 AS SELECT id, card_id::text AS view_label, COALESCE(amount, 0) AS safe_metric FROM card_swipes WHERE id <= 82; SELECT id, view_label, safe_metric FROM v_card_swipes_summary_52 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-053",
    "domain": "finance",
    "level": 5,
    "order": 53,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q53)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #53 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_loans_clean_53 ingesting id, UPPER(TRIM(loan_type::text)) AS clean_name, and principal_amount AS staged_val from loans WHERE loan_type IS NOT NULL AND id <= 83. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_loans_clean_53 AS SELECT id, UPPER(TRIM(loan_type::text)) AS clean_name, principal_amount AS staged_val FROM loans WHERE loan_type IS NOT NULL AND id <= 83; SELECT id, clean_name, staged_val FROM temp_loans_clean_53 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-054",
    "domain": "finance",
    "level": 5,
    "order": 54,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q54)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #54 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in loan_payments. Write Stored Procedure sp_routine_loan_payments_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_loan_payments_54(1); then select id, status AS confirmed_item from loan_payments where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_loan_payments_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_loan_payments_54(1); SELECT id, status AS confirmed_item FROM loan_payments WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-055",
    "domain": "finance",
    "level": 5,
    "order": 55,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q55)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #55 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in credit_lines into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_limit AS metric_score, and NTILE(4) OVER (ORDER BY total_limit DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 75;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_limit AS metric_score, NTILE(4) OVER (ORDER BY total_limit DESC) AS quartile_tier FROM credit_lines WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-056",
    "domain": "finance",
    "level": 5,
    "order": 56,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q56)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #56 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on branches. Run an EXPLAIN (FORMAT JSON) on a query selecting id and vault_cash_limit from branches where id >= 56;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "vault_cash_limit"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, vault_cash_limit FROM branches WHERE id >= 56;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-057",
    "domain": "finance",
    "level": 5,
    "order": 57,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q57)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #57 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on customers. Create an Index named idx_customers_perf_57 ON customers(id DESC); then select id, name AS indexed_label, credit_score AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_customers_perf_57 ON customers(id DESC); SELECT id, name AS indexed_label, credit_score AS metric_val FROM customers WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-058",
    "domain": "finance",
    "level": 5,
    "order": 58,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q58)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #58 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_account_types_summary_58 projecting id, type_name AS view_label, and COALESCE(min_balance, 0) AS safe_metric from account_types WHERE id <= 88; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_account_types_summary_58 AS SELECT id, type_name AS view_label, COALESCE(min_balance, 0) AS safe_metric FROM account_types WHERE id <= 88; SELECT id, view_label, safe_metric FROM v_account_types_summary_58 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-059",
    "domain": "finance",
    "level": 5,
    "order": 59,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q59)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #59 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_accounts_clean_59 ingesting id, UPPER(TRIM(account_type::text)) AS clean_name, and balance AS staged_val from accounts WHERE account_type IS NOT NULL AND id <= 89. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean_59 AS SELECT id, UPPER(TRIM(account_type::text)) AS clean_name, balance AS staged_val FROM accounts WHERE account_type IS NOT NULL AND id <= 89; SELECT id, clean_name, staged_val FROM temp_accounts_clean_59 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-060",
    "domain": "finance",
    "level": 5,
    "order": 60,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q60)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #60 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in transactions. Write Stored Procedure sp_routine_transactions_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_transactions_60(1); then select id, description AS confirmed_item from transactions where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_transactions_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_transactions_60(1); SELECT id, description AS confirmed_item FROM transactions WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-061",
    "domain": "finance",
    "level": 5,
    "order": 61,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q61)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #61 - Victor Vance (Head of Risk & Compliance)]: Segment records in merchants into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 81;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM merchants WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-062",
    "domain": "finance",
    "level": 5,
    "order": 62,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q62)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #62 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on cards. Run an EXPLAIN (FORMAT JSON) on a query selecting id and daily_limit from cards where id >= 62;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "daily_limit"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, daily_limit FROM cards WHERE id >= 62;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-063",
    "domain": "finance",
    "level": 5,
    "order": 63,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q63)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #63 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on card_swipes. Create an Index named idx_card_swipes_perf_63 ON card_swipes(id DESC); then select id, card_id::text AS indexed_label, amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_card_swipes_perf_63 ON card_swipes(id DESC); SELECT id, card_id::text AS indexed_label, amount AS metric_val FROM card_swipes WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-064",
    "domain": "finance",
    "level": 5,
    "order": 64,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q64)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #64 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_loans_summary_64 projecting id, loan_type AS view_label, and COALESCE(principal_amount, 0) AS safe_metric from loans WHERE id <= 94; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_loans_summary_64 AS SELECT id, loan_type AS view_label, COALESCE(principal_amount, 0) AS safe_metric FROM loans WHERE id <= 94; SELECT id, view_label, safe_metric FROM v_loans_summary_64 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-065",
    "domain": "finance",
    "level": 5,
    "order": 65,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q65)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #65 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_loan_payments_clean_65 ingesting id, UPPER(TRIM(status::text)) AS clean_name, and payment_amount AS staged_val from loan_payments WHERE status IS NOT NULL AND id <= 95. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_loan_payments_clean_65 AS SELECT id, UPPER(TRIM(status::text)) AS clean_name, payment_amount AS staged_val FROM loan_payments WHERE status IS NOT NULL AND id <= 95; SELECT id, clean_name, staged_val FROM temp_loan_payments_clean_65 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-066",
    "domain": "finance",
    "level": 5,
    "order": 66,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q66)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #66 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in credit_lines. Write Stored Procedure sp_routine_credit_lines_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_credit_lines_66(1); then select id, status AS confirmed_item from credit_lines where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_credit_lines_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_credit_lines_66(1); SELECT id, status AS confirmed_item FROM credit_lines WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-067",
    "domain": "finance",
    "level": 5,
    "order": 67,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q67)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #67 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in branches into 4 quartiles. Using a CTE named cohort_analysis, project id, branch_name AS cohort_label, vault_cash_limit AS metric_score, and NTILE(4) OVER (ORDER BY vault_cash_limit DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 87;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, branch_name AS cohort_label, vault_cash_limit AS metric_score, NTILE(4) OVER (ORDER BY vault_cash_limit DESC) AS quartile_tier FROM branches WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-068",
    "domain": "finance",
    "level": 5,
    "order": 68,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q68)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #68 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on customers. Run an EXPLAIN (FORMAT JSON) on a query selecting id and credit_score from customers where id >= 68;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "credit_score"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, credit_score FROM customers WHERE id >= 68;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-069",
    "domain": "finance",
    "level": 5,
    "order": 69,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q69)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #69 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on account_types. Create an Index named idx_account_types_perf_69 ON account_types(id DESC); then select id, type_name AS indexed_label, min_balance AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_account_types_perf_69 ON account_types(id DESC); SELECT id, type_name AS indexed_label, min_balance AS metric_val FROM account_types WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-070",
    "domain": "finance",
    "level": 5,
    "order": 70,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q70)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #70 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_accounts_summary_70 projecting id, account_type AS view_label, and COALESCE(balance, 0) AS safe_metric from accounts WHERE id <= 100; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_accounts_summary_70 AS SELECT id, account_type AS view_label, COALESCE(balance, 0) AS safe_metric FROM accounts WHERE id <= 100; SELECT id, view_label, safe_metric FROM v_accounts_summary_70 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-071",
    "domain": "finance",
    "level": 5,
    "order": 71,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q71)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #71 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_transactions_clean_71 ingesting id, UPPER(TRIM(description::text)) AS clean_name, and amount AS staged_val from transactions WHERE description IS NOT NULL AND id <= 101. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_transactions_clean_71 AS SELECT id, UPPER(TRIM(description::text)) AS clean_name, amount AS staged_val FROM transactions WHERE description IS NOT NULL AND id <= 101; SELECT id, clean_name, staged_val FROM temp_transactions_clean_71 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-072",
    "domain": "finance",
    "level": 5,
    "order": 72,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q72)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #72 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in merchants. Write Stored Procedure sp_routine_merchants_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_merchants_72(1); then select id, name AS confirmed_item from merchants where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_merchants_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_merchants_72(1); SELECT id, name AS confirmed_item FROM merchants WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-073",
    "domain": "finance",
    "level": 5,
    "order": 73,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q73)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #73 - Victor Vance (Head of Risk & Compliance)]: Segment records in cards into 4 quartiles. Using a CTE named cohort_analysis, project id, card_type AS cohort_label, daily_limit AS metric_score, and NTILE(4) OVER (ORDER BY daily_limit DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 93;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, card_type AS cohort_label, daily_limit AS metric_score, NTILE(4) OVER (ORDER BY daily_limit DESC) AS quartile_tier FROM cards WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-074",
    "domain": "finance",
    "level": 5,
    "order": 74,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q74)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #74 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on card_swipes. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from card_swipes where id >= 74;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM card_swipes WHERE id >= 74;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-075",
    "domain": "finance",
    "level": 5,
    "order": 75,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q75)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #75 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on loans. Create an Index named idx_loans_perf_75 ON loans(id DESC); then select id, loan_type AS indexed_label, principal_amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_loans_perf_75 ON loans(id DESC); SELECT id, loan_type AS indexed_label, principal_amount AS metric_val FROM loans WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "fin-L5-076",
    "domain": "finance",
    "level": 5,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q76)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #76 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_loan_payments_summary_76 projecting id, status AS view_label, and COALESCE(payment_amount, 0) AS safe_metric from loan_payments WHERE id <= 106; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_loan_payments_summary_76 AS SELECT id, status AS view_label, COALESCE(payment_amount, 0) AS safe_metric FROM loan_payments WHERE id <= 106; SELECT id, view_label, safe_metric FROM v_loan_payments_summary_76 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-077",
    "domain": "finance",
    "level": 5,
    "order": 77,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q77)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #77 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_credit_lines_clean_77 ingesting id, UPPER(TRIM(status::text)) AS clean_name, and total_limit AS staged_val from credit_lines WHERE status IS NOT NULL AND id <= 107. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_credit_lines_clean_77 AS SELECT id, UPPER(TRIM(status::text)) AS clean_name, total_limit AS staged_val FROM credit_lines WHERE status IS NOT NULL AND id <= 107; SELECT id, clean_name, staged_val FROM temp_credit_lines_clean_77 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-078",
    "domain": "finance",
    "level": 5,
    "order": 78,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q78)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #78 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in branches. Write Stored Procedure sp_routine_branches_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_branches_78(1); then select id, branch_name AS confirmed_item from branches where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_branches_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_branches_78(1); SELECT id, branch_name AS confirmed_item FROM branches WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-079",
    "domain": "finance",
    "level": 5,
    "order": 79,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q79)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #79 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in customers into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, credit_score AS metric_score, and NTILE(4) OVER (ORDER BY credit_score DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 99;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, credit_score AS metric_score, NTILE(4) OVER (ORDER BY credit_score DESC) AS quartile_tier FROM customers WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-080",
    "domain": "finance",
    "level": 5,
    "order": 80,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q80)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #80 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on account_types. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_balance from account_types where id >= 80;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_balance"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_balance FROM account_types WHERE id >= 80;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-081",
    "domain": "finance",
    "level": 5,
    "order": 81,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q81)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #81 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on accounts. Create an Index named idx_accounts_perf_81 ON accounts(id DESC); then select id, account_type AS indexed_label, balance AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf_81 ON accounts(id DESC); SELECT id, account_type AS indexed_label, balance AS metric_val FROM accounts WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-082",
    "domain": "finance",
    "level": 5,
    "order": 82,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q82)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #82 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_transactions_summary_82 projecting id, description AS view_label, and COALESCE(amount, 0) AS safe_metric from transactions WHERE id <= 112; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_transactions_summary_82 AS SELECT id, description AS view_label, COALESCE(amount, 0) AS safe_metric FROM transactions WHERE id <= 112; SELECT id, view_label, safe_metric FROM v_transactions_summary_82 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-083",
    "domain": "finance",
    "level": 5,
    "order": 83,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q83)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #83 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_merchants_clean_83 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and id AS staged_val from merchants WHERE name IS NOT NULL AND id <= 113. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_merchants_clean_83 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, id AS staged_val FROM merchants WHERE name IS NOT NULL AND id <= 113; SELECT id, clean_name, staged_val FROM temp_merchants_clean_83 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-084",
    "domain": "finance",
    "level": 5,
    "order": 84,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q84)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #84 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in cards. Write Stored Procedure sp_routine_cards_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_cards_84(1); then select id, card_type AS confirmed_item from cards where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_cards_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_cards_84(1); SELECT id, card_type AS confirmed_item FROM cards WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-085",
    "domain": "finance",
    "level": 5,
    "order": 85,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q85)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #85 - Victor Vance (Head of Risk & Compliance)]: Segment records in card_swipes into 4 quartiles. Using a CTE named cohort_analysis, project id, card_id::text AS cohort_label, amount AS metric_score, and NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 105;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, card_id::text AS cohort_label, amount AS metric_score, NTILE(4) OVER (ORDER BY amount DESC) AS quartile_tier FROM card_swipes WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-086",
    "domain": "finance",
    "level": 5,
    "order": 86,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q86)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #86 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on loans. Run an EXPLAIN (FORMAT JSON) on a query selecting id and principal_amount from loans where id >= 86;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "principal_amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, principal_amount FROM loans WHERE id >= 86;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-087",
    "domain": "finance",
    "level": 5,
    "order": 87,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q87)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #87 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on loan_payments. Create an Index named idx_loan_payments_perf_87 ON loan_payments(id DESC); then select id, status AS indexed_label, payment_amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_loan_payments_perf_87 ON loan_payments(id DESC); SELECT id, status AS indexed_label, payment_amount AS metric_val FROM loan_payments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-088",
    "domain": "finance",
    "level": 5,
    "order": 88,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q88)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #88 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_credit_lines_summary_88 projecting id, status AS view_label, and COALESCE(total_limit, 0) AS safe_metric from credit_lines WHERE id <= 118; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_credit_lines_summary_88 AS SELECT id, status AS view_label, COALESCE(total_limit, 0) AS safe_metric FROM credit_lines WHERE id <= 118; SELECT id, view_label, safe_metric FROM v_credit_lines_summary_88 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-089",
    "domain": "finance",
    "level": 5,
    "order": 89,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q89)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #89 - Victor Vance (Head of Risk & Compliance)]: ETL Staging Ticket: Build a session table named temp_branches_clean_89 ingesting id, UPPER(TRIM(branch_name::text)) AS clean_name, and vault_cash_limit AS staged_val from branches WHERE branch_name IS NOT NULL AND id <= 119. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_branches_clean_89 AS SELECT id, UPPER(TRIM(branch_name::text)) AS clean_name, vault_cash_limit AS staged_val FROM branches WHERE branch_name IS NOT NULL AND id <= 119; SELECT id, clean_name, staged_val FROM temp_branches_clean_89 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-090",
    "domain": "finance",
    "level": 5,
    "order": 90,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q90)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #90 - Elena Rostova (VP of Retail Lending)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_90(1); then select id, name AS confirmed_item from customers where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_90(1); SELECT id, name AS confirmed_item FROM customers WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-091",
    "domain": "finance",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q91)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #91 - Arthur Pendleton (Chief Wealth Advisor)]: Segment records in account_types into 4 quartiles. Using a CTE named cohort_analysis, project id, type_name AS cohort_label, min_balance AS metric_score, and NTILE(4) OVER (ORDER BY min_balance DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 111;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, type_name AS cohort_label, min_balance AS metric_score, NTILE(4) OVER (ORDER BY min_balance DESC) AS quartile_tier FROM account_types WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 111;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-092",
    "domain": "finance",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q92)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #92 - Rachel Adams (Director of Branch Operations)]: Infrastructure Audit: Profile optimizer execution cost for queries on accounts. Run an EXPLAIN (FORMAT JSON) on a query selecting id and balance from accounts where id >= 92;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "balance"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, balance FROM accounts WHERE id >= 92;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-093",
    "domain": "finance",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q93)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #93 - Victor Vance (Head of Risk & Compliance)]: Production Ticket: Accelerate read queries on transactions. Create an Index named idx_transactions_perf_93 ON transactions(id DESC); then select id, description AS indexed_label, amount AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_perf_93 ON transactions(id DESC); SELECT id, description AS indexed_label, amount AS metric_val FROM transactions WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-094",
    "domain": "finance",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q94)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #94 - Elena Rostova (VP of Retail Lending)]: Create a sanitized virtual View named v_merchants_summary_94 projecting id, name AS view_label, and COALESCE(id, 0) AS safe_metric from merchants WHERE id <= 124; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_merchants_summary_94 AS SELECT id, name AS view_label, COALESCE(id, 0) AS safe_metric FROM merchants WHERE id <= 124; SELECT id, view_label, safe_metric FROM v_merchants_summary_94 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-095",
    "domain": "finance",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q95)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #95 - Arthur Pendleton (Chief Wealth Advisor)]: ETL Staging Ticket: Build a session table named temp_cards_clean_95 ingesting id, UPPER(TRIM(card_type::text)) AS clean_name, and daily_limit AS staged_val from cards WHERE card_type IS NOT NULL AND id <= 125. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_cards_clean_95 AS SELECT id, UPPER(TRIM(card_type::text)) AS clean_name, daily_limit AS staged_val FROM cards WHERE card_type IS NOT NULL AND id <= 125; SELECT id, clean_name, staged_val FROM temp_cards_clean_95 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-096",
    "domain": "finance",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q96)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #96 - Rachel Adams (Director of Branch Operations)]: Automate operational routine in card_swipes. Write Stored Procedure sp_routine_card_swipes_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_card_swipes_96(1); then select id, card_id::text AS confirmed_item from card_swipes where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_card_swipes_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_card_swipes_96(1); SELECT id, card_id::text AS confirmed_item FROM card_swipes WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-097",
    "domain": "finance",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q97)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"[Task #97 - Victor Vance (Head of Risk & Compliance)]: Segment records in loans into 4 quartiles. Using a CTE named cohort_analysis, project id, loan_type AS cohort_label, principal_amount AS metric_score, and NTILE(4) OVER (ORDER BY principal_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 117;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, loan_type AS cohort_label, principal_amount AS metric_score, NTILE(4) OVER (ORDER BY principal_amount DESC) AS quartile_tier FROM loans WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 117;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-098",
    "domain": "finance",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q98)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"[Task #98 - Elena Rostova (VP of Retail Lending)]: Infrastructure Audit: Profile optimizer execution cost for queries on loan_payments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and payment_amount from loan_payments where id >= 98;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "payment_amount"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, payment_amount FROM loan_payments WHERE id >= 98;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-099",
    "domain": "finance",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q99)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"[Task #99 - Arthur Pendleton (Chief Wealth Advisor)]: Production Ticket: Accelerate read queries on credit_lines. Create an Index named idx_credit_lines_perf_99 ON credit_lines(id DESC); then select id, status AS indexed_label, total_limit AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_credit_lines_perf_99 ON credit_lines(id DESC); SELECT id, status AS indexed_label, total_limit AS metric_val FROM credit_lines WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "fin-L5-100",
    "domain": "finance",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q100)",
    "stakeholder": {
      "name": "Rachel Adams",
      "role": "Director of Branch Operations",
      "department": "Branch Operations"
    },
    "request": "From: Rachel Adams (Director of Branch Operations)\n\n\"[Task #100 - Rachel Adams (Director of Branch Operations)]: Create a sanitized virtual View named v_branches_summary_100 projecting id, branch_name AS view_label, and COALESCE(vault_cash_limit, 0) AS safe_metric from branches WHERE id <= 130; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_branches_summary_100 AS SELECT id, branch_name AS view_label, COALESCE(vault_cash_limit, 0) AS safe_metric FROM branches WHERE id <= 130; SELECT id, view_label, safe_metric FROM v_branches_summary_100 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  }
];
