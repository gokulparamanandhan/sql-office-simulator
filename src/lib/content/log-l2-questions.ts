import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L2-001",
    "domain": "logistics",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: parts_inventory and warehouses (Q1)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #1 - Dave Miller (VP of Global Fleet Operations)]: Connect parts_inventory with warehouses. Return t.id, t.part_number AS child_ref, and p.city AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 11;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.part_number AS child_ref, p.city AS parent_name FROM parts_inventory t JOIN warehouses p ON t.warehouse_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-002",
    "domain": "logistics",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Volume Distribution: shipments by origin_warehouse (Q2)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #2 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in shipments by origin_warehouse. Return origin_warehouse AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 12;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS group_label, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id >= 3 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-003",
    "domain": "logistics",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in shipments (Q3)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #3 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining cargo_packages to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 13;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 4 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-004",
    "domain": "logistics",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in delivery_checkpoints (Q4)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #4 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in delivery_checkpoints. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 54, ordered descending LIMIT 14;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM delivery_checkpoints WHERE status IS NOT NULL AND id <= 54 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-005",
    "domain": "logistics",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on fleet_vehicles (Q5)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #5 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from fleet_vehicles to fuel_logs. Return p.id, p.vehicle_number AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 15;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.vehicle_number AS parent_name, COALESCE(t.id, 0) AS matched_id FROM fleet_vehicles p LEFT JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-006",
    "domain": "logistics",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on maintenance_records (Q6)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #6 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average cost per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.cost::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.cost::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.cost::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 2 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-007",
    "domain": "logistics",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: customs_declarations and shipments (Q7)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #7 - Frank Miller (Terminal Dispatch Manager)]: Connect customs_declarations with shipments. Return t.id, t.port_of_entry AS child_ref, and p.destination_city AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 17;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.port_of_entry AS child_ref, p.destination_city AS parent_name FROM customs_declarations t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-008",
    "domain": "logistics",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Volume Distribution: parts_inventory by part_number (Q8)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #8 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in parts_inventory by part_number. Return part_number AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 18;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT part_number AS group_label, COUNT(*) AS record_count FROM parts_inventory WHERE part_number IS NOT NULL AND id >= 4 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-009",
    "domain": "logistics",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in carriers (Q9)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #9 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining shipments to carriers. Return p.carrier_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.carrier_name AS parent_name, COUNT(t.id) AS child_count FROM carriers p JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 5 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-010",
    "domain": "logistics",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in cargo_packages (Q10)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #10 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in cargo_packages. Group by shipment_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 60, ordered descending LIMIT 20;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT shipment_id::text AS segment_key, COUNT(*) AS record_count FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 60 GROUP BY shipment_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-011",
    "domain": "logistics",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q11)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #11 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from shipments to delivery_checkpoints. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 21;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-012",
    "domain": "logistics",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on fuel_logs (Q12)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #12 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average gallons per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.gallons::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.gallons::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.gallons::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 3 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-013",
    "domain": "logistics",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: maintenance_records and fleet_vehicles (Q13)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #13 - Dave Miller (VP of Global Fleet Operations)]: Connect maintenance_records with fleet_vehicles. Return t.id, t.service_type AS child_ref, and p.vehicle_number AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 23;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.service_type AS child_ref, p.vehicle_number AS parent_name FROM maintenance_records t JOIN fleet_vehicles p ON t.vehicle_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-014",
    "domain": "logistics",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Volume Distribution: customs_declarations by status (Q14)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #14 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in customs_declarations by status. Return status AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 24;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM customs_declarations WHERE status IS NOT NULL AND id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-015",
    "domain": "logistics",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in warehouses (Q15)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #15 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining parts_inventory to warehouses. Return p.city AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 25;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.city AS parent_name, COUNT(t.id) AS child_count FROM warehouses p JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 1 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-016",
    "domain": "logistics",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in shipments (Q16)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #16 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in shipments. Group by origin_warehouse, calculating record_count, having COUNT(*) >= 1 and id <= 66, ordered descending LIMIT 26;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS segment_key, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id <= 66 GROUP BY origin_warehouse HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-017",
    "domain": "logistics",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q17)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #17 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from shipments to cargo_packages. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 27;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-018",
    "domain": "logistics",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on delivery_checkpoints (Q18)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #18 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average id per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM shipments p JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 4 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-019",
    "domain": "logistics",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: fuel_logs and fleet_vehicles (Q19)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #19 - Frank Miller (Terminal Dispatch Manager)]: Connect fuel_logs with fleet_vehicles. Return t.id, t.vehicle_id::text AS child_ref, and p.vehicle_number AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 29;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.vehicle_id::text AS child_ref, p.vehicle_number AS parent_name FROM fuel_logs t JOIN fleet_vehicles p ON t.vehicle_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-020",
    "domain": "logistics",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Volume Distribution: maintenance_records by service_type (Q20)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #20 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in maintenance_records by service_type. Return service_type AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY service_type ORDER BY record_count DESC, group_label ASC LIMIT 30;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT service_type AS group_label, COUNT(*) AS record_count FROM maintenance_records WHERE service_type IS NOT NULL AND id >= 1 GROUP BY service_type ORDER BY record_count DESC, group_label ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "log-L2-021",
    "domain": "logistics",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in shipments (Q21)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #21 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining customs_declarations to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 31;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 2 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-022",
    "domain": "logistics",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in parts_inventory (Q22)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #22 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in parts_inventory. Group by part_number, calculating record_count, having COUNT(*) >= 1 and id <= 72, ordered descending LIMIT 32;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT part_number AS segment_key, COUNT(*) AS record_count FROM parts_inventory WHERE part_number IS NOT NULL AND id <= 72 GROUP BY part_number HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-023",
    "domain": "logistics",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on carriers (Q23)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #23 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from carriers to shipments. Return p.id, p.carrier_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 33;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.carrier_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM carriers p LEFT JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-024",
    "domain": "logistics",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Financial Metric Rollup on cargo_packages (Q24)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #24 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average weight_kg per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.weight_kg::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric FROM shipments p JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 5 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-025",
    "domain": "logistics",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Relational Cross-Link: delivery_checkpoints and shipments (Q25)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #25 - Dave Miller (VP of Global Fleet Operations)]: Connect delivery_checkpoints with shipments. Return t.id, t.location_name AS child_ref, and p.destination_city AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 35;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.location_name AS child_ref, p.destination_city AS parent_name FROM delivery_checkpoints t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-026",
    "domain": "logistics",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Volume Distribution: fuel_logs by vehicle_id::text (Q26)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #26 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in fuel_logs by vehicle_id::text. Return vehicle_id::text AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY vehicle_id::text ORDER BY record_count DESC, group_label ASC LIMIT 36;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT vehicle_id::text AS group_label, COUNT(*) AS record_count FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id >= 2 GROUP BY vehicle_id::text ORDER BY record_count DESC, group_label ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-027",
    "domain": "logistics",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in fleet_vehicles (Q27)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #27 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining maintenance_records to fleet_vehicles. Return p.vehicle_number AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 37;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, COUNT(t.id) AS child_count FROM fleet_vehicles p JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 3 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-028",
    "domain": "logistics",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in customs_declarations (Q28)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #28 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in customs_declarations. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 78, ordered descending LIMIT 38;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM customs_declarations WHERE status IS NOT NULL AND id <= 78 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-029",
    "domain": "logistics",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on warehouses (Q29)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #29 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from warehouses to parts_inventory. Return p.id, p.city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 39;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM warehouses p LEFT JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-030",
    "domain": "logistics",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Financial Metric Rollup on shipments (Q30)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #30 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average weight_kg per parent entity in carriers. Return p.carrier_name AS parent_name and ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.carrier_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.weight_kg::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.carrier_name AS parent_name, ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric FROM carriers p JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 1 GROUP BY p.carrier_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-031",
    "domain": "logistics",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Relational Cross-Link: cargo_packages and shipments (Q31)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #31 - Frank Miller (Terminal Dispatch Manager)]: Connect cargo_packages with shipments. Return t.id, t.shipment_id::text AS child_ref, and p.destination_city AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 41;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.shipment_id::text AS child_ref, p.destination_city AS parent_name FROM cargo_packages t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-032",
    "domain": "logistics",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Volume Distribution: delivery_checkpoints by status (Q32)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #32 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in delivery_checkpoints by status. Return status AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 42;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM delivery_checkpoints WHERE status IS NOT NULL AND id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-033",
    "domain": "logistics",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in fleet_vehicles (Q33)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #33 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining fuel_logs to fleet_vehicles. Return p.vehicle_number AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 43;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, COUNT(t.id) AS child_count FROM fleet_vehicles p JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 4 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-034",
    "domain": "logistics",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in maintenance_records (Q34)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #34 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in maintenance_records. Group by service_type, calculating record_count, having COUNT(*) >= 1 and id <= 84, ordered descending LIMIT 44;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT service_type AS segment_key, COUNT(*) AS record_count FROM maintenance_records WHERE service_type IS NOT NULL AND id <= 84 GROUP BY service_type HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-035",
    "domain": "logistics",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q35)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #35 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from shipments to customs_declarations. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 45;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-036",
    "domain": "logistics",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Financial Metric Rollup on parts_inventory (Q36)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #36 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average quantity_in_stock per parent entity in warehouses. Return p.city AS parent_name and ROUND(AVG(t.quantity_in_stock::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.city ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_in_stock::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.city AS parent_name, ROUND(AVG(t.quantity_in_stock::numeric), 2) AS avg_metric FROM warehouses p JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 2 GROUP BY p.city ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-037",
    "domain": "logistics",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Relational Cross-Link: shipments and carriers (Q37)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #37 - Dave Miller (VP of Global Fleet Operations)]: Connect shipments with carriers. Return t.id, t.destination_city AS child_ref, and p.carrier_name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 47;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.destination_city AS child_ref, p.carrier_name AS parent_name FROM shipments t JOIN carriers p ON t.carrier_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-038",
    "domain": "logistics",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Volume Distribution: cargo_packages by shipment_id::text (Q38)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #38 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in cargo_packages by shipment_id::text. Return shipment_id::text AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY shipment_id::text ORDER BY record_count DESC, group_label ASC LIMIT 48;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT shipment_id::text AS group_label, COUNT(*) AS record_count FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 4 GROUP BY shipment_id::text ORDER BY record_count DESC, group_label ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-039",
    "domain": "logistics",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in shipments (Q39)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #39 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining delivery_checkpoints to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 49;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 5 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-040",
    "domain": "logistics",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in fuel_logs (Q40)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #40 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in fuel_logs. Group by vehicle_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 90, ordered descending LIMIT 50;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT vehicle_id::text AS segment_key, COUNT(*) AS record_count FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 90 GROUP BY vehicle_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-041",
    "domain": "logistics",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on fleet_vehicles (Q41)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #41 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from fleet_vehicles to maintenance_records. Return p.id, p.vehicle_number AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 51;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.vehicle_number AS parent_name, COALESCE(t.id, 0) AS matched_id FROM fleet_vehicles p LEFT JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-042",
    "domain": "logistics",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Financial Metric Rollup on customs_declarations (Q42)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #42 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average duty_amount per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.duty_amount::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.duty_amount::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.duty_amount::numeric), 2) AS avg_metric FROM shipments p JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 3 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-043",
    "domain": "logistics",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Relational Cross-Link: parts_inventory and warehouses (Q43)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #43 - Frank Miller (Terminal Dispatch Manager)]: Connect parts_inventory with warehouses. Return t.id, t.part_number AS child_ref, and p.city AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 53;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.part_number AS child_ref, p.city AS parent_name FROM parts_inventory t JOIN warehouses p ON t.warehouse_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-044",
    "domain": "logistics",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Volume Distribution: shipments by origin_warehouse (Q44)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #44 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in shipments by origin_warehouse. Return origin_warehouse AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 54;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS group_label, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id >= 5 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-045",
    "domain": "logistics",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in shipments (Q45)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #45 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining cargo_packages to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 55;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 1 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-046",
    "domain": "logistics",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in delivery_checkpoints (Q46)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #46 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in delivery_checkpoints. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 96, ordered descending LIMIT 56;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM delivery_checkpoints WHERE status IS NOT NULL AND id <= 96 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-047",
    "domain": "logistics",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on fleet_vehicles (Q47)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #47 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from fleet_vehicles to fuel_logs. Return p.id, p.vehicle_number AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 57;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.vehicle_number AS parent_name, COALESCE(t.id, 0) AS matched_id FROM fleet_vehicles p LEFT JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-048",
    "domain": "logistics",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Financial Metric Rollup on maintenance_records (Q48)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #48 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average cost per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.cost::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.cost::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.cost::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 4 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-049",
    "domain": "logistics",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Relational Cross-Link: customs_declarations and shipments (Q49)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #49 - Dave Miller (VP of Global Fleet Operations)]: Connect customs_declarations with shipments. Return t.id, t.port_of_entry AS child_ref, and p.destination_city AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 59;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.port_of_entry AS child_ref, p.destination_city AS parent_name FROM customs_declarations t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-050",
    "domain": "logistics",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Volume Distribution: parts_inventory by part_number (Q50)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #50 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in parts_inventory by part_number. Return part_number AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 60;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT part_number AS group_label, COUNT(*) AS record_count FROM parts_inventory WHERE part_number IS NOT NULL AND id >= 1 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-051",
    "domain": "logistics",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in carriers (Q51)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #51 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining shipments to carriers. Return p.carrier_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.carrier_name AS parent_name, COUNT(t.id) AS child_count FROM carriers p JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 2 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-052",
    "domain": "logistics",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in cargo_packages (Q52)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #52 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in cargo_packages. Group by shipment_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 102, ordered descending LIMIT 62;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT shipment_id::text AS segment_key, COUNT(*) AS record_count FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 102 GROUP BY shipment_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-053",
    "domain": "logistics",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q53)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #53 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from shipments to delivery_checkpoints. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 63;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-054",
    "domain": "logistics",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Financial Metric Rollup on fuel_logs (Q54)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #54 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average gallons per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.gallons::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.gallons::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.gallons::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 5 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-055",
    "domain": "logistics",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Relational Cross-Link: maintenance_records and fleet_vehicles (Q55)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #55 - Frank Miller (Terminal Dispatch Manager)]: Connect maintenance_records with fleet_vehicles. Return t.id, t.service_type AS child_ref, and p.vehicle_number AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 65;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.service_type AS child_ref, p.vehicle_number AS parent_name FROM maintenance_records t JOIN fleet_vehicles p ON t.vehicle_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-056",
    "domain": "logistics",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Volume Distribution: customs_declarations by status (Q56)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #56 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in customs_declarations by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM customs_declarations WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-057",
    "domain": "logistics",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in warehouses (Q57)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #57 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining parts_inventory to warehouses. Return p.city AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 67;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.city AS parent_name, COUNT(t.id) AS child_count FROM warehouses p JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 3 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-058",
    "domain": "logistics",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in shipments (Q58)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #58 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in shipments. Group by origin_warehouse, calculating record_count, having COUNT(*) >= 1 and id <= 108, ordered descending LIMIT 68;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS segment_key, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id <= 108 GROUP BY origin_warehouse HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-059",
    "domain": "logistics",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q59)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #59 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from shipments to cargo_packages. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 69;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-060",
    "domain": "logistics",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Financial Metric Rollup on delivery_checkpoints (Q60)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #60 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average id per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM shipments p JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 1 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-061",
    "domain": "logistics",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Relational Cross-Link: fuel_logs and fleet_vehicles (Q61)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #61 - Dave Miller (VP of Global Fleet Operations)]: Connect fuel_logs with fleet_vehicles. Return t.id, t.vehicle_id::text AS child_ref, and p.vehicle_number AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 71;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.vehicle_id::text AS child_ref, p.vehicle_number AS parent_name FROM fuel_logs t JOIN fleet_vehicles p ON t.vehicle_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-062",
    "domain": "logistics",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Volume Distribution: maintenance_records by service_type (Q62)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #62 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in maintenance_records by service_type. Return service_type AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY service_type ORDER BY record_count DESC, group_label ASC LIMIT 72;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT service_type AS group_label, COUNT(*) AS record_count FROM maintenance_records WHERE service_type IS NOT NULL AND id >= 3 GROUP BY service_type ORDER BY record_count DESC, group_label ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-063",
    "domain": "logistics",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in shipments (Q63)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #63 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining customs_declarations to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 73;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 4 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-064",
    "domain": "logistics",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in parts_inventory (Q64)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #64 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in parts_inventory. Group by part_number, calculating record_count, having COUNT(*) >= 1 and id <= 114, ordered descending LIMIT 74;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT part_number AS segment_key, COUNT(*) AS record_count FROM parts_inventory WHERE part_number IS NOT NULL AND id <= 114 GROUP BY part_number HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-065",
    "domain": "logistics",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on carriers (Q65)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #65 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from carriers to shipments. Return p.id, p.carrier_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 75;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.carrier_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM carriers p LEFT JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "log-L2-066",
    "domain": "logistics",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on cargo_packages (Q66)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #66 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average weight_kg per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.weight_kg::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric FROM shipments p JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 2 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-067",
    "domain": "logistics",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: delivery_checkpoints and shipments (Q67)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #67 - Frank Miller (Terminal Dispatch Manager)]: Connect delivery_checkpoints with shipments. Return t.id, t.location_name AS child_ref, and p.destination_city AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 77;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.location_name AS child_ref, p.destination_city AS parent_name FROM delivery_checkpoints t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-068",
    "domain": "logistics",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Volume Distribution: fuel_logs by vehicle_id::text (Q68)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #68 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in fuel_logs by vehicle_id::text. Return vehicle_id::text AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY vehicle_id::text ORDER BY record_count DESC, group_label ASC LIMIT 78;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT vehicle_id::text AS group_label, COUNT(*) AS record_count FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id >= 4 GROUP BY vehicle_id::text ORDER BY record_count DESC, group_label ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-069",
    "domain": "logistics",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in fleet_vehicles (Q69)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #69 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining maintenance_records to fleet_vehicles. Return p.vehicle_number AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 79;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, COUNT(t.id) AS child_count FROM fleet_vehicles p JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 5 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-070",
    "domain": "logistics",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in customs_declarations (Q70)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #70 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in customs_declarations. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 120, ordered descending LIMIT 80;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM customs_declarations WHERE status IS NOT NULL AND id <= 120 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-071",
    "domain": "logistics",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on warehouses (Q71)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #71 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from warehouses to parts_inventory. Return p.id, p.city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 81;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM warehouses p LEFT JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-072",
    "domain": "logistics",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on shipments (Q72)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #72 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average weight_kg per parent entity in carriers. Return p.carrier_name AS parent_name and ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.carrier_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.weight_kg::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.carrier_name AS parent_name, ROUND(AVG(t.weight_kg::numeric), 2) AS avg_metric FROM carriers p JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 3 GROUP BY p.carrier_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-073",
    "domain": "logistics",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: cargo_packages and shipments (Q73)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #73 - Dave Miller (VP of Global Fleet Operations)]: Connect cargo_packages with shipments. Return t.id, t.shipment_id::text AS child_ref, and p.destination_city AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 83;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.shipment_id::text AS child_ref, p.destination_city AS parent_name FROM cargo_packages t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-074",
    "domain": "logistics",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Volume Distribution: delivery_checkpoints by status (Q74)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #74 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in delivery_checkpoints by status. Return status AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 84;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM delivery_checkpoints WHERE status IS NOT NULL AND id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-075",
    "domain": "logistics",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in fleet_vehicles (Q75)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #75 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining fuel_logs to fleet_vehicles. Return p.vehicle_number AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 85;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, COUNT(t.id) AS child_count FROM fleet_vehicles p JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 1 GROUP BY p.vehicle_number ORDER BY child_count DESC, parent_name ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-076",
    "domain": "logistics",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in maintenance_records (Q76)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #76 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in maintenance_records. Group by service_type, calculating record_count, having COUNT(*) >= 1 and id <= 126, ordered descending LIMIT 86;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT service_type AS segment_key, COUNT(*) AS record_count FROM maintenance_records WHERE service_type IS NOT NULL AND id <= 126 GROUP BY service_type HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-077",
    "domain": "logistics",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q77)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #77 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from shipments to customs_declarations. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 87;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-078",
    "domain": "logistics",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on parts_inventory (Q78)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #78 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average quantity_in_stock per parent entity in warehouses. Return p.city AS parent_name and ROUND(AVG(t.quantity_in_stock::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.city ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_in_stock::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.city AS parent_name, ROUND(AVG(t.quantity_in_stock::numeric), 2) AS avg_metric FROM warehouses p JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 4 GROUP BY p.city ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-079",
    "domain": "logistics",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: shipments and carriers (Q79)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #79 - Frank Miller (Terminal Dispatch Manager)]: Connect shipments with carriers. Return t.id, t.destination_city AS child_ref, and p.carrier_name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 89;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.destination_city AS child_ref, p.carrier_name AS parent_name FROM shipments t JOIN carriers p ON t.carrier_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-080",
    "domain": "logistics",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Volume Distribution: cargo_packages by shipment_id::text (Q80)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #80 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in cargo_packages by shipment_id::text. Return shipment_id::text AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY shipment_id::text ORDER BY record_count DESC, group_label ASC LIMIT 90;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT shipment_id::text AS group_label, COUNT(*) AS record_count FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id >= 1 GROUP BY shipment_id::text ORDER BY record_count DESC, group_label ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-081",
    "domain": "logistics",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in shipments (Q81)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #81 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining delivery_checkpoints to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 91;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 2 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-082",
    "domain": "logistics",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in fuel_logs (Q82)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #82 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in fuel_logs. Group by vehicle_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 132, ordered descending LIMIT 92;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT vehicle_id::text AS segment_key, COUNT(*) AS record_count FROM fuel_logs WHERE vehicle_id::text IS NOT NULL AND id <= 132 GROUP BY vehicle_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-083",
    "domain": "logistics",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on fleet_vehicles (Q83)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #83 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from fleet_vehicles to maintenance_records. Return p.id, p.vehicle_number AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 93;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.vehicle_number AS parent_name, COALESCE(t.id, 0) AS matched_id FROM fleet_vehicles p LEFT JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-084",
    "domain": "logistics",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on customs_declarations (Q84)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #84 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average duty_amount per parent entity in shipments. Return p.destination_city AS parent_name and ROUND(AVG(t.duty_amount::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.duty_amount::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, ROUND(AVG(t.duty_amount::numeric), 2) AS avg_metric FROM shipments p JOIN customs_declarations t ON p.id = t.shipment_id WHERE p.id >= 5 GROUP BY p.destination_city ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-085",
    "domain": "logistics",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: parts_inventory and warehouses (Q85)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #85 - Dave Miller (VP of Global Fleet Operations)]: Connect parts_inventory with warehouses. Return t.id, t.part_number AS child_ref, and p.city AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 95;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.part_number AS child_ref, p.city AS parent_name FROM parts_inventory t JOIN warehouses p ON t.warehouse_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-086",
    "domain": "logistics",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Volume Distribution: shipments by origin_warehouse (Q86)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #86 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in shipments by origin_warehouse. Return origin_warehouse AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 96;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS group_label, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id >= 2 GROUP BY origin_warehouse ORDER BY record_count DESC, group_label ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-087",
    "domain": "logistics",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in shipments (Q87)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #87 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining cargo_packages to shipments. Return p.destination_city AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 97;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.destination_city AS parent_name, COUNT(t.id) AS child_count FROM shipments p JOIN cargo_packages t ON p.id = t.shipment_id WHERE p.id >= 3 GROUP BY p.destination_city ORDER BY child_count DESC, parent_name ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-088",
    "domain": "logistics",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in delivery_checkpoints (Q88)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #88 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in delivery_checkpoints. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 138, ordered descending LIMIT 98;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM delivery_checkpoints WHERE status IS NOT NULL AND id <= 138 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-089",
    "domain": "logistics",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on fleet_vehicles (Q89)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #89 - Dave Miller (VP of Global Fleet Operations)]: Perform a LEFT JOIN from fleet_vehicles to fuel_logs. Return p.id, p.vehicle_number AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 99;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.vehicle_number AS parent_name, COALESCE(t.id, 0) AS matched_id FROM fleet_vehicles p LEFT JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-090",
    "domain": "logistics",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on maintenance_records (Q90)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #90 - Claire Sullivan (Director of Supply Chain Logistics)]: Calculate average cost per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.cost::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.cost::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.cost::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN maintenance_records t ON p.id = t.vehicle_id WHERE p.id >= 1 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "log-L2-091",
    "domain": "logistics",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Relational Cross-Link: customs_declarations and shipments (Q91)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #91 - Frank Miller (Terminal Dispatch Manager)]: Connect customs_declarations with shipments. Return t.id, t.port_of_entry AS child_ref, and p.destination_city AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 101;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.port_of_entry AS child_ref, p.destination_city AS parent_name FROM customs_declarations t JOIN shipments p ON t.shipment_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-092",
    "domain": "logistics",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Volume Distribution: parts_inventory by part_number (Q92)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #92 - Sarah Jenkins (Head of Freight Compliance)]: Summarize volume in parts_inventory by part_number. Return part_number AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 102;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT part_number AS group_label, COUNT(*) AS record_count FROM parts_inventory WHERE part_number IS NOT NULL AND id >= 3 GROUP BY part_number ORDER BY record_count DESC, group_label ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-093",
    "domain": "logistics",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in carriers (Q93)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #93 - Dave Miller (VP of Global Fleet Operations)]: Compile aggregated metrics joining shipments to carriers. Return p.carrier_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.carrier_name AS parent_name, COUNT(t.id) AS child_count FROM carriers p JOIN shipments t ON p.id = t.carrier_id WHERE p.id >= 4 GROUP BY p.carrier_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-094",
    "domain": "logistics",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in cargo_packages (Q94)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #94 - Claire Sullivan (Director of Supply Chain Logistics)]: Identify high-density segments in cargo_packages. Group by shipment_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 144, ordered descending LIMIT 104;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT shipment_id::text AS segment_key, COUNT(*) AS record_count FROM cargo_packages WHERE shipment_id::text IS NOT NULL AND id <= 144 GROUP BY shipment_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-095",
    "domain": "logistics",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Comprehensive Relation Audit: Left Join on shipments (Q95)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #95 - Frank Miller (Terminal Dispatch Manager)]: Perform a LEFT JOIN from shipments to delivery_checkpoints. Return p.id, p.destination_city AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 105;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.destination_city AS parent_name, COALESCE(t.id, 0) AS matched_id FROM shipments p LEFT JOIN delivery_checkpoints t ON p.id = t.shipment_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-096",
    "domain": "logistics",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Financial Metric Rollup on fuel_logs (Q96)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #96 - Sarah Jenkins (Head of Freight Compliance)]: Calculate average gallons per parent entity in fleet_vehicles. Return p.vehicle_number AS parent_name and ROUND(AVG(t.gallons::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.gallons::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.vehicle_number AS parent_name, ROUND(AVG(t.gallons::numeric), 2) AS avg_metric FROM fleet_vehicles p JOIN fuel_logs t ON p.id = t.vehicle_id WHERE p.id >= 2 GROUP BY p.vehicle_number ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-097",
    "domain": "logistics",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Relational Cross-Link: maintenance_records and fleet_vehicles (Q97)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #97 - Dave Miller (VP of Global Fleet Operations)]: Connect maintenance_records with fleet_vehicles. Return t.id, t.service_type AS child_ref, and p.vehicle_number AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 107;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.service_type AS child_ref, p.vehicle_number AS parent_name FROM maintenance_records t JOIN fleet_vehicles p ON t.vehicle_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-098",
    "domain": "logistics",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Volume Distribution: customs_declarations by status (Q98)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #98 - Claire Sullivan (Director of Supply Chain Logistics)]: Summarize volume in customs_declarations by status. Return status AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 108;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM customs_declarations WHERE status IS NOT NULL AND id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-099",
    "domain": "logistics",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in warehouses (Q99)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #99 - Frank Miller (Terminal Dispatch Manager)]: Compile aggregated metrics joining parts_inventory to warehouses. Return p.city AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 109;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.city AS parent_name, COUNT(t.id) AS child_count FROM warehouses p JOIN parts_inventory t ON p.id = t.warehouse_id WHERE p.id >= 5 GROUP BY p.city ORDER BY child_count DESC, parent_name ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "log-L2-100",
    "domain": "logistics",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in shipments (Q100)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #100 - Sarah Jenkins (Head of Freight Compliance)]: Identify high-density segments in shipments. Group by origin_warehouse, calculating record_count, having COUNT(*) >= 1 and id <= 150, ordered descending LIMIT 110;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT origin_warehouse AS segment_key, COUNT(*) AS record_count FROM shipments WHERE origin_warehouse IS NOT NULL AND id <= 150 GROUP BY origin_warehouse HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  }
];
