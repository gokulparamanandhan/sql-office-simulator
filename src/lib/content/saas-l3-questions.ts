// ============================================================================
// SAAS — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPERATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): accounts, pricing_plans, subscriptions, invoices, users, api_keys,
//              feature_usage, cloud_clusters, support_tickets, integrations,
//              audit_events, churn_events
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L3_QUESTIONS: QuestionDefinition[] = [
  {
    id: "saas-L3-001",
    domain: "saas",
    level: 3,
    order: 1,
    difficulty: "hard",
    title: "Accounts Generating Above Industry-Average MRR",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. Identify high-performing customer accounts whose active MRR exceeds the average MRR of all active accounts in their industry. Show company_name, industry, and mrr, ordered by mrr descending.",
    context_notes: "Benchmarking top-tier accounts against industry vertical norms.",
    concepts: ["Correlated Subquery","WHERE","AVG()","JOIN"],
    expected_columns: ["company_name","industry","mrr"],
    reference_sql: "SELECT a.company_name, a.industry, s.mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' AND s.mrr > (SELECT AVG(s2.mrr) FROM subscriptions s2 JOIN accounts a2 ON s2.account_id = a2.id WHERE a2.industry = a.industry AND s2.status = 'active') ORDER BY s.mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery comparing s.mrr to the average MRR of accounts in that same industry."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-002",
    domain: "saas",
    level: 3,
    order: 2,
    difficulty: "hard",
    title: "Accounts with Connected Third-Party Integrations (EXISTS)",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here from Integrations Engineering. Retrieve all active enterprise accounts that have at least one active third-party tool integration. Return id, company_name, and industry using EXISTS.",
    context_notes: "Ecosystem integration adoption among enterprise clients.",
    concepts: ["EXISTS","Correlated Subquery","WHERE"],
    expected_columns: ["id","company_name","industry"],
    reference_sql: "SELECT a.id, a.company_name, a.industry FROM accounts a WHERE a.tier = 'enterprise' AND EXISTS (SELECT 1 FROM integrations i WHERE i.account_id = a.id AND i.is_active = TRUE) ORDER BY a.company_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE a.tier = 'enterprise' AND EXISTS (SELECT 1 FROM integrations i WHERE i.account_id = a.id AND i.is_active = TRUE)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-003",
    domain: "saas",
    level: 3,
    order: 3,
    difficulty: "hard",
    title: "Total ARR Lost from High-Impact Churn Events",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. We need a post-mortem on severe churn. Find all churn events where the lost ARR was higher than the average ARR lost across all churn events. Show account_id, churn_date, arr_lost, and reason, ordered by arr_lost desc.",
    context_notes: "Major customer churn root cause analysis.",
    concepts: ["Scalar Subquery","WHERE","AVG()"],
    expected_columns: ["account_id","churn_date","arr_lost","reason"],
    reference_sql: "SELECT account_id, churn_date, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-004",
    domain: "saas",
    level: 3,
    order: 4,
    difficulty: "hard",
    title: "Accounts with Zero Support Tickets Logged (NOT EXISTS)",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. Identify enterprise accounts that have never filed a single support ticket. Return account id, company_name, and industry using NOT EXISTS.",
    context_notes: "Silent customer health checks to detect disengagement.",
    concepts: ["NOT EXISTS","Correlated Subquery","WHERE"],
    expected_columns: ["id","company_name","industry"],
    reference_sql: "SELECT a.id, a.company_name, a.industry FROM accounts a WHERE a.tier = 'enterprise' AND NOT EXISTS (SELECT 1 FROM support_tickets st WHERE st.account_id = a.id) ORDER BY a.company_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE a.tier = 'enterprise' AND NOT EXISTS (SELECT 1 FROM support_tickets st WHERE st.account_id = a.id)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-005",
    domain: "saas",
    level: 3,
    order: 5,
    difficulty: "hard",
    title: "Accounts with Both Active Integrations and API Keys (INTERSECT)",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Find all customer account IDs that have active integrations AND have generated at least one API key using INTERSECT. Display account_id.",
    context_notes: "Developer-led technical product adoption mapping.",
    concepts: ["INTERSECT","Set Operations","DISTINCT"],
    expected_columns: ["account_id"],
    reference_sql: "SELECT DISTINCT account_id FROM integrations WHERE is_active = TRUE INTERSECT SELECT DISTINCT account_id FROM api_keys ORDER BY account_id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the INTERSECT operator between accounts with integrations and accounts with API keys."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-006",
    domain: "saas",
    level: 3,
    order: 6,
    difficulty: "hard",
    title: "Highest MRR Subscription in Each Industry (Derived Table)",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "For each industry, find the maximum active subscription MRR. Join accounts and subscriptions with a derived table to return industry, company_name, and mrr.",
    context_notes: "Industry flagship contract leadership profiling.",
    concepts: ["Derived Tables","JOIN","Subqueries"],
    expected_columns: ["industry","company_name","mrr"],
    reference_sql: "SELECT a.industry, a.company_name, s.mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id JOIN (SELECT a2.industry, MAX(s2.mrr) AS max_mrr FROM accounts a2 JOIN subscriptions s2 ON a2.id = s2.account_id WHERE s2.status = 'active' GROUP BY a2.industry) max_ind ON a.industry = max_ind.industry AND s.mrr = max_ind.max_mrr ORDER BY s.mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join against a derived table grouping by industry and taking MAX(mrr)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-007",
    domain: "saas",
    level: 3,
    order: 7,
    difficulty: "hard",
    title: "Audit Events Logging User Deletion or Role Changes",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq from Security. Find all audit events where the action took place on accounts having enterprise tier. Show account_id, action, and timestamp, ordered by timestamp descending.",
    context_notes: "SOC2 compliance auditing of enterprise audit trails.",
    concepts: ["IN","Subquery","Security Audit"],
    expected_columns: ["account_id","action","timestamp"],
    reference_sql: "SELECT ae.account_id, ae.action, ae.timestamp FROM audit_events ae WHERE ae.account_id IN (SELECT id FROM accounts WHERE tier = 'enterprise') ORDER BY ae.timestamp DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE ae.account_id IN (SELECT id FROM accounts WHERE tier = 'enterprise')."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-008",
    domain: "saas",
    level: 3,
    order: 8,
    difficulty: "hard",
    title: "Feature Usage Volume Outliers Above Feature Mean",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. Identify feature usage entries where monthly_events is greater than the average monthly events recorded for that specific feature. Show account_id, feature_name, and monthly_events.",
    context_notes: "Identifying power users and high-intensity workload patterns.",
    concepts: ["Correlated Subquery","WHERE","AVG()"],
    expected_columns: ["account_id","feature_name","monthly_events"],
    reference_sql: "SELECT fu.account_id, fu.feature_name, fu.monthly_events FROM feature_usage fu WHERE fu.monthly_events > (SELECT AVG(fu2.monthly_events) FROM feature_usage fu2 WHERE fu2.feature_name = fu.feature_name) ORDER BY fu.monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery comparing fu.monthly_events to the average for that feature_name."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-009",
    domain: "saas",
    level: 3,
    order: 9,
    difficulty: "hard",
    title: "Active Accounts vs Churned Accounts List (UNION)",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Create a unified company account status roster. Output account id, company_name, and status label ('active' for active subscribers, 'churned' for churn event records) using UNION.",
    context_notes: "Unified customer account health categorization.",
    concepts: ["UNION","Set Operations","Customer Health"],
    expected_columns: ["id","company_name","account_health"],
    reference_sql: "SELECT a.id, a.company_name, 'active' AS account_health FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' UNION SELECT a.id, a.company_name, 'churned' AS account_health FROM accounts a JOIN churn_events ce ON a.id = ce.account_id ORDER BY id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Combine active subscriber accounts and churned accounts using UNION."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-010",
    domain: "saas",
    level: 3,
    order: 10,
    difficulty: "hard",
    title: "Cloud Clusters Costing More Than Provider Average",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here. Find all cloud clusters whose monthly hosting cost exceeds the average cost for clusters hosted on that same cloud provider. Display cluster_name, cloud_provider, region, and monthly_cost_usd.",
    context_notes: "Infrastructure cost anomaly detection.",
    concepts: ["Correlated Subquery","WHERE","AVG()"],
    expected_columns: ["cluster_name","cloud_provider","region","monthly_cost_usd"],
    reference_sql: "SELECT cc.cluster_name, cc.cloud_provider, cc.region, cc.monthly_cost_usd FROM cloud_clusters cc WHERE cc.monthly_cost_usd > (SELECT AVG(cc2.monthly_cost_usd) FROM cloud_clusters cc2 WHERE cc2.cloud_provider = cc.cloud_provider) ORDER BY cc.monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters WHERE cloud_provider = cc.cloud_provider)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-011",
    domain: "saas",
    level: 3,
    order: 11,
    difficulty: "hard",
    title: "SaaS Benchmark Query #11: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-012",
    domain: "saas",
    level: 3,
    order: 12,
    difficulty: "hard",
    title: "SaaS Benchmark Query #12: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-013",
    domain: "saas",
    level: 3,
    order: 13,
    difficulty: "hard",
    title: "SaaS Benchmark Query #13: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-014",
    domain: "saas",
    level: 3,
    order: 14,
    difficulty: "hard",
    title: "SaaS Benchmark Query #14: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-015",
    domain: "saas",
    level: 3,
    order: 15,
    difficulty: "hard",
    title: "SaaS Benchmark Query #15: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-016",
    domain: "saas",
    level: 3,
    order: 16,
    difficulty: "hard",
    title: "SaaS Benchmark Query #16: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-017",
    domain: "saas",
    level: 3,
    order: 17,
    difficulty: "hard",
    title: "SaaS Benchmark Query #17: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-018",
    domain: "saas",
    level: 3,
    order: 18,
    difficulty: "hard",
    title: "SaaS Benchmark Query #18: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-019",
    domain: "saas",
    level: 3,
    order: 19,
    difficulty: "hard",
    title: "SaaS Benchmark Query #19: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-020",
    domain: "saas",
    level: 3,
    order: 20,
    difficulty: "hard",
    title: "SaaS Benchmark Query #20: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-021",
    domain: "saas",
    level: 3,
    order: 21,
    difficulty: "hard",
    title: "SaaS Benchmark Query #21: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-022",
    domain: "saas",
    level: 3,
    order: 22,
    difficulty: "hard",
    title: "SaaS Benchmark Query #22: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-023",
    domain: "saas",
    level: 3,
    order: 23,
    difficulty: "hard",
    title: "SaaS Benchmark Query #23: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-024",
    domain: "saas",
    level: 3,
    order: 24,
    difficulty: "hard",
    title: "SaaS Benchmark Query #24: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-025",
    domain: "saas",
    level: 3,
    order: 25,
    difficulty: "hard",
    title: "SaaS Benchmark Query #25: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-026",
    domain: "saas",
    level: 3,
    order: 26,
    difficulty: "hard",
    title: "SaaS Benchmark Query #26: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-027",
    domain: "saas",
    level: 3,
    order: 27,
    difficulty: "hard",
    title: "SaaS Benchmark Query #27: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-028",
    domain: "saas",
    level: 3,
    order: 28,
    difficulty: "hard",
    title: "SaaS Benchmark Query #28: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-029",
    domain: "saas",
    level: 3,
    order: 29,
    difficulty: "hard",
    title: "SaaS Benchmark Query #29: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-030",
    domain: "saas",
    level: 3,
    order: 30,
    difficulty: "hard",
    title: "SaaS Benchmark Query #30: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-031",
    domain: "saas",
    level: 3,
    order: 31,
    difficulty: "hard",
    title: "SaaS Benchmark Query #31: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-032",
    domain: "saas",
    level: 3,
    order: 32,
    difficulty: "hard",
    title: "SaaS Benchmark Query #32: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-033",
    domain: "saas",
    level: 3,
    order: 33,
    difficulty: "hard",
    title: "SaaS Benchmark Query #33: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-034",
    domain: "saas",
    level: 3,
    order: 34,
    difficulty: "hard",
    title: "SaaS Benchmark Query #34: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-035",
    domain: "saas",
    level: 3,
    order: 35,
    difficulty: "hard",
    title: "SaaS Benchmark Query #35: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-036",
    domain: "saas",
    level: 3,
    order: 36,
    difficulty: "hard",
    title: "SaaS Benchmark Query #36: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-037",
    domain: "saas",
    level: 3,
    order: 37,
    difficulty: "hard",
    title: "SaaS Benchmark Query #37: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-038",
    domain: "saas",
    level: 3,
    order: 38,
    difficulty: "hard",
    title: "SaaS Benchmark Query #38: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-039",
    domain: "saas",
    level: 3,
    order: 39,
    difficulty: "hard",
    title: "SaaS Benchmark Query #39: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-040",
    domain: "saas",
    level: 3,
    order: 40,
    difficulty: "hard",
    title: "SaaS Benchmark Query #40: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-041",
    domain: "saas",
    level: 3,
    order: 41,
    difficulty: "hard",
    title: "SaaS Benchmark Query #41: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-042",
    domain: "saas",
    level: 3,
    order: 42,
    difficulty: "hard",
    title: "SaaS Benchmark Query #42: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-043",
    domain: "saas",
    level: 3,
    order: 43,
    difficulty: "hard",
    title: "SaaS Benchmark Query #43: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-044",
    domain: "saas",
    level: 3,
    order: 44,
    difficulty: "hard",
    title: "SaaS Benchmark Query #44: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-045",
    domain: "saas",
    level: 3,
    order: 45,
    difficulty: "hard",
    title: "SaaS Benchmark Query #45: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-046",
    domain: "saas",
    level: 3,
    order: 46,
    difficulty: "hard",
    title: "SaaS Benchmark Query #46: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-047",
    domain: "saas",
    level: 3,
    order: 47,
    difficulty: "hard",
    title: "SaaS Benchmark Query #47: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-048",
    domain: "saas",
    level: 3,
    order: 48,
    difficulty: "hard",
    title: "SaaS Benchmark Query #48: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-049",
    domain: "saas",
    level: 3,
    order: 49,
    difficulty: "hard",
    title: "SaaS Benchmark Query #49: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-050",
    domain: "saas",
    level: 3,
    order: 50,
    difficulty: "hard",
    title: "SaaS Benchmark Query #50: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-051",
    domain: "saas",
    level: 3,
    order: 51,
    difficulty: "hard",
    title: "SaaS Benchmark Query #51: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-052",
    domain: "saas",
    level: 3,
    order: 52,
    difficulty: "hard",
    title: "SaaS Benchmark Query #52: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-053",
    domain: "saas",
    level: 3,
    order: 53,
    difficulty: "hard",
    title: "SaaS Benchmark Query #53: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-054",
    domain: "saas",
    level: 3,
    order: 54,
    difficulty: "hard",
    title: "SaaS Benchmark Query #54: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-055",
    domain: "saas",
    level: 3,
    order: 55,
    difficulty: "hard",
    title: "SaaS Benchmark Query #55: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-056",
    domain: "saas",
    level: 3,
    order: 56,
    difficulty: "hard",
    title: "SaaS Benchmark Query #56: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-057",
    domain: "saas",
    level: 3,
    order: 57,
    difficulty: "hard",
    title: "SaaS Benchmark Query #57: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-058",
    domain: "saas",
    level: 3,
    order: 58,
    difficulty: "hard",
    title: "SaaS Benchmark Query #58: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-059",
    domain: "saas",
    level: 3,
    order: 59,
    difficulty: "hard",
    title: "SaaS Benchmark Query #59: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-060",
    domain: "saas",
    level: 3,
    order: 60,
    difficulty: "hard",
    title: "SaaS Benchmark Query #60: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-061",
    domain: "saas",
    level: 3,
    order: 61,
    difficulty: "hard",
    title: "SaaS Benchmark Query #61: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-062",
    domain: "saas",
    level: 3,
    order: 62,
    difficulty: "hard",
    title: "SaaS Benchmark Query #62: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-063",
    domain: "saas",
    level: 3,
    order: 63,
    difficulty: "hard",
    title: "SaaS Benchmark Query #63: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-064",
    domain: "saas",
    level: 3,
    order: 64,
    difficulty: "hard",
    title: "SaaS Benchmark Query #64: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-065",
    domain: "saas",
    level: 3,
    order: 65,
    difficulty: "hard",
    title: "SaaS Benchmark Query #65: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-066",
    domain: "saas",
    level: 3,
    order: 66,
    difficulty: "hard",
    title: "SaaS Benchmark Query #66: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-067",
    domain: "saas",
    level: 3,
    order: 67,
    difficulty: "hard",
    title: "SaaS Benchmark Query #67: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-068",
    domain: "saas",
    level: 3,
    order: 68,
    difficulty: "hard",
    title: "SaaS Benchmark Query #68: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-069",
    domain: "saas",
    level: 3,
    order: 69,
    difficulty: "hard",
    title: "SaaS Benchmark Query #69: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-070",
    domain: "saas",
    level: 3,
    order: 70,
    difficulty: "hard",
    title: "SaaS Benchmark Query #70: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-071",
    domain: "saas",
    level: 3,
    order: 71,
    difficulty: "hard",
    title: "SaaS Benchmark Query #71: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-072",
    domain: "saas",
    level: 3,
    order: 72,
    difficulty: "hard",
    title: "SaaS Benchmark Query #72: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-073",
    domain: "saas",
    level: 3,
    order: 73,
    difficulty: "hard",
    title: "SaaS Benchmark Query #73: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-074",
    domain: "saas",
    level: 3,
    order: 74,
    difficulty: "hard",
    title: "SaaS Benchmark Query #74: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-075",
    domain: "saas",
    level: 3,
    order: 75,
    difficulty: "hard",
    title: "SaaS Benchmark Query #75: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-076",
    domain: "saas",
    level: 3,
    order: 76,
    difficulty: "hard",
    title: "SaaS Benchmark Query #76: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-077",
    domain: "saas",
    level: 3,
    order: 77,
    difficulty: "hard",
    title: "SaaS Benchmark Query #77: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-078",
    domain: "saas",
    level: 3,
    order: 78,
    difficulty: "hard",
    title: "SaaS Benchmark Query #78: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-079",
    domain: "saas",
    level: 3,
    order: 79,
    difficulty: "hard",
    title: "SaaS Benchmark Query #79: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-080",
    domain: "saas",
    level: 3,
    order: 80,
    difficulty: "hard",
    title: "SaaS Benchmark Query #80: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-081",
    domain: "saas",
    level: 3,
    order: 81,
    difficulty: "hard",
    title: "SaaS Benchmark Query #81: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-082",
    domain: "saas",
    level: 3,
    order: 82,
    difficulty: "hard",
    title: "SaaS Benchmark Query #82: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-083",
    domain: "saas",
    level: 3,
    order: 83,
    difficulty: "hard",
    title: "SaaS Benchmark Query #83: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-084",
    domain: "saas",
    level: 3,
    order: 84,
    difficulty: "hard",
    title: "SaaS Benchmark Query #84: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-085",
    domain: "saas",
    level: 3,
    order: 85,
    difficulty: "hard",
    title: "SaaS Benchmark Query #85: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-086",
    domain: "saas",
    level: 3,
    order: 86,
    difficulty: "hard",
    title: "SaaS Benchmark Query #86: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-087",
    domain: "saas",
    level: 3,
    order: 87,
    difficulty: "hard",
    title: "SaaS Benchmark Query #87: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-088",
    domain: "saas",
    level: 3,
    order: 88,
    difficulty: "hard",
    title: "SaaS Benchmark Query #88: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-089",
    domain: "saas",
    level: 3,
    order: 89,
    difficulty: "hard",
    title: "SaaS Benchmark Query #89: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-090",
    domain: "saas",
    level: 3,
    order: 90,
    difficulty: "hard",
    title: "SaaS Benchmark Query #90: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-091",
    domain: "saas",
    level: 3,
    order: 91,
    difficulty: "hard",
    title: "SaaS Benchmark Query #91: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-092",
    domain: "saas",
    level: 3,
    order: 92,
    difficulty: "hard",
    title: "SaaS Benchmark Query #92: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-093",
    domain: "saas",
    level: 3,
    order: 93,
    difficulty: "hard",
    title: "SaaS Benchmark Query #93: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-094",
    domain: "saas",
    level: 3,
    order: 94,
    difficulty: "hard",
    title: "SaaS Benchmark Query #94: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-095",
    domain: "saas",
    level: 3,
    order: 95,
    difficulty: "hard",
    title: "SaaS Benchmark Query #95: Subscription Plan MRR Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from subscriptions where mrr is strictly greater than the overall average mrr. Return id, mrr, and plan, ordered by mrr descending.",
    context_notes: "Benchmark analysis on subscriptions exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","subscriptions"],
    expected_columns: ["id","mrr","plan"],
    reference_sql: "SELECT id, mrr, plan FROM subscriptions WHERE mrr > (SELECT AVG(mrr) FROM subscriptions) ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE mrr > (SELECT AVG(mrr) FROM subscriptions)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-096",
    domain: "saas",
    level: 3,
    order: 96,
    difficulty: "hard",
    title: "SaaS Benchmark Query #96: Cluster Hosting Cost Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from cloud_clusters where monthly_cost_usd is strictly greater than the overall average monthly_cost_usd. Return id, monthly_cost_usd, and cloud_provider, ordered by monthly_cost_usd descending.",
    context_notes: "Benchmark analysis on cloud_clusters exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cloud_clusters"],
    expected_columns: ["id","monthly_cost_usd","cloud_provider"],
    reference_sql: "SELECT id, monthly_cost_usd, cloud_provider FROM cloud_clusters WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters) ORDER BY monthly_cost_usd DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_cost_usd > (SELECT AVG(monthly_cost_usd) FROM cloud_clusters)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-097",
    domain: "saas",
    level: 3,
    order: 97,
    difficulty: "hard",
    title: "SaaS Benchmark Query #97: Ticket Resolution Effort Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from support_tickets where resolution_hours is strictly greater than the overall average resolution_hours. Return id, resolution_hours, and priority, ordered by resolution_hours descending.",
    context_notes: "Benchmark analysis on support_tickets exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","support_tickets"],
    expected_columns: ["id","resolution_hours","priority"],
    reference_sql: "SELECT id, resolution_hours, priority FROM support_tickets WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets) ORDER BY resolution_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE resolution_hours > (SELECT AVG(resolution_hours) FROM support_tickets)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-098",
    domain: "saas",
    level: 3,
    order: 98,
    difficulty: "hard",
    title: "SaaS Benchmark Query #98: Feature Event Volume Benchmark",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Identify records from feature_usage where monthly_events is strictly greater than the overall average monthly_events. Return id, monthly_events, and feature_name, ordered by monthly_events descending.",
    context_notes: "Benchmark analysis on feature_usage exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","feature_usage"],
    expected_columns: ["id","monthly_events","feature_name"],
    reference_sql: "SELECT id, monthly_events, feature_name FROM feature_usage WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage) ORDER BY monthly_events DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE monthly_events > (SELECT AVG(monthly_events) FROM feature_usage)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-099",
    domain: "saas",
    level: 3,
    order: 99,
    difficulty: "hard",
    title: "SaaS Benchmark Query #99: Churn ARR Loss Severity Benchmark",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Identify records from churn_events where arr_lost is strictly greater than the overall average arr_lost. Return id, arr_lost, and reason, ordered by arr_lost descending.",
    context_notes: "Benchmark analysis on churn_events exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","churn_events"],
    expected_columns: ["id","arr_lost","reason"],
    reference_sql: "SELECT id, arr_lost, reason FROM churn_events WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events) ORDER BY arr_lost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE arr_lost > (SELECT AVG(arr_lost) FROM churn_events)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "saas-L3-100",
    domain: "saas",
    level: 3,
    order: 100,
    difficulty: "hard",
    title: "SaaS Benchmark Query #100: Invoice Billed Amount Benchmark",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Identify records from invoices where amount is strictly greater than the overall average amount. Return id, amount, and account_id, ordered by amount descending.",
    context_notes: "Benchmark analysis on invoices exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","invoices"],
    expected_columns: ["id","amount","account_id"],
    reference_sql: "SELECT id, amount, account_id FROM invoices WHERE amount > (SELECT AVG(amount) FROM invoices) ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE amount > (SELECT AVG(amount) FROM invoices)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  }
];
