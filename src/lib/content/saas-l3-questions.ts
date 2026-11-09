import { QuestionDefinition } from "./ecom-l1-questions";

export const SAAS_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "saas-L3-001",
    "domain": "saas",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in subscriptions (Q1)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #1 - Samira Khan (CEO & Founder)]: Isolate records in subscriptions. Select id, plan AS item_title, and mrr AS metric_score where mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(mrr)"
    ],
    "reference_sql": "SELECT id, plan AS item_title, mrr AS metric_score FROM subscriptions WHERE mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-002",
    "domain": "saas",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q2)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #2 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter invoices using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 12;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM invoices WHERE id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-003",
    "domain": "saas",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q3)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #3 - Chloe Vance (Head of Product Analytics)]: Classify entries in users. Select id, full_name AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from users ORDER BY id ASC LIMIT 13;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, full_name AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM users ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-004",
    "domain": "saas",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q4)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #4 - Liam Vance (Head of Customer Success)]: Combine registry names from api_keys and nps_surveys. Select key_name::text AS entity_name, 'Primary Stream' AS source_tier from api_keys WHERE key_name IS NOT NULL AND id <= 34 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 14;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT key_name::text AS entity_name, 'Primary Stream' AS source_tier FROM api_keys WHERE key_name IS NOT NULL AND id <= 34 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-005",
    "domain": "saas",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q5)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #5 - Samira Khan (CEO & Founder)]: Verify relational existence in feature_usage. Return t.id and t.feature_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS confirmed_item FROM feature_usage t WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-006",
    "domain": "saas",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in support_tickets (Q6)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #6 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from support_tickets. Project dt.id, dt.priority AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 16;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "priority",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.priority AS derived_name, dt.score FROM (SELECT id, priority, resolution_hours AS score FROM support_tickets WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-007",
    "domain": "saas",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in churn_events (Q7)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #7 - Chloe Vance (Head of Product Analytics)]: Isolate records in churn_events. Select id, reason AS item_title, and arr_lost AS metric_score where arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(arr_lost)"
    ],
    "reference_sql": "SELECT id, reason AS item_title, arr_lost AS metric_score FROM churn_events WHERE arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-008",
    "domain": "saas",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q8)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #8 - Liam Vance (Head of Customer Success)]: Filter integrations using an IN subquery against active ids. Return id and provider AS filtered_name where id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 18;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, provider AS filtered_name FROM integrations WHERE id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-009",
    "domain": "saas",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q9)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #9 - Samira Khan (CEO & Founder)]: Classify entries in audit_events. Select id, action AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from audit_events ORDER BY id ASC LIMIT 19;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, action AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM audit_events ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-010",
    "domain": "saas",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q10)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #10 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from nps_surveys and subscriptions. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier from subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 20;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier FROM subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-011",
    "domain": "saas",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q11)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #11 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in subscriptions. Return t.id and t.plan AS confirmed_item WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.plan AS confirmed_item FROM subscriptions t WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-012",
    "domain": "saas",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in invoices (Q12)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #12 - Liam Vance (Head of Customer Success)]: Query derived table from invoices. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 22;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, amount AS score FROM invoices WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-013",
    "domain": "saas",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in users (Q13)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #13 - Samira Khan (CEO & Founder)]: Isolate records in users. Select id, full_name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, full_name AS item_title, id AS metric_score FROM users WHERE id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-014",
    "domain": "saas",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q14)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #14 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter api_keys using an IN subquery against active ids. Return id and key_name AS filtered_name where id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 24;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, key_name AS filtered_name FROM api_keys WHERE id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-015",
    "domain": "saas",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q15)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #15 - Chloe Vance (Head of Product Analytics)]: Classify entries in feature_usage. Select id, feature_name AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from feature_usage ORDER BY id ASC LIMIT 25;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, feature_name AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM feature_usage ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "saas-L3-016",
    "domain": "saas",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q16)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #16 - Liam Vance (Head of Customer Success)]: Combine registry names from support_tickets and feature_usage. Select priority::text AS entity_name, 'Primary Stream' AS source_tier from support_tickets WHERE priority IS NOT NULL AND id <= 46 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier from feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT priority::text AS entity_name, 'Primary Stream' AS source_tier FROM support_tickets WHERE priority IS NOT NULL AND id <= 46 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-017",
    "domain": "saas",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q17)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #17 - Samira Khan (CEO & Founder)]: Verify relational existence in churn_events. Return t.id and t.reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.reason AS confirmed_item FROM churn_events t WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-018",
    "domain": "saas",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in integrations (Q18)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #18 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from integrations. Project dt.id, dt.provider AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 28;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "provider",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.provider AS derived_name, dt.score FROM (SELECT id, provider, id AS score FROM integrations WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-019",
    "domain": "saas",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in audit_events (Q19)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #19 - Chloe Vance (Head of Product Analytics)]: Isolate records in audit_events. Select id, action AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, action AS item_title, id AS metric_score FROM audit_events WHERE id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-020",
    "domain": "saas",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q20)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #20 - Liam Vance (Head of Customer Success)]: Filter nps_surveys using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 30;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM nps_surveys WHERE id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-021",
    "domain": "saas",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q21)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #21 - Samira Khan (CEO & Founder)]: Classify entries in subscriptions. Select id, plan AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from subscriptions ORDER BY id ASC LIMIT 31;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, plan AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM subscriptions ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-022",
    "domain": "saas",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q22)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #22 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from invoices and integrations. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from invoices WHERE account_id::text IS NOT NULL AND id <= 52 UNION ALL SELECT provider::text AS entity_name, 'Secondary Stream' AS source_tier from integrations WHERE provider IS NOT NULL ORDER BY entity_name ASC LIMIT 32;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM invoices WHERE account_id::text IS NOT NULL AND id <= 52 UNION ALL SELECT provider::text AS entity_name, 'Secondary Stream' AS source_tier FROM integrations WHERE provider IS NOT NULL ORDER BY entity_name ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-023",
    "domain": "saas",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q23)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #23 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in users. Return t.id and t.full_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS confirmed_item FROM users t WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-024",
    "domain": "saas",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in api_keys (Q24)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #24 - Liam Vance (Head of Customer Success)]: Query derived table from api_keys. Project dt.id, dt.key_name AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 34;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "key_name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.key_name AS derived_name, dt.score FROM (SELECT id, key_name, id AS score FROM api_keys WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-025",
    "domain": "saas",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in feature_usage (Q25)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #25 - Samira Khan (CEO & Founder)]: Isolate records in feature_usage. Select id, feature_name AS item_title, and monthly_events AS metric_score where monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(monthly_events)"
    ],
    "reference_sql": "SELECT id, feature_name AS item_title, monthly_events AS metric_score FROM feature_usage WHERE monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-026",
    "domain": "saas",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q26)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #26 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter support_tickets using an IN subquery against active ids. Return id and priority AS filtered_name where id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 36;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, priority AS filtered_name FROM support_tickets WHERE id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-027",
    "domain": "saas",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q27)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #27 - Chloe Vance (Head of Product Analytics)]: Classify entries in churn_events. Select id, reason AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from churn_events ORDER BY id ASC LIMIT 37;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, reason AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM churn_events ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-028",
    "domain": "saas",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q28)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #28 - Liam Vance (Head of Customer Success)]: Combine registry names from integrations and accounts. Select provider::text AS entity_name, 'Primary Stream' AS source_tier from integrations WHERE provider IS NOT NULL AND id <= 58 UNION ALL SELECT company_name::text AS entity_name, 'Secondary Stream' AS source_tier from accounts WHERE company_name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT provider::text AS entity_name, 'Primary Stream' AS source_tier FROM integrations WHERE provider IS NOT NULL AND id <= 58 UNION ALL SELECT company_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM accounts WHERE company_name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-029",
    "domain": "saas",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q29)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #29 - Samira Khan (CEO & Founder)]: Verify relational existence in audit_events. Return t.id and t.action AS confirmed_item WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.action AS confirmed_item FROM audit_events t WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-030",
    "domain": "saas",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in nps_surveys (Q30)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #30 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from nps_surveys. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 40;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, score AS score FROM nps_surveys WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-031",
    "domain": "saas",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in subscriptions (Q31)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #31 - Chloe Vance (Head of Product Analytics)]: Isolate records in subscriptions. Select id, plan AS item_title, and mrr AS metric_score where mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(mrr)"
    ],
    "reference_sql": "SELECT id, plan AS item_title, mrr AS metric_score FROM subscriptions WHERE mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-032",
    "domain": "saas",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q32)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #32 - Liam Vance (Head of Customer Success)]: Filter invoices using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 42;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM invoices WHERE id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-033",
    "domain": "saas",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q33)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #33 - Samira Khan (CEO & Founder)]: Classify entries in users. Select id, full_name AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from users ORDER BY id ASC LIMIT 43;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, full_name AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM users ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-034",
    "domain": "saas",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q34)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #34 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from api_keys and users. Select key_name::text AS entity_name, 'Primary Stream' AS source_tier from api_keys WHERE key_name IS NOT NULL AND id <= 64 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier from users WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 44;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT key_name::text AS entity_name, 'Primary Stream' AS source_tier FROM api_keys WHERE key_name IS NOT NULL AND id <= 64 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM users WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-035",
    "domain": "saas",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q35)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #35 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in feature_usage. Return t.id and t.feature_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS confirmed_item FROM feature_usage t WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-036",
    "domain": "saas",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in support_tickets (Q36)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #36 - Liam Vance (Head of Customer Success)]: Query derived table from support_tickets. Project dt.id, dt.priority AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 46;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "priority",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.priority AS derived_name, dt.score FROM (SELECT id, priority, resolution_hours AS score FROM support_tickets WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-037",
    "domain": "saas",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in churn_events (Q37)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #37 - Samira Khan (CEO & Founder)]: Isolate records in churn_events. Select id, reason AS item_title, and arr_lost AS metric_score where arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(arr_lost)"
    ],
    "reference_sql": "SELECT id, reason AS item_title, arr_lost AS metric_score FROM churn_events WHERE arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-038",
    "domain": "saas",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q38)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #38 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter integrations using an IN subquery against active ids. Return id and provider AS filtered_name where id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 48;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, provider AS filtered_name FROM integrations WHERE id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-039",
    "domain": "saas",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q39)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #39 - Chloe Vance (Head of Product Analytics)]: Classify entries in audit_events. Select id, action AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from audit_events ORDER BY id ASC LIMIT 49;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, action AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM audit_events ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-040",
    "domain": "saas",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q40)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #40 - Liam Vance (Head of Customer Success)]: Combine registry names from nps_surveys and support_tickets. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT priority::text AS entity_name, 'Secondary Stream' AS source_tier from support_tickets WHERE priority IS NOT NULL ORDER BY entity_name ASC LIMIT 50;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT priority::text AS entity_name, 'Secondary Stream' AS source_tier FROM support_tickets WHERE priority IS NOT NULL ORDER BY entity_name ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-041",
    "domain": "saas",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q41)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #41 - Samira Khan (CEO & Founder)]: Verify relational existence in subscriptions. Return t.id and t.plan AS confirmed_item WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.plan AS confirmed_item FROM subscriptions t WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-042",
    "domain": "saas",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in invoices (Q42)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #42 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from invoices. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 52;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, amount AS score FROM invoices WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-043",
    "domain": "saas",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in users (Q43)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #43 - Chloe Vance (Head of Product Analytics)]: Isolate records in users. Select id, full_name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, full_name AS item_title, id AS metric_score FROM users WHERE id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-044",
    "domain": "saas",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q44)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #44 - Liam Vance (Head of Customer Success)]: Filter api_keys using an IN subquery against active ids. Return id and key_name AS filtered_name where id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, key_name AS filtered_name FROM api_keys WHERE id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-045",
    "domain": "saas",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q45)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #45 - Samira Khan (CEO & Founder)]: Classify entries in feature_usage. Select id, feature_name AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from feature_usage ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, feature_name AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM feature_usage ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-046",
    "domain": "saas",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q46)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #46 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from support_tickets and nps_surveys. Select priority::text AS entity_name, 'Primary Stream' AS source_tier from support_tickets WHERE priority IS NOT NULL AND id <= 76 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 56;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT priority::text AS entity_name, 'Primary Stream' AS source_tier FROM support_tickets WHERE priority IS NOT NULL AND id <= 76 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-047",
    "domain": "saas",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q47)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #47 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in churn_events. Return t.id and t.reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.reason AS confirmed_item FROM churn_events t WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-048",
    "domain": "saas",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in integrations (Q48)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #48 - Liam Vance (Head of Customer Success)]: Query derived table from integrations. Project dt.id, dt.provider AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 58;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "provider",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.provider AS derived_name, dt.score FROM (SELECT id, provider, id AS score FROM integrations WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-049",
    "domain": "saas",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in audit_events (Q49)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #49 - Samira Khan (CEO & Founder)]: Isolate records in audit_events. Select id, action AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, action AS item_title, id AS metric_score FROM audit_events WHERE id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-050",
    "domain": "saas",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q50)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #50 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter nps_surveys using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM nps_surveys WHERE id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-051",
    "domain": "saas",
    "level": 3,
    "order": 51,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q51)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #51 - Chloe Vance (Head of Product Analytics)]: Classify entries in subscriptions. Select id, plan AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from subscriptions ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, plan AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM subscriptions ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-052",
    "domain": "saas",
    "level": 3,
    "order": 52,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q52)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #52 - Liam Vance (Head of Customer Success)]: Combine registry names from invoices and subscriptions. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from invoices WHERE account_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier from subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 62;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM invoices WHERE account_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier FROM subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-053",
    "domain": "saas",
    "level": 3,
    "order": 53,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q53)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #53 - Samira Khan (CEO & Founder)]: Verify relational existence in users. Return t.id and t.full_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS confirmed_item FROM users t WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-054",
    "domain": "saas",
    "level": 3,
    "order": 54,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in api_keys (Q54)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #54 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from api_keys. Project dt.id, dt.key_name AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 64;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "key_name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.key_name AS derived_name, dt.score FROM (SELECT id, key_name, id AS score FROM api_keys WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-055",
    "domain": "saas",
    "level": 3,
    "order": 55,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in feature_usage (Q55)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #55 - Chloe Vance (Head of Product Analytics)]: Isolate records in feature_usage. Select id, feature_name AS item_title, and monthly_events AS metric_score where monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(monthly_events)"
    ],
    "reference_sql": "SELECT id, feature_name AS item_title, monthly_events AS metric_score FROM feature_usage WHERE monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-056",
    "domain": "saas",
    "level": 3,
    "order": 56,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q56)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #56 - Liam Vance (Head of Customer Success)]: Filter support_tickets using an IN subquery against active ids. Return id and priority AS filtered_name where id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, priority AS filtered_name FROM support_tickets WHERE id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-057",
    "domain": "saas",
    "level": 3,
    "order": 57,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q57)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #57 - Samira Khan (CEO & Founder)]: Classify entries in churn_events. Select id, reason AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from churn_events ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, reason AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM churn_events ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-058",
    "domain": "saas",
    "level": 3,
    "order": 58,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q58)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #58 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from integrations and feature_usage. Select provider::text AS entity_name, 'Primary Stream' AS source_tier from integrations WHERE provider IS NOT NULL AND id <= 88 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier from feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 68;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT provider::text AS entity_name, 'Primary Stream' AS source_tier FROM integrations WHERE provider IS NOT NULL AND id <= 88 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-059",
    "domain": "saas",
    "level": 3,
    "order": 59,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q59)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #59 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in audit_events. Return t.id and t.action AS confirmed_item WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.action AS confirmed_item FROM audit_events t WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-060",
    "domain": "saas",
    "level": 3,
    "order": 60,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in nps_surveys (Q60)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #60 - Liam Vance (Head of Customer Success)]: Query derived table from nps_surveys. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 70;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, score AS score FROM nps_surveys WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "saas-L3-061",
    "domain": "saas",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in subscriptions (Q61)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #61 - Samira Khan (CEO & Founder)]: Isolate records in subscriptions. Select id, plan AS item_title, and mrr AS metric_score where mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(mrr)"
    ],
    "reference_sql": "SELECT id, plan AS item_title, mrr AS metric_score FROM subscriptions WHERE mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-062",
    "domain": "saas",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q62)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #62 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter invoices using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM invoices WHERE id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-063",
    "domain": "saas",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q63)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #63 - Chloe Vance (Head of Product Analytics)]: Classify entries in users. Select id, full_name AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from users ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, full_name AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM users ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-064",
    "domain": "saas",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q64)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #64 - Liam Vance (Head of Customer Success)]: Combine registry names from api_keys and integrations. Select key_name::text AS entity_name, 'Primary Stream' AS source_tier from api_keys WHERE key_name IS NOT NULL AND id <= 94 UNION ALL SELECT provider::text AS entity_name, 'Secondary Stream' AS source_tier from integrations WHERE provider IS NOT NULL ORDER BY entity_name ASC LIMIT 74;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT key_name::text AS entity_name, 'Primary Stream' AS source_tier FROM api_keys WHERE key_name IS NOT NULL AND id <= 94 UNION ALL SELECT provider::text AS entity_name, 'Secondary Stream' AS source_tier FROM integrations WHERE provider IS NOT NULL ORDER BY entity_name ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-065",
    "domain": "saas",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q65)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #65 - Samira Khan (CEO & Founder)]: Verify relational existence in feature_usage. Return t.id and t.feature_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS confirmed_item FROM feature_usage t WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-066",
    "domain": "saas",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in support_tickets (Q66)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #66 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from support_tickets. Project dt.id, dt.priority AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 76;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "priority",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.priority AS derived_name, dt.score FROM (SELECT id, priority, resolution_hours AS score FROM support_tickets WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-067",
    "domain": "saas",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in churn_events (Q67)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #67 - Chloe Vance (Head of Product Analytics)]: Isolate records in churn_events. Select id, reason AS item_title, and arr_lost AS metric_score where arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(arr_lost)"
    ],
    "reference_sql": "SELECT id, reason AS item_title, arr_lost AS metric_score FROM churn_events WHERE arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-068",
    "domain": "saas",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q68)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #68 - Liam Vance (Head of Customer Success)]: Filter integrations using an IN subquery against active ids. Return id and provider AS filtered_name where id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, provider AS filtered_name FROM integrations WHERE id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-069",
    "domain": "saas",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q69)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #69 - Samira Khan (CEO & Founder)]: Classify entries in audit_events. Select id, action AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from audit_events ORDER BY id ASC LIMIT 79;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, action AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM audit_events ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-070",
    "domain": "saas",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q70)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #70 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from nps_surveys and accounts. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL AND id <= 100 UNION ALL SELECT company_name::text AS entity_name, 'Secondary Stream' AS source_tier from accounts WHERE company_name IS NOT NULL ORDER BY entity_name ASC LIMIT 80;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 100 UNION ALL SELECT company_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM accounts WHERE company_name IS NOT NULL ORDER BY entity_name ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-071",
    "domain": "saas",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q71)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #71 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in subscriptions. Return t.id and t.plan AS confirmed_item WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.plan AS confirmed_item FROM subscriptions t WHERE EXISTS (SELECT 1 FROM subscriptions sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-072",
    "domain": "saas",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in invoices (Q72)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #72 - Liam Vance (Head of Customer Success)]: Query derived table from invoices. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 82;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, amount AS score FROM invoices WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-073",
    "domain": "saas",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in users (Q73)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #73 - Samira Khan (CEO & Founder)]: Isolate records in users. Select id, full_name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, full_name AS item_title, id AS metric_score FROM users WHERE id >= (SELECT MIN(id) FROM users) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-074",
    "domain": "saas",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q74)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #74 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter api_keys using an IN subquery against active ids. Return id and key_name AS filtered_name where id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 84;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, key_name AS filtered_name FROM api_keys WHERE id IN (SELECT id FROM api_keys WHERE id >= 5) ORDER BY id ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-075",
    "domain": "saas",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q75)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #75 - Chloe Vance (Head of Product Analytics)]: Classify entries in feature_usage. Select id, feature_name AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from feature_usage ORDER BY id ASC LIMIT 85;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, feature_name AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM feature_usage ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-076",
    "domain": "saas",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q76)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #76 - Liam Vance (Head of Customer Success)]: Combine registry names from support_tickets and users. Select priority::text AS entity_name, 'Primary Stream' AS source_tier from support_tickets WHERE priority IS NOT NULL AND id <= 106 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier from users WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT priority::text AS entity_name, 'Primary Stream' AS source_tier FROM support_tickets WHERE priority IS NOT NULL AND id <= 106 UNION ALL SELECT full_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM users WHERE full_name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-077",
    "domain": "saas",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q77)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #77 - Samira Khan (CEO & Founder)]: Verify relational existence in churn_events. Return t.id and t.reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.reason AS confirmed_item FROM churn_events t WHERE EXISTS (SELECT 1 FROM churn_events sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-078",
    "domain": "saas",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in integrations (Q78)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #78 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from integrations. Project dt.id, dt.provider AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 88;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "provider",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.provider AS derived_name, dt.score FROM (SELECT id, provider, id AS score FROM integrations WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-079",
    "domain": "saas",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in audit_events (Q79)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #79 - Chloe Vance (Head of Product Analytics)]: Isolate records in audit_events. Select id, action AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, action AS item_title, id AS metric_score FROM audit_events WHERE id >= (SELECT MIN(id) FROM audit_events) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-080",
    "domain": "saas",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q80)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #80 - Liam Vance (Head of Customer Success)]: Filter nps_surveys using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 90;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM nps_surveys WHERE id IN (SELECT id FROM nps_surveys WHERE id >= 1) ORDER BY id ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-081",
    "domain": "saas",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q81)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #81 - Samira Khan (CEO & Founder)]: Classify entries in subscriptions. Select id, plan AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from subscriptions ORDER BY id ASC LIMIT 91;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, plan AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM subscriptions ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-082",
    "domain": "saas",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q82)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #82 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from invoices and support_tickets. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from invoices WHERE account_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT priority::text AS entity_name, 'Secondary Stream' AS source_tier from support_tickets WHERE priority IS NOT NULL ORDER BY entity_name ASC LIMIT 92;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM invoices WHERE account_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT priority::text AS entity_name, 'Secondary Stream' AS source_tier FROM support_tickets WHERE priority IS NOT NULL ORDER BY entity_name ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-083",
    "domain": "saas",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q83)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #83 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in users. Return t.id and t.full_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.full_name AS confirmed_item FROM users t WHERE EXISTS (SELECT 1 FROM users sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-084",
    "domain": "saas",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in api_keys (Q84)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #84 - Liam Vance (Head of Customer Success)]: Query derived table from api_keys. Project dt.id, dt.key_name AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 94;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "key_name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.key_name AS derived_name, dt.score FROM (SELECT id, key_name, id AS score FROM api_keys WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-085",
    "domain": "saas",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in feature_usage (Q85)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #85 - Samira Khan (CEO & Founder)]: Isolate records in feature_usage. Select id, feature_name AS item_title, and monthly_events AS metric_score where monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(monthly_events)"
    ],
    "reference_sql": "SELECT id, feature_name AS item_title, monthly_events AS metric_score FROM feature_usage WHERE monthly_events >= (SELECT MIN(monthly_events) FROM feature_usage) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-086",
    "domain": "saas",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q86)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #86 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter support_tickets using an IN subquery against active ids. Return id and priority AS filtered_name where id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 96;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, priority AS filtered_name FROM support_tickets WHERE id IN (SELECT id FROM support_tickets WHERE id >= 2) ORDER BY id ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-087",
    "domain": "saas",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q87)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #87 - Chloe Vance (Head of Product Analytics)]: Classify entries in churn_events. Select id, reason AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from churn_events ORDER BY id ASC LIMIT 97;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, reason AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM churn_events ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-088",
    "domain": "saas",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q88)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #88 - Liam Vance (Head of Customer Success)]: Combine registry names from integrations and nps_surveys. Select provider::text AS entity_name, 'Primary Stream' AS source_tier from integrations WHERE provider IS NOT NULL AND id <= 118 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 98;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT provider::text AS entity_name, 'Primary Stream' AS source_tier FROM integrations WHERE provider IS NOT NULL AND id <= 118 UNION ALL SELECT account_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "saas-L3-089",
    "domain": "saas",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q89)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #89 - Samira Khan (CEO & Founder)]: Verify relational existence in audit_events. Return t.id and t.action AS confirmed_item WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.action AS confirmed_item FROM audit_events t WHERE EXISTS (SELECT 1 FROM audit_events sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-090",
    "domain": "saas",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in nps_surveys (Q90)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #90 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Query derived table from nps_surveys. Project dt.id, dt.account_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 100;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.account_id::text AS derived_name, dt.score FROM (SELECT id, account_id::text, score AS score FROM nps_surveys WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-091",
    "domain": "saas",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in subscriptions (Q91)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #91 - Chloe Vance (Head of Product Analytics)]: Isolate records in subscriptions. Select id, plan AS item_title, and mrr AS metric_score where mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(mrr)"
    ],
    "reference_sql": "SELECT id, plan AS item_title, mrr AS metric_score FROM subscriptions WHERE mrr >= (SELECT MIN(mrr) FROM subscriptions) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-092",
    "domain": "saas",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q92)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #92 - Liam Vance (Head of Customer Success)]: Filter invoices using an IN subquery against active ids. Return id and account_id::text AS filtered_name where id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, account_id::text AS filtered_name FROM invoices WHERE id IN (SELECT id FROM invoices WHERE id >= 3) ORDER BY id ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-093",
    "domain": "saas",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q93)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #93 - Samira Khan (CEO & Founder)]: Classify entries in users. Select id, full_name AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from users ORDER BY id ASC LIMIT 103;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, full_name AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM users ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-094",
    "domain": "saas",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q94)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #94 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Combine registry names from api_keys and subscriptions. Select key_name::text AS entity_name, 'Primary Stream' AS source_tier from api_keys WHERE key_name IS NOT NULL AND id <= 124 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier from subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 104;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT key_name::text AS entity_name, 'Primary Stream' AS source_tier FROM api_keys WHERE key_name IS NOT NULL AND id <= 124 UNION ALL SELECT plan::text AS entity_name, 'Secondary Stream' AS source_tier FROM subscriptions WHERE plan IS NOT NULL ORDER BY entity_name ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-095",
    "domain": "saas",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q95)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #95 - Chloe Vance (Head of Product Analytics)]: Verify relational existence in feature_usage. Return t.id and t.feature_name AS confirmed_item WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.feature_name AS confirmed_item FROM feature_usage t WHERE EXISTS (SELECT 1 FROM feature_usage sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-096",
    "domain": "saas",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in support_tickets (Q96)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #96 - Liam Vance (Head of Customer Success)]: Query derived table from support_tickets. Project dt.id, dt.priority AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 106;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "priority",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.priority AS derived_name, dt.score FROM (SELECT id, priority, resolution_hours AS score FROM support_tickets WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-097",
    "domain": "saas",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in churn_events (Q97)",
    "stakeholder": {
      "name": "Samira Khan",
      "role": "CEO & Founder",
      "department": "Executive"
    },
    "request": "From: Samira Khan (CEO & Founder)\n\n\"[Task #97 - Samira Khan (CEO & Founder)]: Isolate records in churn_events. Select id, reason AS item_title, and arr_lost AS metric_score where arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(arr_lost)"
    ],
    "reference_sql": "SELECT id, reason AS item_title, arr_lost AS metric_score FROM churn_events WHERE arr_lost >= (SELECT MIN(arr_lost) FROM churn_events) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-098",
    "domain": "saas",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q98)",
    "stakeholder": {
      "name": "Tariq Mansoor",
      "role": "VP of Engineering & Cloud Ops",
      "department": "Infrastructure"
    },
    "request": "From: Tariq Mansoor (VP of Engineering & Cloud Ops)\n\n\"[Task #98 - Tariq Mansoor (VP of Engineering & Cloud Ops)]: Filter integrations using an IN subquery against active ids. Return id and provider AS filtered_name where id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 108;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, provider AS filtered_name FROM integrations WHERE id IN (SELECT id FROM integrations WHERE id >= 4) ORDER BY id ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-099",
    "domain": "saas",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q99)",
    "stakeholder": {
      "name": "Chloe Vance",
      "role": "Head of Product Analytics",
      "department": "Product"
    },
    "request": "From: Chloe Vance (Head of Product Analytics)\n\n\"[Task #99 - Chloe Vance (Head of Product Analytics)]: Classify entries in audit_events. Select id, action AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from audit_events ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, action AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM audit_events ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "saas-L3-100",
    "domain": "saas",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q100)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Head of Customer Success",
      "department": "Success"
    },
    "request": "From: Liam Vance (Head of Customer Success)\n\n\"[Task #100 - Liam Vance (Head of Customer Success)]: Combine registry names from nps_surveys and feature_usage. Select account_id::text::text AS entity_name, 'Primary Stream' AS source_tier from nps_surveys WHERE account_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier from feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT account_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM nps_surveys WHERE account_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT feature_name::text AS entity_name, 'Secondary Stream' AS source_tier FROM feature_usage WHERE feature_name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  }
];
