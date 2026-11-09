import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L1-001",
    "domain": "saas",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "ACCOUNTS Directory Audit (Q1)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #1 - Samira Khan (CEO & Founder)]: Ahead of our quarterly audit, pull our active accounts records showing id and company_name as display_name, ordered by id ascending. Limit output to 11 records.\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, company_name AS display_name FROM accounts WHERE id >= 2 ORDER BY id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-002",
    "domain": "saas",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "PRICING PLANS Directory Audit (Q2)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #2 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ahead of our quarterly audit, pull our active pricing_plans records showing id and plan_name as display_name, ordered by id ascending. Limit output to 12 records.\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, plan_name AS display_name FROM pricing_plans WHERE id >= 3 ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-003",
    "domain": "saas",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "SUBSCRIPTIONS Directory Audit (Q3)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #3 - Chloe Vance (Head of Product Analytics)]: Ahead of our quarterly audit, pull our active subscriptions records showing id and plan as display_name, ordered by id ascending. Limit output to 13 records.\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, plan AS display_name FROM subscriptions WHERE id >= 4 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-004",
    "domain": "saas",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "INVOICES Directory Audit (Q4)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #4 - Liam Vance (Head of Customer Success)]: Ahead of our quarterly audit, pull our active invoices records showing id and account_id::text as display_name, ordered by id ascending. Limit output to 14 records.\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, account_id::text AS display_name FROM invoices WHERE id >= 5 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-005",
    "domain": "saas",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "USERS Directory Audit (Q5)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #5 - Samira Khan (CEO & Founder)]: Ahead of our quarterly audit, pull our active users records showing id and full_name as display_name, ordered by id ascending. Limit output to 15 records.\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, full_name AS display_name FROM users WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-006",
    "domain": "saas",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "API KEYS Directory Audit (Q6)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #6 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ahead of our quarterly audit, pull our active api_keys records showing id and key_name as display_name, ordered by id ascending. Limit output to 16 records.\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, key_name AS display_name FROM api_keys WHERE id >= 2 ORDER BY id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-007",
    "domain": "saas",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "FEATURE USAGE Directory Audit (Q7)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #7 - Chloe Vance (Head of Product Analytics)]: Ahead of our quarterly audit, pull our active feature_usage records showing id and feature_name as display_name, ordered by id ascending. Limit output to 17 records.\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, feature_name AS display_name FROM feature_usage WHERE id >= 3 ORDER BY id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-008",
    "domain": "saas",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "CLOUD CLUSTERS Directory Audit (Q8)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #8 - Liam Vance (Head of Customer Success)]: Ahead of our quarterly audit, pull our active cloud_clusters records showing id and cluster_name as display_name, ordered by id ascending. Limit output to 18 records.\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, cluster_name AS display_name FROM cloud_clusters WHERE id >= 4 ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-009",
    "domain": "saas",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "SUPPORT TICKETS Directory Audit (Q9)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #9 - Samira Khan (CEO & Founder)]: Ahead of our quarterly audit, pull our active support_tickets records showing id and priority as display_name, ordered by id ascending. Limit output to 19 records.\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, priority AS display_name FROM support_tickets WHERE id >= 5 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-010",
    "domain": "saas",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "CHURN EVENTS Directory Audit (Q10)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #10 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ahead of our quarterly audit, pull our active churn_events records showing id and reason as display_name, ordered by id ascending. Limit output to 20 records.\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, reason AS display_name FROM churn_events WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-011",
    "domain": "saas",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "INTEGRATIONS Directory Audit (Q11)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #11 - Chloe Vance (Head of Product Analytics)]: Ahead of our quarterly audit, pull our active integrations records showing id and provider as display_name, ordered by id ascending. Limit output to 21 records.\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, provider AS display_name FROM integrations WHERE id >= 2 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-012",
    "domain": "saas",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "AUDIT EVENTS Directory Audit (Q12)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #12 - Liam Vance (Head of Customer Success)]: Ahead of our quarterly audit, pull our active audit_events records showing id and action as display_name, ordered by id ascending. Limit output to 22 records.\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, action AS display_name FROM audit_events WHERE id >= 3 ORDER BY id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-013",
    "domain": "saas",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "NPS SURVEYS Directory Audit (Q13)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #13 - Samira Khan (CEO & Founder)]: Ahead of our quarterly audit, pull our active nps_surveys records showing id and account_id::text as display_name, ordered by id ascending. Limit output to 23 records.\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, account_id::text AS display_name FROM nps_surveys WHERE id >= 4 ORDER BY id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-014",
    "domain": "saas",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "FEATURE FLAGS Directory Audit (Q14)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #14 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ahead of our quarterly audit, pull our active feature_flags records showing id and flag_key as display_name, ordered by id ascending. Limit output to 24 records.\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, flag_key AS display_name FROM feature_flags WHERE id >= 5 ORDER BY id ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-015",
    "domain": "saas",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in accounts (Q15)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #15 - Chloe Vance (Head of Product Analytics)]: Identify high-volume entries in accounts. Select id, company_name AS item_title, and id AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 25;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, company_name AS item_title, id AS metric_val FROM accounts WHERE id >= 1 ORDER BY metric_val DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-016",
    "domain": "saas",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in pricing_plans (Q16)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #16 - Liam Vance (Head of Customer Success)]: Identify high-volume entries in pricing_plans. Select id, plan_name AS item_title, and monthly_price AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 26;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, plan_name AS item_title, monthly_price AS metric_val FROM pricing_plans WHERE id >= 2 ORDER BY metric_val DESC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-017",
    "domain": "saas",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in subscriptions (Q17)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #17 - Samira Khan (CEO & Founder)]: Identify high-volume entries in subscriptions. Select id, plan AS item_title, and mrr AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 27;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, plan AS item_title, mrr AS metric_val FROM subscriptions WHERE id >= 3 ORDER BY metric_val DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-018",
    "domain": "saas",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in invoices (Q18)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #18 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-volume entries in invoices. Select id, account_id::text AS item_title, and amount AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 28;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, account_id::text AS item_title, amount AS metric_val FROM invoices WHERE id >= 4 ORDER BY metric_val DESC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-019",
    "domain": "saas",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in users (Q19)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #19 - Chloe Vance (Head of Product Analytics)]: Identify high-volume entries in users. Select id, full_name AS item_title, and id AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 29;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, full_name AS item_title, id AS metric_val FROM users WHERE id >= 5 ORDER BY metric_val DESC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-020",
    "domain": "saas",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in api_keys (Q20)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #20 - Liam Vance (Head of Customer Success)]: Identify high-volume entries in api_keys. Select id, key_name AS item_title, and id AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 30;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, key_name AS item_title, id AS metric_val FROM api_keys WHERE id >= 1 ORDER BY metric_val DESC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-021",
    "domain": "saas",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in feature_usage (Q21)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #21 - Samira Khan (CEO & Founder)]: Identify high-volume entries in feature_usage. Select id, feature_name AS item_title, and monthly_events AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 31;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, feature_name AS item_title, monthly_events AS metric_val FROM feature_usage WHERE id >= 2 ORDER BY metric_val DESC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-022",
    "domain": "saas",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in cloud_clusters (Q22)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #22 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-volume entries in cloud_clusters. Select id, cluster_name AS item_title, and monthly_cost_usd AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 32;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, cluster_name AS item_title, monthly_cost_usd AS metric_val FROM cloud_clusters WHERE id >= 3 ORDER BY metric_val DESC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-023",
    "domain": "saas",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in support_tickets (Q23)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #23 - Chloe Vance (Head of Product Analytics)]: Identify high-volume entries in support_tickets. Select id, priority AS item_title, and resolution_hours AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 33;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, priority AS item_title, resolution_hours AS metric_val FROM support_tickets WHERE id >= 4 ORDER BY metric_val DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-024",
    "domain": "saas",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in churn_events (Q24)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #24 - Liam Vance (Head of Customer Success)]: Identify high-volume entries in churn_events. Select id, reason AS item_title, and arr_lost AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 34;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, reason AS item_title, arr_lost AS metric_val FROM churn_events WHERE id >= 5 ORDER BY metric_val DESC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-025",
    "domain": "saas",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in integrations (Q25)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #25 - Samira Khan (CEO & Founder)]: Identify high-volume entries in integrations. Select id, provider AS item_title, and id AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 35;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, provider AS item_title, id AS metric_val FROM integrations WHERE id >= 1 ORDER BY metric_val DESC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-026",
    "domain": "saas",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in audit_events (Q26)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #26 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-volume entries in audit_events. Select id, action AS item_title, and id AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 36;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, action AS item_title, id AS metric_val FROM audit_events WHERE id >= 2 ORDER BY metric_val DESC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-027",
    "domain": "saas",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in nps_surveys (Q27)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #27 - Chloe Vance (Head of Product Analytics)]: Identify high-volume entries in nps_surveys. Select id, account_id::text AS item_title, and score AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 37;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, account_id::text AS item_title, score AS metric_val FROM nps_surveys WHERE id >= 3 ORDER BY metric_val DESC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-028",
    "domain": "saas",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in feature_flags (Q28)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #28 - Liam Vance (Head of Customer Success)]: Identify high-volume entries in feature_flags. Select id, flag_key AS item_title, and id AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 38;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, flag_key AS item_title, id AS metric_val FROM feature_flags WHERE id >= 4 ORDER BY metric_val DESC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-029",
    "domain": "saas",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on accounts (Q29)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #29 - Samira Khan (CEO & Founder)]: Management is tracking midpoint distributions. Select id, company_name AS entity_name, and id AS val from accounts where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, company_name AS entity_name, id AS val FROM accounts WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-030",
    "domain": "saas",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on pricing_plans (Q30)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #30 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Management is tracking midpoint distributions. Select id, plan_name AS entity_name, and monthly_price AS val from pricing_plans where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, plan_name AS entity_name, monthly_price AS val FROM pricing_plans WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "saas-L1-031",
    "domain": "saas",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on subscriptions (Q31)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #31 - Chloe Vance (Head of Product Analytics)]: Management is tracking midpoint distributions. Select id, plan AS entity_name, and mrr AS val from subscriptions where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, plan AS entity_name, mrr AS val FROM subscriptions WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-032",
    "domain": "saas",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on invoices (Q32)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #32 - Liam Vance (Head of Customer Success)]: Management is tracking midpoint distributions. Select id, account_id::text AS entity_name, and amount AS val from invoices where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, account_id::text AS entity_name, amount AS val FROM invoices WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-033",
    "domain": "saas",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on users (Q33)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #33 - Samira Khan (CEO & Founder)]: Management is tracking midpoint distributions. Select id, full_name AS entity_name, and id AS val from users where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, full_name AS entity_name, id AS val FROM users WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-034",
    "domain": "saas",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on api_keys (Q34)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #34 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Management is tracking midpoint distributions. Select id, key_name AS entity_name, and id AS val from api_keys where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, key_name AS entity_name, id AS val FROM api_keys WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-035",
    "domain": "saas",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on feature_usage (Q35)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #35 - Chloe Vance (Head of Product Analytics)]: Management is tracking midpoint distributions. Select id, feature_name AS entity_name, and monthly_events AS val from feature_usage where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, feature_name AS entity_name, monthly_events AS val FROM feature_usage WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-036",
    "domain": "saas",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on cloud_clusters (Q36)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #36 - Liam Vance (Head of Customer Success)]: Management is tracking midpoint distributions. Select id, cluster_name AS entity_name, and monthly_cost_usd AS val from cloud_clusters where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, cluster_name AS entity_name, monthly_cost_usd AS val FROM cloud_clusters WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-037",
    "domain": "saas",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on support_tickets (Q37)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #37 - Samira Khan (CEO & Founder)]: Management is tracking midpoint distributions. Select id, priority AS entity_name, and resolution_hours AS val from support_tickets where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, priority AS entity_name, resolution_hours AS val FROM support_tickets WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-038",
    "domain": "saas",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on churn_events (Q38)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #38 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Management is tracking midpoint distributions. Select id, reason AS entity_name, and arr_lost AS val from churn_events where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, reason AS entity_name, arr_lost AS val FROM churn_events WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-039",
    "domain": "saas",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on integrations (Q39)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #39 - Chloe Vance (Head of Product Analytics)]: Management is tracking midpoint distributions. Select id, provider AS entity_name, and id AS val from integrations where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, provider AS entity_name, id AS val FROM integrations WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-040",
    "domain": "saas",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on audit_events (Q40)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #40 - Liam Vance (Head of Customer Success)]: Management is tracking midpoint distributions. Select id, action AS entity_name, and id AS val from audit_events where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 50;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, action AS entity_name, id AS val FROM audit_events WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-041",
    "domain": "saas",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on nps_surveys (Q41)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #41 - Samira Khan (CEO & Founder)]: Management is tracking midpoint distributions. Select id, account_id::text AS entity_name, and score AS val from nps_surveys where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 51;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, account_id::text AS entity_name, score AS val FROM nps_surveys WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-042",
    "domain": "saas",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on feature_flags (Q42)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #42 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Management is tracking midpoint distributions. Select id, flag_key AS entity_name, and id AS val from feature_flags where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 52;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, flag_key AS entity_name, id AS val FROM feature_flags WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-043",
    "domain": "saas",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in accounts (Q43)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #43 - Chloe Vance (Head of Product Analytics)]: Ensure robust reporting against missing values. Select id, company_name AS entry_name, and COALESCE(id, 0.00) AS safe_val from accounts WHERE id >= 4 ORDER BY id ASC LIMIT 53;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, company_name AS entry_name, COALESCE(id, 0.00) AS safe_val FROM accounts WHERE id >= 4 ORDER BY id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-044",
    "domain": "saas",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in pricing_plans (Q44)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #44 - Liam Vance (Head of Customer Success)]: Ensure robust reporting against missing values. Select id, plan_name AS entry_name, and COALESCE(monthly_price, 0.00) AS safe_val from pricing_plans WHERE id >= 5 ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "monthly_price",
      "safe_val"
    ],
    "reference_sql": "SELECT id, plan_name AS entry_name, COALESCE(monthly_price, 0.00) AS safe_val FROM pricing_plans WHERE id >= 5 ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-045",
    "domain": "saas",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in subscriptions (Q45)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #45 - Samira Khan (CEO & Founder)]: Ensure robust reporting against missing values. Select id, plan AS entry_name, and COALESCE(mrr, 0.00) AS safe_val from subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "mrr",
      "safe_val"
    ],
    "reference_sql": "SELECT id, plan AS entry_name, COALESCE(mrr, 0.00) AS safe_val FROM subscriptions WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-046",
    "domain": "saas",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in invoices (Q46)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #46 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ensure robust reporting against missing values. Select id, account_id::text AS entry_name, and COALESCE(amount, 0.00) AS safe_val from invoices WHERE id >= 2 ORDER BY id ASC LIMIT 56;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "amount",
      "safe_val"
    ],
    "reference_sql": "SELECT id, account_id::text AS entry_name, COALESCE(amount, 0.00) AS safe_val FROM invoices WHERE id >= 2 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-047",
    "domain": "saas",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in users (Q47)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #47 - Chloe Vance (Head of Product Analytics)]: Ensure robust reporting against missing values. Select id, full_name AS entry_name, and COALESCE(id, 0.00) AS safe_val from users WHERE id >= 3 ORDER BY id ASC LIMIT 57;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, full_name AS entry_name, COALESCE(id, 0.00) AS safe_val FROM users WHERE id >= 3 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-048",
    "domain": "saas",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in api_keys (Q48)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #48 - Liam Vance (Head of Customer Success)]: Ensure robust reporting against missing values. Select id, key_name AS entry_name, and COALESCE(id, 0.00) AS safe_val from api_keys WHERE id >= 4 ORDER BY id ASC LIMIT 58;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, key_name AS entry_name, COALESCE(id, 0.00) AS safe_val FROM api_keys WHERE id >= 4 ORDER BY id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-049",
    "domain": "saas",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in feature_usage (Q49)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #49 - Samira Khan (CEO & Founder)]: Ensure robust reporting against missing values. Select id, feature_name AS entry_name, and COALESCE(monthly_events, 0.00) AS safe_val from feature_usage WHERE id >= 5 ORDER BY id ASC LIMIT 59;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "monthly_events",
      "safe_val"
    ],
    "reference_sql": "SELECT id, feature_name AS entry_name, COALESCE(monthly_events, 0.00) AS safe_val FROM feature_usage WHERE id >= 5 ORDER BY id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-050",
    "domain": "saas",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in cloud_clusters (Q50)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #50 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ensure robust reporting against missing values. Select id, cluster_name AS entry_name, and COALESCE(monthly_cost_usd, 0.00) AS safe_val from cloud_clusters WHERE id >= 1 ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "monthly_cost_usd",
      "safe_val"
    ],
    "reference_sql": "SELECT id, cluster_name AS entry_name, COALESCE(monthly_cost_usd, 0.00) AS safe_val FROM cloud_clusters WHERE id >= 1 ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-051",
    "domain": "saas",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in support_tickets (Q51)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #51 - Chloe Vance (Head of Product Analytics)]: Ensure robust reporting against missing values. Select id, priority AS entry_name, and COALESCE(resolution_hours, 0.00) AS safe_val from support_tickets WHERE id >= 2 ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "resolution_hours",
      "safe_val"
    ],
    "reference_sql": "SELECT id, priority AS entry_name, COALESCE(resolution_hours, 0.00) AS safe_val FROM support_tickets WHERE id >= 2 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-052",
    "domain": "saas",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in churn_events (Q52)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #52 - Liam Vance (Head of Customer Success)]: Ensure robust reporting against missing values. Select id, reason AS entry_name, and COALESCE(arr_lost, 0.00) AS safe_val from churn_events WHERE id >= 3 ORDER BY id ASC LIMIT 62;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "arr_lost",
      "safe_val"
    ],
    "reference_sql": "SELECT id, reason AS entry_name, COALESCE(arr_lost, 0.00) AS safe_val FROM churn_events WHERE id >= 3 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-053",
    "domain": "saas",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in integrations (Q53)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #53 - Samira Khan (CEO & Founder)]: Ensure robust reporting against missing values. Select id, provider AS entry_name, and COALESCE(id, 0.00) AS safe_val from integrations WHERE id >= 4 ORDER BY id ASC LIMIT 63;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, provider AS entry_name, COALESCE(id, 0.00) AS safe_val FROM integrations WHERE id >= 4 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-054",
    "domain": "saas",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in audit_events (Q54)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #54 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Ensure robust reporting against missing values. Select id, action AS entry_name, and COALESCE(id, 0.00) AS safe_val from audit_events WHERE id >= 5 ORDER BY id ASC LIMIT 64;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, action AS entry_name, COALESCE(id, 0.00) AS safe_val FROM audit_events WHERE id >= 5 ORDER BY id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-055",
    "domain": "saas",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in nps_surveys (Q55)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #55 - Chloe Vance (Head of Product Analytics)]: Ensure robust reporting against missing values. Select id, account_id::text AS entry_name, and COALESCE(score, 0.00) AS safe_val from nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 65;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "score",
      "safe_val"
    ],
    "reference_sql": "SELECT id, account_id::text AS entry_name, COALESCE(score, 0.00) AS safe_val FROM nps_surveys WHERE id >= 1 ORDER BY id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-056",
    "domain": "saas",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in feature_flags (Q56)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #56 - Liam Vance (Head of Customer Success)]: Ensure robust reporting against missing values. Select id, flag_key AS entry_name, and COALESCE(id, 0.00) AS safe_val from feature_flags WHERE id >= 2 ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, flag_key AS entry_name, COALESCE(id, 0.00) AS safe_val FROM feature_flags WHERE id >= 2 ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-057",
    "domain": "saas",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "String Normalization on accounts (Q57)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #57 - Samira Khan (CEO & Founder)]: Standardize text fields in accounts. Select id, UPPER(TRIM(company_name::text)) AS clean_name from accounts WHERE company_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(company_name::text)) AS clean_name FROM accounts WHERE company_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-058",
    "domain": "saas",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "String Normalization on pricing_plans (Q58)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #58 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Standardize text fields in pricing_plans. Select id, UPPER(TRIM(plan_name::text)) AS clean_name from pricing_plans WHERE plan_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(plan_name::text)) AS clean_name FROM pricing_plans WHERE plan_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-059",
    "domain": "saas",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "String Normalization on subscriptions (Q59)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #59 - Chloe Vance (Head of Product Analytics)]: Standardize text fields in subscriptions. Select id, UPPER(TRIM(plan::text)) AS clean_name from subscriptions WHERE plan IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(plan::text)) AS clean_name FROM subscriptions WHERE plan IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-060",
    "domain": "saas",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "String Normalization on invoices (Q60)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #60 - Liam Vance (Head of Customer Success)]: Standardize text fields in invoices. Select id, UPPER(TRIM(account_id::text::text)) AS clean_name from invoices WHERE account_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(account_id::text::text)) AS clean_name FROM invoices WHERE account_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-061",
    "domain": "saas",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "String Normalization on users (Q61)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #61 - Samira Khan (CEO & Founder)]: Standardize text fields in users. Select id, UPPER(TRIM(full_name::text)) AS clean_name from users WHERE full_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(full_name::text)) AS clean_name FROM users WHERE full_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-062",
    "domain": "saas",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "String Normalization on api_keys (Q62)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #62 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Standardize text fields in api_keys. Select id, UPPER(TRIM(key_name::text)) AS clean_name from api_keys WHERE key_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(key_name::text)) AS clean_name FROM api_keys WHERE key_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-063",
    "domain": "saas",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "String Normalization on feature_usage (Q63)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #63 - Chloe Vance (Head of Product Analytics)]: Standardize text fields in feature_usage. Select id, UPPER(TRIM(feature_name::text)) AS clean_name from feature_usage WHERE feature_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(feature_name::text)) AS clean_name FROM feature_usage WHERE feature_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-064",
    "domain": "saas",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "String Normalization on cloud_clusters (Q64)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #64 - Liam Vance (Head of Customer Success)]: Standardize text fields in cloud_clusters. Select id, UPPER(TRIM(cluster_name::text)) AS clean_name from cloud_clusters WHERE cluster_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(cluster_name::text)) AS clean_name FROM cloud_clusters WHERE cluster_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-065",
    "domain": "saas",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "String Normalization on support_tickets (Q65)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #65 - Samira Khan (CEO & Founder)]: Standardize text fields in support_tickets. Select id, UPPER(TRIM(priority::text)) AS clean_name from support_tickets WHERE priority IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(priority::text)) AS clean_name FROM support_tickets WHERE priority IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-066",
    "domain": "saas",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "String Normalization on churn_events (Q66)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #66 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Standardize text fields in churn_events. Select id, UPPER(TRIM(reason::text)) AS clean_name from churn_events WHERE reason IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 76;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(reason::text)) AS clean_name FROM churn_events WHERE reason IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-067",
    "domain": "saas",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "String Normalization on integrations (Q67)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #67 - Chloe Vance (Head of Product Analytics)]: Standardize text fields in integrations. Select id, UPPER(TRIM(provider::text)) AS clean_name from integrations WHERE provider IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 77;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(provider::text)) AS clean_name FROM integrations WHERE provider IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-068",
    "domain": "saas",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "String Normalization on audit_events (Q68)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #68 - Liam Vance (Head of Customer Success)]: Standardize text fields in audit_events. Select id, UPPER(TRIM(action::text)) AS clean_name from audit_events WHERE action IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(action::text)) AS clean_name FROM audit_events WHERE action IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-069",
    "domain": "saas",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "String Normalization on nps_surveys (Q69)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #69 - Samira Khan (CEO & Founder)]: Standardize text fields in nps_surveys. Select id, UPPER(TRIM(account_id::text::text)) AS clean_name from nps_surveys WHERE account_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 79;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(account_id::text::text)) AS clean_name FROM nps_surveys WHERE account_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-070",
    "domain": "saas",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "String Normalization on feature_flags (Q70)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #70 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Standardize text fields in feature_flags. Select id, UPPER(TRIM(flag_key::text)) AS clean_name from feature_flags WHERE flag_key IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 80;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(flag_key::text)) AS clean_name FROM feature_flags WHERE flag_key IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "saas-L1-071",
    "domain": "saas",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Category Classification in accounts (Q71)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #71 - Chloe Vance (Head of Product Analytics)]: Review our unique classification segments in accounts. Select DISTINCT industry AS category_label from accounts WHERE industry IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT industry AS category_label FROM accounts WHERE industry IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-072",
    "domain": "saas",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Category Classification in pricing_plans (Q72)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #72 - Liam Vance (Head of Customer Success)]: Review our unique classification segments in pricing_plans. Select DISTINCT plan_name AS category_label from pricing_plans WHERE plan_name IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT plan_name AS category_label FROM pricing_plans WHERE plan_name IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-073",
    "domain": "saas",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Category Classification in subscriptions (Q73)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #73 - Samira Khan (CEO & Founder)]: Review our unique classification segments in subscriptions. Select DISTINCT status AS category_label from subscriptions WHERE status IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM subscriptions WHERE status IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-074",
    "domain": "saas",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Category Classification in invoices (Q74)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #74 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Review our unique classification segments in invoices. Select DISTINCT is_paid::text AS category_label from invoices WHERE is_paid::text IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT is_paid::text AS category_label FROM invoices WHERE is_paid::text IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-075",
    "domain": "saas",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Category Classification in users (Q75)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #75 - Chloe Vance (Head of Product Analytics)]: Review our unique classification segments in users. Select DISTINCT role AS category_label from users WHERE role IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT role AS category_label FROM users WHERE role IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-076",
    "domain": "saas",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Category Classification in api_keys (Q76)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #76 - Liam Vance (Head of Customer Success)]: Review our unique classification segments in api_keys. Select DISTINCT key_name AS category_label from api_keys WHERE key_name IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT key_name AS category_label FROM api_keys WHERE key_name IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-077",
    "domain": "saas",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Category Classification in feature_usage (Q77)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #77 - Samira Khan (CEO & Founder)]: Review our unique classification segments in feature_usage. Select DISTINCT feature_name AS category_label from feature_usage WHERE feature_name IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT feature_name AS category_label FROM feature_usage WHERE feature_name IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-078",
    "domain": "saas",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Category Classification in cloud_clusters (Q78)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #78 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Review our unique classification segments in cloud_clusters. Select DISTINCT cloud_provider AS category_label from cloud_clusters WHERE cloud_provider IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT cloud_provider AS category_label FROM cloud_clusters WHERE cloud_provider IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-079",
    "domain": "saas",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Category Classification in support_tickets (Q79)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #79 - Chloe Vance (Head of Product Analytics)]: Review our unique classification segments in support_tickets. Select DISTINCT status AS category_label from support_tickets WHERE status IS NOT NULL AND id <= 129 ORDER BY category_label ASC LIMIT 89;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM support_tickets WHERE status IS NOT NULL AND id <= 129 ORDER BY category_label ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-080",
    "domain": "saas",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Category Classification in churn_events (Q80)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #80 - Liam Vance (Head of Customer Success)]: Review our unique classification segments in churn_events. Select DISTINCT reason AS category_label from churn_events WHERE reason IS NOT NULL AND id <= 130 ORDER BY category_label ASC LIMIT 90;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT reason AS category_label FROM churn_events WHERE reason IS NOT NULL AND id <= 130 ORDER BY category_label ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-081",
    "domain": "saas",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Category Classification in integrations (Q81)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #81 - Samira Khan (CEO & Founder)]: Review our unique classification segments in integrations. Select DISTINCT provider AS category_label from integrations WHERE provider IS NOT NULL AND id <= 131 ORDER BY category_label ASC LIMIT 91;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT provider AS category_label FROM integrations WHERE provider IS NOT NULL AND id <= 131 ORDER BY category_label ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-082",
    "domain": "saas",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Category Classification in audit_events (Q82)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #82 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Review our unique classification segments in audit_events. Select DISTINCT action AS category_label from audit_events WHERE action IS NOT NULL AND id <= 132 ORDER BY category_label ASC LIMIT 92;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT action AS category_label FROM audit_events WHERE action IS NOT NULL AND id <= 132 ORDER BY category_label ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-083",
    "domain": "saas",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Category Classification in nps_surveys (Q83)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #83 - Chloe Vance (Head of Product Analytics)]: Review our unique classification segments in nps_surveys. Select DISTINCT account_id::text AS category_label from nps_surveys WHERE account_id::text IS NOT NULL AND id <= 133 ORDER BY category_label ASC LIMIT 93;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT account_id::text AS category_label FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 133 ORDER BY category_label ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-084",
    "domain": "saas",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Category Classification in feature_flags (Q84)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #84 - Liam Vance (Head of Customer Success)]: Review our unique classification segments in feature_flags. Select DISTINCT min_tier AS category_label from feature_flags WHERE min_tier IS NOT NULL AND id <= 134 ORDER BY category_label ASC LIMIT 94;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT min_tier AS category_label FROM feature_flags WHERE min_tier IS NOT NULL AND id <= 134 ORDER BY category_label ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-085",
    "domain": "saas",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Margin Projection on accounts (Q85)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #85 - Samira Khan (CEO & Founder)]: Calculate financial inflation adjustment. Select id, company_name AS label, and ROUND((id * 1.07)::numeric, 2) AS projected_metric from accounts WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, company_name AS label, ROUND((id * 1.07)::numeric, 2) AS projected_metric FROM accounts WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-086",
    "domain": "saas",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Margin Projection on pricing_plans (Q86)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #86 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate financial inflation adjustment. Select id, plan_name AS label, and ROUND((monthly_price * 1.08)::numeric, 2) AS projected_metric from pricing_plans WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, plan_name AS label, ROUND((monthly_price * 1.08)::numeric, 2) AS projected_metric FROM pricing_plans WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-087",
    "domain": "saas",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Margin Projection on subscriptions (Q87)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #87 - Chloe Vance (Head of Product Analytics)]: Calculate financial inflation adjustment. Select id, plan AS label, and ROUND((mrr * 1.09)::numeric, 2) AS projected_metric from subscriptions WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;\"",
    "context_notes": "Level 1 Foundational single-table query on subscriptions.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, plan AS label, ROUND((mrr * 1.09)::numeric, 2) AS projected_metric FROM subscriptions WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table subscriptions."
    ],
    "solution_explanation": "Retrieves records from subscriptions applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-088",
    "domain": "saas",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Margin Projection on invoices (Q88)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #88 - Liam Vance (Head of Customer Success)]: Calculate financial inflation adjustment. Select id, account_id::text AS label, and ROUND((amount * 1.10)::numeric, 2) AS projected_metric from invoices WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;\"",
    "context_notes": "Level 1 Foundational single-table query on invoices.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, account_id::text AS label, ROUND((amount * 1.10)::numeric, 2) AS projected_metric FROM invoices WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table invoices."
    ],
    "solution_explanation": "Retrieves records from invoices applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-089",
    "domain": "saas",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Margin Projection on users (Q89)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #89 - Samira Khan (CEO & Founder)]: Calculate financial inflation adjustment. Select id, full_name AS label, and ROUND((id * 1.11)::numeric, 2) AS projected_metric from users WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;\"",
    "context_notes": "Level 1 Foundational single-table query on users.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, full_name AS label, ROUND((id * 1.11)::numeric, 2) AS projected_metric FROM users WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table users."
    ],
    "solution_explanation": "Retrieves records from users applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-090",
    "domain": "saas",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Margin Projection on api_keys (Q90)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #90 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate financial inflation adjustment. Select id, key_name AS label, and ROUND((id * 1.02)::numeric, 2) AS projected_metric from api_keys WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;\"",
    "context_notes": "Level 1 Foundational single-table query on api_keys.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, key_name AS label, ROUND((id * 1.02)::numeric, 2) AS projected_metric FROM api_keys WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table api_keys."
    ],
    "solution_explanation": "Retrieves records from api_keys applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "saas-L1-091",
    "domain": "saas",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Margin Projection on feature_usage (Q91)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #91 - Chloe Vance (Head of Product Analytics)]: Calculate financial inflation adjustment. Select id, feature_name AS label, and ROUND((monthly_events * 1.03)::numeric, 2) AS projected_metric from feature_usage WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_usage.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, feature_name AS label, ROUND((monthly_events * 1.03)::numeric, 2) AS projected_metric FROM feature_usage WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_usage."
    ],
    "solution_explanation": "Retrieves records from feature_usage applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-092",
    "domain": "saas",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Margin Projection on cloud_clusters (Q92)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #92 - Liam Vance (Head of Customer Success)]: Calculate financial inflation adjustment. Select id, cluster_name AS label, and ROUND((monthly_cost_usd * 1.04)::numeric, 2) AS projected_metric from cloud_clusters WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 102;\"",
    "context_notes": "Level 1 Foundational single-table query on cloud_clusters.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, cluster_name AS label, ROUND((monthly_cost_usd * 1.04)::numeric, 2) AS projected_metric FROM cloud_clusters WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table cloud_clusters."
    ],
    "solution_explanation": "Retrieves records from cloud_clusters applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-093",
    "domain": "saas",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Margin Projection on support_tickets (Q93)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #93 - Samira Khan (CEO & Founder)]: Calculate financial inflation adjustment. Select id, priority AS label, and ROUND((resolution_hours * 1.05)::numeric, 2) AS projected_metric from support_tickets WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 103;\"",
    "context_notes": "Level 1 Foundational single-table query on support_tickets.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, priority AS label, ROUND((resolution_hours * 1.05)::numeric, 2) AS projected_metric FROM support_tickets WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table support_tickets."
    ],
    "solution_explanation": "Retrieves records from support_tickets applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-094",
    "domain": "saas",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Margin Projection on churn_events (Q94)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #94 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate financial inflation adjustment. Select id, reason AS label, and ROUND((arr_lost * 1.06)::numeric, 2) AS projected_metric from churn_events WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 104;\"",
    "context_notes": "Level 1 Foundational single-table query on churn_events.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, reason AS label, ROUND((arr_lost * 1.06)::numeric, 2) AS projected_metric FROM churn_events WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table churn_events."
    ],
    "solution_explanation": "Retrieves records from churn_events applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-095",
    "domain": "saas",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Margin Projection on integrations (Q95)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #95 - Chloe Vance (Head of Product Analytics)]: Calculate financial inflation adjustment. Select id, provider AS label, and ROUND((id * 1.07)::numeric, 2) AS projected_metric from integrations WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 105;\"",
    "context_notes": "Level 1 Foundational single-table query on integrations.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, provider AS label, ROUND((id * 1.07)::numeric, 2) AS projected_metric FROM integrations WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table integrations."
    ],
    "solution_explanation": "Retrieves records from integrations applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-096",
    "domain": "saas",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Margin Projection on audit_events (Q96)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #96 - Liam Vance (Head of Customer Success)]: Calculate financial inflation adjustment. Select id, action AS label, and ROUND((id * 1.08)::numeric, 2) AS projected_metric from audit_events WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 106;\"",
    "context_notes": "Level 1 Foundational single-table query on audit_events.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, action AS label, ROUND((id * 1.08)::numeric, 2) AS projected_metric FROM audit_events WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table audit_events."
    ],
    "solution_explanation": "Retrieves records from audit_events applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-097",
    "domain": "saas",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Margin Projection on nps_surveys (Q97)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #97 - Samira Khan (CEO & Founder)]: Calculate financial inflation adjustment. Select id, account_id::text AS label, and ROUND((score * 1.09)::numeric, 2) AS projected_metric from nps_surveys WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 107;\"",
    "context_notes": "Level 1 Foundational single-table query on nps_surveys.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, account_id::text AS label, ROUND((score * 1.09)::numeric, 2) AS projected_metric FROM nps_surveys WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table nps_surveys."
    ],
    "solution_explanation": "Retrieves records from nps_surveys applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-098",
    "domain": "saas",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Margin Projection on feature_flags (Q98)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #98 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate financial inflation adjustment. Select id, flag_key AS label, and ROUND((id * 1.10)::numeric, 2) AS projected_metric from feature_flags WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 108;\"",
    "context_notes": "Level 1 Foundational single-table query on feature_flags.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, flag_key AS label, ROUND((id * 1.10)::numeric, 2) AS projected_metric FROM feature_flags WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table feature_flags."
    ],
    "solution_explanation": "Retrieves records from feature_flags applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-099",
    "domain": "saas",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Status Segment Inspection in accounts (Q99)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #99 - Chloe Vance (Head of Product Analytics)]: Extract active records from accounts. Select id, company_name AS item_name, and industry AS tag from accounts WHERE industry IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 1 Foundational single-table query on accounts.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, company_name AS item_name, industry AS tag FROM accounts WHERE industry IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table accounts."
    ],
    "solution_explanation": "Retrieves records from accounts applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "saas-L1-100",
    "domain": "saas",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Status Segment Inspection in pricing_plans (Q100)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #100 - Liam Vance (Head of Customer Success)]: Extract active records from pricing_plans. Select id, plan_name AS item_name, and plan_name AS tag from pricing_plans WHERE plan_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;\"",
    "context_notes": "Level 1 Foundational single-table query on pricing_plans.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, plan_name AS item_name, plan_name AS tag FROM pricing_plans WHERE plan_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table pricing_plans."
    ],
    "solution_explanation": "Retrieves records from pricing_plans applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  }
];
