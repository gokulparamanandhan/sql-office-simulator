import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S6 = "Stage 6: Common Table Expressions (CTEs)";

export function getBasicStage6Cte(): InterviewQuestion[] {
  return [
    makeBasicQ({
      number: 53,
      titleBody: "Amazon: Your First CTE — Filtering High-Margin Products",
      companies: ["Amazon", "Shopify"],
      topics: ["CTEs", "WITH", "ORDER BY"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Warm-up",
      patternTag: "Single CTE Intro",
      conceptPrimer: {
        title: "Your First CTE (WITH ... AS (...))",
        mentalModel:
          "A Common Table Expression (CTE) creates a named temporary result at the top of your query. Think of it as assigning a clean variable name to a SELECT statement so your final query stays short and readable.",
        syntaxTemplate: `WITH step_one AS (
  SELECT id, name, (price - cost) AS margin
  FROM products
)
SELECT name, margin
FROM step_one
WHERE margin > 20;`,
        exampleWalkthrough: "Notice how computing margin inside step_one lets you filter WHERE margin > 20 cleanly in the outer SELECT!",
        visualType: "cte-pipeline",
      },
      blueprintSql: `WITH product_margins AS (
  -- Step 1: Calculate unit_margin = price - cost for active products
  SELECT name, price, (price - cost) AS unit_margin
  FROM products
  WHERE is_active = TRUE
)
-- Step 2: Filter unit_margin >= 30 and sort
SELECT name, price, unit_margin
FROM product_margins
WHERE ...
ORDER BY unit_margin DESC, name ASC;`,
      description: `### Problem Statement
In SQL, you can't filter on a calculated column alias directly inside the same \`WHERE\` clause. A **CTE (\`WITH ...\`)** solves this cleanly! Define a CTE named \`product_margins\` that computes \`unit_margin\` for active products, then filter for \`unit_margin >= 30\` outside.

### Requirements
- Inside CTE \`product_margins\`: select \`name\`, \`price\`, and \`(price - cost) AS unit_margin\` for products with \`is_active = TRUE\`.
- In the final \`SELECT\`: filter \`unit_margin >= 30\`.
- Output columns: \`name\`, \`price\`, \`unit_margin\`.
- Sort by \`unit_margin\` descending, \`name\` ascending.

### Input Schema
**products** (id INT, name VARCHAR, price NUMERIC, cost NUMERIC, is_active BOOLEAN)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(60), price NUMERIC, cost NUMERIC, is_active BOOLEAN);
INSERT INTO products VALUES (1, 'Mechanical Keyboard', 120.00, 55.00, TRUE), (2, 'USB Cable', 15.00, 5.00, TRUE), (3, 'Webcam HD', 85.00, 40.00, TRUE), (4, 'Old Monitor', 200.00, 100.00, FALSE), (5, 'Standing Desk', 350.00, 210.00, TRUE);`,
      referenceSql: `WITH product_margins AS (SELECT name, price, (price - cost) AS unit_margin FROM products WHERE is_active = TRUE) SELECT name, price, unit_margin FROM product_margins WHERE unit_margin >= 30 ORDER BY unit_margin DESC, name ASC;`,
      expectedColumns: ["name", "price", "unit_margin"],
      hints: ["Start with WITH product_margins AS (SELECT ...), then write your outer SELECT FROM product_margins."],
      explanation: "CTEs let you name intermediate computed columns and filter them cleanly without repeating expressions.",
    }),
    makeBasicQ({
      number: 54,
      titleBody: "Uber: Refactoring a Derived Table into a Clean CTE",
      companies: ["Uber", "Lyft"],
      topics: ["CTEs", "GROUP BY", "AVG", "ROUND"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Warm-up",
      patternTag: "CTE Aggregation Stage",
      description: `### Problem Statement
Replace messy nested \`FROM (SELECT ...)\` subqueries with a clean CTE. Compute completed ride count and average fare per city inside a CTE, then keep cities with at least 2 rides and average fare above $25.

### Requirements
- Build a CTE \`city_metrics\` filtering \`status = 'completed'\` and grouping by \`city\`.
- In the outer query, keep cities with \`ride_count >= 2\` and \`avg_fare > 25\`.
- Output columns: \`city\`, \`ride_count\`, \`avg_fare\` (rounded to 2 decimals).
- Sort by \`avg_fare\` descending, \`city\` ascending.

### Input Schema
**rides** (id INT, city VARCHAR, fare NUMERIC, status VARCHAR)`,
      schemaSql: `CREATE TABLE rides (id INT PRIMARY KEY, city VARCHAR(40), fare NUMERIC, status VARCHAR(20));
INSERT INTO rides VALUES (1, 'New York', 42.00, 'completed'), (2, 'New York', 34.00, 'completed'), (3, 'Chicago', 18.00, 'completed'), (4, 'Chicago', 22.00, 'completed'), (5, 'Austin', 60.00, 'completed'), (6, 'Austin', 15.00, 'cancelled'), (7, 'Seattle', 30.00, 'completed'), (8, 'Seattle', 28.00, 'completed');`,
      referenceSql: `WITH city_metrics AS (SELECT city, COUNT(*) AS ride_count, ROUND(AVG(fare), 2) AS avg_fare FROM rides WHERE status = 'completed' GROUP BY city) SELECT city, ride_count, avg_fare FROM city_metrics WHERE ride_count >= 2 AND avg_fare > 25 ORDER BY avg_fare DESC, city ASC;`,
      expectedColumns: ["city", "ride_count", "avg_fare"],
      hints: ["Aggregate by city inside the CTE, then apply clean WHERE filters on ride_count and avg_fare outside."],
      explanation: "CTEs turn nested subqueries inside-out so queries read top-to-bottom like a step-by-step recipe.",
    }),
    makeBasicQ({
      number: 55,
      titleBody: "Spotify: Customer Spend Tiers from a CTE Summary",
      companies: ["Spotify", "Netflix"],
      topics: ["CTEs", "CASE WHEN", "SUM", "GROUP BY"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "CTE + Outer Classification",
      description: `### Problem Statement
First aggregate total valid subscription payments per user in a CTE, then classify each user's lifetime spend tier in the outer \`SELECT\`.

### Requirements
- CTE: filter \`status = 'paid'\` and sum \`amount\` per \`user_id\` as \`total_paid\`.
- Outer \`SELECT\`: assign \`spend_tier\` as \`'VIP'\` (\`total_paid >= 100\`), \`'Core'\` (\`>= 50\`), else \`'Starter'\`.
- Output columns: \`user_id\`, \`total_paid\`, \`spend_tier\`.
- Sort by \`total_paid\` descending, \`user_id\` ascending.

### Input Schema
**payments** (id INT, user_id INT, amount NUMERIC, status VARCHAR)`,
      schemaSql: `CREATE TABLE payments (id INT PRIMARY KEY, user_id INT, amount NUMERIC, status VARCHAR(20));
INSERT INTO payments VALUES (1, 10, 49.99, 'paid'), (2, 10, 59.99, 'paid'), (3, 20, 60.00, 'paid'), (4, 20, 40.00, 'failed'), (5, 30, 19.99, 'paid'), (6, 40, 120.00, 'paid');`,
      referenceSql: `WITH user_totals AS (SELECT user_id, ROUND(SUM(amount), 2) AS total_paid FROM payments WHERE status = 'paid' GROUP BY user_id) SELECT user_id, total_paid, CASE WHEN total_paid >= 100 THEN 'VIP' WHEN total_paid >= 50 THEN 'Core' ELSE 'Starter' END AS spend_tier FROM user_totals ORDER BY total_paid DESC, user_id ASC;`,
      expectedColumns: ["user_id", "total_paid", "spend_tier"],
      hints: ["Compute SUM(amount) once inside the CTE, then run CASE WHEN on the clean total_paid column."],
      explanation: "Separating aggregation (CTE) from business tier labeling (outer SELECT) keeps SQL clean and DRY.",
    }),
    makeBasicQ({
      number: 56,
      titleBody: "Airbnb: Benchmarking Listings Against City Average via CTE Join",
      companies: ["Airbnb", "Expedia"],
      topics: ["CTEs", "INNER JOIN", "AVG", "ROUND"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "CTE Benchmark Lookup",
      description: `### Problem Statement
Earlier you used a correlated subquery to compare each listing to its city average. A cleaner, faster pattern is computing city averages once inside a CTE and joining it back!

### Requirements
- CTE \`city_avg\`: compute \`ROUND(AVG(price_nightly), 2) AS avg_city_price\` per \`city\`.
- Join \`market_listings\` to \`city_avg\` on \`city\`.
- Return listings where \`price_nightly > avg_city_price\`.
- Output columns: \`listing_name\`, \`city\`, \`price_nightly\`, \`avg_city_price\`.
- Sort by \`city\` ascending, \`price_nightly\` descending.

### Input Schema
**market_listings** (listing_id INT, city VARCHAR, listing_name VARCHAR, price_nightly NUMERIC)`,
      schemaSql: `CREATE TABLE market_listings (listing_id INT PRIMARY KEY, city VARCHAR(40), listing_name VARCHAR(80), price_nightly NUMERIC);
INSERT INTO market_listings VALUES (1, 'Austin', 'Downtown Studio', 120.00), (2, 'Austin', 'Lakefront Villa', 450.00), (3, 'Austin', 'Eastside Loft', 180.00), (4, 'Denver', 'Mountain Cabin', 220.00), (5, 'Denver', 'Highrise Suite', 310.00), (6, 'Denver', 'Basement Room', 80.00);`,
      referenceSql: `WITH city_avg AS (SELECT city, ROUND(AVG(price_nightly), 2) AS avg_city_price FROM market_listings GROUP BY city) SELECT l.listing_name, l.city, l.price_nightly, c.avg_city_price FROM market_listings l JOIN city_avg c ON l.city = c.city WHERE l.price_nightly > c.avg_city_price ORDER BY l.city ASC, l.price_nightly DESC;`,
      expectedColumns: ["listing_name", "city", "price_nightly", "avg_city_price"],
      hints: ["Compute city averages in a CTE, then JOIN it back on city to display both listing price and city average."],
      explanation: "Joining a pre-aggregated CTE lets you return the benchmark column itself (avg_city_price), unlike a correlated subquery in WHERE.",
    }),
    makeBasicQ({
      number: 57,
      titleBody: "Slack: Chained Two-Step CTE Pipeline (Clean Then Aggregate)",
      companies: ["Slack", "Notion"],
      topics: ["CTEs", "Multi-CTE", "TRIM", "LOWER", "GROUP BY"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "2-Step Chained CTE",
      blueprintSql: `WITH cleaned_events AS (
  -- Step 1: Normalize channel names (TRIM + LOWER) and filter valid rows
  SELECT ...
),
channel_stats AS (
  -- Step 2: Aggregate cleaned_events by clean_channel
  SELECT ...
)
SELECT clean_channel, event_count
FROM channel_stats
WHERE event_count >= 2
ORDER BY event_count DESC, clean_channel ASC;`,
      description: `### Problem Statement
Practice chaining **two CTEs** separated by a comma (\`WITH cte1 AS (...), cte2 AS (...) SELECT ...\`). First clean messy channel tags, then aggregate per cleaned tag, then filter in the final query.

### Requirements
- \`cte1\` (\`cleaned_events\`): trim and lowercase \`channel\` as \`clean_channel\`, excluding rows where \`channel IS NULL\` or \`TRIM(channel) = ''\`.
- \`cte2\` (\`channel_stats\`): group \`cleaned_events\` by \`clean_channel\` and count events as \`event_count\`.
- Outer query: keep \`event_count >= 2\`.
- Output columns: \`clean_channel\`, \`event_count\`.
- Sort by \`event_count\` descending, \`clean_channel\` ascending.

### Input Schema
**signup_events** (id INT, channel VARCHAR)`,
      schemaSql: `CREATE TABLE signup_events (id INT PRIMARY KEY, channel VARCHAR(40));
INSERT INTO signup_events VALUES (1, ' Organic '), (2, 'ORGANIC'), (3, 'organic'), (4, 'Paid Search'), (5, ' paid search '), (6, 'Referral'), (7, NULL), (8, '  ');`,
      referenceSql: `WITH cleaned_events AS (SELECT id, LOWER(TRIM(channel)) AS clean_channel FROM signup_events WHERE channel IS NOT NULL AND TRIM(channel) <> ''), channel_stats AS (SELECT clean_channel, COUNT(*) AS event_count FROM cleaned_events GROUP BY clean_channel) SELECT clean_channel, event_count FROM channel_stats WHERE event_count >= 2 ORDER BY event_count DESC, clean_channel ASC;`,
      expectedColumns: ["clean_channel", "event_count"],
      hints: ["Separate multiple CTEs with a comma—never write WITH twice!"],
      explanation: "Chaining CTEs lets Stage 1 handle dirty hygiene and Stage 2 handle aggregation cleanly.",
    }),
    makeBasicQ({
      number: 58,
      titleBody: "Google: Two-Level Average of Daily Revenue via Chained CTEs",
      companies: ["Google", "Meta"],
      topics: ["CTEs", "Multi-CTE", "SUM", "AVG", "ROUND"],
      category: "Aggregations",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "Two-Level Aggregation with CTE",
      description: `### Problem Statement
Google Ads Finance wants to find which days outperformed the average daily ad revenue. Use two CTEs: one to sum daily revenue, and a second (or scalar check) to benchmark days against that average!

### Requirements
- CTE \`daily_totals\`: sum \`spend\` per \`ad_date\` as \`daily_revenue\`.
- Return days where \`daily_revenue\` exceeds the average \`daily_revenue\` across all days in \`daily_totals\`.
- Output columns: \`ad_date\`, \`daily_revenue\`.
- Sort by \`ad_date\` ascending.

### Input Schema
**ad_spend** (id INT, ad_date DATE, spend NUMERIC)`,
      schemaSql: `CREATE TABLE ad_spend (id INT PRIMARY KEY, ad_date DATE, spend NUMERIC);
INSERT INTO ad_spend VALUES (1, '2025-01-01', 100.00), (2, '2025-01-01', 150.00), (3, '2025-01-02', 80.00), (4, '2025-01-02', 40.00), (5, '2025-01-03', 300.00), (6, '2025-01-04', 90.00);`,
      referenceSql: `WITH daily_totals AS (SELECT ad_date, ROUND(SUM(spend), 2) AS daily_revenue FROM ad_spend GROUP BY ad_date), avg_day AS (SELECT AVG(daily_revenue) AS mean_rev FROM daily_totals) SELECT d.ad_date, d.daily_revenue FROM daily_totals d CROSS JOIN avg_day a WHERE d.daily_revenue > a.mean_rev ORDER BY d.ad_date ASC;`,
      expectedColumns: ["ad_date", "daily_revenue"],
      hints: ["Define daily_totals first, then reference daily_totals inside avg_day or a scalar subquery."],
      explanation: "CTEs can reference earlier CTEs defined before them in the same WITH block.",
    }),
    makeBasicQ({
      number: 59,
      titleBody: "DoorDash: Combining Two Independent CTEs (Active Drivers vs Active Zones)",
      companies: ["DoorDash", "Uber"],
      topics: ["CTEs", "Multi-CTE", "LEFT JOIN", "COALESCE"],
      category: "Joins & Set Theory",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "Parallel CTE Join",
      description: `### Problem Statement
DoorDash Supply Operations wants every delivery zone compared side-by-side with its completed delivery count and active driver count—even zones with zero deliveries or zero drivers.

### Requirements
- Build two independent CTEs grouped by \`zone_id\`:
  - \`zone_deliveries\`: count deliveries where \`status = 'delivered'\`
  - \`zone_drivers\`: count drivers where \`is_active = TRUE\`
- \`LEFT JOIN\` both CTEs onto \`zones\`, defaulting missing counts to \`0\`.
- Output columns: \`zone_name\`, \`completed_deliveries\`, \`active_drivers\`.
- Sort by \`zone_name\` ascending.

### Input Schema
**zones** (id INT, zone_name VARCHAR)

**deliveries** (id INT, zone_id INT, status VARCHAR)

**drivers** (id INT, zone_id INT, is_active BOOLEAN)`,
      schemaSql: `CREATE TABLE zones (id INT PRIMARY KEY, zone_name VARCHAR(40));
CREATE TABLE deliveries (id INT PRIMARY KEY, zone_id INT, status VARCHAR(20));
CREATE TABLE drivers (id INT PRIMARY KEY, zone_id INT, is_active BOOLEAN);
INSERT INTO zones VALUES (1, 'Downtown'), (2, 'Midtown'), (3, 'Suburbs');
INSERT INTO deliveries VALUES (101, 1, 'delivered'), (102, 1, 'delivered'), (103, 2, 'cancelled');
INSERT INTO drivers VALUES (201, 1, TRUE), (202, 2, TRUE), (203, 2, TRUE), (204, 3, FALSE);`,
      referenceSql: `WITH zone_deliveries AS (SELECT zone_id, COUNT(*) AS completed_deliveries FROM deliveries WHERE status = 'delivered' GROUP BY zone_id), zone_drivers AS (SELECT zone_id, COUNT(*) AS active_drivers FROM drivers WHERE is_active = TRUE GROUP BY zone_id) SELECT z.zone_name, COALESCE(zd.completed_deliveries, 0) AS completed_deliveries, COALESCE(zdr.active_drivers, 0) AS active_drivers FROM zones z LEFT JOIN zone_deliveries zd ON z.id = zd.zone_id LEFT JOIN zone_drivers zdr ON z.id = zdr.zone_id ORDER BY z.zone_name ASC;`,
      expectedColumns: ["zone_name", "completed_deliveries", "active_drivers"],
      hints: ["Pre-aggregate deliveries and drivers separately by zone_id so joining them never multiplies rows!"],
      explanation: "Joining two pre-aggregated CTEs guarantees 1-to-1 row alignment per zone.",
    }),
    makeBasicQ({
      number: 60,
      titleBody: "Amazon: Preventing Join Fanout on Orders + Order Items (Pre-Aggregation CTE)",
      companies: ["Amazon", "DoorDash"],
      topics: ["CTEs", "Fanout Prevention", "LEFT JOIN", "SUM"],
      category: "Joins & Set Theory",
      stage: S6,
      stageOrder: 6,
      rampStep: "Applied",
      patternTag: "Fanout-Safe Pre-Aggregation CTE",
      conceptPrimer: {
        title: "Stopping Join Fanouts with Pre-Aggregated CTEs",
        mentalModel:
          "If Order #1 has 1 shipping fee ($10) and 3 order items, joining orders directly to order_items duplicates Order #1 three times—turning a $10 shipping fee into $30! Always aggregate child tables down to 1 row per order_id inside a CTE before joining.",
        syntaxTemplate: `WITH item_totals AS (
  SELECT order_id, SUM(qty * unit_price) AS items_subtotal
  FROM order_items
  GROUP BY order_id
)
SELECT o.id, o.shipping_fee + COALESCE(i.items_subtotal, 0) AS grand_total
FROM orders o
LEFT JOIN item_totals i ON o.id = i.order_id;`,
        visualType: "cte-pipeline",
      },
      description: `### Problem Statement
An analyst joined \`orders\` directly to \`order_items\` and summed \`orders.shipping_fee\`, accidentally multiplying shipping fees by the number of items in each order! Fix it using a pre-aggregated CTE.

### Requirements
- CTE \`item_sums\`: sum \`quantity * unit_price\` per \`order_id\` as \`items_total\`.
- Join \`orders\` to \`item_sums\` via \`LEFT JOIN\` and compute \`customer_id\` totals:
  - \`total_shipping\` = \`SUM(o.shipping_fee)\`
  - \`total_items_cost\` = \`SUM(COALESCE(i.items_total, 0))\`
- Output columns: \`customer_id\`, \`total_shipping\`, \`total_items_cost\`.
- Sort by \`customer_id\` ascending.

### Input Schema
**orders** (id INT, customer_id INT, shipping_fee NUMERIC)

**order_items** (id INT, order_id INT, quantity INT, unit_price NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, shipping_fee NUMERIC);
CREATE TABLE order_items (id INT PRIMARY KEY, order_id INT, quantity INT, unit_price NUMERIC);
INSERT INTO orders VALUES (1, 101, 10.00), (2, 101, 5.00), (3, 102, 8.00);
INSERT INTO order_items VALUES (1, 1, 2, 20.00), (2, 1, 1, 15.00), (3, 2, 3, 10.00), (4, 3, 1, 50.00);`,
      referenceSql: `WITH item_sums AS (SELECT order_id, SUM(quantity * unit_price) AS items_total FROM order_items GROUP BY order_id) SELECT o.customer_id, ROUND(SUM(o.shipping_fee), 2) AS total_shipping, ROUND(SUM(COALESCE(i.items_total, 0)), 2) AS total_items_cost FROM orders o LEFT JOIN item_sums i ON o.id = i.order_id GROUP BY o.customer_id ORDER BY o.customer_id ASC;`,
      expectedColumns: ["customer_id", "total_shipping", "total_items_cost"],
      hints: ["Aggregate order_items by order_id inside the CTE first so each order has exactly 1 matching row."],
      explanation: "Pre-aggregating 1-to-many child tables in a CTE before joining is the #1 defense against silent metric inflation.",
    }),
    makeBasicQ({
      number: 61,
      titleBody: "Shopify: Net Store Revenue Across Orders and Refunds (2-CTE Fanout Fix)",
      companies: ["Shopify", "Stripe"],
      topics: ["CTEs", "Fanout Prevention", "LEFT JOIN", "COALESCE"],
      category: "Joins & Set Theory",
      stage: S6,
      stageOrder: 6,
      rampStep: "Applied",
      patternTag: "Multi-Child Fanout Prevention",
      description: `### Problem Statement
A store can have multiple \`payments\` rows AND multiple \`refunds\` rows. Joining \`stores -> payments -> refunds\` directly would multiply rows! Aggregate each child table in its own CTE first.

### Requirements
- CTE 1 (\`store_payments\`): sum \`amount\` per \`store_id\` as \`gross_paid\`.
- CTE 2 (\`store_refunds\`): sum \`refund_amount\` per \`store_id\` as \`total_refunded\`.
- Join both onto \`stores\` with \`LEFT JOIN\` and compute \`net_revenue = ROUND(COALESCE(gross_paid, 0) - COALESCE(total_refunded, 0), 2)\`.
- Output columns: \`store_name\`, \`gross_paid\`, \`total_refunded\`, \`net_revenue\`.
- Sort by \`net_revenue\` descending, \`store_name\` ascending.

### Input Schema
**stores** (id INT, store_name VARCHAR)

**payments** (id INT, store_id INT, amount NUMERIC)

**refunds** (id INT, store_id INT, refund_amount NUMERIC)`,
      schemaSql: `CREATE TABLE stores (id INT PRIMARY KEY, store_name VARCHAR(50));
CREATE TABLE payments (id INT PRIMARY KEY, store_id INT, amount NUMERIC);
CREATE TABLE refunds (id INT PRIMARY KEY, store_id INT, refund_amount NUMERIC);
INSERT INTO stores VALUES (1, 'Nordic Home'), (2, 'Pixel Prints'), (3, 'Empty Shop');
INSERT INTO payments VALUES (1, 1, 200.00), (2, 1, 300.00), (3, 2, 150.00);
INSERT INTO refunds VALUES (1, 1, 50.00), (2, 1, 25.00);`,
      referenceSql: `WITH store_payments AS (SELECT store_id, SUM(amount) AS gross_paid FROM payments GROUP BY store_id), store_refunds AS (SELECT store_id, SUM(refund_amount) AS total_refunded FROM refunds GROUP BY store_id) SELECT s.store_name, ROUND(COALESCE(p.gross_paid, 0), 2) AS gross_paid, ROUND(COALESCE(r.total_refunded, 0), 2) AS total_refunded, ROUND(COALESCE(p.gross_paid, 0) - COALESCE(r.total_refunded, 0), 2) AS net_revenue FROM stores s LEFT JOIN store_payments p ON s.id = p.store_id LEFT JOIN store_refunds r ON s.id = r.store_id ORDER BY net_revenue DESC, s.store_name ASC;`,
      expectedColumns: ["store_name", "gross_paid", "total_refunded", "net_revenue"],
      hints: ["Never join payments directly to refunds on store_id; aggregate each by store_id first."],
      explanation: "Separate CTEs per child table reduce every 1-to-many relation down to 1-to-1 before the final join.",
    }),
    makeBasicQ({
      number: 62,
      titleBody: "Netflix: Subscriber Watch Share Using a Grand-Total CTE",
      companies: ["Netflix", "YouTube"],
      topics: ["CTEs", "CROSS JOIN", "ROUND", "SUM"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Core",
      patternTag: "Share of Total via CTE",
      description: `### Problem Statement
Compute each genre's percentage of total platform watch hours using two CTEs (\`genre_hours\` and \`total_hours\`)—showing what window \`OVER ()\` will soon automate in one line!

### Requirements
- \`genre_hours\`: sum \`hours\` per \`genre\` as \`genre_total\`.
- \`total_hours\`: sum \`genre_total\` across all genres as \`grand_total\`.
- Compute \`share_pct\` = \`ROUND(genre_total * 100.0 / grand_total, 2)\`.
- Output columns: \`genre\`, \`genre_total\`, \`share_pct\`.
- Sort by \`share_pct\` descending, \`genre\` ascending.

### Input Schema
**watch_logs** (id INT, genre VARCHAR, hours NUMERIC)`,
      schemaSql: `CREATE TABLE watch_logs (id INT PRIMARY KEY, genre VARCHAR(30), hours NUMERIC);
INSERT INTO watch_logs VALUES (1, 'Sci-Fi', 120), (2, 'Sci-Fi', 80), (3, 'Drama', 150), (4, 'Comedy', 50);`,
      referenceSql: `WITH genre_hours AS (SELECT genre, SUM(hours) AS genre_total FROM watch_logs GROUP BY genre), total_hours AS (SELECT SUM(genre_total) AS grand_total FROM genre_hours) SELECT g.genre, g.genre_total, ROUND(g.genre_total * 100.0 / t.grand_total, 2) AS share_pct FROM genre_hours g CROSS JOIN total_hours t ORDER BY share_pct DESC, g.genre ASC;`,
      expectedColumns: ["genre", "genre_total", "share_pct"],
      hints: ["CROSS JOIN works cleanly with a 1-row grand-total CTE because 1 * N rows = N rows."],
      explanation: "A 1-row grand-total CTE combined with CROSS JOIN is the classic pre-window way to compute share-of-total.",
    }),
    makeBasicQ({
      number: 63,
      titleBody: "HubSpot: Multi-Stage Lead Funnel Conversion via Chained CTEs",
      companies: ["HubSpot", "Salesforce"],
      topics: ["CTEs", "Multi-CTE", "CASE WHEN", "ROUND"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Applied",
      patternTag: "Funnel Pipeline CTE",
      description: `### Problem Statement
HubSpot Marketing has dirty lead stages with mixed casing. Clean the stages in CTE 1, roll up funnel counts per campaign in CTE 2, and compute SQL-to-Won conversion rates in the final SELECT.

### Requirements
- Exclude rows where \`lead_stage\` is \`NULL\`.
- CTE 1: normalize \`LOWER(TRIM(lead_stage))\` as \`stage\`.
- CTE 2: per \`campaign\`, count \`total_leads\` and \`won_leads\` (\`stage = 'closed_won'\`).
- Final SELECT: compute \`win_rate_pct\` = \`ROUND(won_leads * 100.0 / NULLIF(total_leads, 0), 2)\`, keeping campaigns with \`total_leads >= 2\`.
- Output columns: \`campaign\`, \`total_leads\`, \`won_leads\`, \`win_rate_pct\`.
- Sort by \`win_rate_pct\` descending, \`campaign\` ascending.

### Input Schema
**crm_leads** (id INT, campaign VARCHAR, lead_stage VARCHAR)`,
      schemaSql: `CREATE TABLE crm_leads (id INT PRIMARY KEY, campaign VARCHAR(40), lead_stage VARCHAR(30));
INSERT INTO crm_leads VALUES (1, 'Webinar Q1', ' Closed_Won '), (2, 'Webinar Q1', 'closed_won'), (3, 'Webinar Q1', 'qualified'), (4, 'Search Ads', 'CLOSED_WON'), (5, 'Search Ads', 'lost'), (6, 'Search Ads', 'qualified'), (7, 'Search Ads', NULL), (8, 'Cold Email', 'lost');`,
      referenceSql: `WITH cleaned AS (SELECT campaign, LOWER(TRIM(lead_stage)) AS stage FROM crm_leads WHERE lead_stage IS NOT NULL), stats AS (SELECT campaign, COUNT(*) AS total_leads, SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END) AS won_leads FROM cleaned GROUP BY campaign) SELECT campaign, total_leads, won_leads, ROUND(won_leads * 100.0 / NULLIF(total_leads, 0), 2) AS win_rate_pct FROM stats WHERE total_leads >= 2 ORDER BY win_rate_pct DESC, campaign ASC;`,
      expectedColumns: ["campaign", "total_leads", "won_leads", "win_rate_pct"],
      hints: ["Put dirty string normalization in CTE 1, counts in CTE 2, and ratio filtering in the outer SELECT."],
      explanation: "Multi-CTE pipelines separate ingestion hygiene, aggregation, and presentation logic cleanly.",
    }),
    makeBasicQ({
      number: 64,
      titleBody: "Stripe: Stage 6 Milestone — Repeat vs One-Time Buyer Revenue Share",
      companies: ["Stripe", "Shopify"],
      topics: ["CTEs", "Multi-CTE", "CASE WHEN", "ROUND"],
      category: "Business Analytics",
      stage: S6,
      stageOrder: 6,
      rampStep: "Applied",
      patternTag: "Cohort Segmentation CTE",
      description: `### Problem Statement
Split completed revenue between **Repeat Buyers** (2+ completed orders) and **One-Time Buyers** (1 completed order).

### Requirements
- CTE 1 (\`customer_orders\`): filter \`status = 'completed'\`, group by \`customer_id\` to compute \`order_cnt\` and \`cust_spend\`.
- CTE 2 (\`segmented\`): map \`order_cnt >= 2\` to \`'Repeat Buyer'\` else \`'One-Time Buyer'\` as \`buyer_type\`.
- Final SELECT: aggregate \`customer_count\` and \`ROUND(SUM(cust_spend), 2) AS total_revenue\` per \`buyer_type\`.
- Sort by \`total_revenue\` descending.

### Input Schema
**orders** (id INT, customer_id INT, status VARCHAR, amount NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, status VARCHAR(20), amount NUMERIC);
INSERT INTO orders VALUES (1, 1, 'completed', 100.00), (2, 1, 'completed', 150.00), (3, 2, 'completed', 200.00), (4, 3, 'completed', 80.00), (5, 3, 'completed', 90.00), (6, 4, 'cancelled', 500.00);`,
      referenceSql: `WITH customer_orders AS (SELECT customer_id, COUNT(*) AS order_cnt, SUM(amount) AS cust_spend FROM orders WHERE status = 'completed' GROUP BY customer_id), segmented AS (SELECT customer_id, cust_spend, CASE WHEN order_cnt >= 2 THEN 'Repeat Buyer' ELSE 'One-Time Buyer' END AS buyer_type FROM customer_orders) SELECT buyer_type, COUNT(*) AS customer_count, ROUND(SUM(cust_spend), 2) AS total_revenue FROM segmented GROUP BY buyer_type ORDER BY total_revenue DESC;`,
      expectedColumns: ["buyer_type", "customer_count", "total_revenue"],
      hints: ["First collapse orders -> 1 row per customer, then label each customer, then group by buyer_type."],
      explanation: "Multi-grain aggregation (orders -> customers -> segments) is one of the most common analytical CTE workflows.",
    }),
  ];
}
