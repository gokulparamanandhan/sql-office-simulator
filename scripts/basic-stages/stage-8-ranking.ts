import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S8 = "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)";

export function getBasicStage8Ranking(): InterviewQuestion[] {
  return [
    makeBasicQ({
      number: 75,
      titleBody: "Spotify: Sequential Track Ranking with ROW_NUMBER()",
      companies: ["Spotify", "YouTube"],
      topics: ["ROW_NUMBER", "Window Functions", "ORDER BY"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Warm-up",
      patternTag: "ROW_NUMBER Basics",
      conceptPrimer: {
        title: "ROW_NUMBER(), RANK(), and DENSE_RANK()",
        mentalModel:
          "Ranking window functions number sorted rows starting at 1. ROW_NUMBER() always produces unique numbers (1, 2, 3, 4). RANK() gives ties the same rank and skips numbers (1, 2, 2, 4). DENSE_RANK() gives ties the same rank without gaps (1, 2, 2, 3).",
        syntaxTemplate: `SELECT
  track_title,
  streams,
  ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS seq_rank
FROM tracks;`,
        visualType: "window-ranking",
      },
      blueprintSql: `SELECT
  track_title,
  streams,
  ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS stream_rank
FROM tracks
ORDER BY stream_rank ASC;`,
      description: `### Problem Statement
Assign a strictly unique rank \`1, 2, 3, ...\` to tracks ordered from most streams to fewest streams using \`ROW_NUMBER()\`.

### Requirements
- Rank rows using \`ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC)\` as \`stream_rank\`.
- Output columns: \`track_title\`, \`streams\`, \`stream_rank\`.
- Sort by \`stream_rank\` ascending.

### Input Schema
**tracks** (id INT, track_title VARCHAR, streams INT)`,
      schemaSql: `CREATE TABLE tracks (id INT PRIMARY KEY, track_title VARCHAR(60), streams INT);
INSERT INTO tracks VALUES (1, 'Starlight', 950000), (2, 'Midnight Echo', 1200000), (3, 'Solar Drift', 780000), (4, 'Neon Pulse', 950000);`,
      referenceSql: `SELECT track_title, streams, ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS stream_rank FROM tracks ORDER BY stream_rank ASC;`,
      expectedColumns: ["track_title", "streams", "stream_rank"],
      hints: ["Include id ASC inside OVER (ORDER BY streams DESC, id ASC) to break ties deterministically."],
      explanation: "Adding a unique secondary sort column inside ROW_NUMBER() prevents random tie ordering.",
    }),
    makeBasicQ({
      number: 76,
      titleBody: "Duolingo: Comparing ROW_NUMBER vs RANK vs DENSE_RANK on Exact Ties",
      companies: ["Duolingo", "Kaggle"],
      topics: ["ROW_NUMBER", "RANK", "DENSE_RANK", "Window Functions"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Warm-up",
      patternTag: "Ranking Tie Behavior Comparison",
      description: `### Problem Statement
See the difference between all three ranking functions side-by-side on a leaderboard with tied XP scores!

### Requirements
- For each player, compute:
  - \`rn\` = \`ROW_NUMBER() OVER (ORDER BY xp DESC, player_name ASC)\`
  - \`rnk\` = \`RANK() OVER (ORDER BY xp DESC)\`
  - \`drnk\` = \`DENSE_RANK() OVER (ORDER BY xp DESC)\`
- Output columns: \`player_name\`, \`xp\`, \`rn\`, \`rnk\`, \`drnk\`.
- Sort by \`rn\` ascending.

### Input Schema
**league_scores** (id INT, player_name VARCHAR, xp INT)`,
      schemaSql: `CREATE TABLE league_scores (id INT PRIMARY KEY, player_name VARCHAR(40), xp INT);
INSERT INTO league_scores VALUES (1, 'Aria', 1500), (2, 'Ben', 1200), (3, 'Chloe', 1200), (4, 'Dan', 950);`,
      referenceSql: `SELECT player_name, xp, ROW_NUMBER() OVER (ORDER BY xp DESC, player_name ASC) AS rn, RANK() OVER (ORDER BY xp DESC) AS rnk, DENSE_RANK() OVER (ORDER BY xp DESC) AS drnk FROM league_scores ORDER BY rn ASC;`,
      expectedColumns: ["player_name", "xp", "rn", "rnk", "drnk"],
      hints: ["Do not include player_name inside RANK/DENSE_RANK ORDER BY—otherwise tied XP scores wouldn't tie!"],
      explanation: "Notice Ben & Chloe both get rnk=2 and drnk=2, while Dan gets rnk=4 (gap!) vs drnk=3 (no gap!).",
    }),
    makeBasicQ({
      number: 77,
      titleBody: "Netflix: Ranking Shows Within Each Genre (PARTITION BY + DENSE_RANK)",
      companies: ["Netflix", "Spotify"],
      topics: ["DENSE_RANK", "PARTITION BY", "Window Functions"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Core",
      patternTag: "Partitioned Ranking",
      description: `### Problem Statement
Rank TV shows independently inside each \`genre\` from highest rating to lowest using \`DENSE_RANK()\`, returning **all** shows and their within-genre rank.

### Requirements
- Compute \`genre_rank\` = \`DENSE_RANK() OVER (PARTITION BY genre ORDER BY rating DESC)\`.
- Output columns: \`genre\`, \`show_title\`, \`rating\`, \`genre_rank\`.
- Sort by \`genre\` ascending, \`genre_rank\` ascending, \`show_title\` ascending.

### Input Schema
**shows** (id INT, genre VARCHAR, show_title VARCHAR, rating NUMERIC)`,
      schemaSql: `CREATE TABLE shows (id INT PRIMARY KEY, genre VARCHAR(30), show_title VARCHAR(60), rating NUMERIC);
INSERT INTO shows VALUES (1, 'Sci-Fi', 'Dark', 9.4), (2, 'Sci-Fi', 'Severance', 9.4), (3, 'Sci-Fi', 'Foundation', 8.5), (4, 'Drama', 'Succession', 9.2), (5, 'Drama', 'The Bear', 8.9);`,
      referenceSql: `SELECT genre, show_title, rating, DENSE_RANK() OVER (PARTITION BY genre ORDER BY rating DESC) AS genre_rank FROM shows ORDER BY genre ASC, genre_rank ASC, show_title ASC;`,
      expectedColumns: ["genre", "show_title", "rating", "genre_rank"],
      hints: ["Add PARTITION BY genre inside OVER (...) so rankings restart at 1 for each genre."],
      explanation: "PARTITION BY restarts the ranking counter for every distinct group.",
    }),
    makeBasicQ({
      number: 78,
      titleBody: "Amazon: Highest-Priced Product per Category (CTE + ROW_NUMBER)",
      companies: ["Amazon", "Target"],
      topics: ["ROW_NUMBER", "CTEs", "PARTITION BY"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Core",
      patternTag: "Top-1 per Group (ROW_NUMBER)",
      blueprintSql: `WITH ranked AS (
  SELECT
    category,
    product_name,
    price,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC, product_name ASC) AS rn
  FROM products
)
SELECT category, product_name, price
FROM ranked
WHERE rn = 1
ORDER BY category ASC;`,
      description: `### Problem Statement
Now combine **Stage 6 (CTEs)** with **Stage 8 (Ranking)**! Find the single most expensive product in each category (break price ties alphabetically by \`product_name\` ascending).

### Requirements
- Rank products per \`category\` inside a CTE using \`ROW_NUMBER()\`.
- Filter \`WHERE rn = 1\` in the outer query.
- Output columns: \`category\`, \`product_name\`, \`price\`.
- Sort by \`category\` ascending.

### Input Schema
**products** (id INT, category VARCHAR, product_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), price NUMERIC);
INSERT INTO products VALUES (1, 'Audio', 'Studio Headphones', 350.00), (2, 'Audio', 'Bluetooth Speaker', 120.00), (3, 'Monitors', 'Pro Display', 900.00), (4, 'Monitors', 'Gaming Monitor', 900.00), (5, 'Monitors', 'Office Screen', 250.00);`,
      referenceSql: `WITH ranked AS (SELECT category, product_name, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC, product_name ASC) AS rn FROM products) SELECT category, product_name, price FROM ranked WHERE rn = 1 ORDER BY category ASC;`,
      expectedColumns: ["category", "product_name", "price"],
      hints: ["You cannot filter ROW_NUMBER() in WHERE directly—wrap it in a CTE first and filter WHERE rn = 1."],
      explanation: "CTE + ROW_NUMBER() + WHERE rn = 1 is the canonical Top-1-per-group interview pattern.",
    }),
    makeBasicQ({
      number: 79,
      titleBody: "Amazon: Top 2 Products per Category Preserving Ties (CTE + DENSE_RANK)",
      companies: ["Amazon", "Meta"],
      topics: ["DENSE_RANK", "CTEs", "Window Functions"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Core",
      patternTag: "Top-N with Ties (DENSE_RANK)",
      description: `### Problem Statement
Find the top 2 highest-revenue products per category. If two products tie for 1st or 2nd place, **include all tied products** without skipping subsequent ranks!

### Requirements
- Rank within each \`category_name\` ordered by \`revenue DESC\` using \`DENSE_RANK()\` inside a CTE.
- Filter for \`revenue_rank <= 2\`.
- Output columns: \`category_name\`, \`product_name\`, \`revenue\`, \`revenue_rank\`.
- Sort by \`category_name\` ascending, \`revenue_rank\` ascending, \`product_name\` ascending.

### Input Schema
**products** (id INT, category_name VARCHAR, product_name VARCHAR, revenue NUMERIC)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, category_name VARCHAR(40), product_name VARCHAR(60), revenue NUMERIC);
INSERT INTO products VALUES (101, 'Electronics', 'Echo Dot', 150000.00), (102, 'Electronics', 'Fire Stick 4K', 150000.00), (103, 'Electronics', 'Kindle Paperwhite', 110000.00), (104, 'Electronics', 'Echo Show', 90000.00), (105, 'Kitchen', 'Air Fryer XL', 85000.00), (106, 'Kitchen', 'Instant Pot Duo', 75000.00), (107, 'Kitchen', 'Blender Pro', 60000.00);`,
      referenceSql: `WITH ranked AS (SELECT category_name, product_name, revenue, DENSE_RANK() OVER (PARTITION BY category_name ORDER BY revenue DESC) AS revenue_rank FROM products) SELECT category_name, product_name, revenue, revenue_rank FROM ranked WHERE revenue_rank <= 2 ORDER BY category_name ASC, revenue_rank ASC, product_name ASC;`,
      expectedColumns: ["category_name", "product_name", "revenue", "revenue_rank"],
      hints: ["Use DENSE_RANK() (not RANK() or ROW_NUMBER()) so Echo Dot & Fire Stick tie at 1 and Kindle gets rank 2."],
      explanation: "DENSE_RANK() guarantees that ties never cause 2nd place to disappear when filtering rank <= 2.",
    }),
    makeBasicQ({
      number: 80,
      titleBody: "Google: Finding the 2nd Highest Salary in Each Department",
      companies: ["Google", "Meta"],
      topics: ["DENSE_RANK", "CTEs", "PARTITION BY"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Core",
      patternTag: "Nth Highest per Group",
      description: `### Problem Statement
A classic SQL interview favorite: find the employee(s) earning the **2nd highest distinct salary** in each department.

### Requirements
- Use \`DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)\` inside a CTE.
- Filter \`WHERE sal_rank = 2\`.
- Output columns: \`department\`, \`employee_name\`, \`salary\`.
- Sort by \`department\` ascending, \`employee_name\` ascending.

### Input Schema
**employees** (id INT, department VARCHAR, employee_name VARCHAR, salary INT)`,
      schemaSql: `CREATE TABLE employees (id INT PRIMARY KEY, department VARCHAR(30), employee_name VARCHAR(40), salary INT);
INSERT INTO employees VALUES (1, 'Eng', 'Alice', 200000), (2, 'Eng', 'Bob', 200000), (3, 'Eng', 'Carol', 175000), (4, 'Eng', 'Dave', 150000), (5, 'Sales', 'Eve', 140000), (6, 'Sales', 'Frank', 120000), (7, 'Sales', 'Grace', 120000);`,
      referenceSql: `WITH ranked AS (SELECT department, employee_name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS sal_rank FROM employees) SELECT department, employee_name, salary FROM ranked WHERE sal_rank = 2 ORDER BY department ASC, employee_name ASC;`,
      expectedColumns: ["department", "employee_name", "salary"],
      hints: ["With DENSE_RANK(), Alice & Bob tie at rank 1, so Carol correctly receives rank 2."],
      explanation: "DENSE_RANK() solves Nth-highest-per-group cleanly even when the top value is tied.",
    }),
    makeBasicQ({
      number: 81,
      titleBody: "Stripe: Keeping Only the Latest Webhook Status per Order (Deduplication)",
      companies: ["Stripe", "PayPal"],
      topics: ["ROW_NUMBER", "Deduplication", "CTEs"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Applied",
      patternTag: "Latest-Row Deduplication",
      description: `### Problem Statement
Webhook retries emit multiple status snapshots for the same \`order_id\`. Deduplicate the table so only the single most recent event (\`event_time DESC\`) remains per \`order_id\`.

### Requirements
- Use \`ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY event_time DESC, id DESC)\` inside a CTE.
- Keep only \`rn = 1\`.
- Output columns: \`order_id\`, \`status\`, \`event_time\`.
- Sort by \`order_id\` ascending.

### Input Schema
**webhook_events** (id INT, order_id INT, status VARCHAR, event_time TIMESTAMP)`,
      schemaSql: `CREATE TABLE webhook_events (id INT PRIMARY KEY, order_id INT, status VARCHAR(20), event_time TIMESTAMP);
INSERT INTO webhook_events VALUES (1, 501, 'pending', '2025-01-01 10:00:00'), (2, 501, 'paid', '2025-01-01 10:02:00'), (3, 502, 'pending', '2025-01-01 11:00:00'), (4, 502, 'failed', '2025-01-01 11:05:00'), (5, 503, 'paid', '2025-01-01 12:00:00');`,
      referenceSql: `WITH latest AS (SELECT order_id, status, event_time, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY event_time DESC, id DESC) AS rn FROM webhook_events) SELECT order_id, status, event_time FROM latest WHERE rn = 1 ORDER BY order_id ASC;`,
      expectedColumns: ["order_id", "status", "event_time"],
      hints: ["Order by event_time DESC inside ROW_NUMBER() so the newest snapshot gets rn = 1."],
      explanation: "ROW_NUMBER() = 1 partitioned by business key is the workhorse deduplication pattern in data engineering.",
    }),
    makeBasicQ({
      number: 82,
      titleBody: "Uber: Fastest 2 Pickup Times per Metro Area (Ascending Rank)",
      companies: ["Uber", "Lyft"],
      topics: ["ROW_NUMBER", "CTEs", "PARTITION BY"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Applied",
      patternTag: "Bottom-N / Fastest-N per Group",
      description: `### Problem Statement
Find the 2 fastest pickup wait times (\`wait_minutes ASC\`) in each city.

### Requirements
- Partition by \`city\` and order by \`wait_minutes ASC, driver_name ASC\` using \`ROW_NUMBER()\`.
- Return rows with \`rn <= 2\`.
- Output columns: \`city\`, \`driver_name\`, \`wait_minutes\`.
- Sort by \`city\` ascending, \`wait_minutes\` ascending, \`driver_name\` ascending.

### Input Schema
**pickups** (id INT, city VARCHAR, driver_name VARCHAR, wait_minutes INT)`,
      schemaSql: `CREATE TABLE pickups (id INT PRIMARY KEY, city VARCHAR(30), driver_name VARCHAR(40), wait_minutes INT);
INSERT INTO pickups VALUES (1, 'Chicago', 'Sam', 4), (2, 'Chicago', 'Tariq', 2), (3, 'Chicago', 'Uma', 7), (4, 'Boston', 'Victor', 3), (5, 'Boston', 'Wendy', 5), (6, 'Boston', 'Xander', 2);`,
      referenceSql: `WITH ranked AS (SELECT city, driver_name, wait_minutes, ROW_NUMBER() OVER (PARTITION BY city ORDER BY wait_minutes ASC, driver_name ASC) AS rn FROM pickups) SELECT city, driver_name, wait_minutes FROM ranked WHERE rn <= 2 ORDER BY city ASC, wait_minutes ASC, driver_name ASC;`,
      expectedColumns: ["city", "driver_name", "wait_minutes"],
      hints: ["Flip ORDER BY inside OVER (...) to ASC when looking for smallest/fastest values."],
      explanation: "Top-N and Bottom-N per group differ only in DESC vs ASC inside the window's ORDER BY.",
    }),
    makeBasicQ({
      number: 83,
      titleBody: "Etsy: Segmenting Shop Revenue into Quartiles with NTILE(4)",
      companies: ["Etsy", "Shopify"],
      topics: ["NTILE", "Window Functions", "GROUP BY"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Core",
      patternTag: "Quartile Bucketing (NTILE)",
      description: `### Problem Statement
Etsy Seller Analytics groups shops into 4 equal-sized revenue quartiles (\`1\` = highest quartile, \`4\` = lowest quartile).

### Requirements
- Sum \`order_amount\` per \`shop_name\` as \`total_revenue\`.
- Assign \`revenue_quartile\` using \`NTILE(4) OVER (ORDER BY SUM(order_amount) DESC, shop_name ASC)\`.
- Output columns: \`shop_name\`, \`total_revenue\`, \`revenue_quartile\`.
- Sort by \`revenue_quartile\` ascending, \`total_revenue\` descending, \`shop_name\` ascending.

### Input Schema
**shop_orders** (id INT, shop_name VARCHAR, order_amount NUMERIC)`,
      schemaSql: `CREATE TABLE shop_orders (id INT PRIMARY KEY, shop_name VARCHAR(40), order_amount NUMERIC);
INSERT INTO shop_orders VALUES (1, 'Clay Studio', 800), (2, 'Clay Studio', 400), (3, 'Linen Loom', 950), (4, 'Woodcraft', 600), (5, 'Candle Co', 300), (6, 'Paper Press', 200), (7, 'Bead Box', 150), (8, 'Moss Art', 500), (9, 'Brass Works', 700);`,
      referenceSql: `SELECT shop_name, SUM(order_amount) AS total_revenue, NTILE(4) OVER (ORDER BY SUM(order_amount) DESC, shop_name ASC) AS revenue_quartile FROM shop_orders GROUP BY shop_name ORDER BY revenue_quartile ASC, total_revenue DESC, shop_name ASC;`,
      expectedColumns: ["shop_name", "total_revenue", "revenue_quartile"],
      hints: ["Remember NTILE(4) runs after GROUP BY, so you can write ORDER BY SUM(order_amount) DESC inside OVER (...)."],
      explanation: "NTILE(n) divides sorted rows into n roughly equal buckets (quartiles, quintiles, deciles).",
    }),
    makeBasicQ({
      number: 84,
      titleBody: "Uber: Driver Weekly Fare Percentile Ranking (PERCENT_RANK)",
      companies: ["Uber", "Lyft"],
      topics: ["PERCENT_RANK", "ROUND", "PARTITION BY", "Window Functions"],
      category: "Window Functions",
      stage: S8,
      stageOrder: 8,
      rampStep: "Applied",
      patternTag: "Percentile Ranking",
      description: `### Problem Statement
Compute each driver's relative percentile standing (\`0.00\` to \`100.00\`) within their \`metro_area\` using \`PERCENT_RANK()\`.

### Requirements
- Compute \`fare_percentile\` = \`ROUND(PERCENT_RANK() OVER (PARTITION BY metro_area ORDER BY weekly_fares ASC)::NUMERIC * 100.0, 2)\`.
- Output columns: \`metro_area\`, \`driver_name\`, \`weekly_fares\`, \`fare_percentile\`.
- Sort by \`metro_area\` ascending, \`weekly_fares\` descending, \`driver_name\` ascending.

### Input Schema
**driver_earnings** (id INT, metro_area VARCHAR, driver_name VARCHAR, weekly_fares NUMERIC)`,
      schemaSql: `CREATE TABLE driver_earnings (id INT PRIMARY KEY, metro_area VARCHAR(50), driver_name VARCHAR(50), weekly_fares NUMERIC);
INSERT INTO driver_earnings VALUES (1, 'Dallas', 'Carlos R.', 1450.00), (2, 'Dallas', 'Sarah B.', 1200.00), (3, 'Dallas', 'Kevin L.', 950.00), (4, 'Dallas', 'Anita K.', 800.00), (5, 'Austin', 'David P.', 1800.00), (6, 'Austin', 'Maria T.', 1500.00), (7, 'Austin', 'James H.', 1100.00);`,
      referenceSql: `SELECT metro_area, driver_name, weekly_fares, ROUND(PERCENT_RANK() OVER (PARTITION BY metro_area ORDER BY weekly_fares ASC)::NUMERIC * 100.0, 2) AS fare_percentile FROM driver_earnings ORDER BY metro_area ASC, weekly_fares DESC, driver_name ASC;`,
      expectedColumns: ["metro_area", "driver_name", "weekly_fares", "fare_percentile"],
      hints: ["PERCENT_RANK() returns DOUBLE PRECISION in PostgreSQL—cast ::NUMERIC before ROUND(..., 2)."],
      explanation: "PERCENT_RANK() computes (rank - 1) / (total_rows - 1), normalizing distributions between 0% and 100%.",
    }),
  ];
}
