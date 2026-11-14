export interface CurriculumQuestion {
  id: string;
  number: number;
  tier: "basic" | "intermediate" | "advanced";
  tierLevel: 1 | 2 | 3;
  title: string;
  company: string;
  companyCategory: "MAANG" | "Unicorn" | "Fintech" | "Enterprise" | "E-Commerce";
  role: "Data Analyst" | "Analytics Engineer" | "Data Scientist" | "Product Analyst";
  difficulty: "Basic" | "Intermediate" | "Advanced";
  messyTrait: string; // The dirty data trap, e.g. "Missing timestamps & null strings"
  summary: string;
  businessScenario: string;
  concepts: string[];
  tables: string[];
  xp: number;
  badgeSlug: string;
}

export interface CurriculumTier {
  id: "basic" | "intermediate" | "advanced";
  levelNumber: 1 | 2 | 3;
  name: string;
  tagline: string;
  badgeName: string;
  badgeIcon: string;
  badgeColor: string;
  questionsCount: number;
  description: string;
  focusTopics: string[];
  messyDataFeatures: string[];
  sampleCompanies: string[];
  targetOutcome: string;
}

export const CURRICULUM_TIERS: CurriculumTier[] = [
  {
    id: "basic",
    levelNumber: 1,
    name: "Tier 1: The Mud Scrapper (Basic)",
    tagline: "Foundations on Dirty Real-World Schemas",
    badgeName: "Mud Scrapper",
    badgeIcon: "🚜",
    badgeColor: "bg-emerald-400 text-black border-black",
    questionsCount: 100,
    description:
      "Writing SELECT, WHERE, aggregates, GROUP BY, HAVING, and multi-table JOINs on un-sanitized operational data with NULLs, whitespace, and duplicate keys.",
    focusTopics: [
      "SELECT, WHERE filtering, and logical operators with NULL quirks",
      "String normalization (TRIM, LOWER, LIKE regex patterns)",
      "Aggregations: COUNT(DISTINCT) vs COUNT(*), SUM, AVG with COALESCE",
      "GROUP BY and HAVING on dirty categorical fields",
      "INNER, LEFT, and RIGHT JOINs avoiding accidental fanouts",
      "Basic scalar and correlated subqueries in WHERE/FROM clauses"
    ],
    messyDataFeatures: [
      "User IDs formatted inconsistently (e.g. 'USR-001' vs 'usr_1')",
      "Amounts stored as text with stray currency symbols ('$14.50')",
      "Null and empty string ambiguity in country/status fields",
      "Order items with missing foreign keys due to deleted accounts"
    ],
    sampleCompanies: ["Amazon", "Shopify", "DoorDash", "Airbnb", "Spotify"],
    targetOutcome: "Crushes any junior Data Analyst / BI Analyst SQL technical screen."
  },
  {
    id: "intermediate",
    levelNumber: 2,
    name: "Tier 2: The Window Wizard (Intermediate)",
    tagline: "Window Functions, CTE Pipelines & Performance",
    badgeName: "Window Wizard",
    badgeIcon: "🧙‍♂️",
    badgeColor: "bg-amber-300 text-black border-black",
    questionsCount: 100,
    description:
      "Mastering Common Table Expressions (CTEs), multi-step analytics pipelines, window ranking (ROW_NUMBER, DENSE_RANK), lead/lag offsets, running metrics, and query execution tuning.",
    focusTopics: [
      "Window Ranking: ROW_NUMBER(), RANK(), DENSE_RANK() with tie-breaking",
      "Offset Window Functions: LEAD(), LAG() for interval & delta analysis",
      "Rolling & cumulative window frames: ROWS BETWEEN UNBOUNDED PRECEDING",
      "Multi-step CTE pipelines for clean, readable business logic",
      "Avoiding and diagnosing accidental JOIN fanouts on one-to-many tables",
      "Date arithmetic: DATE_TRUNC, interval calculations, and timezone normalization",
      "Execution plans: EXPLAIN ANALYZE, indexing logic, and query bottlenecks"
    ],
    messyDataFeatures: [
      "Duplicate transaction webhooks firing within milliseconds",
      "Missing date intervals in daily time-series reporting",
      "Mismatched timezones between user events (UTC vs PST vs local)",
      "High-cardinality tables that choke unindexed nested subqueries"
    ],
    sampleCompanies: ["Meta", "Uber", "Netflix", "Google", "Stripe"],
    targetOutcome: "Passes mid-level and senior Data Analyst & Analytics Engineer screens at MAANG."
  },
  {
    id: "advanced",
    levelNumber: 3,
    name: "Tier 3: The Schema Exorcist (Advanced)",
    tagline: "Nightmare Schemas, Recursive CTEs & Big Tech Logic",
    badgeName: "Schema Exorcist",
    badgeIcon: "👹",
    badgeColor: "bg-rose-500 text-white border-black",
    questionsCount: 100,
    description:
      "The most punishing, realistic production queries: recursive CTEs for org hierarchies, sessionization with dynamic inactivity windows, cohort retention, gaps-and-islands, and denormalized JSON payloads.",
    focusTopics: [
      "Recursive CTEs for deep hierarchies, multi-tier referral trees, and bill of materials",
      "Sessionization: Reconstructing user sessions with 30-minute inactivity thresholds",
      "Retention & Cohort Analysis: MoM, DoD, WoW retention matrices from raw event logs",
      "Gaps and Islands: Detecting consecutive active streaks and downtime periods",
      "Query optimization: Refactoring correlated subqueries into hash joins & CTEs",
      "Denormalized JSON: Extracting, exploding, and aggregating nested JSONB columns",
      "Idempotent deduplication: Cleaning millions of dirty records without data loss"
    ],
    messyDataFeatures: [
      "Schemaless JSON log dumps with missing and renamed keys",
      "Circular and broken parent-child hierarchy references",
      "Extreme data skew causing memory spills on GROUP BY",
      "Corrupted timestamps (year 1970 and year 2099 glitches)"
    ],
    sampleCompanies: ["Snowflake", "ByteDance", "Citadel", "OpenAI", "Palantir"],
    targetOutcome: "Guarantees mastery of any Staff Analyst, Principal Data Scientist, or Lead SQL interview globally."
  }
];

// Curated 300 Questions Catalog (Sample showcase items for immediate practice + progression)
export const CURRICULUM_300_QUESTIONS: CurriculumQuestion[] = [
  // --- TIER 1: BASIC (Questions 1 - 100) ---
  {
    id: "basic-001",
    number: 1,
    tier: "basic",
    tierLevel: 1,
    title: "Filter Active Customers with Dirty Casing & Whitespace",
    company: "Amazon",
    companyCategory: "MAANG",
    role: "Data Analyst",
    difficulty: "Basic",
    messyTrait: "Trailing spaces, mixed lowercase/uppercase in 'status'",
    summary: "Identify verified active buyers while normalizing dirty string inputs.",
    businessScenario: "The operations team sent user records where status is ' ACTIVE ', 'Active', or 'active'. Filter valid customers without losing matches.",
    concepts: ["SELECT", "WHERE", "TRIM", "LOWER"],
    tables: ["customers", "orders"],
    xp: 20,
    badgeSlug: "mud-scrapper"
  },
  {
    id: "basic-002",
    number: 2,
    tier: "basic",
    tierLevel: 1,
    title: "Calculate Average Order Value with NULL Refunded Amounts",
    company: "Shopify",
    companyCategory: "E-Commerce",
    role: "Data Analyst",
    difficulty: "Basic",
    messyTrait: "NULL refund values causing silent arithmetic failures",
    summary: "Compute net revenue per merchant properly accounting for NULL refund columns.",
    businessScenario: "Merchant GMV calculations were reporting NULL because un-refunded items have NULL instead of 0 in the refund column.",
    concepts: ["COALESCE", "SUM", "AVG", "GROUP BY"],
    tables: ["orders", "refunds"],
    xp: 20,
    badgeSlug: "mud-scrapper"
  },
  {
    id: "basic-003",
    number: 3,
    tier: "basic",
    tierLevel: 1,
    title: "Deduplicate Newsletter Signups with Mixed Email Domains",
    company: "DoorDash",
    companyCategory: "Unicorn",
    role: "Product Analyst",
    difficulty: "Basic",
    messyTrait: "Duplicate email entries with trailing punctuation and mixed case",
    summary: "Count unique subscribers by domain for marketing attribution.",
    businessScenario: "Marketing ran a promo where users signed up multiple times with differing capitalization. Clean and count distinct user emails.",
    concepts: ["COUNT(DISTINCT)", "LOWER", "SUBSTRING", "GROUP BY"],
    tables: ["signups"],
    xp: 20,
    badgeSlug: "mud-scrapper"
  },
  {
    id: "basic-004",
    number: 4,
    tier: "basic",
    tierLevel: 1,
    title: "Find Top 5 Delivery Zones Excluding Canceled Drop-offs",
    company: "Uber",
    companyCategory: "MAANG",
    role: "Data Analyst",
    difficulty: "Basic",
    messyTrait: "Cancelled trips missing delivery timestamps but having trip IDs",
    summary: "Aggregate completed delivery volume by delivery zone.",
    businessScenario: "Dispatch wants to see the top 5 zones with the highest completed deliveries, excluding cancelled orders that still have driver assignment IDs.",
    concepts: ["INNER JOIN", "WHERE IS NOT NULL", "GROUP BY", "ORDER BY DESC", "LIMIT"],
    tables: ["trips", "zones"],
    xp: 25,
    badgeSlug: "mud-scrapper"
  },
  {
    id: "basic-005",
    number: 5,
    tier: "basic",
    tierLevel: 1,
    title: "Audit Customers with Zero Orders (The Anti-Join Trap)",
    company: "Airbnb",
    companyCategory: "Unicorn",
    role: "Data Analyst",
    difficulty: "Basic",
    messyTrait: "Ghost customer rows without bookings",
    summary: "Find signed-up users who never booked a reservation using LEFT JOIN.",
    businessScenario: "Growth team needs an email list of users who created accounts in 2025 but never placed a single reservation.",
    concepts: ["LEFT JOIN", "WHERE table.id IS NULL", "COUNT"],
    tables: ["users", "bookings"],
    xp: 25,
    badgeSlug: "mud-scrapper"
  },

  // --- TIER 2: INTERMEDIATE (Questions 101 - 200) ---
  {
    id: "inter-101",
    number: 101,
    tier: "intermediate",
    tierLevel: 2,
    title: "Top 2 Highest Paid Employees Per Department with Salary Ties",
    company: "Meta",
    companyCategory: "MAANG",
    role: "Analytics Engineer",
    difficulty: "Intermediate",
    messyTrait: "Exact salary ties that skip ranks if using RANK() instead of DENSE_RANK()",
    summary: "Extract top 2 compensation tiers per department without skipping tied ranks.",
    businessScenario: "Meta HR needs to audit top compensation tiers. If two employees tie for 1st place, both must be listed, and the next person should be rank 2.",
    concepts: ["DENSE_RANK()", "PARTITION BY", "CTEs", "Ties"],
    tables: ["employees", "departments"],
    xp: 40,
    badgeSlug: "window-wizard"
  },
  {
    id: "inter-102",
    number: 102,
    tier: "intermediate",
    tierLevel: 2,
    title: "Rolling 7-Day Active Users (DAU to WAU Ratio)",
    company: "Twitter / X",
    companyCategory: "Unicorn",
    role: "Data Scientist",
    difficulty: "Intermediate",
    messyTrait: "Sparse date gaps where no events occurred on weekends",
    summary: "Compute rolling 7-day distinct active users for every calendar day.",
    businessScenario: "Calculate rolling 7-day distinct active user engagement. Must account for days where specific users had zero pings.",
    concepts: ["COUNT(DISTINCT)", "Window Frames", "RANGE BETWEEN", "DATE_TRUNC"],
    tables: ["user_pings"],
    xp: 45,
    badgeSlug: "window-wizard"
  },
  {
    id: "inter-103",
    number: 103,
    tier: "intermediate",
    tierLevel: 2,
    title: "Detect Duplicate Webhook Charges Within 60 Seconds",
    company: "Stripe",
    companyCategory: "Fintech",
    role: "Data Analyst",
    difficulty: "Intermediate",
    messyTrait: "Stripe retry storm causing identical charges with seconds timestamp delta",
    summary: "Identify customer transactions charged twice within a 60-second window.",
    businessScenario: "A payment gateway glitch caused duplicated charge events. Flag transactions from the same account with the same amount within 60 seconds.",
    concepts: ["LAG()", "PARTITION BY account_id", "EXTRACT(EPOCH FROM ...)", "CTEs"],
    tables: ["charges"],
    xp: 45,
    badgeSlug: "window-wizard"
  },
  {
    id: "inter-104",
    number: 104,
    tier: "intermediate",
    tierLevel: 2,
    title: "MoM Growth Rate Handling Months with Zero Revenue",
    company: "Google",
    companyCategory: "MAANG",
    role: "Data Analyst",
    difficulty: "Intermediate",
    messyTrait: "Division by zero and missing calendar months",
    summary: "Calculate Month-over-Month percentage revenue growth with safe division.",
    businessScenario: "Finance leadership wants monthly revenue growth. If a new product category had \$0 last month, prevent division-by-zero crashes using NULLIF.",
    concepts: ["LAG()", "NULLIF", "ROUND", "DATE_TRUNC"],
    tables: ["monthly_revenue"],
    xp: 40,
    badgeSlug: "window-wizard"
  },
  {
    id: "inter-105",
    number: 105,
    tier: "intermediate",
    tierLevel: 2,
    title: "Preventing Join Fanouts in Multi-Item Returns",
    company: "Netflix",
    companyCategory: "MAANG",
    role: "Analytics Engineer",
    difficulty: "Intermediate",
    messyTrait: "One-to-many join duplicating order totals across return line items",
    summary: "Calculate accurate net revenue without double-counting order totals.",
    businessScenario: "Joining orders to order_items and then returns caused order subtotal to multiply by 4x. Fix the query using pre-aggregated CTEs.",
    concepts: ["Pre-aggregated CTEs", "GROUP BY before JOIN", "Data integrity"],
    tables: ["orders", "order_items", "returns"],
    xp: 50,
    badgeSlug: "window-wizard"
  },

  // --- TIER 3: ADVANCED (Questions 201 - 300) ---
  {
    id: "adv-201",
    number: 201,
    tier: "advanced",
    tierLevel: 3,
    title: "Reconstruct User Clickstream Sessions (30-Minute Inactivity Window)",
    company: "Netflix",
    companyCategory: "MAANG",
    role: "Data Scientist",
    difficulty: "Advanced",
    messyTrait: "Unbounded raw timestamp logs without explicit session IDs",
    summary: "Generate distinct session IDs whenever inactivity exceeds 30 minutes.",
    businessScenario: "The product team needs session duration analytics. A session expires after 30 minutes of idle time. Partition event streams into distinct numbered sessions.",
    concepts: ["LAG()", "SUM() OVER (PARTITION BY ... ORDER BY ...)", "CASE WHEN delta > 30 mins", "Sessionization"],
    tables: ["web_events"],
    xp: 75,
    badgeSlug: "schema-exorcist"
  },
  {
    id: "adv-202",
    number: 202,
    tier: "advanced",
    tierLevel: 3,
    title: "Recursive Org Chart: Calculate Total Headcount Under Every Director",
    company: "Google",
    companyCategory: "MAANG",
    role: "Analytics Engineer",
    difficulty: "Advanced",
    messyTrait: "Self-referencing manager_id with multi-level executive chains",
    summary: "Compute full indirect organizational headcount under every manager using recursive CTE.",
    businessScenario: "For restructuring, HR needs to see how many total direct and indirect reports sit below every VP and Director in the enterprise.",
    concepts: ["WITH RECURSIVE", "UNION ALL", "Self-Joins", "Hierarchy Traversal"],
    tables: ["employees"],
    xp: 80,
    badgeSlug: "schema-exorcist"
  },
  {
    id: "adv-203",
    number: 203,
    tier: "advanced",
    tierLevel: 3,
    title: "Cohort Retention Matrix: 30-Day Churn by Signup Month",
    company: "Snowflake",
    companyCategory: "Enterprise",
    role: "Data Scientist",
    difficulty: "Advanced",
    messyTrait: "Non-contiguous billing logs and grace period renewals",
    summary: "Build an industry-standard triangular cohort retention grid.",
    businessScenario: "SaaS investors need a classic cohort retention matrix showing the percentage of users active in month 0, 1, 2, 3, etc. based on their initial signup cohort.",
    concepts: ["DATE_DIFF", "Conditional Aggregations", "Cohort Grids", "CTEs"],
    tables: ["subscriptions", "user_logins"],
    xp: 85,
    badgeSlug: "schema-exorcist"
  },
  {
    id: "adv-204",
    number: 204,
    tier: "advanced",
    tierLevel: 3,
    title: "Gaps & Islands: Find Longest Consecutive Active Login Streaks",
    company: "ByteDance",
    companyCategory: "MAANG",
    role: "Product Analyst",
    difficulty: "Advanced",
    messyTrait: "Multiple logins on the same day creating duplicate dates in streak math",
    summary: "Group contiguous dates into islands to calculate longest active streaks.",
    businessScenario: "TikTok gamification team wants to reward users who achieved the longest consecutive daily streak. Deduplicate same-day logins and identify consecutive calendar streaks.",
    concepts: ["ROW_NUMBER() Date Subtraction", "DENSE_RANK()", "Gaps and Islands", "GROUP BY Island"],
    tables: ["user_daily_logins"],
    xp: 90,
    badgeSlug: "schema-exorcist"
  },
  {
    id: "adv-205",
    number: 205,
    tier: "advanced",
    tierLevel: 3,
    title: "Parse & Aggregate Nested Corrupted JSON Event Payloads",
    company: "Stripe",
    companyCategory: "Fintech",
    role: "Data Scientist",
    difficulty: "Advanced",
    messyTrait: "Denormalized JSONB columns with missing keys, nested arrays, and corrupted types",
    summary: "Extract and aggregate transaction breakdown from raw JSON event blobs.",
    businessScenario: "Payment logs store discount breakdown inside a nested JSON string where some keys are camelCase and others snake_case. Extract valid discount amounts safely.",
    concepts: ["JSON_EXTRACT_PATH_TEXT", "jsonb_array_elements", "SAFE_CAST", "COALESCE"],
    tables: ["event_logs"],
    xp: 85,
    badgeSlug: "schema-exorcist"
  }
];

