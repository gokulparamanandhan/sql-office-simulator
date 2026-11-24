import type { InterviewQuestion, ConceptPrimer, RampStep } from "../../src/lib/content/interview-questions";

/**
 * 9 upgraded Pre-Advanced Bridge questions replacing the 9 overly trivial PLAIN
 * questions previously in Intermediate (numbers 134, 136, 170, 172, 182, 183, 186, 190, 196).
 */
export const INTERMEDIATE_BRIDGE_UPGRADES: Record<number, Omit<InterviewQuestion, "id" | "number">> = {
  134: {
    title: "Kraken: Margin Account Consecutive Ratio Deterioration (LAG + Rolling Avg)",
    difficulty: "Medium",
    companies: ["Kraken", "Coinbase"],
    topics: ["LAG", "ROWS BETWEEN", "AVG OVER", "CTEs"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Applied",
    patternTag: "Rolling Baseline + LAG Alert",
    description: `### Problem Statement
Kraken Risk Engineering monitors margin accounts for rapid collateral deterioration. Flag account snapshots where the current collateral ratio is strictly below \`1.25\`, dropped compared to the prior snapshot, and is also below the account's trailing 3-snapshot rolling average ratio.

### Requirements
- Compute \`collateral_ratio = ROUND(collateral_usd / NULLIF(borrowed_usd, 0), 2)\` in CTE 1 (\`status = 'ACTIVE'\` and \`borrowed_usd > 0\`).
- In CTE 2, compute \`prev_ratio = LAG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC)\` and \`rolling_3_avg = ROUND(AVG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)\`.
- Filter where \`collateral_ratio < 1.25 AND prev_ratio IS NOT NULL AND collateral_ratio < prev_ratio AND collateral_ratio < rolling_3_avg\`.
- Output columns: \`account_id\`, \`checked_at\`, \`collateral_ratio\`, \`prev_ratio\`, \`rolling_3_avg\`.
- Sort by \`account_id\` ascending, \`checked_at\` ascending.

### Input Schema
**margin_snapshots** (id INT, account_id INT, checked_at TIMESTAMP, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR)`,
    schemaSql: `CREATE TABLE margin_snapshots (id INT PRIMARY KEY, account_id INT, checked_at TIMESTAMP, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR(20));
INSERT INTO margin_snapshots VALUES (1, 101, '2025-01-01 08:00:00', 15000, 10000, 'ACTIVE'), (2, 101, '2025-01-01 09:00:00', 13000, 10000, 'ACTIVE'), (3, 101, '2025-01-01 10:00:00', 11800, 10000, 'ACTIVE'), (4, 102, '2025-01-01 08:00:00', 12000, 10000, 'ACTIVE'), (5, 102, '2025-01-01 09:00:00', 12400, 10000, 'ACTIVE');`,
    starterSql: `-- Kraken: Margin Account Consecutive Ratio Deterioration\n-- Output: account_id, checked_at, collateral_ratio, prev_ratio, rolling_3_avg\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH ratios AS (SELECT account_id, checked_at, ROUND(collateral_usd / NULLIF(borrowed_usd, 0), 2) AS collateral_ratio FROM margin_snapshots WHERE status = 'ACTIVE' AND borrowed_usd > 0), win AS (SELECT account_id, checked_at, collateral_ratio, LAG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC) AS prev_ratio, ROUND(AVG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3_avg FROM ratios) SELECT account_id, checked_at, collateral_ratio, prev_ratio, rolling_3_avg FROM win WHERE collateral_ratio < 1.25 AND prev_ratio IS NOT NULL AND collateral_ratio < prev_ratio AND collateral_ratio < rolling_3_avg ORDER BY account_id ASC, checked_at ASC;`,
    expectedColumns: ["account_id", "checked_at", "collateral_ratio", "prev_ratio", "rolling_3_avg"],
    hints: ["Compute collateral_ratio in CTE 1, then run both LAG() and ROWS BETWEEN 2 PRECEDING in CTE 2."],
    explanation: "Combining LAG() with a rolling frame threshold detects worsening risk trends while filtering out recovering accounts.",
  },
  136: {
    title: "FactSet: Consecutive Earnings Beat Streaks (Intro Gaps & Islands)",
    difficulty: "Medium",
    companies: ["FactSet", "Bloomberg"],
    topics: ["ROW_NUMBER", "CTEs", "GROUP BY", "Window Functions"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Warm-up",
    patternTag: "Streak Key (seq - ROW_NUMBER)",
    conceptPrimer: {
      title: "Bridge to Gaps & Islands: Sequence Minus ROW_NUMBER()",
      mentalModel:
        "If a company beats consensus in quarters 1, 2, 3, misses in 4, and beats in 5, 6: numbering only the BEAT quarters (1, 2, 3, 4, 5) and subtracting from quarter_seq yields (1-1=0, 2-2=0, 3-3=0) and (5-4=1, 6-5=1)—grouping contiguous streaks automatically!",
      syntaxTemplate: `WITH beats AS (
  SELECT ticker, quarter_seq, quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq) AS grp
  FROM earnings WHERE actual_eps > consensus_eps
)
SELECT ticker, MAX(cnt) FROM (SELECT ticker, grp, COUNT(*) AS cnt FROM beats GROUP BY ticker, grp) s GROUP BY ticker;`,
      visualType: "window-ranking",
    },
    description: `### Problem Statement
FactSet Equity Research tracks consecutive quarterly earnings beats (\`actual_eps > consensus_eps\`). Find each company's longest consecutive beat streak (quarters are numbered sequentially via \`quarter_seq\`).

### Requirements
- Filter for quarters where \`actual_eps > consensus_eps\`.
- Compute \`island_key = quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq ASC)\`.
- Group by \`ticker\` and \`island_key\` to get each streak length, then output each ticker's \`longest_beat_streak\`.
- Output columns: \`ticker\`, \`longest_beat_streak\`.
- Sort by \`longest_beat_streak\` descending, \`ticker\` ascending.

### Input Schema
**company_earnings** (id INT, ticker VARCHAR, quarter_seq INT, actual_eps NUMERIC, consensus_eps NUMERIC)`,
    schemaSql: `CREATE TABLE company_earnings (id INT PRIMARY KEY, ticker VARCHAR(10), quarter_seq INT, actual_eps NUMERIC, consensus_eps NUMERIC);
INSERT INTO company_earnings VALUES (1, 'NVDA', 1, 1.10, 1.00), (2, 'NVDA', 2, 1.25, 1.15), (3, 'NVDA', 3, 1.40, 1.30), (4, 'NVDA', 4, 1.35, 1.45), (5, 'NVDA', 5, 1.60, 1.50), (6, 'AAPL', 1, 2.05, 2.00), (7, 'AAPL', 2, 1.95, 2.05), (8, 'AAPL', 3, 2.20, 2.10), (9, 'AAPL', 4, 2.30, 2.25);`,
    starterSql: `-- FactSet: Consecutive Earnings Beat Streaks (Intro Gaps & Islands)\n-- Output: ticker, longest_beat_streak\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH beats AS (SELECT ticker, quarter_seq, (quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq ASC)) AS island_key FROM company_earnings WHERE actual_eps > consensus_eps), streaks AS (SELECT ticker, island_key, COUNT(*) AS streak_len FROM beats GROUP BY ticker, island_key) SELECT ticker, MAX(streak_len) AS longest_beat_streak FROM streaks GROUP BY ticker ORDER BY longest_beat_streak DESC, ticker ASC;`,
    expectedColumns: ["ticker", "longest_beat_streak"],
    hints: ["Filter actual_eps > consensus_eps first, then subtract ROW_NUMBER() from quarter_seq."],
    explanation: "Subtracting ROW_NUMBER() from an integer sequence creates an invariant grouping key for consecutive streaks.",
  },
  170: {
    title: "DHL: Customs Clearance Latency vs Country Average & Port Ranking",
    difficulty: "Medium",
    companies: ["DHL", "FedEx"],
    topics: ["EXTRACT EPOCH", "AVG OVER", "DENSE_RANK", "CTEs"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    stageOrder: 4,
    rampStep: "Core",
    patternTag: "Multi-Window Benchmark + Rank",
    description: `### Problem Statement
DHL Global Customs identifies bottleneck clearance shipments. Compute each shipment's clearance hours, compare it against its destination country's average clearance hours, and rank delayed shipments (\`clearance_hours > country_avg_hours\`) per country.

### Requirements
- CTE 1: compute \`clearance_hours = ROUND(EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0, 2)\`.
- CTE 2: attach \`country_avg_hours = ROUND(AVG(clearance_hours) OVER (PARTITION BY destination_country), 2)\` and \`delay_rank = DENSE_RANK() OVER (PARTITION BY destination_country ORDER BY clearance_hours DESC)\`.
- Outer SELECT: filter \`clearance_hours > country_avg_hours\`.
- Output columns: \`destination_country\`, \`tracking_number\`, \`clearance_hours\`, \`country_avg_hours\`, \`delay_rank\`.
- Sort by \`destination_country\` ascending, \`delay_rank\` ascending, \`tracking_number\` ascending.

### Input Schema
**customs_shipments** (tracking_number VARCHAR, destination_country VARCHAR, arrival_time TIMESTAMP, clearance_time TIMESTAMP)`,
    schemaSql: `CREATE TABLE customs_shipments (tracking_number VARCHAR(20) PRIMARY KEY, destination_country VARCHAR(30), arrival_time TIMESTAMP, clearance_time TIMESTAMP);
INSERT INTO customs_shipments VALUES ('DHL-101', 'Germany', '2025-01-01 08:00:00', '2025-01-03 14:00:00'), ('DHL-102', 'Germany', '2025-01-01 10:00:00', '2025-01-02 10:00:00'), ('DHL-103', 'Germany', '2025-01-02 06:00:00', '2025-01-02 18:00:00'), ('DHL-201', 'Japan', '2025-01-01 09:00:00', '2025-01-04 09:00:00'), ('DHL-202', 'Japan', '2025-01-01 12:00:00', '2025-01-02 00:00:00');`,
    starterSql: `-- DHL: Customs Clearance Latency vs Country Average & Port Ranking\n-- Output: destination_country, tracking_number, clearance_hours, country_avg_hours, delay_rank\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH durations AS (SELECT tracking_number, destination_country, ROUND(EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0, 2) AS clearance_hours FROM customs_shipments), ranked AS (SELECT destination_country, tracking_number, clearance_hours, ROUND(AVG(clearance_hours) OVER (PARTITION BY destination_country), 2) AS country_avg_hours, DENSE_RANK() OVER (PARTITION BY destination_country ORDER BY clearance_hours DESC) AS delay_rank FROM durations) SELECT destination_country, tracking_number, clearance_hours, country_avg_hours, delay_rank FROM ranked WHERE clearance_hours > country_avg_hours ORDER BY destination_country ASC, delay_rank ASC, tracking_number ASC;`,
    expectedColumns: ["destination_country", "tracking_number", "clearance_hours", "country_avg_hours", "delay_rank"],
    hints: ["Compute clearance_hours first in CTE 1 so CTE 2 can run AVG() OVER and DENSE_RANK() cleanly."],
    explanation: "Multiple independent window functions can share the same CTE pass before outer threshold filtering.",
  },
  172: {
    title: "Zillow: Sparse-Date 7-Day Rolling Median/Avg Price Reduction (RANGE BETWEEN INTERVAL)",
    difficulty: "Medium",
    companies: ["Zillow", "Redfin"],
    topics: ["RANGE BETWEEN", "Window Frames", "AVG OVER", "ROUND"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Core",
    patternTag: "Calendar RANGE Frame (Sparse Dates)",
    conceptPrimer: {
      title: "RANGE BETWEEN INTERVAL on Sparse Time Series",
      mentalModel:
        "ROWS BETWEEN 6 PRECEDING counts 6 recorded rows—even if those rows were months apart! When dates have gaps, RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW looks strictly back 6 calendar days from each row's timestamp/date.",
      syntaxTemplate: `AVG(price) OVER (
  PARTITION BY zip_code
  ORDER BY price_date ASC
  RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
)`,
      visualType: "window-frame",
    },
    description: `### Problem Statement
Zillow Home Valuation tracks rolling 7-calendar-day average list prices per zip code—even when some days have **no** listings recorded. Use \`RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW\` so listings from 20 days ago aren't pulled into today's 7-day average!

### Requirements
- Partition by \`zip_code\`, order by \`listed_date ASC\`, and use \`RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW\`.
- Compute \`rolling_7d_calendar_avg\` rounded to 2 decimals.
- Output columns: \`zip_code\`, \`listed_date\`, \`list_price\`, \`rolling_7d_calendar_avg\`.
- Sort by \`zip_code\` ascending, \`listed_date\` ascending.

### Input Schema
**property_listings** (id INT, zip_code VARCHAR, listed_date TIMESTAMP, list_price NUMERIC)`,
    schemaSql: `CREATE TABLE property_listings (id INT PRIMARY KEY, zip_code VARCHAR(10), listed_date TIMESTAMP, list_price NUMERIC);
INSERT INTO property_listings VALUES (1, '78701', '2025-01-01 00:00:00', 500000), (2, '78701', '2025-01-05 00:00:00', 600000), (3, '78701', '2025-01-20 00:00:00', 900000), (4, '78701', '2025-01-23 00:00:00', 700000), (5, '98101', '2025-01-02 00:00:00', 800000);`,
    starterSql: `-- Zillow: Sparse-Date 7-Day Rolling Avg (RANGE BETWEEN INTERVAL)\n-- Output: zip_code, listed_date, list_price, rolling_7d_calendar_avg\nSELECT\n  -- Your code here\n;`,
    referenceSql: `SELECT zip_code, listed_date, list_price, ROUND(AVG(list_price) OVER (PARTITION BY zip_code ORDER BY listed_date ASC RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW), 2) AS rolling_7d_calendar_avg FROM property_listings ORDER BY zip_code ASC, listed_date ASC;`,
    expectedColumns: ["zip_code", "listed_date", "list_price", "rolling_7d_calendar_avg"],
    hints: ["Replace ROWS BETWEEN with RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW."],
    explanation: "Notice '2025-01-20' ignores '2025-01-05' (15 days earlier), whereas ROWS BETWEEN would have included it!",
  },
  182: {
    title: "Goodreads: Top 2 Highest-Rated Books per Genre Above 100 Reviews (CTE + DENSE_RANK)",
    difficulty: "Medium",
    companies: ["Goodreads", "Amazon"],
    topics: ["DENSE_RANK", "CTEs", "AVG OVER", "Window Functions"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 2: Window Partitioning & Ranking",
    stageOrder: 2,
    rampStep: "Core",
    patternTag: "Filtered Top-N + Partition Avg",
    description: `### Problem Statement
Goodreads Editorial curates the top 2 highest-rated books per genre that have at least 100 reviews, while also displaying each book's difference from its genre's qualified average rating.

### Requirements
- Filter \`review_count >= 100\` inside CTE 1.
- Compute \`genre_avg_rating = ROUND(AVG(avg_rating) OVER (PARTITION BY genre), 2)\` and \`genre_rank = DENSE_RANK() OVER (PARTITION BY genre ORDER BY avg_rating DESC, review_count DESC)\`.
- Keep \`genre_rank <= 2\`.
- Output columns: \`genre\`, \`title\`, \`avg_rating\`, \`genre_avg_rating\`, \`genre_rank\`.
- Sort by \`genre\` ascending, \`genre_rank\` ascending, \`title\` ascending.

### Input Schema
**book_catalog** (book_id INT, genre VARCHAR, title VARCHAR, avg_rating NUMERIC, review_count INT)`,
    schemaSql: `CREATE TABLE book_catalog (book_id INT PRIMARY KEY, genre VARCHAR(30), title VARCHAR(80), avg_rating NUMERIC, review_count INT);
INSERT INTO book_catalog VALUES (1, 'Sci-Fi', 'Dune', 4.70, 5000), (2, 'Sci-Fi', 'Project Hail Mary', 4.85, 4200), (3, 'Sci-Fi', 'Hidden Gem', 4.95, 40), (4, 'Sci-Fi', 'Hyperion', 4.45, 1200), (5, 'Fantasy', 'Mistborn', 4.65, 3100), (6, 'Fantasy', 'Way of Kings', 4.80, 4800);`,
    starterSql: `-- Goodreads: Top 2 Qualified Books per Genre\n-- Output: genre, title, avg_rating, genre_avg_rating, genre_rank\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH qualified AS (SELECT genre, title, avg_rating, review_count FROM book_catalog WHERE review_count >= 100), ranked AS (SELECT genre, title, avg_rating, ROUND(AVG(avg_rating) OVER (PARTITION BY genre), 2) AS genre_avg_rating, DENSE_RANK() OVER (PARTITION BY genre ORDER BY avg_rating DESC, review_count DESC) AS genre_rank FROM qualified) SELECT genre, title, avg_rating, genre_avg_rating, genre_rank FROM ranked WHERE genre_rank <= 2 ORDER BY genre ASC, genre_rank ASC, title ASC;`,
    expectedColumns: ["genre", "title", "avg_rating", "genre_avg_rating", "genre_rank"],
    hints: ["Exclude low-review books in CTE 1 so they neither rank nor skew genre_avg_rating."],
    explanation: "Pre-filtering noisy records in CTE 1 ensures both ranks and window averages reflect valid samples.",
  },
  183: {
    title: "Eventbrite: Two-Pass Burst Session Flagging (Intro Sessionization Prep)",
    difficulty: "Medium",
    companies: ["Eventbrite", "Ticketmaster"],
    topics: ["LAG", "SUM OVER", "CTEs", "Sessionization"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Applied",
    patternTag: "Two-Pass Sessionization Intro",
    conceptPrimer: {
      title: "Bridge to Sessionization: LAG Flag + Running SUM",
      mentalModel:
        "You cannot nest SUM(LAG(...)) OVER(...) in SQL. Instead, Pass 1 emits a 1 whenever the time gap since the prior row exceeds the threshold (or for row 1), and Pass 2 runs SUM(is_new_group) OVER (PARTITION BY user ORDER BY time ROWS UNBOUNDED PRECEDING) to assign burst IDs 1, 1, 2, 3...",
      syntaxTemplate: `WITH flags AS (
  SELECT user_id, event_time,
    CASE WHEN LAG(event_time) OVER (...) IS NULL OR event_time - LAG(event_time) OVER (...) > INTERVAL '15 minutes' THEN 1 ELSE 0 END AS is_new
  FROM events
)
SELECT user_id, event_time, SUM(is_new) OVER (PARTITION BY user_id ORDER BY event_time ROWS UNBOUNDED PRECEDING) AS burst_id
FROM flags;`,
      visualType: "cte-pipeline",
    },
    description: `### Problem Statement
Eventbrite Bot Detection groups rapid ticket checkout attempts into burst IDs. A new burst begins if a user's first attempt occurs or more than **15 minutes** have passed since their previous attempt.

### Requirements
- CTE 1: flag \`is_new_burst = 1\` when \`LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time)\` is \`NULL\` or \`attempt_time - LAG(...) > INTERVAL '15 minutes'\`, else \`0\`.
- Outer SELECT: compute \`burst_id = SUM(is_new_burst) OVER (PARTITION BY user_id ORDER BY attempt_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\`.
- Output columns: \`user_id\`, \`attempt_time\`, \`burst_id\`.
- Sort by \`user_id\` ascending, \`attempt_time\` ascending.

### Input Schema
**checkout_attempts** (id INT, user_id INT, attempt_time TIMESTAMP)`,
    schemaSql: `CREATE TABLE checkout_attempts (id INT PRIMARY KEY, user_id INT, attempt_time TIMESTAMP);
INSERT INTO checkout_attempts VALUES (1, 10, '2025-01-01 10:00:00'), (2, 10, '2025-01-01 10:05:00'), (3, 10, '2025-01-01 10:30:00'), (4, 10, '2025-01-01 10:35:00'), (5, 20, '2025-01-01 11:00:00');`,
    starterSql: `-- Eventbrite: Two-Pass Burst Session Flagging\n-- Output: user_id, attempt_time, burst_id\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH flags AS (SELECT user_id, attempt_time, CASE WHEN LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time ASC) IS NULL OR (attempt_time - LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time ASC)) > INTERVAL '15 minutes' THEN 1 ELSE 0 END AS is_new_burst FROM checkout_attempts) SELECT user_id, attempt_time, SUM(is_new_burst) OVER (PARTITION BY user_id ORDER BY attempt_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS burst_id FROM flags ORDER BY user_id ASC, attempt_time ASC;`,
    expectedColumns: ["user_id", "attempt_time", "burst_id"],
    hints: ["Put the LAG() check in CTE 1, then take a running SUM(is_new_burst) OVER (...) in the outer SELECT."],
    explanation: "This 2-pass LAG + running SUM pattern is the foundation of all clickstream sessionization in Advanced SQL.",
  },
  186: {
    title: "StubHub: Parsing JSONB Ticket Event Payloads & Price Drops (JSONB + LAG)",
    difficulty: "Medium",
    companies: ["StubHub", "Stripe"],
    topics: ["JSONB", "LAG", "CTEs", "ROUND"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Core",
    patternTag: "JSONB Extraction + LAG",
    conceptPrimer: {
      title: "Extracting Denormalized JSONB Fields in PostgreSQL",
      mentalModel:
        "Use payload->>'key' to extract a JSON field as TEXT, then cast numeric values with (payload->>'price')::NUMERIC. Clean JSON extraction inside CTE 1, then run standard window/GROUP BY analytics in CTE 2!",
      syntaxTemplate: `WITH parsed AS (
  SELECT id, payload->>'event' AS event_name, (payload->>'price')::NUMERIC AS price
  FROM raw_events
)
SELECT ... FROM parsed;`,
      visualType: "cte-pipeline",
    },
    description: `### Problem Statement
StubHub ingests price-update events as raw \`JSONB\` blobs (\`payload\`). Extract \`event_name\` and \`price\`, then detect price drops strictly exceeding 20% compared to the previous listing price for that same event.

### Requirements
- CTE 1: extract \`payload->>'event_name' AS event_name\` and \`(payload->>'price')::NUMERIC AS price\`.
- CTE 2: compute \`prev_price = LAG(price) OVER (PARTITION BY event_name ORDER BY updated_at ASC)\`.
- Outer SELECT: keep rows where \`prev_price IS NOT NULL AND price < prev_price\` and \`ROUND((prev_price - price) * 100.0 / NULLIF(prev_price, 0), 2) > 20.0\`.
- Output columns: \`event_name\`, \`updated_at\`, \`prev_price\`, \`price\`, \`drop_pct\`.
- Sort by \`drop_pct\` descending, \`event_name\` ascending.

### Input Schema
**listing_events** (id INT, updated_at TIMESTAMP, payload JSONB)`,
    schemaSql: `CREATE TABLE listing_events (id INT PRIMARY KEY, updated_at TIMESTAMP, payload JSONB);
INSERT INTO listing_events VALUES (1, '2025-01-01 10:00:00', '{"event_name": "Eras Tour", "price": 500}'), (2, '2025-01-01 11:00:00', '{"event_name": "Eras Tour", "price": 350}'), (3, '2025-01-01 12:00:00', '{"event_name": "Eras Tour", "price": 320}'), (4, '2025-01-01 10:00:00', '{"event_name": "NBA Finals", "price": 400}'), (5, '2025-01-01 11:00:00', '{"event_name": "NBA Finals", "price": 280}');`,
    starterSql: `-- StubHub: Parsing JSONB Payloads & Price Drops\n-- Output: event_name, updated_at, prev_price, price, drop_pct\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH parsed AS (SELECT updated_at, payload->>'event_name' AS event_name, (payload->>'price')::NUMERIC AS price FROM listing_events), lagged AS (SELECT event_name, updated_at, price, LAG(price) OVER (PARTITION BY event_name ORDER BY updated_at ASC) AS prev_price FROM parsed) SELECT event_name, updated_at, prev_price, price, ROUND((prev_price - price) * 100.0 / NULLIF(prev_price, 0), 2) AS drop_pct FROM lagged WHERE prev_price IS NOT NULL AND ROUND((prev_price - price) * 100.0 / NULLIF(prev_price, 0), 2) > 20.0 ORDER BY drop_pct DESC, event_name ASC;`,
    expectedColumns: ["event_name", "updated_at", "prev_price", "price", "drop_pct"],
    hints: ["Extract text via ->> and cast numbers with ::NUMERIC inside CTE 1."],
    explanation: "Parsing semi-structured JSONB in CTE 1 lets downstream CTEs treat it like clean relational columns.",
  },
  190: {
    title: "Kick: Pareto 80/20 Channel Watch-Hours Contribution (Cumulative Share CTE)",
    difficulty: "Medium",
    companies: ["Kick", "Twitch"],
    topics: ["CTEs", "SUM OVER", "ROWS BETWEEN", "ROUND"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    stageOrder: 4,
    rampStep: "Applied",
    patternTag: "Cumulative Pareto % Share",
    description: `### Problem Statement
Kick Creator Monetization runs a Pareto analysis to see which top channels drive cumulative platform watch hours.

### Requirements
- CTE 1: aggregate \`total_hours = SUM(hours_watched)\` per \`channel_name\`.
- Outer SELECT: order channels by \`total_hours DESC, channel_name ASC\`, and compute \`cumulative_pct\` = \`ROUND(SUM(total_hours) OVER (ORDER BY total_hours DESC, channel_name ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 / SUM(total_hours) OVER (), 2)\`.
- Output columns: \`channel_name\`, \`total_hours\`, \`cumulative_pct\`.
- Sort by \`total_hours\` descending, \`channel_name\` ascending.

### Input Schema
**channel_streams** (id INT, channel_name VARCHAR, hours_watched NUMERIC)`,
    schemaSql: `CREATE TABLE channel_streams (id INT PRIMARY KEY, channel_name VARCHAR(40), hours_watched NUMERIC);
INSERT INTO channel_streams VALUES (1, 'ApexPro', 300), (2, 'ApexPro', 200), (3, 'ChessKing', 300), (4, 'RetroPlay', 150), (5, 'IndieDev', 50);`,
    starterSql: `-- Kick: Pareto Cumulative Watch-Hours Contribution\n-- Output: channel_name, total_hours, cumulative_pct\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH ch_totals AS (SELECT channel_name, SUM(hours_watched) AS total_hours FROM channel_streams GROUP BY channel_name) SELECT channel_name, total_hours, ROUND(SUM(total_hours) OVER (ORDER BY total_hours DESC, channel_name ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 / SUM(total_hours) OVER (), 2) AS cumulative_pct FROM ch_totals ORDER BY total_hours DESC, channel_name ASC;`,
    expectedColumns: ["channel_name", "total_hours", "cumulative_pct"],
    hints: ["Divide a running SUM(...) OVER (ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) by the grand SUM(...) OVER ()."],
    explanation: "Cumulative Pareto % combines a running frame numerator with an unpartitioned OVER() denominator.",
  },
  196: {
    title: "Datadog: Recursive Service Dependency Depth (Intro WITH RECURSIVE)",
    difficulty: "Medium",
    companies: ["Datadog", "Google"],
    topics: ["WITH RECURSIVE", "Hierarchy", "CTEs"],
    frequency: "High",
    category: "Advanced SQL",
    orderSensitive: true,
    stage: "Inter Stage 5: Pre-Advanced Bridge",
    stageOrder: 5,
    rampStep: "Warm-up",
    patternTag: "WITH RECURSIVE Intro",
    conceptPrimer: {
      title: "Bridge to Advanced: Your First WITH RECURSIVE Tree",
      mentalModel:
        "WITH RECURSIVE repeats a query until no new rows appear. Part 1 (Anchor) selects root nodes (upstream_id IS NULL) with depth = 1. Part 2 (Recursive) joins the table back to the CTE itself (s.upstream_id = t.service_id) with depth + 1, connected by UNION ALL.",
      syntaxTemplate: `WITH RECURSIVE deps AS (
  SELECT id, name, 1 AS depth FROM services WHERE upstream_id IS NULL
  UNION ALL
  SELECT s.id, s.name, d.depth + 1 FROM services s JOIN deps d ON s.upstream_id = d.id
)
SELECT * FROM deps;`,
      visualType: "recursive-tree",
    },
    description: `### Problem Statement
Datadog Service Map traces microservice call dependencies. Starting from edge gateway services (\`upstream_id IS NULL\` at \`depth = 1\`), recursively compute the dependency depth of every downstream service.

### Requirements
- Anchor query: \`upstream_id IS NULL\`, \`depth = 1\`.
- Recursive step: join \`services s\` to the CTE on \`s.upstream_id = d.service_id\` incrementing \`depth + 1\`.
- Output columns: \`service_id\`, \`service_name\`, \`depth\`.
- Sort by \`depth\` ascending, \`service_id\` ascending.

### Input Schema
**services** (service_id INT, service_name VARCHAR, upstream_id INT)`,
    schemaSql: `CREATE TABLE services (service_id INT PRIMARY KEY, service_name VARCHAR(40), upstream_id INT);
INSERT INTO services VALUES (1, 'api-gateway', NULL), (2, 'auth-service', 1), (3, 'checkout-service', 1), (4, 'payment-worker', 3), (5, 'ledger-db-proxy', 4);`,
    starterSql: `-- Datadog: Recursive Service Dependency Depth\n-- Output: service_id, service_name, depth\nWITH RECURSIVE deps AS (\n  -- 1. Anchor\n  SELECT ...\n  UNION ALL\n  -- 2. Recursive step\n  SELECT ...\n)\nSELECT service_id, service_name, depth FROM deps ORDER BY depth ASC, service_id ASC;`,
    referenceSql: `WITH RECURSIVE deps AS (SELECT service_id, service_name, 1 AS depth FROM services WHERE upstream_id IS NULL UNION ALL SELECT s.service_id, s.service_name, d.depth + 1 FROM services s JOIN deps d ON s.upstream_id = d.service_id) SELECT service_id, service_name, depth FROM deps ORDER BY depth ASC, service_id ASC;`,
    expectedColumns: ["service_id", "service_name", "depth"],
    hints: ["Always connect the Anchor and Recursive SELECT using UNION ALL."],
    explanation: "Mastering simple depth traversal in Intermediate prepares you for full BOM explosions and breadcrumb paths in Advanced.",
  },
};

export const ADVANCED_OUTLIER_UPGRADES: Record<number, Omit<InterviewQuestion, "id" | "number">> = {
  280: {
    title: "Virtu Financial: Running Position Inventory & VWAP Cost Basis",
    difficulty: "Hard",
    companies: ["Virtu Financial", "Citadel"],
    topics: ["SUM OVER", "ROWS BETWEEN", "CTEs", "CASE WHEN"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    stage: "Adv Stage 4: Staff Engineering & Quant Capstones",
    stageOrder: 4,
    rampStep: "Applied",
    patternTag: "Running Inventory & VWAP",
    description: `### Problem Statement
Virtu Financial tracks real-time net share position and cumulative Volume-Weighted Average Price (VWAP) across sequential order fills per symbol.

### Requirements
- For each fill ordered by \`fill_time ASC, id ASC\` per \`symbol\`:
  - \`net_shares\` = running sum of \`CASE WHEN side = 'BUY' THEN shares ELSE -shares END\` using \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`.
  - \`running_buy_vwap\` = cumulative buy notional divided by cumulative buy shares up to current row (rounded to 2 decimals, \`NULL\` if zero buys so far).
- Output columns: \`symbol\`, \`fill_time\`, \`side\`, \`shares\`, \`price\`, \`net_shares\`, \`running_buy_vwap\`.
- Sort by \`symbol\` ascending, \`fill_time\` ascending, \`id\` ascending.

### Input Schema
**fills** (id INT, symbol VARCHAR, fill_time TIMESTAMP, side VARCHAR, shares INT, price NUMERIC)`,
    schemaSql: `CREATE TABLE fills (id INT PRIMARY KEY, symbol VARCHAR(10), fill_time TIMESTAMP, side VARCHAR(10), shares INT, price NUMERIC);
INSERT INTO fills VALUES (1, 'AAPL', '2025-01-01 09:30:00', 'BUY', 100, 180.00), (2, 'AAPL', '2025-01-01 09:31:00', 'BUY', 200, 183.00), (3, 'AAPL', '2025-01-01 09:32:00', 'SELL', 150, 185.00), (4, 'MSFT', '2025-01-01 09:30:00', 'BUY', 50, 400.00);`,
    starterSql: `-- Virtu Financial: Running Position Inventory & VWAP Cost Basis\n-- Output: symbol, fill_time, side, shares, price, net_shares, running_buy_vwap\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH cum AS (SELECT id, symbol, fill_time, side, shares, price, SUM(CASE WHEN side = 'BUY' THEN shares ELSE -shares END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS net_shares, SUM(CASE WHEN side = 'BUY' THEN shares * price ELSE 0 END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_buy_notional, SUM(CASE WHEN side = 'BUY' THEN shares ELSE 0 END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_buy_shares FROM fills) SELECT symbol, fill_time, side, shares, price, net_shares, ROUND(cum_buy_notional / NULLIF(cum_buy_shares, 0), 2) AS running_buy_vwap FROM cum ORDER BY symbol ASC, fill_time ASC, id ASC;`,
    expectedColumns: ["symbol", "fill_time", "side", "shares", "price", "net_shares", "running_buy_vwap"],
    hints: ["Compute cumulative buy notional and cumulative buy shares separately in CTE 1 with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."],
    explanation: "Tracking cumulative signed inventory and buy-side VWAP via parallel running frames is critical for execution quality reporting.",
  },
  300: {
    title: "Citadel Securities: Multi-Desk Portfolio Delta Netting, Fanout Defense & Risk Rank",
    difficulty: "Hard",
    companies: ["Citadel Securities", "Jane Street"],
    topics: ["CTEs", "Fanout Prevention", "DENSE_RANK", "SUM OVER"],
    frequency: "Very High",
    category: "Advanced SQL",
    orderSensitive: true,
    stage: "Adv Stage 4: Staff Engineering & Quant Capstones",
    stageOrder: 4,
    rampStep: "Applied",
    patternTag: "Staff Quant Risk Capstone",
    description: `### Problem Statement
Citadel Risk Engine computes net portfolio delta across equity positions and option contracts without causing Cartesian fanout across desks, then ranks the top riskiest underlying symbols by absolute net delta share.

### Requirements
- CTE 1 (\`equity_net\`): sum \`shares\` per \`underlying_symbol\` as \`equity_delta\`.
- CTE 2 (\`option_net\`): sum \`position_contracts * contract_delta * 100.0\` per \`underlying_symbol\` as \`option_delta\`.
- CTE 3 (\`combined\`): \`FULL OUTER JOIN\` \`equity_net\` and \`option_net\` via \`COALESCE(e.underlying_symbol, o.underlying_symbol)\`, computing \`net_delta = ROUND(COALESCE(equity_delta, 0) + COALESCE(option_delta, 0), 2)\` and \`required_hedge = ROUND(-1.0 * (COALESCE(equity_delta, 0) + COALESCE(option_delta, 0)), 2)\`.
- Final SELECT: attach \`risk_rank = DENSE_RANK() OVER (ORDER BY ABS(net_delta) DESC)\` and \`abs_risk_share_pct = ROUND(ABS(net_delta) * 100.0 / NULLIF(SUM(ABS(net_delta)) OVER (), 0), 2)\`.
- Output columns: \`underlying_symbol\`, \`net_delta\`, \`required_hedge\`, \`abs_risk_share_pct\`, \`risk_rank\`.
- Sort by \`risk_rank\` ascending, \`underlying_symbol\` ascending.

### Input Schema
**equity_positions** (id INT, underlying_symbol VARCHAR, shares NUMERIC)

**option_positions** (id INT, underlying_symbol VARCHAR, position_contracts INT, contract_delta NUMERIC)`,
    schemaSql: `CREATE TABLE equity_positions (id INT PRIMARY KEY, underlying_symbol VARCHAR(10), shares NUMERIC);
CREATE TABLE option_positions (id INT PRIMARY KEY, underlying_symbol VARCHAR(10), position_contracts INT, contract_delta NUMERIC);
INSERT INTO equity_positions VALUES (1, 'NVDA', 500), (2, 'NVDA', -200), (3, 'AAPL', 400);
INSERT INTO option_positions VALUES (1, 'NVDA', 10, 0.50), (2, 'TSLA', -15, 0.60), (3, 'TSLA', 5, -0.40);`,
    starterSql: `-- Citadel Securities: Multi-Desk Portfolio Delta Netting Capstone\n-- Output: underlying_symbol, net_delta, required_hedge, abs_risk_share_pct, risk_rank\nSELECT\n  -- Your code here\n;`,
    referenceSql: `WITH equity_net AS (SELECT underlying_symbol, SUM(shares) AS equity_delta FROM equity_positions GROUP BY underlying_symbol), option_net AS (SELECT underlying_symbol, SUM(position_contracts * contract_delta * 100.0) AS option_delta FROM option_positions GROUP BY underlying_symbol), combined AS (SELECT COALESCE(e.underlying_symbol, o.underlying_symbol) AS underlying_symbol, ROUND(COALESCE(e.equity_delta, 0) + COALESCE(o.option_delta, 0), 2) AS net_delta, ROUND(-1.0 * (COALESCE(e.equity_delta, 0) + COALESCE(o.option_delta, 0)), 2) AS required_hedge FROM equity_net e FULL OUTER JOIN option_net o ON e.underlying_symbol = o.underlying_symbol) SELECT underlying_symbol, net_delta, required_hedge, ROUND(ABS(net_delta) * 100.0 / NULLIF(SUM(ABS(net_delta)) OVER (), 0), 2) AS abs_risk_share_pct, DENSE_RANK() OVER (ORDER BY ABS(net_delta) DESC) AS risk_rank FROM combined ORDER BY risk_rank ASC, underlying_symbol ASC;`,
    expectedColumns: ["underlying_symbol", "net_delta", "required_hedge", "abs_risk_share_pct", "risk_rank"],
    hints: ["Pre-aggregate equity_positions and option_positions separately, then FULL OUTER JOIN on underlying_symbol."],
    explanation: "FULL OUTER JOIN on pre-aggregated CTEs safely merges disjoint asset books while computing portfolio-wide risk rankings.",
  },
};

/**
 * Classifies and enriches Intermediate & Advanced questions with smooth progressive ordering and metadata.
 */
export function orderAndEnrichIntermediate(raw: InterviewQuestion[]): InterviewQuestion[] {
  // Replace the 9 trivial PLAIN questions by their original number
  const upgraded = raw.map((q) => {
    const u = INTERMEDIATE_BRIDGE_UPGRADES[q.number];
    return u ? { ...q, ...u } : q;
  });

  // Sort into 5 smooth conceptual stages:
  // 1: Multi-Metric Aggregations & Joins (no OVER, no WITH)
  // 2: Window Basics & Ranking (OVER without LAG/LEAD/ROWS BETWEEN/WITH) or DENSE_RANK/NTILE/PERCENT_RANK
  // 3: Time-Series LAG/LEAD & Rolling Frames (LAG/LEAD/FIRST_VALUE/ROWS BETWEEN)
  // 4: Multi-CTE Fanout & Complex Business Pipelines (WITH + JOIN/GROUP)
  // 5: Pre-Advanced Bridge (explicit Stage 5)
  const getStageRank = (q: InterviewQuestion): { order: number; stage: string; ramp: RampStep; subWeight: number } => {
    if (q.stageOrder === 5 && q.stage) {
      return { order: 5, stage: q.stage, ramp: q.rampStep ?? "Applied", subWeight: q.number };
    }
    const sql = q.referenceSql.toUpperCase();
    const hasLagLead = /\b(LAG|LEAD|FIRST_VALUE|LAST_VALUE)\s*\(/.test(sql);
    const hasFrame = /(ROWS|RANGE)\s+BETWEEN/.test(sql);
    const hasRank = /\b(ROW_NUMBER|RANK|DENSE_RANK|NTILE|PERCENT_RANK)\s*\(/.test(sql);
    const hasWin = /\bOVER\s*\(/.test(sql);
    const hasCte = /\bWITH\b/.test(sql);

    if (!hasWin && !hasCte) {
      const hasJoinOrPct = /\bJOIN\b|\bPERCENTILE_CONT\b|\bEXTRACT\s*\(\s*EPOCH/i.test(sql);
      return {
        order: 1,
        stage: "Inter Stage 1: Analytical Aggregations & Joins",
        ramp: hasJoinOrPct ? "Core" : "Warm-up",
        subWeight: hasJoinOrPct ? 200 + q.number : q.number,
      };
    }
    if (hasWin && !hasLagLead && !hasFrame && (!hasCte || hasRank)) {
      return {
        order: 2,
        stage: "Inter Stage 2: Window Partitioning & Ranking",
        ramp: hasCte ? "Core" : "Warm-up",
        subWeight: (hasCte ? 200 : 0) + (hasRank ? 50 : 0) + q.number,
      };
    }
    if (hasLagLead || hasFrame) {
      return {
        order: 3,
        stage: "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
        ramp: hasFrame ? "Applied" : "Core",
        subWeight: (hasFrame ? 200 : 0) + (hasCte ? 100 : 0) + q.number,
      };
    }
    return {
      order: 4,
      stage: "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
      ramp: "Applied",
      subWeight: q.number,
    };
  };

  const sorted = [...upgraded].sort((a, b) => {
    const sa = getStageRank(a);
    const sb = getStageRank(b);
    if (sa.order !== sb.order) return sa.order - sb.order;
    if (sa.subWeight !== sb.subWeight) return sa.subWeight - sb.subWeight;
    return a.number - b.number;
  });

  return sorted.map((q, idx) => {
    const num = 101 + idx;
    const meta = getStageRank(q);
    const cleanTitle = q.title.replace(/^\d+\.\s*/, "");
    return {
      ...q,
      id: `inter-${num}`,
      number: num,
      title: `${num}. ${cleanTitle}`,
      stage: q.stage ?? meta.stage,
      stageOrder: q.stageOrder ?? meta.order,
      rampStep: q.rampStep ?? meta.ramp,
      patternTag: q.patternTag ?? q.topics[0] ?? q.category,
    };
  });
}

export function orderAndEnrichAdvanced(raw: InterviewQuestion[]): InterviewQuestion[] {
  const upgraded = raw.map((q) => {
    const u = ADVANCED_OUTLIER_UPGRADES[q.number];
    return u ? { ...q, ...u } : q;
  });

  const getStageRank = (q: InterviewQuestion): { order: number; stage: string; ramp: RampStep; subWeight: number } => {
    if (q.stageOrder === 4 && q.stage) {
      return { order: 4, stage: q.stage, ramp: q.rampStep ?? "Applied", subWeight: 900 + q.number };
    }
    const titleLower = q.title.toLowerCase();
    const sql = q.referenceSql.toUpperCase();
    const isRec = /\bWITH\s+RECURSIVE\b/.test(sql);
    const isDedupe = titleLower.includes("dedup") || titleLower.includes("reconciliation");
    const isFunnel = titleLower.includes("funnel");
    const isSession = titleLower.includes("sessionization");
    const isInterval = titleLower.includes("interval") || titleLower.includes("overlapping") || titleLower.includes("downtime") || titleLower.includes("consolidation");
    const isStreak = titleLower.includes("streak") || titleLower.includes("gaps");
    const isCohort = titleLower.includes("cohort") || titleLower.includes("retention");
    const isFifo = titleLower.includes("fifo");

    // Put the clean introductory examples (201..210 original archetypes) cleanly in Adv Stage 1, ordered from cleanest pattern (Dedupe/Funnel/Session/Hierarchy/Streak) -> harder (Cohort/Interval/BOM/FIFO/Arb)
    if (q.number <= 220) {
      const introOrder = isDedupe ? 1 : isFunnel ? 2 : isRec && !titleLower.includes("bom") ? 3 : isStreak ? 4 : isSession ? 5 : isInterval ? 6 : isCohort ? 7 : isFifo ? 8 : 9;
      return {
        order: 1,
        stage: "Adv Stage 1: Core Big-Tech Pattern Foundations",
        ramp: introOrder <= 4 ? "Warm-up" : "Core",
        subWeight: introOrder * 100 + q.number,
      };
    }

    if (isSession || isInterval || isDedupe) {
      return {
        order: 2,
        stage: "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
        ramp: "Core",
        subWeight: q.number,
      };
    }

    if (isRec || isCohort || isFunnel) {
      return {
        order: 3,
        stage: "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
        ramp: "Applied",
        subWeight: q.number,
      };
    }

    return {
      order: 4,
      stage: "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
      ramp: "Applied",
      subWeight: q.number,
    };
  };

  const sorted = [...upgraded].sort((a, b) => {
    const sa = getStageRank(a);
    const sb = getStageRank(b);
    if (sa.order !== sb.order) return sa.order - sb.order;
    if (sa.subWeight !== sb.subWeight) return sa.subWeight - sb.subWeight;
    return a.number - b.number;
  });

  return sorted.map((q, idx) => {
    const num = 201 + idx;
    const meta = getStageRank(q);
    const cleanTitle = q.title.replace(/^\d+\.\s*/, "");
    return {
      ...q,
      id: `adv-${num}`,
      number: num,
      title: `${num}. ${cleanTitle}`,
      stage: meta.stage,
      stageOrder: meta.order,
      rampStep: meta.ramp,
      patternTag: q.patternTag ?? q.topics[0] ?? q.category,
    };
  });
}
