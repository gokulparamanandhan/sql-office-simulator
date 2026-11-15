import { InterviewQuestion } from "../src/lib/content/interview-questions";

// Level 3: Advanced (100 Questions)
// Themes:
// 1. User Sessionization with Inactivity Windows (201-210)
// 2. Recursive Org Hierarchy & Traversal (WITH RECURSIVE) (211-220)
// 3. Gaps and Islands: Consecutive Daily Streaks (221-230)
// 4. Triangular Cohort Retention Matrices (231-240)
// 5. Gaps and Islands: Service Downtime Outage Clustering (241-250)
// 6. Recursive Bill of Materials & Cost Explosion (251-260)
// 7. Idempotency & Corrupted Transaction Deduplication (261-270)
// 8. Semi-Structured JSON Payload Extraction (271-280)
// 9. Year-Over-Year Retention Decay Analysis (281-290)
// 10. High-Frequency Arbitrage & Slippage Auditing (291-300)

export function getAdvancedQuestions(): InterviewQuestion[] {
  const list: InterviewQuestion[] = [];

  // -------------------------------------------------------------
  // THEME 1: User Sessionization with Inactivity Windows (201-210)
  // -------------------------------------------------------------
  const theme1Sessions = [
    { company: "Google", event: "search queries", col: "query_text", table: "search_logs", maxMins: 30 },
    { company: "Netflix", event: "stream interactions", col: "video_id", table: "stream_logs", maxMins: 20 },
    { company: "Amazon", event: "catalog product clicks", col: "asin", table: "click_logs", maxMins: 30 },
    { company: "TikTok", event: "feed video views", col: "clip_id", table: "swipe_logs", maxMins: 15 },
    { company: "Spotify", event: "track playback events", col: "track_id", table: "playback_logs", maxMins: 20 },
    { company: "Uber", event: "rider destination searches", col: "destination", table: "search_logs", maxMins: 15 },
    { company: "DoorDash", event: "restaurant menu views", col: "store_id", table: "browse_logs", maxMins: 25 },
    { company: "Twitter", event: "timeline tweet reads", col: "tweet_id", table: "timeline_logs", maxMins: 30 },
    { company: "Airbnb", event: "vacation home searches", col: "location", table: "search_logs", maxMins: 45 },
    { company: "Stripe", event: "dashboard audit queries", col: "endpoint", table: "audit_logs", maxMins: 30 },
  ];

  theme1Sessions.forEach((item, idx) => {
    const qNum = 201 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const maxSec = item.maxMins * 60;
    const title = `${item.company}: User Session Identification (${item.maxMins}-Minute Inactivity Threshold)`;

    const description = `### Business Context
The ${item.company} Data Engineering and Analytics team groups user ${item.event} into distinct **sessions**. A session expires if a user is inactive for **more than ${item.maxMins} minutes** (${maxSec} seconds) between successive events.

Calculate the number of events in each user session, along with the starting timestamp of that session.

### Metric Formulas & Rules
- Use \`LAG(event_time)\` partitioned by \`user_id\` ordered by \`event_time ASC\`.
- If the difference from the previous event is \`NULL\` (first event) or \`> ${maxSec} seconds\`, flag a new session (\`1\`), otherwise \`0\`.
- Generate a monotonic \`session_id\` per user by taking the cumulative sum: \`SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_time ASC ROWS UNBOUNDED PRECEDING)\`.
- **\`total_events\`**: Total count of events within that session.
- **\`session_start\`**: Earliest \`event_time\` in that session.
- Output columns: \`user_id\`, \`session_id\`, \`session_start\`, \`total_events\`.
- Sort by \`user_id\` ASC, \`session_id\` ASC.

### Input Schema
**${item.table}** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`${item.col}\` (VARCHAR)
- \`event_time\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE ${item.table} (
  id INT PRIMARY KEY,
  user_id INT,
  ${item.col} VARCHAR(100),
  event_time TIMESTAMP
);

INSERT INTO ${item.table} VALUES
(1, 1, 'Event Alpha', '2024-05-01 10:00:00'),
(2, 1, 'Event Beta',  '2024-05-01 10:15:00'), -- Same session (15 mins gap)
(3, 1, 'Event Gamma', '2024-05-01 12:00:00'), -- Gap > ${item.maxMins} mins -> New session
(4, 1, 'Event Delta', '2024-05-01 12:10:00'), -- Same session
(5, 2, 'Event Epsilon', '2024-05-01 08:00:00'),
(6, 2, 'Event Zeta',  '2024-05-01 09:30:00'); -- Gap > ${item.maxMins} mins -> New session
`;

    const starterSql = `-- ${item.company}: Segment events into sessions with ${item.maxMins}-minute inactivity timeout
-- Output: user_id, session_id, session_start, total_events
WITH step1_prev AS (
  -- Your code here
)
SELECT * FROM step1_prev;
`;

    const referenceSql = `WITH step1_prev AS (
  SELECT 
    user_id,
    id,
    event_time,
    LAG(event_time) OVER (
      PARTITION BY user_id 
      ORDER BY event_time ASC
    ) AS prev_ts
  FROM ${item.table}
),
step2_flag AS (
  SELECT 
    user_id,
    id,
    event_time,
    CASE 
      WHEN prev_ts IS NULL OR EXTRACT(EPOCH FROM (event_time - prev_ts)) > ${maxSec} THEN 1 
      ELSE 0 
    END AS is_new_session
  FROM step1_prev
),
step3_session_ids AS (
  SELECT 
    user_id,
    id,
    event_time,
    SUM(is_new_session) OVER (
      PARTITION BY user_id 
      ORDER BY event_time ASC
      ROWS UNBOUNDED PRECEDING
    ) AS session_id
  FROM step2_flag
)
SELECT 
  user_id,
  session_id,
  MIN(event_time) AS session_start,
  COUNT(*) AS total_events
FROM step3_session_ids
GROUP BY user_id, session_id
ORDER BY user_id ASC, session_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Google", "Netflix"],
      topics: ["Sessionization", "LAG", "Cumulative Sum", "Window Functions"],
      frequency: "Very High",
      category: "Business Analytics",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["user_id", "session_id", "session_start", "total_events"],
      hints: [
        "Find the previous timestamp using `LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time ASC)`.",
        `Calculate seconds difference with \`EXTRACT(EPOCH FROM (event_time - prev_ts))\`. If > ${maxSec} or NULL, assign 1, else 0.`,
        "The master trick: take a running sum `SUM(is_new_session) OVER (...)` to produce consecutive monotonic session IDs!"
      ],
      explanation: `### The Golden Technique of Sessionization
Sessionization is one of the highest-rated technical interview challenges at FAANG companies. By turning boundary flags into a cumulative running sum, you uniquely tag all records in a session without iterative cursor loops.`
    });
  });

  // -------------------------------------------------------------
  // THEME 2: Recursive Org Hierarchy & Traversal (WITH RECURSIVE) (211-220)
  // -------------------------------------------------------------
  const theme2Orgs = [
    { company: "Google", role: "Software Engineer", topExec: "Sundar Pichai" },
    { company: "Microsoft", role: "Engineering Manager", topExec: "Satya Nadella" },
    { company: "Amazon", role: "Operations Lead", topExec: "Andy Jassy" },
    { company: "Apple", role: "Hardware Designer", topExec: "Tim Cook" },
    { company: "Meta", role: "Product Director", topExec: "Mark Zuckerberg" },
    { company: "Palantir", role: "Forward Deployed Engineer", topExec: "Alex Karp" },
    { company: "Salesforce", role: "Enterprise Sales Director", topExec: "Marc Benioff" },
    { company: "Netflix", role: "Content Studio Producer", topExec: "Ted Sarandos" },
    { company: "Uber", role: "City General Manager", topExec: "Dara Khosrowshahi" },
    { company: "Stripe", role: "Financial Operations Lead", topExec: "Patrick Collison" },
  ];

  theme2Orgs.forEach((item, idx) => {
    const qNum = 211 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Recursive Org Hierarchy Depth & Management Chain`;

    const description = `### Business Context
The ${item.company} People Analytics team needs to map out corporate reporting depth. Starting from top-level leadership (where \`manager_id IS NULL\`), traverse the reporting tree to compute the **organizational depth level** of every employee.

### Metric Formulas & Rules
- Top-level leadership (with \`manager_id IS NULL\`) starts at \`level = 1\`.
- Each direct report increments \`level\` by 1 (e.g. \`parent.level + 1\`).
- Use a recursive Common Table Expression (\`WITH RECURSIVE org_tree AS (...)\`).
- Output columns: \`employee_id\`, \`employee_name\`, \`manager_id\`, \`hierarchy_level\`.
- Sort by \`hierarchy_level\` ASC, \`employee_id\` ASC.

### Input Schema
**employees** table:
- \`id\` (INT PRIMARY KEY)
- \`name\` (VARCHAR)
- \`manager_id\` (INT)`;

    const schemaSql = `
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  manager_id INT
);

INSERT INTO employees VALUES
(1, '${item.topExec}', NULL),       -- Level 1 (CEO)
(2, 'EVP Sarah Johnson', 1),        -- Level 2
(3, 'SVP David Miller', 1),         -- Level 2
(4, 'VP Michael Chang', 2),         -- Level 3
(5, 'Director Elena Rostova', 4),   -- Level 4
(6, 'Staff Engineer Alex Wong', 5); -- Level 5
`;

    const starterSql = `-- ${item.company}: Traverse employee hierarchy using WITH RECURSIVE
-- Output: employee_id, employee_name, manager_id, hierarchy_level
WITH RECURSIVE org_tree AS (
  -- Your code here
)
SELECT * FROM org_tree;
`;

    const referenceSql = `WITH RECURSIVE org_tree AS (
  -- Anchor member: CEO
  SELECT 
    id AS employee_id,
    name AS employee_name,
    manager_id,
    1 AS hierarchy_level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive member
  SELECT 
    e.id AS employee_id,
    e.name AS employee_name,
    e.manager_id,
    ot.hierarchy_level + 1 AS hierarchy_level
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT 
  employee_id,
  employee_name,
  manager_id,
  hierarchy_level
FROM org_tree
ORDER BY hierarchy_level ASC, employee_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Google", "Microsoft"],
      topics: ["WITH RECURSIVE", "Hierarchy Traversal", "Graph Depth", "UNION ALL"],
      frequency: "Very High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["employee_id", "employee_name", "manager_id", "hierarchy_level"],
      hints: [
        "In the anchor query, select the root record (`WHERE manager_id IS NULL`) with `hierarchy_level = 1`.",
        "In the recursive query, join `employees` with `org_tree` on `e.manager_id = ot.employee_id` and increment `ot.hierarchy_level + 1`.",
        "Combine using `UNION ALL`."
      ],
      explanation: `### Graph Traversal with Recursive CTEs
Recursive CTEs are the standard SQL mechanism for querying self-referential tree structures like organization charts, threaded comments, or category taxonomies.`
    });
  });

  // -------------------------------------------------------------
  // THEME 3: Gaps and Islands: Consecutive Daily Streaks (221-230)
  // -------------------------------------------------------------
  const theme3Streaks = [
    { company: "Stripe", entity: "merchant", act: "portal login", minStreak: 3 },
    { company: "Duolingo", entity: "learner", act: "lesson completion", minStreak: 4 },
    { company: "GitHub", entity: "developer", act: "code commit", minStreak: 3 },
    { company: "Fitbit", entity: "user", act: "10k step goal", minStreak: 3 },
    { company: "Spotify", entity: "listener", act: "podcast stream", minStreak: 3 },
    { company: "Snapchat", entity: "snapper", act: "snap exchange", minStreak: 3 },
    { company: "Robinhood", entity: "trader", act: "portfolio view", minStreak: 3 },
    { company: "DoorDash", entity: "dasher", act: "delivery shift", minStreak: 3 },
    { company: "LeetCode", entity: "coder", act: "problem solve", minStreak: 4 },
    { company: "Wordle", entity: "player", act: "daily puzzle", minStreak: 3 },
  ];

  theme3Streaks.forEach((item, idx) => {
    const qNum = 221 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Consecutive Daily Active Streaks (Gaps & Islands)`;

    const description = `### Business Context
The ${item.company} Gamification & Growth team rewards power users who achieve consecutive daily active streaks. A user maintains an **active streak** when they log at least one ${item.act} on consecutive calendar days.

Find all users who achieved an active streak of **at least ${item.minStreak} consecutive days**, and output their **maximum streak length**.

### Metric Formulas & Rules
- De-duplicate activity dates per user so multiple events on the same calendar day count only once.
- Apply the classic Gaps & Islands group anchor: \`activity_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date ASC))::INT AS grp\`.
- Filter for streak groups where \`COUNT(*) >= ${item.minStreak}\`.
- **\`max_streak_length\`**: Maximum consecutive days achieved by that user.
- Output columns: \`user_id\`, \`max_streak_length\`.
- Sort by \`max_streak_length\` DESC, then \`user_id\` ASC.

### Input Schema
**activity_logs** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`activity_date\` (DATE)`;

    const schemaSql = `
CREATE TABLE activity_logs (
  id INT PRIMARY KEY,
  user_id INT,
  activity_date DATE
);

INSERT INTO activity_logs VALUES
(1, 101, '2024-05-01'),
(2, 101, '2024-05-02'),
(3, 101, '2024-05-03'), -- User 101: 3-day streak
(4, 101, '2024-05-05'),
(5, 102, '2024-05-01'),
(6, 102, '2024-05-03'), -- No consecutive streak
(7, 103, '2024-05-10'),
(8, 103, '2024-05-11'),
(9, 103, '2024-05-12'),
(10, 103, '2024-05-13'),
(11, 103, '2024-05-13'), -- Duplicate same day
(12, 103, '2024-05-14'); -- User 103: 5-day streak
`;

    const starterSql = `-- ${item.company}: Find users with consecutive streak >= ${item.minStreak} days
-- Output: user_id, max_streak_length
WITH distinct_dates AS (
  -- Your code here
)
SELECT * FROM distinct_dates;
`;

    const referenceSql = `WITH distinct_dates AS (
  SELECT DISTINCT user_id, activity_date
  FROM activity_logs
),
numbered AS (
  SELECT 
    user_id,
    activity_date,
    activity_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date ASC))::INT AS island_grp
  FROM distinct_dates
),
streaks AS (
  SELECT 
    user_id,
    island_grp,
    COUNT(*) AS streak_len
  FROM numbered
  GROUP BY user_id, island_grp
  HAVING COUNT(*) >= ${item.minStreak}
)
SELECT 
  user_id,
  MAX(streak_len) AS max_streak_length
FROM streaks
GROUP BY user_id
ORDER BY max_streak_length DESC, user_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Stripe", "Duolingo"],
      topics: ["Gaps and Islands", "ROW_NUMBER", "Date Arithmetic", "CTEs"],
      frequency: "Very High",
      category: "Gaps & Islands",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["user_id", "max_streak_length"],
      hints: [
        "First deduplicate using `SELECT DISTINCT user_id, activity_date`.",
        "Subtract `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date)` days from `activity_date` to create constant island keys.",
        `Group by user and island key, filter \`HAVING COUNT(*) >= ${item.minStreak}\`, and take \`MAX(streak_len)\`.`
      ],
      explanation: `### The Math of Gaps & Islands
If dates are consecutive ($D_0+1, D_0+2, \\dots$) and row numbers are consecutive ($1, 2, \\dots$), their difference $(D_0+k) - k = D_0$ remains constant! The moment a day is skipped, the constant shifts to a new value, segmenting streaks effortlessly.`
    });
  });

  // -------------------------------------------------------------
  // THEME 4: Triangular Cohort Retention Matrices (231-240)
  // -------------------------------------------------------------
  const theme4Cohorts = [
    { company: "Airbnb", user: "host", action: "listing reservation", actTable: "bookings" },
    { company: "Netflix", user: "subscriber", action: "video stream", actTable: "streams" },
    { company: "Spotify", user: "listener", action: "music stream", actTable: "plays" },
    { company: "DoorDash", user: "customer", action: "food order", actTable: "orders" },
    { company: "Uber", user: "rider", action: "ride request", actTable: "trips" },
    { company: "Shopify", user: "merchant", action: "store checkout", actTable: "checkouts" },
    { company: "Slack", user: "workspace", action: "message post", actTable: "messages" },
    { company: "Stripe", user: "business", action: "card charge", actTable: "charges" },
    { company: "Duolingo", user: "learner", action: "practice lesson", actTable: "lessons" },
    { company: "Substack", user: "reader", action: "newsletter open", actTable: "opens" },
  ];

  theme4Cohorts.forEach((item, idx) => {
    const qNum = 231 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: First-Time ${item.user.charAt(0).toUpperCase() + item.user.slice(1)} 30-Day Conversion Cohort`;

    const description = `### Business Context
The ${item.company} Growth & Lifecycle team measures acquisition speed. For all new ${item.user}s who registered in **January 2024 ('2024-01')** or **February 2024 ('2024-02')**, calculate the percentage who converted by executing their **first ${item.action} within 30 days of registration**.

### Metric Formulas & Rules
- Registration cohort: \`TO_CHAR(signup_date, 'YYYY-MM')\` for \`'2024-01'\` and \`'2024-02'\`.
- A user converted if their earliest action date satisfies \`first_action_date - signup_date <= 30\`.
- **\`total_users\`**: Total new registered users in that cohort.
- **\`converted_users\`**: Total users who completed an action within 30 days.
- **\`conversion_rate\`**: \`ROUND((converted_users * 100.0 / total_users), 2)\`.
- Output columns: \`cohort_month\`, \`total_users\`, \`converted_users\`, \`conversion_rate\`.
- Sort by \`cohort_month\` ASC.

### Input Schema
**users** table:
- \`id\` (INT PRIMARY KEY)
- \`signup_date\` (DATE)

**${item.actTable}** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`action_date\` (DATE)`;

    const schemaSql = `
CREATE TABLE users (
  id INT PRIMARY KEY,
  signup_date DATE
);

CREATE TABLE ${item.actTable} (
  id INT PRIMARY KEY,
  user_id INT,
  action_date DATE
);

INSERT INTO users VALUES
(1, '2024-01-05'),
(2, '2024-01-12'),
(3, '2024-01-20'),
(4, '2024-01-25'),
(5, '2024-02-02'),
(6, '2024-02-15');

INSERT INTO ${item.actTable} VALUES
(101, 1, '2024-01-15'), -- 10 days (Converted)
(102, 2, '2024-03-01'), -- > 30 days (Not converted)
(103, 3, '2024-02-05'), -- 16 days (Converted)
(104, 5, '2024-02-10'), -- 8 days (Converted)
(105, 6, '2024-02-28'); -- 13 days (Converted)
-- User 4: No actions
`;

    const starterSql = `-- ${item.company}: Compute 30-day cohort conversion rate
-- Output: cohort_month, total_users, converted_users, conversion_rate
WITH cohorts AS (
  -- Your code here
)
SELECT * FROM cohorts;
`;

    const referenceSql = `WITH cohorts AS (
  SELECT 
    id AS user_id,
    signup_date,
    TO_CHAR(signup_date, 'YYYY-MM') AS cohort_month
  FROM users
  WHERE signup_date >= '2024-01-01' AND signup_date < '2024-03-01'
),
first_actions AS (
  SELECT 
    user_id,
    MIN(action_date) AS first_action_date
  FROM ${item.actTable}
  GROUP BY user_id
)
SELECT 
  c.cohort_month,
  COUNT(c.user_id) AS total_users,
  SUM(CASE WHEN f.first_action_date IS NOT NULL AND (f.first_action_date - c.signup_date) <= 30 THEN 1 ELSE 0 END) AS converted_users,
  ROUND(
    SUM(CASE WHEN f.first_action_date IS NOT NULL AND (f.first_action_date - c.signup_date) <= 30 THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(c.user_id),
    2
  ) AS conversion_rate
FROM cohorts c
LEFT JOIN first_actions f ON c.user_id = f.user_id
GROUP BY c.cohort_month
ORDER BY c.cohort_month ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Airbnb", "Netflix"],
      topics: ["Cohorts & Retention", "LEFT JOIN", "MIN", "Date Arithmetic"],
      frequency: "Very High",
      category: "Cohorts & Retention",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["cohort_month", "total_users", "converted_users", "conversion_rate"],
      hints: [
        "In the second CTE, find each user's earliest action using `MIN(action_date)`.",
        "Crucial: use a `LEFT JOIN` so users who never completed an action remain in `total_users`.",
        "Check `first_action_date - signup_date <= 30` inside `SUM(CASE WHEN ...)`."
      ],
      explanation: `### Denominator Integrity in Cohort Funnels
Using an \`INNER JOIN\` instead of a \`LEFT JOIN\` is the most common blunder: an inner join discards inactive users, resulting in a false 100% conversion rate!`
    });
  });

  // -------------------------------------------------------------
  // THEME 5: Gaps and Islands: Service Downtime Outage Clustering (241-250)
  // -------------------------------------------------------------
  const theme5Downtime = [
    { company: "AWS", infra: "EC2 Instance", col: "instance_id" },
    { company: "Cloudflare", infra: "Edge Node", col: "node_id" },
    { company: "Stripe", infra: "Payment Gateway", col: "gateway_id" },
    { company: "Datadog", infra: "DB Replica", col: "replica_id" },
    { company: "Snowflake", infra: "Virtual Warehouse", col: "warehouse_id" },
    { company: "Google Cloud", infra: "Kubernetes Pod", col: "pod_id" },
    { company: "Uber", infra: "Telemetry Hub", col: "hub_id" },
    { company: "Coinbase", infra: "Matching Engine", col: "engine_id" },
    { company: "Fastly", infra: "Cache Cluster", col: "cluster_id" },
    { company: "Twilio", infra: "SIP Voice Trunk", col: "trunk_id" },
  ];

  theme5Downtime.forEach((item, idx) => {
    const qNum = 241 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Continuous ${item.infra} Downtime Outage Window Clustering`;

    const description = `### Business Context
The ${item.company} Site Reliability Engineering (SRE) team monitors heartbeat telemetry. When an infrastructure component fails successive healthchecks (where \`status = 'DOWN'\`), those failure timestamps must be clustered into a single **uninterrupted outage window**.

Heartbeats arrive once every minute. A continuous outage island occurs when consecutive \`'DOWN'\` heartbeats have a delta of exactly 1 minute (60 seconds).

### Metric Formulas & Rules
- Filter for records where \`status = 'DOWN'\`.
- Cluster consecutive failure heartbeats into contiguous outage windows using Gaps & Islands.
- Output columns: \`${item.col}\`, \`outage_start\`, \`outage_end\`, \`consecutive_minutes\`.
- Only report outages lasting **at least 2 consecutive minutes** (\`consecutive_minutes >= 2\`).
- Sort by \`${item.col}\` ASC, \`outage_start\` ASC.

### Input Schema
**heartbeats** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.col}\` (INT)
- \`status\` (VARCHAR: 'UP', 'DOWN')
- \`ping_time\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE heartbeats (
  id INT PRIMARY KEY,
  ${item.col} INT,
  status VARCHAR(10),
  ping_time TIMESTAMP
);

INSERT INTO heartbeats VALUES
(1, 101, 'UP',   '2024-06-01 10:00:00'),
(2, 101, 'DOWN', '2024-06-01 10:01:00'), -- Outage 1 start
(3, 101, 'DOWN', '2024-06-01 10:02:00'),
(4, 101, 'DOWN', '2024-06-01 10:03:00'), -- Outage 1 end (3 mins)
(5, 101, 'UP',   '2024-06-01 10:04:00'),
(6, 101, 'DOWN', '2024-06-01 10:10:00'), -- Single ping (1 min -> Excluded)
(7, 102, 'DOWN', '2024-06-01 11:00:00'), -- Outage 2 start
(8, 102, 'DOWN', '2024-06-01 11:01:00'); -- Outage 2 end (2 mins)
`;

    const starterSql = `-- ${item.company}: Cluster consecutive DOWN heartbeats into outage windows
-- Output: ${item.col}, outage_start, outage_end, consecutive_minutes
WITH down_pings AS (
  -- Your code here
)
SELECT * FROM down_pings;
`;

    const referenceSql = `WITH down_pings AS (
  SELECT 
    ${item.col},
    ping_time,
    ping_time - (ROW_NUMBER() OVER (PARTITION BY ${item.col} ORDER BY ping_time ASC) * INTERVAL '1 minute') AS island_grp
  FROM heartbeats
  WHERE status = 'DOWN'
)
SELECT 
  ${item.col},
  MIN(ping_time) AS outage_start,
  MAX(ping_time) AS outage_end,
  COUNT(*)::INT AS consecutive_minutes
FROM down_pings
GROUP BY ${item.col}, island_grp
HAVING COUNT(*) >= 2
ORDER BY ${item.col} ASC, outage_start ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "AWS", "Datadog"],
      topics: ["Gaps and Islands", "Timestamp Arithmetic", "INTERVAL", "SRE Analytics"],
      frequency: "High",
      category: "Gaps & Islands",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: [item.col, "outage_start", "outage_end", "consecutive_minutes"],
      hints: [
        "Filter for `status = 'DOWN'` first.",
        "Subtract `ROW_NUMBER() * INTERVAL '1 minute'` from `ping_time` to group consecutive minutes.",
        "Group by the island and filter `HAVING COUNT(*) >= 2`."
      ],
      explanation: `### Temporal Gaps & Islands
In high-throughput logging, subtracting a scaled time interval (\`ROW_NUMBER() * INTERVAL '1 minute'\`) preserves an invariant group anchor as long as heartbeats occur on uninterrupted regular intervals.`
    });
  });

  // -------------------------------------------------------------
  // THEME 6: Recursive Bill of Materials & Cost Explosion (251-260)
  // -------------------------------------------------------------
  const theme6BOM = [
    { company: "Tesla", product: "Model Y Chassis", rootPart: "CHASSIS-001" },
    { company: "Apple", product: "iPhone Logic Board", rootPart: "LOGIC-001" },
    { company: "Boeing", product: "Jet Turbofan Engine", rootPart: "ENGINE-001" },
    { company: "Ford", product: "EV Battery Pack", rootPart: "PACK-001" },
    { company: "NVIDIA", product: "H100 Server Tray", rootPart: "TRAY-001" },
    { company: "Sony", product: "PlayStation Console", rootPart: "CONSOLE-001" },
    { company: "SpaceX", product: "Raptor Engine Assembly", rootPart: "RAPTOR-001" },
    { company: "Dyson", product: "Digital Motor Assembly", rootPart: "MOTOR-001" },
    { company: "Dell", product: "Blade Server Chassis", rootPart: "SERVER-001" },
    { company: "Cisco", product: "Core Router Switch", rootPart: "SWITCH-001" },
  ];

  theme6BOM.forEach((item, idx) => {
    const qNum = 251 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Recursive Bill of Materials (BOM) Component Cost Explosion`;

    const description = `### Business Context
The ${item.company} Manufacturing & Supply Chain Engineering team maintains a hierarchical Bill of Materials (BOM) for the **${item.product}** (\`'${item.rootPart}'\`). Assemblies are composed of sub-assemblies, which in turn contain basic parts with raw unit material costs.

Calculate the total rolled-up quantity of every basic leaf part required to build **1 unit of '${item.rootPart}'**, and compute its **total cost contribution** (\`quantity_needed * unit_cost\`).

### Metric Formulas & Rules
- Use a recursive CTE to traverse components from the root part (\`'${item.rootPart}'\`).
- Multiply component quantities down each branch of the hierarchy: \`parent.multiplier * child.quantity\`.
- A leaf component is a basic part with no further sub-parts (\`part_type = 'basic'\`).
- **\`total_quantity\`**: Sum of required leaf units.
- **\`total_cost\`**: \`SUM(total_quantity * unit_cost)\`, rounded to **2 decimal places**.
- Output columns: \`part_id\`, \`part_name\`, \`total_quantity\`, \`total_cost\`.
- Sort by \`total_cost\` DESC, then \`part_id\` ASC.

### Input Schema
**parts** table:
- \`part_id\` (VARCHAR PRIMARY KEY)
- \`part_name\` (VARCHAR)
- \`part_type\` (VARCHAR: 'assembly', 'basic')
- \`unit_cost\` (NUMERIC)

**bill_of_materials** table:
- \`parent_part_id\` (VARCHAR)
- \`child_part_id\` (VARCHAR)
- \`quantity\` (INT)`;

    const schemaSql = `
CREATE TABLE parts (
  part_id VARCHAR(50) PRIMARY KEY,
  part_name VARCHAR(50),
  part_type VARCHAR(20),
  unit_cost NUMERIC
);

CREATE TABLE bill_of_materials (
  parent_part_id VARCHAR(50),
  child_part_id VARCHAR(50),
  quantity INT
);

INSERT INTO parts VALUES
('${item.rootPart}', 'Main Assembly', 'assembly', 0.00),
('SUB-A', 'Sub-Module Alpha', 'assembly', 0.00),
('SUB-B', 'Sub-Module Beta', 'assembly', 0.00),
('PART-1', 'Lithium Cell', 'basic', 15.00),
('PART-2', 'Copper Wire', 'basic', 2.50),
('PART-3', 'Aluminum Bracket', 'basic', 8.00);

INSERT INTO bill_of_materials VALUES
('${item.rootPart}', 'SUB-A', 2),
('${item.rootPart}', 'SUB-B', 1),
('SUB-A', 'PART-1', 4), -- 2 * 4 = 8 cells ($120.00)
('SUB-A', 'PART-2', 10),-- 2 * 10 = 20 wires ($50.00)
('SUB-B', 'PART-3', 5); -- 1 * 5 = 5 brackets ($40.00)
`;

    const starterSql = `-- ${item.company}: Roll up leaf parts and calculate total cost
-- Output: part_id, part_name, total_quantity, total_cost
WITH RECURSIVE bom_tree AS (
  -- Your code here
)
SELECT * FROM bom_tree;
`;

    const referenceSql = `WITH RECURSIVE bom_tree AS (
  -- Anchor: direct components of root
  SELECT 
    child_part_id AS part_id,
    quantity AS multiplier
  FROM bill_of_materials
  WHERE parent_part_id = '${item.rootPart}'

  UNION ALL

  -- Recursive step
  SELECT 
    bom.child_part_id AS part_id,
    bt.multiplier * bom.quantity AS multiplier
  FROM bill_of_materials bom
  JOIN bom_tree bt ON bom.parent_part_id = bt.part_id
)
SELECT 
  p.part_id,
  p.part_name,
  SUM(bt.multiplier) AS total_quantity,
  ROUND(SUM(bt.multiplier * p.unit_cost), 2) AS total_cost
FROM bom_tree bt
JOIN parts p ON bt.part_id = p.part_id
WHERE p.part_type = 'basic'
GROUP BY p.part_id, p.part_name
ORDER BY total_cost DESC, p.part_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Tesla", "Apple"],
      topics: ["WITH RECURSIVE", "Bill of Materials", "Tree Traversal", "Cost Explosion"],
      frequency: "High",
      category: "Window Functions",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["part_id", "part_name", "total_quantity", "total_cost"],
      hints: [
        `Anchor query selects children of \`'${item.rootPart}'\` with their direct quantity.`,
        "Recursive query multiplies `bt.multiplier * bom.quantity`.",
        "Join back to `parts` and filter `WHERE p.part_type = 'basic'`."
      ],
      explanation: `### Bill of Materials Explosion
BOM cost explosion tests whether you can handle multiplicative cumulative properties in recursive trees. Each nesting layer multiplies the parent component quantity.`
    });
  });

  // -------------------------------------------------------------
  // THEME 7: Idempotency & Corrupted Transaction Deduplication (261-270)
  // -------------------------------------------------------------
  const theme7Dedupe = [
    { company: "Stripe", entity: "charge", key: "idempotency_key" },
    { company: "Square", entity: "swipe", key: "terminal_nonce" },
    { company: "PayPal", entity: "webhook_retry", key: "delivery_token" },
    { company: "Uber", entity: "dispatch_ping", key: "request_uuid" },
    { company: "DoorDash", entity: "checkout", key: "cart_session_token" },
    { company: "Coinbase", entity: "limit_order", key: "client_order_id" },
    { company: "Robinhood", entity: "ach_transfer", key: "transfer_fingerprint" },
    { company: "Amazon", entity: "one_click_buy", key: "checkout_token" },
    { company: "Shopify", entity: "store_charge", key: "payment_guid" },
    { company: "Adyen", entity: "settlement", key: "psp_reference" },
  ];

  theme7Dedupe.forEach((item, idx) => {
    const qNum = 261 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Idempotency Key Duplicate ${item.entity.charAt(0).toUpperCase() + item.entity.slice(1)} Deduplication`;

    const description = `### Business Context
Due to network timeouts and client retries, ${item.company}'s payment API received multiple duplicate ${item.entity} requests sharing the same \`${item.key}\` within a short window.

When duplicate records exist for the same \`${item.key}\`:
1. If at least one record has \`status = 'successful'\`, retain **only the earliest successful record**.
2. If none succeeded, retain the **earliest attempted record**.

### Metric Formulas & Rules
- Partition by \`${item.key}\`.
- Order records strategically:
  \`ORDER BY (CASE WHEN status = 'successful' THEN 1 ELSE 2 END) ASC, created_at ASC\`.
- Use \`ROW_NUMBER()\` to select rank \`1\` for each unique idempotency key.
- Output columns: \`id\`, \`${item.key}\`, \`amount\`, \`status\`, \`created_at\`.
- Sort by \`id\` ASC.

### Input Schema
**api_requests** table:
- \`id\` (INT PRIMARY KEY)
- \`${item.key}\` (VARCHAR)
- \`amount\` (NUMERIC)
- \`status\` (VARCHAR: 'successful', 'failed', 'pending')
- \`created_at\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE api_requests (
  id INT PRIMARY KEY,
  ${item.key} VARCHAR(50),
  amount NUMERIC,
  status VARCHAR(20),
  created_at TIMESTAMP
);

INSERT INTO api_requests VALUES
(1, 'KEY-1001', 150.00, 'failed',     '2024-05-01 10:00:00'),
(2, 'KEY-1001', 150.00, 'successful', '2024-05-01 10:00:05'), -- Preferred (successful)
(3, 'KEY-1001', 150.00, 'successful', '2024-05-01 10:00:10'),
(4, 'KEY-1002', 80.00,  'failed',     '2024-05-01 11:00:00'), -- Preferred (earliest failed)
(5, 'KEY-1002', 80.00,  'failed',     '2024-05-01 11:00:15'),
(6, 'KEY-1003', 220.00, 'successful', '2024-05-01 12:00:00');
`;

    const starterSql = `-- ${item.company}: Deduplicate requests using ROW_NUMBER() with conditional priority
-- Output: id, ${item.key}, amount, status, created_at
WITH ranked AS (
  -- Your code here
)
SELECT * FROM ranked;
`;

    const referenceSql = `WITH ranked AS (
  SELECT 
    id,
    ${item.key},
    amount,
    status,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY ${item.key} 
      ORDER BY 
        CASE WHEN status = 'successful' THEN 1 ELSE 2 END ASC,
        created_at ASC
    ) AS rnk
  FROM api_requests
)
SELECT 
  id,
  ${item.key},
  amount,
  status,
  created_at
FROM ranked
WHERE rnk = 1
ORDER BY id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Stripe", "PayPal"],
      topics: ["Idempotency", "ROW_NUMBER", "Deduplication", "Conditional ORDER BY"],
      frequency: "Very High",
      category: "Business Analytics",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["id", item.key, "amount", "status", "created_at"],
      hints: [
        "Use conditional ordering in the window: `CASE WHEN status = 'successful' THEN 1 ELSE 2 END ASC`.",
        "Add `created_at ASC` as the secondary sort key inside the window.",
        "Filter for `rnk = 1`."
      ],
      explanation: `### Multi-Criteria Deduplication
Real-world deduplication is rarely as simple as keeping the first record by timestamp. Priority ordering (e.g. favoring successful over failed charges) is an essential enterprise data engineering technique.`
    });
  });

  // -------------------------------------------------------------
  // THEME 8: Semi-Structured JSON Payload Extraction (271-280)
  // -------------------------------------------------------------
  const theme8JSON = [
    { company: "Snowflake", table: "event_telemetry" },
    { company: "Databricks", table: "cluster_logs" },
    { company: "Stripe", table: "webhook_payloads" },
    { company: "Segment", table: "cdp_events" },
    { company: "Shopify", table: "checkout_logs" },
    { company: "Google Analytics", table: "measurement_logs" },
    { company: "Mixpanel", table: "tracking_events" },
    { company: "Amplitude", table: "cohort_events" },
    { company: "Elastic", table: "syslog_payloads" },
    { company: "Kafka", table: "message_envelopes" },
  ];

  theme8JSON.forEach((item, idx) => {
    const qNum = 271 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Semi-Structured Event JSON Attributes Parsing & Extraction`;

    const description = `### Business Context
The ${item.company} Data Platform ingests event payloads with semi-structured JSON string columns (\`raw_payload\`). Operational analysts need to extract the **operating system (\`os\`)** and **battery level percentage (\`battery_pct\`)** for all active users.

Extract the properties, cast \`battery_pct\` to an integer, and calculate the **average battery level** and **total active events** for each distinct operating system.

### Metric Formulas & Rules
- Extract \`os\` using \`payload_os\`.
- Extract and calculate:
  - **\`avg_battery_pct\`**: \`ROUND(AVG(battery_level), 2)\`.
  - **\`total_events\`**: \`COUNT(*)\`.
- Filter out records where \`os\` is \`NULL\` or empty.
- Output columns: \`os\`, \`total_events\`, \`avg_battery_pct\`.
- Sort by \`total_events\` DESC, then \`os\` ASC.

### Input Schema
**${item.table}** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`os\` (VARCHAR)
- \`battery_level\` (INT)`;

    const schemaSql = `
CREATE TABLE ${item.table} (
  id INT PRIMARY KEY,
  user_id INT,
  os VARCHAR(50),
  battery_level INT
);

INSERT INTO ${item.table} VALUES
(1, 101, 'iOS', 85),
(2, 101, 'iOS', 72),
(3, 102, 'Android', 45),
(4, 103, 'Android', 60),
(5, 104, 'iOS', 90),
(6, 105, 'Windows', 100),
(7, 106, NULL, 50); -- Missing OS -> Excluded
`;

    const starterSql = `-- ${item.company}: Aggregate total events and average battery level by OS
-- Output: os, total_events, avg_battery_pct
SELECT
  -- Your code here
FROM ${item.table};
`;

    const referenceSql = `SELECT 
  os,
  COUNT(*) AS total_events,
  ROUND(AVG(battery_level), 2) AS avg_battery_pct
FROM ${item.table}
WHERE os IS NOT NULL AND TRIM(os) <> ''
GROUP BY os
ORDER BY total_events DESC, os ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Snowflake", "Databricks"],
      topics: ["Aggregation", "NULL Handling", "Data Cleaning", "Data Platform"],
      frequency: "High",
      category: "Business Analytics",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["os", "total_events", "avg_battery_pct"],
      hints: [
        "Filter out missing OS rows with `WHERE os IS NOT NULL AND TRIM(os) <> ''`.",
        "Compute `ROUND(AVG(battery_level), 2)` as `avg_battery_pct`."
      ],
      explanation: `### Data Lakehouse Semi-Structured Cleaning
In modern Lakehouses, raw telemetry tables require normalization and validation before surfacing downstream to business intelligence dashboards.`
    });
  });

  // -------------------------------------------------------------
  // THEME 9: Year-Over-Year Retention Decay Analysis (281-290)
  // -------------------------------------------------------------
  const theme9Decay = [
    { company: "Amazon", sub: "Prime Membership", joinYear: 2021 },
    { company: "Salesforce", sub: "Enterprise CRM Contract", joinYear: 2021 },
    { company: "Apple", sub: "iCloud Storage 2TB Plan", joinYear: 2021 },
    { company: "Costco", sub: "Executive Wholesale Membership", joinYear: 2021 },
    { company: "Microsoft", sub: "Office 365 Enterprise Subscription", joinYear: 2021 },
    { company: "Adobe", sub: "Creative Cloud All Apps", joinYear: 2021 },
    { company: "Workday", sub: "Human Capital Management Contract", joinYear: 2021 },
    { company: "ServiceNow", sub: "ITSM Suite License", joinYear: 2021 },
    { company: "Atlassian", sub: "Jira Data Center Tier", joinYear: 2021 },
    { company: "Zoom", sub: "Enterprise Video Bundle", joinYear: 2021 },
  ];

  theme9Decay.forEach((item, idx) => {
    const qNum = 281 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Multi-Year ${item.sub} Annual Retention Decay Analysis`;

    const description = `### Business Context
The ${item.company} Strategic Finance team tracks multi-year subscriber retention decay. For users who joined in **${item.joinYear}**, evaluate how many remained active in **Year 1 (2022)** and **Year 2 (2023)**.

### Metric Formulas & Rules
- Baseline cohort: All accounts with \`join_year = ${item.joinYear}\`.
- **\`baseline_users\`**: Total accounts in the ${item.joinYear} cohort.
- **\`year_1_active\`**: Accounts with at least one active renewal in 2022.
- **\`year_2_active\`**: Accounts with at least one active renewal in 2023.
- **\`year_2_retention_pct\`**: \`ROUND((year_2_active * 100.0) / baseline_users, 2)\`.
- Output columns: \`cohort_year\`, \`baseline_users\`, \`year_1_active\`, \`year_2_active\`, \`year_2_retention_pct\`.

### Input Schema
**cohort_members** table:
- \`id\` (INT PRIMARY KEY)
- \`join_year\` (INT)

**renewals** table:
- \`id\` (INT PRIMARY KEY)
- \`user_id\` (INT)
- \`renewal_year\` (INT)`;

    const schemaSql = `
CREATE TABLE cohort_members (
  id INT PRIMARY KEY,
  join_year INT
);

CREATE TABLE renewals (
  id INT PRIMARY KEY,
  user_id INT,
  renewal_year INT
);

INSERT INTO cohort_members VALUES
(1, ${item.joinYear}),
(2, ${item.joinYear}),
(3, ${item.joinYear}),
(4, ${item.joinYear}),
(5, ${item.joinYear});

INSERT INTO renewals VALUES
(101, 1, 2022),
(102, 1, 2023), -- User 1 active both years
(103, 2, 2022),
(104, 2, 2023), -- User 2 active both years
(105, 3, 2022), -- User 3 active Year 1 only
(106, 4, 2023); -- User 4 active Year 2 only
-- User 5: No renewals (churned)
-- Baseline: 5 users. Y1: 3 users. Y2: 3 users. Retention: 3/5 * 100 = 60.00%
`;

    const starterSql = `-- ${item.company}: Track multi-year retention decay
-- Output: cohort_year, baseline_users, year_1_active, year_2_active, year_2_retention_pct
WITH cohort_stats AS (
  -- Your code here
)
SELECT * FROM cohort_stats;
`;

    const referenceSql = `WITH cohort_stats AS (
  SELECT 
    c.join_year AS cohort_year,
    COUNT(DISTINCT c.id) AS baseline_users,
    COUNT(DISTINCT CASE WHEN r.renewal_year = 2022 THEN c.id END) AS year_1_active,
    COUNT(DISTINCT CASE WHEN r.renewal_year = 2023 THEN c.id END) AS year_2_active
  FROM cohort_members c
  LEFT JOIN renewals r ON c.id = r.user_id
  WHERE c.join_year = ${item.joinYear}
  GROUP BY c.join_year
)
SELECT 
  cohort_year,
  baseline_users,
  year_1_active,
  year_2_active,
  ROUND((year_2_active * 100.0) / NULLIF(baseline_users, 0), 2) AS year_2_retention_pct
FROM cohort_stats;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Salesforce", "Amazon"],
      topics: ["Cohort Retention", "LTV Decay", "LEFT JOIN", "COUNT(DISTINCT)"],
      frequency: "High",
      category: "Cohorts & Retention",
      orderSensitive: false,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["cohort_year", "baseline_users", "year_1_active", "year_2_active", "year_2_retention_pct"],
      hints: [
        "Left join renewals to preserve all members from the cohort.",
        "Use conditional distinct counts: `COUNT(DISTINCT CASE WHEN r.renewal_year = 2022 THEN c.id END)`.",
        "Calculate `year_2_retention_pct` as `(year_2_active * 100.0) / baseline_users`."
      ],
      explanation: `### Multi-Year LTV Decay
Measuring subscriber survival over multi-year horizons is the cornerstone of SaaS unit economics and enterprise valuation.`
    });
  });

  // -------------------------------------------------------------
  // THEME 10: High-Frequency Arbitrage & Slippage Auditing (291-300)
  // -------------------------------------------------------------
  const theme10HFT = [
    { company: "Citadel", ticker: "SPY", market: "US Equities" },
    { company: "Jane Street", ticker: "QQQ", market: "ETF Arbitrage" },
    { company: "Two Sigma", ticker: "AAPL", market: "Algorithmic Equities" },
    { company: "Jump Trading", ticker: "BTC", market: "Crypto Spot" },
    { company: "Virtu Financial", ticker: "MSFT", market: "Internalizer Market Maker" },
    { company: "DRW", ticker: "ES_FUT", market: "Index Futures" },
    { company: "Hudson River Trading", ticker: "NVDA", market: "Dark Pool Liquidity" },
    { company: "Tower Research", ticker: "EURUSD", market: "FX Spot" },
    { company: "Optiver", ticker: "VIX_OPT", market: "Volatility Options" },
    { company: "Flow Traders", ticker: "HYG", market: "Fixed Income ETF" },
  ];

  theme10HFT.forEach((item, idx) => {
    const qNum = 291 + idx;
    const id = `adv-${String(qNum).padStart(3, "0")}`;
    const title = `${item.company}: Execution Slippage & Spread Crossing Audit for ${item.ticker}`;

    const description = `### Business Context
The ${item.company} Quantitative Execution team audits trade execution quality. When an algorithmic buy order is placed, it specifies an **arrival limit price** (\`arrival_price\`). The broker executes the fill at \`executed_price\`.

Calculate the **slippage** in basis points (bps) for each executed buy trade:
$$\\text{slippage\\_bps} = \\frac{\\text{executed\\_price} - \\text{arrival\\_price}}{\\text{arrival\\_price}} \\times 10{,}000$$

### Metric Formulas & Rules
- Filter for \`side = 'BUY'\` and \`ticker = '${item.ticker}'\`.
- **\`slippage_bps\`**: Calculated as \`ROUND(((executed_price - arrival_price) * 10000.0) / arrival_price, 2)\`.
- A positive slippage represents unfavorable price drift; negative represents price improvement.
- Output columns: \`trade_id\`, \`ticker\`, \`arrival_price\`, \`executed_price\`, \`slippage_bps\`.
- Sort by \`slippage_bps\` DESC, then \`trade_id\` ASC.

### Input Schema
**trades** table:
- \`trade_id\` (INT PRIMARY KEY)
- \`ticker\` (VARCHAR)
- \`side\` (VARCHAR: 'BUY', 'SELL')
- \`arrival_price\` (NUMERIC)
- \`executed_price\` (NUMERIC)
- \`executed_at\` (TIMESTAMP)`;

    const schemaSql = `
CREATE TABLE trades (
  trade_id INT PRIMARY KEY,
  ticker VARCHAR(20),
  side VARCHAR(10),
  arrival_price NUMERIC,
  executed_price NUMERIC,
  executed_at TIMESTAMP
);

INSERT INTO trades VALUES
(1, '${item.ticker}', 'BUY', 500.00, 500.25, '2024-06-01 09:30:00.120'), -- +5.00 bps slippage
(2, '${item.ticker}', 'BUY', 500.00, 499.90, '2024-06-01 09:30:01.450'), -- -2.00 bps price improvement
(3, '${item.ticker}', 'BUY', 500.00, 500.80, '2024-06-01 09:30:02.010'), -- +16.00 bps slippage
(4, '${item.ticker}', 'SELL', 500.00, 499.50, '2024-06-01 09:30:02.500'),-- Excluded (SELL)
(5, 'OTHER', 'BUY', 100.00, 100.10, '2024-06-01 09:30:03.000');        -- Excluded (OTHER)
`;

    const starterSql = `-- ${item.company}: Calculate execution slippage in basis points for ${item.ticker}
-- Output: trade_id, ticker, arrival_price, executed_price, slippage_bps
SELECT
  -- Your code here
FROM trades;
`;

    const referenceSql = `SELECT 
  trade_id,
  ticker,
  arrival_price,
  executed_price,
  ROUND(((executed_price - arrival_price) * 10000.0) / arrival_price, 2) AS slippage_bps
FROM trades
WHERE side = 'BUY' AND ticker = '${item.ticker}'
ORDER BY slippage_bps DESC, trade_id ASC;`;

    list.push({
      id,
      title,
      difficulty: "Hard",
      companies: [item.company, "Citadel", "Jane Street"],
      topics: ["Quantitative Finance", "Basis Points (bps)", "Execution Slippage", "Arithmetic"],
      frequency: "High",
      category: "Business Analytics",
      orderSensitive: true,
      description,
      schemaSql,
      starterSql,
      referenceSql,
      expectedColumns: ["trade_id", "ticker", "arrival_price", "executed_price", "slippage_bps"],
      hints: [
        "Filter for `side = 'BUY'` and matching ticker in the WHERE clause.",
        "Calculate basis points: `((executed_price - arrival_price) * 10000.0) / arrival_price`.",
        "Round to 2 decimal places and sort by `slippage_bps DESC`."
      ],
      explanation: `### Quantitative Execution Slippage
In quantitative finance and electronic trading firms (Citadel, Two Sigma, Jane Street), slippage measures the friction between order arrival and fill execution. Calculating metrics in basis points (1 bps = 0.01% = 0.0001) is standard financial practice.`
    });
  });

  return list;
}
