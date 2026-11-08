import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L4-001",
    "domain": "logistics",
    "level": 4,
    "order": 1,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-002",
    "domain": "logistics",
    "level": 4,
    "order": 2,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-003",
    "domain": "logistics",
    "level": 4,
    "order": 3,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_3 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_3 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-004",
    "domain": "logistics",
    "level": 4,
    "order": 4,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_4 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_4 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_4_low PARTITION OF shipments_part_4 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_4_high PARTITION OF shipments_part_4 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_4 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_4;",
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
    "id": "log-L4-005",
    "domain": "logistics",
    "level": 4,
    "order": 5,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_5() and bind trigger trg_audit_fleet_vehicles_5 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_5(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_5() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_5 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_5(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-006",
    "domain": "logistics",
    "level": 4,
    "order": 6,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-007",
    "domain": "logistics",
    "level": 4,
    "order": 7,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_7 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_7 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_7 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-008",
    "domain": "logistics",
    "level": 4,
    "order": 8,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-009",
    "domain": "logistics",
    "level": 4,
    "order": 9,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-010",
    "domain": "logistics",
    "level": 4,
    "order": 10,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_10 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_10 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_10 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-011",
    "domain": "logistics",
    "level": 4,
    "order": 11,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-012",
    "domain": "logistics",
    "level": 4,
    "order": 12,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_12(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_12(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_12(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_12(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-013",
    "domain": "logistics",
    "level": 4,
    "order": 13,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-014",
    "domain": "logistics",
    "level": 4,
    "order": 14,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-015",
    "domain": "logistics",
    "level": 4,
    "order": 15,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_15 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_15 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-016",
    "domain": "logistics",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_16 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_16 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_16_low PARTITION OF shipments_part_16 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_16_high PARTITION OF shipments_part_16 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_16 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_16;",
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
    "id": "log-L4-017",
    "domain": "logistics",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_17() and bind trigger trg_audit_fleet_vehicles_17 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_17(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_17() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_17 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_17(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-018",
    "domain": "logistics",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-019",
    "domain": "logistics",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_19 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_19 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_19 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-020",
    "domain": "logistics",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-021",
    "domain": "logistics",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-022",
    "domain": "logistics",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_22 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_22 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_22 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-023",
    "domain": "logistics",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-024",
    "domain": "logistics",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_24(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_24(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_24(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_24(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-025",
    "domain": "logistics",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-026",
    "domain": "logistics",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-027",
    "domain": "logistics",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_27 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_27 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-028",
    "domain": "logistics",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_28 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_28 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_28_low PARTITION OF shipments_part_28 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_28_high PARTITION OF shipments_part_28 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_28 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_28;",
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
    "id": "log-L4-029",
    "domain": "logistics",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_29() and bind trigger trg_audit_fleet_vehicles_29 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_29(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_29() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_29 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_29(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-030",
    "domain": "logistics",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-031",
    "domain": "logistics",
    "level": 4,
    "order": 31,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_31 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_31 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_31 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-032",
    "domain": "logistics",
    "level": 4,
    "order": 32,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-033",
    "domain": "logistics",
    "level": 4,
    "order": 33,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-034",
    "domain": "logistics",
    "level": 4,
    "order": 34,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_34 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_34 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_34 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-035",
    "domain": "logistics",
    "level": 4,
    "order": 35,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-036",
    "domain": "logistics",
    "level": 4,
    "order": 36,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_36(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_36(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_36(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_36(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-037",
    "domain": "logistics",
    "level": 4,
    "order": 37,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-038",
    "domain": "logistics",
    "level": 4,
    "order": 38,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-039",
    "domain": "logistics",
    "level": 4,
    "order": 39,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_39 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_39 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-040",
    "domain": "logistics",
    "level": 4,
    "order": 40,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_40 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_40 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_40_low PARTITION OF shipments_part_40 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_40_high PARTITION OF shipments_part_40 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_40 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_40;",
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
    "id": "log-L4-041",
    "domain": "logistics",
    "level": 4,
    "order": 41,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_41() and bind trigger trg_audit_fleet_vehicles_41 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_41(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_41() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_41 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_41(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-042",
    "domain": "logistics",
    "level": 4,
    "order": 42,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-043",
    "domain": "logistics",
    "level": 4,
    "order": 43,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_43 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_43 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_43 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-044",
    "domain": "logistics",
    "level": 4,
    "order": 44,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-045",
    "domain": "logistics",
    "level": 4,
    "order": 45,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-046",
    "domain": "logistics",
    "level": 4,
    "order": 46,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_46 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_46 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_46 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-047",
    "domain": "logistics",
    "level": 4,
    "order": 47,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-048",
    "domain": "logistics",
    "level": 4,
    "order": 48,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_48(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_48(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_48(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_48(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-049",
    "domain": "logistics",
    "level": 4,
    "order": 49,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-050",
    "domain": "logistics",
    "level": 4,
    "order": 50,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-051",
    "domain": "logistics",
    "level": 4,
    "order": 51,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_51 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_51 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-052",
    "domain": "logistics",
    "level": 4,
    "order": 52,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_52 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_52 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_52_low PARTITION OF shipments_part_52 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_52_high PARTITION OF shipments_part_52 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_52 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_52;",
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
    "id": "log-L4-053",
    "domain": "logistics",
    "level": 4,
    "order": 53,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_53() and bind trigger trg_audit_fleet_vehicles_53 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_53(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_53() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_53 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_53(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-054",
    "domain": "logistics",
    "level": 4,
    "order": 54,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-055",
    "domain": "logistics",
    "level": 4,
    "order": 55,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_55 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_55 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_55 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-056",
    "domain": "logistics",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-057",
    "domain": "logistics",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-058",
    "domain": "logistics",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_58 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_58 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_58 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-059",
    "domain": "logistics",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-060",
    "domain": "logistics",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_60(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_60(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_60(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_60(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-061",
    "domain": "logistics",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-062",
    "domain": "logistics",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-063",
    "domain": "logistics",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_63 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_63 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-064",
    "domain": "logistics",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_64 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_64 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_64_low PARTITION OF shipments_part_64 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_64_high PARTITION OF shipments_part_64 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_64 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_64;",
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
    "id": "log-L4-065",
    "domain": "logistics",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_65() and bind trigger trg_audit_fleet_vehicles_65 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_65(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_65() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_65 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_65(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-066",
    "domain": "logistics",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-067",
    "domain": "logistics",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_67 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_67 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_67 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-068",
    "domain": "logistics",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-069",
    "domain": "logistics",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-070",
    "domain": "logistics",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_70 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_70 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_70 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-071",
    "domain": "logistics",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-072",
    "domain": "logistics",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_72(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_72(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_72(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_72(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-073",
    "domain": "logistics",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-074",
    "domain": "logistics",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-075",
    "domain": "logistics",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_75 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_75 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-076",
    "domain": "logistics",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_76 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_76 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_76_low PARTITION OF shipments_part_76 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_76_high PARTITION OF shipments_part_76 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_76 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_76;",
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
    "id": "log-L4-077",
    "domain": "logistics",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_77() and bind trigger trg_audit_fleet_vehicles_77 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_77(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_77() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_77 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_77(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-078",
    "domain": "logistics",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-079",
    "domain": "logistics",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_79 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_79 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_79 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-080",
    "domain": "logistics",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-081",
    "domain": "logistics",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-082",
    "domain": "logistics",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_82 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_82 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_82 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-083",
    "domain": "logistics",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-084",
    "domain": "logistics",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_84(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_84(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_84(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_84(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-085",
    "domain": "logistics",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-086",
    "domain": "logistics",
    "level": 4,
    "order": 86,
    "difficulty": "challenging",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-087",
    "domain": "logistics",
    "level": 4,
    "order": 87,
    "difficulty": "challenging",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_87 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_87 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-088",
    "domain": "logistics",
    "level": 4,
    "order": 88,
    "difficulty": "challenging",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_88 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_88 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_88_low PARTITION OF shipments_part_88 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_88_high PARTITION OF shipments_part_88 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_88 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_88;",
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
    "id": "log-L4-089",
    "domain": "logistics",
    "level": 4,
    "order": 89,
    "difficulty": "challenging",
    "title": "Regulatory Mandate: Immutable Audit Trigger",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compliance Officer Directive: Create an event trigger on fleet_vehicles to monitor record mutations. Define function fn_audit_fleet_vehicles_89() and bind trigger trg_audit_fleet_vehicles_89 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_89(). Then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE FUNCTION fn_audit_fleet_vehicles_89() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_fleet_vehicles_89 BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION fn_audit_fleet_vehicles_89(); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-090",
    "domain": "logistics",
    "level": 4,
    "order": 90,
    "difficulty": "challenging",
    "title": "Data Quality Defense: Division-by-Zero Protection with NULLIF",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Metrics Audit: When calculating performance ratios in fleet_vehicles, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, vehicle_number, and ROUND((max_weight_capacity_kg / NULLIF(COALESCE(max_weight_capacity_kg, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-091",
    "domain": "logistics",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Executive Abstraction Layer: Secure Database View",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"VP Request: Create a sanitized reporting View named v_exec_summary_warehouses_91 joining warehouses and carriers on t1.id = t2.id. Project t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, and COALESCE(t2.carrier_name, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE OR REPLACE VIEW v_exec_summary_warehouses_91 AS SELECT t1.id, COALESCE(t1.city, 'Unassigned') AS primary_name, COALESCE(t2.carrier_name, 'None') AS secondary_name FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id; SELECT id, primary_name, secondary_name FROM v_exec_summary_warehouses_91 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-092",
    "domain": "logistics",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Multi-Stage Quartile Stratification (CTE & NTILE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive Memo: Segment records in fleet_vehicles into 4 analytical quartiles based on max_weight_capacity_kg using NTILE(4) within a CTE named cohort_analysis. Return id, vehicle_number, max_weight_capacity_kg, and quartile ordered by quartile ASC, max_weight_capacity_kg DESC. (Limit to 25 records).\"",
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
    "id": "log-L4-093",
    "domain": "logistics",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Revenue Velocity Analysis: Dual-Horizon LAG & LEAD",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Financial Growth Memo: In shipments, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(weight_kg) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).\"",
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
  },
  {
    "id": "log-L4-094",
    "domain": "logistics",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Data Cleaning Pipeline: Ingestion & Imputation (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: Ingest and cleanse active records from fleet_vehicles. Create a Temporary Staging Table named temp_fleet_vehicles_cln_94 containing id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount where vehicle_number IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_cln_94 AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(ROUND(max_weight_capacity_kg * 1.08, 2), 0.00) AS adjusted_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_fleet_vehicles_cln_94 ORDER BY adjusted_amount DESC LIMIT 20;",
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
    "id": "log-L4-095",
    "domain": "logistics",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Optimizer Path Profiling: EXPLAIN Plan Inspection",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Performance Directive: Diagnose sequential scan bottlenecks in shipments. Run an EXPLAIN (FORMAT JSON) on a query selecting id and weight_kg from shipments where weight_kg > 25 to inspect execution cost and planned access nodes.\"",
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
    "id": "log-L4-096",
    "domain": "logistics",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Operational Automation: Settlement Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_fleet_vehicles_96(p_id INT, p_val NUMERIC) that updates max_weight_capacity_kg by adding p_val for the specified id. Execute with CALL sp_reconcile_fleet_vehicles_96(1, 10); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
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
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_reconcile_fleet_vehicles_96(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_fleet_vehicles_96(1, 10); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
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
    "id": "log-L4-097",
    "domain": "logistics",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Data Scrubbing: Text Normalization and Null Filtering",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Alert: Standardize legacy text fields in warehouses. Select id, UPPER(TRIM(city)) AS standardized_title, and COALESCE(id, 0) AS safe_code from warehouses where city IS NOT NULL ORDER BY id ASC. (Limit to 20 records).\"",
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
    "id": "log-L4-098",
    "domain": "logistics",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Anomaly Detection: Correlated Subquery with EXISTS",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Discrepancy: Identify all warehouses entries that have active corresponding associations in carriers. Using a Correlated Subquery with EXISTS, return t1.id and t1.city ordered by t1.id ASC. (Limit to 20 records).\"",
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
  },
  {
    "id": "log-L4-099",
    "domain": "logistics",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Incident Response: High-Cardinality Index Optimization",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"ALERT: The dashboard query on shipments is causing severe CPU spikes. Create a composite index named idx_shipments_opt_99 ON shipments(id, weight_kg DESC). Then retrieve id, destination_city, weight_kg where weight_kg > 30 ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE INDEX idx_shipments_opt_99 ON shipments(id, weight_kg DESC); SELECT id, destination_city, weight_kg FROM shipments WHERE weight_kg > 30 ORDER BY id ASC LIMIT 20;",
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
    "id": "log-L4-100",
    "domain": "logistics",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Storage Scale Architecture: Declarative Table Partitioning",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Directive: Ledger shipments is reaching multi-gigabyte scale. Create a partitioned table named shipments_part_100 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.\"",
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
    "reference_sql": "CREATE TABLE shipments_part_100 (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE shipments_part_100_low PARTITION OF shipments_part_100 FOR VALUES FROM (0) TO (100); CREATE TABLE shipments_part_100_high PARTITION OF shipments_part_100 FOR VALUES FROM (100) TO (100000); INSERT INTO shipments_part_100 VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM shipments_part_100;",
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
