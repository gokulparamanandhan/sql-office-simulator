import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L4-001",
    "domain": "restaurants",
    "level": 4,
    "order": 1,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-002",
    "domain": "restaurants",
    "level": 4,
    "order": 2,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-003",
    "domain": "restaurants",
    "level": 4,
    "order": 3,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_3 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_3 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-004",
    "domain": "restaurants",
    "level": 4,
    "order": 4,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_4 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_4 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_4_low PARTITION OF orders_part_4 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_4_high PARTITION OF orders_part_4 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_4 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_4;",
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
    "id": "rest-L4-005",
    "domain": "restaurants",
    "level": 4,
    "order": 5,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_5() and bind trigger trg_audit_menu_items_5 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_5(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_5() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_5 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_5(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-006",
    "domain": "restaurants",
    "level": 4,
    "order": 6,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-007",
    "domain": "restaurants",
    "level": 4,
    "order": 7,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_7 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_7 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_7 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-008",
    "domain": "restaurants",
    "level": 4,
    "order": 8,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-009",
    "domain": "restaurants",
    "level": 4,
    "order": 9,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-010",
    "domain": "restaurants",
    "level": 4,
    "order": 10,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_10 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_10 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_10 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-011",
    "domain": "restaurants",
    "level": 4,
    "order": 11,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-012",
    "domain": "restaurants",
    "level": 4,
    "order": 12,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_12(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_12(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_12(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_12(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-013",
    "domain": "restaurants",
    "level": 4,
    "order": 13,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-014",
    "domain": "restaurants",
    "level": 4,
    "order": 14,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-015",
    "domain": "restaurants",
    "level": 4,
    "order": 15,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_15 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_15 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-016",
    "domain": "restaurants",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_16 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_16 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_16_low PARTITION OF orders_part_16 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_16_high PARTITION OF orders_part_16 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_16 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_16;",
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
    "id": "rest-L4-017",
    "domain": "restaurants",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_17() and bind trigger trg_audit_menu_items_17 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_17(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_17() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_17 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_17(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-018",
    "domain": "restaurants",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-019",
    "domain": "restaurants",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_19 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_19 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_19 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-020",
    "domain": "restaurants",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-021",
    "domain": "restaurants",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-022",
    "domain": "restaurants",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_22 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_22 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_22 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-023",
    "domain": "restaurants",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-024",
    "domain": "restaurants",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_24(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_24(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_24(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_24(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-025",
    "domain": "restaurants",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-026",
    "domain": "restaurants",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-027",
    "domain": "restaurants",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_27 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_27 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-028",
    "domain": "restaurants",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_28 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_28 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_28_low PARTITION OF orders_part_28 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_28_high PARTITION OF orders_part_28 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_28 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_28;",
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
    "id": "rest-L4-029",
    "domain": "restaurants",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_29() and bind trigger trg_audit_menu_items_29 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_29(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_29() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_29 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_29(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-030",
    "domain": "restaurants",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-031",
    "domain": "restaurants",
    "level": 4,
    "order": 31,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_31 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_31 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_31 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-032",
    "domain": "restaurants",
    "level": 4,
    "order": 32,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-033",
    "domain": "restaurants",
    "level": 4,
    "order": 33,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-034",
    "domain": "restaurants",
    "level": 4,
    "order": 34,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_34 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_34 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_34 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-035",
    "domain": "restaurants",
    "level": 4,
    "order": 35,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-036",
    "domain": "restaurants",
    "level": 4,
    "order": 36,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_36(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_36(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_36(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_36(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-037",
    "domain": "restaurants",
    "level": 4,
    "order": 37,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-038",
    "domain": "restaurants",
    "level": 4,
    "order": 38,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-039",
    "domain": "restaurants",
    "level": 4,
    "order": 39,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_39 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_39 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-040",
    "domain": "restaurants",
    "level": 4,
    "order": 40,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_40 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_40 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_40_low PARTITION OF orders_part_40 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_40_high PARTITION OF orders_part_40 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_40 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_40;",
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
    "id": "rest-L4-041",
    "domain": "restaurants",
    "level": 4,
    "order": 41,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_41() and bind trigger trg_audit_menu_items_41 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_41(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_41() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_41 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_41(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-042",
    "domain": "restaurants",
    "level": 4,
    "order": 42,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-043",
    "domain": "restaurants",
    "level": 4,
    "order": 43,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_43 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_43 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_43 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-044",
    "domain": "restaurants",
    "level": 4,
    "order": 44,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-045",
    "domain": "restaurants",
    "level": 4,
    "order": 45,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-046",
    "domain": "restaurants",
    "level": 4,
    "order": 46,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_46 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_46 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_46 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-047",
    "domain": "restaurants",
    "level": 4,
    "order": 47,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-048",
    "domain": "restaurants",
    "level": 4,
    "order": 48,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_48(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_48(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_48(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_48(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-049",
    "domain": "restaurants",
    "level": 4,
    "order": 49,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-050",
    "domain": "restaurants",
    "level": 4,
    "order": 50,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-051",
    "domain": "restaurants",
    "level": 4,
    "order": 51,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_51 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_51 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-052",
    "domain": "restaurants",
    "level": 4,
    "order": 52,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_52 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_52 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_52_low PARTITION OF orders_part_52 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_52_high PARTITION OF orders_part_52 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_52 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_52;",
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
    "id": "rest-L4-053",
    "domain": "restaurants",
    "level": 4,
    "order": 53,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_53() and bind trigger trg_audit_menu_items_53 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_53(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_53() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_53 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_53(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-054",
    "domain": "restaurants",
    "level": 4,
    "order": 54,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-055",
    "domain": "restaurants",
    "level": 4,
    "order": 55,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_55 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_55 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_55 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-056",
    "domain": "restaurants",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-057",
    "domain": "restaurants",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-058",
    "domain": "restaurants",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_58 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_58 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_58 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-059",
    "domain": "restaurants",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-060",
    "domain": "restaurants",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_60(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_60(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_60(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_60(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-061",
    "domain": "restaurants",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-062",
    "domain": "restaurants",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-063",
    "domain": "restaurants",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_63 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_63 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-064",
    "domain": "restaurants",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_64 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_64 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_64_low PARTITION OF orders_part_64 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_64_high PARTITION OF orders_part_64 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_64 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_64;",
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
    "id": "rest-L4-065",
    "domain": "restaurants",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_65() and bind trigger trg_audit_menu_items_65 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_65(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_65() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_65 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_65(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-066",
    "domain": "restaurants",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-067",
    "domain": "restaurants",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_67 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_67 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_67 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-068",
    "domain": "restaurants",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-069",
    "domain": "restaurants",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-070",
    "domain": "restaurants",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_70 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_70 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_70 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-071",
    "domain": "restaurants",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-072",
    "domain": "restaurants",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_72(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_72(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_72(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_72(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-073",
    "domain": "restaurants",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-074",
    "domain": "restaurants",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-075",
    "domain": "restaurants",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_75 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_75 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-076",
    "domain": "restaurants",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_76 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_76 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_76_low PARTITION OF orders_part_76 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_76_high PARTITION OF orders_part_76 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_76 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_76;",
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
    "id": "rest-L4-077",
    "domain": "restaurants",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_77() and bind trigger trg_audit_menu_items_77 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_77(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_77() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_77 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_77(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-078",
    "domain": "restaurants",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-079",
    "domain": "restaurants",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_79 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_79 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_79 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-080",
    "domain": "restaurants",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-081",
    "domain": "restaurants",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-082",
    "domain": "restaurants",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_82 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_82 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_82 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-083",
    "domain": "restaurants",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "rest-L4-084",
    "domain": "restaurants",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_84(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_84(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_84(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_84(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-085",
    "domain": "restaurants",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-086",
    "domain": "restaurants",
    "level": 4,
    "order": 86,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-087",
    "domain": "restaurants",
    "level": 4,
    "order": 87,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_87 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_87 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-088",
    "domain": "restaurants",
    "level": 4,
    "order": 88,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_88 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_88 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_88_low PARTITION OF orders_part_88 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_88_high PARTITION OF orders_part_88 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_88 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_88;",
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
    "id": "rest-L4-089",
    "domain": "restaurants",
    "level": 4,
    "order": 89,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compliance Officer Directive: Create an event trigger on menu_items to monitor record mutations. Define function fn_audit_menu_items_89() and bind trigger trg_audit_menu_items_89 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_89(). Then select id, name, price from menu_items ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_menu_items_89() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_menu_items_89 BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION fn_audit_menu_items_89(); SELECT id, name, price FROM menu_items ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-090",
    "domain": "restaurants",
    "level": 4,
    "order": 90,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Metrics Audit: When calculating performance ratios in menu_items, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, name, and ROUND((price / NULLIF(COALESCE(price, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-091",
    "domain": "restaurants",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_restaurants_91 joining restaurants and dining_sections on t1.id = t2.restaurant_id. Project t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, and COALESCE(t2.section_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_restaurants_91 AS SELECT t1.id, COALESCE(t1.name, 'Unassigned') AS primary_name, COALESCE(t2.section_name, 'None') AS secondary_name FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id; SELECT id, primary_name, secondary_name FROM v_exec_summary_restaurants_91 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-092",
    "domain": "restaurants",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive Memo: Segment records in menu_items into 4 analytical quartiles based on price using NTILE(4) within a CTE named cohort_analysis. Return id, name, price, and quartile ordered by quartile ASC, price DESC. (Limit to 25 records).\"",
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
    "id": "rest-L4-093",
    "domain": "restaurants",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Financial Growth Memo: In orders, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(total_amount) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "rest-L4-094",
    "domain": "restaurants",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: Ingest and cleanse active records from menu_items. Create a Temporary Staging Table named temp_menu_items_cln_94 containing id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount where name IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_cln_94 AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(ROUND(price * 1.08, 2), 0.00) AS adjusted_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_menu_items_cln_94 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "rest-L4-095",
    "domain": "restaurants",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in orders. Run an EXPLAIN (FORMAT JSON) on a query selecting id and total_amount from orders where total_amount > 25 to inspect execution cost and planned access nodes.\"",
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
  },
  {
    "id": "rest-L4-096",
    "domain": "restaurants",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_menu_items_96(p_id INT, p_val NUMERIC) that updates price by adding p_val for the specified id. Execute with CALL sp_reconcile_menu_items_96(1, 10); then select id, name, price from menu_items where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_menu_items_96(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_menu_items_96(1, 10); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L4-097",
    "domain": "restaurants",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Alert: Standardize legacy text fields in restaurants. Select id, UPPER(TRIM(name)) AS standardized_title, and COALESCE(id, 0) AS safe_code from restaurants where name IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "rest-L4-098",
    "domain": "restaurants",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Discrepancy: Identify all restaurants entries that have active corresponding associations in dining_sections. Using a Correlated Subquery with EXISTS, return t1.id and t1.name ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "rest-L4-099",
    "domain": "restaurants",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"ALERT: The dashboard query on orders is causing severe CPU spikes. Create a composite index named idx_orders_opt_99 ON orders(id, total_amount DESC). Then retrieve id, server_name, total_amount where total_amount > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_orders_opt_99 ON orders(id, total_amount DESC); SELECT id, server_name, total_amount FROM orders WHERE total_amount > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "rest-L4-100",
    "domain": "restaurants",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Directive: Ledger orders is reaching multi-gigabyte scale. Create a partitioned table named orders_part_100 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE orders_part_100 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE orders_part_100_low PARTITION OF orders_part_100 FOR VALUES FROM (0) TO (100); CREATE TABLE orders_part_100_high PARTITION OF orders_part_100 FOR VALUES FROM (100) TO (100000); INSERT INTO orders_part_100 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM orders_part_100;",
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
  }
];
