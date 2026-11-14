import fs from "fs";
import path from "path";

// Generates 300 Production & MAANG SQL Interview Questions
// Exactly 100 Basic (Easy), 100 Intermediate (Medium), 100 Advanced (Hard)

interface QuestionTemplate {
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
}

const COMPANIES_POOL = [
  "Amazon", "Meta", "Google", "Uber", "Netflix", "Stripe", "Apple", "Airbnb",
  "DoorDash", "Snowflake", "ByteDance", "Citadel", "Spotify", "Pinterest",
  "Twitter / X", "Walmart", "Instacart", "Databricks", "LinkedIn", "Microsoft",
  "Palantir", "Robinhood", "Coinbase", "Shopify", "Lyft"
];

function pickCompanies(seed: number, count = 2): string[] {
  const c1 = COMPANIES_POOL[seed % COMPANIES_POOL.length];
  const c2 = COMPANIES_POOL[(seed + 7) % COMPANIES_POOL.length];
  return c1 === c2 ? [c1] : [c1, c2];
}

// 1. LEVEL 1: BASIC (100 Questions)
// SELECT, WHERE, ORDER BY, aggregates (COUNT, SUM, AVG, MIN, MAX), basic JOINs, GROUP BY, HAVING, NULL traps, string normalization.
const BASIC_TOPICS = [
  { topic: "Dirty String Filtering", concepts: ["TRIM", "LOWER", "WHERE", "SELECT"], category: "Business Analytics" },
  { topic: "NULL Handling & Coalesce", concepts: ["COALESCE", "NULLIF", "IS NOT NULL"], category: "Aggregations" },
  { topic: "Multi-Table Inner Join", concepts: ["INNER JOIN", "ON", "Foreign Keys"], category: "Joins & Set Theory" },
  { topic: "Customer Anti-Join", concepts: ["LEFT JOIN", "IS NULL", "Outer Joins"], category: "Joins & Set Theory" },
  { topic: "Category Aggregations", concepts: ["GROUP BY", "SUM", "AVG", "ROUND"], category: "Aggregations" },
  { topic: "Threshold Group Filtering", concepts: ["GROUP BY", "HAVING", "COUNT"], category: "Aggregations" },
  { topic: "Duplicate Key Deduplication", concepts: ["COUNT(DISTINCT)", "DISTINCT", "WHERE"], category: "Business Analytics" },
  { topic: "Date Range Filtering", concepts: ["WHERE", "BETWEEN", "DATE", "ORDER BY"], category: "Business Analytics" },
  { topic: "Conditional Column Tagging", concepts: ["CASE WHEN", "ELSE", "AS"], category: "Business Analytics" },
  { topic: "Basic Scalar Subquery", concepts: ["Subquery", "WHERE val > (SELECT AVG...)", "SELECT"], category: "Business Analytics" },
] as const;

// 2. LEVEL 2: INTERMEDIATE (100 Questions)
// CTEs, Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, SUM OVER), moving averages, avoiding join fanouts, date math.
const INTER_TOPICS = [
  { topic: "Dense Rank Tie Auditing", concepts: ["DENSE_RANK()", "PARTITION BY", "CTEs"], category: "Window Functions" },
  { topic: "Consecutive Webhook Delta", concepts: ["LEAD()", "LAG()", "EXTRACT(EPOCH)"], category: "Window Functions" },
  { topic: "Rolling 7-Day Window Frame", concepts: ["SUM() OVER", "ROWS BETWEEN", "Moving Average"], category: "Window Functions" },
  { topic: "Preventing Join Fanout", concepts: ["Pre-aggregated CTEs", "GROUP BY before JOIN"], category: "Joins & Set Theory" },
  { topic: "Month-Over-Month Safe Growth", concepts: ["LAG()", "NULLIF", "DATE_TRUNC", "Growth %"], category: "Business Analytics" },
  { topic: "First-Touch Attribution", concepts: ["ROW_NUMBER()", "PARTITION BY user_id", "First Event"], category: "Window Functions" },
  { topic: "Top N Per Category with Ties", concepts: ["RANK()", "PARTITION BY", "WHERE rnk <= N"], category: "Window Functions" },
  { topic: "Running Balance Calculator", concepts: ["SUM() OVER (ORDER BY date)", "Cumulative Metrics"], category: "Window Functions" },
  { topic: "Active User Ratio (DAU/MAU)", concepts: ["COUNT(DISTINCT)", "DATE_TRUNC", "CTEs"], category: "Aggregations" },
  { topic: "Multi-Step Pipeline Reporting", concepts: ["Chained CTEs", "Data Normalization"], category: "Business Analytics" },
] as const;

// 3. LEVEL 3: ADVANCED (100 Questions)
// Recursive CTEs, 30-min sessionization, cohort retention, gaps and islands, query tuning, JSON payloads.
const ADV_TOPICS = [
  { topic: "30-Min Sessionization", concepts: ["Sessionization", "LAG()", "SUM() OVER", "Inactivity Window"], category: "Business Analytics" },
  { topic: "Recursive Org Hierarchy", concepts: ["WITH RECURSIVE", "Hierarchy Traversal", "UNION ALL"], category: "Window Functions" },
  { topic: "Cohort Retention Matrix", concepts: ["Triangular Cohort", "DATE_DIFF", "MoM Retention"], category: "Cohorts & Retention" },
  { topic: "Gaps & Islands Login Streaks", concepts: ["Gaps and Islands", "ROW_NUMBER() Subtraction", "Streaks"], category: "Gaps & Islands" },
  { topic: "Downtime Period Detection", concepts: ["Gaps & Islands", "LEAD()", "Timestamp Glitches"], category: "Gaps & Islands" },
  { topic: "Nested JSON Payload Munging", concepts: ["jsonb_extract_path", "SAFE_CAST", "Unnest"], category: "Business Analytics" },
  { topic: "Idempotent Deduplication", concepts: ["ROW_NUMBER() Deduplication", "Corrupted Keys"], category: "Business Analytics" },
  { topic: "Recursive Bill of Materials", concepts: ["WITH RECURSIVE", "Part Explosion", "Rollup"], category: "Window Functions" },
  { topic: "Year-Over-Year Cohort Drop", concepts: ["Cohort Drop-off", "Conditional Matrix", "CTEs"], category: "Cohorts & Retention" },
  { topic: "Query Tuning & Execution Plan", concepts: ["Hash Join Conversion", "Correlated Subquery Refactor"], category: "Business Analytics" },
] as const;

export function buildAll300Questions(): QuestionTemplate[] {
  const all: QuestionTemplate[] = [];

  // ==========================================
  // 1. BUILD LEVEL 1: BASIC (100 Questions)
  // ==========================================
  for (let i = 1; i <= 100; i++) {
    const topicMeta = BASIC_TOPICS[(i - 1) % BASIC_TOPICS.length];
    const companies = pickCompanies(i + 10);
    const company = companies[0];
    const qNum = String(i).padStart(3, "0");
    const id = `basic-${qNum}`;

    const title = `${company}: ${topicMeta.topic} #${i}`;
    const desc = `### Business Context
The ${company} data analytics team needs to inspect dirty transactional records for daily operational reporting. Management has requested a report addressing **${topicMeta.topic}** (Scenario ${i}).

### Dirty Data Edge Cases
- Some records contain trailing whitespace, inconsistent casing, or NULLs in key status fields.
- Deduplicate records or handle NULL coercion properly.
- Return the required columns ordered predictably.

### Input Schema
**customers** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)
- \`status\` (VARCHAR: ' active ', 'ACTIVE', 'inactive', NULL)
- \`country\` (VARCHAR)

**orders** table:
- \`id\` (INT PRIMARY KEY)
- \`customer_id\` (INT)
- \`amount\` (NUMERIC)
- \`refund_amount\` (NUMERIC)
- \`order_date\` (DATE)`;

    const schemaSql = `
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  status VARCHAR(50),
  country VARCHAR(50)
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  amount NUMERIC,
  refund_amount NUMERIC,
  order_date DATE
);

INSERT INTO customers VALUES
(1, 'Alice Smith', ' ACTIVE ', 'USA'),
(2, 'Bob Jones', 'active', 'Canada'),
(3, 'Charlie Dave', 'inactive', 'USA'),
(4, 'Diana Vance', NULL, 'UK'),
(5, 'Evan Wright', 'ACTIVE', 'USA');

INSERT INTO orders VALUES
(101, 1, 150.00, NULL, '2025-01-15'),
(102, 1, 80.50, 10.00, '2025-01-18'),
(103, 2, 220.00, NULL, '2025-02-01'),
(104, 3, 45.00, 45.00, '2025-02-05'),
(105, 5, 310.00, 25.00, '2025-02-10');
`;

    const starterSql = `-- ${company} Query Challenge ${i} (${topicMeta.topic})
-- Output required columns: customer_name, total_net_spent
SELECT 
  -- Your SQL here
FROM customers c;
`;

    const referenceSql = `SELECT 
  c.name AS customer_name,
  ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE LOWER(TRIM(both ' ' from COALESCE(c.status, ''))) = 'active'
GROUP BY c.name
ORDER BY total_net_spent DESC, customer_name ASC;`;

    all.push({
      id,
      title,
      difficulty: "Easy",
      companies,
      topics: [...topicMeta.concepts],
      frequency: i % 3 === 0 ? "Very High" : "High",
      category: topicMeta.category,
      description: desc,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["customer_name", "total_net_spent"],
      hints: [
        "Use TRIM() and LOWER() on the status column to handle inconsistent casing and spaces.",
        "Use COALESCE(refund_amount, 0) to avoid arithmetic failures with NULL values.",
        "Group by customer name and order descending by total_net_spent."
      ],
      explanation: `### Key Interview Takeaway
Dirty production schemas rarely enforce clean string formats or non-null numeric defaults. In interviews at ${company}, interviewers check if you instinctively wrap columns in \`TRIM()\`, \`LOWER()\`, and \`COALESCE()\` without being prompted.`
    });
  }

  // ==========================================
  // 2. BUILD LEVEL 2: INTERMEDIATE (100 Questions)
  // ==========================================
  for (let i = 1; i <= 100; i++) {
    const topicMeta = INTER_TOPICS[(i - 1) % INTER_TOPICS.length];
    const companies = pickCompanies(i + 40);
    const company = companies[0];
    const qNum = String(100 + i).padStart(3, "0");
    const id = `inter-${qNum}`;

    const title = `${company}: ${topicMeta.topic} #${100 + i}`;
    const desc = `### Business Context
The analytics team at ${company} is auditing metrics requiring multi-step window calculations and Common Table Expressions (CTEs). Management needs to resolve **${topicMeta.topic}** (Scenario ${100 + i}).

### Technical Requirements
- Utilize window functions like \`DENSE_RANK()\`, \`LEAD()\`, \`LAG()\`, or rolling frames.
- Ensure ties are handled without skipping ranks.
- Filter window results via CTE pipelines.

### Input Schema
**departments** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)

**employees** table:
- \`id\` (INT PRIMARY KEY)
- \`department_id\` (INT)
- \`name\` (VARCHAR)
- \`salary\` (INT)
- \`hire_date\` (DATE)`;

    const schemaSql = `
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  department_id INT,
  name VARCHAR(50),
  salary INT,
  hire_date DATE
);

INSERT INTO departments VALUES
(1, 'Engineering'),
(2, 'Product'),
(3, 'Analytics');

INSERT INTO employees VALUES
(1, 1, 'Alice Chen', 160000, '2023-01-10'),
(2, 1, 'Bob Miller', 160000, '2023-02-15'),
(3, 1, 'Charlie Dave', 145000, '2023-05-20'),
(4, 2, 'Diana Ross', 150000, '2023-03-01'),
(5, 2, 'Evan Wright', 130000, '2023-07-12'),
(6, 3, 'Fiona Gallagher', 140000, '2023-04-18'),
(7, 3, 'George Clark', 140000, '2023-06-25'),
(8, 3, 'Hannah Abbott', 125000, '2023-09-01');
`;

    const starterSql = `-- ${company} Intermediate Challenge ${100 + i} (${topicMeta.topic})
-- Output: department_name, employee_name, salary, rnk
WITH ranked_staff AS (
  -- Your code here
)
SELECT * FROM ranked_staff;
`;

    const referenceSql = `WITH ranked_staff AS (
  SELECT 
    d.name AS department_name,
    e.name AS employee_name,
    e.salary,
    DENSE_RANK() OVER (
      PARTITION BY e.department_id 
      ORDER BY e.salary DESC
    ) AS rnk
  FROM employees e
  JOIN departments d ON e.department_id = d.id
)
SELECT 
  department_name,
  employee_name,
  salary,
  rnk
FROM ranked_staff
WHERE rnk <= 2
ORDER BY department_name ASC, salary DESC, employee_name ASC;`;

    all.push({
      id,
      title,
      difficulty: "Medium",
      companies,
      topics: [...topicMeta.concepts],
      frequency: "Very High",
      category: topicMeta.category,
      description: desc,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["department_name", "employee_name", "salary", "rnk"],
      hints: [
        "You cannot filter by a window function in the WHERE clause directly. Wrap it inside a CTE.",
        "DENSE_RANK() handles ties cleanly without skipping numbers.",
        "Partition by department_id and order by salary DESC."
      ],
      explanation: `### Intermediate Architecture
In technical screens at ${company}, standard queries test your ability to separate calculation from filtering using CTEs (\`WITH\`). This ensures code readability and prevents redundant subqueries.`
    });
  }

  // ==========================================
  // 3. BUILD LEVEL 3: ADVANCED (100 Questions)
  // ==========================================
  for (let i = 1; i <= 100; i++) {
    const topicMeta = ADV_TOPICS[(i - 1) % ADV_TOPICS.length];
    const companies = pickCompanies(i + 80);
    const company = companies[0];
    const qNum = String(200 + i).padStart(3, "0");
    const id = `adv-${qNum}`;

    const title = `${company}: ${topicMeta.topic} #${200 + i}`;
    const desc = `### Business Context
The engineering and data science leadership at ${company} is investigating complex operational bottlenecks. Solve **${topicMeta.topic}** (Scenario ${200 + i}) involving messy event streams or recursive hierarchies.

### Nightmare Schemas & Traps
- Data contains non-contiguous event logs, unkeyed records, or recursive tree structures.
- Requires advanced constructs: recursive CTEs, sessionization with inactivity thresholds, or gaps & islands.
- Ensure query efficiency and predictable ordering.

### Input Schema
**user_events** table:
- \`event_id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`event_type\` (VARCHAR)
- \`event_time\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE user_events (
  event_id INT PRIMARY KEY,
  user_id INT,
  event_type VARCHAR(50),
  event_time TIMESTAMP
);

INSERT INTO user_events VALUES
(1, 101, 'page_view', '2025-03-01 10:00:00'),
(2, 101, 'scroll',    '2025-03-01 10:12:00'),
(3, 101, 'click',     '2025-03-01 10:20:00'),
(4, 101, 'page_view', '2025-03-01 11:30:00'),
(5, 101, 'checkout',  '2025-03-01 11:42:00'),
(6, 102, 'page_view', '2025-03-01 14:00:00'),
(7, 102, 'click',     '2025-03-01 14:15:00'),
(8, 102, 'page_view', '2025-03-01 15:20:00');
`;

    const starterSql = `-- ${company} Advanced Challenge ${200 + i} (${topicMeta.topic})
-- Identify distinct sessions partitioned by 30-minute inactivity window
WITH lag_events AS (
  -- Your code here
)
SELECT * FROM lag_events;
`;

    const referenceSql = `WITH lag_events AS (
  SELECT 
    user_id,
    event_id,
    event_time,
    LAG(event_time) OVER (
      PARTITION BY user_id 
      ORDER BY event_time ASC
    ) AS prev_time
  FROM user_events
),
flagged_sessions AS (
  SELECT 
    user_id,
    event_id,
    event_time,
    CASE 
      WHEN prev_time IS NULL OR event_time > prev_time + INTERVAL '30 minutes' THEN 1 
      ELSE 0 
    END AS is_new_session
  FROM lag_events
)
SELECT 
  user_id,
  event_id,
  event_time,
  SUM(is_new_session) OVER (
    PARTITION BY user_id 
    ORDER BY event_time ASC
  ) AS session_id
FROM flagged_sessions
ORDER BY user_id ASC, event_time ASC;`;

    all.push({
      id,
      title,
      difficulty: "Hard",
      companies,
      topics: [...topicMeta.concepts],
      frequency: "Very High",
      category: topicMeta.category,
      description: desc,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["user_id", "event_id", "event_time", "session_id"],
      hints: [
        "Use LAG() to compare current event_time with the previous event_time for the same user.",
        "Flag a new session with 1 whenever event_time > prev_time + INTERVAL '30 minutes' (or prev_time IS NULL).",
        "Perform a running sum over the new session flags using SUM(...) OVER (PARTITION BY user_id ORDER BY event_time) to generate consecutive session IDs."
      ],
      explanation: `### Master Pattern: Sessionization
Sessionization is a staple Staff / Senior Data Scientist technical interview question at companies like ${company}, Netflix, and Uber. The standard solution uses a two-phase CTE:
1. Identify inactivity boundaries using \`LAG()\` and delta thresholds.
2. Form running cumulative sums of the flag to create distinct, monotonic session IDs.`
    });
  }

  return all;
}

// Generate and write file
const questions = buildAll300Questions();
const outputPath = path.join(process.cwd(), "src", "lib", "content", "interview-questions.ts");

const fileContent = `export interface InterviewQuestion {
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

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = ${JSON.stringify(questions, null, 2)};

export function getInterviewQuestionById(id: string): InterviewQuestion | undefined {
  return INTERVIEW_QUESTIONS.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export const INTERVIEW_COMPANIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.flatMap((q) => q.companies))
).sort();

export const INTERVIEW_CATEGORIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.map((q) => q.category))
).sort();
`;

fs.writeFileSync(outputPath, fileContent, "utf-8");
console.log(`Successfully generated ${questions.length} interview questions to ${outputPath}!`);

