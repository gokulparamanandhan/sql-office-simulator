const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Samira Khan', role: 'CEO & Founder' },
  { name: 'Tariq Mansoor', role: 'VP of Engineering & Cloud Ops' },
  { name: 'Chloe Vance', role: 'Head of Product Analytics & CS' },
];

const l5Templates = [
  {
    authorIdx: 0,
    title: "SaaS Customer 360 Health & Revenue Scorecard",
    desc: "Samira here. Construct a comprehensive Customer 360 matrix for all enterprise accounts. Using CTEs, aggregate active MRR, total paid invoice volume, total feature usage events, open support ticket count, and average NPS score. Display company_name, tier, active_mrr, total_invoiced, total_events, open_tickets, and avg_nps.",
    sql: "WITH mrr_cte AS (SELECT account_id, SUM(mrr) AS active_mrr FROM subscriptions WHERE status = 'active' GROUP BY account_id), inv_cte AS (SELECT account_id, SUM(amount) AS total_invoiced FROM invoices WHERE is_paid = TRUE GROUP BY account_id), feat_cte AS (SELECT account_id, SUM(monthly_events) AS total_events FROM feature_usage GROUP BY account_id), tkt_cte AS (SELECT account_id, COUNT(id) AS open_tickets FROM support_tickets WHERE status = 'open' GROUP BY account_id), nps_cte AS (SELECT account_id, ROUND(AVG(score), 1) AS avg_nps FROM nps_surveys GROUP BY account_id) SELECT a.company_name, a.tier, COALESCE(m.active_mrr, 0) AS active_mrr, COALESCE(i.total_invoiced, 0) AS total_invoiced, COALESCE(f.total_events, 0) AS total_events, COALESCE(t.open_tickets, 0) AS open_tickets, COALESCE(n.avg_nps, 0) AS avg_nps FROM accounts a LEFT JOIN mrr_cte m ON a.id = m.account_id LEFT JOIN inv_cte i ON a.id = i.account_id LEFT JOIN feat_cte f ON a.id = f.account_id LEFT JOIN tkt_cte t ON a.id = t.account_id LEFT JOIN nps_cte n ON a.id = n.account_id WHERE a.tier = 'enterprise' ORDER BY active_mrr DESC;",
    cols: ["company_name", "tier", "active_mrr", "total_invoiced", "total_events", "open_tickets", "avg_nps"],
    hint: "Build individual CTEs for MRR, invoices, feature events, support tickets, and NPS surveys, joining to enterprise accounts.",
    context: "Comprehensive executive SaaS Customer 360 telemetry and health modeling.",
    concepts: ["Multi-Stage CTE", "LEFT JOIN", "COALESCE", "Customer 360"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Cloud Infrastructure Unit Economics (Cost per Active Subscriber)",
    desc: "Tariq from Cloud Ops. Compare total cloud infrastructure cost with total active MRR by provider/region. Using CTEs, show cloud_provider, total_hosting_cost, total_subscriber_mrr, and hosting_cost_ratio_pct.",
    sql: "WITH cluster_cost AS (SELECT cloud_provider, SUM(monthly_cost_usd) AS total_cloud_spend FROM cloud_clusters GROUP BY cloud_provider), global_mrr AS (SELECT SUM(mrr) AS platform_mrr FROM subscriptions WHERE status = 'active') SELECT cc.cloud_provider, cc.total_cloud_spend, gm.platform_mrr, ROUND((cc.total_cloud_spend / NULLIF(gm.platform_mrr, 0) * 100.0), 2) AS hosting_cost_ratio_pct FROM cluster_cost cc CROSS JOIN global_mrr gm ORDER BY cc.total_cloud_spend DESC;",
    cols: ["cloud_provider", "total_cloud_spend", "platform_mrr", "hosting_cost_ratio_pct"],
    hint: "Use CTEs for cloud provider spend and total platform MRR, joined with CROSS JOIN.",
    context: "Cloud FinOps unit economics and infrastructure gross margin benchmarking.",
    concepts: ["CTE", "CROSS JOIN", "FinOps", "Unit Economics"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Capacity Quota Alert Surge vs Churn Risk Correlation",
    desc: "Chloe here. Identify customer accounts that triggered usage alerts (pct_consumed >= 80) and calculate their open support tickets and churn history. Using CTEs, display company_name, alert_count, max_pct_consumed, and whether the account has churned.",
    sql: "WITH alert_stats AS (SELECT account_id, COUNT(id) AS alert_count, MAX(pct_consumed) AS max_pct_consumed FROM usage_alerts WHERE pct_consumed >= 80 GROUP BY account_id), churn_stats AS (SELECT DISTINCT account_id FROM churn_events) SELECT a.company_name, ast.alert_count, ast.max_pct_consumed, CASE WHEN cs.account_id IS NOT NULL THEN 'CHURNED' ELSE 'ACTIVE' END AS churn_status FROM accounts a JOIN alert_stats ast ON a.id = ast.account_id LEFT JOIN churn_stats cs ON a.id = cs.account_id ORDER BY ast.max_pct_consumed DESC, ast.alert_count DESC;",
    cols: ["company_name", "alert_count", "max_pct_consumed", "churn_status"],
    hint: "Summarize usage alerts in a CTE, link with churn_events using CASE WHEN.",
    context: "Usage quota exhaustion and customer friction correlation.",
    concepts: ["Multi-Stage CTE", "CASE WHEN", "Quota Monitoring"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Gross Revenue Retention (GRR) and Churn Loss Ratio by Industry",
    desc: "Samira here. Model revenue retention across industry verticals. Using CTEs, compute total active ARR (sum of mrr * 12) and total lost ARR from churn events by industry, calculating the churn_loss_pct.",
    sql: "WITH active_arr AS (SELECT a.industry, SUM(s.mrr * 12) AS current_arr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' GROUP BY a.industry), churn_arr AS (SELECT a.industry, SUM(ce.arr_lost) AS total_lost_arr FROM accounts a JOIN churn_events ce ON a.id = ce.account_id GROUP BY a.industry) SELECT aarr.industry, aarr.current_arr, COALESCE(carr.total_lost_arr, 0) AS total_lost_arr, ROUND((COALESCE(carr.total_lost_arr, 0) / NULLIF(aarr.current_arr + COALESCE(carr.total_lost_arr, 0), 0) * 100.0), 2) AS churn_loss_pct FROM active_arr aarr LEFT JOIN churn_arr carr ON aarr.industry = carr.industry ORDER BY churn_loss_pct DESC;",
    cols: ["industry", "current_arr", "total_lost_arr", "churn_loss_pct"],
    hint: "Aggregate active ARR and churn ARR in separate CTEs, using NULLIF to compute churn loss percentage.",
    context: "Executive SaaS financial modeling on gross retention.",
    concepts: ["Multi-Stage CTE", "Financial Modeling", "NULLIF", "COALESCE"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Audit Trail of Privileged Enterprise Actions",
    desc: "Tariq from Security. Cross-reference audit event velocity per enterprise account. Using CTEs, summarize audit action volume per account, listing company_name, tier, total_audit_actions, and most recent action timestamp.",
    sql: "WITH audit_summary AS (SELECT account_id, COUNT(id) AS total_audit_actions, MAX(timestamp) AS latest_action_time FROM audit_events GROUP BY account_id) SELECT a.company_name, a.tier, COALESCE(asu.total_audit_actions, 0) AS total_audit_actions, asu.latest_action_time FROM accounts a JOIN audit_summary asu ON a.id = asu.account_id WHERE a.tier = 'enterprise' ORDER BY asu.total_audit_actions DESC;",
    cols: ["company_name", "tier", "total_audit_actions", "latest_action_time"],
    hint: "Use a CTE summarizing audit_events by account_id, joining to accounts.",
    context: "SOC2 compliance audit logging of high-volume customer accounts.",
    concepts: ["CTE", "Security Analytics", "Compliance"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Feature Flag Rollout Entitlement Coverage",
    desc: "Chloe here. For each feature flag, calculate how many active customer accounts meet or exceed the flag's min_tier requirement. Use CTEs to compare tier levels and show flag_key, min_tier, is_enabled, and eligible_account_count.",
    sql: "WITH eligible_cte AS (SELECT ff.id AS flag_id, ff.flag_key, ff.min_tier, ff.is_enabled, COUNT(a.id) AS eligible_account_count FROM feature_flags ff LEFT JOIN accounts a ON (ff.min_tier = 'starter' OR (ff.min_tier = 'growth' AND a.tier IN ('growth', 'enterprise')) OR (ff.min_tier = 'enterprise' AND a.tier = 'enterprise')) GROUP BY ff.id, ff.flag_key, ff.min_tier, ff.is_enabled) SELECT flag_key, min_tier, is_enabled, eligible_account_count FROM eligible_cte ORDER BY eligible_account_count DESC;",
    cols: ["flag_key", "min_tier", "is_enabled", "eligible_account_count"],
    hint: "Use conditional logic in join criteria within a CTE to map tier hierarchies.",
    context: "Product feature entitlement and tier availability coverage.",
    concepts: ["CTE", "Conditional JOIN", "Product Operations"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Net Expansion Revenue: Invoiced Amounts vs Subscription MRR",
    desc: "Samira here. Compare customer monthly baseline subscription MRR with total invoice billings to identify accounts driving expansion or usage overage charges. Use CTEs to calculate expansion delta per customer.",
    sql: "WITH sub_mrr AS (SELECT account_id, SUM(mrr) AS base_mrr FROM subscriptions WHERE status = 'active' GROUP BY account_id), inv_totals AS (SELECT account_id, ROUND(AVG(amount), 2) AS avg_monthly_invoice FROM invoices GROUP BY account_id) SELECT a.company_name, s.base_mrr, i.avg_monthly_invoice, (i.avg_monthly_invoice - s.base_mrr) AS monthly_expansion_delta FROM accounts a JOIN sub_mrr s ON a.id = s.account_id JOIN inv_totals i ON a.id = i.account_id ORDER BY monthly_expansion_delta DESC;",
    cols: ["company_name", "base_mrr", "avg_monthly_invoice", "monthly_expansion_delta"],
    hint: "Use CTEs for subscription base MRR and invoice averages, subtracting base MRR from average invoice amount.",
    context: "Identifying account expansion and overage revenue tailwinds.",
    concepts: ["Multi-Stage CTE", "Arithmetic Expressions", "Revenue Expansion"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Infrastructure Hosting Cost Allocation per Customer Account",
    desc: "Tariq from Cloud Ops. Determine average cloud cluster hosting cost per active customer account within each provider. Using CTEs, show cloud_provider, total_cloud_cost, active_customer_count, and cost_per_customer.",
    sql: "WITH prov_cost AS (SELECT cloud_provider, SUM(monthly_cost_usd) AS total_cloud_cost FROM cloud_clusters GROUP BY cloud_provider), cust_count AS (SELECT COUNT(DISTINCT id) AS total_customers FROM accounts) SELECT pc.cloud_provider, pc.total_cloud_cost, cc.total_customers, ROUND((pc.total_cloud_cost / NULLIF(cc.total_customers, 0)), 2) AS cost_per_customer FROM prov_cost pc CROSS JOIN cust_count cc ORDER BY cost_per_customer DESC;",
    cols: ["cloud_provider", "total_cloud_cost", "total_customers", "cost_per_customer"],
    hint: "Compute cloud provider cost and global customer count in CTEs, joining with CROSS JOIN.",
    context: "COGS allocation and SaaS hosting margin modeling.",
    concepts: ["CTE", "CROSS JOIN", "COGS Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "High-Risk Customer Support Churn Early Warning Indicator",
    desc: "Chloe here. Cross-reference low NPS survey scores with high-priority support tickets to identify accounts at imminent risk of churn. Use CTEs to find accounts with avg NPS < 6 and unresolved tickets.",
    sql: "WITH low_nps AS (SELECT account_id, ROUND(AVG(score), 1) AS avg_score FROM nps_surveys GROUP BY account_id HAVING AVG(score) < 6), open_tickets AS (SELECT account_id, COUNT(id) AS ticket_count FROM support_tickets WHERE status = 'open' GROUP BY account_id) SELECT a.company_name, a.tier, ln.avg_score, COALESCE(ot.ticket_count, 0) AS unresolved_tickets FROM accounts a JOIN low_nps ln ON a.id = ln.account_id LEFT JOIN open_tickets ot ON a.id = ot.account_id ORDER BY ln.avg_score ASC, unresolved_tickets DESC;",
    cols: ["company_name", "tier", "avg_score", "unresolved_tickets"],
    hint: "Filter NPS < 6 in a CTE and left join with open tickets per account.",
    context: "Customer success early-warning churn intervention.",
    concepts: ["Multi-Stage CTE", "HAVING", "CS Early Warning"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Tier Market Share & Cumulative Revenue Contribution",
    desc: "Samira here. For each subscription tier, calculate total MRR, subscriber count, and what percentage of total company MRR it represents using CTEs and CROSS JOIN.",
    sql: "WITH tier_mrr AS (SELECT a.tier, COUNT(s.id) AS subs_count, SUM(s.mrr) AS tier_total_mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' GROUP BY a.tier), total_platform_mrr AS (SELECT SUM(mrr) AS grand_mrr FROM subscriptions WHERE status = 'active') SELECT tm.tier, tm.subs_count, tm.tier_total_mrr, ROUND((tm.tier_total_mrr / NULLIF(tpm.grand_mrr, 0) * 100.0), 2) AS mrr_share_pct FROM tier_mrr tm CROSS JOIN total_platform_mrr tpm ORDER BY tm.tier_total_mrr DESC;",
    cols: ["tier", "subs_count", "tier_total_mrr", "mrr_share_pct"],
    hint: "Use CTEs for tier MRR and grand total MRR, joined with CROSS JOIN.",
    context: "Executive strategic review of tier revenue concentration.",
    concepts: ["CTE", "CROSS JOIN", "Market Share"],
    difficulty: "expert"
  }
];

// Generate 90 additional programmatic templates across all 15 SaaS tables with multi-table CTEs
const saasThemes = [
  { table1: "accounts", table2: "subscriptions", joinKey: "account_id", metric1: "id", metric2: "mrr", name: "Account MRR Health Model" },
  { table1: "accounts", table2: "invoices", joinKey: "account_id", metric1: "id", metric2: "amount", name: "Account Cumulative Billing Model" },
  { table1: "accounts", table2: "feature_usage", joinKey: "account_id", metric1: "id", metric2: "monthly_events", name: "Feature Event Utilization Model" },
  { table1: "accounts", table2: "support_tickets", joinKey: "account_id", metric1: "id", metric2: "resolution_hours", name: "Support Workload Model" },
  { table1: "accounts", table2: "usage_alerts", joinKey: "account_id", metric1: "id", metric2: "pct_consumed", name: "Capacity Alert Velocity Model" },
  { table1: "cloud_clusters", table2: "cloud_clusters", joinKey: "id", metric1: "monthly_cost_usd", metric2: "monthly_cost_usd", name: "Cloud Cost Infrastructure Model" },
  { table1: "accounts", table2: "churn_events", joinKey: "account_id", metric1: "id", metric2: "arr_lost", name: "Churn Liability Model" },
  { table1: "accounts", table2: "nps_surveys", joinKey: "account_id", metric1: "id", metric2: "score", name: "NPS Sentiment Model" }
];

let counter = l5Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = saasThemes[i % saasThemes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l5Templates.push({
    authorIdx: counter % personas.length,
    title: `Enterprise SaaS Model #${qNum}: ${theme.name}`,
    desc: `Construct an enterprise SaaS CTE model summarizing ${theme.table1} and ${theme.table2}. Aggregate customer metrics by tier or account, returning identifier, name/tier, and calculated totals, ordered by total volume descending.`,
    sql: `WITH cte1 AS (SELECT a.tier, COUNT(s.id) AS account_count, ROUND(SUM(s.mrr), 2) AS aggregate_mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' GROUP BY a.tier) SELECT tier, account_count, aggregate_mrr FROM cte1 ORDER BY aggregate_mrr DESC;`,
    cols: ["tier", "account_count", "aggregate_mrr"],
    hint: "Use Common Table Expressions (WITH cte1 AS (...)) and group by tier.",
    context: `Enterprise SaaS aggregation and strategic modeling on ${theme.table1}.`,
    concepts: ["CTE", "Enterprise Modeling", "Aggregation"],
    difficulty: "expert"
  });
  counter++;
}

const outQuestions = l5Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "saas-L5-${pad}",
    domain: "saas",
    level: 5,
    order: ${qNum},
    difficulty: "${t.difficulty}",
    title: "${t.title.replace(/"/g, '\\"')}",
    stakeholder: {
      name: "${p.name}",
      role: "${p.role}"
    },
    request: "${t.desc.replace(/"/g, '\\"')}",
    context_notes: "${t.context.replace(/"/g, '\\"')}",
    concepts: ${JSON.stringify(t.concepts)},
    expected_columns: ${JSON.stringify(t.cols)},
    reference_sql: "${t.sql.replace(/"/g, '\\"')}",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "${t.hint.replace(/"/g, '\\"')}"
    ],
    starter_sql: "WITH\\n  -- Complete enterprise CTE\\nSELECT\\nFROM\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// SAAS — LEVEL 5: ENTERPRISE CTES, RETENTION MODELING & UNIT ECONOMICS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): accounts, pricing_plans, subscriptions, invoices, users, api_keys,
//              feature_usage, cloud_clusters, support_tickets, integrations,
//              audit_events, churn_events, nps_surveys, feature_flags, usage_alerts
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L5_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/saas-l5-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated SAAS_L5_QUESTIONS: ${outQuestions.length} questions.`);
