import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L3-001",
    "domain": "logistics",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in parts_inventory (Q1)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #1 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in parts_inventory. Select id, part_number AS item_title, and quantity_in_stock AS metric_score where quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(quantity_in_stock)"
    ],
    "reference_sql": "SELECT id, part_number AS item_title, quantity_in_stock AS metric_score FROM parts_inventory WHERE quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-002",
    "domain": "logistics",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q2)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #2 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter shipments using an IN subquery against active ids. Return id and destination_city AS filtered_name where id IN (SELECT id FROM shipments WHERE id >= 3) ORDER BY id ASC LIMIT 12;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, destination_city AS filtered_name FROM shipments WHERE id IN (SELECT id FROM shipments WHERE id >= 3) ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-003",
    "domain": "logistics",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q3)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #3 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in cargo_packages. Select id, shipment_id::text AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from cargo_packages ORDER BY id ASC LIMIT 13;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM cargo_packages ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-004",
    "domain": "logistics",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q4)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #4 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from delivery_checkpoints and customs_declarations. Select location_name::text AS entity_name, 'Primary Stream' AS source_tier from delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 34 UNION ALL SELECT port_of_entry::text AS entity_name, 'Secondary Stream' AS source_tier from customs_declarations WHERE port_of_entry IS NOT NULL ORDER BY entity_name ASC LIMIT 14;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT location_name::text AS entity_name, 'Primary Stream' AS source_tier FROM delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 34 UNION ALL SELECT port_of_entry::text AS entity_name, 'Secondary Stream' AS source_tier FROM customs_declarations WHERE port_of_entry IS NOT NULL ORDER BY entity_name ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-005",
    "domain": "logistics",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q5)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #5 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in fuel_logs. Return t.id and t.vehicle_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.vehicle_id::text AS confirmed_item FROM fuel_logs t WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-006",
    "domain": "logistics",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in maintenance_records (Q6)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #6 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from maintenance_records. Project dt.id, dt.service_type AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 16;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "service_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.service_type AS derived_name, dt.score FROM (SELECT id, service_type, cost AS score FROM maintenance_records WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-007",
    "domain": "logistics",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in customs_declarations (Q7)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #7 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in customs_declarations. Select id, port_of_entry AS item_title, and duty_amount AS metric_score where duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(duty_amount)"
    ],
    "reference_sql": "SELECT id, port_of_entry AS item_title, duty_amount AS metric_score FROM customs_declarations WHERE duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-008",
    "domain": "logistics",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q8)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #8 - Sarah Jenkins (Head of Freight Compliance)]: Filter parts_inventory using an IN subquery against active ids. Return id and part_number AS filtered_name where id IN (SELECT id FROM parts_inventory WHERE id >= 4) ORDER BY id ASC LIMIT 18;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, part_number AS filtered_name FROM parts_inventory WHERE id IN (SELECT id FROM parts_inventory WHERE id >= 4) ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-009",
    "domain": "logistics",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q9)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #9 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in shipments. Select id, destination_city AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from shipments ORDER BY id ASC LIMIT 19;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, destination_city AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM shipments ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-010",
    "domain": "logistics",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q10)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #10 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from cargo_packages and suppliers. Select shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier from cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT supplier_name::text AS entity_name, 'Secondary Stream' AS source_tier from suppliers WHERE supplier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 20;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT supplier_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM suppliers WHERE supplier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-011",
    "domain": "logistics",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q11)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #11 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in delivery_checkpoints. Return t.id and t.location_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.location_name AS confirmed_item FROM delivery_checkpoints t WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-012",
    "domain": "logistics",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in fuel_logs (Q12)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #12 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from fuel_logs. Project dt.id, dt.vehicle_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 22;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.vehicle_id::text AS derived_name, dt.score FROM (SELECT id, vehicle_id::text, gallons AS score FROM fuel_logs WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-013",
    "domain": "logistics",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in maintenance_records (Q13)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #13 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in maintenance_records. Select id, service_type AS item_title, and cost AS metric_score where cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(cost)"
    ],
    "reference_sql": "SELECT id, service_type AS item_title, cost AS metric_score FROM maintenance_records WHERE cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-014",
    "domain": "logistics",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q14)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #14 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter customs_declarations using an IN subquery against active ids. Return id and port_of_entry AS filtered_name where id IN (SELECT id FROM customs_declarations WHERE id >= 5) ORDER BY id ASC LIMIT 24;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, port_of_entry AS filtered_name FROM customs_declarations WHERE id IN (SELECT id FROM customs_declarations WHERE id >= 5) ORDER BY id ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-015",
    "domain": "logistics",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q15)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #15 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in parts_inventory. Select id, part_number AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from parts_inventory ORDER BY id ASC LIMIT 25;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, part_number AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM parts_inventory ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "log-L3-016",
    "domain": "logistics",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q16)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #16 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from shipments and delivery_checkpoints. Select destination_city::text AS entity_name, 'Primary Stream' AS source_tier from shipments WHERE destination_city IS NOT NULL AND id <= 46 UNION ALL SELECT location_name::text AS entity_name, 'Secondary Stream' AS source_tier from delivery_checkpoints WHERE location_name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT destination_city::text AS entity_name, 'Primary Stream' AS source_tier FROM shipments WHERE destination_city IS NOT NULL AND id <= 46 UNION ALL SELECT location_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM delivery_checkpoints WHERE location_name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-017",
    "domain": "logistics",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q17)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #17 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in cargo_packages. Return t.id and t.shipment_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM cargo_packages sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.shipment_id::text AS confirmed_item FROM cargo_packages t WHERE EXISTS (SELECT 1 FROM cargo_packages sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-018",
    "domain": "logistics",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in delivery_checkpoints (Q18)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #18 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from delivery_checkpoints. Project dt.id, dt.location_name AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 28;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "location_name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.location_name AS derived_name, dt.score FROM (SELECT id, location_name, id AS score FROM delivery_checkpoints WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-019",
    "domain": "logistics",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in fuel_logs (Q19)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #19 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in fuel_logs. Select id, vehicle_id::text AS item_title, and gallons AS metric_score where gallons >= (SELECT MIN(gallons) FROM fuel_logs) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(gallons)"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS item_title, gallons AS metric_score FROM fuel_logs WHERE gallons >= (SELECT MIN(gallons) FROM fuel_logs) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-020",
    "domain": "logistics",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q20)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #20 - Sarah Jenkins (Head of Freight Compliance)]: Filter maintenance_records using an IN subquery against active ids. Return id and service_type AS filtered_name where id IN (SELECT id FROM maintenance_records WHERE id >= 1) ORDER BY id ASC LIMIT 30;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, service_type AS filtered_name FROM maintenance_records WHERE id IN (SELECT id FROM maintenance_records WHERE id >= 1) ORDER BY id ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-021",
    "domain": "logistics",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q21)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #21 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in customs_declarations. Select id, port_of_entry AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from customs_declarations ORDER BY id ASC LIMIT 31;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM customs_declarations ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-022",
    "domain": "logistics",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q22)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #22 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from parts_inventory and carriers. Select part_number::text AS entity_name, 'Primary Stream' AS source_tier from parts_inventory WHERE part_number IS NOT NULL AND id <= 52 UNION ALL SELECT carrier_name::text AS entity_name, 'Secondary Stream' AS source_tier from carriers WHERE carrier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 32;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT part_number::text AS entity_name, 'Primary Stream' AS source_tier FROM parts_inventory WHERE part_number IS NOT NULL AND id <= 52 UNION ALL SELECT carrier_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM carriers WHERE carrier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-023",
    "domain": "logistics",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q23)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #23 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in shipments. Return t.id and t.destination_city AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.destination_city AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-024",
    "domain": "logistics",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in cargo_packages (Q24)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #24 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from cargo_packages. Project dt.id, dt.shipment_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 34;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.shipment_id::text AS derived_name, dt.score FROM (SELECT id, shipment_id::text, weight_kg AS score FROM cargo_packages WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-025",
    "domain": "logistics",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in delivery_checkpoints (Q25)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #25 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in delivery_checkpoints. Select id, location_name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM delivery_checkpoints) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, location_name AS item_title, id AS metric_score FROM delivery_checkpoints WHERE id >= (SELECT MIN(id) FROM delivery_checkpoints) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-026",
    "domain": "logistics",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q26)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #26 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter fuel_logs using an IN subquery against active ids. Return id and vehicle_id::text AS filtered_name where id IN (SELECT id FROM fuel_logs WHERE id >= 2) ORDER BY id ASC LIMIT 36;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS filtered_name FROM fuel_logs WHERE id IN (SELECT id FROM fuel_logs WHERE id >= 2) ORDER BY id ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-027",
    "domain": "logistics",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q27)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #27 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in maintenance_records. Select id, service_type AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from maintenance_records ORDER BY id ASC LIMIT 37;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, service_type AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM maintenance_records ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-028",
    "domain": "logistics",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q28)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #28 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from customs_declarations and shipments. Select port_of_entry::text AS entity_name, 'Primary Stream' AS source_tier from customs_declarations WHERE port_of_entry IS NOT NULL AND id <= 58 UNION ALL SELECT destination_city::text AS entity_name, 'Secondary Stream' AS source_tier from shipments WHERE destination_city IS NOT NULL ORDER BY entity_name ASC LIMIT 38;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT port_of_entry::text AS entity_name, 'Primary Stream' AS source_tier FROM customs_declarations WHERE port_of_entry IS NOT NULL AND id <= 58 UNION ALL SELECT destination_city::text AS entity_name, 'Secondary Stream' AS source_tier FROM shipments WHERE destination_city IS NOT NULL ORDER BY entity_name ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-029",
    "domain": "logistics",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q29)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #29 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in parts_inventory. Return t.id and t.part_number AS confirmed_item WHERE EXISTS (SELECT 1 FROM parts_inventory sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.part_number AS confirmed_item FROM parts_inventory t WHERE EXISTS (SELECT 1 FROM parts_inventory sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-030",
    "domain": "logistics",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in shipments (Q30)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #30 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from shipments. Project dt.id, dt.destination_city AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 40;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.destination_city AS derived_name, dt.score FROM (SELECT id, destination_city, weight_kg AS score FROM shipments WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-031",
    "domain": "logistics",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in cargo_packages (Q31)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #31 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in cargo_packages. Select id, shipment_id::text AS item_title, and weight_kg AS metric_score where weight_kg >= (SELECT MIN(weight_kg) FROM cargo_packages) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(weight_kg)"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS item_title, weight_kg AS metric_score FROM cargo_packages WHERE weight_kg >= (SELECT MIN(weight_kg) FROM cargo_packages) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-032",
    "domain": "logistics",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q32)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #32 - Sarah Jenkins (Head of Freight Compliance)]: Filter delivery_checkpoints using an IN subquery against active ids. Return id and location_name AS filtered_name where id IN (SELECT id FROM delivery_checkpoints WHERE id >= 3) ORDER BY id ASC LIMIT 42;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, location_name AS filtered_name FROM delivery_checkpoints WHERE id IN (SELECT id FROM delivery_checkpoints WHERE id >= 3) ORDER BY id ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-033",
    "domain": "logistics",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q33)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #33 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in fuel_logs. Select id, vehicle_id::text AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from fuel_logs ORDER BY id ASC LIMIT 43;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM fuel_logs ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-034",
    "domain": "logistics",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q34)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #34 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from maintenance_records and maintenance_records. Select service_type::text AS entity_name, 'Primary Stream' AS source_tier from maintenance_records WHERE service_type IS NOT NULL AND id <= 64 UNION ALL SELECT service_type::text AS entity_name, 'Secondary Stream' AS source_tier from maintenance_records WHERE service_type IS NOT NULL ORDER BY entity_name ASC LIMIT 44;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT service_type::text AS entity_name, 'Primary Stream' AS source_tier FROM maintenance_records WHERE service_type IS NOT NULL AND id <= 64 UNION ALL SELECT service_type::text AS entity_name, 'Secondary Stream' AS source_tier FROM maintenance_records WHERE service_type IS NOT NULL ORDER BY entity_name ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-035",
    "domain": "logistics",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q35)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #35 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in customs_declarations. Return t.id and t.port_of_entry AS confirmed_item WHERE EXISTS (SELECT 1 FROM customs_declarations sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.port_of_entry AS confirmed_item FROM customs_declarations t WHERE EXISTS (SELECT 1 FROM customs_declarations sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-036",
    "domain": "logistics",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in parts_inventory (Q36)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #36 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from parts_inventory. Project dt.id, dt.part_number AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 46;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "part_number",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.part_number AS derived_name, dt.score FROM (SELECT id, part_number, quantity_in_stock AS score FROM parts_inventory WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-037",
    "domain": "logistics",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in shipments (Q37)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #37 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in shipments. Select id, destination_city AS item_title, and weight_kg AS metric_score where weight_kg >= (SELECT MIN(weight_kg) FROM shipments) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(weight_kg)"
    ],
    "reference_sql": "SELECT id, destination_city AS item_title, weight_kg AS metric_score FROM shipments WHERE weight_kg >= (SELECT MIN(weight_kg) FROM shipments) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-038",
    "domain": "logistics",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q38)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #38 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter cargo_packages using an IN subquery against active ids. Return id and shipment_id::text AS filtered_name where id IN (SELECT id FROM cargo_packages WHERE id >= 4) ORDER BY id ASC LIMIT 48;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS filtered_name FROM cargo_packages WHERE id IN (SELECT id FROM cargo_packages WHERE id >= 4) ORDER BY id ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-039",
    "domain": "logistics",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q39)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #39 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in delivery_checkpoints. Select id, location_name AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from delivery_checkpoints ORDER BY id ASC LIMIT 49;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, location_name AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM delivery_checkpoints ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-040",
    "domain": "logistics",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q40)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #40 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from fuel_logs and drivers. Select vehicle_id::text::text AS entity_name, 'Primary Stream' AS source_tier from fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier from drivers WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT vehicle_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM drivers WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-041",
    "domain": "logistics",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q41)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #41 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in maintenance_records. Return t.id and t.service_type AS confirmed_item WHERE EXISTS (SELECT 1 FROM maintenance_records sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.service_type AS confirmed_item FROM maintenance_records t WHERE EXISTS (SELECT 1 FROM maintenance_records sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-042",
    "domain": "logistics",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in customs_declarations (Q42)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #42 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from customs_declarations. Project dt.id, dt.port_of_entry AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 52;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "port_of_entry",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.port_of_entry AS derived_name, dt.score FROM (SELECT id, port_of_entry, duty_amount AS score FROM customs_declarations WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-043",
    "domain": "logistics",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in parts_inventory (Q43)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #43 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in parts_inventory. Select id, part_number AS item_title, and quantity_in_stock AS metric_score where quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(quantity_in_stock)"
    ],
    "reference_sql": "SELECT id, part_number AS item_title, quantity_in_stock AS metric_score FROM parts_inventory WHERE quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-044",
    "domain": "logistics",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q44)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #44 - Sarah Jenkins (Head of Freight Compliance)]: Filter shipments using an IN subquery against active ids. Return id and destination_city AS filtered_name where id IN (SELECT id FROM shipments WHERE id >= 5) ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, destination_city AS filtered_name FROM shipments WHERE id IN (SELECT id FROM shipments WHERE id >= 5) ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-045",
    "domain": "logistics",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q45)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #45 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in cargo_packages. Select id, shipment_id::text AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from cargo_packages ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM cargo_packages ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-046",
    "domain": "logistics",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q46)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #46 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from delivery_checkpoints and freight_routes. Select location_name::text AS entity_name, 'Primary Stream' AS source_tier from delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 76 UNION ALL SELECT route_name::text AS entity_name, 'Secondary Stream' AS source_tier from freight_routes WHERE route_name IS NOT NULL ORDER BY entity_name ASC LIMIT 56;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT location_name::text AS entity_name, 'Primary Stream' AS source_tier FROM delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 76 UNION ALL SELECT route_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM freight_routes WHERE route_name IS NOT NULL ORDER BY entity_name ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-047",
    "domain": "logistics",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q47)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #47 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in fuel_logs. Return t.id and t.vehicle_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.vehicle_id::text AS confirmed_item FROM fuel_logs t WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-048",
    "domain": "logistics",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in maintenance_records (Q48)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #48 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from maintenance_records. Project dt.id, dt.service_type AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 58;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "service_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.service_type AS derived_name, dt.score FROM (SELECT id, service_type, cost AS score FROM maintenance_records WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-049",
    "domain": "logistics",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in customs_declarations (Q49)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #49 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in customs_declarations. Select id, port_of_entry AS item_title, and duty_amount AS metric_score where duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(duty_amount)"
    ],
    "reference_sql": "SELECT id, port_of_entry AS item_title, duty_amount AS metric_score FROM customs_declarations WHERE duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-050",
    "domain": "logistics",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q50)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #50 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter parts_inventory using an IN subquery against active ids. Return id and part_number AS filtered_name where id IN (SELECT id FROM parts_inventory WHERE id >= 1) ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, part_number AS filtered_name FROM parts_inventory WHERE id IN (SELECT id FROM parts_inventory WHERE id >= 1) ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-051",
    "domain": "logistics",
    "level": 3,
    "order": 51,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q51)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #51 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in shipments. Select id, destination_city AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from shipments ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, destination_city AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM shipments ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-052",
    "domain": "logistics",
    "level": 3,
    "order": 52,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q52)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #52 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from cargo_packages and warehouses. Select shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier from cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT city::text AS entity_name, 'Secondary Stream' AS source_tier from warehouses WHERE city IS NOT NULL ORDER BY entity_name ASC LIMIT 62;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT city::text AS entity_name, 'Secondary Stream' AS source_tier FROM warehouses WHERE city IS NOT NULL ORDER BY entity_name ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-053",
    "domain": "logistics",
    "level": 3,
    "order": 53,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q53)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #53 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in delivery_checkpoints. Return t.id and t.location_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.location_name AS confirmed_item FROM delivery_checkpoints t WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-054",
    "domain": "logistics",
    "level": 3,
    "order": 54,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in fuel_logs (Q54)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #54 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from fuel_logs. Project dt.id, dt.vehicle_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 64;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.vehicle_id::text AS derived_name, dt.score FROM (SELECT id, vehicle_id::text, gallons AS score FROM fuel_logs WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-055",
    "domain": "logistics",
    "level": 3,
    "order": 55,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in maintenance_records (Q55)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #55 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in maintenance_records. Select id, service_type AS item_title, and cost AS metric_score where cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(cost)"
    ],
    "reference_sql": "SELECT id, service_type AS item_title, cost AS metric_score FROM maintenance_records WHERE cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-056",
    "domain": "logistics",
    "level": 3,
    "order": 56,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q56)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #56 - Sarah Jenkins (Head of Freight Compliance)]: Filter customs_declarations using an IN subquery against active ids. Return id and port_of_entry AS filtered_name where id IN (SELECT id FROM customs_declarations WHERE id >= 2) ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, port_of_entry AS filtered_name FROM customs_declarations WHERE id IN (SELECT id FROM customs_declarations WHERE id >= 2) ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-057",
    "domain": "logistics",
    "level": 3,
    "order": 57,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q57)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #57 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in parts_inventory. Select id, part_number AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from parts_inventory ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, part_number AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM parts_inventory ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-058",
    "domain": "logistics",
    "level": 3,
    "order": 58,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q58)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #58 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from shipments and parts_inventory. Select destination_city::text AS entity_name, 'Primary Stream' AS source_tier from shipments WHERE destination_city IS NOT NULL AND id <= 88 UNION ALL SELECT part_number::text AS entity_name, 'Secondary Stream' AS source_tier from parts_inventory WHERE part_number IS NOT NULL ORDER BY entity_name ASC LIMIT 68;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT destination_city::text AS entity_name, 'Primary Stream' AS source_tier FROM shipments WHERE destination_city IS NOT NULL AND id <= 88 UNION ALL SELECT part_number::text AS entity_name, 'Secondary Stream' AS source_tier FROM parts_inventory WHERE part_number IS NOT NULL ORDER BY entity_name ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-059",
    "domain": "logistics",
    "level": 3,
    "order": 59,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q59)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #59 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in cargo_packages. Return t.id and t.shipment_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM cargo_packages sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.shipment_id::text AS confirmed_item FROM cargo_packages t WHERE EXISTS (SELECT 1 FROM cargo_packages sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-060",
    "domain": "logistics",
    "level": 3,
    "order": 60,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in delivery_checkpoints (Q60)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #60 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from delivery_checkpoints. Project dt.id, dt.location_name AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 70;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "location_name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.location_name AS derived_name, dt.score FROM (SELECT id, location_name, id AS score FROM delivery_checkpoints WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "log-L3-061",
    "domain": "logistics",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in fuel_logs (Q61)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #61 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in fuel_logs. Select id, vehicle_id::text AS item_title, and gallons AS metric_score where gallons >= (SELECT MIN(gallons) FROM fuel_logs) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(gallons)"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS item_title, gallons AS metric_score FROM fuel_logs WHERE gallons >= (SELECT MIN(gallons) FROM fuel_logs) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-062",
    "domain": "logistics",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q62)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #62 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter maintenance_records using an IN subquery against active ids. Return id and service_type AS filtered_name where id IN (SELECT id FROM maintenance_records WHERE id >= 3) ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, service_type AS filtered_name FROM maintenance_records WHERE id IN (SELECT id FROM maintenance_records WHERE id >= 3) ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-063",
    "domain": "logistics",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q63)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #63 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in customs_declarations. Select id, port_of_entry AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from customs_declarations ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM customs_declarations ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-064",
    "domain": "logistics",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q64)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #64 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from parts_inventory and fuel_logs. Select part_number::text AS entity_name, 'Primary Stream' AS source_tier from parts_inventory WHERE part_number IS NOT NULL AND id <= 94 UNION ALL SELECT vehicle_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from fuel_logs WHERE vehicle_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 74;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT part_number::text AS entity_name, 'Primary Stream' AS source_tier FROM parts_inventory WHERE part_number IS NOT NULL AND id <= 94 UNION ALL SELECT vehicle_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM fuel_logs WHERE vehicle_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-065",
    "domain": "logistics",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q65)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #65 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in shipments. Return t.id and t.destination_city AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.destination_city AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-066",
    "domain": "logistics",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in cargo_packages (Q66)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #66 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from cargo_packages. Project dt.id, dt.shipment_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 76;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.shipment_id::text AS derived_name, dt.score FROM (SELECT id, shipment_id::text, weight_kg AS score FROM cargo_packages WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-067",
    "domain": "logistics",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in delivery_checkpoints (Q67)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #67 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in delivery_checkpoints. Select id, location_name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM delivery_checkpoints) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, location_name AS item_title, id AS metric_score FROM delivery_checkpoints WHERE id >= (SELECT MIN(id) FROM delivery_checkpoints) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-068",
    "domain": "logistics",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q68)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #68 - Sarah Jenkins (Head of Freight Compliance)]: Filter fuel_logs using an IN subquery against active ids. Return id and vehicle_id::text AS filtered_name where id IN (SELECT id FROM fuel_logs WHERE id >= 4) ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS filtered_name FROM fuel_logs WHERE id IN (SELECT id FROM fuel_logs WHERE id >= 4) ORDER BY id ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-069",
    "domain": "logistics",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q69)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #69 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in maintenance_records. Select id, service_type AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from maintenance_records ORDER BY id ASC LIMIT 79;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, service_type AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM maintenance_records ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-070",
    "domain": "logistics",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q70)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #70 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from customs_declarations and fleet_vehicles. Select port_of_entry::text AS entity_name, 'Primary Stream' AS source_tier from customs_declarations WHERE port_of_entry IS NOT NULL AND id <= 100 UNION ALL SELECT vehicle_number::text AS entity_name, 'Secondary Stream' AS source_tier from fleet_vehicles WHERE vehicle_number IS NOT NULL ORDER BY entity_name ASC LIMIT 80;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT port_of_entry::text AS entity_name, 'Primary Stream' AS source_tier FROM customs_declarations WHERE port_of_entry IS NOT NULL AND id <= 100 UNION ALL SELECT vehicle_number::text AS entity_name, 'Secondary Stream' AS source_tier FROM fleet_vehicles WHERE vehicle_number IS NOT NULL ORDER BY entity_name ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-071",
    "domain": "logistics",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q71)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #71 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in parts_inventory. Return t.id and t.part_number AS confirmed_item WHERE EXISTS (SELECT 1 FROM parts_inventory sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.part_number AS confirmed_item FROM parts_inventory t WHERE EXISTS (SELECT 1 FROM parts_inventory sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-072",
    "domain": "logistics",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in shipments (Q72)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #72 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from shipments. Project dt.id, dt.destination_city AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 82;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "destination_city",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.destination_city AS derived_name, dt.score FROM (SELECT id, destination_city, weight_kg AS score FROM shipments WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-073",
    "domain": "logistics",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in cargo_packages (Q73)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #73 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in cargo_packages. Select id, shipment_id::text AS item_title, and weight_kg AS metric_score where weight_kg >= (SELECT MIN(weight_kg) FROM cargo_packages) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(weight_kg)"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS item_title, weight_kg AS metric_score FROM cargo_packages WHERE weight_kg >= (SELECT MIN(weight_kg) FROM cargo_packages) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-074",
    "domain": "logistics",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q74)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #74 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter delivery_checkpoints using an IN subquery against active ids. Return id and location_name AS filtered_name where id IN (SELECT id FROM delivery_checkpoints WHERE id >= 5) ORDER BY id ASC LIMIT 84;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, location_name AS filtered_name FROM delivery_checkpoints WHERE id IN (SELECT id FROM delivery_checkpoints WHERE id >= 5) ORDER BY id ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-075",
    "domain": "logistics",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q75)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #75 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in fuel_logs. Select id, vehicle_id::text AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from fuel_logs ORDER BY id ASC LIMIT 85;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM fuel_logs ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-076",
    "domain": "logistics",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q76)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #76 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from maintenance_records and cargo_packages. Select service_type::text AS entity_name, 'Primary Stream' AS source_tier from maintenance_records WHERE service_type IS NOT NULL AND id <= 106 UNION ALL SELECT shipment_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from cargo_packages WHERE shipment_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 86;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT service_type::text AS entity_name, 'Primary Stream' AS source_tier FROM maintenance_records WHERE service_type IS NOT NULL AND id <= 106 UNION ALL SELECT shipment_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM cargo_packages WHERE shipment_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-077",
    "domain": "logistics",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q77)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #77 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in customs_declarations. Return t.id and t.port_of_entry AS confirmed_item WHERE EXISTS (SELECT 1 FROM customs_declarations sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.port_of_entry AS confirmed_item FROM customs_declarations t WHERE EXISTS (SELECT 1 FROM customs_declarations sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-078",
    "domain": "logistics",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in parts_inventory (Q78)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #78 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from parts_inventory. Project dt.id, dt.part_number AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 88;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "part_number",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.part_number AS derived_name, dt.score FROM (SELECT id, part_number, quantity_in_stock AS score FROM parts_inventory WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-079",
    "domain": "logistics",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in shipments (Q79)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #79 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in shipments. Select id, destination_city AS item_title, and weight_kg AS metric_score where weight_kg >= (SELECT MIN(weight_kg) FROM shipments) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(weight_kg)"
    ],
    "reference_sql": "SELECT id, destination_city AS item_title, weight_kg AS metric_score FROM shipments WHERE weight_kg >= (SELECT MIN(weight_kg) FROM shipments) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-080",
    "domain": "logistics",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q80)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #80 - Sarah Jenkins (Head of Freight Compliance)]: Filter cargo_packages using an IN subquery against active ids. Return id and shipment_id::text AS filtered_name where id IN (SELECT id FROM cargo_packages WHERE id >= 1) ORDER BY id ASC LIMIT 90;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS filtered_name FROM cargo_packages WHERE id IN (SELECT id FROM cargo_packages WHERE id >= 1) ORDER BY id ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-081",
    "domain": "logistics",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q81)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #81 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in delivery_checkpoints. Select id, location_name AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from delivery_checkpoints ORDER BY id ASC LIMIT 91;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, location_name AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM delivery_checkpoints ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-082",
    "domain": "logistics",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q82)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #82 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from fuel_logs and customs_declarations. Select vehicle_id::text::text AS entity_name, 'Primary Stream' AS source_tier from fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT port_of_entry::text AS entity_name, 'Secondary Stream' AS source_tier from customs_declarations WHERE port_of_entry IS NOT NULL ORDER BY entity_name ASC LIMIT 92;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT vehicle_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT port_of_entry::text AS entity_name, 'Secondary Stream' AS source_tier FROM customs_declarations WHERE port_of_entry IS NOT NULL ORDER BY entity_name ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-083",
    "domain": "logistics",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q83)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #83 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in maintenance_records. Return t.id and t.service_type AS confirmed_item WHERE EXISTS (SELECT 1 FROM maintenance_records sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.service_type AS confirmed_item FROM maintenance_records t WHERE EXISTS (SELECT 1 FROM maintenance_records sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-084",
    "domain": "logistics",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in customs_declarations (Q84)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #84 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from customs_declarations. Project dt.id, dt.port_of_entry AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 94;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "port_of_entry",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.port_of_entry AS derived_name, dt.score FROM (SELECT id, port_of_entry, duty_amount AS score FROM customs_declarations WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-085",
    "domain": "logistics",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in parts_inventory (Q85)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #85 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in parts_inventory. Select id, part_number AS item_title, and quantity_in_stock AS metric_score where quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(quantity_in_stock)"
    ],
    "reference_sql": "SELECT id, part_number AS item_title, quantity_in_stock AS metric_score FROM parts_inventory WHERE quantity_in_stock >= (SELECT MIN(quantity_in_stock) FROM parts_inventory) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-086",
    "domain": "logistics",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q86)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #86 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter shipments using an IN subquery against active ids. Return id and destination_city AS filtered_name where id IN (SELECT id FROM shipments WHERE id >= 2) ORDER BY id ASC LIMIT 96;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, destination_city AS filtered_name FROM shipments WHERE id IN (SELECT id FROM shipments WHERE id >= 2) ORDER BY id ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-087",
    "domain": "logistics",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q87)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #87 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in cargo_packages. Select id, shipment_id::text AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from cargo_packages ORDER BY id ASC LIMIT 97;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM cargo_packages ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-088",
    "domain": "logistics",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q88)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #88 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from delivery_checkpoints and suppliers. Select location_name::text AS entity_name, 'Primary Stream' AS source_tier from delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 118 UNION ALL SELECT supplier_name::text AS entity_name, 'Secondary Stream' AS source_tier from suppliers WHERE supplier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT location_name::text AS entity_name, 'Primary Stream' AS source_tier FROM delivery_checkpoints WHERE location_name IS NOT NULL AND id <= 118 UNION ALL SELECT supplier_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM suppliers WHERE supplier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "log-L3-089",
    "domain": "logistics",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q89)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #89 - Dave Miller (VP of Global Fleet Operations)]: Verify relational existence in fuel_logs. Return t.id and t.vehicle_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.vehicle_id::text AS confirmed_item FROM fuel_logs t WHERE EXISTS (SELECT 1 FROM fuel_logs sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-090",
    "domain": "logistics",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in maintenance_records (Q90)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #90 - Claire Sullivan (Director of Supply Chain Logistics)]: Query derived table from maintenance_records. Project dt.id, dt.service_type AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 100;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "service_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.service_type AS derived_name, dt.score FROM (SELECT id, service_type, cost AS score FROM maintenance_records WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-091",
    "domain": "logistics",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in customs_declarations (Q91)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #91 - Frank Miller (Terminal Dispatch Manager)]: Isolate records in customs_declarations. Select id, port_of_entry AS item_title, and duty_amount AS metric_score where duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(duty_amount)"
    ],
    "reference_sql": "SELECT id, port_of_entry AS item_title, duty_amount AS metric_score FROM customs_declarations WHERE duty_amount >= (SELECT MIN(duty_amount) FROM customs_declarations) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-092",
    "domain": "logistics",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q92)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #92 - Sarah Jenkins (Head of Freight Compliance)]: Filter parts_inventory using an IN subquery against active ids. Return id and part_number AS filtered_name where id IN (SELECT id FROM parts_inventory WHERE id >= 3) ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, part_number AS filtered_name FROM parts_inventory WHERE id IN (SELECT id FROM parts_inventory WHERE id >= 3) ORDER BY id ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-093",
    "domain": "logistics",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q93)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #93 - Dave Miller (VP of Global Fleet Operations)]: Classify entries in shipments. Select id, destination_city AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from shipments ORDER BY id ASC LIMIT 103;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, destination_city AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM shipments ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-094",
    "domain": "logistics",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q94)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #94 - Claire Sullivan (Director of Supply Chain Logistics)]: Combine registry names from cargo_packages and delivery_checkpoints. Select shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier from cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 124 UNION ALL SELECT location_name::text AS entity_name, 'Secondary Stream' AS source_tier from delivery_checkpoints WHERE location_name IS NOT NULL ORDER BY entity_name ASC LIMIT 104;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT shipment_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 124 UNION ALL SELECT location_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM delivery_checkpoints WHERE location_name IS NOT NULL ORDER BY entity_name ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-095",
    "domain": "logistics",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q95)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #95 - Frank Miller (Terminal Dispatch Manager)]: Verify relational existence in delivery_checkpoints. Return t.id and t.location_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.location_name AS confirmed_item FROM delivery_checkpoints t WHERE EXISTS (SELECT 1 FROM delivery_checkpoints sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-096",
    "domain": "logistics",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in fuel_logs (Q96)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #96 - Sarah Jenkins (Head of Freight Compliance)]: Query derived table from fuel_logs. Project dt.id, dt.vehicle_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 106;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.vehicle_id::text AS derived_name, dt.score FROM (SELECT id, vehicle_id::text, gallons AS score FROM fuel_logs WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-097",
    "domain": "logistics",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in maintenance_records (Q97)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #97 - Dave Miller (VP of Global Fleet Operations)]: Isolate records in maintenance_records. Select id, service_type AS item_title, and cost AS metric_score where cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(cost)"
    ],
    "reference_sql": "SELECT id, service_type AS item_title, cost AS metric_score FROM maintenance_records WHERE cost >= (SELECT MIN(cost) FROM maintenance_records) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-098",
    "domain": "logistics",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q98)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #98 - Claire Sullivan (Director of Supply Chain Logistics)]: Filter customs_declarations using an IN subquery against active ids. Return id and port_of_entry AS filtered_name where id IN (SELECT id FROM customs_declarations WHERE id >= 4) ORDER BY id ASC LIMIT 108;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, port_of_entry AS filtered_name FROM customs_declarations WHERE id IN (SELECT id FROM customs_declarations WHERE id >= 4) ORDER BY id ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-099",
    "domain": "logistics",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q99)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #99 - Frank Miller (Terminal Dispatch Manager)]: Classify entries in parts_inventory. Select id, part_number AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from parts_inventory ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, part_number AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM parts_inventory ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "log-L3-100",
    "domain": "logistics",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q100)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #100 - Sarah Jenkins (Head of Freight Compliance)]: Combine registry names from shipments and carriers. Select destination_city::text AS entity_name, 'Primary Stream' AS source_tier from shipments WHERE destination_city IS NOT NULL AND id <= 130 UNION ALL SELECT carrier_name::text AS entity_name, 'Secondary Stream' AS source_tier from carriers WHERE carrier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT destination_city::text AS entity_name, 'Primary Stream' AS source_tier FROM shipments WHERE destination_city IS NOT NULL AND id <= 130 UNION ALL SELECT carrier_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM carriers WHERE carrier_name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  }
];
