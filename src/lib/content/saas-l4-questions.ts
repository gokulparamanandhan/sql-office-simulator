// ============================================================================
// SAAS — LEVEL 4: WINDOW FUNCTIONS & TELEMETRY COHORTS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): accounts, pricing_plans, subscriptions, invoices, users, api_keys,
//              feature_usage, cloud_clusters, support_tickets, integrations,
//              audit_events, churn_events, nps_surveys, feature_flags
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L4_QUESTIONS: QuestionDefinition[] = [
  {
    id: "saas-L4-001",
    domain: "saas",
    level: 4,
    order: 1,
    difficulty: "hard",
    title: "Customer Account Ranking by MRR within Industry",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. Rank our active customer subscriptions by monthly recurring revenue within each industry vertical. Display a.company_name, a.industry, s.mrr, and their rank within that industry (highest MRR = 1).",
    context_notes: "Competitive revenue ranking within each market vertical.",
    concepts: ["Window Functions","DENSE_RANK()","Revenue Ranking"],
    expected_columns: ["company_name","industry","mrr","industry_mrr_rank"],
    reference_sql: "SELECT a.company_name, a.industry, s.mrr, DENSE_RANK() OVER (PARTITION BY a.industry ORDER BY s.mrr DESC) AS industry_mrr_rank FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' ORDER BY a.industry, industry_mrr_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use DENSE_RANK() OVER (PARTITION BY a.industry ORDER BY s.mrr DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-002",
    domain: "saas",
    level: 4,
    order: 2,
    difficulty: "hard",
    title: "Cumulative Platform MRR Growth Curve",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Calculate running cumulative MRR added across all subscriptions over time. Display id, started_at, mrr, and the running cumulative MRR ordered chronologically by started_at and id.",
    context_notes: "SaaS revenue growth trajectory tracking.",
    concepts: ["Window Functions","SUM() OVER","MRR Modeling"],
    expected_columns: ["id","started_at","mrr","cumulative_platform_mrr"],
    reference_sql: "SELECT id, started_at, mrr, SUM(mrr) OVER (ORDER BY started_at, id) AS cumulative_platform_mrr FROM subscriptions WHERE status = 'active' ORDER BY started_at, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(mrr) OVER (ORDER BY started_at, id) on active subscriptions."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-003",
    domain: "saas",
    level: 4,
    order: 3,
    difficulty: "hard",
    title: "NPS Survey Score Trajectory vs Prior Response",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe from CS. Track customer sentiment evolution. For each NPS survey response, show account_id, survey_date, score, and the score from that account's immediately previous survey response using LAG.",
    context_notes: "Customer satisfaction trajectory and detractor monitoring.",
    concepts: ["Window Functions","LAG()","NPS Analytics"],
    expected_columns: ["account_id","survey_date","score","prior_nps_score"],
    reference_sql: "SELECT account_id, survey_date, score, LAG(score, 1) OVER (PARTITION BY account_id ORDER BY survey_date, id) AS prior_nps_score FROM nps_surveys ORDER BY account_id, survey_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LAG(score, 1) OVER (PARTITION BY account_id ORDER BY survey_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-004",
    domain: "saas",
    level: 4,
    order: 4,
    difficulty: "hard",
    title: "Cloud Cluster Hosting Cost Quartiles",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq from Cloud Ops. Segment all cloud clusters into 4 cost quartiles by monthly_cost_usd. Display cluster_name, cloud_provider, monthly_cost_usd, and cost_quartile (1 = most expensive).",
    context_notes: "Infrastructure expense tiering.",
    concepts: ["Window Functions","NTILE()","Cloud FinOps"],
    expected_columns: ["cluster_name","cloud_provider","monthly_cost_usd","cost_quartile"],
    reference_sql: "SELECT cluster_name, cloud_provider, monthly_cost_usd, NTILE(4) OVER (ORDER BY monthly_cost_usd DESC) AS cost_quartile FROM cloud_clusters ORDER BY cost_quartile, monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use NTILE(4) OVER (ORDER BY monthly_cost_usd DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-005",
    domain: "saas",
    level: 4,
    order: 5,
    difficulty: "hard",
    title: "Top 2 Largest Invoices per Customer Account",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. Retrieve the top 2 highest billed invoices for each customer account. Display account_id, id AS invoice_id, amount, and invoice_rank using a subquery.",
    context_notes: "Customer contract expansion and peak billing points.",
    concepts: ["Window Functions","ROW_NUMBER()","Subqueries"],
    expected_columns: ["account_id","invoice_id","amount","rnk"],
    reference_sql: "SELECT account_id, id AS invoice_id, amount, rnk FROM (SELECT account_id, id, amount, ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY amount DESC) AS rnk FROM invoices) sub WHERE rnk <= 2 ORDER BY account_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter on ROW_NUMBER() <= 2 inside a subquery."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-006",
    domain: "saas",
    level: 4,
    order: 6,
    difficulty: "hard",
    title: "Feature Usage Volume Percentile Rankings",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. Calculate the percentile ranking of monthly events across all feature telemetry records. Display account_id, feature_name, monthly_events, and percentile rank.",
    context_notes: "Product engagement percentile tiering.",
    concepts: ["Window Functions","PERCENT_RANK()","Product Analytics"],
    expected_columns: ["account_id","feature_name","monthly_events","usage_percentile"],
    reference_sql: "SELECT account_id, feature_name, monthly_events, PERCENT_RANK() OVER (ORDER BY monthly_events) AS usage_percentile FROM feature_usage ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use PERCENT_RANK() OVER (ORDER BY monthly_events)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-007",
    domain: "saas",
    level: 4,
    order: 7,
    difficulty: "hard",
    title: "Cloud Cluster Spend vs Cloud Provider Average",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here. For each cloud cluster, display cluster_name, cloud_provider, monthly_cost_usd, and the deviation from that provider's average cluster cost.",
    context_notes: "Cloud cluster cost anomaly benchmarking.",
    concepts: ["Window Functions","AVG() OVER","Infrastructure Auditing"],
    expected_columns: ["cluster_name","cloud_provider","monthly_cost_usd","diff_from_provider_avg"],
    reference_sql: "SELECT cluster_name, cloud_provider, monthly_cost_usd, ROUND((monthly_cost_usd - AVG(monthly_cost_usd) OVER (PARTITION BY cloud_provider)), 2) AS diff_from_provider_avg FROM cloud_clusters ORDER BY cloud_provider, monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Subtract AVG(monthly_cost_usd) OVER (PARTITION BY cloud_provider) from monthly_cost_usd."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-008",
    domain: "saas",
    level: 4,
    order: 8,
    difficulty: "hard",
    title: "Running Cumulative Churn ARR Lost Over Time",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. Track cumulative ARR lost to churn. Display account_id, churn_date, arr_lost, and cumulative ARR lost ordered chronologically by churn_date.",
    context_notes: "Cumulative revenue leakage and gross revenue retention modeling.",
    concepts: ["Window Functions","SUM() OVER","Churn Tracking"],
    expected_columns: ["account_id","churn_date","arr_lost","cumulative_arr_lost"],
    reference_sql: "SELECT account_id, churn_date, arr_lost, SUM(arr_lost) OVER (ORDER BY churn_date, id) AS cumulative_arr_lost FROM churn_events ORDER BY churn_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(arr_lost) OVER (ORDER BY churn_date, id) on churn_events."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-009",
    domain: "saas",
    level: 4,
    order: 9,
    difficulty: "hard",
    title: "Support Ticket Resolution Time vs Priority Average",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. Show each support ticket's id, account_id, priority, resolution_hours, and the average resolution hours for tickets sharing that priority level.",
    context_notes: "SLA variance analysis across priority queues.",
    concepts: ["Window Functions","AVG() OVER","Customer Support"],
    expected_columns: ["id","account_id","priority","resolution_hours","priority_avg_hours"],
    reference_sql: "SELECT id, account_id, priority, resolution_hours, ROUND(AVG(resolution_hours) OVER (PARTITION BY priority), 1) AS priority_avg_hours FROM support_tickets ORDER BY priority, resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use AVG(resolution_hours) OVER (PARTITION BY priority)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-010",
    domain: "saas",
    level: 4,
    order: 10,
    difficulty: "hard",
    title: "Enabled Feature Flags by Minimum Tier Rank",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here. Rank all enabled feature flags by id within their minimum tier requirement. Display flag_key, min_tier, is_enabled, and rank.",
    context_notes: "Product entitlement and feature flag gating reviews.",
    concepts: ["Window Functions","ROW_NUMBER()","Feature Flags"],
    expected_columns: ["flag_key","min_tier","is_enabled","tier_flag_rank"],
    reference_sql: "SELECT flag_key, min_tier, is_enabled, ROW_NUMBER() OVER (PARTITION BY min_tier ORDER BY id ASC) AS tier_flag_rank FROM feature_flags WHERE is_enabled = TRUE ORDER BY min_tier, tier_flag_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ROW_NUMBER() OVER (PARTITION BY min_tier ORDER BY id ASC) with WHERE is_enabled = TRUE."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-011",
    domain: "saas",
    level: 4,
    order: 11,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Running Total by plan",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Calculate the cumulative running total of mrr partitioned by plan in subscriptions, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","subscriptions"],
    expected_columns: ["id","plan","mrr","running_mrr"],
    reference_sql: "SELECT id, plan, mrr, SUM(mrr) OVER (PARTITION BY plan ORDER BY id, id) AS running_mrr FROM subscriptions ORDER BY plan, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-012",
    domain: "saas",
    level: 4,
    order: 12,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Rank by Magnitude by plan",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Rank records within each plan in subscriptions based on mrr descending.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","subscriptions"],
    expected_columns: ["id","plan","mrr","rnk"],
    reference_sql: "SELECT id, plan, mrr, RANK() OVER (PARTITION BY plan ORDER BY mrr DESC) AS rnk FROM subscriptions ORDER BY plan, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-013",
    domain: "saas",
    level: 4,
    order: 13,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Dense Rank by Magnitude by plan",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute dense ranking of mrr within each plan in subscriptions.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","subscriptions"],
    expected_columns: ["id","plan","mrr","dense_rnk"],
    reference_sql: "SELECT id, plan, mrr, DENSE_RANK() OVER (PARTITION BY plan ORDER BY mrr DESC) AS dense_rnk FROM subscriptions ORDER BY plan, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-014",
    domain: "saas",
    level: 4,
    order: 14,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Previous Record Lag Comparison by plan",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Retrieve preceding mrr for each plan record in subscriptions to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","subscriptions"],
    expected_columns: ["id","plan","mrr","prev_mrr"],
    reference_sql: "SELECT id, plan, mrr, LAG(mrr, 1) OVER (PARTITION BY plan ORDER BY id, id) AS prev_mrr FROM subscriptions ORDER BY plan, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-015",
    domain: "saas",
    level: 4,
    order: 15,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Next Record Lead Projection by plan",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compare each record's mrr with the subsequent record's mrr within plan in subscriptions.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","subscriptions"],
    expected_columns: ["id","plan","mrr","next_mrr"],
    reference_sql: "SELECT id, plan, mrr, LEAD(mrr, 1) OVER (PARTITION BY plan ORDER BY id, id) AS next_mrr FROM subscriptions ORDER BY plan, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-016",
    domain: "saas",
    level: 4,
    order: 16,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Cohort Average Benchmark by plan",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Benchmark individual mrr against the cohort average mrr across the same plan in subscriptions.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","subscriptions"],
    expected_columns: ["id","plan","mrr","avg_mrr_cohort"],
    reference_sql: "SELECT id, plan, mrr, AVG(mrr) OVER (PARTITION BY plan) AS avg_mrr_cohort FROM subscriptions ORDER BY plan, mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-017",
    domain: "saas",
    level: 4,
    order: 17,
    difficulty: "hard",
    title: "SUBSCRIPTIONS: Quartile Distribution by plan",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Distribute records in subscriptions into 4 equal quartiles based on mrr within each plan.",
    context_notes: "Analytic SaaS computation on subscriptions utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","subscriptions"],
    expected_columns: ["id","plan","mrr","quartile"],
    reference_sql: "SELECT id, plan, mrr, NTILE(4) OVER (PARTITION BY plan ORDER BY mrr DESC) AS quartile FROM subscriptions ORDER BY plan, quartile, mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-018",
    domain: "saas",
    level: 4,
    order: 18,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Running Total by cloud provider",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Calculate the cumulative running total of monthly_cost_usd partitioned by cloud_provider in cloud_clusters, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","running_monthly_cost_usd"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, SUM(monthly_cost_usd) OVER (PARTITION BY cloud_provider ORDER BY id, id) AS running_monthly_cost_usd FROM cloud_clusters ORDER BY cloud_provider, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-019",
    domain: "saas",
    level: 4,
    order: 19,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Rank by Magnitude by cloud provider",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Rank records within each cloud_provider in cloud_clusters based on monthly_cost_usd descending.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","rnk"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS rnk FROM cloud_clusters ORDER BY cloud_provider, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-020",
    domain: "saas",
    level: 4,
    order: 20,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Dense Rank by Magnitude by cloud provider",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute dense ranking of monthly_cost_usd within each cloud_provider in cloud_clusters.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","dense_rnk"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, DENSE_RANK() OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS dense_rnk FROM cloud_clusters ORDER BY cloud_provider, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-021",
    domain: "saas",
    level: 4,
    order: 21,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Previous Record Lag Comparison by cloud provider",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Retrieve preceding monthly_cost_usd for each cloud_provider record in cloud_clusters to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","prev_monthly_cost_usd"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, LAG(monthly_cost_usd, 1) OVER (PARTITION BY cloud_provider ORDER BY id, id) AS prev_monthly_cost_usd FROM cloud_clusters ORDER BY cloud_provider, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-022",
    domain: "saas",
    level: 4,
    order: 22,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Next Record Lead Projection by cloud provider",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compare each record's monthly_cost_usd with the subsequent record's monthly_cost_usd within cloud_provider in cloud_clusters.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","next_monthly_cost_usd"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, LEAD(monthly_cost_usd, 1) OVER (PARTITION BY cloud_provider ORDER BY id, id) AS next_monthly_cost_usd FROM cloud_clusters ORDER BY cloud_provider, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-023",
    domain: "saas",
    level: 4,
    order: 23,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Cohort Average Benchmark by cloud provider",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Benchmark individual monthly_cost_usd against the cohort average monthly_cost_usd across the same cloud_provider in cloud_clusters.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","avg_monthly_cost_usd_cohort"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, AVG(monthly_cost_usd) OVER (PARTITION BY cloud_provider) AS avg_monthly_cost_usd_cohort FROM cloud_clusters ORDER BY cloud_provider, monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-024",
    domain: "saas",
    level: 4,
    order: 24,
    difficulty: "hard",
    title: "CLOUD CLUSTERS: Quartile Distribution by cloud provider",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Distribute records in cloud_clusters into 4 equal quartiles based on monthly_cost_usd within each cloud_provider.",
    context_notes: "Analytic SaaS computation on cloud_clusters utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","cloud_clusters"],
    expected_columns: ["id","cloud_provider","monthly_cost_usd","quartile"],
    reference_sql: "SELECT id, cloud_provider, monthly_cost_usd, NTILE(4) OVER (PARTITION BY cloud_provider ORDER BY monthly_cost_usd DESC) AS quartile FROM cloud_clusters ORDER BY cloud_provider, quartile, monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-025",
    domain: "saas",
    level: 4,
    order: 25,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Running Total by priority",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Calculate the cumulative running total of resolution_hours partitioned by priority in support_tickets, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","running_resolution_hours"],
    reference_sql: "SELECT id, priority, resolution_hours, SUM(resolution_hours) OVER (PARTITION BY priority ORDER BY id, id) AS running_resolution_hours FROM support_tickets ORDER BY priority, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-026",
    domain: "saas",
    level: 4,
    order: 26,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Rank by Magnitude by priority",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Rank records within each priority in support_tickets based on resolution_hours descending.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","rnk"],
    reference_sql: "SELECT id, priority, resolution_hours, RANK() OVER (PARTITION BY priority ORDER BY resolution_hours DESC) AS rnk FROM support_tickets ORDER BY priority, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-027",
    domain: "saas",
    level: 4,
    order: 27,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Dense Rank by Magnitude by priority",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute dense ranking of resolution_hours within each priority in support_tickets.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","dense_rnk"],
    reference_sql: "SELECT id, priority, resolution_hours, DENSE_RANK() OVER (PARTITION BY priority ORDER BY resolution_hours DESC) AS dense_rnk FROM support_tickets ORDER BY priority, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-028",
    domain: "saas",
    level: 4,
    order: 28,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Previous Record Lag Comparison by priority",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Retrieve preceding resolution_hours for each priority record in support_tickets to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","prev_resolution_hours"],
    reference_sql: "SELECT id, priority, resolution_hours, LAG(resolution_hours, 1) OVER (PARTITION BY priority ORDER BY id, id) AS prev_resolution_hours FROM support_tickets ORDER BY priority, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-029",
    domain: "saas",
    level: 4,
    order: 29,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Next Record Lead Projection by priority",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compare each record's resolution_hours with the subsequent record's resolution_hours within priority in support_tickets.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","next_resolution_hours"],
    reference_sql: "SELECT id, priority, resolution_hours, LEAD(resolution_hours, 1) OVER (PARTITION BY priority ORDER BY id, id) AS next_resolution_hours FROM support_tickets ORDER BY priority, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-030",
    domain: "saas",
    level: 4,
    order: 30,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Cohort Average Benchmark by priority",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Benchmark individual resolution_hours against the cohort average resolution_hours across the same priority in support_tickets.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","avg_resolution_hours_cohort"],
    reference_sql: "SELECT id, priority, resolution_hours, AVG(resolution_hours) OVER (PARTITION BY priority) AS avg_resolution_hours_cohort FROM support_tickets ORDER BY priority, resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-031",
    domain: "saas",
    level: 4,
    order: 31,
    difficulty: "hard",
    title: "SUPPORT TICKETS: Quartile Distribution by priority",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Distribute records in support_tickets into 4 equal quartiles based on resolution_hours within each priority.",
    context_notes: "Analytic SaaS computation on support_tickets utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","support_tickets"],
    expected_columns: ["id","priority","resolution_hours","quartile"],
    reference_sql: "SELECT id, priority, resolution_hours, NTILE(4) OVER (PARTITION BY priority ORDER BY resolution_hours DESC) AS quartile FROM support_tickets ORDER BY priority, quartile, resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-032",
    domain: "saas",
    level: 4,
    order: 32,
    difficulty: "hard",
    title: "FEATURE USAGE: Running Total by feature name",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Calculate the cumulative running total of monthly_events partitioned by feature_name in feature_usage, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","running_monthly_events"],
    reference_sql: "SELECT id, feature_name, monthly_events, SUM(monthly_events) OVER (PARTITION BY feature_name ORDER BY id, id) AS running_monthly_events FROM feature_usage ORDER BY feature_name, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-033",
    domain: "saas",
    level: 4,
    order: 33,
    difficulty: "hard",
    title: "FEATURE USAGE: Rank by Magnitude by feature name",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Rank records within each feature_name in feature_usage based on monthly_events descending.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","rnk"],
    reference_sql: "SELECT id, feature_name, monthly_events, RANK() OVER (PARTITION BY feature_name ORDER BY monthly_events DESC) AS rnk FROM feature_usage ORDER BY feature_name, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-034",
    domain: "saas",
    level: 4,
    order: 34,
    difficulty: "hard",
    title: "FEATURE USAGE: Dense Rank by Magnitude by feature name",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute dense ranking of monthly_events within each feature_name in feature_usage.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","dense_rnk"],
    reference_sql: "SELECT id, feature_name, monthly_events, DENSE_RANK() OVER (PARTITION BY feature_name ORDER BY monthly_events DESC) AS dense_rnk FROM feature_usage ORDER BY feature_name, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-035",
    domain: "saas",
    level: 4,
    order: 35,
    difficulty: "hard",
    title: "FEATURE USAGE: Previous Record Lag Comparison by feature name",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Retrieve preceding monthly_events for each feature_name record in feature_usage to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","prev_monthly_events"],
    reference_sql: "SELECT id, feature_name, monthly_events, LAG(monthly_events, 1) OVER (PARTITION BY feature_name ORDER BY id, id) AS prev_monthly_events FROM feature_usage ORDER BY feature_name, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-036",
    domain: "saas",
    level: 4,
    order: 36,
    difficulty: "hard",
    title: "FEATURE USAGE: Next Record Lead Projection by feature name",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compare each record's monthly_events with the subsequent record's monthly_events within feature_name in feature_usage.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","next_monthly_events"],
    reference_sql: "SELECT id, feature_name, monthly_events, LEAD(monthly_events, 1) OVER (PARTITION BY feature_name ORDER BY id, id) AS next_monthly_events FROM feature_usage ORDER BY feature_name, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-037",
    domain: "saas",
    level: 4,
    order: 37,
    difficulty: "hard",
    title: "FEATURE USAGE: Cohort Average Benchmark by feature name",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Benchmark individual monthly_events against the cohort average monthly_events across the same feature_name in feature_usage.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","avg_monthly_events_cohort"],
    reference_sql: "SELECT id, feature_name, monthly_events, AVG(monthly_events) OVER (PARTITION BY feature_name) AS avg_monthly_events_cohort FROM feature_usage ORDER BY feature_name, monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-038",
    domain: "saas",
    level: 4,
    order: 38,
    difficulty: "hard",
    title: "FEATURE USAGE: Quartile Distribution by feature name",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Distribute records in feature_usage into 4 equal quartiles based on monthly_events within each feature_name.",
    context_notes: "Analytic SaaS computation on feature_usage utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","feature_usage"],
    expected_columns: ["id","feature_name","monthly_events","quartile"],
    reference_sql: "SELECT id, feature_name, monthly_events, NTILE(4) OVER (PARTITION BY feature_name ORDER BY monthly_events DESC) AS quartile FROM feature_usage ORDER BY feature_name, quartile, monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-039",
    domain: "saas",
    level: 4,
    order: 39,
    difficulty: "hard",
    title: "INVOICES: Running Total by account id",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Calculate the cumulative running total of amount partitioned by account_id in invoices, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on invoices utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","invoices"],
    expected_columns: ["id","account_id","amount","running_amount"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id, id) AS running_amount FROM invoices ORDER BY account_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-040",
    domain: "saas",
    level: 4,
    order: 40,
    difficulty: "hard",
    title: "INVOICES: Rank by Magnitude by account id",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Rank records within each account_id in invoices based on amount descending.",
    context_notes: "Analytic SaaS computation on invoices utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","invoices"],
    expected_columns: ["id","account_id","amount","rnk"],
    reference_sql: "SELECT id, account_id, amount, RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS rnk FROM invoices ORDER BY account_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-041",
    domain: "saas",
    level: 4,
    order: 41,
    difficulty: "hard",
    title: "INVOICES: Dense Rank by Magnitude by account id",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute dense ranking of amount within each account_id in invoices.",
    context_notes: "Analytic SaaS computation on invoices utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","invoices"],
    expected_columns: ["id","account_id","amount","dense_rnk"],
    reference_sql: "SELECT id, account_id, amount, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) AS dense_rnk FROM invoices ORDER BY account_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-042",
    domain: "saas",
    level: 4,
    order: 42,
    difficulty: "hard",
    title: "INVOICES: Previous Record Lag Comparison by account id",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Retrieve preceding amount for each account_id record in invoices to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on invoices utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","invoices"],
    expected_columns: ["id","account_id","amount","prev_amount"],
    reference_sql: "SELECT id, account_id, amount, LAG(amount, 1) OVER (PARTITION BY account_id ORDER BY id, id) AS prev_amount FROM invoices ORDER BY account_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-043",
    domain: "saas",
    level: 4,
    order: 43,
    difficulty: "hard",
    title: "INVOICES: Next Record Lead Projection by account id",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compare each record's amount with the subsequent record's amount within account_id in invoices.",
    context_notes: "Analytic SaaS computation on invoices utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","invoices"],
    expected_columns: ["id","account_id","amount","next_amount"],
    reference_sql: "SELECT id, account_id, amount, LEAD(amount, 1) OVER (PARTITION BY account_id ORDER BY id, id) AS next_amount FROM invoices ORDER BY account_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-044",
    domain: "saas",
    level: 4,
    order: 44,
    difficulty: "hard",
    title: "INVOICES: Cohort Average Benchmark by account id",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Benchmark individual amount against the cohort average amount across the same account_id in invoices.",
    context_notes: "Analytic SaaS computation on invoices utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","invoices"],
    expected_columns: ["id","account_id","amount","avg_amount_cohort"],
    reference_sql: "SELECT id, account_id, amount, AVG(amount) OVER (PARTITION BY account_id) AS avg_amount_cohort FROM invoices ORDER BY account_id, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-045",
    domain: "saas",
    level: 4,
    order: 45,
    difficulty: "hard",
    title: "INVOICES: Quartile Distribution by account id",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Distribute records in invoices into 4 equal quartiles based on amount within each account_id.",
    context_notes: "Analytic SaaS computation on invoices utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","invoices"],
    expected_columns: ["id","account_id","amount","quartile"],
    reference_sql: "SELECT id, account_id, amount, NTILE(4) OVER (PARTITION BY account_id ORDER BY amount DESC) AS quartile FROM invoices ORDER BY account_id, quartile, amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-046",
    domain: "saas",
    level: 4,
    order: 46,
    difficulty: "hard",
    title: "NPS SURVEYS: Running Total by account id",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Calculate the cumulative running total of score partitioned by account_id in nps_surveys, ordered chronologically by survey_date.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","nps_surveys"],
    expected_columns: ["id","account_id","score","running_score"],
    reference_sql: "SELECT id, account_id, score, SUM(score) OVER (PARTITION BY account_id ORDER BY survey_date, id) AS running_score FROM nps_surveys ORDER BY account_id, survey_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-047",
    domain: "saas",
    level: 4,
    order: 47,
    difficulty: "hard",
    title: "NPS SURVEYS: Rank by Magnitude by account id",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Rank records within each account_id in nps_surveys based on score descending.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","nps_surveys"],
    expected_columns: ["id","account_id","score","rnk"],
    reference_sql: "SELECT id, account_id, score, RANK() OVER (PARTITION BY account_id ORDER BY score DESC) AS rnk FROM nps_surveys ORDER BY account_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-048",
    domain: "saas",
    level: 4,
    order: 48,
    difficulty: "hard",
    title: "NPS SURVEYS: Dense Rank by Magnitude by account id",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute dense ranking of score within each account_id in nps_surveys.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","nps_surveys"],
    expected_columns: ["id","account_id","score","dense_rnk"],
    reference_sql: "SELECT id, account_id, score, DENSE_RANK() OVER (PARTITION BY account_id ORDER BY score DESC) AS dense_rnk FROM nps_surveys ORDER BY account_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-049",
    domain: "saas",
    level: 4,
    order: 49,
    difficulty: "hard",
    title: "NPS SURVEYS: Previous Record Lag Comparison by account id",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Retrieve preceding score for each account_id record in nps_surveys to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","nps_surveys"],
    expected_columns: ["id","account_id","score","prev_score"],
    reference_sql: "SELECT id, account_id, score, LAG(score, 1) OVER (PARTITION BY account_id ORDER BY survey_date, id) AS prev_score FROM nps_surveys ORDER BY account_id, survey_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-050",
    domain: "saas",
    level: 4,
    order: 50,
    difficulty: "hard",
    title: "NPS SURVEYS: Next Record Lead Projection by account id",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compare each record's score with the subsequent record's score within account_id in nps_surveys.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","nps_surveys"],
    expected_columns: ["id","account_id","score","next_score"],
    reference_sql: "SELECT id, account_id, score, LEAD(score, 1) OVER (PARTITION BY account_id ORDER BY survey_date, id) AS next_score FROM nps_surveys ORDER BY account_id, survey_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-051",
    domain: "saas",
    level: 4,
    order: 51,
    difficulty: "hard",
    title: "NPS SURVEYS: Cohort Average Benchmark by account id",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Benchmark individual score against the cohort average score across the same account_id in nps_surveys.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","nps_surveys"],
    expected_columns: ["id","account_id","score","avg_score_cohort"],
    reference_sql: "SELECT id, account_id, score, AVG(score) OVER (PARTITION BY account_id) AS avg_score_cohort FROM nps_surveys ORDER BY account_id, score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-052",
    domain: "saas",
    level: 4,
    order: 52,
    difficulty: "hard",
    title: "NPS SURVEYS: Quartile Distribution by account id",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Distribute records in nps_surveys into 4 equal quartiles based on score within each account_id.",
    context_notes: "Analytic SaaS computation on nps_surveys utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","nps_surveys"],
    expected_columns: ["id","account_id","score","quartile"],
    reference_sql: "SELECT id, account_id, score, NTILE(4) OVER (PARTITION BY account_id ORDER BY score DESC) AS quartile FROM nps_surveys ORDER BY account_id, quartile, score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-053",
    domain: "saas",
    level: 4,
    order: 53,
    difficulty: "hard",
    title: "CHURN EVENTS: Running Total by reason",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Calculate the cumulative running total of arr_lost partitioned by reason in churn_events, ordered chronologically by id.",
    context_notes: "Analytic SaaS computation on churn_events utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","churn_events"],
    expected_columns: ["id","reason","arr_lost","running_arr_lost"],
    reference_sql: "SELECT id, reason, arr_lost, SUM(arr_lost) OVER (PARTITION BY reason ORDER BY id, id) AS running_arr_lost FROM churn_events ORDER BY reason, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-054",
    domain: "saas",
    level: 4,
    order: 54,
    difficulty: "hard",
    title: "CHURN EVENTS: Rank by Magnitude by reason",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Rank records within each reason in churn_events based on arr_lost descending.",
    context_notes: "Analytic SaaS computation on churn_events utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","churn_events"],
    expected_columns: ["id","reason","arr_lost","rnk"],
    reference_sql: "SELECT id, reason, arr_lost, RANK() OVER (PARTITION BY reason ORDER BY arr_lost DESC) AS rnk FROM churn_events ORDER BY reason, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-055",
    domain: "saas",
    level: 4,
    order: 55,
    difficulty: "hard",
    title: "CHURN EVENTS: Dense Rank by Magnitude by reason",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute dense ranking of arr_lost within each reason in churn_events.",
    context_notes: "Analytic SaaS computation on churn_events utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","churn_events"],
    expected_columns: ["id","reason","arr_lost","dense_rnk"],
    reference_sql: "SELECT id, reason, arr_lost, DENSE_RANK() OVER (PARTITION BY reason ORDER BY arr_lost DESC) AS dense_rnk FROM churn_events ORDER BY reason, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-056",
    domain: "saas",
    level: 4,
    order: 56,
    difficulty: "hard",
    title: "CHURN EVENTS: Previous Record Lag Comparison by reason",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Retrieve preceding arr_lost for each reason record in churn_events to track period-over-period variance.",
    context_notes: "Analytic SaaS computation on churn_events utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","churn_events"],
    expected_columns: ["id","reason","arr_lost","prev_arr_lost"],
    reference_sql: "SELECT id, reason, arr_lost, LAG(arr_lost, 1) OVER (PARTITION BY reason ORDER BY id, id) AS prev_arr_lost FROM churn_events ORDER BY reason, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-057",
    domain: "saas",
    level: 4,
    order: 57,
    difficulty: "hard",
    title: "CHURN EVENTS: Next Record Lead Projection by reason",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compare each record's arr_lost with the subsequent record's arr_lost within reason in churn_events.",
    context_notes: "Analytic SaaS computation on churn_events utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","churn_events"],
    expected_columns: ["id","reason","arr_lost","next_arr_lost"],
    reference_sql: "SELECT id, reason, arr_lost, LEAD(arr_lost, 1) OVER (PARTITION BY reason ORDER BY id, id) AS next_arr_lost FROM churn_events ORDER BY reason, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-058",
    domain: "saas",
    level: 4,
    order: 58,
    difficulty: "hard",
    title: "CHURN EVENTS: Cohort Average Benchmark by reason",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Benchmark individual arr_lost against the cohort average arr_lost across the same reason in churn_events.",
    context_notes: "Analytic SaaS computation on churn_events utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","churn_events"],
    expected_columns: ["id","reason","arr_lost","avg_arr_lost_cohort"],
    reference_sql: "SELECT id, reason, arr_lost, AVG(arr_lost) OVER (PARTITION BY reason) AS avg_arr_lost_cohort FROM churn_events ORDER BY reason, arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-059",
    domain: "saas",
    level: 4,
    order: 59,
    difficulty: "hard",
    title: "CHURN EVENTS: Quartile Distribution by reason",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Distribute records in churn_events into 4 equal quartiles based on arr_lost within each reason.",
    context_notes: "Analytic SaaS computation on churn_events utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","churn_events"],
    expected_columns: ["id","reason","arr_lost","quartile"],
    reference_sql: "SELECT id, reason, arr_lost, NTILE(4) OVER (PARTITION BY reason ORDER BY arr_lost DESC) AS quartile FROM churn_events ORDER BY reason, quartile, arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-060",
    domain: "saas",
    level: 4,
    order: 60,
    difficulty: "hard",
    title: "SaaS Window Metric #60",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-061",
    domain: "saas",
    level: 4,
    order: 61,
    difficulty: "hard",
    title: "SaaS Window Metric #61",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-062",
    domain: "saas",
    level: 4,
    order: 62,
    difficulty: "hard",
    title: "SaaS Window Metric #62",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-063",
    domain: "saas",
    level: 4,
    order: 63,
    difficulty: "hard",
    title: "SaaS Window Metric #63",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-064",
    domain: "saas",
    level: 4,
    order: 64,
    difficulty: "hard",
    title: "SaaS Window Metric #64",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-065",
    domain: "saas",
    level: 4,
    order: 65,
    difficulty: "hard",
    title: "SaaS Window Metric #65",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-066",
    domain: "saas",
    level: 4,
    order: 66,
    difficulty: "hard",
    title: "SaaS Window Metric #66",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-067",
    domain: "saas",
    level: 4,
    order: 67,
    difficulty: "hard",
    title: "SaaS Window Metric #67",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-068",
    domain: "saas",
    level: 4,
    order: 68,
    difficulty: "hard",
    title: "SaaS Window Metric #68",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-069",
    domain: "saas",
    level: 4,
    order: 69,
    difficulty: "hard",
    title: "SaaS Window Metric #69",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-070",
    domain: "saas",
    level: 4,
    order: 70,
    difficulty: "hard",
    title: "SaaS Window Metric #70",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-071",
    domain: "saas",
    level: 4,
    order: 71,
    difficulty: "hard",
    title: "SaaS Window Metric #71",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-072",
    domain: "saas",
    level: 4,
    order: 72,
    difficulty: "hard",
    title: "SaaS Window Metric #72",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-073",
    domain: "saas",
    level: 4,
    order: 73,
    difficulty: "hard",
    title: "SaaS Window Metric #73",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-074",
    domain: "saas",
    level: 4,
    order: 74,
    difficulty: "hard",
    title: "SaaS Window Metric #74",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-075",
    domain: "saas",
    level: 4,
    order: 75,
    difficulty: "hard",
    title: "SaaS Window Metric #75",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-076",
    domain: "saas",
    level: 4,
    order: 76,
    difficulty: "hard",
    title: "SaaS Window Metric #76",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-077",
    domain: "saas",
    level: 4,
    order: 77,
    difficulty: "hard",
    title: "SaaS Window Metric #77",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-078",
    domain: "saas",
    level: 4,
    order: 78,
    difficulty: "hard",
    title: "SaaS Window Metric #78",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-079",
    domain: "saas",
    level: 4,
    order: 79,
    difficulty: "hard",
    title: "SaaS Window Metric #79",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-080",
    domain: "saas",
    level: 4,
    order: 80,
    difficulty: "hard",
    title: "SaaS Window Metric #80",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-081",
    domain: "saas",
    level: 4,
    order: 81,
    difficulty: "hard",
    title: "SaaS Window Metric #81",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-082",
    domain: "saas",
    level: 4,
    order: 82,
    difficulty: "hard",
    title: "SaaS Window Metric #82",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-083",
    domain: "saas",
    level: 4,
    order: 83,
    difficulty: "hard",
    title: "SaaS Window Metric #83",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-084",
    domain: "saas",
    level: 4,
    order: 84,
    difficulty: "hard",
    title: "SaaS Window Metric #84",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-085",
    domain: "saas",
    level: 4,
    order: 85,
    difficulty: "hard",
    title: "SaaS Window Metric #85",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-086",
    domain: "saas",
    level: 4,
    order: 86,
    difficulty: "hard",
    title: "SaaS Window Metric #86",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-087",
    domain: "saas",
    level: 4,
    order: 87,
    difficulty: "hard",
    title: "SaaS Window Metric #87",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-088",
    domain: "saas",
    level: 4,
    order: 88,
    difficulty: "hard",
    title: "SaaS Window Metric #88",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-089",
    domain: "saas",
    level: 4,
    order: 89,
    difficulty: "hard",
    title: "SaaS Window Metric #89",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-090",
    domain: "saas",
    level: 4,
    order: 90,
    difficulty: "hard",
    title: "SaaS Window Metric #90",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-091",
    domain: "saas",
    level: 4,
    order: 91,
    difficulty: "hard",
    title: "SaaS Window Metric #91",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-092",
    domain: "saas",
    level: 4,
    order: 92,
    difficulty: "hard",
    title: "SaaS Window Metric #92",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-093",
    domain: "saas",
    level: 4,
    order: 93,
    difficulty: "hard",
    title: "SaaS Window Metric #93",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-094",
    domain: "saas",
    level: 4,
    order: 94,
    difficulty: "hard",
    title: "SaaS Window Metric #94",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-095",
    domain: "saas",
    level: 4,
    order: 95,
    difficulty: "hard",
    title: "SaaS Window Metric #95",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-096",
    domain: "saas",
    level: 4,
    order: 96,
    difficulty: "hard",
    title: "SaaS Window Metric #96",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-097",
    domain: "saas",
    level: 4,
    order: 97,
    difficulty: "hard",
    title: "SaaS Window Metric #97",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-098",
    domain: "saas",
    level: 4,
    order: 98,
    difficulty: "hard",
    title: "SaaS Window Metric #98",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-099",
    domain: "saas",
    level: 4,
    order: 99,
    difficulty: "hard",
    title: "SaaS Window Metric #99",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "saas-L4-100",
    domain: "saas",
    level: 4,
    order: 100,
    difficulty: "hard",
    title: "SaaS Window Metric #100",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Compute running cumulative invoice revenue partitioned by account_id. Show id, account_id, amount, and cumulative amount.",
    context_notes: "Customer cumulative revenue billing tracking.",
    concepts: ["Window Functions","SUM() OVER","invoices"],
    expected_columns: ["id","account_id","amount","cumulative_invoiced"],
    reference_sql: "SELECT id, account_id, amount, SUM(amount) OVER (PARTITION BY account_id ORDER BY id) AS cumulative_invoiced FROM invoices ORDER BY account_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(amount) OVER (PARTITION BY account_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  }
];
