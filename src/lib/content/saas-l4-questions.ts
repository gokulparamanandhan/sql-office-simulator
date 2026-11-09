import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L4-001",
    "domain": "saas",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q1)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #1 - Samira Khan (CEO & Founder)]: Rank records in accounts by id. Return id, company_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 11;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, company_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM accounts WHERE id >= 1 ORDER BY rank_num ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-002",
    "domain": "saas",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in pricing_plans (Q2)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #2 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of pricing_plans. Return id, plan_name AS partition_key, monthly_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 12;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, plan_name AS partition_key, monthly_price AS metric_val, DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk FROM pricing_plans WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-003",
    "domain": "saas",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q3)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #3 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on subscriptions. Return id, mrr AS current_val, and LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 13;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "mrr",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, mrr AS current_val, LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-004",
    "domain": "saas",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q4)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #4 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on invoices. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 14;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM invoices WHERE id >= 1 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-005",
    "domain": "saas",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on users (Q5)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #5 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in users. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 15;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-006",
    "domain": "saas",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q6)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #6 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for api_keys. Create a CTE named staged_metrics selecting id, key_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 16;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, key_name AS staged_name, id AS score FROM api_keys WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-007",
    "domain": "saas",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q7)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #7 - Chloe Vance (Head of Product Analytics)]: Rank records in feature_usage by monthly_events. Return id, feature_name AS entity_title, monthly_events AS metric_score, and ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 17;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, feature_name AS entity_title, monthly_events AS metric_score, ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num FROM feature_usage WHERE id >= 1 ORDER BY rank_num ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-008",
    "domain": "saas",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in cloud_clusters (Q8)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #8 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of cloud_clusters. Return id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, and DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 18;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk FROM cloud_clusters WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-009",
    "domain": "saas",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q9)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #9 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on support_tickets. Return id, resolution_hours AS current_val, and LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 19;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "resolution_hours",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, resolution_hours AS current_val, LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric FROM support_tickets WHERE id >= 1 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-010",
    "domain": "saas",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q10)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #10 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on churn_events. Return id, arr_lost AS current_val, and LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "arr_lost",
      "next_metric"
    ],
    "reference_sql": "SELECT id, arr_lost AS current_val, LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric FROM churn_events WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-011",
    "domain": "saas",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on integrations (Q11)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #11 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in integrations. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 21;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM integrations WHERE id >= 1 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-012",
    "domain": "saas",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q12)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #12 - Liam Vance (Head of Customer Success)]: Stage transformation logic for audit_events. Create a CTE named staged_metrics selecting id, action AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 22;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, action AS staged_name, id AS score FROM audit_events WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-013",
    "domain": "saas",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q13)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #13 - Samira Khan (CEO & Founder)]: Rank records in nps_surveys by score. Return id, account_id::text AS entity_title, score AS metric_score, and ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 23;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, account_id::text AS entity_title, score AS metric_score, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num FROM nps_surveys WHERE id >= 1 ORDER BY rank_num ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-014",
    "domain": "saas",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in feature_flags (Q14)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #14 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of feature_flags. Return id, min_tier AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 24;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, min_tier AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk FROM feature_flags WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-015",
    "domain": "saas",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q15)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #15 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on accounts. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 25;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L4-016",
    "domain": "saas",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q16)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #16 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on pricing_plans. Return id, monthly_price AS current_val, and LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 26;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_price",
      "next_metric"
    ],
    "reference_sql": "SELECT id, monthly_price AS current_val, LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric FROM pricing_plans WHERE id >= 1 ORDER BY id ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-017",
    "domain": "saas",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Cumulative Running Total on subscriptions (Q17)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #17 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in subscriptions. Return id, mrr AS baseline_val, and SUM(mrr) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 27;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, mrr AS baseline_val, SUM(mrr) OVER (ORDER BY id ASC) AS running_total FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-018",
    "domain": "saas",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q18)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #18 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for invoices. Create a CTE named staged_metrics selecting id, account_id::text AS staged_name, and amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 28;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, account_id::text AS staged_name, amount AS score FROM invoices WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-019",
    "domain": "saas",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q19)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #19 - Chloe Vance (Head of Product Analytics)]: Rank records in users by id. Return id, full_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 29;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, full_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM users WHERE id >= 1 ORDER BY rank_num ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-020",
    "domain": "saas",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Dense Partition Ranking in api_keys (Q20)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #20 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of api_keys. Return id, account_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 30;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk FROM api_keys WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-021",
    "domain": "saas",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q21)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #21 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on feature_usage. Return id, monthly_events AS current_val, and LAG(monthly_events, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 31;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_events",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, monthly_events AS current_val, LAG(monthly_events, 1) OVER (ORDER BY id ASC) AS prev_metric FROM feature_usage WHERE id >= 1 ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-022",
    "domain": "saas",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q22)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #22 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on cloud_clusters. Return id, monthly_cost_usd AS current_val, and LEAD(monthly_cost_usd, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 32;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_cost_usd",
      "next_metric"
    ],
    "reference_sql": "SELECT id, monthly_cost_usd AS current_val, LEAD(monthly_cost_usd, 1) OVER (ORDER BY id ASC) AS next_metric FROM cloud_clusters WHERE id >= 1 ORDER BY id ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-023",
    "domain": "saas",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Cumulative Running Total on support_tickets (Q23)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #23 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in support_tickets. Return id, resolution_hours AS baseline_val, and SUM(resolution_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 33;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, resolution_hours AS baseline_val, SUM(resolution_hours) OVER (ORDER BY id ASC) AS running_total FROM support_tickets WHERE id >= 1 ORDER BY id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-024",
    "domain": "saas",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q24)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #24 - Liam Vance (Head of Customer Success)]: Stage transformation logic for churn_events. Create a CTE named staged_metrics selecting id, reason AS staged_name, and arr_lost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 34;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, reason AS staged_name, arr_lost AS score FROM churn_events WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-025",
    "domain": "saas",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q25)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #25 - Samira Khan (CEO & Founder)]: Rank records in integrations by id. Return id, provider AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 35;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, provider AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM integrations WHERE id >= 1 ORDER BY rank_num ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-026",
    "domain": "saas",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Dense Partition Ranking in audit_events (Q26)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #26 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of audit_events. Return id, account_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 36;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk FROM audit_events WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-027",
    "domain": "saas",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q27)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #27 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on nps_surveys. Return id, score AS current_val, and LAG(score, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 37;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "score",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, score AS current_val, LAG(score, 1) OVER (ORDER BY id ASC) AS prev_metric FROM nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-028",
    "domain": "saas",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q28)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #28 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on feature_flags. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 38;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM feature_flags WHERE id >= 1 ORDER BY id ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-029",
    "domain": "saas",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Cumulative Running Total on accounts (Q29)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #29 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in accounts. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 39;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-030",
    "domain": "saas",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q30)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #30 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for pricing_plans. Create a CTE named staged_metrics selecting id, plan_name AS staged_name, and monthly_price AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 40;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, plan_name AS staged_name, monthly_price AS score FROM pricing_plans WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-031",
    "domain": "saas",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q31)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #31 - Chloe Vance (Head of Product Analytics)]: Rank records in subscriptions by mrr. Return id, plan AS entity_title, mrr AS metric_score, and ROW_NUMBER() OVER (ORDER BY mrr DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 41;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, plan AS entity_title, mrr AS metric_score, ROW_NUMBER() OVER (ORDER BY mrr DESC) AS rank_num FROM subscriptions WHERE id >= 1 ORDER BY rank_num ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-032",
    "domain": "saas",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Dense Partition Ranking in invoices (Q32)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #32 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of invoices. Return id, account_id AS partition_key, amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 42;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, amount AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk FROM invoices WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-033",
    "domain": "saas",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q33)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #33 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on users. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 43;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-034",
    "domain": "saas",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q34)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #34 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on api_keys. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 44;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM api_keys WHERE id >= 1 ORDER BY id ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-035",
    "domain": "saas",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Cumulative Running Total on feature_usage (Q35)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #35 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in feature_usage. Return id, monthly_events AS baseline_val, and SUM(monthly_events) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 45;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, monthly_events AS baseline_val, SUM(monthly_events) OVER (ORDER BY id ASC) AS running_total FROM feature_usage WHERE id >= 1 ORDER BY id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-036",
    "domain": "saas",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q36)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #36 - Liam Vance (Head of Customer Success)]: Stage transformation logic for cloud_clusters. Create a CTE named staged_metrics selecting id, cluster_name AS staged_name, and monthly_cost_usd AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 46;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, cluster_name AS staged_name, monthly_cost_usd AS score FROM cloud_clusters WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-037",
    "domain": "saas",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q37)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #37 - Samira Khan (CEO & Founder)]: Rank records in support_tickets by resolution_hours. Return id, priority AS entity_title, resolution_hours AS metric_score, and ROW_NUMBER() OVER (ORDER BY resolution_hours DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 47;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, priority AS entity_title, resolution_hours AS metric_score, ROW_NUMBER() OVER (ORDER BY resolution_hours DESC) AS rank_num FROM support_tickets WHERE id >= 1 ORDER BY rank_num ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-038",
    "domain": "saas",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Dense Partition Ranking in churn_events (Q38)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #38 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of churn_events. Return id, account_id AS partition_key, arr_lost AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY arr_lost DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 48;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, arr_lost AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY arr_lost DESC) AS dense_rnk FROM churn_events WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-039",
    "domain": "saas",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q39)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #39 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on integrations. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 49;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM integrations WHERE id >= 1 ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-040",
    "domain": "saas",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q40)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #40 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on audit_events. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 50;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM audit_events WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-041",
    "domain": "saas",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Cumulative Running Total on nps_surveys (Q41)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #41 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in nps_surveys. Return id, score AS baseline_val, and SUM(score) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 51;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, score AS baseline_val, SUM(score) OVER (ORDER BY id ASC) AS running_total FROM nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-042",
    "domain": "saas",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q42)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #42 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for feature_flags. Create a CTE named staged_metrics selecting id, flag_key AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 52;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, flag_key AS staged_name, id AS score FROM feature_flags WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-043",
    "domain": "saas",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q43)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #43 - Chloe Vance (Head of Product Analytics)]: Rank records in accounts by id. Return id, company_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 53;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, company_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM accounts WHERE id >= 1 ORDER BY rank_num ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-044",
    "domain": "saas",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Dense Partition Ranking in pricing_plans (Q44)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #44 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of pricing_plans. Return id, plan_name AS partition_key, monthly_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 54;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, plan_name AS partition_key, monthly_price AS metric_val, DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk FROM pricing_plans WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-045",
    "domain": "saas",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q45)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #45 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on subscriptions. Return id, mrr AS current_val, and LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 55;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "mrr",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, mrr AS current_val, LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-046",
    "domain": "saas",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q46)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #46 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on invoices. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 56;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM invoices WHERE id >= 1 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-047",
    "domain": "saas",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Cumulative Running Total on users (Q47)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #47 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in users. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 57;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-048",
    "domain": "saas",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q48)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #48 - Liam Vance (Head of Customer Success)]: Stage transformation logic for api_keys. Create a CTE named staged_metrics selecting id, key_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 58;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, key_name AS staged_name, id AS score FROM api_keys WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-049",
    "domain": "saas",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q49)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #49 - Samira Khan (CEO & Founder)]: Rank records in feature_usage by monthly_events. Return id, feature_name AS entity_title, monthly_events AS metric_score, and ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 59;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, feature_name AS entity_title, monthly_events AS metric_score, ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num FROM feature_usage WHERE id >= 1 ORDER BY rank_num ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-050",
    "domain": "saas",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Dense Partition Ranking in cloud_clusters (Q50)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #50 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of cloud_clusters. Return id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, and DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 60;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk FROM cloud_clusters WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-051",
    "domain": "saas",
    "level": 4,
    "order": 51,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q51)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #51 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on support_tickets. Return id, resolution_hours AS current_val, and LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 61;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "resolution_hours",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, resolution_hours AS current_val, LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric FROM support_tickets WHERE id >= 1 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-052",
    "domain": "saas",
    "level": 4,
    "order": 52,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q52)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #52 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on churn_events. Return id, arr_lost AS current_val, and LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 62;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "arr_lost",
      "next_metric"
    ],
    "reference_sql": "SELECT id, arr_lost AS current_val, LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric FROM churn_events WHERE id >= 1 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-053",
    "domain": "saas",
    "level": 4,
    "order": 53,
    "difficulty": "core",
    "title": "Cumulative Running Total on integrations (Q53)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #53 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in integrations. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 63;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM integrations WHERE id >= 1 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-054",
    "domain": "saas",
    "level": 4,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q54)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #54 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for audit_events. Create a CTE named staged_metrics selecting id, action AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 64;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, action AS staged_name, id AS score FROM audit_events WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-055",
    "domain": "saas",
    "level": 4,
    "order": 55,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q55)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #55 - Chloe Vance (Head of Product Analytics)]: Rank records in nps_surveys by score. Return id, account_id::text AS entity_title, score AS metric_score, and ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 65;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, account_id::text AS entity_title, score AS metric_score, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num FROM nps_surveys WHERE id >= 1 ORDER BY rank_num ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L4-056",
    "domain": "saas",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in feature_flags (Q56)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #56 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of feature_flags. Return id, min_tier AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 66;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, min_tier AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk FROM feature_flags WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-057",
    "domain": "saas",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q57)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #57 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on accounts. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 67;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-058",
    "domain": "saas",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q58)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #58 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on pricing_plans. Return id, monthly_price AS current_val, and LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 68;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_price",
      "next_metric"
    ],
    "reference_sql": "SELECT id, monthly_price AS current_val, LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric FROM pricing_plans WHERE id >= 1 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-059",
    "domain": "saas",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on subscriptions (Q59)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #59 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in subscriptions. Return id, mrr AS baseline_val, and SUM(mrr) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 69;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, mrr AS baseline_val, SUM(mrr) OVER (ORDER BY id ASC) AS running_total FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-060",
    "domain": "saas",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q60)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #60 - Liam Vance (Head of Customer Success)]: Stage transformation logic for invoices. Create a CTE named staged_metrics selecting id, account_id::text AS staged_name, and amount AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 70;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, account_id::text AS staged_name, amount AS score FROM invoices WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-061",
    "domain": "saas",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q61)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #61 - Samira Khan (CEO & Founder)]: Rank records in users by id. Return id, full_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 71;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, full_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM users WHERE id >= 1 ORDER BY rank_num ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-062",
    "domain": "saas",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in api_keys (Q62)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #62 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of api_keys. Return id, account_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 72;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk FROM api_keys WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-063",
    "domain": "saas",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q63)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #63 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on feature_usage. Return id, monthly_events AS current_val, and LAG(monthly_events, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 73;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_events",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, monthly_events AS current_val, LAG(monthly_events, 1) OVER (ORDER BY id ASC) AS prev_metric FROM feature_usage WHERE id >= 1 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-064",
    "domain": "saas",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q64)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #64 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on cloud_clusters. Return id, monthly_cost_usd AS current_val, and LEAD(monthly_cost_usd, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 74;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_cost_usd",
      "next_metric"
    ],
    "reference_sql": "SELECT id, monthly_cost_usd AS current_val, LEAD(monthly_cost_usd, 1) OVER (ORDER BY id ASC) AS next_metric FROM cloud_clusters WHERE id >= 1 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-065",
    "domain": "saas",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on support_tickets (Q65)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #65 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in support_tickets. Return id, resolution_hours AS baseline_val, and SUM(resolution_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 75;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, resolution_hours AS baseline_val, SUM(resolution_hours) OVER (ORDER BY id ASC) AS running_total FROM support_tickets WHERE id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-066",
    "domain": "saas",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q66)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #66 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for churn_events. Create a CTE named staged_metrics selecting id, reason AS staged_name, and arr_lost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 76;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, reason AS staged_name, arr_lost AS score FROM churn_events WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-067",
    "domain": "saas",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q67)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #67 - Chloe Vance (Head of Product Analytics)]: Rank records in integrations by id. Return id, provider AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 77;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, provider AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM integrations WHERE id >= 1 ORDER BY rank_num ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-068",
    "domain": "saas",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in audit_events (Q68)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #68 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of audit_events. Return id, account_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 78;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY id DESC) AS dense_rnk FROM audit_events WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-069",
    "domain": "saas",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q69)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #69 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on nps_surveys. Return id, score AS current_val, and LAG(score, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 79;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "score",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, score AS current_val, LAG(score, 1) OVER (ORDER BY id ASC) AS prev_metric FROM nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-070",
    "domain": "saas",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q70)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #70 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on feature_flags. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 80;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM feature_flags WHERE id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-071",
    "domain": "saas",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on accounts (Q71)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #71 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in accounts. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 81;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-072",
    "domain": "saas",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q72)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #72 - Liam Vance (Head of Customer Success)]: Stage transformation logic for pricing_plans. Create a CTE named staged_metrics selecting id, plan_name AS staged_name, and monthly_price AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 82;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, plan_name AS staged_name, monthly_price AS score FROM pricing_plans WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-073",
    "domain": "saas",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q73)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #73 - Samira Khan (CEO & Founder)]: Rank records in subscriptions by mrr. Return id, plan AS entity_title, mrr AS metric_score, and ROW_NUMBER() OVER (ORDER BY mrr DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 83;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, plan AS entity_title, mrr AS metric_score, ROW_NUMBER() OVER (ORDER BY mrr DESC) AS rank_num FROM subscriptions WHERE id >= 1 ORDER BY rank_num ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-074",
    "domain": "saas",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in invoices (Q74)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #74 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of invoices. Return id, account_id AS partition_key, amount AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 84;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, amount AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk FROM invoices WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-075",
    "domain": "saas",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q75)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #75 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on users. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 85;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-076",
    "domain": "saas",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q76)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #76 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on api_keys. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 86;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM api_keys WHERE id >= 1 ORDER BY id ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-077",
    "domain": "saas",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on feature_usage (Q77)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #77 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in feature_usage. Return id, monthly_events AS baseline_val, and SUM(monthly_events) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 87;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, monthly_events AS baseline_val, SUM(monthly_events) OVER (ORDER BY id ASC) AS running_total FROM feature_usage WHERE id >= 1 ORDER BY id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-078",
    "domain": "saas",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q78)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #78 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for cloud_clusters. Create a CTE named staged_metrics selecting id, cluster_name AS staged_name, and monthly_cost_usd AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 88;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, cluster_name AS staged_name, monthly_cost_usd AS score FROM cloud_clusters WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-079",
    "domain": "saas",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q79)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #79 - Chloe Vance (Head of Product Analytics)]: Rank records in support_tickets by resolution_hours. Return id, priority AS entity_title, resolution_hours AS metric_score, and ROW_NUMBER() OVER (ORDER BY resolution_hours DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 89;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, priority AS entity_title, resolution_hours AS metric_score, ROW_NUMBER() OVER (ORDER BY resolution_hours DESC) AS rank_num FROM support_tickets WHERE id >= 1 ORDER BY rank_num ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-080",
    "domain": "saas",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in churn_events (Q80)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #80 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of churn_events. Return id, account_id AS partition_key, arr_lost AS metric_val, and DENSE_RANK() OVER (PARTITION BY account_id ORDER BY arr_lost DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 90;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, account_id AS partition_key, arr_lost AS metric_val, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY arr_lost DESC) AS dense_rnk FROM churn_events WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-081",
    "domain": "saas",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q81)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #81 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on integrations. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 91;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM integrations WHERE id >= 1 ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-082",
    "domain": "saas",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q82)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #82 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on audit_events. Return id, id AS current_val, and LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 92;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "next_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LEAD(id, 1) OVER (ORDER BY id ASC) AS next_metric FROM audit_events WHERE id >= 1 ORDER BY id ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-083",
    "domain": "saas",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on nps_surveys (Q83)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #83 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in nps_surveys. Return id, score AS baseline_val, and SUM(score) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 93;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, score AS baseline_val, SUM(score) OVER (ORDER BY id ASC) AS running_total FROM nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-084",
    "domain": "saas",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q84)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #84 - Liam Vance (Head of Customer Success)]: Stage transformation logic for feature_flags. Create a CTE named staged_metrics selecting id, flag_key AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 94;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, flag_key AS staged_name, id AS score FROM feature_flags WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-085",
    "domain": "saas",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q85)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #85 - Samira Khan (CEO & Founder)]: Rank records in accounts by id. Return id, company_name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 95;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, company_name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM accounts WHERE id >= 1 ORDER BY rank_num ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "saas-L4-086",
    "domain": "saas",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in pricing_plans (Q86)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #86 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of pricing_plans. Return id, plan_name AS partition_key, monthly_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 96;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, plan_name AS partition_key, monthly_price AS metric_val, DENSE_RANK() OVER (PARTITION BY plan_name ORDER BY monthly_price DESC) AS dense_rnk FROM pricing_plans WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-087",
    "domain": "saas",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q87)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #87 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on subscriptions. Return id, mrr AS current_val, and LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 97;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "mrr",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, mrr AS current_val, LAG(mrr, 1) OVER (ORDER BY id ASC) AS prev_metric FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-088",
    "domain": "saas",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q88)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #88 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on invoices. Return id, amount AS current_val, and LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 98;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "amount",
      "next_metric"
    ],
    "reference_sql": "SELECT id, amount AS current_val, LEAD(amount, 1) OVER (ORDER BY id ASC) AS next_metric FROM invoices WHERE id >= 1 ORDER BY id ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-089",
    "domain": "saas",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Running Total on users (Q89)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #89 - Samira Khan (CEO & Founder)]: Calculate cumulative progression in users. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 99;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-090",
    "domain": "saas",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q90)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #90 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Stage transformation logic for api_keys. Create a CTE named staged_metrics selecting id, key_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 100;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, key_name AS staged_name, id AS score FROM api_keys WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-091",
    "domain": "saas",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q91)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #91 - Chloe Vance (Head of Product Analytics)]: Rank records in feature_usage by monthly_events. Return id, feature_name AS entity_title, monthly_events AS metric_score, and ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 101;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, feature_name AS entity_title, monthly_events AS metric_score, ROW_NUMBER() OVER (ORDER BY monthly_events DESC) AS rank_num FROM feature_usage WHERE id >= 1 ORDER BY rank_num ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-092",
    "domain": "saas",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in cloud_clusters (Q92)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #92 - Liam Vance (Head of Customer Success)]: Compute dense ranking within each segment of cloud_clusters. Return id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, and DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 102;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, cloud_provider AS partition_key, monthly_cost_usd AS metric_val, DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk FROM cloud_clusters WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-093",
    "domain": "saas",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q93)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #93 - Samira Khan (CEO & Founder)]: Perform period-over-period delta analysis on support_tickets. Return id, resolution_hours AS current_val, and LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 103;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "resolution_hours",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, resolution_hours AS current_val, LAG(resolution_hours, 1) OVER (ORDER BY id ASC) AS prev_metric FROM support_tickets WHERE id >= 1 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-094",
    "domain": "saas",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q94)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #94 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Perform forward-looking trend analysis on churn_events. Return id, arr_lost AS current_val, and LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 104;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "arr_lost",
      "next_metric"
    ],
    "reference_sql": "SELECT id, arr_lost AS current_val, LEAD(arr_lost, 1) OVER (ORDER BY id ASC) AS next_metric FROM churn_events WHERE id >= 1 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-095",
    "domain": "saas",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Cumulative Running Total on integrations (Q95)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #95 - Chloe Vance (Head of Product Analytics)]: Calculate cumulative progression in integrations. Return id, id AS baseline_val, and SUM(id) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 105;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, id AS baseline_val, SUM(id) OVER (ORDER BY id ASC) AS running_total FROM integrations WHERE id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-096",
    "domain": "saas",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q96)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #96 - Liam Vance (Head of Customer Success)]: Stage transformation logic for audit_events. Create a CTE named staged_metrics selecting id, action AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 106;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, action AS staged_name, id AS score FROM audit_events WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-097",
    "domain": "saas",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q97)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #97 - Samira Khan (CEO & Founder)]: Rank records in nps_surveys by score. Return id, account_id::text AS entity_title, score AS metric_score, and ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 107;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, account_id::text AS entity_title, score AS metric_score, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num FROM nps_surveys WHERE id >= 1 ORDER BY rank_num ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-098",
    "domain": "saas",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in feature_flags (Q98)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #98 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Compute dense ranking within each segment of feature_flags. Return id, min_tier AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 108;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, min_tier AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY min_tier ORDER BY id DESC) AS dense_rnk FROM feature_flags WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-099",
    "domain": "saas",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q99)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #99 - Chloe Vance (Head of Product Analytics)]: Perform period-over-period delta analysis on accounts. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 109;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "id",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM accounts WHERE id >= 1 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "saas-L4-100",
    "domain": "saas",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q100)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #100 - Liam Vance (Head of Customer Success)]: Perform forward-looking trend analysis on pricing_plans. Return id, monthly_price AS current_val, and LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 110;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "monthly_price",
      "next_metric"
    ],
    "reference_sql": "SELECT id, monthly_price AS current_val, LEAD(monthly_price, 1) OVER (ORDER BY id ASC) AS next_metric FROM pricing_plans WHERE id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  }
];
