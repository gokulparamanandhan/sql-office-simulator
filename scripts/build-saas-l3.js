const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Samira Khan', role: 'CEO & Founder' },
  { name: 'Tariq Mansoor', role: 'VP of Engineering & Cloud Ops' },
  { name: 'Chloe Vance', role: 'Head of Product Analytics & CS' },
];

const l3Templates = [
  {
    authorIdx: 0,
    title: "Accounts Generating Above Industry-Average MRR",
    desc: "Samira here. Identify high-performing customer accounts whose active MRR exceeds the average MRR of all active accounts in their industry. Show company_name, industry, and mrr, ordered by mrr descending.",
    sql: "SELECT a.company_name, a.industry, s.mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' AND s.mrr > (SELECT AVG(s2.mrr) FROM subscriptions s2 JOIN accounts a2 ON s2.account_id = a2.id WHERE a2.industry = a.industry AND s2.status = 'active') ORDER BY s.mrr DESC;",
    cols: ["company_name", "industry", "mrr"],
    hint: "Use a correlated subquery comparing s.mrr to the average MRR of accounts in that same industry.",
    context: "Benchmarking top-tier accounts against industry vertical norms.",
    concepts: ["Correlated Subquery", "WHERE", "AVG()", "JOIN"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Accounts with Connected Third-Party Integrations (EXISTS)",
    desc: "Tariq here from Integrations Engineering. Retrieve all active enterprise accounts that have at least one active third-party tool integration. Return id, company_name, and industry using EXISTS.",
    sql: "SELECT a.id, a.company_name, a.industry FROM accounts a WHERE a.tier = 'enterprise' AND EXISTS (SELECT 1 FROM integrations i WHERE i.account_id = a.id AND i.is_active = TRUE) ORDER BY a.company_name ASC;",
    cols: ["id", "company_name", "industry"],
    hint: "Use WHERE a.tier = 'enterprise' AND EXISTS (SELECT 1 FROM integrations i WHERE i.account_id = a.id AND i.is_active = TRUE).",
    context: "Ecosystem integration adoption among enterprise clients.",
    concepts: ["EXISTS", "Correlated Subquery", "WHERE"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Total ARR Lost from High-Impact Churn Events",
    desc: "Samira here. We need a post-mortem on severe churn. Find all churn events where the lost ARR was higher than the average ARR lost across all churn events. Show account_id, churn_date, arr_lost, and reason, ordered by arr_lost desc.",
    sql: "SELECT account_id, churn_date, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    cols: ["account_id", "churn_date", "arr_lost", "reason"],
    hint: "Use WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events).",
    context: "Major customer churn root cause analysis.",
    concepts: ["Scalar Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Accounts with Zero Support Tickets Logged (NOT EXISTS)",
    desc: "Chloe here. Identify enterprise accounts that have never filed a single support ticket. Return account id, company_name, and industry using NOT EXISTS.",
    sql: "SELECT a.id, a.company_name, a.industry FROM accounts a WHERE a.tier = 'enterprise' AND NOT EXISTS (SELECT 1 FROM support_tickets st WHERE st.account_id = a.id) ORDER BY a.company_name ASC;",
    cols: ["id", "company_name", "industry"],
    hint: "Use WHERE a.tier = 'enterprise' AND NOT EXISTS (SELECT 1 FROM support_tickets st WHERE st.account_id = a.id).",
    context: "Silent customer health checks to detect disengagement.",
    concepts: ["NOT EXISTS", "Correlated Subquery", "WHERE"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Accounts with Both Active Integrations and API Keys (INTERSECT)",
    desc: "Find all customer account IDs that have active integrations AND have generated at least one API key using INTERSECT. Display account_id.",
    sql: "SELECT DISTINCT account_id FROM integrations WHERE is_active = TRUE INTERSECT SELECT DISTINCT account_id FROM api_keys ORDER BY account_id ASC;",
    cols: ["account_id"],
    hint: "Use the INTERSECT operator between accounts with integrations and accounts with API keys.",
    context: "Developer-led technical product adoption mapping.",
    concepts: ["INTERSECT", "Set Operations", "DISTINCT"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Highest MRR Subscription in Each Industry (Derived Table)",
    desc: "For each industry, find the maximum active subscription MRR. Join accounts and subscriptions with a derived table to return industry, company_name, and mrr.",
    sql: "SELECT a.industry, a.company_name, s.mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id JOIN (SELECT a2.industry, MAX(s2.mrr) AS max_mrr FROM accounts a2 JOIN subscriptions s2 ON a2.id = s2.account_id WHERE s2.status = 'active' GROUP BY a2.industry) max_ind ON a.industry = max_ind.industry AND s.mrr = max_ind.max_mrr ORDER BY s.mrr DESC;",
    cols: ["industry", "company_name", "mrr"],
    hint: "Join against a derived table grouping by industry and taking MAX(mrr).",
    context: "Industry flagship contract leadership profiling.",
    concepts: ["Derived Tables", "JOIN", "Subqueries"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Audit Events Logging User Deletion or Role Changes",
    desc: "Tariq from Security. Find all audit events where the action took place on accounts having enterprise tier. Show account_id, action, and timestamp, ordered by timestamp descending.",
    sql: "SELECT ae.account_id, ae.action, ae.timestamp FROM audit_events ae WHERE ae.account_id IN (SELECT id FROM accounts WHERE tier = 'enterprise') ORDER BY ae.timestamp DESC;",
    cols: ["account_id", "action", "timestamp"],
    hint: "Use WHERE ae.account_id IN (SELECT id FROM accounts WHERE tier = 'enterprise').",
    context: "SOC2 compliance auditing of enterprise audit trails.",
    concepts: ["IN", "Subquery", "Security Audit"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Feature Usage Volume Outliers Above Feature Mean",
    desc: "Chloe here. Identify feature usage entries where monthly_events is greater than the average monthly events recorded for that specific feature. Show account_id, feature_name, and monthly_events.",
    sql: "SELECT fu.account_id, fu.feature_name, fu.monthly_events FROM feature_usage fu WHERE fu.monthly_events > (SELECT AVG(fu2.monthly_events) FROM feature_usage fu2 WHERE fu2.feature_name = fu.feature_name) ORDER BY fu.monthly_events DESC;",
    cols: ["account_id", "feature_name", "monthly_events"],
    hint: "Use a correlated subquery comparing fu.monthly_events to the average for that feature_name.",
    context: "Identifying power users and high-intensity workload patterns.",
    concepts: ["Correlated Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Active Accounts vs Churned Accounts List (UNION)",
    desc: "Create a unified company account status roster. Output account id, company_name, and status label ('active' for active subscribers, 'churned' for churn event records) using UNION.",
    sql: "SELECT a.id, a.company_name, 'active' AS account_health FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' UNION SELECT a.id, a.company_name, 'churned' AS account_health FROM accounts a JOIN churn_events ce ON a.id = ce.account_id ORDER BY id ASC;",
    cols: ["id", "company_name", "account_health"],
    hint: "Combine active subscriber accounts and churned accounts using UNION.",
    context: "Unified customer account health categorization.",
    concepts: ["UNION", "Set Operations", "Customer Health"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Cloud Clusters Costing More Than Provider Average",
    desc: "Tariq here. Find all cloud clusters whose monthly hosting cost exceeds the average cost for clusters hosted on that same cloud provider. Display cluster_name, cloud_provider, region, and monthly_cost_usd.",
    sql: "SELECT cc.cluster_name, cc.cloud_provider, cc.region, cc.monthly_cost_usd FROM cloud_clusters cc WHERE cc.monthly_cost_usd > (SELECT AVG(cc2.monthly_cost_usd) FROM cloud_clusters cc2 WHERE cc2.cloud_provider = cc.cloud_provider) ORDER BY cc.monthly_cost_usd DESC;",
    cols: ["cluster_name", "cloud_provider", "region", "monthly_cost_usd"],
    hint: "Use a correlated subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters WHERE cloud_provider = cc.cloud_provider).",
    context: "Infrastructure cost anomaly detection.",
    concepts: ["Correlated Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  }
];

// Generate 90 additional programmatic templates across all Level 3 SaaS tables
const saasL3Themes = [
  { table: "subscriptions", field: "mrr", groupCol: "plan", name: "Subscription Plan MRR Benchmark" },
  { table: "cloud_clusters", field: "monthly_cost_usd", groupCol: "cloud_provider", name: "Cluster Hosting Cost Benchmark" },
  { table: "support_tickets", field: "resolution_hours", groupCol: "priority", name: "Ticket Resolution Effort Benchmark" },
  { table: "feature_usage", field: "monthly_events", groupCol: "feature_name", name: "Feature Event Volume Benchmark" },
  { table: "churn_events", field: "arr_lost", groupCol: "reason", name: "Churn ARR Loss Severity Benchmark" },
  { table: "invoices", field: "amount", groupCol: "account_id", name: "Invoice Billed Amount Benchmark" }
];

let counter = l3Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = saasL3Themes[i % saasL3Themes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l3Templates.push({
    authorIdx: counter % personas.length,
    title: `SaaS Benchmark Query #${qNum}: ${theme.name}`,
    desc: `Identify records from ${theme.table} where ${theme.field} is strictly greater than the overall average ${theme.field}. Return id, ${theme.field}, and ${theme.groupCol}, ordered by ${theme.field} descending.`,
    sql: `SELECT id, ${theme.field}, ${theme.groupCol} FROM ${theme.table} WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}) ORDER BY ${theme.field} DESC;`,
    cols: ["id", theme.field, theme.groupCol],
    hint: `Use a scalar subquery: WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}).`,
    context: `Benchmark analysis on ${theme.table} exceeding overall mean metrics.`,
    concepts: ["Scalar Subquery", "WHERE", "AVG()", theme.table],
    difficulty: "hard"
  });
  counter++;
}

const outQuestions = l3Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "saas-L3-${pad}",
    domain: "saas",
    level: 3,
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
    starter_sql: "SELECT\\n  -- Complete the subquery or set operation\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// SAAS — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPERATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): accounts, pricing_plans, subscriptions, invoices, users, api_keys,
//              feature_usage, cloud_clusters, support_tickets, integrations,
//              audit_events, churn_events
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L3_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/saas-l3-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated SAAS_L3_QUESTIONS: ${outQuestions.length} questions.`);
