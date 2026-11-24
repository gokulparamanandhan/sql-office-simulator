import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S10 = "Stage 10: Window Frame Clauses & Capstones";

export function getBasicStage10Frames(): InterviewQuestion[] {
  return [
    makeBasicQ({
      number: 93,
      titleBody: "LinkedIn: Cumulative Running Total with Explicit ROWS Frame",
      companies: ["LinkedIn", "Stripe"],
      topics: ["Window Frames", "ROWS BETWEEN", "SUM OVER"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Warm-up",
      patternTag: "Running Total (ROWS BETWEEN)",
      conceptPrimer: {
        title: "Window Frame Clauses: ROWS BETWEEN ... AND ...",
        mentalModel:
          "When you add ORDER BY inside SUM(...) OVER (ORDER BY ...), PostgreSQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW—meaning tied dates get summed together! Writing ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW counts physical rows one-by-one.",
        syntaxTemplate: `SUM(amount) OVER (
  ORDER BY event_date ASC, id ASC
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
) AS running_total`,
        exampleWalkthrough:
          "Notice two orders on '2025-01-02' (ids 2 and 3): with ROWS BETWEEN, row 2 updates first and row 3 updates second instead of jumping both rows at once!",
        visualType: "window-frame",
      },
      blueprintSql: `SELECT
  id,
  event_date,
  applications,
  SUM(applications) OVER (
    ORDER BY event_date ASC, id ASC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM job_apps
ORDER BY event_date ASC, id ASC;`,
      description: `### Problem Statement
Compute a strict row-by-row cumulative running total of job applications using an explicit \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` frame clause (notice there are two entries on \`'2025-01-02'\`!).

### Requirements
- Use \`SUM(applications) OVER (ORDER BY event_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\` as \`running_total\`.
- Output columns: \`id\`, \`event_date\`, \`applications\`, \`running_total\`.
- Sort by \`event_date\` ascending, \`id\` ascending.

### Input Schema
**job_apps** (id INT, event_date DATE, applications INT)`,
      schemaSql: `CREATE TABLE job_apps (id INT PRIMARY KEY, event_date DATE, applications INT);
INSERT INTO job_apps VALUES (1, '2025-01-01', 120), (2, '2025-01-02', 80), (3, '2025-01-02', 50), (4, '2025-01-03', 200);`,
      referenceSql: `SELECT id, event_date, applications, SUM(applications) OVER (ORDER BY event_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM job_apps ORDER BY event_date ASC, id ASC;`,
      expectedColumns: ["id", "event_date", "applications", "running_total"],
      hints: ["Add ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW right after ORDER BY inside OVER (...)."],
      explanation: "ROWS BETWEEN advances strictly 1 physical row at a time, avoiding tie-merging surprises from default RANGE frames.",
    }),
    makeBasicQ({
      number: 94,
      titleBody: "Robinhood: Partitioned Running Cash Balance per Account",
      companies: ["Robinhood", "PayPal"],
      topics: ["Window Frames", "ROWS BETWEEN", "SUM OVER", "CASE WHEN"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Warm-up",
      patternTag: "Partitioned Running Ledger",
      description: `### Problem Statement
Calculate each account's running cash balance chronologically, adding \`'DEPOSIT'\` amounts and subtracting \`'WITHDRAWAL'\` amounts inside each account's partition.

### Requirements
- Partition by \`account_id\`, order by \`txn_date ASC, id ASC\`, using \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`.
- Use \`CASE WHEN txn_type = 'DEPOSIT' THEN amount ELSE -amount END\` inside \`SUM(...)\`.
- Output columns: \`account_id\`, \`txn_date\`, \`txn_type\`, \`amount\`, \`running_balance\`.
- Sort by \`account_id\` ascending, \`txn_date\` ascending, \`id\` ascending.

### Input Schema
**ledger** (id INT, account_id INT, txn_date DATE, txn_type VARCHAR, amount NUMERIC)`,
      schemaSql: `CREATE TABLE ledger (id INT PRIMARY KEY, account_id INT, txn_date DATE, txn_type VARCHAR(20), amount NUMERIC);
INSERT INTO ledger VALUES (1, 10, '2025-01-01', 'DEPOSIT', 1000.00), (2, 10, '2025-01-02', 'WITHDRAWAL', 250.00), (3, 10, '2025-01-03', 'DEPOSIT', 400.00), (4, 20, '2025-01-01', 'DEPOSIT', 500.00), (5, 20, '2025-01-04', 'WITHDRAWAL', 100.00);`,
      referenceSql: `SELECT account_id, txn_date, txn_type, amount, SUM(CASE WHEN txn_type = 'DEPOSIT' THEN amount ELSE -amount END) OVER (PARTITION BY account_id ORDER BY txn_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_balance FROM ledger ORDER BY account_id ASC, txn_date ASC, id ASC;`,
      expectedColumns: ["account_id", "txn_date", "txn_type", "amount", "running_balance"],
      hints: ["Combine CASE WHEN inside SUM(...) with PARTITION BY account_id and ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."],
      explanation: "Signed-flow running sums are the core pattern for financial account balance reconstruction.",
    }),
    makeBasicQ({
      number: 95,
      titleBody: "YouTube: 3-Day Rolling Average Views (ROWS BETWEEN 2 PRECEDING)",
      companies: ["YouTube", "Netflix"],
      topics: ["Window Frames", "ROWS BETWEEN", "AVG OVER", "ROUND"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Core",
      patternTag: "3-Row Moving Average",
      description: `### Problem Statement
Smooth daily view spikes by computing a **3-row rolling average** (current day + up to 2 preceding days).

### Requirements
- Compute \`rolling_3day_avg\` = \`ROUND(AVG(views) OVER (ORDER BY view_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)\`.
- Output columns: \`view_date\`, \`views\`, \`rolling_3day_avg\`.
- Sort by \`view_date\` ascending.

### Input Schema
**channel_views** (view_date DATE, views INT)`,
      schemaSql: `CREATE TABLE channel_views (view_date DATE PRIMARY KEY, views INT);
INSERT INTO channel_views VALUES ('2025-01-01', 100), ('2025-01-02', 200), ('2025-01-03', 300), ('2025-01-04', 400), ('2025-01-05', 200);`,
      referenceSql: `SELECT view_date, views, ROUND(AVG(views) OVER (ORDER BY view_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_avg FROM channel_views ORDER BY view_date ASC;`,
      expectedColumns: ["view_date", "views", "rolling_3day_avg"],
      hints: ["Remember: 'current row + 2 previous rows' = 3 rows total, so write ROWS BETWEEN 2 PRECEDING AND CURRENT ROW."],
      explanation: "N-row moving averages use (N - 1) PRECEDING AND CURRENT ROW—never N PRECEDING!",
    }),
    makeBasicQ({
      number: 96,
      titleBody: "Netflix: Partitioned 7-Day Rolling Average Watch Hours per User",
      companies: ["Netflix", "Spotify"],
      topics: ["Window Frames", "ROWS BETWEEN", "PARTITION BY", "AVG OVER"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Core",
      patternTag: "Partitioned Rolling Average",
      description: `### Problem Statement
Compute a 7-day rolling average (current day + up to 6 preceding days) independently for each subscriber.

### Requirements
- Partition by \`user_id\`, order by \`watch_date ASC\`, and apply \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\`.
- Round \`rolling_avg_hours\` to 2 decimal places.
- Output columns: \`user_id\`, \`watch_date\`, \`hours_watched\`, \`rolling_avg_hours\`.
- Sort by \`user_id\` ascending, \`watch_date\` ascending.

### Input Schema
**subscriber_viewing** (id INT, user_id INT, watch_date DATE, hours_watched NUMERIC)`,
      schemaSql: `CREATE TABLE subscriber_viewing (id INT PRIMARY KEY, user_id INT, watch_date DATE, hours_watched NUMERIC);
INSERT INTO subscriber_viewing VALUES (1, 101, '2025-01-01', 3.5), (2, 101, '2025-01-02', 2.0), (3, 101, '2025-01-03', 4.0), (4, 101, '2025-01-04', 1.5), (5, 101, '2025-01-05', 5.0), (6, 101, '2025-01-06', 3.0), (7, 101, '2025-01-07', 4.5), (8, 101, '2025-01-08', 6.0), (9, 102, '2025-01-01', 1.0), (10, 102, '2025-01-02', 2.5);`,
      referenceSql: `SELECT user_id, watch_date, hours_watched, ROUND(AVG(hours_watched) OVER (PARTITION BY user_id ORDER BY watch_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_hours FROM subscriber_viewing ORDER BY user_id ASC, watch_date ASC;`,
      expectedColumns: ["user_id", "watch_date", "hours_watched", "rolling_avg_hours"],
      hints: ["Include PARTITION BY user_id so user 101's hours never leak into user 102's rolling average."],
      explanation: "Combining PARTITION BY with ROWS BETWEEN keeps rolling metrics strictly isolated per entity.",
    }),
    makeBasicQ({
      number: 97,
      titleBody: "Datadog: Centered 3-Point Latency Smoothing (1 PRECEDING AND 1 FOLLOWING)",
      companies: ["Datadog", "Cloudflare"],
      topics: ["Window Frames", "ROWS BETWEEN", "AVG OVER", "ROUND"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Core",
      patternTag: "Centered Window Frame",
      description: `### Problem Statement
Frames can look both backwards AND forwards! Smooth telemetry latency using a centered 3-point window (\`1 PRECEDING AND 1 FOLLOWING\`) for each server.

### Requirements
- Partition by \`server_id\`, order by \`check_minute ASC\`, and compute \`smoothed_ms\` = \`ROUND(AVG(latency_ms) OVER (PARTITION BY server_id ORDER BY check_minute ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2)\`.
- Output columns: \`server_id\`, \`check_minute\`, \`latency_ms\`, \`smoothed_ms\`.
- Sort by \`server_id\` ascending, \`check_minute\` ascending.

### Input Schema
**telemetry** (id INT, server_id VARCHAR, check_minute INT, latency_ms NUMERIC)`,
      schemaSql: `CREATE TABLE telemetry (id INT PRIMARY KEY, server_id VARCHAR(20), check_minute INT, latency_ms NUMERIC);
INSERT INTO telemetry VALUES (1, 'web-1', 1, 20.0), (2, 'web-1', 2, 80.0), (3, 'web-1', 3, 25.0), (4, 'web-1', 4, 30.0), (5, 'web-2', 1, 15.0), (6, 'web-2', 2, 45.0);`,
      referenceSql: `SELECT server_id, check_minute, latency_ms, ROUND(AVG(latency_ms) OVER (PARTITION BY server_id ORDER BY check_minute ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS smoothed_ms FROM telemetry ORDER BY server_id ASC, check_minute ASC;`,
      expectedColumns: ["server_id", "check_minute", "latency_ms", "smoothed_ms"],
      hints: ["Write ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING."],
      explanation: "Centered frames smooth out momentary spikes using neighboring observations before and after each point.",
    }),
    makeBasicQ({
      number: 98,
      titleBody: "Twitter: Fixing the LAST_VALUE() Default Frame Trap",
      companies: ["Twitter", "Meta"],
      topics: ["LAST_VALUE", "FIRST_VALUE", "Window Frames", "ROWS BETWEEN"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Applied",
      patternTag: "LAST_VALUE Frame Trap",
      conceptPrimer: {
        title: "The #1 SQL Trap: Why LAST_VALUE() Needs UNBOUNDED FOLLOWING",
        mentalModel:
          "With ORDER BY inside OVER(...), the default frame ends at CURRENT ROW—so LAST_VALUE(col) naively returns the current row itself! Adding ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING extends the frame to the very end of the partition.",
        syntaxTemplate: `SELECT
  user_id,
  channel,
  FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time) AS first_touch,
  LAST_VALUE(channel) OVER (
    PARTITION BY user_id
    ORDER BY touch_time
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS last_touch
FROM touchpoints;`,
        visualType: "window-frame",
      },
      description: `### Problem Statement
Twitter Marketing wants each user's **first-touch** AND **last-touch** attribution channel on every touchpoint row. If you forget the explicit frame on \`LAST_VALUE()\`, SQL only looks up to \`CURRENT ROW\`!

### Requirements
- Compute \`first_touch\` using \`FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC)\`.
- Compute \`last_touch\` using \`LAST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)\`.
- Output columns: \`user_id\`, \`touch_time\`, \`channel\`, \`first_touch\`, \`last_touch\`.
- Sort by \`user_id\` ascending, \`touch_time\` ascending.

### Input Schema
**touchpoints** (id INT, user_id INT, touch_time TIMESTAMP, channel VARCHAR)`,
      schemaSql: `CREATE TABLE touchpoints (id INT PRIMARY KEY, user_id INT, touch_time TIMESTAMP, channel VARCHAR(30));
INSERT INTO touchpoints VALUES (1, 101, '2025-01-01 09:00:00', 'TikTok'), (2, 101, '2025-01-03 14:00:00', 'Google'), (3, 101, '2025-01-05 10:00:00', 'Direct'), (4, 102, '2025-01-02 11:00:00', 'Email'), (5, 102, '2025-01-04 16:00:00', 'Referral');`,
      referenceSql: `SELECT user_id, touch_time, channel, FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC) AS first_touch, LAST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_touch FROM touchpoints ORDER BY user_id ASC, touch_time ASC;`,
      expectedColumns: ["user_id", "touch_time", "channel", "first_touch", "last_touch"],
      hints: ["Add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING inside LAST_VALUE(...) OVER (...)."],
      explanation: "Without UNBOUNDED FOLLOWING, LAST_VALUE() stops at CURRENT ROW and gives wrong intermediate values.",
    }),
    makeBasicQ({
      number: 99,
      titleBody: "Amazon: Basic Capstone 1 — Top 2 Products per Category with Share of Category",
      companies: ["Amazon", "Shopify"],
      topics: ["CTEs", "DENSE_RANK", "SUM OVER", "ROUND"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Applied",
      patternTag: "CTE + Ranking + Partition Share",
      blueprintSql: `WITH product_sales AS (
  -- Step 1: Sum completed revenue per (category, product_name)
  SELECT ...
),
ranked AS (
  -- Step 2: Compute category_share_pct via SUM() OVER and DENSE_RANK()
  SELECT ...
)
SELECT category, product_name, total_revenue, category_share_pct, revenue_rank
FROM ranked
WHERE revenue_rank <= 2
ORDER BY category ASC, revenue_rank ASC, product_name ASC;`,
      description: `### Problem Statement
Combine **Hygiene + GROUP BY + CTEs + \`SUM() OVER\` + \`DENSE_RANK()\`**! Find the top 2 revenue-generating products per category (completed orders only) along with each product's % share of its category revenue.

### Requirements
- Filter \`status = 'completed'\`.
- CTE 1: aggregate \`total_revenue = ROUND(SUM(amount), 2)\` per \`(category, product_name)\`.
- CTE 2: compute \`category_share_pct = ROUND(total_revenue * 100.0 / SUM(total_revenue) OVER (PARTITION BY category), 2)\` and \`revenue_rank = DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC)\`.
- Outer SELECT: keep \`revenue_rank <= 2\`.
- Output columns: \`category\`, \`product_name\`, \`total_revenue\`, \`category_share_pct\`, \`revenue_rank\`.
- Sort by \`category\` ascending, \`revenue_rank\` ascending, \`product_name\` ascending.

### Input Schema
**sales** (id INT, category VARCHAR, product_name VARCHAR, amount NUMERIC, status VARCHAR)`,
      schemaSql: `CREATE TABLE sales (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), amount NUMERIC, status VARCHAR(20));
INSERT INTO sales VALUES (1, 'Audio', 'Headphones', 300.00, 'completed'), (2, 'Audio', 'Headphones', 200.00, 'completed'), (3, 'Audio', 'Speaker', 400.00, 'completed'), (4, 'Audio', 'Earbuds', 100.00, 'completed'), (5, 'Audio', 'Broken Mic', 900.00, 'refunded'), (6, 'Tech', 'Monitor', 600.00, 'completed'), (7, 'Tech', 'Keyboard', 200.00, 'completed'), (8, 'Tech', 'Mouse', 200.00, 'completed');`,
      referenceSql: `WITH product_sales AS (SELECT category, product_name, ROUND(SUM(amount), 2) AS total_revenue FROM sales WHERE status = 'completed' GROUP BY category, product_name), ranked AS (SELECT category, product_name, total_revenue, ROUND(total_revenue * 100.0 / SUM(total_revenue) OVER (PARTITION BY category), 2) AS category_share_pct, DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC) AS revenue_rank FROM product_sales) SELECT category, product_name, total_revenue, category_share_pct, revenue_rank FROM ranked WHERE revenue_rank <= 2 ORDER BY category ASC, revenue_rank ASC, product_name ASC;`,
      expectedColumns: ["category", "product_name", "total_revenue", "category_share_pct", "revenue_rank"],
      hints: ["Aggregate first in CTE 1, then run both SUM() OVER and DENSE_RANK() OVER in CTE 2, then filter revenue_rank <= 2."],
      explanation: "Separating aggregation from window calculations in chained CTEs handles real-world analytics cleanly.",
    }),
    makeBasicQ({
      number: 100,
      titleBody: "Stripe: Basic Capstone 2 — Daily Net Revenue, MoM/DoD Growth & 3-Day Rolling Avg",
      companies: ["Stripe", "Netflix", "Google"],
      topics: ["CTEs", "LAG", "ROWS BETWEEN", "COALESCE", "NULLIF"],
      category: "Window Functions",
      stage: S10,
      stageOrder: 10,
      rampStep: "Applied",
      patternTag: "Full Analytical Pipeline",
      blueprintSql: `WITH daily_net AS (
  -- Step 1: Aggregate net revenue = amount - COALESCE(refund, 0) per sale_date
  SELECT ...
),
analytics AS (
  -- Step 2: Add LAG(net_rev) and AVG(net_rev) OVER (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
  SELECT ...
)
SELECT
  sale_date,
  net_revenue,
  rolling_3d_avg,
  ROUND((net_revenue - prev_rev) * 100.0 / NULLIF(prev_rev, 0), 2) AS dod_growth_pct
FROM analytics
ORDER BY sale_date ASC;`,
      description: `### Problem Statement
Graduate from Level 1: Basic! Combine **Hygiene (\`COALESCE\`, \`NULLIF\`) + \`GROUP BY\` + Chained CTEs + \`LAG()\` + \`ROWS BETWEEN\` Rolling Average** in one production-grade pipeline.

### Requirements
- CTE 1 (\`daily_net\`): group \`orders\` by \`sale_date\` and compute \`net_revenue = ROUND(SUM(amount - COALESCE(refund, 0)), 2)\`.
- CTE 2 (\`analytics\`): compute \`prev_rev = LAG(net_revenue) OVER (ORDER BY sale_date ASC)\` and \`rolling_3d_avg = ROUND(AVG(net_revenue) OVER (ORDER BY sale_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)\`.
- Outer SELECT: compute \`dod_growth_pct = ROUND((net_revenue - prev_rev) * 100.0 / NULLIF(prev_rev, 0), 2)\`.
- Output columns: \`sale_date\`, \`net_revenue\`, \`rolling_3d_avg\`, \`dod_growth_pct\`.
- Sort by \`sale_date\` ascending.

### Input Schema
**orders** (id INT, sale_date DATE, amount NUMERIC, refund NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, sale_date DATE, amount NUMERIC, refund NUMERIC);
INSERT INTO orders VALUES (1, '2025-01-01', 120.00, 20.00), (2, '2025-01-01', 100.00, NULL), (3, '2025-01-02', 300.00, NULL), (4, '2025-01-03', 150.00, 0.00), (5, '2025-01-04', 450.00, 50.00);`,
      referenceSql: `WITH daily_net AS (SELECT sale_date, ROUND(SUM(amount - COALESCE(refund, 0)), 2) AS net_revenue FROM orders GROUP BY sale_date), analytics AS (SELECT sale_date, net_revenue, LAG(net_revenue) OVER (ORDER BY sale_date ASC) AS prev_rev, ROUND(AVG(net_revenue) OVER (ORDER BY sale_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3d_avg FROM daily_net) SELECT sale_date, net_revenue, rolling_3d_avg, ROUND((net_revenue - prev_rev) * 100.0 / NULLIF(prev_rev, 0), 2) AS dod_growth_pct FROM analytics ORDER BY sale_date ASC;`,
      expectedColumns: ["sale_date", "net_revenue", "rolling_3d_avg", "dod_growth_pct"],
      hints: ["Compute net_revenue per day in CTE 1, then run LAG() and ROWS BETWEEN 2 PRECEDING AND CURRENT ROW in CTE 2."],
      explanation: "You just built a complete analytical pipeline—ready for Level 2: Intermediate and Level 3: Advanced!",
    }),
  ];
}
