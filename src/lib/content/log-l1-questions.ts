import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L1-001",
    "domain": "logistics",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "WAREHOUSES Directory Audit (Q1)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #1 - Dave Miller (VP of Global Fleet Operations)]: Ahead of our quarterly audit, pull our active warehouses records showing id and city as display_name, ordered by id ascending. Limit output to 11 records.\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, city AS display_name FROM warehouses WHERE id >= 2 ORDER BY id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-002",
    "domain": "logistics",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "CARRIERS Directory Audit (Q2)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #2 - Claire Sullivan (Director of Supply Chain Logistics)]: Ahead of our quarterly audit, pull our active carriers records showing id and carrier_name as display_name, ordered by id ascending. Limit output to 12 records.\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, carrier_name AS display_name FROM carriers WHERE id >= 3 ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-003",
    "domain": "logistics",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "FLEET VEHICLES Directory Audit (Q3)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #3 - Frank Miller (Terminal Dispatch Manager)]: Ahead of our quarterly audit, pull our active fleet_vehicles records showing id and vehicle_number as display_name, ordered by id ascending. Limit output to 13 records.\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, vehicle_number AS display_name FROM fleet_vehicles WHERE id >= 4 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-004",
    "domain": "logistics",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "DRIVERS Directory Audit (Q4)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #4 - Sarah Jenkins (Head of Freight Compliance)]: Ahead of our quarterly audit, pull our active drivers records showing id and full_name as display_name, ordered by id ascending. Limit output to 14 records.\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, full_name AS display_name FROM drivers WHERE id >= 5 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-005",
    "domain": "logistics",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "SUPPLIERS Directory Audit (Q5)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #5 - Dave Miller (VP of Global Fleet Operations)]: Ahead of our quarterly audit, pull our active suppliers records showing id and supplier_name as display_name, ordered by id ascending. Limit output to 15 records.\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, supplier_name AS display_name FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-006",
    "domain": "logistics",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "PARTS INVENTORY Directory Audit (Q6)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #6 - Claire Sullivan (Director of Supply Chain Logistics)]: Ahead of our quarterly audit, pull our active parts_inventory records showing id and part_number as display_name, ordered by id ascending. Limit output to 16 records.\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, part_number AS display_name FROM parts_inventory WHERE id >= 2 ORDER BY id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-007",
    "domain": "logistics",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "SHIPMENTS Directory Audit (Q7)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #7 - Frank Miller (Terminal Dispatch Manager)]: Ahead of our quarterly audit, pull our active shipments records showing id and destination_city as display_name, ordered by id ascending. Limit output to 17 records.\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, destination_city AS display_name FROM shipments WHERE id >= 3 ORDER BY id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-008",
    "domain": "logistics",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "CARGO PACKAGES Directory Audit (Q8)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #8 - Sarah Jenkins (Head of Freight Compliance)]: Ahead of our quarterly audit, pull our active cargo_packages records showing id and shipment_id::text as display_name, ordered by id ascending. Limit output to 18 records.\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS display_name FROM cargo_packages WHERE id >= 4 ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-009",
    "domain": "logistics",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "FREIGHT ROUTES Directory Audit (Q9)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #9 - Dave Miller (VP of Global Fleet Operations)]: Ahead of our quarterly audit, pull our active freight_routes records showing id and route_name as display_name, ordered by id ascending. Limit output to 19 records.\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, route_name AS display_name FROM freight_routes WHERE id >= 5 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-010",
    "domain": "logistics",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "DELIVERY CHECKPOINTS Directory Audit (Q10)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #10 - Claire Sullivan (Director of Supply Chain Logistics)]: Ahead of our quarterly audit, pull our active delivery_checkpoints records showing id and location_name as display_name, ordered by id ascending. Limit output to 20 records.\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, location_name AS display_name FROM delivery_checkpoints WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-011",
    "domain": "logistics",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "FUEL LOGS Directory Audit (Q11)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #11 - Frank Miller (Terminal Dispatch Manager)]: Ahead of our quarterly audit, pull our active fuel_logs records showing id and vehicle_id::text as display_name, ordered by id ascending. Limit output to 21 records.\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS display_name FROM fuel_logs WHERE id >= 2 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-012",
    "domain": "logistics",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "MAINTENANCE RECORDS Directory Audit (Q12)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #12 - Sarah Jenkins (Head of Freight Compliance)]: Ahead of our quarterly audit, pull our active maintenance_records records showing id and service_type as display_name, ordered by id ascending. Limit output to 22 records.\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, service_type AS display_name FROM maintenance_records WHERE id >= 3 ORDER BY id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-013",
    "domain": "logistics",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "CUSTOMS DECLARATIONS Directory Audit (Q13)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #13 - Dave Miller (VP of Global Fleet Operations)]: Ahead of our quarterly audit, pull our active customs_declarations records showing id and port_of_entry as display_name, ordered by id ascending. Limit output to 23 records.\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, port_of_entry AS display_name FROM customs_declarations WHERE id >= 4 ORDER BY id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-014",
    "domain": "logistics",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in warehouses (Q14)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #14 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-volume entries in warehouses. Select id, city AS item_title, and capacity_sqft AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 24;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, city AS item_title, capacity_sqft AS metric_val FROM warehouses WHERE id >= 5 ORDER BY metric_val DESC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-015",
    "domain": "logistics",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in carriers (Q15)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #15 - Frank Miller (Terminal Dispatch Manager)]: Identify high-volume entries in carriers. Select id, carrier_name AS item_title, and rating AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 25;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, carrier_name AS item_title, rating AS metric_val FROM carriers WHERE id >= 1 ORDER BY metric_val DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-016",
    "domain": "logistics",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in fleet_vehicles (Q16)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #16 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-volume entries in fleet_vehicles. Select id, vehicle_number AS item_title, and max_weight_capacity_kg AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 26;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, vehicle_number AS item_title, max_weight_capacity_kg AS metric_val FROM fleet_vehicles WHERE id >= 2 ORDER BY metric_val DESC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-017",
    "domain": "logistics",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in drivers (Q17)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #17 - Dave Miller (VP of Global Fleet Operations)]: Identify high-volume entries in drivers. Select id, full_name AS item_title, and safety_score AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 27;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, full_name AS item_title, safety_score AS metric_val FROM drivers WHERE id >= 3 ORDER BY metric_val DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-018",
    "domain": "logistics",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in suppliers (Q18)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #18 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-volume entries in suppliers. Select id, supplier_name AS item_title, and lead_time_days AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 28;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, supplier_name AS item_title, lead_time_days AS metric_val FROM suppliers WHERE id >= 4 ORDER BY metric_val DESC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-019",
    "domain": "logistics",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in parts_inventory (Q19)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #19 - Frank Miller (Terminal Dispatch Manager)]: Identify high-volume entries in parts_inventory. Select id, part_number AS item_title, and quantity_in_stock AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 29;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, part_number AS item_title, quantity_in_stock AS metric_val FROM parts_inventory WHERE id >= 5 ORDER BY metric_val DESC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-020",
    "domain": "logistics",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in shipments (Q20)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #20 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-volume entries in shipments. Select id, destination_city AS item_title, and weight_kg AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 30;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, destination_city AS item_title, weight_kg AS metric_val FROM shipments WHERE id >= 1 ORDER BY metric_val DESC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-021",
    "domain": "logistics",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in cargo_packages (Q21)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #21 - Dave Miller (VP of Global Fleet Operations)]: Identify high-volume entries in cargo_packages. Select id, shipment_id::text AS item_title, and weight_kg AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 31;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS item_title, weight_kg AS metric_val FROM cargo_packages WHERE id >= 2 ORDER BY metric_val DESC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-022",
    "domain": "logistics",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in freight_routes (Q22)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #22 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-volume entries in freight_routes. Select id, route_name AS item_title, and distance_km AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 32;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, route_name AS item_title, distance_km AS metric_val FROM freight_routes WHERE id >= 3 ORDER BY metric_val DESC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-023",
    "domain": "logistics",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in delivery_checkpoints (Q23)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #23 - Frank Miller (Terminal Dispatch Manager)]: Identify high-volume entries in delivery_checkpoints. Select id, location_name AS item_title, and id AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 33;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, location_name AS item_title, id AS metric_val FROM delivery_checkpoints WHERE id >= 4 ORDER BY metric_val DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-024",
    "domain": "logistics",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in fuel_logs (Q24)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #24 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-volume entries in fuel_logs. Select id, vehicle_id::text AS item_title, and gallons AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 34;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS item_title, gallons AS metric_val FROM fuel_logs WHERE id >= 5 ORDER BY metric_val DESC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-025",
    "domain": "logistics",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in maintenance_records (Q25)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #25 - Dave Miller (VP of Global Fleet Operations)]: Identify high-volume entries in maintenance_records. Select id, service_type AS item_title, and cost AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 35;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, service_type AS item_title, cost AS metric_val FROM maintenance_records WHERE id >= 1 ORDER BY metric_val DESC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-026",
    "domain": "logistics",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in customs_declarations (Q26)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #26 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-volume entries in customs_declarations. Select id, port_of_entry AS item_title, and duty_amount AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 36;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, port_of_entry AS item_title, duty_amount AS metric_val FROM customs_declarations WHERE id >= 2 ORDER BY metric_val DESC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-027",
    "domain": "logistics",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on warehouses (Q27)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #27 - Frank Miller (Terminal Dispatch Manager)]: Management is tracking midpoint distributions. Select id, city AS entity_name, and capacity_sqft AS val from warehouses where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 37;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, city AS entity_name, capacity_sqft AS val FROM warehouses WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-028",
    "domain": "logistics",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on carriers (Q28)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #28 - Sarah Jenkins (Head of Freight Compliance)]: Management is tracking midpoint distributions. Select id, carrier_name AS entity_name, and rating AS val from carriers where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 38;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, carrier_name AS entity_name, rating AS val FROM carriers WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-029",
    "domain": "logistics",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on fleet_vehicles (Q29)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #29 - Dave Miller (VP of Global Fleet Operations)]: Management is tracking midpoint distributions. Select id, vehicle_number AS entity_name, and max_weight_capacity_kg AS val from fleet_vehicles where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, vehicle_number AS entity_name, max_weight_capacity_kg AS val FROM fleet_vehicles WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-030",
    "domain": "logistics",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on drivers (Q30)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #30 - Claire Sullivan (Director of Supply Chain Logistics)]: Management is tracking midpoint distributions. Select id, full_name AS entity_name, and safety_score AS val from drivers where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, full_name AS entity_name, safety_score AS val FROM drivers WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "log-L1-031",
    "domain": "logistics",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on suppliers (Q31)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #31 - Frank Miller (Terminal Dispatch Manager)]: Management is tracking midpoint distributions. Select id, supplier_name AS entity_name, and lead_time_days AS val from suppliers where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, supplier_name AS entity_name, lead_time_days AS val FROM suppliers WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-032",
    "domain": "logistics",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on parts_inventory (Q32)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #32 - Sarah Jenkins (Head of Freight Compliance)]: Management is tracking midpoint distributions. Select id, part_number AS entity_name, and quantity_in_stock AS val from parts_inventory where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, part_number AS entity_name, quantity_in_stock AS val FROM parts_inventory WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-033",
    "domain": "logistics",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on shipments (Q33)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #33 - Dave Miller (VP of Global Fleet Operations)]: Management is tracking midpoint distributions. Select id, destination_city AS entity_name, and weight_kg AS val from shipments where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, destination_city AS entity_name, weight_kg AS val FROM shipments WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-034",
    "domain": "logistics",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on cargo_packages (Q34)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #34 - Claire Sullivan (Director of Supply Chain Logistics)]: Management is tracking midpoint distributions. Select id, shipment_id::text AS entity_name, and weight_kg AS val from cargo_packages where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entity_name, weight_kg AS val FROM cargo_packages WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-035",
    "domain": "logistics",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on freight_routes (Q35)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #35 - Frank Miller (Terminal Dispatch Manager)]: Management is tracking midpoint distributions. Select id, route_name AS entity_name, and distance_km AS val from freight_routes where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, route_name AS entity_name, distance_km AS val FROM freight_routes WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-036",
    "domain": "logistics",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on delivery_checkpoints (Q36)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #36 - Sarah Jenkins (Head of Freight Compliance)]: Management is tracking midpoint distributions. Select id, location_name AS entity_name, and id AS val from delivery_checkpoints where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, location_name AS entity_name, id AS val FROM delivery_checkpoints WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-037",
    "domain": "logistics",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on fuel_logs (Q37)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #37 - Dave Miller (VP of Global Fleet Operations)]: Management is tracking midpoint distributions. Select id, vehicle_id::text AS entity_name, and gallons AS val from fuel_logs where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS entity_name, gallons AS val FROM fuel_logs WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-038",
    "domain": "logistics",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on maintenance_records (Q38)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #38 - Claire Sullivan (Director of Supply Chain Logistics)]: Management is tracking midpoint distributions. Select id, service_type AS entity_name, and cost AS val from maintenance_records where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, service_type AS entity_name, cost AS val FROM maintenance_records WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-039",
    "domain": "logistics",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on customs_declarations (Q39)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #39 - Frank Miller (Terminal Dispatch Manager)]: Management is tracking midpoint distributions. Select id, port_of_entry AS entity_name, and duty_amount AS val from customs_declarations where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entity_name, duty_amount AS val FROM customs_declarations WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-040",
    "domain": "logistics",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in warehouses (Q40)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #40 - Sarah Jenkins (Head of Freight Compliance)]: Ensure robust reporting against missing values. Select id, city AS entry_name, and COALESCE(capacity_sqft, 0.00) AS safe_val from warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 50;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "capacity_sqft",
      "safe_val"
    ],
    "reference_sql": "SELECT id, city AS entry_name, COALESCE(capacity_sqft, 0.00) AS safe_val FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-041",
    "domain": "logistics",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in carriers (Q41)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #41 - Dave Miller (VP of Global Fleet Operations)]: Ensure robust reporting against missing values. Select id, carrier_name AS entry_name, and COALESCE(rating, 0.00) AS safe_val from carriers WHERE id >= 2 ORDER BY id ASC LIMIT 51;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "rating",
      "safe_val"
    ],
    "reference_sql": "SELECT id, carrier_name AS entry_name, COALESCE(rating, 0.00) AS safe_val FROM carriers WHERE id >= 2 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-042",
    "domain": "logistics",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in fleet_vehicles (Q42)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #42 - Claire Sullivan (Director of Supply Chain Logistics)]: Ensure robust reporting against missing values. Select id, vehicle_number AS entry_name, and COALESCE(max_weight_capacity_kg, 0.00) AS safe_val from fleet_vehicles WHERE id >= 3 ORDER BY id ASC LIMIT 52;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "max_weight_capacity_kg",
      "safe_val"
    ],
    "reference_sql": "SELECT id, vehicle_number AS entry_name, COALESCE(max_weight_capacity_kg, 0.00) AS safe_val FROM fleet_vehicles WHERE id >= 3 ORDER BY id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-043",
    "domain": "logistics",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in drivers (Q43)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #43 - Frank Miller (Terminal Dispatch Manager)]: Ensure robust reporting against missing values. Select id, full_name AS entry_name, and COALESCE(safety_score, 0.00) AS safe_val from drivers WHERE id >= 4 ORDER BY id ASC LIMIT 53;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "safety_score",
      "safe_val"
    ],
    "reference_sql": "SELECT id, full_name AS entry_name, COALESCE(safety_score, 0.00) AS safe_val FROM drivers WHERE id >= 4 ORDER BY id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-044",
    "domain": "logistics",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in suppliers (Q44)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #44 - Sarah Jenkins (Head of Freight Compliance)]: Ensure robust reporting against missing values. Select id, supplier_name AS entry_name, and COALESCE(lead_time_days, 0.00) AS safe_val from suppliers WHERE id >= 5 ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "lead_time_days",
      "safe_val"
    ],
    "reference_sql": "SELECT id, supplier_name AS entry_name, COALESCE(lead_time_days, 0.00) AS safe_val FROM suppliers WHERE id >= 5 ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-045",
    "domain": "logistics",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in parts_inventory (Q45)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #45 - Dave Miller (VP of Global Fleet Operations)]: Ensure robust reporting against missing values. Select id, part_number AS entry_name, and COALESCE(quantity_in_stock, 0.00) AS safe_val from parts_inventory WHERE id >= 1 ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "quantity_in_stock",
      "safe_val"
    ],
    "reference_sql": "SELECT id, part_number AS entry_name, COALESCE(quantity_in_stock, 0.00) AS safe_val FROM parts_inventory WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-046",
    "domain": "logistics",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in shipments (Q46)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #46 - Claire Sullivan (Director of Supply Chain Logistics)]: Ensure robust reporting against missing values. Select id, destination_city AS entry_name, and COALESCE(weight_kg, 0.00) AS safe_val from shipments WHERE id >= 2 ORDER BY id ASC LIMIT 56;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "weight_kg",
      "safe_val"
    ],
    "reference_sql": "SELECT id, destination_city AS entry_name, COALESCE(weight_kg, 0.00) AS safe_val FROM shipments WHERE id >= 2 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-047",
    "domain": "logistics",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in cargo_packages (Q47)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #47 - Frank Miller (Terminal Dispatch Manager)]: Ensure robust reporting against missing values. Select id, shipment_id::text AS entry_name, and COALESCE(weight_kg, 0.00) AS safe_val from cargo_packages WHERE id >= 3 ORDER BY id ASC LIMIT 57;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "weight_kg",
      "safe_val"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entry_name, COALESCE(weight_kg, 0.00) AS safe_val FROM cargo_packages WHERE id >= 3 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-048",
    "domain": "logistics",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in freight_routes (Q48)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #48 - Sarah Jenkins (Head of Freight Compliance)]: Ensure robust reporting against missing values. Select id, route_name AS entry_name, and COALESCE(distance_km, 0.00) AS safe_val from freight_routes WHERE id >= 4 ORDER BY id ASC LIMIT 58;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "distance_km",
      "safe_val"
    ],
    "reference_sql": "SELECT id, route_name AS entry_name, COALESCE(distance_km, 0.00) AS safe_val FROM freight_routes WHERE id >= 4 ORDER BY id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-049",
    "domain": "logistics",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in delivery_checkpoints (Q49)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #49 - Dave Miller (VP of Global Fleet Operations)]: Ensure robust reporting against missing values. Select id, location_name AS entry_name, and COALESCE(id, 0.00) AS safe_val from delivery_checkpoints WHERE id >= 5 ORDER BY id ASC LIMIT 59;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, location_name AS entry_name, COALESCE(id, 0.00) AS safe_val FROM delivery_checkpoints WHERE id >= 5 ORDER BY id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-050",
    "domain": "logistics",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in fuel_logs (Q50)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #50 - Claire Sullivan (Director of Supply Chain Logistics)]: Ensure robust reporting against missing values. Select id, vehicle_id::text AS entry_name, and COALESCE(gallons, 0.00) AS safe_val from fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "gallons",
      "safe_val"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS entry_name, COALESCE(gallons, 0.00) AS safe_val FROM fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-051",
    "domain": "logistics",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in maintenance_records (Q51)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #51 - Frank Miller (Terminal Dispatch Manager)]: Ensure robust reporting against missing values. Select id, service_type AS entry_name, and COALESCE(cost, 0.00) AS safe_val from maintenance_records WHERE id >= 2 ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "cost",
      "safe_val"
    ],
    "reference_sql": "SELECT id, service_type AS entry_name, COALESCE(cost, 0.00) AS safe_val FROM maintenance_records WHERE id >= 2 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-052",
    "domain": "logistics",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in customs_declarations (Q52)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #52 - Sarah Jenkins (Head of Freight Compliance)]: Ensure robust reporting against missing values. Select id, port_of_entry AS entry_name, and COALESCE(duty_amount, 0.00) AS safe_val from customs_declarations WHERE id >= 3 ORDER BY id ASC LIMIT 62;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "duty_amount",
      "safe_val"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entry_name, COALESCE(duty_amount, 0.00) AS safe_val FROM customs_declarations WHERE id >= 3 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-053",
    "domain": "logistics",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "String Normalization on warehouses (Q53)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #53 - Dave Miller (VP of Global Fleet Operations)]: Standardize text fields in warehouses. Select id, UPPER(TRIM(city::text)) AS clean_name from warehouses WHERE city IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 63;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(city::text)) AS clean_name FROM warehouses WHERE city IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-054",
    "domain": "logistics",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "String Normalization on carriers (Q54)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #54 - Claire Sullivan (Director of Supply Chain Logistics)]: Standardize text fields in carriers. Select id, UPPER(TRIM(carrier_name::text)) AS clean_name from carriers WHERE carrier_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 64;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(carrier_name::text)) AS clean_name FROM carriers WHERE carrier_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-055",
    "domain": "logistics",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "String Normalization on fleet_vehicles (Q55)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #55 - Frank Miller (Terminal Dispatch Manager)]: Standardize text fields in fleet_vehicles. Select id, UPPER(TRIM(vehicle_number::text)) AS clean_name from fleet_vehicles WHERE vehicle_number IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 65;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(vehicle_number::text)) AS clean_name FROM fleet_vehicles WHERE vehicle_number IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-056",
    "domain": "logistics",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "String Normalization on drivers (Q56)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #56 - Sarah Jenkins (Head of Freight Compliance)]: Standardize text fields in drivers. Select id, UPPER(TRIM(full_name::text)) AS clean_name from drivers WHERE full_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(full_name::text)) AS clean_name FROM drivers WHERE full_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-057",
    "domain": "logistics",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "String Normalization on suppliers (Q57)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #57 - Dave Miller (VP of Global Fleet Operations)]: Standardize text fields in suppliers. Select id, UPPER(TRIM(supplier_name::text)) AS clean_name from suppliers WHERE supplier_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(supplier_name::text)) AS clean_name FROM suppliers WHERE supplier_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-058",
    "domain": "logistics",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "String Normalization on parts_inventory (Q58)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #58 - Claire Sullivan (Director of Supply Chain Logistics)]: Standardize text fields in parts_inventory. Select id, UPPER(TRIM(part_number::text)) AS clean_name from parts_inventory WHERE part_number IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(part_number::text)) AS clean_name FROM parts_inventory WHERE part_number IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-059",
    "domain": "logistics",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "String Normalization on shipments (Q59)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #59 - Frank Miller (Terminal Dispatch Manager)]: Standardize text fields in shipments. Select id, UPPER(TRIM(destination_city::text)) AS clean_name from shipments WHERE destination_city IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(destination_city::text)) AS clean_name FROM shipments WHERE destination_city IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-060",
    "domain": "logistics",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "String Normalization on cargo_packages (Q60)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #60 - Sarah Jenkins (Head of Freight Compliance)]: Standardize text fields in cargo_packages. Select id, UPPER(TRIM(shipment_id::text::text)) AS clean_name from cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(shipment_id::text::text)) AS clean_name FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-061",
    "domain": "logistics",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "String Normalization on freight_routes (Q61)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #61 - Dave Miller (VP of Global Fleet Operations)]: Standardize text fields in freight_routes. Select id, UPPER(TRIM(route_name::text)) AS clean_name from freight_routes WHERE route_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(route_name::text)) AS clean_name FROM freight_routes WHERE route_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-062",
    "domain": "logistics",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "String Normalization on delivery_checkpoints (Q62)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #62 - Claire Sullivan (Director of Supply Chain Logistics)]: Standardize text fields in delivery_checkpoints. Select id, UPPER(TRIM(location_name::text)) AS clean_name from delivery_checkpoints WHERE location_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(location_name::text)) AS clean_name FROM delivery_checkpoints WHERE location_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-063",
    "domain": "logistics",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "String Normalization on fuel_logs (Q63)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #63 - Frank Miller (Terminal Dispatch Manager)]: Standardize text fields in fuel_logs. Select id, UPPER(TRIM(vehicle_id::text::text)) AS clean_name from fuel_logs WHERE vehicle_id::text IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(vehicle_id::text::text)) AS clean_name FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-064",
    "domain": "logistics",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "String Normalization on maintenance_records (Q64)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #64 - Sarah Jenkins (Head of Freight Compliance)]: Standardize text fields in maintenance_records. Select id, UPPER(TRIM(service_type::text)) AS clean_name from maintenance_records WHERE service_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(service_type::text)) AS clean_name FROM maintenance_records WHERE service_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-065",
    "domain": "logistics",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "String Normalization on customs_declarations (Q65)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #65 - Dave Miller (VP of Global Fleet Operations)]: Standardize text fields in customs_declarations. Select id, UPPER(TRIM(port_of_entry::text)) AS clean_name from customs_declarations WHERE port_of_entry IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(port_of_entry::text)) AS clean_name FROM customs_declarations WHERE port_of_entry IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-066",
    "domain": "logistics",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "Category Classification in warehouses (Q66)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #66 - Claire Sullivan (Director of Supply Chain Logistics)]: Review our unique classification segments in warehouses. Select DISTINCT manager_name AS category_label from warehouses WHERE manager_name IS NOT NULL AND id <= 116 ORDER BY category_label ASC LIMIT 76;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT manager_name AS category_label FROM warehouses WHERE manager_name IS NOT NULL AND id <= 116 ORDER BY category_label ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-067",
    "domain": "logistics",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "Category Classification in carriers (Q67)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #67 - Frank Miller (Terminal Dispatch Manager)]: Review our unique classification segments in carriers. Select DISTINCT service_level AS category_label from carriers WHERE service_level IS NOT NULL AND id <= 117 ORDER BY category_label ASC LIMIT 77;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT service_level AS category_label FROM carriers WHERE service_level IS NOT NULL AND id <= 117 ORDER BY category_label ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-068",
    "domain": "logistics",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "Category Classification in fleet_vehicles (Q68)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #68 - Sarah Jenkins (Head of Freight Compliance)]: Review our unique classification segments in fleet_vehicles. Select DISTINCT vehicle_type AS category_label from fleet_vehicles WHERE vehicle_type IS NOT NULL AND id <= 118 ORDER BY category_label ASC LIMIT 78;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT vehicle_type AS category_label FROM fleet_vehicles WHERE vehicle_type IS NOT NULL AND id <= 118 ORDER BY category_label ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-069",
    "domain": "logistics",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "Category Classification in drivers (Q69)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #69 - Dave Miller (VP of Global Fleet Operations)]: Review our unique classification segments in drivers. Select DISTINCT license_number AS category_label from drivers WHERE license_number IS NOT NULL AND id <= 119 ORDER BY category_label ASC LIMIT 79;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT license_number AS category_label FROM drivers WHERE license_number IS NOT NULL AND id <= 119 ORDER BY category_label ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-070",
    "domain": "logistics",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "Category Classification in suppliers (Q70)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #70 - Claire Sullivan (Director of Supply Chain Logistics)]: Review our unique classification segments in suppliers. Select DISTINCT country AS category_label from suppliers WHERE country IS NOT NULL AND id <= 120 ORDER BY category_label ASC LIMIT 80;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT country AS category_label FROM suppliers WHERE country IS NOT NULL AND id <= 120 ORDER BY category_label ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-071",
    "domain": "logistics",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Category Classification in parts_inventory (Q71)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #71 - Frank Miller (Terminal Dispatch Manager)]: Review our unique classification segments in parts_inventory. Select DISTINCT part_number AS category_label from parts_inventory WHERE part_number IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT part_number AS category_label FROM parts_inventory WHERE part_number IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-072",
    "domain": "logistics",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Category Classification in shipments (Q72)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #72 - Sarah Jenkins (Head of Freight Compliance)]: Review our unique classification segments in shipments. Select DISTINCT origin_warehouse AS category_label from shipments WHERE origin_warehouse IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT origin_warehouse AS category_label FROM shipments WHERE origin_warehouse IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-073",
    "domain": "logistics",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Category Classification in cargo_packages (Q73)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #73 - Dave Miller (VP of Global Fleet Operations)]: Review our unique classification segments in cargo_packages. Select DISTINCT shipment_id::text AS category_label from cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT shipment_id::text AS category_label FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-074",
    "domain": "logistics",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Category Classification in freight_routes (Q74)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #74 - Claire Sullivan (Director of Supply Chain Logistics)]: Review our unique classification segments in freight_routes. Select DISTINCT route_name AS category_label from freight_routes WHERE route_name IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT route_name AS category_label FROM freight_routes WHERE route_name IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-075",
    "domain": "logistics",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Category Classification in delivery_checkpoints (Q75)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #75 - Frank Miller (Terminal Dispatch Manager)]: Review our unique classification segments in delivery_checkpoints. Select DISTINCT status AS category_label from delivery_checkpoints WHERE status IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM delivery_checkpoints WHERE status IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-076",
    "domain": "logistics",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Category Classification in fuel_logs (Q76)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #76 - Sarah Jenkins (Head of Freight Compliance)]: Review our unique classification segments in fuel_logs. Select DISTINCT vehicle_id::text AS category_label from fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT vehicle_id::text AS category_label FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-077",
    "domain": "logistics",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Category Classification in maintenance_records (Q77)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #77 - Dave Miller (VP of Global Fleet Operations)]: Review our unique classification segments in maintenance_records. Select DISTINCT service_type AS category_label from maintenance_records WHERE service_type IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT service_type AS category_label FROM maintenance_records WHERE service_type IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-078",
    "domain": "logistics",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Category Classification in customs_declarations (Q78)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #78 - Claire Sullivan (Director of Supply Chain Logistics)]: Review our unique classification segments in customs_declarations. Select DISTINCT status AS category_label from customs_declarations WHERE status IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM customs_declarations WHERE status IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-079",
    "domain": "logistics",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Margin Projection on warehouses (Q79)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #79 - Frank Miller (Terminal Dispatch Manager)]: Calculate financial inflation adjustment. Select id, city AS label, and ROUND((capacity_sqft * 1.11)::numeric, 2) AS projected_metric from warehouses WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 89;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, city AS label, ROUND((capacity_sqft * 1.11)::numeric, 2) AS projected_metric FROM warehouses WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-080",
    "domain": "logistics",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Margin Projection on carriers (Q80)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #80 - Sarah Jenkins (Head of Freight Compliance)]: Calculate financial inflation adjustment. Select id, carrier_name AS label, and ROUND((rating * 1.02)::numeric, 2) AS projected_metric from carriers WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 90;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, carrier_name AS label, ROUND((rating * 1.02)::numeric, 2) AS projected_metric FROM carriers WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-081",
    "domain": "logistics",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Margin Projection on fleet_vehicles (Q81)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #81 - Dave Miller (VP of Global Fleet Operations)]: Calculate financial inflation adjustment. Select id, vehicle_number AS label, and ROUND((max_weight_capacity_kg * 1.03)::numeric, 2) AS projected_metric from fleet_vehicles WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 91;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, vehicle_number AS label, ROUND((max_weight_capacity_kg * 1.03)::numeric, 2) AS projected_metric FROM fleet_vehicles WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-082",
    "domain": "logistics",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Margin Projection on drivers (Q82)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #82 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate financial inflation adjustment. Select id, full_name AS label, and ROUND((safety_score * 1.04)::numeric, 2) AS projected_metric from drivers WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 92;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, full_name AS label, ROUND((safety_score * 1.04)::numeric, 2) AS projected_metric FROM drivers WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-083",
    "domain": "logistics",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Margin Projection on suppliers (Q83)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #83 - Frank Miller (Terminal Dispatch Manager)]: Calculate financial inflation adjustment. Select id, supplier_name AS label, and ROUND((lead_time_days * 1.05)::numeric, 2) AS projected_metric from suppliers WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 93;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, supplier_name AS label, ROUND((lead_time_days * 1.05)::numeric, 2) AS projected_metric FROM suppliers WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-084",
    "domain": "logistics",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Margin Projection on parts_inventory (Q84)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #84 - Sarah Jenkins (Head of Freight Compliance)]: Calculate financial inflation adjustment. Select id, part_number AS label, and ROUND((quantity_in_stock * 1.06)::numeric, 2) AS projected_metric from parts_inventory WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 94;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, part_number AS label, ROUND((quantity_in_stock * 1.06)::numeric, 2) AS projected_metric FROM parts_inventory WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-085",
    "domain": "logistics",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Margin Projection on shipments (Q85)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #85 - Dave Miller (VP of Global Fleet Operations)]: Calculate financial inflation adjustment. Select id, destination_city AS label, and ROUND((weight_kg * 1.07)::numeric, 2) AS projected_metric from shipments WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, destination_city AS label, ROUND((weight_kg * 1.07)::numeric, 2) AS projected_metric FROM shipments WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-086",
    "domain": "logistics",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Margin Projection on cargo_packages (Q86)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #86 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate financial inflation adjustment. Select id, shipment_id::text AS label, and ROUND((weight_kg * 1.08)::numeric, 2) AS projected_metric from cargo_packages WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS label, ROUND((weight_kg * 1.08)::numeric, 2) AS projected_metric FROM cargo_packages WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-087",
    "domain": "logistics",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Margin Projection on freight_routes (Q87)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #87 - Frank Miller (Terminal Dispatch Manager)]: Calculate financial inflation adjustment. Select id, route_name AS label, and ROUND((distance_km * 1.09)::numeric, 2) AS projected_metric from freight_routes WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, route_name AS label, ROUND((distance_km * 1.09)::numeric, 2) AS projected_metric FROM freight_routes WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-088",
    "domain": "logistics",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Margin Projection on delivery_checkpoints (Q88)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #88 - Sarah Jenkins (Head of Freight Compliance)]: Calculate financial inflation adjustment. Select id, location_name AS label, and ROUND((id * 1.10)::numeric, 2) AS projected_metric from delivery_checkpoints WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;\"",
    "context_notes": "Level 1 Foundational single-table query on delivery_checkpoints.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, location_name AS label, ROUND((id * 1.10)::numeric, 2) AS projected_metric FROM delivery_checkpoints WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table delivery_checkpoints."
    ],
    "solution_explanation": "Retrieves records from delivery_checkpoints applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-089",
    "domain": "logistics",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Margin Projection on fuel_logs (Q89)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #89 - Dave Miller (VP of Global Fleet Operations)]: Calculate financial inflation adjustment. Select id, vehicle_id::text AS label, and ROUND((gallons * 1.11)::numeric, 2) AS projected_metric from fuel_logs WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;\"",
    "context_notes": "Level 1 Foundational single-table query on fuel_logs.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS label, ROUND((gallons * 1.11)::numeric, 2) AS projected_metric FROM fuel_logs WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fuel_logs."
    ],
    "solution_explanation": "Retrieves records from fuel_logs applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-090",
    "domain": "logistics",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Margin Projection on maintenance_records (Q90)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #90 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate financial inflation adjustment. Select id, service_type AS label, and ROUND((cost * 1.02)::numeric, 2) AS projected_metric from maintenance_records WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;\"",
    "context_notes": "Level 1 Foundational single-table query on maintenance_records.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, service_type AS label, ROUND((cost * 1.02)::numeric, 2) AS projected_metric FROM maintenance_records WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table maintenance_records."
    ],
    "solution_explanation": "Retrieves records from maintenance_records applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-091",
    "domain": "logistics",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Margin Projection on customs_declarations (Q91)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #91 - Frank Miller (Terminal Dispatch Manager)]: Calculate financial inflation adjustment. Select id, port_of_entry AS label, and ROUND((duty_amount * 1.03)::numeric, 2) AS projected_metric from customs_declarations WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;\"",
    "context_notes": "Level 1 Foundational single-table query on customs_declarations.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, port_of_entry AS label, ROUND((duty_amount * 1.03)::numeric, 2) AS projected_metric FROM customs_declarations WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table customs_declarations."
    ],
    "solution_explanation": "Retrieves records from customs_declarations applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-092",
    "domain": "logistics",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Status Segment Inspection in warehouses (Q92)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #92 - Sarah Jenkins (Head of Freight Compliance)]: Extract active records from warehouses. Select id, city AS item_name, and manager_name AS tag from warehouses WHERE manager_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 1 Foundational single-table query on warehouses.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, city AS item_name, manager_name AS tag FROM warehouses WHERE manager_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table warehouses."
    ],
    "solution_explanation": "Retrieves records from warehouses applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-093",
    "domain": "logistics",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Status Segment Inspection in carriers (Q93)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #93 - Dave Miller (VP of Global Fleet Operations)]: Extract active records from carriers. Select id, carrier_name AS item_name, and service_level AS tag from carriers WHERE service_level IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 103;\"",
    "context_notes": "Level 1 Foundational single-table query on carriers.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, carrier_name AS item_name, service_level AS tag FROM carriers WHERE service_level IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table carriers."
    ],
    "solution_explanation": "Retrieves records from carriers applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-094",
    "domain": "logistics",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Status Segment Inspection in fleet_vehicles (Q94)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #94 - Claire Sullivan (Director of Supply Chain Logistics)]: Extract active records from fleet_vehicles. Select id, vehicle_number AS item_name, and vehicle_type AS tag from fleet_vehicles WHERE vehicle_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 104;\"",
    "context_notes": "Level 1 Foundational single-table query on fleet_vehicles.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, vehicle_number AS item_name, vehicle_type AS tag FROM fleet_vehicles WHERE vehicle_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table fleet_vehicles."
    ],
    "solution_explanation": "Retrieves records from fleet_vehicles applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-095",
    "domain": "logistics",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Status Segment Inspection in drivers (Q95)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #95 - Frank Miller (Terminal Dispatch Manager)]: Extract active records from drivers. Select id, full_name AS item_name, and license_number AS tag from drivers WHERE license_number IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 105;\"",
    "context_notes": "Level 1 Foundational single-table query on drivers.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, full_name AS item_name, license_number AS tag FROM drivers WHERE license_number IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table drivers."
    ],
    "solution_explanation": "Retrieves records from drivers applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-096",
    "domain": "logistics",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Status Segment Inspection in suppliers (Q96)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #96 - Sarah Jenkins (Head of Freight Compliance)]: Extract active records from suppliers. Select id, supplier_name AS item_name, and country AS tag from suppliers WHERE country IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 106;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, supplier_name AS item_name, country AS tag FROM suppliers WHERE country IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-097",
    "domain": "logistics",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Status Segment Inspection in parts_inventory (Q97)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #97 - Dave Miller (VP of Global Fleet Operations)]: Extract active records from parts_inventory. Select id, part_number AS item_name, and part_number AS tag from parts_inventory WHERE part_number IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 107;\"",
    "context_notes": "Level 1 Foundational single-table query on parts_inventory.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, part_number AS item_name, part_number AS tag FROM parts_inventory WHERE part_number IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table parts_inventory."
    ],
    "solution_explanation": "Retrieves records from parts_inventory applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-098",
    "domain": "logistics",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Status Segment Inspection in shipments (Q98)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #98 - Claire Sullivan (Director of Supply Chain Logistics)]: Extract active records from shipments. Select id, destination_city AS item_name, and origin_warehouse AS tag from shipments WHERE origin_warehouse IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 108;\"",
    "context_notes": "Level 1 Foundational single-table query on shipments.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, destination_city AS item_name, origin_warehouse AS tag FROM shipments WHERE origin_warehouse IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shipments."
    ],
    "solution_explanation": "Retrieves records from shipments applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-099",
    "domain": "logistics",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Status Segment Inspection in cargo_packages (Q99)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #99 - Frank Miller (Terminal Dispatch Manager)]: Extract active records from cargo_packages. Select id, shipment_id::text AS item_name, and shipment_id::text AS tag from cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 1 Foundational single-table query on cargo_packages.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS item_name, shipment_id::text AS tag FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cargo_packages."
    ],
    "solution_explanation": "Retrieves records from cargo_packages applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "log-L1-100",
    "domain": "logistics",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Status Segment Inspection in freight_routes (Q100)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #100 - Sarah Jenkins (Head of Freight Compliance)]: Extract active records from freight_routes. Select id, route_name AS item_name, and route_name AS tag from freight_routes WHERE route_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;\"",
    "context_notes": "Level 1 Foundational single-table query on freight_routes.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, route_name AS item_name, route_name AS tag FROM freight_routes WHERE route_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table freight_routes."
    ],
    "solution_explanation": "Retrieves records from freight_routes applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  }
];
