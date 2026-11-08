import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L2-001",
    "domain": "logistics",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-002",
    "domain": "logistics",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_2(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_2(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_2(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_2(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-003",
    "domain": "logistics",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L2-004",
    "domain": "logistics",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L2-005",
    "domain": "logistics",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_5 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_5 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-006",
    "domain": "logistics",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_6 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_6 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_6_low PARTITION OF shipments_part_6 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_6_high PARTITION OF shipments_part_6 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_6 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_6;",
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
    "id": "log-L2-007",
    "domain": "logistics",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_7() and bind trigger trg_audit_fleet_vehicles_7 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_7(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_7() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_7 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_7(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L2-008",
    "domain": "logistics",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-009",
    "domain": "logistics",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_9 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_9 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_9 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-010",
    "domain": "logistics",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L2-011",
    "domain": "logistics",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-012",
    "domain": "logistics",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_12 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_12 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_12 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-013",
    "domain": "logistics",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-014",
    "domain": "logistics",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_14(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_14(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_14(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_14(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-015",
    "domain": "logistics",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L2-016",
    "domain": "logistics",
    "level": 2,
    "order": 16,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-017",
    "domain": "logistics",
    "level": 2,
    "order": 17,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_17 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_17 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-018",
    "domain": "logistics",
    "level": 2,
    "order": 18,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_18 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_18 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_18_low PARTITION OF shipments_part_18 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_18_high PARTITION OF shipments_part_18 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_18 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_18;",
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
    "id": "log-L2-019",
    "domain": "logistics",
    "level": 2,
    "order": 19,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_19() and bind trigger trg_audit_fleet_vehicles_19 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_19(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_19() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_19 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_19(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-020",
    "domain": "logistics",
    "level": 2,
    "order": 20,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-021",
    "domain": "logistics",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_21 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_21 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_21 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-022",
    "domain": "logistics",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-023",
    "domain": "logistics",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-024",
    "domain": "logistics",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_24 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_24 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_24 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-025",
    "domain": "logistics",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-026",
    "domain": "logistics",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_26(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_26(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_26(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_26(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-027",
    "domain": "logistics",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-028",
    "domain": "logistics",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-029",
    "domain": "logistics",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_29 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_29 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-030",
    "domain": "logistics",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_30 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_30 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_30_low PARTITION OF shipments_part_30 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_30_high PARTITION OF shipments_part_30 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_30 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_30;",
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
    "id": "log-L2-031",
    "domain": "logistics",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_31() and bind trigger trg_audit_fleet_vehicles_31 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_31(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_31() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_31 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_31(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-032",
    "domain": "logistics",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-033",
    "domain": "logistics",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_33 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_33 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_33 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-034",
    "domain": "logistics",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-035",
    "domain": "logistics",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-036",
    "domain": "logistics",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_36 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_36 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_36 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-037",
    "domain": "logistics",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-038",
    "domain": "logistics",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_38(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_38(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_38(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_38(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-039",
    "domain": "logistics",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-040",
    "domain": "logistics",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-041",
    "domain": "logistics",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_41 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_41 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-042",
    "domain": "logistics",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_42 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_42 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_42_low PARTITION OF shipments_part_42 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_42_high PARTITION OF shipments_part_42 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_42 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_42;",
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
    "id": "log-L2-043",
    "domain": "logistics",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_43() and bind trigger trg_audit_fleet_vehicles_43 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_43(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_43() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_43 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_43(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-044",
    "domain": "logistics",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-045",
    "domain": "logistics",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_45 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_45 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_45 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-046",
    "domain": "logistics",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-047",
    "domain": "logistics",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-048",
    "domain": "logistics",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_48 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_48 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_48 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-049",
    "domain": "logistics",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-050",
    "domain": "logistics",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_50(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_50(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_50(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_50(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-051",
    "domain": "logistics",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-052",
    "domain": "logistics",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-053",
    "domain": "logistics",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_53 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_53 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-054",
    "domain": "logistics",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_54 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_54 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_54_low PARTITION OF shipments_part_54 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_54_high PARTITION OF shipments_part_54 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_54 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_54;",
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
    "id": "log-L2-055",
    "domain": "logistics",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_55() and bind trigger trg_audit_fleet_vehicles_55 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_55(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_55() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_55 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_55(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-056",
    "domain": "logistics",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-057",
    "domain": "logistics",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_57 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_57 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_57 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-058",
    "domain": "logistics",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-059",
    "domain": "logistics",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-060",
    "domain": "logistics",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_60 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_60 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_60 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-061",
    "domain": "logistics",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-062",
    "domain": "logistics",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_62(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_62(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_62(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_62(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-063",
    "domain": "logistics",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-064",
    "domain": "logistics",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L2-065",
    "domain": "logistics",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_65 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_65 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-066",
    "domain": "logistics",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_66 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_66 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_66_low PARTITION OF shipments_part_66 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_66_high PARTITION OF shipments_part_66 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_66 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_66;",
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
    "id": "log-L2-067",
    "domain": "logistics",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_67() and bind trigger trg_audit_fleet_vehicles_67 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_67(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_67() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_67 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_67(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-068",
    "domain": "logistics",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-069",
    "domain": "logistics",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_69 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_69 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_69 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-070",
    "domain": "logistics",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-071",
    "domain": "logistics",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-072",
    "domain": "logistics",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_72 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_72 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_72 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-073",
    "domain": "logistics",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-074",
    "domain": "logistics",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_74(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_74(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_74(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_74(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-075",
    "domain": "logistics",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-076",
    "domain": "logistics",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-077",
    "domain": "logistics",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_77 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_77 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-078",
    "domain": "logistics",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_78 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_78 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_78_low PARTITION OF shipments_part_78 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_78_high PARTITION OF shipments_part_78 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_78 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_78;",
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
    "id": "log-L2-079",
    "domain": "logistics",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_79() and bind trigger trg_audit_fleet_vehicles_79 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_79(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_79() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_79 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_79(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-080",
    "domain": "logistics",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-081",
    "domain": "logistics",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_81 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_81 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_81 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-082",
    "domain": "logistics",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-083",
    "domain": "logistics",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-084",
    "domain": "logistics",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_84 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_84 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_84 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-085",
    "domain": "logistics",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-086",
    "domain": "logistics",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_86(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_86(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_86(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_86(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-087",
    "domain": "logistics",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-088",
    "domain": "logistics",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-089",
    "domain": "logistics",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_89 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "PERFORMANCE TUNING",
      "COMPOSITE INDEX"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "weight_kg"
    ],
    "reference_sql": "CREATE INDEX idx_shipments_opt_89 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-090",
    "domain": "logistics",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_90 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_90 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_90_low PARTITION OF shipments_part_90 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_90_high PARTITION OF shipments_part_90 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_90 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_90;",
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
    "id": "log-L2-091",
    "domain": "logistics",
    "level": 2,
    "order": 91,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_91() and bind trigger trg_audit_fleet_vehicles_91 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_91(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE TRIGGER",
      "PL/pgSQL",
      "AUDIT SENTINEL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_91() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_91 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_91(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-092",
    "domain": "logistics",
    "level": 2,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULLIF",
      "COALESCE",
      "DATA CLEANING",
      "ARITHMETIC DEFENSE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "index_ratio"
    ],
    "reference_sql": "SELECT id, vehicle_number, ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-093",
    "domain": "logistics",
    "level": 2,
    "order": 93,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_93 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_93 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_93 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-094",
    "domain": "logistics",
    "level": 2,
    "order": 94,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg",
      "quartile"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, vehicle_number, max_weight_capacity_kg, NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile FROM fleet_vehicles) SELECT id, vehicle_number, max_weight_capacity_kg, quartile FROM cohort_analysis ORDER BY quartile ASC, max_weight_capacity_kg DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY max_weight_capacity_kg DESC) AS quartile inside the CTE."
    ],
    "solution_explanation": "Combines CTE staging with statistical distribution quartiles.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L2-095",
    "domain": "logistics",
    "level": 2,
    "order": 95,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "LAG()",
      "LEAD()",
      "WINDOW FUNCTION"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount",
      "next_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount FROM shipments ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L2-096",
    "domain": "logistics",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_96 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_96 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_96 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L2-097",
    "domain": "logistics",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 25;",
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
    "id": "log-L2-098",
    "domain": "logistics",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_98(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_98(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_98(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_98(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L2-099",
    "domain": "logistics",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS standardized_title, COALESCE(id, 0) AS safe_code FROM warehouses WHERE city IS NOT NULL ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) and filter with WHERE city IS NOT NULL."
    ],
    "solution_explanation": "Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-100",
    "domain": "logistics",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT t1.id, t1.city FROM warehouses t1 WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id) ORDER BY t1.id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE EXISTS (SELECT 1 FROM carriers t2 WHERE t2.id = t1.id)."
    ],
    "solution_explanation": "Applies an optimized correlated semi-join to verify foreign key relationships.",
    "xp": 75,
    "estimated_minutes": 20
  }
];
