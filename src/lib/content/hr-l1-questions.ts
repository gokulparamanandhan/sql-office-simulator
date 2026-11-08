import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L1-001",
    "domain": "hr",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-002",
    "domain": "hr",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-003",
    "domain": "hr",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-004",
    "domain": "hr",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-005",
    "domain": "hr",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-006",
    "domain": "hr",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-007",
    "domain": "hr",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Data Quality Ticket: In departments, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(name)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
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
    "id": "hr-L1-008",
    "domain": "hr",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From locations, select id, office_name, and COALESCE(capacity, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, office_name, COALESCE(capacity, 0.00) AS safe_metric FROM locations ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(capacity, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-009",
    "domain": "hr",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-010",
    "domain": "hr",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: departments Baseline",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Ahead of our quarterly audit, pull our active departments entries showing id and name, sorted ascending. (Limit to 20 records).\"",
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
    "id": "hr-L1-011",
    "domain": "hr",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-012",
    "domain": "hr",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-013",
    "domain": "hr",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-014",
    "domain": "hr",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-015",
    "domain": "hr",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-016",
    "domain": "hr",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-017",
    "domain": "hr",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-018",
    "domain": "hr",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-019",
    "domain": "hr",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-020",
    "domain": "hr",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: departments and job_roles",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Compile a relational breakdown connecting departments to job_roles. Return name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT t1.name, COUNT(t2.id) AS related_count FROM departments t1 JOIN job_roles t2 ON t1.id = t2.department_id GROUP BY t1.name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments and job_roles on t1.id = t2.department_id.",
      "Group by t1.name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "hr-L1-021",
    "domain": "hr",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-022",
    "domain": "hr",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-023",
    "domain": "hr",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-024",
    "domain": "hr",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-025",
    "domain": "hr",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-026",
    "domain": "hr",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-027",
    "domain": "hr",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-028",
    "domain": "hr",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-029",
    "domain": "hr",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-030",
    "domain": "hr",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from departments and job_roles using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT name AS catalog_name, 'Primary' AS category_type FROM departments UNION ALL SELECT job_title AS catalog_name, 'Secondary' AS category_type FROM job_roles ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "hr-L1-031",
    "domain": "hr",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-032",
    "domain": "hr",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-033",
    "domain": "hr",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-034",
    "domain": "hr",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-035",
    "domain": "hr",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-036",
    "domain": "hr",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-037",
    "domain": "hr",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-038",
    "domain": "hr",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-039",
    "domain": "hr",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-040",
    "domain": "hr",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, office_name, and capacity from locations where capacity is strictly greater than the overall table average. Order descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "SELECT id, office_name, capacity FROM locations WHERE capacity > (SELECT AVG(capacity) FROM locations) ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE capacity > (SELECT AVG(capacity) FROM locations)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-041",
    "domain": "hr",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-042",
    "domain": "hr",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-043",
    "domain": "hr",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-044",
    "domain": "hr",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-045",
    "domain": "hr",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-046",
    "domain": "hr",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-047",
    "domain": "hr",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-048",
    "domain": "hr",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-049",
    "domain": "hr",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-050",
    "domain": "hr",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Analyze sequential transactions or events in attendance_logs. Using the LAG() window function, retrieve id, hours_worked, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "hours_worked",
      "prev_amount"
    ],
    "reference_sql": "SELECT id, hours_worked, LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount FROM attendance_logs ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use LAG(hours_worked) OVER (ORDER BY id ASC) AS prev_amount."
    ],
    "solution_explanation": "Accesses the prior row value without performing an expensive self-join.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-051",
    "domain": "hr",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-052",
    "domain": "hr",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-053",
    "domain": "hr",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-054",
    "domain": "hr",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-055",
    "domain": "hr",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-056",
    "domain": "hr",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-057",
    "domain": "hr",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-058",
    "domain": "hr",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-059",
    "domain": "hr",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-060",
    "domain": "hr",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, office_name, and capacity from locations where capacity > 20. Select all columns from staged_records ordered descending by capacity. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, office_name, capacity FROM locations WHERE capacity > 20) SELECT id, office_name, capacity FROM staged_records ORDER BY capacity DESC LIMIT 20;",
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
    "id": "hr-L1-061",
    "domain": "hr",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-062",
    "domain": "hr",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-063",
    "domain": "hr",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-064",
    "domain": "hr",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-065",
    "domain": "hr",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-066",
    "domain": "hr",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-067",
    "domain": "hr",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-068",
    "domain": "hr",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-069",
    "domain": "hr",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-070",
    "domain": "hr",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Data Engineering Ticket: Build a session staging table named temp_locations_clean to cleanse raw data. Ingest id, UPPER(TRIM(office_name)) AS cleaned_name, and COALESCE(capacity, 0.00) AS standardized_amount from locations where office_name IS NOT NULL. Select all columns from temp_locations_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_locations_clean AS SELECT id, UPPER(TRIM(office_name)) AS cleaned_name, COALESCE(capacity, 0.00) AS standardized_amount FROM locations WHERE office_name IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_locations_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_locations_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-071",
    "domain": "hr",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-072",
    "domain": "hr",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-073",
    "domain": "hr",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-074",
    "domain": "hr",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-075",
    "domain": "hr",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-076",
    "domain": "hr",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-077",
    "domain": "hr",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-078",
    "domain": "hr",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-079",
    "domain": "hr",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-080",
    "domain": "hr",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_locations_val(p_id INT, p_delta NUMERIC) that updates capacity by adding p_delta. Execute it with CALL sp_adjust_locations_val(1, 5); then select id, office_name, capacity from locations where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_locations_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE locations SET capacity = capacity + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_locations_val(1, 5); SELECT id, office_name, capacity FROM locations WHERE id = 1;",
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
    "id": "hr-L1-081",
    "domain": "hr",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-082",
    "domain": "hr",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-083",
    "domain": "hr",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-084",
    "domain": "hr",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-085",
    "domain": "hr",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-086",
    "domain": "hr",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-087",
    "domain": "hr",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-088",
    "domain": "hr",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-089",
    "domain": "hr",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-090",
    "domain": "hr",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Production Ticket: Read latency on locations is increasing. Create an Index named idx_locations_perf ON locations(capacity DESC). Then retrieve id, office_name, capacity for entries where capacity > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "office_name",
      "capacity"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf ON locations(capacity DESC); SELECT id, office_name, capacity FROM locations WHERE capacity > 20 ORDER BY capacity DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_locations_perf ON locations(capacity DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-091",
    "domain": "hr",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-092",
    "domain": "hr",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-093",
    "domain": "hr",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-094",
    "domain": "hr",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-095",
    "domain": "hr",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-096",
    "domain": "hr",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-097",
    "domain": "hr",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-098",
    "domain": "hr",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-099",
    "domain": "hr",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Total Rewards & Comp",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Total Rewards & Comp)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
    "id": "hr-L1-100",
    "domain": "hr",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering attendance_logs by hours_worked > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, hours_worked FROM attendance_logs WHERE hours_worked > 50;",
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
