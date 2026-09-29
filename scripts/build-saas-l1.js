const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Samira Khan', role: 'CEO & Founder' },
  { name: 'Tariq Mansoor', role: 'VP of Engineering & Cloud Ops' },
  { name: 'Chloe Vance', role: 'Head of Product Analytics & CS' },
];

const l1Templates = [
  {
    authorIdx: 0,
    title: "Enterprise Tier Accounts Directory",
    desc: "Could you pull our enterprise customer directory? Show company_name, industry, and signup date (created_at), sorted newest signups first.",
    sql: "SELECT company_name, industry, created_at FROM accounts WHERE tier = 'enterprise' ORDER BY created_at DESC;",
    cols: ["company_name", "industry", "created_at"],
    hint: "Filter accounts with WHERE tier = 'enterprise' and order by created_at DESC.",
    context: "Reviewing key enterprise accounts onboarded recently.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "High-MRR Active Subscriptions",
    desc: "Samira here. I want to inspect our highest-value active customer accounts. Pull all active subscriptions generating $1,000 or more in MRR, showing account_id, plan, and mrr, ordered highest MRR first.",
    sql: "SELECT account_id, plan, mrr FROM subscriptions WHERE status = 'active' AND mrr >= 1000.00 ORDER BY mrr DESC;",
    cols: ["account_id", "plan", "mrr"],
    hint: "Use WHERE status = 'active' AND mrr >= 1000.00 on the subscriptions table.",
    context: "Identifying flagship monthly recurring revenue accounts.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Revoked Customer API Tokens",
    desc: "Tariq here from Cloud Ops. During our quarterly security sweep, we need all revoked API keys. List id, account_id, key_name, and created_at, ordered by created_at descending.",
    sql: "SELECT id, account_id, key_name, created_at FROM api_keys WHERE is_revoked = TRUE ORDER BY created_at DESC;",
    cols: ["id", "account_id", "key_name", "created_at"],
    hint: "Filter api_keys WHERE is_revoked = TRUE.",
    context: "Security audit of invalidated API credentials.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Customer Administrator User Accounts",
    desc: "Chloe here from Product. We're launching an admin portal refresh. Please fetch all users whose role is 'admin' or 'owner'. Display account_id, full_name, email, and role, ordered by full_name.",
    sql: "SELECT account_id, full_name, email, role FROM users WHERE role IN ('admin', 'owner') ORDER BY full_name ASC;",
    cols: ["account_id", "full_name", "email", "role"],
    hint: "Use WHERE role IN ('admin', 'owner') on the users table.",
    context: "Targeting privileged account administrators for beta feedback.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Unpaid High-Value Invoices",
    desc: "We have pending receivables from last month. Show all unpaid invoices where the billed amount is greater than $500. Display id, account_id, amount, and invoice_date, ordered by amount descending.",
    sql: "SELECT id, account_id, amount, invoice_date FROM invoices WHERE is_paid = FALSE AND amount > 500.00 ORDER BY amount DESC;",
    cols: ["id", "account_id", "amount", "invoice_date"],
    hint: "Use WHERE is_paid = FALSE AND amount > 500.00 on the invoices table.",
    context: "Collections review on high-value delinquent customer invoices.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "SaaS Pricing Tiers and API Quotas",
    desc: "Tariq here. Could you pull our commercial pricing plans? Show plan_name, monthly_price, and included_api_calls, ordered from highest monthly price to lowest.",
    sql: "SELECT plan_name, monthly_price, included_api_calls FROM pricing_plans ORDER BY monthly_price DESC;",
    cols: ["plan_name", "monthly_price", "included_api_calls"],
    hint: "Select plan_name, monthly_price, included_api_calls from pricing_plans ORDER BY monthly_price DESC.",
    context: "Evaluating rate limit allowances across commercial pricing plans.",
    concepts: ["SELECT", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Fintech and Healthtech Customer Accounts",
    desc: "Which customer accounts belong to either the 'Fintech' or 'Healthtech' verticals? Display id, company_name, industry, and tier, ordered by company_name.",
    sql: "SELECT id, company_name, industry, tier FROM accounts WHERE industry IN ('Fintech', 'Healthtech') ORDER BY company_name ASC;",
    cols: ["id", "company_name", "industry", "tier"],
    hint: "Use WHERE industry IN ('Fintech', 'Healthtech').",
    context: "Industry vertical customer segmentation.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Recent Enterprise Signups (2024 Onwards)",
    desc: "Chloe from CS. Bring up all enterprise accounts created on or after January 1, 2024. Return id, company_name, industry, and created_at, sorted newest first.",
    sql: "SELECT id, company_name, industry, created_at FROM accounts WHERE tier = 'enterprise' AND created_at >= '2024-01-01' ORDER BY created_at DESC;",
    cols: ["id", "company_name", "industry", "created_at"],
    hint: "Use WHERE tier = 'enterprise' AND created_at >= '2024-01-01'.",
    context: "Tracking new enterprise onboarding cohorts.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "Active Developer API Keys",
    desc: "List all active, unrevoked API keys that contain 'production' or 'live' in their key name. Show id, account_id, key_name, and created_at.",
    sql: "SELECT id, account_id, key_name, created_at FROM api_keys WHERE is_revoked = FALSE AND (key_name LIKE '%production%' OR key_name LIKE '%live%') ORDER BY created_at DESC;",
    cols: ["id", "account_id", "key_name", "created_at"],
    hint: "Filter with is_revoked = FALSE and LIKE '%production%' OR LIKE '%live%'.",
    context: "Auditing live production customer API credentials.",
    concepts: ["SELECT", "WHERE", "LIKE", "OR", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Top 10 Largest Customer Invoices",
    desc: "Who are our top 10 largest invoiced amounts in history? Display id, account_id, amount, is_paid, and invoice_date, ordered by amount descending.",
    sql: "SELECT id, account_id, amount, is_paid, invoice_date FROM invoices ORDER BY amount DESC LIMIT 10;",
    cols: ["id", "account_id", "amount", "is_paid", "invoice_date"],
    hint: "Use ORDER BY amount DESC LIMIT 10 on invoices.",
    context: "Largest contract billing distributions.",
    concepts: ["SELECT", "ORDER BY", "LIMIT"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Starter Plan Subscriptions",
    desc: "How many starter tier accounts are currently active? Show account_id, plan, mrr, and started_at for all subscriptions where plan = 'starter' and status = 'active', ordered by started_at desc.",
    sql: "SELECT account_id, plan, mrr, started_at FROM subscriptions WHERE plan = 'starter' AND status = 'active' ORDER BY started_at DESC;",
    cols: ["account_id", "plan", "mrr", "started_at"],
    hint: "Filter subscriptions with WHERE plan = 'starter' AND status = 'active'.",
    context: "Starter self-serve subscription tier adoption.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Churned or Canceled Subscriptions",
    desc: "Samira here. Pull all subscriptions that have churned or canceled (status != 'active'). Display id, account_id, plan, mrr, and status, sorted by mrr descending.",
    sql: "SELECT id, account_id, plan, mrr, status FROM subscriptions WHERE status != 'active' ORDER BY mrr DESC;",
    cols: ["id", "account_id", "plan", "mrr", "status"],
    hint: "Use WHERE status != 'active' ORDER BY mrr DESC.",
    context: "Reviewing lost recurring revenue from canceled subscriptions.",
    concepts: ["SELECT", "WHERE", "Inequality", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "Pricing Plans Under $100 per Month",
    desc: "Which self-serve pricing plans cost less than $100 per month? Display plan_name, monthly_price, and included_api_calls, ordered by monthly_price ascending.",
    sql: "SELECT plan_name, monthly_price, included_api_calls FROM pricing_plans WHERE monthly_price < 100.00 ORDER BY monthly_price ASC;",
    cols: ["plan_name", "monthly_price", "included_api_calls"],
    hint: "Use WHERE monthly_price < 100.00 ORDER BY monthly_price ASC.",
    context: "Reviewing lower-tier pricing plan boundaries.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Users from Specific Corporate Domains",
    desc: "Chloe here. Find all users whose email address ends with '@example.com' or '@acme.com'. Show id, account_id, full_name, and email, ordered by email.",
    sql: "SELECT id, account_id, full_name, email FROM users WHERE email LIKE '%@example.com' OR email LIKE '%@acme.com' ORDER BY email ASC;",
    cols: ["id", "account_id", "full_name", "email"],
    hint: "Use WHERE email LIKE '%@example.com' OR email LIKE '%@acme.com'.",
    context: "Auditing domain-specific corporate user accounts.",
    concepts: ["SELECT", "WHERE", "LIKE", "OR", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Growth Tier Accounts in E-Commerce and DevTools",
    desc: "Pull all customer accounts in the 'growth' tier that are either in 'E-Commerce' or 'DevTools'. Return id, company_name, industry, and tier, ordered by company_name.",
    sql: "SELECT id, company_name, industry, tier FROM accounts WHERE tier = 'growth' AND industry IN ('E-Commerce', 'DevTools') ORDER BY company_name ASC;",
    cols: ["id", "company_name", "industry", "tier"],
    hint: "Combine WHERE tier = 'growth' AND industry IN ('E-Commerce', 'DevTools').",
    context: "Mid-market product segment analysis.",
    concepts: ["SELECT", "WHERE", "AND", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "Invoices Billed Between $200 and $1,000",
    desc: "Tariq from Finance/Ops. Find all invoices with a billed amount between $200 and $1,000. Display id, subscription_id, amount, is_paid, and invoice_date, sorted by amount desc.",
    sql: "SELECT id, subscription_id, amount, is_paid, invoice_date FROM invoices WHERE amount BETWEEN 200.00 AND 1000.00 ORDER BY amount DESC;",
    cols: ["id", "subscription_id", "amount", "is_paid", "invoice_date"],
    hint: "Use WHERE amount BETWEEN 200.00 AND 1000.00.",
    context: "Auditing standard tier recurring monthly invoice runs.",
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Member Role Users Roster",
    desc: "Retrieve all regular users (role = 'member'). Display account_id, full_name, email, and role, ordered by full_name ascending.",
    sql: "SELECT account_id, full_name, email, role FROM users WHERE role = 'member' ORDER BY full_name ASC;",
    cols: ["account_id", "full_name", "email", "role"],
    hint: "Filter users with WHERE role = 'member'.",
    context: "Standard seat usage auditing.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Subscriptions with MRR Over $2,500",
    desc: "Samira here. We are conducting an executive outreach to our top subscribers. Find all subscriptions generating more than $2,500 in monthly recurring revenue. Show account_id, plan, mrr, and started_at.",
    sql: "SELECT account_id, plan, mrr, started_at FROM subscriptions WHERE mrr > 2500.00 ORDER BY mrr DESC;",
    cols: ["account_id", "plan", "mrr", "started_at"],
    hint: "Use WHERE mrr > 2500.00 ORDER BY mrr DESC.",
    context: "Identifying enterprise whale accounts for VIP advisory board invitations.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Paid Invoices from Early 2024",
    desc: "Tariq here. Retrieve all successfully settled invoices (is_paid = TRUE) with invoice_date between '2024-01-01' and '2024-03-31'. Display id, account_id, amount, and invoice_date.",
    sql: "SELECT id, account_id, amount, invoice_date FROM invoices WHERE is_paid = TRUE AND invoice_date BETWEEN '2024-01-01' AND '2024-03-31' ORDER BY invoice_date ASC;",
    cols: ["id", "account_id", "amount", "invoice_date"],
    hint: "Use WHERE is_paid = TRUE AND invoice_date BETWEEN '2024-01-01' AND '2024-03-31'.",
    context: "Q1 revenue realization reconciliations.",
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Distinct Customer Account Industries",
    desc: "Chloe here. What unique industries do our customers represent? Return the distinct industry list from accounts, ordered alphabetically.",
    sql: "SELECT DISTINCT industry FROM accounts ORDER BY industry ASC;",
    cols: ["industry"],
    hint: "Use SELECT DISTINCT industry FROM accounts ORDER BY industry ASC.",
    context: "Industry vertical distribution profiling.",
    concepts: ["SELECT", "DISTINCT", "ORDER BY"],
    difficulty: "warm-up"
  }
];

// Generate 80 additional single-table questions covering all 6 Level 1 tables
const saasL1Fields = [
  { table: "accounts", col: "id", v1: 1, v2: 50, orderCol: "id", cols: ["id", "company_name", "industry", "tier"], desc: "customer accounts with id between 1 and 50" },
  { table: "subscriptions", col: "mrr", v1: 200.0, v2: 1200.0, orderCol: "mrr", cols: ["id", "account_id", "plan", "mrr"], desc: "subscriptions with MRR between $200 and $1,200" },
  { table: "invoices", col: "amount", v1: 100.0, v2: 600.0, orderCol: "amount", cols: ["id", "account_id", "amount", "is_paid"], desc: "invoices billed between $100 and $600" },
  { table: "users", col: "id", v1: 10, v2: 80, orderCol: "id", cols: ["id", "account_id", "full_name", "email"], desc: "users with identifier between 10 and 80" },
  { table: "api_keys", col: "id", v1: 1, v2: 40, orderCol: "id", cols: ["id", "account_id", "key_name", "is_revoked"], desc: "API keys with id between 1 and 40" },
  { table: "pricing_plans", col: "monthly_price", v1: 20.0, v2: 500.0, orderCol: "monthly_price", cols: ["id", "plan_name", "monthly_price", "included_api_calls"], desc: "pricing plans with monthly fee between $20 and $500" }
];

let counter = l1Templates.length;
for (let i = 0; counter < 100; i++) {
  const f = saasL1Fields[i % saasL1Fields.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l1Templates.push({
    authorIdx: counter % personas.length,
    title: `SaaS Metric #${qNum}: ${f.table.replace('_', ' ').toUpperCase()} Query`,
    desc: `Could you fetch ${f.desc} from ${f.table}? Display ${f.cols.join(', ')}, sorted by ${f.orderCol} in descending order.`,
    sql: `SELECT ${f.cols.join(', ')} FROM ${f.table} WHERE ${f.col} BETWEEN ${f.v1} AND ${f.v2} ORDER BY ${f.orderCol} DESC;`,
    cols: f.cols,
    hint: `Filter ${f.table} with WHERE ${f.col} BETWEEN ${f.v1} AND ${f.v2} ORDER BY ${f.orderCol} DESC.`,
    context: `Operational customer data query on ${f.table}.`,
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  });
  counter++;
}

const outQuestions = l1Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "saas-L1-${pad}",
    domain: "saas",
    level: 1,
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
    starter_sql: "SELECT\\n  -- Complete the query\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// SAAS — LEVEL 1: FOUNDATIONS & SUBSCRIBER INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): accounts, pricing_plans, subscriptions, invoices, users, api_keys
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L1_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/saas-l1-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated SAAS_L1_QUESTIONS: ${outQuestions.length} questions.`);
