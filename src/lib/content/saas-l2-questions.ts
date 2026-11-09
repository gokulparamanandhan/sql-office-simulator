import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L2-001",
    "domain": "saas",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: subscriptions and accounts (Q1)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #1 - Samira Khan (CEO & Founder)]: Connect subscriptions with accounts. Return t.id, t.plan AS child_ref, and p.company_name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 11;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.plan AS child_ref, p.company_name AS parent_name FROM subscriptions t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-002",
    "domain": "saas",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Volume Distribution: invoices by is_paid::text (Q2)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #2 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in invoices by is_paid::text. Return is_paid::text AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 12;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS group_label, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-003",
    "domain": "saas",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in accounts (Q3)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #3 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining users to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 13;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN users t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-004",
    "domain": "saas",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in api_keys (Q4)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #4 - Liam Vance (Head of Customer Success)]: Identify high-density segments in api_keys. Group by key_name, calculating record_count, having COUNT(*) >= 1 and id <= 54, ordered descending LIMIT 14;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS segment_key, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id <= 54 GROUP BY key_name HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-005",
    "domain": "saas",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q5)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #5 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to feature_usage. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 15;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-006",
    "domain": "saas",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on support_tickets (Q6)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #6 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average resolution_hours per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.resolution_hours::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric FROM accounts p JOIN support_tickets t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-007",
    "domain": "saas",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: churn_events and accounts (Q7)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #7 - Chloe Vance (Head of Product Analytics)]: Connect churn_events with accounts. Return t.id, t.reason AS child_ref, and p.company_name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 17;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.reason AS child_ref, p.company_name AS parent_name FROM churn_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-008",
    "domain": "saas",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Volume Distribution: integrations by provider (Q8)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #8 - Liam Vance (Head of Customer Success)]: Summarize volume in integrations by provider. Return provider AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 18;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS group_label, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-009",
    "domain": "saas",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in accounts (Q9)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #9 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining audit_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-010",
    "domain": "saas",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in nps_surveys (Q10)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #10 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in nps_surveys. Group by account_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 60, ordered descending LIMIT 20;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS segment_key, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 60 GROUP BY account_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-011",
    "domain": "saas",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q11)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #11 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to subscriptions. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 21;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-012",
    "domain": "saas",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on invoices (Q12)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #12 - Liam Vance (Head of Customer Success)]: Calculate average amount per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.amount::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.amount::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.amount::numeric), 2) AS avg_metric FROM accounts p JOIN invoices t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-013",
    "domain": "saas",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: users and accounts (Q13)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #13 - Samira Khan (CEO & Founder)]: Connect users with accounts. Return t.id, t.full_name AS child_ref, and p.company_name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 23;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS child_ref, p.company_name AS parent_name FROM users t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-014",
    "domain": "saas",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Volume Distribution: api_keys by key_name (Q14)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #14 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in api_keys by key_name. Return key_name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 24;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS group_label, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-015",
    "domain": "saas",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in accounts (Q15)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #15 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining feature_usage to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 25;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-016",
    "domain": "saas",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in support_tickets (Q16)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #16 - Liam Vance (Head of Customer Success)]: Identify high-density segments in support_tickets. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 66, ordered descending LIMIT 26;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id <= 66 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-017",
    "domain": "saas",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q17)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #17 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to churn_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 27;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-018",
    "domain": "saas",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on integrations (Q18)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #18 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN integrations t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-019",
    "domain": "saas",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: audit_events and accounts (Q19)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #19 - Chloe Vance (Head of Product Analytics)]: Connect audit_events with accounts. Return t.id, t.action AS child_ref, and p.company_name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 29;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.action AS child_ref, p.company_name AS parent_name FROM audit_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-020",
    "domain": "saas",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Volume Distribution: nps_surveys by account_id::text (Q20)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #20 - Liam Vance (Head of Customer Success)]: Summarize volume in nps_surveys by account_id::text. Return account_id::text AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 30;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS group_label, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "saas-L2-021",
    "domain": "saas",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q21)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #21 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining subscriptions to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 31;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-022",
    "domain": "saas",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in invoices (Q22)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #22 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in invoices. Group by is_paid::text, calculating record_count, having COUNT(*) >= 1 and id <= 72, ordered descending LIMIT 32;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS segment_key, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id <= 72 GROUP BY is_paid::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-023",
    "domain": "saas",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q23)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #23 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to users. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 33;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN users t ON p.id = t.account_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-024",
    "domain": "saas",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Financial Metric Rollup on api_keys (Q24)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #24 - Liam Vance (Head of Customer Success)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN api_keys t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-025",
    "domain": "saas",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Relational Cross-Link: feature_usage and accounts (Q25)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #25 - Samira Khan (CEO & Founder)]: Connect feature_usage with accounts. Return t.id, t.feature_name AS child_ref, and p.company_name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 35;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS child_ref, p.company_name AS parent_name FROM feature_usage t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-026",
    "domain": "saas",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Volume Distribution: support_tickets by status (Q26)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #26 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in support_tickets by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 36;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-027",
    "domain": "saas",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q27)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #27 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining churn_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 37;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-028",
    "domain": "saas",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in integrations (Q28)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #28 - Liam Vance (Head of Customer Success)]: Identify high-density segments in integrations. Group by provider, calculating record_count, having COUNT(*) >= 1 and id <= 78, ordered descending LIMIT 38;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS segment_key, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id <= 78 GROUP BY provider HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-029",
    "domain": "saas",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q29)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #29 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to audit_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 39;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-030",
    "domain": "saas",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Financial Metric Rollup on nps_surveys (Q30)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #30 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average score per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM accounts p JOIN nps_surveys t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-031",
    "domain": "saas",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Relational Cross-Link: subscriptions and accounts (Q31)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #31 - Chloe Vance (Head of Product Analytics)]: Connect subscriptions with accounts. Return t.id, t.plan AS child_ref, and p.company_name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 41;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.plan AS child_ref, p.company_name AS parent_name FROM subscriptions t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-032",
    "domain": "saas",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Volume Distribution: invoices by is_paid::text (Q32)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #32 - Liam Vance (Head of Customer Success)]: Summarize volume in invoices by is_paid::text. Return is_paid::text AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 42;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS group_label, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-033",
    "domain": "saas",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q33)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #33 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining users to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 43;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN users t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-034",
    "domain": "saas",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in api_keys (Q34)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #34 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in api_keys. Group by key_name, calculating record_count, having COUNT(*) >= 1 and id <= 84, ordered descending LIMIT 44;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS segment_key, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id <= 84 GROUP BY key_name HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-035",
    "domain": "saas",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q35)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #35 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to feature_usage. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 45;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-036",
    "domain": "saas",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Financial Metric Rollup on support_tickets (Q36)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #36 - Liam Vance (Head of Customer Success)]: Calculate average resolution_hours per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.resolution_hours::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric FROM accounts p JOIN support_tickets t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-037",
    "domain": "saas",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Relational Cross-Link: churn_events and accounts (Q37)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #37 - Samira Khan (CEO & Founder)]: Connect churn_events with accounts. Return t.id, t.reason AS child_ref, and p.company_name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 47;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.reason AS child_ref, p.company_name AS parent_name FROM churn_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-038",
    "domain": "saas",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Volume Distribution: integrations by provider (Q38)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #38 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in integrations by provider. Return provider AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 48;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS group_label, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-039",
    "domain": "saas",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q39)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #39 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining audit_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 49;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-040",
    "domain": "saas",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in nps_surveys (Q40)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #40 - Liam Vance (Head of Customer Success)]: Identify high-density segments in nps_surveys. Group by account_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 90, ordered descending LIMIT 50;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS segment_key, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 90 GROUP BY account_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-041",
    "domain": "saas",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q41)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #41 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to subscriptions. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 51;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-042",
    "domain": "saas",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Financial Metric Rollup on invoices (Q42)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #42 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average amount per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.amount::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.amount::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.amount::numeric), 2) AS avg_metric FROM accounts p JOIN invoices t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-043",
    "domain": "saas",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Relational Cross-Link: users and accounts (Q43)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #43 - Chloe Vance (Head of Product Analytics)]: Connect users with accounts. Return t.id, t.full_name AS child_ref, and p.company_name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 53;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS child_ref, p.company_name AS parent_name FROM users t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-044",
    "domain": "saas",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Volume Distribution: api_keys by key_name (Q44)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #44 - Liam Vance (Head of Customer Success)]: Summarize volume in api_keys by key_name. Return key_name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 54;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS group_label, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-045",
    "domain": "saas",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q45)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #45 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining feature_usage to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 55;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-046",
    "domain": "saas",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in support_tickets (Q46)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #46 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in support_tickets. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 96, ordered descending LIMIT 56;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id <= 96 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-047",
    "domain": "saas",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q47)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #47 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to churn_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 57;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-048",
    "domain": "saas",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Financial Metric Rollup on integrations (Q48)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #48 - Liam Vance (Head of Customer Success)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN integrations t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-049",
    "domain": "saas",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Relational Cross-Link: audit_events and accounts (Q49)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #49 - Samira Khan (CEO & Founder)]: Connect audit_events with accounts. Return t.id, t.action AS child_ref, and p.company_name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 59;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.action AS child_ref, p.company_name AS parent_name FROM audit_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-050",
    "domain": "saas",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Volume Distribution: nps_surveys by account_id::text (Q50)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #50 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in nps_surveys by account_id::text. Return account_id::text AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 60;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS group_label, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-051",
    "domain": "saas",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q51)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #51 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining subscriptions to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-052",
    "domain": "saas",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in invoices (Q52)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #52 - Liam Vance (Head of Customer Success)]: Identify high-density segments in invoices. Group by is_paid::text, calculating record_count, having COUNT(*) >= 1 and id <= 102, ordered descending LIMIT 62;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS segment_key, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id <= 102 GROUP BY is_paid::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-053",
    "domain": "saas",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q53)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #53 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to users. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 63;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN users t ON p.id = t.account_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-054",
    "domain": "saas",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Financial Metric Rollup on api_keys (Q54)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #54 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN api_keys t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-055",
    "domain": "saas",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Relational Cross-Link: feature_usage and accounts (Q55)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #55 - Chloe Vance (Head of Product Analytics)]: Connect feature_usage with accounts. Return t.id, t.feature_name AS child_ref, and p.company_name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 65;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS child_ref, p.company_name AS parent_name FROM feature_usage t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-056",
    "domain": "saas",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Volume Distribution: support_tickets by status (Q56)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #56 - Liam Vance (Head of Customer Success)]: Summarize volume in support_tickets by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-057",
    "domain": "saas",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q57)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #57 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining churn_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 67;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-058",
    "domain": "saas",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in integrations (Q58)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #58 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in integrations. Group by provider, calculating record_count, having COUNT(*) >= 1 and id <= 108, ordered descending LIMIT 68;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS segment_key, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id <= 108 GROUP BY provider HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-059",
    "domain": "saas",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q59)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #59 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to audit_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 69;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-060",
    "domain": "saas",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Financial Metric Rollup on nps_surveys (Q60)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #60 - Liam Vance (Head of Customer Success)]: Calculate average score per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM accounts p JOIN nps_surveys t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-061",
    "domain": "saas",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Relational Cross-Link: subscriptions and accounts (Q61)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #61 - Samira Khan (CEO & Founder)]: Connect subscriptions with accounts. Return t.id, t.plan AS child_ref, and p.company_name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 71;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.plan AS child_ref, p.company_name AS parent_name FROM subscriptions t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-062",
    "domain": "saas",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Volume Distribution: invoices by is_paid::text (Q62)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #62 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in invoices by is_paid::text. Return is_paid::text AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 72;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS group_label, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-063",
    "domain": "saas",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in accounts (Q63)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #63 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining users to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 73;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN users t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-064",
    "domain": "saas",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in api_keys (Q64)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #64 - Liam Vance (Head of Customer Success)]: Identify high-density segments in api_keys. Group by key_name, calculating record_count, having COUNT(*) >= 1 and id <= 114, ordered descending LIMIT 74;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS segment_key, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id <= 114 GROUP BY key_name HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-065",
    "domain": "saas",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q65)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #65 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to feature_usage. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 75;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "saas-L2-066",
    "domain": "saas",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on support_tickets (Q66)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #66 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average resolution_hours per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.resolution_hours::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric FROM accounts p JOIN support_tickets t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-067",
    "domain": "saas",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: churn_events and accounts (Q67)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #67 - Chloe Vance (Head of Product Analytics)]: Connect churn_events with accounts. Return t.id, t.reason AS child_ref, and p.company_name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 77;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.reason AS child_ref, p.company_name AS parent_name FROM churn_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-068",
    "domain": "saas",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Volume Distribution: integrations by provider (Q68)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #68 - Liam Vance (Head of Customer Success)]: Summarize volume in integrations by provider. Return provider AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 78;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS group_label, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-069",
    "domain": "saas",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in accounts (Q69)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #69 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining audit_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 79;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-070",
    "domain": "saas",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in nps_surveys (Q70)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #70 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in nps_surveys. Group by account_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 120, ordered descending LIMIT 80;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS segment_key, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 120 GROUP BY account_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-071",
    "domain": "saas",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q71)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #71 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to subscriptions. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 81;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-072",
    "domain": "saas",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on invoices (Q72)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #72 - Liam Vance (Head of Customer Success)]: Calculate average amount per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.amount::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.amount::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.amount::numeric), 2) AS avg_metric FROM accounts p JOIN invoices t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-073",
    "domain": "saas",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: users and accounts (Q73)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #73 - Samira Khan (CEO & Founder)]: Connect users with accounts. Return t.id, t.full_name AS child_ref, and p.company_name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 83;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS child_ref, p.company_name AS parent_name FROM users t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-074",
    "domain": "saas",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Volume Distribution: api_keys by key_name (Q74)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #74 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in api_keys by key_name. Return key_name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 84;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS group_label, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id >= 5 GROUP BY key_name ORDER BY record_count DESC, group_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-075",
    "domain": "saas",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in accounts (Q75)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #75 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining feature_usage to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 85;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-076",
    "domain": "saas",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in support_tickets (Q76)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #76 - Liam Vance (Head of Customer Success)]: Identify high-density segments in support_tickets. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 126, ordered descending LIMIT 86;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id <= 126 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-077",
    "domain": "saas",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q77)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #77 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to churn_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 87;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-078",
    "domain": "saas",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on integrations (Q78)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #78 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN integrations t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-079",
    "domain": "saas",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: audit_events and accounts (Q79)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #79 - Chloe Vance (Head of Product Analytics)]: Connect audit_events with accounts. Return t.id, t.action AS child_ref, and p.company_name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 89;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.action AS child_ref, p.company_name AS parent_name FROM audit_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-080",
    "domain": "saas",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Volume Distribution: nps_surveys by account_id::text (Q80)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #80 - Liam Vance (Head of Customer Success)]: Summarize volume in nps_surveys by account_id::text. Return account_id::text AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 90;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS group_label, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id >= 1 GROUP BY account_id::text ORDER BY record_count DESC, group_label ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-081",
    "domain": "saas",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in accounts (Q81)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #81 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining subscriptions to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 91;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN subscriptions t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-082",
    "domain": "saas",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in invoices (Q82)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #82 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in invoices. Group by is_paid::text, calculating record_count, having COUNT(*) >= 1 and id <= 132, ordered descending LIMIT 92;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS segment_key, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id <= 132 GROUP BY is_paid::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-083",
    "domain": "saas",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q83)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #83 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to users. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 93;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN users t ON p.id = t.account_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-084",
    "domain": "saas",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on api_keys (Q84)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #84 - Liam Vance (Head of Customer Success)]: Calculate average id per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM accounts p JOIN api_keys t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-085",
    "domain": "saas",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: feature_usage and accounts (Q85)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #85 - Samira Khan (CEO & Founder)]: Connect feature_usage with accounts. Return t.id, t.feature_name AS child_ref, and p.company_name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 95;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS child_ref, p.company_name AS parent_name FROM feature_usage t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-086",
    "domain": "saas",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Volume Distribution: support_tickets by status (Q86)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #86 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in support_tickets by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 96;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM support_tickets WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-087",
    "domain": "saas",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in accounts (Q87)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #87 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining churn_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 97;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN churn_events t ON p.id = t.account_id WHERE p.id >= 3 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-088",
    "domain": "saas",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in integrations (Q88)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #88 - Liam Vance (Head of Customer Success)]: Identify high-density segments in integrations. Group by provider, calculating record_count, having COUNT(*) >= 1 and id <= 138, ordered descending LIMIT 98;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS segment_key, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id <= 138 GROUP BY provider HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-089",
    "domain": "saas",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q89)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #89 - Samira Khan (CEO & Founder)]: Perform a LEFT JOIN from accounts to audit_events. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 99;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-090",
    "domain": "saas",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on nps_surveys (Q90)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #90 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Calculate average score per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM accounts p JOIN nps_surveys t ON p.id = t.account_id WHERE p.id >= 1 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "saas-L2-091",
    "domain": "saas",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Relational Cross-Link: subscriptions and accounts (Q91)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #91 - Chloe Vance (Head of Product Analytics)]: Connect subscriptions with accounts. Return t.id, t.plan AS child_ref, and p.company_name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 101;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.plan AS child_ref, p.company_name AS parent_name FROM subscriptions t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-092",
    "domain": "saas",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Volume Distribution: invoices by is_paid::text (Q92)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #92 - Liam Vance (Head of Customer Success)]: Summarize volume in invoices by is_paid::text. Return is_paid::text AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 102;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT is_paid::text AS group_label, COUNT(*) AS record_count FROM invoices WHERE is_paid::text IS NOT NULL AND id >= 3 GROUP BY is_paid::text ORDER BY record_count DESC, group_label ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-093",
    "domain": "saas",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in accounts (Q93)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #93 - Samira Khan (CEO & Founder)]: Compile aggregated metrics joining users to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN users t ON p.id = t.account_id WHERE p.id >= 4 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-094",
    "domain": "saas",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in api_keys (Q94)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #94 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Identify high-density segments in api_keys. Group by key_name, calculating record_count, having COUNT(*) >= 1 and id <= 144, ordered descending LIMIT 104;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT key_name AS segment_key, COUNT(*) AS record_count FROM api_keys WHERE key_name IS NOT NULL AND id <= 144 GROUP BY key_name HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-095",
    "domain": "saas",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Comprehensive Relation Audit: Left Join on accounts (Q95)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #95 - Chloe Vance (Head of Product Analytics)]: Perform a LEFT JOIN from accounts to feature_usage. Return p.id, p.company_name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 105;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.company_name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM accounts p LEFT JOIN feature_usage t ON p.id = t.account_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-096",
    "domain": "saas",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Financial Metric Rollup on support_tickets (Q96)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #96 - Liam Vance (Head of Customer Success)]: Calculate average resolution_hours per parent entity in accounts. Return p.company_name AS parent_name and ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.resolution_hours::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, ROUND(AVG(t.resolution_hours::numeric), 2) AS avg_metric FROM accounts p JOIN support_tickets t ON p.id = t.account_id WHERE p.id >= 2 GROUP BY p.company_name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-097",
    "domain": "saas",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Relational Cross-Link: churn_events and accounts (Q97)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #97 - Samira Khan (CEO & Founder)]: Connect churn_events with accounts. Return t.id, t.reason AS child_ref, and p.company_name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 107;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.reason AS child_ref, p.company_name AS parent_name FROM churn_events t JOIN accounts p ON t.account_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-098",
    "domain": "saas",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Volume Distribution: integrations by provider (Q98)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #98 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Summarize volume in integrations by provider. Return provider AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 108;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT provider AS group_label, COUNT(*) AS record_count FROM integrations WHERE provider IS NOT NULL AND id >= 4 GROUP BY provider ORDER BY record_count DESC, group_label ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-099",
    "domain": "saas",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in accounts (Q99)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #99 - Chloe Vance (Head of Product Analytics)]: Compile aggregated metrics joining audit_events to accounts. Return p.company_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 109;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.company_name AS parent_name, COUNT(t.id) AS child_count FROM accounts p JOIN audit_events t ON p.id = t.account_id WHERE p.id >= 5 GROUP BY p.company_name ORDER BY child_count DESC, parent_name ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "saas-L2-100",
    "domain": "saas",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in nps_surveys (Q100)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #100 - Liam Vance (Head of Customer Success)]: Identify high-density segments in nps_surveys. Group by account_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 150, ordered descending LIMIT 110;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT account_id::text AS segment_key, COUNT(*) AS record_count FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 150 GROUP BY account_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  }
];
