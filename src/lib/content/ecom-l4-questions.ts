import { QuestionDefinition } from "./ecom-l1-questions";

export const ECOM_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L4-001",
    "domain": "ecommerce",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q1)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #1 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 11;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 11;",
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
    "id": "ecom-L4-002",
    "domain": "ecommerce",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in categories (Q2)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #2 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 12;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 12;",
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
    "id": "ecom-L4-003",
    "domain": "ecommerce",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q3)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #3 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 13;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 13;",
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
    "id": "ecom-L4-004",
    "domain": "ecommerce",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q4)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #4 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 14;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 14;",
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
    "id": "ecom-L4-005",
    "domain": "ecommerce",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on products (Q5)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #5 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 15;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
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
    "id": "ecom-L4-006",
    "domain": "ecommerce",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q6)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #6 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 16;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 16;",
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
    "id": "ecom-L4-007",
    "domain": "ecommerce",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q7)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #7 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 17;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 17;",
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
    "id": "ecom-L4-008",
    "domain": "ecommerce",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in order_items (Q8)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #8 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 18;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 18;",
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
    "id": "ecom-L4-009",
    "domain": "ecommerce",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q9)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #9 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 19;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 19;",
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
    "id": "ecom-L4-010",
    "domain": "ecommerce",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q10)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #10 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
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
    "id": "ecom-L4-011",
    "domain": "ecommerce",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on inventory (Q11)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #11 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 21;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 21;",
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
    "id": "ecom-L4-012",
    "domain": "ecommerce",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q12)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #12 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 22;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 22;",
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
    "id": "ecom-L4-013",
    "domain": "ecommerce",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q13)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #13 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 23;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 23;",
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
    "id": "ecom-L4-014",
    "domain": "ecommerce",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in categories (Q14)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #14 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 24;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 24;",
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
    "id": "ecom-L4-015",
    "domain": "ecommerce",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q15)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #15 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 25;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 25;",
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
    "id": "ecom-L4-016",
    "domain": "ecommerce",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q16)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #16 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 26;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 26;",
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
    "id": "ecom-L4-017",
    "domain": "ecommerce",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Cumulative Running Total on products (Q17)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #17 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 27;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 27;",
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
    "id": "ecom-L4-018",
    "domain": "ecommerce",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q18)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #18 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 28;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 28;",
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
    "id": "ecom-L4-019",
    "domain": "ecommerce",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q19)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #19 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 29;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 29;",
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
    "id": "ecom-L4-020",
    "domain": "ecommerce",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Dense Partition Ranking in order_items (Q20)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #20 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 30;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 30;",
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
    "id": "ecom-L4-021",
    "domain": "ecommerce",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q21)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #21 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 31;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 31;",
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
    "id": "ecom-L4-022",
    "domain": "ecommerce",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q22)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #22 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 32;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 32;",
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
    "id": "ecom-L4-023",
    "domain": "ecommerce",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Cumulative Running Total on inventory (Q23)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #23 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 33;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 33;",
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
    "id": "ecom-L4-024",
    "domain": "ecommerce",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q24)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #24 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 34;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 34;",
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
    "id": "ecom-L4-025",
    "domain": "ecommerce",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q25)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #25 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 35;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 35;",
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
    "id": "ecom-L4-026",
    "domain": "ecommerce",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Dense Partition Ranking in categories (Q26)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #26 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 36;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 36;",
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
    "id": "ecom-L4-027",
    "domain": "ecommerce",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q27)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #27 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 37;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 37;",
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
    "id": "ecom-L4-028",
    "domain": "ecommerce",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q28)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #28 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 38;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 38;",
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
    "id": "ecom-L4-029",
    "domain": "ecommerce",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Cumulative Running Total on products (Q29)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #29 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 39;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 39;",
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
    "id": "ecom-L4-030",
    "domain": "ecommerce",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q30)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #30 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 40;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 40;",
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
    "id": "ecom-L4-031",
    "domain": "ecommerce",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q31)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #31 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 41;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 41;",
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
    "id": "ecom-L4-032",
    "domain": "ecommerce",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Dense Partition Ranking in order_items (Q32)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #32 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 42;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 42;",
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
    "id": "ecom-L4-033",
    "domain": "ecommerce",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q33)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #33 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 43;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 43;",
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
    "id": "ecom-L4-034",
    "domain": "ecommerce",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q34)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #34 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 44;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 44;",
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
    "id": "ecom-L4-035",
    "domain": "ecommerce",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Cumulative Running Total on inventory (Q35)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #35 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 45;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 45;",
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
    "id": "ecom-L4-036",
    "domain": "ecommerce",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q36)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #36 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 46;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 46;",
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
    "id": "ecom-L4-037",
    "domain": "ecommerce",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q37)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #37 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 47;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 47;",
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
    "id": "ecom-L4-038",
    "domain": "ecommerce",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Dense Partition Ranking in categories (Q38)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #38 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 48;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 48;",
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
    "id": "ecom-L4-039",
    "domain": "ecommerce",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q39)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #39 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 49;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 49;",
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
    "id": "ecom-L4-040",
    "domain": "ecommerce",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q40)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #40 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 50;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
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
    "id": "ecom-L4-041",
    "domain": "ecommerce",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Cumulative Running Total on products (Q41)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #41 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 51;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 51;",
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
    "id": "ecom-L4-042",
    "domain": "ecommerce",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q42)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #42 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 52;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 52;",
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
    "id": "ecom-L4-043",
    "domain": "ecommerce",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q43)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #43 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 53;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 53;",
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
    "id": "ecom-L4-044",
    "domain": "ecommerce",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Dense Partition Ranking in order_items (Q44)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #44 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 54;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 54;",
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
    "id": "ecom-L4-045",
    "domain": "ecommerce",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q45)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #45 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 55;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
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
    "id": "ecom-L4-046",
    "domain": "ecommerce",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q46)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #46 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 56;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 56;",
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
    "id": "ecom-L4-047",
    "domain": "ecommerce",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Cumulative Running Total on inventory (Q47)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #47 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 57;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 57;",
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
    "id": "ecom-L4-048",
    "domain": "ecommerce",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q48)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #48 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 58;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 58;",
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
    "id": "ecom-L4-049",
    "domain": "ecommerce",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q49)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #49 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 59;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 59;",
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
    "id": "ecom-L4-050",
    "domain": "ecommerce",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Dense Partition Ranking in categories (Q50)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #50 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 60;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 60;",
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
    "id": "ecom-L4-051",
    "domain": "ecommerce",
    "level": 4,
    "order": 51,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q51)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #51 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 61;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 61;",
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
    "id": "ecom-L4-052",
    "domain": "ecommerce",
    "level": 4,
    "order": 52,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q52)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #52 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 62;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 62;",
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
    "id": "ecom-L4-053",
    "domain": "ecommerce",
    "level": 4,
    "order": 53,
    "difficulty": "core",
    "title": "Cumulative Running Total on products (Q53)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #53 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 63;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 63;",
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
    "id": "ecom-L4-054",
    "domain": "ecommerce",
    "level": 4,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q54)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #54 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 64;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 64;",
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
    "id": "ecom-L4-055",
    "domain": "ecommerce",
    "level": 4,
    "order": 55,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q55)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #55 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 65;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 65;",
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
    "id": "ecom-L4-056",
    "domain": "ecommerce",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in order_items (Q56)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #56 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 66;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 66;",
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
    "id": "ecom-L4-057",
    "domain": "ecommerce",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q57)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #57 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 67;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 67;",
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
    "id": "ecom-L4-058",
    "domain": "ecommerce",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q58)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #58 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 68;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 68;",
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
    "id": "ecom-L4-059",
    "domain": "ecommerce",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on inventory (Q59)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #59 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 69;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 69;",
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
    "id": "ecom-L4-060",
    "domain": "ecommerce",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q60)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #60 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 70;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 70;",
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
    "id": "ecom-L4-061",
    "domain": "ecommerce",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q61)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #61 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 71;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 71;",
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
    "id": "ecom-L4-062",
    "domain": "ecommerce",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in categories (Q62)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #62 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 72;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 72;",
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
    "id": "ecom-L4-063",
    "domain": "ecommerce",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q63)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #63 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 73;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 73;",
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
    "id": "ecom-L4-064",
    "domain": "ecommerce",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q64)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #64 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 74;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 74;",
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
    "id": "ecom-L4-065",
    "domain": "ecommerce",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on products (Q65)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #65 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 75;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 75;",
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
    "id": "ecom-L4-066",
    "domain": "ecommerce",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q66)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #66 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 76;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 76;",
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
    "id": "ecom-L4-067",
    "domain": "ecommerce",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q67)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #67 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 77;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 77;",
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
    "id": "ecom-L4-068",
    "domain": "ecommerce",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in order_items (Q68)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #68 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 78;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 78;",
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
    "id": "ecom-L4-069",
    "domain": "ecommerce",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q69)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #69 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 79;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 79;",
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
    "id": "ecom-L4-070",
    "domain": "ecommerce",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q70)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #70 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 80;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 80;",
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
    "id": "ecom-L4-071",
    "domain": "ecommerce",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on inventory (Q71)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #71 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 81;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 81;",
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
    "id": "ecom-L4-072",
    "domain": "ecommerce",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q72)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #72 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 82;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 82;",
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
    "id": "ecom-L4-073",
    "domain": "ecommerce",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q73)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #73 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 83;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 83;",
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
    "id": "ecom-L4-074",
    "domain": "ecommerce",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in categories (Q74)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #74 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 84;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 84;",
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
    "id": "ecom-L4-075",
    "domain": "ecommerce",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q75)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #75 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 85;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 85;",
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
    "id": "ecom-L4-076",
    "domain": "ecommerce",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q76)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #76 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 86;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 86;",
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
    "id": "ecom-L4-077",
    "domain": "ecommerce",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on products (Q77)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #77 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 87;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 87;",
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
    "id": "ecom-L4-078",
    "domain": "ecommerce",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q78)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #78 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 88;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 88;",
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
    "id": "ecom-L4-079",
    "domain": "ecommerce",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q79)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #79 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 89;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 89;",
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
    "id": "ecom-L4-080",
    "domain": "ecommerce",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in order_items (Q80)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #80 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 90;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 90;",
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
    "id": "ecom-L4-081",
    "domain": "ecommerce",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q81)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #81 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 91;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 91;",
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
    "id": "ecom-L4-082",
    "domain": "ecommerce",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q82)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #82 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 92;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 92;",
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
    "id": "ecom-L4-083",
    "domain": "ecommerce",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on inventory (Q83)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #83 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 93;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 93;",
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
    "id": "ecom-L4-084",
    "domain": "ecommerce",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q84)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #84 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 94;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 94;",
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
    "id": "ecom-L4-085",
    "domain": "ecommerce",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q85)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #85 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 95;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 95;",
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
    "id": "ecom-L4-086",
    "domain": "ecommerce",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in categories (Q86)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #86 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 96;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 96;",
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
    "id": "ecom-L4-087",
    "domain": "ecommerce",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q87)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #87 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 97;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 97;",
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
    "id": "ecom-L4-088",
    "domain": "ecommerce",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q88)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #88 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 98;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 98;",
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
    "id": "ecom-L4-089",
    "domain": "ecommerce",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Running Total on products (Q89)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #89 - Alex Rivera (Chief Executive Officer)]: Calculate cumulative progression in products. Return id, price AS baseline_val, and SUM(price) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 99;\"",
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
    "reference_sql": "SELECT id, price AS baseline_val, SUM(price) OVER (ORDER BY id ASC) AS running_total FROM products WHERE id >= 1 ORDER BY id ASC LIMIT 99;",
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
    "id": "ecom-L4-090",
    "domain": "ecommerce",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q90)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #90 - Rachel Green (VP of Sales & Growth)]: Stage transformation logic for customers. Create a CTE named staged_metrics selecting id, first_name AS staged_name, and id AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 100;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, first_name AS staged_name, id AS score FROM customers WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 100;",
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
    "id": "ecom-L4-091",
    "domain": "ecommerce",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q91)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #91 - Liam Vance (Fulfillment & Supply Director)]: Rank records in orders by total_amount. Return id, status AS entity_title, total_amount AS metric_score, and ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 101;\"",
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
    "reference_sql": "SELECT id, status AS entity_title, total_amount AS metric_score, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_num FROM orders WHERE id >= 1 ORDER BY rank_num ASC LIMIT 101;",
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
    "id": "ecom-L4-092",
    "domain": "ecommerce",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in order_items (Q92)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #92 - Marcus Bell (Customer Support Lead)]: Compute dense ranking within each segment of order_items. Return id, order_id AS partition_key, unit_price AS metric_val, and DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 102;\"",
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
    "reference_sql": "SELECT id, order_id AS partition_key, unit_price AS metric_val, DENSE_RANK() OVER (PARTITION BY order_id ORDER BY unit_price DESC) AS dense_rnk FROM order_items WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 102;",
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
    "id": "ecom-L4-093",
    "domain": "ecommerce",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q93)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #93 - Alex Rivera (Chief Executive Officer)]: Perform period-over-period delta analysis on shipments. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 103;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM shipments WHERE id >= 1 ORDER BY id ASC LIMIT 103;",
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
    "id": "ecom-L4-094",
    "domain": "ecommerce",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q94)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #94 - Rachel Green (VP of Sales & Growth)]: Perform forward-looking trend analysis on warehouses. Return id, capacity_sqft AS current_val, and LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 104;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity_sqft",
      "next_metric"
    ],
    "reference_sql": "SELECT id, capacity_sqft AS current_val, LEAD(capacity_sqft, 1) OVER (ORDER BY id ASC) AS next_metric FROM warehouses WHERE id >= 1 ORDER BY id ASC LIMIT 104;",
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
    "id": "ecom-L4-095",
    "domain": "ecommerce",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Cumulative Running Total on inventory (Q95)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #95 - Liam Vance (Fulfillment & Supply Director)]: Calculate cumulative progression in inventory. Return id, quantity_on_hand AS baseline_val, and SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 105;\"",
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
    "reference_sql": "SELECT id, quantity_on_hand AS baseline_val, SUM(quantity_on_hand) OVER (ORDER BY id ASC) AS running_total FROM inventory WHERE id >= 1 ORDER BY id ASC LIMIT 105;",
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
    "id": "ecom-L4-096",
    "domain": "ecommerce",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q96)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #96 - Marcus Bell (Customer Support Lead)]: Stage transformation logic for coupons. Create a CTE named staged_metrics selecting id, code AS staged_name, and discount_percent AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 106;\"",
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
    "reference_sql": "WITH staged_metrics AS (SELECT id, code AS staged_name, discount_percent AS score FROM coupons WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 106;",
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
    "id": "ecom-L4-097",
    "domain": "ecommerce",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q97)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #97 - Alex Rivera (Chief Executive Officer)]: Rank records in departments by id. Return id, name AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 107;\"",
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
    "reference_sql": "SELECT id, name AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 107;",
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
    "id": "ecom-L4-098",
    "domain": "ecommerce",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in categories (Q98)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #98 - Rachel Green (VP of Sales & Growth)]: Compute dense ranking within each segment of categories. Return id, department_id AS partition_key, id AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 108;\"",
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
    "reference_sql": "SELECT id, department_id AS partition_key, id AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY id DESC) AS dense_rnk FROM categories WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 108;",
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
    "id": "ecom-L4-099",
    "domain": "ecommerce",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q99)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #99 - Liam Vance (Fulfillment & Supply Director)]: Perform period-over-period delta analysis on brands. Return id, id AS current_val, and LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 109;\"",
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
    "reference_sql": "SELECT id, id AS current_val, LAG(id, 1) OVER (ORDER BY id ASC) AS prev_metric FROM brands WHERE id >= 1 ORDER BY id ASC LIMIT 109;",
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
    "id": "ecom-L4-100",
    "domain": "ecommerce",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q100)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #100 - Marcus Bell (Customer Support Lead)]: Perform forward-looking trend analysis on suppliers. Return id, rating AS current_val, and LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 110;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "rating",
      "next_metric"
    ],
    "reference_sql": "SELECT id, rating AS current_val, LEAD(rating, 1) OVER (ORDER BY id ASC) AS next_metric FROM suppliers WHERE id >= 1 ORDER BY id ASC LIMIT 110;",
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
