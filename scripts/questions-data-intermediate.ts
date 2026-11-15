import { InterviewQuestion } from "../src/lib/content/interview-questions";

// Level 2: Intermediate (100 Questions)
// Themes:
// 1. Top-N per Category with Ties (DENSE_RANK) (101-110)
// 2. Consecutive Event Time Deltas & Rapid Bursts (LEAD/LAG) (111-120)
// 3. 7-Day & 30-Day Rolling Window Averages (121-130)
// 4. Month-Over-Month (MoM) Growth Rates (131-140)
// 5. Preventing Join Fanouts with Pre-Aggregated CTEs (141-150)
// 6. First-Touch & Last-Touch Marketing Attribution (151-160)
// 7. Running Cumulative Balances & Threshold Milestones (161-170)
// 8. Active User Ratios (DAU/MAU Stickiness) (171-180)
// 9. N-th Highest Value without LIMIT/OFFSET (181-190)
// 10. Multi-Stage Funnel Conversion Pipelines (191-200)

export function getIntermediateQuestions(): InterviewQuestion[] {
  const list: InterviewQuestion[] = [];

  // -------------------------------------------------------------
  // THEME 1: Top-N per Category with Ties (DENSE_RANK) (101-110)
  // -------------------------------------------------------------
  const theme1Domains = [
    { company: "Amazon", group: "department", item: "employee", metric: "salary", valName: "Compensation", topN: 2 },
    { company: "Spotify", group: "artist", item: "track", metric: "stream_count", valName: "Stream Count", topN: 3 },
    { company: "Netflix", group: "genre", item: "movie", metric: "watch_hours", valName: "Watch Hours", topN: 2 },
    { company: "Apple", group: "category", item: "app", metric: "gross_revenue", valName: "Gross Revenue", topN: 3 },
    { company: "DoorDash", group: "restaurant", item: "menu_item", metric: "order_count", valName: "Order Volume", topN: 2 },
    { company: "Uber", group: "city_zone", item: "driver", metric: "rating_score", valName: "Rating Score", topN: 3 },
    { company: "Airbnb", group: "city", item: "listing", metric: "booking_count", valName: "Booking Count", topN: 2 },
    { company: "Shopify", group: "store", item: "product", metric: "sales_volume", valName: "Sales Units", topN: 3 },
    { company: "YouTube", group: "channel", item: "video", metric: "like_count", valName: "Likes Count", topN: 2 },
    { company: "Stripe", group: "industry", item: "merchant", metric: "total_processed", valName: "Processed Volume", topN: 3 },
  ];

  theme1Domains.forEach((item, idx) => {
    const qNum = 101 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Top ${item.topN} Highest ${item.valName} ${item.item.charAt(0).toUpperCase() + item.item.slice(1)}s per ${item.group.charAt(0).toUpperCase() + item.group.slice(1)} (Handling Ties)`;

    const description = `### Business Context
The ${item.company} Leadership team wants to benchmark performance across different ${item.group}s. Management has requested a report identifying the **top ${item.topN} highest ${item.metric.replace("_", " ")} ${item.item}s within each ${item.group}**.

### Metric Formulas & Rules
- Rank ${item.item}s within each ${item.group} ordered by \`${item.metric}\` DESC.
- If multiple ${item.item}s tie for a rank, **all tied records must be included**.
- You must use \`DENSE_RANK()\` so that no rank numbers are skipped after ties.
- Filter to include only ranks \`<= ${item.topN}\`.
- Output columns: \`${item.group}_name\`, \`${item.item}_name\`, \`${item.metric}\`, \`rnk\`.
- Sort by \`${item.group}_name\` ASC, \`${item.metric}\` DESC, then \`${item.item}_name\` ASC.

### Input Schema
**${item.group}s** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)

**${item.item}s** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.group}_id\` (INT)
- \`name\` (VARCHAR)
- \`${item.metric}\` (INT)`;

    const schemaSql = `
CREATE TABLE ${item.group}s (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE ${item.item}s (
  id INT PRIMARY KEY,
  ${item.group}_id INT,
  name VARCHAR(50),
  ${item.metric} INT
);

INSERT INTO ${item.group}s VALUES
(1, 'Group Alpha'),
(2, 'Group Beta'),
(3, 'Group Gamma');

INSERT INTO ${item.item}s VALUES
(1, 1, 'Entity 1', 165000),
(2, 1, 'Entity 2', 155000),
(3, 1, 'Entity 3', 165000), -- Ties with Entity 1 for rank 1
(4, 1, 'Entity 4', 140000),
(5, 2, 'Entity 5', 95000),
(6, 2, 'Entity 6', 95000),
(7, 2, 'Entity 7', 85000),
(8, 3, 'Entity 8', 110000),
(9, 3, 'Entity 9', 115000),
(10, 3, 'Entity 10', 115000);
`;

    const starterSql = `-- ${item.company}: Find top ${item.topN} ${item.item}s per ${item.group} using DENSE_RANK()
-- Output: ${item.group}_name, ${item.item}_name, ${item.metric}, rnk
WITH ranked AS (
  -- Your code here
)
SELECT * FROM ranked;
`;

    const referenceSql = `WITH ranked AS (
  SELECT 
    g.name AS ${item.group}_name,
    i.name AS ${item.item}_name,
    i.${item.metric},
    DENSE_RANK() OVER (
      PARTITION BY i.${item.group}_id 
      ORDER BY i.${item.metric} DESC
    ) AS rnk
  FROM ${item.item}s i
  JOIN ${item.group}s g ON i.${item.group}_id = g.id
)
SELECT 
  ${item.group}_name,
  ${item.item}_name,
  ${item.metric},
  rnk
FROM ranked
WHERE rnk <= ${item.topN}
ORDER BY ${item.group}_name ASC, ${item.metric} DESC, ${item.item}_name ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Google", "Amazon"],
      topics: ["DENSE_RANK", "Window Functions", "CTEs", "Ties"],
      frequency: "Very High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.group}_name`, `${item.item}_name`, item.metric, "rnk"],
      hints: [
        "In SQL, you cannot filter on a window function inside the WHERE clause directly. Wrap it in a CTE (`WITH ... AS (...)`).",
        "Use `DENSE_RANK() OVER (PARTITION BY ... ORDER BY ... DESC)`.",
        `Filter for \`rnk <= ${item.topN}\` in the outer query.`
      ],
      explanation: `### Why DENSE_RANK vs RANK?
\`ROW_NUMBER()\` arbitrarily assigns unique numbers (1, 2, 3), which silently drops tied winners. \`RANK()\` skips subsequent numbers on ties (1, 1, 3). \`DENSE_RANK()\` keeps consecutive numbers on ties (1, 1, 2), ensuring both top ranks are fully populated.`
    });
  });

  // -------------------------------------------------------------
  // THEME 2: Consecutive Event Time Deltas & Rapid Bursts (LEAD/LAG) (111-120)
  // -------------------------------------------------------------
  const theme2Bursts = [
    { company: "JPMorgan", entity: "account", event: "card transaction", maxSec: 300, minAmount: 500 },
    { company: "Stripe", entity: "merchant", event: "API charge request", maxSec: 60, minAmount: 200 },
    { company: "DoorDash", entity: "diner", event: "order placement", maxSec: 120, minAmount: 50 },
    { company: "Uber", entity: "driver", event: "ride acceptance ping", maxSec: 45, minAmount: 20 },
    { company: "Netflix", entity: "subscriber", event: "device playback start", maxSec: 30, minAmount: 0 },
    { company: "Coinbase", entity: "wallet", event: "crypto limit order", maxSec: 15, minAmount: 1000 },
    { company: "Robinhood", entity: "trader", event: "options market order", maxSec: 25, minAmount: 500 },
    { company: "Google Cloud", entity: "project", event: "VM compute spin-up", maxSec: 90, minAmount: 10 },
    { company: "Meta", entity: "user", event: "connection invite send", maxSec: 10, minAmount: 0 },
    { company: "Twilio", entity: "api_account", event: "SMS outbound dispatch", maxSec: 5, minAmount: 0 },
  ];

  theme2Bursts.forEach((item, idx) => {
    const qNum = 111 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Rapid Consecutive ${item.event.charAt(0).toUpperCase() + item.event.slice(1)} Burst Alert (Under ${item.maxSec}s)`;

    const description = `### Business Context
${item.company} Security & Operations monitors event streams for anomalous rapid repetition. A **Suspicious Burst** occurs when the same \`${item.entity}_id\` triggers two consecutive events where:
1. Both events satisfy \`amount >= ${item.minAmount}\`.
2. The consecutive event occurs within **${item.maxSec} seconds** of the previous event.

### Metric Formulas & Rules
- Use \`LEAD()\` or \`LAG()\` over \`(PARTITION BY ${item.entity}_id ORDER BY event_time ASC)\`.
- Filter for consecutive pairs where the elapsed time difference is \`<= ${item.maxSec}\` seconds.
- **\`seconds_apart\`**: Calculated as \`EXTRACT(EPOCH FROM (next_time - event_time))::INT\`.
- Output columns: \`${item.entity}_id\`, \`t1_id\`, \`t2_id\`, \`t1_amount\`, \`t2_amount\`, \`seconds_apart\`.
- Sort by \`${item.entity}_id\` ASC, \`t1_id\` ASC.

### Input Schema
**events** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.entity}_id\` (INT)
- \`amount\` (NUMERIC)
- \`event_time\` (TIMESTAMP)`;

    const deltaSec = Math.max(1, Math.min(item.maxSec - 1, Math.floor(item.maxSec / 2)));
    const a1 = item.minAmount > 0 ? item.minAmount + 100 : 150;
    const a2 = item.minAmount > 0 ? item.minAmount + 250 : 200;
    const aLow = Math.max(0, item.minAmount - 50);

    const schemaSql = `
CREATE TABLE events (
  id INT PRIMARY KEY,
  ${item.entity}_id INT,
  amount NUMERIC,
  event_time TIMESTAMP
);

INSERT INTO events VALUES
(1, 1001, ${a1}.00, '2024-06-01 14:00:00'),
(2, 1001, ${a2}.00, '2024-06-01 14:00:00'::TIMESTAMP + INTERVAL '${deltaSec} seconds'),
(3, 1001, ${aLow}.00, '2024-06-01 14:05:00'),
(4, 1002, ${a1}.00, '2024-06-01 15:00:00'),
(5, 1002, ${a2}.00, '2024-06-01 15:10:00');
`;

    const starterSql = `-- ${item.company}: Detect consecutive events within ${item.maxSec} seconds
-- Output: ${item.entity}_id, t1_id, t2_id, t1_amount, t2_amount, seconds_apart
WITH ordered AS (
  -- Your code here
)
SELECT * FROM ordered;
`;

    const referenceSql = `WITH ordered AS (
  SELECT 
    ${item.entity}_id,
    id AS t1_id,
    amount AS t1_amount,
    event_time,
    LEAD(id) OVER (PARTITION BY ${item.entity}_id ORDER BY event_time) AS t2_id,
    LEAD(amount) OVER (PARTITION BY ${item.entity}_id ORDER BY event_time) AS t2_amount,
    LEAD(event_time) OVER (PARTITION BY ${item.entity}_id ORDER BY event_time) AS next_time
  FROM events
  WHERE amount >= ${item.minAmount}
)
SELECT 
  ${item.entity}_id,
  t1_id,
  t2_id,
  t1_amount,
  t2_amount,
  EXTRACT(EPOCH FROM (next_time - event_time))::INT AS seconds_apart
FROM ordered
WHERE t2_id IS NOT NULL 
  AND EXTRACT(EPOCH FROM (next_time - event_time)) <= ${item.maxSec}
ORDER BY ${item.entity}_id ASC, t1_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "JPMorgan", "Stripe"],
      topics: ["LEAD", "Window Functions", "EXTRACT(EPOCH)", "CTEs"],
      frequency: "High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.entity}_id`, "t1_id", "t2_id", "t1_amount", "t2_amount", "seconds_apart"],
      hints: [
        `Filter \`amount >= ${item.minAmount}\` in the initial CTE so you only evaluate qualified events.`,
        "Use `LEAD()` over `(PARTITION BY account ORDER BY event_time)` to inspect the next event timestamp and amount.",
        `Calculate the epoch delta using \`EXTRACT(EPOCH FROM (next_time - event_time)) <= ${item.maxSec}\`.`
      ],
      explanation: `### Windowing vs Self-Joins for Fraud
Using \`LEAD()\` scans the dataset linearly in $O(N \\log N)$ time, avoiding an $O(N^2)$ cross self-join that would freeze production databases on high-frequency transaction logs.`
    });
  });

  // -------------------------------------------------------------
  // THEME 3: 7-Day & 30-Day Rolling Window Averages (121-130)
  // -------------------------------------------------------------
  const theme3Rolling = [
    { company: "Netflix", entity: "account", col: "watch_minutes", days: 7, label: "Watch Time" },
    { company: "Spotify", entity: "track", col: "stream_count", days: 7, label: "Stream Count" },
    { company: "Robinhood", entity: "ticker", col: "trading_volume", days: 14, label: "Trading Volume" },
    { company: "Uber", entity: "driver", col: "net_earnings", days: 7, label: "Earnings" },
    { company: "DoorDash", entity: "fleet", col: "delivery_minutes", days: 7, label: "Delivery Duration" },
    { company: "Amazon", entity: "asin", col: "ordered_units", days: 30, label: "Sales Units" },
    { company: "Stripe", entity: "merchant", col: "chargeback_count", days: 7, label: "Disputes" },
    { company: "Twitter", entity: "handle", col: "retweet_count", days: 7, label: "Engagement" },
    { company: "YouTube", entity: "creator", col: "new_subscribers", days: 14, label: "Subscribers" },
    { company: "Airbnb", entity: "host", col: "inquiry_count", days: 30, label: "Inquiries" },
  ];

  theme3Rolling.forEach((item, idx) => {
    const qNum = 121 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const frameDays = item.days - 1;
    const title = `${item.company}: ${item.days}-Day Rolling Total ${item.label} per ${item.entity.charAt(0).toUpperCase() + item.entity.slice(1)}`;

    const description = `### Business Context
The ${item.company} Data Science team tracks moving trends across operational accounts. For each \`${item.entity}_id\`, calculate the **${item.days}-day rolling sum** of \`${item.col}\` (including the current day and the previous ${frameDays} days).

### Metric Formulas & Rules
- Pre-aggregate multiple daily records per ${item.entity} in a CTE so each date appears at most once per account.
- Use a window frame: \`ROWS BETWEEN ${frameDays} PRECEDING AND CURRENT ROW\`.
- Output columns: \`${item.entity}_id\`, \`event_date\`, \`daily_value\`, \`rolling_${item.days}d_value\`.
- Sort by \`${item.entity}_id\` ASC, \`event_date\` ASC.

### Input Schema
**daily_metrics** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.entity}_id\` (INT)
- \`event_date\` (DATE)
- \`${item.col}\` (INT)`;

    const schemaSql = `
CREATE TABLE daily_metrics (
  id INT PRIMARY KEY,
  ${item.entity}_id INT,
  event_date DATE,
  ${item.col} INT
);

INSERT INTO daily_metrics VALUES
(1, 10, '2024-04-01', 120),
(2, 10, '2024-04-02', 80),
(3, 10, '2024-04-03', 150),
(4, 10, '2024-04-04', 60),
(5, 10, '2024-04-05', 90),
(6, 10, '2024-04-06', 200),
(7, 10, '2024-04-07', 180),
(8, 10, '2024-04-08', 110),
(9, 20, '2024-04-01', 45),
(10, 20, '2024-04-02', 60);
`;

    const starterSql = `-- ${item.company}: Compute ${item.days}-day rolling sum of ${item.col}
-- Output: ${item.entity}_id, event_date, daily_value, rolling_${item.days}d_value
WITH daily_totals AS (
  -- Your code here
)
SELECT * FROM daily_totals;
`;

    const referenceSql = `WITH daily_totals AS (
  SELECT 
    ${item.entity}_id,
    event_date,
    SUM(${item.col}) AS daily_value
  FROM daily_metrics
  GROUP BY ${item.entity}_id, event_date
)
SELECT 
  ${item.entity}_id,
  event_date,
  daily_value,
  SUM(daily_value) OVER (
    PARTITION BY ${item.entity}_id 
    ORDER BY event_date 
    ROWS BETWEEN ${frameDays} PRECEDING AND CURRENT ROW
  ) AS rolling_${item.days}d_value
FROM daily_totals
ORDER BY ${item.entity}_id ASC, event_date ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Netflix", "YouTube"],
      topics: ["ROWS BETWEEN", "Window Functions", "Rolling Window", "CTEs"],
      frequency: "High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.entity}_id`, "event_date", "daily_value", `rolling_${item.days}d_value`],
      hints: [
        "First group by account and date in a CTE to combine any duplicate logs on the same date.",
        `Specify the window frame explicitly: \`ROWS BETWEEN ${frameDays} PRECEDING AND CURRENT ROW\`.`,
        "Sort by account ASC, event_date ASC."
      ],
      explanation: `### Window Frame Precision
The default SQL window frame is \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, which computes a cumulative lifetime sum. To limit aggregation to an $N$-day moving window, you must specify \`ROWS BETWEEN N-1 PRECEDING AND CURRENT ROW\`.`
    });
  });

  // -------------------------------------------------------------
  // THEME 4: Month-Over-Month (MoM) Growth Rates (131-140)
  // -------------------------------------------------------------
  const theme4MoM = [
    { company: "Airbnb", metric: "booking_revenue", label: "Booking Gross Revenue" },
    { company: "Stripe", metric: "processing_volume", label: "Payment Processing Volume" },
    { company: "Shopify", metric: "merchant_gmv", label: "Merchant GMV" },
    { company: "DoorDash", metric: "marketplace_sales", label: "Marketplace Sales" },
    { company: "Uber", metric: "trip_gross_bookings", label: "Rider Gross Bookings" },
    { company: "Netflix", metric: "streaming_hours", label: "Global Streaming Hours" },
    { company: "Spotify", metric: "ad_revenue", label: "Podcast Ad Revenue" },
    { company: "Snowflake", metric: "credit_usage", label: "Enterprise Credit Consumption" },
    { company: "Databricks", metric: "dbu_usage", label: "Compute Unit Usage" },
    { company: "AWS", metric: "s3_storage_tb", label: "S3 Storage TB Volume" },
  ];

  theme4MoM.forEach((item, idx) => {
    const qNum = 131 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Month-over-Month ${item.label} Growth Rate`;

    const description = `### Business Context
The ${item.company} Strategic Finance team needs to report Month-over-Month (MoM) growth rates for **${item.label}**. 

Calculate each month's total revenue, the previous month's revenue, and the **percentage growth rate**.

### Metric Formulas & Rules
- Extract the month using \`TO_CHAR(transaction_date, 'YYYY-MM')\` as \`report_month\`.
- Use \`LAG(monthly_revenue)\` to find \`prev_month_revenue\`.
- **\`mom_growth_pct\`**: Calculated as \`((monthly_revenue - prev_month_revenue) * 100.0) / NULLIF(prev_month_revenue, 0)\`, rounded to **2 decimal places**.
- If \`prev_month_revenue\` is \`NULL\` (the first recorded month), display \`NULL\`.
- Output columns: \`report_month\`, \`monthly_revenue\`, \`prev_month_revenue\`, \`mom_growth_pct\`.
- Sort by \`report_month\` ASC.

### Input Schema
**revenue_records** table:
- \`id\` (INT PRIMARY KEY)
- \`transaction_date\` (DATE)
- \`amount\` (NUMERIC)`;

    const schemaSql = `
CREATE TABLE revenue_records (
  id INT PRIMARY KEY,
  transaction_date DATE,
  amount NUMERIC
);

INSERT INTO revenue_records VALUES
(1, '2024-01-15', 50000.00),
(2, '2024-01-20', 30000.00), -- Jan Total: 80,000
(3, '2024-02-10', 92000.00), -- Feb Total: 92,000 -> Growth: +15.00%
(4, '2024-03-05', 115000.00),-- Mar Total: 115,000 -> Growth: +25.00%
(5, '2024-04-12', 103500.00);-- Apr Total: 103,500 -> Growth: -10.00%
`;

    const starterSql = `-- ${item.company}: Calculate Month-over-Month growth percentage
-- Output: report_month, monthly_revenue, prev_month_revenue, mom_growth_pct
WITH monthly AS (
  -- Your code here
)
SELECT * FROM monthly;
`;

    const referenceSql = `WITH monthly AS (
  SELECT 
    TO_CHAR(transaction_date, 'YYYY-MM') AS report_month,
    SUM(amount) AS monthly_revenue
  FROM revenue_records
  GROUP BY TO_CHAR(transaction_date, 'YYYY-MM')
),
lagged AS (
  SELECT 
    report_month,
    monthly_revenue,
    LAG(monthly_revenue) OVER (ORDER BY report_month) AS prev_month_revenue
  FROM monthly
)
SELECT 
  report_month,
  monthly_revenue,
  prev_month_revenue,
  ROUND(
    ((monthly_revenue - prev_month_revenue) * 100.0) / NULLIF(prev_month_revenue, 0),
    2
  ) AS mom_growth_pct
FROM lagged
ORDER BY report_month ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Airbnb", "Stripe"],
      topics: ["LAG", "TO_CHAR", "Growth %", "NULLIF", "CTEs"],
      frequency: "Very High",
      category: "Business Analytics",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["report_month", "monthly_revenue", "prev_month_revenue", "mom_growth_pct"],
      hints: [
        "In the first CTE, aggregate total revenue by `TO_CHAR(transaction_date, 'YYYY-MM')`.",
        "In the second CTE, use `LAG(monthly_revenue) OVER (ORDER BY report_month)`.",
        "Use `NULLIF(prev_month_revenue, 0)` in the denominator to avoid zero-division errors."
      ],
      explanation: `### Safe Percentage Growth in SQL
Always protect percentage changes with \`NULLIF(denominator, 0)\` to gracefully output \`NULL\` when the baseline period has zero activity.`
    });
  });

  // -------------------------------------------------------------
  // THEME 5: Preventing Join Fanouts with Pre-Aggregated CTEs (141-150)
  // -------------------------------------------------------------
  const theme5Fanout = [
    { company: "Amazon", parent: "customer", c1: "orders", c2: "reviews", m1: "total_order_spend", m2: "total_reviews" },
    { company: "Airbnb", parent: "host", c1: "bookings", c2: "reviews", m1: "total_booking_revenue", m2: "total_reviews" },
    { company: "DoorDash", parent: "restaurant", c1: "orders", c2: "ratings", m1: "total_food_sales", m2: "total_ratings" },
    { company: "Uber", parent: "driver", c1: "trips", c2: "tips", m1: "total_fare_revenue", m2: "total_tips" },
    { company: "Shopify", parent: "merchant", c1: "orders", c2: "tickets", m1: "total_merchant_sales", m2: "total_support_tickets" },
    { company: "GitHub", parent: "developer", c1: "pull_requests", c2: "issues", m1: "total_pr_merges", m2: "total_issue_comments" },
    { company: "Spotify", parent: "artist", c1: "streams", c2: "followers", m1: "total_stream_count", m2: "total_new_followers" },
    { company: "Stripe", parent: "business", c1: "charges", c2: "refunds", m1: "total_charge_volume", m2: "total_refund_volume" },
    { company: "Coursera", parent: "instructor", c1: "enrollments", c2: "reviews", m1: "total_student_enrollments", m2: "total_course_reviews" },
    { company: "Steam", parent: "publisher", c1: "game_sales", c2: "workshop_items", m1: "total_game_revenue", m2: "total_workshop_submissions" },
  ];

  theme5Fanout.forEach((item, idx) => {
    const qNum = 141 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Preventing Cartesian Join Fanout on ${item.parent.charAt(0).toUpperCase() + item.parent.slice(1)} Metrics`;

    const description = `### Business Context
The ${item.company} Analytics Engineering team discovered severe metric inflation caused by naive joins. An account can have both multiple \`${item.c1}\` and multiple \`${item.c2}\`. Joining both child tables directly produces an $M \\times N$ Cartesian multiplication trap!

Write a SQL query that pre-aggregates both child tables in separate Common Table Expressions (CTEs) before joining with the parent table.

### Metric Formulas & Rules
- Aggregate \`${item.c1}\` in a CTE: calculate \`${item.m1}\` as \`SUM(amount)\`.
- Aggregate \`${item.c2}\` in a second CTE: calculate \`${item.m2}\` as \`COUNT(*)\`.
- Join both CTEs onto the \`${item.parent}s\` table using \`LEFT JOIN\`.
- Use \`COALESCE(..., 0)\` if an account has zero entries in either table.
- Output columns: \`${item.parent}_id\`, \`${item.parent}_name\`, \`${item.m1}\`, \`${item.m2}\`.
- Sort by \`${item.parent}_id\` ASC.

### Input Schema
**${item.parent}s** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)

**${item.c1}** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.parent}_id\` (INT)
- \`amount\` (NUMERIC)

**${item.c2}** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.parent}_id\` (INT)`;

    const schemaSql = `
CREATE TABLE ${item.parent}s (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE ${item.c1} (
  id INT PRIMARY KEY,
  ${item.parent}_id INT,
  amount NUMERIC
);

CREATE TABLE ${item.c2} (
  id INT PRIMARY KEY,
  ${item.parent}_id INT
);

INSERT INTO ${item.parent}s VALUES
(1, 'Entity One'),
(2, 'Entity Two');

INSERT INTO ${item.c1} VALUES
(101, 1, 100.00),
(102, 1, 150.00), -- Total c1: 250.00
(103, 2, 80.00);

INSERT INTO ${item.c2} VALUES
(201, 1),
(202, 1),
(203, 1); -- Total c2: 3. A naive join yields 2 * 3 = 6 rows and duplicates c1 sums to 750!
`;

    const starterSql = `-- ${item.company}: Aggregate ${item.c1} and ${item.c2} separately before joining
-- Output: ${item.parent}_id, ${item.parent}_name, ${item.m1}, ${item.m2}
WITH agg1 AS (
  -- Your code here
),
agg2 AS (
  -- Your code here
)
SELECT * FROM ${item.parent}s;
`;

    const referenceSql = `WITH agg1 AS (
  SELECT 
    ${item.parent}_id,
    SUM(amount) AS ${item.m1}
  FROM ${item.c1}
  GROUP BY ${item.parent}_id
),
agg2 AS (
  SELECT 
    ${item.parent}_id,
    COUNT(*) AS ${item.m2}
  FROM ${item.c2}
  GROUP BY ${item.parent}_id
)
SELECT 
  p.id AS ${item.parent}_id,
  p.name AS ${item.parent}_name,
  COALESCE(a1.${item.m1}, 0) AS ${item.m1},
  COALESCE(a2.${item.m2}, 0) AS ${item.m2}
FROM ${item.parent}s p
LEFT JOIN agg1 a1 ON p.id = a1.${item.parent}_id
LEFT JOIN agg2 a2 ON p.id = a2.${item.parent}_id
ORDER BY ${item.parent}_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Amazon", "Snowflake"],
      topics: ["Join Fanout", "CTEs", "COALESCE", "LEFT JOIN"],
      frequency: "Very High",
      category: "Joins & Set Theory",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.parent}_id`, `${item.parent}_name`, item.m1, item.m2],
      hints: [
        `Pre-aggregate \`${item.c1}\` in a CTE grouped by \`${item.parent}_id\`.`,
        `Pre-aggregate \`${item.c2}\` in a second CTE grouped by \`${item.parent}_id\`.`,
        "Left join both aggregated CTEs back to the parent table with COALESCE."
      ],
      explanation: `### The #1 Source of Data Warehouse Corruptions
Joining two 1-to-many tables directly produces a Cartesian cross product that inflates numerical sums by the count of the other table. Pre-aggregating in CTEs before joining eliminates fanout completely.`
    });
  });

  // -------------------------------------------------------------
  // THEME 6: First-Touch & Last-Touch Marketing Attribution (151-160)
  // -------------------------------------------------------------
  const theme6Touch = [
    { company: "Google Ads", user: "visitor", touch: "campaign", mode: "First", ord: "ASC" },
    { company: "Meta Ads", user: "shopper", touch: "ad_creative", mode: "Last", ord: "DESC" },
    { company: "Uber", user: "driver_lead", touch: "referral_channel", mode: "First", ord: "ASC" },
    { company: "DoorDash", user: "diner", touch: "promo_code", mode: "First", ord: "ASC" },
    { company: "Amazon", user: "buyer", touch: "search_term", mode: "First", ord: "ASC" },
    { company: "Spotify", user: "listener", touch: "playlist", mode: "Last", ord: "DESC" },
    { company: "Netflix", user: "viewer", touch: "trailer", mode: "First", ord: "ASC" },
    { company: "Airbnb", user: "guest", touch: "listing_search", mode: "Last", ord: "DESC" },
    { company: "Shopify", user: "store_creator", touch: "marketing_source", mode: "First", ord: "ASC" },
    { company: "Duolingo", user: "learner", touch: "onboarding_lesson", mode: "First", ord: "ASC" },
  ];

  theme6Touch.forEach((item, idx) => {
    const qNum = 151 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: ${item.mode}-Touch ${item.touch.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())} Marketing Attribution`;

    const description = `### Business Context
The ${item.company} Marketing Attribution team needs to allocate conversion credit. Under the **${item.mode}-Touch Attribution Model**, full credit for a user conversion is assigned to the **very ${item.mode.toLowerCase()} touchpoint interaction** recorded before or during their journey.

### Metric Formulas & Rules
- Partition touchpoints by \`${item.user}_id\` and order by \`touch_time ${item.ord}\`.
- Use \`ROW_NUMBER()\` to assign rank \`1\` to the ${item.mode.toLowerCase()} interaction.
- Filter for \`rnk = 1\`.
- Output columns: \`${item.user}_id\`, \`${item.touch}\`, \`touch_time\`.
- Sort by \`${item.user}_id\` ASC.

### Input Schema
**touchpoints** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.user}_id\` (INT)
- \`${item.touch}\` (VARCHAR)
- \`touch_time\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE touchpoints (
  id INT PRIMARY KEY,
  ${item.user}_id INT,
  ${item.touch} VARCHAR(50),
  touch_time TIMESTAMP
);

INSERT INTO touchpoints VALUES
(1, 101, 'Organic Search', '2024-05-01 09:00:00'),
(2, 101, 'Email Campaign', '2024-05-03 14:30:00'),
(3, 101, 'Retargeting Ad', '2024-05-05 18:15:00'),
(4, 102, 'Paid Social', '2024-05-02 11:00:00'),
(5, 102, 'Direct Mail', '2024-05-04 16:00:00');
`;

    const starterSql = `-- ${item.company}: Identify ${item.mode.toLowerCase()} touchpoint using ROW_NUMBER()
-- Output: ${item.user}_id, ${item.touch}, touch_time
WITH ranked AS (
  -- Your code here
)
SELECT * FROM ranked;
`;

    const referenceSql = `WITH ranked AS (
  SELECT 
    ${item.user}_id,
    ${item.touch},
    touch_time,
    ROW_NUMBER() OVER (
      PARTITION BY ${item.user}_id 
      ORDER BY touch_time ${item.ord}
    ) AS rnk
  FROM touchpoints
)
SELECT 
  ${item.user}_id,
  ${item.touch},
  touch_time
FROM ranked
WHERE rnk = 1
ORDER BY ${item.user}_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Meta", "Google"],
      topics: ["ROW_NUMBER", "Window Functions", "Marketing Attribution", "CTEs"],
      frequency: "High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.user}_id`, item.touch, "touch_time"],
      hints: [
        `Use \`ROW_NUMBER() OVER (PARTITION BY ${item.user}_id ORDER BY touch_time ${item.ord})\`.`,
        "Filter for `rnk = 1` in the outer query.",
        `Sort by \`${item.user}_id\` ASC.`
      ],
      explanation: `### Attribution Modeling
First-touch and last-touch attribution models are classic product analytics interview questions. Using \`ROW_NUMBER()\` is deterministic and guarantees exactly one attributed record per user.`
    });
  });

  // -------------------------------------------------------------
  // THEME 7: Running Cumulative Balances & Threshold Milestones (161-170)
  // -------------------------------------------------------------
  const theme7Running = [
    { company: "JPMorgan", entity: "account", col: "change_amount", label: "Ledger Balance" },
    { company: "Coinbase", entity: "wallet", col: "crypto_delta", label: "Bitcoin Balance" },
    { company: "Delta Air Lines", entity: "flyer", col: "miles_earned", label: "Qualifying Miles" },
    { company: "Stripe", entity: "merchant", col: "net_transfer", label: "Available Payouts" },
    { company: "Uber", entity: "driver", col: "trip_fare", label: "Weekly Earnings" },
    { company: "DoorDash", entity: "customer", col: "spend_amount", label: "Rewards Points" },
    { company: "Robinhood", entity: "trader", col: "deposit_amount", label: "Cumulative Cash" },
    { company: "Amazon", entity: "warehouse", col: "pallet_diff", label: "Stored Pallets" },
    { company: "Tesla", entity: "factory", col: "vehicles_built", label: "Factory Output" },
    { company: "Kickstarter", entity: "creator", col: "pledge_amount", label: "Backer Funding" },
  ];

  theme7Running.forEach((item, idx) => {
    const qNum = 161 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Cumulative Running ${item.label} Balance Ledger`;

    const description = `### Business Context
The ${item.company} Financial Engineering team tracks running balances across account entries. For each \`${item.entity}_id\`, calculate the **cumulative running balance** ordered sequentially by \`entry_date\`.

### Metric Formulas & Rules
- Use \`SUM(delta_amount) OVER (PARTITION BY ${item.entity}_id ORDER BY entry_date ASC, id ASC)\`.
- **\`running_balance\`**: Cumulative sum of changes up to the current entry.
- Output columns: \`id\`, \`${item.entity}_id\`, \`entry_date\`, \`delta_amount\`, \`running_balance\`.
- Sort by \`${item.entity}_id\` ASC, \`entry_date\` ASC, \`id\` ASC.

### Input Schema
**ledger** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.entity}_id\` (INT)
- \`entry_date\` (DATE)
- \`delta_amount\` (NUMERIC)`;

    const schemaSql = `
CREATE TABLE ledger (
  id INT PRIMARY KEY,
  ${item.entity}_id INT,
  entry_date DATE,
  delta_amount NUMERIC
);

INSERT INTO ledger VALUES
(1, 101, '2024-03-01', 500.00),  -- Balance: 500
(2, 101, '2024-03-03', -150.00), -- Balance: 350
(3, 101, '2024-03-05', 200.00),  -- Balance: 550
(4, 102, '2024-03-02', 1000.00), -- Balance: 1000
(5, 102, '2024-03-04', -300.00); -- Balance: 700
`;

    const starterSql = `-- ${item.company}: Calculate cumulative running balance
-- Output: id, ${item.entity}_id, entry_date, delta_amount, running_balance
SELECT
  -- Your code here
FROM ledger;
`;

    const referenceSql = `SELECT 
  id,
  ${item.entity}_id,
  entry_date,
  delta_amount,
  SUM(delta_amount) OVER (
    PARTITION BY ${item.entity}_id 
    ORDER BY entry_date ASC, id ASC
  ) AS running_balance
FROM ledger
ORDER BY ${item.entity}_id ASC, entry_date ASC, id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Robinhood", "Coinbase"],
      topics: ["SUM OVER", "Running Total", "Cumulative Metrics", "Window Functions"],
      frequency: "High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["id", `${item.entity}_id`, "entry_date", "delta_amount", "running_balance"],
      hints: [
        "Include `id ASC` in the window `ORDER BY` to maintain a strict tie-breaker order.",
        "A running total does not require `GROUP BY`; it is computed per row using window aggregation."
      ],
      explanation: `### Financial Ledgers in SQL
Cumulative sums with window functions avoid exponential self-joins and correctly handle positive inflows and negative outflows in single-pass row ordering.`
    });
  });

  // -------------------------------------------------------------
  // THEME 8: Active User Ratios (DAU/MAU Stickiness) (171-180)
  // -------------------------------------------------------------
  const theme8Stick = [
    { company: "Meta", platform: "Facebook", dim: "country" },
    { company: "ByteDance", platform: "TikTok", dim: "region" },
    { company: "Snapchat", platform: "Snap App", dim: "operating_system" },
    { company: "Twitter", platform: "X", dim: "locale" },
    { company: "Slack", platform: "Slack Workspaces", dim: "industry" },
    { company: "Spotify", platform: "Music App", dim: "country" },
    { company: "Netflix", platform: "Streaming App", dim: "region" },
    { company: "Discord", platform: "Community Guilds", dim: "device" },
    { company: "Pinterest", platform: "Pin Boards", dim: "country" },
    { company: "Roblox", platform: "Game Worlds", dim: "platform" },
  ];

  theme8Stick.forEach((item, idx) => {
    const qNum = 171 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: DAU to MAU Product Stickiness Ratio by ${item.dim.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}`;

    const description = `### Business Context
The ${item.company} Product Analytics team evaluates user engagement retention using the **DAU / MAU Stickiness Ratio** (Daily Active Users divided by Monthly Active Users). 

For the target audit date of **'2024-05-31'**, compute:
- **\`dau\`**: Count of distinct users active on \`'2024-05-31'\`.
- **\`mau\`**: Count of distinct users active in the 30-day window between \`'2024-05-02'\` and \`'2024-05-31'\` inclusive.
- **\`stickiness_ratio\`**: \`(dau * 100.0) / NULLIF(mau, 0)\`, rounded to **2 decimal places**.

### Metric Formulas & Rules
- Filter the activity logs for the 30-day window.
- Output columns: \`${item.dim}\`, \`dau\`, \`mau\`, \`stickiness_ratio\`.
- Sort by \`stickiness_ratio\` DESC, then \`${item.dim}\` ASC.

### Input Schema
**user_activity** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`${item.dim}\` (VARCHAR)
- \`activity_date\` (DATE)`;

    const schemaSql = `
CREATE TABLE user_activity (
  id INT PRIMARY KEY,
  user_id INT,
  ${item.dim} VARCHAR(50),
  activity_date DATE
);

INSERT INTO user_activity VALUES
(1, 101, 'Region Alpha', '2024-05-31'), -- DAU
(2, 102, 'Region Alpha', '2024-05-31'), -- DAU
(3, 103, 'Region Alpha', '2024-05-15'), -- MAU only
(4, 104, 'Region Alpha', '2024-05-10'), -- MAU only
(5, 201, 'Region Beta', '2024-05-31'),  -- DAU
(6, 202, 'Region Beta', '2024-05-20');  -- MAU
`;

    const starterSql = `-- ${item.company}: Calculate DAU/MAU stickiness ratio on 2024-05-31
-- Output: ${item.dim}, dau, mau, stickiness_ratio
WITH dau_mau AS (
  -- Your code here
)
SELECT * FROM dau_mau;
`;

    const referenceSql = `WITH dau_mau AS (
  SELECT 
    ${item.dim},
    COUNT(DISTINCT CASE WHEN activity_date = '2024-05-31' THEN user_id END) AS dau,
    COUNT(DISTINCT user_id) AS mau
  FROM user_activity
  WHERE activity_date BETWEEN '2024-05-02' AND '2024-05-31'
  GROUP BY ${item.dim}
)
SELECT 
  ${item.dim},
  dau,
  mau,
  ROUND((dau * 100.0) / NULLIF(mau, 0), 2) AS stickiness_ratio
FROM dau_mau
ORDER BY stickiness_ratio DESC, ${item.dim} ASC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "ByteDance", "Meta"],
      topics: ["COUNT(DISTINCT)", "CASE WHEN", "DAU/MAU", "Product Analytics"],
      frequency: "High",
      category: "Aggregations",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [item.dim, "dau", "mau", "stickiness_ratio"],
      hints: [
        "Use `COUNT(DISTINCT CASE WHEN activity_date = '2024-05-31' THEN user_id END)` for DAU.",
        "Use `COUNT(DISTINCT user_id)` over the entire 30-day window for MAU.",
        "Safely divide DAU by MAU with NULLIF."
      ],
      explanation: `### The Golden Product Metric
DAU/MAU measures platform stickiness (the probability that a monthly user visits on any given day). Single-pass conditional distinct counts make this computation lightning fast.`
    });
  });

  // -------------------------------------------------------------
  // THEME 9: N-th Highest Value without LIMIT / OFFSET (181-190)
  // -------------------------------------------------------------
  const theme9Nth = [
    { company: "Google", entity: "office", item: "engineer", metric: "salary", rankN: 2, label: "Salary" },
    { company: "Amazon", entity: "category", item: "product", metric: "price", rankN: 2, label: "Price" },
    { company: "Meta", entity: "vertical", item: "keyword", metric: "bid_price", rankN: 3, label: "Bid Price" },
    { company: "Apple", entity: "territory", item: "app", metric: "downloads", rankN: 2, label: "Downloads" },
    { company: "Netflix", entity: "studio", item: "series", metric: "completion_hours", rankN: 2, label: "Viewing Hours" },
    { company: "Spotify", entity: "artist", item: "album_track", metric: "streams", rankN: 3, label: "Streams" },
    { company: "Uber", entity: "city", item: "driver", metric: "total_trips", rankN: 2, label: "Completed Trips" },
    { company: "Airbnb", entity: "host", item: "property", metric: "cleaning_fee", rankN: 2, label: "Cleaning Fee" },
    { company: "DoorDash", entity: "borough", item: "merchant", metric: "orders_fulfilled", rankN: 3, label: "Orders" },
    { company: "Stripe", entity: "retailer", item: "transaction", metric: "fee_collected", rankN: 2, label: "Fee" },
  ];

  theme9Nth.forEach((item, idx) => {
    const qNum = 181 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Exactly ${item.rankN}${item.rankN === 2 ? 'nd' : 'rd'} Highest ${item.label} per ${item.entity.charAt(0).toUpperCase() + item.entity.slice(1)} (Without LIMIT)`;

    const description = `### Business Context
The ${item.company} Compensation & Strategy team needs to find the **exactly ${item.rankN}${item.rankN === 2 ? 'nd' : 'rd'} highest ${item.label}** (\`${item.metric}\`) in each \`${item.entity}_name\`. 

### Metric Formulas & Rules
- Do NOT use \`LIMIT\` or \`OFFSET\` because each ${item.entity} must appear in the final report.
- Use \`DENSE_RANK()\` partitioned by \`${item.entity}_id\` and ordered by \`${item.metric}\` DESC.
- Filter strictly for rows where \`rnk = ${item.rankN}\`.
- Output columns: \`${item.entity}_name\`, \`${item.item}_name\`, \`${item.metric}\`.
- Sort by \`${item.entity}_name\` ASC, \`${item.metric}\` DESC.

### Input Schema
**${item.entity}s** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)

**${item.item}s** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.entity}_id\` (INT)
- \`name\` (VARCHAR)
- \`${item.metric}\` (INT)`;

    const schemaSql = `
CREATE TABLE ${item.entity}s (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE ${item.item}s (
  id INT PRIMARY KEY,
  ${item.entity}_id INT,
  name VARCHAR(50),
  ${item.metric} INT
);

INSERT INTO ${item.entity}s VALUES
(1, 'Group One'),
(2, 'Group Two');

INSERT INTO ${item.item}s VALUES
(1, 1, 'Alpha Item', 1000), -- Rank 1
(2, 1, 'Beta Item', 850),   -- Rank 2 (Qualifies if N=2)
(3, 1, 'Gamma Item', 850),  -- Rank 2 tie (Qualifies if N=2)
(4, 1, 'Delta Item', 700),  -- Rank 3 (Qualifies if N=3)
(5, 2, 'Echo Item', 1200),  -- Rank 1
(6, 2, 'Foxtrot Item', 950),-- Rank 2
(7, 2, 'Golf Item', 800);   -- Rank 3
`;

    const starterSql = `-- ${item.company}: Find exactly ${item.rankN}-highest ${item.metric} per ${item.entity}
-- Output: ${item.entity}_name, ${item.item}_name, ${item.metric}
WITH ranked AS (
  -- Your code here
)
SELECT * FROM ranked;
`;

    const referenceSql = `WITH ranked AS (
  SELECT 
    e.name AS ${item.entity}_name,
    i.name AS ${item.item}_name,
    i.${item.metric},
    DENSE_RANK() OVER (
      PARTITION BY i.${item.entity}_id 
      ORDER BY i.${item.metric} DESC
    ) AS rnk
  FROM ${item.item}s i
  JOIN ${item.entity}s e ON i.${item.entity}_id = e.id
)
SELECT 
  ${item.entity}_name,
  ${item.item}_name,
  ${item.metric}
FROM ranked
WHERE rnk = ${item.rankN}
ORDER BY ${item.entity}_name ASC, ${item.metric} DESC;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Google", "Apple"],
      topics: ["DENSE_RANK", "Subqueries", "CTEs", "Window Functions"],
      frequency: "Very High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [`${item.entity}_name`, `${item.item}_name`, item.metric],
      hints: [
        `Assign ranks using \`DENSE_RANK() OVER (PARTITION BY ... ORDER BY ${item.metric} DESC)\`.`,
        `Filter in the outer query for \`rnk = ${item.rankN}\`.`
      ],
      explanation: `### Why LIMIT / OFFSET Fails
\`LIMIT 1 OFFSET 1\` only works for a single global entity. When ranking within categories or groups, window ranking with \`DENSE_RANK()\` is mandatory.`
    });
  });

  // -------------------------------------------------------------
  // THEME 10: Multi-Stage Funnel Conversion Pipelines (191-200)
  // -------------------------------------------------------------
  const theme10Funnel = [
    { company: "Amazon", entity: "shopper", step1: "product_view", step2: "add_to_cart", step3: "checkout" },
    { company: "Airbnb", entity: "traveler", step1: "search_click", step2: "host_inquiry", step3: "reservation" },
    { company: "Uber", entity: "driver", step1: "app_install", step2: "bg_check_submit", step3: "first_trip" },
    { company: "DoorDash", entity: "diner", step1: "menu_browse", step2: "cart_add", step3: "order_paid" },
    { company: "Stripe", entity: "merchant", step1: "signup", step2: "kyc_verify", step3: "first_charge" },
    { company: "Netflix", entity: "viewer", step1: "landing_visit", step2: "plan_select", step3: "cc_authorized" },
    { company: "Robinhood", entity: "investor", step1: "account_create", step2: "bank_link", step3: "first_deposit" },
    { company: "Coinbase", entity: "crypto_user", step1: "wallet_open", step2: "identity_confirm", step3: "trade_exec" },
    { company: "Spotify", entity: "listener", step1: "free_listen", step2: "trial_start", step3: "paid_renew" },
    { company: "Duolingo", entity: "student", step1: "app_download", step2: "finish_lesson_1", step3: "reach_day_7" },
  ];

  theme10Funnel.forEach((item, idx) => {
    const qNum = 191 + idx;
    const id = `inter-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: 3-Stage User Conversion Funnel Drop-off Rate`;

    const description = `### Business Context
The ${item.company} Growth Product team wants to analyze conversion drop-off across the 3 key milestones of their onboarding funnel:
1. **Stage 1**: \`${item.step1}\`
2. **Stage 2**: \`${item.step2}\`
3. **Stage 3**: \`${item.step3}\`

Calculate the total distinct user volume at each stage and the **overall conversion rate from Stage 1 to Stage 3**.

### Metric Formulas & Rules
- **\`stage_1_users\`**: Count of distinct users with event \`'${item.step1}'\`.
- **\`stage_2_users\`**: Count of distinct users with event \`'${item.step2}'\`.
- **\`stage_3_users\`**: Count of distinct users with event \`'${item.step3}'\`.
- **\`overall_conversion_pct\`**: \`(stage_3_users * 100.0) / NULLIF(stage_1_users, 0)\`, rounded to **2 decimal places**.
- Output columns: \`stage_1_users\`, \`stage_2_users\`, \`stage_3_users\`, \`overall_conversion_pct\`.

### Input Schema
**funnel_events** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`event_name\` (VARCHAR: '${item.step1}', '${item.step2}', '${item.step3}')
- \`event_time\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE funnel_events (
  id INT PRIMARY KEY,
  user_id INT,
  event_name VARCHAR(50),
  event_time TIMESTAMP
);

INSERT INTO funnel_events VALUES
(1, 101, '${item.step1}', '2024-05-01 10:00:00'),
(2, 101, '${item.step2}', '2024-05-01 10:05:00'),
(3, 101, '${item.step3}', '2024-05-01 10:15:00'),
(4, 102, '${item.step1}', '2024-05-01 11:00:00'),
(5, 102, '${item.step2}', '2024-05-01 11:30:00'),
(6, 103, '${item.step1}', '2024-05-01 12:00:00'),
(7, 104, '${item.step1}', '2024-05-01 13:00:00');
-- S1: 4 users (101, 102, 103, 104)
-- S2: 2 users (101, 102)
-- S3: 1 user (101) -> Conversion: 1 / 4 * 100 = 25.00%
`;

    const starterSql = `-- ${item.company}: Aggregate users at stage 1, 2, 3 and overall conversion
-- Output: stage_1_users, stage_2_users, stage_3_users, overall_conversion_pct
WITH funnel AS (
  -- Your code here
)
SELECT * FROM funnel;
`;

    const referenceSql = `WITH funnel AS (
  SELECT 
    COUNT(DISTINCT CASE WHEN event_name = '${item.step1}' THEN user_id END) AS stage_1_users,
    COUNT(DISTINCT CASE WHEN event_name = '${item.step2}' THEN user_id END) AS stage_2_users,
    COUNT(DISTINCT CASE WHEN event_name = '${item.step3}' THEN user_id END) AS stage_3_users
  FROM funnel_events
)
SELECT 
  stage_1_users,
  stage_2_users,
  stage_3_users,
  ROUND((stage_3_users * 100.0) / NULLIF(stage_1_users, 0), 2) AS overall_conversion_pct
FROM funnel;`;

    list.push({
      id,
      title,
      difficulty: "Medium",
      companies: [item.company, "Amazon", "Stripe"],
      topics: ["Funnel Analysis", "COUNT(DISTINCT)", "CASE WHEN", "Product Analytics"],
      frequency: "Very High",
      category: "Business Analytics",
      orderSensitive: false,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["stage_1_users", "stage_2_users", "stage_3_users", "overall_conversion_pct"],
      hints: [
        "Use conditional distinct aggregation: `COUNT(DISTINCT CASE WHEN event_name = '...' THEN user_id END)`.",
        "Calculate `overall_conversion_pct` as Stage 3 / Stage 1 * 100."
      ],
      explanation: `### Funnel Analysis Architecture
Funnel analysis measures retention and drop-off velocity. Conditional distinct counts ensure that users who triggered an event multiple times are counted once per step.`
    });
  });

  return list;
}
