import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L1-001",
    "domain": "restaurants",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-002",
    "domain": "restaurants",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-003",
    "domain": "restaurants",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-004",
    "domain": "restaurants",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-005",
    "domain": "restaurants",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-006",
    "domain": "restaurants",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-007",
    "domain": "restaurants",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Quality Ticket: In restaurants, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(name)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS cleaned_name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(name)) AS cleaned_name."
    ],
    "solution_explanation": "Applies TRIM to strip whitespace and UPPER to standardize casing.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-008",
    "domain": "restaurants",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From menu_items, select id, name, and COALESCE(price, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "name",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, name, COALESCE(price, 0.00) AS safe_metric FROM menu_items ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(price, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-009",
    "domain": "restaurants",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-010",
    "domain": "restaurants",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: restaurants Baseline",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Ahead of our quarterly audit, pull our active restaurants entries showing id and name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "name"
    ],
    "reference_sql": "SELECT id, name FROM restaurants ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-011",
    "domain": "restaurants",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-012",
    "domain": "restaurants",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-013",
    "domain": "restaurants",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-014",
    "domain": "restaurants",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-015",
    "domain": "restaurants",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-016",
    "domain": "restaurants",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-017",
    "domain": "restaurants",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-018",
    "domain": "restaurants",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-019",
    "domain": "restaurants",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-020",
    "domain": "restaurants",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: restaurants and dining_sections",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Compile a relational breakdown connecting restaurants to dining_sections. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM restaurants t1 JOIN dining_sections t2 ON t1.id = t2.restaurant_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join restaurants and dining_sections on t1.id = t2.restaurant_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L1-021",
    "domain": "restaurants",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-022",
    "domain": "restaurants",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-023",
    "domain": "restaurants",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-024",
    "domain": "restaurants",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-025",
    "domain": "restaurants",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-026",
    "domain": "restaurants",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-027",
    "domain": "restaurants",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-028",
    "domain": "restaurants",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-029",
    "domain": "restaurants",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-030",
    "domain": "restaurants",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from restaurants and dining_sections using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM restaurants UNION ALL SELECT section_name AS catalog_name, 'Secondary' AS category_type FROM dining_sections ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "rest-L1-031",
    "domain": "restaurants",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-032",
    "domain": "restaurants",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-033",
    "domain": "restaurants",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-034",
    "domain": "restaurants",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-035",
    "domain": "restaurants",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-036",
    "domain": "restaurants",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-037",
    "domain": "restaurants",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-038",
    "domain": "restaurants",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-039",
    "domain": "restaurants",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-040",
    "domain": "restaurants",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, name, and price from menu_items where price is strictly greater than the overall table average. Order descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "SELECT id, name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE price > (SELECT AVG(price) FROM menu_items)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-041",
    "domain": "restaurants",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-042",
    "domain": "restaurants",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-043",
    "domain": "restaurants",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-044",
    "domain": "restaurants",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-045",
    "domain": "restaurants",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-046",
    "domain": "restaurants",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-047",
    "domain": "restaurants",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-048",
    "domain": "restaurants",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-049",
    "domain": "restaurants",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-050",
    "domain": "restaurants",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Analyze sequential transactions or events in orders. Using the LAG() window function, retrieve id, total_amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, total_amount, LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount FROM orders ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(total_amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-051",
    "domain": "restaurants",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-052",
    "domain": "restaurants",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-053",
    "domain": "restaurants",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-054",
    "domain": "restaurants",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-055",
    "domain": "restaurants",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-056",
    "domain": "restaurants",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-057",
    "domain": "restaurants",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-058",
    "domain": "restaurants",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-059",
    "domain": "restaurants",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-060",
    "domain": "restaurants",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, name, and price from menu_items where price > 20. Select all columns from staged_records ordered descending by price. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, name, price FROM menu_items WHERE price > 20) SELECT id, name, price FROM staged_records ORDER BY price DESC LIMIT 20;",
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
    "id": "rest-L1-061",
    "domain": "restaurants",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-062",
    "domain": "restaurants",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-063",
    "domain": "restaurants",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-064",
    "domain": "restaurants",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-065",
    "domain": "restaurants",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-066",
    "domain": "restaurants",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-067",
    "domain": "restaurants",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-068",
    "domain": "restaurants",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-069",
    "domain": "restaurants",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-070",
    "domain": "restaurants",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_menu_items_clean to cleanse raw data. Ingest id, UPPER(TRIM(name)) AS cleaned_name, and COALESCE(price, 0.00) AS standardized_amount from menu_items where name IS NOT NULL. Select all columns from temp_menu_items_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_menu_items_clean AS SELECT id, UPPER(TRIM(name)) AS cleaned_name, COALESCE(price, 0.00) AS standardized_amount FROM menu_items WHERE name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_menu_items_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_menu_items_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-071",
    "domain": "restaurants",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-072",
    "domain": "restaurants",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-073",
    "domain": "restaurants",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-074",
    "domain": "restaurants",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-075",
    "domain": "restaurants",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-076",
    "domain": "restaurants",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-077",
    "domain": "restaurants",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-078",
    "domain": "restaurants",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-079",
    "domain": "restaurants",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-080",
    "domain": "restaurants",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) that updates price by adding p_delta. Execute it with CALL sp_adjust_menu_items_val(1, 5); then select id, name, price from menu_items where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_menu_items_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE menu_items SET price = price + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_menu_items_val(1, 5); SELECT id, name, price FROM menu_items WHERE id = 1;",
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
    "id": "rest-L1-081",
    "domain": "restaurants",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-082",
    "domain": "restaurants",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-083",
    "domain": "restaurants",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-084",
    "domain": "restaurants",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-085",
    "domain": "restaurants",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-086",
    "domain": "restaurants",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-087",
    "domain": "restaurants",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-088",
    "domain": "restaurants",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-089",
    "domain": "restaurants",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-090",
    "domain": "restaurants",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Production Ticket: Read latency on menu_items is increasing. Create an Index named idx_menu_items_perf ON menu_items(price DESC). Then retrieve id, name, price for entries where price > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "name",
      "price"
    ],
    "reference_sql": "CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); SELECT id, name, price FROM menu_items WHERE price > 20 ORDER BY price DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_menu_items_perf ON menu_items(price DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-091",
    "domain": "restaurants",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-092",
    "domain": "restaurants",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-093",
    "domain": "restaurants",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-094",
    "domain": "restaurants",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-095",
    "domain": "restaurants",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-096",
    "domain": "restaurants",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-097",
    "domain": "restaurants",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-098",
    "domain": "restaurants",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality & Guest Exp",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality & Guest Exp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-099",
    "domain": "restaurants",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
    "id": "rest-L1-100",
    "domain": "restaurants",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering orders by total_amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 50;",
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
