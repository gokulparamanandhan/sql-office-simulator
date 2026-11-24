import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S4 = "Stage 4: Multi-Table Joins & Set Ops";
const S5 = "Stage 5: Subqueries (Scalar, IN, EXISTS)";

export function getBasicStages4To5(): InterviewQuestion[] {
  return [
    // ================= STAGE 4: MULTI-TABLE JOINS, ANTI-JOINS, SELF-JOINS & SET OPS (29 - 40) =================
    makeBasicQ({
      number: 29,
      titleBody: "Stripe: High-Risk International Transactions Above $500",
      companies: ["Stripe", "PayPal"],
      topics: ["INNER JOIN", "WHERE", "AND"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Warm-up",
      patternTag: "Two-Table INNER JOIN",
      description: `### Problem Statement
Stripe Risk Engineering audits cross-border transactions. Identify all settled international transactions strictly above $500 along with their merchant name.

### Requirements
- Join \`transactions\` to \`merchants\` on \`merchant_id = m.id\`.
- Filter \`t.amount > 500\`, \`t.is_international = TRUE\`, and \`t.status = 'settled'\`.
- Output columns: \`transaction_id\`, \`merchant_name\`, \`amount\`, \`currency\`.
- Sort by \`amount\` descending, \`transaction_id\` ascending.

### Input Schema
**merchants** (id INT, name VARCHAR)

**transactions** (id INT, merchant_id INT, amount NUMERIC, currency VARCHAR, is_international BOOLEAN, status VARCHAR)`,
      schemaSql: `CREATE TABLE merchants (id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE transactions (id INT PRIMARY KEY, merchant_id INT, amount NUMERIC, currency VARCHAR(10), is_international BOOLEAN, status VARCHAR(20));
INSERT INTO merchants VALUES (1, 'Acme SaaS'), (2, 'Globex Retail'), (3, 'Starlight Media');
INSERT INTO transactions VALUES (101, 1, 750.00, 'USD', TRUE, 'settled'), (102, 1, 450.00, 'EUR', TRUE, 'settled'), (103, 2, 1200.00, 'USD', FALSE, 'settled'), (104, 2, 890.50, 'GBP', TRUE, 'settled'), (105, 3, 620.00, 'USD', TRUE, 'refunded'), (106, 3, 910.00, 'EUR', TRUE, 'settled');`,
      referenceSql: `SELECT t.id AS transaction_id, m.name AS merchant_name, t.amount, t.currency FROM transactions t JOIN merchants m ON t.merchant_id = m.id WHERE t.amount > 500 AND t.is_international = TRUE AND t.status = 'settled' ORDER BY t.amount DESC, transaction_id ASC;`,
      expectedColumns: ["transaction_id", "merchant_name", "amount", "currency"],
      hints: ["Use table aliases t and m to keep column references unambiguous."],
      explanation: "INNER JOIN enriches transactional records with dimension attributes like merchant name.",
    }),
    makeBasicQ({
      number: 30,
      titleBody: "Discord: Active Server Channels with High Traffic (3-Table Join)",
      companies: ["Discord", "Slack"],
      topics: ["INNER JOIN", "Multi-Table Join", "HAVING"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "3-Table Relational Chain",
      description: `### Problem Statement
Discord Community Health monitors channel activity. Find channels inside the \`'Gaming Lounge'\` server that received strictly more than 3 messages.

### Requirements
- Join \`servers\`, \`channels\`, and \`messages\`.
- Filter for \`s.name = 'Gaming Lounge'\`.
- Keep channels with \`COUNT(m.id) > 3\`.
- Output columns: \`channel_name\`, \`message_count\`.
- Sort by \`message_count\` descending, \`channel_name\` ascending.

### Input Schema
**servers** (id INT, name VARCHAR)

**channels** (id INT, server_id INT, name VARCHAR)

**messages** (id INT, channel_id INT, sender_id INT, sent_at TIMESTAMP)`,
      schemaSql: `CREATE TABLE servers (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE channels (id INT PRIMARY KEY, server_id INT, name VARCHAR(50));
CREATE TABLE messages (id INT PRIMARY KEY, channel_id INT, sender_id INT, sent_at TIMESTAMP);
INSERT INTO servers VALUES (1, 'Gaming Lounge'), (2, 'Study Hall');
INSERT INTO channels VALUES (10, 1, 'general'), (11, 1, 'announcements'), (12, 1, 'memes'), (13, 2, 'homework');
INSERT INTO messages VALUES (101, 10, 1, '2025-01-01 10:00:00'), (102, 10, 2, '2025-01-01 10:01:00'), (103, 10, 3, '2025-01-01 10:02:00'), (104, 10, 4, '2025-01-01 10:03:00'), (105, 11, 1, '2025-01-01 09:00:00'), (106, 12, 2, '2025-01-01 11:00:00'), (107, 12, 3, '2025-01-01 11:05:00'), (108, 12, 4, '2025-01-01 11:10:00'), (109, 12, 5, '2025-01-01 11:15:00');`,
      referenceSql: `SELECT c.name AS channel_name, COUNT(m.id) AS message_count FROM servers s JOIN channels c ON s.id = c.server_id JOIN messages m ON c.id = m.channel_id WHERE s.name = 'Gaming Lounge' GROUP BY c.id, c.name HAVING COUNT(m.id) > 3 ORDER BY message_count DESC, channel_name ASC;`,
      expectedColumns: ["channel_name", "message_count"],
      hints: ["Chain servers -> channels -> messages via their foreign keys."],
      explanation: "Chaining JOINs lets you filter by grandparent attributes (server name) while aggregating grandchild events (messages).",
    }),
    makeBasicQ({
      number: 31,
      titleBody: "Shopify: Preserving Zero-Order Customers with LEFT JOIN",
      companies: ["Shopify", "Amazon"],
      topics: ["LEFT JOIN", "COUNT", "COALESCE", "GROUP BY"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Warm-up",
      patternTag: "LEFT JOIN Zero Preservation",
      description: `### Problem Statement
Shopify CRM needs total order count and spend for **every** registered customer—including those who have never placed an order (who should appear with \`0\` orders and \`0.00\` spend).

### Requirements
- Use \`LEFT JOIN\` from \`customers\` to \`orders\`.
- Notice: \`COUNT(o.id)\` returns \`0\` for unmatched rows (unlike \`COUNT(*)\` which would return \`1\`!).
- Wrap \`SUM(o.total_amount)\` in \`COALESCE(..., 0.00)\`.
- Output columns: \`customer_name\`, \`order_count\`, \`total_spent\`.
- Sort by \`total_spent\` descending, \`customer_name\` ascending.

### Input Schema
**customers** (id INT, name VARCHAR)

**orders** (id INT, customer_id INT, total_amount NUMERIC)`,
      schemaSql: `CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, total_amount NUMERIC);
INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Clara');
INSERT INTO orders VALUES (101, 1, 120.00), (102, 1, 80.00), (103, 3, 45.00);`,
      referenceSql: `SELECT c.name AS customer_name, COUNT(o.id) AS order_count, ROUND(COALESCE(SUM(o.total_amount), 0), 2) AS total_spent FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC, customer_name ASC;`,
      expectedColumns: ["customer_name", "order_count", "total_spent"],
      hints: ["Use COUNT(o.id) instead of COUNT(*) so unmatched NULL order rows count as 0."],
      explanation: "Counting a nullable right-side column (COUNT(o.id)) is essential with LEFT JOIN so zero-activity entities show 0 instead of 1.",
    }),
    makeBasicQ({
      number: 32,
      titleBody: "Shopify: Placing Filter Conditions in ON vs WHERE on LEFT JOIN",
      companies: ["Shopify", "Stripe"],
      topics: ["LEFT JOIN", "ON vs WHERE", "COALESCE"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "LEFT JOIN ON-Clause Trap",
      description: `### Problem Statement
Every merchant must appear in the quarterly report with their **2025** settled revenue—even merchants who only had cancelled or 2024 orders (they should show \`0.00\`). Putting \`o.status = 'settled'\` in \`WHERE\` would accidentally turn the \`LEFT JOIN\` into an \`INNER JOIN\`!

### Requirements
- \`LEFT JOIN\` \`merchants\` to \`orders\` with \`o.status = 'settled'\` and \`o.order_date >= '2025-01-01'\` inside the **ON** clause.
- Return \`merchant_name\` and \`settled_2025_revenue\` (rounded to 2 decimals, \`0.00\` if none).
- Sort by \`settled_2025_revenue\` descending, \`merchant_name\` ascending.

### Input Schema
**merchants** (id INT, merchant_name VARCHAR)

**orders** (id INT, merchant_id INT, status VARCHAR, amount NUMERIC, order_date DATE)`,
      schemaSql: `CREATE TABLE merchants (id INT PRIMARY KEY, merchant_name VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, merchant_id INT, status VARCHAR(20), amount NUMERIC, order_date DATE);
INSERT INTO merchants VALUES (1, 'Peak Gear'), (2, 'Urban Brew'), (3, 'Fresh Blooms');
INSERT INTO orders VALUES (101, 1, 'settled', 500.00, '2025-01-10'), (102, 2, 'cancelled', 300.00, '2025-01-12'), (103, 3, 'settled', 200.00, '2024-11-20');`,
      referenceSql: `SELECT m.merchant_name, ROUND(COALESCE(SUM(o.amount), 0), 2) AS settled_2025_revenue FROM merchants m LEFT JOIN orders o ON m.id = o.merchant_id AND o.status = 'settled' AND o.order_date >= '2025-01-01' GROUP BY m.id, m.merchant_name ORDER BY settled_2025_revenue DESC, m.merchant_name ASC;`,
      expectedColumns: ["merchant_name", "settled_2025_revenue"],
      hints: ["Put right-table filters (o.status, o.order_date) in the ON clause rather than WHERE."],
      explanation: "Filtering a LEFT-joined table inside WHERE drops rows where the right side is NULL; placing those conditions in ON keeps all left rows.",
    }),
    makeBasicQ({
      number: 33,
      titleBody: "Airbnb: Unbooked New York Listings (Anti-Join)",
      companies: ["Airbnb", "Expedia"],
      topics: ["LEFT JOIN", "WHERE IS NULL", "Anti-Join"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "Anti-Join Pattern",
      description: `### Problem Statement
Airbnb's Host Growth team wants to re-engage hosts whose properties have never received a booking. Find all listings in \`'New York'\` with zero bookings.

### Requirements
- \`LEFT JOIN\` \`listings\` to \`bookings\` and filter \`b.id IS NULL\` alongside \`l.city = 'New York'\`.
- Output columns: \`listing_name\`, \`neighborhood\`.
- Sort alphabetically by \`listing_name\` ascending.

### Input Schema
**listings** (id INT, name VARCHAR, neighborhood VARCHAR, city VARCHAR)

**bookings** (id INT, listing_id INT, guest_id INT, checkin DATE)`,
      schemaSql: `CREATE TABLE listings (id INT PRIMARY KEY, name VARCHAR(100), neighborhood VARCHAR(50), city VARCHAR(50));
CREATE TABLE bookings (id INT PRIMARY KEY, listing_id INT, guest_id INT, checkin DATE);
INSERT INTO listings VALUES (1, 'Cozy Soho Loft', 'SoHo', 'New York'), (2, 'Sunny Brooklyn Studio', 'Williamsburg', 'New York'), (3, 'Modern Midtown Condo', 'Midtown', 'New York'), (4, 'Quiet Sunset Room', 'Sunset District', 'San Francisco'), (5, 'East Village Brownstone', 'East Village', 'New York');
INSERT INTO bookings VALUES (101, 1, 201, '2025-01-10'), (102, 3, 202, '2025-02-14'), (103, 4, 203, '2025-01-20');`,
      referenceSql: `SELECT l.name AS listing_name, l.neighborhood FROM listings l LEFT JOIN bookings b ON l.id = b.listing_id WHERE l.city = 'New York' AND b.id IS NULL ORDER BY listing_name ASC;`,
      expectedColumns: ["listing_name", "neighborhood"],
      hints: ["LEFT JOIN listings to bookings, then filter WHERE b.id IS NULL."],
      explanation: "The LEFT JOIN ... WHERE right_key IS NULL anti-join isolates parent rows lacking child records.",
    }),
    makeBasicQ({
      number: 34,
      titleBody: "Asana: Overdue Tasks Assigned to Inactive Team Members",
      companies: ["Asana", "Monday.com"],
      topics: ["INNER JOIN", "WHERE", "Date Comparison"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "Relational Multi-Filter Join",
      description: `### Problem Statement
Asana Admins audit stranded tasks. Retrieve incomplete tasks due before \`'2025-01-01'\` assigned to inactive team members.

### Requirements
- Join \`tasks\` and \`team_members\` on \`assignee_id = m.id\`.
- Filter \`m.is_active = FALSE\`, \`t.is_completed = FALSE\`, and \`t.due_date < '2025-01-01'\`.
- Output columns: \`task_id\`, \`task_title\`, \`member_name\`, \`due_date\`.
- Sort by \`due_date\` ascending, \`task_id\` ascending.

### Input Schema
**team_members** (id INT, member_name VARCHAR, is_active BOOLEAN)

**tasks** (task_id INT, assignee_id INT, task_title VARCHAR, is_completed BOOLEAN, due_date DATE)`,
      schemaSql: `CREATE TABLE team_members (id INT PRIMARY KEY, member_name VARCHAR(50), is_active BOOLEAN);
CREATE TABLE tasks (task_id INT PRIMARY KEY, assignee_id INT, task_title VARCHAR(100), is_completed BOOLEAN, due_date DATE);
INSERT INTO team_members VALUES (1, 'Jordan Fox', FALSE), (2, 'Emily Stone', TRUE), (3, 'Liam Brown', FALSE);
INSERT INTO tasks VALUES (101, 1, 'Finalize Security Audit', FALSE, '2024-11-15'), (102, 1, 'Update API Docs', TRUE, '2024-10-01'), (103, 2, 'Prepare Keynote Slide', FALSE, '2024-12-20'), (104, 3, 'Migrate Database Replica', FALSE, '2024-12-05');`,
      referenceSql: `SELECT t.task_id, t.task_title, m.member_name, t.due_date FROM tasks t JOIN team_members m ON t.assignee_id = m.id WHERE m.is_active = FALSE AND t.is_completed = FALSE AND t.due_date < '2025-01-01' ORDER BY t.due_date ASC, t.task_id ASC;`,
      expectedColumns: ["task_id", "task_title", "member_name", "due_date"],
      hints: ["Filter across attributes from both joined tables in WHERE."],
      explanation: "Multi-table joins allow combining status flags across operational entities.",
    }),
    makeBasicQ({
      number: 35,
      titleBody: "Google: Employees Earning More Than Their Direct Manager (Self-Join)",
      companies: ["Google", "Microsoft"],
      topics: ["Self-Join", "INNER JOIN", "WHERE"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Warm-up",
      patternTag: "Self-Join",
      description: `### Problem Statement
Google Compensation Audit checks pay inversions inside org charts. Join the \`employees\` table to itself to find employees who earn strictly more than their direct manager.

### Requirements
- Join \`employees e\` with \`employees m\` on \`e.manager_id = m.id\`.
- Filter where \`e.salary > m.salary\`.
- Output columns: \`employee_name\`, \`employee_salary\`, \`manager_name\`, \`manager_salary\`.
- Sort by \`employee_salary\` descending, \`employee_name\` ascending.

### Input Schema
**employees** (id INT, name VARCHAR, salary INT, manager_id INT)`,
      schemaSql: `CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50), salary INT, manager_id INT);
INSERT INTO employees VALUES (1, 'Alice Director', 200000, NULL), (2, 'Bob Manager', 160000, 1), (3, 'Carol Staff Eng', 185000, 2), (4, 'Dave Analyst', 110000, 2), (5, 'Eve Principal', 220000, 1);`,
      referenceSql: `SELECT e.name AS employee_name, e.salary AS employee_salary, m.name AS manager_name, m.salary AS manager_salary FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary ORDER BY employee_salary DESC, employee_name ASC;`,
      expectedColumns: ["employee_name", "employee_salary", "manager_name", "manager_salary"],
      hints: ["Alias employees twice: e for employee and m for manager, joining ON e.manager_id = m.id."],
      explanation: "Self-joins compare two rows inside the same table (here, an employee row and their manager row).",
    }),
    makeBasicQ({
      number: 36,
      titleBody: "Meta: Mutual Two-Way Friendships & Referral Pairs (Self-Join)",
      companies: ["Meta", "LinkedIn"],
      topics: ["Self-Join", "LEFT JOIN", "COALESCE"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "Self-Join with NULL Root",
      description: `### Problem Statement
LinkedIn Referral Tracking lists every referred member alongside who referred them—preserving organic signups who have no referrer (\`'Organic'\`).

### Requirements
- \`LEFT JOIN\` \`members u\` to \`members r\` on \`u.referred_by = r.id\`.
- Display \`COALESCE(r.name, 'Organic')\` as \`referrer_name\`.
- Output columns: \`member_name\`, \`referrer_name\`.
- Sort by \`u.id\` ascending.

### Input Schema
**members** (id INT, name VARCHAR, referred_by INT)`,
      schemaSql: `CREATE TABLE members (id INT PRIMARY KEY, name VARCHAR(50), referred_by INT);
INSERT INTO members VALUES (1, 'Maya', NULL), (2, 'Liam', 1), (3, 'Noah', 1), (4, 'Sofia', 2), (5, 'Lucas', NULL);`,
      referenceSql: `SELECT u.name AS member_name, COALESCE(r.name, 'Organic') AS referrer_name FROM members u LEFT JOIN members r ON u.referred_by = r.id ORDER BY u.id ASC;`,
      expectedColumns: ["member_name", "referrer_name"],
      hints: ["Use LEFT JOIN (not INNER JOIN) so users with referred_by IS NULL are retained."],
      explanation: "Self-LEFT-JOIN preserves root nodes (NULL parent pointers) while resolving parent names.",
    }),
    makeBasicQ({
      number: 37,
      titleBody: "Amazon: Distinct Product Pairs Bought Together (Non-Equi Self-Join)",
      companies: ["Amazon", "Instacart"],
      topics: ["Self-Join", "COUNT", "GROUP BY"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Applied",
      patternTag: "Co-Purchase Pair Join",
      description: `### Problem Statement
Amazon Recommendations finds products frequently bought together in the same basket. Generate unique pairs \`(product_a, product_b)\` appearing in the same \`order_id\` without duplicate mirror pairs like \`(A,B)\` and \`(B,A)\`.

### Requirements
- Self-join \`order_items a\` and \`order_items b\` on \`a.order_id = b.order_id AND a.product_name < b.product_name\`.
- Count shared orders as \`co_purchase_count\`.
- Output columns: \`product_a\`, \`product_b\`, \`co_purchase_count\`.
- Sort by \`co_purchase_count\` descending, \`product_a\` ascending, \`product_b\` ascending.

### Input Schema
**order_items** (order_id INT, product_name VARCHAR)`,
      schemaSql: `CREATE TABLE order_items (order_id INT, product_name VARCHAR(50));
INSERT INTO order_items VALUES (1, 'Laptop'), (1, 'Mouse'), (1, 'USB-C Hub'), (2, 'Laptop'), (2, 'Mouse'), (3, 'Keyboard'), (3, 'Mouse');`,
      referenceSql: `SELECT a.product_name AS product_a, b.product_name AS product_b, COUNT(*) AS co_purchase_count FROM order_items a JOIN order_items b ON a.order_id = b.order_id AND a.product_name < b.product_name GROUP BY a.product_name, b.product_name ORDER BY co_purchase_count DESC, product_a ASC, product_b ASC;`,
      expectedColumns: ["product_a", "product_b", "co_purchase_count"],
      hints: ["Use a.product_name < b.product_name in the JOIN condition to avoid self-pairs and reversed duplicates."],
      explanation: "Strict inequality (a.name < b.name) eliminates mirror pairs (A,B)/(B,A) and self-pairs (A,A) in market-basket analysis.",
    }),
    makeBasicQ({
      number: 38,
      titleBody: "Uber: Consolidated Passenger & Driver Operating Cities (UNION)",
      companies: ["Uber", "Lyft"],
      topics: ["UNION", "Set Theory", "TRIM"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Warm-up",
      patternTag: "UNION Deduplication",
      description: `### Problem Statement
Uber Operations needs a deduplicated roster of all cities where either riders live or drivers operate.

### Requirements
- Combine non-null, non-blank cities from \`riders\` and \`drivers\` using \`UNION\`.
- Output column: \`city\`, sorted alphabetically ascending.

### Input Schema
**riders** (id INT, name VARCHAR, city VARCHAR)

**drivers** (id INT, name VARCHAR, city VARCHAR)`,
      schemaSql: `CREATE TABLE riders (id INT PRIMARY KEY, name VARCHAR(50), city VARCHAR(50));
CREATE TABLE drivers (id INT PRIMARY KEY, name VARCHAR(50), city VARCHAR(50));
INSERT INTO riders VALUES (1, 'Alice Green', 'San Francisco'), (2, 'Bob White', 'Chicago'), (3, 'Charlie Hall', 'Austin'), (4, 'David Young', NULL);
INSERT INTO drivers VALUES (101, 'Elena Rostova', 'Chicago'), (102, 'Frank Miller', 'Seattle'), (103, 'Grace Hopper', 'Austin'), (104, 'Henry Ford', 'Detroit');`,
      referenceSql: `SELECT city FROM riders WHERE city IS NOT NULL AND TRIM(city) <> '' UNION SELECT city FROM drivers WHERE city IS NOT NULL AND TRIM(city) <> '' ORDER BY city ASC;`,
      expectedColumns: ["city"],
      hints: ["UNION automatically removes duplicate rows across both SELECT queries; ORDER BY goes once at the very end."],
      explanation: "UNION merges compatible result sets vertically and deduplicates identical rows.",
    }),
    makeBasicQ({
      number: 39,
      titleBody: "Stripe: Unified Ledger of Deposits & Payouts (UNION ALL)",
      companies: ["Stripe", "PayPal"],
      topics: ["UNION ALL", "Set Theory"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Core",
      patternTag: "UNION ALL Event Stream",
      description: `### Problem Statement
Stripe Treasury builds a unified transaction stream by stacking deposits and payouts chronologically **without** dropping identical amounts.

### Requirements
- Combine \`deposits\` (labeled \`'deposit'\`) and \`payouts\` (labeled \`'payout'\`) using \`UNION ALL\`.
- Output columns: \`user_id\`, \`amount\`, \`transaction_type\`, \`transaction_date\`.
- Sort by \`transaction_date\` ascending, \`user_id\` ascending.

### Input Schema
**deposits** (id INT, user_id INT, amount NUMERIC, transaction_date DATE)

**payouts** (id INT, user_id INT, amount NUMERIC, transaction_date DATE)`,
      schemaSql: `CREATE TABLE deposits (id INT PRIMARY KEY, user_id INT, amount NUMERIC, transaction_date DATE);
CREATE TABLE payouts (id INT PRIMARY KEY, user_id INT, amount NUMERIC, transaction_date DATE);
INSERT INTO deposits VALUES (1, 101, 450.00, '2025-01-10'), (2, 102, 1200.00, '2025-01-12'), (3, 101, 300.00, '2025-01-15');
INSERT INTO payouts VALUES (1, 101, 200.00, '2025-01-11'), (2, 103, 850.00, '2025-01-14'), (3, 102, 600.00, '2025-01-16');`,
      referenceSql: `SELECT user_id, amount, 'deposit' AS transaction_type, transaction_date FROM deposits UNION ALL SELECT user_id, amount, 'payout' AS transaction_type, transaction_date FROM payouts ORDER BY transaction_date ASC, user_id ASC;`,
      expectedColumns: ["user_id", "amount", "transaction_type", "transaction_date"],
      hints: ["Use UNION ALL so identical rows are preserved and SQL skips unnecessary deduplication sorting."],
      explanation: "UNION ALL preserves all rows and avoids the expensive distinct sort required by UNION.",
    }),
    makeBasicQ({
      number: 40,
      titleBody: "Airbnb: Master Email Directory Across Hosts and Guests (UNION + Hygiene)",
      companies: ["Airbnb", "Expedia"],
      topics: ["UNION", "LOWER", "TRIM"],
      category: "Joins & Set Theory",
      stage: S4,
      stageOrder: 4,
      rampStep: "Applied",
      patternTag: "Normalized UNION",
      description: `### Problem Statement
Airbnb Trust & Safety needs a clean, deduplicated email list across both hosts and guests. Emails may differ only by casing or trailing spaces.

### Requirements
- Normalize emails with \`LOWER(TRIM(email))\` as \`email\` from both \`hosts\` and \`guests\`.
- Exclude \`NULL\` or whitespace-only emails.
- Deduplicate across both tables using \`UNION\`, sorted ascending.

### Input Schema
**hosts** (id INT, host_name VARCHAR, email VARCHAR)

**guests** (id INT, guest_name VARCHAR, email VARCHAR)`,
      schemaSql: `CREATE TABLE hosts (id INT PRIMARY KEY, host_name VARCHAR(50), email VARCHAR(100));
CREATE TABLE guests (id INT PRIMARY KEY, guest_name VARCHAR(50), email VARCHAR(100));
INSERT INTO hosts VALUES (1, 'Sarah Chen', 'Sarah.C@gmail.com'), (2, 'Mark Ross', 'mark.ross@yahoo.com'), (3, 'Ghost Host', NULL);
INSERT INTO guests VALUES (101, 'David Miller', 'david.m@outlook.com'), (102, 'Sarah Chen', ' sarah.c@gmail.com '), (103, 'Anonymous', '   ');`,
      referenceSql: `SELECT LOWER(TRIM(email)) AS email FROM hosts WHERE email IS NOT NULL AND TRIM(email) <> '' UNION SELECT LOWER(TRIM(email)) AS email FROM guests WHERE email IS NOT NULL AND TRIM(email) <> '' ORDER BY email ASC;`,
      expectedColumns: ["email"],
      hints: ["Normalize with LOWER(TRIM(email)) in both SELECT branches before UNION deduplicates them."],
      explanation: "Normalizing keys inside each UNION branch prevents case/whitespace duplicates from slipping through.",
    }),

    // ================= STAGE 5: SUBQUERIES (41 - 52) =================
    makeBasicQ({
      number: 41,
      titleBody: "Netflix: Feature Films Longer Than the Platform Average Runtime",
      companies: ["Netflix", "Warner Bros"],
      topics: ["Subqueries", "Scalar Subquery", "AVG"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Warm-up",
      patternTag: "Scalar Subquery in WHERE",
      conceptPrimer: {
        title: "Scalar Subqueries in WHERE",
        mentalModel:
          "You cannot write WHERE duration_minutes > AVG(duration_minutes) because aggregates aren't allowed in WHERE. A scalar subquery (SELECT AVG(...) FROM table) runs first, computes one number, and plugs it right into your comparison.",
        syntaxTemplate: `SELECT col1, metric
FROM my_table
WHERE metric > (SELECT AVG(metric) FROM my_table);`,
        visualType: "subquery-flow",
      },
      description: `### Problem Statement
Netflix Programming wants films whose duration strictly exceeds the overall average runtime across all movies in the library.

### Requirements
- Compare \`duration_minutes\` against \`(SELECT AVG(duration_minutes) FROM movies)\`.
- Output columns: \`title\`, \`genre\`, \`duration_minutes\`.
- Sort by \`duration_minutes\` descending, \`title\` ascending.

### Input Schema
**movies** (id INT, title VARCHAR, genre VARCHAR, duration_minutes INT)`,
      schemaSql: `CREATE TABLE movies (id INT PRIMARY KEY, title VARCHAR(100), genre VARCHAR(50), duration_minutes INT);
INSERT INTO movies VALUES (1, 'Irishman Epic', 'Crime', 209), (2, 'Red Notice', 'Action', 118), (3, 'Marriage Story', 'Drama', 137), (4, 'Spenser Confidential', 'Comedy', 111), (5, 'Roma', 'Drama', 135), (6, 'Extraction', 'Action', 116);`,
      referenceSql: `SELECT title, genre, duration_minutes FROM movies WHERE duration_minutes > (SELECT AVG(duration_minutes) FROM movies) ORDER BY duration_minutes DESC, title ASC;`,
      expectedColumns: ["title", "genre", "duration_minutes"],
      hints: ["Use WHERE duration_minutes > (SELECT AVG(duration_minutes) FROM movies)."],
      explanation: "A scalar subquery returns a single value that WHERE can compare against every row.",
    }),
    makeBasicQ({
      number: 42,
      titleBody: "LinkedIn: Active Roles Above Average Active Salary",
      companies: ["LinkedIn", "Indeed"],
      topics: ["Subqueries", "Scalar Subquery", "WHERE"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Warm-up",
      patternTag: "Filtered Scalar Subquery",
      description: `### Problem Statement
LinkedIn Economic Graph highlights premier active roles. Find active job postings whose salary exceeds the average salary **of active postings only**.

### Requirements
- Filter \`is_active = TRUE\` in both the outer query and the inner scalar subquery.
- Output columns: \`job_id\`, \`title\`, \`company_name\`, \`base_salary\`.
- Sort by \`base_salary\` descending, \`job_id\` ascending.

### Input Schema
**job_postings** (job_id INT, title VARCHAR, company_name VARCHAR, base_salary NUMERIC, is_active BOOLEAN)`,
      schemaSql: `CREATE TABLE job_postings (job_id INT PRIMARY KEY, title VARCHAR(100), company_name VARCHAR(100), base_salary NUMERIC, is_active BOOLEAN);
INSERT INTO job_postings VALUES (1, 'Staff Software Engineer', 'Google', 240000, TRUE), (2, 'Data Analyst', 'Amazon', 115000, TRUE), (3, 'Engineering Manager', 'Meta', 260000, TRUE), (4, 'Junior QA', 'StartupX', 75000, TRUE), (5, 'Principal Architect', 'Stripe', 290000, TRUE), (6, 'Legacy VP', 'OldCorp', 450000, FALSE);`,
      referenceSql: `SELECT job_id, title, company_name, base_salary FROM job_postings WHERE is_active = TRUE AND base_salary > (SELECT AVG(base_salary) FROM job_postings WHERE is_active = TRUE) ORDER BY base_salary DESC, job_id ASC;`,
      expectedColumns: ["job_id", "title", "company_name", "base_salary"],
      hints: ["Don't forget WHERE is_active = TRUE inside the subquery so inactive outliers don't skew the average."],
      explanation: "Inner and outer WHERE filters are independent—always repeat domain filters inside scalar subqueries when needed.",
    }),
    makeBasicQ({
      number: 43,
      titleBody: "Stripe: Showing Each Product Price Alongside Global Average (Scalar in SELECT)",
      companies: ["Stripe", "Amazon"],
      topics: ["Subqueries", "Scalar Subquery", "ROUND"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Warm-up",
      patternTag: "Scalar Subquery in SELECT",
      description: `### Problem Statement
Before learning window functions (\`OVER ()\`), analysts often use a scalar subquery inside \`SELECT\` to place the global average next to every individual row.

### Requirements
- For each product, show \`name\`, \`price\`, \`global_avg_price\` (rounded to 2 decimals via a scalar subquery), and \`diff_from_avg\` (\`ROUND(price - (SELECT AVG(price) FROM products), 2)\`).
- Sort by \`price\` descending, \`name\` ascending.

### Input Schema
**products** (id INT, name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(60), price NUMERIC);
INSERT INTO products VALUES (1, 'Monitor', 300.00), (2, 'Keyboard', 100.00), (3, 'Mouse', 50.00), (4, 'Webcam', 150.00);`,
      referenceSql: `SELECT name, price, ROUND((SELECT AVG(price) FROM products), 2) AS global_avg_price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_avg FROM products ORDER BY price DESC, name ASC;`,
      expectedColumns: ["name", "price", "global_avg_price", "diff_from_avg"],
      hints: ["Place (SELECT AVG(price) FROM products) inside SELECT to attach the single summary number to every row."],
      explanation: "A scalar subquery in SELECT displays a table-wide benchmark on every row—a bridge to understanding OVER() later!",
    }),
    makeBasicQ({
      number: 44,
      titleBody: "Amazon: Customers Who Purchased High-End Electronics (IN Subquery)",
      companies: ["Amazon", "Target"],
      topics: ["Subqueries", "IN", "JOIN"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "IN (SELECT ...) Subquery",
      description: `### Problem Statement
Amazon Prime Marketing wants customers who placed at least one order for an \`'Electronics'\` item priced strictly above $400—without duplicating customers who bought multiple times.

### Requirements
- Use \`WHERE id IN (SELECT o.customer_id ...)\` joining \`orders\` and \`products\`.
- Filter \`p.department = 'Electronics' AND p.price > 400.00\`.
- Output columns: \`customer_name\`, \`email\`.
- Sort alphabetically by \`customer_name\` ascending.

### Input Schema
**customers** (id INT, customer_name VARCHAR, email VARCHAR)

**orders** (id INT, customer_id INT, product_id INT)

**products** (id INT, product_name VARCHAR, department VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE customers (id INT PRIMARY KEY, customer_name VARCHAR(50), email VARCHAR(100));
CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, product_id INT);
CREATE TABLE products (id INT PRIMARY KEY, product_name VARCHAR(100), department VARCHAR(50), price NUMERIC);
INSERT INTO customers VALUES (1, 'Alice Morgan', 'alice@amazon.com'), (2, 'Brian Hayes', 'brian@gmail.com'), (3, 'Catherine Bell', 'cathy@yahoo.com'), (4, 'Daniel Craig', 'daniel@outlook.com');
INSERT INTO products VALUES (10, 'Sony Headphones', 'Electronics', 150.00), (20, '4K Smart OLED TV', 'Electronics', 899.00), (30, 'Espresso Machine', 'Kitchen', 450.00), (40, 'Gaming Laptop', 'Electronics', 1200.00);
INSERT INTO orders VALUES (101, 1, 20), (102, 2, 10), (103, 3, 30), (104, 4, 40), (105, 1, 40);`,
      referenceSql: `SELECT customer_name, email FROM customers WHERE id IN (SELECT o.customer_id FROM orders o JOIN products p ON o.product_id = p.id WHERE p.department = 'Electronics' AND p.price > 400.00) ORDER BY customer_name ASC;`,
      expectedColumns: ["customer_name", "email"],
      hints: ["IN automatically behaves like a semi-join: even if Alice bought 2 qualifying electronics, she appears once."],
      explanation: "Using IN (SELECT ...) avoids duplicating outer rows when a customer has multiple matching orders.",
    }),
    makeBasicQ({
      number: 45,
      titleBody: "Meta: Registered Users with Zero Posts (NOT IN & NULL Trap)",
      companies: ["Meta", "Twitter"],
      topics: ["Subqueries", "NOT IN", "IS NOT NULL"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "NOT IN with NULL Guard",
      description: `### Problem Statement
Meta Growth Engineering wants active users who have never published a post. Beware: \`posts\` contains a dirty anonymous row where \`user_id\` is \`NULL\`! If you write \`NOT IN (SELECT user_id FROM posts)\` without filtering out \`NULL\`, SQL returns **zero rows**.

### Requirements
- Find active users (\`is_active = TRUE\`) whose \`id\` does not appear in \`posts\`.
- Safely guard the subquery with \`WHERE user_id IS NOT NULL\`.
- Output columns: \`username\`, \`country\`.
- Sort by \`username\` ascending.

### Input Schema
**users** (id INT, username VARCHAR, is_active BOOLEAN, country VARCHAR)

**posts** (id INT, user_id INT, content VARCHAR)`,
      schemaSql: `CREATE TABLE users (id INT PRIMARY KEY, username VARCHAR(50), is_active BOOLEAN, country VARCHAR(50));
CREATE TABLE posts (id INT PRIMARY KEY, user_id INT, content VARCHAR(255));
INSERT INTO users VALUES (1, 'alex_m', TRUE, 'USA'), (2, 'brenda_k', TRUE, 'Canada'), (3, 'clark_d', FALSE, 'UK'), (4, 'dana_w', TRUE, 'USA'), (5, 'eric_p', TRUE, 'Germany');
INSERT INTO posts VALUES (101, 1, 'First post!'), (102, 2, 'Good morning'), (103, NULL, 'Anonymous legacy post');`,
      referenceSql: `SELECT username, country FROM users WHERE is_active = TRUE AND id NOT IN (SELECT user_id FROM posts WHERE user_id IS NOT NULL) ORDER BY username ASC;`,
      expectedColumns: ["username", "country"],
      hints: ["Add WHERE user_id IS NOT NULL inside the NOT IN subquery—otherwise x NOT IN (1, 2, NULL) evaluates to UNKNOWN."],
      explanation: "In SQL three-valued logic, x NOT IN (..., NULL) is never TRUE. Always filter IS NOT NULL inside NOT IN, or use NOT EXISTS.",
    }),
    makeBasicQ({
      number: 46,
      titleBody: "Stripe: Retail Merchants with Zero Chargebacks (NOT EXISTS)",
      companies: ["Stripe", "Adyen"],
      topics: ["Subqueries", "NOT EXISTS", "Correlated Subquery"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "EXISTS / NOT EXISTS Semi-Join",
      description: `### Problem Statement
Stripe Risk Operations prefers \`NOT EXISTS\` over \`NOT IN\` because \`NOT EXISTS\` is completely immune to \`NULL\` values and short-circuits on the first match.

### Requirements
- Find \`'Retail'\` merchants that have zero rows in \`disputes\` using \`NOT EXISTS\`.
- Output columns: \`merchant_name\`, \`registered_country\`.
- Sort by \`merchant_name\` ascending.

### Input Schema
**merchants** (id INT, merchant_name VARCHAR, sector VARCHAR, registered_country VARCHAR)

**disputes** (id INT, merchant_id INT, dispute_amount NUMERIC)`,
      schemaSql: `CREATE TABLE merchants (id INT PRIMARY KEY, merchant_name VARCHAR(100), sector VARCHAR(50), registered_country VARCHAR(50));
CREATE TABLE disputes (id INT PRIMARY KEY, merchant_id INT, dispute_amount NUMERIC);
INSERT INTO merchants VALUES (1, 'Blue Sky Books', 'Retail', 'USA'), (2, 'Apex Apparel', 'Retail', 'Canada'), (3, 'Cloud Peak Software', 'SaaS', 'USA'), (4, 'Downtown Decor', 'Retail', 'UK'), (5, 'Green Grocer', 'Retail', 'USA');
INSERT INTO disputes VALUES (101, 1, 45.00), (102, 4, 120.00), (103, NULL, 99.00);`,
      referenceSql: `SELECT m.merchant_name, m.registered_country FROM merchants m WHERE m.sector = 'Retail' AND NOT EXISTS (SELECT 1 FROM disputes d WHERE d.merchant_id = m.id) ORDER BY m.merchant_name ASC;`,
      expectedColumns: ["merchant_name", "registered_country"],
      hints: ["Write AND NOT EXISTS (SELECT 1 FROM disputes d WHERE d.merchant_id = m.id)."],
      explanation: "NOT EXISTS safely ignores NULL foreign keys in the inner table and stops scanning on the first match.",
    }),
    makeBasicQ({
      number: 47,
      titleBody: "Spotify: Artists Exceeding Global Track Popularity (Subquery in HAVING)",
      companies: ["Spotify", "Apple"],
      topics: ["Subqueries", "HAVING", "AVG", "ROUND"],
      category: "Aggregations",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "Subquery in HAVING",
      description: `### Problem Statement
Spotify Editorial highlights artists whose average track popularity beats the global average popularity across all songs.

### Requirements
- Group by \`artist_name\` and compute \`ROUND(AVG(popularity), 2) AS avg_popularity\`.
- Filter groups in \`HAVING\` using a scalar subquery against \`tracks\`.
- Output columns: \`artist_name\`, \`avg_popularity\`.
- Sort by \`avg_popularity\` descending, \`artist_name\` ascending.

### Input Schema
**tracks** (id INT, artist_name VARCHAR, track_title VARCHAR, popularity INT)`,
      schemaSql: `CREATE TABLE tracks (id INT PRIMARY KEY, artist_name VARCHAR(50), track_title VARCHAR(100), popularity INT);
INSERT INTO tracks VALUES (1, 'Adele', 'Hello', 88), (2, 'Adele', 'Rolling in the Deep', 92), (3, 'Coldplay', 'Yellow', 84), (4, 'Coldplay', 'Fix You', 80), (5, 'Indie Band', 'Intro Song', 40), (6, 'Indie Band', 'Demo Track', 35), (7, 'Taylor Swift', 'Blank Space', 95), (8, 'Taylor Swift', 'Anti-Hero', 91);`,
      referenceSql: `SELECT artist_name, ROUND(AVG(popularity), 2) AS avg_popularity FROM tracks GROUP BY artist_name HAVING AVG(popularity) > (SELECT AVG(popularity) FROM tracks) ORDER BY avg_popularity DESC, artist_name ASC;`,
      expectedColumns: ["artist_name", "avg_popularity"],
      hints: ["Compare AVG(popularity) > (SELECT AVG(popularity) FROM tracks) inside HAVING."],
      explanation: "HAVING compares grouped aggregates against scalar subqueries cleanly.",
    }),
    makeBasicQ({
      number: 48,
      titleBody: "Uber: Metropolitan Cities with Average Completed Fare Over $25 (Derived Table)",
      companies: ["Uber", "Lyft"],
      topics: ["Subqueries", "Derived Tables", "AVG", "ROUND"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Warm-up",
      patternTag: "Derived Table in FROM",
      description: `### Problem Statement
Using a **derived table** subquery inside \`FROM\`, compute average completed ride fares per city first, then filter the outer query for cities averaging over $25.00.

### Requirements
- Inner derived table: filter \`status = 'completed'\`, group by \`city\`, compute \`ROUND(AVG(fare), 2) AS avg_fare\`.
- Outer query: filter \`avg_fare > 25.00\`.
- Output columns: \`city\`, \`avg_fare\`.
- Sort by \`avg_fare\` descending, \`city\` ascending.

### Input Schema
**rides** (id INT, city VARCHAR, fare NUMERIC, status VARCHAR)`,
      schemaSql: `CREATE TABLE rides (id INT PRIMARY KEY, city VARCHAR(50), fare NUMERIC, status VARCHAR(20));
INSERT INTO rides VALUES (1, 'San Francisco', 32.50, 'completed'), (2, 'San Francisco', 28.00, 'completed'), (3, 'Chicago', 18.50, 'completed'), (4, 'Chicago', 22.00, 'completed'), (5, 'New York', 45.00, 'completed'), (6, 'New York', 38.00, 'completed'), (7, 'Austin', 24.00, 'completed'), (8, 'Austin', 15.00, 'cancelled');`,
      referenceSql: `SELECT city, avg_fare FROM (SELECT city, ROUND(AVG(fare), 2) AS avg_fare FROM rides WHERE status = 'completed' GROUP BY city) AS city_stats WHERE avg_fare > 25.00 ORDER BY avg_fare DESC, city ASC;`,
      expectedColumns: ["city", "avg_fare"],
      hints: ["Give the FROM (...) subquery an alias like AS city_stats (required in PostgreSQL)."],
      explanation: "A derived table acts as an inline virtual table in FROM—the stepping stone to CTEs!",
    }),
    makeBasicQ({
      number: 49,
      titleBody: "Amazon: Average Orders per Active Customer (Two-Level Aggregation)",
      companies: ["Amazon", "DoorDash"],
      topics: ["Subqueries", "Derived Tables", "AVG", "COUNT"],
      category: "Aggregations",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "Aggregate of Aggregate (Derived Table)",
      description: `### Problem Statement
SQL does not allow \`AVG(COUNT(*))\` in a single query. Use a derived table in \`FROM\` to count orders per customer first, then compute the average orders per ordering customer.

### Requirements
- Inner query: count orders per \`customer_id\` as \`order_cnt\`.
- Outer query: compute \`ROUND(AVG(order_cnt), 2) AS avg_orders_per_customer\` and \`MAX(order_cnt) AS max_orders\`.
- Output columns: \`avg_orders_per_customer\`, \`max_orders\`.

### Input Schema
**orders** (id INT, customer_id INT, total_amount NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, total_amount NUMERIC);
INSERT INTO orders VALUES (1, 10, 50.00), (2, 10, 80.00), (3, 10, 40.00), (4, 20, 120.00), (5, 30, 60.00), (6, 30, 75.00);`,
      referenceSql: `SELECT ROUND(AVG(order_cnt), 2) AS avg_orders_per_customer, MAX(order_cnt) AS max_orders FROM (SELECT customer_id, COUNT(*) AS order_cnt FROM orders GROUP BY customer_id) AS customer_counts;`,
      expectedColumns: ["avg_orders_per_customer", "max_orders"],
      hints: ["Aggregate by customer_id inside FROM (...) first, then take AVG and MAX outside."],
      explanation: "Two-level aggregation (aggregate of an aggregate) always requires a derived table or CTE.",
    }),
    makeBasicQ({
      number: 50,
      titleBody: "Amazon: Products Priced Above Category Average (Correlated Subquery)",
      companies: ["Amazon", "Walmart"],
      topics: ["Correlated Subquery", "WHERE", "AVG"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Core",
      patternTag: "Correlated Subquery",
      description: `### Problem Statement
Find all products whose price is strictly greater than the average price **within their own category**, using a correlated subquery.

### Requirements
- Compare \`p.price > (SELECT AVG(p2.price) FROM catalog_products p2 WHERE p2.category_id = p.category_id)\`.
- Output columns: \`product_id\`, \`category_id\`, \`product_name\`, \`price\`.
- Sort by \`category_id\` ascending, \`price\` descending.

### Input Schema
**catalog_products** (product_id INT, category_id INT, product_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE catalog_products (product_id INT PRIMARY KEY, category_id INT, product_name VARCHAR(50), price NUMERIC);
INSERT INTO catalog_products VALUES (1, 10, 'Gaming Keyboard', 120.00), (2, 10, 'Basic Keyboard', 25.00), (3, 10, 'Ergonomic Keyboard', 85.00), (4, 20, '4K Monitor', 450.00), (5, 20, 'HD Monitor', 150.00), (6, 20, 'Office Monitor', 200.00);`,
      referenceSql: `SELECT p.product_id, p.category_id, p.product_name, p.price FROM catalog_products p WHERE p.price > (SELECT AVG(p2.price) FROM catalog_products p2 WHERE p2.category_id = p.category_id) ORDER BY p.category_id ASC, p.price DESC;`,
      expectedColumns: ["product_id", "category_id", "product_name", "price"],
      hints: ["Alias the outer table p and inner table p2, matching p2.category_id = p.category_id."],
      explanation: "Correlated subqueries benchmark each row against its peer group dynamically.",
    }),
    makeBasicQ({
      number: 51,
      titleBody: "Airbnb: Listings Priced Above 2x Neighborhood Minimum (Correlated)",
      companies: ["Airbnb", "Booking.com"],
      topics: ["Correlated Subquery", "MIN", "WHERE"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Applied",
      patternTag: "Correlated Benchmark Subquery",
      description: `### Problem Statement
Identify luxury outlier listings whose nightly price is strictly more than twice the cheapest listing in the same neighborhood.

### Requirements
- Use a correlated subquery computing \`MIN(l2.price) * 2\` where \`l2.neighborhood = l.neighborhood\`.
- Output columns: \`listing_name\`, \`neighborhood\`, \`price\`.
- Sort by \`price\` descending, \`listing_name\` ascending.

### Input Schema
**neighborhood_listings** (id INT, listing_name VARCHAR, neighborhood VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE neighborhood_listings (id INT PRIMARY KEY, listing_name VARCHAR(100), neighborhood VARCHAR(50), price NUMERIC);
INSERT INTO neighborhood_listings VALUES (1, 'Downtown Penthouse', 'Downtown', 350.00), (2, 'Cozy Studio', 'Downtown', 120.00), (3, 'Budget Crashpad', 'Downtown', 90.00), (4, 'Seaside Villa', 'Coastal', 600.00), (5, 'Beachfront Cottage', 'Coastal', 250.00), (6, 'Coastal Camper', 'Coastal', 150.00), (7, 'Suburban Townhome', 'Suburbs', 110.00), (8, 'Suburban Suite', 'Suburbs', 100.00);`,
      referenceSql: `SELECT l.listing_name, l.neighborhood, l.price FROM neighborhood_listings l WHERE l.price > (SELECT MIN(l2.price) * 2 FROM neighborhood_listings l2 WHERE l2.neighborhood = l.neighborhood) ORDER BY l.price DESC, l.listing_name ASC;`,
      expectedColumns: ["listing_name", "neighborhood", "price"],
      hints: ["Match l2.neighborhood = l.neighborhood inside the MIN(l2.price) * 2 subquery."],
      explanation: "Correlated subqueries allow arbitrary per-group comparisons against MIN, MAX, or AVG.",
    }),
    makeBasicQ({
      number: 52,
      titleBody: "Stripe: Customers Whose First-Ever Order Exceeded $200 (EXISTS + Subquery)",
      companies: ["Stripe", "Shopify"],
      topics: ["Subqueries", "EXISTS", "MIN", "GROUP BY"],
      category: "Business Analytics",
      stage: S5,
      stageOrder: 5,
      rampStep: "Applied",
      patternTag: "First-Event Subquery",
      description: `### Problem Statement
Stripe Cohort Analytics wants to identify high-intent shoppers whose very first order (earliest \`order_date\`) totaled strictly over $200.

### Requirements
- Consider only \`status = 'completed'\` orders.
- Identify orders matching each customer's earliest completed \`order_date\` where \`total_amount > 200\`.
- Output columns: \`customer_id\`, \`first_order_date\`, \`total_amount\`.
- Sort by \`customer_id\` ascending.

### Input Schema
**orders** (id INT, customer_id INT, status VARCHAR, order_date DATE, total_amount NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, status VARCHAR(20), order_date DATE, total_amount NUMERIC);
INSERT INTO orders VALUES (1, 101, 'completed', '2025-01-05', 250.00), (2, 101, 'completed', '2025-02-01', 90.00), (3, 102, 'completed', '2025-01-08', 75.00), (4, 102, 'completed', '2025-02-12', 310.00), (5, 103, 'cancelled', '2025-01-01', 500.00), (6, 103, 'completed', '2025-01-15', 220.00);`,
      referenceSql: `SELECT o.customer_id, o.order_date AS first_order_date, o.total_amount FROM orders o WHERE o.status = 'completed' AND o.order_date = (SELECT MIN(o2.order_date) FROM orders o2 WHERE o2.customer_id = o.customer_id AND o2.status = 'completed') AND o.total_amount > 200 ORDER BY o.customer_id ASC;`,
      expectedColumns: ["customer_id", "first_order_date", "total_amount"],
      hints: ["Find the minimum completed order_date per customer in a correlated subquery, then filter total_amount > 200."],
      explanation: "Finding a customer's earliest valid event via MIN(date) subquery is a fundamental cohort building block.",
    }),
  ];
}
