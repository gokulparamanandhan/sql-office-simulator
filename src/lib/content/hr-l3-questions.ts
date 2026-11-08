import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L3-001",
    "domain": "hr",
    "level": 3,
    "order": 1,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-002",
    "domain": "hr",
    "level": 3,
    "order": 2,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_2 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_2 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_2 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-003",
    "domain": "hr",
    "level": 3,
    "order": 3,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-004",
    "domain": "hr",
    "level": 3,
    "order": 4,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-005",
    "domain": "hr",
    "level": 3,
    "order": 5,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_5 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_5 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_5 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-006",
    "domain": "hr",
    "level": 3,
    "order": 6,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-007",
    "domain": "hr",
    "level": 3,
    "order": 7,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_7(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_7(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_7(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_7(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-008",
    "domain": "hr",
    "level": 3,
    "order": 8,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-009",
    "domain": "hr",
    "level": 3,
    "order": 9,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-010",
    "domain": "hr",
    "level": 3,
    "order": 10,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_10 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_10 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-011",
    "domain": "hr",
    "level": 3,
    "order": 11,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_11_low PARTITION OF attendance_logs_part_11 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_11_high PARTITION OF attendance_logs_part_11 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_11 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_11;",
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
    "id": "hr-L3-012",
    "domain": "hr",
    "level": 3,
    "order": 12,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_12() and bind trigger trg_audit_locations_12 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_12(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_12() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_12 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_12(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-013",
    "domain": "hr",
    "level": 3,
    "order": 13,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-014",
    "domain": "hr",
    "level": 3,
    "order": 14,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_14 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_14 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_14 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-015",
    "domain": "hr",
    "level": 3,
    "order": 15,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-016",
    "domain": "hr",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-017",
    "domain": "hr",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_17 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_17 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_17 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-018",
    "domain": "hr",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-019",
    "domain": "hr",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_19(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_19(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_19(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_19(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-020",
    "domain": "hr",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-021",
    "domain": "hr",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-022",
    "domain": "hr",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_22 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_22 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-023",
    "domain": "hr",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_23_low PARTITION OF attendance_logs_part_23 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_23_high PARTITION OF attendance_logs_part_23 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_23 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_23;",
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
    "id": "hr-L3-024",
    "domain": "hr",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_24() and bind trigger trg_audit_locations_24 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_24(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_24() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_24 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_24(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-025",
    "domain": "hr",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-026",
    "domain": "hr",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_26 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_26 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_26 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-027",
    "domain": "hr",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-028",
    "domain": "hr",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-029",
    "domain": "hr",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_29 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_29 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_29 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-030",
    "domain": "hr",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-031",
    "domain": "hr",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_31(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_31(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_31(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_31(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-032",
    "domain": "hr",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-033",
    "domain": "hr",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-034",
    "domain": "hr",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_34 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_34 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-035",
    "domain": "hr",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_35_low PARTITION OF attendance_logs_part_35 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_35_high PARTITION OF attendance_logs_part_35 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_35 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_35;",
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
    "id": "hr-L3-036",
    "domain": "hr",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_36() and bind trigger trg_audit_locations_36 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_36(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_36() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_36 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_36(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-037",
    "domain": "hr",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-038",
    "domain": "hr",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_38 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_38 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_38 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-039",
    "domain": "hr",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-040",
    "domain": "hr",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-041",
    "domain": "hr",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_41 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_41 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_41 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-042",
    "domain": "hr",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-043",
    "domain": "hr",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_43(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_43(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_43(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_43(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-044",
    "domain": "hr",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-045",
    "domain": "hr",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-046",
    "domain": "hr",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_46 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_46 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-047",
    "domain": "hr",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_47_low PARTITION OF attendance_logs_part_47 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_47_high PARTITION OF attendance_logs_part_47 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_47 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_47;",
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
    "id": "hr-L3-048",
    "domain": "hr",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_48() and bind trigger trg_audit_locations_48 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_48(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_48() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_48 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_48(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L3-049",
    "domain": "hr",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-050",
    "domain": "hr",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_50 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_50 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_50 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-051",
    "domain": "hr",
    "level": 3,
    "order": 51,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-052",
    "domain": "hr",
    "level": 3,
    "order": 52,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-053",
    "domain": "hr",
    "level": 3,
    "order": 53,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_53 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_53 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_53 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-054",
    "domain": "hr",
    "level": 3,
    "order": 54,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-055",
    "domain": "hr",
    "level": 3,
    "order": 55,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_55(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_55(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_55(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_55(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-056",
    "domain": "hr",
    "level": 3,
    "order": 56,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-057",
    "domain": "hr",
    "level": 3,
    "order": 57,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-058",
    "domain": "hr",
    "level": 3,
    "order": 58,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_58 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_58 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-059",
    "domain": "hr",
    "level": 3,
    "order": 59,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_59_low PARTITION OF attendance_logs_part_59 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_59_high PARTITION OF attendance_logs_part_59 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_59 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_59;",
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
    "id": "hr-L3-060",
    "domain": "hr",
    "level": 3,
    "order": 60,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_60() and bind trigger trg_audit_locations_60 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_60(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_60() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_60 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_60(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-061",
    "domain": "hr",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-062",
    "domain": "hr",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_62 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_62 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_62 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-063",
    "domain": "hr",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-064",
    "domain": "hr",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-065",
    "domain": "hr",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_65 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_65 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_65 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-066",
    "domain": "hr",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-067",
    "domain": "hr",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_67(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_67(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_67(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_67(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-068",
    "domain": "hr",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-069",
    "domain": "hr",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-070",
    "domain": "hr",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_70 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_70 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-071",
    "domain": "hr",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_71_low PARTITION OF attendance_logs_part_71 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_71_high PARTITION OF attendance_logs_part_71 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_71 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_71;",
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
    "id": "hr-L3-072",
    "domain": "hr",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_72() and bind trigger trg_audit_locations_72 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_72(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_72() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_72 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_72(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-073",
    "domain": "hr",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-074",
    "domain": "hr",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_74 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_74 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_74 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-075",
    "domain": "hr",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-076",
    "domain": "hr",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-077",
    "domain": "hr",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_77 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_77 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_77 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-078",
    "domain": "hr",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-079",
    "domain": "hr",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_79(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_79(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_79(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_79(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-080",
    "domain": "hr",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-081",
    "domain": "hr",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-082",
    "domain": "hr",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_82 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_82 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-083",
    "domain": "hr",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_83_low PARTITION OF attendance_logs_part_83 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_83_high PARTITION OF attendance_logs_part_83 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_83 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_83;",
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
    "id": "hr-L3-084",
    "domain": "hr",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_84() and bind trigger trg_audit_locations_84 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_84(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_84() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_84 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_84(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-085",
    "domain": "hr",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-086",
    "domain": "hr",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_86 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_86 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_86 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-087",
    "domain": "hr",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-088",
    "domain": "hr",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-089",
    "domain": "hr",
    "level": 3,
    "order": 89,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Ticket: Ingest and cleanse active records from locations. Create a Temporary Staging Table named temp_locations_cln_89 containing id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount where office_name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_cln_89 AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(ROUND(capacity * 1.08, 2), 0.00) AS adjusted_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_locations_cln_89 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "hr-L3-090",
    "domain": "hr",
    "level": 3,
    "order": 90,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in attendance_logs. Run an EXPLAIN (FORMAT JSON) on a query selecting id and hours_worked from attendance_logs where hours_worked > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 25;",
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
    "id": "hr-L3-091",
    "domain": "hr",
    "level": 3,
    "order": 91,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_locations_91(p_id INT, p_val NUMERIC) that updates capacity by adding p_val for the specified id. Execute with CALL sp_reconcile_locations_91(1, 10); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_locations_91(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_locations_91(1, 10); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L3-092",
    "domain": "hr",
    "level": 3,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM departments WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) and filter with WHERE name IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-093",
    "domain": "hr",
    "level": 3,
    "order": 93,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in job_roles. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM job_roles t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L3-094",
    "domain": "hr",
    "level": 3,
    "order": 94,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"ALERT: The dashboard query on attendance_logs is causing severe CPU spikes. Create a composite index named idx_attendance_logs_opt_94 ON attendance_logs(id, hours_worked DESC). Then retrieve id, work_mode, hours_worked where hours_worked > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "work_mode",
      "hours_worked"
    ],
    "reference_sql": "CREATE INDEX idx_attendance_logs_opt_94 ON attendance_logs(id, hours_worked DESC); SELECT id, work_mode, hours_worked FROM attendance_logs WHERE hours_worked > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-095",
    "domain": "hr",
    "level": 3,
    "order": 95,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Directive: Ledger attendance_logs is reaching multi-gigabyte scale. Create a partitioned table named attendance_logs_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE attendance_logs_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE attendance_logs_part_95_low PARTITION OF attendance_logs_part_95 FOR VALUES FROM (0) TO (100); CREATE TABLE attendance_logs_part_95_high PARTITION OF attendance_logs_part_95 FOR VALUES FROM (100) TO (100000); INSERT INTO attendance_logs_part_95 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM attendance_logs_part_95;",
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
    "id": "hr-L3-096",
    "domain": "hr",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compliance Officer Directive: Create an event trigger on locations to monitor record mutations. Define function fn_audit_locations_96() and bind trigger trg_audit_locations_96 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_96(). Then select id, office_name, capacity from locations ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_locations_96() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_locations_96 BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION fn_audit_locations_96(); SELECT id, office_name, capacity FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query locations."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L3-097",
    "domain": "hr",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in locations, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, office_name, and ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, office_name, ROUND((capacity / NULLIF(COALESCE(capacity, 1), 0))::numeric, 2) AS index_ratio FROM locations ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-098",
    "domain": "hr",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_98 joining departments and job_roles on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.job_title, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_98 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.job_title, 'None') AS secondary_name FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_98 ORDER BY id ASC LIMIT 20;",
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
    "id": "hr-L3-099",
    "domain": "hr",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive Memo: Segment records in locations into 4 analytical quartiles based on capacity using NTILE(4) within a CTE named cohort_analysis. Return id, office_name, capacity, and quartile ordered by quartile ASC, capacity DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, office_name, capacity, NTILE(4) OVER (ORDER BY capacity DESC) AS quartile FROM locations) SELECT id, office_name, capacity, quartile FROM cohort_analysis ORDER BY quartile ASC, capacity DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY capacity DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L3-100",
    "domain": "hr",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Financial Growth Memo: In attendance_logs, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount, LEAD(hours_worked) OVER (ORDER BY id ASC) AS next_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
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
