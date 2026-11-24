import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S7 = "Stage 7: Window Foundations (OVER & PARTITION)";

export function getBasicStage7WindowBasics(): InterviewQuestion[] {
  return [
    makeBasicQ({
      number: 65,
      titleBody: "Amazon: Your First Window Function — Row Value vs Grand Average (OVER ())",
      companies: ["Amazon", "Google"],
      topics: ["Window Functions", "OVER ()", "AVG OVER", "ROUND"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Warm-up",
      patternTag: "Empty OVER () Window",
      conceptPrimer: {
        title: "GROUP BY vs OVER () — Keep Every Row!",
        mentalModel:
          "GROUP BY collapses 5 rows into 1 summary row. Adding OVER () after AVG(), SUM(), or COUNT() keeps ALL 5 individual rows intact and stamps the summary result right next to each row—no subquery or self-join needed!",
        syntaxTemplate: `SELECT
  item_name,
  price,
  ROUND(AVG(price) OVER (), 2) AS catalog_avg
FROM items;`,
        exampleWalkthrough: "Empty parentheses OVER () means: use the entire result set as one single window.",
        visualType: "window-frame",
      },
      blueprintSql: `SELECT
  product_name,
  price,
  ROUND(AVG(price) OVER (), 2) AS global_avg_price,
  ROUND(price - AVG(price) OVER (), 2) AS diff_from_avg
FROM products
ORDER BY price DESC, product_name ASC;`,
      description: `### Problem Statement
Write your first window function! Display every product alongside the catalog-wide average price and its dollar difference from that average—**without** collapsing rows or writing a subquery.

### Requirements
- Keep every row from \`products\`.
- Compute \`global_avg_price\` using \`ROUND(AVG(price) OVER (), 2)\`.
- Compute \`diff_from_avg\` as \`ROUND(price - AVG(price) OVER (), 2)\`.
- Output columns: \`product_name\`, \`price\`, \`global_avg_price\`, \`diff_from_avg\`.
- Sort by \`price\` descending, \`product_name\` ascending.

### Input Schema
**products** (id INT, product_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, product_name VARCHAR(60), price NUMERIC);
INSERT INTO products VALUES (1, 'Monitor', 300.00), (2, 'Keyboard', 100.00), (3, 'Mouse', 50.00), (4, 'Webcam', 150.00);`,
      referenceSql: `SELECT product_name, price, ROUND(AVG(price) OVER (), 2) AS global_avg_price, ROUND(price - AVG(price) OVER (), 2) AS diff_from_avg FROM products ORDER BY price DESC, product_name ASC;`,
      expectedColumns: ["product_name", "price", "global_avg_price", "diff_from_avg"],
      hints: ["Use AVG(price) OVER () directly in SELECT—no GROUP BY needed!"],
      explanation: "OVER () computes an aggregate across all rows while preserving row-level detail.",
    }),
    makeBasicQ({
      number: 66,
      titleBody: "Stripe: Percentage of Company Total Revenue with SUM() OVER ()",
      companies: ["Stripe", "Square"],
      topics: ["Window Functions", "SUM OVER", "ROUND"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Warm-up",
      patternTag: "Share of Grand Total",
      description: `### Problem Statement
Earlier you computed grand total share using two CTEs + \`CROSS JOIN\`. Now do it cleanly in one query with \`SUM(revenue) OVER ()\`!

### Requirements
- Return each region's \`region\`, \`revenue\`, \`total_revenue\` (\`SUM(revenue) OVER ()\`), and \`pct_of_total\` (\`ROUND(revenue * 100.0 / SUM(revenue) OVER (), 2)\`).
- Sort by \`pct_of_total\` descending, \`region\` ascending.

### Input Schema
**regional_sales** (region VARCHAR, revenue NUMERIC)`,
      schemaSql: `CREATE TABLE regional_sales (region VARCHAR(30), revenue NUMERIC);
INSERT INTO regional_sales VALUES ('North America', 5000.00), ('Europe', 3000.00), ('APAC', 1500.00), ('LATAM', 500.00);`,
      referenceSql: `SELECT region, revenue, SUM(revenue) OVER () AS total_revenue, ROUND(revenue * 100.0 / SUM(revenue) OVER (), 2) AS pct_of_total FROM regional_sales ORDER BY pct_of_total DESC, region ASC;`,
      expectedColumns: ["region", "revenue", "total_revenue", "pct_of_total"],
      hints: ["Divide revenue * 100.0 by SUM(revenue) OVER ()."],
      explanation: "SUM(col) OVER () computes the grand denominator cleanly inside any row-level ratio.",
    }),
    makeBasicQ({
      number: 67,
      titleBody: "Google: Department Headcount & Payroll Alongside Every Employee (PARTITION BY)",
      companies: ["Google", "Microsoft"],
      topics: ["Window Functions", "PARTITION BY", "COUNT OVER", "SUM OVER"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Warm-up",
      patternTag: "PARTITION BY Grouping",
      conceptPrimer: {
        title: "Splitting Windows with PARTITION BY",
        mentalModel:
          "Adding PARTITION BY inside OVER (...) acts just like GROUP BY for window functions—it resets the calculation independently for each department, category, or user while still keeping every row.",
        syntaxTemplate: `SELECT
  employee_name,
  department,
  salary,
  COUNT(*) OVER (PARTITION BY department) AS dept_headcount,
  SUM(salary) OVER (PARTITION BY department) AS dept_payroll
FROM employees;`,
        visualType: "window-frame",
      },
      description: `### Problem Statement
HR wants every employee listed alongside their department's total headcount and total department payroll—without collapsing employees into department summary rows.

### Requirements
- Use \`COUNT(*) OVER (PARTITION BY department)\` as \`dept_headcount\`.
- Use \`SUM(salary) OVER (PARTITION BY department)\` as \`dept_payroll\`.
- Output columns: \`employee_name\`, \`department\`, \`salary\`, \`dept_headcount\`, \`dept_payroll\`.
- Sort by \`department\` ascending, \`salary\` descending, \`employee_name\` ascending.

### Input Schema
**employees** (id INT, employee_name VARCHAR, department VARCHAR, salary INT)`,
      schemaSql: `CREATE TABLE employees (id INT PRIMARY KEY, employee_name VARCHAR(40), department VARCHAR(30), salary INT);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 160000), (2, 'Bob', 'Engineering', 140000), (3, 'Carol', 'Engineering', 200000), (4, 'Dave', 'Sales', 110000), (5, 'Eve', 'Sales', 90000);`,
      referenceSql: `SELECT employee_name, department, salary, COUNT(*) OVER (PARTITION BY department) AS dept_headcount, SUM(salary) OVER (PARTITION BY department) AS dept_payroll FROM employees ORDER BY department ASC, salary DESC, employee_name ASC;`,
      expectedColumns: ["employee_name", "department", "salary", "dept_headcount", "dept_payroll"],
      hints: ["Add PARTITION BY department inside OVER (...)."],
      explanation: "PARTITION BY resets window aggregations per group without collapsing individual rows.",
    }),
    makeBasicQ({
      number: 68,
      titleBody: "Google: Search Query Click Share Within Product Category",
      companies: ["Google", "Amazon"],
      topics: ["Window Functions", "SUM OVER", "PARTITION BY", "ROUND"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Core",
      patternTag: "Within-Group Percentage Share",
      description: `### Problem Statement
Google Search Monetization analyzes click concentration inside each industry vertical. Compute each query's percentage share of clicks **within its category**.

### Requirements
- Compute \`category_total_clicks\` via \`SUM(clicks) OVER (PARTITION BY category)\`.
- Compute \`click_share_pct\` = \`ROUND(clicks * 100.0 / NULLIF(SUM(clicks) OVER (PARTITION BY category), 0), 2)\`.
- Output columns: \`category\`, \`query_text\`, \`clicks\`, \`category_total_clicks\`, \`click_share_pct\`.
- Sort by \`category\` ascending, \`click_share_pct\` descending, \`query_text\` ascending.

### Input Schema
**search_clicks** (id INT, category VARCHAR, query_text VARCHAR, clicks INT)`,
      schemaSql: `CREATE TABLE search_clicks (id INT PRIMARY KEY, category VARCHAR(50), query_text VARCHAR(100), clicks INT);
INSERT INTO search_clicks VALUES (1, 'Travel', 'cheap flights to paris', 4500), (2, 'Travel', 'best hotels tokyo', 3500), (3, 'Travel', 'car rental miami', 2000), (4, 'Finance', 'high yield savings account', 8000), (5, 'Finance', 'best credit card rewards', 12000);`,
      referenceSql: `SELECT category, query_text, clicks, SUM(clicks) OVER (PARTITION BY category) AS category_total_clicks, ROUND(clicks * 100.0 / NULLIF(SUM(clicks) OVER (PARTITION BY category), 0), 2) AS click_share_pct FROM search_clicks ORDER BY category ASC, click_share_pct DESC, query_text ASC;`,
      expectedColumns: ["category", "query_text", "clicks", "category_total_clicks", "click_share_pct"],
      hints: ["Omit ORDER BY inside OVER (PARTITION BY category) so SUM includes the whole category."],
      explanation: "SUM(x) OVER (PARTITION BY grp) computes group totals cleanly for within-group shares.",
    }),
    makeBasicQ({
      number: 69,
      titleBody: "Airbnb: Listing Price Variance vs Neighborhood Average",
      companies: ["Airbnb", "Zillow"],
      topics: ["Window Functions", "AVG OVER", "PARTITION BY", "ROUND"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Core",
      patternTag: "Group Average Comparison",
      description: `### Problem Statement
Compute each listing's dollar variance (\`price - neighborhood_avg\`) compared against the average nightly price in its neighborhood.

### Requirements
- Compute \`neighborhood_avg\` using \`ROUND(AVG(price) OVER (PARTITION BY neighborhood), 2)\`.
- Compute \`price_diff\` using \`ROUND(price - AVG(price) OVER (PARTITION BY neighborhood), 2)\`.
- Output columns: \`neighborhood\`, \`listing_name\`, \`price\`, \`neighborhood_avg\`, \`price_diff\`.
- Sort by \`neighborhood\` ascending, \`price_diff\` descending, \`listing_name\` ascending.

### Input Schema
**listings** (id INT, neighborhood VARCHAR, listing_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE listings (id INT PRIMARY KEY, neighborhood VARCHAR(40), listing_name VARCHAR(60), price NUMERIC);
INSERT INTO listings VALUES (1, 'SoHo', 'Loft A', 400.00), (2, 'SoHo', 'Studio B', 200.00), (3, 'SoHo', 'Suite C', 300.00), (4, 'Mission', 'Flat D', 180.00), (5, 'Mission', 'House E', 220.00);`,
      referenceSql: `SELECT neighborhood, listing_name, price, ROUND(AVG(price) OVER (PARTITION BY neighborhood), 2) AS neighborhood_avg, ROUND(price - AVG(price) OVER (PARTITION BY neighborhood), 2) AS price_diff FROM listings ORDER BY neighborhood ASC, price_diff DESC, listing_name ASC;`,
      expectedColumns: ["neighborhood", "listing_name", "price", "neighborhood_avg", "price_diff"],
      hints: ["Use AVG(price) OVER (PARTITION BY neighborhood) to get the per-neighborhood average on every row."],
      explanation: "AVG() OVER (PARTITION BY ...) replaces correlated subqueries and CTE self-joins with one concise expression.",
    }),
    makeBasicQ({
      number: 70,
      titleBody: "Databricks: Cluster Peak Capacity & Gap to Peak (MAX OVER)",
      companies: ["Databricks", "Snowflake"],
      topics: ["Window Functions", "MAX OVER", "MIN OVER", "PARTITION BY"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Core",
      patternTag: "Partition Min/Max Benchmark",
      description: `### Problem Statement
Databricks Infrastructure tracks each cluster's current active nodes relative to that cluster's all-time peak node count.

### Requirements
- Compute \`cluster_peak_nodes\` as \`MAX(active_nodes) OVER (PARTITION BY cluster_name)\`.
- Compute \`nodes_below_peak\` as \`MAX(active_nodes) OVER (PARTITION BY cluster_name) - active_nodes\`.
- Output columns: \`cluster_name\`, \`log_hour\`, \`active_nodes\`, \`cluster_peak_nodes\`, \`nodes_below_peak\`.
- Sort by \`cluster_name\` ascending, \`log_hour\` ascending.

### Input Schema
**cluster_logs** (id INT, cluster_name VARCHAR, log_hour TIMESTAMP, active_nodes INT)`,
      schemaSql: `CREATE TABLE cluster_logs (id INT PRIMARY KEY, cluster_name VARCHAR(40), log_hour TIMESTAMP, active_nodes INT);
INSERT INTO cluster_logs VALUES (1, 'etl-prod', '2025-01-01 08:00:00', 12), (2, 'etl-prod', '2025-01-01 09:00:00', 20), (3, 'etl-prod', '2025-01-01 10:00:00', 15), (4, 'ml-train', '2025-01-01 08:00:00', 32), (5, 'ml-train', '2025-01-01 09:00:00', 16);`,
      referenceSql: `SELECT cluster_name, log_hour, active_nodes, MAX(active_nodes) OVER (PARTITION BY cluster_name) AS cluster_peak_nodes, (MAX(active_nodes) OVER (PARTITION BY cluster_name) - active_nodes) AS nodes_below_peak FROM cluster_logs ORDER BY cluster_name ASC, log_hour ASC;`,
      expectedColumns: ["cluster_name", "log_hour", "active_nodes", "cluster_peak_nodes", "nodes_below_peak"],
      hints: ["Compute MAX(active_nodes) OVER (PARTITION BY cluster_name) inside SELECT."],
      explanation: "MAX() and MIN() over partitions make peak/baseline comparisons effortless on time-series telemetry.",
    }),
    makeBasicQ({
      number: 71,
      titleBody: "PayPal: Execution Order — WHERE Filters Rows BEFORE OVER() Runs",
      companies: ["PayPal", "Stripe"],
      topics: ["Window Functions", "WHERE", "SUM OVER", "PARTITION BY"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Core",
      patternTag: "WHERE vs Window Evaluation Order",
      description: `### Problem Statement
SQL evaluates \`WHERE\` **before** window functions. Verify this by calculating each merchant's share of **settled** volume only—failed/refunded rows must be excluded in \`WHERE\` so they don't inflate \`merchant_settled_total\`.

### Requirements
- Filter \`status = 'settled'\` in \`WHERE\`.
- Compute \`merchant_settled_total\` using \`SUM(amount) OVER (PARTITION BY merchant)\`.
- Output columns: \`txn_id\`, \`merchant\`, \`amount\`, \`merchant_settled_total\`.
- Sort by \`merchant\` ascending, \`txn_id\` ascending.

### Input Schema
**transactions** (txn_id INT, merchant VARCHAR, amount NUMERIC, status VARCHAR)`,
      schemaSql: `CREATE TABLE transactions (txn_id INT PRIMARY KEY, merchant VARCHAR, amount NUMERIC, status VARCHAR(20));
INSERT INTO transactions VALUES (1, 'Acme', 100.00, 'settled'), (2, 'Acme', 200.00, 'settled'), (3, 'Acme', 999.00, 'failed'), (4, 'Globex', 150.00, 'settled'), (5, 'Globex', 50.00, 'refunded');`,
      referenceSql: `SELECT txn_id, merchant, amount, SUM(amount) OVER (PARTITION BY merchant) AS merchant_settled_total FROM transactions WHERE status = 'settled' ORDER BY merchant ASC, txn_id ASC;`,
      expectedColumns: ["txn_id", "merchant", "amount", "merchant_settled_total"],
      hints: ["Simply add WHERE status = 'settled'—SQL runs WHERE before computing the OVER() window."],
      explanation: "Because WHERE runs before window functions, failed rows are removed before SUM() OVER() sums the partition.",
    }),
    makeBasicQ({
      number: 72,
      titleBody: "Amazon: Filtering Rows Using a Window Metric (CTE + Window)",
      companies: ["Amazon", "Google"],
      topics: ["Window Functions", "CTEs", "AVG OVER"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Applied",
      patternTag: "CTE Wrapping Window Filter",
      description: `### Problem Statement
While \`WHERE\` runs *before* window functions, you cannot write \`WHERE price > AVG(price) OVER (...)\` directly. Compute the window column inside a CTE first, then filter in the outer \`WHERE\`!

### Requirements
- CTE: select \`product_name\`, \`category\`, \`price\`, and \`ROUND(AVG(price) OVER (PARTITION BY category), 2) AS cat_avg\`.
- Outer SELECT: filter \`price > cat_avg\`.
- Output columns: \`category\`, \`product_name\`, \`price\`, \`cat_avg\`.
- Sort by \`category\` ascending, \`price\` descending, \`product_name\` ascending.

### Input Schema
**products** (id INT, category VARCHAR, product_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), price NUMERIC);
INSERT INTO products VALUES (1, 'Audio', 'Headphones', 250.00), (2, 'Audio', 'Earbuds', 50.00), (3, 'Audio', 'Speaker', 150.00), (4, 'Displays', 'OLED 4K', 800.00), (5, 'Displays', 'HD Monitor', 200.00);`,
      referenceSql: `WITH with_avg AS (SELECT category, product_name, price, ROUND(AVG(price) OVER (PARTITION BY category), 2) AS cat_avg FROM products) SELECT category, product_name, price, cat_avg FROM with_avg WHERE price > cat_avg ORDER BY category ASC, price DESC, product_name ASC;`,
      expectedColumns: ["category", "product_name", "price", "cat_avg"],
      hints: ["Compute cat_avg inside a CTE, then write WHERE price > cat_avg outside."],
      explanation: "Since SQL prohibits window functions in WHERE, wrapping the window in a CTE is the universal pattern.",
    }),
    makeBasicQ({
      number: 73,
      titleBody: "Shopify: Combining GROUP BY and SUM() OVER () in One Query",
      companies: ["Shopify", "Stripe"],
      topics: ["Window Functions", "GROUP BY", "SUM OVER", "ROUND"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Applied",
      patternTag: "GROUP BY + Window Combo",
      description: `### Problem Statement
Window functions evaluate **after** \`GROUP BY\`! That means you can group raw orders by \`category\` to get \`SUM(amount)\`, and simultaneously divide by \`SUM(SUM(amount)) OVER ()\` to get each category's share of total revenue—all in one query.

### Requirements
- Group \`orders\` by \`category\`, computing \`ROUND(SUM(amount), 2) AS cat_revenue\`.
- Compute \`revenue_share_pct\` = \`ROUND(SUM(amount) * 100.0 / SUM(SUM(amount)) OVER (), 2)\`.
- Output columns: \`category\`, \`cat_revenue\`, \`revenue_share_pct\`.
- Sort by \`cat_revenue\` descending, \`category\` ascending.

### Input Schema
**orders** (id INT, category VARCHAR, amount NUMERIC)`,
      schemaSql: `CREATE TABLE orders (id INT PRIMARY KEY, category VARCHAR(40), amount NUMERIC);
INSERT INTO orders VALUES (1, 'Electronics', 500.00), (2, 'Electronics', 300.00), (3, 'Apparel', 150.00), (4, 'Apparel', 50.00), (5, 'Home', 200.00);`,
      referenceSql: `SELECT category, ROUND(SUM(amount), 2) AS cat_revenue, ROUND(SUM(amount) * 100.0 / SUM(SUM(amount)) OVER (), 2) AS revenue_share_pct FROM orders GROUP BY category ORDER BY cat_revenue DESC, category ASC;`,
      expectedColumns: ["category", "cat_revenue", "revenue_share_pct"],
      hints: ["Yes, SUM(SUM(amount)) OVER () is valid SQL! The inner SUM runs during GROUP BY; the outer SUM() OVER () sums across all grouped rows."],
      explanation: "Because windowing runs after GROUP BY, SUM(SUM(col)) OVER () computes grand totals of grouped metrics without a CTE.",
    }),
    makeBasicQ({
      number: 74,
      titleBody: "Salesforce: Multi-Column PARTITION BY (Region + Quarter) Quota Share",
      companies: ["Salesforce", "HubSpot"],
      topics: ["Window Functions", "PARTITION BY", "SUM OVER", "CTEs"],
      category: "Window Functions",
      stage: S7,
      stageOrder: 7,
      rampStep: "Applied",
      patternTag: "Multi-Key PARTITION BY",
      description: `### Problem Statement
Just like \`GROUP BY a, b\`, \`PARTITION BY\` accepts multiple columns. Find sales reps whose closed deal total in a \`(region, quarter)\` accounts for **at least 50%** of that region-quarter's total bookings.

### Requirements
- CTE: compute \`rq_total = SUM(deal_amount) OVER (PARTITION BY region, quarter)\` and \`share_pct = ROUND(deal_amount * 100.0 / SUM(deal_amount) OVER (PARTITION BY region, quarter), 2)\`.
- Outer SELECT: filter \`share_pct >= 50.0\`.
- Output columns: \`region\`, \`quarter\`, \`rep_name\`, \`deal_amount\`, \`share_pct\`.
- Sort by \`quarter\` ascending, \`region\` ascending, \`share_pct\` descending.

### Input Schema
**rep_deals** (id INT, region VARCHAR, quarter VARCHAR, rep_name VARCHAR, deal_amount NUMERIC)`,
      schemaSql: `CREATE TABLE rep_deals (id INT PRIMARY KEY, region VARCHAR(20), quarter VARCHAR(10), rep_name VARCHAR(40), deal_amount NUMERIC);
INSERT INTO rep_deals VALUES (1, 'West', '2025-Q1', 'Nina', 60000), (2, 'West', '2025-Q1', 'Omar', 40000), (3, 'East', '2025-Q1', 'Liam', 30000), (4, 'East', '2025-Q1', 'Mia', 30000), (5, 'East', '2025-Q1', 'Noah', 40000);`,
      referenceSql: `WITH shares AS (SELECT region, quarter, rep_name, deal_amount, ROUND(deal_amount * 100.0 / SUM(deal_amount) OVER (PARTITION BY region, quarter), 2) AS share_pct FROM rep_deals) SELECT region, quarter, rep_name, deal_amount, share_pct FROM shares WHERE share_pct >= 50.0 ORDER BY quarter ASC, region ASC, share_pct DESC;`,
      expectedColumns: ["region", "quarter", "rep_name", "deal_amount", "share_pct"],
      hints: ["Separate multiple partition columns by comma: OVER (PARTITION BY region, quarter)."],
      explanation: "Multi-column PARTITION BY scopes window calculations to composite dimensions.",
    }),
  ];
}
