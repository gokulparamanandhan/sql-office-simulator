import type { ConceptPrimer, RampStep } from "../interview/sql-learning-helpers";

export type { ConceptPrimer, RampStep };

export interface InterviewQuestion {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  topics: string[];
  frequency: "Very High" | "High" | "Medium";
  category: "Aggregations" | "Window Functions" | "Cohorts & Retention" | "Joins & Set Theory" | "Gaps & Islands" | "Business Analytics" | "Advanced SQL";
  description: string;
  schemaSql: string;
  hiddenTestSql?: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hints: string[];
  explanation: string;
  orderSensitive?: boolean;
  stage?: string;
  stageOrder?: number;
  rampStep?: RampStep;
  patternTag?: string;
  conceptPrimer?: ConceptPrimer;
  blueprintSql?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    "id": "basic-001",
    "number": 1,
    "title": "1. Netflix: Top 5 Longest 4K Ultra-HD Movies",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "topics": [
      "SELECT",
      "WHERE",
      "ORDER BY",
      "LIMIT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Filtering & Deterministic Sorting",
    "description": "### Problem Statement\nNetflix Content Engineering wants to inspect the longest movies available in 4K Ultra-HD resolution. Retrieve the top 5 longest 4K movies.\n\n### Requirements\n- Only consider movies where `is_4k` is `TRUE`.\n- Sort from longest `duration_minutes` to shortest; break ties alphabetically by `title` ascending.\n- Return at most 5 rows with columns `title`, `duration_minutes`.\n\n### Input Schema\n**movies** (id INT, title VARCHAR, duration_minutes INT, is_4k BOOLEAN, release_year INT)",
    "schemaSql": "CREATE TABLE movies (id INT PRIMARY KEY, title VARCHAR(100), duration_minutes INT, is_4k BOOLEAN, release_year INT);\nINSERT INTO movies VALUES (1, 'The Irishman', 209, TRUE, 2019), (2, 'Roma', 135, TRUE, 2018), (3, 'Red Notice', 118, TRUE, 2021), (4, 'Extraction 2', 123, TRUE, 2023), (5, 'Glass Onion', 139, TRUE, 2022), (6, 'Marriage Story', 137, FALSE, 2019), (7, 'All Quiet on the Western Front', 148, TRUE, 2022);",
    "starterSql": "-- 1. Netflix: Top 5 Longest 4K Ultra-HD Movies\n-- Output: title, duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT title, duration_minutes FROM movies WHERE is_4k = TRUE ORDER BY duration_minutes DESC, title ASC LIMIT 5;",
    "expectedColumns": [
      "title",
      "duration_minutes"
    ],
    "hints": [
      "Filter with WHERE is_4k = TRUE.",
      "Sort by duration_minutes DESC, title ASC.",
      "Add LIMIT 5."
    ],
    "explanation": "Always add a deterministic tie-breaker (like title ASC) in ORDER BY when applying LIMIT."
  },
  {
    "id": "basic-002",
    "number": 2,
    "title": "2. Airbnb: Distinct Active Cities with Clean Whitespace",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Booking.com"
    ],
    "topics": [
      "DISTINCT",
      "TRIM",
      "WHERE IS NOT NULL"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "String Cleaning & DISTINCT",
    "description": "### Problem Statement\nAirbnb Inventory Ops discovered city names entered with stray leading/trailing spaces and missing values. Produce a clean, deduplicated list of cities that have at least one active listing.\n\n### Requirements\n- Exclude listings where `city` is `NULL` or blank after trimming.\n- Include only listings where `is_active` is `TRUE`.\n- Trim whitespace from `city` and return unique values as `clean_city`.\n- Sort alphabetically by `clean_city` ascending.\n\n### Input Schema\n**listings** (id INT, title VARCHAR, city VARCHAR, is_active BOOLEAN)",
    "schemaSql": "CREATE TABLE listings (id INT PRIMARY KEY, title VARCHAR(100), city VARCHAR(50), is_active BOOLEAN);\nINSERT INTO listings VALUES (1, 'SoHo Loft', ' New York', TRUE), (2, 'Midtown Studio', 'New York ', TRUE), (3, 'Mission Flat', 'Austin', TRUE), (4, 'Ghost Condo', NULL, TRUE), (5, 'Blank Entry', '   ', TRUE), (6, 'Old Cabin', 'Denver', FALSE);",
    "starterSql": "-- 2. Airbnb: Distinct Active Cities with Clean Whitespace\n-- Output: clean_city\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT DISTINCT TRIM(city) AS clean_city FROM listings WHERE is_active = TRUE AND city IS NOT NULL AND TRIM(city) <> '' ORDER BY clean_city ASC;",
    "expectedColumns": [
      "clean_city"
    ],
    "hints": [
      "Use TRIM(city) to strip spaces before DISTINCT collapses duplicates.",
      "Guard against NULL and empty trimmed strings in WHERE."
    ],
    "explanation": "TRIM() before DISTINCT prevents ' New York' and 'New York ' from appearing as two separate cities."
  },
  {
    "id": "basic-003",
    "number": 3,
    "title": "3. Nike: Limited Edition Sneaker Inventory by Popular Sizes",
    "difficulty": "Easy",
    "companies": [
      "Nike",
      "Adidas"
    ],
    "topics": [
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Discrete List & Range Filters",
    "description": "### Problem Statement\nNike SNKRS manages drop allocations. Check stock availability for 'Air Jordan 1 Retro' across popular US men's shoe sizes: 9.0, 9.5, 10.0, and 10.5.\n\n### Requirements\n- Filter for `model_name = 'Air Jordan 1 Retro'` and `size_us IN (9.0, 9.5, 10.0, 10.5)`.\n- Output columns: `size_us`, `units_available`.\n- Sort by `size_us` ascending.\n\n### Input Schema\n**sneaker_stock** (id INT, model_name VARCHAR, size_us NUMERIC, units_available INT)",
    "schemaSql": "CREATE TABLE sneaker_stock (id INT PRIMARY KEY, model_name VARCHAR(100), size_us NUMERIC, units_available INT);\nINSERT INTO sneaker_stock VALUES (1, 'Air Jordan 1 Retro', 8.5, 15), (2, 'Air Jordan 1 Retro', 9.0, 35), (3, 'Air Jordan 1 Retro', 9.5, 42), (4, 'Air Jordan 1 Retro', 10.0, 50), (5, 'Air Jordan 1 Retro', 10.5, 30), (6, 'Air Jordan 1 Retro', 11.0, 20), (7, 'Dunk Low Panda', 10.0, 65);",
    "starterSql": "-- 3. Nike: Limited Edition Sneaker Inventory by Popular Sizes\n-- Output: size_us, units_available\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT size_us, units_available FROM sneaker_stock WHERE model_name = 'Air Jordan 1 Retro' AND size_us IN (9.0, 9.5, 10.0, 10.5) ORDER BY size_us ASC;",
    "expectedColumns": [
      "size_us",
      "units_available"
    ],
    "hints": [
      "Filter model_name and use IN (9.0, 9.5, 10.0, 10.5) in WHERE."
    ],
    "explanation": "IN matches against a discrete list cleanly without chaining multiple OR clauses."
  },
  {
    "id": "basic-004",
    "number": 4,
    "title": "4. Shopify: Flagging Missing Shipping Addresses & NULL Notes",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Etsy"
    ],
    "topics": [
      "COALESCE",
      "IS NULL",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "NULL Safety & Fallbacks",
    "description": "### Problem Statement\nShopify Fulfillment needs a clean dispatch manifest for pending orders. Some orders lack a courier code (`NULL`), and some lack delivery notes.\n\n### Requirements\n- Include only orders where `status = 'pending'`.\n- Replace missing `courier` with `'UNASSIGNED'` as `courier_label`.\n- Compute `total_due` as `subtotal` plus `shipping_fee` (treating missing shipping fee as `0`).\n- Output columns: `order_id`, `courier_label`, `total_due`.\n- Sort by `order_id` ascending.\n\n### Input Schema\n**pending_orders** (order_id INT, status VARCHAR, courier VARCHAR, subtotal NUMERIC, shipping_fee NUMERIC)",
    "schemaSql": "CREATE TABLE pending_orders (order_id INT PRIMARY KEY, status VARCHAR(20), courier VARCHAR(30), subtotal NUMERIC, shipping_fee NUMERIC);\nINSERT INTO pending_orders VALUES (101, 'pending', 'FedEx', 80.00, 9.99), (102, 'pending', NULL, 45.00, NULL), (103, 'shipped', 'UPS', 120.00, 12.00), (104, 'pending', 'DHL', 210.00, NULL);",
    "starterSql": "-- 4. Shopify: Flagging Missing Shipping Addresses & NULL Notes\n-- Output: order_id, courier_label, total_due\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT order_id, COALESCE(courier, 'UNASSIGNED') AS courier_label, subtotal + COALESCE(shipping_fee, 0) AS total_due FROM pending_orders WHERE status = 'pending' ORDER BY order_id ASC;",
    "expectedColumns": [
      "order_id",
      "courier_label",
      "total_due"
    ],
    "hints": [
      "Adding a number + NULL yields NULL in SQL—always wrap nullable numbers in COALESCE(..., 0)."
    ],
    "explanation": "In SQL, any arithmetic with NULL evaluates to NULL unless guarded with COALESCE()."
  },
  {
    "id": "basic-005",
    "number": 5,
    "title": "5. Spotify: Case-Insensitive Track Search with ILIKE & Pattern Matching",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "YouTube"
    ],
    "topics": [
      "ILIKE",
      "LIKE",
      "BETWEEN"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Pattern Matching",
    "description": "### Problem Statement\nSpotify Search QA wants to find all tracks containing the word 'midnight' (case-insensitive) whose duration falls between 180 and 300 seconds inclusive.\n\n### Requirements\n- Match `track_title` containing `'midnight'` regardless of uppercase/lowercase.\n- Filter `duration_sec` between 180 and 300 inclusive.\n- Output columns: `track_id`, `track_title`, `duration_sec`.\n- Sort by `duration_sec` descending, then `track_id` ascending.\n\n### Input Schema\n**tracks** (track_id INT, track_title VARCHAR, duration_sec INT)",
    "schemaSql": "CREATE TABLE tracks (track_id INT PRIMARY KEY, track_title VARCHAR(100), duration_sec INT);\nINSERT INTO tracks VALUES (1, 'Midnight Rain', 175), (2, 'After MIDNIGHT Drive', 242), (3, 'midnight city lights', 242), (4, 'Sunset Boulevard', 210), (5, 'Midnight Symphony', 320), (6, 'Neon Midnight', 195);",
    "starterSql": "-- 5. Spotify: Case-Insensitive Track Search with ILIKE & Pattern Matching\n-- Output: track_id, track_title, duration_sec\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT track_id, track_title, duration_sec FROM tracks WHERE track_title ILIKE '%midnight%' AND duration_sec BETWEEN 180 AND 300 ORDER BY duration_sec DESC, track_id ASC;",
    "expectedColumns": [
      "track_id",
      "track_title",
      "duration_sec"
    ],
    "hints": [
      "Use ILIKE '%midnight%' in PostgreSQL (or LOWER(track_title) LIKE '%midnight%').",
      "Use BETWEEN 180 AND 300."
    ],
    "explanation": "ILIKE performs case-insensitive pattern matching in PostgreSQL while BETWEEN is inclusive of both endpoints."
  },
  {
    "id": "basic-006",
    "number": 6,
    "title": "6. Twitter: Follower to Following Ratio for Verified Accounts",
    "difficulty": "Easy",
    "companies": [
      "Twitter",
      "Meta"
    ],
    "topics": [
      "ROUND",
      "NULLIF",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Zero-Safe Division (NULLIF)",
    "description": "### Problem Statement\nTwitter/X Trust & Safety audits verified accounts. Calculate the follower-to-following ratio for all verified accounts without crashing when `following_count` is 0.\n\n### Requirements\n- Filter for accounts where `is_verified = TRUE`.\n- Calculate `follower_ratio` as `followers_count * 1.0 / following_count (returning null if 0)`, rounded to 2 decimal places.\n- Output columns: `handle`, `followers_count`, `following_count`, `follower_ratio`.\n- Sort by `follower_ratio` from highest to lowest (with null values last), then `handle` ascending.\n\n### Input Schema\n**profiles** (id INT, handle VARCHAR, followers_count INT, following_count INT, is_verified BOOLEAN)",
    "schemaSql": "CREATE TABLE profiles (id INT PRIMARY KEY, handle VARCHAR(50), followers_count INT, following_count INT, is_verified BOOLEAN);\nINSERT INTO profiles VALUES (1, 'tech_guru', 150000, 300, TRUE), (2, 'crypto_whiz', 85000, 120, TRUE), (3, 'daily_memes', 40000, 2500, FALSE), (4, 'news_wire', 500000, 50, TRUE), (5, 'silent_reader', 12, 450, FALSE), (6, 'fresh_bot', 1200, 0, TRUE);",
    "starterSql": "-- 6. Twitter: Follower to Following Ratio for Verified Accounts\n-- Output: handle, followers_count, following_count, follower_ratio\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT handle, followers_count, following_count, ROUND(followers_count * 1.0 / NULLIF(following_count, 0), 2) AS follower_ratio FROM profiles WHERE is_verified = TRUE ORDER BY follower_ratio DESC NULLS LAST, handle ASC;",
    "expectedColumns": [
      "handle",
      "followers_count",
      "following_count",
      "follower_ratio"
    ],
    "hints": [
      "Use NULLIF(following_count, 0) so dividing by 0 returns NULL instead of an error.",
      "Remember NULLS LAST when sorting DESC in PostgreSQL."
    ],
    "explanation": "NULLIF(x, 0) converts zero denominators to NULL, preventing division-by-zero failures across analytical queries."
  },
  {
    "id": "basic-007",
    "number": 7,
    "title": "7. Google: High-Impression Zero-Click Active Search Ads",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Meta"
    ],
    "topics": [
      "WHERE",
      "AND",
      "OR",
      "Parentheses"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Boolean Precedence",
    "description": "### Problem Statement\nGoogle Ads Quality wants to review underperforming creatives. Find ads that are either `'active'` or `'review'` (ignoring case/spaces), have at least 1,000 impressions, and have 0 clicks.\n\n### Requirements\n- Normalize `status` (case-insensitive, ignoring extra spaces on `status`) and match `'active'` or `'review'`.\n- Filter `impressions >= 1000` AND `clicks = 0`.\n- Output columns: `ad_id`, `headline`, `impressions`.\n- Sort by `impressions` descending, then `ad_id` ascending.\n\n### Input Schema\n**search_ads** (ad_id INT, headline VARCHAR, impressions INT, clicks INT, status VARCHAR)",
    "schemaSql": "CREATE TABLE search_ads (ad_id INT PRIMARY KEY, headline VARCHAR(100), impressions INT, clicks INT, status VARCHAR(20));\nINSERT INTO search_ads VALUES (1, 'Buy 1 Get 1 Shoes', 1500, 0, ' active '), (2, '20% Off Footwear', 2400, 45, 'active'), (3, 'Coats Under $99', 3100, 0, 'REVIEW'), (4, 'New Arrivals', 800, 0, 'active'), (5, 'Thermal Socks', 1800, 0, 'paused');",
    "starterSql": "-- 7. Google: High-Impression Zero-Click Active Search Ads\n-- Output: ad_id, headline, impressions\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT ad_id, headline, impressions FROM search_ads WHERE LOWER(TRIM(status)) IN ('active', 'review') AND impressions >= 1000 AND clicks = 0 ORDER BY impressions DESC, ad_id ASC;",
    "expectedColumns": [
      "ad_id",
      "headline",
      "impressions"
    ],
    "hints": [
      "Normalize status before checking IN ('active', 'review') or wrap OR conditions in parentheses."
    ],
    "explanation": "AND binds tighter than OR in SQL—always use IN (...) or explicit parentheses around OR branches."
  },
  {
    "id": "basic-008",
    "number": 8,
    "title": "8. Stripe: Parsing Dirty Currency Strings into Clean Revenue",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "topics": [
      "REPLACE",
      "CAST",
      "TRIM",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Applied",
    "patternTag": "Type Casting & String Normalization",
    "description": "### Problem Statement\nA legacy Stripe CSV import stored invoice amounts as dirty text like `'$1,250.50'` or `' 420.00'`. Clean the text into numeric values and return invoices worth at least $500.\n\n### Requirements\n- Strip `'\n### Input Schema\n**legacy_invoices** (invoice_id INT, raw_amount VARCHAR, status VARCHAR)`, `','`, and surrounding spaces from `raw_amount`, then convert to a numeric value.\n- Keep only rows where `status = 'paid'` and cleaned amount `>= 500`.\n- Output columns: `invoice_id`, `clean_amount`.\n- Sort by `clean_amount` descending, then `invoice_id` ascending.\n\n### Input Schema\n**legacy_invoices** (invoice_id INT, raw_amount VARCHAR, status VARCHAR)",
    "schemaSql": "CREATE TABLE legacy_invoices (invoice_id INT PRIMARY KEY, raw_amount VARCHAR(30), status VARCHAR(20));\nINSERT INTO legacy_invoices VALUES (1, '$1,250.50', 'paid'), (2, ' 499.99 ', 'paid'), (3, '$850.00', 'paid'), (4, '$2,100.00', 'void'), (5, '500.00', 'paid');",
    "starterSql": "-- 8. Stripe: Parsing Dirty Currency Strings into Clean Revenue\n-- Output: invoice_id, clean_amount\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT invoice_id, REPLACE(REPLACE(TRIM(raw_amount), '$', ''), ',', '')::NUMERIC AS clean_amount FROM legacy_invoices WHERE status = 'paid' AND REPLACE(REPLACE(TRIM(raw_amount), '$', ''), ',', '')::NUMERIC >= 500 ORDER BY clean_amount DESC, invoice_id ASC;",
    "expectedColumns": [
      "invoice_id",
      "clean_amount"
    ],
    "hints": [
      "Nest REPLACE(..., '$', '') and REPLACE(..., ',', '') before casting ::NUMERIC."
    ],
    "explanation": "Operational imports frequently encode numbers as formatted strings; stripping symbols before casting unlocks numeric comparisons."
  },
  {
    "id": "basic-009",
    "number": 9,
    "title": "9. Reddit: Paginating Top Posts with OFFSET and NULL Tie-Breakers",
    "difficulty": "Easy",
    "companies": [
      "Reddit",
      "Discord"
    ],
    "topics": [
      "ORDER BY",
      "LIMIT",
      "OFFSET",
      "COALESCE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Applied",
    "patternTag": "Pagination & Tie-Breaking",
    "description": "### Problem Statement\nReddit's feed API serves page 2 of top posts (5 posts per page). Some legacy posts have `NULL` upvotes which should be treated as 0.\n\n### Requirements\n- Compute `net_score` as `(upvotes, defaulting to 0 if missing) - (downvotes, defaulting to 0 if missing)`.\n- Sort by `net_score` descending, then `post_id` ascending.\n- Skip the first 3 posts and return the next 3 posts (Page 2 of size 3).\n- Output columns: `post_id`, `title`, `net_score`.\n\n### Input Schema\n**posts** (post_id INT, title VARCHAR, upvotes INT, downvotes INT)",
    "schemaSql": "CREATE TABLE posts (post_id INT PRIMARY KEY, title VARCHAR(100), upvotes INT, downvotes INT);\nINSERT INTO posts VALUES (1, 'PostgreSQL Tips', 500, 20), (2, 'Window Functions Guide', 420, 10), (3, 'CTE Deep Dive', 310, NULL), (4, 'Query Tuning 101', 250, 15), (5, 'Index Secrets', NULL, 5), (6, 'Join Patterns', 250, 15), (7, 'SQL Quiz', 180, 0);",
    "starterSql": "-- 9. Reddit: Paginating Top Posts with OFFSET and NULL Tie-Breakers\n-- Output: post_id, title, net_score\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT post_id, title, (COALESCE(upvotes, 0) - COALESCE(downvotes, 0)) AS net_score FROM posts ORDER BY net_score DESC, post_id ASC LIMIT 3 OFFSET 3;",
    "expectedColumns": [
      "post_id",
      "title",
      "net_score"
    ],
    "hints": [
      "Use COALESCE on both upvotes and downvotes.",
      "Combine ORDER BY net_score DESC, post_id ASC with LIMIT 3 OFFSET 3."
    ],
    "explanation": "Pagination with LIMIT/OFFSET always requires a unique tie-breaker column in ORDER BY so rows don't shift between pages."
  },
  {
    "id": "basic-010",
    "number": 10,
    "title": "10. TikTok: Creator Engagement Rate with Dirty Metrics",
    "difficulty": "Easy",
    "companies": [
      "TikTok",
      "Instagram"
    ],
    "topics": [
      "ROUND",
      "COALESCE",
      "NULLIF",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 1: Core Querying & Dirty Hygiene",
    "stageOrder": 1,
    "rampStep": "Applied",
    "patternTag": "Combined Hygiene & Safe Ratios",
    "description": "### Problem Statement\nTikTok Creator Analytics flags videos with strong engagement. Missing `likes` or `comments` are stored as `NULL`, and draft videos have 0 views.\n\n### Requirements\n- Exclude videos with `0` or `NULL` views, and include only `status` matching `'published'` (case-insensitive, ignoring extra spaces).\n- Compute `engagement_rate` as `((likes, defaulting to 0 if missing) + (comments, defaulting to 0 if missing)) * 100.0 / views (returning null if 0)`, rounded to 2 decimal places.\n- Return videos with `engagement_rate >= 5.0`.\n- Output columns: `video_id`, `creator`, `engagement_rate`.\n- Sort by `engagement_rate` descending, then `video_id` ascending.\n\n### Input Schema\n**videos** (video_id INT, creator VARCHAR, status VARCHAR, views INT, likes INT, comments INT)",
    "schemaSql": "CREATE TABLE videos (video_id INT PRIMARY KEY, creator VARCHAR(50), status VARCHAR(20), views INT, likes INT, comments INT);\nINSERT INTO videos VALUES (1, 'maya_creates', ' published ', 10000, 620, 80), (2, 'leo_tech', 'Published', 5000, 200, NULL), (3, 'zoe_dance', 'published', 8000, 400, 100), (4, 'draft_user', 'published', 0, 10, 0), (5, 'hidden_vid', 'draft', 9000, 900, 50);",
    "starterSql": "-- 10. TikTok: Creator Engagement Rate with Dirty Metrics\n-- Output: video_id, creator, engagement_rate\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT video_id, creator, ROUND((COALESCE(likes, 0) + COALESCE(comments, 0)) * 100.0 / NULLIF(views, 0), 2) AS engagement_rate FROM videos WHERE LOWER(TRIM(status)) = 'published' AND COALESCE(views, 0) > 0 AND (COALESCE(likes, 0) + COALESCE(comments, 0)) * 100.0 / NULLIF(views, 0) >= 5.0 ORDER BY engagement_rate DESC, video_id ASC;",
    "expectedColumns": [
      "video_id",
      "creator",
      "engagement_rate"
    ],
    "hints": [
      "Remember you cannot reference a SELECT alias inside the WHERE clause—repeat the expression or filter views > 0 safely."
    ],
    "explanation": "PostgreSQL evaluates WHERE before SELECT, so SELECT aliases aren't visible in WHERE (a preview of why CTEs help!)."
  },
  {
    "id": "basic-011",
    "number": 11,
    "title": "11. Amazon: Product Price Tier Classification with CASE WHEN",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Walmart"
    ],
    "topics": [
      "CASE WHEN",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "CASE WHEN Segmentation",
    "description": "### Problem Statement\nAmazon Merchandising labels catalog items by price tier for storefront badges.\n\n### Requirements\n- Classify each product into `price_tier`:\n - `price >= 200` -> `'Luxury'`\n - `price >= 50` -> `'Standard'`\n - Otherwise -> `'Budget'`\n- Output columns: `product_name`, `price`, `price_tier`.\n- Sort by `price` descending, then `product_name` ascending.\n\n### Input Schema\n**catalog** (id INT, product_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE catalog (id INT PRIMARY KEY, product_name VARCHAR(80), price NUMERIC);\nINSERT INTO catalog VALUES (1, 'Noise-Canceling Headphones', 299.00), (2, 'USB-C Hub', 35.00), (3, 'Mechanical Keyboard', 110.00), (4, '4K Monitor', 450.00), (5, 'Mouse Pad', 15.00);",
    "starterSql": "-- 11. Amazon: Product Price Tier Classification with CASE WHEN\n-- Output: product_name, price, price_tier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT product_name, price, CASE WHEN price >= 200 THEN 'Luxury' WHEN price >= 50 THEN 'Standard' ELSE 'Budget' END AS price_tier FROM catalog ORDER BY price DESC, product_name ASC;",
    "expectedColumns": [
      "product_name",
      "price",
      "price_tier"
    ],
    "hints": [
      "CASE WHEN branches evaluate top-to-bottom and stop at the first TRUE condition."
    ],
    "explanation": "Ordering CASE WHEN thresholds from highest to lowest avoids overlapping BETWEEN ranges."
  },
  {
    "id": "basic-012",
    "number": 12,
    "title": "12. Meta: User Engagement Activity Tier Classification",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "TikTok"
    ],
    "topics": [
      "CASE WHEN",
      "GROUP BY",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "CASE WHEN on Aggregates",
    "description": "### Problem Statement\nMeta's User Engagement team segments active creators based on weekly post volume. Categorize each user into an activity tier.\n\n### Requirements\n- Count total posts created by each user.\n- `>= 10` posts -> `'Power User'`; `4..9` posts -> `'Regular User'`; `1..3` posts -> `'Casual User'`.\n- Output columns: `username`, `post_count`, `activity_tier`.\n- Sort by `post_count` descending, then `username` ascending.\n\n### Input Schema\n**users** (id INT, username VARCHAR)\n\n**posts** (id INT, user_id INT, created_at DATE)",
    "schemaSql": "CREATE TABLE users (id INT PRIMARY KEY, username VARCHAR(50));\nCREATE TABLE posts (id INT PRIMARY KEY, user_id INT, created_at DATE);\nINSERT INTO users VALUES (1, 'sarah_p'), (2, 'mike_dev'), (3, 'clara_k'), (4, 'john_d');\nINSERT INTO posts VALUES (101, 1, '2025-01-01'), (102, 1, '2025-01-02'), (103, 1, '2025-01-02'), (104, 1, '2025-01-03'), (105, 1, '2025-01-04'), (106, 1, '2025-01-04'), (107, 1, '2025-01-05'), (108, 1, '2025-01-05'), (109, 1, '2025-01-06'), (110, 1, '2025-01-06'), (111, 1, '2025-01-07'), (112, 2, '2025-01-02'), (113, 2, '2025-01-03'), (114, 2, '2025-01-04'), (115, 2, '2025-01-05'), (116, 2, '2025-01-06'), (117, 3, '2025-01-03'), (118, 3, '2025-01-04');",
    "starterSql": "-- 12. Meta: User Engagement Activity Tier Classification\n-- Output: username, post_count, activity_tier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT u.username, COUNT(p.id) AS post_count, CASE WHEN COUNT(p.id) >= 10 THEN 'Power User' WHEN COUNT(p.id) >= 4 THEN 'Regular User' ELSE 'Casual User' END AS activity_tier FROM users u JOIN posts p ON u.id = p.user_id GROUP BY u.id, u.username ORDER BY post_count DESC, u.username ASC;",
    "expectedColumns": [
      "username",
      "post_count",
      "activity_tier"
    ],
    "hints": [
      "Aggregate COUNT(p.id) inside GROUP BY, then wrap COUNT(p.id) inside CASE WHEN."
    ],
    "explanation": "CASE WHEN can inspect aggregate functions directly inside a GROUP BY query."
  },
  {
    "id": "basic-013",
    "number": 13,
    "title": "13. Uber: Late-Night Rides with High Passenger Ratings",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "EXTRACT",
      "WHERE",
      "OR"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "Date/Time Part Extraction",
    "description": "### Problem Statement\nUber Quality & Safety reviews late-night ride feedback. Find all trips starting between 23:00 and 04:59 (hour >= 23 or hour <= 4) with a passenger rating of 4.8 or higher.\n\n### Requirements\n- Filter `passenger_rating >= 4.8`.\n- Include only rows where the hour of `trip_time` is 23:00 or later, or 4:59 or earlier.\n- Output columns: `trip_id`, `driver_name`, `passenger_rating`, `trip_time`.\n- Sort by `passenger_rating` descending, then `trip_id` ascending.\n\n### Input Schema\n**uber_trips** (trip_id INT, driver_name VARCHAR, passenger_rating NUMERIC, trip_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE uber_trips (trip_id INT PRIMARY KEY, driver_name VARCHAR(50), passenger_rating NUMERIC, trip_time TIMESTAMP);\nINSERT INTO uber_trips VALUES (1, 'Hassan M.', 4.95, '2025-01-10 23:30:00'), (2, 'Maria G.', 4.85, '2025-01-11 02:15:00'), (3, 'John D.', 4.50, '2025-01-11 01:20:00'), (4, 'Elena R.', 4.90, '2025-01-11 14:00:00'), (5, 'Carlos B.', 4.80, '2025-01-11 03:45:00');",
    "starterSql": "-- 13. Uber: Late-Night Rides with High Passenger Ratings\n-- Output: trip_id, driver_name, passenger_rating, trip_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT trip_id, driver_name, passenger_rating, trip_time FROM uber_trips WHERE passenger_rating >= 4.8 AND (EXTRACT(HOUR FROM trip_time) >= 23 OR EXTRACT(HOUR FROM trip_time) <= 4) ORDER BY passenger_rating DESC, trip_id ASC;",
    "expectedColumns": [
      "trip_id",
      "driver_name",
      "passenger_rating",
      "trip_time"
    ],
    "hints": [
      "Wrap the two OR hour conditions inside parentheses before combining with AND."
    ],
    "explanation": "EXTRACT(HOUR FROM timestamp) isolates time-of-day shifts cleanly."
  },
  {
    "id": "basic-014",
    "number": 14,
    "title": "14. Notion: Team Workspace Page Creation Volume by Month",
    "difficulty": "Easy",
    "companies": [
      "Notion",
      "Slack"
    ],
    "topics": [
      "DATE_TRUNC",
      "COUNT",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Calendar Bucketing (DATE_TRUNC)",
    "description": "### Problem Statement\nNotion Product Analytics tracks document velocity. Count how many wiki pages were created during each calendar month of 2024.\n\n### Requirements\n- Filter for pages created in 2024 (`'2024-01-01'` through `'2024-12-31 23:59:59'`).\n- Truncate `created_at` to month by truncating `created_at` to the start of its month as `creation_month`.\n- Output columns: `creation_month`, `pages_created`.\n- Sort by `creation_month` ascending.\n\n### Input Schema\n**notion_pages** (id INT, title VARCHAR, created_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE notion_pages (id INT PRIMARY KEY, title VARCHAR(100), created_at TIMESTAMP);\nINSERT INTO notion_pages VALUES (1, 'Engineering Roadmap', '2024-01-10 14:00:00'), (2, 'Sprint 24 Plan', '2024-01-22 09:30:00'), (3, 'Design System Specs', '2024-02-05 11:15:00'), (4, 'Q1 Goals Review', '2024-02-28 16:45:00'), (5, 'Architecture RFC', '2024-03-12 10:00:00'), (6, 'Onboarding Guide', '2023-12-15 08:00:00');",
    "starterSql": "-- 14. Notion: Team Workspace Page Creation Volume by Month\n-- Output: creation_month, pages_created\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT DATE_TRUNC('month', created_at)::DATE AS creation_month, COUNT(id) AS pages_created FROM notion_pages WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31 23:59:59' GROUP BY DATE_TRUNC('month', created_at)::DATE ORDER BY creation_month ASC;",
    "expectedColumns": [
      "creation_month",
      "pages_created"
    ],
    "hints": [
      "Truncate timestamps with DATE_TRUNC('month', created_at)::DATE and group by that expression."
    ],
    "explanation": "DATE_TRUNC aligns timestamps to calendar boundaries (day, week, month, quarter) for time-series aggregation."
  },
  {
    "id": "basic-015",
    "number": 15,
    "title": "15. Atlassian: Jira Support Tickets Resolved Within 24-Hour SLA",
    "difficulty": "Easy",
    "companies": [
      "Atlassian",
      "Zendesk"
    ],
    "topics": [
      "Date Arithmetic",
      "INTERVAL",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval & Timestamp Deltas",
    "description": "### Problem Statement\nAtlassian IT Operations tracks critical incident SLAs. Count how many `'P1'` incidents with status `'Closed'` were resolved within 24 hours of creation.\n\n### Requirements\n- Filter for `priority = 'P1'`, `status = 'Closed'`, and where the time between `created_at` and `resolution_time` is at most 24 hours.\n- Output columns: `priority`, `p1_tickets_within_sla`.\n- Aggregate results per `priority`.\n\n### Input Schema\n**jira_tickets** (id INT, issue_key VARCHAR, priority VARCHAR, status VARCHAR, created_at TIMESTAMP, resolution_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE jira_tickets (id INT PRIMARY KEY, issue_key VARCHAR(20), priority VARCHAR(10), status VARCHAR(20), created_at TIMESTAMP, resolution_time TIMESTAMP);\nINSERT INTO jira_tickets VALUES (1, 'OPS-101', 'P1', 'Closed', '2025-01-02 08:00:00', '2025-01-02 14:30:00'), (2, 'OPS-102', 'P1', 'Closed', '2025-01-03 10:00:00', '2025-01-04 12:00:00'), (3, 'OPS-103', 'P1', 'Closed', '2025-01-04 09:00:00', '2025-01-05 06:00:00'), (4, 'OPS-104', 'P2', 'Closed', '2025-01-05 11:00:00', '2025-01-05 15:00:00'), (5, 'OPS-105', 'P1', 'Open', '2025-01-06 07:00:00', NULL);",
    "starterSql": "-- 15. Atlassian: Jira Support Tickets Resolved Within 24-Hour SLA\n-- Output: priority, p1_tickets_within_sla\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT priority, COUNT(id) AS p1_tickets_within_sla FROM jira_tickets WHERE priority = 'P1' AND status = 'Closed' AND resolution_time - created_at <= INTERVAL '24 hours' GROUP BY priority;",
    "expectedColumns": [
      "priority",
      "p1_tickets_within_sla"
    ],
    "hints": [
      "Subtract timestamps and compare against INTERVAL '24 hours'."
    ],
    "explanation": "Timestamp subtraction in PostgreSQL produces an INTERVAL value that compares directly with INTERVAL literals."
  },
  {
    "id": "basic-016",
    "number": 16,
    "title": "16. Robinhood: Total Buy vs Sell Trade Volume per Trader",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Coinbase"
    ],
    "topics": [
      "SUM",
      "CASE WHEN",
      "COALESCE",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Conditional Pivoting",
    "description": "### Problem Statement\nRobinhood Compliance tracks buy vs sell dollar volume per trader. Compute both totals side-by-side for each trader.\n\n### Requirements\n- Sum `amount` where `side = 'BUY'` as `total_buy_volume`, and where `side = 'SELL'` as `total_sell_volume`.\n- Default missing sides to `0.00` and round to 2 decimals.\n- Output columns: `user_name`, `total_buy_volume`, `total_sell_volume`.\n- Sort by `total_buy_volume` descending, then `user_name` ascending.\n\n### Input Schema\n**users** (id INT, name VARCHAR)\n\n**trades** (id INT, user_id INT, symbol VARCHAR, side VARCHAR, amount NUMERIC)",
    "schemaSql": "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE trades (id INT PRIMARY KEY, user_id INT, symbol VARCHAR(10), side VARCHAR(10), amount NUMERIC);\nINSERT INTO users VALUES (1, 'Warren B.'), (2, 'Cathie W.'), (3, 'Ray D.');\nINSERT INTO trades VALUES (101, 1, 'AAPL', 'BUY', 50000.00), (102, 1, 'KO', 'BUY', 25000.00), (103, 1, 'IBM', 'SELL', 12000.00), (104, 2, 'TSLA', 'BUY', 80000.00), (105, 2, 'COIN', 'SELL', 95000.00), (106, 3, 'GLD', 'SELL', 40000.00);",
    "starterSql": "-- 16. Robinhood: Total Buy vs Sell Trade Volume per Trader\n-- Output: user_name, total_buy_volume, total_sell_volume\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT u.name AS user_name, ROUND(COALESCE(SUM(CASE WHEN t.side = 'BUY' THEN t.amount END), 0), 2) AS total_buy_volume, ROUND(COALESCE(SUM(CASE WHEN t.side = 'SELL' THEN t.amount END), 0), 2) AS total_sell_volume FROM users u JOIN trades t ON u.id = t.user_id GROUP BY u.id, u.name ORDER BY total_buy_volume DESC, user_name ASC;",
    "expectedColumns": [
      "user_name",
      "total_buy_volume",
      "total_sell_volume"
    ],
    "hints": [
      "Wrap SUM(CASE WHEN t.side = 'BUY' THEN t.amount END) inside COALESCE(..., 0)."
    ],
    "explanation": "Conditional aggregation pivots row-level categories into clean columnar summary metrics."
  },
  {
    "id": "basic-017",
    "number": 17,
    "title": "17. Slack: Workspace Member Invitation Acceptance Rate",
    "difficulty": "Easy",
    "companies": [
      "Slack",
      "Microsoft"
    ],
    "topics": [
      "ROUND",
      "SUM",
      "CASE WHEN",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Applied",
    "patternTag": "Conversion Rate with CASE",
    "description": "### Problem Statement\nSlack Growth Analytics evaluates viral workspace invitations. Calculate the invite acceptance percentage for each enterprise workspace.\n\n### Requirements\n- Count total invites (`total_invites`) and accepted invites (`accepted_invites`) per workspace.\n- Calculate `acceptance_rate` as `accepted_invites * 100.0 / total_invites`, rounded to 2 decimal places.\n- Output columns: `workspace_name`, `total_invites`, `accepted_invites`, `acceptance_rate`.\n- Sort by `acceptance_rate` descending, then `workspace_name` ascending.\n\n### Input Schema\n**workspaces** (id INT, name VARCHAR)\n\n**invitations** (id INT, workspace_id INT, invitee_email VARCHAR, status VARCHAR)",
    "schemaSql": "CREATE TABLE workspaces (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE invitations (id INT PRIMARY KEY, workspace_id INT, invitee_email VARCHAR(50), status VARCHAR(20));\nINSERT INTO workspaces VALUES (1, 'Acme Corp'), (2, 'TechFlow'), (3, 'Nexus Labs');\nINSERT INTO invitations VALUES (101, 1, 'a@acme.com', 'accepted'), (102, 1, 'b@acme.com', 'accepted'), (103, 1, 'c@acme.com', 'pending'), (104, 1, 'd@acme.com', 'declined'), (105, 2, 'e@techflow.io', 'accepted'), (106, 2, 'f@techflow.io', 'accepted'), (107, 3, 'g@nexus.org', 'pending');",
    "starterSql": "-- 17. Slack: Workspace Member Invitation Acceptance Rate\n-- Output: workspace_name, total_invites, accepted_invites, acceptance_rate\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT w.name AS workspace_name, COUNT(i.id) AS total_invites, SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) AS accepted_invites, ROUND(SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) * 100.0 / COUNT(i.id), 2) AS acceptance_rate FROM workspaces w JOIN invitations i ON w.id = i.workspace_id GROUP BY w.id, w.name ORDER BY acceptance_rate DESC, workspace_name ASC;",
    "expectedColumns": [
      "workspace_name",
      "total_invites",
      "accepted_invites",
      "acceptance_rate"
    ],
    "hints": [
      "Use SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) and multiply numerator by 100.0."
    ],
    "explanation": "Multiplying by 100.0 avoids integer division truncation while computing conversion rates."
  },
  {
    "id": "basic-018",
    "number": 18,
    "title": "18. Box: Aging Archived Files by Quarter and Retention Window",
    "difficulty": "Easy",
    "companies": [
      "Box",
      "Dropbox"
    ],
    "topics": [
      "DATE_TRUNC",
      "CASE WHEN",
      "Date Arithmetic"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 2: Conditional Logic & Dates",
    "stageOrder": 2,
    "rampStep": "Applied",
    "patternTag": "Date Bucketing & Classification",
    "description": "### Problem Statement\nBox Governance classifies archived enterprise files before a 2025-01-01 purge audit. Label files uploaded before `'2022-01-01'` as `'Purge Eligible'` and newer archived files as `'Retain'`, counting files per quarter of upload.\n\n### Requirements\n- Filter for `is_archived = TRUE`.\n- Truncate `upload_date` to quarter as `upload_quarter` (truncated to the start of each quarter).\n- Tag `retention_action` as `'Purge Eligible'` if `upload_date < '2022-01-01'` else `'Retain'`.\n- Output columns: `upload_quarter`, `retention_action`, `file_count`.\n- Sort by `upload_quarter` ascending, `retention_action` ascending.\n\n### Input Schema\n**enterprise_files** (file_id INT, file_name VARCHAR, is_archived BOOLEAN, upload_date DATE)",
    "schemaSql": "CREATE TABLE enterprise_files (file_id INT PRIMARY KEY, file_name VARCHAR(100), is_archived BOOLEAN, upload_date DATE);\nINSERT INTO enterprise_files VALUES (1, 'audit_2020.pdf', TRUE, '2020-05-12'), (2, 'tax_2021.zip', TRUE, '2021-11-20'), (3, 'q4_2021.csv', TRUE, '2021-10-05'), (4, 'board_2023.pptx', TRUE, '2023-04-10'), (5, 'handbook.pdf', FALSE, '2021-08-15');",
    "starterSql": "-- 18. Box: Aging Archived Files by Quarter and Retention Window\n-- Output: upload_quarter, retention_action, file_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT DATE_TRUNC('quarter', upload_date)::DATE AS upload_quarter, CASE WHEN upload_date < '2022-01-01' THEN 'Purge Eligible' ELSE 'Retain' END AS retention_action, COUNT(file_id) AS file_count FROM enterprise_files WHERE is_archived = TRUE GROUP BY upload_quarter, retention_action ORDER BY upload_quarter ASC, retention_action ASC;",
    "expectedColumns": [
      "upload_quarter",
      "retention_action",
      "file_count"
    ],
    "hints": [
      "In PostgreSQL, GROUP BY can reference output column aliases created in SELECT."
    ],
    "explanation": "Combining DATE_TRUNC('quarter', ...) with CASE WHEN buckets lifecycle policies cleanly."
  },
  {
    "id": "basic-019",
    "number": 19,
    "title": "19. Amazon: Net Customer Spend with Dirty Status & NULL Refunds",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "topics": [
      "TRIM",
      "LOWER",
      "COALESCE",
      "GROUP BY",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Warm-up",
    "patternTag": "Dirty Hygiene + Aggregation",
    "description": "### Problem Statement\nAmazon Finance needs to audit net revenue generated by active customer accounts. Account `status` contains irregular whitespace and mixed casing (e.g., `' ACTIVE '`, `'active'`, `NULL`), and unrefunded orders store `NULL` in `refund_amount`.\n\n### Requirements\n- An account is active if `LOWER(TRIM((a.status, defaulting to '' if missing))) = 'active'`.\n- Treat `NULL` `refund_amount` as `0`.\n- Compute `total_net_spent` as `ROUND(SUM(o.amount - (o.refund_amount, defaulting to 0 if missing)), 2)`.\n- Output columns: `customer_name`, `total_net_spent`.\n- Sort by `total_net_spent` descending, then `customer_name` ascending.\n\n### Input Schema\n**accounts** (id INT, name VARCHAR, status VARCHAR, country VARCHAR)\n\n**orders** (id INT, customer_id INT, amount NUMERIC, refund_amount NUMERIC, order_date DATE)",
    "schemaSql": "CREATE TABLE accounts (id INT PRIMARY KEY, name VARCHAR(50), status VARCHAR(50), country VARCHAR(50));\nCREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount NUMERIC, refund_amount NUMERIC, order_date DATE);\nINSERT INTO accounts VALUES (1, 'Alice Smith', ' ACTIVE ', 'USA'), (2, 'Bob Jones', 'active', 'Canada'), (3, 'Charlie Dave', 'inactive', 'USA'), (4, 'Diana Vance', NULL, 'UK'), (5, 'Evan Wright', 'ACTIVE', 'USA');\nINSERT INTO orders VALUES (101, 1, 150.00, NULL, '2025-01-15'), (102, 1, 80.50, 10.00, '2025-01-18'), (103, 2, 220.00, NULL, '2025-02-01'), (104, 3, 45.00, 45.00, '2025-02-05'), (105, 5, 310.00, 25.00, '2025-02-10');",
    "starterSql": "-- 19. Amazon: Net Customer Spend with Dirty Status & NULL Refunds\n-- Output: customer_name, total_net_spent\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT a.name AS customer_name, ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent FROM accounts a JOIN orders o ON a.id = o.customer_id WHERE LOWER(TRIM(COALESCE(a.status, ''))) = 'active' GROUP BY a.id, a.name ORDER BY total_net_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "total_net_spent"
    ],
    "hints": [
      "Normalize status with LOWER(TRIM(...)).",
      "Group by a.id, a.name to distinguish customers safely."
    ],
    "explanation": "Always group by the primary key alongside display names to avoid merging distinct customers with identical names."
  },
  {
    "id": "basic-020",
    "number": 20,
    "title": "20. DoorDash: Average Delivery Fee & Order Value by Cuisine",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Uber"
    ],
    "topics": [
      "AVG",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Warm-up",
    "patternTag": "Multi-Metric Grouping",
    "description": "### Problem Statement\nDoorDash Merchant Analytics compares order economics across cuisines. Compute average order total and average delivery fee per cuisine.\n\n### Requirements\n- Round `avg_order_total` and `avg_delivery_fee` to 2 decimal places.\n- Include only cuisines with at least one order.\n- Output columns: `cuisine`, `avg_order_total`, `avg_delivery_fee`.\n- Sort by `avg_order_total` descending, then `cuisine` ascending.\n\n### Input Schema\n**restaurants** (id INT, name VARCHAR, cuisine VARCHAR)\n\n**orders** (id INT, restaurant_id INT, order_total NUMERIC, delivery_fee NUMERIC)",
    "schemaSql": "CREATE TABLE restaurants (id INT PRIMARY KEY, name VARCHAR(100), cuisine VARCHAR(50));\nCREATE TABLE orders (id INT PRIMARY KEY, restaurant_id INT, order_total NUMERIC, delivery_fee NUMERIC);\nINSERT INTO restaurants VALUES (1, 'Taco Fiesta', 'Mexican'), (2, 'Dragon Wok', 'Chinese'), (3, 'Pasta Bella', 'Italian'), (4, 'Tokyo Sushi', 'Japanese');\nINSERT INTO orders VALUES (101, 1, 35.50, 3.99), (102, 1, 42.00, 2.99), (103, 2, 28.00, 4.50), (104, 3, 65.00, 1.99), (105, 3, 72.50, 2.50), (106, 4, 88.00, 5.00);",
    "starterSql": "-- 20. DoorDash: Average Delivery Fee & Order Value by Cuisine\n-- Output: cuisine, avg_order_total, avg_delivery_fee\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT r.cuisine, ROUND(AVG(o.order_total), 2) AS avg_order_total, ROUND(AVG(o.delivery_fee), 2) AS avg_delivery_fee FROM restaurants r JOIN orders o ON r.id = o.restaurant_id GROUP BY r.cuisine ORDER BY avg_order_total DESC, r.cuisine ASC;",
    "expectedColumns": [
      "cuisine",
      "avg_order_total",
      "avg_delivery_fee"
    ],
    "hints": [
      "Join restaurants and orders, then GROUP BY r.cuisine."
    ],
    "explanation": "Computing multiple aggregates in one GROUP BY pass avoids scanning tables multiple times."
  },
  {
    "id": "basic-021",
    "number": 21,
    "title": "21. Datadog: Comparing COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)",
    "difficulty": "Easy",
    "companies": [
      "Datadog",
      "Snowflake"
    ],
    "topics": [
      "COUNT",
      "COUNT DISTINCT",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Warm-up",
    "patternTag": "Counting Semantics",
    "description": "### Problem Statement\nDatadog Alert Telemetry needs to understand event volume vs resolved incidents vs distinct affected hosts per service.\n\n### Requirements\n- For each `service_name`:\n - `total_events` = `COUNT(*)`\n - `resolved_events` = `COUNT(resolved_at)` (excludes NULLs)\n - `unique_hosts` = `COUNT(DISTINCT host_id)`\n- Output columns: `service_name`, `total_events`, `resolved_events`, `unique_hosts`.\n- Sort by `total_events` descending, `service_name` ascending.\n\n### Input Schema\n**alerts** (id INT, service_name VARCHAR, host_id VARCHAR, resolved_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE alerts (id INT PRIMARY KEY, service_name VARCHAR(40), host_id VARCHAR(20), resolved_at TIMESTAMP);\nINSERT INTO alerts VALUES (1, 'auth-api', 'h-1', '2025-01-01 10:15:00'), (2, 'auth-api', 'h-1', NULL), (3, 'auth-api', 'h-2', '2025-01-01 11:00:00'), (4, 'billing', 'h-3', NULL), (5, 'billing', 'h-3', NULL);",
    "starterSql": "-- 21. Datadog: Comparing COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)\n-- Output: service_name, total_events, resolved_events, unique_hosts\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT service_name, COUNT(*) AS total_events, COUNT(resolved_at) AS resolved_events, COUNT(DISTINCT host_id) AS unique_hosts FROM alerts GROUP BY service_name ORDER BY total_events DESC, service_name ASC;",
    "expectedColumns": [
      "service_name",
      "total_events",
      "resolved_events",
      "unique_hosts"
    ],
    "hints": [
      "COUNT(*) counts all rows; COUNT(col) skips NULLs; COUNT(DISTINCT col) skips duplicates and NULLs."
    ],
    "explanation": "Knowing the exact difference between COUNT(*), COUNT(col), and COUNT(DISTINCT col) prevents subtle off-by-NULL bugs."
  },
  {
    "id": "basic-022",
    "number": 22,
    "title": "22. Spotify: Podcasts with Multiple Episodes in 2024 (HAVING)",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "topics": [
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING",
      "BETWEEN"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "WHERE + HAVING Separation",
    "description": "### Problem Statement\nSpotify's Creator Operations team wants to highlight active podcasts that released at least 2 distinct episodes in 2024.\n\n### Requirements\n- Filter episodes released between `'2024-01-01'` and `'2024-12-31'` inclusive.\n- Count distinct episode IDs per show and keep shows with `>= 2` episodes.\n- Output columns: `show_title`, `episode_count`.\n- Sort by `episode_count` descending, then `show_title` ascending.\n\n### Input Schema\n**podcasts** (id INT, title VARCHAR, host_name VARCHAR)\n\n**episodes** (id INT, podcast_id INT, title VARCHAR, release_date DATE)",
    "schemaSql": "CREATE TABLE podcasts (id INT PRIMARY KEY, title VARCHAR(100), host_name VARCHAR(100));\nCREATE TABLE episodes (id INT PRIMARY KEY, podcast_id INT, title VARCHAR(100), release_date DATE);\nINSERT INTO podcasts VALUES (1, 'The Daily Byte', 'Alex Chen'), (2, 'Design Talks', 'Sarah Lee'), (3, 'Indie Beats', 'Marcus Cole'), (4, 'Tech Horizon', 'Elena Rostova');\nINSERT INTO episodes VALUES (101, 1, 'Episode 1', '2024-02-10'), (102, 1, 'Episode 2', '2024-03-15'), (103, 1, 'Episode 3', '2024-05-20'), (104, 2, 'Episode 10', '2024-04-01'), (105, 3, 'Special', '2023-11-20'), (106, 4, 'Future of AI', '2024-01-12'), (107, 4, 'Cloud Native', '2024-08-19');",
    "starterSql": "-- 22. Spotify: Podcasts with Multiple Episodes in 2024 (HAVING)\n-- Output: show_title, episode_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT p.title AS show_title, COUNT(DISTINCT e.id) AS episode_count FROM podcasts p JOIN episodes e ON p.id = e.podcast_id WHERE e.release_date BETWEEN '2024-01-01' AND '2024-12-31' GROUP BY p.id, p.title HAVING COUNT(DISTINCT e.id) >= 2 ORDER BY episode_count DESC, show_title ASC;",
    "expectedColumns": [
      "show_title",
      "episode_count"
    ],
    "hints": [
      "Filter dates in WHERE before grouping; filter episode counts in HAVING after grouping."
    ],
    "explanation": "WHERE filters raw rows before aggregation; HAVING filters summary groups after aggregation."
  },
  {
    "id": "basic-023",
    "number": 23,
    "title": "23. YouTube: Video Click-Through Rate (CTR) by Device Type",
    "difficulty": "Easy",
    "companies": [
      "YouTube",
      "Google"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "NULLIF",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "Ratio of Sums (Not Avg of Ratios)",
    "description": "### Problem Statement\nYouTube Ad Monetization measures thumbnail CTR across device platforms. Compute aggregate CTR properly by summing clicks and impressions first.\n\n### Requirements\n- Sum `impressions` as `total_impressions` and `clicks` as `total_clicks` per `device_type`.\n- Compute `ctr_percentage` as `ROUND(SUM(clicks) * 100.0 / NULLIF(SUM(impressions), 0), 2)`.\n- Output columns: `device_type`, `total_impressions`, `total_clicks`, `ctr_percentage`.\n- Sort by `ctr_percentage` descending, then `device_type` ascending.\n\n### Input Schema\n**video_impressions** (id INT, device_type VARCHAR, impressions INT, clicks INT)",
    "schemaSql": "CREATE TABLE video_impressions (id INT PRIMARY KEY, device_type VARCHAR(50), impressions INT, clicks INT);\nINSERT INTO video_impressions VALUES (1, 'Mobile', 50000, 2500), (2, 'Desktop', 35000, 2100), (3, 'Tablet', 12000, 480), (4, 'Smart TV', 28000, 560), (5, 'Mobile', 45000, 2400), (6, 'Desktop', 25000, 1750);",
    "starterSql": "-- 23. YouTube: Video Click-Through Rate (CTR) by Device Type\n-- Output: device_type, total_impressions, total_clicks, ctr_percentage\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT device_type, SUM(impressions) AS total_impressions, SUM(clicks) AS total_clicks, ROUND(SUM(clicks) * 100.0 / NULLIF(SUM(impressions), 0), 2) AS ctr_percentage FROM video_impressions GROUP BY device_type ORDER BY ctr_percentage DESC, device_type ASC;",
    "expectedColumns": [
      "device_type",
      "total_impressions",
      "total_clicks",
      "ctr_percentage"
    ],
    "hints": [
      "Never take AVG(clicks / impressions)—always divide SUM(clicks) by SUM(impressions)."
    ],
    "explanation": "Taking SUM(numerator) / SUM(denominator) preserves exact volume-weighted conversion rates."
  },
  {
    "id": "basic-024",
    "number": 24,
    "title": "24. Yelp: High-Rated Businesses with Minimum Review Volume",
    "difficulty": "Easy",
    "companies": [
      "Yelp",
      "Google"
    ],
    "topics": [
      "COUNT",
      "AVG",
      "ROUND",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "Multi-Condition HAVING",
    "description": "### Problem Statement\nYelp Elite Squad highlights local gems that have both high volume and high ratings.\n\n### Requirements\n- Aggregate results per `business_name`.\n- Keep only businesses with `COUNT(id) >= 3` AND `AVG(stars) >= 4.50`.\n- Output columns: `business_name`, `review_count`, `avg_rating` (rounded to 2 decimals).\n- Sort by `avg_rating` descending, `review_count` descending, `business_name` ascending.\n\n### Input Schema\n**yelp_reviews** (id INT, business_name VARCHAR, stars NUMERIC)",
    "schemaSql": "CREATE TABLE yelp_reviews (id INT PRIMARY KEY, business_name VARCHAR(100), stars NUMERIC);\nINSERT INTO yelp_reviews VALUES (1, 'Artisan Sourdough Bakery', 5.0), (2, 'Artisan Sourdough Bakery', 4.5), (3, 'Artisan Sourdough Bakery', 4.8), (4, 'Golden Wok Express', 4.0), (5, 'Golden Wok Express', 4.5), (6, 'Golden Wok Express', 4.2), (7, 'Little Italy Trattoria', 5.0), (8, 'Little Italy Trattoria', 4.8), (9, 'Little Italy Trattoria', 4.9);",
    "starterSql": "-- 24. Yelp: High-Rated Businesses with Minimum Review Volume\n-- Output: business_name, review_count, avg_rating\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT business_name, COUNT(id) AS review_count, ROUND(AVG(stars), 2) AS avg_rating FROM yelp_reviews GROUP BY business_name HAVING COUNT(id) >= 3 AND AVG(stars) >= 4.50 ORDER BY avg_rating DESC, review_count DESC, business_name ASC;",
    "expectedColumns": [
      "business_name",
      "review_count",
      "avg_rating"
    ],
    "hints": [
      "Combine two aggregate thresholds inside HAVING using AND."
    ],
    "explanation": "Multi-condition HAVING filters guarantee sample-size credibility alongside quality metrics."
  },
  {
    "id": "basic-025",
    "number": 25,
    "title": "25. Apple: App Store Gross Revenue by Developer Country",
    "difficulty": "Easy",
    "companies": [
      "Apple",
      "Google"
    ],
    "topics": [
      "SUM",
      "ROUND",
      "INNER JOIN",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "Weighted Summation",
    "description": "### Problem Statement\nApple App Store Finance evaluates global developer earnings by aggregating unit price multiplied by downloads across developer countries.\n\n### Requirements\n- Compute `gross_revenue` as `ROUND(SUM(a.price * a.downloads), 2)` per developer `country`.\n- Output columns: `country`, `gross_revenue`.\n- Sort by `gross_revenue` descending, then `country` ascending.\n\n### Input Schema\n**developers** (id INT, name VARCHAR, country VARCHAR)\n\n**apps** (id INT, developer_id INT, app_name VARCHAR, price NUMERIC, downloads INT)",
    "schemaSql": "CREATE TABLE developers (id INT PRIMARY KEY, name VARCHAR(100), country VARCHAR(50));\nCREATE TABLE apps (id INT PRIMARY KEY, developer_id INT, app_name VARCHAR(100), price NUMERIC, downloads INT);\nINSERT INTO developers VALUES (1, 'Supercell', 'Finland'), (2, 'Rovio', 'Finland'), (3, 'Epic Games', 'USA'), (4, 'King', 'Sweden'), (5, 'Ubisoft', 'France');\nINSERT INTO apps VALUES (101, 1, 'Clash Royale', 0.99, 50000), (102, 1, 'Brawl Stars', 1.99, 20000), (103, 2, 'Angry Birds', 0.99, 15000), (104, 3, 'Fortnite Mobile', 4.99, 40000), (105, 4, 'Candy Crush', 1.49, 60000), (106, 5, 'Rayman Run', 2.99, 10000);",
    "starterSql": "-- 25. Apple: App Store Gross Revenue by Developer Country\n-- Output: country, gross_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT d.country, ROUND(SUM(a.price * a.downloads), 2) AS gross_revenue FROM developers d JOIN apps a ON d.id = a.developer_id GROUP BY d.country ORDER BY gross_revenue DESC, d.country ASC;",
    "expectedColumns": [
      "country",
      "gross_revenue"
    ],
    "hints": [
      "Multiply price * downloads inside SUM()—not SUM(price) * SUM(downloads)."
    ],
    "explanation": "Row-level multiplication inside SUM() calculates exact weighted revenue."
  },
  {
    "id": "basic-026",
    "number": 26,
    "title": "26. Instacart: High-Frequency Reordered Grocery Staples",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "DoorDash"
    ],
    "topics": [
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "Pre-Filter + Group Filter",
    "description": "### Problem Statement\nInstacart Merchandising tracks repeat purchase loyalty. Identify grocery products reordered 3 or more times.\n\n### Requirements\n- Count rows where `oi.is_reorder = TRUE` for each product.\n- Filter to products with `COUNT(oi.id) >= 3`.\n- Output columns: `product_name`, `department`, `reorder_count`.\n- Sort by `reorder_count` descending, `product_name` ascending.\n\n### Input Schema\n**products** (id INT, name VARCHAR, department VARCHAR)\n\n**order_items** (id INT, order_id INT, product_id INT, is_reorder BOOLEAN)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100), department VARCHAR(50));\nCREATE TABLE order_items (id INT PRIMARY KEY, order_id INT, product_id INT, is_reorder BOOLEAN);\nINSERT INTO products VALUES (1, 'Organic Whole Milk', 'Dairy'), (2, 'Avocados Bag', 'Produce'), (3, 'Sourdough Bread', 'Bakery'), (4, 'Greek Yogurt', 'Dairy');\nINSERT INTO order_items VALUES (101, 1, 1, TRUE), (102, 2, 1, TRUE), (103, 3, 1, TRUE), (104, 4, 1, FALSE), (105, 1, 2, TRUE), (106, 2, 2, TRUE), (107, 3, 2, TRUE), (108, 4, 2, TRUE), (109, 1, 3, TRUE), (110, 2, 4, TRUE), (111, 3, 4, TRUE);",
    "starterSql": "-- 26. Instacart: High-Frequency Reordered Grocery Staples\n-- Output: product_name, department, reorder_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT p.name AS product_name, p.department, COUNT(oi.id) AS reorder_count FROM products p JOIN order_items oi ON p.id = oi.product_id WHERE oi.is_reorder = TRUE GROUP BY p.id, p.name, p.department HAVING COUNT(oi.id) >= 3 ORDER BY reorder_count DESC, product_name ASC;",
    "expectedColumns": [
      "product_name",
      "department",
      "reorder_count"
    ],
    "hints": [
      "Filter oi.is_reorder = TRUE in WHERE before grouping by product."
    ],
    "explanation": "Include all non-aggregated SELECT columns (p.id, p.name, p.department) in GROUP BY."
  },
  {
    "id": "basic-027",
    "number": 27,
    "title": "27. Brex: Corporate Expense Breakdown by Department & Quarter",
    "difficulty": "Easy",
    "companies": [
      "Brex",
      "Ramp"
    ],
    "topics": [
      "GROUP BY",
      "DATE_TRUNC",
      "SUM",
      "MIN",
      "MAX"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Multi-Dimensional Grouping",
    "description": "### Problem Statement\nBrex Finance requires a multi-dimensional spend summary broken down by department and quarter, tracking both total spend and peak single transaction.\n\n### Requirements\n- Exclude declined transactions (`status <> 'declined'`).\n- Aggregate per `department` and `spend_quarter` (truncated to the start of each quarter).\n- Output columns: `department`, `spend_quarter`, `total_spend`, `max_charge`.\n- Sort by `spend_quarter` ascending, `total_spend` descending, `department` ascending.\n\n### Input Schema\n**card_expenses** (id INT, department VARCHAR, amount NUMERIC, status VARCHAR, txn_date DATE)",
    "schemaSql": "CREATE TABLE card_expenses (id INT PRIMARY KEY, department VARCHAR(40), amount NUMERIC, status VARCHAR(20), txn_date DATE);\nINSERT INTO card_expenses VALUES (1, 'Engineering', 1200.00, 'settled', '2025-01-15'), (2, 'Engineering', 450.00, 'settled', '2025-02-10'), (3, 'Sales', 800.00, 'settled', '2025-01-20'), (4, 'Sales', 5000.00, 'declined', '2025-01-25'), (5, 'Engineering', 3100.00, 'settled', '2025-04-04');",
    "starterSql": "-- 27. Brex: Corporate Expense Breakdown by Department & Quarter\n-- Output: department, spend_quarter, total_spend, max_charge\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT department, DATE_TRUNC('quarter', txn_date)::DATE AS spend_quarter, ROUND(SUM(amount), 2) AS total_spend, MAX(amount) AS max_charge FROM card_expenses WHERE status <> 'declined' GROUP BY department, DATE_TRUNC('quarter', txn_date)::DATE ORDER BY spend_quarter ASC, total_spend DESC, department ASC;",
    "expectedColumns": [
      "department",
      "spend_quarter",
      "total_spend",
      "max_charge"
    ],
    "hints": [
      "Filter status <> 'declined' in WHERE and group by both department and truncated quarter."
    ],
    "explanation": "Multi-column GROUP BY produces one summary row per unique (department, quarter) combination."
  },
  {
    "id": "basic-028",
    "number": 28,
    "title": "28. FedEx: Hub SLA Compliance Rate & Volume Threshold",
    "difficulty": "Easy",
    "companies": [
      "FedEx",
      "UPS"
    ],
    "topics": [
      "SUM",
      "CASE WHEN",
      "HAVING",
      "ROUND",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 3: Aggregations & Grouping",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Conditional Aggregation + HAVING",
    "description": "### Problem Statement\nFedEx Operations evaluates hub on-time performance for major sorting hubs (at least 3 shipments).\n\n### Requirements\n- Calculate `total_shipments` and `sla_rate_pct` (% of shipments where `delivered_on_time = TRUE`, rounded to 2 decimals).\n- Keep only hubs with at least 3 total shipments.\n- Output columns: `hub_code`, `total_shipments`, `sla_rate_pct`.\n- Sort by `sla_rate_pct` descending, `hub_code` ascending.\n\n### Input Schema\n**shipments** (id INT, hub_code VARCHAR, delivered_on_time BOOLEAN)",
    "schemaSql": "CREATE TABLE shipments (id INT PRIMARY KEY, hub_code VARCHAR(10), delivered_on_time BOOLEAN);\nINSERT INTO shipments VALUES (1, 'MEM', TRUE), (2, 'MEM', TRUE), (3, 'MEM', FALSE), (4, 'IND', TRUE), (5, 'IND', TRUE), (6, 'IND', TRUE), (7, 'EWR', FALSE), (8, 'EWR', TRUE);",
    "starterSql": "-- 28. FedEx: Hub SLA Compliance Rate & Volume Threshold\n-- Output: hub_code, total_shipments, sla_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT hub_code, COUNT(id) AS total_shipments, ROUND(SUM(CASE WHEN delivered_on_time THEN 1 ELSE 0 END) * 100.0 / COUNT(id), 2) AS sla_rate_pct FROM shipments GROUP BY hub_code HAVING COUNT(id) >= 3 ORDER BY sla_rate_pct DESC, hub_code ASC;",
    "expectedColumns": [
      "hub_code",
      "total_shipments",
      "sla_rate_pct"
    ],
    "hints": [
      "Use COUNT(id) >= 3 in HAVING to exclude small hubs like EWR."
    ],
    "explanation": "Combining conditional aggregation with HAVING prevents low-sample hubs from skewing rankings."
  },
  {
    "id": "basic-029",
    "number": 29,
    "title": "29. Stripe: High-Risk International Transactions Above $500",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "topics": [
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Warm-up",
    "patternTag": "Two-Table INNER JOIN",
    "description": "### Problem Statement\nStripe Risk Engineering audits cross-border transactions. Identify all settled international transactions strictly above $500 along with their merchant name.\n\n### Requirements\n- Join `transactions` to `merchants` on `merchant_id = m.id`.\n- Filter `t.amount > 500`, `t.is_international = TRUE`, and `t.status = 'settled'`.\n- Output columns: `transaction_id`, `merchant_name`, `amount`, `currency`.\n- Sort by `amount` descending, `transaction_id` ascending.\n\n### Input Schema\n**merchants** (id INT, name VARCHAR)\n\n**transactions** (id INT, merchant_id INT, amount NUMERIC, currency VARCHAR, is_international BOOLEAN, status VARCHAR)",
    "schemaSql": "CREATE TABLE merchants (id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE transactions (id INT PRIMARY KEY, merchant_id INT, amount NUMERIC, currency VARCHAR(10), is_international BOOLEAN, status VARCHAR(20));\nINSERT INTO merchants VALUES (1, 'Acme SaaS'), (2, 'Globex Retail'), (3, 'Starlight Media');\nINSERT INTO transactions VALUES (101, 1, 750.00, 'USD', TRUE, 'settled'), (102, 1, 450.00, 'EUR', TRUE, 'settled'), (103, 2, 1200.00, 'USD', FALSE, 'settled'), (104, 2, 890.50, 'GBP', TRUE, 'settled'), (105, 3, 620.00, 'USD', TRUE, 'refunded'), (106, 3, 910.00, 'EUR', TRUE, 'settled');",
    "starterSql": "-- 29. Stripe: High-Risk International Transactions Above $500\n-- Output: transaction_id, merchant_name, amount, currency\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT t.id AS transaction_id, m.name AS merchant_name, t.amount, t.currency FROM transactions t JOIN merchants m ON t.merchant_id = m.id WHERE t.amount > 500 AND t.is_international = TRUE AND t.status = 'settled' ORDER BY t.amount DESC, transaction_id ASC;",
    "expectedColumns": [
      "transaction_id",
      "merchant_name",
      "amount",
      "currency"
    ],
    "hints": [
      "Use table aliases t and m to keep column references unambiguous."
    ],
    "explanation": "INNER JOIN enriches transactional records with dimension attributes like merchant name."
  },
  {
    "id": "basic-030",
    "number": 30,
    "title": "30. Discord: Active Server Channels with High Traffic (3-Table Join)",
    "difficulty": "Easy",
    "companies": [
      "Discord",
      "Slack"
    ],
    "topics": [
      "INNER JOIN",
      "Multi-Table Join",
      "HAVING"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "3-Table Relational Chain",
    "description": "### Problem Statement\nDiscord Community Health monitors channel activity. Find channels inside the `'Gaming Lounge'` server that received strictly more than 3 messages.\n\n### Requirements\n- Join `servers`, `channels`, and `messages`.\n- Filter for `s.name = 'Gaming Lounge'`.\n- Keep channels with `COUNT(m.id) > 3`.\n- Output columns: `channel_name`, `message_count`.\n- Sort by `message_count` descending, `channel_name` ascending.\n\n### Input Schema\n**servers** (id INT, name VARCHAR)\n\n**channels** (id INT, server_id INT, name VARCHAR)\n\n**messages** (id INT, channel_id INT, sender_id INT, sent_at TIMESTAMP)",
    "schemaSql": "CREATE TABLE servers (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE channels (id INT PRIMARY KEY, server_id INT, name VARCHAR(50));\nCREATE TABLE messages (id INT PRIMARY KEY, channel_id INT, sender_id INT, sent_at TIMESTAMP);\nINSERT INTO servers VALUES (1, 'Gaming Lounge'), (2, 'Study Hall');\nINSERT INTO channels VALUES (10, 1, 'general'), (11, 1, 'announcements'), (12, 1, 'memes'), (13, 2, 'homework');\nINSERT INTO messages VALUES (101, 10, 1, '2025-01-01 10:00:00'), (102, 10, 2, '2025-01-01 10:01:00'), (103, 10, 3, '2025-01-01 10:02:00'), (104, 10, 4, '2025-01-01 10:03:00'), (105, 11, 1, '2025-01-01 09:00:00'), (106, 12, 2, '2025-01-01 11:00:00'), (107, 12, 3, '2025-01-01 11:05:00'), (108, 12, 4, '2025-01-01 11:10:00'), (109, 12, 5, '2025-01-01 11:15:00');",
    "starterSql": "-- 30. Discord: Active Server Channels with High Traffic (3-Table Join)\n-- Output: channel_name, message_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT c.name AS channel_name, COUNT(m.id) AS message_count FROM servers s JOIN channels c ON s.id = c.server_id JOIN messages m ON c.id = m.channel_id WHERE s.name = 'Gaming Lounge' GROUP BY c.id, c.name HAVING COUNT(m.id) > 3 ORDER BY message_count DESC, channel_name ASC;",
    "expectedColumns": [
      "channel_name",
      "message_count"
    ],
    "hints": [
      "Chain servers -> channels -> messages via their foreign keys."
    ],
    "explanation": "Chaining JOINs lets you filter by grandparent attributes (server name) while aggregating grandchild events (messages)."
  },
  {
    "id": "basic-031",
    "number": 31,
    "title": "31. Shopify: Preserving Zero-Order Customers with LEFT JOIN",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Amazon"
    ],
    "topics": [
      "LEFT JOIN",
      "COUNT",
      "COALESCE",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Warm-up",
    "patternTag": "LEFT JOIN Zero Preservation",
    "description": "### Problem Statement\nShopify CRM needs total order count and spend for **every** registered customer—including those who have never placed an order (who should appear with `0` orders and `0.00` spend).\n\n### Requirements\n- Use including unmatched rows from the primary table from `customers` to `orders`.\n- Notice: `COUNT(o.id)` returns `0` for unmatched rows (unlike `COUNT(*)` which would return `1`!).\n- Wrap `SUM(o.total_amount)` in `...` (treating missing values as `0.00`).\n- Output columns: `customer_name`, `order_count`, `total_spent`.\n- Sort by `total_spent` descending, `customer_name` ascending.\n\n### Input Schema\n**customers** (id INT, name VARCHAR)\n\n**orders** (id INT, customer_id INT, total_amount NUMERIC)",
    "schemaSql": "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, total_amount NUMERIC);\nINSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Clara');\nINSERT INTO orders VALUES (101, 1, 120.00), (102, 1, 80.00), (103, 3, 45.00);",
    "starterSql": "-- 31. Shopify: Preserving Zero-Order Customers with LEFT JOIN\n-- Output: customer_name, order_count, total_spent\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT c.name AS customer_name, COUNT(o.id) AS order_count, ROUND(COALESCE(SUM(o.total_amount), 0), 2) AS total_spent FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC, customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "order_count",
      "total_spent"
    ],
    "hints": [
      "Use COUNT(o.id) instead of COUNT(*) so unmatched NULL order rows count as 0."
    ],
    "explanation": "Counting a nullable right-side column (COUNT(o.id)) is essential with LEFT JOIN so zero-activity entities show 0 instead of 1."
  },
  {
    "id": "basic-032",
    "number": 32,
    "title": "32. Shopify: Placing Filter Conditions in ON vs WHERE on LEFT JOIN",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "LEFT JOIN",
      "ON vs WHERE",
      "COALESCE"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "LEFT JOIN ON-Clause Trap",
    "description": "### Problem Statement\nEvery merchant must appear in the quarterly report with their **2025** settled revenue—even merchants who only had cancelled or 2024 orders (they should show `0.00`). Putting `o.status = 'settled'` in `WHERE` would accidentally turn the `LEFT JOIN` into an `INNER JOIN`!\n\n### Requirements\n- Include every row from `merchants` (even without matching `orders`), matching only `orders` rows where `o.status = 'settled'` and `o.order_date >= '2025-01-01'`.\n- Return `merchant_name` and `settled_2025_revenue` (rounded to 2 decimals, `0.00` if none).\n- Sort by `settled_2025_revenue` descending, `merchant_name` ascending.\n\n### Input Schema\n**merchants** (id INT, merchant_name VARCHAR)\n\n**orders** (id INT, merchant_id INT, status VARCHAR, amount NUMERIC, order_date DATE)",
    "schemaSql": "CREATE TABLE merchants (id INT PRIMARY KEY, merchant_name VARCHAR(50));\nCREATE TABLE orders (id INT PRIMARY KEY, merchant_id INT, status VARCHAR(20), amount NUMERIC, order_date DATE);\nINSERT INTO merchants VALUES (1, 'Peak Gear'), (2, 'Urban Brew'), (3, 'Fresh Blooms');\nINSERT INTO orders VALUES (101, 1, 'settled', 500.00, '2025-01-10'), (102, 2, 'cancelled', 300.00, '2025-01-12'), (103, 3, 'settled', 200.00, '2024-11-20');",
    "starterSql": "-- 32. Shopify: Placing Filter Conditions in ON vs WHERE on LEFT JOIN\n-- Output: merchant_name, settled_2025_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT m.merchant_name, ROUND(COALESCE(SUM(o.amount), 0), 2) AS settled_2025_revenue FROM merchants m LEFT JOIN orders o ON m.id = o.merchant_id AND o.status = 'settled' AND o.order_date >= '2025-01-01' GROUP BY m.id, m.merchant_name ORDER BY settled_2025_revenue DESC, m.merchant_name ASC;",
    "expectedColumns": [
      "merchant_name",
      "settled_2025_revenue"
    ],
    "hints": [
      "Put right-table filters (o.status, o.order_date) in the ON clause rather than WHERE."
    ],
    "explanation": "Filtering a LEFT-joined table inside WHERE drops rows where the right side is NULL; placing those conditions in ON keeps all left rows."
  },
  {
    "id": "basic-033",
    "number": 33,
    "title": "33. Airbnb: Unbooked New York Listings (Anti-Join)",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Expedia"
    ],
    "topics": [
      "LEFT JOIN",
      "WHERE IS NULL",
      "Anti-Join"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "Anti-Join Pattern",
    "description": "### Problem Statement\nAirbnb's Host Growth team wants to re-engage hosts whose properties have never received a booking. Find all listings in `'New York'` with zero bookings.\n\n### Requirements\n- Find `listings` rows matching `l.city = 'New York'` that have no corresponding records in `bookings`.\n- Output columns: `listing_name`, `neighborhood`.\n- Sort alphabetically by `listing_name` ascending.\n\n### Input Schema\n**listings** (id INT, name VARCHAR, neighborhood VARCHAR, city VARCHAR)\n\n**bookings** (id INT, listing_id INT, guest_id INT, checkin DATE)",
    "schemaSql": "CREATE TABLE listings (id INT PRIMARY KEY, name VARCHAR(100), neighborhood VARCHAR(50), city VARCHAR(50));\nCREATE TABLE bookings (id INT PRIMARY KEY, listing_id INT, guest_id INT, checkin DATE);\nINSERT INTO listings VALUES (1, 'Cozy Soho Loft', 'SoHo', 'New York'), (2, 'Sunny Brooklyn Studio', 'Williamsburg', 'New York'), (3, 'Modern Midtown Condo', 'Midtown', 'New York'), (4, 'Quiet Sunset Room', 'Sunset District', 'San Francisco'), (5, 'East Village Brownstone', 'East Village', 'New York');\nINSERT INTO bookings VALUES (101, 1, 201, '2025-01-10'), (102, 3, 202, '2025-02-14'), (103, 4, 203, '2025-01-20');",
    "starterSql": "-- 33. Airbnb: Unbooked New York Listings (Anti-Join)\n-- Output: listing_name, neighborhood\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT l.name AS listing_name, l.neighborhood FROM listings l LEFT JOIN bookings b ON l.id = b.listing_id WHERE l.city = 'New York' AND b.id IS NULL ORDER BY listing_name ASC;",
    "expectedColumns": [
      "listing_name",
      "neighborhood"
    ],
    "hints": [
      "LEFT JOIN listings to bookings, then filter WHERE b.id IS NULL."
    ],
    "explanation": "The LEFT JOIN ... WHERE right_key IS NULL anti-join isolates parent rows lacking child records."
  },
  {
    "id": "basic-034",
    "number": 34,
    "title": "34. Asana: Overdue Tasks Assigned to Inactive Team Members",
    "difficulty": "Easy",
    "companies": [
      "Asana",
      "Monday.com"
    ],
    "topics": [
      "INNER JOIN",
      "WHERE",
      "Date Comparison"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "Relational Multi-Filter Join",
    "description": "### Problem Statement\nAsana Admins audit stranded tasks. Retrieve incomplete tasks due before `'2025-01-01'` assigned to inactive team members.\n\n### Requirements\n- Join `tasks` and `team_members` on `assignee_id = m.id`.\n- Filter `m.is_active = FALSE`, `t.is_completed = FALSE`, and `t.due_date < '2025-01-01'`.\n- Output columns: `task_id`, `task_title`, `member_name`, `due_date`.\n- Sort by `due_date` ascending, `task_id` ascending.\n\n### Input Schema\n**team_members** (id INT, member_name VARCHAR, is_active BOOLEAN)\n\n**tasks** (task_id INT, assignee_id INT, task_title VARCHAR, is_completed BOOLEAN, due_date DATE)",
    "schemaSql": "CREATE TABLE team_members (id INT PRIMARY KEY, member_name VARCHAR(50), is_active BOOLEAN);\nCREATE TABLE tasks (task_id INT PRIMARY KEY, assignee_id INT, task_title VARCHAR(100), is_completed BOOLEAN, due_date DATE);\nINSERT INTO team_members VALUES (1, 'Jordan Fox', FALSE), (2, 'Emily Stone', TRUE), (3, 'Liam Brown', FALSE);\nINSERT INTO tasks VALUES (101, 1, 'Finalize Security Audit', FALSE, '2024-11-15'), (102, 1, 'Update API Docs', TRUE, '2024-10-01'), (103, 2, 'Prepare Keynote Slide', FALSE, '2024-12-20'), (104, 3, 'Migrate Database Replica', FALSE, '2024-12-05');",
    "starterSql": "-- 34. Asana: Overdue Tasks Assigned to Inactive Team Members\n-- Output: task_id, task_title, member_name, due_date\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT t.task_id, t.task_title, m.member_name, t.due_date FROM tasks t JOIN team_members m ON t.assignee_id = m.id WHERE m.is_active = FALSE AND t.is_completed = FALSE AND t.due_date < '2025-01-01' ORDER BY t.due_date ASC, t.task_id ASC;",
    "expectedColumns": [
      "task_id",
      "task_title",
      "member_name",
      "due_date"
    ],
    "hints": [
      "Filter across attributes from both joined tables in WHERE."
    ],
    "explanation": "Multi-table joins allow combining status flags across operational entities."
  },
  {
    "id": "basic-035",
    "number": 35,
    "title": "35. Google: Employees Earning More Than Their Direct Manager (Self-Join)",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Microsoft"
    ],
    "topics": [
      "Self-Join",
      "INNER JOIN",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Warm-up",
    "patternTag": "Self-Join",
    "description": "### Problem Statement\nGoogle Compensation Audit checks pay inversions inside org charts. Join the `employees` table to itself to find employees who earn strictly more than their direct manager.\n\n### Requirements\n- Join `employees e` with `employees m` on `e.manager_id = m.id`.\n- Filter where `e.salary > m.salary`.\n- Output columns: `employee_name`, `employee_salary`, `manager_name`, `manager_salary`.\n- Sort by `employee_salary` descending, `employee_name` ascending.\n\n### Input Schema\n**employees** (id INT, name VARCHAR, salary INT, manager_id INT)",
    "schemaSql": "CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50), salary INT, manager_id INT);\nINSERT INTO employees VALUES (1, 'Alice Director', 200000, NULL), (2, 'Bob Manager', 160000, 1), (3, 'Carol Staff Eng', 185000, 2), (4, 'Dave Analyst', 110000, 2), (5, 'Eve Principal', 220000, 1);",
    "starterSql": "-- 35. Google: Employees Earning More Than Their Direct Manager (Self-Join)\n-- Output: employee_name, employee_salary, manager_name, manager_salary\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT e.name AS employee_name, e.salary AS employee_salary, m.name AS manager_name, m.salary AS manager_salary FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary ORDER BY employee_salary DESC, employee_name ASC;",
    "expectedColumns": [
      "employee_name",
      "employee_salary",
      "manager_name",
      "manager_salary"
    ],
    "hints": [
      "Alias employees twice: e for employee and m for manager, joining ON e.manager_id = m.id."
    ],
    "explanation": "Self-joins compare two rows inside the same table (here, an employee row and their manager row)."
  },
  {
    "id": "basic-036",
    "number": 36,
    "title": "36. Meta: Mutual Two-Way Friendships & Referral Pairs (Self-Join)",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "LinkedIn"
    ],
    "topics": [
      "Self-Join",
      "LEFT JOIN",
      "COALESCE"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "Self-Join with NULL Root",
    "description": "### Problem Statement\nLinkedIn Referral Tracking lists every referred member alongside who referred them—preserving organic signups who have no referrer (`'Organic'`).\n\n### Requirements\n- Include all `members u` records alongside matching `members r` records on `u.referred_by = r.id`.\n- Display `r.name` (treating missing values as `'Organic'`) as `referrer_name`.\n- Output columns: `member_name`, `referrer_name`.\n- Sort by `u.id` ascending.\n\n### Input Schema\n**members** (id INT, name VARCHAR, referred_by INT)",
    "schemaSql": "CREATE TABLE members (id INT PRIMARY KEY, name VARCHAR(50), referred_by INT);\nINSERT INTO members VALUES (1, 'Maya', NULL), (2, 'Liam', 1), (3, 'Noah', 1), (4, 'Sofia', 2), (5, 'Lucas', NULL);",
    "starterSql": "-- 36. Meta: Mutual Two-Way Friendships & Referral Pairs (Self-Join)\n-- Output: member_name, referrer_name\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT u.name AS member_name, COALESCE(r.name, 'Organic') AS referrer_name FROM members u LEFT JOIN members r ON u.referred_by = r.id ORDER BY u.id ASC;",
    "expectedColumns": [
      "member_name",
      "referrer_name"
    ],
    "hints": [
      "Use LEFT JOIN (not INNER JOIN) so users with referred_by IS NULL are retained."
    ],
    "explanation": "Self-LEFT-JOIN preserves root nodes (NULL parent pointers) while resolving parent names."
  },
  {
    "id": "basic-037",
    "number": 37,
    "title": "37. Amazon: Distinct Product Pairs Bought Together (Non-Equi Self-Join)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Instacart"
    ],
    "topics": [
      "Self-Join",
      "COUNT",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Co-Purchase Pair Join",
    "description": "### Problem Statement\nAmazon Recommendations finds products frequently bought together in the same basket. Generate unique pairs `(product_a, product_b)` appearing in the same `order_id` without duplicate mirror pairs like `(A,B)` and `(B,A)`.\n\n### Requirements\n- Self-join `order_items a` and `order_items b` on `a.order_id = b.order_id AND a.product_name < b.product_name`.\n- Count shared orders as `co_purchase_count`.\n- Output columns: `product_a`, `product_b`, `co_purchase_count`.\n- Sort by `co_purchase_count` descending, `product_a` ascending, `product_b` ascending.\n\n### Input Schema\n**order_items** (order_id INT, product_name VARCHAR)",
    "schemaSql": "CREATE TABLE order_items (order_id INT, product_name VARCHAR(50));\nINSERT INTO order_items VALUES (1, 'Laptop'), (1, 'Mouse'), (1, 'USB-C Hub'), (2, 'Laptop'), (2, 'Mouse'), (3, 'Keyboard'), (3, 'Mouse');",
    "starterSql": "-- 37. Amazon: Distinct Product Pairs Bought Together (Non-Equi Self-Join)\n-- Output: product_a, product_b, co_purchase_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT a.product_name AS product_a, b.product_name AS product_b, COUNT(*) AS co_purchase_count FROM order_items a JOIN order_items b ON a.order_id = b.order_id AND a.product_name < b.product_name GROUP BY a.product_name, b.product_name ORDER BY co_purchase_count DESC, product_a ASC, product_b ASC;",
    "expectedColumns": [
      "product_a",
      "product_b",
      "co_purchase_count"
    ],
    "hints": [
      "Use a.product_name < b.product_name in the JOIN condition to avoid self-pairs and reversed duplicates."
    ],
    "explanation": "Strict inequality (a.name < b.name) eliminates mirror pairs (A,B)/(B,A) and self-pairs (A,A) in market-basket analysis."
  },
  {
    "id": "basic-038",
    "number": 38,
    "title": "38. Uber: Consolidated Passenger & Driver Operating Cities (UNION)",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "UNION",
      "Set Theory",
      "TRIM"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Warm-up",
    "patternTag": "UNION Deduplication",
    "description": "### Problem Statement\nUber Operations needs a deduplicated roster of all cities where either riders live or drivers operate.\n\n### Requirements\n- Combine non-null, non-blank cities from `riders` and `drivers` using `UNION`.\n- Output column: `city`, sorted alphabetically ascending.\n\n### Input Schema\n**riders** (id INT, name VARCHAR, city VARCHAR)\n\n**drivers** (id INT, name VARCHAR, city VARCHAR)",
    "schemaSql": "CREATE TABLE riders (id INT PRIMARY KEY, name VARCHAR(50), city VARCHAR(50));\nCREATE TABLE drivers (id INT PRIMARY KEY, name VARCHAR(50), city VARCHAR(50));\nINSERT INTO riders VALUES (1, 'Alice Green', 'San Francisco'), (2, 'Bob White', 'Chicago'), (3, 'Charlie Hall', 'Austin'), (4, 'David Young', NULL);\nINSERT INTO drivers VALUES (101, 'Elena Rostova', 'Chicago'), (102, 'Frank Miller', 'Seattle'), (103, 'Grace Hopper', 'Austin'), (104, 'Henry Ford', 'Detroit');",
    "starterSql": "-- 38. Uber: Consolidated Passenger & Driver Operating Cities (UNION)\n-- Output: city\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT city FROM riders WHERE city IS NOT NULL AND TRIM(city) <> '' UNION SELECT city FROM drivers WHERE city IS NOT NULL AND TRIM(city) <> '' ORDER BY city ASC;",
    "expectedColumns": [
      "city"
    ],
    "hints": [
      "UNION automatically removes duplicate rows across both SELECT queries; ORDER BY goes once at the very end."
    ],
    "explanation": "UNION merges compatible result sets vertically and deduplicates identical rows."
  },
  {
    "id": "basic-039",
    "number": 39,
    "title": "39. Stripe: Unified Ledger of Deposits & Payouts (UNION ALL)",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "topics": [
      "UNION ALL",
      "Set Theory"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "UNION ALL Event Stream",
    "description": "### Problem Statement\nStripe Treasury builds a unified transaction stream by stacking deposits and payouts chronologically **without** dropping identical amounts.\n\n### Requirements\n- Combine `deposits` (labeled `'deposit'`) and `payouts` (labeled `'payout'`) using `UNION ALL`.\n- Output columns: `user_id`, `amount`, `transaction_type`, `transaction_date`.\n- Sort by `transaction_date` ascending, `user_id` ascending.\n\n### Input Schema\n**deposits** (id INT, user_id INT, amount NUMERIC, transaction_date DATE)\n\n**payouts** (id INT, user_id INT, amount NUMERIC, transaction_date DATE)",
    "schemaSql": "CREATE TABLE deposits (id INT PRIMARY KEY, user_id INT, amount NUMERIC, transaction_date DATE);\nCREATE TABLE payouts (id INT PRIMARY KEY, user_id INT, amount NUMERIC, transaction_date DATE);\nINSERT INTO deposits VALUES (1, 101, 450.00, '2025-01-10'), (2, 102, 1200.00, '2025-01-12'), (3, 101, 300.00, '2025-01-15');\nINSERT INTO payouts VALUES (1, 101, 200.00, '2025-01-11'), (2, 103, 850.00, '2025-01-14'), (3, 102, 600.00, '2025-01-16');",
    "starterSql": "-- 39. Stripe: Unified Ledger of Deposits & Payouts (UNION ALL)\n-- Output: user_id, amount, transaction_type, transaction_date\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, amount, 'deposit' AS transaction_type, transaction_date FROM deposits UNION ALL SELECT user_id, amount, 'payout' AS transaction_type, transaction_date FROM payouts ORDER BY transaction_date ASC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "amount",
      "transaction_type",
      "transaction_date"
    ],
    "hints": [
      "Use UNION ALL so identical rows are preserved and SQL skips unnecessary deduplication sorting."
    ],
    "explanation": "UNION ALL preserves all rows and avoids the expensive distinct sort required by UNION."
  },
  {
    "id": "basic-040",
    "number": 40,
    "title": "40. Airbnb: Master Email Directory Across Hosts and Guests (UNION + Hygiene)",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Expedia"
    ],
    "topics": [
      "UNION",
      "LOWER",
      "TRIM"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 4: Multi-Table Joins & Set Ops",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Normalized UNION",
    "description": "### Problem Statement\nAirbnb Trust & Safety needs a clean, deduplicated email list across both hosts and guests. Emails may differ only by casing or trailing spaces.\n\n### Requirements\n- Normalize emails (case-insensitive, ignoring extra spaces on `email`) as `email` from both `hosts` and `guests`.\n- Exclude `NULL` or whitespace-only emails.\n- Deduplicate across both tables using `UNION`, sorted ascending.\n\n### Input Schema\n**hosts** (id INT, host_name VARCHAR, email VARCHAR)\n\n**guests** (id INT, guest_name VARCHAR, email VARCHAR)",
    "schemaSql": "CREATE TABLE hosts (id INT PRIMARY KEY, host_name VARCHAR(50), email VARCHAR(100));\nCREATE TABLE guests (id INT PRIMARY KEY, guest_name VARCHAR(50), email VARCHAR(100));\nINSERT INTO hosts VALUES (1, 'Sarah Chen', 'Sarah.C@gmail.com'), (2, 'Mark Ross', 'mark.ross@yahoo.com'), (3, 'Ghost Host', NULL);\nINSERT INTO guests VALUES (101, 'David Miller', 'david.m@outlook.com'), (102, 'Sarah Chen', ' sarah.c@gmail.com '), (103, 'Anonymous', '   ');",
    "starterSql": "-- 40. Airbnb: Master Email Directory Across Hosts and Guests (UNION + Hygiene)\n-- Output: email\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT LOWER(TRIM(email)) AS email FROM hosts WHERE email IS NOT NULL AND TRIM(email) <> '' UNION SELECT LOWER(TRIM(email)) AS email FROM guests WHERE email IS NOT NULL AND TRIM(email) <> '' ORDER BY email ASC;",
    "expectedColumns": [
      "email"
    ],
    "hints": [
      "Normalize with LOWER(TRIM(email)) in both SELECT branches before UNION deduplicates them."
    ],
    "explanation": "Normalizing keys inside each UNION branch prevents case/whitespace duplicates from slipping through."
  },
  {
    "id": "basic-041",
    "number": 41,
    "title": "41. Netflix: Feature Films Longer Than the Platform Average Runtime",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Warner Bros"
    ],
    "topics": [
      "Subqueries",
      "Scalar Subquery",
      "AVG"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "Scalar Subquery in WHERE",
    "description": "### Problem Statement\nNetflix Programming wants films whose duration strictly exceeds the overall average runtime across all movies in the library.\n\n### Requirements\n- Compare `duration_minutes` against `(SELECT AVG(duration_minutes) FROM movies)`.\n- Output columns: `title`, `genre`, `duration_minutes`.\n- Sort by `duration_minutes` descending, `title` ascending.\n\n### Input Schema\n**movies** (id INT, title VARCHAR, genre VARCHAR, duration_minutes INT)",
    "schemaSql": "CREATE TABLE movies (id INT PRIMARY KEY, title VARCHAR(100), genre VARCHAR(50), duration_minutes INT);\nINSERT INTO movies VALUES (1, 'Irishman Epic', 'Crime', 209), (2, 'Red Notice', 'Action', 118), (3, 'Marriage Story', 'Drama', 137), (4, 'Spenser Confidential', 'Comedy', 111), (5, 'Roma', 'Drama', 135), (6, 'Extraction', 'Action', 116);",
    "starterSql": "-- 41. Netflix: Feature Films Longer Than the Platform Average Runtime\n-- Output: title, genre, duration_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT title, genre, duration_minutes FROM movies WHERE duration_minutes > (SELECT AVG(duration_minutes) FROM movies) ORDER BY duration_minutes DESC, title ASC;",
    "expectedColumns": [
      "title",
      "genre",
      "duration_minutes"
    ],
    "hints": [
      "Use WHERE duration_minutes > (SELECT AVG(duration_minutes) FROM movies)."
    ],
    "explanation": "A scalar subquery returns a single value that WHERE can compare against every row.",
    "conceptPrimer": {
      "title": "Scalar Subqueries in WHERE",
      "mentalModel": "You cannot write WHERE duration_minutes > AVG(duration_minutes) because aggregates aren't allowed in WHERE. A scalar subquery (SELECT AVG(...) FROM table) runs first, computes one number, and plugs it right into your comparison.",
      "syntaxTemplate": "SELECT col1, metric\nFROM my_table\nWHERE metric > (SELECT AVG(metric) FROM my_table);",
      "visualType": "subquery-flow"
    }
  },
  {
    "id": "basic-042",
    "number": 42,
    "title": "42. LinkedIn: Active Roles Above Average Active Salary",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Indeed"
    ],
    "topics": [
      "Subqueries",
      "Scalar Subquery",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "Filtered Scalar Subquery",
    "description": "### Problem Statement\nLinkedIn Economic Graph highlights premier active roles. Find active job postings whose salary exceeds the average salary **of active postings only**.\n\n### Requirements\n- Filter `is_active = TRUE` in both the outer query and the inner scalar subquery.\n- Output columns: `job_id`, `title`, `company_name`, `base_salary`.\n- Sort by `base_salary` descending, `job_id` ascending.\n\n### Input Schema\n**job_postings** (job_id INT, title VARCHAR, company_name VARCHAR, base_salary NUMERIC, is_active BOOLEAN)",
    "schemaSql": "CREATE TABLE job_postings (job_id INT PRIMARY KEY, title VARCHAR(100), company_name VARCHAR(100), base_salary NUMERIC, is_active BOOLEAN);\nINSERT INTO job_postings VALUES (1, 'Staff Software Engineer', 'Google', 240000, TRUE), (2, 'Data Analyst', 'Amazon', 115000, TRUE), (3, 'Engineering Manager', 'Meta', 260000, TRUE), (4, 'Junior QA', 'StartupX', 75000, TRUE), (5, 'Principal Architect', 'Stripe', 290000, TRUE), (6, 'Legacy VP', 'OldCorp', 450000, FALSE);",
    "starterSql": "-- 42. LinkedIn: Active Roles Above Average Active Salary\n-- Output: job_id, title, company_name, base_salary\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT job_id, title, company_name, base_salary FROM job_postings WHERE is_active = TRUE AND base_salary > (SELECT AVG(base_salary) FROM job_postings WHERE is_active = TRUE) ORDER BY base_salary DESC, job_id ASC;",
    "expectedColumns": [
      "job_id",
      "title",
      "company_name",
      "base_salary"
    ],
    "hints": [
      "Don't forget WHERE is_active = TRUE inside the subquery so inactive outliers don't skew the average."
    ],
    "explanation": "Inner and outer WHERE filters are independent—always repeat domain filters inside scalar subqueries when needed."
  },
  {
    "id": "basic-043",
    "number": 43,
    "title": "43. Stripe: Showing Each Product Price Alongside Global Average (Scalar in SELECT)",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Amazon"
    ],
    "topics": [
      "Subqueries",
      "Scalar Subquery",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "Scalar Subquery in SELECT",
    "description": "### Problem Statement\nBefore learning window functions (`OVER ()`), analysts often use a scalar subquery inside `SELECT` to place the global average next to every individual row.\n\n### Requirements\n- For each product, show `name`, `price`, `global_avg_price` (rounded to 2 decimals via a scalar subquery), and `diff_from_avg` (`ROUND(price - (SELECT AVG(price) FROM products), 2)`).\n- Sort by `price` descending, `name` ascending.\n\n### Input Schema\n**products** (id INT, name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(60), price NUMERIC);\nINSERT INTO products VALUES (1, 'Monitor', 300.00), (2, 'Keyboard', 100.00), (3, 'Mouse', 50.00), (4, 'Webcam', 150.00);",
    "starterSql": "-- 43. Stripe: Showing Each Product Price Alongside Global Average (Scalar in SELECT)\n-- Output: name, price, global_avg_price, diff_from_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT name, price, ROUND((SELECT AVG(price) FROM products), 2) AS global_avg_price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_avg FROM products ORDER BY price DESC, name ASC;",
    "expectedColumns": [
      "name",
      "price",
      "global_avg_price",
      "diff_from_avg"
    ],
    "hints": [
      "Place (SELECT AVG(price) FROM products) inside SELECT to attach the single summary number to every row."
    ],
    "explanation": "A scalar subquery in SELECT displays a table-wide benchmark on every row—a bridge to understanding OVER() later!"
  },
  {
    "id": "basic-044",
    "number": 44,
    "title": "44. Amazon: Customers Who Purchased High-End Electronics (IN Subquery)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Target"
    ],
    "topics": [
      "Subqueries",
      "IN",
      "JOIN"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "IN (SELECT ...) Subquery",
    "description": "### Problem Statement\nAmazon Prime Marketing wants customers who placed at least one order for an `'Electronics'` item priced strictly above $400—without duplicating customers who bought multiple times.\n\n### Requirements\n- Use `WHERE id IN (SELECT o.customer_id ...)` joining `orders` and `products`.\n- Filter `p.department = 'Electronics' AND p.price > 400.00`.\n- Output columns: `customer_name`, `email`.\n- Sort alphabetically by `customer_name` ascending.\n\n### Input Schema\n**customers** (id INT, customer_name VARCHAR, email VARCHAR)\n\n**orders** (id INT, customer_id INT, product_id INT)\n\n**products** (id INT, product_name VARCHAR, department VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE customers (id INT PRIMARY KEY, customer_name VARCHAR(50), email VARCHAR(100));\nCREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, product_id INT);\nCREATE TABLE products (id INT PRIMARY KEY, product_name VARCHAR(100), department VARCHAR(50), price NUMERIC);\nINSERT INTO customers VALUES (1, 'Alice Morgan', 'alice@amazon.com'), (2, 'Brian Hayes', 'brian@gmail.com'), (3, 'Catherine Bell', 'cathy@yahoo.com'), (4, 'Daniel Craig', 'daniel@outlook.com');\nINSERT INTO products VALUES (10, 'Sony Headphones', 'Electronics', 150.00), (20, '4K Smart OLED TV', 'Electronics', 899.00), (30, 'Espresso Machine', 'Kitchen', 450.00), (40, 'Gaming Laptop', 'Electronics', 1200.00);\nINSERT INTO orders VALUES (101, 1, 20), (102, 2, 10), (103, 3, 30), (104, 4, 40), (105, 1, 40);",
    "starterSql": "-- 44. Amazon: Customers Who Purchased High-End Electronics (IN Subquery)\n-- Output: customer_name, email\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT customer_name, email FROM customers WHERE id IN (SELECT o.customer_id FROM orders o JOIN products p ON o.product_id = p.id WHERE p.department = 'Electronics' AND p.price > 400.00) ORDER BY customer_name ASC;",
    "expectedColumns": [
      "customer_name",
      "email"
    ],
    "hints": [
      "IN automatically behaves like a semi-join: even if Alice bought 2 qualifying electronics, she appears once."
    ],
    "explanation": "Using IN (SELECT ...) avoids duplicating outer rows when a customer has multiple matching orders."
  },
  {
    "id": "basic-045",
    "number": 45,
    "title": "45. Meta: Registered Users with Zero Posts (NOT IN & NULL Trap)",
    "difficulty": "Easy",
    "companies": [
      "Meta",
      "Twitter"
    ],
    "topics": [
      "Subqueries",
      "NOT IN",
      "IS NOT NULL"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "NOT IN with NULL Guard",
    "description": "### Problem Statement\nMeta Growth Engineering wants active users who have never published a post. Beware: `posts` contains a dirty anonymous row where `user_id` is `NULL`! If you write `NOT IN (SELECT user_id FROM posts)` without filtering out `NULL`, SQL returns **zero rows**.\n\n### Requirements\n- Find active users (`is_active = TRUE`) whose `id` does not appear in `posts`.\n- Safely guard the subquery with `WHERE user_id IS NOT NULL`.\n- Output columns: `username`, `country`.\n- Sort by `username` ascending.\n\n### Input Schema\n**users** (id INT, username VARCHAR, is_active BOOLEAN, country VARCHAR)\n\n**posts** (id INT, user_id INT, content VARCHAR)",
    "schemaSql": "CREATE TABLE users (id INT PRIMARY KEY, username VARCHAR(50), is_active BOOLEAN, country VARCHAR(50));\nCREATE TABLE posts (id INT PRIMARY KEY, user_id INT, content VARCHAR(255));\nINSERT INTO users VALUES (1, 'alex_m', TRUE, 'USA'), (2, 'brenda_k', TRUE, 'Canada'), (3, 'clark_d', FALSE, 'UK'), (4, 'dana_w', TRUE, 'USA'), (5, 'eric_p', TRUE, 'Germany');\nINSERT INTO posts VALUES (101, 1, 'First post!'), (102, 2, 'Good morning'), (103, NULL, 'Anonymous legacy post');",
    "starterSql": "-- 45. Meta: Registered Users with Zero Posts (NOT IN & NULL Trap)\n-- Output: username, country\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT username, country FROM users WHERE is_active = TRUE AND id NOT IN (SELECT user_id FROM posts WHERE user_id IS NOT NULL) ORDER BY username ASC;",
    "expectedColumns": [
      "username",
      "country"
    ],
    "hints": [
      "Add WHERE user_id IS NOT NULL inside the NOT IN subquery—otherwise x NOT IN (1, 2, NULL) evaluates to UNKNOWN."
    ],
    "explanation": "In SQL three-valued logic, x NOT IN (..., NULL) is never TRUE. Always filter IS NOT NULL inside NOT IN, or use NOT EXISTS."
  },
  {
    "id": "basic-046",
    "number": 46,
    "title": "46. Stripe: Retail Merchants with Zero Chargebacks (NOT EXISTS)",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Adyen"
    ],
    "topics": [
      "Subqueries",
      "NOT EXISTS",
      "Correlated Subquery"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "EXISTS / NOT EXISTS Semi-Join",
    "description": "### Problem Statement\nStripe Risk Operations prefers `NOT EXISTS` over `NOT IN` because `NOT EXISTS` is completely immune to `NULL` values and short-circuits on the first match.\n\n### Requirements\n- Find `'Retail'` merchants that have zero rows in `disputes` using `NOT EXISTS`.\n- Output columns: `merchant_name`, `registered_country`.\n- Sort by `merchant_name` ascending.\n\n### Input Schema\n**merchants** (id INT, merchant_name VARCHAR, sector VARCHAR, registered_country VARCHAR)\n\n**disputes** (id INT, merchant_id INT, dispute_amount NUMERIC)",
    "schemaSql": "CREATE TABLE merchants (id INT PRIMARY KEY, merchant_name VARCHAR(100), sector VARCHAR(50), registered_country VARCHAR(50));\nCREATE TABLE disputes (id INT PRIMARY KEY, merchant_id INT, dispute_amount NUMERIC);\nINSERT INTO merchants VALUES (1, 'Blue Sky Books', 'Retail', 'USA'), (2, 'Apex Apparel', 'Retail', 'Canada'), (3, 'Cloud Peak Software', 'SaaS', 'USA'), (4, 'Downtown Decor', 'Retail', 'UK'), (5, 'Green Grocer', 'Retail', 'USA');\nINSERT INTO disputes VALUES (101, 1, 45.00), (102, 4, 120.00), (103, NULL, 99.00);",
    "starterSql": "-- 46. Stripe: Retail Merchants with Zero Chargebacks (NOT EXISTS)\n-- Output: merchant_name, registered_country\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT m.merchant_name, m.registered_country FROM merchants m WHERE m.sector = 'Retail' AND NOT EXISTS (SELECT 1 FROM disputes d WHERE d.merchant_id = m.id) ORDER BY m.merchant_name ASC;",
    "expectedColumns": [
      "merchant_name",
      "registered_country"
    ],
    "hints": [
      "Write AND NOT EXISTS (SELECT 1 FROM disputes d WHERE d.merchant_id = m.id)."
    ],
    "explanation": "NOT EXISTS safely ignores NULL foreign keys in the inner table and stops scanning on the first match."
  },
  {
    "id": "basic-047",
    "number": 47,
    "title": "47. Spotify: Artists Exceeding Global Track Popularity (Subquery in HAVING)",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "topics": [
      "Subqueries",
      "HAVING",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "Subquery in HAVING",
    "description": "### Problem Statement\nSpotify Editorial highlights artists whose average track popularity beats the global average popularity across all songs.\n\n### Requirements\n- Aggregate per `artist_name` and compute `ROUND(AVG(popularity), 2) AS avg_popularity`.\n- Filter groups in `HAVING` using a scalar subquery against `tracks`.\n- Output columns: `artist_name`, `avg_popularity`.\n- Sort by `avg_popularity` descending, `artist_name` ascending.\n\n### Input Schema\n**tracks** (id INT, artist_name VARCHAR, track_title VARCHAR, popularity INT)",
    "schemaSql": "CREATE TABLE tracks (id INT PRIMARY KEY, artist_name VARCHAR(50), track_title VARCHAR(100), popularity INT);\nINSERT INTO tracks VALUES (1, 'Adele', 'Hello', 88), (2, 'Adele', 'Rolling in the Deep', 92), (3, 'Coldplay', 'Yellow', 84), (4, 'Coldplay', 'Fix You', 80), (5, 'Indie Band', 'Intro Song', 40), (6, 'Indie Band', 'Demo Track', 35), (7, 'Taylor Swift', 'Blank Space', 95), (8, 'Taylor Swift', 'Anti-Hero', 91);",
    "starterSql": "-- 47. Spotify: Artists Exceeding Global Track Popularity (Subquery in HAVING)\n-- Output: artist_name, avg_popularity\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT artist_name, ROUND(AVG(popularity), 2) AS avg_popularity FROM tracks GROUP BY artist_name HAVING AVG(popularity) > (SELECT AVG(popularity) FROM tracks) ORDER BY avg_popularity DESC, artist_name ASC;",
    "expectedColumns": [
      "artist_name",
      "avg_popularity"
    ],
    "hints": [
      "Compare AVG(popularity) > (SELECT AVG(popularity) FROM tracks) inside HAVING."
    ],
    "explanation": "HAVING compares grouped aggregates against scalar subqueries cleanly."
  },
  {
    "id": "basic-048",
    "number": 48,
    "title": "48. Uber: Metropolitan Cities with Average Completed Fare Over $25 (Derived Table)",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "Subqueries",
      "Derived Tables",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "Derived Table in FROM",
    "description": "### Problem Statement\nUsing a **derived table** subquery inside `FROM`, compute average completed ride fares per city first, then filter the outer query for cities averaging over $25.00.\n\n### Requirements\n- Inner derived table: filter `status = 'completed'`, Aggregate per `city`, compute `ROUND(AVG(fare), 2) AS avg_fare`.\n- Outer query: filter `avg_fare > 25.00`.\n- Output columns: `city`, `avg_fare`.\n- Sort by `avg_fare` descending, `city` ascending.\n\n### Input Schema\n**rides** (id INT, city VARCHAR, fare NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE rides (id INT PRIMARY KEY, city VARCHAR(50), fare NUMERIC, status VARCHAR(20));\nINSERT INTO rides VALUES (1, 'San Francisco', 32.50, 'completed'), (2, 'San Francisco', 28.00, 'completed'), (3, 'Chicago', 18.50, 'completed'), (4, 'Chicago', 22.00, 'completed'), (5, 'New York', 45.00, 'completed'), (6, 'New York', 38.00, 'completed'), (7, 'Austin', 24.00, 'completed'), (8, 'Austin', 15.00, 'cancelled');",
    "starterSql": "-- 48. Uber: Metropolitan Cities with Average Completed Fare Over $25 (Derived Table)\n-- Output: city, avg_fare\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT city, avg_fare FROM (SELECT city, ROUND(AVG(fare), 2) AS avg_fare FROM rides WHERE status = 'completed' GROUP BY city) AS city_stats WHERE avg_fare > 25.00 ORDER BY avg_fare DESC, city ASC;",
    "expectedColumns": [
      "city",
      "avg_fare"
    ],
    "hints": [
      "Give the FROM (...) subquery an alias like AS city_stats (required in PostgreSQL)."
    ],
    "explanation": "A derived table acts as an inline virtual table in FROM—the stepping stone to CTEs!"
  },
  {
    "id": "basic-049",
    "number": 49,
    "title": "49. Amazon: Average Orders per Active Customer (Two-Level Aggregation)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "DoorDash"
    ],
    "topics": [
      "Subqueries",
      "Derived Tables",
      "AVG",
      "COUNT"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "Aggregate of Aggregate (Derived Table)",
    "description": "### Problem Statement\nSQL does not allow `AVG(COUNT(*))` in a single query. Use a derived table in `FROM` to count orders per customer first, then compute the average orders per ordering customer.\n\n### Requirements\n- Inner query: count orders per `customer_id` as `order_cnt`.\n- Outer query: compute `ROUND(AVG(order_cnt), 2) AS avg_orders_per_customer` and `MAX(order_cnt) AS max_orders`.\n- Output columns: `avg_orders_per_customer`, `max_orders`.\n\n### Input Schema\n**orders** (id INT, customer_id INT, total_amount NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, total_amount NUMERIC);\nINSERT INTO orders VALUES (1, 10, 50.00), (2, 10, 80.00), (3, 10, 40.00), (4, 20, 120.00), (5, 30, 60.00), (6, 30, 75.00);",
    "starterSql": "-- 49. Amazon: Average Orders per Active Customer (Two-Level Aggregation)\n-- Output: avg_orders_per_customer, max_orders\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT ROUND(AVG(order_cnt), 2) AS avg_orders_per_customer, MAX(order_cnt) AS max_orders FROM (SELECT customer_id, COUNT(*) AS order_cnt FROM orders GROUP BY customer_id) AS customer_counts;",
    "expectedColumns": [
      "avg_orders_per_customer",
      "max_orders"
    ],
    "hints": [
      "Aggregate by customer_id inside FROM (...) first, then take AVG and MAX outside."
    ],
    "explanation": "Two-level aggregation (aggregate of an aggregate) always requires a derived table or CTE."
  },
  {
    "id": "basic-050",
    "number": 50,
    "title": "50. Amazon: Products Priced Above Category Average (Correlated Subquery)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Walmart"
    ],
    "topics": [
      "Correlated Subquery",
      "WHERE",
      "AVG"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "Correlated Subquery",
    "description": "### Problem Statement\nFind all products whose price is strictly greater than the average price **within their own category**, using a correlated subquery.\n\n### Requirements\n- Compare `p.price > (SELECT AVG(p2.price) FROM catalog_products p2 WHERE p2.category_id = p.category_id)`.\n- Output columns: `product_id`, `category_id`, `product_name`, `price`.\n- Sort by `category_id` ascending, `price` descending.\n\n### Input Schema\n**catalog_products** (product_id INT, category_id INT, product_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE catalog_products (product_id INT PRIMARY KEY, category_id INT, product_name VARCHAR(50), price NUMERIC);\nINSERT INTO catalog_products VALUES (1, 10, 'Gaming Keyboard', 120.00), (2, 10, 'Basic Keyboard', 25.00), (3, 10, 'Ergonomic Keyboard', 85.00), (4, 20, '4K Monitor', 450.00), (5, 20, 'HD Monitor', 150.00), (6, 20, 'Office Monitor', 200.00);",
    "starterSql": "-- 50. Amazon: Products Priced Above Category Average (Correlated Subquery)\n-- Output: product_id, category_id, product_name, price\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT p.product_id, p.category_id, p.product_name, p.price FROM catalog_products p WHERE p.price > (SELECT AVG(p2.price) FROM catalog_products p2 WHERE p2.category_id = p.category_id) ORDER BY p.category_id ASC, p.price DESC;",
    "expectedColumns": [
      "product_id",
      "category_id",
      "product_name",
      "price"
    ],
    "hints": [
      "Alias the outer table p and inner table p2, matching p2.category_id = p.category_id."
    ],
    "explanation": "Correlated subqueries benchmark each row against its peer group dynamically."
  },
  {
    "id": "basic-051",
    "number": 51,
    "title": "51. Airbnb: Listings Priced Above 2x Neighborhood Minimum (Correlated)",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Booking.com"
    ],
    "topics": [
      "Correlated Subquery",
      "MIN",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Applied",
    "patternTag": "Correlated Benchmark Subquery",
    "description": "### Problem Statement\nIdentify luxury outlier listings whose nightly price is strictly more than twice the cheapest listing in the same neighborhood.\n\n### Requirements\n- Use a correlated subquery computing `MIN(l2.price) * 2` where `l2.neighborhood = l.neighborhood`.\n- Output columns: `listing_name`, `neighborhood`, `price`.\n- Sort by `price` descending, `listing_name` ascending.\n\n### Input Schema\n**neighborhood_listings** (id INT, listing_name VARCHAR, neighborhood VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE neighborhood_listings (id INT PRIMARY KEY, listing_name VARCHAR(100), neighborhood VARCHAR(50), price NUMERIC);\nINSERT INTO neighborhood_listings VALUES (1, 'Downtown Penthouse', 'Downtown', 350.00), (2, 'Cozy Studio', 'Downtown', 120.00), (3, 'Budget Crashpad', 'Downtown', 90.00), (4, 'Seaside Villa', 'Coastal', 600.00), (5, 'Beachfront Cottage', 'Coastal', 250.00), (6, 'Coastal Camper', 'Coastal', 150.00), (7, 'Suburban Townhome', 'Suburbs', 110.00), (8, 'Suburban Suite', 'Suburbs', 100.00);",
    "starterSql": "-- 51. Airbnb: Listings Priced Above 2x Neighborhood Minimum (Correlated)\n-- Output: listing_name, neighborhood, price\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT l.listing_name, l.neighborhood, l.price FROM neighborhood_listings l WHERE l.price > (SELECT MIN(l2.price) * 2 FROM neighborhood_listings l2 WHERE l2.neighborhood = l.neighborhood) ORDER BY l.price DESC, l.listing_name ASC;",
    "expectedColumns": [
      "listing_name",
      "neighborhood",
      "price"
    ],
    "hints": [
      "Match l2.neighborhood = l.neighborhood inside the MIN(l2.price) * 2 subquery."
    ],
    "explanation": "Correlated subqueries allow arbitrary per-group comparisons against MIN, MAX, or AVG."
  },
  {
    "id": "basic-052",
    "number": 52,
    "title": "52. Stripe: Customers Whose First-Ever Order Exceeded $200 (EXISTS + Subquery)",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Shopify"
    ],
    "topics": [
      "Subqueries",
      "EXISTS",
      "MIN",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 5: Subqueries (Scalar, IN, EXISTS)",
    "stageOrder": 5,
    "rampStep": "Applied",
    "patternTag": "First-Event Subquery",
    "description": "### Problem Statement\nStripe Cohort Analytics wants to identify high-intent shoppers whose very first order (earliest `order_date`) totaled strictly over $200.\n\n### Requirements\n- Consider only `status = 'completed'` orders.\n- Identify orders matching each customer's earliest completed `order_date` where `total_amount > 200`.\n- Output columns: `customer_id`, `first_order_date`, `total_amount`.\n- Sort by `customer_id` ascending.\n\n### Input Schema\n**orders** (id INT, customer_id INT, status VARCHAR, order_date DATE, total_amount NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, status VARCHAR(20), order_date DATE, total_amount NUMERIC);\nINSERT INTO orders VALUES (1, 101, 'completed', '2025-01-05', 250.00), (2, 101, 'completed', '2025-02-01', 90.00), (3, 102, 'completed', '2025-01-08', 75.00), (4, 102, 'completed', '2025-02-12', 310.00), (5, 103, 'cancelled', '2025-01-01', 500.00), (6, 103, 'completed', '2025-01-15', 220.00);",
    "starterSql": "-- 52. Stripe: Customers Whose First-Ever Order Exceeded $200 (EXISTS + Subquery)\n-- Output: customer_id, first_order_date, total_amount\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT o.customer_id, o.order_date AS first_order_date, o.total_amount FROM orders o WHERE o.status = 'completed' AND o.order_date = (SELECT MIN(o2.order_date) FROM orders o2 WHERE o2.customer_id = o.customer_id AND o2.status = 'completed') AND o.total_amount > 200 ORDER BY o.customer_id ASC;",
    "expectedColumns": [
      "customer_id",
      "first_order_date",
      "total_amount"
    ],
    "hints": [
      "Find the minimum completed order_date per customer in a correlated subquery, then filter total_amount > 200."
    ],
    "explanation": "Finding a customer's earliest valid event via MIN(date) subquery is a fundamental cohort building block."
  },
  {
    "id": "basic-053",
    "number": 53,
    "title": "53. Amazon: Your First CTE — Filtering High-Margin Products",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Shopify"
    ],
    "topics": [
      "CTEs",
      "WITH",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Warm-up",
    "patternTag": "Single CTE Intro",
    "description": "### Problem Statement\nIn SQL, you can't filter on a calculated column alias directly inside the same `WHERE` clause. A **CTE (`WITH ...`)** solves this cleanly! Define a CTE named `product_margins` that computes `unit_margin` for active products, then filter for `unit_margin >= 30` outside.\n\n### Requirements\n- Inside CTE `product_margins`: select `name`, `price`, and `(price - cost) AS unit_margin` for products with `is_active = TRUE`.\n- In the final `SELECT`: filter `unit_margin >= 30`.\n- Output columns: `name`, `price`, `unit_margin`.\n- Sort by `unit_margin` descending, `name` ascending.\n\n### Input Schema\n**products** (id INT, name VARCHAR, price NUMERIC, cost NUMERIC, is_active BOOLEAN)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(60), price NUMERIC, cost NUMERIC, is_active BOOLEAN);\nINSERT INTO products VALUES (1, 'Mechanical Keyboard', 120.00, 55.00, TRUE), (2, 'USB Cable', 15.00, 5.00, TRUE), (3, 'Webcam HD', 85.00, 40.00, TRUE), (4, 'Old Monitor', 200.00, 100.00, FALSE), (5, 'Standing Desk', 350.00, 210.00, TRUE);",
    "starterSql": "-- 53. Amazon: Your First CTE — Filtering High-Margin Products\n-- Output: name, price, unit_margin\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH product_margins AS (SELECT name, price, (price - cost) AS unit_margin FROM products WHERE is_active = TRUE) SELECT name, price, unit_margin FROM product_margins WHERE unit_margin >= 30 ORDER BY unit_margin DESC, name ASC;",
    "expectedColumns": [
      "name",
      "price",
      "unit_margin"
    ],
    "hints": [
      "Start with WITH product_margins AS (SELECT ...), then write your outer SELECT FROM product_margins."
    ],
    "explanation": "CTEs let you name intermediate computed columns and filter them cleanly without repeating expressions.",
    "conceptPrimer": {
      "title": "Your First CTE (WITH ... AS (...))",
      "mentalModel": "A Common Table Expression (CTE) creates a named temporary result at the top of your query. Think of it as assigning a clean variable name to a SELECT statement so your final query stays short and readable.",
      "syntaxTemplate": "WITH step_one AS (\n  SELECT id, name, (price - cost) AS margin\n  FROM products\n)\nSELECT name, margin\nFROM step_one\nWHERE margin > 20;",
      "exampleWalkthrough": "Notice how computing margin inside step_one lets you filter WHERE margin > 20 cleanly in the outer SELECT!",
      "visualType": "cte-pipeline"
    },
    "blueprintSql": "WITH product_margins AS (\n  -- Step 1: Calculate unit_margin = price - cost for active products\n  SELECT name, price, (price - cost) AS unit_margin\n  FROM products\n  WHERE is_active = TRUE\n)\n-- Step 2: Filter unit_margin >= 30 and sort\nSELECT name, price, unit_margin\nFROM product_margins\nWHERE ...\nORDER BY unit_margin DESC, name ASC;"
  },
  {
    "id": "basic-054",
    "number": 54,
    "title": "54. Uber: Refactoring a Derived Table into a Clean CTE",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "CTEs",
      "GROUP BY",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Warm-up",
    "patternTag": "CTE Aggregation Stage",
    "description": "### Problem Statement\nReplace messy nested `FROM (SELECT ...)` subqueries with a clean CTE. Compute completed ride count and average fare per city inside a CTE, then keep cities with at least 2 rides and average fare above $25.\n\n### Requirements\n- Build a CTE `city_metrics` filtering `status = 'completed'` and grouping by `city`.\n- In the outer query, keep cities with `ride_count >= 2` and `avg_fare > 25`.\n- Output columns: `city`, `ride_count`, `avg_fare` (rounded to 2 decimals).\n- Sort by `avg_fare` descending, `city` ascending.\n\n### Input Schema\n**rides** (id INT, city VARCHAR, fare NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE rides (id INT PRIMARY KEY, city VARCHAR(40), fare NUMERIC, status VARCHAR(20));\nINSERT INTO rides VALUES (1, 'New York', 42.00, 'completed'), (2, 'New York', 34.00, 'completed'), (3, 'Chicago', 18.00, 'completed'), (4, 'Chicago', 22.00, 'completed'), (5, 'Austin', 60.00, 'completed'), (6, 'Austin', 15.00, 'cancelled'), (7, 'Seattle', 30.00, 'completed'), (8, 'Seattle', 28.00, 'completed');",
    "starterSql": "-- 54. Uber: Refactoring a Derived Table into a Clean CTE\n-- Output: city, ride_count, avg_fare\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH city_metrics AS (SELECT city, COUNT(*) AS ride_count, ROUND(AVG(fare), 2) AS avg_fare FROM rides WHERE status = 'completed' GROUP BY city) SELECT city, ride_count, avg_fare FROM city_metrics WHERE ride_count >= 2 AND avg_fare > 25 ORDER BY avg_fare DESC, city ASC;",
    "expectedColumns": [
      "city",
      "ride_count",
      "avg_fare"
    ],
    "hints": [
      "Aggregate by city inside the CTE, then apply clean WHERE filters on ride_count and avg_fare outside."
    ],
    "explanation": "CTEs turn nested subqueries inside-out so queries read top-to-bottom like a step-by-step recipe."
  },
  {
    "id": "basic-055",
    "number": 55,
    "title": "55. Spotify: Customer Spend Tiers from a CTE Summary",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Netflix"
    ],
    "topics": [
      "CTEs",
      "CASE WHEN",
      "SUM",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "CTE + Outer Classification",
    "description": "### Problem Statement\nFirst aggregate total valid subscription payments per user in a CTE, then classify each user's lifetime spend tier in the outer `SELECT`.\n\n### Requirements\n- CTE: filter `status = 'paid'` and sum `amount` per `user_id` as `total_paid`.\n- Outer `SELECT`: assign `spend_tier` as `'VIP'` (`total_paid >= 100`), `'Core'` (`>= 50`), else `'Starter'`.\n- Output columns: `user_id`, `total_paid`, `spend_tier`.\n- Sort by `total_paid` descending, `user_id` ascending.\n\n### Input Schema\n**payments** (id INT, user_id INT, amount NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE payments (id INT PRIMARY KEY, user_id INT, amount NUMERIC, status VARCHAR(20));\nINSERT INTO payments VALUES (1, 10, 49.99, 'paid'), (2, 10, 59.99, 'paid'), (3, 20, 60.00, 'paid'), (4, 20, 40.00, 'failed'), (5, 30, 19.99, 'paid'), (6, 40, 120.00, 'paid');",
    "starterSql": "-- 55. Spotify: Customer Spend Tiers from a CTE Summary\n-- Output: user_id, total_paid, spend_tier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH user_totals AS (SELECT user_id, ROUND(SUM(amount), 2) AS total_paid FROM payments WHERE status = 'paid' GROUP BY user_id) SELECT user_id, total_paid, CASE WHEN total_paid >= 100 THEN 'VIP' WHEN total_paid >= 50 THEN 'Core' ELSE 'Starter' END AS spend_tier FROM user_totals ORDER BY total_paid DESC, user_id ASC;",
    "expectedColumns": [
      "user_id",
      "total_paid",
      "spend_tier"
    ],
    "hints": [
      "Compute SUM(amount) once inside the CTE, then run CASE WHEN on the clean total_paid column."
    ],
    "explanation": "Separating aggregation (CTE) from business tier labeling (outer SELECT) keeps SQL clean and DRY."
  },
  {
    "id": "basic-056",
    "number": 56,
    "title": "56. Airbnb: Benchmarking Listings Against City Average via CTE Join",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Expedia"
    ],
    "topics": [
      "CTEs",
      "INNER JOIN",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "CTE Benchmark Lookup",
    "description": "### Problem Statement\nEarlier you used a correlated subquery to compare each listing to its city average. A cleaner, faster pattern is computing city averages once inside a CTE and joining it back!\n\n### Requirements\n- CTE `city_avg`: compute `ROUND(AVG(price_nightly), 2) AS avg_city_price` per `city`.\n- Join `market_listings` to `city_avg` on `city`.\n- Return listings where `price_nightly > avg_city_price`.\n- Output columns: `listing_name`, `city`, `price_nightly`, `avg_city_price`.\n- Sort by `city` ascending, `price_nightly` descending.\n\n### Input Schema\n**market_listings** (listing_id INT, city VARCHAR, listing_name VARCHAR, price_nightly NUMERIC)",
    "schemaSql": "CREATE TABLE market_listings (listing_id INT PRIMARY KEY, city VARCHAR(40), listing_name VARCHAR(80), price_nightly NUMERIC);\nINSERT INTO market_listings VALUES (1, 'Austin', 'Downtown Studio', 120.00), (2, 'Austin', 'Lakefront Villa', 450.00), (3, 'Austin', 'Eastside Loft', 180.00), (4, 'Denver', 'Mountain Cabin', 220.00), (5, 'Denver', 'Highrise Suite', 310.00), (6, 'Denver', 'Basement Room', 80.00);",
    "starterSql": "-- 56. Airbnb: Benchmarking Listings Against City Average via CTE Join\n-- Output: listing_name, city, price_nightly, avg_city_price\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH city_avg AS (SELECT city, ROUND(AVG(price_nightly), 2) AS avg_city_price FROM market_listings GROUP BY city) SELECT l.listing_name, l.city, l.price_nightly, c.avg_city_price FROM market_listings l JOIN city_avg c ON l.city = c.city WHERE l.price_nightly > c.avg_city_price ORDER BY l.city ASC, l.price_nightly DESC;",
    "expectedColumns": [
      "listing_name",
      "city",
      "price_nightly",
      "avg_city_price"
    ],
    "hints": [
      "Compute city averages in a CTE, then JOIN it back on city to display both listing price and city average."
    ],
    "explanation": "Joining a pre-aggregated CTE lets you return the benchmark column itself (avg_city_price), unlike a correlated subquery in WHERE."
  },
  {
    "id": "basic-057",
    "number": 57,
    "title": "57. Slack: Chained Two-Step CTE Pipeline (Clean Then Aggregate)",
    "difficulty": "Easy",
    "companies": [
      "Slack",
      "Notion"
    ],
    "topics": [
      "CTEs",
      "Multi-CTE",
      "TRIM",
      "LOWER",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "2-Step Chained CTE",
    "description": "### Problem Statement\nPractice chaining **two CTEs** separated by a comma (`WITH cte1 AS (...), cte2 AS (...) SELECT ...`). First clean messy channel tags, then aggregate per cleaned tag, then filter in the final query.\n\n### Requirements\n- `cte1` (`cleaned_events`): trim and lowercase `channel` as `clean_channel`, excluding rows where `channel` is missing or `TRIM(channel) = ''`.\n- `cte2` (`channel_stats`): group `cleaned_events` by `clean_channel` and count events as `event_count`.\n- Outer query: keep `event_count >= 2`.\n- Output columns: `clean_channel`, `event_count`.\n- Sort by `event_count` descending, `clean_channel` ascending.\n\n### Input Schema\n**signup_events** (id INT, channel VARCHAR)",
    "schemaSql": "CREATE TABLE signup_events (id INT PRIMARY KEY, channel VARCHAR(40));\nINSERT INTO signup_events VALUES (1, ' Organic '), (2, 'ORGANIC'), (3, 'organic'), (4, 'Paid Search'), (5, ' paid search '), (6, 'Referral'), (7, NULL), (8, '  ');",
    "starterSql": "-- 57. Slack: Chained Two-Step CTE Pipeline (Clean Then Aggregate)\n-- Output: clean_channel, event_count\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cleaned_events AS (SELECT id, LOWER(TRIM(channel)) AS clean_channel FROM signup_events WHERE channel IS NOT NULL AND TRIM(channel) <> ''), channel_stats AS (SELECT clean_channel, COUNT(*) AS event_count FROM cleaned_events GROUP BY clean_channel) SELECT clean_channel, event_count FROM channel_stats WHERE event_count >= 2 ORDER BY event_count DESC, clean_channel ASC;",
    "expectedColumns": [
      "clean_channel",
      "event_count"
    ],
    "hints": [
      "Separate multiple CTEs with a comma—never write WITH twice!"
    ],
    "explanation": "Chaining CTEs lets Stage 1 handle dirty hygiene and Stage 2 handle aggregation cleanly.",
    "blueprintSql": "WITH cleaned_events AS (\n  -- Step 1: Normalize channel names (TRIM + LOWER) and filter valid rows\n  SELECT ...\n),\nchannel_stats AS (\n  -- Step 2: Aggregate cleaned_events by clean_channel\n  SELECT ...\n)\nSELECT clean_channel, event_count\nFROM channel_stats\nWHERE event_count >= 2\nORDER BY event_count DESC, clean_channel ASC;"
  },
  {
    "id": "basic-058",
    "number": 58,
    "title": "58. Google: Two-Level Average of Daily Revenue via Chained CTEs",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Meta"
    ],
    "topics": [
      "CTEs",
      "Multi-CTE",
      "SUM",
      "AVG",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Aggregations",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "Two-Level Aggregation with CTE",
    "description": "### Problem Statement\nGoogle Ads Finance wants to find which days outperformed the average daily ad revenue. Use two CTEs: one to sum daily revenue, and a second (or scalar check) to benchmark days against that average!\n\n### Requirements\n- CTE `daily_totals`: sum `spend` per `ad_date` as `daily_revenue`.\n- Return days where `daily_revenue` exceeds the average `daily_revenue` across all days in `daily_totals`.\n- Output columns: `ad_date`, `daily_revenue`.\n- Sort by `ad_date` ascending.\n\n### Input Schema\n**ad_spend** (id INT, ad_date DATE, spend NUMERIC)",
    "schemaSql": "CREATE TABLE ad_spend (id INT PRIMARY KEY, ad_date DATE, spend NUMERIC);\nINSERT INTO ad_spend VALUES (1, '2025-01-01', 100.00), (2, '2025-01-01', 150.00), (3, '2025-01-02', 80.00), (4, '2025-01-02', 40.00), (5, '2025-01-03', 300.00), (6, '2025-01-04', 90.00);",
    "starterSql": "-- 58. Google: Two-Level Average of Daily Revenue via Chained CTEs\n-- Output: ad_date, daily_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH daily_totals AS (SELECT ad_date, ROUND(SUM(spend), 2) AS daily_revenue FROM ad_spend GROUP BY ad_date), avg_day AS (SELECT AVG(daily_revenue) AS mean_rev FROM daily_totals) SELECT d.ad_date, d.daily_revenue FROM daily_totals d CROSS JOIN avg_day a WHERE d.daily_revenue > a.mean_rev ORDER BY d.ad_date ASC;",
    "expectedColumns": [
      "ad_date",
      "daily_revenue"
    ],
    "hints": [
      "Define daily_totals first, then reference daily_totals inside avg_day or a scalar subquery."
    ],
    "explanation": "CTEs can reference earlier CTEs defined before them in the same WITH block."
  },
  {
    "id": "basic-059",
    "number": 59,
    "title": "59. DoorDash: Combining Two Independent CTEs (Active Drivers vs Active Zones)",
    "difficulty": "Easy",
    "companies": [
      "DoorDash",
      "Uber"
    ],
    "topics": [
      "CTEs",
      "Multi-CTE",
      "LEFT JOIN",
      "COALESCE"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "Parallel CTE Join",
    "description": "### Problem Statement\nDoorDash Supply Operations wants every delivery zone compared side-by-side with its completed delivery count and active driver count—even zones with zero deliveries or zero drivers.\n\n### Requirements\n- Build two independent CTEs grouped by `zone_id`:\n - `zone_deliveries`: count deliveries where `status = 'delivered'`\n - `zone_drivers`: count drivers where `is_active = TRUE`\n- including unmatched rows from the primary table both CTEs onto `zones`, defaulting missing counts to `0`.\n- Output columns: `zone_name`, `completed_deliveries`, `active_drivers`.\n- Sort by `zone_name` ascending.\n\n### Input Schema\n**zones** (id INT, zone_name VARCHAR)\n\n**deliveries** (id INT, zone_id INT, status VARCHAR)\n\n**drivers** (id INT, zone_id INT, is_active BOOLEAN)",
    "schemaSql": "CREATE TABLE zones (id INT PRIMARY KEY, zone_name VARCHAR(40));\nCREATE TABLE deliveries (id INT PRIMARY KEY, zone_id INT, status VARCHAR(20));\nCREATE TABLE drivers (id INT PRIMARY KEY, zone_id INT, is_active BOOLEAN);\nINSERT INTO zones VALUES (1, 'Downtown'), (2, 'Midtown'), (3, 'Suburbs');\nINSERT INTO deliveries VALUES (101, 1, 'delivered'), (102, 1, 'delivered'), (103, 2, 'cancelled');\nINSERT INTO drivers VALUES (201, 1, TRUE), (202, 2, TRUE), (203, 2, TRUE), (204, 3, FALSE);",
    "starterSql": "-- 59. DoorDash: Combining Two Independent CTEs (Active Drivers vs Active Zones)\n-- Output: zone_name, completed_deliveries, active_drivers\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH zone_deliveries AS (SELECT zone_id, COUNT(*) AS completed_deliveries FROM deliveries WHERE status = 'delivered' GROUP BY zone_id), zone_drivers AS (SELECT zone_id, COUNT(*) AS active_drivers FROM drivers WHERE is_active = TRUE GROUP BY zone_id) SELECT z.zone_name, COALESCE(zd.completed_deliveries, 0) AS completed_deliveries, COALESCE(zdr.active_drivers, 0) AS active_drivers FROM zones z LEFT JOIN zone_deliveries zd ON z.id = zd.zone_id LEFT JOIN zone_drivers zdr ON z.id = zdr.zone_id ORDER BY z.zone_name ASC;",
    "expectedColumns": [
      "zone_name",
      "completed_deliveries",
      "active_drivers"
    ],
    "hints": [
      "Pre-aggregate deliveries and drivers separately by zone_id so joining them never multiplies rows!"
    ],
    "explanation": "Joining two pre-aggregated CTEs guarantees 1-to-1 row alignment per zone."
  },
  {
    "id": "basic-060",
    "number": 60,
    "title": "60. Amazon: Preventing Join Fanout on Orders + Order Items (Pre-Aggregation CTE)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "DoorDash"
    ],
    "topics": [
      "CTEs",
      "Fanout Prevention",
      "LEFT JOIN",
      "SUM"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Applied",
    "patternTag": "Fanout-Safe Pre-Aggregation CTE",
    "description": "### Problem Statement\nAn analyst joined `orders` directly to `order_items` and summed `orders.shipping_fee`, accidentally multiplying shipping fees by the number of items in each order! Fix it using a pre-aggregated CTE.\n\n### Requirements\n- CTE `item_sums`: sum `quantity * unit_price` per `order_id` as `items_total`.\n- Join `orders` to `item_sums` via including unmatched rows from the primary table and compute `customer_id` totals:\n - `total_shipping` = `SUM(o.shipping_fee)`\n - `total_items_cost` = `SUM((i.items_total, defaulting to 0 if missing))`\n- Output columns: `customer_id`, `total_shipping`, `total_items_cost`.\n- Sort by `customer_id` ascending.\n\n### Input Schema\n**orders** (id INT, customer_id INT, shipping_fee NUMERIC)\n\n**order_items** (id INT, order_id INT, quantity INT, unit_price NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, shipping_fee NUMERIC);\nCREATE TABLE order_items (id INT PRIMARY KEY, order_id INT, quantity INT, unit_price NUMERIC);\nINSERT INTO orders VALUES (1, 101, 10.00), (2, 101, 5.00), (3, 102, 8.00);\nINSERT INTO order_items VALUES (1, 1, 2, 20.00), (2, 1, 1, 15.00), (3, 2, 3, 10.00), (4, 3, 1, 50.00);",
    "starterSql": "-- 60. Amazon: Preventing Join Fanout on Orders + Order Items (Pre-Aggregation CTE)\n-- Output: customer_id, total_shipping, total_items_cost\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH item_sums AS (SELECT order_id, SUM(quantity * unit_price) AS items_total FROM order_items GROUP BY order_id) SELECT o.customer_id, ROUND(SUM(o.shipping_fee), 2) AS total_shipping, ROUND(SUM(COALESCE(i.items_total, 0)), 2) AS total_items_cost FROM orders o LEFT JOIN item_sums i ON o.id = i.order_id GROUP BY o.customer_id ORDER BY o.customer_id ASC;",
    "expectedColumns": [
      "customer_id",
      "total_shipping",
      "total_items_cost"
    ],
    "hints": [
      "Aggregate order_items by order_id inside the CTE first so each order has exactly 1 matching row."
    ],
    "explanation": "Pre-aggregating 1-to-many child tables in a CTE before joining is the #1 defense against silent metric inflation.",
    "conceptPrimer": {
      "title": "Stopping Join Fanouts with Pre-Aggregated CTEs",
      "mentalModel": "If Order #1 has 1 shipping fee ($10) and 3 order items, joining orders directly to order_items duplicates Order #1 three times—turning a $10 shipping fee into $30! Always aggregate child tables down to 1 row per order_id inside a CTE before joining.",
      "syntaxTemplate": "WITH item_totals AS (\n  SELECT order_id, SUM(qty * unit_price) AS items_subtotal\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT o.id, o.shipping_fee + COALESCE(i.items_subtotal, 0) AS grand_total\nFROM orders o\nLEFT JOIN item_totals i ON o.id = i.order_id;",
      "visualType": "cte-pipeline"
    }
  },
  {
    "id": "basic-061",
    "number": 61,
    "title": "61. Shopify: Net Store Revenue Across Orders and Refunds (2-CTE Fanout Fix)",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "CTEs",
      "Fanout Prevention",
      "LEFT JOIN",
      "COALESCE"
    ],
    "frequency": "Very High",
    "category": "Joins & Set Theory",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Applied",
    "patternTag": "Multi-Child Fanout Prevention",
    "description": "### Problem Statement\nA store can have multiple `payments` rows AND multiple `refunds` rows. Joining `stores -> payments -> refunds` directly would multiply rows! Aggregate each child table in its own CTE first.\n\n### Requirements\n- CTE 1 (`store_payments`): sum `amount` per `store_id` as `gross_paid`.\n- CTE 2 (`store_refunds`): sum `refund_amount` per `store_id` as `total_refunded`.\n- Join both onto `stores` with including unmatched rows from the primary table and compute `net_revenue = ROUND((gross_paid, defaulting to 0 if missing) - (total_refunded, defaulting to 0 if missing), 2)`.\n- Output columns: `store_name`, `gross_paid`, `total_refunded`, `net_revenue`.\n- Sort by `net_revenue` descending, `store_name` ascending.\n\n### Input Schema\n**stores** (id INT, store_name VARCHAR)\n\n**payments** (id INT, store_id INT, amount NUMERIC)\n\n**refunds** (id INT, store_id INT, refund_amount NUMERIC)",
    "schemaSql": "CREATE TABLE stores (id INT PRIMARY KEY, store_name VARCHAR(50));\nCREATE TABLE payments (id INT PRIMARY KEY, store_id INT, amount NUMERIC);\nCREATE TABLE refunds (id INT PRIMARY KEY, store_id INT, refund_amount NUMERIC);\nINSERT INTO stores VALUES (1, 'Nordic Home'), (2, 'Pixel Prints'), (3, 'Empty Shop');\nINSERT INTO payments VALUES (1, 1, 200.00), (2, 1, 300.00), (3, 2, 150.00);\nINSERT INTO refunds VALUES (1, 1, 50.00), (2, 1, 25.00);",
    "starterSql": "-- 61. Shopify: Net Store Revenue Across Orders and Refunds (2-CTE Fanout Fix)\n-- Output: store_name, gross_paid, total_refunded, net_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH store_payments AS (SELECT store_id, SUM(amount) AS gross_paid FROM payments GROUP BY store_id), store_refunds AS (SELECT store_id, SUM(refund_amount) AS total_refunded FROM refunds GROUP BY store_id) SELECT s.store_name, ROUND(COALESCE(p.gross_paid, 0), 2) AS gross_paid, ROUND(COALESCE(r.total_refunded, 0), 2) AS total_refunded, ROUND(COALESCE(p.gross_paid, 0) - COALESCE(r.total_refunded, 0), 2) AS net_revenue FROM stores s LEFT JOIN store_payments p ON s.id = p.store_id LEFT JOIN store_refunds r ON s.id = r.store_id ORDER BY net_revenue DESC, s.store_name ASC;",
    "expectedColumns": [
      "store_name",
      "gross_paid",
      "total_refunded",
      "net_revenue"
    ],
    "hints": [
      "Never join payments directly to refunds on store_id; aggregate each by store_id first."
    ],
    "explanation": "Separate CTEs per child table reduce every 1-to-many relation down to 1-to-1 before the final join."
  },
  {
    "id": "basic-062",
    "number": 62,
    "title": "62. Netflix: Subscriber Watch Share Using a Grand-Total CTE",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "YouTube"
    ],
    "topics": [
      "CTEs",
      "CROSS JOIN",
      "ROUND",
      "SUM"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Core",
    "patternTag": "Share of Total via CTE",
    "description": "### Problem Statement\nCompute each genre's percentage of total platform watch hours using two CTEs (`genre_hours` and `total_hours`)—showing what window `OVER ()` will soon automate in one line!\n\n### Requirements\n- `genre_hours`: sum `hours` per `genre` as `genre_total`.\n- `total_hours`: sum `genre_total` across all genres as `grand_total`.\n- Compute `share_pct` = `ROUND(genre_total * 100.0 / grand_total, 2)`.\n- Output columns: `genre`, `genre_total`, `share_pct`.\n- Sort by `share_pct` descending, `genre` ascending.\n\n### Input Schema\n**watch_logs** (id INT, genre VARCHAR, hours NUMERIC)",
    "schemaSql": "CREATE TABLE watch_logs (id INT PRIMARY KEY, genre VARCHAR(30), hours NUMERIC);\nINSERT INTO watch_logs VALUES (1, 'Sci-Fi', 120), (2, 'Sci-Fi', 80), (3, 'Drama', 150), (4, 'Comedy', 50);",
    "starterSql": "-- 62. Netflix: Subscriber Watch Share Using a Grand-Total CTE\n-- Output: genre, genre_total, share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH genre_hours AS (SELECT genre, SUM(hours) AS genre_total FROM watch_logs GROUP BY genre), total_hours AS (SELECT SUM(genre_total) AS grand_total FROM genre_hours) SELECT g.genre, g.genre_total, ROUND(g.genre_total * 100.0 / t.grand_total, 2) AS share_pct FROM genre_hours g CROSS JOIN total_hours t ORDER BY share_pct DESC, g.genre ASC;",
    "expectedColumns": [
      "genre",
      "genre_total",
      "share_pct"
    ],
    "hints": [
      "CROSS JOIN works cleanly with a 1-row grand-total CTE because 1 * N rows = N rows."
    ],
    "explanation": "A 1-row grand-total CTE combined with CROSS JOIN is the classic pre-window way to compute share-of-total."
  },
  {
    "id": "basic-063",
    "number": 63,
    "title": "63. HubSpot: Multi-Stage Lead Funnel Conversion via Chained CTEs",
    "difficulty": "Easy",
    "companies": [
      "HubSpot",
      "Salesforce"
    ],
    "topics": [
      "CTEs",
      "Multi-CTE",
      "CASE WHEN",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Applied",
    "patternTag": "Funnel Pipeline CTE",
    "description": "### Problem Statement\nHubSpot Marketing has dirty lead stages with mixed casing. Clean the stages in CTE 1, roll up funnel counts per campaign in CTE 2, and compute SQL-to-Won conversion rates in the final SELECT.\n\n### Requirements\n- Exclude rows where `lead_stage` is `NULL`.\n- CTE 1: normalize trimmed, lowercased `lead_stage` as `stage`.\n- CTE 2: per `campaign`, count `total_leads` and `won_leads` (`stage = 'closed_won'`).\n- Final SELECT: compute `win_rate_pct` = `ROUND(won_leads * 100.0 / total_leads (returning null if 0), 2)`, keeping campaigns with `total_leads >= 2`.\n- Output columns: `campaign`, `total_leads`, `won_leads`, `win_rate_pct`.\n- Sort by `win_rate_pct` descending, `campaign` ascending.\n\n### Input Schema\n**crm_leads** (id INT, campaign VARCHAR, lead_stage VARCHAR)",
    "schemaSql": "CREATE TABLE crm_leads (id INT PRIMARY KEY, campaign VARCHAR(40), lead_stage VARCHAR(30));\nINSERT INTO crm_leads VALUES (1, 'Webinar Q1', ' Closed_Won '), (2, 'Webinar Q1', 'closed_won'), (3, 'Webinar Q1', 'qualified'), (4, 'Search Ads', 'CLOSED_WON'), (5, 'Search Ads', 'lost'), (6, 'Search Ads', 'qualified'), (7, 'Search Ads', NULL), (8, 'Cold Email', 'lost');",
    "starterSql": "-- 63. HubSpot: Multi-Stage Lead Funnel Conversion via Chained CTEs\n-- Output: campaign, total_leads, won_leads, win_rate_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cleaned AS (SELECT campaign, LOWER(TRIM(lead_stage)) AS stage FROM crm_leads WHERE lead_stage IS NOT NULL), stats AS (SELECT campaign, COUNT(*) AS total_leads, SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END) AS won_leads FROM cleaned GROUP BY campaign) SELECT campaign, total_leads, won_leads, ROUND(won_leads * 100.0 / NULLIF(total_leads, 0), 2) AS win_rate_pct FROM stats WHERE total_leads >= 2 ORDER BY win_rate_pct DESC, campaign ASC;",
    "expectedColumns": [
      "campaign",
      "total_leads",
      "won_leads",
      "win_rate_pct"
    ],
    "hints": [
      "Put dirty string normalization in CTE 1, counts in CTE 2, and ratio filtering in the outer SELECT."
    ],
    "explanation": "Multi-CTE pipelines separate ingestion hygiene, aggregation, and presentation logic cleanly."
  },
  {
    "id": "basic-064",
    "number": 64,
    "title": "64. Stripe: Stage 6 Milestone — Repeat vs One-Time Buyer Revenue Share",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Shopify"
    ],
    "topics": [
      "CTEs",
      "Multi-CTE",
      "CASE WHEN",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Business Analytics",
    "orderSensitive": true,
    "stage": "Stage 6: Common Table Expressions (CTEs)",
    "stageOrder": 6,
    "rampStep": "Applied",
    "patternTag": "Cohort Segmentation CTE",
    "description": "### Problem Statement\nSplit completed revenue between **Repeat Buyers** (2+ completed orders) and **One-Time Buyers** (1 completed order).\n\n### Requirements\n- CTE 1 (`customer_orders`): filter `status = 'completed'`, Aggregate per `customer_id` to compute `order_cnt` and `cust_spend`.\n- CTE 2 (`segmented`): map `order_cnt >= 2` to `'Repeat Buyer'` else `'One-Time Buyer'` as `buyer_type`.\n- Final SELECT: aggregate `customer_count` and `ROUND(SUM(cust_spend), 2) AS total_revenue` per `buyer_type`.\n- Sort by `total_revenue` descending.\n\n### Input Schema\n**orders** (id INT, customer_id INT, status VARCHAR, amount NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, status VARCHAR(20), amount NUMERIC);\nINSERT INTO orders VALUES (1, 1, 'completed', 100.00), (2, 1, 'completed', 150.00), (3, 2, 'completed', 200.00), (4, 3, 'completed', 80.00), (5, 3, 'completed', 90.00), (6, 4, 'cancelled', 500.00);",
    "starterSql": "-- 64. Stripe: Stage 6 Milestone — Repeat vs One-Time Buyer Revenue Share\n-- Output: buyer_type, customer_count, total_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH customer_orders AS (SELECT customer_id, COUNT(*) AS order_cnt, SUM(amount) AS cust_spend FROM orders WHERE status = 'completed' GROUP BY customer_id), segmented AS (SELECT customer_id, cust_spend, CASE WHEN order_cnt >= 2 THEN 'Repeat Buyer' ELSE 'One-Time Buyer' END AS buyer_type FROM customer_orders) SELECT buyer_type, COUNT(*) AS customer_count, ROUND(SUM(cust_spend), 2) AS total_revenue FROM segmented GROUP BY buyer_type ORDER BY total_revenue DESC;",
    "expectedColumns": [
      "buyer_type",
      "customer_count",
      "total_revenue"
    ],
    "hints": [
      "First collapse orders -> 1 row per customer, then label each customer, then group by buyer_type."
    ],
    "explanation": "Multi-grain aggregation (orders -> customers -> segments) is one of the most common analytical CTE workflows."
  },
  {
    "id": "basic-065",
    "number": 65,
    "title": "65. Amazon: Your First Window Function — Row Value vs Grand Average (OVER ())",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Google"
    ],
    "topics": [
      "Window Functions",
      "OVER ()",
      "AVG OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Warm-up",
    "patternTag": "Empty OVER () Window",
    "description": "### Problem Statement\nWrite your first window function! Display every product alongside the catalog-wide average price and its dollar difference from that average—**without** collapsing rows or writing a subquery.\n\n### Requirements\n- Keep every row from `products`.\n- Compute `global_avg_price` using `ROUND(AVG(price) OVER (), 2)`.\n- Compute `diff_from_avg` as `ROUND(price - AVG(price) OVER (), 2)`.\n- Output columns: `product_name`, `price`, `global_avg_price`, `diff_from_avg`.\n- Sort by `price` descending, `product_name` ascending.\n\n### Input Schema\n**products** (id INT, product_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, product_name VARCHAR(60), price NUMERIC);\nINSERT INTO products VALUES (1, 'Monitor', 300.00), (2, 'Keyboard', 100.00), (3, 'Mouse', 50.00), (4, 'Webcam', 150.00);",
    "starterSql": "-- 65. Amazon: Your First Window Function — Row Value vs Grand Average (OVER ())\n-- Output: product_name, price, global_avg_price, diff_from_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT product_name, price, ROUND(AVG(price) OVER (), 2) AS global_avg_price, ROUND(price - AVG(price) OVER (), 2) AS diff_from_avg FROM products ORDER BY price DESC, product_name ASC;",
    "expectedColumns": [
      "product_name",
      "price",
      "global_avg_price",
      "diff_from_avg"
    ],
    "hints": [
      "Use AVG(price) OVER () directly in SELECT—no GROUP BY needed!"
    ],
    "explanation": "OVER () computes an aggregate across all rows while preserving row-level detail.",
    "conceptPrimer": {
      "title": "GROUP BY vs OVER () — Keep Every Row!",
      "mentalModel": "GROUP BY collapses 5 rows into 1 summary row. Adding OVER () after AVG(), SUM(), or COUNT() keeps ALL 5 individual rows intact and stamps the summary result right next to each row—no subquery or self-join needed!",
      "syntaxTemplate": "SELECT\n  item_name,\n  price,\n  ROUND(AVG(price) OVER (), 2) AS catalog_avg\nFROM items;",
      "exampleWalkthrough": "Empty parentheses OVER () means: use the entire result set as one single window.",
      "visualType": "window-frame"
    },
    "blueprintSql": "SELECT\n  product_name,\n  price,\n  ROUND(AVG(price) OVER (), 2) AS global_avg_price,\n  ROUND(price - AVG(price) OVER (), 2) AS diff_from_avg\nFROM products\nORDER BY price DESC, product_name ASC;"
  },
  {
    "id": "basic-066",
    "number": 66,
    "title": "66. Stripe: Percentage of Company Total Revenue with SUM() OVER ()",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Square"
    ],
    "topics": [
      "Window Functions",
      "SUM OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Warm-up",
    "patternTag": "Share of Grand Total",
    "description": "### Problem Statement\nEarlier you computed grand total share using two CTEs + `CROSS JOIN`. Now do it cleanly in one query with `SUM(revenue) OVER ()`!\n\n### Requirements\n- Return each region's `region`, `revenue`, `total_revenue` (`SUM(revenue) OVER ()`), and `pct_of_total` (`ROUND(revenue * 100.0 / SUM(revenue) OVER (), 2)`).\n- Sort by `pct_of_total` descending, `region` ascending.\n\n### Input Schema\n**regional_sales** (region VARCHAR, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE regional_sales (region VARCHAR(30), revenue NUMERIC);\nINSERT INTO regional_sales VALUES ('North America', 5000.00), ('Europe', 3000.00), ('APAC', 1500.00), ('LATAM', 500.00);",
    "starterSql": "-- 66. Stripe: Percentage of Company Total Revenue with SUM() OVER ()\n-- Output: region, revenue, total_revenue, pct_of_total\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT region, revenue, SUM(revenue) OVER () AS total_revenue, ROUND(revenue * 100.0 / SUM(revenue) OVER (), 2) AS pct_of_total FROM regional_sales ORDER BY pct_of_total DESC, region ASC;",
    "expectedColumns": [
      "region",
      "revenue",
      "total_revenue",
      "pct_of_total"
    ],
    "hints": [
      "Divide revenue * 100.0 by SUM(revenue) OVER ()."
    ],
    "explanation": "SUM(col) OVER () computes the grand denominator cleanly inside any row-level ratio."
  },
  {
    "id": "basic-067",
    "number": 67,
    "title": "67. Google: Department Headcount & Payroll Alongside Every Employee (PARTITION BY)",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Microsoft"
    ],
    "topics": [
      "Window Functions",
      "PARTITION BY",
      "COUNT OVER",
      "SUM OVER"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Warm-up",
    "patternTag": "PARTITION BY Grouping",
    "description": "### Problem Statement\nHR wants every employee listed alongside their department's total headcount and total department payroll—without collapsing employees into department summary rows.\n\n### Requirements\n- Use `COUNT(*) OVER (PARTITION BY department)` as `dept_headcount`.\n- Use `SUM(salary) OVER (PARTITION BY department)` as `dept_payroll`.\n- Output columns: `employee_name`, `department`, `salary`, `dept_headcount`, `dept_payroll`.\n- Sort by `department` ascending, `salary` descending, `employee_name` ascending.\n\n### Input Schema\n**employees** (id INT, employee_name VARCHAR, department VARCHAR, salary INT)",
    "schemaSql": "CREATE TABLE employees (id INT PRIMARY KEY, employee_name VARCHAR(40), department VARCHAR(30), salary INT);\nINSERT INTO employees VALUES (1, 'Alice', 'Engineering', 160000), (2, 'Bob', 'Engineering', 140000), (3, 'Carol', 'Engineering', 200000), (4, 'Dave', 'Sales', 110000), (5, 'Eve', 'Sales', 90000);",
    "starterSql": "-- 67. Google: Department Headcount & Payroll Alongside Every Employee (PARTITION BY)\n-- Output: employee_name, department, salary, dept_headcount, dept_payroll\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT employee_name, department, salary, COUNT(*) OVER (PARTITION BY department) AS dept_headcount, SUM(salary) OVER (PARTITION BY department) AS dept_payroll FROM employees ORDER BY department ASC, salary DESC, employee_name ASC;",
    "expectedColumns": [
      "employee_name",
      "department",
      "salary",
      "dept_headcount",
      "dept_payroll"
    ],
    "hints": [
      "Add PARTITION BY department inside OVER (...)."
    ],
    "explanation": "PARTITION BY resets window aggregations per group without collapsing individual rows.",
    "conceptPrimer": {
      "title": "Splitting Windows with PARTITION BY",
      "mentalModel": "Adding PARTITION BY inside OVER (...) acts just like GROUP BY for window functions—it resets the calculation independently for each department, category, or user while still keeping every row.",
      "syntaxTemplate": "SELECT\n  employee_name,\n  department,\n  salary,\n  COUNT(*) OVER (PARTITION BY department) AS dept_headcount,\n  SUM(salary) OVER (PARTITION BY department) AS dept_payroll\nFROM employees;",
      "visualType": "window-frame"
    }
  },
  {
    "id": "basic-068",
    "number": 68,
    "title": "68. Google: Search Query Click Share Within Product Category",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Amazon"
    ],
    "topics": [
      "Window Functions",
      "SUM OVER",
      "PARTITION BY",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Core",
    "patternTag": "Within-Group Percentage Share",
    "description": "### Problem Statement\nGoogle Search Monetization analyzes click concentration inside each industry vertical. Compute each query's percentage share of clicks **within its category**.\n\n### Requirements\n- Compute `category_total_clicks` via `SUM(clicks) OVER (PARTITION BY category)`.\n- Compute `click_share_pct` = `ROUND(clicks * 100.0 / NULLIF(SUM(clicks) OVER (PARTITION BY category), 0), 2)`.\n- Output columns: `category`, `query_text`, `clicks`, `category_total_clicks`, `click_share_pct`.\n- Sort by `category` ascending, `click_share_pct` descending, `query_text` ascending.\n\n### Input Schema\n**search_clicks** (id INT, category VARCHAR, query_text VARCHAR, clicks INT)",
    "schemaSql": "CREATE TABLE search_clicks (id INT PRIMARY KEY, category VARCHAR(50), query_text VARCHAR(100), clicks INT);\nINSERT INTO search_clicks VALUES (1, 'Travel', 'cheap flights to paris', 4500), (2, 'Travel', 'best hotels tokyo', 3500), (3, 'Travel', 'car rental miami', 2000), (4, 'Finance', 'high yield savings account', 8000), (5, 'Finance', 'best credit card rewards', 12000);",
    "starterSql": "-- 68. Google: Search Query Click Share Within Product Category\n-- Output: category, query_text, clicks, category_total_clicks, click_share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT category, query_text, clicks, SUM(clicks) OVER (PARTITION BY category) AS category_total_clicks, ROUND(clicks * 100.0 / NULLIF(SUM(clicks) OVER (PARTITION BY category), 0), 2) AS click_share_pct FROM search_clicks ORDER BY category ASC, click_share_pct DESC, query_text ASC;",
    "expectedColumns": [
      "category",
      "query_text",
      "clicks",
      "category_total_clicks",
      "click_share_pct"
    ],
    "hints": [
      "Omit ORDER BY inside OVER (PARTITION BY category) so SUM includes the whole category."
    ],
    "explanation": "SUM(x) OVER (PARTITION BY grp) computes group totals cleanly for within-group shares."
  },
  {
    "id": "basic-069",
    "number": 69,
    "title": "69. Airbnb: Listing Price Variance vs Neighborhood Average",
    "difficulty": "Easy",
    "companies": [
      "Airbnb",
      "Zillow"
    ],
    "topics": [
      "Window Functions",
      "AVG OVER",
      "PARTITION BY",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Core",
    "patternTag": "Group Average Comparison",
    "description": "### Problem Statement\nCompute each listing's dollar variance (`price - neighborhood_avg`) compared against the average nightly price in its neighborhood.\n\n### Requirements\n- Compute `neighborhood_avg` using `ROUND(AVG(price) OVER (PARTITION BY neighborhood), 2)`.\n- Compute `price_diff` using `ROUND(price - AVG(price) OVER (PARTITION BY neighborhood), 2)`.\n- Output columns: `neighborhood`, `listing_name`, `price`, `neighborhood_avg`, `price_diff`.\n- Sort by `neighborhood` ascending, `price_diff` descending, `listing_name` ascending.\n\n### Input Schema\n**listings** (id INT, neighborhood VARCHAR, listing_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE listings (id INT PRIMARY KEY, neighborhood VARCHAR(40), listing_name VARCHAR(60), price NUMERIC);\nINSERT INTO listings VALUES (1, 'SoHo', 'Loft A', 400.00), (2, 'SoHo', 'Studio B', 200.00), (3, 'SoHo', 'Suite C', 300.00), (4, 'Mission', 'Flat D', 180.00), (5, 'Mission', 'House E', 220.00);",
    "starterSql": "-- 69. Airbnb: Listing Price Variance vs Neighborhood Average\n-- Output: neighborhood, listing_name, price, neighborhood_avg, price_diff\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT neighborhood, listing_name, price, ROUND(AVG(price) OVER (PARTITION BY neighborhood), 2) AS neighborhood_avg, ROUND(price - AVG(price) OVER (PARTITION BY neighborhood), 2) AS price_diff FROM listings ORDER BY neighborhood ASC, price_diff DESC, listing_name ASC;",
    "expectedColumns": [
      "neighborhood",
      "listing_name",
      "price",
      "neighborhood_avg",
      "price_diff"
    ],
    "hints": [
      "Use AVG(price) OVER (PARTITION BY neighborhood) to get the per-neighborhood average on every row."
    ],
    "explanation": "AVG() OVER (PARTITION BY ...) replaces correlated subqueries and CTE self-joins with one concise expression."
  },
  {
    "id": "basic-070",
    "number": 70,
    "title": "70. Databricks: Cluster Peak Capacity & Gap to Peak (MAX OVER)",
    "difficulty": "Easy",
    "companies": [
      "Databricks",
      "Snowflake"
    ],
    "topics": [
      "Window Functions",
      "MAX OVER",
      "MIN OVER",
      "PARTITION BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Core",
    "patternTag": "Partition Min/Max Benchmark",
    "description": "### Problem Statement\nDatabricks Infrastructure tracks each cluster's current active nodes relative to that cluster's all-time peak node count.\n\n### Requirements\n- Compute `cluster_peak_nodes` as `MAX(active_nodes) OVER (PARTITION BY cluster_name)`.\n- Compute `nodes_below_peak` as `MAX(active_nodes) OVER (PARTITION BY cluster_name) - active_nodes`.\n- Output columns: `cluster_name`, `log_hour`, `active_nodes`, `cluster_peak_nodes`, `nodes_below_peak`.\n- Sort by `cluster_name` ascending, `log_hour` ascending.\n\n### Input Schema\n**cluster_logs** (id INT, cluster_name VARCHAR, log_hour TIMESTAMP, active_nodes INT)",
    "schemaSql": "CREATE TABLE cluster_logs (id INT PRIMARY KEY, cluster_name VARCHAR(40), log_hour TIMESTAMP, active_nodes INT);\nINSERT INTO cluster_logs VALUES (1, 'etl-prod', '2025-01-01 08:00:00', 12), (2, 'etl-prod', '2025-01-01 09:00:00', 20), (3, 'etl-prod', '2025-01-01 10:00:00', 15), (4, 'ml-train', '2025-01-01 08:00:00', 32), (5, 'ml-train', '2025-01-01 09:00:00', 16);",
    "starterSql": "-- 70. Databricks: Cluster Peak Capacity & Gap to Peak (MAX OVER)\n-- Output: cluster_name, log_hour, active_nodes, cluster_peak_nodes, nodes_below_peak\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT cluster_name, log_hour, active_nodes, MAX(active_nodes) OVER (PARTITION BY cluster_name) AS cluster_peak_nodes, (MAX(active_nodes) OVER (PARTITION BY cluster_name) - active_nodes) AS nodes_below_peak FROM cluster_logs ORDER BY cluster_name ASC, log_hour ASC;",
    "expectedColumns": [
      "cluster_name",
      "log_hour",
      "active_nodes",
      "cluster_peak_nodes",
      "nodes_below_peak"
    ],
    "hints": [
      "Compute MAX(active_nodes) OVER (PARTITION BY cluster_name) inside SELECT."
    ],
    "explanation": "MAX() and MIN() over partitions make peak/baseline comparisons effortless on time-series telemetry."
  },
  {
    "id": "basic-071",
    "number": 71,
    "title": "71. PayPal: Execution Order — WHERE Filters Rows BEFORE OVER() Runs",
    "difficulty": "Easy",
    "companies": [
      "PayPal",
      "Stripe"
    ],
    "topics": [
      "Window Functions",
      "WHERE",
      "SUM OVER",
      "PARTITION BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Core",
    "patternTag": "WHERE vs Window Evaluation Order",
    "description": "### Problem Statement\nSQL evaluates `WHERE` **before** window functions. Verify this by calculating each merchant's share of **settled** volume only—failed/refunded rows must be excluded in `WHERE` so they don't inflate `merchant_settled_total`.\n\n### Requirements\n- Filter `status = 'settled'` in `WHERE`.\n- Compute `merchant_settled_total` using `SUM(amount) OVER (PARTITION BY merchant)`.\n- Output columns: `txn_id`, `merchant`, `amount`, `merchant_settled_total`.\n- Sort by `merchant` ascending, `txn_id` ascending.\n\n### Input Schema\n**transactions** (txn_id INT, merchant VARCHAR, amount NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE transactions (txn_id INT PRIMARY KEY, merchant VARCHAR, amount NUMERIC, status VARCHAR(20));\nINSERT INTO transactions VALUES (1, 'Acme', 100.00, 'settled'), (2, 'Acme', 200.00, 'settled'), (3, 'Acme', 999.00, 'failed'), (4, 'Globex', 150.00, 'settled'), (5, 'Globex', 50.00, 'refunded');",
    "starterSql": "-- 71. PayPal: Execution Order — WHERE Filters Rows BEFORE OVER() Runs\n-- Output: txn_id, merchant, amount, merchant_settled_total\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT txn_id, merchant, amount, SUM(amount) OVER (PARTITION BY merchant) AS merchant_settled_total FROM transactions WHERE status = 'settled' ORDER BY merchant ASC, txn_id ASC;",
    "expectedColumns": [
      "txn_id",
      "merchant",
      "amount",
      "merchant_settled_total"
    ],
    "hints": [
      "Simply add WHERE status = 'settled'—SQL runs WHERE before computing the OVER() window."
    ],
    "explanation": "Because WHERE runs before window functions, failed rows are removed before SUM() OVER() sums the partition."
  },
  {
    "id": "basic-072",
    "number": 72,
    "title": "72. Amazon: Filtering Rows Using a Window Metric (CTE + Window)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Google"
    ],
    "topics": [
      "Window Functions",
      "CTEs",
      "AVG OVER"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Applied",
    "patternTag": "CTE Wrapping Window Filter",
    "description": "### Problem Statement\nWhile `WHERE` runs *before* window functions, you cannot write `WHERE price > AVG(price) OVER (...)` directly. Compute the window column inside a CTE first, then filter in the outer `WHERE`!\n\n### Requirements\n- CTE: select `product_name`, `category`, `price`, and `ROUND(AVG(price) OVER (PARTITION BY category), 2) AS cat_avg`.\n- Outer SELECT: filter `price > cat_avg`.\n- Output columns: `category`, `product_name`, `price`, `cat_avg`.\n- Sort by `category` ascending, `price` descending, `product_name` ascending.\n\n### Input Schema\n**products** (id INT, category VARCHAR, product_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), price NUMERIC);\nINSERT INTO products VALUES (1, 'Audio', 'Headphones', 250.00), (2, 'Audio', 'Earbuds', 50.00), (3, 'Audio', 'Speaker', 150.00), (4, 'Displays', 'OLED 4K', 800.00), (5, 'Displays', 'HD Monitor', 200.00);",
    "starterSql": "-- 72. Amazon: Filtering Rows Using a Window Metric (CTE + Window)\n-- Output: category, product_name, price, cat_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH with_avg AS (SELECT category, product_name, price, ROUND(AVG(price) OVER (PARTITION BY category), 2) AS cat_avg FROM products) SELECT category, product_name, price, cat_avg FROM with_avg WHERE price > cat_avg ORDER BY category ASC, price DESC, product_name ASC;",
    "expectedColumns": [
      "category",
      "product_name",
      "price",
      "cat_avg"
    ],
    "hints": [
      "Compute cat_avg inside a CTE, then write WHERE price > cat_avg outside."
    ],
    "explanation": "Since SQL prohibits window functions in WHERE, wrapping the window in a CTE is the universal pattern."
  },
  {
    "id": "basic-073",
    "number": 73,
    "title": "73. Shopify: Combining GROUP BY and SUM() OVER () in One Query",
    "difficulty": "Easy",
    "companies": [
      "Shopify",
      "Stripe"
    ],
    "topics": [
      "Window Functions",
      "GROUP BY",
      "SUM OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Applied",
    "patternTag": "GROUP BY + Window Combo",
    "description": "### Problem Statement\nWindow functions evaluate **after** `GROUP BY`! That means you can group raw orders by `category` to get `SUM(amount)`, and simultaneously divide by `SUM(SUM(amount)) OVER ()` to get each category's share of total revenue—all in one query.\n\n### Requirements\n- Group `orders` by `category`, computing `ROUND(SUM(amount), 2) AS cat_revenue`.\n- Compute `revenue_share_pct` = `ROUND(SUM(amount) * 100.0 / SUM(SUM(amount)) OVER (), 2)`.\n- Output columns: `category`, `cat_revenue`, `revenue_share_pct`.\n- Sort by `cat_revenue` descending, `category` ascending.\n\n### Input Schema\n**orders** (id INT, category VARCHAR, amount NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, category VARCHAR(40), amount NUMERIC);\nINSERT INTO orders VALUES (1, 'Electronics', 500.00), (2, 'Electronics', 300.00), (3, 'Apparel', 150.00), (4, 'Apparel', 50.00), (5, 'Home', 200.00);",
    "starterSql": "-- 73. Shopify: Combining GROUP BY and SUM() OVER () in One Query\n-- Output: category, cat_revenue, revenue_share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT category, ROUND(SUM(amount), 2) AS cat_revenue, ROUND(SUM(amount) * 100.0 / SUM(SUM(amount)) OVER (), 2) AS revenue_share_pct FROM orders GROUP BY category ORDER BY cat_revenue DESC, category ASC;",
    "expectedColumns": [
      "category",
      "cat_revenue",
      "revenue_share_pct"
    ],
    "hints": [
      "Yes, SUM(SUM(amount)) OVER () is valid SQL! The inner SUM runs during GROUP BY; the outer SUM() OVER () sums across all grouped rows."
    ],
    "explanation": "Because windowing runs after GROUP BY, SUM(SUM(col)) OVER () computes grand totals of grouped metrics without a CTE."
  },
  {
    "id": "basic-074",
    "number": 74,
    "title": "74. Salesforce: Multi-Column PARTITION BY (Region + Quarter) Quota Share",
    "difficulty": "Easy",
    "companies": [
      "Salesforce",
      "HubSpot"
    ],
    "topics": [
      "Window Functions",
      "PARTITION BY",
      "SUM OVER",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 7: Window Foundations (OVER & PARTITION)",
    "stageOrder": 7,
    "rampStep": "Applied",
    "patternTag": "Multi-Key PARTITION BY",
    "description": "### Problem Statement\nJust like `GROUP BY a, b`, `PARTITION BY` accepts multiple columns. Find sales reps whose closed deal total in a `(region, quarter)` accounts for **at least 50%** of that region-quarter's total bookings.\n\n### Requirements\n- CTE: compute `rq_total = SUM(deal_amount) OVER (PARTITION BY region, quarter)` and `share_pct = ROUND(deal_amount * 100.0 / SUM(deal_amount) OVER (PARTITION BY region, quarter), 2)`.\n- Outer SELECT: filter `share_pct >= 50.0`.\n- Output columns: `region`, `quarter`, `rep_name`, `deal_amount`, `share_pct`.\n- Sort by `quarter` ascending, `region` ascending, `share_pct` descending.\n\n### Input Schema\n**rep_deals** (id INT, region VARCHAR, quarter VARCHAR, rep_name VARCHAR, deal_amount NUMERIC)",
    "schemaSql": "CREATE TABLE rep_deals (id INT PRIMARY KEY, region VARCHAR(20), quarter VARCHAR(10), rep_name VARCHAR(40), deal_amount NUMERIC);\nINSERT INTO rep_deals VALUES (1, 'West', '2025-Q1', 'Nina', 60000), (2, 'West', '2025-Q1', 'Omar', 40000), (3, 'East', '2025-Q1', 'Liam', 30000), (4, 'East', '2025-Q1', 'Mia', 30000), (5, 'East', '2025-Q1', 'Noah', 40000);",
    "starterSql": "-- 74. Salesforce: Multi-Column PARTITION BY (Region + Quarter) Quota Share\n-- Output: region, quarter, rep_name, deal_amount, share_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH shares AS (SELECT region, quarter, rep_name, deal_amount, ROUND(deal_amount * 100.0 / SUM(deal_amount) OVER (PARTITION BY region, quarter), 2) AS share_pct FROM rep_deals) SELECT region, quarter, rep_name, deal_amount, share_pct FROM shares WHERE share_pct >= 50.0 ORDER BY quarter ASC, region ASC, share_pct DESC;",
    "expectedColumns": [
      "region",
      "quarter",
      "rep_name",
      "deal_amount",
      "share_pct"
    ],
    "hints": [
      "Separate multiple partition columns by comma: OVER (PARTITION BY region, quarter)."
    ],
    "explanation": "Multi-column PARTITION BY scopes window calculations to composite dimensions."
  },
  {
    "id": "basic-075",
    "number": 75,
    "title": "75. Spotify: Sequential Track Ranking with ROW_NUMBER()",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "YouTube"
    ],
    "topics": [
      "ROW_NUMBER",
      "Window Functions",
      "ORDER BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Warm-up",
    "patternTag": "ROW_NUMBER Basics",
    "description": "### Problem Statement\nAssign a strictly unique rank `1, 2, 3, ...` to tracks ordered from most streams to fewest streams using `ROW_NUMBER()`.\n\n### Requirements\n- Rank rows using a sequential row number within each group as `stream_rank`.\n- Output columns: `track_title`, `streams`, `stream_rank`.\n- Sort by `stream_rank` ascending.\n\n### Input Schema\n**tracks** (id INT, track_title VARCHAR, streams INT)",
    "schemaSql": "CREATE TABLE tracks (id INT PRIMARY KEY, track_title VARCHAR(60), streams INT);\nINSERT INTO tracks VALUES (1, 'Starlight', 950000), (2, 'Midnight Echo', 1200000), (3, 'Solar Drift', 780000), (4, 'Neon Pulse', 950000);",
    "starterSql": "-- 75. Spotify: Sequential Track Ranking with ROW_NUMBER()\n-- Output: track_title, streams, stream_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT track_title, streams, ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS stream_rank FROM tracks ORDER BY stream_rank ASC;",
    "expectedColumns": [
      "track_title",
      "streams",
      "stream_rank"
    ],
    "hints": [
      "Include id ASC inside OVER (ORDER BY streams DESC, id ASC) to break ties deterministically."
    ],
    "explanation": "Adding a unique secondary sort column inside ROW_NUMBER() prevents random tie ordering.",
    "conceptPrimer": {
      "title": "ROW_NUMBER(), RANK(), and DENSE_RANK()",
      "mentalModel": "Ranking window functions number sorted rows starting at 1. ROW_NUMBER() always produces unique numbers (1, 2, 3, 4). RANK() gives ties the same rank and skips numbers (1, 2, 2, 4). DENSE_RANK() gives ties the same rank without gaps (1, 2, 2, 3).",
      "syntaxTemplate": "SELECT\n  track_title,\n  streams,\n  ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS seq_rank\nFROM tracks;",
      "visualType": "window-ranking"
    },
    "blueprintSql": "SELECT\n  track_title,\n  streams,\n  ROW_NUMBER() OVER (ORDER BY streams DESC, id ASC) AS stream_rank\nFROM tracks\nORDER BY stream_rank ASC;"
  },
  {
    "id": "basic-076",
    "number": 76,
    "title": "76. Duolingo: Comparing ROW_NUMBER vs RANK vs DENSE_RANK on Exact Ties",
    "difficulty": "Easy",
    "companies": [
      "Duolingo",
      "Kaggle"
    ],
    "topics": [
      "ROW_NUMBER",
      "RANK",
      "DENSE_RANK",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Warm-up",
    "patternTag": "Ranking Tie Behavior Comparison",
    "description": "### Problem Statement\nSee the difference between all three ranking functions side-by-side on a leaderboard with tied XP scores!\n\n### Requirements\n- For each player, compute:\n - `rn` = a sequential row number within each group\n - `rnk` = a rank within each group\n - `drnk` = a dense rank within each group\n- Output columns: `player_name`, `xp`, `rn`, `rnk`, `drnk`.\n- Sort by `rn` ascending.\n\n### Input Schema\n**league_scores** (id INT, player_name VARCHAR, xp INT)",
    "schemaSql": "CREATE TABLE league_scores (id INT PRIMARY KEY, player_name VARCHAR(40), xp INT);\nINSERT INTO league_scores VALUES (1, 'Aria', 1500), (2, 'Ben', 1200), (3, 'Chloe', 1200), (4, 'Dan', 950);",
    "starterSql": "-- 76. Duolingo: Comparing ROW_NUMBER vs RANK vs DENSE_RANK on Exact Ties\n-- Output: player_name, xp, rn, rnk, drnk\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT player_name, xp, ROW_NUMBER() OVER (ORDER BY xp DESC, player_name ASC) AS rn, RANK() OVER (ORDER BY xp DESC) AS rnk, DENSE_RANK() OVER (ORDER BY xp DESC) AS drnk FROM league_scores ORDER BY rn ASC;",
    "expectedColumns": [
      "player_name",
      "xp",
      "rn",
      "rnk",
      "drnk"
    ],
    "hints": [
      "Do not include player_name inside RANK/DENSE_RANK ORDER BY—otherwise tied XP scores wouldn't tie!"
    ],
    "explanation": "Notice Ben & Chloe both get rnk=2 and drnk=2, while Dan gets rnk=4 (gap!) vs drnk=3 (no gap!)."
  },
  {
    "id": "basic-077",
    "number": 77,
    "title": "77. Netflix: Ranking Shows Within Each Genre (PARTITION BY + DENSE_RANK)",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Spotify"
    ],
    "topics": [
      "DENSE_RANK",
      "PARTITION BY",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Core",
    "patternTag": "Partitioned Ranking",
    "description": "### Problem Statement\nRank TV shows independently inside each `genre` from highest rating to lowest using `DENSE_RANK()`, returning **all** shows and their within-genre rank.\n\n### Requirements\n- Compute `genre_rank` = a dense rank within each group.\n- Output columns: `genre`, `show_title`, `rating`, `genre_rank`.\n- Sort by `genre` ascending, `genre_rank` ascending, `show_title` ascending.\n\n### Input Schema\n**shows** (id INT, genre VARCHAR, show_title VARCHAR, rating NUMERIC)",
    "schemaSql": "CREATE TABLE shows (id INT PRIMARY KEY, genre VARCHAR(30), show_title VARCHAR(60), rating NUMERIC);\nINSERT INTO shows VALUES (1, 'Sci-Fi', 'Dark', 9.4), (2, 'Sci-Fi', 'Severance', 9.4), (3, 'Sci-Fi', 'Foundation', 8.5), (4, 'Drama', 'Succession', 9.2), (5, 'Drama', 'The Bear', 8.9);",
    "starterSql": "-- 77. Netflix: Ranking Shows Within Each Genre (PARTITION BY + DENSE_RANK)\n-- Output: genre, show_title, rating, genre_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT genre, show_title, rating, DENSE_RANK() OVER (PARTITION BY genre ORDER BY rating DESC) AS genre_rank FROM shows ORDER BY genre ASC, genre_rank ASC, show_title ASC;",
    "expectedColumns": [
      "genre",
      "show_title",
      "rating",
      "genre_rank"
    ],
    "hints": [
      "Add PARTITION BY genre inside OVER (...) so rankings restart at 1 for each genre."
    ],
    "explanation": "PARTITION BY restarts the ranking counter for every distinct group."
  },
  {
    "id": "basic-078",
    "number": 78,
    "title": "78. Amazon: Highest-Priced Product per Category (CTE + ROW_NUMBER)",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Target"
    ],
    "topics": [
      "ROW_NUMBER",
      "CTEs",
      "PARTITION BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Core",
    "patternTag": "Top-1 per Group (ROW_NUMBER)",
    "description": "### Problem Statement\nNow combine **Stage 6 (CTEs)** with **Stage 8 (Ranking)**! Find the single most expensive product in each category (break price ties alphabetically by `product_name` ascending).\n\n### Requirements\n- Rank products per `category` inside a CTE using `ROW_NUMBER()`.\n- Filter `WHERE rn = 1` in the outer query.\n- Output columns: `category`, `product_name`, `price`.\n- Sort by `category` ascending.\n\n### Input Schema\n**products** (id INT, category VARCHAR, product_name VARCHAR, price NUMERIC)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), price NUMERIC);\nINSERT INTO products VALUES (1, 'Audio', 'Studio Headphones', 350.00), (2, 'Audio', 'Bluetooth Speaker', 120.00), (3, 'Monitors', 'Pro Display', 900.00), (4, 'Monitors', 'Gaming Monitor', 900.00), (5, 'Monitors', 'Office Screen', 250.00);",
    "starterSql": "-- 78. Amazon: Highest-Priced Product per Category (CTE + ROW_NUMBER)\n-- Output: category, product_name, price\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT category, product_name, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC, product_name ASC) AS rn FROM products) SELECT category, product_name, price FROM ranked WHERE rn = 1 ORDER BY category ASC;",
    "expectedColumns": [
      "category",
      "product_name",
      "price"
    ],
    "hints": [
      "You cannot filter ROW_NUMBER() in WHERE directly—wrap it in a CTE first and filter WHERE rn = 1."
    ],
    "explanation": "CTE + ROW_NUMBER() + WHERE rn = 1 is the canonical Top-1-per-group interview pattern.",
    "blueprintSql": "WITH ranked AS (\n  SELECT\n    category,\n    product_name,\n    price,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC, product_name ASC) AS rn\n  FROM products\n)\nSELECT category, product_name, price\nFROM ranked\nWHERE rn = 1\nORDER BY category ASC;"
  },
  {
    "id": "basic-079",
    "number": 79,
    "title": "79. Amazon: Top 2 Products per Category Preserving Ties (CTE + DENSE_RANK)",
    "difficulty": "Easy",
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
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Core",
    "patternTag": "Top-N with Ties (DENSE_RANK)",
    "description": "### Problem Statement\nFind the top 2 highest-revenue products per category. If two products tie for 1st or 2nd place, **include all tied products** without skipping subsequent ranks!\n\n### Requirements\n- Rank within each `category_name` ordered by `revenue` descending using `DENSE_RANK()` inside a CTE.\n- Filter for `revenue_rank <= 2`.\n- Output columns: `category_name`, `product_name`, `revenue`, `revenue_rank`.\n- Sort by `category_name` ascending, `revenue_rank` ascending, `product_name` ascending.\n\n### Input Schema\n**products** (id INT, category_name VARCHAR, product_name VARCHAR, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE products (id INT PRIMARY KEY, category_name VARCHAR(40), product_name VARCHAR(60), revenue NUMERIC);\nINSERT INTO products VALUES (101, 'Electronics', 'Echo Dot', 150000.00), (102, 'Electronics', 'Fire Stick 4K', 150000.00), (103, 'Electronics', 'Kindle Paperwhite', 110000.00), (104, 'Electronics', 'Echo Show', 90000.00), (105, 'Kitchen', 'Air Fryer XL', 85000.00), (106, 'Kitchen', 'Instant Pot Duo', 75000.00), (107, 'Kitchen', 'Blender Pro', 60000.00);",
    "starterSql": "-- 79. Amazon: Top 2 Products per Category Preserving Ties (CTE + DENSE_RANK)\n-- Output: category_name, product_name, revenue, revenue_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT category_name, product_name, revenue, DENSE_RANK() OVER (PARTITION BY category_name ORDER BY revenue DESC) AS revenue_rank FROM products) SELECT category_name, product_name, revenue, revenue_rank FROM ranked WHERE revenue_rank <= 2 ORDER BY category_name ASC, revenue_rank ASC, product_name ASC;",
    "expectedColumns": [
      "category_name",
      "product_name",
      "revenue",
      "revenue_rank"
    ],
    "hints": [
      "Use DENSE_RANK() (not RANK() or ROW_NUMBER()) so Echo Dot & Fire Stick tie at 1 and Kindle gets rank 2."
    ],
    "explanation": "DENSE_RANK() guarantees that ties never cause 2nd place to disappear when filtering rank <= 2."
  },
  {
    "id": "basic-080",
    "number": 80,
    "title": "80. Google: Finding the 2nd Highest Salary in Each Department",
    "difficulty": "Easy",
    "companies": [
      "Google",
      "Meta"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "PARTITION BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Core",
    "patternTag": "Nth Highest per Group",
    "description": "### Problem Statement\nA classic SQL interview favorite: find the employee(s) earning the **2nd highest distinct salary** in each department.\n\n### Requirements\n- Use a dense rank within each group inside a CTE.\n- Filter `WHERE sal_rank = 2`.\n- Output columns: `department`, `employee_name`, `salary`.\n- Sort by `department` ascending, `employee_name` ascending.\n\n### Input Schema\n**employees** (id INT, department VARCHAR, employee_name VARCHAR, salary INT)",
    "schemaSql": "CREATE TABLE employees (id INT PRIMARY KEY, department VARCHAR(30), employee_name VARCHAR(40), salary INT);\nINSERT INTO employees VALUES (1, 'Eng', 'Alice', 200000), (2, 'Eng', 'Bob', 200000), (3, 'Eng', 'Carol', 175000), (4, 'Eng', 'Dave', 150000), (5, 'Sales', 'Eve', 140000), (6, 'Sales', 'Frank', 120000), (7, 'Sales', 'Grace', 120000);",
    "starterSql": "-- 80. Google: Finding the 2nd Highest Salary in Each Department\n-- Output: department, employee_name, salary\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT department, employee_name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS sal_rank FROM employees) SELECT department, employee_name, salary FROM ranked WHERE sal_rank = 2 ORDER BY department ASC, employee_name ASC;",
    "expectedColumns": [
      "department",
      "employee_name",
      "salary"
    ],
    "hints": [
      "With DENSE_RANK(), Alice & Bob tie at rank 1, so Carol correctly receives rank 2."
    ],
    "explanation": "DENSE_RANK() solves Nth-highest-per-group cleanly even when the top value is tied."
  },
  {
    "id": "basic-081",
    "number": 81,
    "title": "81. Stripe: Keeping Only the Latest Webhook Status per Order (Deduplication)",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "topics": [
      "ROW_NUMBER",
      "Deduplication",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Applied",
    "patternTag": "Latest-Row Deduplication",
    "description": "### Problem Statement\nWebhook retries emit multiple status snapshots for the same `order_id`. Deduplicate the table so only the single most recent event (`event_time DESC`) remains per `order_id`.\n\n### Requirements\n- Use a sequential row number within each group inside a CTE.\n- Keep only `rn = 1`.\n- Output columns: `order_id`, `status`, `event_time`.\n- Sort by `order_id` ascending.\n\n### Input Schema\n**webhook_events** (id INT, order_id INT, status VARCHAR, event_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE webhook_events (id INT PRIMARY KEY, order_id INT, status VARCHAR(20), event_time TIMESTAMP);\nINSERT INTO webhook_events VALUES (1, 501, 'pending', '2025-01-01 10:00:00'), (2, 501, 'paid', '2025-01-01 10:02:00'), (3, 502, 'pending', '2025-01-01 11:00:00'), (4, 502, 'failed', '2025-01-01 11:05:00'), (5, 503, 'paid', '2025-01-01 12:00:00');",
    "starterSql": "-- 81. Stripe: Keeping Only the Latest Webhook Status per Order (Deduplication)\n-- Output: order_id, status, event_time\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH latest AS (SELECT order_id, status, event_time, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY event_time DESC, id DESC) AS rn FROM webhook_events) SELECT order_id, status, event_time FROM latest WHERE rn = 1 ORDER BY order_id ASC;",
    "expectedColumns": [
      "order_id",
      "status",
      "event_time"
    ],
    "hints": [
      "Order by event_time DESC inside ROW_NUMBER() so the newest snapshot gets rn = 1."
    ],
    "explanation": "ROW_NUMBER() = 1 partitioned by business key is the workhorse deduplication pattern in data engineering."
  },
  {
    "id": "basic-082",
    "number": 82,
    "title": "82. Uber: Fastest 2 Pickup Times per Metro Area (Ascending Rank)",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "ROW_NUMBER",
      "CTEs",
      "PARTITION BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Applied",
    "patternTag": "Bottom-N / Fastest-N per Group",
    "description": "### Problem Statement\nFind the 2 fastest pickup wait times (`wait_minutes ASC`) in each city.\n\n### Requirements\n- Partition by `city` and order by `wait_minutes ASC, driver_name` ascending using `ROW_NUMBER()`.\n- Return rows with `rn <= 2`.\n- Output columns: `city`, `driver_name`, `wait_minutes`.\n- Sort by `city` ascending, `wait_minutes` ascending, `driver_name` ascending.\n\n### Input Schema\n**pickups** (id INT, city VARCHAR, driver_name VARCHAR, wait_minutes INT)",
    "schemaSql": "CREATE TABLE pickups (id INT PRIMARY KEY, city VARCHAR(30), driver_name VARCHAR(40), wait_minutes INT);\nINSERT INTO pickups VALUES (1, 'Chicago', 'Sam', 4), (2, 'Chicago', 'Tariq', 2), (3, 'Chicago', 'Uma', 7), (4, 'Boston', 'Victor', 3), (5, 'Boston', 'Wendy', 5), (6, 'Boston', 'Xander', 2);",
    "starterSql": "-- 82. Uber: Fastest 2 Pickup Times per Metro Area (Ascending Rank)\n-- Output: city, driver_name, wait_minutes\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ranked AS (SELECT city, driver_name, wait_minutes, ROW_NUMBER() OVER (PARTITION BY city ORDER BY wait_minutes ASC, driver_name ASC) AS rn FROM pickups) SELECT city, driver_name, wait_minutes FROM ranked WHERE rn <= 2 ORDER BY city ASC, wait_minutes ASC, driver_name ASC;",
    "expectedColumns": [
      "city",
      "driver_name",
      "wait_minutes"
    ],
    "hints": [
      "Flip ORDER BY inside OVER (...) to ASC when looking for smallest/fastest values."
    ],
    "explanation": "Top-N and Bottom-N per group differ only in DESC vs ASC inside the window's ORDER BY."
  },
  {
    "id": "basic-083",
    "number": 83,
    "title": "83. Etsy: Segmenting Shop Revenue into Quartiles with NTILE(4)",
    "difficulty": "Easy",
    "companies": [
      "Etsy",
      "Shopify"
    ],
    "topics": [
      "NTILE",
      "Window Functions",
      "GROUP BY"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Core",
    "patternTag": "Quartile Bucketing (NTILE)",
    "description": "### Problem Statement\nEtsy Seller Analytics groups shops into 4 equal-sized revenue quartiles (`1` = highest quartile, `4` = lowest quartile).\n\n### Requirements\n- Sum `order_amount` per `shop_name` as `total_revenue`.\n- Assign `revenue_quartile` using `NTILE(4) OVER (ORDER BY SUM(order_amount) DESC, shop_name ASC)`.\n- Output columns: `shop_name`, `total_revenue`, `revenue_quartile`.\n- Sort by `revenue_quartile` ascending, `total_revenue` descending, `shop_name` ascending.\n\n### Input Schema\n**shop_orders** (id INT, shop_name VARCHAR, order_amount NUMERIC)",
    "schemaSql": "CREATE TABLE shop_orders (id INT PRIMARY KEY, shop_name VARCHAR(40), order_amount NUMERIC);\nINSERT INTO shop_orders VALUES (1, 'Clay Studio', 800), (2, 'Clay Studio', 400), (3, 'Linen Loom', 950), (4, 'Woodcraft', 600), (5, 'Candle Co', 300), (6, 'Paper Press', 200), (7, 'Bead Box', 150), (8, 'Moss Art', 500), (9, 'Brass Works', 700);",
    "starterSql": "-- 83. Etsy: Segmenting Shop Revenue into Quartiles with NTILE(4)\n-- Output: shop_name, total_revenue, revenue_quartile\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT shop_name, SUM(order_amount) AS total_revenue, NTILE(4) OVER (ORDER BY SUM(order_amount) DESC, shop_name ASC) AS revenue_quartile FROM shop_orders GROUP BY shop_name ORDER BY revenue_quartile ASC, total_revenue DESC, shop_name ASC;",
    "expectedColumns": [
      "shop_name",
      "total_revenue",
      "revenue_quartile"
    ],
    "hints": [
      "Remember NTILE(4) runs after GROUP BY, so you can write ORDER BY SUM(order_amount) DESC inside OVER (...)."
    ],
    "explanation": "NTILE(n) divides sorted rows into n roughly equal buckets (quartiles, quintiles, deciles)."
  },
  {
    "id": "basic-084",
    "number": 84,
    "title": "84. Uber: Driver Weekly Fare Percentile Ranking (PERCENT_RANK)",
    "difficulty": "Easy",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "topics": [
      "PERCENT_RANK",
      "ROUND",
      "PARTITION BY",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)",
    "stageOrder": 8,
    "rampStep": "Applied",
    "patternTag": "Percentile Ranking",
    "description": "### Problem Statement\nCompute each driver's relative percentile standing (`0.00` to `100.00`) within their `metro_area` using `PERCENT_RANK()`.\n\n### Requirements\n- Compute `fare_percentile` = `ROUND(PERCENT_RANK() OVER (PARTITION BY metro_area ORDER BY weekly_fares ASC) * 100.0, 2)`.\n- Output columns: `metro_area`, `driver_name`, `weekly_fares`, `fare_percentile`.\n- Sort by `metro_area` ascending, `weekly_fares` descending, `driver_name` ascending.\n\n### Input Schema\n**driver_earnings** (id INT, metro_area VARCHAR, driver_name VARCHAR, weekly_fares NUMERIC)",
    "schemaSql": "CREATE TABLE driver_earnings (id INT PRIMARY KEY, metro_area VARCHAR(50), driver_name VARCHAR(50), weekly_fares NUMERIC);\nINSERT INTO driver_earnings VALUES (1, 'Dallas', 'Carlos R.', 1450.00), (2, 'Dallas', 'Sarah B.', 1200.00), (3, 'Dallas', 'Kevin L.', 950.00), (4, 'Dallas', 'Anita K.', 800.00), (5, 'Austin', 'David P.', 1800.00), (6, 'Austin', 'Maria T.', 1500.00), (7, 'Austin', 'James H.', 1100.00);",
    "starterSql": "-- 84. Uber: Driver Weekly Fare Percentile Ranking (PERCENT_RANK)\n-- Output: metro_area, driver_name, weekly_fares, fare_percentile\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT metro_area, driver_name, weekly_fares, ROUND(PERCENT_RANK() OVER (PARTITION BY metro_area ORDER BY weekly_fares ASC)::NUMERIC * 100.0, 2) AS fare_percentile FROM driver_earnings ORDER BY metro_area ASC, weekly_fares DESC, driver_name ASC;",
    "expectedColumns": [
      "metro_area",
      "driver_name",
      "weekly_fares",
      "fare_percentile"
    ],
    "hints": [
      "PERCENT_RANK() returns DOUBLE PRECISION in PostgreSQL—cast ::NUMERIC before ROUND(..., 2)."
    ],
    "explanation": "PERCENT_RANK() computes (rank - 1) / (total_rows - 1), normalizing distributions between 0% and 100%."
  },
  {
    "id": "basic-085",
    "number": 85,
    "title": "85. Stripe: Viewing Yesterday's Revenue Side-by-Side with LAG()",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Shopify"
    ],
    "topics": [
      "LAG",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Warm-up",
    "patternTag": "LAG() Side-by-Side Intro",
    "description": "### Problem Statement\nWrite your first `LAG()` query! For each calendar day, display that day's revenue alongside the previous recorded day's revenue (`NULL` on the very first day).\n\n### Requirements\n- Use `LAG(revenue, 1) OVER (ORDER BY sale_date ASC)` as `prev_revenue`.\n- Output columns: `sale_date`, `revenue`, `prev_revenue`.\n- Sort by `sale_date` ascending.\n\n### Input Schema\n**daily_sales** (sale_date DATE, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE daily_sales (sale_date DATE PRIMARY KEY, revenue NUMERIC);\nINSERT INTO daily_sales VALUES ('2025-01-01', 1200.00), ('2025-01-02', 1500.00), ('2025-01-03', 1350.00), ('2025-01-04', 1900.00);",
    "starterSql": "-- 85. Stripe: Viewing Yesterday's Revenue Side-by-Side with LAG()\n-- Output: sale_date, revenue, prev_revenue\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT sale_date, revenue, LAG(revenue, 1) OVER (ORDER BY sale_date ASC) AS prev_revenue FROM daily_sales ORDER BY sale_date ASC;",
    "expectedColumns": [
      "sale_date",
      "revenue",
      "prev_revenue"
    ],
    "hints": [
      "LAG requires an ORDER BY inside OVER (...) so SQL knows which row comes before which."
    ],
    "explanation": "LAG(col, 1) fetches the prior row's value cleanly in one pass without any self-join.",
    "conceptPrimer": {
      "title": "Looking Backwards & Forwards with LAG() / LEAD()",
      "mentalModel": "LAG(col, 1) grabs the value from 1 row earlier in your sorted window; LEAD(col, 1) grabs 1 row ahead. When there is no previous row (the very first row), LAG() returns NULL unless you pass a 3rd default argument like LAG(col, 1, 0).",
      "syntaxTemplate": "SELECT\n  day_date,\n  revenue,\n  LAG(revenue, 1) OVER (ORDER BY day_date ASC) AS prev_day_revenue\nFROM daily_sales;",
      "visualType": "lag-lead"
    },
    "blueprintSql": "SELECT\n  sale_date,\n  revenue,\n  LAG(revenue, 1) OVER (ORDER BY sale_date ASC) AS prev_revenue\nFROM daily_sales\nORDER BY sale_date ASC;"
  },
  {
    "id": "basic-086",
    "number": 86,
    "title": "86. Spotify: Day-Over-Day Stream Delta with Default Fallback",
    "difficulty": "Easy",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "topics": [
      "LAG",
      "COALESCE",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Warm-up",
    "patternTag": "LAG() Delta Calculation",
    "description": "### Problem Statement\nCompute the day-over-day stream change (`current - previous`) per artist. On an artist's first recorded day (no previous day), output `0` as `stream_delta`.\n\n### Requirements\n- Partition by `artist_name` and order by `stream_date` ascending.\n- Compute `stream_delta` = `stream_count - COALESCE(LAG(stream_count) OVER (PARTITION BY artist_name ORDER BY stream_date ASC), stream_count)` (or `LAG(stream_count, 1, stream_count)`).\n- Output columns: `artist_name`, `stream_date`, `stream_count`, `stream_delta`.\n- Sort by `artist_name` ascending, `stream_date` ascending.\n\n### Input Schema\n**daily_streams** (id INT, artist_name VARCHAR, stream_date DATE, stream_count INT)",
    "schemaSql": "CREATE TABLE daily_streams (id INT PRIMARY KEY, artist_name VARCHAR(50), stream_date DATE, stream_count INT);\nINSERT INTO daily_streams VALUES (1, 'Taylor Swift', '2025-01-01', 4500000), (2, 'Taylor Swift', '2025-01-02', 4850000), (3, 'Taylor Swift', '2025-01-03', 5200000), (4, 'Drake', '2025-01-01', 3800000), (5, 'Drake', '2025-01-02', 3600000), (6, 'Drake', '2025-01-03', 4100000);",
    "starterSql": "-- 86. Spotify: Day-Over-Day Stream Delta with Default Fallback\n-- Output: artist_name, stream_date, stream_count, stream_delta\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT artist_name, stream_date, stream_count, (stream_count - LAG(stream_count, 1, stream_count) OVER (PARTITION BY artist_name ORDER BY stream_date ASC)) AS stream_delta FROM daily_streams ORDER BY artist_name ASC, stream_date ASC;",
    "expectedColumns": [
      "artist_name",
      "stream_date",
      "stream_count",
      "stream_delta"
    ],
    "hints": [
      "Passing stream_count as the 3rd argument to LAG(stream_count, 1, stream_count) makes current - prior = 0 on day 1!"
    ],
    "explanation": "The optional 3rd parameter in LAG(col, offset, default) sets a fallback when no prior row exists in the partition."
  },
  {
    "id": "basic-087",
    "number": 87,
    "title": "87. Robinhood: Stock Closing Price Jump Over Previous Trading Day",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "Bloomberg"
    ],
    "topics": [
      "LAG",
      "PARTITION BY",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Core",
    "patternTag": "Partitioned LAG Filter",
    "description": "### Problem Statement\nFind all trading days where a stock's closing price jumped by strictly more than $10 compared to that same ticker's prior trading day.\n\n### Requirements\n- CTE: compute `prev_close = LAG(close_price) OVER (PARTITION BY ticker ORDER BY trade_date ASC)`.\n- Outer SELECT: filter `prev_close IS NOT NULL AND (close_price - prev_close) > 10`.\n- Output columns: `ticker`, `trade_date`, `prev_close`, `close_price`, `price_jump`.\n- Sort by `ticker` ascending, `trade_date` ascending.\n\n### Input Schema\n**stock_prices** (id INT, ticker VARCHAR, trade_date DATE, close_price NUMERIC)",
    "schemaSql": "CREATE TABLE stock_prices (id INT PRIMARY KEY, ticker VARCHAR(10), trade_date DATE, close_price NUMERIC);\nINSERT INTO stock_prices VALUES (1, 'AAPL', '2025-01-02', 185.00), (2, 'AAPL', '2025-01-03', 198.00), (3, 'AAPL', '2025-01-06', 202.00), (4, 'NVDA', '2025-01-02', 130.00), (5, 'NVDA', '2025-01-03', 128.00), (6, 'NVDA', '2025-01-06', 145.00);",
    "starterSql": "-- 87. Robinhood: Stock Closing Price Jump Over Previous Trading Day\n-- Output: ticker, trade_date, prev_close, close_price, price_jump\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH with_prev AS (SELECT ticker, trade_date, close_price, LAG(close_price) OVER (PARTITION BY ticker ORDER BY trade_date ASC) AS prev_close FROM stock_prices) SELECT ticker, trade_date, prev_close, close_price, (close_price - prev_close) AS price_jump FROM with_prev WHERE prev_close IS NOT NULL AND (close_price - prev_close) > 10 ORDER BY ticker ASC, trade_date ASC;",
    "expectedColumns": [
      "ticker",
      "trade_date",
      "prev_close",
      "close_price",
      "price_jump"
    ],
    "hints": [
      "Wrap LAG() inside a CTE so you can filter WHERE (close_price - prev_close) > 10 outside."
    ],
    "explanation": "Partitioning LAG() by ticker prevents Apple's last price from bleeding into Nvidia's first row."
  },
  {
    "id": "basic-088",
    "number": 88,
    "title": "88. Expedia: Peeking at Next Quoted Airfare with LEAD()",
    "difficulty": "Easy",
    "companies": [
      "Expedia",
      "Booking.com"
    ],
    "topics": [
      "LEAD",
      "PARTITION BY",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Warm-up",
    "patternTag": "LEAD() Forward Peek",
    "description": "### Problem Statement\nExpedia Price Tracker monitors sequential flight fare snapshots. For each route snapshot, show the **next** recorded price using `LEAD()` and calculate whether the fare rose or dropped next.\n\n### Requirements\n- Compute `next_price = LEAD(price) OVER (PARTITION BY route ORDER BY checked_at ASC)`.\n- Compute `next_change = next_price - price` (leaves `NULL` on the last snapshot).\n- Output columns: `route`, `checked_at`, `price`, `next_price`, `next_change`.\n- Sort by `route` ascending, `checked_at` ascending.\n\n### Input Schema\n**fare_checks** (id INT, route VARCHAR, checked_at TIMESTAMP, price NUMERIC)",
    "schemaSql": "CREATE TABLE fare_checks (id INT PRIMARY KEY, route VARCHAR(20), checked_at TIMESTAMP, price NUMERIC);\nINSERT INTO fare_checks VALUES (1, 'JFK-LAX', '2025-01-01 08:00:00', 320.00), (2, 'JFK-LAX', '2025-01-01 12:00:00', 360.00), (3, 'JFK-LAX', '2025-01-01 18:00:00', 290.00), (4, 'SFO-ORD', '2025-01-01 09:00:00', 240.00), (5, 'SFO-ORD', '2025-01-01 15:00:00', 265.00);",
    "starterSql": "-- 88. Expedia: Peeking at Next Quoted Airfare with LEAD()\n-- Output: route, checked_at, price, next_price, next_change\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT route, checked_at, price, LEAD(price, 1) OVER (PARTITION BY route ORDER BY checked_at ASC) AS next_price, (LEAD(price, 1) OVER (PARTITION BY route ORDER BY checked_at ASC) - price) AS next_change FROM fare_checks ORDER BY route ASC, checked_at ASC;",
    "expectedColumns": [
      "route",
      "checked_at",
      "price",
      "next_price",
      "next_change"
    ],
    "hints": [
      "LEAD(price, 1) looks 1 row forward in the ordered partition."
    ],
    "explanation": "LEAD() inspects future states without self-joins, ideal for funnel next-step and price-drop alerts."
  },
  {
    "id": "basic-089",
    "number": 89,
    "title": "89. Instacart: Days Elapsed Between Consecutive Customer Orders",
    "difficulty": "Easy",
    "companies": [
      "Instacart",
      "DoorDash"
    ],
    "topics": [
      "LAG",
      "Date Arithmetic",
      "CTEs"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Core",
    "patternTag": "Inter-Event Time Gap",
    "description": "### Problem Statement\nInstacart Retention measures reorder cadence. For each repeat order (skipping a customer's 1st order), calculate how many days passed since their previous order.\n\n### Requirements\n- CTE: compute `prev_order_date = LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC)`.\n- Outer SELECT: keep rows where `prev_order_date` is present and compute `days_since_prev = (order_date - prev_order_date)`.\n- Output columns: `customer_id`, `prev_order_date`, `order_date`, `days_since_prev`.\n- Sort by `customer_id` ascending, `order_date` ascending.\n\n### Input Schema\n**orders** (id INT, customer_id INT, order_date DATE)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, order_date DATE);\nINSERT INTO orders VALUES (1, 101, '2025-01-01'), (2, 101, '2025-01-08'), (3, 101, '2025-01-20'), (4, 102, '2025-01-05'), (5, 102, '2025-01-19'), (6, 103, '2025-01-10');",
    "starterSql": "-- 89. Instacart: Days Elapsed Between Consecutive Customer Orders\n-- Output: customer_id, prev_order_date, order_date, days_since_prev\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT customer_id, order_date, LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS prev_order_date FROM orders) SELECT customer_id, prev_order_date, order_date, (order_date - prev_order_date) AS days_since_prev FROM lagged WHERE prev_order_date IS NOT NULL ORDER BY customer_id ASC, order_date ASC;",
    "expectedColumns": [
      "customer_id",
      "prev_order_date",
      "order_date",
      "days_since_prev"
    ],
    "hints": [
      "In PostgreSQL, subtracting two DATE values directly returns an integer count of days!"
    ],
    "explanation": "LAG(date) plus date subtraction measures user cadence and inactivity gaps effortlessly."
  },
  {
    "id": "basic-090",
    "number": 90,
    "title": "90. Apple: Month-Over-Month App Revenue Growth % (CTE + LAG + NULLIF)",
    "difficulty": "Easy",
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
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Core",
    "patternTag": "MoM Growth % (LAG + NULLIF)",
    "description": "### Problem Statement\nCompute the Month-over-Month (MoM) revenue growth percentage for each mobile app, safely handling first months (`NULL`) and zero prior-month revenue (`NULLIF`).\n\n### Requirements\n- CTE: fetch `prev_revenue = LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC)`.\n- Outer SELECT: compute `mom_growth_pct` = `ROUND((current_revenue - prev_revenue) * 100.0 / prev_revenue (returning null if 0), 2)`.\n- Output columns: `app_name`, `report_month`, `current_revenue`, `prev_revenue`, `mom_growth_pct`.\n- Sort by `app_name` ascending, `report_month` ascending.\n\n### Input Schema\n**monthly_game_revenue** (id INT, app_name VARCHAR, report_month DATE, revenue NUMERIC)",
    "schemaSql": "CREATE TABLE monthly_game_revenue (id INT PRIMARY KEY, app_name VARCHAR(50), report_month DATE, revenue NUMERIC);\nINSERT INTO monthly_game_revenue VALUES (1, 'Gigi Rush', '2024-01-01', 50000.00), (2, 'Gigi Rush', '2024-02-01', 65000.00), (3, 'Gigi Rush', '2024-03-01', 72000.00), (4, 'Puzzle Master', '2024-01-01', 0.00), (5, 'Puzzle Master', '2024-02-01', 18000.00), (6, 'Puzzle Master', '2024-03-01', 22500.00);",
    "starterSql": "-- 90. Apple: Month-Over-Month App Revenue Growth % (CTE + LAG + NULLIF)\n-- Output: app_name, report_month, current_revenue, prev_revenue, mom_growth_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH lagged AS (SELECT app_name, report_month, revenue AS current_revenue, LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC) AS prev_revenue FROM monthly_game_revenue) SELECT app_name, report_month, current_revenue, prev_revenue, ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS mom_growth_pct FROM lagged ORDER BY app_name ASC, report_month ASC;",
    "expectedColumns": [
      "app_name",
      "report_month",
      "current_revenue",
      "prev_revenue",
      "mom_growth_pct"
    ],
    "hints": [
      "Wrap prev_revenue inside NULLIF(prev_revenue, 0) so Puzzle Master's $0 month doesn't trigger division by zero."
    ],
    "explanation": "CTE + LAG + NULLIF is the standard formula for MoM/YoY percentage growth.",
    "blueprintSql": "WITH lagged AS (\n  SELECT\n    app_name,\n    report_month,\n    revenue AS current_revenue,\n    LAG(revenue) OVER (PARTITION BY app_name ORDER BY report_month ASC) AS prev_revenue\n  FROM monthly_game_revenue\n)\nSELECT\n  app_name,\n  report_month,\n  current_revenue,\n  prev_revenue,\n  ROUND((current_revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS mom_growth_pct\nFROM lagged\nORDER BY app_name ASC, report_month ASC;"
  },
  {
    "id": "basic-091",
    "number": 91,
    "title": "91. Slack: Detecting Plan Upgrades Between Consecutive Billing Cycles",
    "difficulty": "Easy",
    "companies": [
      "Slack",
      "Notion"
    ],
    "topics": [
      "LAG",
      "CTEs",
      "WHERE"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Applied",
    "patternTag": "State Transition Detection",
    "description": "### Problem Statement\nSlack Monetization tracks workspace upgrades from `'Free'` directly to `'Pro'` or `'Enterprise'`. Find every billing record where a workspace switched from `'Free'` in the previous month to a paid tier in the current month.\n\n### Requirements\n- CTE: use `LAG(plan_tier) OVER (PARTITION BY workspace_id ORDER BY bill_month ASC)` as `prev_tier`.\n- Filter `prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise')`.\n- Output columns: `workspace_id`, `bill_month`, `prev_tier`, `plan_tier`.\n- Sort by `workspace_id` ascending, `bill_month` ascending.\n\n### Input Schema\n**billing_snapshots** (id INT, workspace_id INT, bill_month DATE, plan_tier VARCHAR)",
    "schemaSql": "CREATE TABLE billing_snapshots (id INT PRIMARY KEY, workspace_id INT, bill_month DATE, plan_tier VARCHAR(20));\nINSERT INTO billing_snapshots VALUES (1, 10, '2025-01-01', 'Free'), (2, 10, '2025-02-01', 'Pro'), (3, 10, '2025-03-01', 'Enterprise'), (4, 20, '2025-01-01', 'Pro'), (5, 20, '2025-02-01', 'Free'), (6, 20, '2025-03-01', 'Enterprise');",
    "starterSql": "-- 91. Slack: Detecting Plan Upgrades Between Consecutive Billing Cycles\n-- Output: workspace_id, bill_month, prev_tier, plan_tier\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH transitions AS (SELECT workspace_id, bill_month, plan_tier, LAG(plan_tier) OVER (PARTITION BY workspace_id ORDER BY bill_month ASC) AS prev_tier FROM billing_snapshots) SELECT workspace_id, bill_month, prev_tier, plan_tier FROM transitions WHERE prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise') ORDER BY workspace_id ASC, bill_month ASC;",
    "expectedColumns": [
      "workspace_id",
      "bill_month",
      "prev_tier",
      "plan_tier"
    ],
    "hints": [
      "Fetch prev_tier via LAG() in a CTE, then match prev_tier = 'Free' AND plan_tier IN ('Pro', 'Enterprise')."
    ],
    "explanation": "Comparing current row state to LAG(state) turns event logs into clean state-transition triggers."
  },
  {
    "id": "basic-092",
    "number": 92,
    "title": "92. Twitter: First-Touch vs Current Attribution Channel (FIRST_VALUE)",
    "difficulty": "Easy",
    "companies": [
      "Twitter",
      "Google"
    ],
    "topics": [
      "FIRST_VALUE",
      "PARTITION BY",
      "Window Functions"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)",
    "stageOrder": 9,
    "rampStep": "Applied",
    "patternTag": "FIRST_VALUE Anchor Comparison",
    "description": "### Problem Statement\nMarketing wants to see every user touchpoint alongside that user's **very first** acquisition channel (`FIRST_VALUE`).\n\n### Requirements\n- Use `FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC)` as `first_channel`.\n- Output columns: `user_id`, `touch_time`, `channel`, `first_channel`.\n- Sort by `user_id` ascending, `touch_time` ascending.\n\n### Input Schema\n**touchpoints** (id INT, user_id INT, touch_time TIMESTAMP, channel VARCHAR)",
    "schemaSql": "CREATE TABLE touchpoints (id INT PRIMARY KEY, user_id INT, touch_time TIMESTAMP, channel VARCHAR(30));\nINSERT INTO touchpoints VALUES (1, 101, '2025-01-01 09:00:00', 'TikTok'), (2, 101, '2025-01-03 14:00:00', 'Google Search'), (3, 101, '2025-01-05 10:00:00', 'Direct'), (4, 102, '2025-01-02 11:00:00', 'Email'), (5, 102, '2025-01-04 16:00:00', 'Referral');",
    "starterSql": "-- 92. Twitter: First-Touch vs Current Attribution Channel (FIRST_VALUE)\n-- Output: user_id, touch_time, channel, first_channel\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, touch_time, channel, FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC) AS first_channel FROM touchpoints ORDER BY user_id ASC, touch_time ASC;",
    "expectedColumns": [
      "user_id",
      "touch_time",
      "channel",
      "first_channel"
    ],
    "hints": [
      "FIRST_VALUE(col) OVER (PARTITION BY user_id ORDER BY touch_time ASC) always reads the earliest row in the partition."
    ],
    "explanation": "FIRST_VALUE() works cleanly with the default frame because the first row in the partition is always inside UNBOUNDED PRECEDING AND CURRENT ROW."
  },
  {
    "id": "basic-093",
    "number": 93,
    "title": "93. LinkedIn: Cumulative Running Total with Explicit ROWS Frame",
    "difficulty": "Easy",
    "companies": [
      "LinkedIn",
      "Stripe"
    ],
    "topics": [
      "Window Frames",
      "ROWS BETWEEN",
      "SUM OVER"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Warm-up",
    "patternTag": "Running Total (ROWS BETWEEN)",
    "description": "### Problem Statement\nCompute a strict row-by-row cumulative running total of job applications using an explicit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` frame clause (notice there are two entries on `'2025-01-02'`!).\n\n### Requirements\n- Use `SUM(applications) OVER (ORDER BY event_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` as `running_total`.\n- Output columns: `id`, `event_date`, `applications`, `running_total`.\n- Sort by `event_date` ascending, `id` ascending.\n\n### Input Schema\n**job_apps** (id INT, event_date DATE, applications INT)",
    "schemaSql": "CREATE TABLE job_apps (id INT PRIMARY KEY, event_date DATE, applications INT);\nINSERT INTO job_apps VALUES (1, '2025-01-01', 120), (2, '2025-01-02', 80), (3, '2025-01-02', 50), (4, '2025-01-03', 200);",
    "starterSql": "-- 93. LinkedIn: Cumulative Running Total with Explicit ROWS Frame\n-- Output: id, event_date, applications, running_total\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT id, event_date, applications, SUM(applications) OVER (ORDER BY event_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM job_apps ORDER BY event_date ASC, id ASC;",
    "expectedColumns": [
      "id",
      "event_date",
      "applications",
      "running_total"
    ],
    "hints": [
      "Add ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW right after ORDER BY inside OVER (...)."
    ],
    "explanation": "ROWS BETWEEN advances strictly 1 physical row at a time, avoiding tie-merging surprises from default RANGE frames.",
    "conceptPrimer": {
      "title": "Window Frame Clauses: ROWS BETWEEN ... AND ...",
      "mentalModel": "When you add ORDER BY inside SUM(...) OVER (ORDER BY ...), PostgreSQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW—meaning tied dates get summed together! Writing ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW counts physical rows one-by-one.",
      "syntaxTemplate": "SUM(amount) OVER (\n  ORDER BY event_date ASC, id ASC\n  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n) AS running_total",
      "exampleWalkthrough": "Notice two orders on '2025-01-02' (ids 2 and 3): with ROWS BETWEEN, row 2 updates first and row 3 updates second instead of jumping both rows at once!",
      "visualType": "window-frame"
    },
    "blueprintSql": "SELECT\n  id,\n  event_date,\n  applications,\n  SUM(applications) OVER (\n    ORDER BY event_date ASC, id ASC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM job_apps\nORDER BY event_date ASC, id ASC;"
  },
  {
    "id": "basic-094",
    "number": 94,
    "title": "94. Robinhood: Partitioned Running Cash Balance per Account",
    "difficulty": "Easy",
    "companies": [
      "Robinhood",
      "PayPal"
    ],
    "topics": [
      "Window Frames",
      "ROWS BETWEEN",
      "SUM OVER",
      "CASE WHEN"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Warm-up",
    "patternTag": "Partitioned Running Ledger",
    "description": "### Problem Statement\nCalculate each account's running cash balance chronologically, adding `'DEPOSIT'` amounts and subtracting `'WITHDRAWAL'` amounts inside each account's partition.\n\n### Requirements\n- Partition by `account_id`, order by `txn_date ASC, id` ascending, using `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.\n- Use `CASE WHEN txn_type = 'DEPOSIT' THEN amount ELSE -amount END` inside `SUM(...)`.\n- Output columns: `account_id`, `txn_date`, `txn_type`, `amount`, `running_balance`.\n- Sort by `account_id` ascending, `txn_date` ascending, `id` ascending.\n\n### Input Schema\n**ledger** (id INT, account_id INT, txn_date DATE, txn_type VARCHAR, amount NUMERIC)",
    "schemaSql": "CREATE TABLE ledger (id INT PRIMARY KEY, account_id INT, txn_date DATE, txn_type VARCHAR(20), amount NUMERIC);\nINSERT INTO ledger VALUES (1, 10, '2025-01-01', 'DEPOSIT', 1000.00), (2, 10, '2025-01-02', 'WITHDRAWAL', 250.00), (3, 10, '2025-01-03', 'DEPOSIT', 400.00), (4, 20, '2025-01-01', 'DEPOSIT', 500.00), (5, 20, '2025-01-04', 'WITHDRAWAL', 100.00);",
    "starterSql": "-- 94. Robinhood: Partitioned Running Cash Balance per Account\n-- Output: account_id, txn_date, txn_type, amount, running_balance\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT account_id, txn_date, txn_type, amount, SUM(CASE WHEN txn_type = 'DEPOSIT' THEN amount ELSE -amount END) OVER (PARTITION BY account_id ORDER BY txn_date ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_balance FROM ledger ORDER BY account_id ASC, txn_date ASC, id ASC;",
    "expectedColumns": [
      "account_id",
      "txn_date",
      "txn_type",
      "amount",
      "running_balance"
    ],
    "hints": [
      "Combine CASE WHEN inside SUM(...) with PARTITION BY account_id and ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
    ],
    "explanation": "Signed-flow running sums are the core pattern for financial account balance reconstruction."
  },
  {
    "id": "basic-095",
    "number": 95,
    "title": "95. YouTube: 3-Day Rolling Average Views (ROWS BETWEEN 2 PRECEDING)",
    "difficulty": "Easy",
    "companies": [
      "YouTube",
      "Netflix"
    ],
    "topics": [
      "Window Frames",
      "ROWS BETWEEN",
      "AVG OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Core",
    "patternTag": "3-Row Moving Average",
    "description": "### Problem Statement\nSmooth daily view spikes by computing a **3-row rolling average** (current day + up to 2 preceding days).\n\n### Requirements\n- Compute `rolling_3day_avg` = `ROUND(AVG(views) OVER (ORDER BY view_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)`.\n- Output columns: `view_date`, `views`, `rolling_3day_avg`.\n- Sort by `view_date` ascending.\n\n### Input Schema\n**channel_views** (view_date DATE, views INT)",
    "schemaSql": "CREATE TABLE channel_views (view_date DATE PRIMARY KEY, views INT);\nINSERT INTO channel_views VALUES ('2025-01-01', 100), ('2025-01-02', 200), ('2025-01-03', 300), ('2025-01-04', 400), ('2025-01-05', 200);",
    "starterSql": "-- 95. YouTube: 3-Day Rolling Average Views (ROWS BETWEEN 2 PRECEDING)\n-- Output: view_date, views, rolling_3day_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT view_date, views, ROUND(AVG(views) OVER (ORDER BY view_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_avg FROM channel_views ORDER BY view_date ASC;",
    "expectedColumns": [
      "view_date",
      "views",
      "rolling_3day_avg"
    ],
    "hints": [
      "Remember: 'current row + 2 previous rows' = 3 rows total, so write ROWS BETWEEN 2 PRECEDING AND CURRENT ROW."
    ],
    "explanation": "N-row moving averages use (N - 1) PRECEDING AND CURRENT ROW—never N PRECEDING!"
  },
  {
    "id": "basic-096",
    "number": 96,
    "title": "96. Netflix: Partitioned 7-Day Rolling Average Watch Hours per User",
    "difficulty": "Easy",
    "companies": [
      "Netflix",
      "Spotify"
    ],
    "topics": [
      "Window Frames",
      "ROWS BETWEEN",
      "PARTITION BY",
      "AVG OVER"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Core",
    "patternTag": "Partitioned Rolling Average",
    "description": "### Problem Statement\nCompute a 7-day rolling average (current day + up to 6 preceding days) independently for each subscriber.\n\n### Requirements\n- Partition by `user_id`, order by `watch_date` ascending, and apply `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`.\n- Round `rolling_avg_hours` to 2 decimal places.\n- Output columns: `user_id`, `watch_date`, `hours_watched`, `rolling_avg_hours`.\n- Sort by `user_id` ascending, `watch_date` ascending.\n\n### Input Schema\n**subscriber_viewing** (id INT, user_id INT, watch_date DATE, hours_watched NUMERIC)",
    "schemaSql": "CREATE TABLE subscriber_viewing (id INT PRIMARY KEY, user_id INT, watch_date DATE, hours_watched NUMERIC);\nINSERT INTO subscriber_viewing VALUES (1, 101, '2025-01-01', 3.5), (2, 101, '2025-01-02', 2.0), (3, 101, '2025-01-03', 4.0), (4, 101, '2025-01-04', 1.5), (5, 101, '2025-01-05', 5.0), (6, 101, '2025-01-06', 3.0), (7, 101, '2025-01-07', 4.5), (8, 101, '2025-01-08', 6.0), (9, 102, '2025-01-01', 1.0), (10, 102, '2025-01-02', 2.5);",
    "starterSql": "-- 96. Netflix: Partitioned 7-Day Rolling Average Watch Hours per User\n-- Output: user_id, watch_date, hours_watched, rolling_avg_hours\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, watch_date, hours_watched, ROUND(AVG(hours_watched) OVER (PARTITION BY user_id ORDER BY watch_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_hours FROM subscriber_viewing ORDER BY user_id ASC, watch_date ASC;",
    "expectedColumns": [
      "user_id",
      "watch_date",
      "hours_watched",
      "rolling_avg_hours"
    ],
    "hints": [
      "Include PARTITION BY user_id so user 101's hours never leak into user 102's rolling average."
    ],
    "explanation": "Combining PARTITION BY with ROWS BETWEEN keeps rolling metrics strictly isolated per entity."
  },
  {
    "id": "basic-097",
    "number": 97,
    "title": "97. Datadog: Centered 3-Point Latency Smoothing (1 PRECEDING AND 1 FOLLOWING)",
    "difficulty": "Easy",
    "companies": [
      "Datadog",
      "Cloudflare"
    ],
    "topics": [
      "Window Frames",
      "ROWS BETWEEN",
      "AVG OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Core",
    "patternTag": "Centered Window Frame",
    "description": "### Problem Statement\nFrames can look both backwards AND forwards! Smooth telemetry latency using a centered 3-point window (`1 PRECEDING AND 1 FOLLOWING`) for each server.\n\n### Requirements\n- Partition by `server_id`, order by `check_minute` ascending, and compute `smoothed_ms` = `ROUND(AVG(latency_ms) OVER (PARTITION BY server_id ORDER BY check_minute ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2)`.\n- Output columns: `server_id`, `check_minute`, `latency_ms`, `smoothed_ms`.\n- Sort by `server_id` ascending, `check_minute` ascending.\n\n### Input Schema\n**telemetry** (id INT, server_id VARCHAR, check_minute INT, latency_ms NUMERIC)",
    "schemaSql": "CREATE TABLE telemetry (id INT PRIMARY KEY, server_id VARCHAR(20), check_minute INT, latency_ms NUMERIC);\nINSERT INTO telemetry VALUES (1, 'web-1', 1, 20.0), (2, 'web-1', 2, 80.0), (3, 'web-1', 3, 25.0), (4, 'web-1', 4, 30.0), (5, 'web-2', 1, 15.0), (6, 'web-2', 2, 45.0);",
    "starterSql": "-- 97. Datadog: Centered 3-Point Latency Smoothing (1 PRECEDING AND 1 FOLLOWING)\n-- Output: server_id, check_minute, latency_ms, smoothed_ms\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT server_id, check_minute, latency_ms, ROUND(AVG(latency_ms) OVER (PARTITION BY server_id ORDER BY check_minute ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS smoothed_ms FROM telemetry ORDER BY server_id ASC, check_minute ASC;",
    "expectedColumns": [
      "server_id",
      "check_minute",
      "latency_ms",
      "smoothed_ms"
    ],
    "hints": [
      "Write ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING."
    ],
    "explanation": "Centered frames smooth out momentary spikes using neighboring observations before and after each point."
  },
  {
    "id": "basic-098",
    "number": 98,
    "title": "98. Twitter: Fixing the LAST_VALUE() Default Frame Trap",
    "difficulty": "Easy",
    "companies": [
      "Twitter",
      "Meta"
    ],
    "topics": [
      "LAST_VALUE",
      "FIRST_VALUE",
      "Window Frames",
      "ROWS BETWEEN"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Applied",
    "patternTag": "LAST_VALUE Frame Trap",
    "description": "### Problem Statement\nTwitter Marketing wants each user's **first-touch** AND **last-touch** attribution channel on every touchpoint row. If you forget the explicit frame on `LAST_VALUE()`, SQL only looks up to `CURRENT ROW`!\n\n### Requirements\n- Compute `first_touch` using `FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC)`.\n- Compute `last_touch` using `LAST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)`.\n- Output columns: `user_id`, `touch_time`, `channel`, `first_touch`, `last_touch`.\n- Sort by `user_id` ascending, `touch_time` ascending.\n\n### Input Schema\n**touchpoints** (id INT, user_id INT, touch_time TIMESTAMP, channel VARCHAR)",
    "schemaSql": "CREATE TABLE touchpoints (id INT PRIMARY KEY, user_id INT, touch_time TIMESTAMP, channel VARCHAR(30));\nINSERT INTO touchpoints VALUES (1, 101, '2025-01-01 09:00:00', 'TikTok'), (2, 101, '2025-01-03 14:00:00', 'Google'), (3, 101, '2025-01-05 10:00:00', 'Direct'), (4, 102, '2025-01-02 11:00:00', 'Email'), (5, 102, '2025-01-04 16:00:00', 'Referral');",
    "starterSql": "-- 98. Twitter: Fixing the LAST_VALUE() Default Frame Trap\n-- Output: user_id, touch_time, channel, first_touch, last_touch\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT user_id, touch_time, channel, FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC) AS first_touch, LAST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_touch FROM touchpoints ORDER BY user_id ASC, touch_time ASC;",
    "expectedColumns": [
      "user_id",
      "touch_time",
      "channel",
      "first_touch",
      "last_touch"
    ],
    "hints": [
      "Add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING inside LAST_VALUE(...) OVER (...)."
    ],
    "explanation": "Without UNBOUNDED FOLLOWING, LAST_VALUE() stops at CURRENT ROW and gives wrong intermediate values.",
    "conceptPrimer": {
      "title": "The #1 SQL Trap: Why LAST_VALUE() Needs UNBOUNDED FOLLOWING",
      "mentalModel": "With ORDER BY inside OVER(...), the default frame ends at CURRENT ROW—so LAST_VALUE(col) naively returns the current row itself! Adding ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING extends the frame to the very end of the partition.",
      "syntaxTemplate": "SELECT\n  user_id,\n  channel,\n  FIRST_VALUE(channel) OVER (PARTITION BY user_id ORDER BY touch_time) AS first_touch,\n  LAST_VALUE(channel) OVER (\n    PARTITION BY user_id\n    ORDER BY touch_time\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n  ) AS last_touch\nFROM touchpoints;",
      "visualType": "window-frame"
    }
  },
  {
    "id": "basic-099",
    "number": 99,
    "title": "99. Amazon: Basic Capstone 1 — Top 2 Products per Category with Share of Category",
    "difficulty": "Easy",
    "companies": [
      "Amazon",
      "Shopify"
    ],
    "topics": [
      "CTEs",
      "DENSE_RANK",
      "SUM OVER",
      "ROUND"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Applied",
    "patternTag": "CTE + Ranking + Partition Share",
    "description": "### Problem Statement\nCombine **Hygiene + GROUP BY + CTEs + `SUM() OVER` + `DENSE_RANK()`**! Find the top 2 revenue-generating products per category (completed orders only) along with each product's % share of its category revenue.\n\n### Requirements\n- Filter `status = 'completed'`.\n- CTE 1: aggregate `total_revenue = ROUND(SUM(amount), 2)` per `(category, product_name)`.\n- CTE 2: compute `category_share_pct = ROUND(total_revenue * 100.0 / SUM(total_revenue) OVER (PARTITION BY category), 2)` and `revenue_rank = DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC)`.\n- Outer SELECT: keep `revenue_rank <= 2`.\n- Output columns: `category`, `product_name`, `total_revenue`, `category_share_pct`, `revenue_rank`.\n- Sort by `category` ascending, `revenue_rank` ascending, `product_name` ascending.\n\n### Input Schema\n**sales** (id INT, category VARCHAR, product_name VARCHAR, amount NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE sales (id INT PRIMARY KEY, category VARCHAR(30), product_name VARCHAR(50), amount NUMERIC, status VARCHAR(20));\nINSERT INTO sales VALUES (1, 'Audio', 'Headphones', 300.00, 'completed'), (2, 'Audio', 'Headphones', 200.00, 'completed'), (3, 'Audio', 'Speaker', 400.00, 'completed'), (4, 'Audio', 'Earbuds', 100.00, 'completed'), (5, 'Audio', 'Broken Mic', 900.00, 'refunded'), (6, 'Tech', 'Monitor', 600.00, 'completed'), (7, 'Tech', 'Keyboard', 200.00, 'completed'), (8, 'Tech', 'Mouse', 200.00, 'completed');",
    "starterSql": "-- 99. Amazon: Basic Capstone 1 — Top 2 Products per Category with Share of Category\n-- Output: category, product_name, total_revenue, category_share_pct, revenue_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH product_sales AS (SELECT category, product_name, ROUND(SUM(amount), 2) AS total_revenue FROM sales WHERE status = 'completed' GROUP BY category, product_name), ranked AS (SELECT category, product_name, total_revenue, ROUND(total_revenue * 100.0 / SUM(total_revenue) OVER (PARTITION BY category), 2) AS category_share_pct, DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC) AS revenue_rank FROM product_sales) SELECT category, product_name, total_revenue, category_share_pct, revenue_rank FROM ranked WHERE revenue_rank <= 2 ORDER BY category ASC, revenue_rank ASC, product_name ASC;",
    "expectedColumns": [
      "category",
      "product_name",
      "total_revenue",
      "category_share_pct",
      "revenue_rank"
    ],
    "hints": [
      "Aggregate first in CTE 1, then run both SUM() OVER and DENSE_RANK() OVER in CTE 2, then filter revenue_rank <= 2."
    ],
    "explanation": "Separating aggregation from window calculations in chained CTEs handles real-world analytics cleanly.",
    "blueprintSql": "WITH product_sales AS (\n  -- Step 1: Sum completed revenue per (category, product_name)\n  SELECT ...\n),\nranked AS (\n  -- Step 2: Compute category_share_pct via SUM() OVER and DENSE_RANK()\n  SELECT ...\n)\nSELECT category, product_name, total_revenue, category_share_pct, revenue_rank\nFROM ranked\nWHERE revenue_rank <= 2\nORDER BY category ASC, revenue_rank ASC, product_name ASC;"
  },
  {
    "id": "basic-100",
    "number": 100,
    "title": "100. Stripe: Basic Capstone 2 — Daily Net Revenue, MoM/DoD Growth & 3-Day Rolling Avg",
    "difficulty": "Easy",
    "companies": [
      "Stripe",
      "Netflix",
      "Google"
    ],
    "topics": [
      "CTEs",
      "LAG",
      "ROWS BETWEEN",
      "COALESCE",
      "NULLIF"
    ],
    "frequency": "Very High",
    "category": "Window Functions",
    "orderSensitive": true,
    "stage": "Stage 10: Window Frame Clauses & Capstones",
    "stageOrder": 10,
    "rampStep": "Applied",
    "patternTag": "Full Analytical Pipeline",
    "description": "### Problem Statement\nGraduate from Level 1: Basic! Combine **Hygiene (`COALESCE`, `NULLIF`) + `GROUP BY` + Chained CTEs + `LAG()` + `ROWS BETWEEN` Rolling Average** in one production-grade pipeline.\n\n### Requirements\n- CTE 1 (`daily_net`): group `orders` by `sale_date` and compute `net_revenue = ROUND(SUM(amount - (refund, defaulting to 0 if missing)), 2)`.\n- CTE 2 (`analytics`): compute `prev_rev = LAG(net_revenue) OVER (ORDER BY sale_date ASC)` and `rolling_3d_avg = ROUND(AVG(net_revenue) OVER (ORDER BY sale_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)`.\n- Outer SELECT: compute `dod_growth_pct = ROUND((net_revenue - prev_rev) * 100.0 / prev_rev (returning null if 0), 2)`.\n- Output columns: `sale_date`, `net_revenue`, `rolling_3d_avg`, `dod_growth_pct`.\n- Sort by `sale_date` ascending.\n\n### Input Schema\n**orders** (id INT, sale_date DATE, amount NUMERIC, refund NUMERIC)",
    "schemaSql": "CREATE TABLE orders (id INT PRIMARY KEY, sale_date DATE, amount NUMERIC, refund NUMERIC);\nINSERT INTO orders VALUES (1, '2025-01-01', 120.00, 20.00), (2, '2025-01-01', 100.00, NULL), (3, '2025-01-02', 300.00, NULL), (4, '2025-01-03', 150.00, 0.00), (5, '2025-01-04', 450.00, 50.00);",
    "starterSql": "-- 100. Stripe: Basic Capstone 2 — Daily Net Revenue, MoM/DoD Growth & 3-Day Rolling Avg\n-- Output: sale_date, net_revenue, rolling_3d_avg, dod_growth_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH daily_net AS (SELECT sale_date, ROUND(SUM(amount - COALESCE(refund, 0)), 2) AS net_revenue FROM orders GROUP BY sale_date), analytics AS (SELECT sale_date, net_revenue, LAG(net_revenue) OVER (ORDER BY sale_date ASC) AS prev_rev, ROUND(AVG(net_revenue) OVER (ORDER BY sale_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3d_avg FROM daily_net) SELECT sale_date, net_revenue, rolling_3d_avg, ROUND((net_revenue - prev_rev) * 100.0 / NULLIF(prev_rev, 0), 2) AS dod_growth_pct FROM analytics ORDER BY sale_date ASC;",
    "expectedColumns": [
      "sale_date",
      "net_revenue",
      "rolling_3d_avg",
      "dod_growth_pct"
    ],
    "hints": [
      "Compute net_revenue per day in CTE 1, then run LAG() and ROWS BETWEEN 2 PRECEDING AND CURRENT ROW in CTE 2."
    ],
    "explanation": "You just built a complete analytical pipeline—ready for Level 2: Intermediate and Level 3: Advanced!",
    "blueprintSql": "WITH daily_net AS (\n  -- Step 1: Aggregate net revenue = amount - COALESCE(refund, 0) per sale_date\n  SELECT ...\n),\nanalytics AS (\n  -- Step 2: Add LAG(net_rev) and AVG(net_rev) OVER (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n  SELECT ...\n)\nSELECT\n  sale_date,\n  net_revenue,\n  rolling_3d_avg,\n  ROUND((net_revenue - prev_rev) * 100.0 / NULLIF(prev_rev, 0), 2) AS dod_growth_pct\nFROM analytics\nORDER BY sale_date ASC;"
  },
  {
    "id": "inter-101",
    "title": "101. Zendesk: Support Ticket Multi-Hop Escalation Count",
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
    "number": 101,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-102",
    "title": "102. Salesforce: Enterprise Pipeline Stage Drop-Off Funnel Conversion",
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
    "number": 102,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT CASE WHEN"
  },
  {
    "id": "inter-103",
    "title": "103. Asana: Cross-Project High Priority Blocker Tasks",
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
    "number": 103,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT DISTINCT"
  },
  {
    "id": "inter-104",
    "title": "104. Plaid: Multi-Bank Asset Holdings Consolidation",
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
    "number": 104,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-105",
    "title": "105. Coinbase: Cryptocurrency Limit Order Fill Slippage vs Target Price",
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
    "number": 105,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-106",
    "title": "106. Brex: Corporate Card Weekend Spend Anomaly Flagging",
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
    "number": 106,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "EXTRACT DOW"
  },
  {
    "id": "inter-107",
    "title": "107. Gusto: Weekly Payroll Overtime Audit Above 40 Hours",
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
    "number": 107,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-108",
    "title": "108. Rippling: Department Promotion Velocity Time-in-Title",
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
    "number": 108,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "AVG"
  },
  {
    "id": "inter-109",
    "title": "109. Deel: International Contractor Foreign Exchange Fee Spread",
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
    "number": 109,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-110",
    "title": "110. Udemy: Bestselling Instructor Tier Qualification by Reviews",
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
    "number": 110,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "AVG"
  },
  {
    "id": "inter-111",
    "title": "111. Peloton: Leaderboard Output Surge in Final 5 Minutes of Class",
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
    "number": 111,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-112",
    "title": "112. Oura: Weekly Bedtime Consistency Variance in Minutes",
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
    "number": 112,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "MAX"
  },
  {
    "id": "inter-113",
    "title": "113. Epic Games: Battle Pass Tier Unlock Velocity Days from Launch",
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
    "description": "### Problem Statement\nEpic Games Monetization analyzes player progression speed. Find the number of days elapsed between season launch date ('2025-01-01') and when each VIP player reached Tier 100 of the Battle Pass.\n\n### Requirements\n- Find the earliest date where tier_unlocked = 100 for each player.\n- Calculate days_to_tier_100 as completion date minus '2025-01-01'.\n- Output columns: player_tag, completion_date, days_to_tier_100.\n- Sort by days_to_tier_100 ascending, then by player_tag ascending.\n\n### Input Schema\n**battle_pass_logs** (id INT, player_tag VARCHAR, log_date DATE, tier_unlocked INT)",
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
    "number": 113,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "MIN"
  },
  {
    "id": "inter-114",
    "title": "114. Riot Games: Champions with Highest Win Rate in 35+ Minute Late Games",
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
    "number": 114,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-115",
    "title": "115. Valve: Competitive Match Round Weapon Shot Accuracy",
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
    "number": 115,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-116",
    "title": "116. Sony: Digital Game Title Refund Rate vs Platform Benchmark",
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
    "number": 116,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-117",
    "title": "117. Roblox: Top Experience In-Game Purchase Robux Spend per Active Player",
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
    "number": 117,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-118",
    "title": "118. Unity: Mobile Game Crash Free Session Percentage by Engine Version",
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
    "number": 118,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-119",
    "title": "119. Booking.com: Weekend vs Weekday Hotel Pricing Premium",
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
    "number": 119,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "EXTRACT DOW"
  },
  {
    "id": "inter-120",
    "title": "120. Delta: Frequent Flyer Companion Seat Upgrade Clearance Rates",
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
    "number": 120,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-121",
    "title": "121. Tesla: Supercharger Peak Hour Stall Utilization Percentage",
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
    "number": 121,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-122",
    "title": "122. Rivian: Dual-Motor vs Quad-Motor Range Degradation in Cold Climates",
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
    "number": 122,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "AVG"
  },
  {
    "id": "inter-123",
    "title": "123. Ford: Commercial Telematics Fleet Vehicle Excessive Idling Fuel Waste",
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
    "number": 123,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-124",
    "title": "124. FedEx: Sort Facility Conveyor Jam Incident Frequency per Shift",
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
    "number": 124,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-125",
    "title": "125. UPS: Driver Next-Day Air Package Delivery On-Time Delivery Rate",
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
    "number": 125,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-126",
    "title": "126. Maersk: Ocean Container Detention and Demurrage Charges by Port",
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
    "number": 126,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-127",
    "title": "127. Redfin: Percent of Homes Sold Above List Price by Zip Code",
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
    "number": 127,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-128",
    "title": "128. OpenTable: Peak Friday Dinner Reservation No-Show Rate by Party Size",
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
    "number": 128,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-129",
    "title": "129. TripAdvisor: Hotel Cleanliness Rating Trend Trailing 3 Months vs Historical",
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
    "number": 129,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "AVG"
  },
  {
    "id": "inter-130",
    "title": "130. Substack: Paid Newsletter Subscriber Churn Rate After Annual Renewal",
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
    "number": 130,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-131",
    "title": "131. Medium: Story Engagement Claps and Reads per 1000 Views",
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
    "number": 131,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-132",
    "title": "132. Ticketmaster: Presale Access Code Resale Markup Percentage",
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
    "number": 132,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-133",
    "title": "133. SeatGeek: Venue Seat Row Price Decay from Front Row to Back",
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
    "number": 133,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-134",
    "title": "134. Box: Enterprise Cloud Storage Quota Overages by Department",
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
    "number": 134,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-135",
    "title": "135. Twitch: Streamer Peak Concurrent Viewers vs Average Daily Viewers",
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
    "number": 135,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "MAX"
  },
  {
    "id": "inter-136",
    "title": "136. Atlassian: Jira Sprint Velocity Rollover Work Estimate Spillover",
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
    "number": 136,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "SUM"
  },
  {
    "id": "inter-137",
    "title": "137. Figma: Team Collaborative Canvas Active Editors Peak Concurrency",
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
    "number": 137,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "MAX"
  },
  {
    "id": "inter-138",
    "title": "138. Canva: Template Export Conversion by Subscription Plan Tier",
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
    "number": 138,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-139",
    "title": "139. New Relic: Server Memory Saturation Hours Above 90 Percent Threshold",
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
    "number": 139,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-140",
    "title": "140. Cloudflare: Edge Cache Hit Ratio and Bandwidth Savings Percentage",
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
    "number": 140,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "ROUND"
  },
  {
    "id": "inter-141",
    "title": "141. Slack: Channel Message Thread Depth and Reply Aggregations",
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
    "number": 141,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-142",
    "title": "142. HubSpot: Inbound Lead Form First Contact Response Time",
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
    "number": 142,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "EXTRACT EPOCH"
  },
  {
    "id": "inter-143",
    "title": "143. Square: Merchant POS Offline Batch Settlement Latency",
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
    "number": 143,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "EXTRACT EPOCH"
  },
  {
    "id": "inter-144",
    "title": "144. Bloomberg: Treasury Yield Curve Spread Inversion Analysis",
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
    "number": 144,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "JOIN"
  },
  {
    "id": "inter-145",
    "title": "145. Steam: Wishlist-to-Purchase Conversion Velocity Within 14 Days",
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
    "number": 145,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "JOIN"
  },
  {
    "id": "inter-146",
    "title": "146. Nintendo: Multiplayer Matchmaking Ping 90th Percentile by Region",
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
    "number": 146,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "PERCENTILE_CONT"
  },
  {
    "id": "inter-147",
    "title": "147. United: Flight Hub Connection Minimum Layover Risk Windows",
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
    "number": 147,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "EXTRACT EPOCH"
  },
  {
    "id": "inter-148",
    "title": "148. Kickstarter: Crowdfunding Backer Pledge Velocity in First 48 Hours",
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
    "number": 148,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "SUM"
  },
  {
    "id": "inter-149",
    "title": "149. Linear: Cycle Issue Resolution Time by Priority Tier",
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
    "number": 149,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "EXTRACT EPOCH"
  },
  {
    "id": "inter-150",
    "title": "150. PagerDuty: On-Call Incident MTTR by Escalation Level",
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
    "number": 150,
    "stage": "Inter Stage 1: Analytical Aggregations & Joins",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "EXTRACT EPOCH"
  },
  {
    "id": "inter-151",
    "title": "151. Google: Search Query Click Share within Product Category",
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
    "number": 151,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-152",
    "title": "152. Airbnb: Listing Price Variance vs Neighborhood Average Price",
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
    "number": 152,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "AVG OVER"
  },
  {
    "id": "inter-153",
    "title": "153. LinkedIn: Cumulative Running Total of Job Applications",
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
    "number": 153,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-154",
    "title": "154. Databricks: Cluster Auto-Scaling Event Peak Nodes Tracker",
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
    "number": 154,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "MAX OVER"
  },
  {
    "id": "inter-155",
    "title": "155. Robinhood: Running Portfolio Cash Balance with Deposits & Withdrawals",
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
    "number": 155,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-156",
    "title": "156. Discord: Voice Channel Concurrent Speaker Count Tracking",
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
    "number": 156,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-157",
    "title": "157. Uber: Driver Weekly Fare Percentile Ranking within Metro Area",
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
    "number": 157,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "PERCENT_RANK"
  },
  {
    "id": "inter-158",
    "title": "158. Zoom: Meeting Attendee Arrival Sequence and Duration",
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
    "number": 158,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "ROW_NUMBER"
  },
  {
    "id": "inter-159",
    "title": "159. Morningstar: Mutual Fund Expense Ratio Quintile Ranking by Category",
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
    "number": 159,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Warm-up",
    "patternTag": "NTILE"
  },
  {
    "id": "inter-160",
    "title": "160. Amazon: Top 2 Highest Revenue Products per Category with Ties",
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
    "number": 160,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "DENSE_RANK"
  },
  {
    "id": "inter-161",
    "title": "161. TikTok: Video View Milestones Time-to-Reach 100K Views",
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
    "number": 161,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "ROW_NUMBER"
  },
  {
    "id": "inter-162",
    "title": "162. Pinterest: 3rd Highest Saved Pin in Each Visual Category",
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
    "number": 162,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "DENSE_RANK"
  },
  {
    "id": "inter-163",
    "title": "163. YouTube: Channel Milestone Date Reaching 50K Subscribers",
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
    "number": 163,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-164",
    "title": "164. Etsy: Artisan Shop Gross Revenue Quartile Segmentation",
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
    "number": 164,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "NTILE"
  },
  {
    "id": "inter-165",
    "title": "165. Binance: Top 3 Trading Pairs by Volume in Each Market Zone",
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
    "number": 165,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "DENSE_RANK"
  },
  {
    "id": "inter-166",
    "title": "166. Duolingo: Weekly League Leaderboard Top 3 Promotion Cutoff Points",
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
    "number": 166,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "DENSE_RANK"
  },
  {
    "id": "inter-167",
    "title": "167. Marriott: Bonvoy Elite Member Tier Qualification Night Thresholds",
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
    "number": 167,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "SUM OVER"
  },
  {
    "id": "inter-168",
    "title": "168. DHL: Customs Clearance Latency vs Country Average & Port Ranking",
    "difficulty": "Medium",
    "companies": [
      "DHL",
      "FedEx"
    ],
    "topics": [
      "EXTRACT EPOCH",
      "AVG OVER",
      "DENSE_RANK",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nDHL Global Customs identifies bottleneck clearance shipments. Compute each shipment's clearance hours, compare it against its destination country's average clearance hours, and rank delayed shipments (`clearance_hours > country_avg_hours`) per country.\n\n### Requirements\n- CTE 1: compute `clearance_hours = ROUND(EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0, 2)`.\n- CTE 2: attach `country_avg_hours = ROUND(AVG(clearance_hours) OVER (PARTITION BY destination_country), 2)` and `delay_rank = DENSE_RANK() OVER (PARTITION BY destination_country ORDER BY clearance_hours DESC)`.\n- Outer SELECT: filter `clearance_hours > country_avg_hours`.\n- Output columns: `destination_country`, `tracking_number`, `clearance_hours`, `country_avg_hours`, `delay_rank`.\n- Sort by `destination_country` ascending, `delay_rank` ascending, `tracking_number` ascending.\n\n### Input Schema\n**customs_shipments** (tracking_number VARCHAR, destination_country VARCHAR, arrival_time TIMESTAMP, clearance_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE customs_shipments (tracking_number VARCHAR(20) PRIMARY KEY, destination_country VARCHAR(30), arrival_time TIMESTAMP, clearance_time TIMESTAMP);\nINSERT INTO customs_shipments VALUES ('DHL-101', 'Germany', '2025-01-01 08:00:00', '2025-01-03 14:00:00'), ('DHL-102', 'Germany', '2025-01-01 10:00:00', '2025-01-02 10:00:00'), ('DHL-103', 'Germany', '2025-01-02 06:00:00', '2025-01-02 18:00:00'), ('DHL-201', 'Japan', '2025-01-01 09:00:00', '2025-01-04 09:00:00'), ('DHL-202', 'Japan', '2025-01-01 12:00:00', '2025-01-02 00:00:00');",
    "starterSql": "-- DHL: Customs Clearance Latency vs Country Average & Port Ranking\n-- Output: destination_country, tracking_number, clearance_hours, country_avg_hours, delay_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH durations AS (SELECT tracking_number, destination_country, ROUND(EXTRACT(EPOCH FROM (clearance_time - arrival_time)) / 3600.0, 2) AS clearance_hours FROM customs_shipments), ranked AS (SELECT destination_country, tracking_number, clearance_hours, ROUND(AVG(clearance_hours) OVER (PARTITION BY destination_country), 2) AS country_avg_hours, DENSE_RANK() OVER (PARTITION BY destination_country ORDER BY clearance_hours DESC) AS delay_rank FROM durations) SELECT destination_country, tracking_number, clearance_hours, country_avg_hours, delay_rank FROM ranked WHERE clearance_hours > country_avg_hours ORDER BY destination_country ASC, delay_rank ASC, tracking_number ASC;",
    "expectedColumns": [
      "destination_country",
      "tracking_number",
      "clearance_hours",
      "country_avg_hours",
      "delay_rank"
    ],
    "hints": [
      "Compute clearance_hours first in CTE 1 so CTE 2 can run AVG() OVER and DENSE_RANK() cleanly."
    ],
    "explanation": "Multiple independent window functions can share the same CTE pass before outer threshold filtering.",
    "number": 168,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Core",
    "patternTag": "Multi-Window Benchmark + Rank"
  },
  {
    "id": "inter-169",
    "title": "169. Compass: Top 10 Percent Real Estate Agents by Gross Commission Income",
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
    "number": 169,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "PERCENT_RANK"
  },
  {
    "id": "inter-170",
    "title": "170. GoFundMe: Urgent Campaign Milestone Funding Velocity Rate",
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
    "number": 170,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "MIN"
  },
  {
    "id": "inter-171",
    "title": "171. Goodreads: Top 2 Highest-Rated Books per Genre Above 100 Reviews (CTE + DENSE_RANK)",
    "difficulty": "Medium",
    "companies": [
      "Goodreads",
      "Amazon"
    ],
    "topics": [
      "DENSE_RANK",
      "CTEs",
      "AVG OVER",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nGoodreads Editorial curates the top 2 highest-rated books per genre that have at least 100 reviews, while also displaying each book's difference from its genre's qualified average rating.\n\n### Requirements\n- Filter `review_count >= 100` inside CTE 1.\n- Compute `genre_avg_rating = ROUND(AVG(avg_rating) OVER (PARTITION BY genre), 2)` and `genre_rank = DENSE_RANK() OVER (PARTITION BY genre ORDER BY avg_rating DESC, review_count DESC)`.\n- Keep `genre_rank <= 2`.\n- Output columns: `genre`, `title`, `avg_rating`, `genre_avg_rating`, `genre_rank`.\n- Sort by `genre` ascending, `genre_rank` ascending, `title` ascending.\n\n### Input Schema\n**book_catalog** (book_id INT, genre VARCHAR, title VARCHAR, avg_rating NUMERIC, review_count INT)",
    "schemaSql": "CREATE TABLE book_catalog (book_id INT PRIMARY KEY, genre VARCHAR(30), title VARCHAR(80), avg_rating NUMERIC, review_count INT);\nINSERT INTO book_catalog VALUES (1, 'Sci-Fi', 'Dune', 4.70, 5000), (2, 'Sci-Fi', 'Project Hail Mary', 4.85, 4200), (3, 'Sci-Fi', 'Hidden Gem', 4.95, 40), (4, 'Sci-Fi', 'Hyperion', 4.45, 1200), (5, 'Fantasy', 'Mistborn', 4.65, 3100), (6, 'Fantasy', 'Way of Kings', 4.80, 4800);",
    "starterSql": "-- Goodreads: Top 2 Qualified Books per Genre\n-- Output: genre, title, avg_rating, genre_avg_rating, genre_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH qualified AS (SELECT genre, title, avg_rating, review_count FROM book_catalog WHERE review_count >= 100), ranked AS (SELECT genre, title, avg_rating, ROUND(AVG(avg_rating) OVER (PARTITION BY genre), 2) AS genre_avg_rating, DENSE_RANK() OVER (PARTITION BY genre ORDER BY avg_rating DESC, review_count DESC) AS genre_rank FROM qualified) SELECT genre, title, avg_rating, genre_avg_rating, genre_rank FROM ranked WHERE genre_rank <= 2 ORDER BY genre ASC, genre_rank ASC, title ASC;",
    "expectedColumns": [
      "genre",
      "title",
      "avg_rating",
      "genre_avg_rating",
      "genre_rank"
    ],
    "hints": [
      "Exclude low-review books in CTE 1 so they neither rank nor skew genre_avg_rating."
    ],
    "explanation": "Pre-filtering noisy records in CTE 1 ensures both ranks and window averages reflect valid samples.",
    "number": 171,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Filtered Top-N + Partition Avg"
  },
  {
    "id": "inter-172",
    "title": "172. Notion: Workspace Page Revision Frequency and Most Active Collaborator",
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
    "number": 172,
    "stage": "Inter Stage 2: Window Partitioning & Ranking",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "ROW_NUMBER"
  },
  {
    "id": "inter-173",
    "title": "173. Spotify: Day-Over-Day Stream Velocity Difference for Top Artists",
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
    "number": 173,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-174",
    "title": "174. Apple: Month-Over-Month App Revenue Growth Percentage",
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
    "number": 174,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-175",
    "title": "175. Meta: Detecting Inactivity Gaps Between Consecutive User Posts",
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
    "number": 175,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-176",
    "title": "176. Stripe: Rapid Successive Card Charge Fraud Detection",
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
    "number": 176,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-177",
    "title": "177. Snowflake: Cloud Data Warehouse Query Credit Spike Detection",
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
    "number": 177,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-178",
    "title": "178. Instacart: Grocery Reorder Cadence Elapsed Days Between Baskets",
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
    "number": 178,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-179",
    "title": "179. eBay: Fast Outbid Alerts Within 5 Minutes of Auction Bids",
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
    "number": 179,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LEAD"
  },
  {
    "id": "inter-180",
    "title": "180. Ramp: Vendor SaaS Price Per Seat Hikes Across Renewals",
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
    "number": 180,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-181",
    "title": "181. Strava: Segment Personal Record (PR) Improvement Margin",
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
    "number": 181,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-182",
    "title": "182. Expedia: Hotel Dynamic Search Price Jump After Successive Searches",
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
    "number": 182,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LEAD"
  },
  {
    "id": "inter-183",
    "title": "183. American Airlines: Daily Tail Number Flight Turnaround Time Efficiency",
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
    "number": 183,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-184",
    "title": "184. Hilton: Consecutive Multi-Night Hotel Stays Across Properties",
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
    "number": 184,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LEAD"
  },
  {
    "id": "inter-185",
    "title": "185. Yelp: Restaurant Health Inspection Rating Downgrade Detection",
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
    "number": 185,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Core",
    "patternTag": "LAG"
  },
  {
    "id": "inter-186",
    "title": "186. Netflix: Rolling 7-Day Average Hours Watched per Subscriber",
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
    "number": 186,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "AVG"
  },
  {
    "id": "inter-187",
    "title": "187. Twitter: First-Touch vs Last-Touch Marketing Attribution",
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
    "number": 187,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "FIRST_VALUE"
  },
  {
    "id": "inter-188",
    "title": "188. PayPal: Transfer Velocity Ratio vs 7-Day Rolling Average",
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
    "number": 188,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "AVG OVER"
  },
  {
    "id": "inter-189",
    "title": "189. Whoop: Sleep Recovery Score Below 3-Day Baseline Anomaly",
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
    "number": 189,
    "stage": "Inter Stage 3: Time-Series LAG/LEAD & Rolling Frames",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "AVG OVER"
  },
  {
    "id": "inter-190",
    "title": "190. Kick: Pareto 80/20 Channel Watch-Hours Contribution (Cumulative Share CTE)",
    "difficulty": "Medium",
    "companies": [
      "Kick",
      "Twitch"
    ],
    "topics": [
      "CTEs",
      "SUM OVER",
      "ROWS BETWEEN",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nKick Creator Monetization runs a Pareto analysis to see which top channels drive cumulative platform watch hours.\n\n### Requirements\n- CTE 1: aggregate `total_hours = SUM(hours_watched)` per `channel_name`.\n- Outer SELECT: order channels by `total_hours DESC, channel_name` ascending, and compute `cumulative_pct` = `ROUND(SUM(total_hours) OVER (ORDER BY total_hours DESC, channel_name ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 / SUM(total_hours) OVER (), 2)`.\n- Output columns: `channel_name`, `total_hours`, `cumulative_pct`.\n- Sort by `total_hours` descending, `channel_name` ascending.\n\n### Input Schema\n**channel_streams** (id INT, channel_name VARCHAR, hours_watched NUMERIC)",
    "schemaSql": "CREATE TABLE channel_streams (id INT PRIMARY KEY, channel_name VARCHAR(40), hours_watched NUMERIC);\nINSERT INTO channel_streams VALUES (1, 'ApexPro', 300), (2, 'ApexPro', 200), (3, 'ChessKing', 300), (4, 'RetroPlay', 150), (5, 'IndieDev', 50);",
    "starterSql": "-- Kick: Pareto Cumulative Watch-Hours Contribution\n-- Output: channel_name, total_hours, cumulative_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ch_totals AS (SELECT channel_name, SUM(hours_watched) AS total_hours FROM channel_streams GROUP BY channel_name) SELECT channel_name, total_hours, ROUND(SUM(total_hours) OVER (ORDER BY total_hours DESC, channel_name ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 / SUM(total_hours) OVER (), 2) AS cumulative_pct FROM ch_totals ORDER BY total_hours DESC, channel_name ASC;",
    "expectedColumns": [
      "channel_name",
      "total_hours",
      "cumulative_pct"
    ],
    "hints": [
      "Divide a running SUM(...) OVER (ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) by the grand SUM(...) OVER ()."
    ],
    "explanation": "Cumulative Pareto % combines a running frame numerator with an unpartitioned OVER() denominator.",
    "number": 190,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Cumulative Pareto % Share"
  },
  {
    "id": "inter-191",
    "title": "191. DoorDash: Preventing Cartesian Join Fanout on Multi-Item Order Totals",
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
    "number": 191,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "CTEs"
  },
  {
    "id": "inter-192",
    "title": "192. Coursera: Course Specialization Module Completion Drop-off Funnel",
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
    "number": 192,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "COUNT"
  },
  {
    "id": "inter-193",
    "title": "193. Patreon: Patron Lifetime Value (LTV) Across Creator Membership Tiers",
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
    "number": 193,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "SUM"
  },
  {
    "id": "inter-194",
    "title": "194. Splunk: Log Ingestion Spike Volume Outlier by Host Machine",
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
    "number": 194,
    "stage": "Inter Stage 4: Multi-CTE Pipelines & Cohort Prep",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "AVG OVER"
  },
  {
    "id": "inter-195",
    "title": "195. Kraken: Margin Account Consecutive Ratio Deterioration (LAG + Rolling Avg)",
    "difficulty": "Medium",
    "companies": [
      "Kraken",
      "Coinbase"
    ],
    "topics": [
      "LAG",
      "ROWS BETWEEN",
      "AVG OVER",
      "CTEs"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nKraken Risk Engineering monitors margin accounts for rapid collateral deterioration. Flag account snapshots where the current collateral ratio is strictly below `1.25`, dropped compared to the prior snapshot, and is also below the account's trailing 3-snapshot rolling average ratio.\n\n### Requirements\n- Compute `collateral_ratio = ROUND(collateral_usd / borrowed_usd (returning null if 0), 2)` in CTE 1 (`status = 'ACTIVE'` and `borrowed_usd > 0`).\n- In CTE 2, compute `prev_ratio = LAG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC)` and `rolling_3_avg = ROUND(AVG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)`.\n- Filter where `collateral_ratio < 1.25 AND prev_ratio IS NOT NULL AND collateral_ratio < prev_ratio AND collateral_ratio < rolling_3_avg`.\n- Output columns: `account_id`, `checked_at`, `collateral_ratio`, `prev_ratio`, `rolling_3_avg`.\n- Sort by `account_id` ascending, `checked_at` ascending.\n\n### Input Schema\n**margin_snapshots** (id INT, account_id INT, checked_at TIMESTAMP, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR)",
    "schemaSql": "CREATE TABLE margin_snapshots (id INT PRIMARY KEY, account_id INT, checked_at TIMESTAMP, collateral_usd NUMERIC, borrowed_usd NUMERIC, status VARCHAR(20));\nINSERT INTO margin_snapshots VALUES (1, 101, '2025-01-01 08:00:00', 15000, 10000, 'ACTIVE'), (2, 101, '2025-01-01 09:00:00', 13000, 10000, 'ACTIVE'), (3, 101, '2025-01-01 10:00:00', 11800, 10000, 'ACTIVE'), (4, 102, '2025-01-01 08:00:00', 12000, 10000, 'ACTIVE'), (5, 102, '2025-01-01 09:00:00', 12400, 10000, 'ACTIVE');",
    "starterSql": "-- Kraken: Margin Account Consecutive Ratio Deterioration\n-- Output: account_id, checked_at, collateral_ratio, prev_ratio, rolling_3_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH ratios AS (SELECT account_id, checked_at, ROUND(collateral_usd / NULLIF(borrowed_usd, 0), 2) AS collateral_ratio FROM margin_snapshots WHERE status = 'ACTIVE' AND borrowed_usd > 0), win AS (SELECT account_id, checked_at, collateral_ratio, LAG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC) AS prev_ratio, ROUND(AVG(collateral_ratio) OVER (PARTITION BY account_id ORDER BY checked_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3_avg FROM ratios) SELECT account_id, checked_at, collateral_ratio, prev_ratio, rolling_3_avg FROM win WHERE collateral_ratio < 1.25 AND prev_ratio IS NOT NULL AND collateral_ratio < prev_ratio AND collateral_ratio < rolling_3_avg ORDER BY account_id ASC, checked_at ASC;",
    "expectedColumns": [
      "account_id",
      "checked_at",
      "collateral_ratio",
      "prev_ratio",
      "rolling_3_avg"
    ],
    "hints": [
      "Compute collateral_ratio in CTE 1, then run both LAG() and ROWS BETWEEN 2 PRECEDING in CTE 2."
    ],
    "explanation": "Combining LAG() with a rolling frame threshold detects worsening risk trends while filtering out recovering accounts.",
    "number": 195,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Applied",
    "patternTag": "Rolling Baseline + LAG Alert"
  },
  {
    "id": "inter-196",
    "title": "196. FactSet: Consecutive Earnings Beat Streaks (Intro Gaps & Islands)",
    "difficulty": "Medium",
    "companies": [
      "FactSet",
      "Bloomberg"
    ],
    "topics": [
      "ROW_NUMBER",
      "CTEs",
      "GROUP BY",
      "Window Functions"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nFactSet Equity Research tracks consecutive quarterly earnings beats (`actual_eps > consensus_eps`). Find each company's longest consecutive beat streak (quarters are numbered sequentially via `quarter_seq`).\n\n### Requirements\n- Filter for quarters where `actual_eps > consensus_eps`.\n- Compute `island_key = quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq ASC)`.\n- Aggregate per `ticker` and `island_key` to get each streak length, then output each ticker's `longest_beat_streak`.\n- Output columns: `ticker`, `longest_beat_streak`.\n- Sort by `longest_beat_streak` descending, `ticker` ascending.\n\n### Input Schema\n**company_earnings** (id INT, ticker VARCHAR, quarter_seq INT, actual_eps NUMERIC, consensus_eps NUMERIC)",
    "schemaSql": "CREATE TABLE company_earnings (id INT PRIMARY KEY, ticker VARCHAR(10), quarter_seq INT, actual_eps NUMERIC, consensus_eps NUMERIC);\nINSERT INTO company_earnings VALUES (1, 'NVDA', 1, 1.10, 1.00), (2, 'NVDA', 2, 1.25, 1.15), (3, 'NVDA', 3, 1.40, 1.30), (4, 'NVDA', 4, 1.35, 1.45), (5, 'NVDA', 5, 1.60, 1.50), (6, 'AAPL', 1, 2.05, 2.00), (7, 'AAPL', 2, 1.95, 2.05), (8, 'AAPL', 3, 2.20, 2.10), (9, 'AAPL', 4, 2.30, 2.25);",
    "starterSql": "-- FactSet: Consecutive Earnings Beat Streaks (Intro Gaps & Islands)\n-- Output: ticker, longest_beat_streak\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH beats AS (SELECT ticker, quarter_seq, (quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq ASC)) AS island_key FROM company_earnings WHERE actual_eps > consensus_eps), streaks AS (SELECT ticker, island_key, COUNT(*) AS streak_len FROM beats GROUP BY ticker, island_key) SELECT ticker, MAX(streak_len) AS longest_beat_streak FROM streaks GROUP BY ticker ORDER BY longest_beat_streak DESC, ticker ASC;",
    "expectedColumns": [
      "ticker",
      "longest_beat_streak"
    ],
    "hints": [
      "Filter actual_eps > consensus_eps first, then subtract ROW_NUMBER() from quarter_seq."
    ],
    "explanation": "Subtracting ROW_NUMBER() from an integer sequence creates an invariant grouping key for consecutive streaks.",
    "number": 196,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "Streak Key (seq - ROW_NUMBER)",
    "conceptPrimer": {
      "title": "Bridge to Gaps & Islands: Sequence Minus ROW_NUMBER()",
      "mentalModel": "If a company beats consensus in quarters 1, 2, 3, misses in 4, and beats in 5, 6: numbering only the BEAT quarters (1, 2, 3, 4, 5) and subtracting from quarter_seq yields (1-1=0, 2-2=0, 3-3=0) and (5-4=1, 6-5=1)—grouping contiguous streaks automatically!",
      "syntaxTemplate": "WITH beats AS (\n  SELECT ticker, quarter_seq, quarter_seq - ROW_NUMBER() OVER (PARTITION BY ticker ORDER BY quarter_seq) AS grp\n  FROM earnings WHERE actual_eps > consensus_eps\n)\nSELECT ticker, MAX(cnt) FROM (SELECT ticker, grp, COUNT(*) AS cnt FROM beats GROUP BY ticker, grp) s GROUP BY ticker;",
      "visualType": "window-ranking"
    }
  },
  {
    "id": "inter-197",
    "title": "197. Zillow: Sparse-Date 7-Day Rolling Median/Avg Price Reduction (RANGE BETWEEN INTERVAL)",
    "difficulty": "Medium",
    "companies": [
      "Zillow",
      "Redfin"
    ],
    "topics": [
      "RANGE BETWEEN",
      "Window Frames",
      "AVG OVER",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nZillow Home Valuation tracks rolling 7-calendar-day average list prices per zip code—even when some days have **no** listings recorded. Use `RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW` so listings from 20 days ago aren't pulled into today's 7-day average!\n\n### Requirements\n- Partition by `zip_code`, order by `listed_date` ascending, and use `RANGE BETWEEN 6 days PRECEDING AND CURRENT ROW`.\n- Compute `rolling_7d_calendar_avg` rounded to 2 decimals.\n- Output columns: `zip_code`, `listed_date`, `list_price`, `rolling_7d_calendar_avg`.\n- Sort by `zip_code` ascending, `listed_date` ascending.\n\n### Input Schema\n**property_listings** (id INT, zip_code VARCHAR, listed_date TIMESTAMP, list_price NUMERIC)",
    "schemaSql": "CREATE TABLE property_listings (id INT PRIMARY KEY, zip_code VARCHAR(10), listed_date TIMESTAMP, list_price NUMERIC);\nINSERT INTO property_listings VALUES (1, '78701', '2025-01-01 00:00:00', 500000), (2, '78701', '2025-01-05 00:00:00', 600000), (3, '78701', '2025-01-20 00:00:00', 900000), (4, '78701', '2025-01-23 00:00:00', 700000), (5, '98101', '2025-01-02 00:00:00', 800000);",
    "starterSql": "-- Zillow: Sparse-Date 7-Day Rolling Avg (RANGE BETWEEN INTERVAL)\n-- Output: zip_code, listed_date, list_price, rolling_7d_calendar_avg\nSELECT\n  -- Your code here\n;",
    "referenceSql": "SELECT zip_code, listed_date, list_price, ROUND(AVG(list_price) OVER (PARTITION BY zip_code ORDER BY listed_date ASC RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW), 2) AS rolling_7d_calendar_avg FROM property_listings ORDER BY zip_code ASC, listed_date ASC;",
    "expectedColumns": [
      "zip_code",
      "listed_date",
      "list_price",
      "rolling_7d_calendar_avg"
    ],
    "hints": [
      "Replace ROWS BETWEEN with RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW."
    ],
    "explanation": "Notice '2025-01-20' ignores '2025-01-05' (15 days earlier), whereas ROWS BETWEEN would have included it!",
    "number": 197,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "Calendar RANGE Frame (Sparse Dates)",
    "conceptPrimer": {
      "title": "RANGE BETWEEN INTERVAL on Sparse Time Series",
      "mentalModel": "ROWS BETWEEN 6 PRECEDING counts 6 recorded rows—even if those rows were months apart! When dates have gaps, RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW looks strictly back 6 calendar days from each row's timestamp/date.",
      "syntaxTemplate": "AVG(price) OVER (\n  PARTITION BY zip_code\n  ORDER BY price_date ASC\n  RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW\n)",
      "visualType": "window-frame"
    }
  },
  {
    "id": "inter-198",
    "title": "198. Eventbrite: Two-Pass Burst Session Flagging (Intro Sessionization Prep)",
    "difficulty": "Medium",
    "companies": [
      "Eventbrite",
      "Ticketmaster"
    ],
    "topics": [
      "LAG",
      "SUM OVER",
      "CTEs",
      "Sessionization"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nEventbrite Bot Detection groups rapid ticket checkout attempts into burst IDs. A new burst begins if a user's first attempt occurs or more than **15 minutes** have passed since their previous attempt.\n\n### Requirements\n- CTE 1: flag `is_new_burst = 1` when `LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time)` is `NULL` or `attempt_time - LAG(...) > 15 minutes`, else `0`.\n- Outer SELECT: compute `burst_id = SUM(is_new_burst) OVER (PARTITION BY user_id ORDER BY attempt_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.\n- Output columns: `user_id`, `attempt_time`, `burst_id`.\n- Sort by `user_id` ascending, `attempt_time` ascending.\n\n### Input Schema\n**checkout_attempts** (id INT, user_id INT, attempt_time TIMESTAMP)",
    "schemaSql": "CREATE TABLE checkout_attempts (id INT PRIMARY KEY, user_id INT, attempt_time TIMESTAMP);\nINSERT INTO checkout_attempts VALUES (1, 10, '2025-01-01 10:00:00'), (2, 10, '2025-01-01 10:05:00'), (3, 10, '2025-01-01 10:30:00'), (4, 10, '2025-01-01 10:35:00'), (5, 20, '2025-01-01 11:00:00');",
    "starterSql": "-- Eventbrite: Two-Pass Burst Session Flagging\n-- Output: user_id, attempt_time, burst_id\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH flags AS (SELECT user_id, attempt_time, CASE WHEN LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time ASC) IS NULL OR (attempt_time - LAG(attempt_time) OVER (PARTITION BY user_id ORDER BY attempt_time ASC)) > INTERVAL '15 minutes' THEN 1 ELSE 0 END AS is_new_burst FROM checkout_attempts) SELECT user_id, attempt_time, SUM(is_new_burst) OVER (PARTITION BY user_id ORDER BY attempt_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS burst_id FROM flags ORDER BY user_id ASC, attempt_time ASC;",
    "expectedColumns": [
      "user_id",
      "attempt_time",
      "burst_id"
    ],
    "hints": [
      "Put the LAG() check in CTE 1, then take a running SUM(is_new_burst) OVER (...) in the outer SELECT."
    ],
    "explanation": "This 2-pass LAG + running SUM pattern is the foundation of all clickstream sessionization in Advanced SQL.",
    "number": 198,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Applied",
    "patternTag": "Two-Pass Sessionization Intro",
    "conceptPrimer": {
      "title": "Bridge to Sessionization: LAG Flag + Running SUM",
      "mentalModel": "You cannot nest SUM(LAG(...)) OVER(...) in SQL. Instead, Pass 1 emits a 1 whenever the time gap since the prior row exceeds the threshold (or for row 1), and Pass 2 runs SUM(is_new_group) OVER (PARTITION BY user ORDER BY time ROWS UNBOUNDED PRECEDING) to assign burst IDs 1, 1, 2, 3...",
      "syntaxTemplate": "WITH flags AS (\n  SELECT user_id, event_time,\n    CASE WHEN LAG(event_time) OVER (...) IS NULL OR event_time - LAG(event_time) OVER (...) > INTERVAL '15 minutes' THEN 1 ELSE 0 END AS is_new\n  FROM events\n)\nSELECT user_id, event_time, SUM(is_new) OVER (PARTITION BY user_id ORDER BY event_time ROWS UNBOUNDED PRECEDING) AS burst_id\nFROM flags;",
      "visualType": "cte-pipeline"
    }
  },
  {
    "id": "inter-199",
    "title": "199. StubHub: Parsing JSONB Ticket Event Payloads & Price Drops (JSONB + LAG)",
    "difficulty": "Medium",
    "companies": [
      "StubHub",
      "Stripe"
    ],
    "topics": [
      "JSONB",
      "LAG",
      "CTEs",
      "ROUND"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nStubHub ingests price-update events as raw `JSONB` blobs (`payload`). Extract `event_name` and `price`, then detect price drops strictly exceeding 20% compared to the previous listing price for that same event.\n\n### Requirements\n- CTE 1: extract `payload->>'event_name' AS event_name` and `(payload->>'price') AS price`.\n- CTE 2: compute `prev_price = LAG(price) OVER (PARTITION BY event_name ORDER BY updated_at ASC)`.\n- Outer SELECT: keep rows where `prev_price IS NOT NULL AND price < prev_price` and `ROUND((prev_price - price) * 100.0 / prev_price (returning null if 0), 2) > 20.0`.\n- Output columns: `event_name`, `updated_at`, `prev_price`, `price`, `drop_pct`.\n- Sort by `drop_pct` descending, `event_name` ascending.\n\n### Input Schema\n**listing_events** (id INT, updated_at TIMESTAMP, payload JSONB)",
    "schemaSql": "CREATE TABLE listing_events (id INT PRIMARY KEY, updated_at TIMESTAMP, payload JSONB);\nINSERT INTO listing_events VALUES (1, '2025-01-01 10:00:00', '{\"event_name\": \"Eras Tour\", \"price\": 500}'), (2, '2025-01-01 11:00:00', '{\"event_name\": \"Eras Tour\", \"price\": 350}'), (3, '2025-01-01 12:00:00', '{\"event_name\": \"Eras Tour\", \"price\": 320}'), (4, '2025-01-01 10:00:00', '{\"event_name\": \"NBA Finals\", \"price\": 400}'), (5, '2025-01-01 11:00:00', '{\"event_name\": \"NBA Finals\", \"price\": 280}');",
    "starterSql": "-- StubHub: Parsing JSONB Payloads & Price Drops\n-- Output: event_name, updated_at, prev_price, price, drop_pct\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH parsed AS (SELECT updated_at, payload->>'event_name' AS event_name, (payload->>'price')::NUMERIC AS price FROM listing_events), lagged AS (SELECT event_name, updated_at, price, LAG(price) OVER (PARTITION BY event_name ORDER BY updated_at ASC) AS prev_price FROM parsed) SELECT event_name, updated_at, prev_price, price, ROUND((prev_price - price) * 100.0 / NULLIF(prev_price, 0), 2) AS drop_pct FROM lagged WHERE prev_price IS NOT NULL AND ROUND((prev_price - price) * 100.0 / NULLIF(prev_price, 0), 2) > 20.0 ORDER BY drop_pct DESC, event_name ASC;",
    "expectedColumns": [
      "event_name",
      "updated_at",
      "prev_price",
      "price",
      "drop_pct"
    ],
    "hints": [
      "Extract text via ->> and cast numbers with ::NUMERIC inside CTE 1."
    ],
    "explanation": "Parsing semi-structured JSONB in CTE 1 lets downstream CTEs treat it like clean relational columns.",
    "number": 199,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Core",
    "patternTag": "JSONB Extraction + LAG",
    "conceptPrimer": {
      "title": "Extracting Denormalized JSONB Fields in PostgreSQL",
      "mentalModel": "Use payload->>'key' to extract a JSON field as TEXT, then cast numeric values with (payload->>'price')::NUMERIC. Clean JSON extraction inside CTE 1, then run standard window/GROUP BY analytics in CTE 2!",
      "syntaxTemplate": "WITH parsed AS (\n  SELECT id, payload->>'event' AS event_name, (payload->>'price')::NUMERIC AS price\n  FROM raw_events\n)\nSELECT ... FROM parsed;",
      "visualType": "cte-pipeline"
    }
  },
  {
    "id": "inter-200",
    "title": "200. Datadog: Recursive Service Dependency Depth (Intro WITH RECURSIVE)",
    "difficulty": "Medium",
    "companies": [
      "Datadog",
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
    "description": "### Problem Statement\nDatadog Service Map traces microservice call dependencies. Starting from edge gateway services (`upstream_id IS NULL` at `depth = 1`), recursively compute the dependency depth of every downstream service.\n\n### Requirements\n- Anchor query: `upstream_id` is missing, `depth = 1`.\n- Recursive step: join `services s` to the CTE on `s.upstream_id = d.service_id` incrementing `depth + 1`.\n- Output columns: `service_id`, `service_name`, `depth`.\n- Sort by `depth` ascending, `service_id` ascending.\n\n### Input Schema\n**services** (service_id INT, service_name VARCHAR, upstream_id INT)",
    "schemaSql": "CREATE TABLE services (service_id INT PRIMARY KEY, service_name VARCHAR(40), upstream_id INT);\nINSERT INTO services VALUES (1, 'api-gateway', NULL), (2, 'auth-service', 1), (3, 'checkout-service', 1), (4, 'payment-worker', 3), (5, 'ledger-db-proxy', 4);",
    "starterSql": "-- Datadog: Recursive Service Dependency Depth\n-- Output: service_id, service_name, depth\nWITH RECURSIVE deps AS (\n  -- 1. Anchor\n  SELECT ...\n  UNION ALL\n  -- 2. Recursive step\n  SELECT ...\n)\nSELECT service_id, service_name, depth FROM deps ORDER BY depth ASC, service_id ASC;",
    "referenceSql": "WITH RECURSIVE deps AS (SELECT service_id, service_name, 1 AS depth FROM services WHERE upstream_id IS NULL UNION ALL SELECT s.service_id, s.service_name, d.depth + 1 FROM services s JOIN deps d ON s.upstream_id = d.service_id) SELECT service_id, service_name, depth FROM deps ORDER BY depth ASC, service_id ASC;",
    "expectedColumns": [
      "service_id",
      "service_name",
      "depth"
    ],
    "hints": [
      "Always connect the Anchor and Recursive SELECT using UNION ALL."
    ],
    "explanation": "Mastering simple depth traversal in Intermediate prepares you for full BOM explosions and breadcrumb paths in Advanced.",
    "number": 200,
    "stage": "Inter Stage 5: Pre-Advanced Bridge",
    "stageOrder": 5,
    "rampStep": "Warm-up",
    "patternTag": "WITH RECURSIVE Intro",
    "conceptPrimer": {
      "title": "Bridge to Advanced: Your First WITH RECURSIVE Tree",
      "mentalModel": "WITH RECURSIVE repeats a query until no new rows appear. Part 1 (Anchor) selects root nodes (upstream_id IS NULL) with depth = 1. Part 2 (Recursive) joins the table back to the CTE itself (s.upstream_id = t.service_id) with depth + 1, connected by UNION ALL.",
      "syntaxTemplate": "WITH RECURSIVE deps AS (\n  SELECT id, name, 1 AS depth FROM services WHERE upstream_id IS NULL\n  UNION ALL\n  SELECT s.id, s.name, d.depth + 1 FROM services s JOIN deps d ON s.upstream_id = d.id\n)\nSELECT * FROM deps;",
      "visualType": "recursive-tree"
    }
  },
  {
    "id": "adv-201",
    "title": "201. PayPal: CDC Event Stream Deduplication with Status Precedence",
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
    "number": 201,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-202",
    "title": "202. Square: POS Terminal Offline Transaction Idempotency Deduplication",
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
    "number": 202,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-203",
    "title": "203. Meta: Multi-Step User Onboarding Funnel Sequence Strict Ordering",
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
    "number": 203,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Funnel Analysis"
  },
  {
    "id": "adv-204",
    "title": "204. Uber: Rider Ride Request to Pickup Funnel Drop-Off Sequence",
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
    "number": 204,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-205",
    "title": "205. Microsoft: Corporate Org Hierarchy Depth and Management Path",
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
    "number": 205,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-206",
    "title": "206. GitHub: Recursive Git Commit Tree Ancestry to Root Initial Commit",
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
    "number": 206,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-207",
    "title": "207. Boeing: Aircraft Wing Assembly Multi-Level Part Tree Explosion",
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
    "number": 207,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-208",
    "title": "208. Duolingo: Longest Consecutive Daily Learning Streak",
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
    "number": 208,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-209",
    "title": "209. GitHub: Longest Consecutive Daily Contribution Streak",
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
    "description": "### Problem Statement\nGitHub Profile Analytics rewards developer contribution consistency. Find the longest consecutive daily contribution streak achieved by each developer.\n\n### Requirements\n- Group consecutive calendar dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak_days for each continuous contribution island.\n- Find maximum streak achieved per developer.\n- Output columns: developer_name, max_streak_days.\n- Sort by max_streak_days descending, then by developer_name ascending.\n\n### Input Schema\n**developer_contributions** (id INT, developer_name VARCHAR, contribution_date DATE)",
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
    "number": 209,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Warm-up",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-210",
    "title": "210. Google: Search Query Sessionization with 30-Minute Inactivity Window",
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
    "number": 210,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Sessionization"
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
    "number": 211,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-212",
    "title": "212. AWS: Merging Overlapping Cloud Data Center Downtime Windows",
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
    "number": 212,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-213",
    "title": "213. Cloudflare: Overlapping DDoS Attack Interval Consolidation",
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
    "number": 213,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-214",
    "title": "214. Stripe: Triangular Monthly Merchant Retention Cohort Matrix",
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
    "number": 214,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-215",
    "title": "215. Spotify: Artist Monthly Listener Retention Cohort Decay",
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
    "number": 215,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-216",
    "title": "216. Amazon: FIFO Inventory Lot Depletion for Customer Shipments",
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
    "number": 216,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Inventory FIFO"
  },
  {
    "id": "adv-217",
    "title": "217. Robinhood: FIFO Share Lot Capital Gains Calculation",
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
    "number": 217,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-218",
    "title": "218. Apple: Recursive Bill of Materials (BOM) Component Cost Rollup",
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
    "number": 218,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-219",
    "title": "219. Citadel: High-Frequency Triangular Currency Arbitrage Opportunity",
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
    "number": 219,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "Arbitrage"
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
    "number": 220,
    "stage": "Adv Stage 1: Core Big-Tech Pattern Foundations",
    "stageOrder": 1,
    "rampStep": "Core",
    "patternTag": "JOIN"
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
    "number": 221,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-222",
    "title": "222. Datadog: Continuous Service Outage Window Consolidation",
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
    "number": 222,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-223",
    "title": "223. Coinbase: Blockchain Reorganization Block Transaction Reconciliation",
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
    "number": 223,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-224",
    "title": "224. Reddit: Subreddit Browsing Sessionization with 20-Minute Inactivity Threshold",
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
    "number": 224,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-225",
    "title": "225. Fastly: Edge CDN Server Outage Downtime Consolidation",
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
    "number": 225,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-226",
    "title": "226. Plaid: Bank Account Balance Ledger Transaction Deduplication",
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
    "number": 226,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-227",
    "title": "227. Discord: Voice Channel Sessionization with 10-Minute Silence Window",
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
    "number": 227,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-228",
    "title": "228. PagerDuty: Overlapping Severity-1 Incident Downtime Consolidation",
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
    "number": 228,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-229",
    "title": "229. Brex: Corporate Expense Reimbursement Double-Submission Deduplication",
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
    "number": 229,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-230",
    "title": "230. Twitch: Live Stream Viewing Sessionization with 30-Minute Disconnect Timeout",
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
    "number": 230,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-231",
    "title": "231. CrowdStrike: Endpoint Malware Outbreak Timeline Interval Merging",
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
    "number": 231,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-232",
    "title": "232. Stripe: Payment Webhook Retry Idempotency and Event Deduplication",
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
    "number": 232,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-233",
    "title": "233. YouTube: Watch Sessionization with 20-Minute Video Inactivity Window",
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
    "number": 233,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-234",
    "title": "234. New Relic: Infrastructure Host Incident Downtime Consolidation",
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
    "number": 234,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-235",
    "title": "235. Affirm: Buy-Now-Pay-Later Loan Application Deduplication",
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
    "number": 235,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-236",
    "title": "236. Pinterest: Pin Browsing Sessionization with 30-Minute Inactivity Window",
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
    "number": 236,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-237",
    "title": "237. Klarna: Checkout Merchant Payment Authorization Deduplication",
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
    "number": 237,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-238",
    "title": "238. Medium: Reading Sessionization with 25-Minute Article Inactivity Window",
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
    "number": 238,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-239",
    "title": "239. Dynatrace: Synthetic Browser Check Failure Outage Consolidation",
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
    "number": 239,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-240",
    "title": "240. Adyen: Point-of-Sale Tokenized Card Swipe Deduplication",
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
    "number": 240,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-241",
    "title": "241. Steam: Gaming Sessionization with 60-Minute Lobby Inactivity Threshold",
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
    "number": 241,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Sessionization"
  },
  {
    "id": "adv-242",
    "title": "242. Akamai: Global Edge Server Maintenance Downtime Consolidation",
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
    "number": 242,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-243",
    "title": "243. Ramp: Corporate Travel Expense Booking Double-Payment Deduplication",
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
    "number": 243,
    "stage": "Adv Stage 2: Sessionization, Intervals & CDC Deduplication",
    "stageOrder": 2,
    "rampStep": "Core",
    "patternTag": "Deduplication"
  },
  {
    "id": "adv-244",
    "title": "244. Snowflake: Recursive Role-Based Access Control (RBAC) Privilege Inheritance",
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
    "number": 244,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-245",
    "title": "245. Shopify: Merchant First-Sale Cohort LTV Expansion Matrix",
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
    "number": 245,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-246",
    "title": "246. Tesla: Vehicle Gigafactory Sub-Assembly Component Rollup",
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
    "number": 246,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-247",
    "title": "247. DoorDash: Order Checkout Multi-Stage Funnel Conversion",
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
    "number": 247,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-248",
    "title": "248. Salesforce: Recursive Account Hierarchy Parent-Child Revenue Rollup",
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
    "number": 248,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-249",
    "title": "249. Airbnb: Guest First-Booking Yearly Rebooking Retention Matrix",
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
    "number": 249,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-250",
    "title": "250. SpaceX: Falcon 9 Stage 1 Booster Component Refurbishment Hierarchy",
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
    "number": 250,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-251",
    "title": "251. Atlassian: Recursive Jira Epic-to-Subtask Parent Hierarchy Traversal",
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
    "number": 251,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-252",
    "title": "252. Substack: Paid Newsletter Monthly Subscription Retention Matrix",
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
    "number": 252,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-253",
    "title": "253. GM: EV Battery Cell Module Component Cost Explosion",
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
    "number": 253,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-254",
    "title": "254. Airbnb: Guest Search-to-Booking Funnel Conversion Sequence",
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
    "number": 254,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-255",
    "title": "255. Notion: Recursive Document Page Hierarchy and Full Breadcrumb Path",
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
    "number": 255,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-256",
    "title": "256. Canva: User Template Creation Quarterly Retention Matrix",
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
    "number": 256,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-257",
    "title": "257. Ford: F-150 Lightning Powertrain Subcomponent Tree Cost Rollup",
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
    "number": 257,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
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
    "number": 258,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-259",
    "title": "259. Slack: Recursive User Group Mention and Nested Channel Membership",
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
    "number": 259,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-260",
    "title": "260. Notion: Workspace Team Member Monthly Activity Retention Matrix",
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
    "number": 260,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-261",
    "title": "261. Lockheed Martin: Satellite Subsystem Bill of Materials Explosion",
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
    "number": 261,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-262",
    "title": "262. Zoom: Enterprise Meeting Lifecycle Funnel Sequence",
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
    "number": 262,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-263",
    "title": "263. Google: Recursive Folder Directory Structure and Breadcrumb Paths",
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
    "number": 263,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-264",
    "title": "264. Dropbox: Business Team Storage Expansion Quarterly Cohort Matrix",
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
    "number": 264,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-265",
    "title": "265. ASML: Photolithography Extreme Ultraviolet (EUV) Mirror BOM Explosion",
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
    "number": 265,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-266",
    "title": "266. Booking.com: Travel Reservation Search-to-Stay Funnel Sequence",
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
    "number": 266,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-267",
    "title": "267. Figma: Recursive Component Variant and Auto-Layout Frame Hierarchy",
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
    "number": 267,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-268",
    "title": "268. Slack: Paid Enterprise Grid Seat Retention Cohort Matrix",
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
    "number": 268,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-269",
    "title": "269. Rivian: Electric Delivery Van Subsystem Part Cost Rollup",
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
    "number": 269,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-270",
    "title": "270. Twitter: Viral Tweet Interaction Funnel Sequence",
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
    "number": 270,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-271",
    "title": "271. Linear: Recursive Project Milestone Sub-Issue Tree Rollup",
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
    "number": 271,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-272",
    "title": "272. Coursera: Enterprise Learning Program Annual Cohort Retention Matrix",
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
    "number": 272,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Cohort Analysis"
  },
  {
    "id": "adv-273",
    "title": "273. Caterpillar: Heavy Mining Excavator Engine Assembly Tree Explosion",
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
    "number": 273,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "WITH RECURSIVE"
  },
  {
    "id": "adv-274",
    "title": "274. Uber Eats: Food Delivery Order-to-Eats Funnel Sequence",
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
    "number": 274,
    "stage": "Adv Stage 3: Recursive Trees, Cohorts & Multi-Step Funnels",
    "stageOrder": 3,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-275",
    "title": "275. Strava: Consecutive Day Running Streak Leaderboard",
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
    "description": "### Problem Statement\nStrava Challenges rewards athletes who run every single day. For each runner, calculate their longest consecutive daily run streak in calendar days.\n\n### Requirements\n- Group consecutive calendar run dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each athlete.\n- Output columns: athlete_name, max_streak_days.\n- Sort by max_streak_days descending, then by athlete_name ascending.\n\n### Input Schema\n**athlete_runs** (id INT, athlete_name VARCHAR, run_date DATE)",
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
    "number": 275,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-276",
    "title": "276. Wayfair: Warehouse Pallet FIFO Inventory Fulfillment Allocation",
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
    "number": 276,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-277",
    "title": "277. Two Sigma: Algorithmic Alpha Signal Lead-Lag Cross-Correlation",
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
    "number": 277,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "LEAD"
  },
  {
    "id": "adv-278",
    "title": "278. Peloton: Daily Workout Activity Streak Island Detection",
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
    "description": "### Problem Statement\nPeloton Member Achievements rewards riders who work out every day. Find the longest consecutive calendar day workout streak for each member.\n\n### Requirements\n- Group consecutive calendar workout dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per member.\n- Output columns: member_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by member_id ascending.\n\n### Input Schema\n**workout_logs** (id INT, member_id INT, workout_date DATE)",
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
    "number": 278,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-279",
    "title": "279. Instacart: Shopper Delivery Batch Multi-Step Order Milestones",
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
    "number": 279,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Funnel Sequence"
  },
  {
    "id": "adv-280",
    "title": "280. Target: Distribution Center FIFO Carton Depletion for Replenishment",
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
    "number": 280,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-281",
    "title": "281. Jump Trading: Order Book Bid-Ask Spread Inversion and Cross Detection",
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
    "number": 281,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "JOIN"
  },
  {
    "id": "adv-282",
    "title": "282. Wordle: Consecutive Daily Puzzle Solution Streaks",
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
    "description": "### Problem Statement\nNew York Times Games calculates player Wordle streak badges. Find the longest consecutive daily puzzle solve streak achieved by each player.\n\n### Requirements\n- Group consecutive calendar solve dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each player.\n- Output columns: player_name, max_streak_days.\n- Sort by max_streak_days descending, then by player_name ascending.\n\n### Input Schema\n**puzzle_solves** (id INT, player_name VARCHAR, solve_date DATE)",
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
    "number": 282,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-283",
    "title": "283. Home Depot: Lumber Yard FIFO Bundle Inventory Depletion",
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
    "number": 283,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-284",
    "title": "284. Flow Traders: Corporate Bond Liquidity Arbitrage Spread Monitor",
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
    "number": 284,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "JOIN"
  },
  {
    "id": "adv-285",
    "title": "285. LeetCode: Daily Coding Challenge Consecutive Streak Calculation",
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
    "description": "### Problem Statement\nLeetCode Profile Stats awards the 100-Day Streak Badge. For each user, calculate the length in calendar days of their longest consecutive daily challenge submission streak.\n\n### Requirements\n- Group consecutive calendar solve dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find the longest streak for each user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**leetcode_submissions** (id INT, user_id INT, solve_date DATE)",
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
    "number": 285,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-286",
    "title": "286. Best Buy: Geek Squad Refurbished Appliance FIFO Lot Allocation",
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
    "number": 286,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-287",
    "title": "287. Optiver: High-Frequency Index Option Put-Call Parity Arbitrage Scanner",
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
    "number": 287,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "JOIN"
  },
  {
    "id": "adv-288",
    "title": "288. Apple: Daily Active Workout Streak Islands Detection",
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
    "description": "### Problem Statement\nApple Fitness Activity Rings tracks daily Move ring closes. For each user, find their longest contiguous consecutive daily ring closure streak.\n\n### Requirements\n- Group consecutive calendar ring close dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**ring_closures** (id INT, user_id INT, close_date DATE)",
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
    "number": 288,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-289",
    "title": "289. Walmart: Perishable Produce Lot FIFO Expiration Depletion",
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
    "number": 289,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-290",
    "title": "290. HRT: Statistical Arbitrage Mean Reversion Spread Tracking",
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
    "number": 290,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "AVG OVER"
  },
  {
    "id": "adv-291",
    "title": "291. Fitbit: Daily 10000 Step Milestone Streak Detection",
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
    "description": "### Problem Statement\nFitbit Health Challenges awards the 10K Daily Steps Master Badge. For each user who logged days with steps >= 10000, find their longest contiguous consecutive daily streak meeting this goal.\n\n### Requirements\n- Filter for dates where steps >= 10000.\n- Group consecutive calendar dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**daily_steps** (id INT, user_id INT, log_date DATE, steps INT)",
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
    "number": 291,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-292",
    "title": "292. Splunk: Network Firewall Blocked Incident Overlap Merging",
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
    "number": 292,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Interval Merging"
  },
  {
    "id": "adv-293",
    "title": "293. Costco: Bulk Wholesale Pallet FIFO Depletion for Warehouse Clubs",
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
    "number": 293,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-294",
    "title": "294. Chess.com: Consecutive Daily Rated Game Win Streaks",
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
    "description": "### Problem Statement\nChess.com Leaderboard Analytics tracks grandmaster consistency. Find the longest consecutive calendar day rated match win streak for each chess player.\n\n### Requirements\n- Filter for games where is_win = TRUE.\n- Group consecutive calendar win dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per player.\n- Output columns: player_name, max_streak_days.\n- Sort by max_streak_days descending, then by player_name ascending.\n\n### Input Schema\n**chess_matches** (id INT, player_name VARCHAR, match_date DATE, is_win BOOLEAN)",
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
    "number": 294,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-295",
    "title": "295. Sysco: Cold-Chain Food Distribution FIFO Pallet Depletion",
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
    "number": 295,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-296",
    "title": "296. DRW: Energy Futures Crack Spread Arbitrage Calculation",
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
    "number": 296,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "JOIN"
  },
  {
    "id": "adv-297",
    "title": "297. Robinhood: Consecutive Daily Active Trading Days Streak",
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
    "description": "### Problem Statement\nRobinhood Gold Gamification tracks active retail trader daily streaks. For each user who executed at least one trade on consecutive market trading dates, calculate their longest contiguous trading day streak.\n\n### Requirements\n- Group consecutive calendar trading dates using date - ROW_NUMBER() * 1 day.\n- Calculate streak duration in days for each uninterrupted island.\n- Find maximum streak achieved per user.\n- Output columns: user_id, longest_streak_days.\n- Sort by longest_streak_days descending, then by user_id ascending.\n\n### Input Schema\n**trader_activity** (id INT, user_id INT, trade_date DATE)",
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
    "number": 297,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Gaps & Islands"
  },
  {
    "id": "adv-298",
    "title": "298. McKesson: Pharmaceutical Drug Batch FIFO Lot Allocation",
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
    "number": 298,
    "stage": "Adv Stage 4: Staff Engineering, FIFO & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "FIFO"
  },
  {
    "id": "adv-299",
    "title": "299. Virtu Financial: Running Position Inventory & VWAP Cost Basis",
    "difficulty": "Hard",
    "companies": [
      "Virtu Financial",
      "Citadel"
    ],
    "topics": [
      "SUM OVER",
      "ROWS BETWEEN",
      "CTEs",
      "CASE WHEN"
    ],
    "frequency": "High",
    "category": "Window Functions",
    "orderSensitive": true,
    "description": "### Problem Statement\nVirtu Financial tracks real-time net share position and cumulative Volume-Weighted Average Price (VWAP) across sequential order fills per symbol.\n\n### Requirements\n- For each fill ordered by `fill_time ASC, id` ascending per `symbol`:\n - `net_shares` = running sum of `CASE WHEN side = 'BUY' THEN shares ELSE -shares END` using `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.\n - `running_buy_vwap` = cumulative buy notional divided by cumulative buy shares up to current row (rounded to 2 decimals, `NULL` if zero buys so far).\n- Output columns: `symbol`, `fill_time`, `side`, `shares`, `price`, `net_shares`, `running_buy_vwap`.\n- Sort by `symbol` ascending, `fill_time` ascending, `id` ascending.\n\n### Input Schema\n**fills** (id INT, symbol VARCHAR, fill_time TIMESTAMP, side VARCHAR, shares INT, price NUMERIC)",
    "schemaSql": "CREATE TABLE fills (id INT PRIMARY KEY, symbol VARCHAR(10), fill_time TIMESTAMP, side VARCHAR(10), shares INT, price NUMERIC);\nINSERT INTO fills VALUES (1, 'AAPL', '2025-01-01 09:30:00', 'BUY', 100, 180.00), (2, 'AAPL', '2025-01-01 09:31:00', 'BUY', 200, 183.00), (3, 'AAPL', '2025-01-01 09:32:00', 'SELL', 150, 185.00), (4, 'MSFT', '2025-01-01 09:30:00', 'BUY', 50, 400.00);",
    "starterSql": "-- Virtu Financial: Running Position Inventory & VWAP Cost Basis\n-- Output: symbol, fill_time, side, shares, price, net_shares, running_buy_vwap\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH cum AS (SELECT id, symbol, fill_time, side, shares, price, SUM(CASE WHEN side = 'BUY' THEN shares ELSE -shares END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS net_shares, SUM(CASE WHEN side = 'BUY' THEN shares * price ELSE 0 END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_buy_notional, SUM(CASE WHEN side = 'BUY' THEN shares ELSE 0 END) OVER (PARTITION BY symbol ORDER BY fill_time ASC, id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_buy_shares FROM fills) SELECT symbol, fill_time, side, shares, price, net_shares, ROUND(cum_buy_notional / NULLIF(cum_buy_shares, 0), 2) AS running_buy_vwap FROM cum ORDER BY symbol ASC, fill_time ASC, id ASC;",
    "expectedColumns": [
      "symbol",
      "fill_time",
      "side",
      "shares",
      "price",
      "net_shares",
      "running_buy_vwap"
    ],
    "hints": [
      "Compute cumulative buy notional and cumulative buy shares separately in CTE 1 with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
    ],
    "explanation": "Tracking cumulative signed inventory and buy-side VWAP via parallel running frames is critical for execution quality reporting.",
    "number": 299,
    "stage": "Adv Stage 4: Staff Engineering & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Running Inventory & VWAP"
  },
  {
    "id": "adv-300",
    "title": "300. Citadel Securities: Multi-Desk Portfolio Delta Netting, Fanout Defense & Risk Rank",
    "difficulty": "Hard",
    "companies": [
      "Citadel Securities",
      "Jane Street"
    ],
    "topics": [
      "CTEs",
      "Fanout Prevention",
      "DENSE_RANK",
      "SUM OVER"
    ],
    "frequency": "Very High",
    "category": "Advanced SQL",
    "orderSensitive": true,
    "description": "### Problem Statement\nCitadel Risk Engine computes net portfolio delta across equity positions and option contracts without causing Cartesian fanout across desks, then ranks the top riskiest underlying symbols by absolute net delta share.\n\n### Requirements\n- CTE 1 (`equity_net`): sum `shares` per `underlying_symbol` as `equity_delta`.\n- CTE 2 (`option_net`): sum `position_contracts * contract_delta * 100.0` per `underlying_symbol` as `option_delta`.\n- CTE 3 (`combined`): a full outer combination `equity_net` and `option_net` via `e.underlying_symbol` (treating missing values as `o.underlying_symbol`), computing `net_delta = ROUND((equity_delta, defaulting to 0 if missing) + (option_delta, defaulting to 0 if missing), 2)` and `required_hedge = ROUND(-1.0 * ((equity_delta, defaulting to 0 if missing) + (option_delta, defaulting to 0 if missing)), 2)`.\n- Final SELECT: attach `risk_rank = DENSE_RANK() OVER (ORDER BY ABS(net_delta) DESC)` and `abs_risk_share_pct = ROUND(ABS(net_delta) * 100.0 / NULLIF(SUM(ABS(net_delta)) OVER (), 0), 2)`.\n- Output columns: `underlying_symbol`, `net_delta`, `required_hedge`, `abs_risk_share_pct`, `risk_rank`.\n- Sort by `risk_rank` ascending, `underlying_symbol` ascending.\n\n### Input Schema\n**equity_positions** (id INT, underlying_symbol VARCHAR, shares NUMERIC)\n\n**option_positions** (id INT, underlying_symbol VARCHAR, position_contracts INT, contract_delta NUMERIC)",
    "schemaSql": "CREATE TABLE equity_positions (id INT PRIMARY KEY, underlying_symbol VARCHAR(10), shares NUMERIC);\nCREATE TABLE option_positions (id INT PRIMARY KEY, underlying_symbol VARCHAR(10), position_contracts INT, contract_delta NUMERIC);\nINSERT INTO equity_positions VALUES (1, 'NVDA', 500), (2, 'NVDA', -200), (3, 'AAPL', 400);\nINSERT INTO option_positions VALUES (1, 'NVDA', 10, 0.50), (2, 'TSLA', -15, 0.60), (3, 'TSLA', 5, -0.40);",
    "starterSql": "-- Citadel Securities: Multi-Desk Portfolio Delta Netting Capstone\n-- Output: underlying_symbol, net_delta, required_hedge, abs_risk_share_pct, risk_rank\nSELECT\n  -- Your code here\n;",
    "referenceSql": "WITH equity_net AS (SELECT underlying_symbol, SUM(shares) AS equity_delta FROM equity_positions GROUP BY underlying_symbol), option_net AS (SELECT underlying_symbol, SUM(position_contracts * contract_delta * 100.0) AS option_delta FROM option_positions GROUP BY underlying_symbol), combined AS (SELECT COALESCE(e.underlying_symbol, o.underlying_symbol) AS underlying_symbol, ROUND(COALESCE(e.equity_delta, 0) + COALESCE(o.option_delta, 0), 2) AS net_delta, ROUND(-1.0 * (COALESCE(e.equity_delta, 0) + COALESCE(o.option_delta, 0)), 2) AS required_hedge FROM equity_net e FULL OUTER JOIN option_net o ON e.underlying_symbol = o.underlying_symbol) SELECT underlying_symbol, net_delta, required_hedge, ROUND(ABS(net_delta) * 100.0 / NULLIF(SUM(ABS(net_delta)) OVER (), 0), 2) AS abs_risk_share_pct, DENSE_RANK() OVER (ORDER BY ABS(net_delta) DESC) AS risk_rank FROM combined ORDER BY risk_rank ASC, underlying_symbol ASC;",
    "expectedColumns": [
      "underlying_symbol",
      "net_delta",
      "required_hedge",
      "abs_risk_share_pct",
      "risk_rank"
    ],
    "hints": [
      "Pre-aggregate equity_positions and option_positions separately, then FULL OUTER JOIN on underlying_symbol."
    ],
    "explanation": "FULL OUTER JOIN on pre-aggregated CTEs safely merges disjoint asset books while computing portfolio-wide risk rankings.",
    "number": 300,
    "stage": "Adv Stage 4: Staff Engineering & Quant Capstones",
    "stageOrder": 4,
    "rampStep": "Applied",
    "patternTag": "Staff Quant Risk Capstone"
  }
];

export function getInterviewQuestionById(id: string): InterviewQuestion | undefined {
  return INTERVIEW_QUESTIONS.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export const INTERVIEW_COMPANIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.flatMap((q) => q.companies))
).sort();

export const INTERVIEW_CATEGORIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.map((q) => q.category))
).sort();
