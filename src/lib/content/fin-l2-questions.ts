import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L2-001",
    "domain": "finance",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-002",
    "domain": "finance",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_2(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_2(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_2(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_2(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-003",
    "domain": "finance",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-004",
    "domain": "finance",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-005",
    "domain": "finance",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_5 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_5 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-006",
    "domain": "finance",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_6 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_6 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_6_low PARTITION OF transactions_part_6 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_6_high PARTITION OF transactions_part_6 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_6 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_6;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-007",
    "domain": "finance",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_7() and bind trigger trg_audit_accounts_7 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_7(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_7() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_7 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_7(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-008",
    "domain": "finance",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-009",
    "domain": "finance",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_9 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_9 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_9 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-010",
    "domain": "finance",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-011",
    "domain": "finance",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-012",
    "domain": "finance",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_12 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_12 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_12 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-013",
    "domain": "finance",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-014",
    "domain": "finance",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_14(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_14(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_14(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_14(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-015",
    "domain": "finance",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L2-016",
    "domain": "finance",
    "level": 2,
    "order": 16,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-017",
    "domain": "finance",
    "level": 2,
    "order": 17,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_17 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_17 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-018",
    "domain": "finance",
    "level": 2,
    "order": 18,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_18 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_18 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_18_low PARTITION OF transactions_part_18 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_18_high PARTITION OF transactions_part_18 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_18 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_18;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-019",
    "domain": "finance",
    "level": 2,
    "order": 19,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_19() and bind trigger trg_audit_accounts_19 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_19(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_19() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_19 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_19(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-020",
    "domain": "finance",
    "level": 2,
    "order": 20,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-021",
    "domain": "finance",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_21 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_21 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_21 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-022",
    "domain": "finance",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-023",
    "domain": "finance",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-024",
    "domain": "finance",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_24 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_24 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_24 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-025",
    "domain": "finance",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-026",
    "domain": "finance",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_26(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_26(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_26(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_26(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-027",
    "domain": "finance",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-028",
    "domain": "finance",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-029",
    "domain": "finance",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_29 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_29 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-030",
    "domain": "finance",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_30 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_30 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_30_low PARTITION OF transactions_part_30 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_30_high PARTITION OF transactions_part_30 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_30 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_30;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-031",
    "domain": "finance",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_31() and bind trigger trg_audit_accounts_31 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_31(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_31() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_31 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_31(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-032",
    "domain": "finance",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-033",
    "domain": "finance",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_33 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_33 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_33 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-034",
    "domain": "finance",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-035",
    "domain": "finance",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-036",
    "domain": "finance",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_36 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_36 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_36 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-037",
    "domain": "finance",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-038",
    "domain": "finance",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_38(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_38(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_38(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_38(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-039",
    "domain": "finance",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-040",
    "domain": "finance",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-041",
    "domain": "finance",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_41 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_41 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-042",
    "domain": "finance",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_42 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_42 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_42_low PARTITION OF transactions_part_42 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_42_high PARTITION OF transactions_part_42 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_42 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_42;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-043",
    "domain": "finance",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_43() and bind trigger trg_audit_accounts_43 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_43(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_43() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_43 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_43(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-044",
    "domain": "finance",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-045",
    "domain": "finance",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_45 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_45 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_45 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-046",
    "domain": "finance",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-047",
    "domain": "finance",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-048",
    "domain": "finance",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_48 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_48 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_48 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-049",
    "domain": "finance",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-050",
    "domain": "finance",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_50(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_50(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_50(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_50(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-051",
    "domain": "finance",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-052",
    "domain": "finance",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-053",
    "domain": "finance",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_53 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_53 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-054",
    "domain": "finance",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_54 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_54 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_54_low PARTITION OF transactions_part_54 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_54_high PARTITION OF transactions_part_54 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_54 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_54;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-055",
    "domain": "finance",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_55() and bind trigger trg_audit_accounts_55 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_55(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_55() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_55 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_55(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-056",
    "domain": "finance",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-057",
    "domain": "finance",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_57 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_57 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_57 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-058",
    "domain": "finance",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-059",
    "domain": "finance",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-060",
    "domain": "finance",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_60 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_60 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_60 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-061",
    "domain": "finance",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-062",
    "domain": "finance",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_62(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_62(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_62(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_62(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-063",
    "domain": "finance",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-064",
    "domain": "finance",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-065",
    "domain": "finance",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_65 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_65 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L2-066",
    "domain": "finance",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_66 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_66 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_66_low PARTITION OF transactions_part_66 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_66_high PARTITION OF transactions_part_66 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_66 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_66;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-067",
    "domain": "finance",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_67() and bind trigger trg_audit_accounts_67 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_67(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_67() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_67 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_67(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-068",
    "domain": "finance",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-069",
    "domain": "finance",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_69 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_69 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_69 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-070",
    "domain": "finance",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-071",
    "domain": "finance",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-072",
    "domain": "finance",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_72 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_72 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_72 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-073",
    "domain": "finance",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-074",
    "domain": "finance",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_74(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_74(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_74(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_74(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-075",
    "domain": "finance",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-076",
    "domain": "finance",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-077",
    "domain": "finance",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_77 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_77 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-078",
    "domain": "finance",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_78 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_78 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_78_low PARTITION OF transactions_part_78 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_78_high PARTITION OF transactions_part_78 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_78 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_78;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-079",
    "domain": "finance",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_79() and bind trigger trg_audit_accounts_79 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_79(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_79() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_79 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_79(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-080",
    "domain": "finance",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-081",
    "domain": "finance",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_81 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_81 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_81 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-082",
    "domain": "finance",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-083",
    "domain": "finance",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-084",
    "domain": "finance",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_84 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_84 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_84 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-085",
    "domain": "finance",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-086",
    "domain": "finance",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_86(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_86(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_86(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_86(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-087",
    "domain": "finance",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-088",
    "domain": "finance",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-089",
    "domain": "finance",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"ALERT: The dashboard query on transactions is causing severe CPU spikes. Create a composite index named idx_transactions_opt_89 ON transactions(id, amount DESC). Then retrieve id, transaction_type, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "transaction_type",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_transactions_opt_89 ON transactions(id, amount DESC); SELECT id, transaction_type, amount FROM transactions WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-090",
    "domain": "finance",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Directive: Ledger transactions is reaching multi-gigabyte scale. Create a partitioned table named transactions_part_90 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
    "context_notes": "",
    "concepts": [
      "PARTITION BY RANGE",
      "TABLE PARTITIONING",
      "SCALE ARCHITECTURE"
    ],
    "expected_columns": [
      "id",
      "status_code",
      "amount"
    ],
    "reference_sql": "CREATE TABLE transactions_part_90 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE transactions_part_90_low PARTITION OF transactions_part_90 FOR VALUES FROM (0) TO (100); CREATE TABLE transactions_part_90_high PARTITION OF transactions_part_90 FOR VALUES FROM (100) TO (100000); INSERT INTO transactions_part_90 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM transactions_part_90;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-091",
    "domain": "finance",
    "level": 2,
    "order": 91,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compliance Officer Directive: Create an event trigger on accounts to monitor record mutations. Define function fn_audit_accounts_91() and bind trigger trg_audit_accounts_91 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_91(). Then select id, account_type, balance from accounts ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_accounts_91() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_accounts_91 BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION fn_audit_accounts_91(); SELECT id, account_type, balance FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query accounts."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-092",
    "domain": "finance",
    "level": 2,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in accounts, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, account_type, and ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, account_type, ROUND((balance / NULLIF(COALESCE(balance, 1), 0))::numeric, 2) AS index_ratio FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-093",
    "domain": "finance",
    "level": 2,
    "order": 93,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_branches_93 joining branches and customers on t1.id = t2.id. Project t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "SECURITY ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "primary_name",
      "secondary_name"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_branches_93 AS SELECT t1.id, COALESCE(t1.branch_name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM branches t1 JOIN customers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_branches_93 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-094",
    "domain": "finance",
    "level": 2,
    "order": 94,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive Memo: Segment records in accounts into 4 analytical quartiles based on balance using NTILE(4) within a CTE named cohort_analysis. Return id, account_type, balance, and quartile ordered by quartile ASC, balance DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, account_type, balance, NTILE(4) OVER (ORDER BY balance DESC) AS quartile FROM accounts) SELECT id, account_type, balance, quartile FROM cohort_analysis ORDER BY quartile ASC, balance DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY balance DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-095",
    "domain": "finance",
    "level": 2,
    "order": 95,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Financial Growth Memo: In transactions, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM transactions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L2-096",
    "domain": "finance",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from accounts. Create a Temporary Staging Table named temp_accounts_cln_96 containing id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount where account_type IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TEMP TABLE",
      "COALESCE",
      "TRIM",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "cleaned_name",
      "adjusted_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_accounts_cln_96 AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(ROUND(balance * 1.08, 2), 0.00) AS adjusted_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_accounts_cln_96 ORDER BY adjusted_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it."
    ],
    "solution_explanation": "Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "fin-L2-097",
    "domain": "finance",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in transactions. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from transactions where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 25;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prepend EXPLAIN (FORMAT JSON) to your query."
    ],
    "solution_explanation": "Extracts the PostgreSQL query planner JSON execution tree.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "fin-L2-098",
    "domain": "finance",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_accounts_98(p_id INT, p_val NUMERIC) that updates balance by adding p_val for the specified id. Execute with CALL sp_reconcile_accounts_98(1, 10); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_accounts_98(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_accounts_98(1, 10); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT."
    ],
    "solution_explanation": "Encapsulates multi-table business updates inside a compiled procedural routine.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "fin-L2-099",
    "domain": "finance",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Alert: Standardize legacy text fields in branches. Select id, UPPER(TRIM(branch_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from branches where branch_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "TRIM",
      "UPPER",
      "IS NOT NULL",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "standardized_title",
      "safe_code"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM branches WHERE branch_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) and filter with WHERE branch_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "fin-L2-100",
    "domain": "finance",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Discrepancy: Identify all branches entries that have active corresponding associations in customers. Using a Correlated Subquery with EXISTS, return t1.id and t1.branch_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT t1.id, t1.branch_name FROM branches t1 WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM customers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 75,
    "estimated_minutes": 20
  }
];
