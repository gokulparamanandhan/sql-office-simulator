import { InterviewQuestion } from "../src/lib/content/interview-questions";
import { orderAndEnrichAdvanced } from "./upgrades/inter-adv-upgrades";

// Level 3: Advanced (100 Progressive Staff-Level Interview Questions)
export function getAdvancedQuestions(): InterviewQuestion[] {
  const raw: InterviewQuestion[] = [
  {
    "id": "adv-201",
    "title": "201. Google: Search Query Sessionization with 30-Minute Inactivity Window",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Microsoft"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoogle Search Analytics groups user queries into distinct search sessions. A session expires if a user is inactive for more than 30 minutes between consecutive searches. Assign a sequential session ID per user and calculate session start time and total queries executed.\n\n### Requirements\n- Compare each query timestamp to the preceding query timestamp for the same user.\n- Flag a new session if the elapsed time is greater than 30 minutes or if it is the user's first query.\n- Generate a cumulative session_id per user starting from 1.\n- Calculate session_start as the earliest timestamp in that session and total_queries as the query count.\n- Output columns: user_id, session_id, session_start, total_queries.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**search_logs** (id INT, user_id INT, query_text VARCHAR, query_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE search_logs (id INT PRIMARY KEY, user_id INT, query_text VARCHAR(100), query_time TIMESTAMP);\nINSERT INTO search_logs VALUES (1, 101, 'weather today', '2025-01-01 08:00:00'), (2, 101, 'radar radar', '2025-01-01 08:15:00'), (3, 101, 'lunch spots', '2025-01-01 09:00:00'), (4, 101, 'pizza near me', '2025-01-01 09:10:00'), (5, 102, 'python tutorial', '2025-01-01 10:00:00'), (6, 102, 'sql window functions', '2025-01-01 10:20:00');",
    "starterSql": "-- 201. Google: Search Query Sessionization with 30-Minute Inactivity Window\n-- Output: user_id, session_id, session_start, total_queries\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lag_events AS (SELECT user_id, query_time, CASE WHEN LAG(query_time) OVER (PARTITION BY user_id ORDER BY query_time ASC) IS NULL OR (query_time - LAG(query_time) OVER (PARTITION BY user_id ORDER BY query_time ASC)) > INTERVAL '30 minutes' THEN 1 ELSE 0 END AS is_new_session FROM search_logs), sessions AS (SELECT user_id, query_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY query_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lag_events) SELECT user_id, session_id, MIN(query_time) AS session_start, COUNT(*) AS total_queries FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "total_queries"
    ],
    "hints": [
      "Use LAG to find the prior event time per user.",
      "Flag 1 when difference > 30 minutes, else 0.",
      "Compute running sum of flags to assign session IDs, then aggregate by user_id and session_id."
    ],
    "explanation": "Two-pass windowing (LAG flag + running SUM) is the canonical solution for sessionization.",
    "number": 201
  },
  {
    "id": "adv-202",
    "title": "202. Microsoft: Corporate Org Hierarchy Depth and Management Path",
    "difficulty": "Hard",
    "companies": [
      "Microsoft",
      "Google"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nMicrosoft People Analytics models organizational reporting trees. For every employee, traverse the management hierarchy upwards to find their managerial depth level (CEO = level 1) and full management path string.\n\n### Requirements\n- Start with executive leadership (manager_id IS NULL) at level 1.\n- Recursively traverse subordinates, incrementing depth level by 1 at each step.\n- Build a path string formatted as 'CEO -> Manager -> Employee'.\n- Output columns: employee_id, employee_name, depth_level, hierarchy_path.\n- Sort by depth_level ascending, then by employee_id ascending.\n\n### Input Schema\n**employees** (id INT, name VARCHAR, manager_id INT)",
    "schemaSql": "CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50), manager_id INT);\nINSERT INTO employees VALUES (1, 'Satya Nadella', NULL), (2, 'Scott Guthrie', 1), (3, 'Amy Hood', 1), (4, 'Julia Liuson', 2), (5, 'Mark Russinovich', 2), (6, 'Core Engineer Alex', 4);",
    "starterSql": "-- 202. Microsoft: Corporate Org Hierarchy Depth and Management Path\n-- Output: employee_id, employee_name, depth_level, hierarchy_path\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE org_tree AS (SELECT id AS employee_id, name AS employee_name, 1 AS depth_level, CAST(name AS VARCHAR(255)) AS hierarchy_path FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, o.depth_level + 1, CAST(o.hierarchy_path || ' -> ' || e.name AS VARCHAR(255)) FROM employees e JOIN org_tree o ON e.manager_id = o.employee_id) SELECT employee_id, employee_name, depth_level, hierarchy_path FROM org_tree ORDER BY depth_level ASC, employee_id ASC;",
    "expectedColumns": [
      "employee_id",
      "employee_name",
      "depth_level",
      "hierarchy_path"
    ],
    "hints": [
      "Define recursive base query where manager_id IS NULL.",
      "Recursively join subordinates on e.manager_id = o.employee_id.",
      "Concatenate names into a hierarchy path."
    ],
    "explanation": "WITH RECURSIVE traverses arbitrary depth tree structures in relational databases.",
    "number": 202
  },
  {
    "id": "adv-203",
    "title": "203. Duolingo: Longest Consecutive Daily Learning Streak",
    "difficulty": "Hard",
    "companies": [
      "Duolingo",
      "Strava"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDuolingo Streak Engine calculates user habit consistency. For each language learner, find the length in days of their longest contiguous consecutive daily lesson streak.\n\n### Requirements\n- Group consecutive calendar dates using the Gaps & Islands pattern (lesson_date - ROW_NUMBER).\n- Calculate the duration in days of each contiguous streak.\n- Find the maximum streak length achieved by each user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**user_lessons** (id INT, user_id INT, lesson_date DATE)",
    "schemaSql": "CREATE TABLE user_lessons (id INT PRIMARY KEY, user_id INT, lesson_date DATE);\nINSERT INTO user_lessons VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-02'), (3, 101, '2025-01-03'), (4, 101, '2025-01-05'), (5, 101, '2025-01-06'), (6, 102, '2025-01-01'), (7, 102, '2025-01-02'), (8, 102, '2025-01-04');",
    "starterSql": "-- 203. Duolingo: Longest Consecutive Daily Learning Streak\n-- Output: user_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_dates AS (SELECT DISTINCT user_id, lesson_date FROM user_lessons), numbered AS (SELECT user_id, lesson_date, lesson_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY lesson_date ASC) * INTERVAL '1 day') AS grp FROM distinct_dates), streak_lengths AS (SELECT user_id, grp, COUNT(*) AS streak_days FROM numbered GROUP BY user_id, grp) SELECT user_id, MAX(streak_days) AS longest_streak_days FROM streak_lengths GROUP BY user_id ORDER BY longest_streak_days DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "longest_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER() * interval '1 day' from lesson_date to create an invariant group key for consecutive dates.",
      "Group by user_id and grp to find individual streak lengths.",
      "Take MAX(streak_days) per user."
    ],
    "explanation": "The Date minus Row_Number technique solves the classic Gaps and Islands streak problem.",
    "number": 203
  },
  {
    "id": "adv-204",
    "title": "204. Stripe: Triangular Monthly Merchant Retention Cohort Matrix",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "Shopify"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nStripe Growth Analytics constructs monthly merchant retention cohorts. Group merchants by their signup month (cohort month), and track the percentage of active merchants in relative month 0, month 1, and month 2.\n\n### Requirements\n- Determine each merchant's cohort_month as the month of their first transaction.\n- Calculate month_index as the number of months elapsed between cohort_month and transaction month.\n- Calculate merchant counts for month_index = 0, 1, and 2.\n- Compute retention percentages rounded to 2 decimal places.\n- Output columns: cohort_month, m0_merchants, m1_merchants, m2_merchants.\n- Sort by cohort_month ascending.\n\n### Input Schema\n**merchant_txns** (id INT, merchant_id INT, txn_date DATE)",
    "schemaSql": "CREATE TABLE merchant_txns (id INT PRIMARY KEY, merchant_id INT, txn_date DATE);\nINSERT INTO merchant_txns VALUES (1, 101, '2024-01-10'), (2, 101, '2024-02-12'), (3, 101, '2024-03-05'), (4, 102, '2024-01-15'), (5, 102, '2024-02-18'), (6, 103, '2024-01-20'), (7, 104, '2024-02-05'), (8, 104, '2024-03-10');",
    "starterSql": "-- 204. Stripe: Triangular Monthly Merchant Retention Cohort Matrix\n-- Output: cohort_month, m0_merchants, m1_merchants, m2_merchants\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cohorts AS (SELECT merchant_id, DATE_TRUNC('month', MIN(txn_date))::DATE AS cohort_month FROM merchant_txns GROUP BY merchant_id), activity AS (SELECT t.merchant_id, c.cohort_month, (EXTRACT(YEAR FROM t.txn_date) - EXTRACT(YEAR FROM c.cohort_month)) * 12 + (EXTRACT(MONTH FROM t.txn_date) - EXTRACT(MONTH FROM c.cohort_month)) AS month_index FROM merchant_txns t JOIN cohorts c ON t.merchant_id = c.merchant_id) SELECT cohort_month, COUNT(DISTINCT CASE WHEN month_index = 0 THEN merchant_id END) AS m0_merchants, COUNT(DISTINCT CASE WHEN month_index = 1 THEN merchant_id END) AS m1_merchants, COUNT(DISTINCT CASE WHEN month_index = 2 THEN merchant_id END) AS m2_merchants FROM activity GROUP BY cohort_month ORDER BY cohort_month ASC;",
    "expectedColumns": [
      "cohort_month",
      "m0_merchants",
      "m1_merchants",
      "m2_merchants"
    ],
    "hints": [
      "Find initial transaction month as cohort_month.",
      "Compute elapsed months index.",
      "Pivoting month_index using conditional COUNT(DISTINCT)."
    ],
    "explanation": "Triangular cohort matrices analyze product stickiness and churn curves across vintage cohorts.",
    "number": 204
  },
  {
    "id": "adv-205",
    "title": "205. AWS: Merging Overlapping Cloud Data Center Downtime Windows",
    "difficulty": "Hard",
    "companies": [
      "AWS",
      "Cloudflare"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAWS Reliability Engineering computes true un-duplicated service outage durations. Multiple monitoring sensors record overlapping downtime intervals for data centers. Merge overlapping and contiguous downtime intervals into consolidated continuous outage periods.\n\n### Requirements\n- Identify overlapping intervals where current start_time <= maximum end_time of preceding intervals.\n- Group connected intervals and calculate consolidated island start and end times.\n- Calculate outage duration in minutes for each merged outage.\n- Output columns: datacenter_id, outage_start, outage_end, outage_minutes.\n- Sort by datacenter_id ascending, outage_start ascending.\n\n### Input Schema\n**downtime_alerts** (id INT, datacenter_id VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE downtime_alerts (id INT PRIMARY KEY, datacenter_id VARCHAR(10), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO downtime_alerts VALUES (1, 'us-east-1', '2025-01-01 10:00:00', '2025-01-01 10:30:00'), (2, 'us-east-1', '2025-01-01 10:15:00', '2025-01-01 11:00:00'), (3, 'us-east-1', '2025-01-01 11:30:00', '2025-01-01 12:00:00'), (4, 'us-west-2', '2025-01-01 14:00:00', '2025-01-01 14:45:00');",
    "starterSql": "-- 205. AWS: Merging Overlapping Cloud Data Center Downtime Windows\n-- Output: datacenter_id, outage_start, outage_end, outage_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT datacenter_id, start_time, end_time, MAX(end_time) OVER (PARTITION BY datacenter_id ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM downtime_alerts), islands AS (SELECT datacenter_id, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY datacenter_id ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT datacenter_id, MIN(start_time) AS outage_start, MAX(end_time) AS outage_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS outage_minutes FROM islands GROUP BY datacenter_id, island_id ORDER BY datacenter_id ASC, outage_start ASC;",
    "expectedColumns": [
      "datacenter_id",
      "outage_start",
      "outage_end",
      "outage_minutes"
    ],
    "hints": [
      "Track running maximum end_time with window frame.",
      "Flag new island when current start > prev max end.",
      "Aggregate MIN(start) and MAX(end) by island_id."
    ],
    "explanation": "Interval merging prevents duplicate time accounting when multiple monitoring probes trigger simultaneously.",
    "number": 205
  },
  {
    "id": "adv-206",
    "title": "206. Apple: Recursive Bill of Materials (BOM) Component Cost Rollup",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Tesla"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM Explosion",
      "Hierarchy"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nApple Hardware Engineering computes total subassembly manufacturing costs for the iPhone 16 Pro. Subcomponents contain child parts at multiple nested hierarchical tiers. Reconstruct the full Bill of Materials tree and compute the rolled-up unit cost for the root parent product.\n\n### Requirements\n- Start with top-level parent product assembly (parent_part_id IS NULL).\n- Recursively traverse component tree multiplying unit quantities down the hierarchy.\n- Calculate total component unit cost contributions.\n- Output columns: root_product_name, total_bom_cost.\n- Sort by root_product_name ascending.\n\n### Input Schema\n**parts_catalog** (part_id INT, parent_part_id INT, part_name VARCHAR, quantity INT, unit_cost NUMERIC)",
    "schemaSql": "CREATE TABLE parts_catalog (part_id INT PRIMARY KEY, parent_part_id INT, part_name VARCHAR(50), quantity INT, unit_cost NUMERIC);\nINSERT INTO parts_catalog VALUES (1, NULL, 'iPhone 16 Pro', 1, 0.0), (2, 1, 'Display Module', 1, 65.00), (3, 1, 'Logic Board Assembly', 1, 110.00), (4, 3, 'A18 Pro SoC', 1, 45.00), (5, 3, 'RAM 8GB LPDDR5X', 2, 15.00), (6, 1, 'Titanium Chassis', 1, 40.00);",
    "starterSql": "-- 206. Apple: Recursive Bill of Materials (BOM) Component Cost Rollup\n-- Output: root_product_name, total_bom_cost\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom AS (SELECT part_id, parent_part_id, part_name, quantity, unit_cost, CAST('iPhone 16 Pro' AS VARCHAR(50)) AS root_product_name FROM parts_catalog WHERE parent_part_id = 1 UNION ALL SELECT c.part_id, c.parent_part_id, c.part_name, b.quantity * c.quantity, c.unit_cost, b.root_product_name FROM parts_catalog c JOIN bom b ON c.parent_part_id = b.part_id) SELECT root_product_name, ROUND(SUM(quantity * unit_cost), 2) AS total_bom_cost FROM bom GROUP BY root_product_name ORDER BY root_product_name ASC;",
    "expectedColumns": [
      "root_product_name",
      "total_bom_cost"
    ],
    "hints": [
      "Traverse from immediate children of root product.",
      "Multiply cumulative quantities recursively.",
      "Sum quantity * unit_cost across leaf components."
    ],
    "explanation": "Recursive BOM explosion models complex manufacturing supply chain costs.",
    "number": 206
  },
  {
    "id": "adv-207",
    "title": "207. PayPal: CDC Event Stream Deduplication with Status Precedence",
    "difficulty": "Hard",
    "companies": [
      "PayPal",
      "Stripe"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CASE WHEN",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nPayPal Core Ledger processes asynchronous Kafka Change Data Capture (CDC) events that may arrive out-of-order. When multiple status updates exist for the same transaction_id, keep the record with highest status precedence ('SUCCESS' > 'PENDING' > 'FAILED'), using the latest updated_at timestamp as a tie-breaker.\n\n### Requirements\n- Assign precedence rank: 'SUCCESS' (1), 'PENDING' (2), 'FAILED' (3).\n- Rank records per transaction_id by status precedence ascending, then by updated_at descending.\n- Filter for the single authoritative current state per transaction.\n- Output columns: transaction_id, status, amount, updated_at.\n- Sort by transaction_id ascending.\n\n### Input Schema\n**payment_cdc** (id INT, transaction_id VARCHAR, status VARCHAR, amount NUMERIC, updated_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE payment_cdc (id INT PRIMARY KEY, transaction_id VARCHAR(20), status VARCHAR(20), amount NUMERIC, updated_at TIMESTAMP);\nINSERT INTO payment_cdc VALUES (1, 'TXN_101', 'PENDING', 150.00, '2025-01-01 10:00:00'), (2, 'TXN_101', 'SUCCESS', 150.00, '2025-01-01 10:01:00'), (3, 'TXN_102', 'PENDING', 80.00, '2025-01-01 10:05:00'), (4, 'TXN_102', 'FAILED', 80.00, '2025-01-01 10:06:00'), (5, 'TXN_103', 'SUCCESS', 220.00, '2025-01-01 11:00:00');",
    "starterSql": "-- 207. PayPal: CDC Event Stream Deduplication with Status Precedence\n-- Output: transaction_id, status, amount, updated_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT transaction_id, status, amount, updated_at, ROW_NUMBER() OVER (PARTITION BY transaction_id ORDER BY CASE status WHEN 'SUCCESS' THEN 1 WHEN 'PENDING' THEN 2 WHEN 'FAILED' THEN 3 ELSE 4 END ASC, updated_at DESC) AS rn FROM payment_cdc) SELECT transaction_id, status, amount, updated_at FROM ranked WHERE rn = 1 ORDER BY transaction_id ASC;",
    "expectedColumns": [
      "transaction_id",
      "status",
      "amount",
      "updated_at"
    ],
    "hints": [
      "Use CASE WHEN to map statuses to numeric precedence.",
      "Use ROW_NUMBER() partitioned by transaction_id.",
      "Select rows where rn = 1."
    ],
    "explanation": "Status precedence ensures eventual consistency across distributed messaging logs.",
    "number": 207
  },
  {
    "id": "adv-208",
    "title": "208. Meta: Multi-Step User Onboarding Funnel Sequence Strict Ordering",
    "difficulty": "Hard",
    "companies": [
      "Meta",
      "Google"
    ],
    "topics": [
      "Funnel Analysis",
      "LEAD",
      "CTEs",
      "Sequence"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nMeta Growth Engineering analyzes user activation funnels. Identify users who completed the strict sequence: 'PROFILE_CREATED' followed immediately by 'PHOTO_UPLOADED', followed immediately by 'FRIEND_REQUESTED' within a 24-hour total span.\n\n### Requirements\n- Use LEAD to identify the next two successive events per user.\n- Verify event 1 is 'PROFILE_CREATED', event 2 is 'PHOTO_UPLOADED', and event 3 is 'FRIEND_REQUESTED'.\n- Verify that elapsed time from event 1 to event 3 is <= 24 hours.\n- Output columns: user_id, funnel_start_time, funnel_complete_time.\n- Sort by user_id ascending, funnel_start_time ascending.\n\n### Input Schema\n**user_funnel_events** (id INT, user_id INT, event_name VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE user_funnel_events (id INT PRIMARY KEY, user_id INT, event_name VARCHAR(50), event_time TIMESTAMP);\nINSERT INTO user_funnel_events VALUES (1, 101, 'PROFILE_CREATED', '2025-01-01 10:00:00'), (2, 101, 'PHOTO_UPLOADED', '2025-01-01 10:15:00'), (3, 101, 'FRIEND_REQUESTED', '2025-01-01 11:00:00'), (4, 102, 'PROFILE_CREATED', '2025-01-01 12:00:00'), (5, 102, 'BROWSE_FEED', '2025-01-01 12:30:00'), (6, 102, 'PHOTO_UPLOADED', '2025-01-01 13:00:00');",
    "starterSql": "-- 208. Meta: Multi-Step User Onboarding Funnel Sequence Strict Ordering\n-- Output: user_id, funnel_start_time, funnel_complete_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH sequences AS (SELECT user_id, event_name, event_time AS funnel_start_time, LEAD(event_name, 1) OVER (PARTITION BY user_id ORDER BY event_time ASC) AS step2_name, LEAD(event_name, 2) OVER (PARTITION BY user_id ORDER BY event_time ASC) AS step3_name, LEAD(event_time, 2) OVER (PARTITION BY user_id ORDER BY event_time ASC) AS funnel_complete_time FROM user_funnel_events) SELECT user_id, funnel_start_time, funnel_complete_time FROM sequences WHERE event_name = 'PROFILE_CREATED' AND step2_name = 'PHOTO_UPLOADED' AND step3_name = 'FRIEND_REQUESTED' AND (funnel_complete_time - funnel_start_time) <= INTERVAL '24 hours' ORDER BY user_id ASC, funnel_start_time ASC;",
    "expectedColumns": [
      "user_id",
      "funnel_start_time",
      "funnel_complete_time"
    ],
    "hints": [
      "Use multi-offset LEAD(event_name, 1) and LEAD(event_name, 2).",
      "Validate strict sequence names in WHERE clause.",
      "Ensure timestamp delta is within 24 hours."
    ],
    "explanation": "Strict sequence funnel analysis evaluates golden onboarding paths for user activation.",
    "number": 208
  },
  {
    "id": "adv-209",
    "title": "209. Amazon: FIFO Inventory Lot Depletion for Customer Shipments",
    "difficulty": "Hard",
    "companies": [
      "Amazon",
      "Target"
    ],
    "topics": [
      "Inventory FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAmazon Fulfillment Centers deplete incoming warehouse inventory lots on a First-In, First-Out (FIFO) basis. Given a total product order demand of 150 units for item 'ECHO_DOT', determine which purchase lots are depleted and the remaining unallocated balance in each lot.\n\n### Requirements\n- Compute running cumulative units available ordered by purchase_date ASC.\n- For total order quantity = 150, calculate allocated_units from each lot.\n- Calculate remaining_lot_units as lot_units minus allocated_units.\n- Only display lots from which units were allocated (allocated_units > 0).\n- Output columns: lot_id, lot_units, allocated_units, remaining_lot_units.\n- Sort by lot_id ascending.\n\n### Input Schema\n**inventory_lots** (lot_id INT, item_sku VARCHAR, purchase_date DATE, lot_units INT)",
    "schemaSql": "CREATE TABLE inventory_lots (lot_id INT PRIMARY KEY, item_sku VARCHAR(20), purchase_date DATE, lot_units INT);\nINSERT INTO inventory_lots VALUES (1, 'ECHO_DOT', '2025-01-01', 80), (2, 'ECHO_DOT', '2025-01-05', 50), (3, 'ECHO_DOT', '2025-01-10', 100), (4, 'ECHO_DOT', '2025-01-15', 40);",
    "starterSql": "-- 209. Amazon: FIFO Inventory Lot Depletion for Customer Shipments\n-- Output: lot_id, lot_units, allocated_units, remaining_lot_units\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum_inventory AS (SELECT lot_id, lot_units, SUM(lot_units) OVER (ORDER BY purchase_date ASC) AS cum_units, COALESCE(SUM(lot_units) OVER (ORDER BY purchase_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM inventory_lots WHERE item_sku = 'ECHO_DOT') SELECT lot_id, lot_units, LEAST(lot_units, GREATEST(0, 150 - prev_cum)) AS allocated_units, lot_units - LEAST(lot_units, GREATEST(0, 150 - prev_cum)) AS remaining_lot_units FROM cum_inventory WHERE prev_cum < 150 ORDER BY lot_id ASC;",
    "expectedColumns": [
      "lot_id",
      "lot_units",
      "allocated_units",
      "remaining_lot_units"
    ],
    "hints": [
      "Use running cumulative sum to track lot boundaries.",
      "Calculate allocation using LEAST(lot_units, GREATEST(0, demand - prev_cum)).",
      "Filter where previous cumulative sum is below total demand."
    ],
    "explanation": "FIFO inventory depletion algorithms track cost-of-goods-sold and expiration turnover.",
    "number": 209
  },
  {
    "id": "adv-210",
    "title": "210. Citadel: High-Frequency Triangular Currency Arbitrage Opportunity",
    "difficulty": "Hard",
    "companies": [
      "Citadel",
      "Jane Street"
    ],
    "topics": [
      "Arbitrage",
      "CROSS JOIN",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCitadel FX Algorithmic Trading identifies triangular cross-currency arbitrage cycles. Check whether converting USD -> Currency A -> Currency B -> USD yields a net positive return (implied cross rate strictly > 1.0005, capturing a 5+ bps net gain).\n\n### Requirements\n- Join exchange rate pairs for USD -> Currency A (pair1), A -> B (pair2), and B -> USD (pair3).\n- Calculate cycle_return as rate1 * rate2 * rate3.\n- Filter for cycles where cycle_return > 1.0005.\n- Output columns: currency_a, currency_b, cycle_return.\n- Sort by cycle_return descending, then by currency_a ascending.\n\n### Input Schema\n**fx_rates** (id INT, base_curr VARCHAR, quote_curr VARCHAR, exchange_rate NUMERIC)",
    "schemaSql": "CREATE TABLE fx_rates (id INT PRIMARY KEY, base_curr VARCHAR(5), quote_curr VARCHAR(5), exchange_rate NUMERIC);\nINSERT INTO fx_rates VALUES (1, 'USD', 'EUR', 0.9600), (2, 'EUR', 'GBP', 0.8500), (3, 'GBP', 'USD', 1.2300), (4, 'USD', 'JPY', 152.00), (5, 'JPY', 'EUR', 0.0063), (6, 'EUR', 'USD', 1.0420);",
    "starterSql": "-- 210. Citadel: High-Frequency Triangular Currency Arbitrage Opportunity\n-- Output: currency_a, currency_b, cycle_return\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT r1.quote_curr AS currency_a, r2.quote_curr AS currency_b, ROUND(r1.exchange_rate * r2.exchange_rate * r3.exchange_rate, 4) AS cycle_return FROM fx_rates r1 JOIN fx_rates r2 ON r1.quote_curr = r2.base_curr JOIN fx_rates r3 ON r2.quote_curr = r3.base_curr WHERE r1.base_curr = 'USD' AND r3.quote_curr = 'USD' AND (r1.exchange_rate * r2.exchange_rate * r3.exchange_rate) > 1.0005 ORDER BY cycle_return DESC, currency_a ASC;",
    "expectedColumns": [
      "currency_a",
      "currency_b",
      "cycle_return"
    ],
    "hints": [
      "Join fx_rates on quote_curr = base_curr forming a 3-legged circle starting and ending in USD.",
      "Multiply rates across legs.",
      "Filter where product exceeds 1.0005."
    ],
    "explanation": "Triangular arbitrage opportunities exploit brief pricing dislocations across multi-currency order books.",
    "number": 210
  },
  {
    "id": "adv-211",
    "title": "211. Netflix: Binge Viewing Sessionization with 45-Minute Inactivity Window",
    "difficulty": "Hard",
    "companies": [
      "Netflix",
      "Hulu"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nNetflix Recommendation Systems aggregates episode viewing logs into continuous binge sessions. An active binge session lapses if a subscriber pauses viewing for strictly more than 45 minutes. Identify all binge sessions containing 3 or more episodes.\n\n### Requirements\n- Use LAG to calculate minutes elapsed between consecutive episode watch timestamps.\n- Flag new session when elapsed minutes > 45 or on first user episode.\n- Generate a sequential session_id per user.\n- Filter for sessions containing 3 or more total episodes.\n- Output columns: user_id, session_id, episode_count, session_start.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**view_stream_logs** (id INT, user_id INT, show_id INT, watch_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE view_stream_logs (id INT PRIMARY KEY, user_id INT, show_id INT, watch_time TIMESTAMP);\nINSERT INTO view_stream_logs VALUES (1, 101, 501, '2025-01-01 18:00:00'), (2, 101, 501, '2025-01-01 18:35:00'), (3, 101, 501, '2025-01-01 19:10:00'), (4, 101, 501, '2025-01-01 21:00:00'), (5, 102, 502, '2025-01-01 20:00:00'), (6, 102, 502, '2025-01-01 20:30:00');",
    "starterSql": "-- 211. Netflix: Binge Viewing Sessionization with 45-Minute Inactivity Window\n-- Output: user_id, session_id, episode_count, session_start\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, watch_time, CASE WHEN LAG(watch_time) OVER (PARTITION BY user_id ORDER BY watch_time ASC) IS NULL OR (watch_time - LAG(watch_time) OVER (PARTITION BY user_id ORDER BY watch_time ASC)) > INTERVAL '45 minutes' THEN 1 ELSE 0 END AS is_new_session FROM view_stream_logs), sessions AS (SELECT user_id, watch_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY watch_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, COUNT(*) AS episode_count, MIN(watch_time) AS session_start FROM sessions GROUP BY user_id, session_id HAVING COUNT(*) >= 3 ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "episode_count",
      "session_start"
    ],
    "hints": [
      "Flag session starts with LAG > 45 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Filter HAVING COUNT(*) >= 3."
    ],
    "explanation": "Binge identification personalizes next-episode auto-play recommendations.",
    "number": 211
  },
  {
    "id": "adv-212",
    "title": "212. GitHub: Recursive Git Commit Tree Ancestry to Root Initial Commit",
    "difficulty": "Hard",
    "companies": [
      "GitHub",
      "GitLab"
    ],
    "topics": [
      "WITH RECURSIVE",
      "DAG",
      "Ancestry"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nGitHub Repository Insights traverses directed acyclic graph (DAG) commit trees. Given a feature branch tip commit ('C5'), find all ancestor commits back to the initial repository root commit and calculate distance depth from the tip.\n\n### Requirements\n- Start with commit_hash = 'C5' at commit_depth = 0.\n- Recursively follow parent_hash to find previous ancestor commits, incrementing commit_depth by 1.\n- Output columns: commit_hash, parent_hash, commit_depth.\n- Sort by commit_depth ascending.\n\n### Input Schema\n**git_commits** (commit_hash VARCHAR(10), parent_hash VARCHAR(10), commit_message VARCHAR(100))",
    "schemaSql": "CREATE TABLE git_commits (commit_hash VARCHAR(10) PRIMARY KEY, parent_hash VARCHAR(10), commit_message VARCHAR(100));\nINSERT INTO git_commits VALUES ('C1', NULL, 'Initial commit'), ('C2', 'C1', 'Add README'), ('C3', 'C2', 'Setup database schema'), ('C4', 'C3', 'Implement auth API'), ('C5', 'C4', 'Add OAuth unit tests');",
    "starterSql": "-- 212. GitHub: Recursive Git Commit Tree Ancestry to Root Initial Commit\n-- Output: commit_hash, parent_hash, commit_depth\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE ancestry AS (SELECT commit_hash, parent_hash, 0 AS commit_depth FROM git_commits WHERE commit_hash = 'C5' UNION ALL SELECT g.commit_hash, g.parent_hash, a.commit_depth + 1 FROM git_commits g JOIN ancestry a ON g.commit_hash = a.parent_hash) SELECT commit_hash, parent_hash, commit_depth FROM ancestry ORDER BY commit_depth ASC;",
    "expectedColumns": [
      "commit_hash",
      "parent_hash",
      "commit_depth"
    ],
    "hints": [
      "Start recursion at leaf commit 'C5'.",
      "Join parent_hash to commit_hash.",
      "Increment depth counter."
    ],
    "explanation": "Git commit DAG traversal models git log and merge-base resolution.",
    "number": 212
  },
  {
    "id": "adv-213",
    "title": "213. GitHub: Longest Consecutive Daily Contribution Streak",
    "difficulty": "Hard",
    "companies": [
      "GitHub",
      "LeetCode"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nGitHub Profile Analytics rewards developer contribution consistency. Find the longest consecutive daily contribution streak achieved by each developer.\n\n### Requirements\n- Group consecutive calendar dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak_days for each continuous contribution island.\n- Find maximum streak achieved per developer.\n- Output columns: developer_name, max_streak_days.\n- Sort by max_streak_days descending, then by developer_name ascending.\n\n### Input Schema\n**developer_contributions** (id INT, developer_name VARCHAR, contribution_date DATE)",
    "schemaSql": "CREATE TABLE developer_contributions (id INT PRIMARY KEY, developer_name VARCHAR(50), contribution_date DATE);\nINSERT INTO developer_contributions VALUES (1, 'Torvalds', '2025-01-01'), (2, 'Torvalds', '2025-01-02'), (3, 'Torvalds', '2025-01-03'), (4, 'Torvalds', '2025-01-04'), (5, 'Torvalds', '2025-01-06'), (6, 'VanRossum', '2025-01-01'), (7, 'VanRossum', '2025-01-02'), (8, 'VanRossum', '2025-01-05');",
    "starterSql": "-- 213. GitHub: Longest Consecutive Daily Contribution Streak\n-- Output: developer_name, max_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_days AS (SELECT DISTINCT developer_name, contribution_date FROM developer_contributions), grouped AS (SELECT developer_name, contribution_date, contribution_date - (ROW_NUMBER() OVER (PARTITION BY developer_name ORDER BY contribution_date ASC) * INTERVAL '1 day') AS grp FROM distinct_days), streaks AS (SELECT developer_name, grp, COUNT(*) AS streak_days FROM grouped GROUP BY developer_name, grp) SELECT developer_name, MAX(streak_days) AS max_streak_days FROM streaks GROUP BY developer_name ORDER BY max_streak_days DESC, developer_name ASC;",
    "expectedColumns": [
      "developer_name",
      "max_streak_days"
    ],
    "hints": [
      "Partition by developer_name ordered by date.",
      "Subtract ROW_NUMBER days.",
      "Find MAX streak length."
    ],
    "explanation": "Contribution streaks gamify open source development engagement.",
    "number": 213
  },
  {
    "id": "adv-214",
    "title": "214. Spotify: Artist Monthly Listener Retention Cohort Decay",
    "difficulty": "Hard",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSpotify for Artists measures listener loyalty following album releases. For listeners who first streamed an artist in January 2024 (Cohort 2024-01), compute the number of active listeners who returned in month 0, month 1, and month 2.\n\n### Requirements\n- Filter for listeners whose first stream date was in '2024-01'.\n- Calculate month_index (0 for Jan, 1 for Feb, 2 for Mar).\n- Output columns: artist_name, m0_listeners, m1_listeners, m2_listeners.\n- Sort by artist_name ascending.\n\n### Input Schema\n**artist_streams** (id INT, artist_name VARCHAR, user_id INT, stream_date DATE)",
    "schemaSql": "CREATE TABLE artist_streams (id INT PRIMARY KEY, artist_name VARCHAR(50), user_id INT, stream_date DATE);\nINSERT INTO artist_streams VALUES (1, 'Billie Eilish', 101, '2024-01-05'), (2, 'Billie Eilish', 101, '2024-02-14'), (3, 'Billie Eilish', 101, '2024-03-20'), (4, 'Billie Eilish', 102, '2024-01-10'), (5, 'Billie Eilish', 102, '2024-02-18'), (6, 'Billie Eilish', 103, '2024-01-15'), (7, 'Chappell Roan', 104, '2024-01-02'), (8, 'Chappell Roan', 104, '2024-03-01');",
    "starterSql": "-- 214. Spotify: Artist Monthly Listener Retention Cohort Decay\n-- Output: artist_name, m0_listeners, m1_listeners, m2_listeners\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_listen AS (SELECT artist_name, user_id, MIN(stream_date) AS first_date FROM artist_streams GROUP BY artist_name, user_id HAVING DATE_TRUNC('month', MIN(stream_date)) = '2024-01-01'::DATE), activity AS (SELECT a.artist_name, a.user_id, (EXTRACT(YEAR FROM s.stream_date) - EXTRACT(YEAR FROM a.first_date)) * 12 + (EXTRACT(MONTH FROM s.stream_date) - EXTRACT(MONTH FROM a.first_date)) AS month_index FROM first_listen a JOIN artist_streams s ON a.artist_name = s.artist_name AND a.user_id = s.user_id) SELECT artist_name, COUNT(DISTINCT CASE WHEN month_index = 0 THEN user_id END) AS m0_listeners, COUNT(DISTINCT CASE WHEN month_index = 1 THEN user_id END) AS m1_listeners, COUNT(DISTINCT CASE WHEN month_index = 2 THEN user_id END) AS m2_listeners FROM activity GROUP BY artist_name ORDER BY artist_name ASC;",
    "expectedColumns": [
      "artist_name",
      "m0_listeners",
      "m1_listeners",
      "m2_listeners"
    ],
    "hints": [
      "Filter for users whose MIN(stream_date) falls in Jan 2024.",
      "Calculate relative month index.",
      "Aggregate distinct users per index."
    ],
    "explanation": "Listener retention curves quantify album launch staying power.",
    "number": 214
  },
  {
    "id": "adv-215",
    "title": "215. Cloudflare: Overlapping DDoS Attack Interval Consolidation",
    "difficulty": "Hard",
    "companies": [
      "Cloudflare",
      "Fastly"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCloudflare Threat Intelligence consolidates overlapping distributed denial-of-service (DDoS) attack telemetry alerts. Multiple edge scrubbing centers detect attacks that overlap in time for the same zone. Merge overlapping attacks into contiguous unified incident windows.\n\n### Requirements\n- Track the cumulative maximum end_time across prior alerts in each zone.\n- Group overlapping and contiguous intervals into distinct incidents.\n- Calculate total attack duration in minutes for each merged incident.\n- Output columns: zone_id, attack_start, attack_end, attack_duration_minutes.\n- Sort by zone_id ascending, attack_start ascending.\n\n### Input Schema\n**ddos_alerts** (id INT, zone_id VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE ddos_alerts (id INT PRIMARY KEY, zone_id VARCHAR(20), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO ddos_alerts VALUES (1, 'crypto-exchange.com', '2025-01-01 02:00:00', '2025-01-01 02:40:00'), (2, 'crypto-exchange.com', '2025-01-01 02:20:00', '2025-01-01 03:10:00'), (3, 'crypto-exchange.com', '2025-01-01 04:00:00', '2025-01-01 04:30:00'), (4, 'fintech-bank.org', '2025-01-01 08:00:00', '2025-01-01 08:50:00');",
    "starterSql": "-- 215. Cloudflare: Overlapping DDoS Attack Interval Consolidation\n-- Output: zone_id, attack_start, attack_end, attack_duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT zone_id, start_time, end_time, MAX(end_time) OVER (PARTITION BY zone_id ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM ddos_alerts), islands AS (SELECT zone_id, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY zone_id ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT zone_id, MIN(start_time) AS attack_start, MAX(end_time) AS attack_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS attack_duration_minutes FROM islands GROUP BY zone_id, island_id ORDER BY zone_id ASC, attack_start ASC;",
    "expectedColumns": [
      "zone_id",
      "attack_start",
      "attack_end",
      "attack_duration_minutes"
    ],
    "hints": [
      "Compare current start against running max end time.",
      "Create island ID with running sum.",
      "Calculate MIN(start) and MAX(end) by island."
    ],
    "explanation": "Consolidating overlapping security incidents provides accurate net mitigation duration.",
    "number": 215
  },
  {
    "id": "adv-216",
    "title": "216. Boeing: Aircraft Wing Assembly Multi-Level Part Tree Explosion",
    "difficulty": "Hard",
    "companies": [
      "Boeing",
      "Lockheed Martin"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nBoeing Commercial Airplanes tracks 787 Dreamliner assembly bill of materials. Calculate the cumulative quantity of each subcomponent required to manufacture one complete 'Wing Assembly'.\n\n### Requirements\n- Start with top-level assembly where parent_id IS NULL.\n- Recursively calculate total required units by multiplying parent quantity by child component quantity.\n- Filter for leaf parts (parts that are not parents to any other part).\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**aircraft_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE aircraft_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO aircraft_bom VALUES (1, NULL, 'Wing Assembly', 1), (2, 1, 'Flap Mechanism', 2), (3, 1, 'Fuel Tank Liner', 1), (4, 2, 'Hydraulic Actuator', 4), (5, 2, 'Titanium Hinge Pin', 8), (6, 3, 'Sealant Gasket', 12);",
    "starterSql": "-- 216. Boeing: Aircraft Wing Assembly Multi-Level Part Tree Explosion\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM aircraft_bom WHERE parent_id IS NULL UNION ALL SELECT b.id, b.parent_id, b.part_name, t.total_qty * b.quantity FROM aircraft_bom b JOIN bom_tree t ON b.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM aircraft_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse recursively multiplying parent quantity by child quantity.",
      "Identify leaf parts using NOT IN (SELECT parent_id).",
      "Sort by total units descending."
    ],
    "explanation": "Manufacturing MRP systems rely on recursive BOM explosions to schedule component procurement.",
    "number": 216
  },
  {
    "id": "adv-217",
    "title": "217. Square: POS Terminal Offline Transaction Idempotency Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Square",
      "Stripe"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSquare Point-of-Sale handles network retries during spotty connectivity. A terminal may upload duplicate transaction events with identical client_txn_id. Select the single authoritative transaction record with the latest server_received_at timestamp.\n\n### Requirements\n- Partition records by client_txn_id.\n- Order by server_received_at descending to prioritize the latest update.\n- Filter for rank = 1.\n- Output columns: client_txn_id, merchant_id, amount, server_received_at.\n- Sort by client_txn_id ascending.\n\n### Input Schema\n**pos_sync_events** (id INT, client_txn_id VARCHAR, merchant_id INT, amount NUMERIC, server_received_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE pos_sync_events (id INT PRIMARY KEY, client_txn_id VARCHAR(20), merchant_id INT, amount NUMERIC, server_received_at TIMESTAMP);\nINSERT INTO pos_sync_events VALUES (1, 'OFFLINE_901', 10, 45.00, '2025-01-01 12:00:00'), (2, 'OFFLINE_901', 10, 45.00, '2025-01-01 12:00:05'), (3, 'OFFLINE_902', 10, 120.00, '2025-01-01 12:10:00'), (4, 'OFFLINE_903', 11, 15.50, '2025-01-01 13:00:00'), (5, 'OFFLINE_903', 11, 15.50, '2025-01-01 13:00:10');",
    "starterSql": "-- 217. Square: POS Terminal Offline Transaction Idempotency Deduplication\n-- Output: client_txn_id, merchant_id, amount, server_received_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT client_txn_id, merchant_id, amount, server_received_at, ROW_NUMBER() OVER (PARTITION BY client_txn_id ORDER BY server_received_at DESC) AS rn FROM pos_sync_events) SELECT client_txn_id, merchant_id, amount, server_received_at FROM ranked WHERE rn = 1 ORDER BY client_txn_id ASC;",
    "expectedColumns": [
      "client_txn_id",
      "merchant_id",
      "amount",
      "server_received_at"
    ],
    "hints": [
      "Use ROW_NUMBER() partitioned by client_txn_id ordered by server_received_at DESC.",
      "Filter where rn = 1.",
      "Order by client_txn_id ASC."
    ],
    "explanation": "Idempotency keys prevent double billing when mobile POS devices retry offline batches.",
    "number": 217
  },
  {
    "id": "adv-218",
    "title": "218. Uber: Rider Ride Request to Pickup Funnel Drop-Off Sequence",
    "difficulty": "Hard",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nUber Rider Ops tracks ride fulfillment progression. Identify rides that completed the exact 3-step sequence: 'RIDE_REQUESTED' -> 'DRIVER_MATCHED' -> 'PICKUP_COMPLETED' in chronological order within 30 minutes.\n\n### Requirements\n- Use LEAD to inspect next event name and timestamp for the same ride_id.\n- Check that event 1 = 'RIDE_REQUESTED', event 2 = 'DRIVER_MATCHED', and event 3 = 'PICKUP_COMPLETED'.\n- Check that elapsed minutes from request to pickup <= 30.\n- Output columns: ride_id, request_time, pickup_time.\n- Sort by ride_id ascending.\n\n### Input Schema\n**ride_status_logs** (id INT, ride_id INT, status VARCHAR, status_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE ride_status_logs (id INT PRIMARY KEY, ride_id INT, status VARCHAR(30), status_time TIMESTAMP);\nINSERT INTO ride_status_logs VALUES (1, 101, 'RIDE_REQUESTED', '2025-01-01 14:00:00'), (2, 101, 'DRIVER_MATCHED', '2025-01-01 14:03:00'), (3, 101, 'PICKUP_COMPLETED', '2025-01-01 14:18:00'), (4, 102, 'RIDE_REQUESTED', '2025-01-01 15:00:00'), (5, 102, 'RIDER_CANCELLED', '2025-01-01 15:05:00');",
    "starterSql": "-- 218. Uber: Rider Ride Request to Pickup Funnel Drop-Off Sequence\n-- Output: ride_id, request_time, pickup_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT ride_id, status, status_time AS request_time, LEAD(status, 1) OVER (PARTITION BY ride_id ORDER BY status_time ASC) AS next_status, LEAD(status, 2) OVER (PARTITION BY ride_id ORDER BY status_time ASC) AS final_status, LEAD(status_time, 2) OVER (PARTITION BY ride_id ORDER BY status_time ASC) AS pickup_time FROM ride_status_logs) SELECT ride_id, request_time, pickup_time FROM seq WHERE status = 'RIDE_REQUESTED' AND next_status = 'DRIVER_MATCHED' AND final_status = 'PICKUP_COMPLETED' AND (pickup_time - request_time) <= INTERVAL '30 minutes' ORDER BY ride_id ASC;",
    "expectedColumns": [
      "ride_id",
      "request_time",
      "pickup_time"
    ],
    "hints": [
      "Apply LEAD(status, 1) and LEAD(status, 2).",
      "Verify full 3-step status sequence.",
      "Filter for duration <= 30 minutes."
    ],
    "explanation": "Sequential funnel audits uncover driver match cancellations and rider abandonment.",
    "number": 218
  },
  {
    "id": "adv-219",
    "title": "219. Robinhood: FIFO Share Lot Capital Gains Calculation",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Charles Schwab"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nRobinhood Tax Services computes realized capital gains for IRS Form 1099-B using FIFO cost basis. An investor sells 60 shares of AAPL at $240/share. Deplete buy lots in chronological order and compute total realized profit.\n\n### Requirements\n- Track cumulative buy share counts ordered by buy_date ASC.\n- Allocate shares sold (60 shares) across purchase lots.\n- Compute profit as allocated_shares * (240 - buy_price).\n- Output columns: lot_id, shares_sold_from_lot, buy_price, realized_gain.\n- Sort by lot_id ascending.\n\n### Input Schema\n**stock_lots** (lot_id INT, ticker VARCHAR, buy_date DATE, shares INT, buy_price NUMERIC)",
    "schemaSql": "CREATE TABLE stock_lots (lot_id INT PRIMARY KEY, ticker VARCHAR(10), buy_date DATE, shares INT, buy_price NUMERIC);\nINSERT INTO stock_lots VALUES (1, 'AAPL', '2024-01-15', 30, 180.00), (2, 'AAPL', '2024-04-10', 40, 200.00), (3, 'AAPL', '2024-08-20', 50, 220.00);",
    "starterSql": "-- 219. Robinhood: FIFO Share Lot Capital Gains Calculation\n-- Output: lot_id, shares_sold_from_lot, buy_price, realized_gain\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT lot_id, shares, buy_price, SUM(shares) OVER (ORDER BY buy_date ASC) AS cum_shares, COALESCE(SUM(shares) OVER (ORDER BY buy_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM stock_lots WHERE ticker = 'AAPL') SELECT lot_id, LEAST(shares, GREATEST(0, 60 - prev_cum)) AS shares_sold_from_lot, buy_price, ROUND(LEAST(shares, GREATEST(0, 60 - prev_cum)) * (240.00 - buy_price), 2) AS realized_gain FROM cum WHERE prev_cum < 60 ORDER BY lot_id ASC;",
    "expectedColumns": [
      "lot_id",
      "shares_sold_from_lot",
      "buy_price",
      "realized_gain"
    ],
    "hints": [
      "Use running cumulative sum to establish FIFO lot boundaries.",
      "Calculate allocated shares with LEAST and GREATEST.",
      "Multiply allocated shares by price difference."
    ],
    "explanation": "FIFO cost basis tracking is mandated by standard tax accounting rules.",
    "number": 219
  },
  {
    "id": "adv-220",
    "title": "220. Jane Street: ETF Component Basket Arbitrage Discrepancy Scanner",
    "difficulty": "Hard",
    "companies": [
      "Jane Street",
      "Citadel"
    ],
    "topics": [
      "JOIN",
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nJane Street ETF Market Making identifies synthetic arbitrage creation/redemption spreads. Calculate the aggregate Net Asset Value (NAV) of an ETF based on constituent share prices and quantities, and compare it against the ETF's live traded market price.\n\n### Requirements\n- Calculate synthetic NAV as sum of (constituent share_price * basket_shares).\n- Calculate arb_spread as live_etf_price minus synthetic NAV, rounded to 2 decimal places.\n- Output columns: etf_ticker, live_etf_price, synthetic_nav, arb_spread.\n- Sort by ABS(arb_spread) descending, then by etf_ticker ascending.\n\n### Input Schema\n**etf_market** (etf_ticker VARCHAR, live_etf_price NUMERIC)\n\n**etf_basket** (id INT, etf_ticker VARCHAR, constituent_ticker VARCHAR, basket_shares NUMERIC, share_price NUMERIC)",
    "schemaSql": "CREATE TABLE etf_market (etf_ticker VARCHAR(10) PRIMARY KEY, live_etf_price NUMERIC);\nCREATE TABLE etf_basket (id INT PRIMARY KEY, etf_ticker VARCHAR(10), constituent_ticker VARCHAR(10), basket_shares NUMERIC, share_price NUMERIC);\nINSERT INTO etf_market VALUES ('TECH_ETF', 525.00), ('FIN_ETF', 310.00);\nINSERT INTO etf_basket VALUES (1, 'TECH_ETF', 'AAPL', 1.5, 220.00), (2, 'TECH_ETF', 'MSFT', 0.5, 410.00), (3, 'FIN_ETF', 'JPM', 1.0, 200.00), (4, 'FIN_ETF', 'BAC', 2.5, 42.00);",
    "starterSql": "-- 220. Jane Street: ETF Component Basket Arbitrage Discrepancy Scanner\n-- Output: etf_ticker, live_etf_price, synthetic_nav, arb_spread\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT m.etf_ticker, m.live_etf_price, ROUND(SUM(b.basket_shares * b.share_price), 2) AS synthetic_nav, ROUND(m.live_etf_price - SUM(b.basket_shares * b.share_price), 2) AS arb_spread FROM etf_market m JOIN etf_basket b ON m.etf_ticker = b.etf_ticker GROUP BY m.etf_ticker, m.live_etf_price ORDER BY ABS(m.live_etf_price - SUM(b.basket_shares * b.share_price)) DESC, m.etf_ticker ASC;",
    "expectedColumns": [
      "etf_ticker",
      "live_etf_price",
      "synthetic_nav",
      "arb_spread"
    ],
    "hints": [
      "Join ETF market price with basket constituents.",
      "Sum component weights * prices to compute NAV.",
      "Compute arbitrage spread."
    ],
    "explanation": "Authorized participants redeem or create ETF baskets when market prices diverge from underlying NAV.",
    "number": 220
  },
  {
    "id": "adv-221",
    "title": "221. TikTok: Video Swiping Sessionization with 15-Minute Inactivity Timeout",
    "difficulty": "Hard",
    "companies": [
      "TikTok",
      "Meta"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nTikTok Feed Engagement defines continuous viewing sessions. If a user does not swipe to a new video for more than 15 minutes, the previous session expires. Identify each user session, its start time, and total videos watched.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior video view.\n- Flag new session when elapsed time > 15 minutes or on first view.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, videos_watched.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**swipe_logs** (id INT, user_id INT, video_id INT, swipe_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE swipe_logs (id INT PRIMARY KEY, user_id INT, video_id INT, swipe_time TIMESTAMP);\nINSERT INTO swipe_logs VALUES (1, 101, 801, '2025-01-01 12:00:00'), (2, 101, 802, '2025-01-01 12:05:00'), (3, 101, 803, '2025-01-01 12:12:00'), (4, 101, 804, '2025-01-01 12:40:00'), (5, 102, 805, '2025-01-01 13:00:00'), (6, 102, 806, '2025-01-01 13:08:00');",
    "starterSql": "-- 221. TikTok: Video Swiping Sessionization with 15-Minute Inactivity Timeout\n-- Output: user_id, session_id, session_start, videos_watched\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, swipe_time, CASE WHEN LAG(swipe_time) OVER (PARTITION BY user_id ORDER BY swipe_time ASC) IS NULL OR (swipe_time - LAG(swipe_time) OVER (PARTITION BY user_id ORDER BY swipe_time ASC)) > INTERVAL '15 minutes' THEN 1 ELSE 0 END AS is_new_session FROM swipe_logs), sessions AS (SELECT user_id, swipe_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY swipe_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(swipe_time) AS session_start, COUNT(*) AS videos_watched FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "videos_watched"
    ],
    "hints": [
      "Flag session starts with LAG > 15 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Mobile micro-sessionization analyzes user retention throughout the day.",
    "number": 221
  },
  {
    "id": "adv-222",
    "title": "222. Snowflake: Recursive Role-Based Access Control (RBAC) Privilege Inheritance",
    "difficulty": "Hard",
    "companies": [
      "Snowflake",
      "Databricks"
    ],
    "topics": [
      "WITH RECURSIVE",
      "RBAC",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSnowflake Security Governance models hierarchical role inheritance. In Snowflake RBAC, parent roles inherit all permissions granted to child roles. Given an initial parent role ('SECURITYADMIN'), find all directly and indirectly inherited roles and their inheritance depth.\n\n### Requirements\n- Start with initial parent_role = 'SECURITYADMIN' at depth 0.\n- Recursively join child_role to parent_role to find inherited roles.\n- Output columns: parent_role, inherited_role, inheritance_depth.\n- Sort by inheritance_depth ascending, then by inherited_role ascending.\n\n### Input Schema\n**role_grants** (id INT, parent_role VARCHAR, child_role VARCHAR)",
    "schemaSql": "CREATE TABLE role_grants (id INT PRIMARY KEY, parent_role VARCHAR(50), child_role VARCHAR(50));\nINSERT INTO role_grants VALUES (1, 'SECURITYADMIN', 'USERADMIN'), (2, 'USERADMIN', 'AUDIT_READER'), (3, 'AUDIT_READER', 'COMPLIANCE_VIEWER'), (4, 'SYSADMIN', 'ENGINEER');",
    "starterSql": "-- 222. Snowflake: Recursive Role-Based Access Control (RBAC) Privilege Inheritance\n-- Output: parent_role, inherited_role, inheritance_depth\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE role_tree AS (SELECT parent_role, child_role AS inherited_role, 1 AS inheritance_depth FROM role_grants WHERE parent_role = 'SECURITYADMIN' UNION ALL SELECT r.parent_role, g.child_role, r.inheritance_depth + 1 FROM role_grants g JOIN role_tree r ON g.parent_role = r.inherited_role) SELECT 'SECURITYADMIN' AS parent_role, inherited_role, inheritance_depth FROM role_tree ORDER BY inheritance_depth ASC, inherited_role ASC;",
    "expectedColumns": [
      "parent_role",
      "inherited_role",
      "inheritance_depth"
    ],
    "hints": [
      "Start recursion where parent_role = 'SECURITYADMIN'.",
      "Join child role to next parent.",
      "Increment inheritance depth."
    ],
    "explanation": "Recursive security graph traversal enforces least-privilege compliance auditing.",
    "number": 222
  },
  {
    "id": "adv-223",
    "title": "223. Strava: Consecutive Day Running Streak Leaderboard",
    "difficulty": "Hard",
    "companies": [
      "Strava",
      "Duolingo"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nStrava Challenges rewards athletes who run every single day. For each runner, calculate their longest consecutive daily run streak in calendar days.\n\n### Requirements\n- Group consecutive calendar run dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each athlete.\n- Output columns: athlete_name, max_streak_days.\n- Sort by max_streak_days descending, then by athlete_name ascending.\n\n### Input Schema\n**athlete_runs** (id INT, athlete_name VARCHAR, run_date DATE)",
    "schemaSql": "CREATE TABLE athlete_runs (id INT PRIMARY KEY, athlete_name VARCHAR(50), run_date DATE);\nINSERT INTO athlete_runs VALUES (1, 'Eliud Kipchoge', '2025-01-01'), (2, 'Eliud Kipchoge', '2025-01-02'), (3, 'Eliud Kipchoge', '2025-01-03'), (4, 'Eliud Kipchoge', '2025-01-04'), (5, 'Eliud Kipchoge', '2025-01-06'), (6, 'Kenenisa Bekele', '2025-01-01'), (7, 'Kenenisa Bekele', '2025-01-02');",
    "starterSql": "-- 223. Strava: Consecutive Day Running Streak Leaderboard\n-- Output: athlete_name, max_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_runs AS (SELECT DISTINCT athlete_name, run_date FROM athlete_runs), grouped AS (SELECT athlete_name, run_date, run_date - (ROW_NUMBER() OVER (PARTITION BY athlete_name ORDER BY run_date ASC) * INTERVAL '1 day') AS grp FROM distinct_runs), streaks AS (SELECT athlete_name, grp, COUNT(*) AS streak_days FROM grouped GROUP BY athlete_name, grp) SELECT athlete_name, MAX(streak_days) AS max_streak_days FROM streaks GROUP BY athlete_name ORDER BY max_streak_days DESC, athlete_name ASC;",
    "expectedColumns": [
      "athlete_name",
      "max_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from run_date.",
      "Group by athlete and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Streak tracking forms the psychological foundation of fitness habit formation.",
    "number": 223
  },
  {
    "id": "adv-224",
    "title": "224. Shopify: Merchant First-Sale Cohort LTV Expansion Matrix",
    "difficulty": "Hard",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nShopify Merchant Success benchmarks merchant GMV growth over quarters. For merchants who made their first sale in Q1 2024 (Cohort 2024-Q1), compute total GMV generated in Q1 2024 (Q0), Q2 2024 (Q1), and Q3 2024 (Q2).\n\n### Requirements\n- Filter for merchants whose earliest sale was in Q1 2024 (2024-01-01 to 2024-03-31).\n- Calculate quarterly GMV for relative quarters: q0_gmv, q1_gmv, q2_gmv.\n- Round all values to 2 decimal places.\n- Output columns: cohort_name, q0_gmv, q1_gmv, q2_gmv.\n- Sort by cohort_name ascending.\n\n### Input Schema\n**merchant_sales** (id INT, merchant_id INT, sale_date DATE, amount NUMERIC)",
    "schemaSql": "CREATE TABLE merchant_sales (id INT PRIMARY KEY, merchant_id INT, sale_date DATE, amount NUMERIC);\nINSERT INTO merchant_sales VALUES (1, 101, '2024-01-15', 500.00), (2, 101, '2024-04-20', 1200.00), (3, 101, '2024-07-10', 2500.00), (4, 102, '2024-02-10', 800.00), (5, 102, '2024-05-15', 1500.00), (6, 103, '2024-03-01', 300.00);",
    "starterSql": "-- 224. Shopify: Merchant First-Sale Cohort LTV Expansion Matrix\n-- Output: cohort_name, q0_gmv, q1_gmv, q2_gmv\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_sale AS (SELECT merchant_id, MIN(sale_date) AS min_date FROM merchant_sales GROUP BY merchant_id HAVING MIN(sale_date) BETWEEN '2024-01-01' AND '2024-03-31'), activity AS (SELECT s.merchant_id, s.amount, CASE WHEN s.sale_date BETWEEN '2024-01-01' AND '2024-03-31' THEN 0 WHEN s.sale_date BETWEEN '2024-04-01' AND '2024-06-30' THEN 1 WHEN s.sale_date BETWEEN '2024-07-01' AND '2024-09-30' THEN 2 END AS q_idx FROM merchant_sales s JOIN first_sale f ON s.merchant_id = f.merchant_id) SELECT '2024-Q1' AS cohort_name, ROUND(SUM(CASE WHEN q_idx = 0 THEN amount ELSE 0 END), 2) AS q0_gmv, ROUND(SUM(CASE WHEN q_idx = 1 THEN amount ELSE 0 END), 2) AS q1_gmv, ROUND(SUM(CASE WHEN q_idx = 2 THEN amount ELSE 0 END), 2) AS q2_gmv FROM activity GROUP BY cohort_name ORDER BY cohort_name ASC;",
    "expectedColumns": [
      "cohort_name",
      "q0_gmv",
      "q1_gmv",
      "q2_gmv"
    ],
    "hints": [
      "Filter for merchants starting in Q1 2024.",
      "Assign relative quarter indices 0, 1, 2.",
      "Sum GMV conditionally."
    ],
    "explanation": "Quarterly cohort expansion tracks net revenue retention (NRR) trajectories.",
    "number": 224
  },
  {
    "id": "adv-225",
    "title": "225. Datadog: Continuous Service Outage Window Consolidation",
    "difficulty": "Hard",
    "companies": [
      "Datadog",
      "PagerDuty"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDatadog Incident Management aggregates overlapping service monitor outage alerts. Merge overlapping and adjacent alert intervals for each microservice into unified outage incidents.\n\n### Requirements\n- Track running maximum end_time.\n- Group overlapping alert intervals into continuous outage islands.\n- Calculate outage duration in minutes.\n- Output columns: service_name, outage_start, outage_end, outage_duration_minutes.\n- Sort by service_name ascending, outage_start ascending.\n\n### Input Schema\n**service_alerts** (id INT, service_name VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE service_alerts (id INT PRIMARY KEY, service_name VARCHAR(50), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO service_alerts VALUES (1, 'auth-api', '2025-01-01 04:00:00', '2025-01-01 04:30:00'), (2, 'auth-api', '2025-01-01 04:15:00', '2025-01-01 05:00:00'), (3, 'auth-api', '2025-01-01 06:00:00', '2025-01-01 06:20:00'), (4, 'billing-db', '2025-01-01 08:00:00', '2025-01-01 08:45:00');",
    "starterSql": "-- 225. Datadog: Continuous Service Outage Window Consolidation\n-- Output: service_name, outage_start, outage_end, outage_duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT service_name, start_time, end_time, MAX(end_time) OVER (PARTITION BY service_name ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM service_alerts), islands AS (SELECT service_name, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY service_name ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT service_name, MIN(start_time) AS outage_start, MAX(end_time) AS outage_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS outage_duration_minutes FROM islands GROUP BY service_name, island_id ORDER BY service_name ASC, outage_start ASC;",
    "expectedColumns": [
      "service_name",
      "outage_start",
      "outage_end",
      "outage_duration_minutes"
    ],
    "hints": [
      "Use running MAX(end_time).",
      "Create island ID with running sum of new interval flags.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Consolidated incident windows accurately calculate true SLA downtime credits.",
    "number": 225
  },
  {
    "id": "adv-226",
    "title": "226. Tesla: Vehicle Gigafactory Sub-Assembly Component Rollup",
    "difficulty": "Hard",
    "companies": [
      "Tesla",
      "Ford"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nTesla Supply Chain Engineering calculates total part requirements for the Model Y Long Range. Using the hierarchical manufacturing tree, calculate total unit quantity of all leaf-level components required to produce 1 vehicle.\n\n### Requirements\n- Traverse recursive BOM tree starting from parent_part_id IS NULL.\n- Multiply child quantity by parent requirement quantity down the tree.\n- Filter for leaf parts with no children.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**model_y_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE model_y_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO model_y_bom VALUES (1, NULL, 'Model Y Long Range', 1), (2, 1, 'Dual Motor Powertrain', 1), (3, 2, 'Front Induction Motor', 1), (4, 2, 'Rear Permanent Magnet Motor', 1), (5, 3, 'Copper Rotor Windings', 4), (6, 4, 'Neodymium Magnets', 16);",
    "starterSql": "-- 226. Tesla: Vehicle Gigafactory Sub-Assembly Component Rollup\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM model_y_bom WHERE parent_id IS NULL UNION ALL SELECT m.id, m.parent_id, m.part_name, t.total_qty * m.quantity FROM model_y_bom m JOIN bom_tree t ON m.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM model_y_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree recursively multiplying quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Gigafactory automation systems schedule robotic subassembly line replenishment using BOM explosions.",
    "number": 226
  },
  {
    "id": "adv-227",
    "title": "227. Coinbase: Blockchain Reorganization Block Transaction Reconciliation",
    "difficulty": "Hard",
    "companies": [
      "Coinbase",
      "Kraken"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCoinbase Blockchain Node Engineering audits ledger state after a Proof-of-Work chain reorganization (reorg). When conflicting transaction records share the same tx_hash, prioritize the transaction confirmed on the longest valid chain (is_canonical = TRUE), using highest block_height as tie-breaker.\n\n### Requirements\n- Partition by tx_hash.\n- Order by is_canonical DESC, block_height DESC.\n- Select the top record per tx_hash.\n- Output columns: tx_hash, block_height, is_canonical, confirmations.\n- Sort by tx_hash ascending.\n\n### Input Schema\n**node_txs** (id INT, tx_hash VARCHAR, block_height INT, is_canonical BOOLEAN, confirmations INT)",
    "schemaSql": "CREATE TABLE node_txs (id INT PRIMARY KEY, tx_hash VARCHAR(20), block_height INT, is_canonical BOOLEAN, confirmations INT);\nINSERT INTO node_txs VALUES (1, '0xABC123', 850120, FALSE, 2), (2, '0xABC123', 850122, TRUE, 6), (3, '0xDEF456', 850121, TRUE, 7), (4, '0xDEF456', 850119, FALSE, 1), (5, '0xGHI789', 850125, TRUE, 3);",
    "starterSql": "-- 227. Coinbase: Blockchain Reorganization Block Transaction Reconciliation\n-- Output: tx_hash, block_height, is_canonical, confirmations\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT tx_hash, block_height, is_canonical, confirmations, ROW_NUMBER() OVER (PARTITION BY tx_hash ORDER BY is_canonical DESC, block_height DESC) AS rn FROM node_txs) SELECT tx_hash, block_height, is_canonical, confirmations FROM ranked WHERE rn = 1 ORDER BY tx_hash ASC;",
    "expectedColumns": [
      "tx_hash",
      "block_height",
      "is_canonical",
      "confirmations"
    ],
    "hints": [
      "Rank by is_canonical DESC, block_height DESC.",
      "Filter where rn = 1.",
      "Order by tx_hash ASC."
    ],
    "explanation": "Blockchain reorg reconciliation resolves orphan block discrepancies in exchange custody balances.",
    "number": 227
  },
  {
    "id": "adv-228",
    "title": "228. DoorDash: Order Checkout Multi-Stage Funnel Conversion",
    "difficulty": "Hard",
    "companies": [
      "DoorDash",
      "Instacart"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDoorDash Consumer Mobile Funnel tracks checkout drop-offs. Identify orders that executed the complete sequential flow: 'CART_VIEWED' -> 'ADDRESS_CONFIRMED' -> 'ORDER_SUBMITTED' within 15 minutes.\n\n### Requirements\n- Use LEAD to inspect next 2 steps for the same cart_id.\n- Ensure steps match 'CART_VIEWED', 'ADDRESS_CONFIRMED', and 'ORDER_SUBMITTED'.\n- Verify total duration <= 15 minutes.\n- Output columns: cart_id, cart_view_time, order_submit_time.\n- Sort by cart_id ascending.\n\n### Input Schema\n**checkout_flow** (id INT, cart_id INT, step_name VARCHAR, step_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE checkout_flow (id INT PRIMARY KEY, cart_id INT, step_name VARCHAR(50), step_time TIMESTAMP);\nINSERT INTO checkout_flow VALUES (1, 101, 'CART_VIEWED', '2025-01-01 19:00:00'), (2, 101, 'ADDRESS_CONFIRMED', '2025-01-01 19:02:00'), (3, 101, 'ORDER_SUBMITTED', '2025-01-01 19:05:00'), (4, 102, 'CART_VIEWED', '2025-01-01 19:10:00'), (5, 102, 'ADDRESS_CONFIRMED', '2025-01-01 19:12:00'), (6, 103, 'CART_VIEWED', '2025-01-01 19:20:00');",
    "starterSql": "-- 228. DoorDash: Order Checkout Multi-Stage Funnel Conversion\n-- Output: cart_id, cart_view_time, order_submit_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT cart_id, step_name, step_time AS cart_view_time, LEAD(step_name, 1) OVER (PARTITION BY cart_id ORDER BY step_time ASC) AS step2_name, LEAD(step_name, 2) OVER (PARTITION BY cart_id ORDER BY step_time ASC) AS step3_name, LEAD(step_time, 2) OVER (PARTITION BY cart_id ORDER BY step_time ASC) AS order_submit_time FROM checkout_flow) SELECT cart_id, cart_view_time, order_submit_time FROM seq WHERE step_name = 'CART_VIEWED' AND step2_name = 'ADDRESS_CONFIRMED' AND step3_name = 'ORDER_SUBMITTED' AND (order_submit_time - cart_view_time) <= INTERVAL '15 minutes' ORDER BY cart_id ASC;",
    "expectedColumns": [
      "cart_id",
      "cart_view_time",
      "order_submit_time"
    ],
    "hints": [
      "Use LEAD(step_name, 1) and LEAD(step_name, 2).",
      "Validate step names.",
      "Ensure elapsed interval <= 15 minutes."
    ],
    "explanation": "Checkout sequence analysis detects friction points before payment execution.",
    "number": 228
  },
  {
    "id": "adv-229",
    "title": "229. Wayfair: Warehouse Pallet FIFO Inventory Fulfillment Allocation",
    "difficulty": "Hard",
    "companies": [
      "Wayfair",
      "Amazon"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nWayfair Supply Chain Operations fills commercial furniture orders from warehouse pallets. A hotel chain orders 120 office chairs (SKU 'CHAIR_OAK'). Allocate units across incoming pallets on a FIFO basis and compute remaining units on each pallet.\n\n### Requirements\n- Compute running cumulative units available ordered by received_date ASC.\n- For total order quantity = 120, calculate allocated_units from each pallet.\n- Calculate remaining_pallet_units as pallet_units minus allocated_units.\n- Only include pallets from which units were allocated.\n- Output columns: pallet_id, pallet_units, allocated_units, remaining_pallet_units.\n- Sort by pallet_id ascending.\n\n### Input Schema\n**pallet_inventory** (pallet_id INT, sku VARCHAR, received_date DATE, pallet_units INT)",
    "schemaSql": "CREATE TABLE pallet_inventory (pallet_id INT PRIMARY KEY, sku VARCHAR(20), received_date DATE, pallet_units INT);\nINSERT INTO pallet_inventory VALUES (1, 'CHAIR_OAK', '2025-01-01', 50), (2, 'CHAIR_OAK', '2025-01-04', 50), (3, 'CHAIR_OAK', '2025-01-08', 50), (4, 'CHAIR_OAK', '2025-01-12', 50);",
    "starterSql": "-- 229. Wayfair: Warehouse Pallet FIFO Inventory Fulfillment Allocation\n-- Output: pallet_id, pallet_units, allocated_units, remaining_pallet_units\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT pallet_id, pallet_units, SUM(pallet_units) OVER (ORDER BY received_date ASC) AS cum_units, COALESCE(SUM(pallet_units) OVER (ORDER BY received_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM pallet_inventory WHERE sku = 'CHAIR_OAK') SELECT pallet_id, pallet_units, LEAST(pallet_units, GREATEST(0, 120 - prev_cum)) AS allocated_units, pallet_units - LEAST(pallet_units, GREATEST(0, 120 - prev_cum)) AS remaining_pallet_units FROM cum WHERE prev_cum < 120 ORDER BY pallet_id ASC;",
    "expectedColumns": [
      "pallet_id",
      "pallet_units",
      "allocated_units",
      "remaining_pallet_units"
    ],
    "hints": [
      "Use running cumulative sum to track pallet bounds.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below total demand."
    ],
    "explanation": "Pallet allocation algorithms optimize warehouse forklift travel time and lot turnover.",
    "number": 229
  },
  {
    "id": "adv-230",
    "title": "230. Two Sigma: Algorithmic Alpha Signal Lead-Lag Cross-Correlation",
    "difficulty": "Hard",
    "companies": [
      "Two Sigma",
      "Citadel"
    ],
    "topics": [
      "LEAD",
      "ROUND",
      "AVG",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nTwo Sigma Quantitative Research tests whether an alternative data alpha signal predicts stock returns over the next 1 trading day. Join daily signal values with the next trading day's stock return (forward return).\n\n### Requirements\n- Use LEAD to find next day return (forward_return) for the same ticker.\n- Compute signal_to_return_ratio as forward_return / signal_score, rounded to 4 decimal places.\n- Filter for rows where forward_return is not NULL.\n- Output columns: ticker, trade_date, signal_score, forward_return, signal_to_return_ratio.\n- Sort by trade_date ascending, ticker ascending.\n\n### Input Schema\n**signal_predictions** (id INT, ticker VARCHAR, trade_date DATE, signal_score NUMERIC, daily_return NUMERIC)",
    "schemaSql": "CREATE TABLE signal_predictions (id INT PRIMARY KEY, ticker VARCHAR(10), trade_date DATE, signal_score NUMERIC, daily_return NUMERIC);\nINSERT INTO signal_predictions VALUES (1, 'NVDA', '2025-01-02', 0.05, 0.012), (2, 'NVDA', '2025-01-03', 0.08, 0.024), (3, 'NVDA', '2025-01-06', 0.04, 0.010), (4, 'AAPL', '2025-01-02', 0.02, 0.005), (5, 'AAPL', '2025-01-03', 0.03, 0.008);",
    "starterSql": "-- 230. Two Sigma: Algorithmic Alpha Signal Lead-Lag Cross-Correlation\n-- Output: ticker, trade_date, signal_score, forward_return, signal_to_return_ratio\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH forward AS (SELECT ticker, trade_date, signal_score, LEAD(daily_return) OVER (PARTITION BY ticker ORDER BY trade_date ASC) AS forward_return FROM signal_predictions) SELECT ticker, trade_date, signal_score, forward_return, ROUND(forward_return / NULLIF(signal_score, 0), 4) AS signal_to_return_ratio FROM forward WHERE forward_return IS NOT NULL ORDER BY trade_date ASC, ticker ASC;",
    "expectedColumns": [
      "ticker",
      "trade_date",
      "signal_score",
      "forward_return",
      "signal_to_return_ratio"
    ],
    "hints": [
      "Use LEAD(daily_return) partitioned by ticker.",
      "Filter where forward_return IS NOT NULL.",
      "Compute prediction ratio."
    ],
    "explanation": "Lead-lag feature engineering establishes predictive feature importance in quantitative factor models.",
    "number": 230
  },
  {
    "id": "adv-231",
    "title": "231. Reddit: Subreddit Browsing Sessionization with 20-Minute Inactivity Threshold",
    "difficulty": "Hard",
    "companies": [
      "Reddit",
      "Twitter"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nReddit User Experience teams group subreddit reading events into browsing sessions. A session lapses if more than 20 minutes elapses between posts viewed. Identify session start time and total posts viewed per session.\n\n### Requirements\n- Use LAG to calculate minutes elapsed between consecutive views.\n- Flag new session when elapsed time > 20 minutes or on first post.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, posts_viewed.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**post_views** (id INT, user_id INT, post_id INT, view_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE post_views (id INT PRIMARY KEY, user_id INT, post_id INT, view_time TIMESTAMP);\nINSERT INTO post_views VALUES (1, 101, 1, '2025-01-01 10:00:00'), (2, 101, 2, '2025-01-01 10:10:00'), (3, 101, 3, '2025-01-01 10:35:00'), (4, 101, 4, '2025-01-01 10:45:00'), (5, 102, 5, '2025-01-01 11:00:00');",
    "starterSql": "-- 231. Reddit: Subreddit Browsing Sessionization with 20-Minute Inactivity Threshold\n-- Output: user_id, session_id, session_start, posts_viewed\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, view_time, CASE WHEN LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time ASC) IS NULL OR (view_time - LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time ASC)) > INTERVAL '20 minutes' THEN 1 ELSE 0 END AS is_new_session FROM post_views), sessions AS (SELECT user_id, view_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY view_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(view_time) AS session_start, COUNT(*) AS posts_viewed FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "posts_viewed"
    ],
    "hints": [
      "Flag session starts with LAG > 20 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Sessionization models user dwell time and interest decay curves.",
    "number": 231
  },
  {
    "id": "adv-232",
    "title": "232. Salesforce: Recursive Account Hierarchy Parent-Child Revenue Rollup",
    "difficulty": "Hard",
    "companies": [
      "Salesforce",
      "Microsoft"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "SUM",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSalesforce Territory Management aggregates enterprise parent accounts. A global conglomerate holds corporate subsidiaries across multiple tiers. Reconstruct the corporate hierarchy tree and roll up total revenue from all subsidiary accounts under each top-level global parent account (parent_account_id IS NULL).\n\n### Requirements\n- Start with top-level global accounts (parent_account_id IS NULL).\n- Recursively traverse all child and grandchild subsidiary accounts.\n- Sum revenue across the global parent and all descendants.\n- Output columns: global_parent_id, global_parent_name, total_conglomerate_revenue.\n- Sort by total_conglomerate_revenue descending, then by global_parent_id ascending.\n\n### Input Schema\n**corporate_accounts** (account_id INT, parent_account_id INT, account_name VARCHAR, annual_revenue NUMERIC)",
    "schemaSql": "CREATE TABLE corporate_accounts (account_id INT PRIMARY KEY, parent_account_id INT, account_name VARCHAR(50), annual_revenue NUMERIC);\nINSERT INTO corporate_accounts VALUES (1, NULL, 'Alphabet Inc', 50000000), (2, 1, 'Google LLC', 250000000), (3, 2, 'YouTube LLC', 35000000), (4, 2, 'Google Cloud', 32000000), (5, NULL, 'Berkshire Hathaway', 100000000), (6, 5, 'GEICO', 40000000);",
    "starterSql": "-- 232. Salesforce: Recursive Account Hierarchy Parent-Child Revenue Rollup\n-- Output: global_parent_id, global_parent_name, total_conglomerate_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE hierarchy AS (SELECT account_id AS global_parent_id, account_name AS global_parent_name, account_id AS current_account_id, annual_revenue FROM corporate_accounts WHERE parent_account_id IS NULL UNION ALL SELECT h.global_parent_id, h.global_parent_name, c.account_id, c.annual_revenue FROM corporate_accounts c JOIN hierarchy h ON c.parent_account_id = h.current_account_id) SELECT global_parent_id, global_parent_name, ROUND(SUM(annual_revenue), 2) AS total_conglomerate_revenue FROM hierarchy GROUP BY global_parent_id, global_parent_name ORDER BY total_conglomerate_revenue DESC, global_parent_id ASC;",
    "expectedColumns": [
      "global_parent_id",
      "global_parent_name",
      "total_conglomerate_revenue"
    ],
    "hints": [
      "Start recursion at parent_account_id IS NULL holding global_parent_id.",
      "Join children on parent_account_id = current_account_id.",
      "Sum revenue grouped by global_parent_id."
    ],
    "explanation": "Corporate tree rollups prevent account executives from double-crediting enterprise contract limits.",
    "number": 232
  },
  {
    "id": "adv-233",
    "title": "233. Peloton: Daily Workout Activity Streak Island Detection",
    "difficulty": "Hard",
    "companies": [
      "Peloton",
      "Strava"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nPeloton Member Achievements rewards riders who work out every day. Find the longest consecutive calendar day workout streak for each member.\n\n### Requirements\n- Group consecutive calendar workout dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per member.\n- Output columns: member_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by member_id ascending.\n\n### Input Schema\n**workout_logs** (id INT, member_id INT, workout_date DATE)",
    "schemaSql": "CREATE TABLE workout_logs (id INT PRIMARY KEY, member_id INT, workout_date DATE);\nINSERT INTO workout_logs VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-02'), (3, 101, '2025-01-03'), (4, 101, '2025-01-05'), (5, 102, '2025-01-01'), (6, 102, '2025-01-02'), (7, 102, '2025-01-03'), (8, 102, '2025-01-04');",
    "starterSql": "-- 233. Peloton: Daily Workout Activity Streak Island Detection\n-- Output: member_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_workouts AS (SELECT DISTINCT member_id, workout_date FROM workout_logs), grouped AS (SELECT member_id, workout_date, workout_date - (ROW_NUMBER() OVER (PARTITION BY member_id ORDER BY workout_date ASC) * INTERVAL '1 day') AS grp FROM distinct_workouts), streaks AS (SELECT member_id, grp, COUNT(*) AS streak_days FROM grouped GROUP BY member_id, grp) SELECT member_id, MAX(streak_days) AS longest_streak_days FROM streaks GROUP BY member_id ORDER BY longest_streak_days DESC, member_id ASC;",
    "expectedColumns": [
      "member_id",
      "longest_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from workout_date.",
      "Group by member and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Gaps and islands grouping powers gamified daily streak badges.",
    "number": 233
  },
  {
    "id": "adv-234",
    "title": "234. Airbnb: Guest First-Booking Yearly Rebooking Retention Matrix",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "Booking.com"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAirbnb Long-Term Marketplace Health analyzes guest rebooking retention across annual vintages. For guests whose first reservation was completed in 2022 (Cohort 2022), compute the number of guests who rebooked in Year 0 (2022), Year 1 (2023), and Year 2 (2024).\n\n### Requirements\n- Identify guests whose earliest reservation was in 2022.\n- Count distinct guests who completed a booking in 2022, 2023, and 2024.\n- Output columns: cohort_year, y0_guests, y1_guests, y2_guests.\n- Sort by cohort_year ascending.\n\n### Input Schema\n**guest_reservations_annual** (id INT, guest_id INT, checkin_date DATE)",
    "schemaSql": "CREATE TABLE guest_reservations_annual (id INT PRIMARY KEY, guest_id INT, checkin_date DATE);\nINSERT INTO guest_reservations_annual VALUES (1, 101, '2022-06-15'), (2, 101, '2023-07-20'), (3, 101, '2024-08-10'), (4, 102, '2022-08-01'), (5, 102, '2023-09-12'), (6, 103, '2022-11-20'), (7, 104, '2023-04-15');",
    "starterSql": "-- 234. Airbnb: Guest First-Booking Yearly Rebooking Retention Matrix\n-- Output: cohort_year, y0_guests, y1_guests, y2_guests\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_booking AS (SELECT guest_id, EXTRACT(YEAR FROM MIN(checkin_date))::INT AS first_year FROM guest_reservations_annual GROUP BY guest_id HAVING EXTRACT(YEAR FROM MIN(checkin_date)) = 2022), activity AS (SELECT g.guest_id, EXTRACT(YEAR FROM g.checkin_date)::INT AS booking_year FROM guest_reservations_annual g JOIN first_booking f ON g.guest_id = f.guest_id) SELECT 2022 AS cohort_year, COUNT(DISTINCT CASE WHEN booking_year = 2022 THEN guest_id END) AS y0_guests, COUNT(DISTINCT CASE WHEN booking_year = 2023 THEN guest_id END) AS y1_guests, COUNT(DISTINCT CASE WHEN booking_year = 2024 THEN guest_id END) AS y2_guests FROM activity GROUP BY cohort_year ORDER BY cohort_year ASC;",
    "expectedColumns": [
      "cohort_year",
      "y0_guests",
      "y1_guests",
      "y2_guests"
    ],
    "hints": [
      "Filter for guests whose MIN(year) is 2022.",
      "Pivot booking years 2022, 2023, and 2024.",
      "Count distinct guest IDs."
    ],
    "explanation": "Multi-year cohort decay measures long-term brand equity and customer lifetime value.",
    "number": 234
  },
  {
    "id": "adv-235",
    "title": "235. Fastly: Edge CDN Server Outage Downtime Consolidation",
    "difficulty": "Hard",
    "companies": [
      "Fastly",
      "Cloudflare"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nFastly Edge Reliability monitors POP (Point of Presence) server downtime. Multiple health checks detect overlapping server maintenance and failure windows. Merge overlapping intervals into consolidated downtime windows.\n\n### Requirements\n- Track running maximum end_time across alerts per server_id.\n- Group overlapping and contiguous intervals into distinct outages.\n- Calculate outage duration in minutes.\n- Output columns: server_id, outage_start, outage_end, outage_duration_minutes.\n- Sort by server_id ascending, outage_start ascending.\n\n### Input Schema\n**edge_outages** (id INT, server_id VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE edge_outages (id INT PRIMARY KEY, server_id VARCHAR(10), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO edge_outages VALUES (1, 'POP_SFO', '2025-01-01 01:00:00', '2025-01-01 01:45:00'), (2, 'POP_SFO', '2025-01-01 01:30:00', '2025-01-01 02:15:00'), (3, 'POP_SFO', '2025-01-01 03:00:00', '2025-01-01 03:30:00'), (4, 'POP_LHR', '2025-01-01 05:00:00', '2025-01-01 05:40:00');",
    "starterSql": "-- 235. Fastly: Edge CDN Server Outage Downtime Consolidation\n-- Output: server_id, outage_start, outage_end, outage_duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT server_id, start_time, end_time, MAX(end_time) OVER (PARTITION BY server_id ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM edge_outages), islands AS (SELECT server_id, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY server_id ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT server_id, MIN(start_time) AS outage_start, MAX(end_time) AS outage_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS outage_duration_minutes FROM islands GROUP BY server_id, island_id ORDER BY server_id ASC, outage_start ASC;",
    "expectedColumns": [
      "server_id",
      "outage_start",
      "outage_end",
      "outage_duration_minutes"
    ],
    "hints": [
      "Compare start_time against running MAX(end_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Edge interval consolidation avoids double-counting downtime penalties.",
    "number": 235
  },
  {
    "id": "adv-236",
    "title": "236. SpaceX: Falcon 9 Stage 1 Booster Component Refurbishment Hierarchy",
    "difficulty": "Hard",
    "companies": [
      "SpaceX",
      "Boeing"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "BOM"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSpaceX Starbase Engineering tracks Falcon 9 Booster reusability life cycles. Given a top-level booster ('B1062'), traverse the refurbishment hierarchy tree to find all nested subcomponents and their total quantity required per launch.\n\n### Requirements\n- Start with top-level booster assembly (parent_id IS NULL).\n- Recursively traverse subcomponents, multiplying quantity down the tree.\n- Filter for leaf parts.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**booster_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE booster_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO booster_bom VALUES (1, NULL, 'Falcon 9 Booster', 1), (2, 1, 'Merlin 1D Engine Cluster', 9), (3, 1, 'Grid Fin Assembly', 4), (4, 2, 'Turbopump Impeller', 1), (5, 2, 'Gimbal Actuator', 2), (6, 3, 'Titanium Casting Blade', 1);",
    "starterSql": "-- 236. SpaceX: Falcon 9 Stage 1 Booster Component Refurbishment Hierarchy\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM booster_bom WHERE parent_id IS NULL UNION ALL SELECT b.id, b.parent_id, b.part_name, t.total_qty * b.quantity FROM booster_bom b JOIN bom_tree t ON b.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM booster_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Rocket refurbishment pipelines track lifecycle wear on subcomponents across reuse cycles.",
    "number": 236
  },
  {
    "id": "adv-237",
    "title": "237. Plaid: Bank Account Balance Ledger Transaction Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Plaid",
      "Stripe"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nPlaid Financial Data Ingestion reconciles duplicate pending/settled transaction webhooks. For transactions sharing the same client_reference_id, select the single authoritative row with highest status priority ('POSTED' > 'PENDING'), with the latest post_date as a tie-breaker.\n\n### Requirements\n- Assign priority: 'POSTED' (1), 'PENDING' (2).\n- Rank records using ROW_NUMBER partitioned by client_reference_id.\n- Filter for rank = 1.\n- Output columns: client_reference_id, account_id, status, amount, post_date.\n- Sort by client_reference_id ascending.\n\n### Input Schema\n**bank_sync_txns** (id INT, client_reference_id VARCHAR, account_id INT, status VARCHAR, amount NUMERIC, post_date TIMESTAMP)",
    "schemaSql": "CREATE TABLE bank_sync_txns (id INT PRIMARY KEY, client_reference_id VARCHAR(20), account_id INT, status VARCHAR(20), amount NUMERIC, post_date TIMESTAMP);\nINSERT INTO bank_sync_txns VALUES (1, 'REF_001', 101, 'PENDING', 25.00, '2025-01-01 09:00:00'), (2, 'REF_001', 101, 'POSTED', 25.00, '2025-01-02 14:00:00'), (3, 'REF_002', 102, 'PENDING', 80.50, '2025-01-01 10:00:00'), (4, 'REF_003', 103, 'POSTED', 110.00, '2025-01-01 11:00:00');",
    "starterSql": "-- 237. Plaid: Bank Account Balance Ledger Transaction Deduplication\n-- Output: client_reference_id, account_id, status, amount, post_date\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT client_reference_id, account_id, status, amount, post_date, ROW_NUMBER() OVER (PARTITION BY client_reference_id ORDER BY CASE status WHEN 'POSTED' THEN 1 WHEN 'PENDING' THEN 2 ELSE 3 END ASC, post_date DESC) AS rn FROM bank_sync_txns) SELECT client_reference_id, account_id, status, amount, post_date FROM ranked WHERE rn = 1 ORDER BY client_reference_id ASC;",
    "expectedColumns": [
      "client_reference_id",
      "account_id",
      "status",
      "amount",
      "post_date"
    ],
    "hints": [
      "Map status to numeric precedence in ORDER BY.",
      "Partition by client_reference_id.",
      "Filter where rn = 1."
    ],
    "explanation": "Pending-to-posted deduplication reconciles transient credit card authorizations into permanent settlement entries.",
    "number": 237
  },
  {
    "id": "adv-238",
    "title": "238. Instacart: Shopper Delivery Batch Multi-Step Order Milestones",
    "difficulty": "Hard",
    "companies": [
      "Instacart",
      "DoorDash"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nInstacart Shopper Operations audits fulfillment milestone completion. Identify shopper order batches that executed the complete sequential flow: 'BATCH_ACCEPTED' -> 'SHOPPING_COMPLETED' -> 'ORDER_DELIVERED' in exact chronological sequence within 90 minutes.\n\n### Requirements\n- Use LEAD to inspect next two sequential events for each batch_id.\n- Ensure events match 'BATCH_ACCEPTED', 'SHOPPING_COMPLETED', and 'ORDER_DELIVERED'.\n- Verify total duration from accept to delivery <= 90 minutes.\n- Output columns: batch_id, accept_time, delivery_time.\n- Sort by batch_id ascending.\n\n### Input Schema\n**shopper_milestones** (id INT, batch_id INT, milestone VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE shopper_milestones (id INT PRIMARY KEY, batch_id INT, milestone VARCHAR(30), event_time TIMESTAMP);\nINSERT INTO shopper_milestones VALUES (1, 501, 'BATCH_ACCEPTED', '2025-01-01 11:00:00'), (2, 501, 'SHOPPING_COMPLETED', '2025-01-01 11:40:00'), (3, 501, 'ORDER_DELIVERED', '2025-01-01 12:15:00'), (4, 502, 'BATCH_ACCEPTED', '2025-01-01 13:00:00'), (5, 502, 'BATCH_UNASSIGNED', '2025-01-01 13:10:00');",
    "starterSql": "-- 238. Instacart: Shopper Delivery Batch Multi-Step Order Milestones\n-- Output: batch_id, accept_time, delivery_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT batch_id, milestone, event_time AS accept_time, LEAD(milestone, 1) OVER (PARTITION BY batch_id ORDER BY event_time ASC) AS step2_name, LEAD(milestone, 2) OVER (PARTITION BY batch_id ORDER BY event_time ASC) AS step3_name, LEAD(event_time, 2) OVER (PARTITION BY batch_id ORDER BY event_time ASC) AS delivery_time FROM shopper_milestones) SELECT batch_id, accept_time, delivery_time FROM seq WHERE milestone = 'BATCH_ACCEPTED' AND step2_name = 'SHOPPING_COMPLETED' AND step3_name = 'ORDER_DELIVERED' AND (delivery_time - accept_time) <= INTERVAL '90 minutes' ORDER BY batch_id ASC;",
    "expectedColumns": [
      "batch_id",
      "accept_time",
      "delivery_time"
    ],
    "hints": [
      "Use LEAD(milestone, 1) and LEAD(milestone, 2).",
      "Verify full 3-step sequence.",
      "Ensure elapsed interval <= 90 minutes."
    ],
    "explanation": "Shopper fulfillment latency tracking isolates store picking vs last-mile driving bottlenecks.",
    "number": 238
  },
  {
    "id": "adv-239",
    "title": "239. Target: Distribution Center FIFO Carton Depletion for Replenishment",
    "difficulty": "Hard",
    "companies": [
      "Target",
      "Walmart"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nTarget Distribution Centers ship cartons to retail store locations using FIFO inventory rules. A store needs 80 cartons of 'PAPER_TOWEL'. Allocate cartons across incoming inventory shipments in chronological order and compute remaining balance on each shipment.\n\n### Requirements\n- Compute cumulative cartons available ordered by received_date ASC.\n- Allocate 80 cartons across shipments.\n- Calculate remaining_cartons per shipment.\n- Only display shipments from which cartons were allocated.\n- Output columns: shipment_id, total_cartons, allocated_cartons, remaining_cartons.\n- Sort by shipment_id ascending.\n\n### Input Schema\n**carton_inventory** (shipment_id INT, item_name VARCHAR, received_date DATE, total_cartons INT)",
    "schemaSql": "CREATE TABLE carton_inventory (shipment_id INT PRIMARY KEY, item_name VARCHAR(50), received_date DATE, total_cartons INT);\nINSERT INTO carton_inventory VALUES (1, 'PAPER_TOWEL', '2025-01-01', 30), (2, 'PAPER_TOWEL', '2025-01-03', 40), (3, 'PAPER_TOWEL', '2025-01-06', 50), (4, 'PAPER_TOWEL', '2025-01-10', 20);",
    "starterSql": "-- 239. Target: Distribution Center FIFO Carton Depletion for Replenishment\n-- Output: shipment_id, total_cartons, allocated_cartons, remaining_cartons\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT shipment_id, total_cartons, SUM(total_cartons) OVER (ORDER BY received_date ASC) AS cum_units, COALESCE(SUM(total_cartons) OVER (ORDER BY received_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM carton_inventory WHERE item_name = 'PAPER_TOWEL') SELECT shipment_id, total_cartons, LEAST(total_cartons, GREATEST(0, 80 - prev_cum)) AS allocated_cartons, total_cartons - LEAST(total_cartons, GREATEST(0, 80 - prev_cum)) AS remaining_cartons FROM cum WHERE prev_cum < 80 ORDER BY shipment_id ASC;",
    "expectedColumns": [
      "shipment_id",
      "total_cartons",
      "allocated_cartons",
      "remaining_cartons"
    ],
    "hints": [
      "Calculate cumulative cartons with SUM() OVER.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 80."
    ],
    "explanation": "Store replenishment schedules optimize warehouse pallet racking space.",
    "number": 239
  },
  {
    "id": "adv-240",
    "title": "240. Jump Trading: Order Book Bid-Ask Spread Inversion and Cross Detection",
    "difficulty": "Hard",
    "companies": [
      "Jump Trading",
      "Virtu Financial"
    ],
    "topics": [
      "JOIN",
      "WHERE",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nJump Trading High-Frequency Surveillance detects crossed order books (arbitrage condition where best bid price >= best ask price). Compare simultaneous top-of-book bid and ask quotes for each exchange and symbol, identifying crossed market anomalies.\n\n### Requirements\n- Join bids and asks on exchange, symbol, and quote_time.\n- Filter for instances where bid_price >= ask_price (crossed market).\n- Calculate inversion_spread as bid_price minus ask_price, rounded to 4 decimal places.\n- Output columns: exchange, symbol, quote_time, bid_price, ask_price, inversion_spread.\n- Sort by inversion_spread descending, then by quote_time ascending.\n\n### Input Schema\n**bbo_bids** (id INT, exchange VARCHAR, symbol VARCHAR, quote_time TIMESTAMP, bid_price NUMERIC)\n\n**bbo_asks** (id INT, exchange VARCHAR, symbol VARCHAR, quote_time TIMESTAMP, ask_price NUMERIC)",
    "schemaSql": "CREATE TABLE bbo_bids (id INT PRIMARY KEY, exchange VARCHAR(10), symbol VARCHAR(10), quote_time TIMESTAMP, bid_price NUMERIC);\nCREATE TABLE bbo_asks (id INT PRIMARY KEY, exchange VARCHAR(10), symbol VARCHAR(10), quote_time TIMESTAMP, ask_price NUMERIC);\nINSERT INTO bbo_bids VALUES (1, 'NASDAQ', 'SPY', '2025-01-01 09:30:00.100', 590.25), (2, 'NASDAQ', 'SPY', '2025-01-01 09:30:00.200', 590.20), (3, 'NYSE', 'SPY', '2025-01-01 09:30:00.100', 590.30);\nINSERT INTO bbo_asks VALUES (1, 'NASDAQ', 'SPY', '2025-01-01 09:30:00.100', 590.22), (2, 'NASDAQ', 'SPY', '2025-01-01 09:30:00.200', 590.22), (3, 'NYSE', 'SPY', '2025-01-01 09:30:00.100', 590.32);",
    "starterSql": "-- 240. Jump Trading: Order Book Bid-Ask Spread Inversion and Cross Detection\n-- Output: exchange, symbol, quote_time, bid_price, ask_price, inversion_spread\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT b.exchange, b.symbol, b.quote_time, b.bid_price, a.ask_price, ROUND(b.bid_price - a.ask_price, 4) AS inversion_spread FROM bbo_bids b JOIN bbo_asks a ON b.exchange = a.exchange AND b.symbol = a.symbol AND b.quote_time = a.quote_time WHERE b.bid_price >= a.ask_price ORDER BY inversion_spread DESC, b.quote_time ASC;",
    "expectedColumns": [
      "exchange",
      "symbol",
      "quote_time",
      "bid_price",
      "ask_price",
      "inversion_spread"
    ],
    "hints": [
      "Join bids and asks on exchange, symbol, and quote_time.",
      "Filter WHERE bid_price >= ask_price.",
      "Calculate inversion spread."
    ],
    "explanation": "Crossed order books trigger automated IOC (Immediate-or-Cancel) liquidity-taking arbitrage sweeps.",
    "number": 240
  },
  {
    "id": "adv-241",
    "title": "241. Discord: Voice Channel Sessionization with 10-Minute Silence Window",
    "difficulty": "Hard",
    "companies": [
      "Discord",
      "Slack"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nDiscord Audio Infrastructure groups user audio ping activity into voice call sessions. If a user does not transmit audio for more than 10 minutes, the session expires. Find each voice session start time and total audio pings.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior audio ping.\n- Flag new session when elapsed time > 10 minutes or on first ping.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, audio_pings.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**audio_pings** (id INT, user_id INT, ping_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE audio_pings (id INT PRIMARY KEY, user_id INT, ping_time TIMESTAMP);\nINSERT INTO audio_pings VALUES (1, 101, '2025-01-01 20:00:00'), (2, 101, '2025-01-01 20:04:00'), (3, 101, '2025-01-01 20:08:00'), (4, 101, '2025-01-01 20:30:00'), (5, 102, '2025-01-01 21:00:00'), (6, 102, '2025-01-01 21:05:00');",
    "starterSql": "-- 241. Discord: Voice Channel Sessionization with 10-Minute Silence Window\n-- Output: user_id, session_id, session_start, audio_pings\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, ping_time, CASE WHEN LAG(ping_time) OVER (PARTITION BY user_id ORDER BY ping_time ASC) IS NULL OR (ping_time - LAG(ping_time) OVER (PARTITION BY user_id ORDER BY ping_time ASC)) > INTERVAL '10 minutes' THEN 1 ELSE 0 END AS is_new_session FROM audio_pings), sessions AS (SELECT user_id, ping_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY ping_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(ping_time) AS session_start, COUNT(*) AS audio_pings FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "audio_pings"
    ],
    "hints": [
      "Flag session starts with LAG > 10 minutes.",
      "Accumulate session_id with SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Voice channel session boundaries guide WebRTC audio server load distribution.",
    "number": 241
  },
  {
    "id": "adv-242",
    "title": "242. Atlassian: Recursive Jira Epic-to-Subtask Parent Hierarchy Traversal",
    "difficulty": "Hard",
    "companies": [
      "Atlassian",
      "Jira"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "SUM",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAtlassian Jira Portfolio Management tracks work hierarchy (Epic -> Story -> Subtask). Given top-level Epics (parent_issue_id IS NULL), traverse all child issues recursively and calculate total story points rolled up under each Epic.\n\n### Requirements\n- Start with Epics (parent_issue_id IS NULL).\n- Recursively join all child stories and subtasks.\n- Sum story_points for the Epic and all descendants.\n- Output columns: epic_key, epic_summary, total_story_points.\n- Sort by total_story_points descending, then by epic_key ascending.\n\n### Input Schema\n**jira_issues** (issue_id INT, parent_issue_id INT, issue_key VARCHAR, summary VARCHAR, story_points INT)",
    "schemaSql": "CREATE TABLE jira_issues (issue_id INT PRIMARY KEY, parent_issue_id INT, issue_key VARCHAR(20), summary VARCHAR(100), story_points INT);\nINSERT INTO jira_issues VALUES (1, NULL, 'EPIC-1', 'Cloud Migration', 0), (2, 1, 'STORY-10', 'Database Setup', 8), (3, 1, 'STORY-11', 'Auth Service', 5), (4, 3, 'SUB-101', 'Write JWT Tests', 3), (5, NULL, 'EPIC-2', 'Mobile Redesign', 0), (6, 5, 'STORY-20', 'Onboarding UI', 13);",
    "starterSql": "-- 242. Atlassian: Recursive Jira Epic-to-Subtask Parent Hierarchy Traversal\n-- Output: epic_key, epic_summary, total_story_points\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE epic_tree AS (SELECT issue_id AS epic_id, issue_key AS epic_key, summary AS epic_summary, issue_id AS current_issue_id, story_points FROM jira_issues WHERE parent_issue_id IS NULL UNION ALL SELECT e.epic_id, e.epic_key, e.epic_summary, j.issue_id, j.story_points FROM jira_issues j JOIN epic_tree e ON j.parent_issue_id = e.current_issue_id) SELECT epic_key, epic_summary, SUM(story_points) AS total_story_points FROM epic_tree GROUP BY epic_key, epic_summary ORDER BY total_story_points DESC, epic_key ASC;",
    "expectedColumns": [
      "epic_key",
      "epic_summary",
      "total_story_points"
    ],
    "hints": [
      "Hold epic_id throughout the recursion.",
      "Recursively join child issues.",
      "Sum story points grouped by epic."
    ],
    "explanation": "Agile portfolio rollups calculate true burndown progress across multi-layered initiative trees.",
    "number": 242
  },
  {
    "id": "adv-243",
    "title": "243. Wordle: Consecutive Daily Puzzle Solution Streaks",
    "difficulty": "Hard",
    "companies": [
      "Wordle",
      "NYT"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nNew York Times Games calculates player Wordle streak badges. Find the longest consecutive daily puzzle solve streak achieved by each player.\n\n### Requirements\n- Group consecutive calendar solve dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each player.\n- Output columns: player_name, max_streak_days.\n- Sort by max_streak_days descending, then by player_name ascending.\n\n### Input Schema\n**puzzle_solves** (id INT, player_name VARCHAR, solve_date DATE)",
    "schemaSql": "CREATE TABLE puzzle_solves (id INT PRIMARY KEY, player_name VARCHAR(50), solve_date DATE);\nINSERT INTO puzzle_solves VALUES (1, 'WordleMaster', '2025-01-01'), (2, 'WordleMaster', '2025-01-02'), (3, 'WordleMaster', '2025-01-03'), (4, 'WordleMaster', '2025-01-04'), (5, 'WordleMaster', '2025-01-06'), (6, 'CasualPlayer', '2025-01-01'), (7, 'CasualPlayer', '2025-01-02');",
    "starterSql": "-- 243. Wordle: Consecutive Daily Puzzle Solution Streaks\n-- Output: player_name, max_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_solves AS (SELECT DISTINCT player_name, solve_date FROM puzzle_solves), grouped AS (SELECT player_name, solve_date, solve_date - (ROW_NUMBER() OVER (PARTITION BY player_name ORDER BY solve_date ASC) * INTERVAL '1 day') AS grp FROM distinct_solves), streaks AS (SELECT player_name, grp, COUNT(*) AS streak_days FROM grouped GROUP BY player_name, grp) SELECT player_name, MAX(streak_days) AS max_streak_days FROM streaks GROUP BY player_name ORDER BY max_streak_days DESC, player_name ASC;",
    "expectedColumns": [
      "player_name",
      "max_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from solve_date.",
      "Group by player and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Streak psychology drives high DAU/MAU ratios in casual puzzle applications.",
    "number": 243
  },
  {
    "id": "adv-244",
    "title": "244. Substack: Paid Newsletter Monthly Subscription Retention Matrix",
    "difficulty": "Hard",
    "companies": [
      "Substack",
      "Medium"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSubstack Creator Monetization tracks subscriber retention by monthly signup cohort. For subscribers who first purchased a subscription in January 2024 (Cohort 2024-01), compute the number of active paying subscribers in Month 0, Month 1, and Month 2.\n\n### Requirements\n- Identify subscribers whose first payment was in January 2024.\n- Calculate relative month index (0 for Jan, 1 for Feb, 2 for Mar).\n- Count distinct paying subscribers per month index.\n- Output columns: cohort_name, m0_subscribers, m1_subscribers, m2_subscribers.\n- Sort by cohort_name ascending.\n\n### Input Schema\n**subscriber_invoices** (id INT, subscriber_id INT, invoice_date DATE, amount NUMERIC)",
    "schemaSql": "CREATE TABLE subscriber_invoices (id INT PRIMARY KEY, subscriber_id INT, invoice_date DATE, amount NUMERIC);\nINSERT INTO subscriber_invoices VALUES (1, 101, '2024-01-05', 10.00), (2, 101, '2024-02-05', 10.00), (3, 101, '2024-03-05', 10.00), (4, 102, '2024-01-10', 10.00), (5, 102, '2024-02-10', 10.00), (6, 103, '2024-01-15', 10.00);",
    "starterSql": "-- 244. Substack: Paid Newsletter Monthly Subscription Retention Matrix\n-- Output: cohort_name, m0_subscribers, m1_subscribers, m2_subscribers\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_inv AS (SELECT subscriber_id, MIN(invoice_date) AS min_date FROM subscriber_invoices GROUP BY subscriber_id HAVING DATE_TRUNC('month', MIN(invoice_date)) = '2024-01-01'::DATE), activity AS (SELECT s.subscriber_id, (EXTRACT(YEAR FROM s.invoice_date) - EXTRACT(YEAR FROM f.min_date)) * 12 + (EXTRACT(MONTH FROM s.invoice_date) - EXTRACT(MONTH FROM f.min_date)) AS m_idx FROM subscriber_invoices s JOIN first_inv f ON s.subscriber_id = f.subscriber_id) SELECT '2024-01' AS cohort_name, COUNT(DISTINCT CASE WHEN m_idx = 0 THEN subscriber_id END) AS m0_subscribers, COUNT(DISTINCT CASE WHEN m_idx = 1 THEN subscriber_id END) AS m1_subscribers, COUNT(DISTINCT CASE WHEN m_idx = 2 THEN subscriber_id END) AS m2_subscribers FROM activity GROUP BY cohort_name ORDER BY cohort_name ASC;",
    "expectedColumns": [
      "cohort_name",
      "m0_subscribers",
      "m1_subscribers",
      "m2_subscribers"
    ],
    "hints": [
      "Filter subscribers whose first invoice was in Jan 2024.",
      "Calculate month index.",
      "Aggregate distinct subscribers."
    ],
    "explanation": "Subscription cohort matrices indicate when retention stabilizes into steady baseline renewal rates.",
    "number": 244
  },
  {
    "id": "adv-245",
    "title": "245. PagerDuty: Overlapping Severity-1 Incident Downtime Consolidation",
    "difficulty": "Hard",
    "companies": [
      "PagerDuty",
      "Datadog"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nPagerDuty Reliability Operations audits client Sev-1 SLA downtime. When cascading infrastructure failures trigger multiple overlapping Sev-1 incidents for a corporate service, consolidate the overlapping time windows to calculate true net outage minutes.\n\n### Requirements\n- Track running maximum resolved_at timestamp.\n- Group overlapping incidents into continuous outage periods.\n- Calculate outage duration in minutes.\n- Output columns: service_name, outage_start, outage_end, outage_minutes.\n- Sort by service_name ascending, outage_start ascending.\n\n### Input Schema\n**sev1_incidents** (id INT, service_name VARCHAR, triggered_at TIMESTAMP, resolved_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE sev1_incidents (id INT PRIMARY KEY, service_name VARCHAR(50), triggered_at TIMESTAMP, resolved_at TIMESTAMP);\nINSERT INTO sev1_incidents VALUES (1, 'Payment Gateway', '2025-01-01 08:00:00', '2025-01-01 08:45:00'), (2, 'Payment Gateway', '2025-01-01 08:30:00', '2025-01-01 09:15:00'), (3, 'Payment Gateway', '2025-01-01 10:00:00', '2025-01-01 10:20:00'), (4, 'Search Engine', '2025-01-01 11:00:00', '2025-01-01 11:30:00');",
    "starterSql": "-- 245. PagerDuty: Overlapping Severity-1 Incident Downtime Consolidation\n-- Output: service_name, outage_start, outage_end, outage_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT service_name, triggered_at, resolved_at, MAX(resolved_at) OVER (PARTITION BY service_name ORDER BY triggered_at ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_res FROM sev1_incidents), islands AS (SELECT service_name, triggered_at, resolved_at, SUM(CASE WHEN prev_max_res IS NULL OR triggered_at > prev_max_res THEN 1 ELSE 0 END) OVER (PARTITION BY service_name ORDER BY triggered_at ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT service_name, MIN(triggered_at) AS outage_start, MAX(resolved_at) AS outage_end, EXTRACT(EPOCH FROM (MAX(resolved_at) - MIN(triggered_at)))::INT / 60 AS outage_minutes FROM islands GROUP BY service_name, island_id ORDER BY service_name ASC, outage_start ASC;",
    "expectedColumns": [
      "service_name",
      "outage_start",
      "outage_end",
      "outage_minutes"
    ],
    "hints": [
      "Compare current triggered_at against running MAX(resolved_at).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "SLA penalty calculations legally require non-overlapping downtime deduplication.",
    "number": 245
  },
  {
    "id": "adv-246",
    "title": "246. GM: EV Battery Cell Module Component Cost Explosion",
    "difficulty": "Hard",
    "companies": [
      "GM",
      "Tesla"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nGeneral Motors Ultium Battery Engineering analyzes pack manufacturing costs. Reconstruct the hierarchical subassembly tree for the 'Ultium 100kWh Pack' and calculate total units of each leaf-level raw component required per battery pack.\n\n### Requirements\n- Start with top-level pack (parent_id IS NULL).\n- Recursively traverse component tree multiplying unit quantities down.\n- Filter for leaf parts with no subcomponents.\n- Output columns: component_name, total_units_required.\n- Sort by total_units_required descending, then by component_name ascending.\n\n### Input Schema\n**battery_bom** (id INT, parent_id INT, component_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE battery_bom (id INT PRIMARY KEY, parent_id INT, component_name VARCHAR(50), quantity INT);\nINSERT INTO battery_bom VALUES (1, NULL, 'Ultium 100kWh Pack', 1), (2, 1, 'Battery Module 8S', 12), (3, 2, 'Pouch Cell 100Ah', 8), (4, 3, 'Nickel-Cobalt Cathode', 1), (5, 3, 'Silicon-Graphite Anode', 1), (6, 2, 'Cell Voltage Harness', 1);",
    "starterSql": "-- 246. GM: EV Battery Cell Module Component Cost Explosion\n-- Output: component_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, component_name, quantity AS total_qty FROM battery_bom WHERE parent_id IS NULL UNION ALL SELECT b.id, b.parent_id, b.component_name, t.total_qty * b.quantity FROM battery_bom b JOIN bom_tree t ON b.parent_id = t.id) SELECT b.component_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM battery_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, component_name ASC;",
    "expectedColumns": [
      "component_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Automotive component explosions drive critical mineral procurement requirements.",
    "number": 246
  },
  {
    "id": "adv-247",
    "title": "247. Brex: Corporate Expense Reimbursement Double-Submission Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Brex",
      "Ramp"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nBrex Fraud Operations catches accidental double-submitted expense reimbursements. An employee might upload identical receipts with matching receipt_hash and amount. Select the single valid expense claim with the earliest submitted_at timestamp.\n\n### Requirements\n- Partition records by employee_id and receipt_hash.\n- Order by submitted_at ascending to keep the earliest original claim.\n- Filter for rank = 1.\n- Output columns: claim_id, employee_id, receipt_hash, amount, submitted_at.\n- Sort by claim_id ascending.\n\n### Input Schema\n**expense_claims** (claim_id INT, employee_id INT, receipt_hash VARCHAR, amount NUMERIC, submitted_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE expense_claims (claim_id INT PRIMARY KEY, employee_id INT, receipt_hash VARCHAR(20), amount NUMERIC, submitted_at TIMESTAMP);\nINSERT INTO expense_claims VALUES (1, 101, 'HASH_AAA', 45.00, '2025-01-01 10:00:00'), (2, 101, 'HASH_AAA', 45.00, '2025-01-01 10:05:00'), (3, 101, 'HASH_BBB', 120.00, '2025-01-01 11:00:00'), (4, 102, 'HASH_CCC', 85.00, '2025-01-01 12:00:00'), (5, 102, 'HASH_CCC', 85.00, '2025-01-01 12:02:00');",
    "starterSql": "-- 247. Brex: Corporate Expense Reimbursement Double-Submission Deduplication\n-- Output: claim_id, employee_id, receipt_hash, amount, submitted_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT claim_id, employee_id, receipt_hash, amount, submitted_at, ROW_NUMBER() OVER (PARTITION BY employee_id, receipt_hash ORDER BY submitted_at ASC) AS rn FROM expense_claims) SELECT claim_id, employee_id, receipt_hash, amount, submitted_at FROM ranked WHERE rn = 1 ORDER BY claim_id ASC;",
    "expectedColumns": [
      "claim_id",
      "employee_id",
      "receipt_hash",
      "amount",
      "submitted_at"
    ],
    "hints": [
      "Use ROW_NUMBER() partitioned by employee_id and receipt_hash.",
      "Order by submitted_at ASC.",
      "Filter where rn = 1."
    ],
    "explanation": "Automated receipt hash deduplication prevents duplicate expense disbursements.",
    "number": 247
  },
  {
    "id": "adv-248",
    "title": "248. Airbnb: Guest Search-to-Booking Funnel Conversion Sequence",
    "difficulty": "Hard",
    "companies": [
      "Airbnb",
      "VRBO"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAirbnb Booking Engine audits conversion velocity. Identify guest booking flows that executed the complete sequential flow: 'LISTING_VIEWED' -> 'RESERVATION_REQUESTED' -> 'BOOKING_CONFIRMED' in strict order within 24 hours.\n\n### Requirements\n- Use LEAD to inspect next 2 steps for the same guest_id and listing_id.\n- Check that steps match 'LISTING_VIEWED', 'RESERVATION_REQUESTED', and 'BOOKING_CONFIRMED'.\n- Verify duration <= 24 hours.\n- Output columns: guest_id, listing_id, view_time, confirm_time.\n- Sort by guest_id ascending, listing_id ascending.\n\n### Input Schema\n**booking_funnel_events** (id INT, guest_id INT, listing_id INT, event_name VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE booking_funnel_events (id INT PRIMARY KEY, guest_id INT, listing_id INT, event_name VARCHAR(50), event_time TIMESTAMP);\nINSERT INTO booking_funnel_events VALUES (1, 101, 801, 'LISTING_VIEWED', '2025-01-01 14:00:00'), (2, 101, 801, 'RESERVATION_REQUESTED', '2025-01-01 14:30:00'), (3, 101, 801, 'BOOKING_CONFIRMED', '2025-01-01 15:00:00'), (4, 102, 802, 'LISTING_VIEWED', '2025-01-01 16:00:00'), (5, 102, 802, 'RESERVATION_REQUESTED', '2025-01-01 16:15:00');",
    "starterSql": "-- 248. Airbnb: Guest Search-to-Booking Funnel Conversion Sequence\n-- Output: guest_id, listing_id, view_time, confirm_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT guest_id, listing_id, event_name, event_time AS view_time, LEAD(event_name, 1) OVER (PARTITION BY guest_id, listing_id ORDER BY event_time ASC) AS step2_name, LEAD(event_name, 2) OVER (PARTITION BY guest_id, listing_id ORDER BY event_time ASC) AS step3_name, LEAD(event_time, 2) OVER (PARTITION BY guest_id, listing_id ORDER BY event_time ASC) AS confirm_time FROM booking_funnel_events) SELECT guest_id, listing_id, view_time, confirm_time FROM seq WHERE event_name = 'LISTING_VIEWED' AND step2_name = 'RESERVATION_REQUESTED' AND step3_name = 'BOOKING_CONFIRMED' AND (confirm_time - view_time) <= INTERVAL '24 hours' ORDER BY guest_id ASC, listing_id ASC;",
    "expectedColumns": [
      "guest_id",
      "listing_id",
      "view_time",
      "confirm_time"
    ],
    "hints": [
      "Use LEAD(event_name, 1) and LEAD(event_name, 2).",
      "Validate step names.",
      "Ensure elapsed interval <= 24 hours."
    ],
    "explanation": "Conversion sequence timing isolates host approval latency in reservation requests.",
    "number": 248
  },
  {
    "id": "adv-249",
    "title": "249. Home Depot: Lumber Yard FIFO Bundle Inventory Depletion",
    "difficulty": "Hard",
    "companies": [
      "Home Depot",
      "Lowe's"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nHome Depot Pro Contractor Desk sells framing lumber bundles using FIFO depletion rules. A general contractor purchases 70 bundles of '2x4_PINE'. Allocate bundles across incoming mill delivery shipments in chronological order and compute remaining bundles per shipment.\n\n### Requirements\n- Compute cumulative bundles available ordered by delivery_date ASC.\n- Allocate 70 bundles across shipments.\n- Calculate remaining_bundles per shipment.\n- Only display shipments from which bundles were allocated.\n- Output columns: delivery_id, total_bundles, allocated_bundles, remaining_bundles.\n- Sort by delivery_id ascending.\n\n### Input Schema\n**lumber_inventory** (delivery_id INT, lumber_type VARCHAR, delivery_date DATE, total_bundles INT)",
    "schemaSql": "CREATE TABLE lumber_inventory (delivery_id INT PRIMARY KEY, lumber_type VARCHAR(20), delivery_date DATE, total_bundles INT);\nINSERT INTO lumber_inventory VALUES (1, '2x4_PINE', '2025-01-01', 25), (2, '2x4_PINE', '2025-01-03', 30), (3, '2x4_PINE', '2025-01-07', 40), (4, '2x4_PINE', '2025-01-10', 50);",
    "starterSql": "-- 249. Home Depot: Lumber Yard FIFO Bundle Inventory Depletion\n-- Output: delivery_id, total_bundles, allocated_bundles, remaining_bundles\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT delivery_id, total_bundles, SUM(total_bundles) OVER (ORDER BY delivery_date ASC) AS cum_units, COALESCE(SUM(total_bundles) OVER (ORDER BY delivery_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM lumber_inventory WHERE lumber_type = '2x4_PINE') SELECT delivery_id, total_bundles, LEAST(total_bundles, GREATEST(0, 70 - prev_cum)) AS allocated_bundles, total_bundles - LEAST(total_bundles, GREATEST(0, 70 - prev_cum)) AS remaining_bundles FROM cum WHERE prev_cum < 70 ORDER BY delivery_id ASC;",
    "expectedColumns": [
      "delivery_id",
      "total_bundles",
      "allocated_bundles",
      "remaining_bundles"
    ],
    "hints": [
      "Compute cumulative bundles with SUM() OVER.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 70."
    ],
    "explanation": "FIFO lumber turnover avoids wood warping from prolonged outdoor storage.",
    "number": 249
  },
  {
    "id": "adv-250",
    "title": "250. Flow Traders: Corporate Bond Liquidity Arbitrage Spread Monitor",
    "difficulty": "Hard",
    "companies": [
      "Flow Traders",
      "Jane Street"
    ],
    "topics": [
      "JOIN",
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nFlow Traders Fixed Income Desk scans corporate bond ETF premium/discounts. Compare the market price of Corporate Bond ETF ('LQD_ETF') against the theoretical sum of its constituent bond prices and weights.\n\n### Requirements\n- Calculate synthetic bond NAV as sum of (bond_price * weight_pct / 100).\n- Calculate etf_spread as market_price minus synthetic NAV, rounded to 2 decimal places.\n- Output columns: etf_symbol, market_price, synthetic_nav, etf_spread.\n- Sort by etf_symbol ascending.\n\n### Input Schema\n**bond_etf_market** (etf_symbol VARCHAR, market_price NUMERIC)\n\n**bond_constituents** (id INT, etf_symbol VARCHAR, bond_cusip VARCHAR, weight_pct NUMERIC, bond_price NUMERIC)",
    "schemaSql": "CREATE TABLE bond_etf_market (etf_symbol VARCHAR(10) PRIMARY KEY, market_price NUMERIC);\nCREATE TABLE bond_constituents (id INT PRIMARY KEY, etf_symbol VARCHAR(10), bond_cusip VARCHAR(20), weight_pct NUMERIC, bond_price NUMERIC);\nINSERT INTO bond_etf_market VALUES ('LQD_ETF', 108.50);\nINSERT INTO bond_constituents VALUES (1, 'LQD_ETF', 'AAPL_2030', 50.0, 105.00), (2, 'LQD_ETF', 'MSFT_2032', 50.0, 110.00);",
    "starterSql": "-- 250. Flow Traders: Corporate Bond Liquidity Arbitrage Spread Monitor\n-- Output: etf_symbol, market_price, synthetic_nav, etf_spread\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT m.etf_symbol, m.market_price, ROUND(SUM(b.bond_price * b.weight_pct / 100.0), 2) AS synthetic_nav, ROUND(m.market_price - SUM(b.bond_price * b.weight_pct / 100.0), 2) AS etf_spread FROM bond_etf_market m JOIN bond_constituents b ON m.etf_symbol = b.etf_symbol GROUP BY m.etf_symbol, m.market_price ORDER BY m.etf_symbol ASC;",
    "expectedColumns": [
      "etf_symbol",
      "market_price",
      "synthetic_nav",
      "etf_spread"
    ],
    "hints": [
      "Join ETF price to constituent table.",
      "Sum price * weight / 100 to compute NAV.",
      "Compute market price minus NAV."
    ],
    "explanation": "Bond ETF market makers arbitrage pricing gaps between illiquid underlying bonds and liquid ETF wrappers.",
    "number": 250
  },
  {
    "id": "adv-251",
    "title": "251. Twitch: Live Stream Viewing Sessionization with 30-Minute Disconnect Timeout",
    "difficulty": "Hard",
    "companies": [
      "Twitch",
      "YouTube"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nTwitch Audience Telemetry measures continuous stream viewing sessions. A viewing session expires if a user is disconnected or inactive for more than 30 minutes between heartbeat pings. Find session start time and total heartbeat pings per session.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior heartbeat ping.\n- Flag new session when elapsed time > 30 minutes or on first ping.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, heartbeat_count.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**stream_heartbeats** (id INT, user_id INT, channel_id INT, ping_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE stream_heartbeats (id INT PRIMARY KEY, user_id INT, channel_id INT, ping_time TIMESTAMP);\nINSERT INTO stream_heartbeats VALUES (1, 101, 1, '2025-01-01 19:00:00'), (2, 101, 1, '2025-01-01 19:15:00'), (3, 101, 1, '2025-01-01 19:30:00'), (4, 101, 1, '2025-01-01 20:15:00'), (5, 102, 2, '2025-01-01 21:00:00');",
    "starterSql": "-- 251. Twitch: Live Stream Viewing Sessionization with 30-Minute Disconnect Timeout\n-- Output: user_id, session_id, session_start, heartbeat_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, ping_time, CASE WHEN LAG(ping_time) OVER (PARTITION BY user_id ORDER BY ping_time ASC) IS NULL OR (ping_time - LAG(ping_time) OVER (PARTITION BY user_id ORDER BY ping_time ASC)) > INTERVAL '30 minutes' THEN 1 ELSE 0 END AS is_new_session FROM stream_heartbeats), sessions AS (SELECT user_id, ping_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY ping_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(ping_time) AS session_start, COUNT(*) AS heartbeat_count FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "heartbeat_count"
    ],
    "hints": [
      "Flag session starts with LAG > 30 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Heartbeat sessionization calculates accurate watch-time minutes for creator ad payouts.",
    "number": 251
  },
  {
    "id": "adv-252",
    "title": "252. Notion: Recursive Document Page Hierarchy and Full Breadcrumb Path",
    "difficulty": "Hard",
    "companies": [
      "Notion",
      "Google"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nNotion Workspace Graph builds navigation breadcrumb paths. Given a page hierarchy with nested parent pages (parent_page_id), traverse from root pages (parent_page_id IS NULL) down to every subpage, generating a breadcrumb path like 'Workspace / Engineering / Specs'.\n\n### Requirements\n- Start with root pages where parent_page_id IS NULL at level 1.\n- Recursively join child pages, incrementing nesting_level by 1.\n- Build breadcrumb string by concatenating parent and child page titles.\n- Output columns: page_id, page_title, nesting_level, breadcrumb_path.\n- Sort by nesting_level ascending, page_id ascending.\n\n### Input Schema\n**notion_pages** (page_id INT, parent_page_id INT, page_title VARCHAR)",
    "schemaSql": "CREATE TABLE notion_pages (page_id INT PRIMARY KEY, parent_page_id INT, page_title VARCHAR(50));\nINSERT INTO notion_pages VALUES (1, NULL, 'Company Wiki'), (2, 1, 'Engineering'), (3, 1, 'Product Management'), (4, 2, 'Architecture Specs'), (5, 4, 'Database Schema');",
    "starterSql": "-- 252. Notion: Recursive Document Page Hierarchy and Full Breadcrumb Path\n-- Output: page_id, page_title, nesting_level, breadcrumb_path\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE page_tree AS (SELECT page_id, page_title, 1 AS nesting_level, CAST(page_title AS VARCHAR(255)) AS breadcrumb_path FROM notion_pages WHERE parent_page_id IS NULL UNION ALL SELECT p.page_id, p.page_title, t.nesting_level + 1, CAST(t.breadcrumb_path || ' / ' || p.page_title AS VARCHAR(255)) FROM notion_pages p JOIN page_tree t ON p.parent_page_id = t.page_id) SELECT page_id, page_title, nesting_level, breadcrumb_path FROM page_tree ORDER BY nesting_level ASC, page_id ASC;",
    "expectedColumns": [
      "page_id",
      "page_title",
      "nesting_level",
      "breadcrumb_path"
    ],
    "hints": [
      "Start recursion where parent_page_id IS NULL.",
      "Join child pages on parent_page_id = t.page_id.",
      "Concatenate breadcrumb path."
    ],
    "explanation": "Recursive trees model infinite-depth nested document structures.",
    "number": 252
  },
  {
    "id": "adv-253",
    "title": "253. LeetCode: Daily Coding Challenge Consecutive Streak Calculation",
    "difficulty": "Hard",
    "companies": [
      "LeetCode",
      "HackerRank"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nLeetCode Profile Stats awards the 100-Day Streak Badge. For each user, calculate the length in calendar days of their longest consecutive daily challenge submission streak.\n\n### Requirements\n- Group consecutive calendar solve dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**leetcode_submissions** (id INT, user_id INT, solve_date DATE)",
    "schemaSql": "CREATE TABLE leetcode_submissions (id INT PRIMARY KEY, user_id INT, solve_date DATE);\nINSERT INTO leetcode_submissions VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-02'), (3, 101, '2025-01-03'), (4, 101, '2025-01-05'), (5, 102, '2025-01-01'), (6, 102, '2025-01-02'), (7, 102, '2025-01-03'), (8, 102, '2025-01-04');",
    "starterSql": "-- 253. LeetCode: Daily Coding Challenge Consecutive Streak Calculation\n-- Output: user_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_solves AS (SELECT DISTINCT user_id, solve_date FROM leetcode_submissions), grouped AS (SELECT user_id, solve_date, solve_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY solve_date ASC) * INTERVAL '1 day') AS grp FROM distinct_solves), streaks AS (SELECT user_id, grp, COUNT(*) AS streak_days FROM grouped GROUP BY user_id, grp) SELECT user_id, MAX(streak_days) AS longest_streak_days FROM streaks GROUP BY user_id ORDER BY longest_streak_days DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "longest_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from solve_date.",
      "Group by user and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Streak algorithms encourage daily developer problem-solving habits.",
    "number": 253
  },
  {
    "id": "adv-254",
    "title": "254. Canva: User Template Creation Quarterly Retention Matrix",
    "difficulty": "Hard",
    "companies": [
      "Canva",
      "Adobe"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCanva Creator Monetization analyzes template designer retention across quarters. For creators who published their first template in Q1 2024 (Cohort 2024-Q1), compute the number of creators who published templates in Q0 (Q1 2024), Q1 (Q2 2024), and Q2 (Q3 2024).\n\n### Requirements\n- Filter for creators whose earliest publish date was in Q1 2024.\n- Count distinct creators active in Q0, Q1, and Q2.\n- Output columns: cohort_quarter, q0_creators, q1_creators, q2_creators.\n- Sort by cohort_quarter ascending.\n\n### Input Schema\n**creator_templates** (id INT, creator_id INT, published_date DATE)",
    "schemaSql": "CREATE TABLE creator_templates (id INT PRIMARY KEY, creator_id INT, published_date DATE);\nINSERT INTO creator_templates VALUES (1, 101, '2024-01-10'), (2, 101, '2024-04-15'), (3, 101, '2024-07-20'), (4, 102, '2024-02-15'), (5, 102, '2024-05-18'), (6, 103, '2024-03-01'), (7, 104, '2024-04-05');",
    "starterSql": "-- 254. Canva: User Template Creation Quarterly Retention Matrix\n-- Output: cohort_quarter, q0_creators, q1_creators, q2_creators\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_pub AS (SELECT creator_id, MIN(published_date) AS min_date FROM creator_templates GROUP BY creator_id HAVING MIN(published_date) BETWEEN '2024-01-01' AND '2024-03-31'), activity AS (SELECT t.creator_id, CASE WHEN t.published_date BETWEEN '2024-01-01' AND '2024-03-31' THEN 0 WHEN t.published_date BETWEEN '2024-04-01' AND '2024-06-30' THEN 1 WHEN t.published_date BETWEEN '2024-07-01' AND '2024-09-30' THEN 2 END AS q_idx FROM creator_templates t JOIN first_pub f ON t.creator_id = f.creator_id) SELECT '2024-Q1' AS cohort_quarter, COUNT(DISTINCT CASE WHEN q_idx = 0 THEN creator_id END) AS q0_creators, COUNT(DISTINCT CASE WHEN q_idx = 1 THEN creator_id END) AS q1_creators, COUNT(DISTINCT CASE WHEN q_idx = 2 THEN creator_id END) AS q2_creators FROM activity GROUP BY cohort_quarter ORDER BY cohort_quarter ASC;",
    "expectedColumns": [
      "cohort_quarter",
      "q0_creators",
      "q1_creators",
      "q2_creators"
    ],
    "hints": [
      "Filter creators starting in Q1 2024.",
      "Map relative quarters.",
      "Aggregate distinct active creators."
    ],
    "explanation": "Creator quarterly retention measures marketplace supply side sustainability.",
    "number": 254
  },
  {
    "id": "adv-255",
    "title": "255. CrowdStrike: Endpoint Malware Outbreak Timeline Interval Merging",
    "difficulty": "Hard",
    "companies": [
      "CrowdStrike",
      "SentinelOne"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCrowdStrike Falcon Endpoint Detection consolidates overlapping malware outbreak alert intervals. Multiple detection heuristics fire alerts that overlap on the same host machine. Merge overlapping alert intervals into continuous compromise windows.\n\n### Requirements\n- Track running maximum end_time across alerts per host_id.\n- Group overlapping and contiguous intervals into distinct incident windows.\n- Calculate duration in minutes.\n- Output columns: host_id, compromise_start, compromise_end, duration_minutes.\n- Sort by host_id ascending, compromise_start ascending.\n\n### Input Schema\n**malware_alerts** (id INT, host_id VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE malware_alerts (id INT PRIMARY KEY, host_id VARCHAR(20), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO malware_alerts VALUES (1, 'HOST_WIN_01', '2025-01-01 03:00:00', '2025-01-01 03:30:00'), (2, 'HOST_WIN_01', '2025-01-01 03:15:00', '2025-01-01 04:00:00'), (3, 'HOST_WIN_01', '2025-01-01 05:00:00', '2025-01-01 05:30:00'), (4, 'HOST_SRV_02', '2025-01-01 06:00:00', '2025-01-01 06:45:00');",
    "starterSql": "-- 255. CrowdStrike: Endpoint Malware Outbreak Timeline Interval Merging\n-- Output: host_id, compromise_start, compromise_end, duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT host_id, start_time, end_time, MAX(end_time) OVER (PARTITION BY host_id ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM malware_alerts), islands AS (SELECT host_id, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY host_id ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT host_id, MIN(start_time) AS compromise_start, MAX(end_time) AS compromise_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS duration_minutes FROM islands GROUP BY host_id, island_id ORDER BY host_id ASC, compromise_start ASC;",
    "expectedColumns": [
      "host_id",
      "compromise_start",
      "compromise_end",
      "duration_minutes"
    ],
    "hints": [
      "Compare current start against running MAX(end_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Merging detection alerts produces clean dwell-time metrics during endpoint forensic investigations.",
    "number": 255
  },
  {
    "id": "adv-256",
    "title": "256. Ford: F-150 Lightning Powertrain Subcomponent Tree Cost Rollup",
    "difficulty": "Hard",
    "companies": [
      "Ford",
      "Tesla"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nFord Motor Company Global Manufacturing audits electric vehicle powertrain assembly trees. For the 'F-150 Lightning Dual Motor', recursively traverse subcomponents and calculate total unit quantities of leaf raw parts required per truck.\n\n### Requirements\n- Start with top assembly (parent_id IS NULL).\n- Recursively traverse part tree multiplying quantities down.\n- Filter for leaf components.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**f150_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE f150_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO f150_bom VALUES (1, NULL, 'F-150 Lightning Dual Motor', 1), (2, 1, 'Extended Range Battery', 1), (3, 1, 'Front Inverter', 1), (4, 2, 'Lithium Cell Module', 16), (5, 4, 'Prismatic Cell', 12), (6, 3, 'Silicon Carbide MOSFET', 6);",
    "starterSql": "-- 256. Ford: F-150 Lightning Powertrain Subcomponent Tree Cost Rollup\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM f150_bom WHERE parent_id IS NULL UNION ALL SELECT f.id, f.parent_id, f.part_name, t.total_qty * f.quantity FROM f150_bom f JOIN bom_tree t ON f.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM f150_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Powertrain hierarchy explosions support tier-1 automotive supplier parts procurement.",
    "number": 256
  },
  {
    "id": "adv-257",
    "title": "257. Stripe: Payment Webhook Retry Idempotency and Event Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nStripe Webhook Delivery sends idempotent payment notifications with potential retries. When multiple webhook delivery records exist for the same idempotency_key, select the single authoritative attempt with status = 'SUCCESS', or the latest attempt if none succeeded.\n\n### Requirements\n- Order attempts per idempotency_key: status = 'SUCCESS' first, then latest delivered_at.\n- Filter for rank = 1.\n- Output columns: idempotency_key, event_type, status, delivered_at.\n- Sort by idempotency_key ascending.\n\n### Input Schema\n**webhook_deliveries** (id INT, idempotency_key VARCHAR, event_type VARCHAR, status VARCHAR, delivered_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE webhook_deliveries (id INT PRIMARY KEY, idempotency_key VARCHAR(20), event_type VARCHAR(30), status VARCHAR(20), delivered_at TIMESTAMP);\nINSERT INTO webhook_deliveries VALUES (1, 'KEY_101', 'charge.succeeded', 'FAILURE', '2025-01-01 10:00:00'), (2, 'KEY_101', 'charge.succeeded', 'SUCCESS', '2025-01-01 10:00:05'), (3, 'KEY_102', 'payout.created', 'FAILURE', '2025-01-01 11:00:00'), (4, 'KEY_102', 'payout.created', 'FAILURE', '2025-01-01 11:00:10'), (5, 'KEY_103', 'customer.created', 'SUCCESS', '2025-01-01 12:00:00');",
    "starterSql": "-- 257. Stripe: Payment Webhook Retry Idempotency and Event Deduplication\n-- Output: idempotency_key, event_type, status, delivered_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT idempotency_key, event_type, status, delivered_at, ROW_NUMBER() OVER (PARTITION BY idempotency_key ORDER BY CASE WHEN status = 'SUCCESS' THEN 1 ELSE 2 END ASC, delivered_at DESC) AS rn FROM webhook_deliveries) SELECT idempotency_key, event_type, status, delivered_at FROM ranked WHERE rn = 1 ORDER BY idempotency_key ASC;",
    "expectedColumns": [
      "idempotency_key",
      "event_type",
      "status",
      "delivered_at"
    ],
    "hints": [
      "Use CASE WHEN in ORDER BY to prioritize SUCCESS.",
      "Tie break with delivered_at DESC.",
      "Filter rn = 1."
    ],
    "explanation": "Webhook idempotency deduplication ensures third-party merchants do not fulfill duplicate customer orders.",
    "number": 257
  },
  {
    "id": "adv-258",
    "title": "258. LinkedIn: Job Applicant Sourcing Funnel Transition Sequence",
    "difficulty": "Hard",
    "companies": [
      "LinkedIn",
      "Indeed"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nLinkedIn Talent Solutions analyzes recruiter conversion pipelines. Identify candidates who progressed through the exact sequence: 'APPLIED' -> 'PHONE_SCREEN' -> 'ONSITE_INTERVIEW' -> 'OFFER_EXTENDED' within 30 days.\n\n### Requirements\n- Use LEAD to inspect subsequent recruitment steps for each candidate_id.\n- Validate strict 4-step sequence names.\n- Check that elapsed days between apply and offer <= 30.\n- Output columns: candidate_id, apply_date, offer_date.\n- Sort by candidate_id ascending.\n\n### Input Schema\n**recruitment_pipeline** (id INT, candidate_id INT, stage_name VARCHAR, stage_date DATE)",
    "schemaSql": "CREATE TABLE recruitment_pipeline (id INT PRIMARY KEY, candidate_id INT, stage_name VARCHAR(30), stage_date DATE);\nINSERT INTO recruitment_pipeline VALUES (1, 101, 'APPLIED', '2025-01-01'), (2, 101, 'PHONE_SCREEN', '2025-01-05'), (3, 101, 'ONSITE_INTERVIEW', '2025-01-15'), (4, 101, 'OFFER_EXTENDED', '2025-01-20'), (5, 102, 'APPLIED', '2025-01-02'), (6, 102, 'REJECTED', '2025-01-04');",
    "starterSql": "-- 258. LinkedIn: Job Applicant Sourcing Funnel Transition Sequence\n-- Output: candidate_id, apply_date, offer_date\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT candidate_id, stage_name, stage_date AS apply_date, LEAD(stage_name, 1) OVER (PARTITION BY candidate_id ORDER BY stage_date ASC) AS s2, LEAD(stage_name, 2) OVER (PARTITION BY candidate_id ORDER BY stage_date ASC) AS s3, LEAD(stage_name, 3) OVER (PARTITION BY candidate_id ORDER BY stage_date ASC) AS s4, LEAD(stage_date, 3) OVER (PARTITION BY candidate_id ORDER BY stage_date ASC) AS offer_date FROM recruitment_pipeline) SELECT candidate_id, apply_date, offer_date FROM seq WHERE stage_name = 'APPLIED' AND s2 = 'PHONE_SCREEN' AND s3 = 'ONSITE_INTERVIEW' AND s4 = 'OFFER_EXTENDED' AND (offer_date - apply_date) <= 30 ORDER BY candidate_id ASC;",
    "expectedColumns": [
      "candidate_id",
      "apply_date",
      "offer_date"
    ],
    "hints": [
      "Use multi-offset LEAD up to offset 3.",
      "Verify sequence names.",
      "Filter duration <= 30 days."
    ],
    "explanation": "Recruiter pipeline sequence tracking isolates time-to-hire across interview loops.",
    "number": 258
  },
  {
    "id": "adv-259",
    "title": "259. Best Buy: Geek Squad Refurbished Appliance FIFO Lot Allocation",
    "difficulty": "Hard",
    "companies": [
      "Best Buy",
      "Amazon"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nBest Buy Outlet stores deplete refurbished appliance intake batches on a FIFO basis. An institutional customer orders 45 refurbished tablets ('REFURB_TAB'). Allocate units across intake lots in chronological order and compute remaining balance on each lot.\n\n### Requirements\n- Compute cumulative units available ordered by intake_date ASC.\n- Allocate 45 units across lots.\n- Calculate remaining_lot_units.\n- Output columns: lot_id, lot_units, allocated_units, remaining_lot_units.\n- Sort by lot_id ascending.\n\n### Input Schema\n**refurb_lots** (lot_id INT, product_sku VARCHAR, intake_date DATE, lot_units INT)",
    "schemaSql": "CREATE TABLE refurb_lots (lot_id INT PRIMARY KEY, product_sku VARCHAR(20), intake_date DATE, lot_units INT);\nINSERT INTO refurb_lots VALUES (1, 'REFURB_TAB', '2025-01-01', 20), (2, 'REFURB_TAB', '2025-01-05', 20), (3, 'REFURB_TAB', '2025-01-10', 30), (4, 'REFURB_TAB', '2025-01-15', 25);",
    "starterSql": "-- 259. Best Buy: Geek Squad Refurbished Appliance FIFO Lot Allocation\n-- Output: lot_id, lot_units, allocated_units, remaining_lot_units\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT lot_id, lot_units, SUM(lot_units) OVER (ORDER BY intake_date ASC) AS cum_units, COALESCE(SUM(lot_units) OVER (ORDER BY intake_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM refurb_lots WHERE product_sku = 'REFURB_TAB') SELECT lot_id, lot_units, LEAST(lot_units, GREATEST(0, 45 - prev_cum)) AS allocated_units, lot_units - LEAST(lot_units, GREATEST(0, 45 - prev_cum)) AS remaining_lot_units FROM cum WHERE prev_cum < 45 ORDER BY lot_id ASC;",
    "expectedColumns": [
      "lot_id",
      "lot_units",
      "allocated_units",
      "remaining_lot_units"
    ],
    "hints": [
      "Track cumulative intake units.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 45."
    ],
    "explanation": "Refurbished product FIFO turnover prevents battery degradation while in storage.",
    "number": 259
  },
  {
    "id": "adv-260",
    "title": "260. Optiver: High-Frequency Index Option Put-Call Parity Arbitrage Scanner",
    "difficulty": "Hard",
    "companies": [
      "Optiver",
      "Citadel"
    ],
    "topics": [
      "JOIN",
      "ROUND",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nOptiver Options Market Making audits European index options for Put-Call Parity violations: C - P = S - K * exp(-rT). In a simplified zero-rate model: Call Price - Put Price should equal Stock Price - Strike Price. Flag all strike contracts where the pricing discrepancy exceeds $0.50.\n\n### Requirements\n- Join calls and puts on ticker, expiration, and strike_price.\n- Calculate parity_diff as (call_price - put_price) - (stock_price - strike_price), rounded to 2 decimal places.\n- Filter for ABS(parity_diff) > 0.50.\n- Output columns: ticker, strike_price, call_price, put_price, parity_diff.\n- Sort by ABS(parity_diff) descending, strike_price ascending.\n\n### Input Schema\n**option_chain** (id INT, ticker VARCHAR, expiration DATE, strike_price NUMERIC, option_type VARCHAR, option_price NUMERIC, underlying_price NUMERIC)",
    "schemaSql": "CREATE TABLE option_chain (id INT PRIMARY KEY, ticker VARCHAR(10), expiration DATE, strike_price NUMERIC, option_type VARCHAR(5), option_price NUMERIC, underlying_price NUMERIC);\nINSERT INTO option_chain VALUES (1, 'SPY', '2025-01-17', 580.00, 'CALL', 15.20, 590.00), (2, 'SPY', '2025-01-17', 580.00, 'PUT', 4.40, 590.00), (3, 'SPY', '2025-01-17', 590.00, 'CALL', 8.50, 590.00), (4, 'SPY', '2025-01-17', 590.00, 'PUT', 8.45, 590.00);",
    "starterSql": "-- 260. Optiver: High-Frequency Index Option Put-Call Parity Arbitrage Scanner\n-- Output: ticker, strike_price, call_price, put_price, parity_diff\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT c.ticker, c.strike_price, c.option_price AS call_price, p.option_price AS put_price, ROUND((c.option_price - p.option_price) - (c.underlying_price - c.strike_price), 2) AS parity_diff FROM option_chain c JOIN option_chain p ON c.ticker = p.ticker AND c.expiration = p.expiration AND c.strike_price = p.strike_price WHERE c.option_type = 'CALL' AND p.option_type = 'PUT' AND ABS((c.option_price - p.option_price) - (c.underlying_price - c.strike_price)) > 0.50 ORDER BY ABS((c.option_price - p.option_price) - (c.underlying_price - c.strike_price)) DESC, c.strike_price ASC;",
    "expectedColumns": [
      "ticker",
      "strike_price",
      "call_price",
      "put_price",
      "parity_diff"
    ],
    "hints": [
      "Join CALL row to PUT row on same contract terms.",
      "Calculate (Call - Put) - (Stock - Strike).",
      "Filter where ABS(diff) > 0.50."
    ],
    "explanation": "Put-Call Parity bounds eliminate risk-free synthetic arbitrage in derivatives trading.",
    "number": 260
  },
  {
    "id": "adv-261",
    "title": "261. YouTube: Watch Sessionization with 20-Minute Video Inactivity Window",
    "difficulty": "Hard",
    "companies": [
      "YouTube",
      "Netflix"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nYouTube Video Analytics groups user video stream events into sessions. An active viewing session lapses if more than 20 minutes elapses between videos. Identify each user session, its start time, and total videos watched.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior video view.\n- Flag new session when elapsed time > 20 minutes or on first video.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, total_videos.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**yt_views** (id INT, user_id INT, video_id VARCHAR, view_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE yt_views (id INT PRIMARY KEY, user_id INT, video_id VARCHAR(20), view_time TIMESTAMP);\nINSERT INTO yt_views VALUES (1, 101, 'VID_1', '2025-01-01 15:00:00'), (2, 101, 'VID_2', '2025-01-01 15:10:00'), (3, 101, 'VID_3', '2025-01-01 15:40:00'), (4, 102, 'VID_4', '2025-01-01 16:00:00'), (5, 102, 'VID_5', '2025-01-01 16:08:00');",
    "starterSql": "-- 261. YouTube: Watch Sessionization with 20-Minute Video Inactivity Window\n-- Output: user_id, session_id, session_start, total_videos\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, view_time, CASE WHEN LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time ASC) IS NULL OR (view_time - LAG(view_time) OVER (PARTITION BY user_id ORDER BY view_time ASC)) > INTERVAL '20 minutes' THEN 1 ELSE 0 END AS is_new_session FROM yt_views), sessions AS (SELECT user_id, view_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY view_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(view_time) AS session_start, COUNT(*) AS total_videos FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "total_videos"
    ],
    "hints": [
      "Flag session starts with LAG > 20 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Watch sessions inform autoplay algorithms and ad frequency capping.",
    "number": 261
  },
  {
    "id": "adv-262",
    "title": "262. Slack: Recursive User Group Mention and Nested Channel Membership",
    "difficulty": "Hard",
    "companies": [
      "Slack",
      "Discord"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSlack Permissions Engine evaluates nested user group mentions. When a user @mentions a top-level group ('@all-engineers'), the mention cascades down through all nested sub-teams. Given root group ('all-engineers'), find all sub-groups in its hierarchy and their nesting depth.\n\n### Requirements\n- Start with parent_group = 'all-engineers' at depth 1.\n- Recursively find all nested child groups.\n- Output columns: root_group, sub_group, nesting_depth.\n- Sort by nesting_depth ascending, sub_group ascending.\n\n### Input Schema\n**user_groups** (id INT, parent_group VARCHAR, child_group VARCHAR)",
    "schemaSql": "CREATE TABLE user_groups (id INT PRIMARY KEY, parent_group VARCHAR(50), child_group VARCHAR(50));\nINSERT INTO user_groups VALUES (1, 'all-engineers', 'backend-team'), (2, 'all-engineers', 'frontend-team'), (3, 'backend-team', 'infra-core'), (4, 'infra-core', 'sre-oncall'), (5, 'sales-team', 'enterprise-sales');",
    "starterSql": "-- 262. Slack: Recursive User Group Mention and Nested Channel Membership\n-- Output: root_group, sub_group, nesting_depth\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE group_tree AS (SELECT parent_group AS root_group, child_group AS sub_group, 1 AS nesting_depth FROM user_groups WHERE parent_group = 'all-engineers' UNION ALL SELECT g.root_group, u.child_group, g.nesting_depth + 1 FROM user_groups u JOIN group_tree g ON u.parent_group = g.sub_group) SELECT root_group, sub_group, nesting_depth FROM group_tree ORDER BY nesting_depth ASC, sub_group ASC;",
    "expectedColumns": [
      "root_group",
      "sub_group",
      "nesting_depth"
    ],
    "hints": [
      "Start recursion where parent_group is 'all-engineers'.",
      "Join child_group to parent_group.",
      "Increment depth."
    ],
    "explanation": "Nested user group resolution broadcasts urgent notifications down organizational sub-teams.",
    "number": 262
  },
  {
    "id": "adv-263",
    "title": "263. Apple: Daily Active Workout Streak Islands Detection",
    "difficulty": "Hard",
    "companies": [
      "Apple",
      "Strava"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nApple Fitness Activity Rings tracks daily Move ring closes. For each user, find their longest contiguous consecutive daily ring closure streak.\n\n### Requirements\n- Group consecutive calendar ring close dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**ring_closures** (id INT, user_id INT, close_date DATE)",
    "schemaSql": "CREATE TABLE ring_closures (id INT PRIMARY KEY, user_id INT, close_date DATE);\nINSERT INTO ring_closures VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-02'), (3, 101, '2025-01-03'), (4, 101, '2025-01-04'), (5, 101, '2025-01-06'), (6, 102, '2025-01-01'), (7, 102, '2025-01-02');",
    "starterSql": "-- 263. Apple: Daily Active Workout Streak Islands Detection\n-- Output: user_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_days AS (SELECT DISTINCT user_id, close_date FROM ring_closures), grouped AS (SELECT user_id, close_date, close_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY close_date ASC) * INTERVAL '1 day') AS grp FROM distinct_days), streaks AS (SELECT user_id, grp, COUNT(*) AS streak_days FROM grouped GROUP BY user_id, grp) SELECT user_id, MAX(streak_days) AS longest_streak_days FROM streaks GROUP BY user_id ORDER BY longest_streak_days DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "longest_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from close_date.",
      "Group by user and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Activity streak badges motivate daily workout consistency.",
    "number": 263
  },
  {
    "id": "adv-264",
    "title": "264. Notion: Workspace Team Member Monthly Activity Retention Matrix",
    "difficulty": "Hard",
    "companies": [
      "Notion",
      "Slack"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nNotion Enterprise Growth analyzes team workspace retention by invite month. For team members who joined a workspace in January 2024 (Cohort 2024-01), compute the number of active members in Month 0, Month 1, and Month 2.\n\n### Requirements\n- Identify members whose earliest activity was in January 2024.\n- Calculate relative month index (0, 1, 2).\n- Count distinct active members per month index.\n- Output columns: cohort_month, m0_members, m1_members, m2_members.\n- Sort by cohort_month ascending.\n\n### Input Schema\n**workspace_activity** (id INT, user_id INT, activity_date DATE)",
    "schemaSql": "CREATE TABLE workspace_activity (id INT PRIMARY KEY, user_id INT, activity_date DATE);\nINSERT INTO workspace_activity VALUES (1, 101, '2024-01-05'), (2, 101, '2024-02-10'), (3, 101, '2024-03-12'), (4, 102, '2024-01-15'), (5, 102, '2024-02-20'), (6, 103, '2024-01-25');",
    "starterSql": "-- 264. Notion: Workspace Team Member Monthly Activity Retention Matrix\n-- Output: cohort_month, m0_members, m1_members, m2_members\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_act AS (SELECT user_id, MIN(activity_date) AS min_date FROM workspace_activity GROUP BY user_id HAVING DATE_TRUNC('month', MIN(activity_date)) = '2024-01-01'::DATE), activity AS (SELECT w.user_id, (EXTRACT(YEAR FROM w.activity_date) - EXTRACT(YEAR FROM f.min_date)) * 12 + (EXTRACT(MONTH FROM w.activity_date) - EXTRACT(MONTH FROM f.min_date)) AS m_idx FROM workspace_activity w JOIN first_act f ON w.user_id = f.user_id) SELECT '2024-01' AS cohort_month, COUNT(DISTINCT CASE WHEN m_idx = 0 THEN user_id END) AS m0_members, COUNT(DISTINCT CASE WHEN m_idx = 1 THEN user_id END) AS m1_members, COUNT(DISTINCT CASE WHEN m_idx = 2 THEN user_id END) AS m2_members FROM activity GROUP BY cohort_month ORDER BY cohort_month ASC;",
    "expectedColumns": [
      "cohort_month",
      "m0_members",
      "m1_members",
      "m2_members"
    ],
    "hints": [
      "Filter users joining in Jan 2024.",
      "Map relative month index.",
      "Count distinct active users."
    ],
    "explanation": "Enterprise workspace adoption requires sustained team collaboration past onboarding.",
    "number": 264
  },
  {
    "id": "adv-265",
    "title": "265. New Relic: Infrastructure Host Incident Downtime Consolidation",
    "difficulty": "Hard",
    "companies": [
      "New Relic",
      "Datadog"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nNew Relic Infrastructure consolidates overlapping server alert intervals. When CPU and disk threshold alerts trigger overlapping downtime windows on the same host, merge them into consolidated outage periods.\n\n### Requirements\n- Track running maximum end_time across alerts per host_name.\n- Group overlapping and contiguous intervals into distinct incidents.\n- Calculate outage duration in minutes.\n- Output columns: host_name, outage_start, outage_end, outage_duration_minutes.\n- Sort by host_name ascending, outage_start ascending.\n\n### Input Schema\n**host_outages** (id INT, host_name VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE host_outages (id INT PRIMARY KEY, host_name VARCHAR(50), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO host_outages VALUES (1, 'ip-10-0-1-5', '2025-01-01 07:00:00', '2025-01-01 07:45:00'), (2, 'ip-10-0-1-5', '2025-01-01 07:30:00', '2025-01-01 08:15:00'), (3, 'ip-10-0-1-5', '2025-01-01 09:00:00', '2025-01-01 09:30:00'), (4, 'ip-10-0-2-8', '2025-01-01 10:00:00', '2025-01-01 10:40:00');",
    "starterSql": "-- 265. New Relic: Infrastructure Host Incident Downtime Consolidation\n-- Output: host_name, outage_start, outage_end, outage_duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT host_name, start_time, end_time, MAX(end_time) OVER (PARTITION BY host_name ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM host_outages), islands AS (SELECT host_name, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY host_name ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT host_name, MIN(start_time) AS outage_start, MAX(end_time) AS outage_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS outage_duration_minutes FROM islands GROUP BY host_name, island_id ORDER BY host_name ASC, outage_start ASC;",
    "expectedColumns": [
      "host_name",
      "outage_start",
      "outage_end",
      "outage_duration_minutes"
    ],
    "hints": [
      "Compare current start against running MAX(end_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Host downtime consolidation gives systems administrators clean incident resolution reports.",
    "number": 265
  },
  {
    "id": "adv-266",
    "title": "266. Lockheed Martin: Satellite Subsystem Bill of Materials Explosion",
    "difficulty": "Hard",
    "companies": [
      "Lockheed Martin",
      "Boeing"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nLockheed Martin Space Systems calculates hardware procurement for GPS III satellites. For the top-level 'Communications Payload', recursively explode the subassembly tree and calculate total units of leaf electronic components required.\n\n### Requirements\n- Start with top assembly (parent_id IS NULL).\n- Recursively traverse part tree multiplying quantities down.\n- Filter for leaf parts with no children.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**satellite_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE satellite_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO satellite_bom VALUES (1, NULL, 'Communications Payload', 1), (2, 1, 'Transponder Subsystem', 4), (3, 1, 'L-Band Antenna Array', 2), (4, 2, 'Solid State Power Amplifier', 2), (5, 2, 'Atomic Frequency Standard', 1), (6, 3, 'Phase Shifter Diode', 8);",
    "starterSql": "-- 266. Lockheed Martin: Satellite Subsystem Bill of Materials Explosion\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM satellite_bom WHERE parent_id IS NULL UNION ALL SELECT s.id, s.parent_id, s.part_name, t.total_qty * s.quantity FROM satellite_bom s JOIN bom_tree t ON s.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM satellite_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying quantities down.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Space mission hardware BOMs ensure precision manufacturing supply chain compliance.",
    "number": 266
  },
  {
    "id": "adv-267",
    "title": "267. Affirm: Buy-Now-Pay-Later Loan Application Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Affirm",
      "Klarna"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAffirm Credit Underwriting handles rapid checkout resubmissions. When multiple loan applications share the same checkout_token, prioritize applications with status = 'APPROVED', keeping the earliest created_at timestamp.\n\n### Requirements\n- Order applications per checkout_token: status = 'APPROVED' first, then earliest created_at.\n- Filter for rank = 1.\n- Output columns: checkout_token, user_id, loan_amount, status, created_at.\n- Sort by checkout_token ascending.\n\n### Input Schema\n**loan_applications** (id INT, checkout_token VARCHAR, user_id INT, loan_amount NUMERIC, status VARCHAR, created_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE loan_applications (id INT PRIMARY KEY, checkout_token VARCHAR(20), user_id INT, loan_amount NUMERIC, status VARCHAR(20), created_at TIMESTAMP);\nINSERT INTO loan_applications VALUES (1, 'TOK_101', 501, 850.00, 'DENIED', '2025-01-01 14:00:00'), (2, 'TOK_101', 501, 850.00, 'APPROVED', '2025-01-01 14:02:00'), (3, 'TOK_102', 502, 350.00, 'APPROVED', '2025-01-01 15:00:00'), (4, 'TOK_102', 502, 350.00, 'APPROVED', '2025-01-01 15:01:00');",
    "starterSql": "-- 267. Affirm: Buy-Now-Pay-Later Loan Application Deduplication\n-- Output: checkout_token, user_id, loan_amount, status, created_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT checkout_token, user_id, loan_amount, status, created_at, ROW_NUMBER() OVER (PARTITION BY checkout_token ORDER BY CASE WHEN status = 'APPROVED' THEN 1 ELSE 2 END ASC, created_at ASC) AS rn FROM loan_applications) SELECT checkout_token, user_id, loan_amount, status, created_at FROM ranked WHERE rn = 1 ORDER BY checkout_token ASC;",
    "expectedColumns": [
      "checkout_token",
      "user_id",
      "loan_amount",
      "status",
      "created_at"
    ],
    "hints": [
      "Use CASE WHEN to prioritize APPROVED.",
      "Tie-break with earliest created_at.",
      "Filter rn = 1."
    ],
    "explanation": "Credit decision deduplication avoids duplicate hard credit pulls and multiple loan origination fees.",
    "number": 267
  },
  {
    "id": "adv-268",
    "title": "268. Zoom: Enterprise Meeting Lifecycle Funnel Sequence",
    "difficulty": "Hard",
    "companies": [
      "Zoom",
      "Microsoft"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nZoom Enterprise Product Analytics tracks meeting creation to completion lifecycles. Identify enterprise meetings that completed the exact 3-step sequence: 'MEETING_SCHEDULED' -> 'HOST_JOINED' -> 'RECORDING_COMPLETED' in order within 120 minutes.\n\n### Requirements\n- Use LEAD to inspect next 2 steps for the same meeting_id.\n- Verify step names match 'MEETING_SCHEDULED', 'HOST_JOINED', and 'RECORDING_COMPLETED'.\n- Verify duration <= 120 minutes.\n- Output columns: meeting_id, scheduled_time, recording_time.\n- Sort by meeting_id ascending.\n\n### Input Schema\n**meeting_events** (id INT, meeting_id INT, event_type VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE meeting_events (id INT PRIMARY KEY, meeting_id INT, event_type VARCHAR(30), event_time TIMESTAMP);\nINSERT INTO meeting_events VALUES (1, 101, 'MEETING_SCHEDULED', '2025-01-01 10:00:00'), (2, 101, 'HOST_JOINED', '2025-01-01 10:02:00'), (3, 101, 'RECORDING_COMPLETED', '2025-01-01 10:55:00'), (4, 102, 'MEETING_SCHEDULED', '2025-01-01 11:00:00'), (5, 102, 'HOST_JOINED', '2025-01-01 11:05:00');",
    "starterSql": "-- 268. Zoom: Enterprise Meeting Lifecycle Funnel Sequence\n-- Output: meeting_id, scheduled_time, recording_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT meeting_id, event_type, event_time AS scheduled_time, LEAD(event_type, 1) OVER (PARTITION BY meeting_id ORDER BY event_time ASC) AS s2, LEAD(event_type, 2) OVER (PARTITION BY meeting_id ORDER BY event_time ASC) AS s3, LEAD(event_time, 2) OVER (PARTITION BY meeting_id ORDER BY event_time ASC) AS recording_time FROM meeting_events) SELECT meeting_id, scheduled_time, recording_time FROM seq WHERE event_type = 'MEETING_SCHEDULED' AND s2 = 'HOST_JOINED' AND s3 = 'RECORDING_COMPLETED' AND (recording_time - scheduled_time) <= INTERVAL '120 minutes' ORDER BY meeting_id ASC;",
    "expectedColumns": [
      "meeting_id",
      "scheduled_time",
      "recording_time"
    ],
    "hints": [
      "Use LEAD(event_type, 1) and LEAD(event_type, 2).",
      "Verify event names.",
      "Filter interval <= 120 minutes."
    ],
    "explanation": "Meeting feature adoption analysis measures cloud recording and AI transcription pipeline utilization.",
    "number": 268
  },
  {
    "id": "adv-269",
    "title": "269. Walmart: Perishable Produce Lot FIFO Expiration Depletion",
    "difficulty": "Hard",
    "companies": [
      "Walmart",
      "Target"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nWalmart Grocery Distribution depletes fresh produce inventory on a First-Expired, First-Out (FEFO/FIFO) basis. A supercenter orders 90 crates of 'ORGANIC_APPLES'. Allocate crates across incoming farm lots ordered by expiry_date ASC and compute remaining balance on each lot.\n\n### Requirements\n- Compute cumulative crates available ordered by expiry_date ASC.\n- Allocate 90 crates across lots.\n- Calculate remaining_crates per lot.\n- Only display lots from which crates were allocated.\n- Output columns: lot_id, total_crates, allocated_crates, remaining_crates.\n- Sort by lot_id ascending.\n\n### Input Schema\n**produce_lots** (lot_id INT, item_name VARCHAR, expiry_date DATE, total_crates INT)",
    "schemaSql": "CREATE TABLE produce_lots (lot_id INT PRIMARY KEY, item_name VARCHAR(30), expiry_date DATE, total_crates INT);\nINSERT INTO produce_lots VALUES (1, 'ORGANIC_APPLES', '2025-01-10', 40), (2, 'ORGANIC_APPLES', '2025-01-12', 40), (3, 'ORGANIC_APPLES', '2025-01-15', 50), (4, 'ORGANIC_APPLES', '2025-01-20', 60);",
    "starterSql": "-- 269. Walmart: Perishable Produce Lot FIFO Expiration Depletion\n-- Output: lot_id, total_crates, allocated_crates, remaining_crates\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT lot_id, total_crates, SUM(total_crates) OVER (ORDER BY expiry_date ASC) AS cum_units, COALESCE(SUM(total_crates) OVER (ORDER BY expiry_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM produce_lots WHERE item_name = 'ORGANIC_APPLES') SELECT lot_id, total_crates, LEAST(total_crates, GREATEST(0, 90 - prev_cum)) AS allocated_crates, total_crates - LEAST(total_crates, GREATEST(0, 90 - prev_cum)) AS remaining_crates FROM cum WHERE prev_cum < 90 ORDER BY lot_id ASC;",
    "expectedColumns": [
      "lot_id",
      "total_crates",
      "allocated_crates",
      "remaining_crates"
    ],
    "hints": [
      "Order cumulative sum by expiry_date ASC.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 90."
    ],
    "explanation": "FEFO depletion rules minimize perishable food spoilage and inventory write-offs.",
    "number": 269
  },
  {
    "id": "adv-270",
    "title": "270. HRT: Statistical Arbitrage Mean Reversion Spread Tracking",
    "difficulty": "Hard",
    "companies": [
      "HRT",
      "Citadel"
    ],
    "topics": [
      "AVG OVER",
      "STDDEV",
      "ROUND",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nHudson River Trading Statistical Arbitrage calculates the rolling Z-score spread between correlated stock pairs (GOOGL vs MSFT). Compute the current price spread (price_googl - price_msft), trailing mean spread, trailing standard deviation, and Z-score over the full timeline.\n\n### Requirements\n- Calculate spread as price_googl - price_msft.\n- Compute mean_spread and std_spread using window functions.\n- Calculate z_score as (spread - mean_spread) / std_spread, rounded to 2 decimal places.\n- Output columns: trade_date, spread, z_score.\n- Sort by trade_date ascending.\n\n### Input Schema\n**pair_prices** (id INT, trade_date DATE, price_googl NUMERIC, price_msft NUMERIC)",
    "schemaSql": "CREATE TABLE pair_prices (id INT PRIMARY KEY, trade_date DATE, price_googl NUMERIC, price_msft NUMERIC);\nINSERT INTO pair_prices VALUES (1, '2025-01-01', 190.00, 420.00), (2, '2025-01-02', 192.00, 421.00), (3, '2025-01-03', 188.00, 424.00), (4, '2025-01-04', 195.00, 418.00), (5, '2025-01-05', 185.00, 426.00);",
    "starterSql": "-- 270. HRT: Statistical Arbitrage Mean Reversion Spread Tracking\n-- Output: trade_date, spread, z_score\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH raw_spread AS (SELECT trade_date, (price_googl - price_msft) AS spread FROM pair_prices), stats AS (SELECT trade_date, spread, AVG(spread) OVER () AS mean_spread, STDDEV(spread) OVER () AS std_spread FROM raw_spread) SELECT trade_date, ROUND(spread, 2) AS spread, ROUND((spread - mean_spread) / NULLIF(std_spread, 0), 2) AS z_score FROM stats ORDER BY trade_date ASC;",
    "expectedColumns": [
      "trade_date",
      "spread",
      "z_score"
    ],
    "hints": [
      "Compute price difference spread in CTE.",
      "Compute overall mean and stddev with AVG() OVER() and STDDEV() OVER().",
      "Calculate normalized Z-score."
    ],
    "explanation": "Statistical arbitrage models trigger mean-reversion trades when Z-scores deviate beyond +/- 2.0 standard deviations.",
    "number": 270
  },
  {
    "id": "adv-271",
    "title": "271. Pinterest: Pin Browsing Sessionization with 30-Minute Inactivity Window",
    "difficulty": "Hard",
    "companies": [
      "Pinterest",
      "Instagram"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nPinterest Search Discovery groups pin click logs into visual discovery sessions. If a user is inactive for more than 30 minutes between clicks, a new session is started. Find each session start time and total pins clicked.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior pin click.\n- Flag new session when elapsed time > 30 minutes or on first click.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, pins_clicked.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**pin_clicks** (id INT, user_id INT, pin_id INT, click_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE pin_clicks (id INT PRIMARY KEY, user_id INT, pin_id INT, click_time TIMESTAMP);\nINSERT INTO pin_clicks VALUES (1, 101, 10, '2025-01-01 11:00:00'), (2, 101, 11, '2025-01-01 11:12:00'), (3, 101, 12, '2025-01-01 11:55:00'), (4, 102, 20, '2025-01-01 12:00:00'), (5, 102, 21, '2025-01-01 12:10:00');",
    "starterSql": "-- 271. Pinterest: Pin Browsing Sessionization with 30-Minute Inactivity Window\n-- Output: user_id, session_id, session_start, pins_clicked\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, click_time, CASE WHEN LAG(click_time) OVER (PARTITION BY user_id ORDER BY click_time ASC) IS NULL OR (click_time - LAG(click_time) OVER (PARTITION BY user_id ORDER BY click_time ASC)) > INTERVAL '30 minutes' THEN 1 ELSE 0 END AS is_new_session FROM pin_clicks), sessions AS (SELECT user_id, click_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY click_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(click_time) AS session_start, COUNT(*) AS pins_clicked FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "pins_clicked"
    ],
    "hints": [
      "Flag session starts with LAG > 30 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Visual discovery sessions isolate inspiration gathering intent from quick reference looks.",
    "number": 271
  },
  {
    "id": "adv-272",
    "title": "272. Google: Recursive Folder Directory Structure and Breadcrumb Paths",
    "difficulty": "Hard",
    "companies": [
      "Google",
      "Dropbox"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoogle Drive File System models nested folder directories. Given a folder hierarchy with parent_folder_id, traverse from the root folder (parent_folder_id IS NULL) to all subfolders, generating full directory paths formatted as '/Root/Subfolder'.\n\n### Requirements\n- Start with root folder where parent_folder_id IS NULL at depth 0.\n- Recursively join child folders, incrementing folder_depth.\n- Build directory_path string.\n- Output columns: folder_id, folder_name, folder_depth, directory_path.\n- Sort by folder_depth ascending, folder_id ascending.\n\n### Input Schema\n**drive_folders** (folder_id INT, parent_folder_id INT, folder_name VARCHAR)",
    "schemaSql": "CREATE TABLE drive_folders (folder_id INT PRIMARY KEY, parent_folder_id INT, folder_name VARCHAR(50));\nINSERT INTO drive_folders VALUES (1, NULL, 'My Drive'), (2, 1, 'Projects'), (3, 1, 'Personal'), (4, 2, '2025_Roadmap'), (5, 4, 'Financials');",
    "starterSql": "-- 272. Google: Recursive Folder Directory Structure and Breadcrumb Paths\n-- Output: folder_id, folder_name, folder_depth, directory_path\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE folder_tree AS (SELECT folder_id, folder_name, 0 AS folder_depth, CAST('/' || folder_name AS VARCHAR(255)) AS directory_path FROM drive_folders WHERE parent_folder_id IS NULL UNION ALL SELECT f.folder_id, f.folder_name, t.folder_depth + 1, CAST(t.directory_path || '/' || f.folder_name AS VARCHAR(255)) FROM drive_folders f JOIN folder_tree t ON f.parent_folder_id = t.folder_id) SELECT folder_id, folder_name, folder_depth, directory_path FROM folder_tree ORDER BY folder_depth ASC, folder_id ASC;",
    "expectedColumns": [
      "folder_id",
      "folder_name",
      "folder_depth",
      "directory_path"
    ],
    "hints": [
      "Start recursion where parent_folder_id IS NULL.",
      "Join child folders on parent_folder_id = t.folder_id.",
      "Build slash-delimited directory path."
    ],
    "explanation": "Hierarchical folder trees enable recursive permission inheritance in cloud storage.",
    "number": 272
  },
  {
    "id": "adv-273",
    "title": "273. Fitbit: Daily 10000 Step Milestone Streak Detection",
    "difficulty": "Hard",
    "companies": [
      "Fitbit",
      "Apple"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nFitbit Health Challenges awards the 10K Daily Steps Master Badge. For each user who logged days with steps >= 10000, find their longest contiguous consecutive daily streak meeting this goal.\n\n### Requirements\n- Filter for dates where steps >= 10000.\n- Group consecutive calendar dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**daily_steps** (id INT, user_id INT, log_date DATE, steps INT)",
    "schemaSql": "CREATE TABLE daily_steps (id INT PRIMARY KEY, user_id INT, log_date DATE, steps INT);\nINSERT INTO daily_steps VALUES (1, 101, '2025-01-01', 12000), (2, 101, '2025-01-02', 11500), (3, 101, '2025-01-03', 10500), (4, 101, '2025-01-04', 8000), (5, 101, '2025-01-05', 13000), (6, 102, '2025-01-01', 10500), (7, 102, '2025-01-02', 11000);",
    "starterSql": "-- 273. Fitbit: Daily 10000 Step Milestone Streak Detection\n-- Output: user_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_days AS (SELECT DISTINCT user_id, log_date FROM daily_steps WHERE steps >= 10000), grouped AS (SELECT user_id, log_date, log_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY log_date ASC) * INTERVAL '1 day') AS grp FROM distinct_days), streaks AS (SELECT user_id, grp, COUNT(*) AS streak_days FROM grouped GROUP BY user_id, grp) SELECT user_id, MAX(streak_days) AS longest_streak_days FROM streaks GROUP BY user_id ORDER BY longest_streak_days DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "longest_streak_days"
    ],
    "hints": [
      "Filter WHERE steps >= 10000 first.",
      "Apply date - ROW_NUMBER grouping.",
      "Find MAX streak length."
    ],
    "explanation": "Threshold-filtered gaps and islands models habit adherence milestones.",
    "number": 273
  },
  {
    "id": "adv-274",
    "title": "274. Dropbox: Business Team Storage Expansion Quarterly Cohort Matrix",
    "difficulty": "Hard",
    "companies": [
      "Dropbox",
      "Box"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDropbox Business Analytics evaluates account expansion over time. For enterprise teams that signed their initial contract in Q1 2024 (Cohort 2024-Q1), compute total subscription spend across Q0 (Q1 2024), Q1 (Q2 2024), and Q2 (Q3 2024).\n\n### Requirements\n- Identify teams whose earliest billing date was in Q1 2024.\n- Calculate spend for relative quarters Q0, Q1, and Q2.\n- Round all values to 2 decimal places.\n- Output columns: cohort_name, q0_spend, q1_spend, q2_spend.\n- Sort by cohort_name ascending.\n\n### Input Schema\n**team_billing** (id INT, team_id INT, bill_date DATE, amount NUMERIC)",
    "schemaSql": "CREATE TABLE team_billing (id INT PRIMARY KEY, team_id INT, bill_date DATE, amount NUMERIC);\nINSERT INTO team_billing VALUES (1, 101, '2024-01-10', 1200.00), (2, 101, '2024-04-10', 1500.00), (3, 101, '2024-07-10', 1800.00), (4, 102, '2024-02-15', 800.00), (5, 102, '2024-05-15', 800.00), (6, 103, '2024-03-01', 500.00);",
    "starterSql": "-- 274. Dropbox: Business Team Storage Expansion Quarterly Cohort Matrix\n-- Output: cohort_name, q0_spend, q1_spend, q2_spend\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_bill AS (SELECT team_id, MIN(bill_date) AS min_date FROM team_billing GROUP BY team_id HAVING MIN(bill_date) BETWEEN '2024-01-01' AND '2024-03-31'), activity AS (SELECT b.team_id, b.amount, CASE WHEN b.bill_date BETWEEN '2024-01-01' AND '2024-03-31' THEN 0 WHEN b.bill_date BETWEEN '2024-04-01' AND '2024-06-30' THEN 1 WHEN b.bill_date BETWEEN '2024-07-01' AND '2024-09-30' THEN 2 END AS q_idx FROM team_billing b JOIN first_bill f ON b.team_id = f.team_id) SELECT '2024-Q1' AS cohort_name, ROUND(SUM(CASE WHEN q_idx = 0 THEN amount ELSE 0 END), 2) AS q0_spend, ROUND(SUM(CASE WHEN q_idx = 1 THEN amount ELSE 0 END), 2) AS q1_spend, ROUND(SUM(CASE WHEN q_idx = 2 THEN amount ELSE 0 END), 2) AS q2_spend FROM activity GROUP BY cohort_name ORDER BY cohort_name ASC;",
    "expectedColumns": [
      "cohort_name",
      "q0_spend",
      "q1_spend",
      "q2_spend"
    ],
    "hints": [
      "Filter teams with first bill in Q1 2024.",
      "Map quarter index.",
      "Sum spend conditionally."
    ],
    "explanation": "Expansion cohort tracking monitors enterprise seat upgrades and add-on storage purchases.",
    "number": 274
  },
  {
    "id": "adv-275",
    "title": "275. Splunk: Network Firewall Blocked Incident Overlap Merging",
    "difficulty": "Hard",
    "companies": [
      "Splunk",
      "Palo Alto Networks"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSplunk Enterprise Security consolidates overlapping firewall threat block intervals. When multiple intrusion rules trigger overlapping IP block periods on the same gateway, merge them into continuous containment windows.\n\n### Requirements\n- Track running maximum unblock_time across alerts per gateway_id.\n- Group overlapping and contiguous intervals into distinct containment windows.\n- Calculate duration in minutes.\n- Output columns: gateway_id, block_start, block_end, duration_minutes.\n- Sort by gateway_id ascending, block_start ascending.\n\n### Input Schema\n**firewall_blocks** (id INT, gateway_id VARCHAR, block_time TIMESTAMP, unblock_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE firewall_blocks (id INT PRIMARY KEY, gateway_id VARCHAR(20), block_time TIMESTAMP, unblock_time TIMESTAMP);\nINSERT INTO firewall_blocks VALUES (1, 'GW_EDGE_01', '2025-01-01 12:00:00', '2025-01-01 12:45:00'), (2, 'GW_EDGE_01', '2025-01-01 12:30:00', '2025-01-01 13:15:00'), (3, 'GW_EDGE_01', '2025-01-01 14:00:00', '2025-01-01 14:30:00'), (4, 'GW_INTERNAL', '2025-01-01 15:00:00', '2025-01-01 15:40:00');",
    "starterSql": "-- 275. Splunk: Network Firewall Blocked Incident Overlap Merging\n-- Output: gateway_id, block_start, block_end, duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT gateway_id, block_time, unblock_time, MAX(unblock_time) OVER (PARTITION BY gateway_id ORDER BY block_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM firewall_blocks), islands AS (SELECT gateway_id, block_time, unblock_time, SUM(CASE WHEN prev_max_end IS NULL OR block_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY gateway_id ORDER BY block_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT gateway_id, MIN(block_time) AS block_start, MAX(unblock_time) AS block_end, EXTRACT(EPOCH FROM (MAX(unblock_time) - MIN(block_time)))::INT / 60 AS duration_minutes FROM islands GROUP BY gateway_id, island_id ORDER BY gateway_id ASC, block_start ASC;",
    "expectedColumns": [
      "gateway_id",
      "block_start",
      "block_end",
      "duration_minutes"
    ],
    "hints": [
      "Compare current start against running MAX(unblock_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Firewall block merging prevents inflating security threat duration metrics.",
    "number": 275
  },
  {
    "id": "adv-276",
    "title": "276. ASML: Photolithography Extreme Ultraviolet (EUV) Mirror BOM Explosion",
    "difficulty": "Hard",
    "companies": [
      "ASML",
      "TSMC"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nASML Cleanroom Engineering tracks Twinscan EUV lithography tool assemblies. For the top-level 'EUV Projection Optics', recursively explode subcomponents and calculate total units of leaf optical sensor parts required.\n\n### Requirements\n- Start with top assembly (parent_id IS NULL).\n- Recursively traverse part tree multiplying quantities down.\n- Filter for leaf parts with no subassemblies.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**euv_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE euv_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO euv_bom VALUES (1, NULL, 'EUV Projection Optics', 1), (2, 1, 'Multilayer Collector Mirror', 2), (3, 1, 'Illuminator Module', 1), (4, 2, 'Molybdenum-Silicon Coating Layer', 50), (5, 2, 'Piezo Position Actuator', 6), (6, 3, 'Laser Droplet Generator', 1);",
    "starterSql": "-- 276. ASML: Photolithography Extreme Ultraviolet (EUV) Mirror BOM Explosion\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM euv_bom WHERE parent_id IS NULL UNION ALL SELECT e.id, e.parent_id, e.part_name, t.total_qty * e.quantity FROM euv_bom e JOIN bom_tree t ON e.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM euv_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Semiconductor capital equipment BOMs manage multi-thousand part nano-precision subassemblies.",
    "number": 276
  },
  {
    "id": "adv-277",
    "title": "277. Klarna: Checkout Merchant Payment Authorization Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Klarna",
      "Affirm"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nKlarna Core Banking deduplicates merchant payment authorization tokens sent across redundant network channels. When multiple authorization attempts share the same merchant_order_id, select the single authoritative attempt with status = 'AUTHORIZED', keeping the earliest created_at timestamp.\n\n### Requirements\n- Order authorization attempts: status = 'AUTHORIZED' first, then earliest created_at.\n- Filter for rank = 1.\n- Output columns: merchant_order_id, customer_id, amount, status, created_at.\n- Sort by merchant_order_id ascending.\n\n### Input Schema\n**payment_auths** (id INT, merchant_order_id VARCHAR, customer_id INT, amount NUMERIC, status VARCHAR, created_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE payment_auths (id INT PRIMARY KEY, merchant_order_id VARCHAR(20), customer_id INT, amount NUMERIC, status VARCHAR(20), created_at TIMESTAMP);\nINSERT INTO payment_auths VALUES (1, 'ORD_881', 101, 140.00, 'FAILED', '2025-01-01 16:00:00'), (2, 'ORD_881', 101, 140.00, 'AUTHORIZED', '2025-01-01 16:01:00'), (3, 'ORD_882', 102, 65.00, 'AUTHORIZED', '2025-01-01 17:00:00'), (4, 'ORD_882', 102, 65.00, 'AUTHORIZED', '2025-01-01 17:02:00');",
    "starterSql": "-- 277. Klarna: Checkout Merchant Payment Authorization Deduplication\n-- Output: merchant_order_id, customer_id, amount, status, created_at\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT merchant_order_id, customer_id, amount, status, created_at, ROW_NUMBER() OVER (PARTITION BY merchant_order_id ORDER BY CASE WHEN status = 'AUTHORIZED' THEN 1 ELSE 2 END ASC, created_at ASC) AS rn FROM payment_auths) SELECT merchant_order_id, customer_id, amount, status, created_at FROM ranked WHERE rn = 1 ORDER BY merchant_order_id ASC;",
    "expectedColumns": [
      "merchant_order_id",
      "customer_id",
      "amount",
      "status",
      "created_at"
    ],
    "hints": [
      "Use CASE WHEN to prioritize AUTHORIZED.",
      "Tie break with created_at ASC.",
      "Filter rn = 1."
    ],
    "explanation": "Payment token deduplication avoids double-charging credit limits on Buy-Now-Pay-Later transactions.",
    "number": 277
  },
  {
    "id": "adv-278",
    "title": "278. Booking.com: Travel Reservation Search-to-Stay Funnel Sequence",
    "difficulty": "Hard",
    "companies": [
      "Booking.com",
      "Expedia"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nBooking.com Conversion Optimization audits booking flow friction. Identify users who executed the complete 4-step sequence: 'HOTEL_SEARCH' -> 'PROPERTY_VIEW' -> 'ROOM_SELECTED' -> 'RESERVATION_CONFIRMED' in strict order within 60 minutes.\n\n### Requirements\n- Use LEAD to inspect next 3 events for each session_id.\n- Verify event names match 'HOTEL_SEARCH', 'PROPERTY_VIEW', 'ROOM_SELECTED', and 'RESERVATION_CONFIRMED'.\n- Verify elapsed duration <= 60 minutes.\n- Output columns: session_id, search_time, confirmation_time.\n- Sort by session_id ascending.\n\n### Input Schema\n**travel_funnel** (id INT, session_id INT, event_type VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE travel_funnel (id INT PRIMARY KEY, session_id INT, event_type VARCHAR(30), event_time TIMESTAMP);\nINSERT INTO travel_funnel VALUES (1, 101, 'HOTEL_SEARCH', '2025-01-01 13:00:00'), (2, 101, 'PROPERTY_VIEW', '2025-01-01 13:10:00'), (3, 101, 'ROOM_SELECTED', '2025-01-01 13:20:00'), (4, 101, 'RESERVATION_CONFIRMED', '2025-01-01 13:35:00'), (5, 102, 'HOTEL_SEARCH', '2025-01-01 14:00:00'), (6, 102, 'PROPERTY_VIEW', '2025-01-01 14:15:00');",
    "starterSql": "-- 278. Booking.com: Travel Reservation Search-to-Stay Funnel Sequence\n-- Output: session_id, search_time, confirmation_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT session_id, event_type, event_time AS search_time, LEAD(event_type, 1) OVER (PARTITION BY session_id ORDER BY event_time ASC) AS s2, LEAD(event_type, 2) OVER (PARTITION BY session_id ORDER BY event_time ASC) AS s3, LEAD(event_type, 3) OVER (PARTITION BY session_id ORDER BY event_time ASC) AS s4, LEAD(event_time, 3) OVER (PARTITION BY session_id ORDER BY event_time ASC) AS confirmation_time FROM travel_funnel) SELECT session_id, search_time, confirmation_time FROM seq WHERE event_type = 'HOTEL_SEARCH' AND s2 = 'PROPERTY_VIEW' AND s3 = 'ROOM_SELECTED' AND s4 = 'RESERVATION_CONFIRMED' AND (confirmation_time - search_time) <= INTERVAL '60 minutes' ORDER BY session_id ASC;",
    "expectedColumns": [
      "session_id",
      "search_time",
      "confirmation_time"
    ],
    "hints": [
      "Use multi-offset LEAD up to offset 3.",
      "Verify sequence names.",
      "Filter interval <= 60 minutes."
    ],
    "explanation": "Conversion sequence tracking quantifies search session drop-off friction.",
    "number": 278
  },
  {
    "id": "adv-279",
    "title": "279. Costco: Bulk Wholesale Pallet FIFO Depletion for Warehouse Clubs",
    "difficulty": "Hard",
    "companies": [
      "Costco",
      "Walmart"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCostco Wholesale Logistics depletes warehouse club bulk food pallets using strict FIFO inventory ordering. A warehouse club location orders 100 pallets of 'OLIVE_OIL'. Allocate pallets across incoming manufacturer shipments ordered by arrival_date ASC and compute remaining pallets per shipment.\n\n### Requirements\n- Compute cumulative pallets available ordered by arrival_date ASC.\n- Allocate 100 pallets across shipments.\n- Calculate remaining_pallets per shipment.\n- Only display shipments from which pallets were allocated.\n- Output columns: shipment_id, total_pallets, allocated_pallets, remaining_pallets.\n- Sort by shipment_id ascending.\n\n### Input Schema\n**bulk_pallets** (shipment_id INT, product_name VARCHAR, arrival_date DATE, total_pallets INT)",
    "schemaSql": "CREATE TABLE bulk_pallets (shipment_id INT PRIMARY KEY, product_name VARCHAR(30), arrival_date DATE, total_pallets INT);\nINSERT INTO bulk_pallets VALUES (1, 'OLIVE_OIL', '2025-01-01', 40), (2, 'OLIVE_OIL', '2025-01-04', 40), (3, 'OLIVE_OIL', '2025-01-08', 50), (4, 'OLIVE_OIL', '2025-01-12', 60);",
    "starterSql": "-- 279. Costco: Bulk Wholesale Pallet FIFO Depletion for Warehouse Clubs\n-- Output: shipment_id, total_pallets, allocated_pallets, remaining_pallets\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT shipment_id, total_pallets, SUM(total_pallets) OVER (ORDER BY arrival_date ASC) AS cum_units, COALESCE(SUM(total_pallets) OVER (ORDER BY arrival_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM bulk_pallets WHERE product_name = 'OLIVE_OIL') SELECT shipment_id, total_pallets, LEAST(total_pallets, GREATEST(0, 100 - prev_cum)) AS allocated_pallets, total_pallets - LEAST(total_pallets, GREATEST(0, 100 - prev_cum)) AS remaining_pallets FROM cum WHERE prev_cum < 100 ORDER BY shipment_id ASC;",
    "expectedColumns": [
      "shipment_id",
      "total_pallets",
      "allocated_pallets",
      "remaining_pallets"
    ],
    "hints": [
      "Compute cumulative pallets with SUM() OVER.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 100."
    ],
    "explanation": "Wholesale club pallet tracking streamlines depot-to-warehouse cross-docking operations.",
    "number": 279
  },
  {
    "id": "adv-280",
    "title": "280. Virtu Financial: Market Maker Internalization Volume vs Public Exchanges",
    "difficulty": "Hard",
    "companies": [
      "Virtu Financial",
      "Citadel"
    ],
    "topics": [
      "ROUND",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nVirtu Financial Market Surveillance analyzes retail trade internalization vs public lit exchange routing. For each equity symbol, calculate total retail share volume, internalized volume (is_internalized = TRUE), and the internalization share percentage.\n\n### Requirements\n- Sum total_shares as total_volume.\n- Sum shares where is_internalized = TRUE as internalized_volume.\n- Calculate internalization_pct as internalized_volume / total_volume * 100, rounded to 2 decimal places.\n- Output columns: symbol, total_volume, internalized_volume, internalization_pct.\n- Sort by internalization_pct descending, then by symbol ascending.\n\n### Input Schema\n**routed_orders** (id INT, symbol VARCHAR, shares INT, is_internalized BOOLEAN)",
    "schemaSql": "CREATE TABLE routed_orders (id INT PRIMARY KEY, symbol VARCHAR(10), shares INT, is_internalized BOOLEAN);\nINSERT INTO routed_orders VALUES (1, 'TSLA', 50000, TRUE), (2, 'TSLA', 30000, TRUE), (3, 'TSLA', 20000, FALSE), (4, 'AMZN', 40000, TRUE), (5, 'AMZN', 60000, FALSE);",
    "starterSql": "-- 280. Virtu Financial: Market Maker Internalization Volume vs Public Exchanges\n-- Output: symbol, total_volume, internalized_volume, internalization_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT symbol, SUM(shares) AS total_volume, SUM(CASE WHEN is_internalized THEN shares ELSE 0 END) AS internalized_volume, ROUND(SUM(CASE WHEN is_internalized THEN shares ELSE 0 END) * 100.0 / NULLIF(SUM(shares), 0), 2) AS internalization_pct FROM routed_orders GROUP BY symbol ORDER BY internalization_pct DESC, symbol ASC;",
    "expectedColumns": [
      "symbol",
      "total_volume",
      "internalized_volume",
      "internalization_pct"
    ],
    "hints": [
      "Group by symbol.",
      "Sum shares conditionally for internalized trades.",
      "Compute percentage share."
    ],
    "explanation": "Internalization ratios evaluate off-exchange price improvement metrics under SEC Rule 605/606.",
    "number": 280
  },
  {
    "id": "adv-281",
    "title": "281. Medium: Reading Sessionization with 25-Minute Article Inactivity Window",
    "difficulty": "Hard",
    "companies": [
      "Medium",
      "Substack"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nMedium Reader Analytics clusters article reads into browsing sessions. An active reading session lapses if more than 25 minutes elapses between article clicks. Identify session start time and total articles read per session.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior read click.\n- Flag new session when elapsed time > 25 minutes or on first read.\n- Generate a cumulative session_id per user.\n- Output columns: user_id, session_id, session_start, articles_read.\n- Sort by user_id ascending, session_id ascending.\n\n### Input Schema\n**article_reads** (id INT, user_id INT, article_id INT, click_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE article_reads (id INT PRIMARY KEY, user_id INT, article_id INT, click_time TIMESTAMP);\nINSERT INTO article_reads VALUES (1, 101, 101, '2025-01-01 09:00:00'), (2, 101, 102, '2025-01-01 09:15:00'), (3, 101, 103, '2025-01-01 09:50:00'), (4, 102, 201, '2025-01-01 10:00:00'), (5, 102, 202, '2025-01-01 10:10:00');",
    "starterSql": "-- 281. Medium: Reading Sessionization with 25-Minute Article Inactivity Window\n-- Output: user_id, session_id, session_start, articles_read\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT user_id, click_time, CASE WHEN LAG(click_time) OVER (PARTITION BY user_id ORDER BY click_time ASC) IS NULL OR (click_time - LAG(click_time) OVER (PARTITION BY user_id ORDER BY click_time ASC)) > INTERVAL '25 minutes' THEN 1 ELSE 0 END AS is_new_session FROM article_reads), sessions AS (SELECT user_id, click_time, SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY click_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT user_id, session_id, MIN(click_time) AS session_start, COUNT(*) AS articles_read FROM sessions GROUP BY user_id, session_id ORDER BY user_id ASC, session_id ASC;",
    "expectedColumns": [
      "user_id",
      "session_id",
      "session_start",
      "articles_read"
    ],
    "hints": [
      "Flag session starts with LAG > 25 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by user and session_id."
    ],
    "explanation": "Reading sessions distinguish deep multi-article research sessions from single-link bounce visits.",
    "number": 281
  },
  {
    "id": "adv-282",
    "title": "282. Figma: Recursive Component Variant and Auto-Layout Frame Hierarchy",
    "difficulty": "Hard",
    "companies": [
      "Figma",
      "Canva"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nFigma Document Graph traverses nested Auto-Layout canvas frames. Given a root canvas frame (parent_frame_id IS NULL), traverse all nested child frames down the document tree and build the full layer path string.\n\n### Requirements\n- Start with root frame where parent_frame_id IS NULL at frame_depth = 0.\n- Recursively join child frames, incrementing frame_depth.\n- Build layer_path string formatted as 'Canvas / Frame / Subframe'.\n- Output columns: frame_id, frame_name, frame_depth, layer_path.\n- Sort by frame_depth ascending, frame_id ascending.\n\n### Input Schema\n**canvas_frames** (frame_id INT, parent_frame_id INT, frame_name VARCHAR)",
    "schemaSql": "CREATE TABLE canvas_frames (frame_id INT PRIMARY KEY, parent_frame_id INT, frame_name VARCHAR(50));\nINSERT INTO canvas_frames VALUES (1, NULL, 'Main Page'), (2, 1, 'Header Bar'), (3, 1, 'Content Grid'), (4, 2, 'Nav Links'), (5, 3, 'Product Card');",
    "starterSql": "-- 282. Figma: Recursive Component Variant and Auto-Layout Frame Hierarchy\n-- Output: frame_id, frame_name, frame_depth, layer_path\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE frame_tree AS (SELECT frame_id, frame_name, 0 AS frame_depth, CAST(frame_name AS VARCHAR(255)) AS layer_path FROM canvas_frames WHERE parent_frame_id IS NULL UNION ALL SELECT c.frame_id, c.frame_name, t.frame_depth + 1, CAST(t.layer_path || ' / ' || c.frame_name AS VARCHAR(255)) FROM canvas_frames c JOIN frame_tree t ON c.parent_frame_id = t.frame_id) SELECT frame_id, frame_name, frame_depth, layer_path FROM frame_tree ORDER BY frame_depth ASC, frame_id ASC;",
    "expectedColumns": [
      "frame_id",
      "frame_name",
      "frame_depth",
      "layer_path"
    ],
    "hints": [
      "Start recursion where parent_frame_id IS NULL.",
      "Join child frames on parent_frame_id = t.frame_id.",
      "Build slash-delimited layer path."
    ],
    "explanation": "Nested Auto-Layout tree models recursive DOM rendering in UI design engines.",
    "number": 282
  },
  {
    "id": "adv-283",
    "title": "283. Chess.com: Consecutive Daily Rated Game Win Streaks",
    "difficulty": "Hard",
    "companies": [
      "Chess.com",
      "Lichess"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nChess.com Leaderboard Analytics tracks grandmaster consistency. Find the longest consecutive calendar day rated match win streak for each chess player.\n\n### Requirements\n- Filter for games where is_win = TRUE.\n- Group consecutive calendar win dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per player.\n- Output columns: player_name, max_streak_days.\n- Sort by max_streak_days descending, then by player_name ascending.\n\n### Input Schema\n**chess_matches** (id INT, player_name VARCHAR, match_date DATE, is_win BOOLEAN)",
    "schemaSql": "CREATE TABLE chess_matches (id INT PRIMARY KEY, player_name VARCHAR(50), match_date DATE, is_win BOOLEAN);\nINSERT INTO chess_matches VALUES (1, 'MagnusCarlsen', '2025-01-01', TRUE), (2, 'MagnusCarlsen', '2025-01-02', TRUE), (3, 'MagnusCarlsen', '2025-01-03', TRUE), (4, 'MagnusCarlsen', '2025-01-05', TRUE), (5, 'HikaruNakamura', '2025-01-01', TRUE), (6, 'HikaruNakamura', '2025-01-02', TRUE);",
    "starterSql": "-- 283. Chess.com: Consecutive Daily Rated Game Win Streaks\n-- Output: player_name, max_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_days AS (SELECT DISTINCT player_name, match_date FROM chess_matches WHERE is_win = TRUE), grouped AS (SELECT player_name, match_date, match_date - (ROW_NUMBER() OVER (PARTITION BY player_name ORDER BY match_date ASC) * INTERVAL '1 day') AS grp FROM distinct_days), streaks AS (SELECT player_name, grp, COUNT(*) AS streak_days FROM grouped GROUP BY player_name, grp) SELECT player_name, MAX(streak_days) AS max_streak_days FROM streaks GROUP BY player_name ORDER BY max_streak_days DESC, player_name ASC;",
    "expectedColumns": [
      "player_name",
      "max_streak_days"
    ],
    "hints": [
      "Filter WHERE is_win = TRUE.",
      "Subtract ROW_NUMBER days from match_date.",
      "Find MAX streak length."
    ],
    "explanation": "Win streak islands model rating volatility and form momentum.",
    "number": 283
  },
  {
    "id": "adv-284",
    "title": "284. Slack: Paid Enterprise Grid Seat Retention Cohort Matrix",
    "difficulty": "Hard",
    "companies": [
      "Slack",
      "Atlassian"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSlack Enterprise Grid Sales tracks gross ARR retention across annual contract cohorts. For enterprise customer orgs whose initial grid contract began in 2022 (Cohort 2022), compute total seat revenue across Year 0 (2022), Year 1 (2023), and Year 2 (2024).\n\n### Requirements\n- Filter for customer orgs whose earliest billing contract was in 2022.\n- Calculate annual seat revenue for years 2022 (y0), 2023 (y1), and 2024 (y2).\n- Round all values to 2 decimal places.\n- Output columns: cohort_year, y0_revenue, y1_revenue, y2_revenue.\n- Sort by cohort_year ascending.\n\n### Input Schema\n**grid_contracts** (id INT, org_id INT, contract_date DATE, annual_revenue NUMERIC)",
    "schemaSql": "CREATE TABLE grid_contracts (id INT PRIMARY KEY, org_id INT, contract_date DATE, annual_revenue NUMERIC);\nINSERT INTO grid_contracts VALUES (1, 101, '2022-03-01', 50000.00), (2, 101, '2023-03-01', 65000.00), (3, 101, '2024-03-01', 80000.00), (4, 102, '2022-06-15', 30000.00), (5, 102, '2023-06-15', 35000.00), (6, 103, '2022-09-01', 20000.00);",
    "starterSql": "-- 284. Slack: Paid Enterprise Grid Seat Retention Cohort Matrix\n-- Output: cohort_year, y0_revenue, y1_revenue, y2_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_contract AS (SELECT org_id, EXTRACT(YEAR FROM MIN(contract_date))::INT AS start_year FROM grid_contracts GROUP BY org_id HAVING EXTRACT(YEAR FROM MIN(contract_date)) = 2022), activity AS (SELECT c.org_id, c.annual_revenue, EXTRACT(YEAR FROM c.contract_date)::INT AS rev_year FROM grid_contracts c JOIN first_contract f ON c.org_id = f.org_id) SELECT 2022 AS cohort_year, ROUND(SUM(CASE WHEN rev_year = 2022 THEN annual_revenue ELSE 0 END), 2) AS y0_revenue, ROUND(SUM(CASE WHEN rev_year = 2023 THEN annual_revenue ELSE 0 END), 2) AS y1_revenue, ROUND(SUM(CASE WHEN rev_year = 2024 THEN annual_revenue ELSE 0 END), 2) AS y2_revenue FROM activity GROUP BY cohort_year ORDER BY cohort_year ASC;",
    "expectedColumns": [
      "cohort_year",
      "y0_revenue",
      "y1_revenue",
      "y2_revenue"
    ],
    "hints": [
      "Filter orgs with first contract in 2022.",
      "Map calendar years 2022, 2023, 2024.",
      "Sum annual revenue conditionally."
    ],
    "explanation": "Enterprise Grid cohort retention calculates Net Expansion Rate (NER) over multi-year cycles.",
    "number": 284
  },
  {
    "id": "adv-285",
    "title": "285. Dynatrace: Synthetic Browser Check Failure Outage Consolidation",
    "difficulty": "Hard",
    "companies": [
      "Dynatrace",
      "Datadog"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDynatrace Synthetic Monitoring consolidates overlapping synthetic browser test failure intervals. When automated tests fail simultaneously across multiple browser agents on the same URL, merge overlapping failure windows into consolidated outage periods.\n\n### Requirements\n- Track running maximum end_time across failure alerts per monitor_name.\n- Group overlapping and contiguous intervals into distinct incidents.\n- Calculate duration in minutes.\n- Output columns: monitor_name, outage_start, outage_end, outage_duration_minutes.\n- Sort by monitor_name ascending, outage_start ascending.\n\n### Input Schema\n**synthetic_failures** (id INT, monitor_name VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE synthetic_failures (id INT PRIMARY KEY, monitor_name VARCHAR(50), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO synthetic_failures VALUES (1, 'Checkout Synthetic', '2025-01-01 02:00:00', '2025-01-01 02:30:00'), (2, 'Checkout Synthetic', '2025-01-01 02:15:00', '2025-01-01 03:00:00'), (3, 'Checkout Synthetic', '2025-01-01 04:00:00', '2025-01-01 04:20:00'), (4, 'Login Synthetic', '2025-01-01 05:00:00', '2025-01-01 05:35:00');",
    "starterSql": "-- 285. Dynatrace: Synthetic Browser Check Failure Outage Consolidation\n-- Output: monitor_name, outage_start, outage_end, outage_duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT monitor_name, start_time, end_time, MAX(end_time) OVER (PARTITION BY monitor_name ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM synthetic_failures), islands AS (SELECT monitor_name, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY monitor_name ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT monitor_name, MIN(start_time) AS outage_start, MAX(end_time) AS outage_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS outage_duration_minutes FROM islands GROUP BY monitor_name, island_id ORDER BY monitor_name ASC, outage_start ASC;",
    "expectedColumns": [
      "monitor_name",
      "outage_start",
      "outage_end",
      "outage_duration_minutes"
    ],
    "hints": [
      "Compare current start against running MAX(end_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Synthetic test interval merging prevents skewing availability percentages when multiple probes report the same failure.",
    "number": 285
  },
  {
    "id": "adv-286",
    "title": "286. Rivian: Electric Delivery Van Subsystem Part Cost Rollup",
    "difficulty": "Hard",
    "companies": [
      "Rivian",
      "Amazon"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nRivian Commercial Fleet Engineering tracks manufacturing cost for the Electric Delivery Van (EDV 700). For the top-level 'Cargo Chassis Subassembly', recursively explode the subcomponent tree and calculate total units of leaf fasteners and brackets required.\n\n### Requirements\n- Start with top assembly (parent_id IS NULL).\n- Recursively traverse part tree multiplying quantities down.\n- Filter for leaf parts with no children.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**edv_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE edv_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO edv_bom VALUES (1, NULL, 'Cargo Chassis Subassembly', 1), (2, 1, 'Rear Axle Beam', 1), (3, 1, 'Side Wall Frame', 2), (4, 2, 'High-Strength Steel Bolt', 16), (5, 3, 'Aluminum Extrusion Stiffener', 4), (6, 3, 'Structural Rivet', 24);",
    "starterSql": "-- 286. Rivian: Electric Delivery Van Subsystem Part Cost Rollup\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM edv_bom WHERE parent_id IS NULL UNION ALL SELECT r.id, r.parent_id, r.part_name, t.total_qty * r.quantity FROM edv_bom r JOIN bom_tree t ON r.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM edv_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Commercial vehicle structural BOM explosions ensure volume supply agreements with tier-2 metal fabricators.",
    "number": 286
  },
  {
    "id": "adv-287",
    "title": "287. Adyen: Point-of-Sale Tokenized Card Swipe Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Adyen",
      "Stripe"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAdyen Global Acquiring processes physical EMV terminal card transactions. If a point-of-sale terminal retries sending the same tokenized authorization request (matching card_token and order_ref), keep the single authorized transaction, breaking ties with the latest auth_timestamp.\n\n### Requirements\n- Order authorization attempts: status = 'AUTHORIZED' first, then latest auth_timestamp.\n- Filter for rank = 1.\n- Output columns: order_ref, card_token, amount, status, auth_timestamp.\n- Sort by order_ref ascending.\n\n### Input Schema\n**emv_swipes** (id INT, order_ref VARCHAR, card_token VARCHAR, amount NUMERIC, status VARCHAR, auth_timestamp TIMESTAMP)",
    "schemaSql": "CREATE TABLE emv_swipes (id INT PRIMARY KEY, order_ref VARCHAR(20), card_token VARCHAR(20), amount NUMERIC, status VARCHAR(20), auth_timestamp TIMESTAMP);\nINSERT INTO emv_swipes VALUES (1, 'ORD_REF_01', 'TOK_VISA_1', 85.00, 'DECLINED', '2025-01-01 18:00:00'), (2, 'ORD_REF_01', 'TOK_VISA_1', 85.00, 'AUTHORIZED', '2025-01-01 18:00:10'), (3, 'ORD_REF_02', 'TOK_MC_2', 120.00, 'AUTHORIZED', '2025-01-01 19:00:00'), (4, 'ORD_REF_02', 'TOK_MC_2', 120.00, 'AUTHORIZED', '2025-01-01 19:00:05');",
    "starterSql": "-- 287. Adyen: Point-of-Sale Tokenized Card Swipe Deduplication\n-- Output: order_ref, card_token, amount, status, auth_timestamp\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT order_ref, card_token, amount, status, auth_timestamp, ROW_NUMBER() OVER (PARTITION BY order_ref ORDER BY CASE WHEN status = 'AUTHORIZED' THEN 1 ELSE 2 END ASC, auth_timestamp DESC) AS rn FROM emv_swipes) SELECT order_ref, card_token, amount, status, auth_timestamp FROM ranked WHERE rn = 1 ORDER BY order_ref ASC;",
    "expectedColumns": [
      "order_ref",
      "card_token",
      "amount",
      "status",
      "auth_timestamp"
    ],
    "hints": [
      "Use CASE WHEN in ORDER BY to prioritize AUTHORIZED.",
      "Tie break with auth_timestamp DESC.",
      "Filter rn = 1."
    ],
    "explanation": "EMV swipe deduplication protects in-store merchants from chargeback claims on network dropouts.",
    "number": 287
  },
  {
    "id": "adv-288",
    "title": "288. Twitter: Viral Tweet Interaction Funnel Sequence",
    "difficulty": "Hard",
    "companies": [
      "Twitter",
      "Meta"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nTwitter Engagement Analytics studies viral tweet conversions. Identify users who executed the complete 4-step sequence: 'TWEET_IMPRESSION' -> 'DETAIL_EXPANDED' -> 'RETWEET_CLICKED' -> 'QUOTE_TWEETED' on the same tweet in order within 10 minutes.\n\n### Requirements\n- Use LEAD to inspect next 3 events for each user_id and tweet_id.\n- Verify event names match 'TWEET_IMPRESSION', 'DETAIL_EXPANDED', 'RETWEET_CLICKED', and 'QUOTE_TWEETED'.\n- Verify duration <= 10 minutes.\n- Output columns: user_id, tweet_id, impression_time, quote_time.\n- Sort by user_id ascending, tweet_id ascending.\n\n### Input Schema\n**tweet_interactions** (id INT, user_id INT, tweet_id INT, event_name VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE tweet_interactions (id INT PRIMARY KEY, user_id INT, tweet_id INT, event_name VARCHAR(30), event_time TIMESTAMP);\nINSERT INTO tweet_interactions VALUES (1, 101, 801, 'TWEET_IMPRESSION', '2025-01-01 12:00:00'), (2, 101, 801, 'DETAIL_EXPANDED', '2025-01-01 12:01:00'), (3, 101, 801, 'RETWEET_CLICKED', '2025-01-01 12:03:00'), (4, 101, 801, 'QUOTE_TWEETED', '2025-01-01 12:06:00'), (5, 102, 802, 'TWEET_IMPRESSION', '2025-01-01 13:00:00'), (6, 102, 802, 'DETAIL_EXPANDED', '2025-01-01 13:02:00');",
    "starterSql": "-- 288. Twitter: Viral Tweet Interaction Funnel Sequence\n-- Output: user_id, tweet_id, impression_time, quote_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT user_id, tweet_id, event_name, event_time AS impression_time, LEAD(event_name, 1) OVER (PARTITION BY user_id, tweet_id ORDER BY event_time ASC) AS s2, LEAD(event_name, 2) OVER (PARTITION BY user_id, tweet_id ORDER BY event_time ASC) AS s3, LEAD(event_name, 3) OVER (PARTITION BY user_id, tweet_id ORDER BY event_time ASC) AS s4, LEAD(event_time, 3) OVER (PARTITION BY user_id, tweet_id ORDER BY event_time ASC) AS quote_time FROM tweet_interactions) SELECT user_id, tweet_id, impression_time, quote_time FROM seq WHERE event_name = 'TWEET_IMPRESSION' AND s2 = 'DETAIL_EXPANDED' AND s3 = 'RETWEET_CLICKED' AND s4 = 'QUOTE_TWEETED' AND (quote_time - impression_time) <= INTERVAL '10 minutes' ORDER BY user_id ASC, tweet_id ASC;",
    "expectedColumns": [
      "user_id",
      "tweet_id",
      "impression_time",
      "quote_time"
    ],
    "hints": [
      "Use multi-offset LEAD up to offset 3.",
      "Verify sequence names.",
      "Filter interval <= 10 minutes."
    ],
    "explanation": "High-intent social interaction sequences signal viral virality spikes to algorithmic ranking engines.",
    "number": 288
  },
  {
    "id": "adv-289",
    "title": "289. Sysco: Cold-Chain Food Distribution FIFO Pallet Depletion",
    "difficulty": "Hard",
    "companies": [
      "Sysco",
      "US Foods"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nSysco Food Services supplies restaurant chains from refrigerated distribution warehouses on a FIFO basis. A restaurant chain orders 85 pallets of 'FROZEN_BEEF'. Allocate pallets across incoming ranch shipments ordered by pack_date ASC and compute remaining balance on each shipment.\n\n### Requirements\n- Compute cumulative pallets available ordered by pack_date ASC.\n- Allocate 85 pallets across shipments.\n- Calculate remaining_pallets per shipment.\n- Only display shipments from which pallets were allocated.\n- Output columns: shipment_id, total_pallets, allocated_pallets, remaining_pallets.\n- Sort by shipment_id ascending.\n\n### Input Schema\n**cold_storage_pallets** (shipment_id INT, product_sku VARCHAR, pack_date DATE, total_pallets INT)",
    "schemaSql": "CREATE TABLE cold_storage_pallets (shipment_id INT PRIMARY KEY, product_sku VARCHAR(20), pack_date DATE, total_pallets INT);\nINSERT INTO cold_storage_pallets VALUES (1, 'FROZEN_BEEF', '2025-01-01', 35), (2, 'FROZEN_BEEF', '2025-01-03', 35), (3, 'FROZEN_BEEF', '2025-01-06', 40), (4, 'FROZEN_BEEF', '2025-01-10', 50);",
    "starterSql": "-- 289. Sysco: Cold-Chain Food Distribution FIFO Pallet Depletion\n-- Output: shipment_id, total_pallets, allocated_pallets, remaining_pallets\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT shipment_id, total_pallets, SUM(total_pallets) OVER (ORDER BY pack_date ASC) AS cum_units, COALESCE(SUM(total_pallets) OVER (ORDER BY pack_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM cold_storage_pallets WHERE product_sku = 'FROZEN_BEEF') SELECT shipment_id, total_pallets, LEAST(total_pallets, GREATEST(0, 85 - prev_cum)) AS allocated_pallets, total_pallets - LEAST(total_pallets, GREATEST(0, 85 - prev_cum)) AS remaining_pallets FROM cum WHERE prev_cum < 85 ORDER BY shipment_id ASC;",
    "expectedColumns": [
      "shipment_id",
      "total_pallets",
      "allocated_pallets",
      "remaining_pallets"
    ],
    "hints": [
      "Compute cumulative pallets with SUM() OVER.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 85."
    ],
    "explanation": "Cold-chain FIFO rotation preserves strict FDA food safety temperature integrity standards.",
    "number": 289
  },
  {
    "id": "adv-290",
    "title": "290. DRW: Energy Futures Crack Spread Arbitrage Calculation",
    "difficulty": "Hard",
    "companies": [
      "DRW",
      "Jane Street"
    ],
    "topics": [
      "JOIN",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nDRW Energy Trading monitors the classic 3:2:1 Oil Refinery Crack Spread: 3 barrels of Crude Oil produce 2 barrels of Gasoline and 1 barrel of Heating Oil. Crack Spread = (2 * Gasoline Price + 1 * Heating Oil Price - 3 * Crude Oil Price) / 3. Compute the crack spread per barrel for each trading date.\n\n### Requirements\n- Join crude, gasoline, and heating oil prices on trade_date.\n- Calculate crack_spread as ((2 * gas_price + 1 * heat_price - 3 * crude_price) / 3.0), rounded to 2 decimal places.\n- Output columns: trade_date, crude_price, gas_price, heat_price, crack_spread.\n- Sort by trade_date ascending.\n\n### Input Schema\n**crude_futures** (trade_date DATE, crude_price NUMERIC)\n\n**gas_futures** (trade_date DATE, gas_price NUMERIC)\n\n**heat_futures** (trade_date DATE, heat_price NUMERIC)",
    "schemaSql": "CREATE TABLE crude_futures (trade_date DATE PRIMARY KEY, crude_price NUMERIC);\nCREATE TABLE gas_futures (trade_date DATE PRIMARY KEY, gas_price NUMERIC);\nCREATE TABLE heat_futures (trade_date DATE PRIMARY KEY, heat_price NUMERIC);\nINSERT INTO crude_futures VALUES ('2025-01-02', 72.00), ('2025-01-03', 74.00);\nINSERT INTO gas_futures VALUES ('2025-01-02', 96.00), ('2025-01-03', 97.00);\nINSERT INTO heat_futures VALUES ('2025-01-02', 90.00), ('2025-01-03', 92.00);",
    "starterSql": "-- 290. DRW: Energy Futures Crack Spread Arbitrage Calculation\n-- Output: trade_date, crude_price, gas_price, heat_price, crack_spread\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT c.trade_date, c.crude_price, g.gas_price, h.heat_price, ROUND(((2.0 * g.gas_price + h.heat_price - 3.0 * c.crude_price) / 3.0), 2) AS crack_spread FROM crude_futures c JOIN gas_futures g ON c.trade_date = g.trade_date JOIN heat_futures h ON c.trade_date = h.trade_date ORDER BY c.trade_date ASC;",
    "expectedColumns": [
      "trade_date",
      "crude_price",
      "gas_price",
      "heat_price",
      "crack_spread"
    ],
    "hints": [
      "Join 3 commodity futures tables on trade_date.",
      "Apply standard 3:2:1 refinery formula.",
      "Round result to 2 decimals."
    ],
    "explanation": "Refinery margin crack spreads guide hedging positions across petroleum derivatives complexes.",
    "number": 290
  },
  {
    "id": "adv-291",
    "title": "291. Steam: Gaming Sessionization with 60-Minute Lobby Inactivity Threshold",
    "difficulty": "Hard",
    "companies": [
      "Steam",
      "Valve"
    ],
    "topics": [
      "Sessionization",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nSteam Game Coordinator calculates active gamer multiplayer sessions. If a player stays in lobby matchmaking without launching a game for more than 60 minutes, the session lapses. Find session start time and total matches played.\n\n### Requirements\n- Use LAG to find elapsed minutes from prior match launch.\n- Flag new session when elapsed time > 60 minutes or on first match.\n- Generate a cumulative session_id per player.\n- Output columns: player_id, session_id, session_start, total_matches.\n- Sort by player_id ascending, session_id ascending.\n\n### Input Schema\n**match_logs** (id INT, player_id INT, match_id INT, launch_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE match_logs (id INT PRIMARY KEY, player_id INT, match_id INT, launch_time TIMESTAMP);\nINSERT INTO match_logs VALUES (1, 101, 1, '2025-01-01 18:00:00'), (2, 101, 2, '2025-01-01 18:45:00'), (3, 101, 3, '2025-01-01 20:30:00'), (4, 102, 4, '2025-01-01 19:00:00'), (5, 102, 5, '2025-01-01 19:40:00');",
    "starterSql": "-- 291. Steam: Gaming Sessionization with 60-Minute Lobby Inactivity Threshold\n-- Output: player_id, session_id, session_start, total_matches\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT player_id, launch_time, CASE WHEN LAG(launch_time) OVER (PARTITION BY player_id ORDER BY launch_time ASC) IS NULL OR (launch_time - LAG(launch_time) OVER (PARTITION BY player_id ORDER BY launch_time ASC)) > INTERVAL '60 minutes' THEN 1 ELSE 0 END AS is_new_session FROM match_logs), sessions AS (SELECT player_id, launch_time, SUM(is_new_session) OVER (PARTITION BY player_id ORDER BY launch_time ASC ROWS UNBOUNDED PRECEDING) AS session_id FROM lagged) SELECT player_id, session_id, MIN(launch_time) AS session_start, COUNT(*) AS total_matches FROM sessions GROUP BY player_id, session_id ORDER BY player_id ASC, session_id ASC;",
    "expectedColumns": [
      "player_id",
      "session_id",
      "session_start",
      "total_matches"
    ],
    "hints": [
      "Flag session starts with LAG > 60 minutes.",
      "Accumulate session_id using SUM OVER.",
      "Group by player and session_id."
    ],
    "explanation": "Gaming session durations inform matchmaker pool clustering and player fatigue alerts.",
    "number": 291
  },
  {
    "id": "adv-292",
    "title": "292. Linear: Recursive Project Milestone Sub-Issue Tree Rollup",
    "difficulty": "Hard",
    "companies": [
      "Linear",
      "GitHub"
    ],
    "topics": [
      "WITH RECURSIVE",
      "Hierarchy",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nLinear Engineering Project Roadmaps rolls up task completion across nested milestone issues. Given a root initiative (parent_issue_id IS NULL), traverse all child and grandchild sub-issues recursively and calculate total completed estimate points rolled up.\n\n### Requirements\n- Start with root initiatives (parent_issue_id IS NULL).\n- Recursively traverse all child sub-issues.\n- Sum estimate points for completed issues (is_completed = TRUE).\n- Output columns: root_key, initiative_title, completed_points.\n- Sort by completed_points descending, then by root_key ascending.\n\n### Input Schema\n**linear_roadmap** (issue_id INT, parent_issue_id INT, issue_key VARCHAR, title VARCHAR, points INT, is_completed BOOLEAN)",
    "schemaSql": "CREATE TABLE linear_roadmap (issue_id INT PRIMARY KEY, parent_issue_id INT, issue_key VARCHAR(20), title VARCHAR(100), points INT, is_completed BOOLEAN);\nINSERT INTO linear_roadmap VALUES (1, NULL, 'INIT-1', 'AI Assistant V1', 0, FALSE), (2, 1, 'ENG-10', 'Model Serving API', 8, TRUE), (3, 1, 'ENG-11', 'Vector Database', 5, TRUE), (4, 3, 'SUB-1', 'Qdrant Cluster Setup', 3, TRUE), (5, NULL, 'INIT-2', 'Mobile Dark Mode', 0, FALSE), (6, 5, 'ENG-20', 'Color Palette Tokens', 5, TRUE);",
    "starterSql": "-- 292. Linear: Recursive Project Milestone Sub-Issue Tree Rollup\n-- Output: root_key, initiative_title, completed_points\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE roadmap_tree AS (SELECT issue_id AS root_id, issue_key AS root_key, title AS initiative_title, issue_id AS current_id, points, is_completed FROM linear_roadmap WHERE parent_issue_id IS NULL UNION ALL SELECT r.root_id, r.root_key, r.initiative_title, l.issue_id, l.points, l.is_completed FROM linear_roadmap l JOIN roadmap_tree r ON l.parent_issue_id = r.current_id) SELECT root_key, initiative_title, SUM(CASE WHEN is_completed THEN points ELSE 0 END) AS completed_points FROM roadmap_tree GROUP BY root_key, initiative_title ORDER BY completed_points DESC, root_key ASC;",
    "expectedColumns": [
      "root_key",
      "initiative_title",
      "completed_points"
    ],
    "hints": [
      "Hold root_id throughout recursive traversal.",
      "Join child issues.",
      "Sum completed points conditionally."
    ],
    "explanation": "Recursive initiative tracking automates engineering roadmap burndown charts.",
    "number": 292
  },
  {
    "id": "adv-293",
    "title": "293. Robinhood: Consecutive Daily Active Trading Days Streak",
    "difficulty": "Hard",
    "companies": [
      "Robinhood",
      "Coinbase"
    ],
    "topics": [
      "Gaps & Islands",
      "Date Arithmetic",
      "ROW_NUMBER",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nRobinhood Gold Gamification tracks active retail trader daily streaks. For each user who executed at least one trade on consecutive market trading dates, calculate their longest contiguous trading day streak.\n\n### Requirements\n- Group consecutive calendar trading dates using date - ROW_NUMBER() * interval '1 day'.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**trader_activity** (id INT, user_id INT, trade_date DATE)",
    "schemaSql": "CREATE TABLE trader_activity (id INT PRIMARY KEY, user_id INT, trade_date DATE);\nINSERT INTO trader_activity VALUES (1, 101, '2025-01-02'), (2, 101, '2025-01-03'), (3, 101, '2025-01-04'), (4, 101, '2025-01-06'), (5, 102, '2025-01-02'), (6, 102, '2025-01-03');",
    "starterSql": "-- 293. Robinhood: Consecutive Daily Active Trading Days Streak\n-- Output: user_id, longest_streak_days\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH distinct_days AS (SELECT DISTINCT user_id, trade_date FROM trader_activity), grouped AS (SELECT user_id, trade_date, trade_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY trade_date ASC) * INTERVAL '1 day') AS grp FROM distinct_days), streaks AS (SELECT user_id, grp, COUNT(*) AS streak_days FROM grouped GROUP BY user_id, grp) SELECT user_id, MAX(streak_days) AS longest_streak_days FROM streaks GROUP BY user_id ORDER BY longest_streak_days DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "longest_streak_days"
    ],
    "hints": [
      "Subtract ROW_NUMBER days from trade_date.",
      "Group by user and group key.",
      "Find MAX streak length."
    ],
    "explanation": "Trading streak tracking segments active day-traders from passive buy-and-hold accounts.",
    "number": 293
  },
  {
    "id": "adv-294",
    "title": "294. Coursera: Enterprise Learning Program Annual Cohort Retention Matrix",
    "difficulty": "Hard",
    "companies": [
      "Coursera",
      "Udemy"
    ],
    "topics": [
      "Cohort Analysis",
      "EXTRACT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCoursera for Business evaluates enterprise corporate contract renewal retention. For corporate client accounts whose corporate contract started in 2022 (Cohort 2022), compute the number of retained corporate accounts in Year 0 (2022), Year 1 (2023), and Year 2 (2024).\n\n### Requirements\n- Filter for corporate clients whose first active contract began in 2022.\n- Count distinct clients active in years 2022 (y0), 2023 (y1), and 2024 (y2).\n- Output columns: cohort_year, y0_clients, y1_clients, y2_clients.\n- Sort by cohort_year ascending.\n\n### Input Schema\n**enterprise_contracts** (id INT, client_id INT, active_year INT)",
    "schemaSql": "CREATE TABLE enterprise_contracts (id INT PRIMARY KEY, client_id INT, active_year INT);\nINSERT INTO enterprise_contracts VALUES (1, 101, 2022), (2, 101, 2023), (3, 101, 2024), (4, 102, 2022), (5, 102, 2023), (6, 103, 2022), (7, 104, 2023);",
    "starterSql": "-- 294. Coursera: Enterprise Learning Program Annual Cohort Retention Matrix\n-- Output: cohort_year, y0_clients, y1_clients, y2_clients\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH first_yr AS (SELECT client_id, MIN(active_year) AS start_year FROM enterprise_contracts GROUP BY client_id HAVING MIN(active_year) = 2022), activity AS (SELECT c.client_id, c.active_year FROM enterprise_contracts c JOIN first_yr f ON c.client_id = f.client_id) SELECT 2022 AS cohort_year, COUNT(DISTINCT CASE WHEN active_year = 2022 THEN client_id END) AS y0_clients, COUNT(DISTINCT CASE WHEN active_year = 2023 THEN client_id END) AS y1_clients, COUNT(DISTINCT CASE WHEN active_year = 2024 THEN client_id END) AS y2_clients FROM activity GROUP BY cohort_year ORDER BY cohort_year ASC;",
    "expectedColumns": [
      "cohort_year",
      "y0_clients",
      "y1_clients",
      "y2_clients"
    ],
    "hints": [
      "Filter clients starting in 2022.",
      "Pivot active calendar years.",
      "Count distinct active clients."
    ],
    "explanation": "Corporate learning cohort retention guides enterprise customer success playbooks.",
    "number": 294
  },
  {
    "id": "adv-295",
    "title": "295. Akamai: Global Edge Server Maintenance Downtime Consolidation",
    "difficulty": "Hard",
    "companies": [
      "Akamai",
      "Cloudflare"
    ],
    "topics": [
      "Interval Merging",
      "LAG",
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nAkamai Global Operations Command Center consolidates overlapping edge node maintenance periods. Multiple hardware firmware upgrades schedule overlapping maintenance windows for edge servers. Merge overlapping intervals into unified downtime periods.\n\n### Requirements\n- Track running maximum end_time across maintenance alerts per edge_node.\n- Group overlapping and contiguous intervals into distinct maintenance periods.\n- Calculate duration in minutes.\n- Output columns: edge_node, maintenance_start, maintenance_end, duration_minutes.\n- Sort by edge_node ascending, maintenance_start ascending.\n\n### Input Schema\n**edge_maintenance** (id INT, edge_node VARCHAR, start_time TIMESTAMP, end_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE edge_maintenance (id INT PRIMARY KEY, edge_node VARCHAR(20), start_time TIMESTAMP, end_time TIMESTAMP);\nINSERT INTO edge_maintenance VALUES (1, 'NODE_BOS_01', '2025-01-01 01:00:00', '2025-01-01 01:40:00'), (2, 'NODE_BOS_01', '2025-01-01 01:20:00', '2025-01-01 02:10:00'), (3, 'NODE_BOS_01', '2025-01-01 03:00:00', '2025-01-01 03:30:00'), (4, 'NODE_FRA_02', '2025-01-01 04:00:00', '2025-01-01 04:45:00');",
    "starterSql": "-- 295. Akamai: Global Edge Server Maintenance Downtime Consolidation\n-- Output: edge_node, maintenance_start, maintenance_end, duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT edge_node, start_time, end_time, MAX(end_time) OVER (PARTITION BY edge_node ORDER BY start_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS prev_max_end FROM edge_maintenance), islands AS (SELECT edge_node, start_time, end_time, SUM(CASE WHEN prev_max_end IS NULL OR start_time > prev_max_end THEN 1 ELSE 0 END) OVER (PARTITION BY edge_node ORDER BY start_time ASC ROWS UNBOUNDED PRECEDING) AS island_id FROM ranked) SELECT edge_node, MIN(start_time) AS maintenance_start, MAX(end_time) AS maintenance_end, EXTRACT(EPOCH FROM (MAX(end_time) - MIN(start_time)))::INT / 60 AS duration_minutes FROM islands GROUP BY edge_node, island_id ORDER BY edge_node ASC, maintenance_start ASC;",
    "expectedColumns": [
      "edge_node",
      "maintenance_start",
      "maintenance_end",
      "duration_minutes"
    ],
    "hints": [
      "Compare current start against running MAX(end_time).",
      "Accumulate island ID with running sum.",
      "Calculate MIN(start) and MAX(end)."
    ],
    "explanation": "Edge maintenance consolidation ensures transparent reporting for DNS edge routing shifts.",
    "number": 295
  },
  {
    "id": "adv-296",
    "title": "296. Caterpillar: Heavy Mining Excavator Engine Assembly Tree Explosion",
    "difficulty": "Hard",
    "companies": [
      "Caterpillar",
      "Deere"
    ],
    "topics": [
      "WITH RECURSIVE",
      "BOM",
      "Hierarchy"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCaterpillar Heavy Machinery Engineering calculates component requirements for the 'Cat 6020B Hydraulic Shovel'. For the top-level 'Diesel Power Pack', recursively explode the subassembly tree and calculate total units of leaf gaskets, seals, and injectors required.\n\n### Requirements\n- Start with top assembly (parent_id IS NULL).\n- Recursively traverse part tree multiplying quantities down.\n- Filter for leaf parts with no subassemblies.\n- Output columns: part_name, total_units_required.\n- Sort by total_units_required descending, then by part_name ascending.\n\n### Input Schema\n**excavator_bom** (id INT, parent_id INT, part_name VARCHAR, quantity INT)",
    "schemaSql": "CREATE TABLE excavator_bom (id INT PRIMARY KEY, parent_id INT, part_name VARCHAR(50), quantity INT);\nINSERT INTO excavator_bom VALUES (1, NULL, 'Diesel Power Pack', 1), (2, 1, 'V12 Engine Block', 1), (3, 1, 'Twin Turbocharger Unit', 2), (4, 2, 'Cylinder Liner', 12), (5, 2, 'Fuel Injector Nozzle', 12), (6, 3, 'Ceramic Turbine Bearing', 2);",
    "starterSql": "-- 296. Caterpillar: Heavy Mining Excavator Engine Assembly Tree Explosion\n-- Output: part_name, total_units_required\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH RECURSIVE bom_tree AS (SELECT id, parent_id, part_name, quantity AS total_qty FROM excavator_bom WHERE parent_id IS NULL UNION ALL SELECT e.id, e.parent_id, e.part_name, t.total_qty * e.quantity FROM excavator_bom e JOIN bom_tree t ON e.parent_id = t.id) SELECT b.part_name, b.total_qty AS total_units_required FROM bom_tree b WHERE b.id NOT IN (SELECT DISTINCT parent_id FROM excavator_bom WHERE parent_id IS NOT NULL) ORDER BY total_units_required DESC, part_name ASC;",
    "expectedColumns": [
      "part_name",
      "total_units_required"
    ],
    "hints": [
      "Traverse tree multiplying parent by child quantities.",
      "Filter leaf parts using NOT IN.",
      "Sort by required quantity DESC."
    ],
    "explanation": "Heavy industrial machinery parts explosions coordinate global foundry and machining schedules.",
    "number": 296
  },
  {
    "id": "adv-297",
    "title": "297. Ramp: Corporate Travel Expense Booking Double-Payment Deduplication",
    "difficulty": "Hard",
    "companies": [
      "Ramp",
      "Brex"
    ],
    "topics": [
      "Deduplication",
      "ROW_NUMBER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nRamp Corporate Card Auditing identifies duplicate flight travel bookings accidentally charged by employee travel coordinators. For charges matching employee_id, airline_name, and flight_date, select the single authoritative transaction with the lowest fee amount.\n\n### Requirements\n- Partition records by employee_id, airline_name, and flight_date.\n- Order by amount ascending to prioritize the cheaper primary ticket.\n- Filter for rank = 1.\n- Output columns: charge_id, employee_id, airline_name, flight_date, amount.\n- Sort by charge_id ascending.\n\n### Input Schema\n**travel_charges** (charge_id INT, employee_id INT, airline_name VARCHAR, flight_date DATE, amount NUMERIC)",
    "schemaSql": "CREATE TABLE travel_charges (charge_id INT PRIMARY KEY, employee_id INT, airline_name VARCHAR(50), flight_date DATE, amount NUMERIC);\nINSERT INTO travel_charges VALUES (1, 101, 'Delta Air Lines', '2025-02-10', 450.00), (2, 101, 'Delta Air Lines', '2025-02-10', 485.00), (3, 102, 'United Airlines', '2025-02-12', 380.00), (4, 103, 'American Airlines', '2025-02-15', 520.00), (5, 103, 'American Airlines', '2025-02-15', 520.00);",
    "starterSql": "-- 297. Ramp: Corporate Travel Expense Booking Double-Payment Deduplication\n-- Output: charge_id, employee_id, airline_name, flight_date, amount\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT charge_id, employee_id, airline_name, flight_date, amount, ROW_NUMBER() OVER (PARTITION BY employee_id, airline_name, flight_date ORDER BY amount ASC, charge_id ASC) AS rn FROM travel_charges) SELECT charge_id, employee_id, airline_name, flight_date, amount FROM ranked WHERE rn = 1 ORDER BY charge_id ASC;",
    "expectedColumns": [
      "charge_id",
      "employee_id",
      "airline_name",
      "flight_date",
      "amount"
    ],
    "hints": [
      "Use ROW_NUMBER() partitioned by employee, airline, and date.",
      "Order by amount ASC, charge_id ASC.",
      "Filter rn = 1."
    ],
    "explanation": "Corporate expense deduplication automatically alerts finance to initiate ticket refund cancellations.",
    "number": 297
  },
  {
    "id": "adv-298",
    "title": "298. Uber Eats: Food Delivery Order-to-Eats Funnel Sequence",
    "difficulty": "Hard",
    "companies": [
      "Uber Eats",
      "DoorDash"
    ],
    "topics": [
      "Funnel Sequence",
      "LEAD",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nUber Eats Mobile Funnel Optimization tracks food delivery milestones. Identify customer orders that executed the complete 4-step sequence: 'RESTAURANT_VIEW' -> 'ITEM_ADDED' -> 'CHECKOUT_PAID' -> 'ORDER_DELIVERED' in strict order within 45 minutes.\n\n### Requirements\n- Use LEAD to inspect next 3 events for each order_id.\n- Verify event names match 'RESTAURANT_VIEW', 'ITEM_ADDED', 'CHECKOUT_PAID', and 'ORDER_DELIVERED'.\n- Verify elapsed duration <= 45 minutes.\n- Output columns: order_id, view_time, delivery_time.\n- Sort by order_id ascending.\n\n### Input Schema\n**food_funnel** (id INT, order_id INT, event_name VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE food_funnel (id INT PRIMARY KEY, order_id INT, event_name VARCHAR(30), event_time TIMESTAMP);\nINSERT INTO food_funnel VALUES (1, 101, 'RESTAURANT_VIEW', '2025-01-01 18:00:00'), (2, 101, 'ITEM_ADDED', '2025-01-01 18:05:00'), (3, 101, 'CHECKOUT_PAID', '2025-01-01 18:10:00'), (4, 101, 'ORDER_DELIVERED', '2025-01-01 18:40:00'), (5, 102, 'RESTAURANT_VIEW', '2025-01-01 19:00:00'), (6, 102, 'ITEM_ADDED', '2025-01-01 19:10:00');",
    "starterSql": "-- 298. Uber Eats: Food Delivery Order-to-Eats Funnel Sequence\n-- Output: order_id, view_time, delivery_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH seq AS (SELECT order_id, event_name, event_time AS view_time, LEAD(event_name, 1) OVER (PARTITION BY order_id ORDER BY event_time ASC) AS s2, LEAD(event_name, 2) OVER (PARTITION BY order_id ORDER BY event_time ASC) AS s3, LEAD(event_name, 3) OVER (PARTITION BY order_id ORDER BY event_time ASC) AS s4, LEAD(event_time, 3) OVER (PARTITION BY order_id ORDER BY event_time ASC) AS delivery_time FROM food_funnel) SELECT order_id, view_time, delivery_time FROM seq WHERE event_name = 'RESTAURANT_VIEW' AND s2 = 'ITEM_ADDED' AND s3 = 'CHECKOUT_PAID' AND s4 = 'ORDER_DELIVERED' AND (delivery_time - view_time) <= INTERVAL '45 minutes' ORDER BY order_id ASC;",
    "expectedColumns": [
      "order_id",
      "view_time",
      "delivery_time"
    ],
    "hints": [
      "Use multi-offset LEAD up to offset 3.",
      "Verify sequence names.",
      "Filter interval <= 45 minutes."
    ],
    "explanation": "Food delivery sequence speed identifies high-performing ghost kitchens and courier dispatch clusters.",
    "number": 298
  },
  {
    "id": "adv-299",
    "title": "299. McKesson: Pharmaceutical Drug Batch FIFO Lot Allocation",
    "difficulty": "Hard",
    "companies": [
      "McKesson",
      "AmerisourceBergen"
    ],
    "topics": [
      "FIFO",
      "SUM OVER",
      "GREATEST/LEAST",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nMcKesson Pharmaceutical Distribution distributes prescription medicine batches to hospital pharmacies on a strict FEFO/FIFO basis. A regional hospital orders 110 vials of 'INSULIN_GLARGINE'. Allocate vials across incoming vaccine/drug lots ordered by expiration_date ASC and compute remaining vials on each lot.\n\n### Requirements\n- Compute cumulative vials available ordered by expiration_date ASC.\n- Allocate 110 vials across drug lots.\n- Calculate remaining_vials per lot.\n- Only display lots from which vials were allocated.\n- Output columns: lot_id, total_vials, allocated_vials, remaining_vials.\n- Sort by lot_id ascending.\n\n### Input Schema\n**pharma_lots** (lot_id INT, drug_name VARCHAR, expiration_date DATE, total_vials INT)",
    "schemaSql": "CREATE TABLE pharma_lots (lot_id INT PRIMARY KEY, drug_name VARCHAR(50), expiration_date DATE, total_vials INT);\nINSERT INTO pharma_lots VALUES (1, 'INSULIN_GLARGINE', '2025-06-01', 50), (2, 'INSULIN_GLARGINE', '2025-07-01', 50), (3, 'INSULIN_GLARGINE', '2025-08-01', 60), (4, 'INSULIN_GLARGINE', '2025-12-01', 100);",
    "starterSql": "-- 299. McKesson: Pharmaceutical Drug Batch FIFO Lot Allocation\n-- Output: lot_id, total_vials, allocated_vials, remaining_vials\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT lot_id, total_vials, SUM(total_vials) OVER (ORDER BY expiration_date ASC) AS cum_units, COALESCE(SUM(total_vials) OVER (ORDER BY expiration_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev_cum FROM pharma_lots WHERE drug_name = 'INSULIN_GLARGINE') SELECT lot_id, total_vials, LEAST(total_vials, GREATEST(0, 110 - prev_cum)) AS allocated_vials, total_vials - LEAST(total_vials, GREATEST(0, 110 - prev_cum)) AS remaining_vials FROM cum WHERE prev_cum < 110 ORDER BY lot_id ASC;",
    "expectedColumns": [
      "lot_id",
      "total_vials",
      "allocated_vials",
      "remaining_vials"
    ],
    "hints": [
      "Order cumulative sum by expiration_date ASC.",
      "Allocate with LEAST and GREATEST.",
      "Filter where previous cumulative sum is below 110."
    ],
    "explanation": "Pharmaceutical lot allocation enforces strict FDA Drug Supply Chain Security Act (DSCSA) track-and-trace mandates.",
    "number": 299
  },
  {
    "id": "adv-300",
    "title": "300. Citadel Securities: Options Market Maker Delta-Neutral Portfolio Rebalancing",
    "difficulty": "Hard",
    "companies": [
      "Citadel Securities",
      "Optiver"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCitadel Securities Options Automated Trading monitors delta-neutral portfolio exposure across option books. Given option positions with contract delta (-1.0 to +1.0) and contract multiplier of 100 shares, compute net portfolio delta shares per underlying stock symbol to determine required share hedge rebalancing.\n\n### Requirements\n- Calculate position_delta_shares as position_contracts * contract_delta * 100.\n- Compute net_portfolio_delta as sum of position_delta_shares, rounded to 2 decimal places.\n- Calculate required_hedge_shares as -1 * net_portfolio_delta.\n- Output columns: underlying_symbol, net_portfolio_delta, required_hedge_shares.\n- Sort by ABS(net_portfolio_delta) descending, then by underlying_symbol ascending.\n\n### Input Schema\n**option_positions** (id INT, underlying_symbol VARCHAR, position_contracts INT, contract_delta NUMERIC)",
    "schemaSql": "CREATE TABLE option_positions (id INT PRIMARY KEY, underlying_symbol VARCHAR(10), position_contracts INT, contract_delta NUMERIC);\nINSERT INTO option_positions VALUES (1, 'NVDA', 50, 0.45), (2, 'NVDA', -30, 0.60), (3, 'NVDA', 20, -0.25), (4, 'MSFT', 100, 0.50), (5, 'MSFT', -80, 0.55);",
    "starterSql": "-- 300. Citadel Securities: Options Market Maker Delta-Neutral Portfolio Rebalancing\n-- Output: underlying_symbol, net_portfolio_delta, required_hedge_shares\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT underlying_symbol, ROUND(SUM(position_contracts * contract_delta * 100.0), 2) AS net_portfolio_delta, ROUND(-1.0 * SUM(position_contracts * contract_delta * 100.0), 2) AS required_hedge_shares FROM option_positions GROUP BY underlying_symbol ORDER BY ABS(SUM(position_contracts * contract_delta * 100.0)) DESC, underlying_symbol ASC;",
    "expectedColumns": [
      "underlying_symbol",
      "net_portfolio_delta",
      "required_hedge_shares"
    ],
    "hints": [
      "Compute contract position delta in shares (contracts * delta * 100).",
      "Sum delta across positions.",
      "Invert sign to determine required stock hedge shares."
    ],
    "explanation": "Delta hedging maintains market maker neutrality against directional equity market fluctuations.",
    "number": 300
  }
];
  return orderAndEnrichAdvanced(raw);
}
