// ============================================================================
// SAAS — LEVEL 1: FOUNDATIONS & SUBSCRIBER INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): accounts, pricing_plans, subscriptions, invoices, users, api_keys
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L1_QUESTIONS: QuestionDefinition[] = [
  {
    id: "saas-L1-001",
    domain: "saas",
    level: 1,
    order: 1,
    difficulty: "warm-up",
    title: "Enterprise Tier Accounts Directory",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you pull our enterprise customer directory? Show company_name, industry, and signup date (created_at), sorted newest signups first.",
    context_notes: "Reviewing key enterprise accounts onboarded recently.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["company_name","industry","created_at"],
    reference_sql: "SELECT company_name, industry, created_at FROM accounts WHERE tier = 'enterprise' ORDER BY created_at DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE tier = 'enterprise' and order by created_at DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-002",
    domain: "saas",
    level: 1,
    order: 2,
    difficulty: "warm-up",
    title: "High-MRR Active Subscriptions",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. I want to inspect our highest-value active customer accounts. Pull all active subscriptions generating $1,000 or more in MRR, showing account_id, plan, and mrr, ordered highest MRR first.",
    context_notes: "Identifying flagship monthly recurring revenue accounts.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["account_id","plan","mrr"],
    reference_sql: "SELECT account_id, plan, mrr FROM subscriptions WHERE status = 'active' AND mrr >= 1000.00 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status = 'active' AND mrr >= 1000.00 on the subscriptions table."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-003",
    domain: "saas",
    level: 1,
    order: 3,
    difficulty: "warm-up",
    title: "Revoked Customer API Tokens",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here from Cloud Ops. During our quarterly security sweep, we need all revoked API keys. List id, account_id, key_name, and created_at, ordered by created_at descending.",
    context_notes: "Security audit of invalidated API credentials.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["id","account_id","key_name","created_at"],
    reference_sql: "SELECT id, account_id, key_name, created_at FROM api_keys WHERE is_revoked = TRUE ORDER BY created_at DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys WHERE is_revoked = TRUE."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-004",
    domain: "saas",
    level: 1,
    order: 4,
    difficulty: "easy",
    title: "Customer Administrator User Accounts",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here from Product. We're launching an admin portal refresh. Please fetch all users whose role is 'admin' or 'owner'. Display account_id, full_name, email, and role, ordered by full_name.",
    context_notes: "Targeting privileged account administrators for beta feedback.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["account_id","full_name","email","role"],
    reference_sql: "SELECT account_id, full_name, email, role FROM users WHERE role IN ('admin', 'owner') ORDER BY full_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE role IN ('admin', 'owner') on the users table."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-005",
    domain: "saas",
    level: 1,
    order: 5,
    difficulty: "easy",
    title: "Unpaid High-Value Invoices",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "We have pending receivables from last month. Show all unpaid invoices where the billed amount is greater than $500. Display id, account_id, amount, and invoice_date, ordered by amount descending.",
    context_notes: "Collections review on high-value delinquent customer invoices.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["id","account_id","amount","invoice_date"],
    reference_sql: "SELECT id, account_id, amount, invoice_date FROM invoices WHERE is_paid = FALSE AND amount > 500.00 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE is_paid = FALSE AND amount > 500.00 on the invoices table."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-006",
    domain: "saas",
    level: 1,
    order: 6,
    difficulty: "warm-up",
    title: "SaaS Pricing Tiers and API Quotas",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here. Could you pull our commercial pricing plans? Show plan_name, monthly_price, and included_api_calls, ordered from highest monthly price to lowest.",
    context_notes: "Evaluating rate limit allowances across commercial pricing plans.",
    concepts: ["SELECT","ORDER BY"],
    expected_columns: ["plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT plan_name, monthly_price, included_api_calls FROM pricing_plans ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Select plan_name, monthly_price, included_api_calls from pricing_plans ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-007",
    domain: "saas",
    level: 1,
    order: 7,
    difficulty: "easy",
    title: "Fintech and Healthtech Customer Accounts",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Which customer accounts belong to either the 'Fintech' or 'Healthtech' verticals? Display id, company_name, industry, and tier, ordered by company_name.",
    context_notes: "Industry vertical customer segmentation.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE industry IN ('Fintech', 'Healthtech') ORDER BY company_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE industry IN ('Fintech', 'Healthtech')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-008",
    domain: "saas",
    level: 1,
    order: 8,
    difficulty: "easy",
    title: "Recent Enterprise Signups (2024 Onwards)",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe from CS. Bring up all enterprise accounts created on or after January 1, 2024. Return id, company_name, industry, and created_at, sorted newest first.",
    context_notes: "Tracking new enterprise onboarding cohorts.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["id","company_name","industry","created_at"],
    reference_sql: "SELECT id, company_name, industry, created_at FROM accounts WHERE tier = 'enterprise' AND created_at >= '2024-01-01' ORDER BY created_at DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE tier = 'enterprise' AND created_at >= '2024-01-01'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-009",
    domain: "saas",
    level: 1,
    order: 9,
    difficulty: "easy",
    title: "Active Developer API Keys",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "List all active, unrevoked API keys that contain 'production' or 'live' in their key name. Show id, account_id, key_name, and created_at.",
    context_notes: "Auditing live production customer API credentials.",
    concepts: ["SELECT","WHERE","LIKE","OR","ORDER BY"],
    expected_columns: ["id","account_id","key_name","created_at"],
    reference_sql: "SELECT id, account_id, key_name, created_at FROM api_keys WHERE is_revoked = FALSE AND (key_name LIKE '%production%' OR key_name LIKE '%live%') ORDER BY created_at DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with is_revoked = FALSE and LIKE '%production%' OR LIKE '%live%'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-010",
    domain: "saas",
    level: 1,
    order: 10,
    difficulty: "warm-up",
    title: "Top 10 Largest Customer Invoices",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Who are our top 10 largest invoiced amounts in history? Display id, account_id, amount, is_paid, and invoice_date, ordered by amount descending.",
    context_notes: "Largest contract billing distributions.",
    concepts: ["SELECT","ORDER BY","LIMIT"],
    expected_columns: ["id","account_id","amount","is_paid","invoice_date"],
    reference_sql: "SELECT id, account_id, amount, is_paid, invoice_date FROM invoices ORDER BY amount DESC LIMIT 10;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ORDER BY amount DESC LIMIT 10 on invoices."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-011",
    domain: "saas",
    level: 1,
    order: 11,
    difficulty: "easy",
    title: "Starter Plan Subscriptions",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "How many starter tier accounts are currently active? Show account_id, plan, mrr, and started_at for all subscriptions where plan = 'starter' and status = 'active', ordered by started_at desc.",
    context_notes: "Starter self-serve subscription tier adoption.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["account_id","plan","mrr","started_at"],
    reference_sql: "SELECT account_id, plan, mrr, started_at FROM subscriptions WHERE plan = 'starter' AND status = 'active' ORDER BY started_at DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE plan = 'starter' AND status = 'active'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-012",
    domain: "saas",
    level: 1,
    order: 12,
    difficulty: "easy",
    title: "Churned or Canceled Subscriptions",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. Pull all subscriptions that have churned or canceled (status != 'active'). Display id, account_id, plan, mrr, and status, sorted by mrr descending.",
    context_notes: "Reviewing lost recurring revenue from canceled subscriptions.",
    concepts: ["SELECT","WHERE","Inequality","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr","status"],
    reference_sql: "SELECT id, account_id, plan, mrr, status FROM subscriptions WHERE status != 'active' ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status != 'active' ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-013",
    domain: "saas",
    level: 1,
    order: 13,
    difficulty: "warm-up",
    title: "Pricing Plans Under $100 per Month",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Which self-serve pricing plans cost less than $100 per month? Display plan_name, monthly_price, and included_api_calls, ordered by monthly_price ascending.",
    context_notes: "Reviewing lower-tier pricing plan boundaries.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price < 100.00 ORDER BY monthly_price ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE monthly_price < 100.00 ORDER BY monthly_price ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-014",
    domain: "saas",
    level: 1,
    order: 14,
    difficulty: "easy",
    title: "Users from Specific Corporate Domains",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. Find all users whose email address ends with '@example.com' or '@acme.com'. Show id, account_id, full_name, and email, ordered by email.",
    context_notes: "Auditing domain-specific corporate user accounts.",
    concepts: ["SELECT","WHERE","LIKE","OR","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE email LIKE '%@example.com' OR email LIKE '%@acme.com' ORDER BY email ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE email LIKE '%@example.com' OR email LIKE '%@acme.com'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-015",
    domain: "saas",
    level: 1,
    order: 15,
    difficulty: "easy",
    title: "Growth Tier Accounts in E-Commerce and DevTools",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Pull all customer accounts in the 'growth' tier that are either in 'E-Commerce' or 'DevTools'. Return id, company_name, industry, and tier, ordered by company_name.",
    context_notes: "Mid-market product segment analysis.",
    concepts: ["SELECT","WHERE","AND","IN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE tier = 'growth' AND industry IN ('E-Commerce', 'DevTools') ORDER BY company_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Combine WHERE tier = 'growth' AND industry IN ('E-Commerce', 'DevTools')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-016",
    domain: "saas",
    level: 1,
    order: 16,
    difficulty: "easy",
    title: "Invoices Billed Between $200 and $1,000",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq from Finance/Ops. Find all invoices with a billed amount between $200 and $1,000. Display id, subscription_id, amount, is_paid, and invoice_date, sorted by amount desc.",
    context_notes: "Auditing standard tier recurring monthly invoice runs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","subscription_id","amount","is_paid","invoice_date"],
    reference_sql: "SELECT id, subscription_id, amount, is_paid, invoice_date FROM invoices WHERE amount BETWEEN 200.00 AND 1000.00 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE amount BETWEEN 200.00 AND 1000.00."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-017",
    domain: "saas",
    level: 1,
    order: 17,
    difficulty: "warm-up",
    title: "Member Role Users Roster",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Retrieve all regular users (role = 'member'). Display account_id, full_name, email, and role, ordered by full_name ascending.",
    context_notes: "Standard seat usage auditing.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["account_id","full_name","email","role"],
    reference_sql: "SELECT account_id, full_name, email, role FROM users WHERE role = 'member' ORDER BY full_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE role = 'member'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-018",
    domain: "saas",
    level: 1,
    order: 18,
    difficulty: "warm-up",
    title: "Subscriptions with MRR Over $2,500",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Samira here. We are conducting an executive outreach to our top subscribers. Find all subscriptions generating more than $2,500 in monthly recurring revenue. Show account_id, plan, mrr, and started_at.",
    context_notes: "Identifying enterprise whale accounts for VIP advisory board invitations.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["account_id","plan","mrr","started_at"],
    reference_sql: "SELECT account_id, plan, mrr, started_at FROM subscriptions WHERE mrr > 2500.00 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE mrr > 2500.00 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-019",
    domain: "saas",
    level: 1,
    order: 19,
    difficulty: "easy",
    title: "Paid Invoices from Early 2024",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Tariq here. Retrieve all successfully settled invoices (is_paid = TRUE) with invoice_date between '2024-01-01' and '2024-03-31'. Display id, account_id, amount, and invoice_date.",
    context_notes: "Q1 revenue realization reconciliations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","invoice_date"],
    reference_sql: "SELECT id, account_id, amount, invoice_date FROM invoices WHERE is_paid = TRUE AND invoice_date BETWEEN '2024-01-01' AND '2024-03-31' ORDER BY invoice_date ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE is_paid = TRUE AND invoice_date BETWEEN '2024-01-01' AND '2024-03-31'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-020",
    domain: "saas",
    level: 1,
    order: 20,
    difficulty: "warm-up",
    title: "Distinct Customer Account Industries",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Chloe here. What unique industries do our customers represent? Return the distinct industry list from accounts, ordered alphabetically.",
    context_notes: "Industry vertical distribution profiling.",
    concepts: ["SELECT","DISTINCT","ORDER BY"],
    expected_columns: ["industry"],
    reference_sql: "SELECT DISTINCT industry FROM accounts ORDER BY industry ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SELECT DISTINCT industry FROM accounts ORDER BY industry ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-021",
    domain: "saas",
    level: 1,
    order: 21,
    difficulty: "easy",
    title: "SaaS Metric #21: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-022",
    domain: "saas",
    level: 1,
    order: 22,
    difficulty: "easy",
    title: "SaaS Metric #22: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-023",
    domain: "saas",
    level: 1,
    order: 23,
    difficulty: "easy",
    title: "SaaS Metric #23: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-024",
    domain: "saas",
    level: 1,
    order: 24,
    difficulty: "easy",
    title: "SaaS Metric #24: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-025",
    domain: "saas",
    level: 1,
    order: 25,
    difficulty: "easy",
    title: "SaaS Metric #25: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-026",
    domain: "saas",
    level: 1,
    order: 26,
    difficulty: "easy",
    title: "SaaS Metric #26: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-027",
    domain: "saas",
    level: 1,
    order: 27,
    difficulty: "easy",
    title: "SaaS Metric #27: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-028",
    domain: "saas",
    level: 1,
    order: 28,
    difficulty: "easy",
    title: "SaaS Metric #28: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-029",
    domain: "saas",
    level: 1,
    order: 29,
    difficulty: "easy",
    title: "SaaS Metric #29: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-030",
    domain: "saas",
    level: 1,
    order: 30,
    difficulty: "easy",
    title: "SaaS Metric #30: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-031",
    domain: "saas",
    level: 1,
    order: 31,
    difficulty: "easy",
    title: "SaaS Metric #31: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-032",
    domain: "saas",
    level: 1,
    order: 32,
    difficulty: "easy",
    title: "SaaS Metric #32: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-033",
    domain: "saas",
    level: 1,
    order: 33,
    difficulty: "easy",
    title: "SaaS Metric #33: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-034",
    domain: "saas",
    level: 1,
    order: 34,
    difficulty: "easy",
    title: "SaaS Metric #34: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-035",
    domain: "saas",
    level: 1,
    order: 35,
    difficulty: "easy",
    title: "SaaS Metric #35: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-036",
    domain: "saas",
    level: 1,
    order: 36,
    difficulty: "easy",
    title: "SaaS Metric #36: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-037",
    domain: "saas",
    level: 1,
    order: 37,
    difficulty: "easy",
    title: "SaaS Metric #37: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-038",
    domain: "saas",
    level: 1,
    order: 38,
    difficulty: "easy",
    title: "SaaS Metric #38: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-039",
    domain: "saas",
    level: 1,
    order: 39,
    difficulty: "easy",
    title: "SaaS Metric #39: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-040",
    domain: "saas",
    level: 1,
    order: 40,
    difficulty: "easy",
    title: "SaaS Metric #40: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-041",
    domain: "saas",
    level: 1,
    order: 41,
    difficulty: "easy",
    title: "SaaS Metric #41: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-042",
    domain: "saas",
    level: 1,
    order: 42,
    difficulty: "easy",
    title: "SaaS Metric #42: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-043",
    domain: "saas",
    level: 1,
    order: 43,
    difficulty: "easy",
    title: "SaaS Metric #43: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-044",
    domain: "saas",
    level: 1,
    order: 44,
    difficulty: "easy",
    title: "SaaS Metric #44: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-045",
    domain: "saas",
    level: 1,
    order: 45,
    difficulty: "easy",
    title: "SaaS Metric #45: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-046",
    domain: "saas",
    level: 1,
    order: 46,
    difficulty: "easy",
    title: "SaaS Metric #46: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-047",
    domain: "saas",
    level: 1,
    order: 47,
    difficulty: "easy",
    title: "SaaS Metric #47: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-048",
    domain: "saas",
    level: 1,
    order: 48,
    difficulty: "easy",
    title: "SaaS Metric #48: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-049",
    domain: "saas",
    level: 1,
    order: 49,
    difficulty: "easy",
    title: "SaaS Metric #49: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-050",
    domain: "saas",
    level: 1,
    order: 50,
    difficulty: "easy",
    title: "SaaS Metric #50: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-051",
    domain: "saas",
    level: 1,
    order: 51,
    difficulty: "easy",
    title: "SaaS Metric #51: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-052",
    domain: "saas",
    level: 1,
    order: 52,
    difficulty: "easy",
    title: "SaaS Metric #52: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-053",
    domain: "saas",
    level: 1,
    order: 53,
    difficulty: "easy",
    title: "SaaS Metric #53: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-054",
    domain: "saas",
    level: 1,
    order: 54,
    difficulty: "easy",
    title: "SaaS Metric #54: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-055",
    domain: "saas",
    level: 1,
    order: 55,
    difficulty: "easy",
    title: "SaaS Metric #55: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-056",
    domain: "saas",
    level: 1,
    order: 56,
    difficulty: "easy",
    title: "SaaS Metric #56: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-057",
    domain: "saas",
    level: 1,
    order: 57,
    difficulty: "easy",
    title: "SaaS Metric #57: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-058",
    domain: "saas",
    level: 1,
    order: 58,
    difficulty: "easy",
    title: "SaaS Metric #58: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-059",
    domain: "saas",
    level: 1,
    order: 59,
    difficulty: "easy",
    title: "SaaS Metric #59: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-060",
    domain: "saas",
    level: 1,
    order: 60,
    difficulty: "easy",
    title: "SaaS Metric #60: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-061",
    domain: "saas",
    level: 1,
    order: 61,
    difficulty: "easy",
    title: "SaaS Metric #61: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-062",
    domain: "saas",
    level: 1,
    order: 62,
    difficulty: "easy",
    title: "SaaS Metric #62: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-063",
    domain: "saas",
    level: 1,
    order: 63,
    difficulty: "easy",
    title: "SaaS Metric #63: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-064",
    domain: "saas",
    level: 1,
    order: 64,
    difficulty: "easy",
    title: "SaaS Metric #64: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-065",
    domain: "saas",
    level: 1,
    order: 65,
    difficulty: "easy",
    title: "SaaS Metric #65: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-066",
    domain: "saas",
    level: 1,
    order: 66,
    difficulty: "easy",
    title: "SaaS Metric #66: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-067",
    domain: "saas",
    level: 1,
    order: 67,
    difficulty: "easy",
    title: "SaaS Metric #67: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-068",
    domain: "saas",
    level: 1,
    order: 68,
    difficulty: "easy",
    title: "SaaS Metric #68: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-069",
    domain: "saas",
    level: 1,
    order: 69,
    difficulty: "easy",
    title: "SaaS Metric #69: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-070",
    domain: "saas",
    level: 1,
    order: 70,
    difficulty: "easy",
    title: "SaaS Metric #70: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-071",
    domain: "saas",
    level: 1,
    order: 71,
    difficulty: "easy",
    title: "SaaS Metric #71: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-072",
    domain: "saas",
    level: 1,
    order: 72,
    difficulty: "easy",
    title: "SaaS Metric #72: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-073",
    domain: "saas",
    level: 1,
    order: 73,
    difficulty: "easy",
    title: "SaaS Metric #73: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-074",
    domain: "saas",
    level: 1,
    order: 74,
    difficulty: "easy",
    title: "SaaS Metric #74: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-075",
    domain: "saas",
    level: 1,
    order: 75,
    difficulty: "easy",
    title: "SaaS Metric #75: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-076",
    domain: "saas",
    level: 1,
    order: 76,
    difficulty: "easy",
    title: "SaaS Metric #76: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-077",
    domain: "saas",
    level: 1,
    order: 77,
    difficulty: "easy",
    title: "SaaS Metric #77: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-078",
    domain: "saas",
    level: 1,
    order: 78,
    difficulty: "easy",
    title: "SaaS Metric #78: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-079",
    domain: "saas",
    level: 1,
    order: 79,
    difficulty: "easy",
    title: "SaaS Metric #79: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-080",
    domain: "saas",
    level: 1,
    order: 80,
    difficulty: "easy",
    title: "SaaS Metric #80: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-081",
    domain: "saas",
    level: 1,
    order: 81,
    difficulty: "easy",
    title: "SaaS Metric #81: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-082",
    domain: "saas",
    level: 1,
    order: 82,
    difficulty: "easy",
    title: "SaaS Metric #82: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-083",
    domain: "saas",
    level: 1,
    order: 83,
    difficulty: "easy",
    title: "SaaS Metric #83: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-084",
    domain: "saas",
    level: 1,
    order: 84,
    difficulty: "easy",
    title: "SaaS Metric #84: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-085",
    domain: "saas",
    level: 1,
    order: 85,
    difficulty: "easy",
    title: "SaaS Metric #85: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-086",
    domain: "saas",
    level: 1,
    order: 86,
    difficulty: "easy",
    title: "SaaS Metric #86: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-087",
    domain: "saas",
    level: 1,
    order: 87,
    difficulty: "easy",
    title: "SaaS Metric #87: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-088",
    domain: "saas",
    level: 1,
    order: 88,
    difficulty: "easy",
    title: "SaaS Metric #88: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-089",
    domain: "saas",
    level: 1,
    order: 89,
    difficulty: "easy",
    title: "SaaS Metric #89: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-090",
    domain: "saas",
    level: 1,
    order: 90,
    difficulty: "easy",
    title: "SaaS Metric #90: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-091",
    domain: "saas",
    level: 1,
    order: 91,
    difficulty: "easy",
    title: "SaaS Metric #91: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-092",
    domain: "saas",
    level: 1,
    order: 92,
    difficulty: "easy",
    title: "SaaS Metric #92: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-093",
    domain: "saas",
    level: 1,
    order: 93,
    difficulty: "easy",
    title: "SaaS Metric #93: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-094",
    domain: "saas",
    level: 1,
    order: 94,
    difficulty: "easy",
    title: "SaaS Metric #94: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-095",
    domain: "saas",
    level: 1,
    order: 95,
    difficulty: "easy",
    title: "SaaS Metric #95: INVOICES Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch invoices billed between $100 and $600 from invoices? Display id, account_id, amount, is_paid, sorted by amount in descending order.",
    context_notes: "Operational customer data query on invoices.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","amount","is_paid"],
    reference_sql: "SELECT id, account_id, amount, is_paid FROM invoices WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter invoices with WHERE amount BETWEEN 100 AND 600 ORDER BY amount DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-096",
    domain: "saas",
    level: 1,
    order: 96,
    difficulty: "easy",
    title: "SaaS Metric #96: USERS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch users with identifier between 10 and 80 from users? Display id, account_id, full_name, email, sorted by id in descending order.",
    context_notes: "Operational customer data query on users.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","full_name","email"],
    reference_sql: "SELECT id, account_id, full_name, email FROM users WHERE id BETWEEN 10 AND 80 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter users with WHERE id BETWEEN 10 AND 80 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-097",
    domain: "saas",
    level: 1,
    order: 97,
    difficulty: "easy",
    title: "SaaS Metric #97: API KEYS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch API keys with id between 1 and 40 from api_keys? Display id, account_id, key_name, is_revoked, sorted by id in descending order.",
    context_notes: "Operational customer data query on api_keys.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","key_name","is_revoked"],
    reference_sql: "SELECT id, account_id, key_name, is_revoked FROM api_keys WHERE id BETWEEN 1 AND 40 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter api_keys with WHERE id BETWEEN 1 AND 40 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-098",
    domain: "saas",
    level: 1,
    order: 98,
    difficulty: "easy",
    title: "SaaS Metric #98: PRICING PLANS Query",
    stakeholder: {
      name: "Tariq Mansoor",
      role: "VP of Engineering & Cloud Ops"
    },
    request: "Could you fetch pricing plans with monthly fee between $20 and $500 from pricing_plans? Display id, plan_name, monthly_price, included_api_calls, sorted by monthly_price in descending order.",
    context_notes: "Operational customer data query on pricing_plans.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","plan_name","monthly_price","included_api_calls"],
    reference_sql: "SELECT id, plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter pricing_plans with WHERE monthly_price BETWEEN 20 AND 500 ORDER BY monthly_price DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-099",
    domain: "saas",
    level: 1,
    order: 99,
    difficulty: "easy",
    title: "SaaS Metric #99: ACCOUNTS Query",
    stakeholder: {
      name: "Chloe Vance",
      role: "Head of Product Analytics & CS"
    },
    request: "Could you fetch customer accounts with id between 1 and 50 from accounts? Display id, company_name, industry, tier, sorted by id in descending order.",
    context_notes: "Operational customer data query on accounts.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","company_name","industry","tier"],
    reference_sql: "SELECT id, company_name, industry, tier FROM accounts WHERE id BETWEEN 1 AND 50 ORDER BY id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter accounts with WHERE id BETWEEN 1 AND 50 ORDER BY id DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "saas-L1-100",
    domain: "saas",
    level: 1,
    order: 100,
    difficulty: "easy",
    title: "SaaS Metric #100: SUBSCRIPTIONS Query",
    stakeholder: {
      name: "Samira Khan",
      role: "CEO & Founder"
    },
    request: "Could you fetch subscriptions with MRR between $200 and $1,200 from subscriptions? Display id, account_id, plan, mrr, sorted by mrr in descending order.",
    context_notes: "Operational customer data query on subscriptions.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","account_id","plan","mrr"],
    reference_sql: "SELECT id, account_id, plan, mrr FROM subscriptions WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter subscriptions with WHERE mrr BETWEEN 200 AND 1200 ORDER BY mrr DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  }
];
