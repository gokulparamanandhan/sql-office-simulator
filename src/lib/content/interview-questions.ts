export interface InterviewQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  topics: string[];
  frequency: "Very High" | "High" | "Medium";
  category: "Aggregations" | "Window Functions" | "Cohorts & Retention" | "Joins & Set Theory" | "Gaps & Islands" | "Business Analytics";
  description: string;
  schemaSql: string;
  hiddenTestSql?: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hints: string[];
  explanation: string;
  orderSensitive?: boolean;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "amzn-01",
    title: "Highest Paid Employees in Each Department",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Meta"],
    topics: ["Window Functions", "DENSE_RANK", "Ties", "CTEs"],
    frequency: "Very High",
    category: "Window Functions",
    orderSensitive: true,
    expectedColumns: ["department_name", "employee_name", "salary"],
    description: `### Business Context
Amazon HR Operations wants to audit compensation equity across different business units. Management has requested a report identifying the **top 2 highest-earning employees in each department**.

### Rules & Edge Cases
- If multiple employees in the same department earn the exact same salary and tie for a rank, **all tied employees must be included** (e.g., if two people tie for rank 1, both should be shown, and the next person should be rank 2).
- You must use \`DENSE_RANK()\` to ensure no ranks are skipped after ties.
- Order the final result by \`department_name\` ASC, then \`salary\` DESC, then \`employee_name\` ASC.

### Input Schema
**departments** table:
- \`id\` (INT, PRIMARY KEY)
- \`name\` (VARCHAR)

**employees** table:
- \`id\` (INT, PRIMARY KEY)
- \`name\` (VARCHAR)
- \`salary\` (INT)
- \`department_id\` (INT, FOREIGN KEY -> departments.id)`,
    schemaSql: `
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  salary INT,
  department_id INT REFERENCES departments(id)
);

INSERT INTO departments VALUES
(1, 'Engineering'),
(2, 'Operations'),
(3, 'Marketing');

INSERT INTO employees VALUES
(1, 'Alice Chen', 165000, 1),
(2, 'Bob Miller', 155000, 1),
(3, 'Charlie Dave', 165000, 1),
(4, 'Diana Ross', 140000, 1),
(5, 'Evan Wright', 95000, 2),
(6, 'Fiona Gallagher', 95000, 2),
(7, 'George Clark', 85000, 2),
(8, 'Hannah Abbott', 110000, 3),
(9, 'Ian Malcolm', 115000, 3),
(10, 'Julia Roberts', 115000, 3);
`,
    hiddenTestSql: `
INSERT INTO employees VALUES
(11, 'Kevin Bacon', 165000, 1),
(12, 'Laura Croft', 95000, 2);
`,
    starterSql: `-- Write a query to find the top 2 highest-earning employees in each department.
-- Handle ties using DENSE_RANK().
-- Output: department_name, employee_name, salary

SELECT 
  -- Your code here
FROM employees;
`,
    referenceSql: `WITH ranked_salaries AS (
  SELECT 
    d.name AS department_name,
    e.name AS employee_name,
    e.salary,
    DENSE_RANK() OVER (
      PARTITION BY e.department_id 
      ORDER BY e.salary DESC
    ) AS rnk
  FROM employees e
  JOIN departments d ON e.department_id = d.id
)
SELECT 
  department_name,
  employee_name,
  salary
FROM ranked_salaries
WHERE rnk <= 2
ORDER BY department_name ASC, salary DESC, employee_name ASC;`,
    hints: [
      "Use DENSE_RANK() rather than ROW_NUMBER() or RANK(). ROW_NUMBER assigns arbitrary ordering to ties, while RANK() skips ranks (e.g., 1, 1, 3).",
      "You cannot filter by a window function in the WHERE clause directly. Wrap the ranked calculation in a Common Table Expression (CTE) using `WITH ... AS (...)`.",
      "Make sure you join `employees` with `departments` on `e.department_id = d.id` and partition by `e.department_id` or `d.name`."
    ],
    explanation: `### Why this is a favorite FAANG interview question
This question tests two critical SQL concepts:
1. **Window Function nuances:** Knowing the difference between \`ROW_NUMBER()\` (strict sequential numbering), \`RANK()\` (skips ranks on ties, e.g. 1, 1, 3), and \`DENSE_RANK()\` (preserves consecutive ranks on ties, e.g. 1, 1, 2).
2. **Execution Order of SQL Clauses:** In SQL, the \`WHERE\` clause executes **before** window functions are evaluated. Therefore, writing \`WHERE DENSE_RANK() OVER(...) <= 2\` produces a syntax error. You must calculate the rank inside a Common Table Expression (CTE) or subquery first, then filter \`WHERE rnk <= 2\` in the outer query.`
  },
  {
    id: "uber-01",
    title: "Driver Trip Cancellation Rate",
    difficulty: "Medium",
    companies: ["Uber", "Lyft", "DoorDash"],
    topics: ["Conditional Aggregation", "CASE WHEN", "Joins", "Rounding"],
    frequency: "Very High",
    category: "Business Analytics",
    orderSensitive: true,
    expectedColumns: ["request_date", "cancellation_rate"],
    description: `### Business Context
Uber Operations is monitoring market health in major metropolitan areas. Compute the **cancellation rate of requests by unbanned users (both client and driver must be unbanned)** for each day between **'2024-06-01' and '2024-06-03'** inclusive.

### Definitions & Requirements
- **Cancellation Rate** is defined as: \`Total Cancelled Trips (by client or driver) / Total Requested Trips\`.
- Round the cancellation rate to **2 decimal places** as a numeric (e.g. \`0.33\`).
- If a client **OR** driver on a trip is banned (\`banned = 'Yes'\`), that trip **must be completely excluded** from both the numerator and denominator.
- Trips with status \`'completed'\` are not cancelled. Trips with status \`'cancelled_by_driver'\` or \`'cancelled_by_client'\` are cancelled.
- Order by \`request_date\` ASC.

### Input Schema
**trips** table:
- \`id\` (INT, PRIMARY KEY)
- \`client_id\` (INT)
- \`driver_id\` (INT)
- \`city_id\` (INT)
- \`status\` (VARCHAR: 'completed', 'cancelled_by_driver', 'cancelled_by_client')
- \`request_date\` (DATE)

**users** table:
- \`id\` (INT, PRIMARY KEY)
- \`banned\` (VARCHAR: 'No', 'Yes')
- \`role\` (VARCHAR: 'client', 'driver')`,
    schemaSql: `
CREATE TABLE users (
  id INT PRIMARY KEY,
  banned VARCHAR(5),
  role VARCHAR(10)
);

CREATE TABLE trips (
  id INT PRIMARY KEY,
  client_id INT REFERENCES users(id),
  driver_id INT REFERENCES users(id),
  city_id INT,
  status VARCHAR(30),
  request_date DATE
);

INSERT INTO users VALUES
(1, 'No', 'client'),
(2, 'Yes', 'client'),
(3, 'No', 'client'),
(4, 'No', 'client'),
(10, 'No', 'driver'),
(11, 'No', 'driver'),
(12, 'No', 'driver'),
(13, 'Yes', 'driver');

INSERT INTO trips VALUES
(1, 1, 10, 1, 'completed', '2024-06-01'),
(2, 2, 11, 1, 'cancelled_by_driver', '2024-06-01'),
(3, 3, 12, 6, 'completed', '2024-06-01'),
(4, 4, 10, 6, 'cancelled_by_client', '2024-06-01'),
(5, 1, 11, 1, 'completed', '2024-06-02'),
(6, 3, 10, 6, 'completed', '2024-06-02'),
(7, 4, 12, 6, 'completed', '2024-06-02'),
(8, 2, 12, 12, 'completed', '2024-06-03'),
(9, 3, 10, 12, 'completed', '2024-06-03'),
(10, 4, 13, 12, 'cancelled_by_driver', '2024-06-03'),
(11, 1, 12, 1, 'cancelled_by_client', '2024-06-03');
`,
    hiddenTestSql: `
INSERT INTO trips VALUES
(12, 3, 11, 1, 'cancelled_by_driver', '2024-06-02');
`,
    starterSql: `-- Calculate the daily trip cancellation rate for unbanned users between 2024-06-01 and 2024-06-03.
-- Output: request_date, cancellation_rate (rounded to 2 decimal places)

SELECT 
  -- Your code here
FROM trips;
`,
    referenceSql: `SELECT 
  t.request_date,
  ROUND(
    SUM(CASE WHEN t.status IN ('cancelled_by_driver', 'cancelled_by_client') THEN 1.0 ELSE 0.0 END) / COUNT(*),
    2
  ) AS cancellation_rate
FROM trips t
JOIN users c ON t.client_id = c.id AND c.banned = 'No'
JOIN users d ON t.driver_id = d.id AND d.banned = 'No'
WHERE t.request_date BETWEEN '2024-06-01' AND '2024-06-03'
GROUP BY t.request_date
ORDER BY t.request_date ASC;`,
    hints: [
      "Join the `users` table twice: once as `c` on `t.client_id = c.id` and once as `d` on `t.driver_id = d.id`.",
      "Filter out banned users using `c.banned = 'No' AND d.banned = 'No'`.",
      "To avoid integer division in SQL, multiply by `1.0` or use `1.0 ELSE 0.0` inside `SUM(CASE WHEN ...)` before dividing by `COUNT(*)`."
    ],
    explanation: `### Why this is a LeetCode Hard classic
This question appears in almost every ride-sharing or marketplace company interview (Uber, Lyft, Instacart).
Common pitfalls interviewers watch for:
1. **Joining users twice:** The trips table links to two different records in the users table. Candidates who only join once or use OR will get corrupt numbers.
2. **Integer Division trap:** In PostgreSQL, integer division \`3 / 10\` results in \`0\`. You must cast to decimal using \`1.0\` or \`::DECIMAL\` before dividing.
3. **Filtering dates:** Using \`BETWEEN '2024-06-01' AND '2024-06-03'\` properly covers the range.`
  },
  {
    id: "meta-01",
    title: "App Click-Through Rate (CTR) by Device",
    difficulty: "Easy",
    companies: ["Meta", "Google", "Pinterest"],
    topics: ["Conditional Aggregation", "CASE WHEN", "Percentages"],
    frequency: "Very High",
    category: "Aggregations",
    orderSensitive: true,
    expectedColumns: ["device_type", "total_impressions", "total_clicks", "ctr_percentage"],
    description: `### Business Context
The Meta Ads Growth engineering team is analyzing user engagement performance across mobile and desktop devices. Calculate the **Click-Through Rate (CTR)** for each device type in the month of **July 2024**.

### Metric Formula
- \`total_impressions\`: Count of events where \`event_type = 'impression'\`.
- \`total_clicks\`: Count of events where \`event_type = 'click'\`.
- \`ctr_percentage\`: \`(total_clicks / total_impressions) * 100.0\`, rounded to **2 decimal places**.
- If a device has 0 impressions, display \`0.00\` to prevent division-by-zero errors.
- Sort the results by \`ctr_percentage\` DESC, then \`device_type\` ASC.

### Input Schema
**ad_events** table:
- \`event_id\` (INT, PRIMARY KEY)
- \`ad_id\` (INT)
- \`device_type\` (VARCHAR: 'mobile_ios', 'mobile_android', 'desktop', 'tablet')
- \`event_type\` (VARCHAR: 'impression', 'click')
- \`event_time\` (TIMESTAMP)`,
    schemaSql: `
CREATE TABLE ad_events (
  event_id INT PRIMARY KEY,
  ad_id INT,
  device_type VARCHAR(20),
  event_type VARCHAR(20),
  event_time TIMESTAMP
);

INSERT INTO ad_events VALUES
(1, 101, 'mobile_ios', 'impression', '2024-07-02 10:15:00'),
(2, 101, 'mobile_ios', 'click', '2024-07-02 10:15:05'),
(3, 101, 'mobile_ios', 'impression', '2024-07-02 11:20:00'),
(4, 102, 'mobile_android', 'impression', '2024-07-03 12:00:00'),
(5, 102, 'mobile_android', 'impression', '2024-07-03 12:05:00'),
(6, 102, 'mobile_android', 'click', '2024-07-03 12:05:10'),
(7, 103, 'desktop', 'impression', '2024-07-04 09:30:00'),
(8, 103, 'desktop', 'impression', '2024-07-04 09:45:00'),
(9, 103, 'desktop', 'impression', '2024-07-04 10:00:00'),
(10, 103, 'desktop', 'click', '2024-07-04 10:00:15'),
(11, 104, 'tablet', 'impression', '2024-07-05 14:00:00'),
(12, 105, 'mobile_ios', 'impression', '2024-06-30 23:59:00'); -- Excluded (June)
`,
    hiddenTestSql: `
INSERT INTO ad_events VALUES
(13, 106, 'tablet', 'click', '2024-07-06 15:00:00'),
(14, 107, 'desktop', 'click', '2024-07-07 16:00:00');
`,
    starterSql: `-- Calculate total impressions, total clicks, and CTR percentage by device_type for July 2024.
-- Output: device_type, total_impressions, total_clicks, ctr_percentage

SELECT 
  -- Your code here
FROM ad_events;
`,
    referenceSql: `SELECT 
  device_type,
  SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END) AS total_impressions,
  SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) AS total_clicks,
  ROUND(
    CASE 
      WHEN SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END) = 0 THEN 0.00
      ELSE (SUM(CASE WHEN event_type = 'click' THEN 1.0 ELSE 0.0 END) / 
            SUM(CASE WHEN event_type = 'impression' THEN 1.0 ELSE 0.0 END)) * 100.0
    END,
    2
  ) AS ctr_percentage
FROM ad_events
WHERE event_time >= '2024-07-01 00:00:00' AND event_time < '2024-08-01 00:00:00'
GROUP BY device_type
ORDER BY ctr_percentage DESC, device_type ASC;`,
    hints: [
      "Use conditional aggregation with `SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END)` to count impressions and clicks in one pass.",
      "Filter for July 2024 using `event_time >= '2024-07-01' AND event_time < '2024-08-01'` rather than string formatting for best performance.",
      "Check for zero impressions before dividing to avoid division-by-zero runtime crashes."
    ],
    explanation: `### Key Interview Takeaways
- **Single-Pass Aggregation:** Using \`SUM(CASE WHEN ...)\` allows you to compute both counters in a single scan of the table instead of doing costly self-joins or multiple subqueries.
- **Division-by-Zero defense:** In production telemetry, some segments may have zero impressions or clicks. Demonstrating awareness of \`NULLIF()\` or defensive \`CASE WHEN\` scores huge bonus points with interviewers.`
  },
  {
    id: "stripe-01",
    title: "User Consecutive Active Days (Gaps & Islands)",
    difficulty: "Hard",
    companies: ["Stripe", "Spotify", "Duolingo", "ByteDance"],
    topics: ["Gaps and Islands", "Window Functions", "ROW_NUMBER", "Date Arithmetic"],
    frequency: "High",
    category: "Gaps & Islands",
    orderSensitive: true,
    expectedColumns: ["user_id", "streak_length"],
    description: `### Business Context
Stripe is analyzing merchant portal engagement to identify power users. A user is on an **active streak** if they log in on consecutive calendar days. 

Find all users who have had an active login streak of **at least 3 consecutive days**, and output their **maximum streak length**.

### Rules & Edge Cases
- If a user logged in multiple times on the same date, count that date **only once** (distinct dates).
- Multiple streaks can occur; return the **longest consecutive streak length** for each eligible user.
- Sort the results by \`streak_length\` DESC, then \`user_id\` ASC.

### Input Schema
**user_logins** table:
- \`login_id\` (INT, PRIMARY KEY)
- \`user_id\` (INT)
- \`login_date\` (DATE)`,
    schemaSql: `
CREATE TABLE user_logins (
  login_id INT PRIMARY KEY,
  user_id INT,
  login_date DATE
);

INSERT INTO user_logins VALUES
(1, 101, '2024-05-01'),
(2, 101, '2024-05-02'),
(3, 101, '2024-05-03'), -- User 101 streak 3
(4, 101, '2024-05-05'),
(5, 102, '2024-05-01'),
(6, 102, '2024-05-03'),
(7, 102, '2024-05-05'), -- User 102 no streak
(8, 103, '2024-05-10'),
(9, 103, '2024-05-11'),
(10, 103, '2024-05-12'),
(11, 103, '2024-05-13'),
(12, 103, '2024-05-13'), -- Duplicate same day
(13, 103, '2024-05-14'), -- User 103 streak 5
(14, 104, '2024-05-01'),
(15, 104, '2024-05-02'); -- Streak 2 (less than 3)
`,
    hiddenTestSql: `
INSERT INTO user_logins VALUES
(16, 105, '2024-05-20'),
(17, 105, '2024-05-21'),
(18, 105, '2024-05-22'),
(19, 105, '2024-05-23');
`,
    starterSql: `-- Find users with a consecutive login streak of at least 3 days.
-- Return the maximum streak length per user.
-- Output: user_id, streak_length

SELECT 
  -- Your code here
FROM user_logins;
`,
    referenceSql: `WITH distinct_dates AS (
  SELECT DISTINCT user_id, login_date
  FROM user_logins
),
numbered AS (
  SELECT 
    user_id,
    login_date,
    login_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date))::INT AS island_grp
  FROM distinct_dates
),
streaks AS (
  SELECT 
    user_id,
    island_grp,
    COUNT(*) AS streak_length
  FROM numbered
  GROUP BY user_id, island_grp
  HAVING COUNT(*) >= 3
)
SELECT 
  user_id,
  MAX(streak_length) AS streak_length
FROM streaks
GROUP BY user_id
ORDER BY streak_length DESC, user_id ASC;`,
    hints: [
      "First de-duplicate logins with `SELECT DISTINCT user_id, login_date` because users may log in multiple times in one day.",
      "The classic Gaps & Islands trick: subtract `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date)` days from `login_date`. If days are consecutive, `login_date - row_number` produces a constant group anchor date!",
      "Group by `user_id` and the anchor date to count streak length, filter `HAVING COUNT(*) >= 3`, and finally take the `MAX(streak_length)` per user."
    ],
    explanation: `### The Famous "Gaps and Islands" Pattern
This is widely regarded as one of the hardest SQL interview problems because it requires non-intuitive mathematical grouping:
1. **The Math:** If a sequence of dates is consecutive ($D, D+1, D+2$) and row numbers are consecutive ($1, 2, 3$), then $(D+k) - k = D$.
2. The difference between each date and its row number stays **identical** as long as there is no gap!
3. The moment a user misses a day, the difference shifts to a new constant value, creating a new "island".
4. Grouping by this difference cleanly segments consecutive clusters.`
  },
  {
    id: "netflix-01",
    title: "7-Day Rolling Watch Time per Account",
    difficulty: "Medium",
    companies: ["Netflix", "YouTube", "Hulu"],
    topics: ["Window Functions", "Rolling Window", "ROWS BETWEEN", "Date Partition"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    expectedColumns: ["account_id", "stream_date", "daily_minutes", "rolling_7d_minutes"],
    description: `### Business Context
Netflix Data Science wants to track streaming engagement velocity. For each user account, calculate the **7-day rolling total watch time in minutes** (the sum of watch time for the current day and the previous 6 days).

### Requirements
- If an account has fewer than 6 previous days of data, sum whatever days exist up to the current day.
- Output: \`account_id\`, \`stream_date\`, \`daily_minutes\`, \`rolling_7d_minutes\`.
- Sort by \`account_id\` ASC, \`stream_date\` ASC.

### Input Schema
**account_streams** table:
- \`stream_id\` (INT, PRIMARY KEY)
- \`account_id\` (INT)
- \`stream_date\` (DATE)
- \`minutes_watched\` (INT)`,
    schemaSql: `
CREATE TABLE account_streams (
  stream_id INT PRIMARY KEY,
  account_id INT,
  stream_date DATE,
  minutes_watched INT
);

INSERT INTO account_streams VALUES
(1, 10, '2024-04-01', 120),
(2, 10, '2024-04-02', 80),
(3, 10, '2024-04-03', 150),
(4, 10, '2024-04-04', 60),
(5, 10, '2024-04-05', 90),
(6, 10, '2024-04-06', 200),
(7, 10, '2024-04-07', 180),
(8, 10, '2024-04-08', 110), -- Day 8 rolling drops Day 1
(9, 20, '2024-04-01', 45),
(10, 20, '2024-04-02', 60),
(11, 20, '2024-04-03', 90);
`,
    hiddenTestSql: `
INSERT INTO account_streams VALUES
(12, 10, '2024-04-09', 140),
(13, 20, '2024-04-04', 120);
`,
    starterSql: `-- Calculate the 7-day rolling total watch time per account.
-- Output: account_id, stream_date, daily_minutes, rolling_7d_minutes

SELECT 
  -- Your code here
FROM account_streams;
`,
    referenceSql: `WITH daily_totals AS (
  SELECT 
    account_id,
    stream_date,
    SUM(minutes_watched) AS daily_minutes
  FROM account_streams
  GROUP BY account_id, stream_date
)
SELECT 
  account_id,
  stream_date,
  daily_minutes,
  SUM(daily_minutes) OVER (
    PARTITION BY account_id 
    ORDER BY stream_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS rolling_7d_minutes
FROM daily_totals
ORDER BY account_id ASC, stream_date ASC;`,
    hints: [
      "First group by `account_id` and `stream_date` in a CTE in case an account streamed multiple times on the same date.",
      "Use window aggregation: `SUM(daily_minutes) OVER (...)`.",
      "Specify the frame clause: `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` to capture the current day plus the preceding 6 rows."
    ],
    explanation: `### The Power of the Window Frame Clause
Most candidates know \`SUM() OVER (PARTITION BY ... ORDER BY ...)\`, but they don't realize the default frame without \`ROWS\` is \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, which computes a cumulative running total rather than a rolling 7-day window.
Explicitly defining \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` is the hallmark of an advanced SQL practitioner.`
  },
  {
    id: "airbnb-01",
    title: "First-Time Host 30-Day Booking Conversion",
    difficulty: "Medium",
    companies: ["Airbnb", "Expedia", "Booking.com"],
    topics: ["Cohorts & Retention", "MIN Window", "Date Arithmetic", "LEFT JOIN"],
    frequency: "High",
    category: "Cohorts & Retention",
    orderSensitive: true,
    expectedColumns: ["signup_month", "total_new_hosts", "converted_hosts", "conversion_rate"],
    description: `### Business Context
Airbnb Host Acquisition wants to measure host activation speed. Specifically, they want to know: of all new hosts who created their first listing in a given month, what percentage secured their **first guest booking within 30 days of listing creation**?

### Metrics & Constraints
- Focus on listings created in **January 2024 ('2024-01')** and **February 2024 ('2024-02')**.
- A host's listing date is their earliest listing creation date (\`created_at\`).
- A host converted if their earliest booking date is within **30 days** (i.e. \`first_booking_date - first_listing_date <= 30\`).
- \`conversion_rate\`: \`ROUND((converted_hosts * 100.0 / total_new_hosts), 2)\`.
- Order by \`signup_month\` ASC.

### Input Schema
**hosts** table:
- \`host_id\` (INT, PRIMARY KEY)
- \`created_at\` (DATE)

**bookings** table:
- \`booking_id\` (INT, PRIMARY KEY)
- \`host_id\` (INT REFERENCES hosts(host_id))
- \`booking_date\` (DATE)`,
    schemaSql: `
CREATE TABLE hosts (
  host_id INT PRIMARY KEY,
  created_at DATE
);

CREATE TABLE bookings (
  booking_id INT PRIMARY KEY,
  host_id INT REFERENCES hosts(host_id),
  booking_date DATE
);

INSERT INTO hosts VALUES
(1, '2024-01-05'),
(2, '2024-01-12'),
(3, '2024-01-20'),
(4, '2024-01-25'),
(5, '2024-02-02'),
(6, '2024-02-15'),
(7, '2024-03-01'); -- Excluded (March)

INSERT INTO bookings VALUES
(101, 1, '2024-01-15'), -- Host 1: 10 days (Converted)
(102, 2, '2024-03-01'), -- Host 2: > 30 days (Not converted)
(103, 3, '2024-02-05'), -- Host 3: 16 days (Converted)
-- Host 4: No bookings (Not converted)
(104, 5, '2024-02-10'), -- Host 5: 8 days (Converted)
(105, 6, '2024-02-28'); -- Host 6: 13 days (Converted)
`,
    hiddenTestSql: `
INSERT INTO hosts VALUES (8, '2024-02-20');
INSERT INTO bookings VALUES (106, 8, '2024-03-29'); -- Host 8: > 30 days
`,
    starterSql: `-- Calculate the 30-day booking conversion rate for hosts created in Jan and Feb 2024.
-- Output: signup_month, total_new_hosts, converted_hosts, conversion_rate

SELECT 
  -- Your code here
FROM hosts;
`,
    referenceSql: `WITH host_cohorts AS (
  SELECT 
    host_id,
    created_at,
    TO_CHAR(created_at, 'YYYY-MM') AS signup_month
  FROM hosts
  WHERE created_at >= '2024-01-01' AND created_at < '2024-03-01'
),
first_bookings AS (
  SELECT 
    host_id,
    MIN(booking_date) AS first_booking_date
  FROM bookings
  GROUP BY host_id
)
SELECT 
  h.signup_month,
  COUNT(h.host_id) AS total_new_hosts,
  SUM(CASE WHEN b.first_booking_date IS NOT NULL AND (b.first_booking_date - h.created_at) <= 30 THEN 1 ELSE 0 END) AS converted_hosts,
  ROUND(
    SUM(CASE WHEN b.first_booking_date IS NOT NULL AND (b.first_booking_date - h.created_at) <= 30 THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(h.host_id),
    2
  ) AS conversion_rate
FROM host_cohorts h
LEFT JOIN first_bookings b ON h.host_id = b.host_id
GROUP BY h.signup_month
ORDER BY h.signup_month ASC;`,
    hints: [
      "Use `TO_CHAR(created_at, 'YYYY-MM')` to extract the signup cohort month.",
      "Calculate each host's first booking date in a separate CTE using `MIN(booking_date)`.",
      "Use a `LEFT JOIN` between hosts and first bookings so hosts who never received a booking are preserved in `total_new_hosts`."
    ],
    explanation: `### Why Cohort Analysis is Essential for Data Analysts
Cohort analysis is asked in almost every product and growth analyst interview. 
The critical mistake candidates make is using an \`INNER JOIN\` to connect users to their actions. An inner join silently deletes all users who never took an action, resulting in a false 100% conversion rate! Always use \`LEFT JOIN\` for funnel denominators.`
  },
  {
    id: "spotify-01",
    title: "Top 3 Streaming Artists by Country",
    difficulty: "Medium",
    companies: ["Spotify", "Apple", "Tidal"],
    topics: ["Window Functions", "DENSE_RANK", "Multi-table Joins", "Aggregations"],
    frequency: "High",
    category: "Window Functions",
    orderSensitive: true,
    expectedColumns: ["country", "artist_name", "total_streams", "country_rank"],
    description: `### Business Context
Spotify's Global Music Editorial team wants to curate localized homepage charts. Find the **top 3 most-streamed artists in each country**, along with their total stream count.

### Requirements
- Rank artists within each country by \`total_streams\` DESC.
- Handle ties with \`DENSE_RANK()\`. If there are ties, also sort by \`artist_name\` ASC.
- Include only ranks 1, 2, and 3.
- Order the final output by \`country\` ASC, \`country_rank\` ASC, \`artist_name\` ASC.

### Input Schema
**artists** table:
- \`artist_id\` (INT, PRIMARY KEY)
- \`artist_name\` (VARCHAR)

**tracks** table:
- \`track_id\` (INT, PRIMARY KEY)
- \`artist_id\` (INT REFERENCES artists(artist_id))

**streams** table:
- \`stream_id\` (INT, PRIMARY KEY)
- \`track_id\` (INT REFERENCES tracks(track_id))
- \`country\` (VARCHAR)
- \`stream_count\` (INT)`,
    schemaSql: `
CREATE TABLE artists (
  artist_id INT PRIMARY KEY,
  artist_name VARCHAR(50)
);

CREATE TABLE tracks (
  track_id INT PRIMARY KEY,
  artist_id INT REFERENCES artists(artist_id)
);

CREATE TABLE streams (
  stream_id INT PRIMARY KEY,
  track_id INT REFERENCES tracks(track_id),
  country VARCHAR(10),
  stream_count INT
);

INSERT INTO artists VALUES
(1, 'Taylor Swift'),
(2, 'Drake'),
(3, 'The Weeknd'),
(4, 'Bad Bunny'),
(5, 'Ed Sheeran');

INSERT INTO tracks VALUES
(101, 1),
(102, 1),
(103, 2),
(104, 3),
(105, 4),
(106, 5);

INSERT INTO streams VALUES
(1, 101, 'US', 5000),
(2, 102, 'US', 3000), -- Taylor Swift US total: 8000
(3, 103, 'US', 7000), -- Drake US total: 7000
(4, 104, 'US', 6500), -- The Weeknd US total: 6500
(5, 105, 'US', 4000), -- Bad Bunny US total: 4000
(6, 101, 'UK', 4000), -- Taylor Swift UK: 4000
(7, 106, 'UK', 4500), -- Ed Sheeran UK: 4500
(8, 103, 'UK', 3200), -- Drake UK: 3200
(9, 104, 'UK', 2000); -- The Weeknd UK: 2000
`,
    hiddenTestSql: `
INSERT INTO streams VALUES
(10, 105, 'UK', 4000); -- Bad Bunny UK tie with Taylor Swift
`,
    starterSql: `-- Find the top 3 most-streamed artists in each country.
-- Output: country, artist_name, total_streams, country_rank

SELECT 
  -- Your code here
FROM streams;
`,
    referenceSql: `WITH artist_country_streams AS (
  SELECT 
    s.country,
    a.artist_name,
    SUM(s.stream_count) AS total_streams
  FROM streams s
  JOIN tracks t ON s.track_id = t.track_id
  JOIN artists a ON t.artist_id = a.artist_id
  GROUP BY s.country, a.artist_name
),
ranked_artists AS (
  SELECT 
    country,
    artist_name,
    total_streams,
    DENSE_RANK() OVER (
      PARTITION BY country 
      ORDER BY total_streams DESC
    ) AS country_rank
  FROM artist_country_streams
)
SELECT 
  country,
  artist_name,
  total_streams,
  country_rank
FROM ranked_artists
WHERE country_rank <= 3
ORDER BY country ASC, country_rank ASC, artist_name ASC;`,
    hints: [
      "An artist can have multiple tracks. First aggregate total streams by artist and country using `SUM(s.stream_count)` with `GROUP BY s.country, a.artist_name`.",
      "In the second CTE, apply `DENSE_RANK() OVER (PARTITION BY country ORDER BY total_streams DESC)`.",
      "Filter for `country_rank <= 3` in the outer SELECT."
    ],
    explanation: `### Aggregation Before Windowing
A frequent mistake made by candidates is trying to put \`SUM()\` and \`DENSE_RANK()\` in the same query level without grouping first. 
In SQL, you must first aggregate streams to the (country, artist) level, and then rank those aggregated rows.`
  },
  {
    id: "goog-01",
    title: "Search Session Inactivity & Sessionization",
    difficulty: "Hard",
    companies: ["Google", "Microsoft", "Meta"],
    topics: ["Sessionization", "LAG", "Cumulative Sum", "Window Functions"],
    frequency: "High",
    category: "Business Analytics",
    orderSensitive: true,
    expectedColumns: ["user_id", "session_id", "session_start", "total_queries"],
    description: `### Business Context
Google Search Quality team groups user search queries into distinct **sessions**. A session expires if a user is inactive for **more than 30 minutes** (1800 seconds) between successive searches.

Calculate the number of queries performed in each search session for every user.

### Requirements
- Use \`LAG(search_timestamp)\` to calculate the time difference in seconds from the user's previous search.
- If the difference is \`NULL\` (first search) or \`> 30 minutes (1800 seconds)\`, start a new session.
- Generate a unique sequential \`session_id\` per user starting at 1.
- Output: \`user_id\`, \`session_id\`, \`session_start\` (first search timestamp of session), \`total_queries\`.
- Order by \`user_id\` ASC, \`session_id\` ASC.

### Input Schema
**search_logs** table:
- \`query_id\` (INT, PRIMARY KEY)
- \`user_id\` (INT)
- \`query_text\` (VARCHAR)
- \`search_timestamp\` (TIMESTAMP)`,
    schemaSql: `
CREATE TABLE search_logs (
  query_id INT PRIMARY KEY,
  user_id INT,
  query_text VARCHAR(100),
  search_timestamp TIMESTAMP
);

INSERT INTO search_logs VALUES
(1, 1, 'python tutorial', '2024-05-01 10:00:00'),
(2, 1, 'pandas dataframe', '2024-05-01 10:15:00'), -- 15 mins (same session 1)
(3, 1, 'sql window functions', '2024-05-01 10:25:00'), -- 10 mins (same session 1)
(4, 1, 'pasta recipes', '2024-05-01 12:00:00'), -- 95 mins gap (new session 2)
(5, 1, 'carbonara authentic', '2024-05-01 12:10:00'), -- 10 mins (same session 2)
(6, 2, 'weather tokyo', '2024-05-01 08:00:00'),
(7, 2, 'flight tickets tokyo', '2024-05-01 09:30:00'); -- 90 mins gap (new session 2)
`,
    hiddenTestSql: `
INSERT INTO search_logs VALUES
(8, 2, 'hotels shinjuku', '2024-05-01 09:40:00');
`,
    starterSql: `-- Group search events into sessions based on a 30-minute inactivity threshold.
-- Output: user_id, session_id, session_start, total_queries

SELECT 
  -- Your code here
FROM search_logs;
`,
    referenceSql: `WITH step1_prev AS (
  SELECT 
    user_id,
    query_id,
    search_timestamp,
    LAG(search_timestamp) OVER (
      PARTITION BY user_id 
      ORDER BY search_timestamp
    ) AS prev_ts
  FROM search_logs
),
step2_flag AS (
  SELECT 
    user_id,
    query_id,
    search_timestamp,
    CASE 
      WHEN prev_ts IS NULL OR EXTRACT(EPOCH FROM (search_timestamp - prev_ts)) > 1800 THEN 1 
      ELSE 0 
    END AS is_new_session
  FROM step1_prev
),
step3_session_ids AS (
  SELECT 
    user_id,
    query_id,
    search_timestamp,
    SUM(is_new_session) OVER (
      PARTITION BY user_id 
      ORDER BY search_timestamp 
      ROWS UNBOUNDED PRECEDING
    ) AS session_id
  FROM step2_flag
)
SELECT 
  user_id,
  session_id,
  MIN(search_timestamp) AS session_start,
  COUNT(*) AS total_queries
FROM step3_session_ids
GROUP BY user_id, session_id
ORDER BY user_id ASC, session_id ASC;`,
    hints: [
      "Use `LAG(search_timestamp) OVER (PARTITION BY user_id ORDER BY search_timestamp)` to find the prior timestamp.",
      "Calculate seconds difference using `EXTRACT(EPOCH FROM (search_timestamp - prev_ts))`. If > 1800 or NULL, mark `is_new_session = 1`, else `0`.",
      "The master sessionization trick: use a running sum `SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY search_timestamp)` to convert flags into a unique session ID!"
    ],
    explanation: `### The Golden Technique of Sessionization
Sessionization is one of the highest-rated interview problems at Google, Netflix, and Meta.
The magic formula:
1. Identify session boundaries using \`LAG\` with a time threshold (e.g. 30 mins).
2. Flag each boundary with \`1\`, non-boundaries with \`0\`.
3. Take the **running sum** (\`SUM() OVER (... ROWS UNBOUNDED PRECEDING)\`) of those 1s. Every time a new session starts, the cumulative sum increments by 1 and stays constant until the next session. This generates clean session IDs without loops!`
  },
  {
    id: "wmt-01",
    title: "Inventory Restock & Safety Stock Deficit Alert",
    difficulty: "Easy",
    companies: ["Walmart", "Target", "Amazon"],
    topics: ["Arithmetic", "CASE WHEN", "Filtering", "Joins"],
    frequency: "High",
    category: "Business Analytics",
    orderSensitive: true,
    expectedColumns: ["product_id", "product_name", "current_stock", "reorder_point", "units_to_order"],
    description: `### Business Context
Walmart Supply Chain Logistics monitors warehouse stock levels to prevent stockouts. A product needs to be reordered when its \`current_stock\` drops strictly below its calculated **Reorder Point**.

### Formula & Logic
- **Reorder Point (ROP)** = \`(daily_sales_velocity * lead_time_days) + safety_stock\`.
- If \`current_stock < reorder_point\`, the inventory is at risk.
- \`units_to_order\` is calculated as \`reorder_point - current_stock\`.
- Return only products requiring reorders (\`current_stock < reorder_point\`).
- Sort by \`units_to_order\` DESC, then \`product_id\` ASC.

### Input Schema
**inventory** table:
- \`product_id\` (INT, PRIMARY KEY)
- \`product_name\` (VARCHAR)
- \`current_stock\` (INT)
- \`daily_sales_velocity\` (INT)
- \`lead_time_days\` (INT)
- \`safety_stock\` (INT)`,
    schemaSql: `
CREATE TABLE inventory (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100),
  current_stock INT,
  daily_sales_velocity INT,
  lead_time_days INT,
  safety_stock INT
);

INSERT INTO inventory VALUES
(101, 'Great Value 2% Milk 1 Gal', 45, 20, 3, 25), -- ROP = (20*3)+25 = 85. Stock 45 < 85 -> Need 40
(102, 'Wonder Bread White Loaf', 110, 15, 2, 20), -- ROP = (15*2)+20 = 50. Stock 110 >= 50 -> OK
(103, 'Organic Bananas 3lb', 15, 30, 2, 40),       -- ROP = (30*2)+40 = 100. Stock 15 < 100 -> Need 85
(104, 'Paper Towels 12-Pack', 70, 10, 5, 30),      -- ROP = (10*5)+30 = 80. Stock 70 < 80 -> Need 10
(105, 'Large Eggs Grade A Dozen', 150, 25, 2, 30); -- ROP = (25*2)+30 = 80. Stock 150 >= 80 -> OK
`,
    hiddenTestSql: `
INSERT INTO inventory VALUES
(106, 'Cheddar Cheese Block', 12, 10, 4, 15); -- ROP = 55. Need 43
`,
    starterSql: `-- Identify products below the reorder point and calculate units_to_order.
-- Output: product_id, product_name, current_stock, reorder_point, units_to_order

SELECT 
  -- Your code here
FROM inventory;
`,
    referenceSql: `WITH calculations AS (
  SELECT 
    product_id,
    product_name,
    current_stock,
    (daily_sales_velocity * lead_time_days) + safety_stock AS reorder_point
  FROM inventory
)
SELECT 
  product_id,
  product_name,
  current_stock,
  reorder_point,
  (reorder_point - current_stock) AS units_to_order
FROM calculations
WHERE current_stock < reorder_point
ORDER BY units_to_order DESC, product_id ASC;`,
    hints: [
      "Calculate the reorder point in a CTE or subquery: `(daily_sales_velocity * lead_time_days) + safety_stock`.",
      "Filter in the outer query where `current_stock < reorder_point`.",
      "Calculate `units_to_order` as `reorder_point - current_stock`."
    ],
    explanation: `### Practical Supply Chain SQL
Interviewers love this question because it tests whether you can translate a real operations KPI into a maintainable query without repeating formula expressions across the \`SELECT\` and \`WHERE\` clauses.`
  },
  {
    id: "jpm-01",
    title: "Fraudulent Transaction Burst Detection",
    difficulty: "Medium",
    companies: ["JPMorgan", "Visa", "Capital One"],
    topics: ["Self-Joins", "Window Functions", "Timestamp Differences", "Risk Analytics"],
    frequency: "Medium",
    category: "Business Analytics",
    orderSensitive: true,
    expectedColumns: ["account_id", "t1_id", "t2_id", "t1_amount", "t2_amount", "seconds_apart"],
    description: `### Business Context
JPMorgan Chase Fraud Detection monitors debit card activities for rapid successive transactions. A **Suspicious Burst** occurs when the same \`account_id\` executes two consecutive transactions where:
1. Both transactions have an amount of **at least $500** (\`amount >= 500\`).
2. The second transaction occurs within **300 seconds (5 minutes)** of the first transaction (\`t2_time - t1_time <= 300 seconds\`).

### Requirements
- Output: \`account_id\`, \`t1_id\` (earlier transaction), \`t2_id\` (later transaction), \`t1_amount\`, \`t2_amount\`, \`seconds_apart\`.
- \`seconds_apart\` must be an integer.
- Order by \`account_id\` ASC, \`t1_id\` ASC.

### Input Schema
**transactions** table:
- \`transaction_id\` (INT, PRIMARY KEY)
- \`account_id\` (INT)
- \`amount\` (DECIMAL(10,2))
- \`transaction_time\` (TIMESTAMP)`,
    schemaSql: `
CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY,
  account_id INT,
  amount DECIMAL(10,2),
  transaction_time TIMESTAMP
);

INSERT INTO transactions VALUES
(1, 1001, 650.00, '2024-06-01 14:00:00'),
(2, 1001, 800.00, '2024-06-01 14:03:30'), -- 210 secs apart (BURST FLAG)
(3, 1001, 120.00, '2024-06-01 14:04:00'), -- < 500
(4, 1002, 550.00, '2024-06-01 15:00:00'),
(5, 1002, 750.00, '2024-06-01 15:10:00'), -- 600 secs apart (> 300)
(6, 1003, 900.00, '2024-06-01 16:20:00'),
(7, 1003, 1200.00, '2024-06-01 16:22:15'); -- 135 secs apart (BURST FLAG)
`,
    hiddenTestSql: `
INSERT INTO transactions VALUES
(8, 1004, 520.00, '2024-06-01 18:00:00'),
(9, 1004, 580.00, '2024-06-01 18:04:00'); -- 240 secs apart
`,
    starterSql: `-- Detect suspicious transaction bursts >= $500 occurring within 300 seconds of each other.
-- Output: account_id, t1_id, t2_id, t1_amount, t2_amount, seconds_apart

SELECT 
  -- Your code here
FROM transactions;
`,
    referenceSql: `WITH ordered_txs AS (
  SELECT 
    account_id,
    transaction_id,
    amount,
    transaction_time,
    LEAD(transaction_id) OVER (PARTITION BY account_id ORDER BY transaction_time) AS next_id,
    LEAD(amount) OVER (PARTITION BY account_id ORDER BY transaction_time) AS next_amount,
    LEAD(transaction_time) OVER (PARTITION BY account_id ORDER BY transaction_time) AS next_time
  FROM transactions
  WHERE amount >= 500
)
SELECT 
  account_id,
  transaction_id AS t1_id,
  next_id AS t2_id,
  amount AS t1_amount,
  next_amount AS t2_amount,
  EXTRACT(EPOCH FROM (next_time - transaction_time))::INT AS seconds_apart
FROM ordered_txs
WHERE next_id IS NOT NULL 
  AND EXTRACT(EPOCH FROM (next_time - transaction_time)) <= 300
ORDER BY account_id ASC, t1_id ASC;`,
    hints: [
      "Filter for `amount >= 500` first so you only examine qualified transactions.",
      "Use `LEAD()` over `(PARTITION BY account_id ORDER BY transaction_time)` to peek at the immediate next transaction.",
      "Extract the seconds between timestamps using `EXTRACT(EPOCH FROM (next_time - transaction_time))` and filter `<= 300`."
    ],
    explanation: `### FinTech Fraud Pattern
Using \`LEAD()\` or \`LAG()\` is far more performant than doing an $O(N^2)$ self-join on timestamps. In high-frequency banking platforms, window functions scale linearly $O(N \\log N)$ with ordering.`
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
