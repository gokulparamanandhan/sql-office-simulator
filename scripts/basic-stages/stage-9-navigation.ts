import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S9 = "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)";

export function getBasicStage9Navigation(): InterviewQuestion[] {
  return [
    makeBasicQ({
      number: 85,
      titleBody: "Stripe: Viewing Yesterday's Revenue Side-by-Side with LAG()",
      companies: ["Stripe", "Shopify"],
      topics: ["LAG", "Window Functions"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Warm-up",
      patternTag: "LAG() Side-by-Side Intro",
      conceptPrimer: {
        title: "Looking Backwards & Forwards with LAG() / LEAD()",
        mentalModel:
          "LAG(col, 1) grabs the value from 1 row earlier in your sorted window; LEAD(col, 1) grabs 1 row ahead. When there is no previous row (the very first row), LAG() returns NULL unless you pass a 3rd default argument like LAG(col, 1, 0).",
        syntaxTemplate: `SELECT
  day_date,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY day_date ASC) AS prev_day_revenue
FROM daily_sales;`,
        visualType: "lag-lead",
      },
      blueprintSql: `SELECT
  sale_date,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY sale_date ASC) AS prev_revenue
FROM daily_sales
ORDER BY sale_date ASC;`,
      description: `### Problem Statement
Write your first \`LAG()\` query! For each calendar day, display that day's revenue alongside the previous recorded day's revenue (\`NULL\` on the very first day).

### Requirements
- Use \`LAG(revenue, 1) OVER (ORDER BY sale_date ASC)\` as \`prev_revenue\`.
- Output columns: \`sale_date\`, \`revenue\`, \`prev_revenue\`.
- Sort by \`sale_date\` ascending.

### Input Schema
**daily_sales** (sale_date DATE, revenue NUMERIC)`,
      schemaSql: `CREATE TABLE daily_sales (sale_date DATE PRIMARY KEY, revenue NUMERIC);
INSERT INTO daily_sales VALUES ('2025-01-01', 1200.00), ('2025-01-02', 1500.00), ('2025-01-03', 1350.00), ('2025-01-04', 1900.00);`,
      referenceSql: `SELECT sale_date, revenue, LAG(revenue, 1) OVER (ORDER BY sale_date ASC) AS prev_revenue FROM daily_sales ORDER BY sale_date ASC;`,
      expectedColumns: ["sale_date", "revenue", "prev_revenue"],
      hints: ["LAG requires an ORDER BY inside OVER (...) so SQL knows which row comes before which."],
      explanation: "LAG(col, 1) fetches the prior row's value cleanly in one pass without any self-join.",
    }),
    makeBasicQ({
      number: 86,
      titleBody: "Spotify: Day-Over-Day Stream Delta with Default Fallback",
      companies: ["Spotify", "Apple"],
      topics: ["LAG", "COALESCE", "Window Functions"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Warm-up",
      patternTag: "LAG() Delta Calculation",
      description: `### Problem Statement
Compute the day-over-day stream change (\`current - previous\`) per artist. On an artist's first recorded day (no previous day), output \`0\` as \`stream_delta\`.

### Requirements
- Partition by \`artist_name\` and order by \`stream_date ASC\`.
- Compute \`stream_delta\` = \`stream_count - COALESCE(LAG(stream_count) OVER (PARTITION BY artist_name ORDER BY stream_date ASC), stream_count)\` (or \`LAG(stream_count, 1, stream_count)\`).
- Output columns: \`artist_name\`, \`stream_date\`, \`stream_count\`, \`stream_delta\`.
- Sort by \`artist_name\` ascending, \`stream_date\` ascending.

### Input Schema
**daily_streams** (id INT, artist_name VARCHAR, stream_date DATE, stream_count INT)`,
      schemaSql: `CREATE TABLE daily_streams (id INT PRIMARY KEY, artist_name VARCHAR(50), stream_date DATE, stream_count INT);
INSERT INTO daily_streams VALUES (1, 'Taylor Swift', '2025-01-01', 4500000), (2, 'Taylor Swift', '2025-01-02', 4850000), (3, 'Taylor Swift', '2025-01-03', 5200000), (4, 'Drake', '2025-01-01', 3800000), (5, 'Drake', '2025-01-02', 3600000), (6, 'Drake', '2025-01-03', 4100000);`,
      referenceSql: `SELECT artist_name, stream_date, stream_count, (stream_count - LAG(stream_count, 1, stream_count) OVER (PARTITION BY artist_name ORDER BY stream_date ASC)) AS stream_delta FROM daily_streams ORDER BY artist_name ASC, stream_date ASC;`,
      expectedColumns: ["artist_name", "stream_date", "stream_count", "stream_delta"],
      hints: ["Passing stream_count as the 3rd argument to LAG(stream_count, 1, stream_count) makes current - prior = 0 on day 1!"],
      explanation: "The optional 3rd parameter in LAG(col, offset, default) sets a fallback when no prior row exists in the partition.",
    }),
    makeBasicQ({
      number: 87,
      titleBody: "Robinhood: Stock Closing Price Jump Over Previous Trading Day",
      companies: ["Robinhood", "Bloomberg"],
      topics: ["LAG", "PARTITION BY", "CTEs"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Core",
      patternTag: "Partitioned LAG Filter",
      description: `### Problem Statement
Find all trading days where a stock's closing price jumped by strictly more than $10 compared to that same ticker's prior trading day.

### Requirements
- CTE: compute \`prev_close = LAG(close_price) OVER (PARTITION BY ticker ORDER BY trade_date ASC)\`.
- Outer SELECT: filter \`prev_close IS NOT NULL AND (close_price - prev_close) > 10\`.
- Output columns: \`ticker\`, \`trade_date\`, \`prev_close\`, \`close_price\`, \`price_jump\`.
- Sort by \`ticker\` ascending, \`trade_date\` ascending.

### Input Schema
**stock_prices** (id INT, ticker VARCHAR, trade_date DATE, close_price NUMERIC)`,
      schemaSql: `CREATE TABLE stock_prices (id INT PRIMARY KEY, ticker VARCHAR(10), trade_date DATE, close_price NUMERIC);
INSERT INTO stock_prices VALUES (1, 'AAPL', '2025-01-02', 185.00), (2, 'AAPL', '2025-01-03', 198.00), (3, 'AAPL', '2025-01-06', 202.00), (4, 'NVDA', '2025-01-02', 130.00), (5, 'NVDA', '2025-01-03', 128.00), (6, 'NVDA', '2025-01-06', 145.00);`,
      referenceSql: `WITH with_prev AS (SELECT ticker, trade_date, close_price, LAG(close_price) OVER (PARTITION BY ticker ORDER BY trade_date ASC) AS prev_close FROM stock_prices) SELECT ticker, trade_date, prev_close, close_price, (close_price - prev_close) AS price_jump FROM with_prev WHERE prev_close IS NOT NULL AND (close_price - prev_close) > 10 ORDER BY ticker ASC, trade_date ASC;`,
      expectedColumns: ["ticker", "trade_date", "prev_close", "close_price", "price_jump"],
      hints: ["Wrap LAG() inside a CTE so you can filter WHERE (close_price - prev_close) > 10 outside."],
      explanation: "Partitioning LAG() by ticker prevents Apple's last price from bleeding into Nvidia's first row.",
    }),
    makeBasicQ({
      number: 88,
      titleBody: "Expedia: Peeking at Next Quoted Airfare with LEAD()",
      companies: ["Expedia", "Booking.com"],
      topics: ["LEAD", "PARTITION BY", "Window Functions"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Warm-up",
      patternTag: "LEAD() Forward Peek",
      description: `### Problem Statement
Expedia Price Tracker monitors sequential flight fare snapshots. For each route snapshot, show the **next** recorded price using \`LEAD()\` and calculate whether the fare rose or dropped next.

### Requirements
- Compute \`next_price = LEAD(price) OVER (PARTITION BY route ORDER BY checked_at ASC)\`.
- Compute \`next_change = next_price - price\` (leaves \`NULL\` on the last snapshot).
- Output columns: \`route\`, \`checked_at\`, \`price\`, \`next_price\`, \`next_change\`.
- Sort by \`route\` ascending, \`checked_at\` ascending.

### Input Schema
**fare_checks** (id INT, route VARCHAR, checked_at TIMESTAMP, price NUMERIC)`,
      schemaSql: `CREATE TABLE fare_checks (id INT PRIMARY KEY, route VARCHAR(20), checked_at TIMESTAMP, price NUMERIC);
INSERT INTO fare_checks VALUES (1, 'JFK-LAX', '2025-01-01 08:00:00', 320.00), (2, 'JFK-LAX', '2025-01-01 12:00:00', 360.00), (3, 'JFK-LAX', '2025-01-01 18:00:00', 290.00), (4, 'SFO-ORD', '2025-01-01 09:00:00', 240.00), (5, 'SFO-ORD', '2025-01-01 15:00:00', 265.00);`,
      referenceSql: `SELECT route, checked_at, price, LEAD(price, 1) OVER (PARTITION BY route ORDER BY checked_at ASC) AS next_price, (LEAD(price, 1) OVER (PARTITION BY route ORDER BY checked_at ASC) - price) AS next_change FROM fare_checks ORDER BY route ASC, checked_at ASC;`,
      expectedColumns: ["route", "checked_at", "price", "next_price", "next_change"],
      hints: ["LEAD(price, 1) looks 1 row forward in the ordered partition."],
      explanation: "LEAD() inspects future states without self-joins, ideal for funnel next-step and price-drop alerts.",
    }),
    makeBasicQ({
      number: 89,
      titleBody: "Instacart: Days Elapsed Between Consecutive Customer Orders",
      companies: ["Instacart", "DoorDash"],
      topics: ["LAG", "Date Arithmetic", "CTEs"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Core",
      patternTag: "Inter-Event Time Gap",
      description: `### Problem Statement
Instacart Retention measures reorder cadence. For each repeat order (skipping a customer's 1st order), calculate how many days passed since their previous order.

### Requirements
- CTE: compute \`prev_order_date = LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC)\`.
- Outer SELECT: keep rows where \`prev_order_date IS NOT NULL\` and compute \`days_since_prev = (order_date - prev_order_date)\`.
- Output columns: \`customer_id\`, \`prev_order_date\`, \`order_date\`, \`days_since_prev\`.
- Sort by \`customer_id\` ascending, \`order_date\` ascending.

### Input Schema
**orders** (id INT, customer_id INT, order_date DATE)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, order_date DATE);
INSERT INTO orders VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-08'), (3, 101, '2025-01-20'), (4, 102, '2025-01-05'), (5, 102, '2025-01-19'), (6, 103, '2025-01-10');`,
      referenceSql: `WITH lagged AS (SELECT customer_id, order_date, LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS prev_order_date FROM orders) SELECT customer_id, prev_order_date, order_date, (order_date - prev_order_date) AS days_since_prev FROM lagged WHERE prev_order_date IS NOT NULL ORDER BY customer_id ASC, order_date ASC;`,
      expectedColumns: ["customer_id", "prev_order_date", "order_date", "days_since_prev"],
      hints: ["In PostgreSQL, subtracting two DATE values directly returns an integer count of days!"],
      explanation: "LAG(date) plus date subtraction measures user cadence and inactivity gaps effortlessly.",
    }),
    makeBasicQ({
      number: 90,
      titleBody: "Apple: Month-Over-Month App Revenue Growth % (CTE + LAG + NULLIF)",
      companies: ["Apple", "Google"],
      topics: ["LAG", "NULLIF", "ROUND", "CTEs"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Core",
      patternTag: "MoM Growth % (LAG + NULLIF)",
      blueprintSql: `WITH lagged AS (
  SELECT
    app_name,
    report_month,
    revenue AS current_revenue,
    LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC) AS prev_revenue
  FROM monthly_game_revenue
)
SELECT
  app_name,
  report_month,
  current_revenue,
  prev_revenue,
  ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS mom_growth_pct
FROM lagged
ORDER BY app_name ASC, report_month ASC;`,
      description: `### Problem Statement
Compute the Month-over-Month (MoM) revenue growth percentage for each mobile app, safely handling first months (\`NULL\`) and zero prior-month revenue (\`NULLIF\`).

### Requirements
- CTE: fetch \`prev_revenue = LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC)\`.
- Outer SELECT: compute \`mom_growth_pct\` = \`ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2)\`.
- Output columns: \`app_name\`, \`report_month\`, \`current_revenue\`, \`prev_revenue\`, \`mom_growth_pct\`.
- Sort by \`app_name\` ascending, \`report_month\` ascending.

### Input Schema
**monthly_game_revenue** (id INT, app_name VARCHAR, report_month DATE, revenue NUMERIC)`,
      schemaSql: `CREATE TABLE monthly_game_revenue (id INT PRIMARY KEY, app_name VARCHAR(50), report_month DATE, revenue NUMERIC);
INSERT INTO monthly_game_revenue VALUES (1, 'Gigi Rush', '2024-01-01', 50000.00), (2, 'Gigi Rush', '2024-02-01', 65000.00), (3, 'Gigi Rush', '2024-03-01', 72000.00), (4, 'Puzzle Master', '2024-01-01', 0.00), (5, 'Puzzle Master', '2024-02-01', 18000.00), (6, 'Puzzle Master', '2024-03-01', 22500.00);`,
      referenceSql: `WITH lagged AS (SELECT app_name, report_month, revenue AS current_revenue, LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC) AS prev_revenue FROM monthly_game_revenue) SELECT app_name, report_month, current_revenue, prev_revenue, ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS mom_growth_pct FROM lagged ORDER BY app_name ASC, report_month ASC;`,
      expectedColumns: ["app_name", "report_month", "current_revenue", "prev_revenue", "mom_growth_pct"],
      hints: ["Wrap prev_revenue inside NULLIF(prev_revenue, 0) so Puzzle Master's $0 month doesn't trigger division by zero."],
      explanation: "CTE + LAG + NULLIF is the standard formula for MoM/YoY percentage growth.",
    }),
    makeBasicQ({
      number: 91,
      titleBody: "Slack: Detecting Plan Upgrades Between Consecutive Billing Cycles",
      companies: ["Slack", "Notion"],
      topics: ["LAG", "CTEs", "WHERE"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Applied",
      patternTag: "State Transition Detection",
      description: `### Problem Statement
Slack Monetization tracks workspace upgrades from \`'Free'\` directly to \`'Pro'\` or \`'Enterprise'\`. Find every billing record where a workspace switched from \`'Free'\` in the previous month to a paid tier in the current month.

### Requirements
- CTE: use \`LAG(plan_tier) OVER (PARTITION BY workspace_id ORDER BY bill_month ASC)\` as \`prev_tier\`.
- Filter \`prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise')\`.
- Output columns: \`workspace_id\`, \`bill_month\`, \`prev_tier\`, \`plan_tier\`.
- Sort by \`workspace_id\` ascending, \`bill_month\` ascending.

### Input Schema
**billing_snapshots** (id INT, workspace_id INT, bill_month DATE, plan_tier VARCHAR)`,
      schemaSql: `CREATE TABLE billing_snapshots (id INT PRIMARY KEY, workspace_id INT, bill_month DATE, plan_tier VARCHAR(20));
INSERT INTO billing_snapshots VALUES (1, 10, '2025-01-01', 'Free'), (2, 10, '2025-02-01', 'Pro'), (3, 10, '2025-03-01', 'Enterprise'), (4, 20, '2025-01-01', 'Pro'), (5, 20, '2025-02-01', 'Free'), (6, 20, '2025-03-01', 'Enterprise');`,
      referenceSql: `WITH transitions AS (SELECT workspace_id, bill_month, plan_tier, LAG(plan_tier) OVER (PARTITION BY workspace_id ORDER BY bill_month ASC) AS prev_tier FROM billing_snapshots) SELECT workspace_id, bill_month, prev_tier, plan_tier FROM transitions WHERE prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise') ORDER BY workspace_id ASC, bill_month ASC;`,
      expectedColumns: ["workspace_id", "bill_month", "prev_tier", "plan_tier"],
      hints: ["Fetch prev_tier via LAG() in a CTE, then match prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise')."],
      explanation: "Comparing current row state to LAG(state) turns event logs into clean state-transition triggers.",
    }),
    makeBasicQ({
      number: 92,
      titleBody: "Twitter: First-Touch vs Current Attribution Channel (FIRST_VALUE)",
      companies: ["Twitter", "Google"],
      topics: ["FIRST_VALUE", "PARTITION BY", "Window Functions"],
      category: "Window Functions",
      stage: S9,
      stageOrder: 9,
      rampStep: "Applied",
      patternTag: "FIRST_VALUE Anchor Comparison",
      description: `### Problem Statement
Marketing wants to see every user touchpoint alongside that user's **very first** acquisition channel (\`FIRST_VALUE\`).

### Requirements
- Use \`FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC)\` as \`first_channel\`.
- Output columns: \`user_id\`, \`touch_time\`, \`channel\`, \`first_channel\`.
- Sort by \`user_id\` ascending, \`touch_time\` ascending.

### Input Schema
**touchpoints** (id INT, user_id INT, touch_time TIMESTAMP, channel VARCHAR)`,
      schemaSql: `CREATE TABLE touchpoints (id INT PRIMARY KEY, user_id INT, touch_time TIMESTAMP, channel VARCHAR(30));
INSERT INTO touchpoints VALUES (1, 101, '2025-01-01 09:00:00', 'TikTok'), (2, 101, '2025-01-03 14:00:00', 'Google Search'), (3, 101, '2025-01-05 10:00:00', 'Direct'), (4, 102, '2025-01-02 11:00:00', 'Email'), (5, 102, '2025-01-04 16:00:00', 'Referral');`,
      referenceSql: `SELECT user_id, touch_time, channel, FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC) AS first_channel FROM touchpoints ORDER BY user_id ASC, touch_time ASC;`,
      expectedColumns: ["user_id", "touch_time", "channel", "first_channel"],
      hints: ["FIRST_VALUE(col) OVER (PARTITION BY user_id ORDER BY touch_time ASC) always reads the earliest row in the partition."],
      explanation: "FIRST_VALUE() works cleanly with the default frame because the first row in the partition is always inside UNBOUNDED PRECEDING AND CURRENT ROW.",
    }),
  ];
}
