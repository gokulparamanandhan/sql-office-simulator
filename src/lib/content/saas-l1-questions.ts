import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L1-001",
    "domain": "saas",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-002",
    "domain": "saas",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-003",
    "domain": "saas",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-004",
    "domain": "saas",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-005",
    "domain": "saas",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-006",
    "domain": "saas",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-007",
    "domain": "saas",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Data Quality Ticket: In accounts, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(company_name)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(company_name)) AS cleaned_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(company_name)) AS cleaned_name."
    ],
    "solution_explanation": "Applies TRIM to strip whitespace and UPPER to standardize casing.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-008",
    "domain": "saas",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From subscriptions, select id, plan, and COALESCE(mrr, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "plan",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, plan, COALESCE(mrr, 0.00) AS safe_metric FROM subscriptions ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(mrr, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-009",
    "domain": "saas",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-010",
    "domain": "saas",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: accounts Baseline",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Ahead of our quarterly audit, pull our active accounts entries showing id and company_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "company_name"
    ],
    "reference_sql": "SELECT id, company_name FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and company_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-011",
    "domain": "saas",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-012",
    "domain": "saas",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-013",
    "domain": "saas",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-014",
    "domain": "saas",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-015",
    "domain": "saas",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-016",
    "domain": "saas",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-017",
    "domain": "saas",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-018",
    "domain": "saas",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-019",
    "domain": "saas",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-020",
    "domain": "saas",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: accounts and pricing_plans",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Compile a relational breakdown connecting accounts to pricing_plans. Return company_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "company_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.company_name, COUNT(t2.id) AS related_count FROM accounts t1 JOIN pricing_plans t2 ON t1.id = t2.id GROUP BY t1.company_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join accounts and pricing_plans on t1.id = t2.id.",
      "Group by t1.company_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "saas-L1-021",
    "domain": "saas",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-022",
    "domain": "saas",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-023",
    "domain": "saas",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-024",
    "domain": "saas",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-025",
    "domain": "saas",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-026",
    "domain": "saas",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-027",
    "domain": "saas",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-028",
    "domain": "saas",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-029",
    "domain": "saas",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-030",
    "domain": "saas",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from accounts and pricing_plans using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT company_name AS catalog_name, 'Primary' AS category_type FROM accounts UNION ALL SELECT plan_name AS catalog_name, 'Secondary' AS category_type FROM pricing_plans ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "saas-L1-031",
    "domain": "saas",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-032",
    "domain": "saas",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-033",
    "domain": "saas",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-034",
    "domain": "saas",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-035",
    "domain": "saas",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-036",
    "domain": "saas",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-037",
    "domain": "saas",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-038",
    "domain": "saas",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-039",
    "domain": "saas",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-040",
    "domain": "saas",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, plan, and mrr from subscriptions where mrr is strictly greater than the overall table average. Order descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "SELECT id, plan, mrr FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-041",
    "domain": "saas",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-042",
    "domain": "saas",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-043",
    "domain": "saas",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-044",
    "domain": "saas",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-045",
    "domain": "saas",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-046",
    "domain": "saas",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-047",
    "domain": "saas",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-048",
    "domain": "saas",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-049",
    "domain": "saas",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-050",
    "domain": "saas",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Analyze sequential transactions or events in invoices. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "amount",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM invoices ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(amount) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-051",
    "domain": "saas",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-052",
    "domain": "saas",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-053",
    "domain": "saas",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-054",
    "domain": "saas",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-055",
    "domain": "saas",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-056",
    "domain": "saas",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-057",
    "domain": "saas",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-058",
    "domain": "saas",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-059",
    "domain": "saas",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-060",
    "domain": "saas",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, plan, and mrr from subscriptions where mrr > 20. Select all columns from staged_records ordered descending by mrr. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20) SELECT id, plan, mrr FROM staged_records ORDER BY mrr DESC LIMIT 20;",
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
    "id": "saas-L1-061",
    "domain": "saas",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-062",
    "domain": "saas",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-063",
    "domain": "saas",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-064",
    "domain": "saas",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-065",
    "domain": "saas",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-066",
    "domain": "saas",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-067",
    "domain": "saas",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-068",
    "domain": "saas",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-069",
    "domain": "saas",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-070",
    "domain": "saas",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Data Engineering Ticket: Build a session staging table named temp_subscriptions_clean to cleanse raw data. Ingest id, UPPER(TRIM(plan)) AS cleaned_name, and COALESCE(mrr, 0.00) AS standardized_amount from subscriptions where plan IS NOT NULL. Select all columns from temp_subscriptions_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_subscriptions_clean AS SELECT id, UPPER(TRIM(plan)) AS cleaned_name, COALESCE(mrr, 0.00) AS standardized_amount FROM subscriptions WHERE plan IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_subscriptions_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_subscriptions_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-071",
    "domain": "saas",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-072",
    "domain": "saas",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-073",
    "domain": "saas",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-074",
    "domain": "saas",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-075",
    "domain": "saas",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-076",
    "domain": "saas",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-077",
    "domain": "saas",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-078",
    "domain": "saas",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-079",
    "domain": "saas",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-080",
    "domain": "saas",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) that updates mrr by adding p_delta. Execute it with CALL sp_adjust_subscriptions_val(1, 5); then select id, plan, mrr from subscriptions where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_subscriptions_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE subscriptions SET mrr = mrr + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_subscriptions_val(1, 5); SELECT id, plan, mrr FROM subscriptions WHERE id = 1;",
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
    "id": "saas-L1-081",
    "domain": "saas",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-082",
    "domain": "saas",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-083",
    "domain": "saas",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-084",
    "domain": "saas",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-085",
    "domain": "saas",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-086",
    "domain": "saas",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-087",
    "domain": "saas",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-088",
    "domain": "saas",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-089",
    "domain": "saas",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-090",
    "domain": "saas",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Production Ticket: Read latency on subscriptions is increasing. Create an Index named idx_subscriptions_perf ON subscriptions(mrr DESC). Then retrieve id, plan, mrr for entries where mrr > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "plan",
      "mrr"
    ],
    "reference_sql": "CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); SELECT id, plan, mrr FROM subscriptions WHERE mrr > 20 ORDER BY mrr DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_subscriptions_perf ON subscriptions(mrr DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-091",
    "domain": "saas",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-092",
    "domain": "saas",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-093",
    "domain": "saas",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-094",
    "domain": "saas",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-095",
    "domain": "saas",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-096",
    "domain": "saas",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-097",
    "domain": "saas",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-098",
    "domain": "saas",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-099",
    "domain": "saas",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics & CS",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics & CS)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
    "id": "saas-L1-100",
    "domain": "saas",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Co-Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Co-Founder)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering invoices by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM invoices WHERE amount > 50;",
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
