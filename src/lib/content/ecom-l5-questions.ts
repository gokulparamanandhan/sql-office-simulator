import { QuestionDefinition } from "./ecom-l1-questions";

export const ECOM_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L5-001",
    "domain": "ecommerce",
    "level": 5,
    "order": 1,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-002",
    "domain": "ecommerce",
    "level": 5,
    "order": 2,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-003",
    "domain": "ecommerce",
    "level": 5,
    "order": 3,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_3 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_3 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_3 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-004",
    "domain": "ecommerce",
    "level": 5,
    "order": 4,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-005",
    "domain": "ecommerce",
    "level": 5,
    "order": 5,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_5(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_5(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_5(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_5(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-006",
    "domain": "ecommerce",
    "level": 5,
    "order": 6,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-007",
    "domain": "ecommerce",
    "level": 5,
    "order": 7,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-008",
    "domain": "ecommerce",
    "level": 5,
    "order": 8,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_8 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_8 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-009",
    "domain": "ecommerce",
    "level": 5,
    "order": 9,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_9 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_9 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_9_low PARTITION OF orders_part_9 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_9_high PARTITION OF orders_part_9 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_9 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_9;",
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
    "id": "ecom-L5-010",
    "domain": "ecommerce",
    "level": 5,
    "order": 10,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_10() and bind trigger trg_audit_products_10 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_10(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_10() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_10 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_10(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-011",
    "domain": "ecommerce",
    "level": 5,
    "order": 11,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-012",
    "domain": "ecommerce",
    "level": 5,
    "order": 12,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_12 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_12 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_12 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-013",
    "domain": "ecommerce",
    "level": 5,
    "order": 13,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-014",
    "domain": "ecommerce",
    "level": 5,
    "order": 14,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-015",
    "domain": "ecommerce",
    "level": 5,
    "order": 15,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_15 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_15 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_15 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-016",
    "domain": "ecommerce",
    "level": 5,
    "order": 16,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-017",
    "domain": "ecommerce",
    "level": 5,
    "order": 17,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_17(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_17(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_17(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_17(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-018",
    "domain": "ecommerce",
    "level": 5,
    "order": 18,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-019",
    "domain": "ecommerce",
    "level": 5,
    "order": 19,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-020",
    "domain": "ecommerce",
    "level": 5,
    "order": 20,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_20 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_20 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-021",
    "domain": "ecommerce",
    "level": 5,
    "order": 21,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_21 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_21 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_21_low PARTITION OF orders_part_21 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_21_high PARTITION OF orders_part_21 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_21 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_21;",
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
    "id": "ecom-L5-022",
    "domain": "ecommerce",
    "level": 5,
    "order": 22,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_22() and bind trigger trg_audit_products_22 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_22(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_22() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_22 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_22(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-023",
    "domain": "ecommerce",
    "level": 5,
    "order": 23,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-024",
    "domain": "ecommerce",
    "level": 5,
    "order": 24,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_24 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_24 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_24 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-025",
    "domain": "ecommerce",
    "level": 5,
    "order": 25,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L5-026",
    "domain": "ecommerce",
    "level": 5,
    "order": 26,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-027",
    "domain": "ecommerce",
    "level": 5,
    "order": 27,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_27 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_27 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_27 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-028",
    "domain": "ecommerce",
    "level": 5,
    "order": 28,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-029",
    "domain": "ecommerce",
    "level": 5,
    "order": 29,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_29(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_29(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_29(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_29(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-030",
    "domain": "ecommerce",
    "level": 5,
    "order": 30,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-031",
    "domain": "ecommerce",
    "level": 5,
    "order": 31,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-032",
    "domain": "ecommerce",
    "level": 5,
    "order": 32,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_32 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_32 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-033",
    "domain": "ecommerce",
    "level": 5,
    "order": 33,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_33 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_33 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_33_low PARTITION OF orders_part_33 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_33_high PARTITION OF orders_part_33 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_33 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_33;",
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
    "id": "ecom-L5-034",
    "domain": "ecommerce",
    "level": 5,
    "order": 34,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_34() and bind trigger trg_audit_products_34 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_34(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_34() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_34 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_34(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-035",
    "domain": "ecommerce",
    "level": 5,
    "order": 35,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-036",
    "domain": "ecommerce",
    "level": 5,
    "order": 36,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_36 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_36 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_36 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-037",
    "domain": "ecommerce",
    "level": 5,
    "order": 37,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-038",
    "domain": "ecommerce",
    "level": 5,
    "order": 38,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-039",
    "domain": "ecommerce",
    "level": 5,
    "order": 39,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_39 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_39 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_39 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-040",
    "domain": "ecommerce",
    "level": 5,
    "order": 40,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-041",
    "domain": "ecommerce",
    "level": 5,
    "order": 41,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_41(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_41(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_41(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_41(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-042",
    "domain": "ecommerce",
    "level": 5,
    "order": 42,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-043",
    "domain": "ecommerce",
    "level": 5,
    "order": 43,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-044",
    "domain": "ecommerce",
    "level": 5,
    "order": 44,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_44 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_44 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-045",
    "domain": "ecommerce",
    "level": 5,
    "order": 45,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_45 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_45 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_45_low PARTITION OF orders_part_45 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_45_high PARTITION OF orders_part_45 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_45 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_45;",
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
    "id": "ecom-L5-046",
    "domain": "ecommerce",
    "level": 5,
    "order": 46,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_46() and bind trigger trg_audit_products_46 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_46(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_46() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_46 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_46(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-047",
    "domain": "ecommerce",
    "level": 5,
    "order": 47,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-048",
    "domain": "ecommerce",
    "level": 5,
    "order": 48,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_48 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_48 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_48 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-049",
    "domain": "ecommerce",
    "level": 5,
    "order": 49,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-050",
    "domain": "ecommerce",
    "level": 5,
    "order": 50,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-051",
    "domain": "ecommerce",
    "level": 5,
    "order": 51,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_51 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_51 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_51 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-052",
    "domain": "ecommerce",
    "level": 5,
    "order": 52,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-053",
    "domain": "ecommerce",
    "level": 5,
    "order": 53,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_53(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_53(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_53(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_53(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-054",
    "domain": "ecommerce",
    "level": 5,
    "order": 54,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-055",
    "domain": "ecommerce",
    "level": 5,
    "order": 55,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-056",
    "domain": "ecommerce",
    "level": 5,
    "order": 56,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_56 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_56 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-057",
    "domain": "ecommerce",
    "level": 5,
    "order": 57,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_57 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_57 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_57_low PARTITION OF orders_part_57 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_57_high PARTITION OF orders_part_57 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_57 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_57;",
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
    "id": "ecom-L5-058",
    "domain": "ecommerce",
    "level": 5,
    "order": 58,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_58() and bind trigger trg_audit_products_58 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_58(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_58() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_58 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_58(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-059",
    "domain": "ecommerce",
    "level": 5,
    "order": 59,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-060",
    "domain": "ecommerce",
    "level": 5,
    "order": 60,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_60 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_60 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_60 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-061",
    "domain": "ecommerce",
    "level": 5,
    "order": 61,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-062",
    "domain": "ecommerce",
    "level": 5,
    "order": 62,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-063",
    "domain": "ecommerce",
    "level": 5,
    "order": 63,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_63 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_63 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_63 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-064",
    "domain": "ecommerce",
    "level": 5,
    "order": 64,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-065",
    "domain": "ecommerce",
    "level": 5,
    "order": 65,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_65(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_65(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_65(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_65(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-066",
    "domain": "ecommerce",
    "level": 5,
    "order": 66,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-067",
    "domain": "ecommerce",
    "level": 5,
    "order": 67,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-068",
    "domain": "ecommerce",
    "level": 5,
    "order": 68,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_68 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_68 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-069",
    "domain": "ecommerce",
    "level": 5,
    "order": 69,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_69 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_69 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_69_low PARTITION OF orders_part_69 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_69_high PARTITION OF orders_part_69 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_69 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_69;",
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
    "id": "ecom-L5-070",
    "domain": "ecommerce",
    "level": 5,
    "order": 70,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_70() and bind trigger trg_audit_products_70 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_70(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_70() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_70 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_70(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-071",
    "domain": "ecommerce",
    "level": 5,
    "order": 71,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-072",
    "domain": "ecommerce",
    "level": 5,
    "order": 72,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_72 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_72 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_72 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-073",
    "domain": "ecommerce",
    "level": 5,
    "order": 73,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-074",
    "domain": "ecommerce",
    "level": 5,
    "order": 74,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-075",
    "domain": "ecommerce",
    "level": 5,
    "order": 75,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_75 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_75 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_75 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-076",
    "domain": "ecommerce",
    "level": 5,
    "order": 76,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-077",
    "domain": "ecommerce",
    "level": 5,
    "order": 77,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_77(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_77(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_77(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_77(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-078",
    "domain": "ecommerce",
    "level": 5,
    "order": 78,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-079",
    "domain": "ecommerce",
    "level": 5,
    "order": 79,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-080",
    "domain": "ecommerce",
    "level": 5,
    "order": 80,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_80 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_80 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-081",
    "domain": "ecommerce",
    "level": 5,
    "order": 81,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_81 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_81 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_81_low PARTITION OF orders_part_81 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_81_high PARTITION OF orders_part_81 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_81 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_81;",
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
    "id": "ecom-L5-082",
    "domain": "ecommerce",
    "level": 5,
    "order": 82,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_82() and bind trigger trg_audit_products_82 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_82(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_82() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_82 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_82(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-083",
    "domain": "ecommerce",
    "level": 5,
    "order": 83,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-084",
    "domain": "ecommerce",
    "level": 5,
    "order": 84,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_84 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_84 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_84 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-085",
    "domain": "ecommerce",
    "level": 5,
    "order": 85,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L5-086",
    "domain": "ecommerce",
    "level": 5,
    "order": 86,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-087",
    "domain": "ecommerce",
    "level": 5,
    "order": 87,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_87 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_87 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_87 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-088",
    "domain": "ecommerce",
    "level": 5,
    "order": 88,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
    "id": "ecom-L5-089",
    "domain": "ecommerce",
    "level": 5,
    "order": 89,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_products_89(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_products_89(1, 10); then select id, name, price from products where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_products_89(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_products_89(1, 10); SELECT id, name, price FROM products WHERE id = 1;",
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
    "id": "ecom-L5-090",
    "domain": "ecommerce",
    "level": 5,
    "order": 90,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Data Quality Alert: Standardize legacy text fields in departments. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from departments where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "ecom-L5-091",
    "domain": "ecommerce",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Audit Discrepancy: Identify all departments entries that have active corresponding associations in categories. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM departments t1 WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM categories t2 WHERE t2.department_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "ecom-L5-092",
    "domain": "ecommerce",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_92 ON orders(id, total_amount DESC). Then retrieve id, status, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "status",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_92 ON orders(id, total_amount DESC); SELECT id, status, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the composite index first, then execute the SELECT query."
    ],
    "solution_explanation": "Eliminates slow sequential scans during high-concurrency production load.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "ecom-L5-093",
    "domain": "ecommerce",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_93 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_93 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_93_low PARTITION OF orders_part_93 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_93_high PARTITION OF orders_part_93 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_93 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_93;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the master table PARTITION BY RANGE, create child partition tables, insert, and select."
    ],
    "solution_explanation": "Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "ecom-L5-094",
    "domain": "ecommerce",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Compliance Officer Directive: Create an event trigger on products to monitor record mutations. Define function fn_audit_products_94() and bind trigger trg_audit_products_94 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_94(). Then select id, name, price from products ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_products_94() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_products_94 BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION fn_audit_products_94(); SELECT id, name, price FROM products ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query products."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "ecom-L5-095",
    "domain": "ecommerce",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in products, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "name",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM products ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-096",
    "domain": "ecommerce",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_departments_96 joining departments and categories on t1.id = t2.department_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_departments_96 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.name, 'None') AS secondary_name FROM departments t1 JOIN categories t2 ON t1.id = t2.department_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_departments_96 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-097",
    "domain": "ecommerce",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"Executive Memo: Segment records in products into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "price",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM products) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY price DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "ecom-L5-098",
    "domain": "ecommerce",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Marketing",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Marketing)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount FROM orders ORDER BY id ASC LIMIT 20;",
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
  },
  {
    "id": "ecom-L5-099",
    "domain": "ecommerce",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"Data Quality Ticket: Ingest and cleanse active records from products. Create a Temporary Staging Table named temp_products_cln_99 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_cln_99 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM products WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_products_cln_99 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "ecom-L5-100",
    "domain": "ecommerce",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 25;",
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
  }
];
