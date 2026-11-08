import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L3-001",
    "domain": "logistics",
    "level": 3,
    "order": 1,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-002",
    "domain": "logistics",
    "level": 3,
    "order": 2,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_2 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_2 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_2 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-003",
    "domain": "logistics",
    "level": 3,
    "order": 3,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-004",
    "domain": "logistics",
    "level": 3,
    "order": 4,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-005",
    "domain": "logistics",
    "level": 3,
    "order": 5,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_5 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_5 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_5 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-006",
    "domain": "logistics",
    "level": 3,
    "order": 6,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-007",
    "domain": "logistics",
    "level": 3,
    "order": 7,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_7(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_7(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_7(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_7(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-008",
    "domain": "logistics",
    "level": 3,
    "order": 8,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-009",
    "domain": "logistics",
    "level": 3,
    "order": 9,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-010",
    "domain": "logistics",
    "level": 3,
    "order": 10,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_10 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_10 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-011",
    "domain": "logistics",
    "level": 3,
    "order": 11,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_11 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_11_low PARTITION OF shipments_part_11 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_11_high PARTITION OF shipments_part_11 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_11 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_11;",
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
    "id": "log-L3-012",
    "domain": "logistics",
    "level": 3,
    "order": 12,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_12() and bind trigger trg_audit_fleet_vehicles_12 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_12(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_12() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_12 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_12(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-013",
    "domain": "logistics",
    "level": 3,
    "order": 13,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-014",
    "domain": "logistics",
    "level": 3,
    "order": 14,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_14 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_14 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_14 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-015",
    "domain": "logistics",
    "level": 3,
    "order": 15,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-016",
    "domain": "logistics",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-017",
    "domain": "logistics",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_17 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_17 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_17 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-018",
    "domain": "logistics",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-019",
    "domain": "logistics",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_19(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_19(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_19(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_19(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-020",
    "domain": "logistics",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-021",
    "domain": "logistics",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-022",
    "domain": "logistics",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_22 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_22 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-023",
    "domain": "logistics",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_23 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_23_low PARTITION OF shipments_part_23 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_23_high PARTITION OF shipments_part_23 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_23 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_23;",
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
    "id": "log-L3-024",
    "domain": "logistics",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_24() and bind trigger trg_audit_fleet_vehicles_24 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_24(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_24() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_24 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_24(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-025",
    "domain": "logistics",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-026",
    "domain": "logistics",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_26 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_26 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_26 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-027",
    "domain": "logistics",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-028",
    "domain": "logistics",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-029",
    "domain": "logistics",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_29 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_29 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_29 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-030",
    "domain": "logistics",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-031",
    "domain": "logistics",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_31(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_31(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_31(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_31(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-032",
    "domain": "logistics",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-033",
    "domain": "logistics",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-034",
    "domain": "logistics",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_34 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_34 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-035",
    "domain": "logistics",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_35 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_35_low PARTITION OF shipments_part_35 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_35_high PARTITION OF shipments_part_35 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_35 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_35;",
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
    "id": "log-L3-036",
    "domain": "logistics",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_36() and bind trigger trg_audit_fleet_vehicles_36 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_36(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_36() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_36 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_36(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-037",
    "domain": "logistics",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-038",
    "domain": "logistics",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_38 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_38 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_38 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-039",
    "domain": "logistics",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-040",
    "domain": "logistics",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-041",
    "domain": "logistics",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_41 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_41 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_41 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-042",
    "domain": "logistics",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-043",
    "domain": "logistics",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_43(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_43(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_43(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_43(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-044",
    "domain": "logistics",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-045",
    "domain": "logistics",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-046",
    "domain": "logistics",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_46 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_46 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-047",
    "domain": "logistics",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_47 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_47_low PARTITION OF shipments_part_47 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_47_high PARTITION OF shipments_part_47 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_47 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_47;",
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
    "id": "log-L3-048",
    "domain": "logistics",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_48() and bind trigger trg_audit_fleet_vehicles_48 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_48(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_48() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_48 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_48(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-049",
    "domain": "logistics",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-050",
    "domain": "logistics",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_50 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_50 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_50 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-051",
    "domain": "logistics",
    "level": 3,
    "order": 51,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-052",
    "domain": "logistics",
    "level": 3,
    "order": 52,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-053",
    "domain": "logistics",
    "level": 3,
    "order": 53,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_53 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_53 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_53 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-054",
    "domain": "logistics",
    "level": 3,
    "order": 54,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-055",
    "domain": "logistics",
    "level": 3,
    "order": 55,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_55(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_55(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_55(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_55(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-056",
    "domain": "logistics",
    "level": 3,
    "order": 56,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-057",
    "domain": "logistics",
    "level": 3,
    "order": 57,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-058",
    "domain": "logistics",
    "level": 3,
    "order": 58,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_58 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_58 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-059",
    "domain": "logistics",
    "level": 3,
    "order": 59,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_59 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_59_low PARTITION OF shipments_part_59 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_59_high PARTITION OF shipments_part_59 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_59 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_59;",
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
    "id": "log-L3-060",
    "domain": "logistics",
    "level": 3,
    "order": 60,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_60() and bind trigger trg_audit_fleet_vehicles_60 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_60(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_60() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_60 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_60(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-061",
    "domain": "logistics",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-062",
    "domain": "logistics",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_62 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_62 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_62 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-063",
    "domain": "logistics",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-064",
    "domain": "logistics",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-065",
    "domain": "logistics",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_65 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_65 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_65 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-066",
    "domain": "logistics",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-067",
    "domain": "logistics",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_67(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_67(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_67(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_67(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-068",
    "domain": "logistics",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-069",
    "domain": "logistics",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-070",
    "domain": "logistics",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_70 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_70 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-071",
    "domain": "logistics",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_71 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_71_low PARTITION OF shipments_part_71 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_71_high PARTITION OF shipments_part_71 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_71 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_71;",
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
    "id": "log-L3-072",
    "domain": "logistics",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_72() and bind trigger trg_audit_fleet_vehicles_72 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_72(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_72() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_72 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_72(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-073",
    "domain": "logistics",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-074",
    "domain": "logistics",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_74 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_74 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_74 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-075",
    "domain": "logistics",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-076",
    "domain": "logistics",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-077",
    "domain": "logistics",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_77 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_77 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_77 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-078",
    "domain": "logistics",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-079",
    "domain": "logistics",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_79(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_79(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_79(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_79(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-080",
    "domain": "logistics",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-081",
    "domain": "logistics",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-082",
    "domain": "logistics",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_82 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_82 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-083",
    "domain": "logistics",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_83 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_83_low PARTITION OF shipments_part_83 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_83_high PARTITION OF shipments_part_83 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_83 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_83;",
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
    "id": "log-L3-084",
    "domain": "logistics",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_84() and bind trigger trg_audit_fleet_vehicles_84 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_84(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_84() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_84 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_84(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-085",
    "domain": "logistics",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-086",
    "domain": "logistics",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_86 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_86 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_86 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-087",
    "domain": "logistics",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L3-088",
    "domain": "logistics",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-089",
    "domain": "logistics",
    "level": 3,
    "order": 89,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_89 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_89 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_89 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L3-090",
    "domain": "logistics",
    "level": 3,
    "order": 90,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L3-091",
    "domain": "logistics",
    "level": 3,
    "order": 91,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_91(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_91(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_91(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_91(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L3-092",
    "domain": "logistics",
    "level": 3,
    "order": 92,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-093",
    "domain": "logistics",
    "level": 3,
    "order": 93,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L3-094",
    "domain": "logistics",
    "level": 3,
    "order": 94,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_94 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_94 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-095",
    "domain": "logistics",
    "level": 3,
    "order": 95,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_95 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_95_low PARTITION OF shipments_part_95 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_95_high PARTITION OF shipments_part_95 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_95 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_95;",
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
    "id": "log-L3-096",
    "domain": "logistics",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_96() and bind trigger trg_audit_fleet_vehicles_96 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_96(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_96() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_96 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_96(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Create the trigger function returning trigger, attach the trigger, then query fleet_vehicles."
    ],
    "solution_explanation": "Installs an event-driven database sentinel to enforce regulatory compliance.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L3-097",
    "domain": "logistics",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L3-098",
    "domain": "logistics",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_98 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_98 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_98 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L3-099",
    "domain": "logistics",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L3-100",
    "domain": "logistics",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "xp": 75,
    "estimated_minutes": 20
  }
];
