import { QuestionDefinition } from "./ecom-l1-questions";

export const ECOM_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L2-001",
    "domain": "ecommerce",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: categories and departments (Q1)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #1 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 11;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 11;",
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
    "id": "ecom-L2-002",
    "domain": "ecommerce",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Volume Distribution: products by name (Q2)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #2 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 12;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 12;",
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
    "id": "ecom-L2-003",
    "domain": "ecommerce",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in customers (Q3)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #3 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 13;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 13;",
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
    "id": "ecom-L2-004",
    "domain": "ecommerce",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in order_items (Q4)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #4 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 54, ordered descending LIMIT 14;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 54 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 14;",
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
    "id": "ecom-L2-005",
    "domain": "ecommerce",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q5)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #5 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 15;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 15;",
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
    "id": "ecom-L2-006",
    "domain": "ecommerce",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on inventory (Q6)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #6 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;",
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
    "id": "ecom-L2-007",
    "domain": "ecommerce",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: categories and departments (Q7)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #7 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 17;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 17;",
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
    "id": "ecom-L2-008",
    "domain": "ecommerce",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Volume Distribution: products by name (Q8)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #8 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 18;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 18;",
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
    "id": "ecom-L2-009",
    "domain": "ecommerce",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in customers (Q9)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #9 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 19;",
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
    "id": "ecom-L2-010",
    "domain": "ecommerce",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in order_items (Q10)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #10 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 60, ordered descending LIMIT 20;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 60 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 20;",
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
    "id": "ecom-L2-011",
    "domain": "ecommerce",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q11)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #11 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 21;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 21;",
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
    "id": "ecom-L2-012",
    "domain": "ecommerce",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on inventory (Q12)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #12 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;",
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
    "id": "ecom-L2-013",
    "domain": "ecommerce",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: categories and departments (Q13)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #13 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 23;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 23;",
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
    "id": "ecom-L2-014",
    "domain": "ecommerce",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Volume Distribution: products by name (Q14)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #14 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 24;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 24;",
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
    "id": "ecom-L2-015",
    "domain": "ecommerce",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in customers (Q15)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #15 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 25;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 25;",
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
    "id": "ecom-L2-016",
    "domain": "ecommerce",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in order_items (Q16)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #16 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 66, ordered descending LIMIT 26;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 66 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 26;",
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
    "id": "ecom-L2-017",
    "domain": "ecommerce",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q17)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #17 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 27;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 27;",
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
    "id": "ecom-L2-018",
    "domain": "ecommerce",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on inventory (Q18)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #18 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;",
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
    "id": "ecom-L2-019",
    "domain": "ecommerce",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: categories and departments (Q19)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #19 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 29;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 29;",
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
    "id": "ecom-L2-020",
    "domain": "ecommerce",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Volume Distribution: products by name (Q20)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #20 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 30;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 30;",
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
    "id": "ecom-L2-021",
    "domain": "ecommerce",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q21)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #21 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 31;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 31;",
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
    "id": "ecom-L2-022",
    "domain": "ecommerce",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q22)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #22 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 72, ordered descending LIMIT 32;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 72 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 32;",
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
    "id": "ecom-L2-023",
    "domain": "ecommerce",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q23)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #23 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 33;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 33;",
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
    "id": "ecom-L2-024",
    "domain": "ecommerce",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q24)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #24 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;",
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
    "id": "ecom-L2-025",
    "domain": "ecommerce",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q25)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #25 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 35;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 35;",
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
    "id": "ecom-L2-026",
    "domain": "ecommerce",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q26)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #26 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 36;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 36;",
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
    "id": "ecom-L2-027",
    "domain": "ecommerce",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q27)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #27 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 37;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 37;",
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
    "id": "ecom-L2-028",
    "domain": "ecommerce",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q28)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #28 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 78, ordered descending LIMIT 38;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 78 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 38;",
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
    "id": "ecom-L2-029",
    "domain": "ecommerce",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q29)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #29 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 39;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 39;",
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
    "id": "ecom-L2-030",
    "domain": "ecommerce",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q30)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #30 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;",
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
    "id": "ecom-L2-031",
    "domain": "ecommerce",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q31)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #31 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 41;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 41;",
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
    "id": "ecom-L2-032",
    "domain": "ecommerce",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q32)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #32 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 42;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 42;",
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
    "id": "ecom-L2-033",
    "domain": "ecommerce",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q33)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #33 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 43;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 43;",
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
    "id": "ecom-L2-034",
    "domain": "ecommerce",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q34)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #34 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 84, ordered descending LIMIT 44;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 84 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 44;",
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
    "id": "ecom-L2-035",
    "domain": "ecommerce",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q35)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #35 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 45;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 45;",
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
    "id": "ecom-L2-036",
    "domain": "ecommerce",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q36)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #36 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;",
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
    "id": "ecom-L2-037",
    "domain": "ecommerce",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q37)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #37 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 47;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 47;",
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
    "id": "ecom-L2-038",
    "domain": "ecommerce",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q38)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #38 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 48;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 48;",
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
    "id": "ecom-L2-039",
    "domain": "ecommerce",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q39)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #39 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 49;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 49;",
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
    "id": "ecom-L2-040",
    "domain": "ecommerce",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q40)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #40 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 90, ordered descending LIMIT 50;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 90 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 50;",
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
    "id": "ecom-L2-041",
    "domain": "ecommerce",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q41)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #41 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 51;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 51;",
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
    "id": "ecom-L2-042",
    "domain": "ecommerce",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q42)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #42 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;",
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
    "id": "ecom-L2-043",
    "domain": "ecommerce",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q43)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #43 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 53;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 53;",
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
    "id": "ecom-L2-044",
    "domain": "ecommerce",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q44)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #44 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 54;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 54;",
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
    "id": "ecom-L2-045",
    "domain": "ecommerce",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q45)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #45 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 55;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 55;",
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
    "id": "ecom-L2-046",
    "domain": "ecommerce",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q46)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #46 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 96, ordered descending LIMIT 56;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 96 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 56;",
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
    "id": "ecom-L2-047",
    "domain": "ecommerce",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q47)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #47 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 57;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 57;",
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
    "id": "ecom-L2-048",
    "domain": "ecommerce",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q48)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #48 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;",
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
    "id": "ecom-L2-049",
    "domain": "ecommerce",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q49)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #49 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 59;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 59;",
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
    "id": "ecom-L2-050",
    "domain": "ecommerce",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q50)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #50 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 60;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 60;",
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
    "id": "ecom-L2-051",
    "domain": "ecommerce",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q51)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #51 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 61;",
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
    "id": "ecom-L2-052",
    "domain": "ecommerce",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q52)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #52 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 102, ordered descending LIMIT 62;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 102 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 62;",
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
    "id": "ecom-L2-053",
    "domain": "ecommerce",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q53)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #53 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 63;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 63;",
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
    "id": "ecom-L2-054",
    "domain": "ecommerce",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q54)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #54 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;",
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
    "id": "ecom-L2-055",
    "domain": "ecommerce",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q55)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #55 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 65;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 65;",
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
    "id": "ecom-L2-056",
    "domain": "ecommerce",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q56)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #56 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 66;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 66;",
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
    "id": "ecom-L2-057",
    "domain": "ecommerce",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q57)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #57 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 67;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 67;",
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
    "id": "ecom-L2-058",
    "domain": "ecommerce",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q58)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #58 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 108, ordered descending LIMIT 68;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 108 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 68;",
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
    "id": "ecom-L2-059",
    "domain": "ecommerce",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q59)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #59 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 69;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 69;",
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
    "id": "ecom-L2-060",
    "domain": "ecommerce",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Financial Metric Rollup on inventory (Q60)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #60 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;",
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
    "id": "ecom-L2-061",
    "domain": "ecommerce",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Relational Cross-Link: categories and departments (Q61)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #61 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 71;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 71;",
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
    "id": "ecom-L2-062",
    "domain": "ecommerce",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Volume Distribution: products by name (Q62)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #62 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 72;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 72;",
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
    "id": "ecom-L2-063",
    "domain": "ecommerce",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in customers (Q63)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #63 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 73;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 73;",
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
    "id": "ecom-L2-064",
    "domain": "ecommerce",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in order_items (Q64)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #64 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 114, ordered descending LIMIT 74;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 114 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 74;",
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
    "id": "ecom-L2-065",
    "domain": "ecommerce",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q65)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #65 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 75;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 75;",
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
    "id": "ecom-L2-066",
    "domain": "ecommerce",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on inventory (Q66)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #66 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;",
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
    "id": "ecom-L2-067",
    "domain": "ecommerce",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: categories and departments (Q67)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #67 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 77;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 77;",
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
    "id": "ecom-L2-068",
    "domain": "ecommerce",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Volume Distribution: products by name (Q68)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #68 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 78;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 78;",
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
    "id": "ecom-L2-069",
    "domain": "ecommerce",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in customers (Q69)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #69 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 79;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 79;",
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
    "id": "ecom-L2-070",
    "domain": "ecommerce",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in order_items (Q70)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #70 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 120, ordered descending LIMIT 80;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 120 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 80;",
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
    "id": "ecom-L2-071",
    "domain": "ecommerce",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q71)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #71 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 81;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 81;",
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
    "id": "ecom-L2-072",
    "domain": "ecommerce",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on inventory (Q72)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #72 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;",
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
    "id": "ecom-L2-073",
    "domain": "ecommerce",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: categories and departments (Q73)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #73 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 83;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 83;",
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
    "id": "ecom-L2-074",
    "domain": "ecommerce",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Volume Distribution: products by name (Q74)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #74 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 84;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 5 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 84;",
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
    "id": "ecom-L2-075",
    "domain": "ecommerce",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in customers (Q75)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #75 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 85;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 1 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 85;",
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
    "id": "ecom-L2-076",
    "domain": "ecommerce",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in order_items (Q76)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #76 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 126, ordered descending LIMIT 86;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 126 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 86;",
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
    "id": "ecom-L2-077",
    "domain": "ecommerce",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q77)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #77 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 87;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 87;",
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
    "id": "ecom-L2-078",
    "domain": "ecommerce",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on inventory (Q78)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #78 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;",
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
    "id": "ecom-L2-079",
    "domain": "ecommerce",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: categories and departments (Q79)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #79 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 89;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 89;",
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
    "id": "ecom-L2-080",
    "domain": "ecommerce",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Volume Distribution: products by name (Q80)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #80 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 90;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 1 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 90;",
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
    "id": "ecom-L2-081",
    "domain": "ecommerce",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in customers (Q81)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #81 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 91;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 2 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 91;",
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
    "id": "ecom-L2-082",
    "domain": "ecommerce",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in order_items (Q82)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #82 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 132, ordered descending LIMIT 92;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 132 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 92;",
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
    "id": "ecom-L2-083",
    "domain": "ecommerce",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q83)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #83 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 93;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 93;",
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
    "id": "ecom-L2-084",
    "domain": "ecommerce",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on inventory (Q84)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #84 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;",
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
    "id": "ecom-L2-085",
    "domain": "ecommerce",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: categories and departments (Q85)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #85 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 95;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 95;",
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
    "id": "ecom-L2-086",
    "domain": "ecommerce",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Volume Distribution: products by name (Q86)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #86 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 96;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 2 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 96;",
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
    "id": "ecom-L2-087",
    "domain": "ecommerce",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in customers (Q87)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #87 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 97;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 3 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 97;",
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
    "id": "ecom-L2-088",
    "domain": "ecommerce",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in order_items (Q88)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #88 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 138, ordered descending LIMIT 98;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 138 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 98;",
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
    "id": "ecom-L2-089",
    "domain": "ecommerce",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q89)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #89 - Alex Rivera (Chief Executive Officer)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 99;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 99;",
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
    "id": "ecom-L2-090",
    "domain": "ecommerce",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on inventory (Q90)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #90 - Rachel Green (VP of Sales & Growth)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;",
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
    "id": "ecom-L2-091",
    "domain": "ecommerce",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Relational Cross-Link: categories and departments (Q91)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #91 - Liam Vance (Fulfillment & Supply Director)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 101;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 101;",
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
    "id": "ecom-L2-092",
    "domain": "ecommerce",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Volume Distribution: products by name (Q92)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #92 - Marcus Bell (Customer Support Lead)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 102;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 3 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 102;",
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
    "id": "ecom-L2-093",
    "domain": "ecommerce",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in customers (Q93)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #93 - Alex Rivera (Chief Executive Officer)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 4 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 103;",
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
    "id": "ecom-L2-094",
    "domain": "ecommerce",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in order_items (Q94)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #94 - Rachel Green (VP of Sales & Growth)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 144, ordered descending LIMIT 104;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 144 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 104;",
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
    "id": "ecom-L2-095",
    "domain": "ecommerce",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Comprehensive Relation Audit: Left Join on orders (Q95)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #95 - Liam Vance (Fulfillment & Supply Director)]: Perform a LEFT JOIN from orders to shipments. Return p.id, p.status AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 105;\"",
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
    "reference_sql": "SELECT p.id, p.status AS parent_name, COALESCE(t.id, 0) AS matched_id FROM orders p LEFT JOIN shipments t ON p.id = t.order_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 105;",
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
    "id": "ecom-L2-096",
    "domain": "ecommerce",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Financial Metric Rollup on inventory (Q96)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #96 - Marcus Bell (Customer Support Lead)]: Calculate average quantity_on_hand per parent entity in products. Return p.name AS parent_name and ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.quantity_on_hand::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.quantity_on_hand::numeric), 2) AS avg_metric FROM products p JOIN inventory t ON p.id = t.product_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;",
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
    "id": "ecom-L2-097",
    "domain": "ecommerce",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Relational Cross-Link: categories and departments (Q97)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #97 - Alex Rivera (Chief Executive Officer)]: Connect categories with departments. Return t.id, t.name AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 107;\"",
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
    "reference_sql": "SELECT t.id, t.name AS child_ref, p.name AS parent_name FROM categories t JOIN departments p ON t.department_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 107;",
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
    "id": "ecom-L2-098",
    "domain": "ecommerce",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Volume Distribution: products by name (Q98)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #98 - Rachel Green (VP of Sales & Growth)]: Summarize volume in products by name. Return name AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 108;\"",
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
    "reference_sql": "SELECT name AS group_label, COUNT(*) AS record_count FROM products WHERE name IS NOT NULL AND id >= 4 GROUP BY name ORDER BY record_count DESC, group_label ASC LIMIT 108;",
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
    "id": "ecom-L2-099",
    "domain": "ecommerce",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in customers (Q99)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #99 - Liam Vance (Fulfillment & Supply Director)]: Compile aggregated metrics joining orders to customers. Return p.first_name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 109;\"",
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
    "reference_sql": "SELECT p.first_name AS parent_name, COUNT(t.id) AS child_count FROM customers p JOIN orders t ON p.id = t.customer_id WHERE p.id >= 5 GROUP BY p.first_name ORDER BY child_count DESC, parent_name ASC LIMIT 109;",
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
    "id": "ecom-L2-100",
    "domain": "ecommerce",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in order_items (Q100)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #100 - Marcus Bell (Customer Support Lead)]: Identify high-density segments in order_items. Group by product_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 150, ordered descending LIMIT 110;\"",
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
    "reference_sql": "SELECT product_id::text AS segment_key, COUNT(*) AS record_count FROM order_items WHERE product_id::text IS NOT NULL AND id <= 150 GROUP BY product_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 110;",
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
