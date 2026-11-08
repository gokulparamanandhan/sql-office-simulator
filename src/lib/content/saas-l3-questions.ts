import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L3-001",
    "domain": "saas",
    "level": 3,
    "order": 1,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-002",
    "domain": "saas",
    "level": 3,
    "order": 2,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_2 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_2 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_2 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-003",
    "domain": "saas",
    "level": 3,
    "order": 3,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-004",
    "domain": "saas",
    "level": 3,
    "order": 4,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-005",
    "domain": "saas",
    "level": 3,
    "order": 5,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_5 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_5 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_5 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-006",
    "domain": "saas",
    "level": 3,
    "order": 6,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-007",
    "domain": "saas",
    "level": 3,
    "order": 7,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_7(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_7(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_7(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_7(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-008",
    "domain": "saas",
    "level": 3,
    "order": 8,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-009",
    "domain": "saas",
    "level": 3,
    "order": 9,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-010",
    "domain": "saas",
    "level": 3,
    "order": 10,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_10 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_10 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-011",
    "domain": "saas",
    "level": 3,
    "order": 11,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_11_low PARTITION OF invoices_part_11 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_11_high PARTITION OF invoices_part_11 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_11 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_11;",
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
    "id": "saas-L3-012",
    "domain": "saas",
    "level": 3,
    "order": 12,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_12() and bind trigger trg_audit_subscriptions_12 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_12(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_12() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_12 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_12(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-013",
    "domain": "saas",
    "level": 3,
    "order": 13,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-014",
    "domain": "saas",
    "level": 3,
    "order": 14,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_14 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_14 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_14 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-015",
    "domain": "saas",
    "level": 3,
    "order": 15,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-016",
    "domain": "saas",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-017",
    "domain": "saas",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_17 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_17 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_17 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-018",
    "domain": "saas",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-019",
    "domain": "saas",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_19(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_19(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_19(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_19(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-020",
    "domain": "saas",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-021",
    "domain": "saas",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-022",
    "domain": "saas",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_22 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_22 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-023",
    "domain": "saas",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_23_low PARTITION OF invoices_part_23 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_23_high PARTITION OF invoices_part_23 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_23 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_23;",
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
    "id": "saas-L3-024",
    "domain": "saas",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_24() and bind trigger trg_audit_subscriptions_24 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_24(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_24() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_24 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_24(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-025",
    "domain": "saas",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-026",
    "domain": "saas",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_26 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_26 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_26 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-027",
    "domain": "saas",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-028",
    "domain": "saas",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-029",
    "domain": "saas",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_29 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_29 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_29 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-030",
    "domain": "saas",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-031",
    "domain": "saas",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_31(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_31(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_31(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_31(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-032",
    "domain": "saas",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-033",
    "domain": "saas",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-034",
    "domain": "saas",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_34 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_34 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-035",
    "domain": "saas",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_35_low PARTITION OF invoices_part_35 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_35_high PARTITION OF invoices_part_35 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_35 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_35;",
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
    "id": "saas-L3-036",
    "domain": "saas",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_36() and bind trigger trg_audit_subscriptions_36 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_36(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_36() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_36 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_36(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-037",
    "domain": "saas",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-038",
    "domain": "saas",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_38 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_38 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_38 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-039",
    "domain": "saas",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-040",
    "domain": "saas",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-041",
    "domain": "saas",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_41 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_41 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_41 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-042",
    "domain": "saas",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-043",
    "domain": "saas",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_43(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_43(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_43(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_43(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-044",
    "domain": "saas",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-045",
    "domain": "saas",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-046",
    "domain": "saas",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_46 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_46 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-047",
    "domain": "saas",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_47_low PARTITION OF invoices_part_47 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_47_high PARTITION OF invoices_part_47 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_47 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_47;",
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
    "id": "saas-L3-048",
    "domain": "saas",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_48() and bind trigger trg_audit_subscriptions_48 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_48(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_48() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_48 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_48(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L3-049",
    "domain": "saas",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-050",
    "domain": "saas",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_50 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_50 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_50 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-051",
    "domain": "saas",
    "level": 3,
    "order": 51,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-052",
    "domain": "saas",
    "level": 3,
    "order": 52,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-053",
    "domain": "saas",
    "level": 3,
    "order": 53,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_53 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_53 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_53 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-054",
    "domain": "saas",
    "level": 3,
    "order": 54,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-055",
    "domain": "saas",
    "level": 3,
    "order": 55,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_55(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_55(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_55(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_55(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-056",
    "domain": "saas",
    "level": 3,
    "order": 56,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-057",
    "domain": "saas",
    "level": 3,
    "order": 57,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-058",
    "domain": "saas",
    "level": 3,
    "order": 58,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_58 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_58 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-059",
    "domain": "saas",
    "level": 3,
    "order": 59,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_59_low PARTITION OF invoices_part_59 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_59_high PARTITION OF invoices_part_59 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_59 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_59;",
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
    "id": "saas-L3-060",
    "domain": "saas",
    "level": 3,
    "order": 60,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_60() and bind trigger trg_audit_subscriptions_60 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_60(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_60() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_60 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_60(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-061",
    "domain": "saas",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-062",
    "domain": "saas",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_62 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_62 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_62 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-063",
    "domain": "saas",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-064",
    "domain": "saas",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-065",
    "domain": "saas",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_65 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_65 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_65 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-066",
    "domain": "saas",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-067",
    "domain": "saas",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_67(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_67(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_67(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_67(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-068",
    "domain": "saas",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-069",
    "domain": "saas",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-070",
    "domain": "saas",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_70 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_70 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-071",
    "domain": "saas",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_71_low PARTITION OF invoices_part_71 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_71_high PARTITION OF invoices_part_71 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_71 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_71;",
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
    "id": "saas-L3-072",
    "domain": "saas",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_72() and bind trigger trg_audit_subscriptions_72 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_72(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_72() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_72 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_72(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-073",
    "domain": "saas",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-074",
    "domain": "saas",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_74 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_74 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_74 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-075",
    "domain": "saas",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-076",
    "domain": "saas",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-077",
    "domain": "saas",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_77 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_77 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_77 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-078",
    "domain": "saas",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-079",
    "domain": "saas",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_79(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_79(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_79(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_79(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-080",
    "domain": "saas",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-081",
    "domain": "saas",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-082",
    "domain": "saas",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_82 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_82 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-083",
    "domain": "saas",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_83_low PARTITION OF invoices_part_83 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_83_high PARTITION OF invoices_part_83 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_83 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_83;",
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
    "id": "saas-L3-084",
    "domain": "saas",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_84() and bind trigger trg_audit_subscriptions_84 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_84(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_84() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_84 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_84(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-085",
    "domain": "saas",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-086",
    "domain": "saas",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_86 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_86 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_86 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-087",
    "domain": "saas",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-088",
    "domain": "saas",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-089",
    "domain": "saas",
    "level": 3,
    "order": 89,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Ticket: Ingest and cleanse active records from subscriptions. Create a Temporary Staging Table named temp_subscriptions_cln_89 containing id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount where plan IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_cln_89 AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(ROUND(mrr * 1.08, 2), 0.00) AS adjusted_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_subscriptions_cln_89 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "saas-L3-090",
    "domain": "saas",
    "level": 3,
    "order": 90,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in invoices. Run an EXPLAIN (FORMAT JSON) on a query selecting id and amount from invoices where amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 25;",
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
    "id": "saas-L3-091",
    "domain": "saas",
    "level": 3,
    "order": 91,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_subscriptions_91(p_id INT, p_val NUMERIC) that updates mrr by adding p_val for the specified id. Execute with CALL sp_reconcile_subscriptions_91(1, 10); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_subscriptions_91(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_subscriptions_91(1, 10); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L3-092",
    "domain": "saas",
    "level": 3,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Quality Alert: Standardize legacy text fields in accounts. Select id, UPPER(TRIM(company_name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from accounts where company_name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM accounts WHERE company_name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) and filter with WHERE company_name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-093",
    "domain": "saas",
    "level": 3,
    "order": 93,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Audit Discrepancy: Identify all accounts entries that have active corresponding associations in pricing_plans. Using a Correlated Subquery with EXISTS, return t1.id and t1.company_name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT t1.id, t1.company_name FROM accounts t1 WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM pricing_plans t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L3-094",
    "domain": "saas",
    "level": 3,
    "order": 94,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"ALERT: The dashboard query on invoices is causing severe CPU spikes. Create a composite index named idx_invoices_opt_94 ON invoices(id, amount DESC). Then retrieve id, is_paid, amount where amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "is_paid",
      "amount"
    ],
    "reference_sql": "CREATE INDEX idx_invoices_opt_94 ON invoices(id, amount DESC); SELECT id, is_paid, amount FROM invoices WHERE amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "saas-L3-095",
    "domain": "saas",
    "level": 3,
    "order": 95,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Directive: Ledger invoices is reaching multi-gigabyte scale. Create a partitioned table named invoices_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE invoices_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE invoices_part_95_low PARTITION OF invoices_part_95 FOR VALUES FROM (0) TO (100); CREATE TABLE invoices_part_95_high PARTITION OF invoices_part_95 FOR VALUES FROM (100) TO (100000); INSERT INTO invoices_part_95 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM invoices_part_95;",
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
    "id": "saas-L3-096",
    "domain": "saas",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compliance Officer Directive: Create an event trigger on subscriptions to monitor record mutations. Define function fn_audit_subscriptions_96() and bind trigger trg_audit_subscriptions_96 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_96(). Then select id, plan, mrr from subscriptions ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_subscriptions_96() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_subscriptions_96 BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION fn_audit_subscriptions_96(); SELECT id, plan, mrr FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query subscriptions."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L3-097",
    "domain": "saas",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in subscriptions, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, plan, and ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, plan, ROUND((mrr / NULLIF(COALESCE(mrr, 1), 0))::numeric, 2) AS index_ratio FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions."
    ],
    "solution_explanation": "Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L3-098",
    "domain": "saas",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_accounts_98 joining accounts and pricing_plans on t1.id = t2.id. Project t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, and COALESCE(t2.plan_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_accounts_98 AS SELECT t1.id, COALESCE(t1.company_name, 'Unassigned') AS primary_name, COALESCE(t2.plan_name, 'None') AS secondary_name FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_accounts_98 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the view aliasing columns with COALESCE fallbacks, then query from it."
    ],
    "solution_explanation": "Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L3-099",
    "domain": "saas",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive Memo: Segment records in subscriptions into 4 analytical quartiles based on mrr using NTILE(4) within a CTE named cohort_analysis. Return id, plan, mrr, and quartile ordered by quartile ASC, mrr DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, plan, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS quartile FROM subscriptions) SELECT id, plan, mrr, quartile FROM cohort_analysis ORDER BY quartile ASC, mrr DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY mrr DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L3-100",
    "domain": "saas",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Financial Growth Memo: In invoices, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(amount) OVER (ORDER BY id ASC) AS next_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply both LAG() and LEAD() over the same sorted window."
    ],
    "solution_explanation": "Performs simultaneous backward and forward row lookups for trajectory analysis.",
    "xp": 75,
    "estimated_minutes": 20
  }
];
