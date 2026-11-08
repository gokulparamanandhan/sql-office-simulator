import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L3-001",
    "domain": "restaurants",
    "level": 3,
    "order": 1,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-002",
    "domain": "restaurants",
    "level": 3,
    "order": 2,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_2 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_2 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_2 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-003",
    "domain": "restaurants",
    "level": 3,
    "order": 3,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-004",
    "domain": "restaurants",
    "level": 3,
    "order": 4,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-005",
    "domain": "restaurants",
    "level": 3,
    "order": 5,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_5 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_5 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_5 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-006",
    "domain": "restaurants",
    "level": 3,
    "order": 6,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-007",
    "domain": "restaurants",
    "level": 3,
    "order": 7,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_7(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_7(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_7(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_7(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-008",
    "domain": "restaurants",
    "level": 3,
    "order": 8,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-009",
    "domain": "restaurants",
    "level": 3,
    "order": 9,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-010",
    "domain": "restaurants",
    "level": 3,
    "order": 10,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_10 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_10 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-011",
    "domain": "restaurants",
    "level": 3,
    "order": 11,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_11_low PARTITION OF orders_part_11 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_11_high PARTITION OF orders_part_11 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_11 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_11;",
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
    "id": "rest-L3-012",
    "domain": "restaurants",
    "level": 3,
    "order": 12,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_12() and bind trigger trg_audit_menu_items_12 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_12(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_12() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_12 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_12(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-013",
    "domain": "restaurants",
    "level": 3,
    "order": 13,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-014",
    "domain": "restaurants",
    "level": 3,
    "order": 14,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_14 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_14 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_14 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-015",
    "domain": "restaurants",
    "level": 3,
    "order": 15,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-016",
    "domain": "restaurants",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-017",
    "domain": "restaurants",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_17 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_17 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_17 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-018",
    "domain": "restaurants",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-019",
    "domain": "restaurants",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_19(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_19(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_19(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_19(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-020",
    "domain": "restaurants",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-021",
    "domain": "restaurants",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-022",
    "domain": "restaurants",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_22 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_22 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-023",
    "domain": "restaurants",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_23_low PARTITION OF orders_part_23 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_23_high PARTITION OF orders_part_23 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_23 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_23;",
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
    "id": "rest-L3-024",
    "domain": "restaurants",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_24() and bind trigger trg_audit_menu_items_24 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_24(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_24() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_24 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_24(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-025",
    "domain": "restaurants",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-026",
    "domain": "restaurants",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_26 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_26 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_26 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-027",
    "domain": "restaurants",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-028",
    "domain": "restaurants",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-029",
    "domain": "restaurants",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_29 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_29 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_29 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-030",
    "domain": "restaurants",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-031",
    "domain": "restaurants",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_31(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_31(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_31(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_31(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-032",
    "domain": "restaurants",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-033",
    "domain": "restaurants",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-034",
    "domain": "restaurants",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_34 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_34 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-035",
    "domain": "restaurants",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_35_low PARTITION OF orders_part_35 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_35_high PARTITION OF orders_part_35 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_35 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_35;",
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
    "id": "rest-L3-036",
    "domain": "restaurants",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_36() and bind trigger trg_audit_menu_items_36 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_36(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_36() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_36 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_36(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-037",
    "domain": "restaurants",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-038",
    "domain": "restaurants",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_38 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_38 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_38 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-039",
    "domain": "restaurants",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-040",
    "domain": "restaurants",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-041",
    "domain": "restaurants",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_41 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_41 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_41 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-042",
    "domain": "restaurants",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-043",
    "domain": "restaurants",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_43(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_43(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_43(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_43(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-044",
    "domain": "restaurants",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-045",
    "domain": "restaurants",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-046",
    "domain": "restaurants",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_46 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_46 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-047",
    "domain": "restaurants",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_47_low PARTITION OF orders_part_47 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_47_high PARTITION OF orders_part_47 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_47 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_47;",
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
    "id": "rest-L3-048",
    "domain": "restaurants",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_48() and bind trigger trg_audit_menu_items_48 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_48(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_48() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_48 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_48(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-049",
    "domain": "restaurants",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-050",
    "domain": "restaurants",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_50 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_50 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_50 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-051",
    "domain": "restaurants",
    "level": 3,
    "order": 51,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-052",
    "domain": "restaurants",
    "level": 3,
    "order": 52,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-053",
    "domain": "restaurants",
    "level": 3,
    "order": 53,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_53 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_53 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_53 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-054",
    "domain": "restaurants",
    "level": 3,
    "order": 54,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-055",
    "domain": "restaurants",
    "level": 3,
    "order": 55,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_55(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_55(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_55(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_55(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-056",
    "domain": "restaurants",
    "level": 3,
    "order": 56,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-057",
    "domain": "restaurants",
    "level": 3,
    "order": 57,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-058",
    "domain": "restaurants",
    "level": 3,
    "order": 58,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_58 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_58 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-059",
    "domain": "restaurants",
    "level": 3,
    "order": 59,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_59_low PARTITION OF orders_part_59 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_59_high PARTITION OF orders_part_59 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_59 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_59;",
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
    "id": "rest-L3-060",
    "domain": "restaurants",
    "level": 3,
    "order": 60,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_60() and bind trigger trg_audit_menu_items_60 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_60(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_60() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_60 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_60(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-061",
    "domain": "restaurants",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-062",
    "domain": "restaurants",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_62 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_62 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_62 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-063",
    "domain": "restaurants",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-064",
    "domain": "restaurants",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-065",
    "domain": "restaurants",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_65 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_65 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_65 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-066",
    "domain": "restaurants",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-067",
    "domain": "restaurants",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_67(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_67(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_67(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_67(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-068",
    "domain": "restaurants",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-069",
    "domain": "restaurants",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-070",
    "domain": "restaurants",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_70 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_70 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-071",
    "domain": "restaurants",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_71_low PARTITION OF orders_part_71 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_71_high PARTITION OF orders_part_71 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_71 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_71;",
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
    "id": "rest-L3-072",
    "domain": "restaurants",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_72() and bind trigger trg_audit_menu_items_72 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_72(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_72() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_72 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_72(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-073",
    "domain": "restaurants",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-074",
    "domain": "restaurants",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_74 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_74 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_74 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-075",
    "domain": "restaurants",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-076",
    "domain": "restaurants",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-077",
    "domain": "restaurants",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_77 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_77 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_77 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-078",
    "domain": "restaurants",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-079",
    "domain": "restaurants",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_79(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_79(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_79(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_79(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-080",
    "domain": "restaurants",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-081",
    "domain": "restaurants",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-082",
    "domain": "restaurants",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_82 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_82 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-083",
    "domain": "restaurants",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_83_low PARTITION OF orders_part_83 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_83_high PARTITION OF orders_part_83 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_83 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_83;",
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
    "id": "rest-L3-084",
    "domain": "restaurants",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_84() and bind trigger trg_audit_menu_items_84 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_84(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_84() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_84 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_84(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-085",
    "domain": "restaurants",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-086",
    "domain": "restaurants",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_86 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_86 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_86 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-087",
    "domain": "restaurants",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-088",
    "domain": "restaurants",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L3-089",
    "domain": "restaurants",
    "level": 3,
    "order": 89,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_89 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_89 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_89 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L3-090",
    "domain": "restaurants",
    "level": 3,
    "order": 90,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L3-091",
    "domain": "restaurants",
    "level": 3,
    "order": 91,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_91(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_91(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_91(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_91(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L3-092",
    "domain": "restaurants",
    "level": 3,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM restaurants WHERE name IS NOT NULL ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-093",
    "domain": "restaurants",
    "level": 3,
    "order": 93,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.id, t1.name FROM restaurants t1 WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM dining_sections t2 WHERE t2.restaurant_id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-094",
    "domain": "restaurants",
    "level": 3,
    "order": 94,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_94 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "CREATE INDEX idx_orders_opt_94 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-095",
    "domain": "restaurants",
    "level": 3,
    "order": 95,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_95_low PARTITION OF orders_part_95 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_95_high PARTITION OF orders_part_95 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_95 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_95;",
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
    "id": "rest-L3-096",
    "domain": "restaurants",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_96() and bind trigger trg_audit_menu_items_96 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_96(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_96() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_96 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_96(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query menu_items."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "rest-L3-097",
    "domain": "restaurants",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name, ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-098",
    "domain": "restaurants",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_98 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_98 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_98 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L3-099",
    "domain": "restaurants",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name, price, NTILE(4) OVER (ORDER BY price DESC) AS quartile FROM menu_items) SELECT id, name, price, quartile FROM cohort_analysis ORDER BY quartile ASC, price DESC LIMIT 25;",
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
    "id": "rest-L3-100",
    "domain": "restaurants",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
  }
];
