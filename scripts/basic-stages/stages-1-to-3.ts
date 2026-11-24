import { makeBasicQ } from "./helpers";
import type { InterviewQuestion } from "../../src/lib/content/interview-questions";

const S1 = "Stage 1: Core Querying & Dirty Hygiene";
const S2 = "Stage 2: Conditional Logic & Dates";
const S3 = "Stage 3: Aggregations & Grouping";

export function getBasicStages1To3(): InterviewQuestion[] {
  return [
    // ================= STAGE 1: CORE QUERYING & DIRTY HYGIENE (1 - 10) =================
    makeBasicQ({
      number: 1,
      titleBody: "Netflix: Top 5 Longest 4K Ultra-HD Movies",
      companies: ["Netflix", "Amazon"],
      topics: ["SELECT", "WHERE", "ORDER BY", "LIMIT"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Warm-up",
      patternTag: "Filtering & Deterministic Sorting",
      description: `### Problem Statement
Netflix Content Engineering wants to inspect the longest movies available in 4K Ultra-HD resolution. Retrieve the top 5 longest 4K movies.

### Requirements
- Only consider movies where \`is_4k\` is \`TRUE\`.
- Sort from longest \`duration_minutes\` to shortest; break ties alphabetically by \`title\` ascending.
- Return at most 5 rows with columns \`title\`, \`duration_minutes\`.

### Input Schema
**movies** (id INT, title VARCHAR, duration_minutes INT, is_4k BOOLEAN, release_year INT)`,
      schemaSql: `CREATE TABLE movies (id INT PRIMARY KEY, title VARCHAR(100), duration_minutes INT, is_4k BOOLEAN, release_year INT);
INSERT INTO movies VALUES (1, 'The Irishman', 209, TRUE, 2019), (2, 'Roma', 135, TRUE, 2018), (3, 'Red Notice', 118, TRUE, 2021), (4, 'Extraction 2', 123, TRUE, 2023), (5, 'Glass Onion', 139, TRUE, 2022), (6, 'Marriage Story', 137, FALSE, 2019), (7, 'All Quiet on the Western Front', 148, TRUE, 2022);`,
      referenceSql: `SELECT title, duration_minutes FROM movies WHERE is_4k = TRUE ORDER BY duration_minutes DESC, title ASC LIMIT 5;`,
      expectedColumns: ["title", "duration_minutes"],
      hints: ["Filter with WHERE is_4k = TRUE.", "Sort by duration_minutes DESC, title ASC.", "Add LIMIT 5."],
      explanation: "Always add a deterministic tie-breaker (like title ASC) in ORDER BY when applying LIMIT.",
    }),
    makeBasicQ({
      number: 2,
      titleBody: "Airbnb: Distinct Active Cities with Clean Whitespace",
      companies: ["Airbnb", "Booking.com"],
      topics: ["DISTINCT", "TRIM", "WHERE IS NOT NULL"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Warm-up",
      patternTag: "String Cleaning & DISTINCT",
      description: `### Problem Statement
Airbnb Inventory Ops discovered city names entered with stray leading/trailing spaces and missing values. Produce a clean, deduplicated list of cities that have at least one active listing.

### Requirements
- Exclude listings where \`city\` is \`NULL\` or blank after trimming.
- Include only listings where \`is_active\` is \`TRUE\`.
- Trim whitespace from \`city\` and return unique values as \`clean_city\`.
- Sort alphabetically by \`clean_city\` ascending.

### Input Schema
**listings** (id INT, title VARCHAR, city VARCHAR, is_active BOOLEAN)`,
      schemaSql: `CREATE TABLE listings (id INT PRIMARY KEY, title VARCHAR(100), city VARCHAR(50), is_active BOOLEAN);
INSERT INTO listings VALUES (1, 'SoHo Loft', ' New York', TRUE), (2, 'Midtown Studio', 'New York ', TRUE), (3, 'Mission Flat', 'Austin', TRUE), (4, 'Ghost Condo', NULL, TRUE), (5, 'Blank Entry', '   ', TRUE), (6, 'Old Cabin', 'Denver', FALSE);`,
      referenceSql: `SELECT DISTINCT TRIM(city) AS clean_city FROM listings WHERE is_active = TRUE AND city IS NOT NULL AND TRIM(city) <> '' ORDER BY clean_city ASC;`,
      expectedColumns: ["clean_city"],
      hints: ["Use TRIM(city) to strip spaces before DISTINCT collapses duplicates.", "Guard against NULL and empty trimmed strings in WHERE."],
      explanation: "TRIM() before DISTINCT prevents ' New York' and 'New York ' from appearing as two separate cities.",
    }),
    makeBasicQ({
      number: 3,
      titleBody: "Nike: Limited Edition Sneaker Inventory by Popular Sizes",
      companies: ["Nike", "Adidas"],
      topics: ["WHERE", "IN", "ORDER BY"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Warm-up",
      patternTag: "Discrete List & Range Filters",
      description: `### Problem Statement
Nike SNKRS manages drop allocations. Check stock availability for 'Air Jordan 1 Retro' across popular US men's shoe sizes: 9.0, 9.5, 10.0, and 10.5.

### Requirements
- Filter for \`model_name = 'Air Jordan 1 Retro'\` and \`size_us IN (9.0, 9.5, 10.0, 10.5)\`.
- Output columns: \`size_us\`, \`units_available\`.
- Sort by \`size_us\` ascending.

### Input Schema
**sneaker_stock** (id INT, model_name VARCHAR, size_us NUMERIC, units_available INT)`,
      schemaSql: `CREATE TABLE sneaker_stock (id INT PRIMARY KEY, model_name VARCHAR(100), size_us NUMERIC, units_available INT);
INSERT INTO sneaker_stock VALUES (1, 'Air Jordan 1 Retro', 8.5, 15), (2, 'Air Jordan 1 Retro', 9.0, 35), (3, 'Air Jordan 1 Retro', 9.5, 42), (4, 'Air Jordan 1 Retro', 10.0, 50), (5, 'Air Jordan 1 Retro', 10.5, 30), (6, 'Air Jordan 1 Retro', 11.0, 20), (7, 'Dunk Low Panda', 10.0, 65);`,
      referenceSql: `SELECT size_us, units_available FROM sneaker_stock WHERE model_name = 'Air Jordan 1 Retro' AND size_us IN (9.0, 9.5, 10.0, 10.5) ORDER BY size_us ASC;`,
      expectedColumns: ["size_us", "units_available"],
      hints: ["Filter model_name and use IN (9.0, 9.5, 10.0, 10.5) in WHERE."],
      explanation: "IN matches against a discrete list cleanly without chaining multiple OR clauses.",
    }),
    makeBasicQ({
      number: 4,
      titleBody: "Shopify: Flagging Missing Shipping Addresses & NULL Notes",
      companies: ["Shopify", "Etsy"],
      topics: ["COALESCE", "IS NULL", "WHERE"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Core",
      patternTag: "NULL Safety & Fallbacks",
      description: `### Problem Statement
Shopify Fulfillment needs a clean dispatch manifest for pending orders. Some orders lack a courier code (\`NULL\`), and some lack delivery notes.

### Requirements
- Include only orders where \`status = 'pending'\`.
- Replace missing \`courier\` with \`'UNASSIGNED'\` as \`courier_label\`.
- Compute \`total_due\` as \`subtotal + COALESCE(shipping_fee, 0)\`.
- Output columns: \`order_id\`, \`courier_label\`, \`total_due\`.
- Sort by \`order_id\` ascending.

### Input Schema
**pending_orders** (order_id INT, status VARCHAR, courier VARCHAR, subtotal NUMERIC, shipping_fee NUMERIC)`,
      schemaSql: `CREATE TABLE pending_orders (order_id INT PRIMARY KEY, status VARCHAR(20), courier VARCHAR(30), subtotal NUMERIC, shipping_fee NUMERIC);
INSERT INTO pending_orders VALUES (101, 'pending', 'FedEx', 80.00, 9.99), (102, 'pending', NULL, 45.00, NULL), (103, 'shipped', 'UPS', 120.00, 12.00), (104, 'pending', 'DHL', 210.00, NULL);`,
      referenceSql: `SELECT order_id, COALESCE(courier, 'UNASSIGNED') AS courier_label, subtotal + COALESCE(shipping_fee, 0) AS total_due FROM pending_orders WHERE status = 'pending' ORDER BY order_id ASC;`,
      expectedColumns: ["order_id", "courier_label", "total_due"],
      hints: ["Adding a number + NULL yields NULL in SQL—always wrap nullable numbers in COALESCE(..., 0)."],
      explanation: "In SQL, any arithmetic with NULL evaluates to NULL unless guarded with COALESCE().",
    }),
    makeBasicQ({
      number: 5,
      titleBody: "Spotify: Case-Insensitive Track Search with ILIKE & Pattern Matching",
      companies: ["Spotify", "YouTube"],
      topics: ["ILIKE", "LIKE", "BETWEEN"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Core",
      patternTag: "Pattern Matching",
      description: `### Problem Statement
Spotify Search QA wants to find all tracks containing the word 'midnight' (case-insensitive) whose duration falls between 180 and 300 seconds inclusive.

### Requirements
- Match \`track_title\` containing \`'midnight'\` regardless of uppercase/lowercase.
- Filter \`duration_sec\` between 180 and 300 inclusive.
- Output columns: \`track_id\`, \`track_title\`, \`duration_sec\`.
- Sort by \`duration_sec\` descending, then \`track_id\` ascending.

### Input Schema
**tracks** (track_id INT, track_title VARCHAR, duration_sec INT)`,
      schemaSql: `CREATE TABLE tracks (track_id INT PRIMARY KEY, track_title VARCHAR(100), duration_sec INT);
INSERT INTO tracks VALUES (1, 'Midnight Rain', 175), (2, 'After MIDNIGHT Drive', 242), (3, 'midnight city lights', 242), (4, 'Sunset Boulevard', 210), (5, 'Midnight Symphony', 320), (6, 'Neon Midnight', 195);`,
      referenceSql: `SELECT track_id, track_title, duration_sec FROM tracks WHERE track_title ILIKE '%midnight%' AND duration_sec BETWEEN 180 AND 300 ORDER BY duration_sec DESC, track_id ASC;`,
      expectedColumns: ["track_id", "track_title", "duration_sec"],
      hints: ["Use ILIKE '%midnight%' in PostgreSQL (or LOWER(track_title) LIKE '%midnight%').", "Use BETWEEN 180 AND 300."],
      explanation: "ILIKE performs case-insensitive pattern matching in PostgreSQL while BETWEEN is inclusive of both endpoints.",
    }),
    makeBasicQ({
      number: 6,
      titleBody: "Twitter: Follower to Following Ratio for Verified Accounts",
      companies: ["Twitter", "Meta"],
      topics: ["ROUND", "NULLIF", "WHERE"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Core",
      patternTag: "Zero-Safe Division (NULLIF)",
      description: `### Problem Statement
Twitter/X Trust & Safety audits verified accounts. Calculate the follower-to-following ratio for all verified accounts without crashing when \`following_count\` is 0.

### Requirements
- Filter for accounts where \`is_verified = TRUE\`.
- Calculate \`follower_ratio\` as \`followers_count * 1.0 / NULLIF(following_count, 0)\`, rounded to 2 decimal places.
- Output columns: \`handle\`, \`followers_count\`, \`following_count\`, \`follower_ratio\`.
- Sort by \`follower_ratio DESC NULLS LAST\`, then \`handle ASC\`.

### Input Schema
**profiles** (id INT, handle VARCHAR, followers_count INT, following_count INT, is_verified BOOLEAN)`,
      schemaSql: `CREATE TABLE profiles (id INT PRIMARY KEY, handle VARCHAR(50), followers_count INT, following_count INT, is_verified BOOLEAN);
INSERT INTO profiles VALUES (1, 'tech_guru', 150000, 300, TRUE), (2, 'crypto_whiz', 85000, 120, TRUE), (3, 'daily_memes', 40000, 2500, FALSE), (4, 'news_wire', 500000, 50, TRUE), (5, 'silent_reader', 12, 450, FALSE), (6, 'fresh_bot', 1200, 0, TRUE);`,
      referenceSql: `SELECT handle, followers_count, following_count, ROUND(followers_count * 1.0 / NULLIF(following_count, 0), 2) AS follower_ratio FROM profiles WHERE is_verified = TRUE ORDER BY follower_ratio DESC NULLS LAST, handle ASC;`,
      expectedColumns: ["handle", "followers_count", "following_count", "follower_ratio"],
      hints: ["Use NULLIF(following_count, 0) so dividing by 0 returns NULL instead of an error.", "Remember NULLS LAST when sorting DESC in PostgreSQL."],
      explanation: "NULLIF(x, 0) converts zero denominators to NULL, preventing division-by-zero failures across analytical queries.",
    }),
    makeBasicQ({
      number: 7,
      titleBody: "Google: High-Impression Zero-Click Active Search Ads",
      companies: ["Google", "Meta"],
      topics: ["WHERE", "AND", "OR", "Parentheses"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Core",
      patternTag: "Boolean Precedence",
      description: `### Problem Statement
Google Ads Quality wants to review underperforming creatives. Find ads that are either \`'active'\` or \`'review'\` (ignoring case/spaces), have at least 1,000 impressions, and have 0 clicks.

### Requirements
- Normalize \`status\` with \`LOWER(TRIM(status))\` and match \`'active'\` or \`'review'\`.
- Filter \`impressions >= 1000\` AND \`clicks = 0\`.
- Output columns: \`ad_id\`, \`headline\`, \`impressions\`.
- Sort by \`impressions\` descending, then \`ad_id\` ascending.

### Input Schema
**search_ads** (ad_id INT, headline VARCHAR, impressions INT, clicks INT, status VARCHAR)`,
      schemaSql: `CREATE TABLE search_ads (ad_id INT PRIMARY KEY, headline VARCHAR(100), impressions INT, clicks INT, status VARCHAR(20));
INSERT INTO search_ads VALUES (1, 'Buy 1 Get 1 Shoes', 1500, 0, ' active '), (2, '20% Off Footwear', 2400, 45, 'active'), (3, 'Coats Under $99', 3100, 0, 'REVIEW'), (4, 'New Arrivals', 800, 0, 'active'), (5, 'Thermal Socks', 1800, 0, 'paused');`,
      referenceSql: `SELECT ad_id, headline, impressions FROM search_ads WHERE LOWER(TRIM(status)) IN ('active', 'review') AND impressions >= 1000 AND clicks = 0 ORDER BY impressions DESC, ad_id ASC;`,
      expectedColumns: ["ad_id", "headline", "impressions"],
      hints: ["Normalize status before checking IN ('active', 'review') or wrap OR conditions in parentheses."],
      explanation: "AND binds tighter than OR in SQL—always use IN (...) or explicit parentheses around OR branches.",
    }),
    makeBasicQ({
      number: 8,
      titleBody: "Stripe: Parsing Dirty Currency Strings into Clean Revenue",
      companies: ["Stripe", "PayPal"],
      topics: ["REPLACE", "CAST", "TRIM", "ORDER BY"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Applied",
      patternTag: "Type Casting & String Normalization",
      description: `### Problem Statement
A legacy Stripe CSV import stored invoice amounts as dirty text like \`'$1,250.50'\` or \`' 420.00'\`. Clean the text into numeric values and return invoices worth at least $500.

### Requirements
- Strip \`'$'\`, \`','\`, and surrounding spaces from \`raw_amount\`, then cast to \`NUMERIC\`.
- Keep only rows where \`status = 'paid'\` and cleaned amount \`>= 500\`.
- Output columns: \`invoice_id\`, \`clean_amount\`.
- Sort by \`clean_amount\` descending, then \`invoice_id\` ascending.

### Input Schema
**legacy_invoices** (invoice_id INT, raw_amount VARCHAR, status VARCHAR)`,
      schemaSql: `CREATE TABLE legacy_invoices (invoice_id INT PRIMARY KEY, raw_amount VARCHAR(30), status VARCHAR(20));
INSERT INTO legacy_invoices VALUES (1, '$1,250.50', 'paid'), (2, ' 499.99 ', 'paid'), (3, '$850.00', 'paid'), (4, '$2,100.00', 'void'), (5, '500.00', 'paid');`,
      referenceSql: `SELECT invoice_id, REPLACE(REPLACE(TRIM(raw_amount), '$', ''), ',', '')::NUMERIC AS clean_amount FROM legacy_invoices WHERE status = 'paid' AND REPLACE(REPLACE(TRIM(raw_amount), '$', ''), ',', '')::NUMERIC >= 500 ORDER BY clean_amount DESC, invoice_id ASC;`,
      expectedColumns: ["invoice_id", "clean_amount"],
      hints: ["Nest REPLACE(..., '$', '') and REPLACE(..., ',', '') before casting ::NUMERIC."],
      explanation: "Operational imports frequently encode numbers as formatted strings; stripping symbols before casting unlocks numeric comparisons.",
    }),
    makeBasicQ({
      number: 9,
      titleBody: "Reddit: Paginating Top Posts with OFFSET and NULL Tie-Breakers",
      companies: ["Reddit", "Discord"],
      topics: ["ORDER BY", "LIMIT", "OFFSET", "COALESCE"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Applied",
      patternTag: "Pagination & Tie-Breaking",
      description: `### Problem Statement
Reddit's feed API serves page 2 of top posts (5 posts per page). Some legacy posts have \`NULL\` upvotes which should be treated as 0.

### Requirements
- Compute \`net_score\` as \`COALESCE(upvotes, 0) - COALESCE(downvotes, 0)\`.
- Sort by \`net_score\` descending, then \`post_id\` ascending.
- Skip the first 3 posts and return the next 3 posts (Page 2 of size 3).
- Output columns: \`post_id\`, \`title\`, \`net_score\`.

### Input Schema
**posts** (post_id INT, title VARCHAR, upvotes INT, downvotes INT)`,
      schemaSql: `CREATE TABLE posts (post_id INT PRIMARY KEY, title VARCHAR(100), upvotes INT, downvotes INT);
INSERT INTO posts VALUES (1, 'PostgreSQL Tips', 500, 20), (2, 'Window Functions Guide', 420, 10), (3, 'CTE Deep Dive', 310, NULL), (4, 'Query Tuning 101', 250, 15), (5, 'Index Secrets', NULL, 5), (6, 'Join Patterns', 250, 15), (7, 'SQL Quiz', 180, 0);`,
      referenceSql: `SELECT post_id, title, (COALESCE(upvotes, 0) - COALESCE(downvotes, 0)) AS net_score FROM posts ORDER BY net_score DESC, post_id ASC LIMIT 3 OFFSET 3;`,
      expectedColumns: ["post_id", "title", "net_score"],
      hints: ["Use COALESCE on both upvotes and downvotes.", "Combine ORDER BY net_score DESC, post_id ASC with LIMIT 3 OFFSET 3."],
      explanation: "Pagination with LIMIT/OFFSET always requires a unique tie-breaker column in ORDER BY so rows don't shift between pages.",
    }),
    makeBasicQ({
      number: 10,
      titleBody: "TikTok: Creator Engagement Rate with Dirty Metrics",
      companies: ["TikTok", "Instagram"],
      topics: ["ROUND", "COALESCE", "NULLIF", "WHERE"],
      category: "Business Analytics",
      stage: S1,
      stageOrder: 1,
      rampStep: "Applied",
      patternTag: "Combined Hygiene & Safe Ratios",
      description: `### Problem Statement
TikTok Creator Analytics flags videos with strong engagement. Missing \`likes\` or \`comments\` are stored as \`NULL\`, and draft videos have 0 views.

### Requirements
- Exclude videos with \`0\` or \`NULL\` views, and include only \`LOWER(TRIM(status)) = 'published'\`.
- Compute \`engagement_rate\` as \`(COALESCE(likes, 0) + COALESCE(comments, 0)) * 100.0 / NULLIF(views, 0)\`, rounded to 2 decimal places.
- Return videos with \`engagement_rate >= 5.0\`.
- Output columns: \`video_id\`, \`creator\`, \`engagement_rate\`.
- Sort by \`engagement_rate\` descending, then \`video_id\` ascending.

### Input Schema
**videos** (video_id INT, creator VARCHAR, status VARCHAR, views INT, likes INT, comments INT)`,
      schemaSql: `CREATE TABLE videos (video_id INT PRIMARY KEY, creator VARCHAR(50), status VARCHAR(20), views INT, likes INT, comments INT);
INSERT INTO videos VALUES (1, 'maya_creates', ' published ', 10000, 620, 80), (2, 'leo_tech', 'Published', 5000, 200, NULL), (3, 'zoe_dance', 'published', 8000, 400, 100), (4, 'draft_user', 'published', 0, 10, 0), (5, 'hidden_vid', 'draft', 9000, 900, 50);`,
      referenceSql: `SELECT video_id, creator, ROUND((COALESCE(likes, 0) + COALESCE(comments, 0)) * 100.0 / NULLIF(views, 0), 2) AS engagement_rate FROM videos WHERE LOWER(TRIM(status)) = 'published' AND COALESCE(views, 0) > 0 AND (COALESCE(likes, 0) + COALESCE(comments, 0)) * 100.0 / NULLIF(views, 0) >= 5.0 ORDER BY engagement_rate DESC, video_id ASC;`,
      expectedColumns: ["video_id", "creator", "engagement_rate"],
      hints: ["Remember you cannot reference a SELECT alias inside the WHERE clause—repeat the expression or filter views > 0 safely."],
      explanation: "PostgreSQL evaluates WHERE before SELECT, so SELECT aliases aren't visible in WHERE (a preview of why CTEs help!).",
    }),

    // ================= STAGE 2: CONDITIONAL LOGIC & DATES (11 - 18) =================
    makeBasicQ({
      number: 11,
      titleBody: "Amazon: Product Price Tier Classification with CASE WHEN",
      companies: ["Amazon", "Walmart"],
      topics: ["CASE WHEN", "ORDER BY"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Warm-up",
      patternTag: "CASE WHEN Segmentation",
      description: `### Problem Statement
Amazon Merchandising labels catalog items by price tier for storefront badges.

### Requirements
- Classify each product into \`price_tier\`:
  - \`price >= 200\` -> \`'Luxury'\`
  - \`price >= 50\` -> \`'Standard'\`
  - Otherwise -> \`'Budget'\`
- Output columns: \`product_name\`, \`price\`, \`price_tier\`.
- Sort by \`price\` descending, then \`product_name\` ascending.

### Input Schema
**catalog** (id INT, product_name VARCHAR, price NUMERIC)`,
      schemaSql: `CREATE TABLE catalog (id INT PRIMARY KEY, product_name VARCHAR(80), price NUMERIC);
INSERT INTO catalog VALUES (1, 'Noise-Canceling Headphones', 299.00), (2, 'USB-C Hub', 35.00), (3, 'Mechanical Keyboard', 110.00), (4, '4K Monitor', 450.00), (5, 'Mouse Pad', 15.00);`,
      referenceSql: `SELECT product_name, price, CASE WHEN price >= 200 THEN 'Luxury' WHEN price >= 50 THEN 'Standard' ELSE 'Budget' END AS price_tier FROM catalog ORDER BY price DESC, product_name ASC;`,
      expectedColumns: ["product_name", "price", "price_tier"],
      hints: ["CASE WHEN branches evaluate top-to-bottom and stop at the first TRUE condition."],
      explanation: "Ordering CASE WHEN thresholds from highest to lowest avoids overlapping BETWEEN ranges.",
    }),
    makeBasicQ({
      number: 12,
      titleBody: "Meta: User Engagement Activity Tier Classification",
      companies: ["Meta", "TikTok"],
      topics: ["CASE WHEN", "GROUP BY", "COUNT"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Core",
      patternTag: "CASE WHEN on Aggregates",
      description: `### Problem Statement
Meta's User Engagement team segments active creators based on weekly post volume. Categorize each user into an activity tier.

### Requirements
- Count total posts created by each user.
- \`>= 10\` posts -> \`'Power User'\`; \`4..9\` posts -> \`'Regular User'\`; \`1..3\` posts -> \`'Casual User'\`.
- Output columns: \`username\`, \`post_count\`, \`activity_tier\`.
- Sort by \`post_count\` descending, then \`username\` ascending.

### Input Schema
**users** (id INT, username VARCHAR)

**posts** (id INT, user_id INT, created_at DATE)`,
      schemaSql: `CREATE TABLE users (id INT PRIMARY KEY, username VARCHAR(50));
CREATE TABLE posts (id INT PRIMARY KEY, user_id INT, created_at DATE);
INSERT INTO users VALUES (1, 'sarah_p'), (2, 'mike_dev'), (3, 'clara_k'), (4, 'john_d');
INSERT INTO posts VALUES (101, 1, '2025-01-01'), (102, 1, '2025-01-02'), (103, 1, '2025-01-02'), (104, 1, '2025-01-03'), (105, 1, '2025-01-04'), (106, 1, '2025-01-04'), (107, 1, '2025-01-05'), (108, 1, '2025-01-05'), (109, 1, '2025-01-06'), (110, 1, '2025-01-06'), (111, 1, '2025-01-07'), (112, 2, '2025-01-02'), (113, 2, '2025-01-03'), (114, 2, '2025-01-04'), (115, 2, '2025-01-05'), (116, 2, '2025-01-06'), (117, 3, '2025-01-03'), (118, 3, '2025-01-04');`,
      referenceSql: `SELECT u.username, COUNT(p.id) AS post_count, CASE WHEN COUNT(p.id) >= 10 THEN 'Power User' WHEN COUNT(p.id) >= 4 THEN 'Regular User' ELSE 'Casual User' END AS activity_tier FROM users u JOIN posts p ON u.id = p.user_id GROUP BY u.id, u.username ORDER BY post_count DESC, u.username ASC;`,
      expectedColumns: ["username", "post_count", "activity_tier"],
      hints: ["Aggregate COUNT(p.id) inside GROUP BY, then wrap COUNT(p.id) inside CASE WHEN."],
      explanation: "CASE WHEN can inspect aggregate functions directly inside a GROUP BY query.",
    }),
    makeBasicQ({
      number: 13,
      titleBody: "Uber: Late-Night Rides with High Passenger Ratings",
      companies: ["Uber", "Lyft"],
      topics: ["EXTRACT", "WHERE", "OR"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Warm-up",
      patternTag: "Date/Time Part Extraction",
      description: `### Problem Statement
Uber Quality & Safety reviews late-night ride feedback. Find all trips starting between 23:00 and 04:59 (hour >= 23 or hour <= 4) with a passenger rating of 4.8 or higher.

### Requirements
- Filter \`passenger_rating >= 4.8\`.
- Filter hour of \`trip_time\` where \`EXTRACT(HOUR FROM trip_time) >= 23 OR EXTRACT(HOUR FROM trip_time) <= 4\`.
- Output columns: \`trip_id\`, \`driver_name\`, \`passenger_rating\`, \`trip_time\`.
- Sort by \`passenger_rating\` descending, then \`trip_id\` ascending.

### Input Schema
**uber_trips** (trip_id INT, driver_name VARCHAR, passenger_rating NUMERIC, trip_time TIMESTAMP)`,
      schemaSql: `CREATE TABLE uber_trips (trip_id INT PRIMARY KEY, driver_name VARCHAR(50), passenger_rating NUMERIC, trip_time TIMESTAMP);
INSERT INTO uber_trips VALUES (1, 'Hassan M.', 4.95, '2025-01-10 23:30:00'), (2, 'Maria G.', 4.85, '2025-01-11 02:15:00'), (3, 'John D.', 4.50, '2025-01-11 01:20:00'), (4, 'Elena R.', 4.90, '2025-01-11 14:00:00'), (5, 'Carlos B.', 4.80, '2025-01-11 03:45:00');`,
      referenceSql: `SELECT trip_id, driver_name, passenger_rating, trip_time FROM uber_trips WHERE passenger_rating >= 4.8 AND (EXTRACT(HOUR FROM trip_time) >= 23 OR EXTRACT(HOUR FROM trip_time) <= 4) ORDER BY passenger_rating DESC, trip_id ASC;`,
      expectedColumns: ["trip_id", "driver_name", "passenger_rating", "trip_time"],
      hints: ["Wrap the two OR hour conditions inside parentheses before combining with AND."],
      explanation: "EXTRACT(HOUR FROM timestamp) isolates time-of-day shifts cleanly.",
    }),
    makeBasicQ({
      number: 14,
      titleBody: "Notion: Team Workspace Page Creation Volume by Month",
      companies: ["Notion", "Slack"],
      topics: ["DATE_TRUNC", "COUNT", "GROUP BY"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Core",
      patternTag: "Calendar Bucketing (DATE_TRUNC)",
      description: `### Problem Statement
Notion Product Analytics tracks document velocity. Count how many wiki pages were created during each calendar month of 2024.

### Requirements
- Filter for pages created in 2024 (\`'2024-01-01'\` through \`'2024-12-31 23:59:59'\`).
- Truncate \`created_at\` to month using \`DATE_TRUNC('month', created_at)::DATE\` as \`creation_month\`.
- Output columns: \`creation_month\`, \`pages_created\`.
- Sort by \`creation_month\` ascending.

### Input Schema
**notion_pages** (id INT, title VARCHAR, created_at TIMESTAMP)`,
      schemaSql: `CREATE TABLE notion_pages (id INT PRIMARY KEY, title VARCHAR(100), created_at TIMESTAMP);
INSERT INTO notion_pages VALUES (1, 'Engineering Roadmap', '2024-01-10 14:00:00'), (2, 'Sprint 24 Plan', '2024-01-22 09:30:00'), (3, 'Design System Specs', '2024-02-05 11:15:00'), (4, 'Q1 Goals Review', '2024-02-28 16:45:00'), (5, 'Architecture RFC', '2024-03-12 10:00:00'), (6, 'Onboarding Guide', '2023-12-15 08:00:00');`,
      referenceSql: `SELECT DATE_TRUNC('month', created_at)::DATE AS creation_month, COUNT(id) AS pages_created FROM notion_pages WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31 23:59:59' GROUP BY DATE_TRUNC('month', created_at)::DATE ORDER BY creation_month ASC;`,
      expectedColumns: ["creation_month", "pages_created"],
      hints: ["Truncate timestamps with DATE_TRUNC('month', created_at)::DATE and group by that expression."],
      explanation: "DATE_TRUNC aligns timestamps to calendar boundaries (day, week, month, quarter) for time-series aggregation.",
    }),
    makeBasicQ({
      number: 15,
      titleBody: "Atlassian: Jira Support Tickets Resolved Within 24-Hour SLA",
      companies: ["Atlassian", "Zendesk"],
      topics: ["Date Arithmetic", "INTERVAL", "COUNT"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Core",
      patternTag: "Interval & Timestamp Deltas",
      description: `### Problem Statement
Atlassian IT Operations tracks critical incident SLAs. Count how many \`'P1'\` incidents with status \`'Closed'\` were resolved within 24 hours of creation.

### Requirements
- Filter for \`priority = 'P1'\`, \`status = 'Closed'\`, and \`resolution_time - created_at <= INTERVAL '24 hours'\`.
- Output columns: \`priority\`, \`p1_tickets_within_sla\`.
- Group by \`priority\`.

### Input Schema
**jira_tickets** (id INT, issue_key VARCHAR, priority VARCHAR, status VARCHAR, created_at TIMESTAMP, resolution_time TIMESTAMP)`,
      schemaSql: `CREATE TABLE jira_tickets (id INT PRIMARY KEY, issue_key VARCHAR(20), priority VARCHAR(10), status VARCHAR(20), created_at TIMESTAMP, resolution_time TIMESTAMP);
INSERT INTO jira_tickets VALUES (1, 'OPS-101', 'P1', 'Closed', '2025-01-02 08:00:00', '2025-01-02 14:30:00'), (2, 'OPS-102', 'P1', 'Closed', '2025-01-03 10:00:00', '2025-01-04 12:00:00'), (3, 'OPS-103', 'P1', 'Closed', '2025-01-04 09:00:00', '2025-01-05 06:00:00'), (4, 'OPS-104', 'P2', 'Closed', '2025-01-05 11:00:00', '2025-01-05 15:00:00'), (5, 'OPS-105', 'P1', 'Open', '2025-01-06 07:00:00', NULL);`,
      referenceSql: `SELECT priority, COUNT(id) AS p1_tickets_within_sla FROM jira_tickets WHERE priority = 'P1' AND status = 'Closed' AND resolution_time - created_at <= INTERVAL '24 hours' GROUP BY priority;`,
      expectedColumns: ["priority", "p1_tickets_within_sla"],
      hints: ["Subtract timestamps and compare against INTERVAL '24 hours'."],
      explanation: "Timestamp subtraction in PostgreSQL produces an INTERVAL value that compares directly with INTERVAL literals.",
    }),
    makeBasicQ({
      number: 16,
      titleBody: "Robinhood: Total Buy vs Sell Trade Volume per Trader",
      companies: ["Robinhood", "Coinbase"],
      topics: ["SUM", "CASE WHEN", "COALESCE", "GROUP BY"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Core",
      patternTag: "Conditional Pivoting",
      description: `### Problem Statement
Robinhood Compliance tracks buy vs sell dollar volume per trader. Compute both totals side-by-side for each trader.

### Requirements
- Sum \`amount\` where \`side = 'BUY'\` as \`total_buy_volume\`, and where \`side = 'SELL'\` as \`total_sell_volume\`.
- Default missing sides to \`0.00\` and round to 2 decimals.
- Output columns: \`user_name\`, \`total_buy_volume\`, \`total_sell_volume\`.
- Sort by \`total_buy_volume\` descending, then \`user_name\` ascending.

### Input Schema
**users** (id INT, name VARCHAR)

**trades** (id INT, user_id INT, symbol VARCHAR, side VARCHAR, amount NUMERIC)`,
      schemaSql: `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE trades (id INT PRIMARY KEY, user_id INT, symbol VARCHAR(10), side VARCHAR(10), amount NUMERIC);
INSERT INTO users VALUES (1, 'Warren B.'), (2, 'Cathie W.'), (3, 'Ray D.');
INSERT INTO trades VALUES (101, 1, 'AAPL', 'BUY', 50000.00), (102, 1, 'KO', 'BUY', 25000.00), (103, 1, 'IBM', 'SELL', 12000.00), (104, 2, 'TSLA', 'BUY', 80000.00), (105, 2, 'COIN', 'SELL', 95000.00), (106, 3, 'GLD', 'SELL', 40000.00);`,
      referenceSql: `SELECT u.name AS user_name, ROUND(COALESCE(SUM(CASE WHEN t.side = 'BUY' THEN t.amount END), 0), 2) AS total_buy_volume, ROUND(COALESCE(SUM(CASE WHEN t.side = 'SELL' THEN t.amount END), 0), 2) AS total_sell_volume FROM users u JOIN trades t ON u.id = t.user_id GROUP BY u.id, u.name ORDER BY total_buy_volume DESC, user_name ASC;`,
      expectedColumns: ["user_name", "total_buy_volume", "total_sell_volume"],
      hints: ["Wrap SUM(CASE WHEN t.side = 'BUY' THEN t.amount END) inside COALESCE(..., 0)."],
      explanation: "Conditional aggregation pivots row-level categories into clean columnar summary metrics.",
    }),
    makeBasicQ({
      number: 17,
      titleBody: "Slack: Workspace Member Invitation Acceptance Rate",
      companies: ["Slack", "Microsoft"],
      topics: ["ROUND", "SUM", "CASE WHEN", "GROUP BY"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Applied",
      patternTag: "Conversion Rate with CASE",
      description: `### Problem Statement
Slack Growth Analytics evaluates viral workspace invitations. Calculate the invite acceptance percentage for each enterprise workspace.

### Requirements
- Count total invites (\`total_invites\`) and accepted invites (\`accepted_invites\`) per workspace.
- Calculate \`acceptance_rate\` as \`accepted_invites * 100.0 / total_invites\`, rounded to 2 decimal places.
- Output columns: \`workspace_name\`, \`total_invites\`, \`accepted_invites\`, \`acceptance_rate\`.
- Sort by \`acceptance_rate\` descending, then \`workspace_name\` ascending.

### Input Schema
**workspaces** (id INT, name VARCHAR)

**invitations** (id INT, workspace_id INT, invitee_email VARCHAR, status VARCHAR)`,
      schemaSql: `CREATE TABLE workspaces (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE invitations (id INT PRIMARY KEY, workspace_id INT, invitee_email VARCHAR(50), status VARCHAR(20));
INSERT INTO workspaces VALUES (1, 'Acme Corp'), (2, 'TechFlow'), (3, 'Nexus Labs');
INSERT INTO invitations VALUES (101, 1, 'a@acme.com', 'accepted'), (102, 1, 'b@acme.com', 'accepted'), (103, 1, 'c@acme.com', 'pending'), (104, 1, 'd@acme.com', 'declined'), (105, 2, 'e@techflow.io', 'accepted'), (106, 2, 'f@techflow.io', 'accepted'), (107, 3, 'g@nexus.org', 'pending');`,
      referenceSql: `SELECT w.name AS workspace_name, COUNT(i.id) AS total_invites, SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) AS accepted_invites, ROUND(SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) * 100.0 / COUNT(i.id), 2) AS acceptance_rate FROM workspaces w JOIN invitations i ON w.id = i.workspace_id GROUP BY w.id, w.name ORDER BY acceptance_rate DESC, workspace_name ASC;`,
      expectedColumns: ["workspace_name", "total_invites", "accepted_invites", "acceptance_rate"],
      hints: ["Use SUM(CASE WHEN i.status = 'accepted' THEN 1 ELSE 0 END) and multiply numerator by 100.0."],
      explanation: "Multiplying by 100.0 avoids integer division truncation while computing conversion rates.",
    }),
    makeBasicQ({
      number: 18,
      titleBody: "Box: Aging Archived Files by Quarter and Retention Window",
      companies: ["Box", "Dropbox"],
      topics: ["DATE_TRUNC", "CASE WHEN", "Date Arithmetic"],
      category: "Business Analytics",
      stage: S2,
      stageOrder: 2,
      rampStep: "Applied",
      patternTag: "Date Bucketing & Classification",
      description: `### Problem Statement
Box Governance classifies archived enterprise files before a 2025-01-01 purge audit. Label files uploaded before \`'2022-01-01'\` as \`'Purge Eligible'\` and newer archived files as \`'Retain'\`, counting files per quarter of upload.

### Requirements
- Filter for \`is_archived = TRUE\`.
- Truncate \`upload_date\` to quarter as \`upload_quarter\` (\`DATE_TRUNC('quarter', upload_date)::DATE\`).
- Tag \`retention_action\` as \`'Purge Eligible'\` if \`upload_date < '2022-01-01'\` else \`'Retain'\`.
- Output columns: \`upload_quarter\`, \`retention_action\`, \`file_count\`.
- Sort by \`upload_quarter\` ascending, \`retention_action\` ascending.

### Input Schema
**enterprise_files** (file_id INT, file_name VARCHAR, is_archived BOOLEAN, upload_date DATE)`,
      schemaSql: `CREATE TABLE enterprise_files (file_id INT PRIMARY KEY, file_name VARCHAR(100), is_archived BOOLEAN, upload_date DATE);
INSERT INTO enterprise_files VALUES (1, 'audit_2020.pdf', TRUE, '2020-05-12'), (2, 'tax_2021.zip', TRUE, '2021-11-20'), (3, 'q4_2021.csv', TRUE, '2021-10-05'), (4, 'board_2023.pptx', TRUE, '2023-04-10'), (5, 'handbook.pdf', FALSE, '2021-08-15');`,
      referenceSql: `SELECT DATE_TRUNC('quarter', upload_date)::DATE AS upload_quarter, CASE WHEN upload_date < '2022-01-01' THEN 'Purge Eligible' ELSE 'Retain' END AS retention_action, COUNT(file_id) AS file_count FROM enterprise_files WHERE is_archived = TRUE GROUP BY upload_quarter, retention_action ORDER BY upload_quarter ASC, retention_action ASC;`,
      expectedColumns: ["upload_quarter", "retention_action", "file_count"],
      hints: ["In PostgreSQL, GROUP BY can reference output column aliases created in SELECT."],
      explanation: "Combining DATE_TRUNC('quarter', ...) with CASE WHEN buckets lifecycle policies cleanly.",
    }),

    // ================= STAGE 3: AGGREGATIONS & GROUPING (19 - 28) =================
    makeBasicQ({
      number: 19,
      titleBody: "Amazon: Net Customer Spend with Dirty Status & NULL Refunds",
      companies: ["Amazon", "Meta"],
      topics: ["TRIM", "LOWER", "COALESCE", "GROUP BY", "ROUND"],
      category: "Business Analytics",
      stage: S3,
      stageOrder: 3,
      rampStep: "Warm-up",
      patternTag: "Dirty Hygiene + Aggregation",
      description: `### Problem Statement
Amazon Finance needs to audit net revenue generated by active customer accounts. Account \`status\` contains irregular whitespace and mixed casing (e.g., \`' ACTIVE '\`, \`'active'\`, \`NULL\`), and unrefunded orders store \`NULL\` in \`refund_amount\`.

### Requirements
- An account is active if \`LOWER(TRIM(COALESCE(a.status, ''))) = 'active'\`.
- Treat \`NULL\` \`refund_amount\` as \`0\`.
- Compute \`total_net_spent\` as \`ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2)\`.
- Output columns: \`customer_name\`, \`total_net_spent\`.
- Sort by \`total_net_spent\` descending, then \`customer_name\` ascending.

### Input Schema
**accounts** (id INT, name VARCHAR, status VARCHAR, country VARCHAR)

**orders** (id INT, customer_id INT, amount NUMERIC, refund_amount NUMERIC, order_date DATE)`,
      schemaSql: `CREATE TABLE accounts (id INT PRIMARY KEY, name VARCHAR(50), status VARCHAR(50), country VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount NUMERIC, refund_amount NUMERIC, order_date DATE);
INSERT INTO accounts VALUES (1, 'Alice Smith', ' ACTIVE ', 'USA'), (2, 'Bob Jones', 'active', 'Canada'), (3, 'Charlie Dave', 'inactive', 'USA'), (4, 'Diana Vance', NULL, 'UK'), (5, 'Evan Wright', 'ACTIVE', 'USA');
INSERT INTO orders VALUES (101, 1, 150.00, NULL, '2025-01-15'), (102, 1, 80.50, 10.00, '2025-01-18'), (103, 2, 220.00, NULL, '2025-02-01'), (104, 3, 45.00, 45.00, '2025-02-05'), (105, 5, 310.00, 25.00, '2025-02-10');`,
      referenceSql: `SELECT a.name AS customer_name, ROUND(SUM(o.amount - COALESCE(o.refund_amount, 0)), 2) AS total_net_spent FROM accounts a JOIN orders o ON a.id = o.customer_id WHERE LOWER(TRIM(COALESCE(a.status, ''))) = 'active' GROUP BY a.id, a.name ORDER BY total_net_spent DESC, customer_name ASC;`,
      expectedColumns: ["customer_name", "total_net_spent"],
      hints: ["Normalize status with LOWER(TRIM(...)).", "Group by a.id, a.name to distinguish customers safely."],
      explanation: "Always group by the primary key alongside display names to avoid merging distinct customers with identical names.",
    }),
    makeBasicQ({
      number: 20,
      titleBody: "DoorDash: Average Delivery Fee & Order Value by Cuisine",
      companies: ["DoorDash", "Uber"],
      topics: ["AVG", "ROUND", "GROUP BY"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Warm-up",
      patternTag: "Multi-Metric Grouping",
      description: `### Problem Statement
DoorDash Merchant Analytics compares order economics across cuisines. Compute average order total and average delivery fee per cuisine.

### Requirements
- Round \`avg_order_total\` and \`avg_delivery_fee\` to 2 decimal places.
- Include only cuisines with at least one order.
- Output columns: \`cuisine\`, \`avg_order_total\`, \`avg_delivery_fee\`.
- Sort by \`avg_order_total\` descending, then \`cuisine\` ascending.

### Input Schema
**restaurants** (id INT, name VARCHAR, cuisine VARCHAR)

**orders** (id INT, restaurant_id INT, order_total NUMERIC, delivery_fee NUMERIC)`,
      schemaSql: `CREATE TABLE restaurants (id INT PRIMARY KEY, name VARCHAR(100), cuisine VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, restaurant_id INT, order_total NUMERIC, delivery_fee NUMERIC);
INSERT INTO restaurants VALUES (1, 'Taco Fiesta', 'Mexican'), (2, 'Dragon Wok', 'Chinese'), (3, 'Pasta Bella', 'Italian'), (4, 'Tokyo Sushi', 'Japanese');
INSERT INTO orders VALUES (101, 1, 35.50, 3.99), (102, 1, 42.00, 2.99), (103, 2, 28.00, 4.50), (104, 3, 65.00, 1.99), (105, 3, 72.50, 2.50), (106, 4, 88.00, 5.00);`,
      referenceSql: `SELECT r.cuisine, ROUND(AVG(o.order_total), 2) AS avg_order_total, ROUND(AVG(o.delivery_fee), 2) AS avg_delivery_fee FROM restaurants r JOIN orders o ON r.id = o.restaurant_id GROUP BY r.cuisine ORDER BY avg_order_total DESC, r.cuisine ASC;`,
      expectedColumns: ["cuisine", "avg_order_total", "avg_delivery_fee"],
      hints: ["Join restaurants and orders, then GROUP BY r.cuisine."],
      explanation: "Computing multiple aggregates in one GROUP BY pass avoids scanning tables multiple times.",
    }),
    makeBasicQ({
      number: 21,
      titleBody: "Datadog: Comparing COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)",
      companies: ["Datadog", "Snowflake"],
      topics: ["COUNT", "COUNT DISTINCT", "GROUP BY"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Warm-up",
      patternTag: "Counting Semantics",
      description: `### Problem Statement
Datadog Alert Telemetry needs to understand event volume vs resolved incidents vs distinct affected hosts per service.

### Requirements
- For each \`service_name\`:
  - \`total_events\` = \`COUNT(*)\`
  - \`resolved_events\` = \`COUNT(resolved_at)\` (excludes NULLs)
  - \`unique_hosts\` = \`COUNT(DISTINCT host_id)\`
- Output columns: \`service_name\`, \`total_events\`, \`resolved_events\`, \`unique_hosts\`.
- Sort by \`total_events\` descending, \`service_name\` ascending.

### Input Schema
**alerts** (id INT, service_name VARCHAR, host_id VARCHAR, resolved_at TIMESTAMP)`,
      schemaSql: `CREATE TABLE alerts (id INT PRIMARY KEY, service_name VARCHAR(40), host_id VARCHAR(20), resolved_at TIMESTAMP);
INSERT INTO alerts VALUES (1, 'auth-api', 'h-1', '2025-01-01 10:15:00'), (2, 'auth-api', 'h-1', NULL), (3, 'auth-api', 'h-2', '2025-01-01 11:00:00'), (4, 'billing', 'h-3', NULL), (5, 'billing', 'h-3', NULL);`,
      referenceSql: `SELECT service_name, COUNT(*) AS total_events, COUNT(resolved_at) AS resolved_events, COUNT(DISTINCT host_id) AS unique_hosts FROM alerts GROUP BY service_name ORDER BY total_events DESC, service_name ASC;`,
      expectedColumns: ["service_name", "total_events", "resolved_events", "unique_hosts"],
      hints: ["COUNT(*) counts all rows; COUNT(col) skips NULLs; COUNT(DISTINCT col) skips duplicates and NULLs."],
      explanation: "Knowing the exact difference between COUNT(*), COUNT(col), and COUNT(DISTINCT col) prevents subtle off-by-NULL bugs.",
    }),
    makeBasicQ({
      number: 22,
      titleBody: "Spotify: Podcasts with Multiple Episodes in 2024 (HAVING)",
      companies: ["Spotify", "Apple"],
      topics: ["COUNT DISTINCT", "GROUP BY", "HAVING", "BETWEEN"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Core",
      patternTag: "WHERE + HAVING Separation",
      description: `### Problem Statement
Spotify's Creator Operations team wants to highlight active podcasts that released at least 2 distinct episodes in 2024.

### Requirements
- Filter episodes released between \`'2024-01-01'\` and \`'2024-12-31'\` inclusive.
- Count distinct episode IDs per show and keep shows with \`>= 2\` episodes.
- Output columns: \`show_title\`, \`episode_count\`.
- Sort by \`episode_count\` descending, then \`show_title\` ascending.

### Input Schema
**podcasts** (id INT, title VARCHAR, host_name VARCHAR)

**episodes** (id INT, podcast_id INT, title VARCHAR, release_date DATE)`,
      schemaSql: `CREATE TABLE podcasts (id INT PRIMARY KEY, title VARCHAR(100), host_name VARCHAR(100));
CREATE TABLE episodes (id INT PRIMARY KEY, podcast_id INT, title VARCHAR(100), release_date DATE);
INSERT INTO podcasts VALUES (1, 'The Daily Byte', 'Alex Chen'), (2, 'Design Talks', 'Sarah Lee'), (3, 'Indie Beats', 'Marcus Cole'), (4, 'Tech Horizon', 'Elena Rostova');
INSERT INTO episodes VALUES (101, 1, 'Episode 1', '2024-02-10'), (102, 1, 'Episode 2', '2024-03-15'), (103, 1, 'Episode 3', '2024-05-20'), (104, 2, 'Episode 10', '2024-04-01'), (105, 3, 'Special', '2023-11-20'), (106, 4, 'Future of AI', '2024-01-12'), (107, 4, 'Cloud Native', '2024-08-19');`,
      referenceSql: `SELECT p.title AS show_title, COUNT(DISTINCT e.id) AS episode_count FROM podcasts p JOIN episodes e ON p.id = e.podcast_id WHERE e.release_date BETWEEN '2024-01-01' AND '2024-12-31' GROUP BY p.id, p.title HAVING COUNT(DISTINCT e.id) >= 2 ORDER BY episode_count DESC, show_title ASC;`,
      expectedColumns: ["show_title", "episode_count"],
      hints: ["Filter dates in WHERE before grouping; filter episode counts in HAVING after grouping."],
      explanation: "WHERE filters raw rows before aggregation; HAVING filters summary groups after aggregation.",
    }),
    makeBasicQ({
      number: 23,
      titleBody: "YouTube: Video Click-Through Rate (CTR) by Device Type",
      companies: ["YouTube", "Google"],
      topics: ["SUM", "ROUND", "NULLIF", "GROUP BY"],
      category: "Business Analytics",
      stage: S3,
      stageOrder: 3,
      rampStep: "Core",
      patternTag: "Ratio of Sums (Not Avg of Ratios)",
      description: `### Problem Statement
YouTube Ad Monetization measures thumbnail CTR across device platforms. Compute aggregate CTR properly by summing clicks and impressions first.

### Requirements
- Sum \`impressions\` as \`total_impressions\` and \`clicks\` as \`total_clicks\` per \`device_type\`.
- Compute \`ctr_percentage\` as \`ROUND(SUM(clicks) * 100.0 / NULLIF(SUM(impressions), 0), 2)\`.
- Output columns: \`device_type\`, \`total_impressions\`, \`total_clicks\`, \`ctr_percentage\`.
- Sort by \`ctr_percentage\` descending, then \`device_type\` ascending.

### Input Schema
**video_impressions** (id INT, device_type VARCHAR, impressions INT, clicks INT)`,
      schemaSql: `CREATE TABLE video_impressions (id INT PRIMARY KEY, device_type VARCHAR(50), impressions INT, clicks INT);
INSERT INTO video_impressions VALUES (1, 'Mobile', 50000, 2500), (2, 'Desktop', 35000, 2100), (3, 'Tablet', 12000, 480), (4, 'Smart TV', 28000, 560), (5, 'Mobile', 45000, 2400), (6, 'Desktop', 25000, 1750);`,
      referenceSql: `SELECT device_type, SUM(impressions) AS total_impressions, SUM(clicks) AS total_clicks, ROUND(SUM(clicks) * 100.0 / NULLIF(SUM(impressions), 0), 2) AS ctr_percentage FROM video_impressions GROUP BY device_type ORDER BY ctr_percentage DESC, device_type ASC;`,
      expectedColumns: ["device_type", "total_impressions", "total_clicks", "ctr_percentage"],
      hints: ["Never take AVG(clicks / impressions)—always divide SUM(clicks) by SUM(impressions)."],
      explanation: "Taking SUM(numerator) / SUM(denominator) preserves exact volume-weighted conversion rates.",
    }),
    makeBasicQ({
      number: 24,
      titleBody: "Yelp: High-Rated Businesses with Minimum Review Volume",
      companies: ["Yelp", "Google"],
      topics: ["COUNT", "AVG", "ROUND", "GROUP BY", "HAVING"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Core",
      patternTag: "Multi-Condition HAVING",
      description: `### Problem Statement
Yelp Elite Squad highlights local gems that have both high volume and high ratings.

### Requirements
- Group by \`business_name\`.
- Keep only businesses with \`COUNT(id) >= 3\` AND \`AVG(stars) >= 4.50\`.
- Output columns: \`business_name\`, \`review_count\`, \`avg_rating\` (rounded to 2 decimals).
- Sort by \`avg_rating\` descending, \`review_count\` descending, \`business_name\` ascending.

### Input Schema
**yelp_reviews** (id INT, business_name VARCHAR, stars NUMERIC)`,
      schemaSql: `CREATE TABLE yelp_reviews (id INT PRIMARY KEY, business_name VARCHAR(100), stars NUMERIC);
INSERT INTO yelp_reviews VALUES (1, 'Artisan Sourdough Bakery', 5.0), (2, 'Artisan Sourdough Bakery', 4.5), (3, 'Artisan Sourdough Bakery', 4.8), (4, 'Golden Wok Express', 4.0), (5, 'Golden Wok Express', 4.5), (6, 'Golden Wok Express', 4.2), (7, 'Little Italy Trattoria', 5.0), (8, 'Little Italy Trattoria', 4.8), (9, 'Little Italy Trattoria', 4.9);`,
      referenceSql: `SELECT business_name, COUNT(id) AS review_count, ROUND(AVG(stars), 2) AS avg_rating FROM yelp_reviews GROUP BY business_name HAVING COUNT(id) >= 3 AND AVG(stars) >= 4.50 ORDER BY avg_rating DESC, review_count DESC, business_name ASC;`,
      expectedColumns: ["business_name", "review_count", "avg_rating"],
      hints: ["Combine two aggregate thresholds inside HAVING using AND."],
      explanation: "Multi-condition HAVING filters guarantee sample-size credibility alongside quality metrics.",
    }),
    makeBasicQ({
      number: 25,
      titleBody: "Apple: App Store Gross Revenue by Developer Country",
      companies: ["Apple", "Google"],
      topics: ["SUM", "ROUND", "INNER JOIN", "GROUP BY"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Core",
      patternTag: "Weighted Summation",
      description: `### Problem Statement
Apple App Store Finance evaluates global developer earnings by aggregating unit price multiplied by downloads across developer countries.

### Requirements
- Compute \`gross_revenue\` as \`ROUND(SUM(a.price * a.downloads), 2)\` per developer \`country\`.
- Output columns: \`country\`, \`gross_revenue\`.
- Sort by \`gross_revenue\` descending, then \`country\` ascending.

### Input Schema
**developers** (id INT, name VARCHAR, country VARCHAR)

**apps** (id INT, developer_id INT, app_name VARCHAR, price NUMERIC, downloads INT)`,
      schemaSql: `CREATE TABLE developers (id INT PRIMARY KEY, name VARCHAR(100), country VARCHAR(50));
CREATE TABLE apps (id INT PRIMARY KEY, developer_id INT, app_name VARCHAR(100), price NUMERIC, downloads INT);
INSERT INTO developers VALUES (1, 'Supercell', 'Finland'), (2, 'Rovio', 'Finland'), (3, 'Epic Games', 'USA'), (4, 'King', 'Sweden'), (5, 'Ubisoft', 'France');
INSERT INTO apps VALUES (101, 1, 'Clash Royale', 0.99, 50000), (102, 1, 'Brawl Stars', 1.99, 20000), (103, 2, 'Angry Birds', 0.99, 15000), (104, 3, 'Fortnite Mobile', 4.99, 40000), (105, 4, 'Candy Crush', 1.49, 60000), (106, 5, 'Rayman Run', 2.99, 10000);`,
      referenceSql: `SELECT d.country, ROUND(SUM(a.price * a.downloads), 2) AS gross_revenue FROM developers d JOIN apps a ON d.id = a.developer_id GROUP BY d.country ORDER BY gross_revenue DESC, d.country ASC;`,
      expectedColumns: ["country", "gross_revenue"],
      hints: ["Multiply price * downloads inside SUM()—not SUM(price) * SUM(downloads)."],
      explanation: "Row-level multiplication inside SUM() calculates exact weighted revenue.",
    }),
    makeBasicQ({
      number: 26,
      titleBody: "Instacart: High-Frequency Reordered Grocery Staples",
      companies: ["Instacart", "DoorDash"],
      topics: ["COUNT", "GROUP BY", "HAVING"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Core",
      patternTag: "Pre-Filter + Group Filter",
      description: `### Problem Statement
Instacart Merchandising tracks repeat purchase loyalty. Identify grocery products reordered 3 or more times.

### Requirements
- Count rows where \`oi.is_reorder = TRUE\` for each product.
- Filter to products with \`COUNT(oi.id) >= 3\`.
- Output columns: \`product_name\`, \`department\`, \`reorder_count\`.
- Sort by \`reorder_count\` descending, \`product_name\` ascending.

### Input Schema
**products** (id INT, name VARCHAR, department VARCHAR)

**order_items** (id INT, order_id INT, product_id INT, is_reorder BOOLEAN)`,
      schemaSql: `CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100), department VARCHAR(50));
CREATE TABLE order_items (id INT PRIMARY KEY, order_id INT, product_id INT, is_reorder BOOLEAN);
INSERT INTO products VALUES (1, 'Organic Whole Milk', 'Dairy'), (2, 'Avocados Bag', 'Produce'), (3, 'Sourdough Bread', 'Bakery'), (4, 'Greek Yogurt', 'Dairy');
INSERT INTO order_items VALUES (101, 1, 1, TRUE), (102, 2, 1, TRUE), (103, 3, 1, TRUE), (104, 4, 1, FALSE), (105, 1, 2, TRUE), (106, 2, 2, TRUE), (107, 3, 2, TRUE), (108, 4, 2, TRUE), (109, 1, 3, TRUE), (110, 2, 4, TRUE), (111, 3, 4, TRUE);`,
      referenceSql: `SELECT p.name AS product_name, p.department, COUNT(oi.id) AS reorder_count FROM products p JOIN order_items oi ON p.id = oi.product_id WHERE oi.is_reorder = TRUE GROUP BY p.id, p.name, p.department HAVING COUNT(oi.id) >= 3 ORDER BY reorder_count DESC, product_name ASC;`,
      expectedColumns: ["product_name", "department", "reorder_count"],
      hints: ["Filter oi.is_reorder = TRUE in WHERE before grouping by product."],
      explanation: "Include all non-aggregated SELECT columns (p.id, p.name, p.department) in GROUP BY.",
    }),
    makeBasicQ({
      number: 27,
      titleBody: "Brex: Corporate Expense Breakdown by Department & Quarter",
      companies: ["Brex", "Ramp"],
      topics: ["GROUP BY", "DATE_TRUNC", "SUM", "MIN", "MAX"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Applied",
      patternTag: "Multi-Dimensional Grouping",
      description: `### Problem Statement
Brex Finance requires a multi-dimensional spend summary broken down by department and quarter, tracking both total spend and peak single transaction.

### Requirements
- Exclude declined transactions (\`status <> 'declined'\`).
- Group by \`department\` and \`spend_quarter\` (\`DATE_TRUNC('quarter', txn_date)::DATE\`).
- Output columns: \`department\`, \`spend_quarter\`, \`total_spend\`, \`max_charge\`.
- Sort by \`spend_quarter\` ascending, \`total_spend\` descending, \`department\` ascending.

### Input Schema
**card_expenses** (id INT, department VARCHAR, amount NUMERIC, status VARCHAR, txn_date DATE)`,
      schemaSql: `CREATE TABLE card_expenses (id INT PRIMARY KEY, department VARCHAR(40), amount NUMERIC, status VARCHAR(20), txn_date DATE);
INSERT INTO card_expenses VALUES (1, 'Engineering', 1200.00, 'settled', '2025-01-15'), (2, 'Engineering', 450.00, 'settled', '2025-02-10'), (3, 'Sales', 800.00, 'settled', '2025-01-20'), (4, 'Sales', 5000.00, 'declined', '2025-01-25'), (5, 'Engineering', 3100.00, 'settled', '2025-04-04');`,
      referenceSql: `SELECT department, DATE_TRUNC('quarter', txn_date)::DATE AS spend_quarter, ROUND(SUM(amount), 2) AS total_spend, MAX(amount) AS max_charge FROM card_expenses WHERE status <> 'declined' GROUP BY department, DATE_TRUNC('quarter', txn_date)::DATE ORDER BY spend_quarter ASC, total_spend DESC, department ASC;`,
      expectedColumns: ["department", "spend_quarter", "total_spend", "max_charge"],
      hints: ["Filter status <> 'declined' in WHERE and group by both department and truncated quarter."],
      explanation: "Multi-column GROUP BY produces one summary row per unique (department, quarter) combination.",
    }),
    makeBasicQ({
      number: 28,
      titleBody: "FedEx: Hub SLA Compliance Rate & Volume Threshold",
      companies: ["FedEx", "UPS"],
      topics: ["SUM", "CASE WHEN", "HAVING", "ROUND", "GROUP BY"],
      category: "Aggregations",
      stage: S3,
      stageOrder: 3,
      rampStep: "Applied",
      patternTag: "Conditional Aggregation + HAVING",
      description: `### Problem Statement
FedEx Operations evaluates hub on-time performance for major sorting hubs (at least 3 shipments).

### Requirements
- Calculate \`total_shipments\` and \`sla_rate_pct\` (% of shipments where \`delivered_on_time = TRUE\`, rounded to 2 decimals).
- Keep only hubs with at least 3 total shipments.
- Output columns: \`hub_code\`, \`total_shipments\`, \`sla_rate_pct\`.
- Sort by \`sla_rate_pct\` descending, \`hub_code\` ascending.

### Input Schema
**shipments** (id INT, hub_code VARCHAR, delivered_on_time BOOLEAN)`,
      schemaSql: `CREATE TABLE shipments (id INT PRIMARY KEY, hub_code VARCHAR(10), delivered_on_time BOOLEAN);
INSERT INTO shipments VALUES (1, 'MEM', TRUE), (2, 'MEM', TRUE), (3, 'MEM', FALSE), (4, 'IND', TRUE), (5, 'IND', TRUE), (6, 'IND', TRUE), (7, 'EWR', FALSE), (8, 'EWR', TRUE);`,
      referenceSql: `SELECT hub_code, COUNT(id) AS total_shipments, ROUND(SUM(CASE WHEN delivered_on_time THEN 1 ELSE 0 END) * 100.0 / COUNT(id), 2) AS sla_rate_pct FROM shipments GROUP BY hub_code HAVING COUNT(id) >= 3 ORDER BY sla_rate_pct DESC, hub_code ASC;`,
      expectedColumns: ["hub_code", "total_shipments", "sla_rate_pct"],
      hints: ["Use COUNT(id) >= 3 in HAVING to exclude small hubs like EWR."],
      explanation: "Combining conditional aggregation with HAVING prevents low-sample hubs from skewing rankings.",
    }),
  ];
}
