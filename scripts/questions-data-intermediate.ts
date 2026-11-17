import { InterviewQuestion } from "../src/lib/content/interview-questions";

// Level 2: Intermediate (100 High-Quality Unique Interview Questions)
export function getIntermediateQuestions(): InterviewQuestion[] {
  return [
  {
    "id": "inter-101",
    "title": "101. Amazon: Top 2 Highest Revenue Products per Category with Ties",
    "difficulty": "Medium",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nAmazon Marketplace Analytics wants to benchmark leading products across retail categories. Find the top 2 highest revenue products in each category. If multiple products tie for a revenue rank, include all tied records without skipping subsequent ranks.\n\n### Requirements\n- Rank products within each category ordered by revenue descending.\n- Ensure no rank numbers are skipped after ties.\n- Filter to include only products ranked in the top 2.\n- Output columns: category_name, product_name, revenue, revenue_rank.\n- Sort by category_name ascending, revenue_rank ascending, then by product_name ascending.\n\n### Input Schema\n**categories** (id INT, name VARCHAR)\n\n**products** (id INT, category_id INT, name VARCHAR, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE categories (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE products (id INT PRIMARY KEY, category_id INT, name VARCHAR(100), revenue NUMERIC);\nINSERT INTO categories VALUES (1, 'Electronics'), (2, 'Kitchen');\nINSERT INTO products VALUES (101, 1, 'Echo Dot', 150000.00), (102, 1, 'Fire Stick 4K', 150000.00), (103, 1, 'Kindle Paperwhite', 110000.00), (104, 1, 'Echo Show', 90000.00), (105, 2, 'Air Fryer XL', 85000.00), (106, 2, 'Instant Pot Duo', 75000.00), (107, 2, 'Blender Pro', 60000.00);",
    "starterSql": "-- 101. Amazon: Top 2 Highest Revenue Products per Category with Ties\n-- Output: category_name, product_name, revenue, revenue_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT c.name AS category_name, p.name AS product_name, p.revenue, DENSE_RANK() OVER (PARTITION BY p.category_id ORDER BY p.revenue DESC) AS revenue_rank FROM products p JOIN categories c ON p.category_id = c.id) SELECT category_name, product_name, revenue, revenue_rank FROM ranked WHERE revenue_rank <= 2 ORDER BY category_name ASC, revenue_rank ASC, product_name ASC;",
    "expectedColumns": [
      "category_name",
      "product_name",
      "revenue",
      "revenue_rank"
    ],
    "hints": [
      "Use DENSE_RANK() partitioned by category_id.",
      "Filter where rank <= 2 in an outer query.",
      "Order by category_name ASC, revenue_rank ASC, product_name ASC."
    ],
    "explanation": "DENSE_RANK handles ties gracefully without skipping consecutive integers.",
    "number": 101
  },
  {
    "id": "inter-102",
    "title": "102. Spotify: Day-Over-Day Stream Velocity Difference for Top Artists",
    "difficulty": "Medium",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "topics": [
      "LAG",
      "Window Functions",
      "Date Comparison"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nSpotify Artist Insights measures daily track streaming momentum. Calculate the day-over-day stream count difference for artist tracks across consecutive dates.\n\n### Requirements\n- For each artist, compare each day's stream count against the previous calendar day's stream count.\n- If there is no prior day on record, output 0 as the daily difference.\n- Calculate daily_stream_delta as current day streams minus prior day streams.\n- Output columns: artist_name, stream_date, daily_streams, daily_stream_delta.\n- Sort by artist_name ascending, then by stream_date ascending.\n\n### Input Schema\n**daily_streams** (id INT, artist_name VARCHAR, stream_date DATE, stream_count INT)",
    "schemaSql": "CREATE TABLE daily_streams (id INT PRIMARY KEY, artist_name VARCHAR(50), stream_date DATE, stream_count INT);\nINSERT INTO daily_streams VALUES (1, 'Taylor Swift', '2025-01-01', 4500000), (2, 'Taylor Swift', '2025-01-02', 4850000), (3, 'Taylor Swift', '2025-01-03', 5200000), (4, 'Drake', '2025-01-01', 3800000), (5, 'Drake', '2025-01-02', 3600000), (6, 'Drake', '2025-01-03', 4100000);",
    "starterSql": "-- 102. Spotify: Day-Over-Day Stream Velocity Difference for Top Artists\n-- Output: artist_name, stream_date, daily_streams, daily_stream_delta\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT artist_name, stream_date, stream_count AS daily_streams, (stream_count - COALESCE(LAG(stream_count) OVER (PARTITION BY artist_name ORDER BY stream_date ASC), stream_count)) AS daily_stream_delta FROM daily_streams ORDER BY artist_name ASC, stream_date ASC;",
    "expectedColumns": [
      "artist_name",
      "stream_date",
      "daily_streams",
      "daily_stream_delta"
    ],
    "hints": [
      "Partition by artist_name and order by stream_date ascending.",
      "Use LAG to access the previous stream count.",
      "Subtract lagged streams from current streams."
    ],
    "explanation": "LAG enables comparing successive time series points within a partition.",
    "number": 102
  },
  {
    "id": "inter-103",
    "title": "103. Netflix: Rolling 7-Day Average Hours Watched per Subscriber",
    "difficulty": "Medium",
    "companies": [
      "Netflix",
      "YouTube"
    ],
    "topics": [
      "AVG",
      "Window Frames",
      "ROWS BETWEEN"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nNetflix Product Analytics tracks viewing habits over rolling weekly windows. Calculate the 7-day rolling average watch hours for each subscriber across their daily viewing log.\n\n### Requirements\n- Compute a 7-day rolling average (the current day and up to 6 preceding recorded days) for each user.\n- Round rolling_avg_hours to 2 decimal places.\n- Output columns: user_id, watch_date, hours_watched, rolling_avg_hours.\n- Sort by user_id ascending, then by watch_date ascending.\n\n### Input Schema\n**subscriber_viewing** (id INT, user_id INT, watch_date DATE, hours_watched NUMERIC)",
    "schemaSql": "CREATE TABLE subscriber_viewing (id INT PRIMARY KEY, user_id INT, watch_date DATE, hours_watched NUMERIC);\nINSERT INTO subscriber_viewing VALUES (1, 101, '2025-01-01', 3.5), (2, 101, '2025-01-02', 2.0), (3, 101, '2025-01-03', 4.0), (4, 101, '2025-01-04', 1.5), (5, 101, '2025-01-05', 5.0), (6, 101, '2025-01-06', 3.0), (7, 101, '2025-01-07', 4.5), (8, 102, '2025-01-01', 1.0), (9, 102, '2025-01-02', 2.5);",
    "starterSql": "-- 103. Netflix: Rolling 7-Day Average Hours Watched per Subscriber\n-- Output: user_id, watch_date, hours_watched, rolling_avg_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, watch_date, hours_watched, ROUND(AVG(hours_watched) OVER (PARTITION BY user_id ORDER BY watch_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_hours FROM subscriber_viewing ORDER BY user_id ASC, watch_date ASC;",
    "expectedColumns": [
      "user_id",
      "watch_date",
      "hours_watched",
      "rolling_avg_hours"
    ],
    "hints": [
      "Specify ROWS BETWEEN 6 PRECEDING AND CURRENT ROW.",
      "Partition by user_id ordered by watch_date ASC.",
      "Round result to 2 decimals."
    ],
    "explanation": "Rolling window frames smooth short-term variance in continuous telemetry.",
    "number": 103
  },
  {
    "id": "inter-104",
    "title": "104. Apple: Month-Over-Month App Revenue Growth Percentage",
    "difficulty": "Medium",
    "companies": [
      "Apple",
      "Google"
    ],
    "topics": [
      "LAG",
      "NULLIF",
      "ROUND",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nApple Developer Finance calculates developer growth velocity. Compute the Month-over-Month (MoM) revenue growth percentage for each mobile game in 2024.\n\n### Requirements\n- For each app, compare each month's revenue against the previous recorded month's revenue.\n- Calculate mom_growth_pct as (current_revenue - prev_revenue) * 100.0 / prev_revenue, rounded to 2 decimal places.\n- If there is no prior month on record, leave mom_growth_pct as NULL.\n- Output columns: app_name, report_month, current_revenue, prev_revenue, mom_growth_pct.\n- Sort by app_name ascending, then by report_month ascending.\n\n### Input Schema\n**monthly_game_revenue** (id INT, app_name VARCHAR, report_month DATE, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE monthly_game_revenue (id INT PRIMARY KEY, app_name VARCHAR(50), report_month DATE, revenue NUMERIC);\nINSERT INTO monthly_game_revenue VALUES (1, 'Gigi Rush', '2024-01-01', 50000.00), (2, 'Gigi Rush', '2024-02-01', 65000.00), (3, 'Gigi Rush', '2024-03-01', 72000.00), (4, 'Puzzle Master', '2024-01-01', 20000.00), (5, 'Puzzle Master', '2024-02-01', 18000.00), (6, 'Puzzle Master', '2024-03-01', 22500.00);",
    "starterSql": "-- 104. Apple: Month-Over-Month App Revenue Growth Percentage\n-- Output: app_name, report_month, current_revenue, prev_revenue, mom_growth_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT app_name, report_month, revenue AS current_revenue, LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC) AS prev_revenue FROM monthly_game_revenue) SELECT app_name, report_month, current_revenue, prev_revenue, ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS mom_growth_pct FROM lagged ORDER BY app_name ASC, report_month ASC;",
    "expectedColumns": [
      "app_name",
      "report_month",
      "current_revenue",
      "prev_revenue",
      "mom_growth_pct"
    ],
    "hints": [
      "Use LAG to fetch the previous month's revenue.",
      "Guard against division by zero with NULLIF.",
      "Calculate percentage change and round to 2 decimals."
    ],
    "explanation": "MoM velocity tracks SaaS and mobile app growth trajectory.",
    "number": 104
  },
  {
    "id": "inter-105",
    "title": "105. Google: Search Query Click Share within Product Category",
    "difficulty": "Medium",
    "companies": [
      "Google",
      "Amazon"
    ],
    "topics": [
      "SUM OVER",
      "Window Functions",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoogle Search Monetization analyzes click concentration. Calculate each search query's percentage share of total clicks within its respective industry vertical category.\n\n### Requirements\n- Compute total clicks across all queries in each category using an aggregate window function.\n- Calculate click_share_pct as query clicks divided by category total clicks multiplied by 100, rounded to 2 decimal places.\n- Output columns: category, query_text, clicks, category_total_clicks, click_share_pct.\n- Sort by category ascending, click_share_pct descending, then by query_text ascending.\n\n### Input Schema\n**search_clicks** (id INT, category VARCHAR, query_text VARCHAR, clicks INT)",
    "schemaSql": "CREATE TABLE search_clicks (id INT PRIMARY KEY, category VARCHAR(50), query_text VARCHAR(100), clicks INT);\nINSERT INTO search_clicks VALUES (1, 'Travel', 'cheap flights to paris', 4500), (2, 'Travel', 'best hotels tokyo', 3500), (3, 'Travel', 'car rental miami', 2000), (4, 'Finance', 'high yield savings account', 8000), (5, 'Finance', 'best credit card rewards', 12000);",
    "starterSql": "-- 105. Google: Search Query Click Share within Product Category\n-- Output: category, query_text, clicks, category_total_clicks, click_share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT category, query_text, clicks, SUM(clicks) OVER (PARTITION BY category) AS category_total_clicks, ROUND(clicks * 100.0 / SUM(clicks) OVER (PARTITION BY category), 2) AS click_share_pct FROM search_clicks ORDER BY category ASC, click_share_pct DESC, query_text ASC;",
    "expectedColumns": [
      "category",
      "query_text",
      "clicks",
      "category_total_clicks",
      "click_share_pct"
    ],
    "hints": [
      "Partition SUM(clicks) by category without an ORDER BY clause.",
      "Divide individual query clicks by partition total.",
      "Sort by category ASC, click_share_pct DESC."
    ],
    "explanation": "Window sums allow row-level comparison to group totals without self-joins.",
    "number": 105
  },
  {
    "id": "inter-106",
    "title": "106. Meta: Detecting Inactivity Gaps Between Consecutive User Posts",
    "difficulty": "Medium",
    "companies": [
      "Meta",
      "Twitter"
    ],
    "topics": [
      "LAG",
      "Date Arithmetic",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nMeta User Health analyzes posting cadence decay. Identify all instances where a creator waited strictly more than 7 days between consecutive social media posts.\n\n### Requirements\n- Compare each post's publication date with that user's immediately preceding post date.\n- Calculate days_since_last_post as post_date minus previous post date.\n- Filter for instances where days_since_last_post > 7.\n- Output columns: user_id, current_post_date, prev_post_date, days_since_last_post.\n- Sort by user_id ascending, then by current_post_date ascending.\n\n### Input Schema\n**creator_posts** (post_id INT, user_id INT, post_date DATE)",
    "schemaSql": "CREATE TABLE creator_posts (post_id INT PRIMARY KEY, user_id INT, post_date DATE);\nINSERT INTO creator_posts VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-04'), (3, 101, '2025-01-15'), (4, 101, '2025-01-20'), (5, 102, '2025-01-02'), (6, 102, '2025-01-18');",
    "starterSql": "-- 106. Meta: Detecting Inactivity Gaps Between Consecutive User Posts\n-- Output: user_id, current_post_date, prev_post_date, days_since_last_post\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH post_diffs AS (SELECT user_id, post_date AS current_post_date, LAG(post_date) OVER (PARTITION BY user_id ORDER BY post_date ASC) AS prev_post_date FROM creator_posts) SELECT user_id, current_post_date, prev_post_date, (current_post_date - prev_post_date) AS days_since_last_post FROM post_diffs WHERE (current_post_date - prev_post_date) > 7 ORDER BY user_id ASC, current_post_date ASC;",
    "expectedColumns": [
      "user_id",
      "current_post_date",
      "prev_post_date",
      "days_since_last_post"
    ],
    "hints": [
      "Use LAG in a CTE partitioned by user_id.",
      "Filter where date difference is greater than 7.",
      "Order by user_id ASC, current_post_date ASC."
    ],
    "explanation": "Inter-event gap analysis identifies retention and churn risks.",
    "number": 106
  },
  {
    "id": "inter-107",
    "title": "107. Uber: Driver Weekly Fare Percentile Ranking within Metro Area",
    "difficulty": "Medium",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "PERCENT_RANK",
      "ROUND",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nUber Driver Analytics calculates relative performance distribution. Compute the percentile rank of weekly gross fares for each driver within their home metropolitan area.\n\n### Requirements\n- Calculate the percentile rank of each driver's weekly fare within their metro area.\n- Multiply by 100 and round to 2 decimal places as fare_percentile.\n- Output columns: metro_area, driver_name, weekly_fares, fare_percentile.\n- Sort by metro_area ascending, weekly_fares descending, then by driver_name ascending.\n\n### Input Schema\n**driver_earnings** (id INT, metro_area VARCHAR, driver_name VARCHAR, weekly_fares NUMERIC)",
    "schemaSql": "CREATE TABLE driver_earnings (id INT PRIMARY KEY, metro_area VARCHAR(50), driver_name VARCHAR(50), weekly_fares NUMERIC);\nINSERT INTO driver_earnings VALUES (1, 'Dallas', 'Carlos R.', 1450.00), (2, 'Dallas', 'Sarah B.', 1200.00), (3, 'Dallas', 'Kevin L.', 950.00), (4, 'Dallas', 'Anita K.', 800.00), (5, 'Austin', 'David P.', 1800.00), (6, 'Austin', 'Maria T.', 1500.00), (7, 'Austin', 'James H.', 1100.00);",
    "starterSql": "-- 107. Uber: Driver Weekly Fare Percentile Ranking within Metro Area\n-- Output: metro_area, driver_name, weekly_fares, fare_percentile\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT metro_area, driver_name, weekly_fares, ROUND(PERCENT_RANK() OVER (PARTITION BY metro_area ORDER BY weekly_fares ASC)::NUMERIC * 100.0, 2) AS fare_percentile FROM driver_earnings ORDER BY metro_area ASC, weekly_fares DESC, driver_name ASC;",
    "expectedColumns": [
      "metro_area",
      "driver_name",
      "weekly_fares",
      "fare_percentile"
    ],
    "hints": [
      "Use PERCENT_RANK() partitioned by metro_area.",
      "Cast to numeric before multiplying by 100.0.",
      "Order by metro_area ASC, weekly_fares DESC."
    ],
    "explanation": "PERCENT_RANK normalizes distributions between 0 and 1.",
    "number": 107
  },
  {
    "id": "inter-108",
    "title": "108. Airbnb: Listing Price Variance vs Neighborhood Average Price",
    "difficulty": "Medium",
    "companies": [
      "Airbnb",
      "Zillow"
    ],
    "topics": [
      "AVG OVER",
      "ROUND",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nAirbnb Smart Pricing assists hosts in market positioning. Calculate how much higher or lower each listing's price is compared to the neighborhood average price.\n\n### Requirements\n- Compute the average nightly price for each neighborhood using a window function.\n- Calculate price_diff as listing price minus neighborhood average price, rounded to 2 decimal places.\n- Output columns: neighborhood, listing_name, price, avg_neighborhood_price, price_diff.\n- Sort by neighborhood ascending, price_diff descending, then by listing_name ascending.\n\n### Input Schema\n**neighborhood_listings** (id INT, neighborhood VARCHAR, listing_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE neighborhood_listings (id INT PRIMARY KEY, neighborhood VARCHAR(50), listing_name VARCHAR(100), price NUMERIC);\nINSERT INTO neighborhood_listings VALUES (1, 'SoHo', 'Cast Iron Loft', 420.00), (2, 'SoHo', 'Designer Penthouse', 650.00), (3, 'SoHo', 'Cozy Walkup', 250.00), (4, 'Williamsburg', 'Industrial Studio', 180.00), (5, 'Williamsburg', 'Waterfront Suite', 320.00), (6, 'Williamsburg', 'Sunny Bedroom', 110.00);",
    "starterSql": "-- 108. Airbnb: Listing Price Variance vs Neighborhood Average Price\n-- Output: neighborhood, listing_name, price, avg_neighborhood_price, price_diff\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT neighborhood, listing_name, price, ROUND(AVG(price) OVER (PARTITION BY neighborhood), 2) AS avg_neighborhood_price, ROUND(price - AVG(price) OVER (PARTITION BY neighborhood), 2) AS price_diff FROM neighborhood_listings ORDER BY neighborhood ASC, price_diff DESC, listing_name ASC;",
    "expectedColumns": [
      "neighborhood",
      "listing_name",
      "price",
      "avg_neighborhood_price",
      "price_diff"
    ],
    "hints": [
      "Compute AVG(price) OVER (PARTITION BY neighborhood).",
      "Subtract the average from listing price.",
      "Round results to 2 decimals."
    ],
    "explanation": "Variance against peer clusters guides competitive pricing models.",
    "number": 108
  },
  {
    "id": "inter-109",
    "title": "109. Stripe: Rapid Successive Card Charge Fraud Detection",
    "difficulty": "Medium",
    "companies": [
      "Stripe",
      "Adyen"
    ],
    "topics": [
      "LAG",
      "EXTRACT EPOCH",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nStripe Radar detects card testing bot attacks. Flag all charges from the same card number where another charge was executed within 60 seconds or less.\n\n### Requirements\n- Compare each charge's timestamp with the preceding charge timestamp on the same card_id.\n- Calculate seconds_elapsed as difference in seconds between consecutive charges.\n- Filter for instances where seconds_elapsed is <= 60.\n- Output columns: card_id, charge_id, current_amount, seconds_elapsed.\n- Sort by card_id ascending, then by charge_id ascending.\n\n### Input Schema\n**card_charges** (charge_id INT, card_id INT, amount NUMERIC, charge_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE card_charges (charge_id INT PRIMARY KEY, card_id INT, amount NUMERIC, charge_time TIMESTAMP);\nINSERT INTO card_charges VALUES (1, 101, 1.00, '2025-01-01 10:00:00'), (2, 101, 1.00, '2025-01-01 10:00:25'), (3, 101, 45.00, '2025-01-01 10:01:10'), (4, 102, 25.00, '2025-01-01 11:00:00'), (5, 102, 50.00, '2025-01-01 11:05:00');",
    "starterSql": "-- 109. Stripe: Rapid Successive Card Charge Fraud Detection\n-- Output: card_id, charge_id, current_amount, seconds_elapsed\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked_charges AS (SELECT card_id, charge_id, amount AS current_amount, charge_time, LAG(charge_time) OVER (PARTITION BY card_id ORDER BY charge_time ASC) AS prev_charge_time FROM card_charges) SELECT card_id, charge_id, current_amount, EXTRACT(EPOCH FROM (charge_time - prev_charge_time))::INT AS seconds_elapsed FROM ranked_charges WHERE EXTRACT(EPOCH FROM (charge_time - prev_charge_time)) <= 60 ORDER BY card_id ASC, charge_id ASC;",
    "expectedColumns": [
      "card_id",
      "charge_id",
      "current_amount",
      "seconds_elapsed"
    ],
    "hints": [
      "Use LAG(charge_time) partitioned by card_id.",
      "Extract epoch from timestamp difference.",
      "Filter where seconds <= 60 in outer query."
    ],
    "explanation": "Velocity filters catch automated script abuse in payment systems.",
    "number": 109
  },
  {
    "id": "inter-110",
    "title": "110. DoorDash: Preventing Cartesian Join Fanout on Multi-Item Order Totals",
    "difficulty": "Medium",
    "companies": [
      "DoorDash",
      "Instacart"
    ],
    "topics": [
      "CTEs",
      "GROUP BY",
      "Pre-Aggregation"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nDoorDash Financial Reporting audits line item revenue accuracy. When calculating restaurant order totals, joining orders to line items and then to refunds can multiply subtotals. Compute accurate order revenue by pre-aggregating items before joining.\n\n### Requirements\n- Pre-aggregate line items to calculate item_total per order.\n- Join restaurants, orders, and the pre-aggregated line item totals.\n- Calculate total restaurant food revenue as the sum of order item totals, rounded to 2 decimal places.\n- Output columns: restaurant_name, total_food_revenue.\n- Sort by total_food_revenue descending, then by restaurant_name ascending.\n\n### Input Schema\n**restaurants** (id INT, name VARCHAR)\n\n**orders** (id INT, restaurant_id INT)\n\n**line_items** (id INT, order_id INT, subtotal NUMERIC)",
    "schemaSql": "CREATE TABLE restaurants (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE orders (id INT PRIMARY KEY, restaurant_id INT);\nCREATE TABLE line_items (id INT PRIMARY KEY, order_id INT, subtotal NUMERIC);\nINSERT INTO restaurants VALUES (1, 'Burger Bistro'), (2, 'Sushi Zen');\nINSERT INTO orders VALUES (101, 1), (102, 1), (103, 2);\nINSERT INTO line_items VALUES (1, 101, 15.50), (2, 101, 8.50), (3, 102, 22.00), (4, 103, 45.00), (5, 103, 30.00);",
    "starterSql": "-- 110. DoorDash: Preventing Cartesian Join Fanout on Multi-Item Order Totals\n-- Output: restaurant_name, total_food_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH order_subtotals AS (SELECT order_id, SUM(subtotal) AS order_total FROM line_items GROUP BY order_id) SELECT r.name AS restaurant_name, ROUND(SUM(os.order_total), 2) AS total_food_revenue FROM restaurants r JOIN orders o ON r.id = o.restaurant_id JOIN order_subtotals os ON o.id = os.order_id GROUP BY r.name ORDER BY total_food_revenue DESC, restaurant_name ASC;",
    "expectedColumns": [
      "restaurant_name",
      "total_food_revenue"
    ],
    "hints": [
      "Aggregate line_items by order_id in a CTE first.",
      "Join restaurants to orders and the aggregated CTE.",
      "Sum order totals and round to 2 decimals."
    ],
    "explanation": "Pre-aggregating child tables avoids fanout duplication during joins.",
    "number": 110
  },
  {
    "id": "inter-111",
    "title": "111. Twitter: First-Touch vs Last-Touch Marketing Attribution",
    "difficulty": "Medium",
    "companies": [
      "Twitter",
      "Google"
    ],
    "topics": [
      "FIRST_VALUE",
      "LAST_VALUE",
      "Window Frames"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nTwitter Ad Conversion Engineering compares attribution touchpoints. For each user who signed up, identify the first campaign they touched and the last campaign they touched prior to conversion.\n\n### Requirements\n- Partition user touches by user_id ordered by touch_time ASC.\n- Identify first touched campaign using FIRST_VALUE.\n- Identify last touched campaign using LAST_VALUE with frame ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.\n- Output distinct rows with columns: user_id, first_campaign, last_campaign.\n- Sort by user_id ascending.\n\n### Input Schema\n**ad_touches** (id INT, user_id INT, campaign_name VARCHAR, touch_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE ad_touches (id INT PRIMARY KEY, user_id INT, campaign_name VARCHAR(50), touch_time TIMESTAMP);\nINSERT INTO ad_touches VALUES (1, 101, 'Summer Promo', '2025-01-01 10:00:00'), (2, 101, 'Retargeting Display', '2025-01-03 14:00:00'), (3, 101, 'Search Brand', '2025-01-05 09:00:00'), (4, 102, 'Influencer Shoutout', '2025-01-02 11:00:00'), (5, 102, 'Email Newsletter', '2025-01-04 16:30:00');",
    "starterSql": "-- 111. Twitter: First-Touch vs Last-Touch Marketing Attribution\n-- Output: user_id, first_campaign, last_campaign\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT DISTINCT user_id, FIRST_VALUE(campaign_name) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS first_campaign, LAST_VALUE(campaign_name) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_campaign FROM ad_touches ORDER BY user_id ASC;",
    "expectedColumns": [
      "user_id",
      "first_campaign",
      "last_campaign"
    ],
    "hints": [
      "Specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING for LAST_VALUE.",
      "Use SELECT DISTINCT to return one summary row per user.",
      "Order by user_id ASC."
    ],
    "explanation": "Default window frames terminate at CURRENT ROW; expanding the frame is necessary for LAST_VALUE.",
    "number": 111
  },
  {
    "id": "inter-112",
    "title": "112. LinkedIn: Cumulative Running Total of Job Applications",
    "difficulty": "Medium",
    "companies": [
      "LinkedIn",
      "Indeed"
    ],
    "topics": [
      "SUM OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nLinkedIn Recruiter measures application influx velocity. Calculate the cumulative running total of applications submitted for each corporate job posting over time.\n\n### Requirements\n- Compute a cumulative running total of applicants partitioned by job_title ordered by apply_date ASC.\n- Output columns: job_title, apply_date, daily_applicants, running_total_applicants.\n- Sort by job_title ascending, then by apply_date ascending.\n\n### Input Schema\n**job_applications** (id INT, job_title VARCHAR, apply_date DATE, daily_applicants INT)",
    "schemaSql": "CREATE TABLE job_applications (id INT PRIMARY KEY, job_title VARCHAR(50), apply_date DATE, daily_applicants INT);\nINSERT INTO job_applications VALUES (1, 'Data Engineer', '2025-01-01', 15), (2, 'Data Engineer', '2025-01-02', 25), (3, 'Data Engineer', '2025-01-03', 10), (4, 'Product Manager', '2025-01-01', 40), (5, 'Product Manager', '2025-01-02', 35);",
    "starterSql": "-- 112. LinkedIn: Cumulative Running Total of Job Applications\n-- Output: job_title, apply_date, daily_applicants, running_total_applicants\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT job_title, apply_date, daily_applicants, SUM(daily_applicants) OVER (PARTITION BY job_title ORDER BY apply_date ASC ROWS UNBOUNDED PRECEDING) AS running_total_applicants FROM job_applications ORDER BY job_title ASC, apply_date ASC;",
    "expectedColumns": [
      "job_title",
      "apply_date",
      "daily_applicants",
      "running_total_applicants"
    ],
    "hints": [
      "Partition by job_title and order by apply_date ASC.",
      "Use SUM(daily_applicants) OVER (...).",
      "Order final output by job_title ASC, apply_date ASC."
    ],
    "explanation": "Running totals show cumulative volume trajectories without subqueries.",
    "number": 112
  },
  {
    "id": "inter-113",
    "title": "113. TikTok: Video View Milestones Time-to-Reach 100K Views",
    "difficulty": "Medium",
    "companies": [
      "TikTok",
      "YouTube"
    ],
    "topics": [
      "ROW_NUMBER",
      "CTEs",
      "Date Arithmetic"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nTikTok Creator Operations tracks video virality speed. Find the exact date when each trending video first crossed 100,000 cumulative views.\n\n### Requirements\n- Calculate running cumulative views for each video over time.\n- Filter for rows where cumulative views >= 100000.\n- Extract the earliest date when this occurred.\n- Output columns: video_title, milestone_date, cumulative_views.\n- Sort by milestone_date ascending, then by video_title ascending.\n\n### Input Schema\n**daily_video_views** (id INT, video_title VARCHAR, view_date DATE, daily_views INT)",
    "schemaSql": "CREATE TABLE daily_video_views (id INT PRIMARY KEY, video_title VARCHAR(100), view_date DATE, daily_views INT);\nINSERT INTO daily_video_views VALUES (1, 'Dance Challenge #1', '2025-01-01', 40000), (2, 'Dance Challenge #1', '2025-01-02', 70000), (3, 'Dance Challenge #1', '2025-01-03', 30000), (4, 'Recipe Quick Tip', '2025-01-01', 50000), (5, 'Recipe Quick Tip', '2025-01-02', 40000), (6, 'Recipe Quick Tip', '2025-01-03', 25000);",
    "starterSql": "-- 113. TikTok: Video View Milestones Time-to-Reach 100K Views\n-- Output: video_title, milestone_date, cumulative_views\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum_views AS (SELECT video_title, view_date, SUM(daily_views) OVER (PARTITION BY video_title ORDER BY view_date ASC) AS cumulative_views FROM daily_video_views), crossed AS (SELECT video_title, view_date AS milestone_date, cumulative_views, ROW_NUMBER() OVER (PARTITION BY video_title ORDER BY view_date ASC) AS rn FROM cum_views WHERE cumulative_views >= 100000) SELECT video_title, milestone_date, cumulative_views FROM crossed WHERE rn = 1 ORDER BY milestone_date ASC, video_title ASC;",
    "expectedColumns": [
      "video_title",
      "milestone_date",
      "cumulative_views"
    ],
    "hints": [
      "Calculate running views with SUM() OVER.",
      "Filter cumulative_views >= 100000 in a subsequent CTE.",
      "Pick the first row using ROW_NUMBER() = 1."
    ],
    "explanation": "Milestone detection combines cumulative window sums with row-number threshold filters.",
    "number": 113
  },
  {
    "id": "inter-114",
    "title": "114. Snowflake: Cloud Data Warehouse Query Credit Spike Detection",
    "difficulty": "Medium",
    "companies": [
      "Snowflake",
      "Databricks"
    ],
    "topics": [
      "LAG",
      "ROUND",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nSnowflake FinOps monitors warehouse auto-suspend efficiency. Identify warehouse hours where credit consumption surged by more than 50% compared to the immediately preceding hour.\n\n### Requirements\n- Compare hourly credit usage to the prior hour using LAG.\n- Calculate percentage credit increase.\n- Filter for hours where credit usage increased by > 50%.\n- Output columns: warehouse_name, usage_hour, credits_used, prev_hour_credits.\n- Sort by credits_used descending, then by warehouse_name ascending.\n\n### Input Schema\n**warehouse_usage** (id INT, warehouse_name VARCHAR, usage_hour TIMESTAMP, credits_used NUMERIC)",
    "schemaSql": "CREATE TABLE warehouse_usage (id INT PRIMARY KEY, warehouse_name VARCHAR(50), usage_hour TIMESTAMP, credits_used NUMERIC);\nINSERT INTO warehouse_usage VALUES (1, 'ANALYTICS_WH', '2025-01-01 10:00:00', 4.0), (2, 'ANALYTICS_WH', '2025-01-01 11:00:00', 7.5), (3, 'ANALYTICS_WH', '2025-01-01 12:00:00', 8.0), (4, 'ETL_WH', '2025-01-01 10:00:00', 16.0), (5, 'ETL_WH', '2025-01-01 11:00:00', 18.0);",
    "starterSql": "-- 114. Snowflake: Cloud Data Warehouse Query Credit Spike Detection\n-- Output: warehouse_name, usage_hour, credits_used, prev_hour_credits\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT warehouse_name, usage_hour, credits_used, LAG(credits_used) OVER (PARTITION BY warehouse_name ORDER BY usage_hour ASC) AS prev_hour_credits FROM warehouse_usage) SELECT warehouse_name, usage_hour, credits_used, prev_hour_credits FROM lagged WHERE prev_hour_credits > 0 AND ((credits_used - prev_hour_credits) * 100.0 / prev_hour_credits) > 50.0 ORDER BY credits_used DESC, warehouse_name ASC;",
    "expectedColumns": [
      "warehouse_name",
      "usage_hour",
      "credits_used",
      "prev_hour_credits"
    ],
    "hints": [
      "Use LAG partitioned by warehouse_name.",
      "Calculate percentage change against prev_hour_credits.",
      "Filter where percentage change > 50."
    ],
    "explanation": "Cost anomaly detection relies on time-series lag comparisons.",
    "number": 114
  },
  {
    "id": "inter-115",
    "title": "115. Databricks: Cluster Auto-Scaling Event Peak Nodes Tracker",
    "difficulty": "Medium",
    "companies": [
      "Databricks",
      "Snowflake"
    ],
    "topics": [
      "MAX OVER",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nDatabricks Infrastructure monitors Spark cluster scaling events. For each cluster scaling event, calculate the peak worker instance count reached across all events within that cluster.\n\n### Requirements\n- Calculate the maximum worker_nodes reached per cluster across all event records.\n- Output columns: cluster_name, event_time, worker_nodes, cluster_peak_nodes.\n- Sort by cluster_name ascending, then by event_time ascending.\n\n### Input Schema\n**cluster_events** (id INT, cluster_name VARCHAR, event_time TIMESTAMP, worker_nodes INT)",
    "schemaSql": "CREATE TABLE cluster_events (id INT PRIMARY KEY, cluster_name VARCHAR(50), event_time TIMESTAMP, worker_nodes INT);\nINSERT INTO cluster_events VALUES (1, 'ML_Training_Cluster', '2025-01-01 08:00:00', 4), (2, 'ML_Training_Cluster', '2025-01-01 09:30:00', 16), (3, 'ML_Training_Cluster', '2025-01-01 11:00:00', 8), (4, 'Adhoc_Analytics', '2025-01-01 08:00:00', 2), (5, 'Adhoc_Analytics', '2025-01-01 10:00:00', 6);",
    "starterSql": "-- 115. Databricks: Cluster Auto-Scaling Event Peak Nodes Tracker\n-- Output: cluster_name, event_time, worker_nodes, cluster_peak_nodes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT cluster_name, event_time, worker_nodes, MAX(worker_nodes) OVER (PARTITION BY cluster_name) AS cluster_peak_nodes FROM cluster_events ORDER BY cluster_name ASC, event_time ASC;",
    "expectedColumns": [
      "cluster_name",
      "event_time",
      "worker_nodes",
      "cluster_peak_nodes"
    ],
    "hints": [
      "Use MAX(worker_nodes) OVER (PARTITION BY cluster_name).",
      "Omit ORDER BY inside the window to compute overall cluster peak.",
      "Sort output by cluster_name ASC, event_time ASC."
    ],
    "explanation": "Window aggregates without ORDER BY evaluate partition-wide extremes across all rows.",
    "number": 115
  },
  {
    "id": "inter-116",
    "title": "116. Instacart: Grocery Reorder Cadence Elapsed Days Between Baskets",
    "difficulty": "Medium",
    "companies": [
      "Instacart",
      "DoorDash"
    ],
    "topics": [
      "LAG",
      "Date Arithmetic",
      "AVG",
      "ROUND",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nInstacart Subscription Growth analyzes grocery replenish intervals. Calculate the average number of days between consecutive order checkouts for each customer.\n\n### Requirements\n- Find days elapsed between consecutive orders per user using LAG.\n- Compute average reorder days per user rounded to 2 decimal places.\n- Only include customers with at least 2 orders.\n- Output columns: customer_id, avg_days_between_orders.\n- Sort by avg_days_between_orders ascending, then by customer_id ascending.\n\n### Input Schema\n**customer_orders** (order_id INT, customer_id INT, order_date DATE)",
    "schemaSql": "CREATE TABLE customer_orders (order_id INT PRIMARY KEY, customer_id INT, order_date DATE);\nINSERT INTO customer_orders VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-08'), (3, 101, '2025-01-15'), (4, 102, '2025-01-02'), (5, 102, '2025-01-16'), (6, 103, '2025-01-10');",
    "starterSql": "-- 116. Instacart: Grocery Reorder Cadence Elapsed Days Between Baskets\n-- Output: customer_id, avg_days_between_orders\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH order_gaps AS (SELECT customer_id, order_date, LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS prev_date FROM customer_orders) SELECT customer_id, ROUND(AVG(order_date - prev_date), 2) AS avg_days_between_orders FROM order_gaps WHERE prev_date IS NOT NULL GROUP BY customer_id ORDER BY avg_days_between_orders ASC, customer_id ASC;",
    "expectedColumns": [
      "customer_id",
      "avg_days_between_orders"
    ],
    "hints": [
      "Calculate date differences in a CTE with LAG.",
      "Filter WHERE prev_date IS NOT NULL.",
      "Group by customer_id and calculate AVG()."
    ],
    "explanation": "Replenishment cadence informs automated cart reminders and subscription discounts.",
    "number": 116
  },
  {
    "id": "inter-117",
    "title": "117. Robinhood: Running Portfolio Cash Balance with Deposits & Withdrawals",
    "difficulty": "Medium",
    "companies": [
      "Robinhood",
      "Coinbase"
    ],
    "topics": [
      "SUM OVER",
      "CASE WHEN",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nRobinhood Ledger Services tracks user cash movements. Reconstruct each user's sequential account cash balance across a timeline of deposits, withdrawals, and stock trades.\n\n### Requirements\n- Treat 'DEPOSIT' and 'SELL' as positive cash flow.\n- Treat 'WITHDRAWAL' and 'BUY' as negative cash flow.\n- Calculate running cash balance ordered chronologically.\n- Output columns: user_id, transaction_time, transaction_type, amount, running_cash_balance.\n- Sort by user_id ascending, then by transaction_time ascending.\n\n### Input Schema\n**cash_ledger** (id INT, user_id INT, transaction_time TIMESTAMP, transaction_type VARCHAR, amount NUMERIC)",
    "schemaSql": "CREATE TABLE cash_ledger (id INT PRIMARY KEY, user_id INT, transaction_time TIMESTAMP, transaction_type VARCHAR(20), amount NUMERIC);\nINSERT INTO cash_ledger VALUES (1, 101, '2025-01-01 09:00:00', 'DEPOSIT', 5000.00), (2, 101, '2025-01-02 10:30:00', 'BUY', 3200.00), (3, 101, '2025-01-05 14:00:00', 'SELL', 1500.00), (4, 101, '2025-01-08 11:15:00', 'WITHDRAWAL', 1000.00), (5, 102, '2025-01-01 08:00:00', 'DEPOSIT', 2000.00), (6, 102, '2025-01-03 12:00:00', 'BUY', 1800.00);",
    "starterSql": "-- 117. Robinhood: Running Portfolio Cash Balance with Deposits & Withdrawals\n-- Output: user_id, transaction_time, transaction_type, amount, running_cash_balance\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, transaction_time, transaction_type, amount, ROUND(SUM(CASE WHEN transaction_type IN ('DEPOSIT', 'SELL') THEN amount ELSE -amount END) OVER (PARTITION BY user_id ORDER BY transaction_time ASC ROWS UNBOUNDED PRECEDING), 2) AS running_cash_balance FROM cash_ledger ORDER BY user_id ASC, transaction_time ASC;",
    "expectedColumns": [
      "user_id",
      "transaction_time",
      "transaction_type",
      "amount",
      "running_cash_balance"
    ],
    "hints": [
      "Use CASE WHEN to sign amounts appropriately.",
      "Apply cumulative SUM OVER partitioned by user_id.",
      "Round running balance to 2 decimals."
    ],
    "explanation": "Sequential ledger balances model double-entry bookkeeping ledgers.",
    "number": 117
  },
  {
    "id": "inter-118",
    "title": "118. Pinterest: 3rd Highest Saved Pin in Each Visual Category",
    "difficulty": "Medium",
    "companies": [
      "Pinterest",
      "Meta"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nPinterest Content Discovery identifies standout content. Find the 3rd most saved pin in each visual category without using LIMIT or OFFSET.\n\n### Requirements\n- Rank pins within each category ordered by saves descending.\n- Select only the pins that rank exactly 3rd (rank = 3).\n- Output columns: category, pin_title, saves.\n- Sort by category ascending, then by pin_title ascending.\n\n### Input Schema\n**visual_pins** (id INT, category VARCHAR, pin_title VARCHAR, saves INT)",
    "schemaSql": "CREATE TABLE visual_pins (id INT PRIMARY KEY, category VARCHAR(50), pin_title VARCHAR(100), saves INT);\nINSERT INTO visual_pins VALUES (1, 'Architecture', 'Glass House in Forest', 12000), (2, 'Architecture', 'Brutalist Concrete Villa', 9500), (3, 'Architecture', 'Scandinavian Cabin', 8100), (4, 'Architecture', 'Tokyo Micro Apartment', 6500), (5, 'Gardening', 'Urban Rooftop Garden', 15000), (6, 'Gardening', 'Hydroponic Herbs', 11000), (7, 'Gardening', 'Succulent Terrarium', 9200), (8, 'Gardening', 'Raised Vegetable Bed', 7000);",
    "starterSql": "-- 118. Pinterest: 3rd Highest Saved Pin in Each Visual Category\n-- Output: category, pin_title, saves\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked_pins AS (SELECT category, pin_title, saves, DENSE_RANK() OVER (PARTITION BY category ORDER BY saves DESC) AS rnk FROM visual_pins) SELECT category, pin_title, saves FROM ranked_pins WHERE rnk = 3 ORDER BY category ASC, pin_title ASC;",
    "expectedColumns": [
      "category",
      "pin_title",
      "saves"
    ],
    "hints": [
      "Use DENSE_RANK() OVER (PARTITION BY category ORDER BY saves DESC).",
      "Filter WHERE rnk = 3 in the outer query.",
      "Sort by category ASC, pin_title ASC."
    ],
    "explanation": "Finding N-th items per group is cleanly solved via ranking CTEs without LIMIT.",
    "number": 118
  },
  {
    "id": "inter-119",
    "title": "119. Discord: Voice Channel Concurrent Speaker Count Tracking",
    "difficulty": "Medium",
    "companies": [
      "Discord",
      "Slack"
    ],
    "topics": [
      "SUM OVER",
      "CASE WHEN",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nDiscord Audio Infrastructure calculates peak simultaneous voice participants. Reconstruct the active concurrent connected user count over a sequence of user join and leave events in a voice server channel.\n\n### Requirements\n- Treat event_type = 'JOIN' as +1 participant.\n- Treat event_type = 'LEAVE' as -1 participant.\n- Calculate concurrent_users as a running sum over time.\n- Output columns: channel_name, event_time, user_id, event_type, concurrent_users.\n- Sort by event_time ascending, then by user_id ascending.\n\n### Input Schema\n**voice_events** (id INT, channel_name VARCHAR, event_time TIMESTAMP, user_id INT, event_type VARCHAR)",
    "schemaSql": "CREATE TABLE voice_events (id INT PRIMARY KEY, channel_name VARCHAR(50), event_time TIMESTAMP, user_id INT, event_type VARCHAR(10));\nINSERT INTO voice_events VALUES (1, 'Gaming Voice 1', '2025-01-01 18:00:00', 101, 'JOIN'), (2, 'Gaming Voice 1', '2025-01-01 18:02:00', 102, 'JOIN'), (3, 'Gaming Voice 1', '2025-01-01 18:05:00', 103, 'JOIN'), (4, 'Gaming Voice 1', '2025-01-01 18:15:00', 101, 'LEAVE'), (5, 'Gaming Voice 1', '2025-01-01 18:20:00', 104, 'JOIN');",
    "starterSql": "-- 119. Discord: Voice Channel Concurrent Speaker Count Tracking\n-- Output: channel_name, event_time, user_id, event_type, concurrent_users\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT channel_name, event_time, user_id, event_type, SUM(CASE WHEN event_type = 'JOIN' THEN 1 ELSE -1 END) OVER (PARTITION BY channel_name ORDER BY event_time ASC ROWS UNBOUNDED PRECEDING) AS concurrent_users FROM voice_events ORDER BY event_time ASC, user_id ASC;",
    "expectedColumns": [
      "channel_name",
      "event_time",
      "user_id",
      "event_type",
      "concurrent_users"
    ],
    "hints": [
      "Use CASE WHEN to convert JOIN to +1 and LEAVE to -1.",
      "Apply running SUM OVER partitioned by channel_name.",
      "Order by event_time ASC, user_id ASC."
    ],
    "explanation": "Delta tracking of entry/exit events tracks instantaneous concurrency.",
    "number": 119
  },
  {
    "id": "inter-120",
    "title": "120. Slack: Channel Message Thread Depth and Reply Aggregations",
    "difficulty": "Medium",
    "companies": [
      "Slack",
      "Discord"
    ],
    "topics": [
      "COUNT",
      "LEFT JOIN",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "description": "### Problem Statement\nSlack Collaboration Analytics measures discussions in threads. For each top-level parent message (where parent_message_id IS NULL), count the number of direct thread replies it generated.\n\n### Requirements\n- Join messages to themselves on parent_message_id = id using a LEFT JOIN.\n- Count the number of replies each parent message received.\n- Output columns: parent_id, author, message_text, reply_count.\n- Sort by reply_count descending, then by parent_id ascending.\n\n### Input Schema\n**slack_messages** (id INT, parent_message_id INT, author VARCHAR, message_text VARCHAR)",
    "schemaSql": "CREATE TABLE slack_messages (id INT PRIMARY KEY, parent_message_id INT, author VARCHAR(50), message_text VARCHAR(100));\nINSERT INTO slack_messages VALUES (1, NULL, 'Alex C.', 'Should we migrate to Postgres 16?'), (2, 1, 'Sarah L.', 'Yes, great performance gains.'), (3, 1, 'Mark V.', 'I agree, tested it on staging.'), (4, 1, 'Elena R.', 'Approved from infra side.'), (5, NULL, 'David M.', 'Lunch ordering link is open.'), (6, 5, 'Chloe B.', 'Ordering now.'), (7, NULL, 'James H.', 'Sprint retrospective notes updated.');",
    "starterSql": "-- 120. Slack: Channel Message Thread Depth and Reply Aggregations\n-- Output: parent_id, author, message_text, reply_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT p.id AS parent_id, p.author, p.message_text, COUNT(r.id) AS reply_count FROM slack_messages p LEFT JOIN slack_messages r ON p.id = r.parent_message_id WHERE p.parent_message_id IS NULL GROUP BY p.id, p.author, p.message_text ORDER BY reply_count DESC, parent_id ASC;",
    "expectedColumns": [
      "parent_id",
      "author",
      "message_text",
      "reply_count"
    ],
    "hints": [
      "Perform a self-join where p.id = r.parent_message_id.",
      "Filter for root messages with p.parent_message_id IS NULL.",
      "Group by parent message attributes and COUNT(r.id)."
    ],
    "explanation": "Self-referential joins link threaded hierarchical responses to initial posts.",
    "number": 120
  },
  {
    "id": "inter-121",
    "title": "121. Zoom: Meeting Attendee Arrival Sequence and Duration",
    "difficulty": "Medium",
    "companies": [
      "Zoom",
      "Slack"
    ],
    "topics": [
      "ROW_NUMBER",
      "Date Arithmetic",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nZoom Enterprise Analytics measures video conference participation. Rank attendees by arrival order for each meeting and calculate each participant's attendance duration in full minutes.\n\n### Requirements\n- Assign arrival_rank to attendees in each meeting based on join_time.\n- Calculate minutes_attended as integer elapsed minutes between join_time and leave_time.\n- Output columns: meeting_id, attendee_name, arrival_rank, minutes_attended.\n- Sort by meeting_id ascending, arrival_rank ascending.\n\n### Input Schema\n**zoom_sessions** (id INT, meeting_id INT, attendee_name VARCHAR, join_time TIMESTAMP, leave_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE zoom_sessions (id INT PRIMARY KEY, meeting_id INT, attendee_name VARCHAR(50), join_time TIMESTAMP, leave_time TIMESTAMP);\nINSERT INTO zoom_sessions VALUES (1, 101, 'Alice', '2025-01-01 10:00:00', '2025-01-01 10:50:00'), (2, 101, 'Bob', '2025-01-01 10:02:00', '2025-01-01 10:45:00'), (3, 101, 'Charlie', '2025-01-01 10:05:00', '2025-01-01 10:35:00');",
    "starterSql": "-- 121. Zoom: Meeting Attendee Arrival Sequence and Duration\n-- Output: meeting_id, attendee_name, arrival_rank, minutes_attended\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT meeting_id, attendee_name, ROW_NUMBER() OVER (PARTITION BY meeting_id ORDER BY join_time ASC) AS arrival_rank, EXTRACT(EPOCH FROM (leave_time - join_time))::INT / 60 AS minutes_attended FROM zoom_sessions ORDER BY meeting_id ASC, arrival_rank ASC;",
    "expectedColumns": [
      "meeting_id",
      "attendee_name",
      "arrival_rank",
      "minutes_attended"
    ],
    "hints": [
      "Use ROW_NUMBER() partitioned by meeting_id.",
      "Compute minutes with EXTRACT(EPOCH FROM (leave_time - join_time))::INT / 60.",
      "Order by meeting_id ASC, arrival_rank ASC."
    ],
    "explanation": "Arrival sequence and session duration provide meeting engagement telemetry.",
    "number": 121
  },
  {
    "id": "inter-122",
    "title": "122. YouTube: Channel Milestone Date Reaching 50K Subscribers",
    "difficulty": "Medium",
    "companies": [
      "YouTube",
      "TikTok"
    ],
    "topics": [
      "SUM OVER",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nYouTube Creator Studio tracks subscriber growth thresholds. Find the earliest date on which each creator channel crossed 50,000 net cumulative subscribers.\n\n### Requirements\n- Compute cumulative running net subscribers for each channel.\n- Filter for rows where total subscribers >= 50000.\n- Return the earliest date this milestone was achieved.\n- Output columns: channel_name, milestone_date, total_subscribers.\n- Sort by milestone_date ascending, then by channel_name ascending.\n\n### Input Schema\n**yt_subscribers** (id INT, channel_name VARCHAR, event_date DATE, net_subs INT)",
    "schemaSql": "CREATE TABLE yt_subscribers (id INT PRIMARY KEY, channel_name VARCHAR(50), event_date DATE, net_subs INT);\nINSERT INTO yt_subscribers VALUES (1, 'TechReview', '2025-01-01', 20000), (2, 'TechReview', '2025-01-02', 25000), (3, 'TechReview', '2025-01-03', 10000), (4, 'CookingFun', '2025-01-01', 30000), (5, 'CookingFun', '2025-01-02', 25000);",
    "starterSql": "-- 122. YouTube: Channel Milestone Date Reaching 50K Subscribers\n-- Output: channel_name, milestone_date, total_subscribers\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT channel_name, event_date, SUM(net_subs) OVER (PARTITION BY channel_name ORDER BY event_date ASC) AS total_subscribers FROM yt_subscribers), ranked AS (SELECT channel_name, event_date AS milestone_date, total_subscribers, ROW_NUMBER() OVER (PARTITION BY channel_name ORDER BY event_date ASC) AS rn FROM cum WHERE total_subscribers >= 50000) SELECT channel_name, milestone_date, total_subscribers FROM ranked WHERE rn = 1 ORDER BY milestone_date ASC, channel_name ASC;",
    "expectedColumns": [
      "channel_name",
      "milestone_date",
      "total_subscribers"
    ],
    "hints": [
      "Calculate cumulative net_subs using SUM() OVER.",
      "Filter for >= 50000 and select the first occurrence with ROW_NUMBER() = 1.",
      "Order by milestone_date ASC, channel_name ASC."
    ],
    "explanation": "Creator monetization awards trigger upon crossing milestone thresholds.",
    "number": 122
  },
  {
    "id": "inter-123",
    "title": "123. PayPal: Transfer Velocity Ratio vs 7-Day Rolling Average",
    "difficulty": "Medium",
    "companies": [
      "PayPal",
      "Stripe"
    ],
    "topics": [
      "AVG OVER",
      "ROUND",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nPayPal Risk Operations monitors unusual outgoing transfers. Calculate the ratio between each transaction amount and the account's 7-day rolling average transfer volume.\n\n### Requirements\n- Compute a 7-day rolling average (current day and up to 6 preceding days) for each account.\n- Calculate velocity_ratio as transaction amount divided by rolling average, rounded to 2 decimal places.\n- Output columns: account_id, transfer_date, amount, rolling_avg, velocity_ratio.\n- Sort by velocity_ratio descending, then by account_id ascending.\n\n### Input Schema\n**pp_transfers** (id INT, account_id INT, transfer_date DATE, amount NUMERIC)",
    "schemaSql": "CREATE TABLE pp_transfers (id INT PRIMARY KEY, account_id INT, transfer_date DATE, amount NUMERIC);\nINSERT INTO pp_transfers VALUES (1, 101, '2025-01-01', 100.00), (2, 101, '2025-01-02', 120.00), (3, 101, '2025-01-03', 110.00), (4, 101, '2025-01-04', 150.00), (5, 101, '2025-01-05', 130.00), (6, 101, '2025-01-06', 140.00), (7, 101, '2025-01-07', 950.00);",
    "starterSql": "-- 123. PayPal: Transfer Velocity Ratio vs 7-Day Rolling Average\n-- Output: account_id, transfer_date, amount, rolling_avg, velocity_ratio\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT account_id, transfer_date, amount, ROUND(AVG(amount) OVER (PARTITION BY account_id ORDER BY transfer_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_avg, ROUND(amount / NULLIF(AVG(amount) OVER (PARTITION BY account_id ORDER BY transfer_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 0), 2) AS velocity_ratio FROM pp_transfers ORDER BY velocity_ratio DESC, account_id ASC;",
    "expectedColumns": [
      "account_id",
      "transfer_date",
      "amount",
      "rolling_avg",
      "velocity_ratio"
    ],
    "hints": [
      "Use AVG(amount) OVER (PARTITION BY account_id ORDER BY transfer_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
      "Divide amount by rolling average.",
      "Round both to 2 decimals."
    ],
    "explanation": "Spike ratios highlight outlier financial movements relative to individual baselines.",
    "number": 123
  },
  {
    "id": "inter-124",
    "title": "124. eBay: Fast Outbid Alerts Within 5 Minutes of Auction Bids",
    "difficulty": "Medium",
    "companies": [
      "eBay",
      "Amazon"
    ],
    "topics": [
      "LEAD",
      "Date Arithmetic",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\neBay Real-Time Auctions tracks bidding wars. Identify all bids that were outbid by a subsequent higher bid within 300 seconds on the same auction item.\n\n### Requirements\n- Compare each bid to the immediately following bid on the same auction using LEAD.\n- Calculate time_until_outbid_seconds as the difference in seconds.\n- Filter for bids where a subsequent bid occurred within 300 seconds.\n- Output columns: auction_id, bidder_id, bid_amount, time_until_outbid_seconds.\n- Sort by auction_id ascending, bid_amount descending.\n\n### Input Schema\n**ebay_live_bids** (id INT, auction_id INT, bidder_id INT, bid_amount NUMERIC, bid_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE ebay_live_bids (id INT PRIMARY KEY, auction_id INT, bidder_id INT, bid_amount NUMERIC, bid_time TIMESTAMP);\nINSERT INTO ebay_live_bids VALUES (1, 501, 10, 100.00, '2025-01-01 12:00:00'), (2, 501, 11, 110.00, '2025-01-01 12:02:30'), (3, 501, 12, 125.00, '2025-01-01 12:04:00'), (4, 502, 20, 50.00, '2025-01-01 13:00:00'), (5, 502, 21, 60.00, '2025-01-01 13:10:00');",
    "starterSql": "-- 124. eBay: Fast Outbid Alerts Within 5 Minutes of Auction Bids\n-- Output: auction_id, bidder_id, bid_amount, time_until_outbid_seconds\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH outbids AS (SELECT auction_id, bidder_id, bid_amount, EXTRACT(EPOCH FROM (LEAD(bid_time) OVER (PARTITION BY auction_id ORDER BY bid_time ASC) - bid_time))::INT AS time_until_outbid_seconds FROM ebay_live_bids) SELECT auction_id, bidder_id, bid_amount, time_until_outbid_seconds FROM outbids WHERE time_until_outbid_seconds IS NOT NULL AND time_until_outbid_seconds <= 300 ORDER BY auction_id ASC, bid_amount DESC;",
    "expectedColumns": [
      "auction_id",
      "bidder_id",
      "bid_amount",
      "time_until_outbid_seconds"
    ],
    "hints": [
      "Use LEAD(bid_time) partitioned by auction_id.",
      "Extract epoch in seconds between consecutive bids.",
      "Filter for non-null deltas <= 300."
    ],
    "explanation": "LEAD provides forward-looking time deltas to detect rapid competitive bidding.",
    "number": 124
  },
  {
    "id": "inter-125",
    "title": "125. Etsy: Artisan Shop Gross Revenue Quartile Segmentation",
    "difficulty": "Medium",
    "companies": [
      "Etsy",
      "Shopify"
    ],
    "topics": [
      "NTILE",
      "SUM",
      "GROUP BY",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nEtsy Creator Success segments artisan shops into 4 revenue quartiles based on total Gross Merchandise Value (GMV).\n\n### Requirements\n- Compute total GMV per shop by summing order amounts.\n- Assign revenue_quartile (1 to 4) using NTILE(4) ordered by total GMV descending.\n- Output columns: shop_name, total_gmv, revenue_quartile.\n- Sort by revenue_quartile ascending, total_gmv descending, then by shop_name ascending.\n\n### Input Schema\n**etsy_sales** (id INT, shop_name VARCHAR, order_amount NUMERIC)",
    "schemaSql": "CREATE TABLE etsy_sales (id INT PRIMARY KEY, shop_name VARCHAR(50), order_amount NUMERIC);\nINSERT INTO etsy_sales VALUES (1, 'Ceramic Studio', 15000), (2, 'Ceramic Studio', 5000), (3, 'Leather Goods', 12000), (4, 'Woodwork Co', 8000), (5, 'Knitting Nook', 4000), (6, 'Paper Craft', 1000);",
    "starterSql": "-- 125. Etsy: Artisan Shop Gross Revenue Quartile Segmentation\n-- Output: shop_name, total_gmv, revenue_quartile\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH shop_totals AS (SELECT shop_name, SUM(order_amount) AS total_gmv FROM etsy_sales GROUP BY shop_name) SELECT shop_name, total_gmv, NTILE(4) OVER (ORDER BY total_gmv DESC) AS revenue_quartile FROM shop_totals ORDER BY revenue_quartile ASC, total_gmv DESC, shop_name ASC;",
    "expectedColumns": [
      "shop_name",
      "total_gmv",
      "revenue_quartile"
    ],
    "hints": [
      "First aggregate total_gmv by shop_name in a CTE.",
      "Apply NTILE(4) OVER (ORDER BY total_gmv DESC).",
      "Order output by quartile ASC, total_gmv DESC."
    ],
    "explanation": "NTILE buckets continuous performance scores into equal-sized cohort tiers.",
    "number": 125
  },
  {
    "id": "inter-126",
    "title": "126. Zendesk: Support Ticket Multi-Hop Escalation Count",
    "difficulty": "Medium",
    "companies": [
      "Zendesk",
      "Salesforce"
    ],
    "topics": [
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nZendesk Customer Operations monitors complex customer issues. Find all support tickets that have undergone 2 or more distinct team escalations.\n\n### Requirements\n- Count distinct assigned_team entries for each ticket_id.\n- Filter for tickets with at least 2 distinct teams involved.\n- Output columns: ticket_id, customer_email, escalation_count.\n- Sort by escalation_count descending, then by ticket_id ascending.\n\n### Input Schema\n**ticket_escalations** (id INT, ticket_id INT, customer_email VARCHAR, assigned_team VARCHAR, escalated_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE ticket_escalations (id INT PRIMARY KEY, ticket_id INT, customer_email VARCHAR(50), assigned_team VARCHAR(50), escalated_at TIMESTAMP);\nINSERT INTO ticket_escalations VALUES (1, 1001, 'john@example.com', 'Tier 1 Support', '2025-01-01 09:00:00'), (2, 1001, 'john@example.com', 'Billing Ops', '2025-01-01 11:30:00'), (3, 1001, 'john@example.com', 'Engineering Escalations', '2025-01-01 15:00:00'), (4, 1002, 'sara@example.com', 'Tier 1 Support', '2025-01-02 10:00:00'), (5, 1002, 'sara@example.com', 'Tier 2 Support', '2025-01-02 14:00:00'), (6, 1003, 'mike@example.com', 'Tier 1 Support', '2025-01-03 12:00:00');",
    "starterSql": "-- 126. Zendesk: Support Ticket Multi-Hop Escalation Count\n-- Output: ticket_id, customer_email, escalation_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT ticket_id, customer_email, COUNT(DISTINCT assigned_team) AS escalation_count FROM ticket_escalations GROUP BY ticket_id, customer_email HAVING COUNT(DISTINCT assigned_team) >= 2 ORDER BY escalation_count DESC, ticket_id ASC;",
    "expectedColumns": [
      "ticket_id",
      "customer_email",
      "escalation_count"
    ],
    "hints": [
      "Group by ticket_id and customer_email.",
      "Use COUNT(DISTINCT assigned_team).",
      "Filter with HAVING COUNT(DISTINCT assigned_team) >= 2."
    ],
    "explanation": "HAVING isolates multi-touch escalation workflows requiring cross-functional interventions.",
    "number": 126
  },
  {
    "id": "inter-127",
    "title": "127. Salesforce: Enterprise Pipeline Stage Drop-Off Funnel Conversion",
    "difficulty": "Medium",
    "companies": [
      "Salesforce",
      "HubSpot"
    ],
    "topics": [
      "COUNT CASE WHEN",
      "ROUND",
      "Aggregations"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nSalesforce Revenue Operations evaluates deal pipeline conversion. For enterprise deals in Q1, compute the number of opportunities that reached 'Qualified', 'Proposal', and 'Closed Won', along with the win conversion rate.\n\n### Requirements\n- Count total deals reaching 'Qualified' as qualified_deals.\n- Count total deals reaching 'Closed Won' as won_deals.\n- Calculate win_rate_pct as won_deals divided by qualified_deals multiplied by 100, rounded to 2 decimal places.\n- Output columns: region, qualified_deals, won_deals, win_rate_pct.\n- Sort by win_rate_pct descending, then by region ascending.\n\n### Input Schema\n**sales_pipeline** (id INT, region VARCHAR, opp_name VARCHAR, current_stage VARCHAR)",
    "schemaSql": "CREATE TABLE sales_pipeline (id INT PRIMARY KEY, region VARCHAR(50), opp_name VARCHAR(100), current_stage VARCHAR(50));\nINSERT INTO sales_pipeline VALUES (1, 'North America', 'Acme Corp Upgrade', 'Closed Won'), (2, 'North America', 'Globex Expansion', 'Closed Won'), (3, 'North America', 'Initech Migration', 'Qualified'), (4, 'North America', 'Umbrella SaaS', 'Proposal'), (5, 'EMEA', 'Stark Industries', 'Closed Won'), (6, 'EMEA', 'Wayne Enterprises', 'Qualified'), (7, 'EMEA', 'Cyberdyne Systems', 'Lost');",
    "starterSql": "-- 127. Salesforce: Enterprise Pipeline Stage Drop-Off Funnel Conversion\n-- Output: region, qualified_deals, won_deals, win_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT region, COUNT(CASE WHEN current_stage IN ('Qualified', 'Proposal', 'Closed Won') THEN 1 END) AS qualified_deals, COUNT(CASE WHEN current_stage = 'Closed Won' THEN 1 END) AS won_deals, ROUND(COUNT(CASE WHEN current_stage = 'Closed Won' THEN 1 END) * 100.0 / NULLIF(COUNT(CASE WHEN current_stage IN ('Qualified', 'Proposal', 'Closed Won') THEN 1 END), 0), 2) AS win_rate_pct FROM sales_pipeline GROUP BY region ORDER BY win_rate_pct DESC, region ASC;",
    "expectedColumns": [
      "region",
      "qualified_deals",
      "won_deals",
      "win_rate_pct"
    ],
    "hints": [
      "Use conditional COUNT(CASE WHEN ... THEN 1 END) for funnel stages.",
      "Divide won deals by qualified deals and multiply by 100.0.",
      "Order by win_rate_pct DESC, region ASC."
    ],
    "explanation": "Conditional aggregation provides funnel conversion breakdowns without multiple joins.",
    "number": 127
  },
  {
    "id": "inter-128",
    "title": "128. HubSpot: Inbound Lead Form First Contact Response Time",
    "difficulty": "Medium",
    "companies": [
      "HubSpot",
      "Salesforce"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "AVG",
      "ROUND",
      "Date Arithmetic"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nHubSpot Marketing Automation audits sales rep response time. Calculate the average response time in minutes from when a marketing lead submits a form to when a sales rep makes the first outbound contact.\n\n### Requirements\n- Calculate minutes elapsed between form submission and first contact.\n- Compute avg_response_minutes per sales rep rounded to 2 decimal places.\n- Only include leads that received contact (first_contact_time IS NOT NULL).\n- Output columns: rep_name, leads_handled, avg_response_minutes.\n- Sort by avg_response_minutes ascending, then by rep_name ascending.\n\n### Input Schema\n**lead_inbound** (id INT, rep_name VARCHAR, form_submit_time TIMESTAMP, first_contact_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE lead_inbound (id INT PRIMARY KEY, rep_name VARCHAR(50), form_submit_time TIMESTAMP, first_contact_time TIMESTAMP);\nINSERT INTO lead_inbound VALUES (1, 'Sarah Jenkins', '2025-01-01 09:00:00', '2025-01-01 09:12:00'), (2, 'Sarah Jenkins', '2025-01-01 10:30:00', '2025-01-01 10:48:00'), (3, 'Mark Thompson', '2025-01-01 09:15:00', '2025-01-01 09:45:00'), (4, 'Mark Thompson', '2025-01-01 11:00:00', '2025-01-01 11:20:00'), (5, 'Elena Rostova', '2025-01-01 14:00:00', NULL);",
    "starterSql": "-- 128. HubSpot: Inbound Lead Form First Contact Response Time\n-- Output: rep_name, leads_handled, avg_response_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT rep_name, COUNT(id) AS leads_handled, ROUND(AVG(EXTRACT(EPOCH FROM (first_contact_time - form_submit_time)) / 60.0), 2) AS avg_response_minutes FROM lead_inbound WHERE first_contact_time IS NOT NULL GROUP BY rep_name ORDER BY avg_response_minutes ASC, rep_name ASC;",
    "expectedColumns": [
      "rep_name",
      "leads_handled",
      "avg_response_minutes"
    ],
    "hints": [
      "Filter WHERE first_contact_time IS NOT NULL.",
      "Extract epoch from difference and divide by 60.0.",
      "Compute AVG() and round to 2 decimals."
    ],
    "explanation": "Speed-to-lead response time directly impacts conversion rates in inbound sales funnels.",
    "number": 128
  },
  {
    "id": "inter-129",
    "title": "129. Asana: Cross-Project High Priority Blocker Tasks",
    "difficulty": "Medium",
    "companies": [
      "Asana",
      "Monday.com"
    ],
    "topics": [
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nAsana Project Portfolio Management identifies critical path dependency risks. Find all high-priority unresolved tasks that are cross-tagged across 2 or more distinct organizational projects.\n\n### Requirements\n- Filter for tasks where priority = 'High' and is_completed = FALSE.\n- Count distinct projects tagged for each task.\n- Only include tasks mapped to 2 or more distinct projects.\n- Output columns: task_title, project_count.\n- Sort by project_count descending, then by task_title ascending.\n\n### Input Schema\n**project_tasks** (id INT, task_title VARCHAR, project_name VARCHAR, priority VARCHAR, is_completed BOOLEAN)",
    "schemaSql": "CREATE TABLE project_tasks (id INT PRIMARY KEY, task_title VARCHAR(100), project_name VARCHAR(50), priority VARCHAR(20), is_completed BOOLEAN);\nINSERT INTO project_tasks VALUES (1, 'Migrate Auth to OAuth 2.1', 'Security Overhaul', 'High', FALSE), (2, 'Migrate Auth to OAuth 2.1', 'Mobile App V3', 'High', FALSE), (3, 'Migrate Auth to OAuth 2.1', 'Web Platform', 'High', FALSE), (4, 'Update Terms of Service', 'Legal Compliance', 'High', FALSE), (5, 'Update Terms of Service', 'Checkout Flow', 'High', FALSE), (6, 'Redesign Favicon', 'Brand Refresh', 'Low', FALSE), (7, 'Fix Button Padding', 'Web Platform', 'High', TRUE);",
    "starterSql": "-- 129. Asana: Cross-Project High Priority Blocker Tasks\n-- Output: task_title, project_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT task_title, COUNT(DISTINCT project_name) AS project_count FROM project_tasks WHERE priority = 'High' AND is_completed = FALSE GROUP BY task_title HAVING COUNT(DISTINCT project_name) >= 2 ORDER BY project_count DESC, task_title ASC;",
    "expectedColumns": [
      "task_title",
      "project_count"
    ],
    "hints": [
      "Filter WHERE priority = 'High' AND is_completed = FALSE.",
      "Group by task_title.",
      "Filter HAVING COUNT(DISTINCT project_name) >= 2."
    ],
    "explanation": "Shared cross-project blockers require executive prioritization across portfolio initiatives.",
    "number": 129
  },
  {
    "id": "inter-130",
    "title": "130. Square: Merchant POS Offline Batch Settlement Latency",
    "difficulty": "Medium",
    "companies": [
      "Square",
      "Stripe"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "AVG",
      "ROUND",
      "Business Analytics"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nSquare Point-of-Sale Infrastructure audits terminal offline payment batches. Calculate the average settlement delay in hours from card swipe time to final batch upload settlement.\n\n### Requirements\n- Calculate delay in hours between swipe_time and settled_time.\n- Compute avg_settlement_hours per merchant rounded to 2 decimal places.\n- Only consider settled batches (settled_time IS NOT NULL).\n- Output columns: merchant_name, total_swipes, avg_settlement_hours.\n- Sort by avg_settlement_hours descending, then by merchant_name ascending.\n\n### Input Schema\n**pos_settlements** (id INT, merchant_name VARCHAR, swipe_time TIMESTAMP, settled_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE pos_settlements (id INT PRIMARY KEY, merchant_name VARCHAR(50), swipe_time TIMESTAMP, settled_time TIMESTAMP);\nINSERT INTO pos_settlements VALUES (1, 'Blue Bottle Coffee', '2025-01-01 08:00:00', '2025-01-01 20:00:00'), (2, 'Blue Bottle Coffee', '2025-01-01 09:30:00', '2025-01-01 20:00:00'), (3, 'City Bakery', '2025-01-01 07:00:00', '2025-01-02 12:00:00'), (4, 'City Bakery', '2025-01-01 10:00:00', '2025-01-02 12:00:00'), (5, 'Food Truck Delite', '2025-01-01 12:00:00', '2025-01-01 15:00:00');",
    "starterSql": "-- 130. Square: Merchant POS Offline Batch Settlement Latency\n-- Output: merchant_name, total_swipes, avg_settlement_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT merchant_name, COUNT(id) AS total_swipes, ROUND(AVG(EXTRACT(EPOCH FROM (settled_time - swipe_time)) / 3600.0), 2) AS avg_settlement_hours FROM pos_settlements WHERE settled_time IS NOT NULL GROUP BY merchant_name ORDER BY avg_settlement_hours DESC, merchant_name ASC;",
    "expectedColumns": [
      "merchant_name",
      "total_swipes",
      "avg_settlement_hours"
    ],
    "hints": [
      "Filter WHERE settled_time IS NOT NULL.",
      "Extract epoch in seconds and divide by 3600.0 to convert to hours.",
      "Average and round to 2 decimals."
    ],
    "explanation": "Offline transactions introduce float and fraud risks if settlement batches are delayed.",
    "number": 130
  },
  {
    "id": "inter-131",
    "title": "131. Plaid: Multi-Bank Asset Holdings Consolidation",
    "difficulty": "Medium",
    "companies": [
      "Plaid",
      "Robinhood"
    ],
    "topics": [
      "SUM",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nPlaid Wealth Insights aggregates client financial health across institutions. Identify all users who hold accounts across 2 or more distinct bank institutions with combined balances exceeding $25,000.\n\n### Requirements\n- Count distinct bank_name institutions linked per user.\n- Sum total_balance across all accounts per user, rounded to 2 decimal places.\n- Filter for users with at least 2 distinct banks and total_balance > 25000.\n- Output columns: user_id, institutions_count, total_balance.\n- Sort by total_balance descending, then by user_id ascending.\n\n### Input Schema\n**user_accounts** (id INT, user_id INT, bank_name VARCHAR, balance NUMERIC)",
    "schemaSql": "CREATE TABLE user_accounts (id INT PRIMARY KEY, user_id INT, bank_name VARCHAR(50), balance NUMERIC);\nINSERT INTO user_accounts VALUES (1, 101, 'Chase', 18000.00), (2, 101, 'Bank of America', 12000.00), (3, 102, 'Wells Fargo', 35000.00), (4, 103, 'Citi', 15000.00), (5, 103, 'Chase', 14000.00), (6, 104, 'Schwab', 8000.00), (7, 104, 'Fidelity', 9000.00);",
    "starterSql": "-- 131. Plaid: Multi-Bank Asset Holdings Consolidation\n-- Output: user_id, institutions_count, total_balance\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, COUNT(DISTINCT bank_name) AS institutions_count, ROUND(SUM(balance), 2) AS total_balance FROM user_accounts GROUP BY user_id HAVING COUNT(DISTINCT bank_name) >= 2 AND SUM(balance) > 25000 ORDER BY total_balance DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "institutions_count",
      "total_balance"
    ],
    "hints": [
      "Group by user_id.",
      "Count distinct banks and sum balance.",
      "Filter with HAVING institutions_count >= 2 AND total_balance > 25000."
    ],
    "explanation": "Aggregation across federated financial institutions unlocks consolidated net worth modeling.",
    "number": 131
  },
  {
    "id": "inter-132",
    "title": "132. Coinbase: Cryptocurrency Limit Order Fill Slippage vs Target Price",
    "difficulty": "Medium",
    "companies": [
      "Coinbase",
      "Kraken"
    ],
    "topics": [
      "ROUND",
      "AVG",
      "ABS",
      "Business Analytics"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nCoinbase Exchange Execution Quality benchmarks institutional limit orders. Calculate the average execution slippage percentage between target limit price and executed fill price for filled buy orders.\n\n### Requirements\n- For order_type = 'BUY' and status = 'FILLED', compute slippage as ((fill_price - target_price) * 100.0 / target_price).\n- Compute average slippage percentage per crypto_pair, rounded to 4 decimal places.\n- Output columns: crypto_pair, filled_orders, avg_slippage_pct.\n- Sort by avg_slippage_pct ASC, crypto_pair ASC.\n\n### Input Schema\n**limit_orders** (id INT, crypto_pair VARCHAR, order_type VARCHAR, target_price NUMERIC, fill_price NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE limit_orders (id INT PRIMARY KEY, crypto_pair VARCHAR(20), order_type VARCHAR(10), target_price NUMERIC, fill_price NUMERIC, status VARCHAR(20));\nINSERT INTO limit_orders VALUES (1, 'BTC-USD', 'BUY', 95000.00, 95050.00, 'FILLED'), (2, 'BTC-USD', 'BUY', 95200.00, 95220.00, 'FILLED'), (3, 'ETH-USD', 'BUY', 3400.00, 3408.50, 'FILLED'), (4, 'ETH-USD', 'BUY', 3410.00, 3412.00, 'FILLED'), (5, 'SOL-USD', 'BUY', 180.00, 180.00, 'FILLED'), (6, 'BTC-USD', 'SELL', 96000.00, 95980.00, 'FILLED');",
    "starterSql": "-- 132. Coinbase: Cryptocurrency Limit Order Fill Slippage vs Target Price\n-- Output: crypto_pair, filled_orders, avg_slippage_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT crypto_pair, COUNT(id) AS filled_orders, ROUND(AVG((fill_price - target_price) * 100.0 / target_price), 4) AS avg_slippage_pct FROM limit_orders WHERE order_type = 'BUY' AND status = 'FILLED' GROUP BY crypto_pair ORDER BY avg_slippage_pct ASC, crypto_pair ASC;",
    "expectedColumns": [
      "crypto_pair",
      "filled_orders",
      "avg_slippage_pct"
    ],
    "hints": [
      "Filter for order_type = 'BUY' AND status = 'FILLED'.",
      "Compute percentage difference between fill_price and target_price.",
      "Group by crypto_pair and round to 4 decimals."
    ],
    "explanation": "Execution quality audits detect liquidity depth and market impact.",
    "number": 132
  },
  {
    "id": "inter-133",
    "title": "133. Binance: Top 3 Trading Pairs by Volume in Each Market Zone",
    "difficulty": "Medium",
    "companies": [
      "Binance",
      "Coinbase"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nBinance Market Surveillance analyzes daily volume concentration. Find the top 3 trading pairs by 24-hour volume in each market zone (e.g., USDT, BTC).\n\n### Requirements\n- Rank pairs within each market_zone by volume_usd descending using DENSE_RANK.\n- Filter for ranks <= 3.\n- Output columns: market_zone, pair_symbol, volume_usd, volume_rank.\n- Sort by market_zone ascending, volume_rank ascending, then by pair_symbol ascending.\n\n### Input Schema\n**trading_pairs** (id INT, market_zone VARCHAR, pair_symbol VARCHAR, volume_usd NUMERIC)",
    "schemaSql": "CREATE TABLE trading_pairs (id INT PRIMARY KEY, market_zone VARCHAR(20), pair_symbol VARCHAR(20), volume_usd NUMERIC);\nINSERT INTO trading_pairs VALUES (1, 'USDT', 'BTC/USDT', 1500000000), (2, 'USDT', 'ETH/USDT', 850000000), (3, 'USDT', 'SOL/USDT', 600000000), (4, 'USDT', 'DOGE/USDT', 400000000), (5, 'BTC', 'ETH/BTC', 45000000), (6, 'BTC', 'SOL/BTC', 32000000), (7, 'BTC', 'ADA/BTC', 18000000), (8, 'BTC', 'XRP/BTC', 12000000);",
    "starterSql": "-- 133. Binance: Top 3 Trading Pairs by Volume in Each Market Zone\n-- Output: market_zone, pair_symbol, volume_usd, volume_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT market_zone, pair_symbol, volume_usd, DENSE_RANK() OVER (PARTITION BY market_zone ORDER BY volume_usd DESC) AS volume_rank FROM trading_pairs) SELECT market_zone, pair_symbol, volume_usd, volume_rank FROM ranked WHERE volume_rank <= 3 ORDER BY market_zone ASC, volume_rank ASC, pair_symbol ASC;",
    "expectedColumns": [
      "market_zone",
      "pair_symbol",
      "volume_usd",
      "volume_rank"
    ],
    "hints": [
      "Partition by market_zone and order by volume_usd DESC.",
      "Use DENSE_RANK().",
      "Filter where rank <= 3."
    ],
    "explanation": "Volume concentration highlights leading market makers and liquidity pools.",
    "number": 133
  },
  {
    "id": "inter-134",
    "title": "134. Kraken: Margin Accounts Approaching Liquidation Threshold",
    "difficulty": "Medium",
    "companies": [
      "Kraken",
      "Binance"
    ],
    "topics": [
      "ROUND",
      "WHERE",
      "Aggregations"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nKraken Risk Engine monitors leveraged trader accounts. Identify all active margin accounts where the collateral coverage ratio (collateral value / borrowed margin) has dropped below 1.25 (125%).\n\n### Requirements\n- Calculate collateral_ratio as collateral_usd / borrowed_usd, rounded to 2 decimal places.\n- Filter for accounts where collateral_ratio < 1.25 and borrowed_usd > 0.\n- Output columns: account_id, collateral_usd, borrowed_usd, collateral_ratio.\n- Sort by collateral_ratio ascending, then by account_id ascending.\n\n### Input Schema\n**margin_accounts** (account_id INT, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE margin_accounts (account_id INT PRIMARY KEY, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR(20));\nINSERT INTO margin_accounts VALUES (101, 15000.00, 14000.00, 'ACTIVE'), (102, 25000.00, 10000.00, 'ACTIVE'), (103, 8500.00, 7500.00, 'ACTIVE'), (104, 50000.00, 20000.00, 'ACTIVE'), (105, 12000.00, 11000.00, 'ACTIVE');",
    "starterSql": "-- 134. Kraken: Margin Accounts Approaching Liquidation Threshold\n-- Output: account_id, collateral_usd, borrowed_usd, collateral_ratio\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT account_id, collateral_usd, borrowed_usd, ROUND(collateral_usd / borrowed_usd, 2) AS collateral_ratio FROM margin_accounts WHERE status = 'ACTIVE' AND borrowed_usd > 0 AND (collateral_usd / borrowed_usd) < 1.25 ORDER BY collateral_ratio ASC, account_id ASC;",
    "expectedColumns": [
      "account_id",
      "collateral_usd",
      "borrowed_usd",
      "collateral_ratio"
    ],
    "hints": [
      "Divide collateral_usd by borrowed_usd.",
      "Filter where ratio < 1.25.",
      "Order by collateral_ratio ASC, account_id ASC."
    ],
    "explanation": "Collateral coverage alerts prevent catastrophic liquidation cascades.",
    "number": 134
  },
  {
    "id": "inter-135",
    "title": "135. Bloomberg: Treasury Yield Curve Spread Inversion Analysis",
    "difficulty": "Medium",
    "companies": [
      "Bloomberg",
      "FactSet"
    ],
    "topics": [
      "JOIN",
      "ROUND",
      "Date Arithmetic"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "description": "### Problem Statement\nBloomberg Fixed Income Analytics monitors macroeconomic recession indicators. Calculate the daily yield spread between the 10-Year Treasury Bond and the 2-Year Treasury Note, flagging days when the yield curve inverted (10Y yield < 2Y yield).\n\n### Requirements\n- Join 10Y treasury yields and 2Y treasury yields on rate_date.\n- Calculate spread_bps as (yield_10y - yield_2y) * 100, rounded to 2 decimal places.\n- Filter for dates where spread_bps < 0 (yield inversion).\n- Output columns: rate_date, yield_2y, yield_10y, spread_bps.\n- Sort by rate_date ascending.\n\n### Input Schema\n**treasury_rates** (id INT, rate_date DATE, tenor VARCHAR, yield_pct NUMERIC)",
    "schemaSql": "CREATE TABLE treasury_rates (id INT PRIMARY KEY, rate_date DATE, tenor VARCHAR(10), yield_pct NUMERIC);\nINSERT INTO treasury_rates VALUES (1, '2025-01-02', '2Y', 4.35), (2, '2025-01-02', '10Y', 4.20), (3, '2025-01-03', '2Y', 4.38), (4, '2025-01-03', '10Y', 4.22), (5, '2025-01-04', '2Y', 4.15), (6, '2025-01-04', '10Y', 4.25);",
    "starterSql": "-- 135. Bloomberg: Treasury Yield Curve Spread Inversion Analysis\n-- Output: rate_date, yield_2y, yield_10y, spread_bps\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT t2.rate_date, t2.yield_pct AS yield_2y, t10.yield_pct AS yield_10y, ROUND((t10.yield_pct - t2.yield_pct) * 100.0, 2) AS spread_bps FROM treasury_rates t2 JOIN treasury_rates t10 ON t2.rate_date = t10.rate_date WHERE t2.tenor = '2Y' AND t10.tenor = '10Y' AND (t10.yield_pct - t2.yield_pct) < 0 ORDER BY t2.rate_date ASC;",
    "expectedColumns": [
      "rate_date",
      "yield_2y",
      "yield_10y",
      "spread_bps"
    ],
    "hints": [
      "Self-join treasury_rates on rate_date with t2.tenor = '2Y' and t10.tenor = '10Y'.",
      "Compute spread in basis points: (t10 - t2) * 100.0.",
      "Filter where spread < 0."
    ],
    "explanation": "Yield curve inversion (negative spread) is a historically reliable leading indicator of economic slowdowns.",
    "number": 135
  },
  {
    "id": "inter-136",
    "title": "136. FactSet: Corporate Earnings Surprise Magnitude vs Consensus",
    "difficulty": "Medium",
    "companies": [
      "FactSet",
      "Bloomberg"
    ],
    "topics": [
      "ROUND",
      "CTEs",
      "Business Analytics"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nFactSet Equity Research evaluates Wall Street consensus accuracy. Calculate the earnings surprise percentage between actual reported Earnings Per Share (EPS) and consensus analyst estimates for Q4.\n\n### Requirements\n- Calculate surprise_pct as ((actual_eps - consensus_eps) * 100.0 / ABS(consensus_eps)), rounded to 2 decimal places.\n- Output columns: ticker, fiscal_quarter, actual_eps, consensus_eps, surprise_pct.\n- Sort by surprise_pct descending, then by ticker ascending.\n\n### Input Schema\n**company_earnings** (id INT, ticker VARCHAR, fiscal_quarter VARCHAR, actual_eps NUMERIC, consensus_eps NUMERIC)",
    "schemaSql": "CREATE TABLE company_earnings (id INT PRIMARY KEY, ticker VARCHAR(10), fiscal_quarter VARCHAR(10), actual_eps NUMERIC, consensus_eps NUMERIC);\nINSERT INTO company_earnings VALUES (1, 'NVDA', '2024Q4', 0.81, 0.75), (2, 'MSFT', '2024Q4', 3.30, 3.10), (3, 'GOOGL', '2024Q4', 2.15, 2.12), (4, 'TSLA', '2024Q4', 0.68, 0.72), (5, 'AMZN', '2024Q4', 1.45, 1.30);",
    "starterSql": "-- 136. FactSet: Corporate Earnings Surprise Magnitude vs Consensus\n-- Output: ticker, fiscal_quarter, actual_eps, consensus_eps, surprise_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT ticker, fiscal_quarter, actual_eps, consensus_eps, ROUND((actual_eps - consensus_eps) * 100.0 / NULLIF(ABS(consensus_eps), 0), 2) AS surprise_pct FROM company_earnings ORDER BY surprise_pct DESC, ticker ASC;",
    "expectedColumns": [
      "ticker",
      "fiscal_quarter",
      "actual_eps",
      "consensus_eps",
      "surprise_pct"
    ],
    "hints": [
      "Compute percentage difference between actual_eps and consensus_eps.",
      "Guard against 0 division using NULLIF.",
      "Order by surprise_pct DESC, ticker ASC."
    ],
    "explanation": "Earnings beat magnitude directly correlates with post-market equity price adjustments.",
    "number": 136
  },
  {
    "id": "inter-137",
    "title": "137. Morningstar: Mutual Fund Expense Ratio Quintile Ranking by Category",
    "difficulty": "Medium",
    "companies": [
      "Morningstar",
      "Vanguard"
    ],
    "topics": [
      "NTILE",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nMorningstar Fund Research assists investors in finding low-cost investment products. Assign each mutual fund into 5 expense quintiles within its respective investment asset category.\n\n### Requirements\n- Assign expense_quintile (1 = lowest cost, 5 = highest cost) using NTILE(5) partitioned by fund_category ordered by expense_ratio ASC.\n- Output columns: fund_category, fund_name, expense_ratio, expense_quintile.\n- Sort by fund_category ascending, expense_quintile ascending, then by expense_ratio ascending.\n\n### Input Schema\n**mutual_funds** (id INT, fund_category VARCHAR, fund_name VARCHAR, expense_ratio NUMERIC)",
    "schemaSql": "CREATE TABLE mutual_funds (id INT PRIMARY KEY, fund_category VARCHAR(50), fund_name VARCHAR(100), expense_ratio NUMERIC);\nINSERT INTO mutual_funds VALUES (1, 'Large Cap Blend', 'Vanguard 500 Index', 0.04), (2, 'Large Cap Blend', 'Fidelity 500 Index', 0.015), (3, 'Large Cap Blend', 'Schwab S&P 500', 0.02), (4, 'Large Cap Blend', 'Active Growth Fund', 0.75), (5, 'Large Cap Blend', 'Managed Alpha Fund', 0.95), (6, 'Small Cap Value', 'Avantis Small Value', 0.25), (7, 'Small Cap Value', 'DFA Small Cap', 0.30), (8, 'Small Cap Value', 'Royce Small Cap', 1.15), (9, 'Small Cap Value', 'Vanguard Small Value', 0.07), (10, 'Small Cap Value', 'High Fee Small Cap', 1.35);",
    "starterSql": "-- 137. Morningstar: Mutual Fund Expense Ratio Quintile Ranking by Category\n-- Output: fund_category, fund_name, expense_ratio, expense_quintile\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT fund_category, fund_name, expense_ratio, NTILE(5) OVER (PARTITION BY fund_category ORDER BY expense_ratio ASC) AS expense_quintile FROM mutual_funds ORDER BY fund_category ASC, expense_quintile ASC, expense_ratio ASC;",
    "expectedColumns": [
      "fund_category",
      "fund_name",
      "expense_ratio",
      "expense_quintile"
    ],
    "hints": [
      "Partition NTILE(5) by fund_category.",
      "Order by expense_ratio ASC so quintile 1 contains the lowest fees.",
      "Sort final output by category, quintile, and expense_ratio."
    ],
    "explanation": "Quintile ranking benchmarks fee structures across asset classes.",
    "number": 137
  },
  {
    "id": "inter-138",
    "title": "138. Brex: Corporate Card Weekend Spend Anomaly Flagging",
    "difficulty": "Medium",
    "companies": [
      "Brex",
      "Ramp"
    ],
    "topics": [
      "EXTRACT DOW",
      "ROUND",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nBrex Expense Auditing flags corporate credit cards with unusual weekend spending. Find all corporate employees whose total weekend spend exceeds $1,000 across their corporate card.\n\n### Requirements\n- Filter for transactions made on weekends (Sunday = 0, Saturday = 6).\n- Compute total weekend spend per employee.\n- Only include employees whose total weekend spend exceeds 1000.\n- Output columns: employee_name, weekend_spend, swipe_count.\n- Sort by weekend_spend descending, then by employee_name ascending.\n\n### Input Schema\n**corporate_swipes** (id INT, employee_name VARCHAR, swipe_date TIMESTAMP, amount NUMERIC)",
    "schemaSql": "CREATE TABLE corporate_swipes (id INT PRIMARY KEY, employee_name VARCHAR(50), swipe_date TIMESTAMP, amount NUMERIC);\nINSERT INTO corporate_swipes VALUES (1, 'Alex Miller', '2025-01-04 19:30:00', 650.00), (2, 'Alex Miller', '2025-01-05 13:00:00', 420.00), (3, 'Sarah Connor', '2025-01-04 12:00:00', 150.00), (4, 'David Lee', '2025-01-03 18:00:00', 1200.00), (5, 'David Lee', '2025-01-05 20:00:00', 1100.00);",
    "starterSql": "-- 138. Brex: Corporate Card Weekend Spend Anomaly Flagging\n-- Output: employee_name, weekend_spend, swipe_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT employee_name, ROUND(SUM(amount), 2) AS weekend_spend, COUNT(id) AS swipe_count FROM corporate_swipes WHERE EXTRACT(DOW FROM swipe_date) IN (0, 6) GROUP BY employee_name HAVING SUM(amount) > 1000 ORDER BY weekend_spend DESC, employee_name ASC;",
    "expectedColumns": [
      "employee_name",
      "weekend_spend",
      "swipe_count"
    ],
    "hints": [
      "Use EXTRACT(DOW FROM swipe_date) IN (0, 6) to filter for weekends.",
      "Group by employee_name and sum amount.",
      "Filter with HAVING SUM(amount) > 1000."
    ],
    "explanation": "Weekend spending audits enforce corporate travel and expense policies.",
    "number": 138
  },
  {
    "id": "inter-139",
    "title": "139. Ramp: Vendor SaaS Price Per Seat Hikes Across Renewals",
    "difficulty": "Medium",
    "companies": [
      "Ramp",
      "Brex"
    ],
    "topics": [
      "LAG",
      "ROUND",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nRamp Price Intelligence monitors SaaS vendor contract renewals. Identify software vendors that increased their annual price per seat by more than 15% on consecutive contract renewals.\n\n### Requirements\n- Compare current renewal price_per_seat against previous renewal price using LAG.\n- Calculate hike_pct as (price_per_seat - prev_price) * 100.0 / prev_price, rounded to 2 decimal places.\n- Filter for instances where hike_pct > 15.0.\n- Output columns: vendor_name, contract_year, price_per_seat, prev_price, hike_pct.\n- Sort by hike_pct descending, then by vendor_name ascending.\n\n### Input Schema\n**vendor_contracts** (id INT, vendor_name VARCHAR, contract_year INT, price_per_seat NUMERIC)",
    "schemaSql": "CREATE TABLE vendor_contracts (id INT PRIMARY KEY, vendor_name VARCHAR(50), contract_year INT, price_per_seat NUMERIC);\nINSERT INTO vendor_contracts VALUES (1, 'Slack', 2023, 96.00), (2, 'Slack', 2024, 115.00), (3, 'Figma', 2023, 144.00), (4, 'Figma', 2024, 150.00), (5, 'Datadog', 2023, 180.00), (6, 'Datadog', 2024, 220.00);",
    "starterSql": "-- 139. Ramp: Vendor SaaS Price Per Seat Hikes Across Renewals\n-- Output: vendor_name, contract_year, price_per_seat, prev_price, hike_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT vendor_name, contract_year, price_per_seat, LAG(price_per_seat) OVER (PARTITION BY vendor_name ORDER BY contract_year ASC) AS prev_price FROM vendor_contracts) SELECT vendor_name, contract_year, price_per_seat, prev_price, ROUND((price_per_seat - prev_price) * 100.0 / NULLIF(prev_price, 0), 2) AS hike_pct FROM lagged WHERE prev_price IS NOT NULL AND ((price_per_seat - prev_price) * 100.0 / prev_price) > 15.0 ORDER BY hike_pct DESC, vendor_name ASC;",
    "expectedColumns": [
      "vendor_name",
      "contract_year",
      "price_per_seat",
      "prev_price",
      "hike_pct"
    ],
    "hints": [
      "Use LAG to retrieve prior year contract price.",
      "Calculate price difference percentage.",
      "Filter for increases strictly greater than 15%."
    ],
    "explanation": "Tracking contract unit price trends empowers procurement teams in vendor renewal negotiations.",
    "number": 139
  },
  {
    "id": "inter-140",
    "title": "140. Gusto: Weekly Payroll Overtime Audit Above 40 Hours",
    "difficulty": "Medium",
    "companies": [
      "Gusto",
      "Rippling"
    ],
    "topics": [
      "SUM",
      "CASE WHEN",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nGusto Payroll Compliance audits hourly contractor timesheets. For a designated pay period week, compute regular pay hours (capped at 40) and overtime hours (hours strictly exceeding 40) for each employee.\n\n### Requirements\n- Sum weekly logged hours across all daily shifts.\n- Calculate regular_hours as the lesser of total hours or 40.0.\n- Calculate overtime_hours as total hours minus 40.0 if total hours > 40, else 0.0.\n- Only include employees with recorded shifts.\n- Output columns: employee_id, employee_name, total_hours, regular_hours, overtime_hours.\n- Sort by overtime_hours descending, then by employee_name ascending.\n\n### Input Schema\n**shift_logs** (id INT, employee_id INT, employee_name VARCHAR, hours_worked NUMERIC)",
    "schemaSql": "CREATE TABLE shift_logs (id INT PRIMARY KEY, employee_id INT, employee_name VARCHAR(50), hours_worked NUMERIC);\nINSERT INTO shift_logs VALUES (1, 101, 'Carlos Mendez', 10.0), (2, 101, 'Carlos Mendez', 10.0), (3, 101, 'Carlos Mendez', 12.0), (4, 101, 'Carlos Mendez', 14.0), (5, 102, 'Emily Clark', 8.0), (6, 102, 'Emily Clark', 8.0), (7, 102, 'Emily Clark', 8.0), (8, 102, 'Emily Clark', 8.0), (9, 102, 'Emily Clark', 8.0), (10, 103, 'Jason Roy', 9.0), (11, 103, 'Jason Roy', 9.0);",
    "starterSql": "-- 140. Gusto: Weekly Payroll Overtime Audit Above 40 Hours\n-- Output: employee_id, employee_name, total_hours, regular_hours, overtime_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT employee_id, employee_name, ROUND(SUM(hours_worked), 2) AS total_hours, ROUND(LEAST(SUM(hours_worked), 40.0), 2) AS regular_hours, ROUND(GREATEST(SUM(hours_worked) - 40.0, 0.0), 2) AS overtime_hours FROM shift_logs GROUP BY employee_id, employee_name ORDER BY overtime_hours DESC, employee_name ASC;",
    "expectedColumns": [
      "employee_id",
      "employee_name",
      "total_hours",
      "regular_hours",
      "overtime_hours"
    ],
    "hints": [
      "Group by employee_id and employee_name.",
      "Use LEAST(SUM(hours), 40) for regular hours.",
      "Use GREATEST(SUM(hours) - 40, 0) for overtime hours."
    ],
    "explanation": "Labor standards require strict bifurcation between standard base and 1.5x overtime wage buckets.",
    "number": 140
  },
  {
    "id": "inter-141",
    "title": "141. Rippling: Department Promotion Velocity Time-in-Title",
    "difficulty": "Medium",
    "companies": [
      "Rippling",
      "Gusto"
    ],
    "topics": [
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nRippling HR Analytics benchmarks career mobility velocity. Calculate the average months spent in previous roles before receiving a promotion across each corporate department.\n\n### Requirements\n- Compute avg_months_to_promote per department rounded to 2 decimal places.\n- Count the total promotions recorded as promotion_count.\n- Output columns: department, promotion_count, avg_months_to_promote.\n- Sort by avg_months_to_promote ascending, then by department ascending.\n\n### Input Schema\n**promotions** (id INT, department VARCHAR, employee_name VARCHAR, months_in_role INT)",
    "schemaSql": "CREATE TABLE promotions (id INT PRIMARY KEY, department VARCHAR(50), employee_name VARCHAR(50), months_in_role INT);\nINSERT INTO promotions VALUES (1, 'Engineering', 'Maya Lin', 14), (2, 'Engineering', 'Dan Cohen', 18), (3, 'Engineering', 'Sophie Ray', 16), (4, 'Sales', 'Tom Hardy', 9), (5, 'Sales', 'Rachel Green', 11), (6, 'Product', 'Leo Vance', 22), (7, 'Product', 'Nina Patel', 26);",
    "starterSql": "-- 141. Rippling: Department Promotion Velocity Time-in-Title\n-- Output: department, promotion_count, avg_months_to_promote\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT department, COUNT(id) AS promotion_count, ROUND(AVG(months_in_role), 2) AS avg_months_to_promote FROM promotions GROUP BY department ORDER BY avg_months_to_promote ASC, department ASC;",
    "expectedColumns": [
      "department",
      "promotion_count",
      "avg_months_to_promote"
    ],
    "hints": [
      "Group by department.",
      "Compute COUNT(id) and AVG(months_in_role).",
      "Order by avg_months_to_promote ASC, department ASC."
    ],
    "explanation": "Internal progression speed tracks talent retention and organizational hierarchy health.",
    "number": 141
  },
  {
    "id": "inter-142",
    "title": "142. Deel: International Contractor Foreign Exchange Fee Spread",
    "difficulty": "Medium",
    "companies": [
      "Deel",
      "Wise"
    ],
    "topics": [
      "ROUND",
      "AVG",
      "Business Analytics"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nDeel Global Payroll audits international contractor payouts. Calculate the average foreign exchange conversion spread fee percentage across destination currencies.\n\n### Requirements\n- Calculate spread_pct as ((market_rate - executed_rate) * 100.0 / market_rate).\n- Compute avg_spread_pct per currency, rounded to 3 decimal places.\n- Output columns: currency, payout_count, avg_spread_pct.\n- Sort by avg_spread_pct descending, then by currency ascending.\n\n### Input Schema\n**contractor_payouts** (id INT, currency VARCHAR, market_rate NUMERIC, executed_rate NUMERIC)",
    "schemaSql": "CREATE TABLE contractor_payouts (id INT PRIMARY KEY, currency VARCHAR(10), market_rate NUMERIC, executed_rate NUMERIC);\nINSERT INTO contractor_payouts VALUES (1, 'BRL', 5.80, 5.65), (2, 'BRL', 5.82, 5.68), (3, 'EUR', 0.96, 0.95), (4, 'EUR', 0.95, 0.942), (5, 'INR', 85.50, 84.10), (6, 'INR', 85.60, 84.20);",
    "starterSql": "-- 142. Deel: International Contractor Foreign Exchange Fee Spread\n-- Output: currency, payout_count, avg_spread_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT currency, COUNT(id) AS payout_count, ROUND(AVG((market_rate - executed_rate) * 100.0 / market_rate), 3) AS avg_spread_pct FROM contractor_payouts GROUP BY currency ORDER BY avg_spread_pct DESC, currency ASC;",
    "expectedColumns": [
      "currency",
      "payout_count",
      "avg_spread_pct"
    ],
    "hints": [
      "Compute percentage difference between market rate and executed rate.",
      "Group by currency.",
      "Order by avg_spread_pct DESC, currency ASC."
    ],
    "explanation": "FX spreads represent take-rate margins in cross-border payroll disbursements.",
    "number": 142
  },
  {
    "id": "inter-143",
    "title": "143. Duolingo: Weekly League Leaderboard Top 3 Promotion Cutoff Points",
    "difficulty": "Medium",
    "companies": [
      "Duolingo",
      "Coursera"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nDuolingo Gamification Engine handles weekly league promotions. For each language league, identify the top 3 users by XP earned who qualify for promotion to the next tier.\n\n### Requirements\n- Rank users within each league by xp_earned descending using DENSE_RANK.\n- Filter for users ranked in the top 3.\n- Output columns: league_tier, username, xp_earned, rank_position.\n- Sort by league_tier ascending, rank_position ascending, then by username ascending.\n\n### Input Schema\n**league_leaderboard** (id INT, league_tier VARCHAR, username VARCHAR, xp_earned INT)",
    "schemaSql": "CREATE TABLE league_leaderboard (id INT PRIMARY KEY, league_tier VARCHAR(50), username VARCHAR(50), xp_earned INT);\nINSERT INTO league_leaderboard VALUES (1, 'Diamond', 'Polyglot99', 4200), (2, 'Diamond', 'LinguaFranc', 3900), (3, 'Diamond', 'GrammarNerd', 3500), (4, 'Diamond', 'SlowLearner', 2100), (5, 'Obsidian', 'FrenchPro', 3100), (6, 'Obsidian', 'SpanishLover', 2950), (7, 'Obsidian', 'TokyoSam', 2800), (8, 'Obsidian', 'Duomate', 2400);",
    "starterSql": "-- 143. Duolingo: Weekly League Leaderboard Top 3 Promotion Cutoff Points\n-- Output: league_tier, username, xp_earned, rank_position\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT league_tier, username, xp_earned, DENSE_RANK() OVER (PARTITION BY league_tier ORDER BY xp_earned DESC) AS rank_position FROM league_leaderboard) SELECT league_tier, username, xp_earned, rank_position FROM ranked WHERE rank_position <= 3 ORDER BY league_tier ASC, rank_position ASC, username ASC;",
    "expectedColumns": [
      "league_tier",
      "username",
      "xp_earned",
      "rank_position"
    ],
    "hints": [
      "Partition by league_tier and order by xp_earned DESC.",
      "Use DENSE_RANK().",
      "Filter where rank_position <= 3."
    ],
    "explanation": "Competitive leaderboards drive daily user engagement through weekly advancement thresholds.",
    "number": 143
  },
  {
    "id": "inter-144",
    "title": "144. Coursera: Course Specialization Module Completion Drop-off Funnel",
    "difficulty": "Medium",
    "companies": [
      "Coursera",
      "Udemy"
    ],
    "topics": [
      "COUNT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nCoursera Learning Analytics evaluates student retention across a 4-module specialization. Calculate student completion counts for each module number and the drop-off rate compared to Module 1.\n\n### Requirements\n- Count distinct students who completed each module as students_completed.\n- Retrieve Module 1 total completed students as the baseline.\n- Calculate retention_pct as students_completed divided by Module 1 completions multiplied by 100, rounded to 2 decimal places.\n- Output columns: module_number, students_completed, retention_pct.\n- Sort by module_number ascending.\n\n### Input Schema\n**module_completions** (id INT, student_id INT, module_number INT)",
    "schemaSql": "CREATE TABLE module_completions (id INT PRIMARY KEY, student_id INT, module_number INT);\nINSERT INTO module_completions VALUES (1, 101, 1), (2, 101, 2), (3, 101, 3), (4, 101, 4), (5, 102, 1), (6, 102, 2), (7, 103, 1), (8, 104, 1), (9, 104, 2), (10, 104, 3);",
    "starterSql": "-- 144. Coursera: Course Specialization Module Completion Drop-off Funnel\n-- Output: module_number, students_completed, retention_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH base AS (SELECT COUNT(DISTINCT student_id) AS mod1_count FROM module_completions WHERE module_number = 1), mod_counts AS (SELECT module_number, COUNT(DISTINCT student_id) AS students_completed FROM module_completions GROUP BY module_number) SELECT m.module_number, m.students_completed, ROUND(m.students_completed * 100.0 / b.mod1_count, 2) AS retention_pct FROM mod_counts m CROSS JOIN base b ORDER BY m.module_number ASC;",
    "expectedColumns": [
      "module_number",
      "students_completed",
      "retention_pct"
    ],
    "hints": [
      "Compute Module 1 completions in a CTE.",
      "Group all completions by module_number.",
      "Cross join the baseline to compute retention percentage."
    ],
    "explanation": "Funnel drop-off metrics guide course pacing and pedagogical redesigns.",
    "number": 144
  },
  {
    "id": "inter-145",
    "title": "145. Udemy: Bestselling Instructor Tier Qualification by Reviews",
    "difficulty": "Medium",
    "companies": [
      "Udemy",
      "Coursera"
    ],
    "topics": [
      "AVG",
      "COUNT",
      "ROUND",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nUdemy Instructor Partnerships qualifies elite course creators. Identify all instructors who have published at least 2 distinct courses with an average course rating of 4.5 or higher and at least 500 total reviews.\n\n### Requirements\n- Count distinct courses published as course_count.\n- Calculate average rating across all courses, rounded to 2 decimal places as avg_rating.\n- Sum total reviews as total_reviews.\n- Filter for course_count >= 2, avg_rating >= 4.50, and total_reviews >= 500.\n- Output columns: instructor_name, course_count, total_reviews, avg_rating.\n- Sort by avg_rating descending, then by total_reviews descending.\n\n### Input Schema\n**instructor_courses** (id INT, instructor_name VARCHAR, course_id INT, rating NUMERIC, review_count INT)",
    "schemaSql": "CREATE TABLE instructor_courses (id INT PRIMARY KEY, instructor_name VARCHAR(50), course_id INT, rating NUMERIC, review_count INT);\nINSERT INTO instructor_courses VALUES (1, 'Dr. Angela Yu', 201, 4.80, 1200), (2, 'Dr. Angela Yu', 202, 4.70, 850), (3, 'Jose Portilla', 301, 4.65, 2100), (4, 'Jose Portilla', 302, 4.55, 950), (5, 'Beginner Dev', 401, 4.90, 50), (6, 'Beginner Dev', 402, 4.85, 80), (7, 'Solo Tutor', 501, 4.20, 1500);",
    "starterSql": "-- 145. Udemy: Bestselling Instructor Tier Qualification by Reviews\n-- Output: instructor_name, course_count, total_reviews, avg_rating\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT instructor_name, COUNT(DISTINCT course_id) AS course_count, SUM(review_count) AS total_reviews, ROUND(AVG(rating), 2) AS avg_rating FROM instructor_courses GROUP BY instructor_name HAVING COUNT(DISTINCT course_id) >= 2 AND AVG(rating) >= 4.50 AND SUM(review_count) >= 500 ORDER BY avg_rating DESC, total_reviews DESC;",
    "expectedColumns": [
      "instructor_name",
      "course_count",
      "total_reviews",
      "avg_rating"
    ],
    "hints": [
      "Group by instructor_name.",
      "Apply COUNT(DISTINCT course_id), SUM(review_count), and AVG(rating).",
      "Use HAVING to filter on all three business conditions."
    ],
    "explanation": "Creator badge programs combine volume, portfolio breadth, and sentiment standards.",
    "number": 145
  },
  {
    "id": "inter-146",
    "title": "146. Strava: Segment Personal Record (PR) Improvement Margin",
    "difficulty": "Medium",
    "companies": [
      "Strava",
      "Peloton"
    ],
    "topics": [
      "LAG",
      "Date Arithmetic",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nStrava Athlete Intelligence rewards personal record (PR) milestones. For athletes who beat their previous best time on a cycling segment, calculate the time margin of improvement in seconds.\n\n### Requirements\n- For each athlete and segment, compare each attempt's elapsed time against their immediately preceding attempt using LAG.\n- Filter for attempts where current elapsed_seconds is strictly less than prev_elapsed_seconds.\n- Calculate seconds_improved as prev_elapsed_seconds minus current elapsed_seconds.\n- Output columns: athlete_name, segment_name, attempt_date, elapsed_seconds, seconds_improved.\n- Sort by seconds_improved descending, then by athlete_name ascending.\n\n### Input Schema\n**segment_efforts** (id INT, athlete_name VARCHAR, segment_name VARCHAR, attempt_date DATE, elapsed_seconds INT)",
    "schemaSql": "CREATE TABLE segment_efforts (id INT PRIMARY KEY, athlete_name VARCHAR(50), segment_name VARCHAR(50), attempt_date DATE, elapsed_seconds INT);\nINSERT INTO segment_efforts VALUES (1, 'Wout van Aert', 'Hawk Hill Climb', '2025-01-01', 340), (2, 'Wout van Aert', 'Hawk Hill Climb', '2025-01-10', 315), (3, 'Wout van Aert', 'Hawk Hill Climb', '2025-01-20', 320), (4, 'Tadej Pogacar', 'Col du Galibier', '2025-01-02', 1250), (5, 'Tadej Pogacar', 'Col du Galibier', '2025-01-15', 1190);",
    "starterSql": "-- 146. Strava: Segment Personal Record (PR) Improvement Margin\n-- Output: athlete_name, segment_name, attempt_date, elapsed_seconds, seconds_improved\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT athlete_name, segment_name, attempt_date, elapsed_seconds, LAG(elapsed_seconds) OVER (PARTITION BY athlete_name, segment_name ORDER BY attempt_date ASC) AS prev_elapsed_seconds FROM segment_efforts) SELECT athlete_name, segment_name, attempt_date, elapsed_seconds, (prev_elapsed_seconds - elapsed_seconds) AS seconds_improved FROM lagged WHERE prev_elapsed_seconds IS NOT NULL AND elapsed_seconds < prev_elapsed_seconds ORDER BY seconds_improved DESC, athlete_name ASC;",
    "expectedColumns": [
      "athlete_name",
      "segment_name",
      "attempt_date",
      "elapsed_seconds",
      "seconds_improved"
    ],
    "hints": [
      "Use LAG partitioned by athlete_name and segment_name.",
      "Filter where elapsed_seconds < prev_elapsed_seconds.",
      "Order by seconds_improved DESC, athlete_name ASC."
    ],
    "explanation": "Sequential record comparison powers dynamic athlete badges and PR achievements.",
    "number": 146
  },
  {
    "id": "inter-147",
    "title": "147. Peloton: Leaderboard Output Surge in Final 5 Minutes of Class",
    "difficulty": "Medium",
    "companies": [
      "Peloton",
      "Strava"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nPeloton Class Telemetry measures rider endurance sprint finishes. Compare rider energy output in the final 5 minutes of a 30-minute ride (minute 25 to 30) against the first 25 minutes (minute 0 to 25).\n\n### Requirements\n- Sum output_kj for interval_bracket = 'SPRINT_FINISH' (minutes 25-30) as finish_kj.\n- Sum output_kj for interval_bracket = 'MAIN_RIDE' (minutes 0-25) as main_kj.\n- Calculate sprint_share_pct as finish_kj divided by total kj output multiplied by 100, rounded to 2 decimal places.\n- Output columns: rider_username, main_kj, finish_kj, sprint_share_pct.\n- Sort by sprint_share_pct descending, then by rider_username ascending.\n\n### Input Schema\n**rider_output** (id INT, rider_username VARCHAR, interval_bracket VARCHAR, output_kj NUMERIC)",
    "schemaSql": "CREATE TABLE rider_output (id INT PRIMARY KEY, rider_username VARCHAR(50), interval_bracket VARCHAR(20), output_kj NUMERIC);\nINSERT INTO rider_output VALUES (1, 'SpinMaster99', 'MAIN_RIDE', 220.0), (2, 'SpinMaster99', 'SPRINT_FINISH', 75.0), (3, 'HillClimber', 'MAIN_RIDE', 260.0), (4, 'HillClimber', 'SPRINT_FINISH', 55.0), (5, 'SteadyRider', 'MAIN_RIDE', 190.0), (6, 'SteadyRider', 'SPRINT_FINISH', 40.0);",
    "starterSql": "-- 147. Peloton: Leaderboard Output Surge in Final 5 Minutes of Class\n-- Output: rider_username, main_kj, finish_kj, sprint_share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT rider_username, ROUND(SUM(CASE WHEN interval_bracket = 'MAIN_RIDE' THEN output_kj ELSE 0 END), 2) AS main_kj, ROUND(SUM(CASE WHEN interval_bracket = 'SPRINT_FINISH' THEN output_kj ELSE 0 END), 2) AS finish_kj, ROUND(SUM(CASE WHEN interval_bracket = 'SPRINT_FINISH' THEN output_kj ELSE 0 END) * 100.0 / NULLIF(SUM(output_kj), 0), 2) AS sprint_share_pct FROM rider_output GROUP BY rider_username ORDER BY sprint_share_pct DESC, rider_username ASC;",
    "expectedColumns": [
      "rider_username",
      "main_kj",
      "finish_kj",
      "sprint_share_pct"
    ],
    "hints": [
      "Use conditional SUM(CASE WHEN ...) for main and finish brackets.",
      "Compute percentage share of total output.",
      "Sort by sprint_share_pct DESC."
    ],
    "explanation": "Endurance sprint analytics profile cyclist stamina and pacing strategies.",
    "number": 147
  },
  {
    "id": "inter-148",
    "title": "148. Whoop: Sleep Recovery Score Below 3-Day Baseline Anomaly",
    "difficulty": "Medium",
    "companies": [
      "Whoop",
      "Oura"
    ],
    "topics": [
      "AVG OVER",
      "ROUND",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nWhoop Physiological Telemetry monitors athletic strain recovery. Identify recovery dates where an athlete's recovery score dropped by more than 20 points below their trailing 3-day baseline average.\n\n### Requirements\n- Compute trailing 3-day average recovery score (3 days strictly preceding the current date) using an explicit window frame.\n- Calculate score_drop as baseline_avg minus current recovery_score.\n- Filter for instances where score_drop > 20.0.\n- Output columns: athlete_id, log_date, recovery_score, baseline_avg, score_drop.\n- Sort by score_drop descending, then by athlete_id ascending.\n\n### Input Schema\n**daily_recovery** (id INT, athlete_id INT, log_date DATE, recovery_score NUMERIC)",
    "schemaSql": "CREATE TABLE daily_recovery (id INT PRIMARY KEY, athlete_id INT, log_date DATE, recovery_score NUMERIC);\nINSERT INTO daily_recovery VALUES (1, 101, '2025-01-01', 85.0), (2, 101, '2025-01-02', 88.0), (3, 101, '2025-01-03', 82.0), (4, 101, '2025-01-04', 55.0), (5, 102, '2025-01-01', 75.0), (6, 102, '2025-01-02', 78.0), (7, 102, '2025-01-03', 76.0), (8, 102, '2025-01-04', 72.0);",
    "starterSql": "-- 148. Whoop: Sleep Recovery Score Below 3-Day Baseline Anomaly\n-- Output: athlete_id, log_date, recovery_score, baseline_avg, score_drop\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH baselines AS (SELECT athlete_id, log_date, recovery_score, ROUND(AVG(recovery_score) OVER (PARTITION BY athlete_id ORDER BY log_date ASC ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING), 2) AS baseline_avg FROM daily_recovery) SELECT athlete_id, log_date, recovery_score, baseline_avg, ROUND(baseline_avg - recovery_score, 2) AS score_drop FROM baselines WHERE baseline_avg IS NOT NULL AND (baseline_avg - recovery_score) > 20.0 ORDER BY score_drop DESC, athlete_id ASC;",
    "expectedColumns": [
      "athlete_id",
      "log_date",
      "recovery_score",
      "baseline_avg",
      "score_drop"
    ],
    "hints": [
      "Use ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING for strict prior baseline.",
      "Calculate score_drop = baseline_avg - recovery_score.",
      "Filter where score_drop > 20."
    ],
    "explanation": "Trailing pre-event window frames isolate sudden drops in biomarker baselines.",
    "number": 148
  },
  {
    "id": "inter-149",
    "title": "149. Oura: Weekly Bedtime Consistency Variance in Minutes",
    "difficulty": "Medium",
    "companies": [
      "Oura",
      "Whoop"
    ],
    "topics": [
      "MAX",
      "MIN",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nOura Ring Sleep Staging evaluates circadian rhythm alignment. For each user's week of sleep logs, calculate the difference between their latest bedtime and earliest bedtime in minutes.\n\n### Requirements\n- Compute bedtime_variance_minutes as MAX(bedtime_minute_of_day) minus MIN(bedtime_minute_of_day).\n- Only consider users with at least 5 logged sleep days in the week.\n- Output columns: user_id, days_logged, bedtime_variance_minutes.\n- Sort by bedtime_variance_minutes ascending, then by user_id ascending.\n\n### Input Schema\n**bedtime_logs** (id INT, user_id INT, log_date DATE, bedtime_minute_of_day INT)",
    "schemaSql": "CREATE TABLE bedtime_logs (id INT PRIMARY KEY, user_id INT, log_date DATE, bedtime_minute_of_day INT);\nINSERT INTO bedtime_logs VALUES (1, 101, '2025-01-01', 1350), (2, 101, '2025-01-02', 1360), (3, 101, '2025-01-03', 1355), (4, 101, '2025-01-04', 1370), (5, 101, '2025-01-05', 1352), (6, 102, '2025-01-01', 1320), (7, 102, '2025-01-02', 1420), (8, 102, '2025-01-03', 1300), (9, 102, '2025-01-04', 1440), (10, 102, '2025-01-05', 1310);",
    "starterSql": "-- 149. Oura: Weekly Bedtime Consistency Variance in Minutes\n-- Output: user_id, days_logged, bedtime_variance_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, COUNT(id) AS days_logged, (MAX(bedtime_minute_of_day) - MIN(bedtime_minute_of_day)) AS bedtime_variance_minutes FROM bedtime_logs GROUP BY user_id HAVING COUNT(id) >= 5 ORDER BY bedtime_variance_minutes ASC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "days_logged",
      "bedtime_variance_minutes"
    ],
    "hints": [
      "Group by user_id.",
      "Compute MAX(bedtime) - MIN(bedtime).",
      "Filter HAVING COUNT(id) >= 5."
    ],
    "explanation": "Circadian regularity correlates with sleep architecture stability.",
    "number": 149
  },
  {
    "id": "inter-150",
    "title": "150. Epic Games: Battle Pass Tier Unlock Velocity Days from Launch",
    "difficulty": "Medium",
    "companies": [
      "Epic Games",
      "Riot Games"
    ],
    "topics": [
      "MIN",
      "Date Arithmetic",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nEpic Games Monetization analyzes player progression speed. Find the number of days elapsed between season launch date ('2025-01-01') and when each VIP player reached Tier 100 of the Battle Pass.\n\n### Requirements\n- Find the earliest date where tier_unlocked = 100 for each player.\n- Calculate days_to_tier_100 as completion date minus '2025-01-01'::DATE.\n- Output columns: player_tag, completion_date, days_to_tier_100.\n- Sort by days_to_tier_100 ascending, then by player_tag ascending.\n\n### Input Schema\n**battle_pass_logs** (id INT, player_tag VARCHAR, log_date DATE, tier_unlocked INT)",
    "schemaSql": "CREATE TABLE battle_pass_logs (id INT PRIMARY KEY, player_tag VARCHAR(50), log_date DATE, tier_unlocked INT);\nINSERT INTO battle_pass_logs VALUES (1, 'NinjaGamer', '2025-01-05', 50), (2, 'NinjaGamer', '2025-01-12', 100), (3, 'LootGoblin', '2025-01-10', 40), (4, 'LootGoblin', '2025-01-25', 100), (5, 'CasualSniper', '2025-01-15', 30);",
    "starterSql": "-- 150. Epic Games: Battle Pass Tier Unlock Velocity Days from Launch\n-- Output: player_tag, completion_date, days_to_tier_100\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT player_tag, MIN(log_date) AS completion_date, (MIN(log_date) - '2025-01-01'::DATE) AS days_to_tier_100 FROM battle_pass_logs WHERE tier_unlocked = 100 GROUP BY player_tag ORDER BY days_to_tier_100 ASC, player_tag ASC;",
    "expectedColumns": [
      "player_tag",
      "completion_date",
      "days_to_tier_100"
    ],
    "hints": [
      "Filter WHERE tier_unlocked = 100.",
      "Compute MIN(log_date) per player.",
      "Subtract '2025-01-01'::DATE to get days elapsed."
    ],
    "explanation": "Battle Pass completion pacing calibrates XP curve incentives and tier skip bundle sales.",
    "number": 150
  },
  {
    "id": "inter-151",
    "title": "151. Riot Games: Champions with Highest Win Rate in 35+ Minute Late Games",
    "difficulty": "Medium",
    "companies": [
      "Riot Games",
      "Valve"
    ],
    "topics": [
      "ROUND",
      "COUNT CASE WHEN",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nRiot Games Gameplay Balance monitors scaling champion performance. Find all champions who played at least 5 late-stage matches (duration_minutes >= 35) and achieved a late-game win rate of 60% or higher.\n\n### Requirements\n- Filter matches with duration_minutes >= 35.\n- Count late matches played as late_matches.\n- Calculate win_rate_pct as late wins divided by late matches multiplied by 100, rounded to 2 decimal places.\n- Only include champions with late_matches >= 5 and win_rate_pct >= 60.0.\n- Output columns: champion_name, late_matches, win_rate_pct.\n- Sort by win_rate_pct descending, then by champion_name ascending.\n\n### Input Schema\n**match_champions** (id INT, match_id INT, champion_name VARCHAR, duration_minutes INT, is_win BOOLEAN)",
    "schemaSql": "CREATE TABLE match_champions (id INT PRIMARY KEY, match_id INT, champion_name VARCHAR(50), duration_minutes INT, is_win BOOLEAN);\nINSERT INTO match_champions VALUES (1, 101, 'Kassadin', 38, TRUE), (2, 102, 'Kassadin', 42, TRUE), (3, 103, 'Kassadin', 36, TRUE), (4, 104, 'Kassadin', 39, TRUE), (5, 105, 'Kassadin', 40, FALSE), (6, 106, 'Kayle', 37, TRUE), (7, 107, 'Kayle', 41, TRUE), (8, 108, 'Kayle', 35, TRUE), (9, 109, 'Kayle', 45, FALSE), (10, 110, 'Kayle', 38, FALSE), (11, 111, 'Renekton', 40, FALSE), (12, 112, 'Renekton', 36, FALSE), (13, 113, 'Renekton', 37, TRUE), (14, 114, 'Renekton', 39, FALSE), (15, 115, 'Renekton', 41, FALSE);",
    "starterSql": "-- 151. Riot Games: Champions with Highest Win Rate in 35+ Minute Late Games\n-- Output: champion_name, late_matches, win_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT champion_name, COUNT(id) AS late_matches, ROUND(COUNT(CASE WHEN is_win THEN 1 END) * 100.0 / COUNT(id), 2) AS win_rate_pct FROM match_champions WHERE duration_minutes >= 35 GROUP BY champion_name HAVING COUNT(id) >= 5 AND (COUNT(CASE WHEN is_win THEN 1 END) * 100.0 / COUNT(id)) >= 60.0 ORDER BY win_rate_pct DESC, champion_name ASC;",
    "expectedColumns": [
      "champion_name",
      "late_matches",
      "win_rate_pct"
    ],
    "hints": [
      "Filter WHERE duration_minutes >= 35.",
      "Use conditional aggregation for win rate.",
      "Filter HAVING late_matches >= 5 and win rate >= 60%."
    ],
    "explanation": "Late-game scaling balances early-game hyper-carries versus early-game bullies.",
    "number": 151
  },
  {
    "id": "inter-152",
    "title": "152. Steam: Wishlist-to-Purchase Conversion Velocity Within 14 Days",
    "difficulty": "Medium",
    "companies": [
      "Steam",
      "Epic Games"
    ],
    "topics": [
      "JOIN",
      "Date Arithmetic",
      "COUNT",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nSteam Store Analytics tracks promotional discount conversion speed. For users who wishlisted a game title, find the conversion rate of purchasing the game within 14 days of wishlisting.\n\n### Requirements\n- Join game wishlists to purchases on user_id and game_id.\n- Count total wishlists as total_wishlists.\n- Count purchases completed within 14 days of wishlisting as fast_conversions.\n- Calculate fast_conversion_pct as fast_conversions / total_wishlists * 100, rounded to 2 decimal places.\n- Output columns: genre, total_wishlists, fast_conversions, fast_conversion_pct.\n- Sort by fast_conversion_pct descending, then by genre ascending.\n\n### Input Schema\n**game_wishlists** (id INT, user_id INT, game_id INT, genre VARCHAR, wishlist_date DATE)\n\n**game_purchases** (id INT, user_id INT, game_id INT, purchase_date DATE)",
    "schemaSql": "CREATE TABLE game_wishlists (id INT PRIMARY KEY, user_id INT, game_id INT, genre VARCHAR(50), wishlist_date DATE);\nCREATE TABLE game_purchases (id INT PRIMARY KEY, user_id INT, game_id INT, purchase_date DATE);\nINSERT INTO game_wishlists VALUES (1, 101, 501, 'RPG', '2025-01-01'), (2, 102, 501, 'RPG', '2025-01-02'), (3, 103, 501, 'RPG', '2025-01-03'), (4, 104, 502, 'Strategy', '2025-01-01'), (5, 105, 502, 'Strategy', '2025-01-05');\nINSERT INTO game_purchases VALUES (1, 101, 501, '2025-01-05'), (2, 102, 501, '2025-01-10'), (3, 103, 501, '2025-01-25'), (4, 104, 502, '2025-01-06');",
    "starterSql": "-- 152. Steam: Wishlist-to-Purchase Conversion Velocity Within 14 Days\n-- Output: genre, total_wishlists, fast_conversions, fast_conversion_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT w.genre, COUNT(w.id) AS total_wishlists, COUNT(p.id) AS fast_conversions, ROUND(COUNT(p.id) * 100.0 / COUNT(w.id), 2) AS fast_conversion_pct FROM game_wishlists w LEFT JOIN game_purchases p ON w.user_id = p.user_id AND w.game_id = p.game_id AND (p.purchase_date - w.wishlist_date) BETWEEN 0 AND 14 GROUP BY w.genre ORDER BY fast_conversion_pct DESC, w.genre ASC;",
    "expectedColumns": [
      "genre",
      "total_wishlists",
      "fast_conversions",
      "fast_conversion_pct"
    ],
    "hints": [
      "LEFT JOIN purchases with date difference constraint.",
      "Count all wishlist entries vs matched fast purchases.",
      "Group by genre."
    ],
    "explanation": "Wishlist conversion velocity determines discount event effectiveness.",
    "number": 152
  },
  {
    "id": "inter-153",
    "title": "153. Valve: Competitive Match Round Weapon Shot Accuracy",
    "difficulty": "Medium",
    "companies": [
      "Valve",
      "Riot Games"
    ],
    "topics": [
      "ROUND",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nValve Counter-Strike Competitive Analytics evaluates firearm precision. Compute overall shot accuracy percentage and headshot accuracy percentage across competitive maps.\n\n### Requirements\n- Calculate accuracy_pct as (total hits / total shots fired) * 100, rounded to 2 decimal places.\n- Calculate headshot_pct as (headshot hits / total hits) * 100, rounded to 2 decimal places.\n- Output columns: map_name, weapon_name, accuracy_pct, headshot_pct.\n- Sort by accuracy_pct descending, then by map_name ascending.\n\n### Input Schema\n**weapon_stats** (id INT, map_name VARCHAR, weapon_name VARCHAR, shots_fired INT, shots_hit INT, headshots INT)",
    "schemaSql": "CREATE TABLE weapon_stats (id INT PRIMARY KEY, map_name VARCHAR(50), weapon_name VARCHAR(50), shots_fired INT, shots_hit INT, headshots INT);\nINSERT INTO weapon_stats VALUES (1, 'de_dust2', 'AK-47', 10000, 2400, 960), (2, 'de_dust2', 'AWP', 2000, 1600, 400), (3, 'de_inferno', 'AK-47', 8500, 2100, 800), (4, 'de_inferno', 'M4A4', 9000, 2700, 750);",
    "starterSql": "-- 153. Valve: Competitive Match Round Weapon Shot Accuracy\n-- Output: map_name, weapon_name, accuracy_pct, headshot_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT map_name, weapon_name, ROUND(SUM(shots_hit) * 100.0 / NULLIF(SUM(shots_fired), 0), 2) AS accuracy_pct, ROUND(SUM(headshots) * 100.0 / NULLIF(SUM(shots_hit), 0), 2) AS headshot_pct FROM weapon_stats GROUP BY map_name, weapon_name ORDER BY accuracy_pct DESC, map_name ASC;",
    "expectedColumns": [
      "map_name",
      "weapon_name",
      "accuracy_pct",
      "headshot_pct"
    ],
    "hints": [
      "Sum hits, shots fired, and headshots by map and weapon.",
      "Compute percentages and round to 2 decimals.",
      "Guard against zero division with NULLIF."
    ],
    "explanation": "Weapon performance telemetry governs recoil spray balance updates.",
    "number": 153
  },
  {
    "id": "inter-154",
    "title": "154. Sony: Digital Game Title Refund Rate vs Platform Benchmark",
    "difficulty": "Medium",
    "companies": [
      "Sony",
      "Nintendo"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nPlayStation Network Operations investigates abnormal refund request spikes. Identify game titles where refund rate (refunds / total sales) exceeds 5.0%, with at least 50 recorded sales.\n\n### Requirements\n- Compute total sales and total refunds per game title.\n- Calculate refund_rate_pct as total refunds divided by total sales multiplied by 100, rounded to 2 decimal places.\n- Filter for titles with total sales >= 50 and refund_rate_pct > 5.0.\n- Output columns: title, total_sales, total_refunds, refund_rate_pct.\n- Sort by refund_rate_pct descending, then by title ascending.\n\n### Input Schema\n**psn_sales** (id INT, title VARCHAR, is_refund BOOLEAN)",
    "schemaSql": "CREATE TABLE psn_sales (id INT PRIMARY KEY, title VARCHAR(100), is_refund BOOLEAN);\nINSERT INTO psn_sales VALUES (1, 'Buggy Launch 2025', TRUE), (2, 'Buggy Launch 2025', TRUE), (3, 'Buggy Launch 2025', TRUE), (4, 'Buggy Launch 2025', TRUE), (5, 'Buggy Launch 2025', FALSE);\nINSERT INTO psn_sales SELECT g + 5, 'Buggy Launch 2025', FALSE FROM generate_series(1, 55) g;\nINSERT INTO psn_sales SELECT g + 100, 'Polished Masterpiece', FALSE FROM generate_series(1, 100) g;",
    "starterSql": "-- 154. Sony: Digital Game Title Refund Rate vs Platform Benchmark\n-- Output: title, total_sales, total_refunds, refund_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT title, COUNT(id) AS total_sales, COUNT(CASE WHEN is_refund THEN 1 END) AS total_refunds, ROUND(COUNT(CASE WHEN is_refund THEN 1 END) * 100.0 / COUNT(id), 2) AS refund_rate_pct FROM psn_sales GROUP BY title HAVING COUNT(id) >= 50 AND (COUNT(CASE WHEN is_refund THEN 1 END) * 100.0 / COUNT(id)) > 5.0 ORDER BY refund_rate_pct DESC, title ASC;",
    "expectedColumns": [
      "title",
      "total_sales",
      "total_refunds",
      "refund_rate_pct"
    ],
    "hints": [
      "Use generate_series to create sample distribution.",
      "Calculate refund rate with conditional COUNT.",
      "Filter HAVING total_sales >= 50 and refund rate > 5.0%."
    ],
    "explanation": "Refund velocity thresholds trigger automatic store delisting reviews.",
    "number": 154
  },
  {
    "id": "inter-155",
    "title": "155. Nintendo: Multiplayer Matchmaking Ping 90th Percentile by Region",
    "difficulty": "Medium",
    "companies": [
      "Nintendo",
      "Sony"
    ],
    "topics": [
      "PERCENTILE_CONT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nNintendo Network Operations monitors netcode latency. Calculate the 90th percentile latency ping in milliseconds across regional multiplayer server clusters.\n\n### Requirements\n- Compute p90_ping_ms as the continuous 90th percentile of ping_ms per server_region.\n- Round p90_ping_ms to 2 decimal places.\n- Output columns: server_region, match_count, p90_ping_ms.\n- Sort by p90_ping_ms ascending, then by server_region ascending.\n\n### Input Schema\n**match_latency** (id INT, server_region VARCHAR, ping_ms NUMERIC)",
    "schemaSql": "CREATE TABLE match_latency (id INT PRIMARY KEY, server_region VARCHAR(50), ping_ms NUMERIC);\nINSERT INTO match_latency VALUES (1, 'Japan East', 15.0), (2, 'Japan East', 18.0), (3, 'Japan East', 20.0), (4, 'Japan East', 22.0), (5, 'Japan East', 45.0), (6, 'US West', 28.0), (7, 'US West', 32.0), (8, 'US West', 35.0), (9, 'US West', 40.0), (10, 'US West', 85.0);",
    "starterSql": "-- 155. Nintendo: Multiplayer Matchmaking Ping 90th Percentile by Region\n-- Output: server_region, match_count, p90_ping_ms\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT server_region, COUNT(id) AS match_count, ROUND(PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY ping_ms)::NUMERIC, 2) AS p90_ping_ms FROM match_latency GROUP BY server_region ORDER BY p90_ping_ms ASC, server_region ASC;",
    "expectedColumns": [
      "server_region",
      "match_count",
      "p90_ping_ms"
    ],
    "hints": [
      "Use PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY ping_ms).",
      "Group by server_region.",
      "Round to 2 decimals."
    ],
    "explanation": "90th and 99th percentile pings reveal edge network jitter affecting competitive gameplay.",
    "number": 155
  },
  {
    "id": "inter-156",
    "title": "156. Roblox: Top Experience In-Game Purchase Robux Spend per Active Player",
    "difficulty": "Medium",
    "companies": [
      "Roblox",
      "Unity"
    ],
    "topics": [
      "SUM",
      "COUNT DISTINCT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nRoblox Creator Economics measures monetization density. Calculate average Robux spent per unique active player across top games.\n\n### Requirements\n- Sum total robux_spent as total_robux.\n- Count distinct player_id as unique_players.\n- Calculate avg_robux_per_player as total_robux / unique_players, rounded to 2 decimal places.\n- Output columns: universe_name, unique_players, total_robux, avg_robux_per_player.\n- Sort by avg_robux_per_player descending, then by universe_name ascending.\n\n### Input Schema\n**universe_transactions** (id INT, universe_name VARCHAR, player_id INT, robux_spent INT)",
    "schemaSql": "CREATE TABLE universe_transactions (id INT PRIMARY KEY, universe_name VARCHAR(50), player_id INT, robux_spent INT);\nINSERT INTO universe_transactions VALUES (1, 'Adopt Me!', 101, 800), (2, 'Adopt Me!', 101, 500), (3, 'Adopt Me!', 102, 2000), (4, 'Blox Fruits', 103, 1200), (5, 'Blox Fruits', 104, 300), (6, 'Tower of Hell', 105, 100), (7, 'Tower of Hell', 106, 150);",
    "starterSql": "-- 156. Roblox: Top Experience In-Game Purchase Robux Spend per Active Player\n-- Output: universe_name, unique_players, total_robux, avg_robux_per_player\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT universe_name, COUNT(DISTINCT player_id) AS unique_players, SUM(robux_spent) AS total_robux, ROUND(SUM(robux_spent) * 1.0 / COUNT(DISTINCT player_id), 2) AS avg_robux_per_player FROM universe_transactions GROUP BY universe_name ORDER BY avg_robux_per_player DESC, universe_name ASC;",
    "expectedColumns": [
      "universe_name",
      "unique_players",
      "total_robux",
      "avg_robux_per_player"
    ],
    "hints": [
      "Group by universe_name.",
      "Count distinct player_id and sum robux.",
      "Compute ARPU metric rounded to 2 decimals."
    ],
    "explanation": "Monetization density evaluates game virtual economy depth beyond raw visitor count.",
    "number": 156
  },
  {
    "id": "inter-157",
    "title": "157. Unity: Mobile Game Crash Free Session Percentage by Engine Version",
    "difficulty": "Medium",
    "companies": [
      "Unity",
      "Epic Games"
    ],
    "topics": [
      "ROUND",
      "COUNT CASE WHEN",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nUnity Engine Analytics audits SDK stability. Compute crash-free session percentage across Unity engine patch releases.\n\n### Requirements\n- Count total recorded game sessions as total_sessions.\n- Count sessions where crashed = FALSE as clean_sessions.\n- Calculate crash_free_pct as clean_sessions / total_sessions * 100, rounded to 2 decimal places.\n- Output columns: engine_version, total_sessions, clean_sessions, crash_free_pct.\n- Sort by crash_free_pct descending, then by engine_version ascending.\n\n### Input Schema\n**game_telemetry** (id INT, engine_version VARCHAR, crashed BOOLEAN)",
    "schemaSql": "CREATE TABLE game_telemetry (id INT PRIMARY KEY, engine_version VARCHAR(20), crashed BOOLEAN);\nINSERT INTO game_telemetry VALUES (1, '2023.2.1', FALSE), (2, '2023.2.1', FALSE), (3, '2023.2.1', TRUE), (4, '2023.2.1', FALSE), (5, '2023.2.2', FALSE), (6, '2023.2.2', FALSE), (7, '2023.2.2', FALSE), (8, '2023.2.2', FALSE), (9, '2023.1.9', TRUE), (10, '2023.1.9', TRUE);",
    "starterSql": "-- 157. Unity: Mobile Game Crash Free Session Percentage by Engine Version\n-- Output: engine_version, total_sessions, clean_sessions, crash_free_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT engine_version, COUNT(id) AS total_sessions, COUNT(CASE WHEN NOT crashed THEN 1 END) AS clean_sessions, ROUND(COUNT(CASE WHEN NOT crashed THEN 1 END) * 100.0 / COUNT(id), 2) AS crash_free_pct FROM game_telemetry GROUP BY engine_version ORDER BY crash_free_pct DESC, engine_version ASC;",
    "expectedColumns": [
      "engine_version",
      "total_sessions",
      "clean_sessions",
      "crash_free_pct"
    ],
    "hints": [
      "Count non-crashed sessions using CASE WHEN NOT crashed.",
      "Divide by total sessions and multiply by 100.0.",
      "Group by engine_version."
    ],
    "explanation": "Crash-free session rates serve as SLA release gates for mobile runtime updates.",
    "number": 157
  },
  {
    "id": "inter-158",
    "title": "158. Expedia: Hotel Dynamic Search Price Jump After Successive Searches",
    "difficulty": "Medium",
    "companies": [
      "Expedia",
      "Booking.com"
    ],
    "topics": [
      "LEAD",
      "Date Arithmetic",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nExpedia Dynamic Yield investigates price surges triggered by repetitive searches. Identify instances where a user searched the same hotel within 60 minutes and the second quote price was higher.\n\n### Requirements\n- Use LEAD to compare each search to the next search by the same user for the same hotel.\n- Check that time difference is <= 60 minutes and next price > current price.\n- Output columns: user_id, hotel_id, first_price, second_price, price_increase.\n- Sort by price_increase descending, then by user_id ascending.\n\n### Input Schema\n**hotel_searches** (id INT, user_id INT, hotel_id INT, search_time TIMESTAMP, quoted_price NUMERIC)",
    "schemaSql": "CREATE TABLE hotel_searches (id INT PRIMARY KEY, user_id INT, hotel_id INT, search_time TIMESTAMP, quoted_price NUMERIC);\nINSERT INTO hotel_searches VALUES (1, 101, 801, '2025-01-01 10:00:00', 180.00), (2, 101, 801, '2025-01-01 10:25:00', 215.00), (3, 102, 802, '2025-01-01 11:00:00', 300.00), (4, 102, 802, '2025-01-01 11:45:00', 300.00), (5, 103, 803, '2025-01-01 14:00:00', 120.00);",
    "starterSql": "-- 158. Expedia: Hotel Dynamic Search Price Jump After Successive Searches\n-- Output: user_id, hotel_id, first_price, second_price, price_increase\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT user_id, hotel_id, quoted_price AS first_price, LEAD(quoted_price) OVER (PARTITION BY user_id, hotel_id ORDER BY search_time ASC) AS second_price, EXTRACT(EPOCH FROM (LEAD(search_time) OVER (PARTITION BY user_id, hotel_id ORDER BY search_time ASC) - search_time)) / 60.0 AS diff_mins FROM hotel_searches) SELECT user_id, hotel_id, first_price, second_price, (second_price - first_price) AS price_increase FROM ranked WHERE diff_mins IS NOT NULL AND diff_mins <= 60.0 AND second_price > first_price ORDER BY price_increase DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "hotel_id",
      "first_price",
      "second_price",
      "price_increase"
    ],
    "hints": [
      "Use LEAD() partitioned by user_id and hotel_id.",
      "Filter where diff_mins <= 60 and price increased.",
      "Order by price_increase DESC, user_id ASC."
    ],
    "explanation": "Dynamic search pricing can penalize user re-queries if demand triggers inventory reallocation.",
    "number": 158
  },
  {
    "id": "inter-159",
    "title": "159. Booking.com: Weekend vs Weekday Hotel Pricing Premium",
    "difficulty": "Medium",
    "companies": [
      "Booking.com",
      "Airbnb"
    ],
    "topics": [
      "EXTRACT DOW",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nBooking.com Market Yield audits weekend hotel markups. Calculate the average room price for weekend stays (Friday, Saturday nights) vs weekday stays (Sunday-Thursday nights) and the premium difference.\n\n### Requirements\n- Classify Friday (5) and Saturday (6) as Weekend; others as Weekday.\n- Calculate avg_weekend_price and avg_weekday_price rounded to 2 decimal places.\n- Calculate weekend_premium as avg_weekend_price minus avg_weekday_price.\n- Output columns: hotel_name, avg_weekday_price, avg_weekend_price, weekend_premium.\n- Sort by weekend_premium descending, then by hotel_name ascending.\n\n### Input Schema\n**room_bookings** (id INT, hotel_name VARCHAR, stay_date DATE, room_price NUMERIC)",
    "schemaSql": "CREATE TABLE room_bookings (id INT PRIMARY KEY, hotel_name VARCHAR(50), stay_date DATE, room_price NUMERIC);\nINSERT INTO room_bookings VALUES (1, 'Grand Palace Hotel', '2025-01-08', 200.00), (2, 'Grand Palace Hotel', '2025-01-09', 210.00), (3, 'Grand Palace Hotel', '2025-01-10', 320.00), (4, 'Grand Palace Hotel', '2025-01-11', 340.00), (5, 'Seaside Resort', '2025-01-08', 150.00), (6, 'Seaside Resort', '2025-01-10', 210.00);",
    "starterSql": "-- 159. Booking.com: Weekend vs Weekday Hotel Pricing Premium\n-- Output: hotel_name, avg_weekday_price, avg_weekend_price, weekend_premium\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT hotel_name, ROUND(AVG(CASE WHEN EXTRACT(DOW FROM stay_date) NOT IN (5, 6) THEN room_price END), 2) AS avg_weekday_price, ROUND(AVG(CASE WHEN EXTRACT(DOW FROM stay_date) IN (5, 6) THEN room_price END), 2) AS avg_weekend_price, ROUND(AVG(CASE WHEN EXTRACT(DOW FROM stay_date) IN (5, 6) THEN room_price END) - AVG(CASE WHEN EXTRACT(DOW FROM stay_date) NOT IN (5, 6) THEN room_price END), 2) AS weekend_premium FROM room_bookings GROUP BY hotel_name ORDER BY weekend_premium DESC, hotel_name ASC;",
    "expectedColumns": [
      "hotel_name",
      "avg_weekday_price",
      "avg_weekend_price",
      "weekend_premium"
    ],
    "hints": [
      "Use conditional AVG(CASE WHEN EXTRACT(DOW ...) IN (5, 6)).",
      "Subtract weekday average from weekend average.",
      "Round results to 2 decimals."
    ],
    "explanation": "Leisure destination hotels capture significant yield premiums on Friday and Saturday arrivals.",
    "number": 159
  },
  {
    "id": "inter-160",
    "title": "160. Delta: Frequent Flyer Companion Seat Upgrade Clearance Rates",
    "difficulty": "Medium",
    "companies": [
      "Delta",
      "United"
    ],
    "topics": [
      "ROUND",
      "COUNT CASE WHEN",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nDelta SkyMiles Operations measures medallion tier upgrade clearance. Compute the complimentary seat upgrade clearance rate across Medallion loyalty tiers.\n\n### Requirements\n- Count total upgrade requests as total_requests.\n- Count approved upgrades as cleared_upgrades.\n- Calculate clearance_rate_pct as cleared_upgrades / total_requests * 100, rounded to 2 decimal places.\n- Output columns: medallion_tier, total_requests, cleared_upgrades, clearance_rate_pct.\n- Sort by clearance_rate_pct descending, then by medallion_tier ascending.\n\n### Input Schema\n**upgrade_requests** (id INT, medallion_tier VARCHAR, is_cleared BOOLEAN)",
    "schemaSql": "CREATE TABLE upgrade_requests (id INT PRIMARY KEY, medallion_tier VARCHAR(20), is_cleared BOOLEAN);\nINSERT INTO upgrade_requests VALUES (1, 'Diamond', TRUE), (2, 'Diamond', TRUE), (3, 'Diamond', TRUE), (4, 'Diamond', FALSE), (5, 'Platinum', TRUE), (6, 'Platinum', FALSE), (7, 'Platinum', FALSE), (8, 'Gold', FALSE), (9, 'Gold', FALSE), (10, 'Silver', FALSE);",
    "starterSql": "-- 160. Delta: Frequent Flyer Companion Seat Upgrade Clearance Rates\n-- Output: medallion_tier, total_requests, cleared_upgrades, clearance_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT medallion_tier, COUNT(id) AS total_requests, COUNT(CASE WHEN is_cleared THEN 1 END) AS cleared_upgrades, ROUND(COUNT(CASE WHEN is_cleared THEN 1 END) * 100.0 / COUNT(id), 2) AS clearance_rate_pct FROM upgrade_requests GROUP BY medallion_tier ORDER BY clearance_rate_pct DESC, medallion_tier ASC;",
    "expectedColumns": [
      "medallion_tier",
      "total_requests",
      "cleared_upgrades",
      "clearance_rate_pct"
    ],
    "hints": [
      "Group by medallion_tier.",
      "Count cleared upgrades using conditional aggregation.",
      "Order by clearance rate descending."
    ],
    "explanation": "Clearance rates validate status tier perks and loyalty tier satisfaction.",
    "number": 160
  },
  {
    "id": "inter-161",
    "title": "161. United: Flight Hub Connection Minimum Layover Risk Windows",
    "difficulty": "Medium",
    "companies": [
      "United",
      "American Airlines"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "WHERE",
      "JOIN"
    ],
    "frequency": "High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "description": "### Problem Statement\nUnited Hub Network Planning audits flight connection transfer feasibility. Identify connecting passenger itineraries through hub airports where the scheduled layover window is strictly under 45 minutes.\n\n### Requirements\n- Join inbound flights and outbound flights on passenger_id and connection_airport.\n- Calculate layover_minutes as minutes between inbound arrival and outbound departure.\n- Filter for layover_minutes > 0 and layover_minutes < 45.\n- Output columns: passenger_id, connection_airport, inbound_flight, outbound_flight, layover_minutes.\n- Sort by layover_minutes ascending, then by passenger_id ascending.\n\n### Input Schema\n**flight_segments** (id INT, passenger_id INT, flight_number VARCHAR, origin VARCHAR, destination VARCHAR, scheduled_departure TIMESTAMP, scheduled_arrival TIMESTAMP)",
    "schemaSql": "CREATE TABLE flight_segments (id INT PRIMARY KEY, passenger_id INT, flight_number VARCHAR(10), origin VARCHAR(5), destination VARCHAR(5), scheduled_departure TIMESTAMP, scheduled_arrival TIMESTAMP);\nINSERT INTO flight_segments VALUES (1, 101, 'UA120', 'SFO', 'ORD', '2025-01-01 10:00:00', '2025-01-01 16:00:00'), (2, 101, 'UA450', 'ORD', 'LGA', '2025-01-01 16:35:00', '2025-01-01 19:30:00'), (3, 102, 'UA210', 'DEN', 'ORD', '2025-01-01 11:00:00', '2025-01-01 17:00:00'), (4, 102, 'UA990', 'ORD', 'FRA', '2025-01-01 17:30:00', '2025-01-01 22:00:00');",
    "starterSql": "-- 161. United: Flight Hub Connection Minimum Layover Risk Windows\n-- Output: passenger_id, connection_airport, inbound_flight, outbound_flight, layover_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT in_fl.passenger_id, in_fl.destination AS connection_airport, in_fl.flight_number AS inbound_flight, out_fl.flight_number AS outbound_flight, EXTRACT(EPOCH FROM (out_fl.scheduled_departure - in_fl.scheduled_arrival))::INT / 60 AS layover_minutes FROM flight_segments in_fl JOIN flight_segments out_fl ON in_fl.passenger_id = out_fl.passenger_id AND in_fl.destination = out_fl.origin WHERE EXTRACT(EPOCH FROM (out_fl.scheduled_departure - in_fl.scheduled_arrival))::INT / 60 BETWEEN 1 AND 44 ORDER BY layover_minutes ASC, in_fl.passenger_id ASC;",
    "expectedColumns": [
      "passenger_id",
      "connection_airport",
      "inbound_flight",
      "outbound_flight",
      "layover_minutes"
    ],
    "hints": [
      "Join arrival segment to departure segment on passenger_id and airport.",
      "Calculate layover elapsed minutes.",
      "Filter layover between 1 and 44 minutes."
    ],
    "explanation": "Minimum Connection Time (MCT) violations dramatically escalate misconnected luggage claims.",
    "number": 161
  },
  {
    "id": "inter-162",
    "title": "162. American Airlines: Daily Tail Number Flight Turnaround Time Efficiency",
    "difficulty": "Medium",
    "companies": [
      "American Airlines",
      "Delta"
    ],
    "topics": [
      "LAG",
      "Date Arithmetic",
      "AVG",
      "ROUND",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nAmerican Airlines Fleet Operations benchmarks aircraft ground utilization. For each aircraft tail number, calculate the average turnaround ground time (minutes between previous flight arrival and next flight departure).\n\n### Requirements\n- Use LAG to find previous flight arrival time on the same aircraft tail_number.\n- Calculate turnaround ground minutes between arrival and next departure.\n- Compute avg_turnaround_mins per tail number, rounded to 2 decimal places.\n- Only consider turnarounds between 30 and 180 minutes.\n- Output columns: tail_number, completed_turnarounds, avg_turnaround_mins.\n- Sort by avg_turnaround_mins ascending, then by tail_number ascending.\n\n### Input Schema\n**aircraft_flights** (id INT, tail_number VARCHAR, departure_time TIMESTAMP, arrival_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE aircraft_flights (id INT PRIMARY KEY, tail_number VARCHAR(10), departure_time TIMESTAMP, arrival_time TIMESTAMP);\nINSERT INTO aircraft_flights VALUES (1, 'N101AA', '2025-01-01 07:00:00', '2025-01-01 09:30:00'), (2, 'N101AA', '2025-01-01 10:15:00', '2025-01-01 13:00:00'), (3, 'N101AA', '2025-01-01 14:00:00', '2025-01-01 16:30:00'), (4, 'N202AA', '2025-01-01 08:00:00', '2025-01-01 11:00:00'), (5, 'N202AA', '2025-01-01 12:30:00', '2025-01-01 15:30:00');",
    "starterSql": "-- 162. American Airlines: Daily Tail Number Flight Turnaround Time Efficiency\n-- Output: tail_number, completed_turnarounds, avg_turnaround_mins\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH legs AS (SELECT tail_number, departure_time, LAG(arrival_time) OVER (PARTITION BY tail_number ORDER BY departure_time ASC) AS prev_arrival FROM aircraft_flights), turns AS (SELECT tail_number, EXTRACT(EPOCH FROM (departure_time - prev_arrival))::INT / 60 AS turn_mins FROM legs WHERE prev_arrival IS NOT NULL) SELECT tail_number, COUNT(turn_mins) AS completed_turnarounds, ROUND(AVG(turn_mins), 2) AS avg_turnaround_mins FROM turns WHERE turn_mins BETWEEN 30 AND 180 GROUP BY tail_number ORDER BY avg_turnaround_mins ASC, tail_number ASC;",
    "expectedColumns": [
      "tail_number",
      "completed_turnarounds",
      "avg_turnaround_mins"
    ],
    "hints": [
      "Use LAG(arrival_time) partitioned by tail_number.",
      "Extract minutes between previous arrival and current departure.",
      "Filter between 30 and 180 minutes."
    ],
    "explanation": "Fast gate turnaround increases daily aircraft flight cycles and asset productivity.",
    "number": 162
  },
  {
    "id": "inter-163",
    "title": "163. Marriott: Bonvoy Elite Member Tier Qualification Night Thresholds",
    "difficulty": "Medium",
    "companies": [
      "Marriott",
      "Hilton"
    ],
    "topics": [
      "SUM OVER",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nMarriott Bonvoy Loyalty tracks member tier qualification. Find the exact date when each member reached 50 cumulative stayed nights to qualify for Platinum Elite status.\n\n### Requirements\n- Compute cumulative stayed nights for each member over time.\n- Filter for rows where cumulative nights >= 50.\n- Select the earliest date when 50 nights was achieved.\n- Output columns: member_name, qualification_date, total_nights.\n- Sort by qualification_date ascending, then by member_name ascending.\n\n### Input Schema\n**stay_records** (id INT, member_name VARCHAR, checkout_date DATE, nights_stayed INT)",
    "schemaSql": "CREATE TABLE stay_records (id INT PRIMARY KEY, member_name VARCHAR(50), checkout_date DATE, nights_stayed INT);\nINSERT INTO stay_records VALUES (1, 'Robert Lang', '2025-01-15', 20), (2, 'Robert Lang', '2025-02-10', 25), (3, 'Robert Lang', '2025-03-05', 10), (4, 'Emma Wood', '2025-01-20', 30), (5, 'Emma Wood', '2025-02-25', 25);",
    "starterSql": "-- 163. Marriott: Bonvoy Elite Member Tier Qualification Night Thresholds\n-- Output: member_name, qualification_date, total_nights\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT member_name, checkout_date, SUM(nights_stayed) OVER (PARTITION BY member_name ORDER BY checkout_date ASC) AS total_nights FROM stay_records), ranked AS (SELECT member_name, checkout_date AS qualification_date, total_nights, ROW_NUMBER() OVER (PARTITION BY member_name ORDER BY checkout_date ASC) AS rn FROM cum WHERE total_nights >= 50) SELECT member_name, qualification_date, total_nights FROM ranked WHERE rn = 1 ORDER BY qualification_date ASC, member_name ASC;",
    "expectedColumns": [
      "member_name",
      "qualification_date",
      "total_nights"
    ],
    "hints": [
      "Calculate running stayed nights using SUM() OVER.",
      "Filter for >= 50 in subsequent CTE.",
      "Pick first date with ROW_NUMBER() = 1."
    ],
    "explanation": "Loyalty tier milestones unlock room upgrades, lounge access, and bonus points.",
    "number": 163
  },
  {
    "id": "inter-164",
    "title": "164. Hilton: Consecutive Multi-Night Hotel Stays Across Properties",
    "difficulty": "Medium",
    "companies": [
      "Hilton",
      "Marriott"
    ],
    "topics": [
      "LEAD",
      "Date Arithmetic",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nHilton Honors identifies frequent travelers who hop consecutively between different brand properties. Find all guest bookings where checkout date on one property exactly matches checkin date on a subsequent property.\n\n### Requirements\n- Compare checkout_date of current stay with checkin_date of the immediately following stay for the same guest using LEAD.\n- Filter for instances where checkout_date = next_checkin_date and current hotel != next hotel.\n- Output columns: guest_id, first_hotel, second_hotel, transfer_date.\n- Sort by guest_id ascending, then by transfer_date ascending.\n\n### Input Schema\n**guest_reservations** (id INT, guest_id INT, hotel_name VARCHAR, checkin_date DATE, checkout_date DATE)",
    "schemaSql": "CREATE TABLE guest_reservations (id INT PRIMARY KEY, guest_id INT, hotel_name VARCHAR(50), checkin_date DATE, checkout_date DATE);\nINSERT INTO guest_reservations VALUES (1, 101, 'Hilton Austin', '2025-01-01', '2025-01-04'), (2, 101, 'Conrad Dallas', '2025-01-04', '2025-01-07'), (3, 102, 'Hilton Chicago', '2025-01-02', '2025-01-05'), (4, 102, 'DoubleTree Chicago', '2025-01-06', '2025-01-08');",
    "starterSql": "-- 164. Hilton: Consecutive Multi-Night Hotel Stays Across Properties\n-- Output: guest_id, first_hotel, second_hotel, transfer_date\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT guest_id, hotel_name AS first_hotel, checkout_date AS transfer_date, LEAD(hotel_name) OVER (PARTITION BY guest_id ORDER BY checkin_date ASC) AS second_hotel, LEAD(checkin_date) OVER (PARTITION BY guest_id ORDER BY checkin_date ASC) AS next_checkin FROM guest_reservations) SELECT guest_id, first_hotel, second_hotel, transfer_date FROM ranked WHERE transfer_date = next_checkin AND first_hotel != second_hotel ORDER BY guest_id ASC, transfer_date ASC;",
    "expectedColumns": [
      "guest_id",
      "first_hotel",
      "second_hotel",
      "transfer_date"
    ],
    "hints": [
      "Use LEAD() to check next checkin date and hotel.",
      "Filter where transfer_date = next_checkin.",
      "Order by guest_id ASC, transfer_date ASC."
    ],
    "explanation": "Inter-property transfers highlight traveling consultants and digital nomads.",
    "number": 164
  },
  {
    "id": "inter-165",
    "title": "165. Tesla: Supercharger Peak Hour Stall Utilization Percentage",
    "difficulty": "Medium",
    "companies": [
      "Tesla",
      "Rivian"
    ],
    "topics": [
      "ROUND",
      "AVG",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nTesla Charging Infrastructure monitors station congestion. Calculate the peak hour stall utilization percentage (average charging vehicles divided by total stalls * 100) across charging stations.\n\n### Requirements\n- Calculate utilization_pct as (avg_vehicles_charging / total_stalls) * 100, rounded to 2 decimal places.\n- Filter for peak operating hours (hour_of_day BETWEEN 16 AND 20).\n- Output columns: station_name, total_stalls, utilization_pct.\n- Sort by utilization_pct descending, then by station_name ascending.\n\n### Input Schema\n**station_occupancy** (id INT, station_name VARCHAR, total_stalls INT, hour_of_day INT, vehicles_charging INT)",
    "schemaSql": "CREATE TABLE station_occupancy (id INT PRIMARY KEY, station_name VARCHAR(50), total_stalls INT, hour_of_day INT, vehicles_charging INT);\nINSERT INTO station_occupancy VALUES (1, 'Kettleman City', 40, 17, 36), (2, 'Kettleman City', 40, 18, 38), (3, 'Barstow Supercharger', 24, 17, 22), (4, 'Barstow Supercharger', 24, 18, 20), (5, 'Baker Supercharger', 30, 17, 12);",
    "starterSql": "-- 165. Tesla: Supercharger Peak Hour Stall Utilization Percentage\n-- Output: station_name, total_stalls, utilization_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT station_name, total_stalls, ROUND(AVG(vehicles_charging) * 100.0 / total_stalls, 2) AS utilization_pct FROM station_occupancy WHERE hour_of_day BETWEEN 16 AND 20 GROUP BY station_name, total_stalls ORDER BY utilization_pct DESC, station_name ASC;",
    "expectedColumns": [
      "station_name",
      "total_stalls",
      "utilization_pct"
    ],
    "hints": [
      "Filter WHERE hour_of_day BETWEEN 16 AND 20.",
      "Compute AVG(vehicles_charging) / total_stalls.",
      "Round to 2 decimals."
    ],
    "explanation": "Stall occupancy analytics drive dynamic congestion fee surcharges.",
    "number": 165
  },
  {
    "id": "inter-166",
    "title": "166. Rivian: Dual-Motor vs Quad-Motor Range Degradation in Cold Climates",
    "difficulty": "Medium",
    "companies": [
      "Rivian",
      "Tesla"
    ],
    "topics": [
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nRivian Battery Systems benchmarks winter powertrain efficiency. Compare average real-world range efficiency (miles achieved / rated miles * 100) between Dual-Motor and Quad-Motor models in sub-freezing temperatures (temp_f < 32).\n\n### Requirements\n- Filter drives where ambient_temp_f < 32.\n- Calculate efficiency_pct as (actual_miles / rated_miles) * 100, rounded to 2 decimal places.\n- Output columns: powertrain, total_drives, avg_efficiency_pct.\n- Sort by avg_efficiency_pct descending, then by powertrain ascending.\n\n### Input Schema\n**drive_efficiency** (id INT, powertrain VARCHAR, ambient_temp_f INT, rated_miles NUMERIC, actual_miles NUMERIC)",
    "schemaSql": "CREATE TABLE drive_efficiency (id INT PRIMARY KEY, powertrain VARCHAR(20), ambient_temp_f INT, rated_miles NUMERIC, actual_miles NUMERIC);\nINSERT INTO drive_efficiency VALUES (1, 'Dual-Motor', 20, 250.0, 195.0), (2, 'Dual-Motor', 15, 200.0, 150.0), (3, 'Quad-Motor', 20, 250.0, 175.0), (4, 'Quad-Motor', 18, 220.0, 150.0), (5, 'Dual-Motor', 45, 250.0, 240.0);",
    "starterSql": "-- 166. Rivian: Dual-Motor vs Quad-Motor Range Degradation in Cold Climates\n-- Output: powertrain, total_drives, avg_efficiency_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT powertrain, COUNT(id) AS total_drives, ROUND(AVG(actual_miles * 100.0 / rated_miles), 2) AS avg_efficiency_pct FROM drive_efficiency WHERE ambient_temp_f < 32 GROUP BY powertrain ORDER BY avg_efficiency_pct DESC, powertrain ASC;",
    "expectedColumns": [
      "powertrain",
      "total_drives",
      "avg_efficiency_pct"
    ],
    "hints": [
      "Filter WHERE ambient_temp_f < 32.",
      "Group by powertrain.",
      "Compute average percentage efficiency."
    ],
    "explanation": "Cold-weather range degradation informs cabin pre-conditioning algorithms.",
    "number": 166
  },
  {
    "id": "inter-167",
    "title": "167. Ford: Commercial Telematics Fleet Vehicle Excessive Idling Fuel Waste",
    "difficulty": "Medium",
    "companies": [
      "Ford",
      "Tesla"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nFord Pro Commercial Telematics monitors fleet fuel economy. For vehicles that accumulated over 10 hours of engine idle time in a week, calculate wasted fuel volume and idle cost at $3.50 per gallon.\n\n### Requirements\n- Sum idle_hours and fuel_wasted_gallons per vehicle.\n- Calculate total_idle_cost as fuel_wasted_gallons * 3.50, rounded to 2 decimal places.\n- Filter for vehicles with total idle_hours > 10.0.\n- Output columns: vehicle_vin, fleet_name, total_idle_hours, total_fuel_wasted, total_idle_cost.\n- Sort by total_idle_cost descending, then by vehicle_vin ascending.\n\n### Input Schema\n**fleet_telematics** (id INT, vehicle_vin VARCHAR, fleet_name VARCHAR, idle_hours NUMERIC, fuel_wasted_gallons NUMERIC)",
    "schemaSql": "CREATE TABLE fleet_telematics (id INT PRIMARY KEY, vehicle_vin VARCHAR(20), fleet_name VARCHAR(50), idle_hours NUMERIC, fuel_wasted_gallons NUMERIC);\nINSERT INTO fleet_telematics VALUES (1, '1FTFW1E81', 'Plumbing Pros', 6.5, 5.2), (2, '1FTFW1E81', 'Plumbing Pros', 5.0, 4.0), (3, '1FTFW1E82', 'City Logistics', 12.0, 9.6), (4, '1FTFW1E83', 'Metro Express', 3.0, 2.4);",
    "starterSql": "-- 167. Ford: Commercial Telematics Fleet Vehicle Excessive Idling Fuel Waste\n-- Output: vehicle_vin, fleet_name, total_idle_hours, total_fuel_wasted, total_idle_cost\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT vehicle_vin, fleet_name, ROUND(SUM(idle_hours), 2) AS total_idle_hours, ROUND(SUM(fuel_wasted_gallons), 2) AS total_fuel_wasted, ROUND(SUM(fuel_wasted_gallons) * 3.50, 2) AS total_idle_cost FROM fleet_telematics GROUP BY vehicle_vin, fleet_name HAVING SUM(idle_hours) > 10.0 ORDER BY total_idle_cost DESC, vehicle_vin ASC;",
    "expectedColumns": [
      "vehicle_vin",
      "fleet_name",
      "total_idle_hours",
      "total_fuel_wasted",
      "total_idle_cost"
    ],
    "hints": [
      "Group by vehicle_vin and fleet_name.",
      "Sum idle hours and wasted fuel.",
      "Filter HAVING SUM(idle_hours) > 10.0."
    ],
    "explanation": "Idle time fuel analysis allows commercial fleet operators to reduce operating expenses.",
    "number": 167
  },
  {
    "id": "inter-168",
    "title": "168. FedEx: Sort Facility Conveyor Jam Incident Frequency per Shift",
    "difficulty": "Medium",
    "companies": [
      "FedEx",
      "UPS"
    ],
    "topics": [
      "COUNT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nFedEx Hub Logistics monitors sorting facility uptime. Calculate the conveyor jam incident rate per 1,000 packages processed across hub sorting shifts.\n\n### Requirements\n- Sum packages_processed and count jam_incidents per facility and shift.\n- Calculate jam_rate_per_1000 as (jam_incidents * 1000.0 / packages_processed), rounded to 2 decimal places.\n- Output columns: facility_code, shift_name, packages_processed, jam_incidents, jam_rate_per_1000.\n- Sort by jam_rate_per_1000 descending, then by facility_code ascending.\n\n### Input Schema\n**conveyor_shifts** (id INT, facility_code VARCHAR, shift_name VARCHAR, packages_processed INT, jam_incidents INT)",
    "schemaSql": "CREATE TABLE conveyor_shifts (id INT PRIMARY KEY, facility_code VARCHAR(10), shift_name VARCHAR(20), packages_processed INT, jam_incidents INT);\nINSERT INTO conveyor_shifts VALUES (1, 'MEM_HUB', 'Day Shift', 450000, 18), (2, 'MEM_HUB', 'Night Shift', 600000, 36), (3, 'IND_HUB', 'Day Shift', 300000, 6), (4, 'IND_HUB', 'Night Shift', 400000, 14);",
    "starterSql": "-- 168. FedEx: Sort Facility Conveyor Jam Incident Frequency per Shift\n-- Output: facility_code, shift_name, packages_processed, jam_incidents, jam_rate_per_1000\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT facility_code, shift_name, SUM(packages_processed) AS packages_processed, SUM(jam_incidents) AS jam_incidents, ROUND(SUM(jam_incidents) * 1000.0 / NULLIF(SUM(packages_processed), 0), 2) AS jam_rate_per_1000 FROM conveyor_shifts GROUP BY facility_code, shift_name ORDER BY jam_rate_per_1000 DESC, facility_code ASC;",
    "expectedColumns": [
      "facility_code",
      "shift_name",
      "packages_processed",
      "jam_incidents",
      "jam_rate_per_1000"
    ],
    "hints": [
      "Group by facility_code and shift_name.",
      "Compute rate per 1,000 packages processed.",
      "Order by jam rate DESC."
    ],
    "explanation": "Conveyor bottleneck metrics direct maintenance teams to high-wear transfer chutes.",
    "number": 168
  },
  {
    "id": "inter-169",
    "title": "169. UPS: Driver Next-Day Air Package Delivery On-Time Delivery Rate",
    "difficulty": "Medium",
    "companies": [
      "UPS",
      "FedEx"
    ],
    "topics": [
      "COUNT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nUPS Last-Mile Operations audits Next-Day Air SLA delivery commitments. Compute the on-time delivery rate (delivered by 10:30 AM commitment) across delivery centers.\n\n### Requirements\n- Count total air deliveries as total_deliveries.\n- Count deliveries completed on or before commitment_time as on_time_deliveries.\n- Calculate on_time_rate_pct as on_time_deliveries / total_deliveries * 100, rounded to 2 decimal places.\n- Output columns: center_id, total_deliveries, on_time_deliveries, on_time_rate_pct.\n- Sort by on_time_rate_pct descending, then by center_id ascending.\n\n### Input Schema\n**air_deliveries** (id INT, center_id VARCHAR, delivered_time TIMESTAMP, commitment_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE air_deliveries (id INT PRIMARY KEY, center_id VARCHAR(10), delivered_time TIMESTAMP, commitment_time TIMESTAMP);\nINSERT INTO air_deliveries VALUES (1, 'ATL_01', '2025-01-01 10:15:00', '2025-01-01 10:30:00'), (2, 'ATL_01', '2025-01-01 10:28:00', '2025-01-01 10:30:00'), (3, 'ATL_01', '2025-01-01 10:45:00', '2025-01-01 10:30:00'), (4, 'ORD_02', '2025-01-01 09:50:00', '2025-01-01 10:30:00'), (5, 'ORD_02', '2025-01-01 10:10:00', '2025-01-01 10:30:00');",
    "starterSql": "-- 169. UPS: Driver Next-Day Air Package Delivery On-Time Delivery Rate\n-- Output: center_id, total_deliveries, on_time_deliveries, on_time_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT center_id, COUNT(id) AS total_deliveries, COUNT(CASE WHEN delivered_time <= commitment_time THEN 1 END) AS on_time_deliveries, ROUND(COUNT(CASE WHEN delivered_time <= commitment_time THEN 1 END) * 100.0 / COUNT(id), 2) AS on_time_rate_pct FROM air_deliveries GROUP BY center_id ORDER BY on_time_rate_pct DESC, center_id ASC;",
    "expectedColumns": [
      "center_id",
      "total_deliveries",
      "on_time_deliveries",
      "on_time_rate_pct"
    ],
    "hints": [
      "Compare delivered_time <= commitment_time.",
      "Compute on-time percentage per center.",
      "Order by on_time_rate_pct DESC, center_id ASC."
    ],
    "explanation": "Next-Day Air SLA reliability drives corporate shipping contract guarantees.",
    "number": 169
  },
  {
    "id": "inter-170",
    "title": "170. DHL: International Customs Clearance Delay Above 48 Hours",
    "difficulty": "Medium",
    "companies": [
      "DHL",
      "FedEx"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "ROUND",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nDHL Customs Clearance Operations tracks international freight compliance bottlenecks. Find all customs import shipments where clearance elapsed time strictly exceeded 48 hours.\n\n### Requirements\n- Calculate clearance_hours as elapsed hours between arrival_time and clearance_time.\n- Filter for shipments where clearance_hours > 48.0.\n- Output columns: tracking_number, destination_country, arrival_time, clearance_time, clearance_hours.\n- Sort by clearance_hours descending, then by tracking_number ascending.\n\n### Input Schema\n**customs_shipments** (id INT, tracking_number VARCHAR, destination_country VARCHAR, arrival_time TIMESTAMP, clearance_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE customs_shipments (id INT PRIMARY KEY, tracking_number VARCHAR(20), destination_country VARCHAR(10), arrival_time TIMESTAMP, clearance_time TIMESTAMP);\nINSERT INTO customs_shipments VALUES (1, 'DHL1001', 'DE', '2025-01-01 08:00:00', '2025-01-03 14:00:00'), (2, 'DHL1002', 'BR', '2025-01-01 09:00:00', '2025-01-04 18:00:00'), (3, 'DHL1003', 'JP', '2025-01-01 10:00:00', '2025-01-02 12:00:00');",
    "starterSql": "-- 170. DHL: International Customs Clearance Delay Above 48 Hours\n-- Output: tracking_number, destination_country, arrival_time, clearance_time, clearance_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT tracking_number, destination_country, arrival_time, clearance_time, ROUND(EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0, 2) AS clearance_hours FROM customs_shipments WHERE EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0 > 48.0 ORDER BY clearance_hours DESC, tracking_number ASC;",
    "expectedColumns": [
      "tracking_number",
      "destination_country",
      "arrival_time",
      "clearance_time",
      "clearance_hours"
    ],
    "hints": [
      "Extract epoch seconds and divide by 3600.0.",
      "Filter where hours > 48.0.",
      "Order by clearance_hours DESC, tracking_number ASC."
    ],
    "explanation": "Regulatory customs clearance tracking prevents warehouse demurrage penalties.",
    "number": 170
  },
  {
    "id": "inter-171",
    "title": "171. Maersk: Ocean Container Detention and Demurrage Charges by Port",
    "difficulty": "Medium",
    "companies": [
      "Maersk",
      "DHL"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nMaersk Port Operations bills container demurrage when ocean containers exceed free dwell time at port terminals. Calculate total demurrage fees for shipping lines where total charges exceed $2,000.\n\n### Requirements\n- Calculate demurrage days as GREATEST(dwell_days - free_days, 0).\n- Compute total demurrage charge as demurrage days multiplied by daily_rate.\n- Filter for shipping lines with total charges > 2000.\n- Output columns: shipping_line, port_code, total_demurrage_fee.\n- Sort by total_demurrage_fee descending, then by shipping_line ascending.\n\n### Input Schema\n**container_dwell** (id INT, shipping_line VARCHAR, port_code VARCHAR, dwell_days INT, free_days INT, daily_rate NUMERIC)",
    "schemaSql": "CREATE TABLE container_dwell (id INT PRIMARY KEY, shipping_line VARCHAR(50), port_code VARCHAR(10), dwell_days INT, free_days INT, daily_rate NUMERIC);\nINSERT INTO container_dwell VALUES (1, 'Apex Freight', 'LAX', 12, 5, 200.00), (2, 'Apex Freight', 'LAX', 9, 5, 200.00), (3, 'Blue Ocean', 'LAX', 6, 5, 200.00), (4, 'Cargo Express', 'NYC', 15, 7, 250.00);",
    "starterSql": "-- 171. Maersk: Ocean Container Detention and Demurrage Charges by Port\n-- Output: shipping_line, port_code, total_demurrage_fee\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT shipping_line, port_code, ROUND(SUM(GREATEST(dwell_days - free_days, 0) * daily_rate), 2) AS total_demurrage_fee FROM container_dwell GROUP BY shipping_line, port_code HAVING SUM(GREATEST(dwell_days - free_days, 0) * daily_rate) > 2000 ORDER BY total_demurrage_fee DESC, shipping_line ASC;",
    "expectedColumns": [
      "shipping_line",
      "port_code",
      "total_demurrage_fee"
    ],
    "hints": [
      "Use GREATEST(dwell_days - free_days, 0).",
      "Multiply by daily_rate and sum per shipping line and port.",
      "Filter HAVING total fee > 2000."
    ],
    "explanation": "Port demurrage incentives ensure rapid container turnaround at saturated container terminals.",
    "number": 171
  },
  {
    "id": "inter-172",
    "title": "172. Zillow: Price Reduction Magnitude on Properties Listed Over 60 Days",
    "difficulty": "Medium",
    "companies": [
      "Zillow",
      "Redfin"
    ],
    "topics": [
      "ROUND",
      "Date Arithmetic",
      "WHERE"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nZillow Price Insights analyzes price cut incentives for stagnant listings. For properties listed over 60 days where original_price was reduced, compute total discount amount and discount percentage.\n\n### Requirements\n- Filter for properties where days_on_market > 60 and current_price < original_price.\n- Calculate discount_amount as original_price minus current_price.\n- Calculate discount_pct as (discount_amount / original_price) * 100, rounded to 2 decimal places.\n- Output columns: property_address, days_on_market, original_price, current_price, discount_amount, discount_pct.\n- Sort by discount_pct descending, then by original_price descending.\n\n### Input Schema\n**property_listings** (id INT, property_address VARCHAR, days_on_market INT, original_price NUMERIC, current_price NUMERIC)",
    "schemaSql": "CREATE TABLE property_listings (id INT PRIMARY KEY, property_address VARCHAR(100), days_on_market INT, original_price NUMERIC, current_price NUMERIC);\nINSERT INTO property_listings VALUES (1, '124 Main St, Austin TX', 75, 550000.00, 495000.00), (2, '88 Pine St, Denver CO', 90, 820000.00, 750000.00), (3, '14 Oak Ave, Seattle WA', 45, 600000.00, 580000.00), (4, '9 Elm Blvd, Miami FL', 80, 400000.00, 400000.00);",
    "starterSql": "-- 172. Zillow: Price Reduction Magnitude on Properties Listed Over 60 Days\n-- Output: property_address, days_on_market, original_price, current_price, discount_amount, discount_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT property_address, days_on_market, original_price, current_price, (original_price - current_price) AS discount_amount, ROUND((original_price - current_price) * 100.0 / original_price, 2) AS discount_pct FROM property_listings WHERE days_on_market > 60 AND current_price < original_price ORDER BY discount_pct DESC, original_price DESC;",
    "expectedColumns": [
      "property_address",
      "days_on_market",
      "original_price",
      "current_price",
      "discount_amount",
      "discount_pct"
    ],
    "hints": [
      "Filter WHERE days_on_market > 60 AND current_price < original_price.",
      "Calculate discount and percentage.",
      "Order by discount_pct DESC, original_price DESC."
    ],
    "explanation": "Price reduction velocity signals market softening and buyer negotiation leverage.",
    "number": 172
  },
  {
    "id": "inter-173",
    "title": "173. Redfin: Percent of Homes Sold Above List Price by Zip Code",
    "difficulty": "Medium",
    "companies": [
      "Redfin",
      "Zillow"
    ],
    "topics": [
      "ROUND",
      "COUNT CASE WHEN",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nRedfin Housing Market Trends measures competitive bidding heat. Calculate the percentage of closed home transactions that sold strictly above original list price for each postal zip code.\n\n### Requirements\n- Count total closed sales per zip_code.\n- Count transactions where sale_price > list_price as over_ask_sales.\n- Calculate over_ask_pct as over_ask_sales / total closed sales * 100, rounded to 2 decimal places.\n- Only include zip codes with at least 3 recorded sales.\n- Output columns: zip_code, total_sales, over_ask_sales, over_ask_pct.\n- Sort by over_ask_pct descending, then by zip_code ascending.\n\n### Input Schema\n**closed_sales** (id INT, zip_code VARCHAR, list_price NUMERIC, sale_price NUMERIC)",
    "schemaSql": "CREATE TABLE closed_sales (id INT PRIMARY KEY, zip_code VARCHAR(10), list_price NUMERIC, sale_price NUMERIC);\nINSERT INTO closed_sales VALUES (1, '94107', 1200000, 1350000), (2, '94107', 950000, 1020000), (3, '94107', 1100000, 1100000), (4, '94107', 800000, 850000), (5, '78701', 600000, 590000), (6, '78701', 750000, 750000), (7, '78701', 820000, 810000);",
    "starterSql": "-- 173. Redfin: Percent of Homes Sold Above List Price by Zip Code\n-- Output: zip_code, total_sales, over_ask_sales, over_ask_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT zip_code, COUNT(id) AS total_sales, COUNT(CASE WHEN sale_price > list_price THEN 1 END) AS over_ask_sales, ROUND(COUNT(CASE WHEN sale_price > list_price THEN 1 END) * 100.0 / COUNT(id), 2) AS over_ask_pct FROM closed_sales GROUP BY zip_code HAVING COUNT(id) >= 3 ORDER BY over_ask_pct DESC, zip_code ASC;",
    "expectedColumns": [
      "zip_code",
      "total_sales",
      "over_ask_sales",
      "over_ask_pct"
    ],
    "hints": [
      "Use conditional COUNT(CASE WHEN sale_price > list_price).",
      "Divide by total sales and round to 2 decimals.",
      "Filter HAVING COUNT(id) >= 3."
    ],
    "explanation": "Over-ask sales percentages quantify local bidding intensity in seller markets.",
    "number": 173
  },
  {
    "id": "inter-174",
    "title": "174. Compass: Top 10 Percent Real Estate Agents by Gross Commission Income",
    "difficulty": "Medium",
    "companies": [
      "Compass",
      "Redfin"
    ],
    "topics": [
      "PERCENT_RANK",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nCompass Brokerage Services qualifies agents for the President's Club. Identify all agents who rank in the top 10% (percentile >= 0.90) by annual Gross Commission Income (GCI) within their regional office.\n\n### Requirements\n- Compute percent_rank of gross_commission partitioned by office_location ordered by gross_commission ASC.\n- Filter for agents with percent_rank >= 0.90.\n- Output columns: office_location, agent_name, gross_commission.\n- Sort by office_location ascending, gross_commission descending, then by agent_name ascending.\n\n### Input Schema\n**agent_commissions** (id INT, office_location VARCHAR, agent_name VARCHAR, gross_commission NUMERIC)",
    "schemaSql": "CREATE TABLE agent_commissions (id INT PRIMARY KEY, office_location VARCHAR(50), agent_name VARCHAR(50), gross_commission NUMERIC);\nINSERT INTO agent_commissions VALUES (1, 'Beverly Hills', 'Josh Altman', 950000.00), (2, 'Beverly Hills', 'Tracy Tutor', 720000.00), (3, 'Beverly Hills', 'James Harris', 610000.00), (4, 'Beverly Hills', 'Agent Dave', 210000.00), (5, 'Beverly Hills', 'Agent Eve', 180000.00), (6, 'Beverly Hills', 'Agent Frank', 150000.00), (7, 'Beverly Hills', 'Agent Grace', 120000.00), (8, 'Beverly Hills', 'Agent Hank', 110000.00), (9, 'Beverly Hills', 'Agent Ivy', 90000.00), (10, 'Beverly Hills', 'Agent Jack', 80000.00);",
    "starterSql": "-- 174. Compass: Top 10 Percent Real Estate Agents by Gross Commission Income\n-- Output: office_location, agent_name, gross_commission\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT office_location, agent_name, gross_commission, PERCENT_RANK() OVER (PARTITION BY office_location ORDER BY gross_commission ASC) AS pr FROM agent_commissions) SELECT office_location, agent_name, gross_commission FROM ranked WHERE pr >= 0.90 ORDER BY office_location ASC, gross_commission DESC, agent_name ASC;",
    "expectedColumns": [
      "office_location",
      "agent_name",
      "gross_commission"
    ],
    "hints": [
      "Use PERCENT_RANK() OVER (PARTITION BY office_location ORDER BY gross_commission ASC).",
      "Filter WHERE pr >= 0.90.",
      "Order by gross_commission DESC."
    ],
    "explanation": "Percentile benchmarks isolate elite revenue generators across regional branch networks.",
    "number": 174
  },
  {
    "id": "inter-175",
    "title": "175. Yelp: Restaurant Health Inspection Rating Downgrade Detection",
    "difficulty": "Medium",
    "companies": [
      "Yelp",
      "DoorDash"
    ],
    "topics": [
      "LAG",
      "WHERE",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nYelp Consumer Trust highlights restaurants with deteriorating sanitation ratings. Identify all restaurants where health inspection score dropped by 10 or more points compared to their prior inspection.\n\n### Requirements\n- Use LAG to compare current inspection score with the previous inspection score for that restaurant.\n- Calculate score_drop as prev_score minus current inspection_score.\n- Filter for instances where score_drop >= 10.\n- Output columns: restaurant_name, inspection_date, prev_score, current_score, score_drop.\n- Sort by score_drop descending, then by restaurant_name ascending.\n\n### Input Schema\n**health_inspections** (id INT, restaurant_name VARCHAR, inspection_date DATE, inspection_score INT)",
    "schemaSql": "CREATE TABLE health_inspections (id INT PRIMARY KEY, restaurant_name VARCHAR(50), inspection_date DATE, inspection_score INT);\nINSERT INTO health_inspections VALUES (1, 'Taco Haven', '2024-06-01', 95), (2, 'Taco Haven', '2024-12-01', 82), (3, 'Sushi Palace', '2024-05-01', 98), (4, 'Sushi Palace', '2024-11-01', 96), (5, 'Burger Joint', '2024-04-01', 90), (6, 'Burger Joint', '2024-10-01', 75);",
    "starterSql": "-- 175. Yelp: Restaurant Health Inspection Rating Downgrade Detection\n-- Output: restaurant_name, inspection_date, prev_score, current_score, score_drop\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT restaurant_name, inspection_date, inspection_score AS current_score, LAG(inspection_score) OVER (PARTITION BY restaurant_name ORDER BY inspection_date ASC) AS prev_score FROM health_inspections) SELECT restaurant_name, inspection_date, prev_score, current_score, (prev_score - current_score) AS score_drop FROM lagged WHERE prev_score IS NOT NULL AND (prev_score - current_score) >= 10 ORDER BY score_drop DESC, restaurant_name ASC;",
    "expectedColumns": [
      "restaurant_name",
      "inspection_date",
      "prev_score",
      "current_score",
      "score_drop"
    ],
    "hints": [
      "Use LAG(inspection_score) partitioned by restaurant_name.",
      "Filter where score dropped by at least 10 points.",
      "Order by score_drop DESC, restaurant_name ASC."
    ],
    "explanation": "Sudden inspection score drops alert food delivery and discovery platforms to hygiene violations.",
    "number": 175
  },
  {
    "id": "inter-176",
    "title": "176. OpenTable: Peak Friday Dinner Reservation No-Show Rate by Party Size",
    "difficulty": "Medium",
    "companies": [
      "OpenTable",
      "Resy"
    ],
    "topics": [
      "ROUND",
      "COUNT CASE WHEN",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nOpenTable Restaurant Analytics audits Friday night no-shows. Calculate no-show cancellation rate for Friday evening bookings segmented by party size bracket.\n\n### Requirements\n- Count total Friday reservations as total_bookings.\n- Count reservations with status = 'NO_SHOW' as no_shows.\n- Calculate no_show_rate_pct as no_shows / total_bookings * 100, rounded to 2 decimal places.\n- Output columns: party_size_bracket, total_bookings, no_shows, no_show_rate_pct.\n- Sort by no_show_rate_pct descending, then by party_size_bracket ascending.\n\n### Input Schema\n**dining_reservations** (id INT, party_size_bracket VARCHAR, reservation_day VARCHAR, status VARCHAR)",
    "schemaSql": "CREATE TABLE dining_reservations (id INT PRIMARY KEY, party_size_bracket VARCHAR(20), reservation_day VARCHAR(10), status VARCHAR(20));\nINSERT INTO dining_reservations VALUES (1, '1-2 Guests', 'Friday', 'COMPLETED'), (2, '1-2 Guests', 'Friday', 'NO_SHOW'), (3, '1-2 Guests', 'Friday', 'COMPLETED'), (4, '1-2 Guests', 'Friday', 'COMPLETED'), (5, '5+ Guests', 'Friday', 'NO_SHOW'), (6, '5+ Guests', 'Friday', 'NO_SHOW'), (7, '5+ Guests', 'Friday', 'COMPLETED');",
    "starterSql": "-- 176. OpenTable: Peak Friday Dinner Reservation No-Show Rate by Party Size\n-- Output: party_size_bracket, total_bookings, no_shows, no_show_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT party_size_bracket, COUNT(id) AS total_bookings, COUNT(CASE WHEN status = 'NO_SHOW' THEN 1 END) AS no_shows, ROUND(COUNT(CASE WHEN status = 'NO_SHOW' THEN 1 END) * 100.0 / COUNT(id), 2) AS no_show_rate_pct FROM dining_reservations WHERE reservation_day = 'Friday' GROUP BY party_size_bracket ORDER BY no_show_rate_pct DESC, party_size_bracket ASC;",
    "expectedColumns": [
      "party_size_bracket",
      "total_bookings",
      "no_shows",
      "no_show_rate_pct"
    ],
    "hints": [
      "Filter WHERE reservation_day = 'Friday'.",
      "Count no-shows using conditional aggregation.",
      "Compute percentage and sort descending."
    ],
    "explanation": "Large party no-show rates justify credit card hold deposits for high-demand dinner slots.",
    "number": 176
  },
  {
    "id": "inter-177",
    "title": "177. TripAdvisor: Hotel Cleanliness Rating Trend Trailing 3 Months vs Historical",
    "difficulty": "Medium",
    "companies": [
      "TripAdvisor",
      "Expedia"
    ],
    "topics": [
      "AVG",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nTripAdvisor Trust & Safety audits quality degradation. Identify hotels where average cleanliness rating in the trailing 90 days is strictly lower than their overall historical average.\n\n### Requirements\n- Compute trailing_avg_rating for reviews on or after '2024-10-01'.\n- Compute historical_avg_rating across all reviews before '2024-10-01'.\n- Filter for hotels where trailing_avg < historical_avg.\n- Output columns: hotel_name, historical_avg, trailing_avg.\n- Sort by historical_avg - trailing_avg descending, then by hotel_name ascending.\n\n### Input Schema\n**hotel_reviews** (id INT, hotel_name VARCHAR, review_date DATE, rating NUMERIC)",
    "schemaSql": "CREATE TABLE hotel_reviews (id INT PRIMARY KEY, hotel_name VARCHAR(50), review_date DATE, rating NUMERIC);\nINSERT INTO hotel_reviews VALUES (1, 'Sunset Resort', '2024-05-10', 4.8), (2, 'Sunset Resort', '2024-06-15', 4.9), (3, 'Sunset Resort', '2024-11-01', 3.2), (4, 'Sunset Resort', '2024-11-20', 3.5), (5, 'Mountain Lodge', '2024-04-01', 4.2), (6, 'Mountain Lodge', '2024-11-15', 4.5);",
    "starterSql": "-- 177. TripAdvisor: Hotel Cleanliness Rating Trend Trailing 3 Months vs Historical\n-- Output: hotel_name, historical_avg, trailing_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT hotel_name, ROUND(AVG(CASE WHEN review_date < '2024-10-01' THEN rating END), 2) AS historical_avg, ROUND(AVG(CASE WHEN review_date >= '2024-10-01' THEN rating END), 2) AS trailing_avg FROM hotel_reviews GROUP BY hotel_name HAVING AVG(CASE WHEN review_date >= '2024-10-01' THEN rating END) < AVG(CASE WHEN review_date < '2024-10-01' THEN rating END) ORDER BY (AVG(CASE WHEN review_date < '2024-10-01' THEN rating END) - AVG(CASE WHEN review_date >= '2024-10-01' THEN rating END)) DESC, hotel_name ASC;",
    "expectedColumns": [
      "hotel_name",
      "historical_avg",
      "trailing_avg"
    ],
    "hints": [
      "Use conditional AVG() for pre and post October 1, 2024.",
      "Filter HAVING trailing < historical.",
      "Sort by rating difference descending."
    ],
    "explanation": "Trailing sentiment degradation isolates recent management or housekeeping lapses.",
    "number": 177
  },
  {
    "id": "inter-178",
    "title": "178. Kickstarter: Crowdfunding Backer Pledge Velocity in First 48 Hours",
    "difficulty": "Medium",
    "companies": [
      "Kickstarter",
      "GoFundMe"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nKickstarter Analytics studies early funding momentum. For each campaign, calculate total funding raised during the first 48 hours and the percentage of overall funding goal achieved in that initial window.\n\n### Requirements\n- Filter pledges made within 48 hours of launch_time.\n- Calculate early_pledges_total as the sum of pledge amounts.\n- Calculate pct_goal_reached as early_pledges_total / goal_amount * 100, rounded to 2 decimal places.\n- Output columns: campaign_name, goal_amount, early_pledges_total, pct_goal_reached.\n- Sort by pct_goal_reached descending, then by campaign_name ascending.\n\n### Input Schema\n**campaign_pledges** (id INT, campaign_name VARCHAR, goal_amount NUMERIC, launch_time TIMESTAMP, pledge_time TIMESTAMP, pledge_amount NUMERIC)",
    "schemaSql": "CREATE TABLE campaign_pledges (id INT PRIMARY KEY, campaign_name VARCHAR(100), goal_amount NUMERIC, launch_time TIMESTAMP, pledge_time TIMESTAMP, pledge_amount NUMERIC);\nINSERT INTO campaign_pledges VALUES (1, 'Smart Coffee Mug V2', 50000.00, '2025-01-01 10:00:00', '2025-01-01 14:00:00', 35000.00), (2, 'Smart Coffee Mug V2', 50000.00, '2025-01-01 10:00:00', '2025-01-02 18:00:00', 25000.00), (3, 'Smart Coffee Mug V2', 50000.00, '2025-01-01 10:00:00', '2025-01-04 12:00:00', 10000.00), (4, 'Indie Board Game', 20000.00, '2025-01-01 12:00:00', '2025-01-02 10:00:00', 8000.00);",
    "starterSql": "-- 178. Kickstarter: Crowdfunding Backer Pledge Velocity in First 48 Hours\n-- Output: campaign_name, goal_amount, early_pledges_total, pct_goal_reached\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT campaign_name, goal_amount, ROUND(SUM(CASE WHEN EXTRACT(EPOCH FROM (pledge_time - launch_time)) / 3600.0 <= 48.0 THEN pledge_amount ELSE 0 END), 2) AS early_pledges_total, ROUND(SUM(CASE WHEN EXTRACT(EPOCH FROM (pledge_time - launch_time)) / 3600.0 <= 48.0 THEN pledge_amount ELSE 0 END) * 100.0 / goal_amount, 2) AS pct_goal_reached FROM campaign_pledges GROUP BY campaign_name, goal_amount ORDER BY pct_goal_reached DESC, campaign_name ASC;",
    "expectedColumns": [
      "campaign_name",
      "goal_amount",
      "early_pledges_total",
      "pct_goal_reached"
    ],
    "hints": [
      "Filter pledges where elapsed hours <= 48.0.",
      "Compute early total and percentage of goal.",
      "Order by pct_goal_reached DESC."
    ],
    "explanation": "Campaigns reaching 30%+ in first 48 hours have an 80%+ historical probability of reaching full funding.",
    "number": 178
  },
  {
    "id": "inter-179",
    "title": "179. GoFundMe: Urgent Campaign Milestone Funding Velocity Rate",
    "difficulty": "Medium",
    "companies": [
      "GoFundMe",
      "Kickstarter"
    ],
    "topics": [
      "MIN",
      "Date Arithmetic",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoFundMe Trust & Safety measures social virality speed. Find the elapsed time in full hours from campaign creation to when each medical campaign first reached 50% of its target goal.\n\n### Requirements\n- Compute cumulative running donations for each campaign over donation_time.\n- Filter for rows where cumulative donations >= 0.5 * target_goal.\n- Find earliest milestone donation time and calculate hours_to_half_goal.\n- Output columns: campaign_id, campaign_title, hours_to_half_goal.\n- Sort by hours_to_half_goal ascending, then by campaign_id ascending.\n\n### Input Schema\n**donations** (id INT, campaign_id INT, campaign_title VARCHAR, target_goal NUMERIC, created_at TIMESTAMP, donation_time TIMESTAMP, amount NUMERIC)",
    "schemaSql": "CREATE TABLE donations (id INT PRIMARY KEY, campaign_id INT, campaign_title VARCHAR(100), target_goal NUMERIC, created_at TIMESTAMP, donation_time TIMESTAMP, amount NUMERIC);\nINSERT INTO donations VALUES (1, 101, 'Emergency Vet Surgery', 4000.00, '2025-01-01 08:00:00', '2025-01-01 10:00:00', 1200.00), (2, 101, 'Emergency Vet Surgery', 4000.00, '2025-01-01 08:00:00', '2025-01-01 14:00:00', 1500.00), (3, 102, 'Community Garden Relief', 10000.00, '2025-01-01 08:00:00', '2025-01-02 12:00:00', 3000.00), (4, 102, 'Community Garden Relief', 10000.00, '2025-01-01 08:00:00', '2025-01-03 16:00:00', 3000.00);",
    "starterSql": "-- 179. GoFundMe: Urgent Campaign Milestone Funding Velocity Rate\n-- Output: campaign_id, campaign_title, hours_to_half_goal\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT campaign_id, campaign_title, target_goal, created_at, donation_time, SUM(amount) OVER (PARTITION BY campaign_id ORDER BY donation_time ASC) AS running_amount FROM donations), reached AS (SELECT campaign_id, campaign_title, EXTRACT(EPOCH FROM (donation_time - created_at))::INT / 3600 AS hours_to_half_goal, ROW_NUMBER() OVER (PARTITION BY campaign_id ORDER BY donation_time ASC) AS rn FROM cum WHERE running_amount >= 0.5 * target_goal) SELECT campaign_id, campaign_title, hours_to_half_goal FROM reached WHERE rn = 1 ORDER BY hours_to_half_goal ASC, campaign_id ASC;",
    "expectedColumns": [
      "campaign_id",
      "campaign_title",
      "hours_to_half_goal"
    ],
    "hints": [
      "Compute running sum of donations in a CTE.",
      "Filter where running_amount >= 0.5 * goal.",
      "Pick first occurrence with ROW_NUMBER() = 1."
    ],
    "explanation": "Rapid milestone completion prompts algorithm spotlighting on trending feeds.",
    "number": 179
  },
  {
    "id": "inter-180",
    "title": "180. Substack: Paid Newsletter Subscriber Churn Rate After Annual Renewal",
    "difficulty": "Medium",
    "companies": [
      "Substack",
      "Patreon"
    ],
    "topics": [
      "COUNT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nSubstack Creator Monetization evaluates annual subscription stickiness. For subscribers whose 1-year annual plan expired, calculate the churn rate (percentage who did not renew).\n\n### Requirements\n- Count total expired annual plans as expired_plans.\n- Count expired plans where renewed = FALSE as churned_subscribers.\n- Calculate churn_rate_pct as churned_subscribers / expired_plans * 100, rounded to 2 decimal places.\n- Output columns: publication_name, expired_plans, churned_subscribers, churn_rate_pct.\n- Sort by churn_rate_pct descending, then by publication_name ascending.\n\n### Input Schema\n**subscription_renewals** (id INT, publication_name VARCHAR, renewed BOOLEAN)",
    "schemaSql": "CREATE TABLE subscription_renewals (id INT PRIMARY KEY, publication_name VARCHAR(50), renewed BOOLEAN);\nINSERT INTO subscription_renewals VALUES (1, 'The Pragmatic Engineer', TRUE), (2, 'The Pragmatic Engineer', TRUE), (3, 'The Pragmatic Engineer', FALSE), (4, 'The Pragmatic Engineer', TRUE), (5, 'Weekly Crypto Digest', FALSE), (6, 'Weekly Crypto Digest', FALSE), (7, 'Weekly Crypto Digest', TRUE);",
    "starterSql": "-- 180. Substack: Paid Newsletter Subscriber Churn Rate After Annual Renewal\n-- Output: publication_name, expired_plans, churned_subscribers, churn_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT publication_name, COUNT(id) AS expired_plans, COUNT(CASE WHEN NOT renewed THEN 1 END) AS churned_subscribers, ROUND(COUNT(CASE WHEN NOT renewed THEN 1 END) * 100.0 / COUNT(id), 2) AS churn_rate_pct FROM subscription_renewals GROUP BY publication_name ORDER BY churn_rate_pct DESC, publication_name ASC;",
    "expectedColumns": [
      "publication_name",
      "expired_plans",
      "churned_subscribers",
      "churn_rate_pct"
    ],
    "hints": [
      "Group by publication_name.",
      "Count unrenewed plans using CASE WHEN NOT renewed.",
      "Compute churn percentage and sort descending."
    ],
    "explanation": "Annual renewal cliff analysis helps creators time discount promotions before renewal dates.",
    "number": 180
  },
  {
    "id": "inter-181",
    "title": "181. Medium: Story Engagement Claps and Reads per 1000 Views",
    "difficulty": "Medium",
    "companies": [
      "Medium",
      "Substack"
    ],
    "topics": [
      "ROUND",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nMedium Partner Program audits content engagement quality. Compute the number of claps per 1,000 views and reads per 1,000 views across publication topics.\n\n### Requirements\n- Calculate claps_per_1000 as (total claps * 1000.0 / total views), rounded to 2 decimal places.\n- Calculate reads_per_1000 as (total reads * 1000.0 / total views), rounded to 2 decimal places.\n- Output columns: topic, total_views, claps_per_1000, reads_per_1000.\n- Sort by reads_per_1000 descending, then by topic ascending.\n\n### Input Schema\n**story_analytics** (id INT, topic VARCHAR, views INT, reads INT, claps INT)",
    "schemaSql": "CREATE TABLE story_analytics (id INT PRIMARY KEY, topic VARCHAR(50), views INT, reads INT, claps INT);\nINSERT INTO story_analytics VALUES (1, 'Data Science', 50000, 32000, 4500), (2, 'Data Science', 30000, 18000, 2900), (3, 'Productivity', 80000, 36000, 5200), (4, 'Productivity', 40000, 19000, 2400);",
    "starterSql": "-- 181. Medium: Story Engagement Claps and Reads per 1000 Views\n-- Output: topic, total_views, claps_per_1000, reads_per_1000\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT topic, SUM(views) AS total_views, ROUND(SUM(claps) * 1000.0 / NULLIF(SUM(views), 0), 2) AS claps_per_1000, ROUND(SUM(reads) * 1000.0 / NULLIF(SUM(views), 0), 2) AS reads_per_1000 FROM story_analytics GROUP BY topic ORDER BY reads_per_1000 DESC, topic ASC;",
    "expectedColumns": [
      "topic",
      "total_views",
      "claps_per_1000",
      "reads_per_1000"
    ],
    "hints": [
      "Sum views, reads, and claps per topic.",
      "Compute metrics normalized per 1,000 views.",
      "Order by reads_per_1000 DESC."
    ],
    "explanation": "Read ratio normalization removes viral view skew to identify true content resonance.",
    "number": 181
  },
  {
    "id": "inter-182",
    "title": "182. Goodreads: Highly Rated Books with Low Total Review Counts",
    "difficulty": "Medium",
    "companies": [
      "Goodreads",
      "Amazon"
    ],
    "topics": [
      "WHERE",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoodreads Hidden Gems Discovery highlights critically acclaimed books with underappreciated audience size. Find all books with an average rating of 4.5 or higher but fewer than 100 total reviews.\n\n### Requirements\n- Filter for books where avg_rating >= 4.50 and review_count < 100.\n- Output columns: book_id, title, author, avg_rating, review_count.\n- Sort by avg_rating descending, then by review_count ascending, then by title ascending.\n\n### Input Schema\n**book_catalog** (book_id INT, title VARCHAR, author VARCHAR, avg_rating NUMERIC, review_count INT)",
    "schemaSql": "CREATE TABLE book_catalog (book_id INT PRIMARY KEY, title VARCHAR(100), author VARCHAR(50), avg_rating NUMERIC, review_count INT);\nINSERT INTO book_catalog VALUES (1, 'Forgotten Tales of Oaxaca', 'Elena Morales', 4.85, 45), (2, 'Quantum Computing Primer', 'Dr. David Li', 4.60, 82), (3, 'Bestselling Thriller', 'James Patterson', 4.10, 15000), (4, 'The Midnight Library', 'Matt Haig', 4.25, 8500), (5, 'Indie Poetry Collection', 'Sarah Croft', 4.75, 30);",
    "starterSql": "-- 182. Goodreads: Highly Rated Books with Low Total Review Counts\n-- Output: book_id, title, author, avg_rating, review_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT book_id, title, author, avg_rating, review_count FROM book_catalog WHERE avg_rating >= 4.50 AND review_count < 100 ORDER BY avg_rating DESC, review_count ASC, title ASC;",
    "expectedColumns": [
      "book_id",
      "title",
      "author",
      "avg_rating",
      "review_count"
    ],
    "hints": [
      "Filter WHERE avg_rating >= 4.50 AND review_count < 100.",
      "Order by avg_rating DESC, review_count ASC, title ASC."
    ],
    "explanation": "Filtering for high quality with low reach surfaces organic grassroots recommendations.",
    "number": 182
  },
  {
    "id": "inter-183",
    "title": "183. Eventbrite: Early Bird Ticket Tier Sellout Speed in Minutes",
    "difficulty": "Medium",
    "companies": [
      "Eventbrite",
      "Ticketmaster"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "Date Arithmetic"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nEventbrite Event Operations measures ticket demand velocity. Calculate elapsed minutes from release time to sellout time for 'Early Bird' ticket tiers.\n\n### Requirements\n- Filter for ticket tiers where tier_name = 'Early Bird' and sold_out_time IS NOT NULL.\n- Calculate sellout_minutes as elapsed minutes between release_time and sold_out_time.\n- Output columns: event_id, event_title, capacity, sellout_minutes.\n- Sort by sellout_minutes ascending, then by event_id ascending.\n\n### Input Schema\n**ticket_tiers** (id INT, event_id INT, event_title VARCHAR, tier_name VARCHAR, capacity INT, release_time TIMESTAMP, sold_out_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE ticket_tiers (id INT PRIMARY KEY, event_id INT, event_title VARCHAR(100), tier_name VARCHAR(50), capacity INT, release_time TIMESTAMP, sold_out_time TIMESTAMP);\nINSERT INTO ticket_tiers VALUES (1, 101, 'Tech Conference 2025', 'Early Bird', 500, '2025-01-01 09:00:00', '2025-01-01 09:42:00'), (2, 101, 'Tech Conference 2025', 'General Admission', 2000, '2025-01-01 10:00:00', '2025-01-05 12:00:00'), (3, 102, 'Indie Music Fest', 'Early Bird', 300, '2025-01-02 12:00:00', '2025-01-02 12:15:00');",
    "starterSql": "-- 183. Eventbrite: Early Bird Ticket Tier Sellout Speed in Minutes\n-- Output: event_id, event_title, capacity, sellout_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT event_id, event_title, capacity, EXTRACT(EPOCH FROM (sold_out_time - release_time))::INT / 60 AS sellout_minutes FROM ticket_tiers WHERE tier_name = 'Early Bird' AND sold_out_time IS NOT NULL ORDER BY sellout_minutes ASC, event_id ASC;",
    "expectedColumns": [
      "event_id",
      "event_title",
      "capacity",
      "sellout_minutes"
    ],
    "hints": [
      "Filter for tier_name = 'Early Bird' and non-null sold_out_time.",
      "Extract epoch in minutes.",
      "Order by sellout_minutes ASC."
    ],
    "explanation": "Sellout velocity calibrates tier allocation and dynamic pricing for subsequent releases.",
    "number": 183
  },
  {
    "id": "inter-184",
    "title": "184. Ticketmaster: Presale Access Code Resale Markup Percentage",
    "difficulty": "Medium",
    "companies": [
      "Ticketmaster",
      "SeatGeek"
    ],
    "topics": [
      "ROUND",
      "AVG",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nTicketmaster Marketplace Ethics analyzes secondary market scalping markups. Calculate the average resale markup percentage ((resale_price - face_value) / face_value * 100) across concert tours.\n\n### Requirements\n- Calculate markup_pct as (resale_price - face_value) * 100.0 / face_value.\n- Compute avg_markup_pct per tour, rounded to 2 decimal places.\n- Output columns: tour_name, tickets_resold, avg_markup_pct.\n- Sort by avg_markup_pct descending, then by tour_name ascending.\n\n### Input Schema\n**ticket_resales** (id INT, tour_name VARCHAR, face_value NUMERIC, resale_price NUMERIC)",
    "schemaSql": "CREATE TABLE ticket_resales (id INT PRIMARY KEY, tour_name VARCHAR(100), face_value NUMERIC, resale_price NUMERIC);\nINSERT INTO ticket_resales VALUES (1, 'Eras Stadium Tour', 150.00, 650.00), (2, 'Eras Stadium Tour', 200.00, 850.00), (3, 'Rock Revival Tour', 90.00, 110.00), (4, 'Rock Revival Tour', 100.00, 115.00);",
    "starterSql": "-- 184. Ticketmaster: Presale Access Code Resale Markup Percentage\n-- Output: tour_name, tickets_resold, avg_markup_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT tour_name, COUNT(id) AS tickets_resold, ROUND(AVG((resale_price - face_value) * 100.0 / face_value), 2) AS avg_markup_pct FROM ticket_resales GROUP BY tour_name ORDER BY avg_markup_pct DESC, tour_name ASC;",
    "expectedColumns": [
      "tour_name",
      "tickets_resold",
      "avg_markup_pct"
    ],
    "hints": [
      "Compute percentage difference between resale and face value.",
      "Group by tour_name and calculate AVG().",
      "Order by avg_markup_pct DESC."
    ],
    "explanation": "Secondary market markups inform face value pricing and anti-bot verification tiers.",
    "number": 184
  },
  {
    "id": "inter-185",
    "title": "185. SeatGeek: Venue Seat Row Price Decay from Front Row to Back",
    "difficulty": "Medium",
    "companies": [
      "SeatGeek",
      "StubHub"
    ],
    "topics": [
      "ROUND",
      "AVG",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nSeatGeek Deal Score algorithms model price decay by stadium row depth. Calculate the average seat price across row depth brackets ('Rows 1-10', 'Rows 11-25', 'Rows 26+').\n\n### Requirements\n- Segment rows: row_number <= 10 as 'Rows 1-10', row_number BETWEEN 11 AND 25 as 'Rows 11-25', otherwise 'Rows 26+'.\n- Compute avg_seat_price rounded to 2 decimal places.\n- Output columns: section_name, row_bracket, avg_seat_price.\n- Sort by section_name ascending, avg_seat_price descending.\n\n### Input Schema\n**stadium_seats** (id INT, section_name VARCHAR, row_number INT, seat_price NUMERIC)",
    "schemaSql": "CREATE TABLE stadium_seats (id INT PRIMARY KEY, section_name VARCHAR(20), row_number INT, seat_price NUMERIC);\nINSERT INTO stadium_seats VALUES (1, 'Section 101', 3, 350.00), (2, 'Section 101', 8, 320.00), (3, 'Section 101', 15, 220.00), (4, 'Section 101', 22, 190.00), (5, 'Section 101', 28, 120.00), (6, 'Section 102', 5, 280.00), (7, 'Section 102', 18, 160.00);",
    "starterSql": "-- 185. SeatGeek: Venue Seat Row Price Decay from Front Row to Back\n-- Output: section_name, row_bracket, avg_seat_price\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT section_name, CASE WHEN row_number <= 10 THEN 'Rows 1-10' WHEN row_number BETWEEN 11 AND 25 THEN 'Rows 11-25' ELSE 'Rows 26+' END AS row_bracket, ROUND(AVG(seat_price), 2) AS avg_seat_price FROM stadium_seats GROUP BY section_name, CASE WHEN row_number <= 10 THEN 'Rows 1-10' WHEN row_number BETWEEN 11 AND 25 THEN 'Rows 11-25' ELSE 'Rows 26+' END ORDER BY section_name ASC, avg_seat_price DESC;",
    "expectedColumns": [
      "section_name",
      "row_bracket",
      "avg_seat_price"
    ],
    "hints": [
      "Use CASE WHEN to create row brackets.",
      "Group by section and row bracket.",
      "Compute average seat price."
    ],
    "explanation": "Seat price decay curves inform dynamic ticket re-listing valuations.",
    "number": 185
  },
  {
    "id": "inter-186",
    "title": "186. StubHub: Ticket Listing Price Adjustments Within 2 Hours of Event Start",
    "difficulty": "Medium",
    "companies": [
      "StubHub",
      "SeatGeek"
    ],
    "topics": [
      "WHERE",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nStubHub Last-Minute Services tracks seller fire sales before kickoff. Identify all tickets where listing price was slashed by more than 30% within 120 minutes of scheduled event start.\n\n### Requirements\n- Filter listings modified within 120 minutes of start_time (start_time - price_updated_time <= interval '120 minutes').\n- Calculate price_drop_pct as (original_list_price - discounted_price) * 100.0 / original_list_price.\n- Filter for price_drop_pct > 30.0.\n- Output columns: event_name, original_list_price, discounted_price, price_drop_pct.\n- Sort by price_drop_pct descending, then by original_list_price descending.\n\n### Input Schema\n**last_minute_listings** (id INT, event_name VARCHAR, start_time TIMESTAMP, price_updated_time TIMESTAMP, original_list_price NUMERIC, discounted_price NUMERIC)",
    "schemaSql": "CREATE TABLE last_minute_listings (id INT PRIMARY KEY, event_name VARCHAR(100), start_time TIMESTAMP, price_updated_time TIMESTAMP, original_list_price NUMERIC, discounted_price NUMERIC);\nINSERT INTO last_minute_listings VALUES (1, 'Super Bowl 2025', '2025-02-09 18:30:00', '2025-02-09 17:15:00', 4500.00, 2800.00), (2, 'Super Bowl 2025', '2025-02-09 18:30:00', '2025-02-09 17:45:00', 5000.00, 4800.00), (3, 'Broadway Musical', '2025-02-09 19:00:00', '2025-02-09 18:00:00', 250.00, 150.00);",
    "starterSql": "-- 186. StubHub: Ticket Listing Price Adjustments Within 2 Hours of Event Start\n-- Output: event_name, original_list_price, discounted_price, price_drop_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT event_name, original_list_price, discounted_price, ROUND((original_list_price - discounted_price) * 100.0 / original_list_price, 2) AS price_drop_pct FROM last_minute_listings WHERE (start_time - price_updated_time) <= INTERVAL '120 minutes' AND ((original_list_price - discounted_price) * 100.0 / original_list_price) > 30.0 ORDER BY price_drop_pct DESC, original_list_price DESC;",
    "expectedColumns": [
      "event_name",
      "original_list_price",
      "discounted_price",
      "price_drop_pct"
    ],
    "hints": [
      "Filter using interval comparison on start_time - price_updated_time.",
      "Compute discount percentage.",
      "Filter price_drop_pct > 30."
    ],
    "explanation": "Pre-event panic selling maximizes seller recovery before ticket utility expires to zero.",
    "number": 186
  },
  {
    "id": "inter-187",
    "title": "187. Patreon: Patron Lifetime Value (LTV) Across Creator Membership Tiers",
    "difficulty": "Medium",
    "companies": [
      "Patreon",
      "Substack"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nPatreon Creator Finance computes member Lifetime Value (LTV). Calculate average cumulative spend per patron across creator subscription tiers.\n\n### Requirements\n- Compute cumulative payments per patron.\n- Calculate avg_patron_ltv per tier_name, rounded to 2 decimal places.\n- Output columns: creator_name, tier_name, active_patrons, avg_patron_ltv.\n- Sort by avg_patron_ltv descending, then by creator_name ascending.\n\n### Input Schema\n**patron_payments** (id INT, creator_name VARCHAR, tier_name VARCHAR, patron_id INT, amount NUMERIC)",
    "schemaSql": "CREATE TABLE patron_payments (id INT PRIMARY KEY, creator_name VARCHAR(50), tier_name VARCHAR(30), patron_id INT, amount NUMERIC);\nINSERT INTO patron_payments VALUES (1, 'Kurzgesagt', 'Producer Tier', 101, 50.00), (2, 'Kurzgesagt', 'Producer Tier', 101, 50.00), (3, 'Kurzgesagt', 'Producer Tier', 102, 50.00), (4, 'Kurzgesagt', 'Supporter Tier', 103, 10.00), (5, 'Kurzgesagt', 'Supporter Tier', 104, 10.00), (6, 'Kurzgesagt', 'Supporter Tier', 104, 10.00);",
    "starterSql": "-- 187. Patreon: Patron Lifetime Value (LTV) Across Creator Membership Tiers\n-- Output: creator_name, tier_name, active_patrons, avg_patron_ltv\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH patron_totals AS (SELECT creator_name, tier_name, patron_id, SUM(amount) AS total_spent FROM patron_payments GROUP BY creator_name, tier_name, patron_id) SELECT creator_name, tier_name, COUNT(patron_id) AS active_patrons, ROUND(AVG(total_spent), 2) AS avg_patron_ltv FROM patron_totals GROUP BY creator_name, tier_name ORDER BY avg_patron_ltv DESC, creator_name ASC;",
    "expectedColumns": [
      "creator_name",
      "tier_name",
      "active_patrons",
      "avg_patron_ltv"
    ],
    "hints": [
      "First aggregate total spend per patron and tier in a CTE.",
      "Average total spend across patrons per tier.",
      "Order by LTV DESC."
    ],
    "explanation": "LTV benchmarking directs creators on bonus deliverable tier packaging.",
    "number": 187
  },
  {
    "id": "inter-188",
    "title": "188. Box: Enterprise Cloud Storage Quota Overages by Department",
    "difficulty": "Medium",
    "companies": [
      "Box",
      "Dropbox"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nBox IT Admin Services tracks enterprise cloud storage allocations. Identify corporate departments where total storage consumed exceeds their allocated storage quota in Gigabytes (GB).\n\n### Requirements\n- Sum storage_used_gb per department.\n- Calculate overage_gb as total storage used minus allocated_quota_gb.\n- Filter for departments where overage_gb > 0.\n- Output columns: department, allocated_quota_gb, total_used_gb, overage_gb.\n- Sort by overage_gb descending, then by department ascending.\n\n### Input Schema\n**department_storage** (id INT, department VARCHAR, allocated_quota_gb NUMERIC, user_storage_gb NUMERIC)",
    "schemaSql": "CREATE TABLE department_storage (id INT PRIMARY KEY, department VARCHAR(50), allocated_quota_gb NUMERIC, user_storage_gb NUMERIC);\nINSERT INTO department_storage VALUES (1, 'Legal', 500.0, 320.0), (2, 'Legal', 500.0, 240.0), (3, 'Marketing', 1000.0, 450.0), (4, 'Marketing', 1000.0, 680.0), (5, 'HR', 200.0, 80.0);",
    "starterSql": "-- 188. Box: Enterprise Cloud Storage Quota Overages by Department\n-- Output: department, allocated_quota_gb, total_used_gb, overage_gb\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT department, allocated_quota_gb, ROUND(SUM(user_storage_gb), 2) AS total_used_gb, ROUND(SUM(user_storage_gb) - allocated_quota_gb, 2) AS overage_gb FROM department_storage GROUP BY department, allocated_quota_gb HAVING SUM(user_storage_gb) > allocated_quota_gb ORDER BY overage_gb DESC, department ASC;",
    "expectedColumns": [
      "department",
      "allocated_quota_gb",
      "total_used_gb",
      "overage_gb"
    ],
    "hints": [
      "Group by department and quota.",
      "Sum user storage.",
      "Filter HAVING total used > allocated quota."
    ],
    "explanation": "Automated overage alerts notify enterprise IT to upgrade tier contracts before service throttling.",
    "number": 188
  },
  {
    "id": "inter-189",
    "title": "189. Twitch: Streamer Peak Concurrent Viewers vs Average Daily Viewers",
    "difficulty": "Medium",
    "companies": [
      "Twitch",
      "YouTube"
    ],
    "topics": [
      "MAX",
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nTwitch Creator Partnerships evaluates broadcast viewer stability. Compute the peak concurrent viewer count, average viewer count, and the peak-to-average spike ratio across live broadcasts.\n\n### Requirements\n- Calculate peak_viewers as MAX(viewers).\n- Calculate avg_viewers as AVG(viewers) rounded to 2 decimal places.\n- Calculate spike_ratio as peak_viewers divided by avg_viewers, rounded to 2 decimal places.\n- Output columns: streamer_name, peak_viewers, avg_viewers, spike_ratio.\n- Sort by spike_ratio descending, then by streamer_name ascending.\n\n### Input Schema\n**stream_pings** (id INT, streamer_name VARCHAR, ping_time TIMESTAMP, viewers INT)",
    "schemaSql": "CREATE TABLE stream_pings (id INT PRIMARY KEY, streamer_name VARCHAR(50), ping_time TIMESTAMP, viewers INT);\nINSERT INTO stream_pings VALUES (1, 'Shroud', '2025-01-01 14:00:00', 25000), (2, 'Shroud', '2025-01-01 15:00:00', 30000), (3, 'Shroud', '2025-01-01 16:00:00', 95000), (4, 'LofiGirl', '2025-01-01 14:00:00', 40000), (5, 'LofiGirl', '2025-01-01 15:00:00', 42000), (6, 'LofiGirl', '2025-01-01 16:00:00', 41000);",
    "starterSql": "-- 189. Twitch: Streamer Peak Concurrent Viewers vs Average Daily Viewers\n-- Output: streamer_name, peak_viewers, avg_viewers, spike_ratio\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT streamer_name, MAX(viewers) AS peak_viewers, ROUND(AVG(viewers), 2) AS avg_viewers, ROUND(MAX(viewers) / NULLIF(AVG(viewers), 0), 2) AS spike_ratio FROM stream_pings GROUP BY streamer_name ORDER BY spike_ratio DESC, streamer_name ASC;",
    "expectedColumns": [
      "streamer_name",
      "peak_viewers",
      "avg_viewers",
      "spike_ratio"
    ],
    "hints": [
      "Group by streamer_name.",
      "Compute MAX(viewers) and AVG(viewers).",
      "Divide peak by average and round to 2 decimals."
    ],
    "explanation": "Peak-to-average ratios isolate raid events and tournament spikes versus steady baseline audiences.",
    "number": 189
  },
  {
    "id": "inter-190",
    "title": "190. Kick: Streaming Channel Chat Message Velocity During Hype Trains",
    "difficulty": "Medium",
    "companies": [
      "Kick",
      "Twitch"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "COUNT",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nKick Moderation Systems benchmarks chat stress loads. Calculate chat messages per minute during live streamer hype events.\n\n### Requirements\n- Calculate duration in minutes as elapsed minutes between event_start and event_end.\n- Calculate messages_per_minute as total message_count divided by duration in minutes, rounded to 2 decimal places.\n- Output columns: channel_name, event_title, message_count, messages_per_minute.\n- Sort by messages_per_minute descending, then by channel_name ascending.\n\n### Input Schema\n**hype_events** (id INT, channel_name VARCHAR, event_title VARCHAR, event_start TIMESTAMP, event_end TIMESTAMP, message_count INT)",
    "schemaSql": "CREATE TABLE hype_events (id INT PRIMARY KEY, channel_name VARCHAR(50), event_title VARCHAR(100), event_start TIMESTAMP, event_end TIMESTAMP, message_count INT);\nINSERT INTO hype_events VALUES (1, 'xQc', 'Subathon Day 1', '2025-01-01 18:00:00', '2025-01-01 18:30:00', 45000), (2, 'AdinRoss', 'Boxing Match Watchalong', '2025-01-01 20:00:00', '2025-01-01 20:45:00', 81000), (3, 'ChessPro', 'Grandmaster Speed Run', '2025-01-01 12:00:00', '2025-01-01 13:00:00', 12000);",
    "starterSql": "-- 190. Kick: Streaming Channel Chat Message Velocity During Hype Trains\n-- Output: channel_name, event_title, message_count, messages_per_minute\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT channel_name, event_title, message_count, ROUND(message_count * 60.0 / NULLIF(EXTRACT(EPOCH FROM (event_end - event_start)), 0), 2) AS messages_per_minute FROM hype_events ORDER BY messages_per_minute DESC, channel_name ASC;",
    "expectedColumns": [
      "channel_name",
      "event_title",
      "message_count",
      "messages_per_minute"
    ],
    "hints": [
      "Extract epoch seconds from event duration.",
      "Convert to minutes and divide messages.",
      "Order by messages_per_minute DESC."
    ],
    "explanation": "Chat message throughput determines auto-moderation throttling rules.",
    "number": 190
  },
  {
    "id": "inter-191",
    "title": "191. Atlassian: Jira Sprint Velocity Rollover Work Estimate Spillover",
    "difficulty": "Medium",
    "companies": [
      "Atlassian",
      "Asana"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nAtlassian Jira Agile Metrics evaluates sprint planning accuracy. Compute the percentage of committed story points that were rolled over (uncompleted) into the next sprint across engineering teams.\n\n### Requirements\n- Sum committed_points and completed_points per team.\n- Calculate rollover_points as committed_points minus completed_points.\n- Calculate spillover_rate_pct as rollover_points / committed_points * 100, rounded to 2 decimal places.\n- Output columns: team_name, committed_points, completed_points, spillover_rate_pct.\n- Sort by spillover_rate_pct descending, then by team_name ascending.\n\n### Input Schema\n**sprint_metrics** (id INT, team_name VARCHAR, sprint_name VARCHAR, committed_points INT, completed_points INT)",
    "schemaSql": "CREATE TABLE sprint_metrics (id INT PRIMARY KEY, team_name VARCHAR(50), sprint_name VARCHAR(50), committed_points INT, completed_points INT);\nINSERT INTO sprint_metrics VALUES (1, 'Backend Core', 'Sprint 24', 80, 56), (2, 'Backend Core', 'Sprint 25', 75, 60), (3, 'Frontend UI', 'Sprint 24', 60, 58), (4, 'Frontend UI', 'Sprint 25', 65, 62);",
    "starterSql": "-- 191. Atlassian: Jira Sprint Velocity Rollover Work Estimate Spillover\n-- Output: team_name, committed_points, completed_points, spillover_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT team_name, SUM(committed_points) AS committed_points, SUM(completed_points) AS completed_points, ROUND((SUM(committed_points) - SUM(completed_points)) * 100.0 / NULLIF(SUM(committed_points), 0), 2) AS spillover_rate_pct FROM sprint_metrics GROUP BY team_name ORDER BY spillover_rate_pct DESC, team_name ASC;",
    "expectedColumns": [
      "team_name",
      "committed_points",
      "completed_points",
      "spillover_rate_pct"
    ],
    "hints": [
      "Group by team_name.",
      "Sum committed and completed story points.",
      "Compute spillover percentage."
    ],
    "explanation": "Spillover rates guide Scrum masters in capacity recalibration.",
    "number": 191
  },
  {
    "id": "inter-192",
    "title": "192. Figma: Team Collaborative Canvas Active Editors Peak Concurrency",
    "difficulty": "Medium",
    "companies": [
      "Figma",
      "Canva"
    ],
    "topics": [
      "MAX",
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nFigma Real-Time Multiplayer Engine monitors canvas WebSocket load. Compute the peak simultaneous editors and average editor count across shared design files.\n\n### Requirements\n- Calculate peak_editors as MAX(active_users).\n- Calculate avg_editors as AVG(active_users) rounded to 2 decimal places.\n- Output columns: file_key, file_name, peak_editors, avg_editors.\n- Sort by peak_editors descending, then by file_key ascending.\n\n### Input Schema\n**canvas_telemetry** (id INT, file_key VARCHAR, file_name VARCHAR, snapshot_time TIMESTAMP, active_users INT)",
    "schemaSql": "CREATE TABLE canvas_telemetry (id INT PRIMARY KEY, file_key VARCHAR(20), file_name VARCHAR(100), snapshot_time TIMESTAMP, active_users INT);\nINSERT INTO canvas_telemetry VALUES (1, 'FIG_01', 'Design System V3', '2025-01-01 10:00:00', 45), (2, 'FIG_01', 'Design System V3', '2025-01-01 11:00:00', 78), (3, 'FIG_01', 'Design System V3', '2025-01-01 12:00:00', 52), (4, 'FIG_02', 'Landing Page Wireframes', '2025-01-01 10:00:00', 12), (5, 'FIG_02', 'Landing Page Wireframes', '2025-01-01 11:00:00', 15);",
    "starterSql": "-- 192. Figma: Team Collaborative Canvas Active Editors Peak Concurrency\n-- Output: file_key, file_name, peak_editors, avg_editors\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT file_key, file_name, MAX(active_users) AS peak_editors, ROUND(AVG(active_users), 2) AS avg_editors FROM canvas_telemetry GROUP BY file_key, file_name ORDER BY peak_editors DESC, file_key ASC;",
    "expectedColumns": [
      "file_key",
      "file_name",
      "peak_editors",
      "avg_editors"
    ],
    "hints": [
      "Group by file_key and file_name.",
      "Compute MAX(active_users) and AVG(active_users).",
      "Order by peak_editors DESC, file_key ASC."
    ],
    "explanation": "Peak multi-user concurrency informs operational conflict-free replicated data type (CRDT) sharding.",
    "number": 192
  },
  {
    "id": "inter-193",
    "title": "193. Canva: Template Export Conversion by Subscription Plan Tier",
    "difficulty": "Medium",
    "companies": [
      "Canva",
      "Figma"
    ],
    "topics": [
      "ROUND",
      "COUNT",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nCanva Growth Analytics benchmarks user export behavior. Calculate the average design exports per user segmented by user subscription plan tier ('Free', 'Pro', 'Enterprise').\n\n### Requirements\n- Count distinct users and total exports per plan_tier.\n- Calculate avg_exports_per_user as total exports divided by distinct users, rounded to 2 decimal places.\n- Output columns: plan_tier, unique_users, total_exports, avg_exports_per_user.\n- Sort by avg_exports_per_user descending, then by plan_tier ascending.\n\n### Input Schema\n**user_exports** (id INT, plan_tier VARCHAR, user_id INT, template_type VARCHAR)",
    "schemaSql": "CREATE TABLE user_exports (id INT PRIMARY KEY, plan_tier VARCHAR(20), user_id INT, template_type VARCHAR(50));\nINSERT INTO user_exports VALUES (1, 'Enterprise', 101, 'Brand Presentation'), (2, 'Enterprise', 101, 'Social Ad'), (3, 'Enterprise', 101, 'Infographic'), (4, 'Enterprise', 102, 'Brochure'), (5, 'Pro', 103, 'Instagram Post'), (6, 'Pro', 103, 'Flyer'), (7, 'Free', 104, 'Poster');",
    "starterSql": "-- 193. Canva: Template Export Conversion by Subscription Plan Tier\n-- Output: plan_tier, unique_users, total_exports, avg_exports_per_user\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT plan_tier, COUNT(DISTINCT user_id) AS unique_users, COUNT(id) AS total_exports, ROUND(COUNT(id) * 1.0 / COUNT(DISTINCT user_id), 2) AS avg_exports_per_user FROM user_exports GROUP BY plan_tier ORDER BY avg_exports_per_user DESC, plan_tier ASC;",
    "expectedColumns": [
      "plan_tier",
      "unique_users",
      "total_exports",
      "avg_exports_per_user"
    ],
    "hints": [
      "Group by plan_tier.",
      "Count distinct user_id and total exports.",
      "Compute ratio rounded to 2 decimals."
    ],
    "explanation": "Export intensity measures product utility and premium conversion triggers.",
    "number": 193
  },
  {
    "id": "inter-194",
    "title": "194. Notion: Workspace Page Revision Frequency and Most Active Collaborator",
    "difficulty": "Medium",
    "companies": [
      "Notion",
      "Atlassian"
    ],
    "topics": [
      "ROW_NUMBER",
      "CTEs",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nNotion Workspace Auditing tracks page ownership. For each enterprise workspace page, find the collaborator who submitted the highest number of revisions.\n\n### Requirements\n- Count revisions per page_id and user_name.\n- Rank collaborators by revision count descending using ROW_NUMBER.\n- Output columns: page_id, page_title, top_contributor, revision_count.\n- Sort by revision_count descending, then by page_id ascending.\n\n### Input Schema\n**page_revisions** (id INT, page_id INT, page_title VARCHAR, user_name VARCHAR)",
    "schemaSql": "CREATE TABLE page_revisions (id INT PRIMARY KEY, page_id INT, page_title VARCHAR(100), user_name VARCHAR(50));\nINSERT INTO page_revisions VALUES (1, 101, 'Engineering Handbook', 'Alice'), (2, 101, 'Engineering Handbook', 'Alice'), (3, 101, 'Engineering Handbook', 'Alice'), (4, 101, 'Engineering Handbook', 'Bob'), (5, 102, 'Product Roadmap 2025', 'Sarah'), (6, 102, 'Product Roadmap 2025', 'Sarah'), (7, 102, 'Product Roadmap 2025', 'Charlie');",
    "starterSql": "-- 194. Notion: Workspace Page Revision Frequency and Most Active Collaborator\n-- Output: page_id, page_title, top_contributor, revision_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH user_counts AS (SELECT page_id, page_title, user_name AS top_contributor, COUNT(id) AS revision_count FROM page_revisions GROUP BY page_id, page_title, user_name), ranked AS (SELECT page_id, page_title, top_contributor, revision_count, ROW_NUMBER() OVER (PARTITION BY page_id ORDER BY revision_count DESC) AS rn FROM user_counts) SELECT page_id, page_title, top_contributor, revision_count FROM ranked WHERE rn = 1 ORDER BY revision_count DESC, page_id ASC;",
    "expectedColumns": [
      "page_id",
      "page_title",
      "top_contributor",
      "revision_count"
    ],
    "hints": [
      "Aggregate revisions by page and user in a CTE.",
      "Rank by revision count descending with ROW_NUMBER().",
      "Filter rn = 1."
    ],
    "explanation": "Identifying top editors powers automated page owner attribution.",
    "number": 194
  },
  {
    "id": "inter-195",
    "title": "195. Linear: Cycle Issue Resolution Time by Priority Tier",
    "difficulty": "Medium",
    "companies": [
      "Linear",
      "Atlassian"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nLinear Engineering Operations tracks issue resolution velocity. Calculate the average resolution time in hours for completed issues across priority levels ('Urgent', 'High', 'Medium', 'Low').\n\n### Requirements\n- Filter for issues where status = 'Completed' and resolved_at IS NOT NULL.\n- Calculate resolution_hours as elapsed hours between created_at and resolved_at.\n- Compute avg_resolution_hours per priority, rounded to 2 decimal places.\n- Output columns: priority, issues_resolved, avg_resolution_hours.\n- Sort by avg_resolution_hours ascending, then by priority ascending.\n\n### Input Schema\n**linear_issues** (id INT, priority VARCHAR, status VARCHAR, created_at TIMESTAMP, resolved_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE linear_issues (id INT PRIMARY KEY, priority VARCHAR(20), status VARCHAR(20), created_at TIMESTAMP, resolved_at TIMESTAMP);\nINSERT INTO linear_issues VALUES (1, 'Urgent', 'Completed', '2025-01-01 10:00:00', '2025-01-01 13:30:00'), (2, 'Urgent', 'Completed', '2025-01-02 09:00:00', '2025-01-02 11:00:00'), (3, 'High', 'Completed', '2025-01-01 10:00:00', '2025-01-02 10:00:00'), (4, 'Medium', 'Completed', '2025-01-01 10:00:00', '2025-01-04 10:00:00');",
    "starterSql": "-- 195. Linear: Cycle Issue Resolution Time by Priority Tier\n-- Output: priority, issues_resolved, avg_resolution_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT priority, COUNT(id) AS issues_resolved, ROUND(AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600.0), 2) AS avg_resolution_hours FROM linear_issues WHERE status = 'Completed' AND resolved_at IS NOT NULL GROUP BY priority ORDER BY avg_resolution_hours ASC, priority ASC;",
    "expectedColumns": [
      "priority",
      "issues_resolved",
      "avg_resolution_hours"
    ],
    "hints": [
      "Filter for completed issues with resolved_at.",
      "Calculate epoch hours difference.",
      "Group by priority and average."
    ],
    "explanation": "Resolution SLAs enforce fast triage on critical bug reports.",
    "number": 195
  },
  {
    "id": "inter-196",
    "title": "196. Datadog: Service APM P99 Latency Anomaly vs 7-Day Baseline",
    "difficulty": "Medium",
    "companies": [
      "Datadog",
      "New Relic"
    ],
    "topics": [
      "WHERE",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nDatadog APM Watchdog monitors microservice latency spikes. Identify services where current hour P99 latency exceeded 1.5x (150% of) their trailing 7-day P99 baseline latency.\n\n### Requirements\n- Filter for services where current_p99_ms > 1.5 * baseline_p99_ms.\n- Calculate latency_multiplier as current_p99_ms / baseline_p99_ms, rounded to 2 decimal places.\n- Output columns: service_name, baseline_p99_ms, current_p99_ms, latency_multiplier.\n- Sort by latency_multiplier descending, then by service_name ascending.\n\n### Input Schema\n**apm_services** (id INT, service_name VARCHAR, baseline_p99_ms NUMERIC, current_p99_ms NUMERIC)",
    "schemaSql": "CREATE TABLE apm_services (id INT PRIMARY KEY, service_name VARCHAR(50), baseline_p99_ms NUMERIC, current_p99_ms NUMERIC);\nINSERT INTO apm_services VALUES (1, 'checkout-service', 120.0, 240.0), (2, 'payment-gateway', 85.0, 190.0), (3, 'user-auth', 45.0, 52.0), (4, 'inventory-cache', 15.0, 18.0);",
    "starterSql": "-- 196. Datadog: Service APM P99 Latency Anomaly vs 7-Day Baseline\n-- Output: service_name, baseline_p99_ms, current_p99_ms, latency_multiplier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT service_name, baseline_p99_ms, current_p99_ms, ROUND(current_p99_ms / baseline_p99_ms, 2) AS latency_multiplier FROM apm_services WHERE current_p99_ms > 1.5 * baseline_p99_ms ORDER BY latency_multiplier DESC, service_name ASC;",
    "expectedColumns": [
      "service_name",
      "baseline_p99_ms",
      "current_p99_ms",
      "latency_multiplier"
    ],
    "hints": [
      "Filter WHERE current_p99_ms > 1.5 * baseline_p99_ms.",
      "Compute ratio and round to 2 decimals.",
      "Order by latency_multiplier DESC, service_name ASC."
    ],
    "explanation": "Watchdog anomaly detection alerts on-call engineers to downstream database connection saturation.",
    "number": 196
  },
  {
    "id": "inter-197",
    "title": "197. New Relic: Server Memory Saturation Hours Above 90 Percent Threshold",
    "difficulty": "Medium",
    "companies": [
      "New Relic",
      "Datadog"
    ],
    "topics": [
      "COUNT",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nNew Relic Infrastructure monitors host memory pressure. Identify all server hosts that operated with memory utilization strictly above 90% for 3 or more hourly inspection checks.\n\n### Requirements\n- Filter checks where memory_utilization_pct > 90.0.\n- Count saturation hours per host.\n- Filter for hosts with saturation_hours >= 3.\n- Output columns: host_name, cluster_name, saturation_hours.\n- Sort by saturation_hours descending, then by host_name ascending.\n\n### Input Schema\n**host_telemetry** (id INT, host_name VARCHAR, cluster_name VARCHAR, check_time TIMESTAMP, memory_utilization_pct NUMERIC)",
    "schemaSql": "CREATE TABLE host_telemetry (id INT PRIMARY KEY, host_name VARCHAR(50), cluster_name VARCHAR(50), check_time TIMESTAMP, memory_utilization_pct NUMERIC);\nINSERT INTO host_telemetry VALUES (1, 'prod-web-01', 'K8s-Prod', '2025-01-01 10:00:00', 92.5), (2, 'prod-web-01', 'K8s-Prod', '2025-01-01 11:00:00', 94.0), (3, 'prod-web-01', 'K8s-Prod', '2025-01-01 12:00:00', 91.0), (4, 'prod-web-02', 'K8s-Prod', '2025-01-01 10:00:00', 93.0), (5, 'prod-web-02', 'K8s-Prod', '2025-01-01 11:00:00', 88.0);",
    "starterSql": "-- 197. New Relic: Server Memory Saturation Hours Above 90 Percent Threshold\n-- Output: host_name, cluster_name, saturation_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT host_name, cluster_name, COUNT(id) AS saturation_hours FROM host_telemetry WHERE memory_utilization_pct > 90.0 GROUP BY host_name, cluster_name HAVING COUNT(id) >= 3 ORDER BY saturation_hours DESC, host_name ASC;",
    "expectedColumns": [
      "host_name",
      "cluster_name",
      "saturation_hours"
    ],
    "hints": [
      "Filter WHERE memory_utilization_pct > 90.0.",
      "Group by host_name and cluster_name.",
      "Filter HAVING COUNT(id) >= 3."
    ],
    "explanation": "Persistent memory saturation indicates memory leaks or inadequate horizontal pod auto-scaling.",
    "number": 197
  },
  {
    "id": "inter-198",
    "title": "198. PagerDuty: On-Call Incident MTTR by Escalation Level",
    "difficulty": "Medium",
    "companies": [
      "PagerDuty",
      "Datadog"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "description": "### Problem Statement\nPagerDuty Reliability Engineering audits incident response efficiency. Calculate the Mean Time to Resolution (MTTR) in minutes across incident severity tiers ('P1-Critical', 'P2-Major', 'P3-Minor').\n\n### Requirements\n- Filter for resolved incidents (resolved_at IS NOT NULL).\n- Calculate resolution time in minutes as elapsed minutes between triggered_at and resolved_at.\n- Compute mttr_minutes per severity, rounded to 2 decimal places.\n- Output columns: severity, incident_count, mttr_minutes.\n- Sort by mttr_minutes ascending, then by severity ascending.\n\n### Input Schema\n**incident_logs** (id INT, severity VARCHAR, triggered_at TIMESTAMP, resolved_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE incident_logs (id INT PRIMARY KEY, severity VARCHAR(20), triggered_at TIMESTAMP, resolved_at TIMESTAMP);\nINSERT INTO incident_logs VALUES (1, 'P1-Critical', '2025-01-01 02:00:00', '2025-01-01 02:25:00'), (2, 'P1-Critical', '2025-01-02 14:00:00', '2025-01-02 14:45:00'), (3, 'P2-Major', '2025-01-01 10:00:00', '2025-01-01 11:15:00'), (4, 'P3-Minor', '2025-01-01 09:00:00', '2025-01-01 12:30:00');",
    "starterSql": "-- 198. PagerDuty: On-Call Incident MTTR by Escalation Level\n-- Output: severity, incident_count, mttr_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT severity, COUNT(id) AS incident_count, ROUND(AVG(EXTRACT(EPOCH FROM (resolved_at - triggered_at)) / 60.0), 2) AS mttr_minutes FROM incident_logs WHERE resolved_at IS NOT NULL GROUP BY severity ORDER BY mttr_minutes ASC, severity ASC;",
    "expectedColumns": [
      "severity",
      "incident_count",
      "mttr_minutes"
    ],
    "hints": [
      "Filter WHERE resolved_at IS NOT NULL.",
      "Extract epoch in minutes.",
      "Group by severity and compute AVG()."
    ],
    "explanation": "MTTR benchmarks incident response readiness and escalation tier efficiency.",
    "number": 198
  },
  {
    "id": "inter-199",
    "title": "199. Splunk: Log Ingestion Spike Volume Outlier by Host Machine",
    "difficulty": "Medium",
    "companies": [
      "Splunk",
      "Datadog"
    ],
    "topics": [
      "AVG OVER",
      "ROUND",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nSplunk Security Operations Center (SOC) detects compromised host log flooding. For each server host, compare current hourly log ingestion gigabytes against that host's average hourly log ingestion volume.\n\n### Requirements\n- Compute average hourly log volume per host using an aggregate window function.\n- Calculate volume_multiplier as current hourly_gb divided by avg_hourly_gb, rounded to 2 decimal places.\n- Filter for hourly snapshots where current volume is strictly more than 2x the host average (multiplier > 2.0).\n- Output columns: host_name, log_hour, hourly_gb, avg_hourly_gb, volume_multiplier.\n- Sort by volume_multiplier descending, then by host_name ascending.\n\n### Input Schema\n**log_ingestion** (id INT, host_name VARCHAR, log_hour TIMESTAMP, hourly_gb NUMERIC)",
    "schemaSql": "CREATE TABLE log_ingestion (id INT PRIMARY KEY, host_name VARCHAR(50), log_hour TIMESTAMP, hourly_gb NUMERIC);\nINSERT INTO log_ingestion VALUES (1, 'auth-node-01', '2025-01-01 10:00:00', 12.0), (2, 'auth-node-01', '2025-01-01 11:00:00', 10.0), (3, 'auth-node-01', '2025-01-01 12:00:00', 45.0), (4, 'db-node-01', '2025-01-01 10:00:00', 80.0), (5, 'db-node-01', '2025-01-01 11:00:00', 85.0);",
    "starterSql": "-- 199. Splunk: Log Ingestion Spike Volume Outlier by Host Machine\n-- Output: host_name, log_hour, hourly_gb, avg_hourly_gb, volume_multiplier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT host_name, log_hour, hourly_gb, ROUND(AVG(hourly_gb) OVER (PARTITION BY host_name), 2) AS avg_hourly_gb FROM log_ingestion) SELECT host_name, log_hour, hourly_gb, avg_hourly_gb, ROUND(hourly_gb / avg_hourly_gb, 2) AS volume_multiplier FROM ranked WHERE (hourly_gb / avg_hourly_gb) > 2.0 ORDER BY volume_multiplier DESC, host_name ASC;",
    "expectedColumns": [
      "host_name",
      "log_hour",
      "hourly_gb",
      "avg_hourly_gb",
      "volume_multiplier"
    ],
    "hints": [
      "Compute AVG(hourly_gb) OVER (PARTITION BY host_name).",
      "Filter where hourly_gb / avg_hourly_gb > 2.0.",
      "Sort by volume_multiplier DESC."
    ],
    "explanation": "Sudden 2x+ log volume surges often reveal debug loops or denial-of-service brute-force floods.",
    "number": 199
  },
  {
    "id": "inter-200",
    "title": "200. Cloudflare: Edge Cache Hit Ratio and Bandwidth Savings Percentage",
    "difficulty": "Medium",
    "companies": [
      "Cloudflare",
      "Fastly"
    ],
    "topics": [
      "ROUND",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "High",
    "category": "Aggregations",
    "orderSensitive": true,
    "description": "### Problem Statement\nCloudflare CDN Performance audits edge bandwidth optimization. Calculate the edge cache hit ratio percentage and origin egress bandwidth saved across web zones.\n\n### Requirements\n- Sum cached_requests and origin_requests per zone_name.\n- Calculate cache_hit_pct as cached_requests / (cached_requests + origin_requests) * 100, rounded to 2 decimal places.\n- Sum cached_bytes_gb as bandwidth_saved_gb.\n- Output columns: zone_name, total_requests, cache_hit_pct, bandwidth_saved_gb.\n- Sort by cache_hit_pct descending, then by zone_name ascending.\n\n### Input Schema\n**cdn_zones** (id INT, zone_name VARCHAR, cached_requests INT, origin_requests INT, cached_bytes_gb NUMERIC)",
    "schemaSql": "CREATE TABLE cdn_zones (id INT PRIMARY KEY, zone_name VARCHAR(50), cached_requests INT, origin_requests INT, cached_bytes_gb NUMERIC);\nINSERT INTO cdn_zones VALUES (1, 'api.example.com', 850000, 150000, 420.5), (2, 'api.example.com', 920000, 80000, 510.0), (3, 'static.example.com', 4800000, 200000, 3400.0), (4, 'static.example.com', 5100000, 100000, 3600.0);",
    "starterSql": "-- 200. Cloudflare: Edge Cache Hit Ratio and Bandwidth Savings Percentage\n-- Output: zone_name, total_requests, cache_hit_pct, bandwidth_saved_gb\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT zone_name, SUM(cached_requests + origin_requests) AS total_requests, ROUND(SUM(cached_requests) * 100.0 / NULLIF(SUM(cached_requests + origin_requests), 0), 2) AS cache_hit_pct, ROUND(SUM(cached_bytes_gb), 2) AS bandwidth_saved_gb FROM cdn_zones GROUP BY zone_name ORDER BY cache_hit_pct DESC, zone_name ASC;",
    "expectedColumns": [
      "zone_name",
      "total_requests",
      "cache_hit_pct",
      "bandwidth_saved_gb"
    ],
    "hints": [
      "Sum total requests and cached requests.",
      "Compute hit percentage and round to 2 decimals.",
      "Order by cache_hit_pct DESC."
    ],
    "explanation": "Edge cache hit ratios minimize expensive origin server load and cloud egress egress egress bandwidth bills.",
    "number": 200
  }
];
}
