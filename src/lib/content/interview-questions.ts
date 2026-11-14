export interface InterviewQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  topics: string[];
  frequency: "Very High" | "High" | "Medium";
  category: "Aggregations" | "Window Functions" | "Cohorts & Retention" | "Joins & Set Theory" | "Gaps & Islands" | "Business Analytics";
  description: string;
  schemaSql: string;
  hiddenTestSql?: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hints: string[];
  explanation: string;
  orderSensitive?: boolean;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    "id": "basic-001",
    "title": "Citadel: Dirty String Filtering #1",
    "difficulty": "Easy",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Citadel data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 1).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Citadel Query Challenge 1 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Citadel, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-002",
    "title": "Spotify: NULL Handling & Coalesce #2",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Spotify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 2).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Spotify Query Challenge 2 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Spotify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-003",
    "title": "Pinterest: Multi-Table Inner Join #3",
    "difficulty": "Easy",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Pinterest data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 3).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Pinterest Query Challenge 3 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Pinterest, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-004",
    "title": "Twitter / X: Customer Anti-Join #4",
    "difficulty": "Easy",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Twitter / X data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 4).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Twitter / X Query Challenge 4 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Twitter / X, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-005",
    "title": "Walmart: Category Aggregations #5",
    "difficulty": "Easy",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Walmart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 5).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Walmart Query Challenge 5 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Walmart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-006",
    "title": "Instacart: Threshold Group Filtering #6",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Instacart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 6).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Instacart Query Challenge 6 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Instacart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-007",
    "title": "Databricks: Duplicate Key Deduplication #7",
    "difficulty": "Easy",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Databricks data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 7).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Databricks Query Challenge 7 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Databricks, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-008",
    "title": "LinkedIn: Date Range Filtering #8",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe LinkedIn data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 8).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- LinkedIn Query Challenge 8 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at LinkedIn, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-009",
    "title": "Microsoft: Conditional Column Tagging #9",
    "difficulty": "Easy",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Microsoft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 9).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Microsoft Query Challenge 9 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Microsoft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-010",
    "title": "Palantir: Basic Scalar Subquery #10",
    "difficulty": "Easy",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Palantir data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 10).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Palantir Query Challenge 10 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Palantir, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-011",
    "title": "Robinhood: Dirty String Filtering #11",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Robinhood data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 11).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Robinhood Query Challenge 11 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Robinhood, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-012",
    "title": "Coinbase: NULL Handling & Coalesce #12",
    "difficulty": "Easy",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Coinbase data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 12).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Coinbase Query Challenge 12 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Coinbase, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-013",
    "title": "Shopify: Multi-Table Inner Join #13",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Shopify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 13).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Shopify Query Challenge 13 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Shopify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-014",
    "title": "Lyft: Customer Anti-Join #14",
    "difficulty": "Easy",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Lyft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 14).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Lyft Query Challenge 14 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Lyft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-015",
    "title": "Amazon: Category Aggregations #15",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Amazon data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 15).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Amazon Query Challenge 15 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Amazon, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-016",
    "title": "Meta: Threshold Group Filtering #16",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Meta data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 16).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Meta Query Challenge 16 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Meta, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-017",
    "title": "Google: Duplicate Key Deduplication #17",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Google data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 17).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Google Query Challenge 17 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Google, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-018",
    "title": "Uber: Date Range Filtering #18",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Uber data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 18).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Uber Query Challenge 18 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Uber, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-019",
    "title": "Netflix: Conditional Column Tagging #19",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Netflix data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 19).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Netflix Query Challenge 19 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Netflix, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-020",
    "title": "Stripe: Basic Scalar Subquery #20",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Stripe data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 20).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Stripe Query Challenge 20 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Stripe, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-021",
    "title": "Apple: Dirty String Filtering #21",
    "difficulty": "Easy",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Apple data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 21).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Apple Query Challenge 21 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Apple, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-022",
    "title": "Airbnb: NULL Handling & Coalesce #22",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Airbnb data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 22).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Airbnb Query Challenge 22 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Airbnb, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-023",
    "title": "DoorDash: Multi-Table Inner Join #23",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe DoorDash data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 23).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- DoorDash Query Challenge 23 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at DoorDash, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-024",
    "title": "Snowflake: Customer Anti-Join #24",
    "difficulty": "Easy",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Snowflake data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 24).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Snowflake Query Challenge 24 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Snowflake, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-025",
    "title": "ByteDance: Category Aggregations #25",
    "difficulty": "Easy",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe ByteDance data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 25).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- ByteDance Query Challenge 25 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at ByteDance, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-026",
    "title": "Citadel: Threshold Group Filtering #26",
    "difficulty": "Easy",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Citadel data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 26).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Citadel Query Challenge 26 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Citadel, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-027",
    "title": "Spotify: Duplicate Key Deduplication #27",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Spotify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 27).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Spotify Query Challenge 27 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Spotify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-028",
    "title": "Pinterest: Date Range Filtering #28",
    "difficulty": "Easy",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Pinterest data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 28).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Pinterest Query Challenge 28 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Pinterest, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-029",
    "title": "Twitter / X: Conditional Column Tagging #29",
    "difficulty": "Easy",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Twitter / X data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 29).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Twitter / X Query Challenge 29 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Twitter / X, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-030",
    "title": "Walmart: Basic Scalar Subquery #30",
    "difficulty": "Easy",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Walmart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 30).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Walmart Query Challenge 30 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Walmart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-031",
    "title": "Instacart: Dirty String Filtering #31",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Instacart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 31).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Instacart Query Challenge 31 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Instacart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-032",
    "title": "Databricks: NULL Handling & Coalesce #32",
    "difficulty": "Easy",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Databricks data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 32).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Databricks Query Challenge 32 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Databricks, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-033",
    "title": "LinkedIn: Multi-Table Inner Join #33",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe LinkedIn data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 33).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- LinkedIn Query Challenge 33 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at LinkedIn, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-034",
    "title": "Microsoft: Customer Anti-Join #34",
    "difficulty": "Easy",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Microsoft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 34).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Microsoft Query Challenge 34 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Microsoft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-035",
    "title": "Palantir: Category Aggregations #35",
    "difficulty": "Easy",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Palantir data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 35).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Palantir Query Challenge 35 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Palantir, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-036",
    "title": "Robinhood: Threshold Group Filtering #36",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Robinhood data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 36).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Robinhood Query Challenge 36 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Robinhood, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-037",
    "title": "Coinbase: Duplicate Key Deduplication #37",
    "difficulty": "Easy",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Coinbase data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 37).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Coinbase Query Challenge 37 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Coinbase, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-038",
    "title": "Shopify: Date Range Filtering #38",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Shopify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 38).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Shopify Query Challenge 38 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Shopify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-039",
    "title": "Lyft: Conditional Column Tagging #39",
    "difficulty": "Easy",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Lyft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 39).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Lyft Query Challenge 39 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Lyft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-040",
    "title": "Amazon: Basic Scalar Subquery #40",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Amazon data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 40).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Amazon Query Challenge 40 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Amazon, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-041",
    "title": "Meta: Dirty String Filtering #41",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Meta data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 41).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Meta Query Challenge 41 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Meta, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-042",
    "title": "Google: NULL Handling & Coalesce #42",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Google data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 42).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Google Query Challenge 42 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Google, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-043",
    "title": "Uber: Multi-Table Inner Join #43",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Uber data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 43).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Uber Query Challenge 43 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Uber, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-044",
    "title": "Netflix: Customer Anti-Join #44",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Netflix data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 44).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Netflix Query Challenge 44 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Netflix, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-045",
    "title": "Stripe: Category Aggregations #45",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Stripe data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 45).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Stripe Query Challenge 45 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Stripe, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-046",
    "title": "Apple: Threshold Group Filtering #46",
    "difficulty": "Easy",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Apple data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 46).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Apple Query Challenge 46 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Apple, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-047",
    "title": "Airbnb: Duplicate Key Deduplication #47",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Airbnb data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 47).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Airbnb Query Challenge 47 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Airbnb, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-048",
    "title": "DoorDash: Date Range Filtering #48",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe DoorDash data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 48).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- DoorDash Query Challenge 48 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at DoorDash, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-049",
    "title": "Snowflake: Conditional Column Tagging #49",
    "difficulty": "Easy",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Snowflake data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 49).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Snowflake Query Challenge 49 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Snowflake, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-050",
    "title": "ByteDance: Basic Scalar Subquery #50",
    "difficulty": "Easy",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe ByteDance data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 50).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- ByteDance Query Challenge 50 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at ByteDance, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-051",
    "title": "Citadel: Dirty String Filtering #51",
    "difficulty": "Easy",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Citadel data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 51).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Citadel Query Challenge 51 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Citadel, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-052",
    "title": "Spotify: NULL Handling & Coalesce #52",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Spotify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 52).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Spotify Query Challenge 52 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Spotify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-053",
    "title": "Pinterest: Multi-Table Inner Join #53",
    "difficulty": "Easy",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Pinterest data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 53).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Pinterest Query Challenge 53 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Pinterest, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-054",
    "title": "Twitter / X: Customer Anti-Join #54",
    "difficulty": "Easy",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Twitter / X data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 54).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Twitter / X Query Challenge 54 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Twitter / X, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-055",
    "title": "Walmart: Category Aggregations #55",
    "difficulty": "Easy",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Walmart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 55).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Walmart Query Challenge 55 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Walmart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-056",
    "title": "Instacart: Threshold Group Filtering #56",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Instacart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 56).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Instacart Query Challenge 56 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Instacart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-057",
    "title": "Databricks: Duplicate Key Deduplication #57",
    "difficulty": "Easy",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Databricks data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 57).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Databricks Query Challenge 57 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Databricks, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-058",
    "title": "LinkedIn: Date Range Filtering #58",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe LinkedIn data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 58).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- LinkedIn Query Challenge 58 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at LinkedIn, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-059",
    "title": "Microsoft: Conditional Column Tagging #59",
    "difficulty": "Easy",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Microsoft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 59).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Microsoft Query Challenge 59 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Microsoft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-060",
    "title": "Palantir: Basic Scalar Subquery #60",
    "difficulty": "Easy",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Palantir data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 60).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Palantir Query Challenge 60 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Palantir, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-061",
    "title": "Robinhood: Dirty String Filtering #61",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Robinhood data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 61).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Robinhood Query Challenge 61 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Robinhood, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-062",
    "title": "Coinbase: NULL Handling & Coalesce #62",
    "difficulty": "Easy",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Coinbase data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 62).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Coinbase Query Challenge 62 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Coinbase, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-063",
    "title": "Shopify: Multi-Table Inner Join #63",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Shopify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 63).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Shopify Query Challenge 63 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Shopify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-064",
    "title": "Lyft: Customer Anti-Join #64",
    "difficulty": "Easy",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Lyft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 64).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Lyft Query Challenge 64 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Lyft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-065",
    "title": "Amazon: Category Aggregations #65",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Amazon data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 65).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Amazon Query Challenge 65 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Amazon, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-066",
    "title": "Meta: Threshold Group Filtering #66",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Meta data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 66).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Meta Query Challenge 66 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Meta, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-067",
    "title": "Google: Duplicate Key Deduplication #67",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Google data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 67).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Google Query Challenge 67 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Google, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-068",
    "title": "Uber: Date Range Filtering #68",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Uber data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 68).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Uber Query Challenge 68 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Uber, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-069",
    "title": "Netflix: Conditional Column Tagging #69",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Netflix data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 69).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Netflix Query Challenge 69 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Netflix, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-070",
    "title": "Stripe: Basic Scalar Subquery #70",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Stripe data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 70).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Stripe Query Challenge 70 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Stripe, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-071",
    "title": "Apple: Dirty String Filtering #71",
    "difficulty": "Easy",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Apple data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 71).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Apple Query Challenge 71 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Apple, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-072",
    "title": "Airbnb: NULL Handling & Coalesce #72",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Airbnb data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 72).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Airbnb Query Challenge 72 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Airbnb, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-073",
    "title": "DoorDash: Multi-Table Inner Join #73",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe DoorDash data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 73).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- DoorDash Query Challenge 73 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at DoorDash, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-074",
    "title": "Snowflake: Customer Anti-Join #74",
    "difficulty": "Easy",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Snowflake data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 74).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Snowflake Query Challenge 74 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Snowflake, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-075",
    "title": "ByteDance: Category Aggregations #75",
    "difficulty": "Easy",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe ByteDance data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 75).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- ByteDance Query Challenge 75 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at ByteDance, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-076",
    "title": "Citadel: Threshold Group Filtering #76",
    "difficulty": "Easy",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Citadel data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 76).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Citadel Query Challenge 76 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Citadel, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-077",
    "title": "Spotify: Duplicate Key Deduplication #77",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Spotify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 77).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Spotify Query Challenge 77 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Spotify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-078",
    "title": "Pinterest: Date Range Filtering #78",
    "difficulty": "Easy",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Pinterest data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 78).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Pinterest Query Challenge 78 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Pinterest, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-079",
    "title": "Twitter / X: Conditional Column Tagging #79",
    "difficulty": "Easy",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Twitter / X data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 79).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Twitter / X Query Challenge 79 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Twitter / X, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-080",
    "title": "Walmart: Basic Scalar Subquery #80",
    "difficulty": "Easy",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Walmart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 80).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Walmart Query Challenge 80 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Walmart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-081",
    "title": "Instacart: Dirty String Filtering #81",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Instacart data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 81).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Instacart Query Challenge 81 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Instacart, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-082",
    "title": "Databricks: NULL Handling & Coalesce #82",
    "difficulty": "Easy",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Databricks data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 82).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Databricks Query Challenge 82 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Databricks, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-083",
    "title": "LinkedIn: Multi-Table Inner Join #83",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe LinkedIn data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 83).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- LinkedIn Query Challenge 83 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at LinkedIn, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-084",
    "title": "Microsoft: Customer Anti-Join #84",
    "difficulty": "Easy",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Microsoft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 84).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Microsoft Query Challenge 84 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Microsoft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-085",
    "title": "Palantir: Category Aggregations #85",
    "difficulty": "Easy",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Palantir data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 85).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Palantir Query Challenge 85 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Palantir, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-086",
    "title": "Robinhood: Threshold Group Filtering #86",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Robinhood data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 86).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Robinhood Query Challenge 86 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Robinhood, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-087",
    "title": "Coinbase: Duplicate Key Deduplication #87",
    "difficulty": "Easy",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Coinbase data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 87).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Coinbase Query Challenge 87 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Coinbase, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-088",
    "title": "Shopify: Date Range Filtering #88",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Shopify data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 88).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Shopify Query Challenge 88 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Shopify, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-089",
    "title": "Lyft: Conditional Column Tagging #89",
    "difficulty": "Easy",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Lyft data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 89).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Lyft Query Challenge 89 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Lyft, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-090",
    "title": "Amazon: Basic Scalar Subquery #90",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Amazon data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 90).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Amazon Query Challenge 90 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Amazon, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-091",
    "title": "Meta: Dirty String Filtering #91",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "WHERE",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Meta data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Dirty String Filtering** (Scenario 91).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Meta Query Challenge 91 (Dirty String Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Meta, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-092",
    "title": "Google: NULL Handling & Coalesce #92",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "COALESCE",
      "NULLIF",
      "IS NOT NULL"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Google data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **NULL Handling & Coalesce** (Scenario 92).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Google Query Challenge 92 (NULL Handling & Coalesce)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Google, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-093",
    "title": "Uber: Multi-Table Inner Join #93",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "INNER JOIN",
      "ON",
      "Foreign Keys"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Uber data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Multi-Table Inner Join** (Scenario 93).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Uber Query Challenge 93 (Multi-Table Inner Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Uber, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-094",
    "title": "Netflix: Customer Anti-Join #94",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "LEFT JOIN",
      "IS NULL",
      "Outer Joins"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe Netflix data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Customer Anti-Join** (Scenario 94).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Netflix Query Challenge 94 (Customer Anti-Join)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Netflix, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-095",
    "title": "Stripe: Category Aggregations #95",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Stripe data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Category Aggregations** (Scenario 95).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Stripe Query Challenge 95 (Category Aggregations)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Stripe, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-096",
    "title": "Apple: Threshold Group Filtering #96",
    "difficulty": "Easy",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe Apple data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Threshold Group Filtering** (Scenario 96).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Apple Query Challenge 96 (Threshold Group Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Apple, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-097",
    "title": "Airbnb: Duplicate Key Deduplication #97",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DISTINCT",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Airbnb data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Duplicate Key Deduplication** (Scenario 97).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Airbnb Query Challenge 97 (Duplicate Key Deduplication)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Airbnb, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-098",
    "title": "DoorDash: Date Range Filtering #98",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "WHERE",
      "BETWEEN",
      "DATE",
      "ORDER BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe DoorDash data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Date Range Filtering** (Scenario 98).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- DoorDash Query Challenge 98 (Date Range Filtering)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at DoorDash, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-099",
    "title": "Snowflake: Conditional Column Tagging #99",
    "difficulty": "Easy",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "CASE WHEN",
      "ELSE",
      "AS"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe Snowflake data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Conditional Column Tagging** (Scenario 99).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- Snowflake Query Challenge 99 (Conditional Column Tagging)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at Snowflake, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "basic-100",
    "title": "ByteDance: Basic Scalar Subquery #100",
    "difficulty": "Easy",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Subquery",
      "WHERE val > (SELECT AVG...)",
      "SELECT"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe ByteDance data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **Basic Scalar Subquery** (Scenario 100).\n\n### Dirty Data Edge Cases\n- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.\n- Deduplicate records or handle NULL coercion properly.\n- Return the required columns ordered predictably.\n\n### Input Schema\n**customers** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n- `status` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)\n- `country` (VARCHAR)\n\n**orders** table:\n- `id` (INT PRIMARY KEY)\n- `customer_id` (INT)\n- `amount` (NUMERIC)\n- `refund_amount` (NUMERIC)\n- `order_date` (DATE)",
    "schemaSql": "\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  status VARCHAR(50),\n  country VARCHAR(50)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT,\n  amount NUMERIC,\n  refund_amount NUMERIC,\n  order_date DATE\n);\n\nINSERT INTO customers VALUES\n(1, 'Alice Smith', ' ACTIVE ', 'USA'),\n(2, 'Bob Jones', 'active', 'Canada'),\n(3, 'Charlie Dave', 'inactive', 'USA'),\n(4, 'Diana Vance', NULL, 'UK'),\n(5, 'Evan Wright', 'ACTIVE', 'USA');\n\nINSERT INTO orders VALUES\n(101, 1, 150.00, NULL, '2025-01-15'),\n(102, 1, 80.50, 10.00, '2025-01-18'),\n(103, 2, 220.00, NULL, '2025-02-01'),\n(104, 3, 45.00, 45.00, '2025-02-05'),\n(105, 5, 310.00, 25.00, '2025-02-10');\n",
    "starterSql": "-- ByteDance Query Challenge 100 (Basic Scalar Subquery)\n-- Output required columns: customer_name, total_net_spent\nSELECT \n  -- Your SQL here\nFROM customers c;\n",
    "referenceSql": "SELECT \n  c.name AS customer_name,\n  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'\nGROUP BY c.name\nORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
      "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
      "Group by customer name and order descending by total_net_spent."
    ],
    "explanation": "### Key Interview Takeaway\nDirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at ByteDance, interviewers check if you instinctively wrap columns in `TRIM()`, `LOWER()`, and `COALESCE()` without being prompted."
  },
  {
    "id": "inter-101",
    "title": "Instacart: Dense Rank Tie Auditing #101",
    "difficulty": "Medium",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Instacart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 101).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Instacart Intermediate Challenge 101 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Instacart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-102",
    "title": "Databricks: Consecutive Webhook Delta #102",
    "difficulty": "Medium",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Databricks is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 102).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Databricks Intermediate Challenge 102 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Databricks, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-103",
    "title": "LinkedIn: Rolling 7-Day Window Frame #103",
    "difficulty": "Medium",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at LinkedIn is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 103).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- LinkedIn Intermediate Challenge 103 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at LinkedIn, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-104",
    "title": "Microsoft: Preventing Join Fanout #104",
    "difficulty": "Medium",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Microsoft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 104).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Microsoft Intermediate Challenge 104 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Microsoft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-105",
    "title": "Palantir: Month-Over-Month Safe Growth #105",
    "difficulty": "Medium",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Palantir is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 105).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Palantir Intermediate Challenge 105 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Palantir, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-106",
    "title": "Robinhood: First-Touch Attribution #106",
    "difficulty": "Medium",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Robinhood is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 106).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Robinhood Intermediate Challenge 106 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Robinhood, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-107",
    "title": "Coinbase: Top N Per Category with Ties #107",
    "difficulty": "Medium",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Coinbase is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 107).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Coinbase Intermediate Challenge 107 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Coinbase, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-108",
    "title": "Shopify: Running Balance Calculator #108",
    "difficulty": "Medium",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Shopify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 108).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Shopify Intermediate Challenge 108 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Shopify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-109",
    "title": "Lyft: Active User Ratio (DAU/MAU) #109",
    "difficulty": "Medium",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Lyft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 109).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Lyft Intermediate Challenge 109 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Lyft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-110",
    "title": "Amazon: Multi-Step Pipeline Reporting #110",
    "difficulty": "Medium",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Amazon is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 110).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Amazon Intermediate Challenge 110 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Amazon, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-111",
    "title": "Meta: Dense Rank Tie Auditing #111",
    "difficulty": "Medium",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Meta is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 111).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Meta Intermediate Challenge 111 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Meta, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-112",
    "title": "Google: Consecutive Webhook Delta #112",
    "difficulty": "Medium",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Google is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 112).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Google Intermediate Challenge 112 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Google, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-113",
    "title": "Uber: Rolling 7-Day Window Frame #113",
    "difficulty": "Medium",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Uber is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 113).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Uber Intermediate Challenge 113 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Uber, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-114",
    "title": "Netflix: Preventing Join Fanout #114",
    "difficulty": "Medium",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Netflix is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 114).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Netflix Intermediate Challenge 114 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Netflix, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-115",
    "title": "Stripe: Month-Over-Month Safe Growth #115",
    "difficulty": "Medium",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Stripe is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 115).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Stripe Intermediate Challenge 115 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Stripe, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-116",
    "title": "Apple: First-Touch Attribution #116",
    "difficulty": "Medium",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Apple is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 116).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Apple Intermediate Challenge 116 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Apple, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-117",
    "title": "Airbnb: Top N Per Category with Ties #117",
    "difficulty": "Medium",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Airbnb is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 117).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Airbnb Intermediate Challenge 117 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Airbnb, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-118",
    "title": "DoorDash: Running Balance Calculator #118",
    "difficulty": "Medium",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at DoorDash is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 118).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- DoorDash Intermediate Challenge 118 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at DoorDash, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-119",
    "title": "Snowflake: Active User Ratio (DAU/MAU) #119",
    "difficulty": "Medium",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Snowflake is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 119).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Snowflake Intermediate Challenge 119 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Snowflake, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-120",
    "title": "ByteDance: Multi-Step Pipeline Reporting #120",
    "difficulty": "Medium",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at ByteDance is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 120).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- ByteDance Intermediate Challenge 120 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at ByteDance, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-121",
    "title": "Citadel: Dense Rank Tie Auditing #121",
    "difficulty": "Medium",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Citadel is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 121).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Citadel Intermediate Challenge 121 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Citadel, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-122",
    "title": "Spotify: Consecutive Webhook Delta #122",
    "difficulty": "Medium",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Spotify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 122).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Spotify Intermediate Challenge 122 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Spotify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-123",
    "title": "Pinterest: Rolling 7-Day Window Frame #123",
    "difficulty": "Medium",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Pinterest is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 123).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Pinterest Intermediate Challenge 123 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Pinterest, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-124",
    "title": "Twitter / X: Preventing Join Fanout #124",
    "difficulty": "Medium",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Twitter / X is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 124).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Twitter / X Intermediate Challenge 124 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Twitter / X, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-125",
    "title": "Walmart: Month-Over-Month Safe Growth #125",
    "difficulty": "Medium",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Walmart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 125).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Walmart Intermediate Challenge 125 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Walmart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-126",
    "title": "Instacart: First-Touch Attribution #126",
    "difficulty": "Medium",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Instacart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 126).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Instacart Intermediate Challenge 126 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Instacart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-127",
    "title": "Databricks: Top N Per Category with Ties #127",
    "difficulty": "Medium",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Databricks is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 127).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Databricks Intermediate Challenge 127 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Databricks, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-128",
    "title": "LinkedIn: Running Balance Calculator #128",
    "difficulty": "Medium",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at LinkedIn is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 128).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- LinkedIn Intermediate Challenge 128 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at LinkedIn, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-129",
    "title": "Microsoft: Active User Ratio (DAU/MAU) #129",
    "difficulty": "Medium",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Microsoft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 129).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Microsoft Intermediate Challenge 129 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Microsoft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-130",
    "title": "Palantir: Multi-Step Pipeline Reporting #130",
    "difficulty": "Medium",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Palantir is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 130).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Palantir Intermediate Challenge 130 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Palantir, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-131",
    "title": "Robinhood: Dense Rank Tie Auditing #131",
    "difficulty": "Medium",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Robinhood is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 131).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Robinhood Intermediate Challenge 131 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Robinhood, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-132",
    "title": "Coinbase: Consecutive Webhook Delta #132",
    "difficulty": "Medium",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Coinbase is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 132).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Coinbase Intermediate Challenge 132 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Coinbase, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-133",
    "title": "Shopify: Rolling 7-Day Window Frame #133",
    "difficulty": "Medium",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Shopify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 133).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Shopify Intermediate Challenge 133 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Shopify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-134",
    "title": "Lyft: Preventing Join Fanout #134",
    "difficulty": "Medium",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Lyft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 134).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Lyft Intermediate Challenge 134 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Lyft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-135",
    "title": "Amazon: Month-Over-Month Safe Growth #135",
    "difficulty": "Medium",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Amazon is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 135).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Amazon Intermediate Challenge 135 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Amazon, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-136",
    "title": "Meta: First-Touch Attribution #136",
    "difficulty": "Medium",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Meta is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 136).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Meta Intermediate Challenge 136 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Meta, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-137",
    "title": "Google: Top N Per Category with Ties #137",
    "difficulty": "Medium",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Google is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 137).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Google Intermediate Challenge 137 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Google, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-138",
    "title": "Uber: Running Balance Calculator #138",
    "difficulty": "Medium",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Uber is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 138).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Uber Intermediate Challenge 138 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Uber, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-139",
    "title": "Netflix: Active User Ratio (DAU/MAU) #139",
    "difficulty": "Medium",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Netflix is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 139).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Netflix Intermediate Challenge 139 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Netflix, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-140",
    "title": "Stripe: Multi-Step Pipeline Reporting #140",
    "difficulty": "Medium",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Stripe is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 140).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Stripe Intermediate Challenge 140 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Stripe, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-141",
    "title": "Apple: Dense Rank Tie Auditing #141",
    "difficulty": "Medium",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Apple is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 141).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Apple Intermediate Challenge 141 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Apple, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-142",
    "title": "Airbnb: Consecutive Webhook Delta #142",
    "difficulty": "Medium",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Airbnb is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 142).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Airbnb Intermediate Challenge 142 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Airbnb, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-143",
    "title": "DoorDash: Rolling 7-Day Window Frame #143",
    "difficulty": "Medium",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at DoorDash is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 143).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- DoorDash Intermediate Challenge 143 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at DoorDash, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-144",
    "title": "Snowflake: Preventing Join Fanout #144",
    "difficulty": "Medium",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Snowflake is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 144).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Snowflake Intermediate Challenge 144 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Snowflake, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-145",
    "title": "ByteDance: Month-Over-Month Safe Growth #145",
    "difficulty": "Medium",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at ByteDance is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 145).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- ByteDance Intermediate Challenge 145 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at ByteDance, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-146",
    "title": "Citadel: First-Touch Attribution #146",
    "difficulty": "Medium",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Citadel is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 146).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Citadel Intermediate Challenge 146 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Citadel, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-147",
    "title": "Spotify: Top N Per Category with Ties #147",
    "difficulty": "Medium",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Spotify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 147).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Spotify Intermediate Challenge 147 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Spotify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-148",
    "title": "Pinterest: Running Balance Calculator #148",
    "difficulty": "Medium",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Pinterest is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 148).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Pinterest Intermediate Challenge 148 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Pinterest, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-149",
    "title": "Twitter / X: Active User Ratio (DAU/MAU) #149",
    "difficulty": "Medium",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Twitter / X is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 149).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Twitter / X Intermediate Challenge 149 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Twitter / X, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-150",
    "title": "Walmart: Multi-Step Pipeline Reporting #150",
    "difficulty": "Medium",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Walmart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 150).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Walmart Intermediate Challenge 150 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Walmart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-151",
    "title": "Instacart: Dense Rank Tie Auditing #151",
    "difficulty": "Medium",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Instacart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 151).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Instacart Intermediate Challenge 151 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Instacart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-152",
    "title": "Databricks: Consecutive Webhook Delta #152",
    "difficulty": "Medium",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Databricks is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 152).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Databricks Intermediate Challenge 152 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Databricks, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-153",
    "title": "LinkedIn: Rolling 7-Day Window Frame #153",
    "difficulty": "Medium",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at LinkedIn is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 153).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- LinkedIn Intermediate Challenge 153 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at LinkedIn, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-154",
    "title": "Microsoft: Preventing Join Fanout #154",
    "difficulty": "Medium",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Microsoft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 154).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Microsoft Intermediate Challenge 154 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Microsoft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-155",
    "title": "Palantir: Month-Over-Month Safe Growth #155",
    "difficulty": "Medium",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Palantir is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 155).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Palantir Intermediate Challenge 155 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Palantir, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-156",
    "title": "Robinhood: First-Touch Attribution #156",
    "difficulty": "Medium",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Robinhood is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 156).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Robinhood Intermediate Challenge 156 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Robinhood, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-157",
    "title": "Coinbase: Top N Per Category with Ties #157",
    "difficulty": "Medium",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Coinbase is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 157).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Coinbase Intermediate Challenge 157 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Coinbase, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-158",
    "title": "Shopify: Running Balance Calculator #158",
    "difficulty": "Medium",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Shopify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 158).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Shopify Intermediate Challenge 158 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Shopify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-159",
    "title": "Lyft: Active User Ratio (DAU/MAU) #159",
    "difficulty": "Medium",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Lyft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 159).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Lyft Intermediate Challenge 159 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Lyft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-160",
    "title": "Amazon: Multi-Step Pipeline Reporting #160",
    "difficulty": "Medium",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Amazon is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 160).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Amazon Intermediate Challenge 160 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Amazon, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-161",
    "title": "Meta: Dense Rank Tie Auditing #161",
    "difficulty": "Medium",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Meta is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 161).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Meta Intermediate Challenge 161 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Meta, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-162",
    "title": "Google: Consecutive Webhook Delta #162",
    "difficulty": "Medium",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Google is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 162).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Google Intermediate Challenge 162 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Google, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-163",
    "title": "Uber: Rolling 7-Day Window Frame #163",
    "difficulty": "Medium",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Uber is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 163).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Uber Intermediate Challenge 163 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Uber, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-164",
    "title": "Netflix: Preventing Join Fanout #164",
    "difficulty": "Medium",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Netflix is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 164).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Netflix Intermediate Challenge 164 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Netflix, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-165",
    "title": "Stripe: Month-Over-Month Safe Growth #165",
    "difficulty": "Medium",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Stripe is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 165).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Stripe Intermediate Challenge 165 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Stripe, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-166",
    "title": "Apple: First-Touch Attribution #166",
    "difficulty": "Medium",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Apple is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 166).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Apple Intermediate Challenge 166 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Apple, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-167",
    "title": "Airbnb: Top N Per Category with Ties #167",
    "difficulty": "Medium",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Airbnb is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 167).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Airbnb Intermediate Challenge 167 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Airbnb, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-168",
    "title": "DoorDash: Running Balance Calculator #168",
    "difficulty": "Medium",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at DoorDash is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 168).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- DoorDash Intermediate Challenge 168 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at DoorDash, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-169",
    "title": "Snowflake: Active User Ratio (DAU/MAU) #169",
    "difficulty": "Medium",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Snowflake is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 169).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Snowflake Intermediate Challenge 169 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Snowflake, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-170",
    "title": "ByteDance: Multi-Step Pipeline Reporting #170",
    "difficulty": "Medium",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at ByteDance is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 170).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- ByteDance Intermediate Challenge 170 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at ByteDance, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-171",
    "title": "Citadel: Dense Rank Tie Auditing #171",
    "difficulty": "Medium",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Citadel is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 171).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Citadel Intermediate Challenge 171 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Citadel, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-172",
    "title": "Spotify: Consecutive Webhook Delta #172",
    "difficulty": "Medium",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Spotify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 172).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Spotify Intermediate Challenge 172 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Spotify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-173",
    "title": "Pinterest: Rolling 7-Day Window Frame #173",
    "difficulty": "Medium",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Pinterest is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 173).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Pinterest Intermediate Challenge 173 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Pinterest, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-174",
    "title": "Twitter / X: Preventing Join Fanout #174",
    "difficulty": "Medium",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Twitter / X is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 174).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Twitter / X Intermediate Challenge 174 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Twitter / X, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-175",
    "title": "Walmart: Month-Over-Month Safe Growth #175",
    "difficulty": "Medium",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Walmart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 175).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Walmart Intermediate Challenge 175 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Walmart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-176",
    "title": "Instacart: First-Touch Attribution #176",
    "difficulty": "Medium",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Instacart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 176).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Instacart Intermediate Challenge 176 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Instacart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-177",
    "title": "Databricks: Top N Per Category with Ties #177",
    "difficulty": "Medium",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Databricks is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 177).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Databricks Intermediate Challenge 177 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Databricks, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-178",
    "title": "LinkedIn: Running Balance Calculator #178",
    "difficulty": "Medium",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at LinkedIn is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 178).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- LinkedIn Intermediate Challenge 178 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at LinkedIn, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-179",
    "title": "Microsoft: Active User Ratio (DAU/MAU) #179",
    "difficulty": "Medium",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Microsoft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 179).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Microsoft Intermediate Challenge 179 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Microsoft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-180",
    "title": "Palantir: Multi-Step Pipeline Reporting #180",
    "difficulty": "Medium",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Palantir is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 180).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Palantir Intermediate Challenge 180 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Palantir, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-181",
    "title": "Robinhood: Dense Rank Tie Auditing #181",
    "difficulty": "Medium",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Robinhood is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 181).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Robinhood Intermediate Challenge 181 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Robinhood, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-182",
    "title": "Coinbase: Consecutive Webhook Delta #182",
    "difficulty": "Medium",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Coinbase is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 182).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Coinbase Intermediate Challenge 182 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Coinbase, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-183",
    "title": "Shopify: Rolling 7-Day Window Frame #183",
    "difficulty": "Medium",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Shopify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 183).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Shopify Intermediate Challenge 183 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Shopify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-184",
    "title": "Lyft: Preventing Join Fanout #184",
    "difficulty": "Medium",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Lyft is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 184).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Lyft Intermediate Challenge 184 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Lyft, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-185",
    "title": "Amazon: Month-Over-Month Safe Growth #185",
    "difficulty": "Medium",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Amazon is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 185).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Amazon Intermediate Challenge 185 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Amazon, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-186",
    "title": "Meta: First-Touch Attribution #186",
    "difficulty": "Medium",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Meta is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 186).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Meta Intermediate Challenge 186 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Meta, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-187",
    "title": "Google: Top N Per Category with Ties #187",
    "difficulty": "Medium",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Google is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 187).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Google Intermediate Challenge 187 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Google, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-188",
    "title": "Uber: Running Balance Calculator #188",
    "difficulty": "Medium",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Uber is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 188).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Uber Intermediate Challenge 188 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Uber, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-189",
    "title": "Netflix: Active User Ratio (DAU/MAU) #189",
    "difficulty": "Medium",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Netflix is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 189).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Netflix Intermediate Challenge 189 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Netflix, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-190",
    "title": "Stripe: Multi-Step Pipeline Reporting #190",
    "difficulty": "Medium",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Stripe is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 190).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Stripe Intermediate Challenge 190 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Stripe, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-191",
    "title": "Apple: Dense Rank Tie Auditing #191",
    "difficulty": "Medium",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "DENSE_RANK()",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Apple is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Dense Rank Tie Auditing** (Scenario 191).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Apple Intermediate Challenge 191 (Dense Rank Tie Auditing)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Apple, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-192",
    "title": "Airbnb: Consecutive Webhook Delta #192",
    "difficulty": "Medium",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "LEAD()",
      "LAG()",
      "EXTRACT(EPOCH)"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Airbnb is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Consecutive Webhook Delta** (Scenario 192).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Airbnb Intermediate Challenge 192 (Consecutive Webhook Delta)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Airbnb, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-193",
    "title": "DoorDash: Rolling 7-Day Window Frame #193",
    "difficulty": "Medium",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "SUM() OVER",
      "ROWS BETWEEN",
      "Moving Average"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at DoorDash is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Rolling 7-Day Window Frame** (Scenario 193).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- DoorDash Intermediate Challenge 193 (Rolling 7-Day Window Frame)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at DoorDash, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-194",
    "title": "Snowflake: Preventing Join Fanout #194",
    "difficulty": "Medium",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Pre-aggregated CTEs",
      "GROUP BY before JOIN"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "description": "### Business Context\nThe analytics team at Snowflake is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Preventing Join Fanout** (Scenario 194).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Snowflake Intermediate Challenge 194 (Preventing Join Fanout)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Snowflake, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-195",
    "title": "ByteDance: Month-Over-Month Safe Growth #195",
    "difficulty": "Medium",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "LAG()",
      "NULLIF",
      "DATE_TRUNC",
      "Growth %"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at ByteDance is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Month-Over-Month Safe Growth** (Scenario 195).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- ByteDance Intermediate Challenge 195 (Month-Over-Month Safe Growth)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at ByteDance, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-196",
    "title": "Citadel: First-Touch Attribution #196",
    "difficulty": "Medium",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "ROW_NUMBER()",
      "PARTITION BY user_id",
      "First Event"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Citadel is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **First-Touch Attribution** (Scenario 196).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Citadel Intermediate Challenge 196 (First-Touch Attribution)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Citadel, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-197",
    "title": "Spotify: Top N Per Category with Ties #197",
    "difficulty": "Medium",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "RANK()",
      "PARTITION BY",
      "WHERE rnk <= N"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Spotify is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Top N Per Category with Ties** (Scenario 197).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Spotify Intermediate Challenge 197 (Top N Per Category with Ties)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Spotify, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-198",
    "title": "Pinterest: Running Balance Calculator #198",
    "difficulty": "Medium",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "SUM() OVER (ORDER BY date)",
      "Cumulative Metrics"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe analytics team at Pinterest is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Running Balance Calculator** (Scenario 198).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Pinterest Intermediate Challenge 198 (Running Balance Calculator)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Pinterest, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-199",
    "title": "Twitter / X: Active User Ratio (DAU/MAU) #199",
    "difficulty": "Medium",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "COUNT(DISTINCT)",
      "DATE_TRUNC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "description": "### Business Context\nThe analytics team at Twitter / X is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Active User Ratio (DAU/MAU)** (Scenario 199).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Twitter / X Intermediate Challenge 199 (Active User Ratio (DAU/MAU))\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Twitter / X, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "inter-200",
    "title": "Walmart: Multi-Step Pipeline Reporting #200",
    "difficulty": "Medium",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Chained CTEs",
      "Data Normalization"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe analytics team at Walmart is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **Multi-Step Pipeline Reporting** (Scenario 200).\n\n### Technical Requirements\n- Utilize window functions like `DENSE_RANK()`, `LEAD()`, `LAG()`, or rolling frames.\n- Ensure ties are handled without skipping ranks.\n- Filter window results via CTE pipelines.\n\n### Input Schema\n**departments** table:\n- `id` (INT PRIMARY KEY)\n- `name` (VARCHAR)\n\n**employees** table:\n- `id` (INT PRIMARY KEY)\n- `department_id` (INT)\n- `name` (VARCHAR)\n- `salary` (INT)\n- `hire_date` (DATE)",
    "schemaSql": "\nCREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  department_id INT,\n  name VARCHAR(50),\n  salary INT,\n  hire_date DATE\n);\n\nINSERT INTO departments VALUES\n(1, 'Engineering'),\n(2, 'Product'),\n(3, 'Analytics');\n\nINSERT INTO employees VALUES\n(1, 1, 'Alice Chen', 160000, '2023-01-10'),\n(2, 1, 'Bob Miller', 160000, '2023-02-15'),\n(3, 1, 'Charlie Dave', 145000, '2023-05-20'),\n(4, 2, 'Diana Ross', 150000, '2023-03-01'),\n(5, 2, 'Evan Wright', 130000, '2023-07-12'),\n(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),\n(7, 3, 'George Clark', 140000, '2023-06-25'),\n(8, 3, 'Hannah Abbott', 125000, '2023-09-01');\n",
    "starterSql": "-- Walmart Intermediate Challenge 200 (Multi-Step Pipeline Reporting)\n-- Output: department_name, employee_name, salary, rnk\nWITH ranked_staff AS (\n  -- Your code here\n)\nSELECT * FROM ranked_staff;\n",
    "referenceSql": "WITH ranked_staff AS (\n  SELECT \n    d.name AS department_name,\n    e.name AS employee_name,\n    e.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id \n      ORDER BY e.salary DESC\n    ) AS rnk\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT \n  department_name,\n  employee_name,\n  salary,\n  rnk\nFROM ranked_staff\nWHERE rnk <= 2\nORDER BY department_name ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "department_name",
      "employee_name",
      "salary",
      "rnk"
    ],
    "hints": [
      "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
      "DENSE_RANK() handles ties cleanly without skipping numbers.",
      "Partition by department_id and order by salary DESC."
    ],
    "explanation": "### Intermediate Architecture\nIn technical screens at Walmart, standard queries test your ability to separate calculation from filtering using CTEs (`WITH`). This ensures code readability and prevents redundant subqueries."
  },
  {
    "id": "adv-201",
    "title": "Apple: 30-Min Sessionization #201",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Apple is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 201) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Apple Advanced Challenge 201 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Apple, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-202",
    "title": "Airbnb: Recursive Org Hierarchy #202",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Airbnb is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 202) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Airbnb Advanced Challenge 202 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Airbnb, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-203",
    "title": "DoorDash: Cohort Retention Matrix #203",
    "difficulty": "Hard",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at DoorDash is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 203) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- DoorDash Advanced Challenge 203 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like DoorDash, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-204",
    "title": "Snowflake: Gaps & Islands Login Streaks #204",
    "difficulty": "Hard",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Snowflake is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 204) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Snowflake Advanced Challenge 204 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Snowflake, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-205",
    "title": "ByteDance: Downtime Period Detection #205",
    "difficulty": "Hard",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at ByteDance is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 205) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- ByteDance Advanced Challenge 205 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like ByteDance, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-206",
    "title": "Citadel: Nested JSON Payload Munging #206",
    "difficulty": "Hard",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Citadel is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 206) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Citadel Advanced Challenge 206 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Citadel, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-207",
    "title": "Spotify: Idempotent Deduplication #207",
    "difficulty": "Hard",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Spotify is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 207) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Spotify Advanced Challenge 207 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Spotify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-208",
    "title": "Pinterest: Recursive Bill of Materials #208",
    "difficulty": "Hard",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Pinterest is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 208) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Pinterest Advanced Challenge 208 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Pinterest, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-209",
    "title": "Twitter / X: Year-Over-Year Cohort Drop #209",
    "difficulty": "Hard",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Twitter / X is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 209) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Twitter / X Advanced Challenge 209 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Twitter / X, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-210",
    "title": "Walmart: Query Tuning & Execution Plan #210",
    "difficulty": "Hard",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Walmart is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 210) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Walmart Advanced Challenge 210 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Walmart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-211",
    "title": "Instacart: 30-Min Sessionization #211",
    "difficulty": "Hard",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Instacart is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 211) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Instacart Advanced Challenge 211 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Instacart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-212",
    "title": "Databricks: Recursive Org Hierarchy #212",
    "difficulty": "Hard",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Databricks is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 212) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Databricks Advanced Challenge 212 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Databricks, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-213",
    "title": "LinkedIn: Cohort Retention Matrix #213",
    "difficulty": "Hard",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at LinkedIn is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 213) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- LinkedIn Advanced Challenge 213 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like LinkedIn, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-214",
    "title": "Microsoft: Gaps & Islands Login Streaks #214",
    "difficulty": "Hard",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Microsoft is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 214) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Microsoft Advanced Challenge 214 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Microsoft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-215",
    "title": "Palantir: Downtime Period Detection #215",
    "difficulty": "Hard",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Palantir is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 215) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Palantir Advanced Challenge 215 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Palantir, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-216",
    "title": "Robinhood: Nested JSON Payload Munging #216",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Robinhood is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 216) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Robinhood Advanced Challenge 216 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Robinhood, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-217",
    "title": "Coinbase: Idempotent Deduplication #217",
    "difficulty": "Hard",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Coinbase is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 217) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Coinbase Advanced Challenge 217 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Coinbase, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-218",
    "title": "Shopify: Recursive Bill of Materials #218",
    "difficulty": "Hard",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Shopify is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 218) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Shopify Advanced Challenge 218 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Shopify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-219",
    "title": "Lyft: Year-Over-Year Cohort Drop #219",
    "difficulty": "Hard",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Lyft is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 219) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Lyft Advanced Challenge 219 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Lyft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-220",
    "title": "Amazon: Query Tuning & Execution Plan #220",
    "difficulty": "Hard",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Amazon is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 220) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Amazon Advanced Challenge 220 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Amazon, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-221",
    "title": "Meta: 30-Min Sessionization #221",
    "difficulty": "Hard",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Meta is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 221) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Meta Advanced Challenge 221 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Meta, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-222",
    "title": "Google: Recursive Org Hierarchy #222",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Google is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 222) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Google Advanced Challenge 222 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Google, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-223",
    "title": "Uber: Cohort Retention Matrix #223",
    "difficulty": "Hard",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Uber is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 223) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Uber Advanced Challenge 223 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Uber, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-224",
    "title": "Netflix: Gaps & Islands Login Streaks #224",
    "difficulty": "Hard",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Netflix is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 224) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Netflix Advanced Challenge 224 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Netflix, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-225",
    "title": "Stripe: Downtime Period Detection #225",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Stripe is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 225) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Stripe Advanced Challenge 225 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Stripe, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-226",
    "title": "Apple: Nested JSON Payload Munging #226",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Apple is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 226) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Apple Advanced Challenge 226 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Apple, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-227",
    "title": "Airbnb: Idempotent Deduplication #227",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Airbnb is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 227) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Airbnb Advanced Challenge 227 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Airbnb, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-228",
    "title": "DoorDash: Recursive Bill of Materials #228",
    "difficulty": "Hard",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at DoorDash is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 228) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- DoorDash Advanced Challenge 228 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like DoorDash, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-229",
    "title": "Snowflake: Year-Over-Year Cohort Drop #229",
    "difficulty": "Hard",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Snowflake is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 229) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Snowflake Advanced Challenge 229 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Snowflake, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-230",
    "title": "ByteDance: Query Tuning & Execution Plan #230",
    "difficulty": "Hard",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at ByteDance is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 230) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- ByteDance Advanced Challenge 230 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like ByteDance, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-231",
    "title": "Citadel: 30-Min Sessionization #231",
    "difficulty": "Hard",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Citadel is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 231) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Citadel Advanced Challenge 231 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Citadel, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-232",
    "title": "Spotify: Recursive Org Hierarchy #232",
    "difficulty": "Hard",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Spotify is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 232) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Spotify Advanced Challenge 232 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Spotify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-233",
    "title": "Pinterest: Cohort Retention Matrix #233",
    "difficulty": "Hard",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Pinterest is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 233) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Pinterest Advanced Challenge 233 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Pinterest, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-234",
    "title": "Twitter / X: Gaps & Islands Login Streaks #234",
    "difficulty": "Hard",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Twitter / X is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 234) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Twitter / X Advanced Challenge 234 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Twitter / X, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-235",
    "title": "Walmart: Downtime Period Detection #235",
    "difficulty": "Hard",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Walmart is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 235) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Walmart Advanced Challenge 235 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Walmart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-236",
    "title": "Instacart: Nested JSON Payload Munging #236",
    "difficulty": "Hard",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Instacart is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 236) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Instacart Advanced Challenge 236 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Instacart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-237",
    "title": "Databricks: Idempotent Deduplication #237",
    "difficulty": "Hard",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Databricks is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 237) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Databricks Advanced Challenge 237 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Databricks, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-238",
    "title": "LinkedIn: Recursive Bill of Materials #238",
    "difficulty": "Hard",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at LinkedIn is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 238) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- LinkedIn Advanced Challenge 238 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like LinkedIn, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-239",
    "title": "Microsoft: Year-Over-Year Cohort Drop #239",
    "difficulty": "Hard",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Microsoft is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 239) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Microsoft Advanced Challenge 239 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Microsoft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-240",
    "title": "Palantir: Query Tuning & Execution Plan #240",
    "difficulty": "Hard",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Palantir is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 240) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Palantir Advanced Challenge 240 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Palantir, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-241",
    "title": "Robinhood: 30-Min Sessionization #241",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Robinhood is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 241) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Robinhood Advanced Challenge 241 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Robinhood, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-242",
    "title": "Coinbase: Recursive Org Hierarchy #242",
    "difficulty": "Hard",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Coinbase is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 242) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Coinbase Advanced Challenge 242 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Coinbase, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-243",
    "title": "Shopify: Cohort Retention Matrix #243",
    "difficulty": "Hard",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Shopify is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 243) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Shopify Advanced Challenge 243 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Shopify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-244",
    "title": "Lyft: Gaps & Islands Login Streaks #244",
    "difficulty": "Hard",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Lyft is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 244) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Lyft Advanced Challenge 244 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Lyft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-245",
    "title": "Amazon: Downtime Period Detection #245",
    "difficulty": "Hard",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Amazon is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 245) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Amazon Advanced Challenge 245 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Amazon, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-246",
    "title": "Meta: Nested JSON Payload Munging #246",
    "difficulty": "Hard",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Meta is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 246) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Meta Advanced Challenge 246 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Meta, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-247",
    "title": "Google: Idempotent Deduplication #247",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Google is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 247) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Google Advanced Challenge 247 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Google, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-248",
    "title": "Uber: Recursive Bill of Materials #248",
    "difficulty": "Hard",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Uber is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 248) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Uber Advanced Challenge 248 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Uber, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-249",
    "title": "Netflix: Year-Over-Year Cohort Drop #249",
    "difficulty": "Hard",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Netflix is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 249) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Netflix Advanced Challenge 249 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Netflix, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-250",
    "title": "Stripe: Query Tuning & Execution Plan #250",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Stripe is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 250) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Stripe Advanced Challenge 250 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Stripe, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-251",
    "title": "Apple: 30-Min Sessionization #251",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Apple is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 251) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Apple Advanced Challenge 251 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Apple, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-252",
    "title": "Airbnb: Recursive Org Hierarchy #252",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Airbnb is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 252) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Airbnb Advanced Challenge 252 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Airbnb, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-253",
    "title": "DoorDash: Cohort Retention Matrix #253",
    "difficulty": "Hard",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at DoorDash is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 253) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- DoorDash Advanced Challenge 253 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like DoorDash, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-254",
    "title": "Snowflake: Gaps & Islands Login Streaks #254",
    "difficulty": "Hard",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Snowflake is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 254) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Snowflake Advanced Challenge 254 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Snowflake, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-255",
    "title": "ByteDance: Downtime Period Detection #255",
    "difficulty": "Hard",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at ByteDance is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 255) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- ByteDance Advanced Challenge 255 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like ByteDance, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-256",
    "title": "Citadel: Nested JSON Payload Munging #256",
    "difficulty": "Hard",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Citadel is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 256) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Citadel Advanced Challenge 256 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Citadel, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-257",
    "title": "Spotify: Idempotent Deduplication #257",
    "difficulty": "Hard",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Spotify is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 257) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Spotify Advanced Challenge 257 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Spotify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-258",
    "title": "Pinterest: Recursive Bill of Materials #258",
    "difficulty": "Hard",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Pinterest is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 258) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Pinterest Advanced Challenge 258 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Pinterest, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-259",
    "title": "Twitter / X: Year-Over-Year Cohort Drop #259",
    "difficulty": "Hard",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Twitter / X is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 259) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Twitter / X Advanced Challenge 259 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Twitter / X, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-260",
    "title": "Walmart: Query Tuning & Execution Plan #260",
    "difficulty": "Hard",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Walmart is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 260) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Walmart Advanced Challenge 260 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Walmart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-261",
    "title": "Instacart: 30-Min Sessionization #261",
    "difficulty": "Hard",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Instacart is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 261) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Instacart Advanced Challenge 261 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Instacart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-262",
    "title": "Databricks: Recursive Org Hierarchy #262",
    "difficulty": "Hard",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Databricks is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 262) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Databricks Advanced Challenge 262 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Databricks, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-263",
    "title": "LinkedIn: Cohort Retention Matrix #263",
    "difficulty": "Hard",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at LinkedIn is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 263) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- LinkedIn Advanced Challenge 263 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like LinkedIn, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-264",
    "title": "Microsoft: Gaps & Islands Login Streaks #264",
    "difficulty": "Hard",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Microsoft is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 264) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Microsoft Advanced Challenge 264 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Microsoft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-265",
    "title": "Palantir: Downtime Period Detection #265",
    "difficulty": "Hard",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Palantir is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 265) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Palantir Advanced Challenge 265 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Palantir, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-266",
    "title": "Robinhood: Nested JSON Payload Munging #266",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Robinhood is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 266) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Robinhood Advanced Challenge 266 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Robinhood, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-267",
    "title": "Coinbase: Idempotent Deduplication #267",
    "difficulty": "Hard",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Coinbase is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 267) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Coinbase Advanced Challenge 267 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Coinbase, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-268",
    "title": "Shopify: Recursive Bill of Materials #268",
    "difficulty": "Hard",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Shopify is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 268) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Shopify Advanced Challenge 268 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Shopify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-269",
    "title": "Lyft: Year-Over-Year Cohort Drop #269",
    "difficulty": "Hard",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Lyft is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 269) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Lyft Advanced Challenge 269 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Lyft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-270",
    "title": "Amazon: Query Tuning & Execution Plan #270",
    "difficulty": "Hard",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Amazon is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 270) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Amazon Advanced Challenge 270 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Amazon, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-271",
    "title": "Meta: 30-Min Sessionization #271",
    "difficulty": "Hard",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Meta is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 271) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Meta Advanced Challenge 271 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Meta, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-272",
    "title": "Google: Recursive Org Hierarchy #272",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Google is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 272) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Google Advanced Challenge 272 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Google, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-273",
    "title": "Uber: Cohort Retention Matrix #273",
    "difficulty": "Hard",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Uber is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 273) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Uber Advanced Challenge 273 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Uber, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-274",
    "title": "Netflix: Gaps & Islands Login Streaks #274",
    "difficulty": "Hard",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Netflix is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 274) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Netflix Advanced Challenge 274 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Netflix, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-275",
    "title": "Stripe: Downtime Period Detection #275",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Stripe is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 275) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Stripe Advanced Challenge 275 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Stripe, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-276",
    "title": "Apple: Nested JSON Payload Munging #276",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Pinterest"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Apple is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 276) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Apple Advanced Challenge 276 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Apple, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-277",
    "title": "Airbnb: Idempotent Deduplication #277",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "Twitter / X"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Airbnb is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 277) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Airbnb Advanced Challenge 277 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Airbnb, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-278",
    "title": "DoorDash: Recursive Bill of Materials #278",
    "difficulty": "Hard",
    "companies": [
      "DoorDash",
      "Walmart"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at DoorDash is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 278) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- DoorDash Advanced Challenge 278 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like DoorDash, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-279",
    "title": "Snowflake: Year-Over-Year Cohort Drop #279",
    "difficulty": "Hard",
    "companies": [
      "Snowflake",
      "Instacart"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Snowflake is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 279) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Snowflake Advanced Challenge 279 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Snowflake, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-280",
    "title": "ByteDance: Query Tuning & Execution Plan #280",
    "difficulty": "Hard",
    "companies": [
      "ByteDance",
      "Databricks"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at ByteDance is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 280) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- ByteDance Advanced Challenge 280 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like ByteDance, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-281",
    "title": "Citadel: 30-Min Sessionization #281",
    "difficulty": "Hard",
    "companies": [
      "Citadel",
      "LinkedIn"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Citadel is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 281) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Citadel Advanced Challenge 281 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Citadel, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-282",
    "title": "Spotify: Recursive Org Hierarchy #282",
    "difficulty": "Hard",
    "companies": [
      "Spotify",
      "Microsoft"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Spotify is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 282) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Spotify Advanced Challenge 282 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Spotify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-283",
    "title": "Pinterest: Cohort Retention Matrix #283",
    "difficulty": "Hard",
    "companies": [
      "Pinterest",
      "Palantir"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Pinterest is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 283) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Pinterest Advanced Challenge 283 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Pinterest, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-284",
    "title": "Twitter / X: Gaps & Islands Login Streaks #284",
    "difficulty": "Hard",
    "companies": [
      "Twitter / X",
      "Robinhood"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Twitter / X is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 284) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Twitter / X Advanced Challenge 284 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Twitter / X, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-285",
    "title": "Walmart: Downtime Period Detection #285",
    "difficulty": "Hard",
    "companies": [
      "Walmart",
      "Coinbase"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Walmart is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 285) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Walmart Advanced Challenge 285 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Walmart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-286",
    "title": "Instacart: Nested JSON Payload Munging #286",
    "difficulty": "Hard",
    "companies": [
      "Instacart",
      "Shopify"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Instacart is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 286) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Instacart Advanced Challenge 286 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Instacart, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-287",
    "title": "Databricks: Idempotent Deduplication #287",
    "difficulty": "Hard",
    "companies": [
      "Databricks",
      "Lyft"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Databricks is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 287) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Databricks Advanced Challenge 287 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Databricks, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-288",
    "title": "LinkedIn: Recursive Bill of Materials #288",
    "difficulty": "Hard",
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at LinkedIn is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 288) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- LinkedIn Advanced Challenge 288 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like LinkedIn, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-289",
    "title": "Microsoft: Year-Over-Year Cohort Drop #289",
    "difficulty": "Hard",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Microsoft is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 289) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Microsoft Advanced Challenge 289 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Microsoft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-290",
    "title": "Palantir: Query Tuning & Execution Plan #290",
    "difficulty": "Hard",
    "companies": [
      "Palantir",
      "Google"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Palantir is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 290) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Palantir Advanced Challenge 290 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Palantir, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-291",
    "title": "Robinhood: 30-Min Sessionization #291",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Uber"
    ],
    "topics": [
      "Sessionization",
      "LAG()",
      "SUM() OVER",
      "Inactivity Window"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Robinhood is investigating complex operational bottlenecks. Solve **30-Min Sessionization** (Scenario 291) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Robinhood Advanced Challenge 291 (30-Min Sessionization)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Robinhood, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-292",
    "title": "Coinbase: Recursive Org Hierarchy #292",
    "difficulty": "Hard",
    "companies": [
      "Coinbase",
      "Netflix"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy Traversal",
      "UNION ALL"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Coinbase is investigating complex operational bottlenecks. Solve **Recursive Org Hierarchy** (Scenario 292) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Coinbase Advanced Challenge 292 (Recursive Org Hierarchy)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Coinbase, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-293",
    "title": "Shopify: Cohort Retention Matrix #293",
    "difficulty": "Hard",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "Triangular Cohort",
      "DATE_DIFF",
      "MoM Retention"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Shopify is investigating complex operational bottlenecks. Solve **Cohort Retention Matrix** (Scenario 293) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Shopify Advanced Challenge 293 (Cohort Retention Matrix)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Shopify, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-294",
    "title": "Lyft: Gaps & Islands Login Streaks #294",
    "difficulty": "Hard",
    "companies": [
      "Lyft",
      "Apple"
    ],
    "topics": [
      "Gaps and Islands",
      "ROW_NUMBER() Subtraction",
      "Streaks"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Lyft is investigating complex operational bottlenecks. Solve **Gaps & Islands Login Streaks** (Scenario 294) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Lyft Advanced Challenge 294 (Gaps & Islands Login Streaks)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Lyft, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-295",
    "title": "Amazon: Downtime Period Detection #295",
    "difficulty": "Hard",
    "companies": [
      "Amazon",
      "Airbnb"
    ],
    "topics": [
      "Gaps & Islands",
      "LEAD()",
      "Timestamp Glitches"
    ],
    "frequency": "Very High",
    "category": "Gaps & Islands",
    "description": "### Business Context\nThe engineering and data science leadership at Amazon is investigating complex operational bottlenecks. Solve **Downtime Period Detection** (Scenario 295) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Amazon Advanced Challenge 295 (Downtime Period Detection)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Amazon, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-296",
    "title": "Meta: Nested JSON Payload Munging #296",
    "difficulty": "Hard",
    "companies": [
      "Meta",
      "DoorDash"
    ],
    "topics": [
      "jsonb_extract_path",
      "SAFE_CAST",
      "Unnest"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Meta is investigating complex operational bottlenecks. Solve **Nested JSON Payload Munging** (Scenario 296) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Meta Advanced Challenge 296 (Nested JSON Payload Munging)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Meta, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-297",
    "title": "Google: Idempotent Deduplication #297",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Snowflake"
    ],
    "topics": [
      "ROW_NUMBER() Deduplication",
      "Corrupted Keys"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Google is investigating complex operational bottlenecks. Solve **Idempotent Deduplication** (Scenario 297) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Google Advanced Challenge 297 (Idempotent Deduplication)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Google, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-298",
    "title": "Uber: Recursive Bill of Materials #298",
    "difficulty": "Hard",
    "companies": [
      "Uber",
      "ByteDance"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Part Explosion",
      "Rollup"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "description": "### Business Context\nThe engineering and data science leadership at Uber is investigating complex operational bottlenecks. Solve **Recursive Bill of Materials** (Scenario 298) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Uber Advanced Challenge 298 (Recursive Bill of Materials)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Uber, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-299",
    "title": "Netflix: Year-Over-Year Cohort Drop #299",
    "difficulty": "Hard",
    "companies": [
      "Netflix",
      "Citadel"
    ],
    "topics": [
      "Cohort Drop-off",
      "Conditional Matrix",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Cohorts & Retention",
    "description": "### Business Context\nThe engineering and data science leadership at Netflix is investigating complex operational bottlenecks. Solve **Year-Over-Year Cohort Drop** (Scenario 299) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Netflix Advanced Challenge 299 (Year-Over-Year Cohort Drop)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Netflix, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  },
  {
    "id": "adv-300",
    "title": "Stripe: Query Tuning & Execution Plan #300",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "Spotify"
    ],
    "topics": [
      "Hash Join Conversion",
      "Correlated Subquery Refactor"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "description": "### Business Context\nThe engineering and data science leadership at Stripe is investigating complex operational bottlenecks. Solve **Query Tuning & Execution Plan** (Scenario 300) involving messy event streams or recursive hierarchies.\n\n### Nightmare Schemas & Traps\n- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.\n- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.\n- Ensure query efficiency and predictable ordering.\n\n### Input Schema\n**user_events** table:\n- `event_id` (INT PRIMARY KEY)\n- `user_id` (INT)\n- `event_type` (VARCHAR)\n- `event_time` (TIMESTAMP)",
    "schemaSql": "\nCREATE TABLE user_events (\n  event_id INT PRIMARY KEY,\n  user_id INT,\n  event_type VARCHAR(50),\n  event_time TIMESTAMP\n);\n\nINSERT INTO user_events VALUES\n(1, 101, 'page_view', '2025-03-01 10:00:00'),\n(2, 101, 'scroll',    '2025-03-01 10:12:00'),\n(3, 101, 'click',     '2025-03-01 10:20:00'),\n(4, 101, 'page_view', '2025-03-01 11:30:00'),\n(5, 101, 'checkout',  '2025-03-01 11:42:00'),\n(6, 102, 'page_view', '2025-03-01 14:00:00'),\n(7, 102, 'click',     '2025-03-01 14:15:00'),\n(8, 102, 'page_view', '2025-03-01 15:20:00');\n",
    "starterSql": "-- Stripe Advanced Challenge 300 (Query Tuning & Execution Plan)\n-- Identify distinct sessions partitioned by 30-minute inactivity window\nWITH lag_events AS (\n  -- Your code here\n)\nSELECT * FROM lag_events;\n",
    "referenceSql": "WITH lag_events AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    LAG(event_time) OVER (\n      PARTITION BY user_id \n      ORDER BY event_time ASC\n    ) AS prev_time\n  FROM user_events\n),\nflagged_sessions AS (\n  SELECT \n    user_id,\n    event_id,\n    event_time,\n    CASE \n      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 \n      ELSE 0 \n    END AS is_new_session\n  FROM lag_events\n)\nSELECT \n  user_id,\n  event_id,\n  event_time,\n  SUM(is_new_session) OVER (\n    PARTITION BY user_id \n    ORDER BY event_time ASC\n  ) AS session_id\nFROM flagged_sessions\nORDER BY user_id ASC, event_time ASC;",
    "expectedColumns": [
      "user_id",
      "event_id",
      "event_time",
      "session_id"
    ],
    "hints": [
      "Use LAG() to compare current event_time with the previous event_time for the same user.",
      "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
      "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
    ],
    "explanation": "### Master Pattern: Sessionization\nSessionization is a staple Staff / Senior Data Scientist technical interview question at companies like Stripe, Netflix, and Uber. The standard solution uses a two-phase CTE:\n1. Identify inactivity boundaries using `LAG()` and delta thresholds.\n2. Form running cumulative sums of the flag to create distinct, monotonic session IDs."
  }
];

export function getInterviewQuestionById(id: string): InterviewQuestion | undefined {
  return INTERVIEW_QUESTIONS.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export const INTERVIEW_COMPANIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.flatMap((q) => q.companies))
).sort();

export const INTERVIEW_CATEGORIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.map((q) => q.category))
).sort();
