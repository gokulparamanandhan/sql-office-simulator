import { QuestionDefinition } from "./ecom-l1-questions";

export const FIN_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "fin-L1-001",
    "domain": "finance",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-002",
    "domain": "finance",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-003",
    "domain": "finance",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-004",
    "domain": "finance",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-005",
    "domain": "finance",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-006",
    "domain": "finance",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-007",
    "domain": "finance",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Data Cleansing: Whitespace Normalization with TRIM and UPPER",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Quality Ticket: In branches, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(branch_name)) AS cleaned_name ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, UPPER(TRIM(branch_name)) AS cleaned_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use UPPER(TRIM(branch_name)) AS cleaned_name."
    ],
    "solution_explanation": "Applies TRIM to strip whitespace and UPPER to standardize casing.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-008",
    "domain": "finance",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Null Handling: Default Imputation with COALESCE",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Audit Review: NULL metrics disrupt financial reporting. From accounts, select id, account_type, and COALESCE(balance, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "NULL HANDLING",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "safe_metric"
    ],
    "reference_sql": "SELECT id, account_type, COALESCE(balance, 0.00) AS safe_metric FROM accounts ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use COALESCE(balance, 0.00) AS safe_metric."
    ],
    "solution_explanation": "Substitutes a default numeric value whenever a null occurs.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-009",
    "domain": "finance",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-010",
    "domain": "finance",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Directory Overview: branches Baseline",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Ahead of our quarterly audit, pull our active branches entries showing id and branch_name, sorted ascending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "branch_name"
    ],
    "reference_sql": "SELECT id, branch_name FROM branches ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write a SELECT statement specifying id and branch_name.",
      "Order by id ASC and limit to 20."
    ],
    "solution_explanation": "Retrieves baseline records sorted by primary identifier.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-011",
    "domain": "finance",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-012",
    "domain": "finance",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-013",
    "domain": "finance",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-014",
    "domain": "finance",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-015",
    "domain": "finance",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-016",
    "domain": "finance",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-017",
    "domain": "finance",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-018",
    "domain": "finance",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-019",
    "domain": "finance",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-020",
    "domain": "finance",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: branches and customers",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Compile a relational breakdown connecting branches to customers. Return branch_name and the total count of related entities as related_count, ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT(*)"
    ],
    "expected_columns": [
      "branch_name",
      "related_count"
    ],
    "reference_sql": "SELECT t1.branch_name, COUNT(t2.id) AS related_count FROM branches t1 JOIN customers t2 ON t1.id = t2.id GROUP BY t1.branch_name ORDER BY related_count DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join branches and customers on t1.id = t2.id.",
      "Group by t1.branch_name and order by related_count DESC."
    ],
    "solution_explanation": "Connects two tables via relational key and aggregates related counts.",
    "xp": 15,
    "estimated_minutes": 5
  },
  {
    "id": "fin-L1-021",
    "domain": "finance",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-022",
    "domain": "finance",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-023",
    "domain": "finance",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-024",
    "domain": "finance",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-025",
    "domain": "finance",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-026",
    "domain": "finance",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-027",
    "domain": "finance",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-028",
    "domain": "finance",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-029",
    "domain": "finance",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-030",
    "domain": "finance",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Catalog Integration with UNION ALL",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Executive leadership requested a consolidated registry. Combine the catalog names from branches and customers using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).\"",
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
    "reference_sql": "SELECT branch_name AS catalog_name, 'Primary' AS category_type FROM branches UNION ALL SELECT name AS catalog_name, 'Secondary' AS category_type FROM customers ORDER BY catalog_name ASC LIMIT 25;",
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
    "id": "fin-L1-031",
    "domain": "finance",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-032",
    "domain": "finance",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-033",
    "domain": "finance",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-034",
    "domain": "finance",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-035",
    "domain": "finance",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-036",
    "domain": "finance",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-037",
    "domain": "finance",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-038",
    "domain": "finance",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-039",
    "domain": "finance",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-040",
    "domain": "finance",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Identify high-tier items. Using a Subquery in the WHERE clause, select id, account_type, and balance from accounts where balance is strictly greater than the overall table average. Order descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "SELECT id, account_type, balance FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts) ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE balance > (SELECT AVG(balance) FROM accounts)."
    ],
    "solution_explanation": "Uses an inner scalar subquery to dynamically calculate the filtering threshold.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-041",
    "domain": "finance",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-042",
    "domain": "finance",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-043",
    "domain": "finance",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-044",
    "domain": "finance",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-045",
    "domain": "finance",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-046",
    "domain": "finance",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-047",
    "domain": "finance",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-048",
    "domain": "finance",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-049",
    "domain": "finance",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-050",
    "domain": "finance",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Sequential Delta Analysis with LAG()",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Analyze sequential transactions or events in transactions. Using the LAG() window function, retrieve id, amount, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).\"",
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
    "reference_sql": "SELECT id, amount, LAG(amount) OVER (ORDER BY id ASC) AS prev_amount FROM transactions ORDER BY id ASC LIMIT 20;",
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
    "id": "fin-L1-051",
    "domain": "finance",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-052",
    "domain": "finance",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-053",
    "domain": "finance",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-054",
    "domain": "finance",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-055",
    "domain": "finance",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-056",
    "domain": "finance",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-057",
    "domain": "finance",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-058",
    "domain": "finance",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-059",
    "domain": "finance",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-060",
    "domain": "finance",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Modular Pipeline with WITH (CTE)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, account_type, and balance from accounts where balance > 20. Select all columns from staged_records ordered descending by balance. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "DATA PIPELINE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "WITH staged_records AS (SELECT id, account_type, balance FROM accounts WHERE balance > 20) SELECT id, account_type, balance FROM staged_records ORDER BY balance DESC LIMIT 20;",
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
    "id": "fin-L1-061",
    "domain": "finance",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-062",
    "domain": "finance",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-063",
    "domain": "finance",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-064",
    "domain": "finance",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-065",
    "domain": "finance",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-066",
    "domain": "finance",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-067",
    "domain": "finance",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-068",
    "domain": "finance",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-069",
    "domain": "finance",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-070",
    "domain": "finance",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "ETL Data Cleansing Pipeline with Temporary Table (CTAS)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Data Engineering Ticket: Build a session staging table named temp_accounts_clean to cleanse raw data. Ingest id, UPPER(TRIM(account_type)) AS cleaned_name, and COALESCE(balance, 0.00) AS standardized_amount from accounts where account_type IS NOT NULL. Select all columns from temp_accounts_clean ordered descending by standardized_amount. (Limit to 20 records).\"",
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
    "reference_sql": "CREATE TEMP TABLE temp_accounts_clean AS SELECT id, UPPER(TRIM(account_type)) AS cleaned_name, COALESCE(balance, 0.00) AS standardized_amount FROM accounts WHERE account_type IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_accounts_clean ORDER BY standardized_amount DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_accounts_clean;"
    ],
    "solution_explanation": "Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "fin-L1-071",
    "domain": "finance",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-072",
    "domain": "finance",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-073",
    "domain": "finance",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-074",
    "domain": "finance",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-075",
    "domain": "finance",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-076",
    "domain": "finance",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-077",
    "domain": "finance",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-078",
    "domain": "finance",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-079",
    "domain": "finance",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-080",
    "domain": "finance",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Batch Automation with Stored Procedure",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) that updates balance by adding p_delta. Execute it with CALL sp_adjust_accounts_val(1, 5); then select id, account_type, balance from accounts where id = 1.\"",
    "context_notes": "",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "PL/pgSQL"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_adjust_accounts_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET balance = balance + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_accounts_val(1, 5); SELECT id, account_type, balance FROM accounts WHERE id = 1;",
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
    "id": "fin-L1-081",
    "domain": "finance",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-082",
    "domain": "finance",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-083",
    "domain": "finance",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-084",
    "domain": "finance",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-085",
    "domain": "finance",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-086",
    "domain": "finance",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-087",
    "domain": "finance",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-088",
    "domain": "finance",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-089",
    "domain": "finance",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-090",
    "domain": "finance",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Access Speedup with Database Index",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Production Ticket: Read latency on accounts is increasing. Create an Index named idx_accounts_perf ON accounts(balance DESC). Then retrieve id, account_type, balance for entries where balance > 20 ordered descending. (Limit to 20 records).\"",
    "context_notes": "",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "account_type",
      "balance"
    ],
    "reference_sql": "CREATE INDEX idx_accounts_perf ON accounts(balance DESC); SELECT id, account_type, balance FROM accounts WHERE balance > 20 ORDER BY balance DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Write CREATE INDEX idx_accounts_perf ON accounts(balance DESC); followed by the SELECT query."
    ],
    "solution_explanation": "Constructs a high-performance B-Tree index to eliminate sequential scans.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "fin-L1-091",
    "domain": "finance",
    "level": 1,
    "order": 91,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-092",
    "domain": "finance",
    "level": 1,
    "order": 92,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-093",
    "domain": "finance",
    "level": 1,
    "order": 93,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-094",
    "domain": "finance",
    "level": 1,
    "order": 94,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-095",
    "domain": "finance",
    "level": 1,
    "order": 95,
    "difficulty": "challenging",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-096",
    "domain": "finance",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-097",
    "domain": "finance",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Victor Vance",
      "role": "Head of Risk & Compliance",
      "department": "Risk & AML"
    },
    "request": "From: Victor Vance (Head of Risk & Compliance)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-098",
    "domain": "finance",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "VP of Retail Lending",
      "department": "Lending"
    },
    "request": "From: Elena Rostova (VP of Retail Lending)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-099",
    "domain": "finance",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Arthur Pendleton",
      "role": "Chief Wealth Advisor",
      "department": "Wealth Management"
    },
    "request": "From: Arthur Pendleton (Chief Wealth Advisor)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
    "id": "fin-L1-100",
    "domain": "finance",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Planner Cost Inspection with EXPLAIN (FORMAT JSON)",
    "stakeholder": {
      "name": "Claire Dupont",
      "role": "Treasury & Clearing Director",
      "department": "Treasury"
    },
    "request": "From: Claire Dupont (Treasury & Clearing Director)\n\n\"Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering transactions by amount > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.\"",
    "context_notes": "",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "QUERY PLAN"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, amount FROM transactions WHERE amount > 50;",
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
