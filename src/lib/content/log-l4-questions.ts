import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L4-001",
    "domain": "logistics",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q1)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #1 - Dave Miller (VP of Global Fleet Operations)]: Rank records in warehouses by capacity_sqft. Return id, city AS entity_title, capacity_sqft AS metric_score, and ROW_NUMBER() OVER (ORDER BY capacity_sqft DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 11;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, city AS entity_title, capacity_sqft AS metric_score, ROW_NUMBER() OVER (ORDER BY capacity_sqft DESC) AS rank_num FROM warehouses WHERE id >= 1 ORDER BY rank_num ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-002",
    "domain": "logistics",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in carriers (Q2)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #2 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of carriers. Return id, service_level AS partition_key, rating AS metric_val, and DENSE_RANK() OVER (PARTITION BY service_level ORDER BY rating DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 12;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, service_level AS partition_key, rating AS metric_val, DENSE_RANK() OVER (PARTITION BY service_level ORDER BY rating DESC) AS dense_rnk FROM carriers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-003",
    "domain": "logistics",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q3)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #3 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on fleet_vehicles. Return id, max_weight_capacity_kg AS current_val, and LAG(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 13;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "max_weight_capacity_kg",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, max_weight_capacity_kg AS current_val, LAG(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS prev_metric FROM fleet_vehicles WHERE id >= 1 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-004",
    "domain": "logistics",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q4)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #4 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on drivers. Return id, safety_score AS current_val, and LEAD(safety_score, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 14;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "safety_score",
      "next_metric"
    ],
    "reference_sql": "SELECT id, safety_score AS current_val, LEAD(safety_score, 1) OVER (ORDER BY id ASC) AS next_metric FROM drivers WHERE id >= 1 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-005",
    "domain": "logistics",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on suppliers (Q5)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #5 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in suppliers. Return id, lead_time_days AS baseline_val, and SUM(lead_time_days) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 15;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, lead_time_days AS baseline_val, SUM(lead_time_days) OVER (ORDER BY id ASC) AS running_total FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-006",
    "domain": "logistics",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q6)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #6 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for parts_inventory. Create a CTE named staged_metrics selecting id, part_number AS staged_name, and quantity_in_stock AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 16;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, part_number AS staged_name, quantity_in_stock AS score FROM parts_inventory WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-007",
    "domain": "logistics",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q7)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #7 - Frank Miller (Terminal Dispatch Manager)]: Rank records in shipments by weight_kg. Return id, destination_city AS entity_title, weight_kg AS metric_score, and ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 17;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, destination_city AS entity_title, weight_kg AS metric_score, ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num FROM shipments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-008",
    "domain": "logistics",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in cargo_packages (Q8)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #8 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of cargo_packages. Return id, shipment_id AS partition_key, weight_kg AS metric_val, and DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY weight_kg DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 18;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, shipment_id AS partition_key, weight_kg AS metric_val, DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY weight_kg DESC) AS dense_rnk FROM cargo_packages WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-009",
    "domain": "logistics",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q9)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #9 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on freight_routes. Return id, distance_km AS current_val, and LAG(distance_km, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 19;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "distance_km",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, distance_km AS current_val, LAG(distance_km, 1) OVER (ORDER BY id ASC) AS prev_metric FROM freight_routes WHERE id >= 1 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-010",
    "domain": "logistics",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q10)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #10 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on delivery_checkpoints. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM delivery_checkpoints WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-011",
    "domain": "logistics",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on fuel_logs (Q11)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #11 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in fuel_logs. Return id, gallons AS baseline_val, and SUM(gallons) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 21;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, gallons AS baseline_val, SUM(gallons) OVER (ORDER BY id ASC) AS running_total FROM fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-012",
    "domain": "logistics",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q12)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #12 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for maintenance_records. Create a CTE named staged_metrics selecting id, service_type AS staged_name, and cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 22;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, service_type AS staged_name, cost AS score FROM maintenance_records WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-013",
    "domain": "logistics",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q13)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #13 - Dave Miller (VP of Global Fleet Operations)]: Rank records in customs_declarations by duty_amount. Return id, port_of_entry AS entity_title, duty_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY duty_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 23;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entity_title, duty_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY duty_amount DESC) AS rank_num FROM customs_declarations WHERE id >= 1 ORDER BY rank_num ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-014",
    "domain": "logistics",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in warehouses (Q14)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #14 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of warehouses. Return id, manager_name AS partition_key, capacity_sqft AS metric_val, and DENSE_RANK() OVER (PARTITION BY manager_name ORDER BY capacity_sqft DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 24;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, manager_name AS partition_key, capacity_sqft AS metric_val, DENSE_RANK() OVER (PARTITION BY manager_name ORDER BY capacity_sqft DESC) AS dense_rnk FROM warehouses WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-015",
    "domain": "logistics",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q15)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #15 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on carriers. Return id, rating AS current_val, and LAG(rating, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 25;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LAG(rating, 1) OVER (ORDER BY id ASC) AS prev_metric FROM carriers WHERE id >= 1 ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "log-L4-016",
    "domain": "logistics",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q16)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #16 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on fleet_vehicles. Return id, max_weight_capacity_kg AS current_val, and LEAD(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 26;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "max_weight_capacity_kg",
      "next_metric"
    ],
    "reference_sql": "SELECT id, max_weight_capacity_kg AS current_val, LEAD(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS next_metric FROM fleet_vehicles WHERE id >= 1 ORDER BY id ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-017",
    "domain": "logistics",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Cumulative Running Total on drivers (Q17)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #17 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in drivers. Return id, safety_score AS baseline_val, and SUM(safety_score) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 27;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, safety_score AS baseline_val, SUM(safety_score) OVER (ORDER BY id ASC) AS running_total FROM drivers WHERE id >= 1 ORDER BY id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-018",
    "domain": "logistics",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q18)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #18 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for suppliers. Create a CTE named staged_metrics selecting id, supplier_name AS staged_name, and lead_time_days AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 28;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, supplier_name AS staged_name, lead_time_days AS score FROM suppliers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-019",
    "domain": "logistics",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q19)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #19 - Frank Miller (Terminal Dispatch Manager)]: Rank records in parts_inventory by quantity_in_stock. Return id, part_number AS entity_title, quantity_in_stock AS metric_score, and ROW_NUMBER() OVER (ORDER BY quantity_in_stock DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 29;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, part_number AS entity_title, quantity_in_stock AS metric_score, ROW_NUMBER() OVER (ORDER BY quantity_in_stock DESC) AS rank_num FROM parts_inventory WHERE id >= 1 ORDER BY rank_num ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-020",
    "domain": "logistics",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Dense Partition Ranking in shipments (Q20)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #20 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of shipments. Return id, carrier_id AS partition_key, weight_kg AS metric_val, and DENSE_RANK() OVER (PARTITION BY carrier_id ORDER BY weight_kg DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 30;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, carrier_id AS partition_key, weight_kg AS metric_val, DENSE_RANK() OVER (PARTITION BY carrier_id ORDER BY weight_kg DESC) AS dense_rnk FROM shipments WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-021",
    "domain": "logistics",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q21)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #21 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on cargo_packages. Return id, weight_kg AS current_val, and LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 31;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "weight_kg",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, weight_kg AS current_val, LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric FROM cargo_packages WHERE id >= 1 ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-022",
    "domain": "logistics",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q22)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #22 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on freight_routes. Return id, distance_km AS current_val, and LEAD(distance_km, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 32;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "distance_km",
      "next_metric"
    ],
    "reference_sql": "SELECT id, distance_km AS current_val, LEAD(distance_km, 1) OVER (ORDER BY id ASC) AS next_metric FROM freight_routes WHERE id >= 1 ORDER BY id ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-023",
    "domain": "logistics",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Cumulative Running Total on delivery_checkpoints (Q23)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #23 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in delivery_checkpoints. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 33;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM delivery_checkpoints WHERE id >= 1 ORDER BY id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-024",
    "domain": "logistics",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q24)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #24 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for fuel_logs. Create a CTE named staged_metrics selecting id, vehicle_id::text AS staged_name, and gallons AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 34;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, vehicle_id::text AS staged_name, gallons AS score FROM fuel_logs WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-025",
    "domain": "logistics",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q25)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #25 - Dave Miller (VP of Global Fleet Operations)]: Rank records in maintenance_records by cost. Return id, service_type AS entity_title, cost AS metric_score, and ROW_NUMBER() OVER (ORDER BY cost DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 35;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, service_type AS entity_title, cost AS metric_score, ROW_NUMBER() OVER (ORDER BY cost DESC) AS rank_num FROM maintenance_records WHERE id >= 1 ORDER BY rank_num ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-026",
    "domain": "logistics",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Dense Partition Ranking in customs_declarations (Q26)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #26 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of customs_declarations. Return id, shipment_id AS partition_key, duty_amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY duty_amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 36;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, shipment_id AS partition_key, duty_amount AS metric_val, DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY duty_amount DESC) AS dense_rnk FROM customs_declarations WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-027",
    "domain": "logistics",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q27)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #27 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on warehouses. Return id, capacity_sqft AS current_val, and LAG(capacity_sqft, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 37;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LAG(capacity_sqft, 1) OVER (ORDER BY id ASC) AS prev_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-028",
    "domain": "logistics",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q28)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #28 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on carriers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 38;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM carriers WHERE id >= 1 ORDER BY id ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-029",
    "domain": "logistics",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Cumulative Running Total on fleet_vehicles (Q29)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #29 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in fleet_vehicles. Return id, max_weight_capacity_kg AS baseline_val, and SUM(max_weight_capacity_kg) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 39;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, max_weight_capacity_kg AS baseline_val, SUM(max_weight_capacity_kg) OVER (ORDER BY id ASC) AS running_total FROM fleet_vehicles WHERE id >= 1 ORDER BY id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-030",
    "domain": "logistics",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q30)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #30 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for drivers. Create a CTE named staged_metrics selecting id, full_name AS staged_name, and safety_score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 40;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, full_name AS staged_name, safety_score AS score FROM drivers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-031",
    "domain": "logistics",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q31)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #31 - Frank Miller (Terminal Dispatch Manager)]: Rank records in suppliers by lead_time_days. Return id, supplier_name AS entity_title, lead_time_days AS metric_score, and ROW_NUMBER() OVER (ORDER BY lead_time_days DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 41;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, supplier_name AS entity_title, lead_time_days AS metric_score, ROW_NUMBER() OVER (ORDER BY lead_time_days DESC) AS rank_num FROM suppliers WHERE id >= 1 ORDER BY rank_num ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-032",
    "domain": "logistics",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Dense Partition Ranking in parts_inventory (Q32)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #32 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of parts_inventory. Return id, warehouse_id AS partition_key, quantity_in_stock AS metric_val, and DENSE_RANK() OVER (PARTITION BY warehouse_id ORDER BY quantity_in_stock DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 42;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, warehouse_id AS partition_key, quantity_in_stock AS metric_val, DENSE_RANK() OVER (PARTITION BY warehouse_id ORDER BY quantity_in_stock DESC) AS dense_rnk FROM parts_inventory WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-033",
    "domain": "logistics",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q33)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #33 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on shipments. Return id, weight_kg AS current_val, and LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 43;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "weight_kg",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, weight_kg AS current_val, LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-034",
    "domain": "logistics",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q34)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #34 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on cargo_packages. Return id, weight_kg AS current_val, and LEAD(weight_kg, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 44;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "weight_kg",
      "next_metric"
    ],
    "reference_sql": "SELECT id, weight_kg AS current_val, LEAD(weight_kg, 1) OVER (ORDER BY id ASC) AS next_metric FROM cargo_packages WHERE id >= 1 ORDER BY id ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-035",
    "domain": "logistics",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Cumulative Running Total on freight_routes (Q35)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #35 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in freight_routes. Return id, distance_km AS baseline_val, and SUM(distance_km) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 45;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, distance_km AS baseline_val, SUM(distance_km) OVER (ORDER BY id ASC) AS running_total FROM freight_routes WHERE id >= 1 ORDER BY id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-036",
    "domain": "logistics",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q36)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #36 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for delivery_checkpoints. Create a CTE named staged_metrics selecting id, location_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 46;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, location_name AS staged_name, id AS score FROM delivery_checkpoints WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-037",
    "domain": "logistics",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q37)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #37 - Dave Miller (VP of Global Fleet Operations)]: Rank records in fuel_logs by gallons. Return id, vehicle_id::text AS entity_title, gallons AS metric_score, and ROW_NUMBER() OVER (ORDER BY gallons DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 47;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, vehicle_id::text AS entity_title, gallons AS metric_score, ROW_NUMBER() OVER (ORDER BY gallons DESC) AS rank_num FROM fuel_logs WHERE id >= 1 ORDER BY rank_num ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-038",
    "domain": "logistics",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Dense Partition Ranking in maintenance_records (Q38)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #38 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of maintenance_records. Return id, vehicle_id AS partition_key, cost AS metric_val, and DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY cost DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 48;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, vehicle_id AS partition_key, cost AS metric_val, DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY cost DESC) AS dense_rnk FROM maintenance_records WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-039",
    "domain": "logistics",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q39)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #39 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on customs_declarations. Return id, duty_amount AS current_val, and LAG(duty_amount, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 49;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "duty_amount",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, duty_amount AS current_val, LAG(duty_amount, 1) OVER (ORDER BY id ASC) AS prev_metric FROM customs_declarations WHERE id >= 1 ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-040",
    "domain": "logistics",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q40)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #40 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 50;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-041",
    "domain": "logistics",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Cumulative Running Total on carriers (Q41)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #41 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in carriers. Return id, rating AS baseline_val, and SUM(rating) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 51;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, rating AS baseline_val, SUM(rating) OVER (ORDER BY id ASC) AS running_total FROM carriers WHERE id >= 1 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-042",
    "domain": "logistics",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q42)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #42 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for fleet_vehicles. Create a CTE named staged_metrics selecting id, vehicle_number AS staged_name, and max_weight_capacity_kg AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 52;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, vehicle_number AS staged_name, max_weight_capacity_kg AS score FROM fleet_vehicles WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-043",
    "domain": "logistics",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q43)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #43 - Frank Miller (Terminal Dispatch Manager)]: Rank records in drivers by safety_score. Return id, full_name AS entity_title, safety_score AS metric_score, and ROW_NUMBER() OVER (ORDER BY safety_score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 53;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, full_name AS entity_title, safety_score AS metric_score, ROW_NUMBER() OVER (ORDER BY safety_score DESC) AS rank_num FROM drivers WHERE id >= 1 ORDER BY rank_num ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-044",
    "domain": "logistics",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Dense Partition Ranking in suppliers (Q44)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #44 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of suppliers. Return id, country AS partition_key, lead_time_days AS metric_val, and DENSE_RANK() OVER (PARTITION BY country ORDER BY lead_time_days DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 54;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, country AS partition_key, lead_time_days AS metric_val, DENSE_RANK() OVER (PARTITION BY country ORDER BY lead_time_days DESC) AS dense_rnk FROM suppliers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-045",
    "domain": "logistics",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q45)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #45 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on parts_inventory. Return id, quantity_in_stock AS current_val, and LAG(quantity_in_stock, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 55;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "quantity_in_stock",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, quantity_in_stock AS current_val, LAG(quantity_in_stock, 1) OVER (ORDER BY id ASC) AS prev_metric FROM parts_inventory WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-046",
    "domain": "logistics",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q46)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #46 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on shipments. Return id, weight_kg AS current_val, and LEAD(weight_kg, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 56;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "weight_kg",
      "next_metric"
    ],
    "reference_sql": "SELECT id, weight_kg AS current_val, LEAD(weight_kg, 1) OVER (ORDER BY id ASC) AS next_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-047",
    "domain": "logistics",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Cumulative Running Total on cargo_packages (Q47)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #47 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in cargo_packages. Return id, weight_kg AS baseline_val, and SUM(weight_kg) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 57;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, weight_kg AS baseline_val, SUM(weight_kg) OVER (ORDER BY id ASC) AS running_total FROM cargo_packages WHERE id >= 1 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-048",
    "domain": "logistics",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q48)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #48 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for freight_routes. Create a CTE named staged_metrics selecting id, route_name AS staged_name, and distance_km AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 58;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, route_name AS staged_name, distance_km AS score FROM freight_routes WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-049",
    "domain": "logistics",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q49)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #49 - Dave Miller (VP of Global Fleet Operations)]: Rank records in delivery_checkpoints by id. Return id, location_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 59;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, location_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM delivery_checkpoints WHERE id >= 1 ORDER BY rank_num ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-050",
    "domain": "logistics",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Dense Partition Ranking in fuel_logs (Q50)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #50 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of fuel_logs. Return id, vehicle_id AS partition_key, gallons AS metric_val, and DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY gallons DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 60;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, vehicle_id AS partition_key, gallons AS metric_val, DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY gallons DESC) AS dense_rnk FROM fuel_logs WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-051",
    "domain": "logistics",
    "level": 4,
    "order": 51,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q51)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #51 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on maintenance_records. Return id, cost AS current_val, and LAG(cost, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 61;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "cost",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, cost AS current_val, LAG(cost, 1) OVER (ORDER BY id ASC) AS prev_metric FROM maintenance_records WHERE id >= 1 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-052",
    "domain": "logistics",
    "level": 4,
    "order": 52,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q52)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #52 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on customs_declarations. Return id, duty_amount AS current_val, and LEAD(duty_amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 62;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "duty_amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, duty_amount AS current_val, LEAD(duty_amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM customs_declarations WHERE id >= 1 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-053",
    "domain": "logistics",
    "level": 4,
    "order": 53,
    "difficulty": "core",
    "title": "Cumulative Running Total on warehouses (Q53)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #53 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in warehouses. Return id, capacity_sqft AS baseline_val, and SUM(capacity_sqft) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 63;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS baseline_val, SUM(capacity_sqft) OVER (ORDER BY id ASC) AS running_total FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-054",
    "domain": "logistics",
    "level": 4,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q54)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #54 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for carriers. Create a CTE named staged_metrics selecting id, carrier_name AS staged_name, and rating AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 64;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, carrier_name AS staged_name, rating AS score FROM carriers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-055",
    "domain": "logistics",
    "level": 4,
    "order": 55,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q55)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #55 - Frank Miller (Terminal Dispatch Manager)]: Rank records in fleet_vehicles by max_weight_capacity_kg. Return id, vehicle_number AS entity_title, max_weight_capacity_kg AS metric_score, and ROW_NUMBER() OVER (ORDER BY max_weight_capacity_kg DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 65;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, vehicle_number AS entity_title, max_weight_capacity_kg AS metric_score, ROW_NUMBER() OVER (ORDER BY max_weight_capacity_kg DESC) AS rank_num FROM fleet_vehicles WHERE id >= 1 ORDER BY rank_num ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L4-056",
    "domain": "logistics",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in drivers (Q56)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #56 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of drivers. Return id, license_number AS partition_key, safety_score AS metric_val, and DENSE_RANK() OVER (PARTITION BY license_number ORDER BY safety_score DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 66;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, license_number AS partition_key, safety_score AS metric_val, DENSE_RANK() OVER (PARTITION BY license_number ORDER BY safety_score DESC) AS dense_rnk FROM drivers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-057",
    "domain": "logistics",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q57)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #57 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on suppliers. Return id, lead_time_days AS current_val, and LAG(lead_time_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 67;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "lead_time_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, lead_time_days AS current_val, LAG(lead_time_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-058",
    "domain": "logistics",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q58)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #58 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on parts_inventory. Return id, quantity_in_stock AS current_val, and LEAD(quantity_in_stock, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 68;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "quantity_in_stock",
      "next_metric"
    ],
    "reference_sql": "SELECT id, quantity_in_stock AS current_val, LEAD(quantity_in_stock, 1) OVER (ORDER BY id ASC) AS next_metric FROM parts_inventory WHERE id >= 1 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-059",
    "domain": "logistics",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on shipments (Q59)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #59 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in shipments. Return id, weight_kg AS baseline_val, and SUM(weight_kg) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 69;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, weight_kg AS baseline_val, SUM(weight_kg) OVER (ORDER BY id ASC) AS running_total FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-060",
    "domain": "logistics",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q60)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #60 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for cargo_packages. Create a CTE named staged_metrics selecting id, shipment_id::text AS staged_name, and weight_kg AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 70;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, shipment_id::text AS staged_name, weight_kg AS score FROM cargo_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-061",
    "domain": "logistics",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q61)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #61 - Dave Miller (VP of Global Fleet Operations)]: Rank records in freight_routes by distance_km. Return id, route_name AS entity_title, distance_km AS metric_score, and ROW_NUMBER() OVER (ORDER BY distance_km DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 71;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, route_name AS entity_title, distance_km AS metric_score, ROW_NUMBER() OVER (ORDER BY distance_km DESC) AS rank_num FROM freight_routes WHERE id >= 1 ORDER BY rank_num ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-062",
    "domain": "logistics",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in delivery_checkpoints (Q62)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #62 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of delivery_checkpoints. Return id, shipment_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 72;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, shipment_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY id DESC) AS dense_rnk FROM delivery_checkpoints WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-063",
    "domain": "logistics",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q63)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #63 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on fuel_logs. Return id, gallons AS current_val, and LAG(gallons, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 73;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "gallons",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, gallons AS current_val, LAG(gallons, 1) OVER (ORDER BY id ASC) AS prev_metric FROM fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-064",
    "domain": "logistics",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q64)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #64 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on maintenance_records. Return id, cost AS current_val, and LEAD(cost, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 74;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "cost",
      "next_metric"
    ],
    "reference_sql": "SELECT id, cost AS current_val, LEAD(cost, 1) OVER (ORDER BY id ASC) AS next_metric FROM maintenance_records WHERE id >= 1 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-065",
    "domain": "logistics",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on customs_declarations (Q65)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #65 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in customs_declarations. Return id, duty_amount AS baseline_val, and SUM(duty_amount) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 75;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duty_amount AS baseline_val, SUM(duty_amount) OVER (ORDER BY id ASC) AS running_total FROM customs_declarations WHERE id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-066",
    "domain": "logistics",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q66)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #66 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for warehouses. Create a CTE named staged_metrics selecting id, city AS staged_name, and capacity_sqft AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 76;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, city AS staged_name, capacity_sqft AS score FROM warehouses WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-067",
    "domain": "logistics",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q67)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #67 - Frank Miller (Terminal Dispatch Manager)]: Rank records in carriers by rating. Return id, carrier_name AS entity_title, rating AS metric_score, and ROW_NUMBER() OVER (ORDER BY rating DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 77;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, carrier_name AS entity_title, rating AS metric_score, ROW_NUMBER() OVER (ORDER BY rating DESC) AS rank_num FROM carriers WHERE id >= 1 ORDER BY rank_num ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-068",
    "domain": "logistics",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in fleet_vehicles (Q68)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #68 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of fleet_vehicles. Return id, vehicle_type AS partition_key, max_weight_capacity_kg AS metric_val, and DENSE_RANK() OVER (PARTITION BY vehicle_type ORDER BY max_weight_capacity_kg DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 78;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, vehicle_type AS partition_key, max_weight_capacity_kg AS metric_val, DENSE_RANK() OVER (PARTITION BY vehicle_type ORDER BY max_weight_capacity_kg DESC) AS dense_rnk FROM fleet_vehicles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-069",
    "domain": "logistics",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q69)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #69 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on drivers. Return id, safety_score AS current_val, and LAG(safety_score, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 79;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "safety_score",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, safety_score AS current_val, LAG(safety_score, 1) OVER (ORDER BY id ASC) AS prev_metric FROM drivers WHERE id >= 1 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-070",
    "domain": "logistics",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q70)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #70 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on suppliers. Return id, lead_time_days AS current_val, and LEAD(lead_time_days, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 80;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "lead_time_days",
      "next_metric"
    ],
    "reference_sql": "SELECT id, lead_time_days AS current_val, LEAD(lead_time_days, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-071",
    "domain": "logistics",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on parts_inventory (Q71)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #71 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in parts_inventory. Return id, quantity_in_stock AS baseline_val, and SUM(quantity_in_stock) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 81;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, quantity_in_stock AS baseline_val, SUM(quantity_in_stock) OVER (ORDER BY id ASC) AS running_total FROM parts_inventory WHERE id >= 1 ORDER BY id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-072",
    "domain": "logistics",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q72)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #72 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for shipments. Create a CTE named staged_metrics selecting id, destination_city AS staged_name, and weight_kg AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 82;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, destination_city AS staged_name, weight_kg AS score FROM shipments WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-073",
    "domain": "logistics",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q73)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #73 - Dave Miller (VP of Global Fleet Operations)]: Rank records in cargo_packages by weight_kg. Return id, shipment_id::text AS entity_title, weight_kg AS metric_score, and ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 83;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, shipment_id::text AS entity_title, weight_kg AS metric_score, ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num FROM cargo_packages WHERE id >= 1 ORDER BY rank_num ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-074",
    "domain": "logistics",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in freight_routes (Q74)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #74 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of freight_routes. Return id, route_name AS partition_key, distance_km AS metric_val, and DENSE_RANK() OVER (PARTITION BY route_name ORDER BY distance_km DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 84;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, route_name AS partition_key, distance_km AS metric_val, DENSE_RANK() OVER (PARTITION BY route_name ORDER BY distance_km DESC) AS dense_rnk FROM freight_routes WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-075",
    "domain": "logistics",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q75)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #75 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on delivery_checkpoints. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 85;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM delivery_checkpoints WHERE id >= 1 ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-076",
    "domain": "logistics",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q76)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #76 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on fuel_logs. Return id, gallons AS current_val, and LEAD(gallons, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 86;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "gallons",
      "next_metric"
    ],
    "reference_sql": "SELECT id, gallons AS current_val, LEAD(gallons, 1) OVER (ORDER BY id ASC) AS next_metric FROM fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-077",
    "domain": "logistics",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on maintenance_records (Q77)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #77 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in maintenance_records. Return id, cost AS baseline_val, and SUM(cost) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 87;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, cost AS baseline_val, SUM(cost) OVER (ORDER BY id ASC) AS running_total FROM maintenance_records WHERE id >= 1 ORDER BY id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-078",
    "domain": "logistics",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q78)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #78 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for customs_declarations. Create a CTE named staged_metrics selecting id, port_of_entry AS staged_name, and duty_amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 88;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, port_of_entry AS staged_name, duty_amount AS score FROM customs_declarations WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-079",
    "domain": "logistics",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q79)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #79 - Frank Miller (Terminal Dispatch Manager)]: Rank records in warehouses by capacity_sqft. Return id, city AS entity_title, capacity_sqft AS metric_score, and ROW_NUMBER() OVER (ORDER BY capacity_sqft DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 89;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, city AS entity_title, capacity_sqft AS metric_score, ROW_NUMBER() OVER (ORDER BY capacity_sqft DESC) AS rank_num FROM warehouses WHERE id >= 1 ORDER BY rank_num ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-080",
    "domain": "logistics",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in carriers (Q80)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #80 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of carriers. Return id, service_level AS partition_key, rating AS metric_val, and DENSE_RANK() OVER (PARTITION BY service_level ORDER BY rating DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 90;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, service_level AS partition_key, rating AS metric_val, DENSE_RANK() OVER (PARTITION BY service_level ORDER BY rating DESC) AS dense_rnk FROM carriers WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-081",
    "domain": "logistics",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q81)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #81 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on fleet_vehicles. Return id, max_weight_capacity_kg AS current_val, and LAG(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 91;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "max_weight_capacity_kg",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, max_weight_capacity_kg AS current_val, LAG(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS prev_metric FROM fleet_vehicles WHERE id >= 1 ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-082",
    "domain": "logistics",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q82)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #82 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on drivers. Return id, safety_score AS current_val, and LEAD(safety_score, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 92;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "safety_score",
      "next_metric"
    ],
    "reference_sql": "SELECT id, safety_score AS current_val, LEAD(safety_score, 1) OVER (ORDER BY id ASC) AS next_metric FROM drivers WHERE id >= 1 ORDER BY id ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-083",
    "domain": "logistics",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on suppliers (Q83)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #83 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in suppliers. Return id, lead_time_days AS baseline_val, and SUM(lead_time_days) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 93;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, lead_time_days AS baseline_val, SUM(lead_time_days) OVER (ORDER BY id ASC) AS running_total FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-084",
    "domain": "logistics",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q84)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #84 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for parts_inventory. Create a CTE named staged_metrics selecting id, part_number AS staged_name, and quantity_in_stock AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 94;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, part_number AS staged_name, quantity_in_stock AS score FROM parts_inventory WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-085",
    "domain": "logistics",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q85)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #85 - Dave Miller (VP of Global Fleet Operations)]: Rank records in shipments by weight_kg. Return id, destination_city AS entity_title, weight_kg AS metric_score, and ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 95;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, destination_city AS entity_title, weight_kg AS metric_score, ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS rank_num FROM shipments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "log-L4-086",
    "domain": "logistics",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in cargo_packages (Q86)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #86 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of cargo_packages. Return id, shipment_id AS partition_key, weight_kg AS metric_val, and DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY weight_kg DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 96;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, shipment_id AS partition_key, weight_kg AS metric_val, DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY weight_kg DESC) AS dense_rnk FROM cargo_packages WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-087",
    "domain": "logistics",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q87)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #87 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on freight_routes. Return id, distance_km AS current_val, and LAG(distance_km, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 97;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "distance_km",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, distance_km AS current_val, LAG(distance_km, 1) OVER (ORDER BY id ASC) AS prev_metric FROM freight_routes WHERE id >= 1 ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-088",
    "domain": "logistics",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q88)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #88 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on delivery_checkpoints. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 98;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM delivery_checkpoints WHERE id >= 1 ORDER BY id ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-089",
    "domain": "logistics",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Running Total on fuel_logs (Q89)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #89 - Dave Miller (VP of Global Fleet Operations)]: Calculate cumulative progression in fuel_logs. Return id, gallons AS baseline_val, and SUM(gallons) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 99;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, gallons AS baseline_val, SUM(gallons) OVER (ORDER BY id ASC) AS running_total FROM fuel_logs WHERE id >= 1 ORDER BY id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-090",
    "domain": "logistics",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q90)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #90 - Claire Sullivan (Director of Supply Chain Logistics)]: Stage transformation logic for maintenance_records. Create a CTE named staged_metrics selecting id, service_type AS staged_name, and cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 100;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, service_type AS staged_name, cost AS score FROM maintenance_records WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-091",
    "domain": "logistics",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q91)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #91 - Frank Miller (Terminal Dispatch Manager)]: Rank records in customs_declarations by duty_amount. Return id, port_of_entry AS entity_title, duty_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY duty_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 101;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, port_of_entry AS entity_title, duty_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY duty_amount DESC) AS rank_num FROM customs_declarations WHERE id >= 1 ORDER BY rank_num ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-092",
    "domain": "logistics",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in warehouses (Q92)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #92 - Sarah Jenkins (Head of Freight Compliance)]: Compute dense ranking within each segment of warehouses. Return id, manager_name AS partition_key, capacity_sqft AS metric_val, and DENSE_RANK() OVER (PARTITION BY manager_name ORDER BY capacity_sqft DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 102;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, manager_name AS partition_key, capacity_sqft AS metric_val, DENSE_RANK() OVER (PARTITION BY manager_name ORDER BY capacity_sqft DESC) AS dense_rnk FROM warehouses WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-093",
    "domain": "logistics",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q93)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #93 - Dave Miller (VP of Global Fleet Operations)]: Perform period-over-period delta analysis on carriers. Return id, rating AS current_val, and LAG(rating, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 103;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LAG(rating, 1) OVER (ORDER BY id ASC) AS prev_metric FROM carriers WHERE id >= 1 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-094",
    "domain": "logistics",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q94)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #94 - Claire Sullivan (Director of Supply Chain Logistics)]: Perform forward-looking trend analysis on fleet_vehicles. Return id, max_weight_capacity_kg AS current_val, and LEAD(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 104;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "max_weight_capacity_kg",
      "next_metric"
    ],
    "reference_sql": "SELECT id, max_weight_capacity_kg AS current_val, LEAD(max_weight_capacity_kg, 1) OVER (ORDER BY id ASC) AS next_metric FROM fleet_vehicles WHERE id >= 1 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-095",
    "domain": "logistics",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Cumulative Running Total on drivers (Q95)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #95 - Frank Miller (Terminal Dispatch Manager)]: Calculate cumulative progression in drivers. Return id, safety_score AS baseline_val, and SUM(safety_score) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 105;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, safety_score AS baseline_val, SUM(safety_score) OVER (ORDER BY id ASC) AS running_total FROM drivers WHERE id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-096",
    "domain": "logistics",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q96)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #96 - Sarah Jenkins (Head of Freight Compliance)]: Stage transformation logic for suppliers. Create a CTE named staged_metrics selecting id, supplier_name AS staged_name, and lead_time_days AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 106;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, supplier_name AS staged_name, lead_time_days AS score FROM suppliers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-097",
    "domain": "logistics",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q97)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"[Task #97 - Dave Miller (VP of Global Fleet Operations)]: Rank records in parts_inventory by quantity_in_stock. Return id, part_number AS entity_title, quantity_in_stock AS metric_score, and ROW_NUMBER() OVER (ORDER BY quantity_in_stock DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 107;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, part_number AS entity_title, quantity_in_stock AS metric_score, ROW_NUMBER() OVER (ORDER BY quantity_in_stock DESC) AS rank_num FROM parts_inventory WHERE id >= 1 ORDER BY rank_num ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-098",
    "domain": "logistics",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in shipments (Q98)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"[Task #98 - Claire Sullivan (Director of Supply Chain Logistics)]: Compute dense ranking within each segment of shipments. Return id, carrier_id AS partition_key, weight_kg AS metric_val, and DENSE_RANK() OVER (PARTITION BY carrier_id ORDER BY weight_kg DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 108;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, carrier_id AS partition_key, weight_kg AS metric_val, DENSE_RANK() OVER (PARTITION BY carrier_id ORDER BY weight_kg DESC) AS dense_rnk FROM shipments WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-099",
    "domain": "logistics",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q99)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"[Task #99 - Frank Miller (Terminal Dispatch Manager)]: Perform period-over-period delta analysis on cargo_packages. Return id, weight_kg AS current_val, and LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 109;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "weight_kg",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, weight_kg AS current_val, LAG(weight_kg, 1) OVER (ORDER BY id ASC) AS prev_metric FROM cargo_packages WHERE id >= 1 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "log-L4-100",
    "domain": "logistics",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q100)",
    "stakeholder": {
      "name": "Sarah Jenkins",
      "role": "Head of Freight Compliance",
      "department": "Compliance"
    },
    "request": "From: Sarah Jenkins (Head of Freight Compliance)\n\n\"[Task #100 - Sarah Jenkins (Head of Freight Compliance)]: Perform forward-looking trend analysis on freight_routes. Return id, distance_km AS current_val, and LEAD(distance_km, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 110;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "distance_km",
      "next_metric"
    ],
    "reference_sql": "SELECT id, distance_km AS current_val, LEAD(distance_km, 1) OVER (ORDER BY id ASC) AS next_metric FROM freight_routes WHERE id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  }
];
