import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "log-L1-001",
    "domain": "logistics",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-002",
    "domain": "logistics",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-003",
    "domain": "logistics",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-004",
    "domain": "logistics",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-005",
    "domain": "logistics",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-006",
    "domain": "logistics",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-007",
    "domain": "logistics",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Quality Ticket: In warehouses, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(city)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "DATA CLEANING",
      "TRIM",
      "UPPER"
    ],
    "expected_columns": [
      "id",
      "cleaned_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(city)) AS cleaned_name FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(city)) AS cleaned_name."
    ],
    "solution_explanation": "Applies TRIM to strip whitespace and UPPER to standardize casing.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-008",
    "domain": "logistics",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From fleet_vehicles, select id, vehicle_number, and COALESCE(max_weight_capacity_kg, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, vehicle_number, COALESCE(max_weight_capacity_kg, 0.00) AS safe_metric FROM fleet_vehicles ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(max_weight_capacity_kg, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-009",
    "domain": "logistics",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-010",
    "domain": "logistics",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: warehouses Baseline",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Ahead of our quarterly audit, pull our active warehouses entries showing id and city, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "city"
    ],
    "reference_sql": "SELECT id, city FROM warehouses ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and city.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-011",
    "domain": "logistics",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-012",
    "domain": "logistics",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-013",
    "domain": "logistics",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-014",
    "domain": "logistics",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-015",
    "domain": "logistics",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-016",
    "domain": "logistics",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-017",
    "domain": "logistics",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-018",
    "domain": "logistics",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-019",
    "domain": "logistics",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-020",
    "domain": "logistics",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: warehouses and carriers",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Compile a relational breakdown connecting warehouses to carriers. Return city and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "city",
      "related_count"
    ],
    "reference_sql": "SELECT t1.city, COUNT(t2.id) AS related_count FROM warehouses t1 JOIN carriers t2 ON t1.id = t2.id GROUP BY t1.city ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and carriers on t1.id = t2.id.",
      "Group by t1.city and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-021",
    "domain": "logistics",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-022",
    "domain": "logistics",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-023",
    "domain": "logistics",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-024",
    "domain": "logistics",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-025",
    "domain": "logistics",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "log-L1-026",
    "domain": "logistics",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-027",
    "domain": "logistics",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-028",
    "domain": "logistics",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-029",
    "domain": "logistics",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-030",
    "domain": "logistics",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from warehouses and carriers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
    "context_notes": "",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "catalog_name",
      "category_type"
    ],
    "reference_sql": "SELECT city AS catalog_name, 'Primary' AS category_type FROM warehouses UNION ALL SELECT carrier_name AS catalog_name, 'Secondary' AS category_type FROM carriers ORDER BY catalog_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write two SELECT queries with matching column aliases, merged via UNION ALL."
    ],
    "solution_explanation": "Merges two distinct tables into a single normalized result set using UNION ALL.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-031",
    "domain": "logistics",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-032",
    "domain": "logistics",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-033",
    "domain": "logistics",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-034",
    "domain": "logistics",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-035",
    "domain": "logistics",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-036",
    "domain": "logistics",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-037",
    "domain": "logistics",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-038",
    "domain": "logistics",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-039",
    "domain": "logistics",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-040",
    "domain": "logistics",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg is strictly greater than the overall table average. Order descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles) ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE max_weight_capacity_kg > (SELECT AVG(max_weight_capacity_kg) FROM fleet_vehicles)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-041",
    "domain": "logistics",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-042",
    "domain": "logistics",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-043",
    "domain": "logistics",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-044",
    "domain": "logistics",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-045",
    "domain": "logistics",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-046",
    "domain": "logistics",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-047",
    "domain": "logistics",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-048",
    "domain": "logistics",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-049",
    "domain": "logistics",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-050",
    "domain": "logistics",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Analyze sequential transactions or events in shipments. Using the LAG() window function, retrieve id, weight_kg, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "weight_kg",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, weight_kg, LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount FROM shipments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(weight_kg) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-051",
    "domain": "logistics",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-052",
    "domain": "logistics",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-053",
    "domain": "logistics",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-054",
    "domain": "logistics",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-055",
    "domain": "logistics",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-056",
    "domain": "logistics",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-057",
    "domain": "logistics",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-058",
    "domain": "logistics",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-059",
    "domain": "logistics",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-060",
    "domain": "logistics",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, vehicle_number, and max_weight_capacity_kg from fleet_vehicles where max_weight_capacity_kg > 20. Select all columns from staged_records ordered descending by max_weight_capacity_kg. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20) SELECT id, vehicle_number, max_weight_capacity_kg FROM staged_records ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Start with WITH staged_records AS (SELECT ...) and query from staged_records."
    ],
    "solution_explanation": "Defines a temporary named result set to stage transformation steps.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-061",
    "domain": "logistics",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-062",
    "domain": "logistics",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-063",
    "domain": "logistics",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-064",
    "domain": "logistics",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-065",
    "domain": "logistics",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-066",
    "domain": "logistics",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-067",
    "domain": "logistics",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-068",
    "domain": "logistics",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-069",
    "domain": "logistics",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-070",
    "domain": "logistics",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_fleet_vehicles_clean to cleanse raw data. Ingest id, UPPER(TRIM(vehicle_number)) AS cleaned_name, and COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount from fleet_vehicles where vehicle_number IS NOT NULL. Select all columns from temp_fleet_vehicles_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
      "standardized_amount"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_fleet_vehicles_clean AS SELECT id, UPPER(TRIM(vehicle_number)) AS cleaned_name, COALESCE(max_weight_capacity_kg, 0.00) AS standardized_amount FROM fleet_vehicles WHERE vehicle_number IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_fleet_vehicles_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_fleet_vehicles_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "log-L1-071",
    "domain": "logistics",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-072",
    "domain": "logistics",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-073",
    "domain": "logistics",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-074",
    "domain": "logistics",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-075",
    "domain": "logistics",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-076",
    "domain": "logistics",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-077",
    "domain": "logistics",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-078",
    "domain": "logistics",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-079",
    "domain": "logistics",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-080",
    "domain": "logistics",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) that updates max_weight_capacity_kg by adding p_delta. Execute it with CALL sp_adjust_fleet_vehicles_val(1, 5); then select id, vehicle_number, max_weight_capacity_kg from fleet_vehicles where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_fleet_vehicles_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE fleet_vehicles SET max_weight_capacity_kg = max_weight_capacity_kg + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_fleet_vehicles_val(1, 5); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it."
    ],
    "solution_explanation": "Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-081",
    "domain": "logistics",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-082",
    "domain": "logistics",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-083",
    "domain": "logistics",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-084",
    "domain": "logistics",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-085",
    "domain": "logistics",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-086",
    "domain": "logistics",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-087",
    "domain": "logistics",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-088",
    "domain": "logistics",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-089",
    "domain": "logistics",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-090",
    "domain": "logistics",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Production Ticket: Read latency on fleet_vehicles is increasing. Create an Index named idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC). Then retrieve id, vehicle_number, max_weight_capacity_kg for entries where max_weight_capacity_kg > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "vehicle_number",
      "max_weight_capacity_kg"
    ],
    "reference_sql": "CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); SELECT id, vehicle_number, max_weight_capacity_kg FROM fleet_vehicles WHERE max_weight_capacity_kg > 20 ORDER BY max_weight_capacity_kg DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_fleet_vehicles_perf ON fleet_vehicles(max_weight_capacity_kg DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-091",
    "domain": "logistics",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-092",
    "domain": "logistics",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-093",
    "domain": "logistics",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-094",
    "domain": "logistics",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-095",
    "domain": "logistics",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "log-L1-096",
    "domain": "logistics",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L1-097",
    "domain": "logistics",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L1-098",
    "domain": "logistics",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Sullivan",
      "role": "Director of Supply Chain Logistics",
      "department": "Supply Chain"
    },
    "request": "From: Claire Sullivan (Director of Supply Chain Logistics)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L1-099",
    "domain": "logistics",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Frank Miller",
      "role": "Terminal Dispatch Manager",
      "department": "Operations"
    },
    "request": "From: Frank Miller (Terminal Dispatch Manager)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 75,
    "estimated_minutes": 20
  },
  {
    "id": "log-L1-100",
    "domain": "logistics",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dave Miller",
      "role": "VP of Global Fleet Operations",
      "department": "Fleet Ops"
    },
    "request": "From: Dave Miller (VP of Global Fleet Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering shipments by weight_kg > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, weight_kg FROM shipments WHERE weight_kg > 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Prefix your SELECT query with EXPLAIN (FORMAT JSON)."
    ],
    "solution_explanation": "Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.",
    "xp": 75,
    "estimated_minutes": 20
  }
];
