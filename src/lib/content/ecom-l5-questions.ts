import { QuestionDefinition } from "./ecom-l1-questions";

export const ECOM_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L5-001",
    "domain": "ecommerce",
    "level": 5,
    "order": 1,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q1)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #1 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 21;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 21;",
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
    "id": "ecom-L5-002",
    "domain": "ecommerce",
    "level": 5,
    "order": 2,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q2)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #2 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 2;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 2;",
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
    "id": "ecom-L5-003",
    "domain": "ecommerce",
    "level": 5,
    "order": 3,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q3)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #3 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_3 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_3 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-004",
    "domain": "ecommerce",
    "level": 5,
    "order": 4,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q4)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #4 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_4 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 34; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_4 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 34; SELECT id, view_label, safe_metric FROM v_suppliers_summary_4 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-005",
    "domain": "ecommerce",
    "level": 5,
    "order": 5,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q5)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #5 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_5 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 35. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_5 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 35; SELECT id, clean_name, staged_val FROM temp_products_clean_5 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-006",
    "domain": "ecommerce",
    "level": 5,
    "order": 6,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q6)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #6 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_6(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_6(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-007",
    "domain": "ecommerce",
    "level": 5,
    "order": 7,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q7)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #7 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 27;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 27;",
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
    "id": "ecom-L5-008",
    "domain": "ecommerce",
    "level": 5,
    "order": 8,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q8)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #8 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 8;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 8;",
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
    "id": "ecom-L5-009",
    "domain": "ecommerce",
    "level": 5,
    "order": 9,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q9)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #9 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_9 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_9 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-010",
    "domain": "ecommerce",
    "level": 5,
    "order": 10,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q10)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #10 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_10 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 40; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_10 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 40; SELECT id, view_label, safe_metric FROM v_warehouses_summary_10 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-011",
    "domain": "ecommerce",
    "level": 5,
    "order": 11,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q11)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #11 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_11 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 41. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_11 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 41; SELECT id, clean_name, staged_val FROM temp_inventory_clean_11 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-012",
    "domain": "ecommerce",
    "level": 5,
    "order": 12,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q12)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #12 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_12(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_12(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-013",
    "domain": "ecommerce",
    "level": 5,
    "order": 13,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q13)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #13 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 33;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 33;",
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
    "id": "ecom-L5-014",
    "domain": "ecommerce",
    "level": 5,
    "order": 14,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q14)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #14 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 14;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 14;",
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
    "id": "ecom-L5-015",
    "domain": "ecommerce",
    "level": 5,
    "order": 15,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q15)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #15 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_15 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_15 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-016",
    "domain": "ecommerce",
    "level": 5,
    "order": 16,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q16)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #16 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_16 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 46; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_16 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 46; SELECT id, view_label, safe_metric FROM v_suppliers_summary_16 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-017",
    "domain": "ecommerce",
    "level": 5,
    "order": 17,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q17)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #17 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_17 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 47. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_17 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 47; SELECT id, clean_name, staged_val FROM temp_products_clean_17 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-018",
    "domain": "ecommerce",
    "level": 5,
    "order": 18,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q18)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #18 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_18(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_18(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-019",
    "domain": "ecommerce",
    "level": 5,
    "order": 19,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q19)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #19 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 39;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 39;",
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
    "id": "ecom-L5-020",
    "domain": "ecommerce",
    "level": 5,
    "order": 20,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q20)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #20 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 20;",
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
    "id": "ecom-L5-021",
    "domain": "ecommerce",
    "level": 5,
    "order": 21,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q21)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #21 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_21 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_21 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-022",
    "domain": "ecommerce",
    "level": 5,
    "order": 22,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q22)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #22 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_22 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 52; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_22 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 52; SELECT id, view_label, safe_metric FROM v_warehouses_summary_22 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-023",
    "domain": "ecommerce",
    "level": 5,
    "order": 23,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q23)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #23 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_23 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 53. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_23 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 53; SELECT id, clean_name, staged_val FROM temp_inventory_clean_23 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-024",
    "domain": "ecommerce",
    "level": 5,
    "order": 24,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q24)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #24 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_24(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_24(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-025",
    "domain": "ecommerce",
    "level": 5,
    "order": 25,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q25)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #25 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 45;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 45;",
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
    "id": "ecom-L5-026",
    "domain": "ecommerce",
    "level": 5,
    "order": 26,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q26)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #26 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 26;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 26;",
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
    "id": "ecom-L5-027",
    "domain": "ecommerce",
    "level": 5,
    "order": 27,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q27)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #27 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_27 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_27 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-028",
    "domain": "ecommerce",
    "level": 5,
    "order": 28,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q28)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #28 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_28 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 58; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_28 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 58; SELECT id, view_label, safe_metric FROM v_suppliers_summary_28 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-029",
    "domain": "ecommerce",
    "level": 5,
    "order": 29,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q29)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #29 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_29 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 59. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_29 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 59; SELECT id, clean_name, staged_val FROM temp_products_clean_29 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-030",
    "domain": "ecommerce",
    "level": 5,
    "order": 30,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q30)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #30 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_30(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_30(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-031",
    "domain": "ecommerce",
    "level": 5,
    "order": 31,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q31)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #31 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 51;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 51;",
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
    "id": "ecom-L5-032",
    "domain": "ecommerce",
    "level": 5,
    "order": 32,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q32)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #32 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 32;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 32;",
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
    "id": "ecom-L5-033",
    "domain": "ecommerce",
    "level": 5,
    "order": 33,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q33)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #33 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_33 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_33 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-034",
    "domain": "ecommerce",
    "level": 5,
    "order": 34,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q34)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #34 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_34 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 64; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_34 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 64; SELECT id, view_label, safe_metric FROM v_warehouses_summary_34 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-035",
    "domain": "ecommerce",
    "level": 5,
    "order": 35,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q35)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #35 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_35 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 65. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_35 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 65; SELECT id, clean_name, staged_val FROM temp_inventory_clean_35 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-036",
    "domain": "ecommerce",
    "level": 5,
    "order": 36,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q36)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #36 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_36(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_36(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-037",
    "domain": "ecommerce",
    "level": 5,
    "order": 37,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q37)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #37 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 57;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 57;",
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
    "id": "ecom-L5-038",
    "domain": "ecommerce",
    "level": 5,
    "order": 38,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q38)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #38 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 38;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 38;",
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
    "id": "ecom-L5-039",
    "domain": "ecommerce",
    "level": 5,
    "order": 39,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q39)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #39 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_39 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_39 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-040",
    "domain": "ecommerce",
    "level": 5,
    "order": 40,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q40)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #40 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_40 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 70; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_40 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 70; SELECT id, view_label, safe_metric FROM v_suppliers_summary_40 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-041",
    "domain": "ecommerce",
    "level": 5,
    "order": 41,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q41)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #41 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_41 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 71. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_41 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 71; SELECT id, clean_name, staged_val FROM temp_products_clean_41 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-042",
    "domain": "ecommerce",
    "level": 5,
    "order": 42,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q42)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #42 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_42(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_42(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-043",
    "domain": "ecommerce",
    "level": 5,
    "order": 43,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q43)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #43 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 63;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 63;",
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
    "id": "ecom-L5-044",
    "domain": "ecommerce",
    "level": 5,
    "order": 44,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q44)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #44 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 44;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 44;",
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
    "id": "ecom-L5-045",
    "domain": "ecommerce",
    "level": 5,
    "order": 45,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q45)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #45 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_45 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_45 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-046",
    "domain": "ecommerce",
    "level": 5,
    "order": 46,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q46)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #46 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_46 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 76; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_46 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 76; SELECT id, view_label, safe_metric FROM v_warehouses_summary_46 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-047",
    "domain": "ecommerce",
    "level": 5,
    "order": 47,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q47)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #47 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_47 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 77. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_47 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 77; SELECT id, clean_name, staged_val FROM temp_inventory_clean_47 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-048",
    "domain": "ecommerce",
    "level": 5,
    "order": 48,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q48)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #48 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_48(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_48(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-049",
    "domain": "ecommerce",
    "level": 5,
    "order": 49,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q49)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #49 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 69;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 69;",
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
    "id": "ecom-L5-050",
    "domain": "ecommerce",
    "level": 5,
    "order": 50,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q50)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #50 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 50;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 50;",
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
    "id": "ecom-L5-051",
    "domain": "ecommerce",
    "level": 5,
    "order": 51,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q51)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #51 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_51 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_51 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-052",
    "domain": "ecommerce",
    "level": 5,
    "order": 52,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q52)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #52 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_52 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 82; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_52 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 82; SELECT id, view_label, safe_metric FROM v_suppliers_summary_52 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-053",
    "domain": "ecommerce",
    "level": 5,
    "order": 53,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q53)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #53 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_53 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 83. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_53 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 83; SELECT id, clean_name, staged_val FROM temp_products_clean_53 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-054",
    "domain": "ecommerce",
    "level": 5,
    "order": 54,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q54)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #54 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_54(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_54(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-055",
    "domain": "ecommerce",
    "level": 5,
    "order": 55,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q55)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #55 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 75;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 75;",
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
    "id": "ecom-L5-056",
    "domain": "ecommerce",
    "level": 5,
    "order": 56,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q56)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #56 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 56;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 56;",
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
    "id": "ecom-L5-057",
    "domain": "ecommerce",
    "level": 5,
    "order": 57,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q57)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #57 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_57 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_57 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-058",
    "domain": "ecommerce",
    "level": 5,
    "order": 58,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q58)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #58 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_58 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 88; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_58 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 88; SELECT id, view_label, safe_metric FROM v_warehouses_summary_58 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-059",
    "domain": "ecommerce",
    "level": 5,
    "order": 59,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q59)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #59 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_59 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 89. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_59 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 89; SELECT id, clean_name, staged_val FROM temp_inventory_clean_59 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-060",
    "domain": "ecommerce",
    "level": 5,
    "order": 60,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q60)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #60 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_60(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_60(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-061",
    "domain": "ecommerce",
    "level": 5,
    "order": 61,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q61)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #61 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 81;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 81;",
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
    "id": "ecom-L5-062",
    "domain": "ecommerce",
    "level": 5,
    "order": 62,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q62)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #62 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 62;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 62;",
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
    "id": "ecom-L5-063",
    "domain": "ecommerce",
    "level": 5,
    "order": 63,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q63)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #63 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_63 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_63 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-064",
    "domain": "ecommerce",
    "level": 5,
    "order": 64,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q64)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #64 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_64 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 94; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_64 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 94; SELECT id, view_label, safe_metric FROM v_suppliers_summary_64 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-065",
    "domain": "ecommerce",
    "level": 5,
    "order": 65,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q65)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #65 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_65 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 95. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_65 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 95; SELECT id, clean_name, staged_val FROM temp_products_clean_65 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-066",
    "domain": "ecommerce",
    "level": 5,
    "order": 66,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q66)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #66 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_66(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_66(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-067",
    "domain": "ecommerce",
    "level": 5,
    "order": 67,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q67)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #67 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 87;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 87;",
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
    "id": "ecom-L5-068",
    "domain": "ecommerce",
    "level": 5,
    "order": 68,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q68)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #68 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 68;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 68;",
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
    "id": "ecom-L5-069",
    "domain": "ecommerce",
    "level": 5,
    "order": 69,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q69)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #69 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_69 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_69 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-070",
    "domain": "ecommerce",
    "level": 5,
    "order": 70,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q70)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #70 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_70 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 100; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_70 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 100; SELECT id, view_label, safe_metric FROM v_warehouses_summary_70 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-071",
    "domain": "ecommerce",
    "level": 5,
    "order": 71,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q71)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #71 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_71 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 101. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_71 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 101; SELECT id, clean_name, staged_val FROM temp_inventory_clean_71 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-072",
    "domain": "ecommerce",
    "level": 5,
    "order": 72,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q72)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #72 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_72(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_72(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-073",
    "domain": "ecommerce",
    "level": 5,
    "order": 73,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q73)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #73 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 93;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 93;",
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
    "id": "ecom-L5-074",
    "domain": "ecommerce",
    "level": 5,
    "order": 74,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q74)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #74 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 74;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 74;",
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
    "id": "ecom-L5-075",
    "domain": "ecommerce",
    "level": 5,
    "order": 75,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q75)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #75 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_75 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_75 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-076",
    "domain": "ecommerce",
    "level": 5,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q76)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #76 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_76 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 106; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_76 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 106; SELECT id, view_label, safe_metric FROM v_suppliers_summary_76 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-077",
    "domain": "ecommerce",
    "level": 5,
    "order": 77,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q77)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #77 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_77 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 107. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_77 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 107; SELECT id, clean_name, staged_val FROM temp_products_clean_77 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-078",
    "domain": "ecommerce",
    "level": 5,
    "order": 78,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q78)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #78 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_78(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_78(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-079",
    "domain": "ecommerce",
    "level": 5,
    "order": 79,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q79)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #79 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 99;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 99;",
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
    "id": "ecom-L5-080",
    "domain": "ecommerce",
    "level": 5,
    "order": 80,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q80)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #80 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 80;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 80;",
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
    "id": "ecom-L5-081",
    "domain": "ecommerce",
    "level": 5,
    "order": 81,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q81)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #81 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_81 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_81 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-082",
    "domain": "ecommerce",
    "level": 5,
    "order": 82,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q82)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #82 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_82 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 112; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_82 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 112; SELECT id, view_label, safe_metric FROM v_warehouses_summary_82 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-083",
    "domain": "ecommerce",
    "level": 5,
    "order": 83,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q83)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #83 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_83 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 113. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_83 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 113; SELECT id, clean_name, staged_val FROM temp_inventory_clean_83 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-084",
    "domain": "ecommerce",
    "level": 5,
    "order": 84,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q84)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #84 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_84(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_84(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-085",
    "domain": "ecommerce",
    "level": 5,
    "order": 85,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q85)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #85 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 105;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 105;",
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
    "id": "ecom-L5-086",
    "domain": "ecommerce",
    "level": 5,
    "order": 86,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q86)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #86 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 86;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 86;",
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
    "id": "ecom-L5-087",
    "domain": "ecommerce",
    "level": 5,
    "order": 87,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q87)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #87 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_87 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_87 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-088",
    "domain": "ecommerce",
    "level": 5,
    "order": 88,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q88)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #88 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_88 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 118; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_88 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 118; SELECT id, view_label, safe_metric FROM v_suppliers_summary_88 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-089",
    "domain": "ecommerce",
    "level": 5,
    "order": 89,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q89)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #89 - Alex Rivera (Chief Executive Officer)]: ETL Staging Ticket: Build a session table named temp_products_clean_89 ingesting id, UPPER(TRIM(name::text)) AS clean_name, and price AS staged_val from products WHERE name IS NOT NULL AND id <= 119. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_products_clean_89 AS SELECT id, UPPER(TRIM(name::text)) AS clean_name, price AS staged_val FROM products WHERE name IS NOT NULL AND id <= 119; SELECT id, clean_name, staged_val FROM temp_products_clean_89 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-090",
    "domain": "ecommerce",
    "level": 5,
    "order": 90,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q90)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #90 - Rachel Green (VP of Sales & Growth)]: Automate operational routine in customers. Write Stored Procedure sp_routine_customers_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_customers_90(1); then select id, first_name AS confirmed_item from customers where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_customers_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_customers_90(1); SELECT id, first_name AS confirmed_item FROM customers WHERE id = 1;",
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
    "id": "ecom-L5-091",
    "domain": "ecommerce",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q91)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #91 - Liam Vance (Fulfillment & Supply Director)]: Segment records in orders into 4 quartiles. Using a CTE named cohort_analysis, project id, status AS cohort_label, total_amount AS metric_score, and NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 111;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, status AS cohort_label, total_amount AS metric_score, NTILE(4) OVER (ORDER BY total_amount DESC) AS quartile_tier FROM orders WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 111;",
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
    "id": "ecom-L5-092",
    "domain": "ecommerce",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q92)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #92 - Marcus Bell (Customer Support Lead)]: Infrastructure Audit: Profile optimizer execution cost for queries on order_items. Run an EXPLAIN (FORMAT JSON) on a query selecting id and unit_price from order_items where id >= 92;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "unit_price"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, unit_price FROM order_items WHERE id >= 92;",
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
    "id": "ecom-L5-093",
    "domain": "ecommerce",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q93)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #93 - Alex Rivera (Chief Executive Officer)]: Production Ticket: Accelerate read queries on shipments. Create an Index named idx_shipments_perf_93 ON shipments(id DESC); then select id, carrier AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_perf_93 ON shipments(id DESC); SELECT id, carrier AS indexed_label, id AS metric_val FROM shipments WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-094",
    "domain": "ecommerce",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q94)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #94 - Rachel Green (VP of Sales & Growth)]: Create a sanitized virtual View named v_warehouses_summary_94 projecting id, name AS view_label, and COALESCE(capacity_sqft, 0) AS safe_metric from warehouses WHERE id <= 124; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_warehouses_summary_94 AS SELECT id, name AS view_label, COALESCE(capacity_sqft, 0) AS safe_metric FROM warehouses WHERE id <= 124; SELECT id, view_label, safe_metric FROM v_warehouses_summary_94 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-095",
    "domain": "ecommerce",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q95)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #95 - Liam Vance (Fulfillment & Supply Director)]: ETL Staging Ticket: Build a session table named temp_inventory_clean_95 ingesting id, UPPER(TRIM(product_id::text::text)) AS clean_name, and quantity_on_hand AS staged_val from inventory WHERE product_id::text IS NOT NULL AND id <= 125. Select from the temp table ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_inventory_clean_95 AS SELECT id, UPPER(TRIM(product_id::text::text)) AS clean_name, quantity_on_hand AS staged_val FROM inventory WHERE product_id::text IS NOT NULL AND id <= 125; SELECT id, clean_name, staged_val FROM temp_inventory_clean_95 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L5-096",
    "domain": "ecommerce",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q96)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #96 - Marcus Bell (Customer Support Lead)]: Automate operational routine in coupons. Write Stored Procedure sp_routine_coupons_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_coupons_96(1); then select id, code AS confirmed_item from coupons where id = 1;\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_coupons_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_coupons_96(1); SELECT id, code AS confirmed_item FROM coupons WHERE id = 1;",
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
    "id": "ecom-L5-097",
    "domain": "ecommerce",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q97)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #97 - Alex Rivera (Chief Executive Officer)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 117;\"",
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
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 117;",
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
    "id": "ecom-L5-098",
    "domain": "ecommerce",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q98)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #98 - Rachel Green (VP of Sales & Growth)]: Infrastructure Audit: Profile optimizer execution cost for queries on categories. Run an EXPLAIN (FORMAT JSON) on a query selecting id and id from categories where id >= 98;\"",
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
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, id FROM categories WHERE id >= 98;",
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
    "id": "ecom-L5-099",
    "domain": "ecommerce",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q99)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #99 - Liam Vance (Fulfillment & Supply Director)]: Production Ticket: Accelerate read queries on brands. Create an Index named idx_brands_perf_99 ON brands(id DESC); then select id, name AS indexed_label, id AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
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
    "reference_sql": "CREATE INDEX idx_brands_perf_99 ON brands(id DESC); SELECT id, name AS indexed_label, id AS metric_val FROM brands WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
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
    "id": "ecom-L5-100",
    "domain": "ecommerce",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q100)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #100 - Marcus Bell (Customer Support Lead)]: Create a sanitized virtual View named v_suppliers_summary_100 projecting id, company_name AS view_label, and COALESCE(rating, 0) AS safe_metric from suppliers WHERE id <= 130; Select from the view ordered by id ASC LIMIT 20;\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_suppliers_summary_100 AS SELECT id, company_name AS view_label, COALESCE(rating, 0) AS safe_metric FROM suppliers WHERE id <= 130; SELECT id, view_label, safe_metric FROM v_suppliers_summary_100 ORDER BY id ASC LIMIT 20;",
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
