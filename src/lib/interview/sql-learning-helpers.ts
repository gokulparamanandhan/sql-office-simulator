export type VisualPrimerType =
  | "window-ranking"
  | "window-frame"
  | "lag-lead"
  | "cte-pipeline"
  | "subquery-flow"
  | "recursive-tree";

export interface ConceptPrimer {
  title: string;
  mentalModel: string;
  syntaxTemplate: string;
  exampleWalkthrough?: string;
  visualType?: VisualPrimerType;
}

export type RampStep = "Warm-up" | "Core" | "Applied";

export interface InterviewQuestionMeta {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  topics: string[];
  frequency: "Very High" | "High" | "Medium";
  category:
    | "Aggregations"
    | "Window Functions"
    | "Cohorts & Retention"
    | "Joins & Set Theory"
    | "Gaps & Islands"
    | "Business Analytics"
    | "Advanced SQL";
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

export interface ParsedCte {
  name: string;
  isRecursive: boolean;
  definitionEndIndex: number;
}

export interface PatternCheatSheetItem {
  id: string;
  name: string;
  badge: string;
  whenToUse: string;
  mentalModel: string;
  templateSql: string;
  pitfall: string;
}

export const BASIC_STAGES = [
  { order: 1, id: "Stage 1: Core Querying & Dirty Hygiene", shortLabel: "1. Core & Hygiene", range: "Q1–10" },
  { order: 2, id: "Stage 2: Conditional Logic & Dates", shortLabel: "2. CASE & Dates", range: "Q11–18" },
  { order: 3, id: "Stage 3: Aggregations & Grouping", shortLabel: "3. GROUP BY & HAVING", range: "Q19–28" },
  { order: 4, id: "Stage 4: Multi-Table Joins & Set Ops", shortLabel: "4. Joins & UNION", range: "Q29–40" },
  { order: 5, id: "Stage 5: Subqueries (Scalar, IN, EXISTS)", shortLabel: "5. Subqueries", range: "Q41–52" },
  { order: 6, id: "Stage 6: Common Table Expressions (CTEs)", shortLabel: "6. CTEs (WITH)", range: "Q53–64" },
  { order: 7, id: "Stage 7: Window Foundations (OVER & PARTITION)", shortLabel: "7. Window OVER()", range: "Q65–74" },
  { order: 8, id: "Stage 8: Window Ranking (ROW_NUMBER, DENSE_RANK)", shortLabel: "8. Ranking", range: "Q75–84" },
  { order: 9, id: "Stage 9: Row Navigation (LAG, LEAD, FIRST_VALUE)", shortLabel: "9. LAG & LEAD", range: "Q85–92" },
  { order: 10, id: "Stage 10: Window Frame Clauses & Capstones", shortLabel: "10. Frame Clauses", range: "Q93–100" },
] as const;

export const SKILL_TRACKS = [
  "Core & Joins",
  "Subqueries",
  "CTEs & Fanout",
  "Window Basics",
  "Window Ranking",
  "LAG / LEAD",
  "Frame Clauses",
  "Advanced Patterns",
] as const;

export type SkillTrack = (typeof SKILL_TRACKS)[number];

export const PATTERN_CHEATSHEET: PatternCheatSheetItem[] = [
  {
    id: "top-n",
    name: "Top-N per Group",
    badge: "CTE + DENSE_RANK",
    whenToUse: "Find the top 1, 2, or N items inside each category, department, or region.",
    mentalModel:
      "Window functions run after WHERE, so you cannot write WHERE DENSE_RANK() OVER(...) <= 2 directly. Rank inside a CTE first, then filter outside.",
    templateSql: `WITH ranked AS (
  SELECT
    group_col,
    item_col,
    metric_col,
    DENSE_RANK() OVER (
      PARTITION BY group_col
      ORDER BY metric_col DESC
    ) AS rnk
  FROM my_table
)
SELECT group_col, item_col, metric_col, rnk
FROM ranked
WHERE rnk <= 2;`,
    pitfall: "Use DENSE_RANK() when ties should share a rank without skipping numbers; use ROW_NUMBER() for strictly N rows (add a tie-breaker in ORDER BY!).",
  },
  {
    id: "running-rolling",
    name: "Running Totals & Rolling Windows",
    badge: "ROWS BETWEEN",
    whenToUse: "Cumulative revenue over time, 7-day rolling averages, or centered smoothing.",
    mentalModel:
      "Explicitly specify ROWS BETWEEN so duplicate dates don't get merged together by PostgreSQL's default RANGE frame.",
    templateSql: `SELECT
  event_date,
  amount,
  SUM(amount) OVER (
    ORDER BY event_date ASC, id ASC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  ROUND(AVG(amount) OVER (
    ORDER BY event_date ASC, id ASC
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7row_avg
FROM events;`,
    pitfall: "LAST_VALUE(col) stops at CURRENT ROW unless you add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
  },
  {
    id: "lag-lead",
    name: "Period-over-Period & Gaps (LAG / LEAD)",
    badge: "LAG / LEAD + NULLIF",
    whenToUse: "Compare today vs yesterday, MoM growth %, or elapsed time between consecutive events.",
    mentalModel:
      "LAG(col, 1) reads the previous row in the partition; LEAD(col, 1) peeks at the next row—eliminating messy self-joins.",
    templateSql: `WITH with_prev AS (
  SELECT
    entity_id,
    event_date,
    revenue,
    LAG(revenue, 1) OVER (
      PARTITION BY entity_id
      ORDER BY event_date ASC
    ) AS prev_revenue
  FROM monthly_metrics
)
SELECT
  entity_id,
  event_date,
  revenue,
  ROUND((revenue - prev_revenue) * 100.0 / NULLIF(prev_revenue, 0), 2) AS growth_pct
FROM with_prev;`,
    pitfall: "Always wrap denominators in NULLIF(prev_val, 0) to prevent division-by-zero errors, and use COALESCE(LAG(...), 0) when first-row deltas should be 0.",
  },
  {
    id: "fanout-cte",
    name: "Fanout-Safe Multi-Table Joins",
    badge: "Pre-Aggregated CTE",
    whenToUse: "Joining a parent table (orders) to two independent child tables (order_items, refunds/shipments).",
    mentalModel:
      "Joining two 1-to-many child tables directly creates a Cartesian product that multiplies sums. Aggregate each child table down to 1 row per parent ID inside separate CTEs first.",
    templateSql: `WITH item_totals AS (
  SELECT order_id, SUM(qty * price) AS gross_total
  FROM order_items
  GROUP BY order_id
),
refund_totals AS (
  SELECT order_id, SUM(amount) AS refunded
  FROM refunds
  GROUP BY order_id
)
SELECT
  o.id,
  COALESCE(i.gross_total, 0) - COALESCE(r.refunded, 0) AS net_total
FROM orders o
LEFT JOIN item_totals i ON o.id = i.order_id
LEFT JOIN refund_totals r ON o.id = r.order_id;`,
    pitfall: "Use LEFT JOIN (not INNER JOIN) after pre-aggregating so orders with zero refunds are preserved with COALESCE(..., 0).",
  },
  {
    id: "subquery-vs-cte",
    name: "Subqueries vs CTEs",
    badge: "EXISTS / Scalar / WITH",
    whenToUse: "Compare rows against global/group benchmarks or check existence without row multiplication.",
    mentalModel:
      "Use EXISTS / NOT EXISTS for fast semi-joins; use a CTE when you want readable multi-step staging or need to reuse an aggregated benchmark.",
    templateSql: `-- Safe NOT EXISTS (immune to NULLs unlike NOT IN)
SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);`,
    pitfall: "NOT IN (SELECT col ...) returns ZERO rows if the subquery contains even a single NULL! Prefer NOT EXISTS or filter WHERE col IS NOT NULL.",
  },
  {
    id: "gaps-islands",
    name: "Gaps & Islands (Consecutive Streaks)",
    badge: "date - ROW_NUMBER()",
    whenToUse: "Find longest consecutive daily login streaks or contiguous active date ranges.",
    mentalModel:
      "Deduplicate dates per user, then subtract ROW_NUMBER() * INTERVAL '1 day'. Consecutive dates increment by +1 at the exact same pace as ROW_NUMBER(), producing a constant anchor date per streak!",
    templateSql: `WITH distinct_days AS (
  SELECT DISTINCT user_id, active_date FROM activity
),
grouped AS (
  SELECT
    user_id,
    active_date,
    active_date - (ROW_NUMBER() OVER (
      PARTITION BY user_id ORDER BY active_date
    ) * INTERVAL '1 day') AS island_key
  FROM distinct_days
)
SELECT user_id, COUNT(*) AS streak_days
FROM grouped
GROUP BY user_id, island_key;`,
    pitfall: "Always deduplicate same-day events (SELECT DISTINCT user_id, active_date) first, otherwise two logins on the same day break the 1-day step.",
  },
  {
    id: "sessionization",
    name: "Sessionization & Interval Merging",
    badge: "LAG Flag + Running SUM",
    whenToUse: "Group raw timestamps into sessions (e.g., 30-min timeout) or merge overlapping outage intervals.",
    mentalModel:
      "Pass 1: Use LAG() (or running MAX(end_time)) to emit 1 when a new session/island starts, else 0. Pass 2: Take a running SUM(flag) OVER (...) to assign sequential IDs.",
    templateSql: `WITH flags AS (
  SELECT
    user_id,
    event_time,
    CASE
      WHEN LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) IS NULL
        OR event_time - LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) > INTERVAL '30 minutes'
      THEN 1 ELSE 0
    END AS is_new_session
  FROM events
),
numbered AS (
  SELECT
    user_id,
    event_time,
    SUM(is_new_session) OVER (
      PARTITION BY user_id
      ORDER BY event_time
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS session_id
  FROM flags
)
SELECT user_id, session_id, MIN(event_time) AS started_at, COUNT(*) AS events_count
FROM numbered
GROUP BY user_id, session_id;`,
    pitfall: "Window functions cannot be nested directly (SUM(LAG(...)) OVER (...))—always put LAG in CTE 1 and the running SUM in CTE 2.",
  },
  {
    id: "recursive-cte",
    name: "Recursive Hierarchies & Trees",
    badge: "WITH RECURSIVE",
    whenToUse: "Org charts (CEO -> Manager -> Employee), category trees, or Bill of Materials cost rollups.",
    mentalModel:
      "Every recursive CTE has two parts glued by UNION ALL: (1) an Anchor query for root rows, and (2) a Recursive query joining the table back to the CTE itself.",
    templateSql: `WITH RECURSIVE tree AS (
  -- 1. Anchor (root nodes)
  SELECT id, name, manager_id, 1 AS depth
  FROM employees
  WHERE manager_id IS NULL
  UNION ALL
  -- 2. Recursive step
  SELECT e.id, e.name, e.manager_id, t.depth + 1
  FROM employees e
  JOIN tree t ON e.manager_id = t.id
)
SELECT * FROM tree;`,
    pitfall: "In PostgreSQL, when concatenating breadcrumb strings recursively, CAST the anchor string (e.g. CAST(name AS VARCHAR(255))) so types match across UNION ALL.",
  },
];

/**
 * Strips SQL comments while preserving quoted string literals.
 */
function stripCommentsPreservingQuotes(sql: string): string {
  let out = "";
  let inSingle = false;
  let inDouble = false;
  let inLineComment = false;
  let inBlockComment = false;
  let inDollar = false;
  let dollarTag = "";

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1] || "";

    if (inLineComment) {
      if (ch === "\n") {
        inLineComment = false;
        out += "\n";
      }
      continue;
    }

    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (!inSingle && !inDouble && !inDollar) {
      if (ch === "-" && next === "-") {
        inLineComment = true;
        i++;
        continue;
      }
      if (ch === "/" && next === "*") {
        inBlockComment = true;
        i++;
        continue;
      }
    }

    if (!inSingle && !inDouble && ch === "$") {
      const m = sql.slice(i).match(/^\$([a-zA-Z0-9_]*)\$/);
      if (m) {
        const tag = m[0];
        if (inDollar && dollarTag === tag) {
          inDollar = false;
          dollarTag = "";
        } else if (!inDollar) {
          inDollar = true;
          dollarTag = tag;
        }
        out += tag;
        i += tag.length - 1;
        continue;
      }
    }

    if (!inDouble && !inDollar && ch === "'") {
      if (inSingle && next === "'") {
        out += "''";
        i++;
        continue;
      }
      inSingle = !inSingle;
      out += ch;
      continue;
    }

    if (!inSingle && !inDollar && ch === '"') {
      inDouble = !inDouble;
      out += ch;
      continue;
    }

    out += ch;
  }

  return out;
}

/**
 * Parses top-level CTEs in a SQL query (`WITH [RECURSIVE] a AS (...), b AS (...) SELECT ...`).
 */
export function extractCtesFromSql(rawSql: string): {
  isRecursive: boolean;
  ctes: ParsedCte[];
  cleanSql: string;
} {
  const cleanSql = stripCommentsPreservingQuotes(rawSql).trim();
  if (!cleanSql) return { isRecursive: false, ctes: [], cleanSql: "" };

  const withMatch = cleanSql.match(/^WITH\s+(RECURSIVE\s+)?/i);
  if (!withMatch) return { isRecursive: false, ctes: [], cleanSql };

  const isRecursive = Boolean(withMatch[1]);
  let pos = withMatch[0].length;
  const ctes: ParsedCte[] = [];

  while (pos < cleanSql.length) {
    while (pos < cleanSql.length && /\s/.test(cleanSql[pos])) pos++;

    const nameMatch = cleanSql.slice(pos).match(/^([a-zA-Z_][a-zA-Z0-9_]*|"[^"]+")/);
    if (!nameMatch) break;
    const cteName = nameMatch[1];
    pos += nameMatch[0].length;

    while (pos < cleanSql.length && /\s/.test(cleanSql[pos])) pos++;

    // Optional column list: cte_name (col1, col2)
    if (cleanSql[pos] === "(") {
      let depth = 0;
      while (pos < cleanSql.length) {
        if (cleanSql[pos] === "(") depth++;
        else if (cleanSql[pos] === ")") {
          depth--;
          if (depth === 0) {
            pos++;
            break;
          }
        }
        pos++;
      }
      while (pos < cleanSql.length && /\s/.test(cleanSql[pos])) pos++;
    }

    const asMatch = cleanSql.slice(pos).match(/^AS\s+(?:(?:NOT\s+)?MATERIALIZED\s+)?\(/i);
    if (!asMatch) break;
    pos += asMatch[0].length - 1; // point directly at '('

    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    while (pos < cleanSql.length) {
      const ch = cleanSql[pos];
      const next = cleanSql[pos + 1] || "";

      if (!inDouble && ch === "'") {
        if (inSingle && next === "'") {
          pos += 2;
          continue;
        }
        inSingle = !inSingle;
      } else if (!inSingle && ch === '"') {
        inDouble = !inDouble;
      } else if (!inSingle && !inDouble) {
        if (ch === "(") depth++;
        else if (ch === ")") {
          depth--;
          if (depth === 0) {
            pos++;
            break;
          }
        }
      }
      pos++;
    }

    if (depth !== 0) break;

    ctes.push({
      name: cteName.replace(/^"|"$/g, ""),
      isRecursive,
      definitionEndIndex: pos,
    });

    while (pos < cleanSql.length && /\s/.test(cleanSql[pos])) pos++;
    if (cleanSql[pos] === ",") {
      pos++;
      continue;
    }
    break;
  }

  return { isRecursive, ctes, cleanSql };
}

/**
 * Rewrites a multi-CTE query so PGlite returns up to 50 rows from a specific intermediate CTE.
 */
export function buildCtePreviewSql(rawSql: string, targetCteName: string): string | null {
  const { ctes, cleanSql } = extractCtesFromSql(rawSql);
  const target = ctes.find((c) => c.name.toLowerCase() === targetCteName.toLowerCase());
  if (!target) return null;

  const prefix = cleanSql.slice(0, target.definitionEndIndex);
  const quotedName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(target.name)
    ? target.name
    : `"${target.name.replace(/"/g, '""')}"`;

  return `${prefix}\nSELECT * FROM ${quotedName} LIMIT 50;`;
}

/**
 * Maps any question into one of the 8 mastery skill tracks for progress tracking and weak-spot drilling.
 */
export function getQuestionSkillTrack(q: Pick<InterviewQuestionMeta, "topics" | "category" | "referenceSql" | "stage" | "difficulty">): SkillTrack {
  const sql = (q.referenceSql || "").toUpperCase();
  const topics = (q.topics || []).map((t) => t.toUpperCase());
  const stage = (q.stage || "").toUpperCase();

  if (
    /WITH\s+RECURSIVE/.test(sql) ||
    topics.some((t) =>
      ["SESSIONIZATION", "GAPS & ISLANDS", "COHORT ANALYSIS", "INTERVAL MERGING", "FIFO", "WITH RECURSIVE", "FUNNEL SEQUENCE", "FUNNEL ANALYSIS", "DEDUPLICATION"].includes(t)
    )
  ) {
    return "Advanced Patterns";
  }
  if (/(ROWS|RANGE|GROUPS)\s+BETWEEN/.test(sql) || stage.includes("FRAME") || topics.some((t) => t.includes("ROWS BETWEEN") || t.includes("FRAME"))) {
    return "Frame Clauses";
  }
  if (/\b(LAG|LEAD|FIRST_VALUE|LAST_VALUE)\s*\(/.test(sql) || stage.includes("LAG") || topics.some((t) => ["LAG", "LEAD", "FIRST_VALUE", "LAST_VALUE"].includes(t))) {
    return "LAG / LEAD";
  }
  if (/\b(ROW_NUMBER|RANK|DENSE_RANK|NTILE|PERCENT_RANK)\s*\(/.test(sql) || stage.includes("RANK") || topics.some((t) => ["ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE", "PERCENT_RANK"].includes(t))) {
    return "Window Ranking";
  }
  if (/\bOVER\s*\(/.test(sql) || q.category === "Window Functions" || stage.includes("WINDOW")) {
    return "Window Basics";
  }
  if (/^\s*WITH\b/i.test(sql) || stage.includes("CTE") || topics.some((t) => t.includes("CTE"))) {
    return "CTEs & Fanout";
  }
  if (/\(\s*SELECT\b/.test(sql) || stage.includes("SUBQUER") || topics.some((t) => t.includes("SUBQUER") || t === "EXISTS" || t === "NOT EXISTS")) {
    return "Subqueries";
  }
  return "Core & Joins";
}

/**
 * Provides a helpful Concept Primer automatically when a question touches CTEs, Windows, Frames, Subqueries, or Recursion.
 */
export function resolveConceptPrimer(q: InterviewQuestionMeta): ConceptPrimer | null {
  if (q.conceptPrimer) return q.conceptPrimer;

  const track = getQuestionSkillTrack(q);
  const sql = (q.referenceSql || "").toUpperCase();

  switch (track) {
    case "Frame Clauses":
      return {
        title: "Window Frame Clauses (ROWS BETWEEN ...)",
        mentalModel:
          "A window frame controls the exact slice of rows relative to the CURRENT ROW used by SUM(), AVG(), or LAST_VALUE(). Always use ROWS BETWEEN (physical rows) when you want deterministic rolling windows even if dates tie.",
        syntaxTemplate: `SUM(amount) OVER (
  PARTITION BY group_col
  ORDER BY sort_col ASC
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)`,
        exampleWalkthrough:
          "2 PRECEDING AND CURRENT ROW creates a 3-row rolling window; UNBOUNDED PRECEDING AND CURRENT ROW creates a cumulative running total.",
        visualType: "window-frame",
      };
    case "LAG / LEAD":
      return {
        title: "Row Navigation with LAG() & LEAD()",
        mentalModel:
          "LAG(col, 1) looks backwards at the previous row inside the same partition, while LEAD(col, 1) looks ahead to the next row. Combine with COALESCE for initial rows and NULLIF(..., 0) before dividing.",
        syntaxTemplate: `LAG(metric, 1) OVER (
  PARTITION BY entity_id
  ORDER BY event_date ASC
) AS prev_metric`,
        exampleWalkthrough: "First row in each partition returns NULL for LAG() unless a 3rd default argument is provided.",
        visualType: "lag-lead",
      };
    case "Window Ranking":
      return {
        title: "Window Ranking + Top-N CTE Pattern",
        mentalModel:
          "ROW_NUMBER() always gives 1, 2, 3, 4; RANK() ties then skips (1, 2, 2, 4); DENSE_RANK() ties without gaps (1, 2, 2, 3). Wrap the ranking query in a CTE to filter WHERE rnk <= N.",
        syntaxTemplate: `WITH ranked AS (
  SELECT *, DENSE_RANK() OVER (PARTITION BY grp ORDER BY val DESC) AS rnk
  FROM table_name
)
SELECT * FROM ranked WHERE rnk <= 2;`,
        exampleWalkthrough: "Remember: window functions cannot appear inside WHERE directly—always filter in an outer query or CTE.",
        visualType: "window-ranking",
      };
    case "Window Basics":
      return {
        title: "Window Aggregations with OVER (PARTITION BY ...)",
        mentalModel:
          "Unlike GROUP BY—which collapses rows into one summary row per group—an OVER() window keeps every individual row intact and attaches the group total, average, or count right alongside it.",
        syntaxTemplate: `SELECT
  item,
  category,
  amount,
  SUM(amount) OVER (PARTITION BY category) AS category_total
FROM sales;`,
        exampleWalkthrough: "Leave OVER () empty for a grand total across all rows; add PARTITION BY col to reset the calculation per group.",
        visualType: "window-frame",
      };
    case "CTEs & Fanout":
      return {
        title: "Modular Staging with Common Table Expressions (CTEs)",
        mentalModel:
          "A CTE (WITH step_name AS (...)) gives a clean name to an intermediate query. Chain multiple CTEs to break complex questions into readable steps—or pre-aggregate child tables before joining to stop 1-to-many fanout.",
        syntaxTemplate: `WITH step_1 AS (
  SELECT key_col, SUM(val) AS total_val
  FROM child_table
  GROUP BY key_col
)
SELECT p.name, COALESCE(s.total_val, 0)
FROM parent_table p
LEFT JOIN step_1 s ON p.id = s.key_col;`,
        visualType: "cte-pipeline",
      };
    case "Subqueries":
      return {
        title: "Subqueries: Scalar, IN/EXISTS & Correlated",
        mentalModel:
          "A subquery runs a helper SELECT inside (), either once as a single scalar value/derived table, or row-by-row when correlated (referencing the outer table alias).",
        syntaxTemplate: `SELECT id, metric
FROM items i
WHERE metric > (
  SELECT AVG(i2.metric) FROM items i2 WHERE i2.grp = i.grp
);`,
        exampleWalkthrough: "Use NOT EXISTS instead of NOT IN whenever the inner column might contain NULLs.",
        visualType: "subquery-flow",
      };
    case "Advanced Patterns":
      if (/WITH\s+RECURSIVE/.test(sql)) {
        return {
          title: "Recursive Traversal with WITH RECURSIVE",
          mentalModel:
            "Anchor member selects the starting root rows; UNION ALL feeds them into the recursive step which joins children to parents until no new rows remain.",
          syntaxTemplate: `WITH RECURSIVE tree AS (
  SELECT id, parent_id, 1 AS depth FROM nodes WHERE parent_id IS NULL
  UNION ALL
  SELECT n.id, n.parent_id, t.depth + 1 FROM nodes n JOIN tree t ON n.parent_id = t.id
)
SELECT * FROM tree;`,
          visualType: "recursive-tree",
        };
      }
      return {
        title: "Multi-Pass Analytical Pipeline (CTE + Window)",
        mentalModel:
          "Hard SQL problems break cleanly into 2–3 passes: (1) compute LAG / ROW_NUMBER / bounds in CTE 1, (2) assign island or session keys in CTE 2, (3) aggregate final metrics in the outer SELECT.",
        syntaxTemplate: `WITH pass_1 AS (...),
pass_2 AS (SELECT *, SUM(flag) OVER (...) AS grp FROM pass_1)
SELECT grp, COUNT(*) FROM pass_2 GROUP BY grp;`,
        visualType: "cte-pipeline",
      };
    default:
      return null;
  }
}

/**
 * Generates a guided clause skeleton without revealing the solution SQL.
 */
export function resolveBlueprintSql(q: InterviewQuestionMeta): string {
  if (q.blueprintSql) return q.blueprintSql;

  const cols = q.expectedColumns.join(", ");
  const track = getQuestionSkillTrack(q);

  switch (track) {
    case "Frame Clauses":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
SELECT
  -- 1. Select grouping/date columns & current metric
  -- 2. Apply window aggregate with explicit frame:
  --    SUM(...) OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ... AND ...)
FROM ...
ORDER BY ...;`;
    case "LAG / LEAD":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
WITH lagged AS (
  SELECT
    -- 1. Select columns + LAG(col, 1) OVER (PARTITION BY ... ORDER BY ...) AS prev_val
  FROM ...
)
SELECT
  -- 2. Compute difference or % change using NULLIF(..., 0)
FROM lagged
ORDER BY ...;`;
    case "Window Ranking":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
WITH ranked AS (
  SELECT
    -- 1. Select columns + DENSE_RANK() / ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ... DESC) AS rnk
  FROM ...
)
SELECT ${cols}
FROM ranked
WHERE rnk <= -- target rank cutoff
ORDER BY ...;`;
    case "Window Basics":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
SELECT
  -- 1. Row-level columns
  -- 2. Window metric: AGG(col) OVER (PARTITION BY ...)
FROM ...
ORDER BY ...;`;
    case "CTEs & Fanout":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
WITH step_1 AS (
  -- 1. Filter or pre-aggregate intermediate dataset
  SELECT ...
  FROM ...
  GROUP BY ...
)
SELECT
  -- 2. Join or project final columns (${cols})
FROM step_1
ORDER BY ...;`;
    case "Subqueries":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
SELECT ${cols}
FROM ...
WHERE ... (
  -- Inner benchmark or existence check
  SELECT ...
)
ORDER BY ...;`;
    case "Advanced Patterns":
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
WITH step_1 AS (
  -- Pass 1: Compute base flags / LAG / ROW_NUMBER / Anchor
  SELECT ...
),
step_2 AS (
  -- Pass 2: Group keys, running sums, or recursive join
  SELECT ...
)
SELECT ${cols}
FROM step_2
ORDER BY ...;`;
    default:
      return `-- Guided Blueprint (${q.title})
-- Expected columns: ${cols}
SELECT
  -- 1. Clean NULLs/casing with COALESCE / TRIM / LOWER
  -- 2. Compute requested columns: ${cols}
FROM ...
WHERE ...
GROUP BY ...
ORDER BY ...;`;
  }
}
