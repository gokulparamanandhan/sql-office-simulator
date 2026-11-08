import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L1-001",
    "domain": "healthcare",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-002",
    "domain": "healthcare",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-003",
    "domain": "healthcare",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-004",
    "domain": "healthcare",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-005",
    "domain": "healthcare",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-006",
    "domain": "healthcare",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-007",
    "domain": "healthcare",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Data Quality Ticket: In departments, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(name)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name)) AS cleaned_name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-008",
    "domain": "healthcare",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From lab_tests, select id, test_name, and COALESCE(standard_fee, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, test_name, COALESCE(standard_fee, 0.00) AS safe_metric FROM lab_tests ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(standard_fee, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-009",
    "domain": "healthcare",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-010",
    "domain": "healthcare",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, name FROM departments ORDER BY id ASC LIMIT 20;",
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
    "id": "hc-L1-011",
    "domain": "healthcare",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-012",
    "domain": "healthcare",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-013",
    "domain": "healthcare",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-014",
    "domain": "healthcare",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-015",
    "domain": "healthcare",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-016",
    "domain": "healthcare",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-017",
    "domain": "healthcare",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-018",
    "domain": "healthcare",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-019",
    "domain": "healthcare",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-020",
    "domain": "healthcare",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and doctors",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Compile a relational breakdown connecting departments to doctors. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN doctors t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and doctors on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-021",
    "domain": "healthcare",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-022",
    "domain": "healthcare",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-023",
    "domain": "healthcare",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-024",
    "domain": "healthcare",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-025",
    "domain": "healthcare",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-026",
    "domain": "healthcare",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-027",
    "domain": "healthcare",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-028",
    "domain": "healthcare",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-029",
    "domain": "healthcare",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-030",
    "domain": "healthcare",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and doctors using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM doctors ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hc-L1-031",
    "domain": "healthcare",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-032",
    "domain": "healthcare",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-033",
    "domain": "healthcare",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-034",
    "domain": "healthcare",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-035",
    "domain": "healthcare",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-036",
    "domain": "healthcare",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-037",
    "domain": "healthcare",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-038",
    "domain": "healthcare",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-039",
    "domain": "healthcare",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-040",
    "domain": "healthcare",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, test_name, and standard_fee from lab_tests where standard_fee is strictly greater than the overall table average. Order descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-041",
    "domain": "healthcare",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-042",
    "domain": "healthcare",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-043",
    "domain": "healthcare",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-044",
    "domain": "healthcare",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-045",
    "domain": "healthcare",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-046",
    "domain": "healthcare",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-047",
    "domain": "healthcare",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-048",
    "domain": "healthcare",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-049",
    "domain": "healthcare",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-050",
    "domain": "healthcare",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Analyze sequential transactions or events in appointments. Using the LAG() window function, retrieve id, fee, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "fee",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, fee, LAG(fee) OVER (ORDER BY id ASC) AS prev_amount FROM appointments ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(fee) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-051",
    "domain": "healthcare",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-052",
    "domain": "healthcare",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-053",
    "domain": "healthcare",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-054",
    "domain": "healthcare",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-055",
    "domain": "healthcare",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-056",
    "domain": "healthcare",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-057",
    "domain": "healthcare",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-058",
    "domain": "healthcare",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-059",
    "domain": "healthcare",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-060",
    "domain": "healthcare",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, test_name, and standard_fee from lab_tests where standard_fee > 20. Select all columns from staged_records ordered descending by standard_fee. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20) SELECT id, test_name, standard_fee FROM staged_records ORDER BY standard_fee DESC LIMIT 20;",
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
    "id": "hc-L1-061",
    "domain": "healthcare",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-062",
    "domain": "healthcare",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-063",
    "domain": "healthcare",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-064",
    "domain": "healthcare",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-065",
    "domain": "healthcare",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-066",
    "domain": "healthcare",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-067",
    "domain": "healthcare",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-068",
    "domain": "healthcare",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-069",
    "domain": "healthcare",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-070",
    "domain": "healthcare",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Data Engineering Ticket: Build a session staging table named temp_lab_tests_clean to cleanse raw data. Ingest id, UPPER(TRIM(test_name)) AS cleaned_name, and COALESCE(standard_fee, 0.00) AS standardized_amount from lab_tests where test_name IS NOT NULL. Select all columns from temp_lab_tests_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_lab_tests_clean AS SELECT id, UPPER(TRIM(test_name)) AS cleaned_name, COALESCE(standard_fee, 0.00) AS standardized_amount FROM lab_tests WHERE test_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_lab_tests_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_lab_tests_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-071",
    "domain": "healthcare",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-072",
    "domain": "healthcare",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-073",
    "domain": "healthcare",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-074",
    "domain": "healthcare",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-075",
    "domain": "healthcare",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-076",
    "domain": "healthcare",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-077",
    "domain": "healthcare",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-078",
    "domain": "healthcare",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-079",
    "domain": "healthcare",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-080",
    "domain": "healthcare",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) that updates standard_fee by adding p_delta. Execute it with CALL sp_adjust_lab_tests_val(1, 5); then select id, test_name, standard_fee from lab_tests where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_lab_tests_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE lab_tests SET standard_fee = standard_fee + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_lab_tests_val(1, 5); SELECT id, test_name, standard_fee FROM lab_tests WHERE id = 1;",
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
    "id": "hc-L1-081",
    "domain": "healthcare",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-082",
    "domain": "healthcare",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-083",
    "domain": "healthcare",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-084",
    "domain": "healthcare",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-085",
    "domain": "healthcare",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-086",
    "domain": "healthcare",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-087",
    "domain": "healthcare",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-088",
    "domain": "healthcare",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-089",
    "domain": "healthcare",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-090",
    "domain": "healthcare",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Production Ticket: Read latency on lab_tests is increasing. Create an Index named idx_lab_tests_perf ON lab_tests(standard_fee DESC). Then retrieve id, test_name, standard_fee for entries where standard_fee > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "test_name",
      "standard_fee"
    ],
    "reference_sql": "CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); SELECT id, test_name, standard_fee FROM lab_tests WHERE standard_fee > 20 ORDER BY standard_fee DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_lab_tests_perf ON lab_tests(standard_fee DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L1-091",
    "domain": "healthcare",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-092",
    "domain": "healthcare",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-093",
    "domain": "healthcare",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-094",
    "domain": "healthcare",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-095",
    "domain": "healthcare",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-096",
    "domain": "healthcare",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-097",
    "domain": "healthcare",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer",
      "department": "Clinical Governance"
    },
    "request": "From: Dr. Evelyn Reed (Chief Medical Officer)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-098",
    "domain": "healthcare",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Revenue Cycle",
      "department": "Finance & Billing"
    },
    "request": "From: Jordan Chen (Director of Revenue Cycle)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-099",
    "domain": "healthcare",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgical Services",
      "department": "Surgery"
    },
    "request": "From: Dr. Sarah Patel (Head of Surgical Services)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
    "id": "hc-L1-100",
    "domain": "healthcare",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer",
      "department": "Nursing Ops"
    },
    "request": "From: Marcus Thorne (Chief Nursing Officer)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering appointments by fee > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, fee FROM appointments WHERE fee > 50;",
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
