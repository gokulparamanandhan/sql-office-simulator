import { QuestionDefinition } from "./ecom-l1-questions";

export const ECOM_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L3-001",
    "domain": "ecommerce",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in categories (Q1)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #1 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;",
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
    "id": "ecom-L3-002",
    "domain": "ecommerce",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q2)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #2 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 12;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 12;",
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
    "id": "ecom-L3-003",
    "domain": "ecommerce",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q3)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #3 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 13;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 13;",
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
    "id": "ecom-L3-004",
    "domain": "ecommerce",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q4)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #4 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 34 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 14;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 34 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 14;",
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
    "id": "ecom-L3-005",
    "domain": "ecommerce",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q5)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #5 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;",
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
    "id": "ecom-L3-006",
    "domain": "ecommerce",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in inventory (Q6)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #6 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 16;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 16;",
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
    "id": "ecom-L3-007",
    "domain": "ecommerce",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in categories (Q7)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #7 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;",
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
    "id": "ecom-L3-008",
    "domain": "ecommerce",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q8)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #8 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 18;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 18;",
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
    "id": "ecom-L3-009",
    "domain": "ecommerce",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q9)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #9 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 19;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 19;",
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
    "id": "ecom-L3-010",
    "domain": "ecommerce",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q10)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #10 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 20;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 40 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 20;",
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
    "id": "ecom-L3-011",
    "domain": "ecommerce",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q11)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #11 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;",
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
    "id": "ecom-L3-012",
    "domain": "ecommerce",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in inventory (Q12)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #12 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 22;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 22;",
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
    "id": "ecom-L3-013",
    "domain": "ecommerce",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in categories (Q13)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #13 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;",
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
    "id": "ecom-L3-014",
    "domain": "ecommerce",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q14)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #14 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 24;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 24;",
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
    "id": "ecom-L3-015",
    "domain": "ecommerce",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q15)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #15 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 25;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 25;",
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
    "id": "ecom-L3-016",
    "domain": "ecommerce",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q16)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #16 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 46 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 46 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;",
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
    "id": "ecom-L3-017",
    "domain": "ecommerce",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q17)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #17 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;",
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
    "id": "ecom-L3-018",
    "domain": "ecommerce",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q18)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #18 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 28;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 28;",
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
    "id": "ecom-L3-019",
    "domain": "ecommerce",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q19)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #19 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;",
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
    "id": "ecom-L3-020",
    "domain": "ecommerce",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q20)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #20 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 30;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 30;",
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
    "id": "ecom-L3-021",
    "domain": "ecommerce",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q21)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #21 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 31;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 31;",
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
    "id": "ecom-L3-022",
    "domain": "ecommerce",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q22)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #22 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 52 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 32;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 52 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 32;",
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
    "id": "ecom-L3-023",
    "domain": "ecommerce",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q23)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #23 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;",
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
    "id": "ecom-L3-024",
    "domain": "ecommerce",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q24)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #24 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 34;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 34;",
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
    "id": "ecom-L3-025",
    "domain": "ecommerce",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q25)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #25 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;",
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
    "id": "ecom-L3-026",
    "domain": "ecommerce",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q26)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #26 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 36;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 36;",
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
    "id": "ecom-L3-027",
    "domain": "ecommerce",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q27)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #27 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 37;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 37;",
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
    "id": "ecom-L3-028",
    "domain": "ecommerce",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q28)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #28 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 58 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 58 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;",
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
    "id": "ecom-L3-029",
    "domain": "ecommerce",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q29)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #29 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;",
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
    "id": "ecom-L3-030",
    "domain": "ecommerce",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q30)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #30 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 40;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 40;",
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
    "id": "ecom-L3-031",
    "domain": "ecommerce",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q31)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #31 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;",
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
    "id": "ecom-L3-032",
    "domain": "ecommerce",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q32)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #32 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 42;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 42;",
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
    "id": "ecom-L3-033",
    "domain": "ecommerce",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q33)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #33 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 43;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 43;",
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
    "id": "ecom-L3-034",
    "domain": "ecommerce",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q34)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #34 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 64 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 44;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 64 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 44;",
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
    "id": "ecom-L3-035",
    "domain": "ecommerce",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q35)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #35 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;",
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
    "id": "ecom-L3-036",
    "domain": "ecommerce",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q36)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #36 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 46;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 46;",
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
    "id": "ecom-L3-037",
    "domain": "ecommerce",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q37)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #37 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;",
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
    "id": "ecom-L3-038",
    "domain": "ecommerce",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q38)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #38 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 48;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 48;",
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
    "id": "ecom-L3-039",
    "domain": "ecommerce",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q39)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #39 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 49;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 49;",
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
    "id": "ecom-L3-040",
    "domain": "ecommerce",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q40)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #40 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 70 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;",
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
    "id": "ecom-L3-041",
    "domain": "ecommerce",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q41)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #41 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;",
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
    "id": "ecom-L3-042",
    "domain": "ecommerce",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q42)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #42 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 52;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 52;",
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
    "id": "ecom-L3-043",
    "domain": "ecommerce",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q43)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #43 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;",
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
    "id": "ecom-L3-044",
    "domain": "ecommerce",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q44)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #44 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 54;",
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
    "id": "ecom-L3-045",
    "domain": "ecommerce",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q45)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #45 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 55;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 55;",
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
    "id": "ecom-L3-046",
    "domain": "ecommerce",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q46)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #46 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 76 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 56;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 76 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 56;",
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
    "id": "ecom-L3-047",
    "domain": "ecommerce",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q47)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #47 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;",
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
    "id": "ecom-L3-048",
    "domain": "ecommerce",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q48)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #48 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 58;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 58;",
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
    "id": "ecom-L3-049",
    "domain": "ecommerce",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q49)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #49 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;",
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
    "id": "ecom-L3-050",
    "domain": "ecommerce",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q50)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #50 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 60;",
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
    "id": "ecom-L3-051",
    "domain": "ecommerce",
    "level": 3,
    "order": 51,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q51)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #51 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 61;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 61;",
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
    "id": "ecom-L3-052",
    "domain": "ecommerce",
    "level": 3,
    "order": 52,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q52)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #52 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 62;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 62;",
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
    "id": "ecom-L3-053",
    "domain": "ecommerce",
    "level": 3,
    "order": 53,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q53)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #53 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;",
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
    "id": "ecom-L3-054",
    "domain": "ecommerce",
    "level": 3,
    "order": 54,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q54)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #54 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 64;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 64;",
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
    "id": "ecom-L3-055",
    "domain": "ecommerce",
    "level": 3,
    "order": 55,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in categories (Q55)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #55 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;",
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
    "id": "ecom-L3-056",
    "domain": "ecommerce",
    "level": 3,
    "order": 56,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q56)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #56 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 66;",
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
    "id": "ecom-L3-057",
    "domain": "ecommerce",
    "level": 3,
    "order": 57,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q57)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #57 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 67;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 67;",
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
    "id": "ecom-L3-058",
    "domain": "ecommerce",
    "level": 3,
    "order": 58,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q58)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #58 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 88 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 68;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 88 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 68;",
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
    "id": "ecom-L3-059",
    "domain": "ecommerce",
    "level": 3,
    "order": 59,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q59)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #59 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;",
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
    "id": "ecom-L3-060",
    "domain": "ecommerce",
    "level": 3,
    "order": 60,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in inventory (Q60)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #60 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 70;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 70;",
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
    "id": "ecom-L3-061",
    "domain": "ecommerce",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in categories (Q61)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #61 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;",
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
    "id": "ecom-L3-062",
    "domain": "ecommerce",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q62)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #62 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 72;",
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
    "id": "ecom-L3-063",
    "domain": "ecommerce",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q63)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #63 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 73;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 73;",
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
    "id": "ecom-L3-064",
    "domain": "ecommerce",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q64)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #64 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 94 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 74;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 94 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 74;",
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
    "id": "ecom-L3-065",
    "domain": "ecommerce",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q65)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #65 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;",
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
    "id": "ecom-L3-066",
    "domain": "ecommerce",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in inventory (Q66)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #66 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 76;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 76;",
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
    "id": "ecom-L3-067",
    "domain": "ecommerce",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in categories (Q67)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #67 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;",
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
    "id": "ecom-L3-068",
    "domain": "ecommerce",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q68)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #68 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 78;",
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
    "id": "ecom-L3-069",
    "domain": "ecommerce",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q69)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #69 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 79;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 79;",
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
    "id": "ecom-L3-070",
    "domain": "ecommerce",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q70)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #70 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 100 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 80;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 100 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 80;",
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
    "id": "ecom-L3-071",
    "domain": "ecommerce",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q71)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #71 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;",
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
    "id": "ecom-L3-072",
    "domain": "ecommerce",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in inventory (Q72)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #72 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 82;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 82;",
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
    "id": "ecom-L3-073",
    "domain": "ecommerce",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in categories (Q73)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #73 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;",
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
    "id": "ecom-L3-074",
    "domain": "ecommerce",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q74)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #74 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 84;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 5) ORDER BY id ASC LIMIT 84;",
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
    "id": "ecom-L3-075",
    "domain": "ecommerce",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q75)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #75 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 85;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 85;",
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
    "id": "ecom-L3-076",
    "domain": "ecommerce",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q76)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #76 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 106 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 106 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;",
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
    "id": "ecom-L3-077",
    "domain": "ecommerce",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q77)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #77 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;",
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
    "id": "ecom-L3-078",
    "domain": "ecommerce",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in inventory (Q78)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #78 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 88;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 88;",
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
    "id": "ecom-L3-079",
    "domain": "ecommerce",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in categories (Q79)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #79 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;",
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
    "id": "ecom-L3-080",
    "domain": "ecommerce",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q80)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #80 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 90;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 1) ORDER BY id ASC LIMIT 90;",
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
    "id": "ecom-L3-081",
    "domain": "ecommerce",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q81)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #81 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 91;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 91;",
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
    "id": "ecom-L3-082",
    "domain": "ecommerce",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q82)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #82 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 92;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 112 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 92;",
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
    "id": "ecom-L3-083",
    "domain": "ecommerce",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q83)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #83 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;",
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
    "id": "ecom-L3-084",
    "domain": "ecommerce",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in inventory (Q84)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #84 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 94;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 94;",
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
    "id": "ecom-L3-085",
    "domain": "ecommerce",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in categories (Q85)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #85 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;",
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
    "id": "ecom-L3-086",
    "domain": "ecommerce",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q86)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #86 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 96;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 2) ORDER BY id ASC LIMIT 96;",
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
    "id": "ecom-L3-087",
    "domain": "ecommerce",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q87)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #87 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 97;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 97;",
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
    "id": "ecom-L3-088",
    "domain": "ecommerce",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q88)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #88 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 118 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 118 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;",
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
    "id": "ecom-L3-089",
    "domain": "ecommerce",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q89)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #89 - Alex Rivera (Chief Executive Officer)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;",
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
    "id": "ecom-L3-090",
    "domain": "ecommerce",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in inventory (Q90)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #90 - Rachel Green (VP of Sales & Growth)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 100;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 100;",
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
    "id": "ecom-L3-091",
    "domain": "ecommerce",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in categories (Q91)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #91 - Liam Vance (Fulfillment & Supply Director)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;",
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
    "id": "ecom-L3-092",
    "domain": "ecommerce",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q92)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #92 - Marcus Bell (Customer Support Lead)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 3) ORDER BY id ASC LIMIT 102;",
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
    "id": "ecom-L3-093",
    "domain": "ecommerce",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q93)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #93 - Alex Rivera (Chief Executive Officer)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 103;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 103;",
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
    "id": "ecom-L3-094",
    "domain": "ecommerce",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q94)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #94 - Rachel Green (VP of Sales & Growth)]: Combine registry names from order_items and orders. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 124 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier from orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 104;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 124 UNION ALL SELECT status::text AS entity_name, 'Secondary Stream' AS source_tier FROM orders WHERE status IS NOT NULL ORDER BY entity_name ASC LIMIT 104;",
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
    "id": "ecom-L3-095",
    "domain": "ecommerce",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q95)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #95 - Liam Vance (Fulfillment & Supply Director)]: Verify relational existence in shipments. Return t.id and t.carrier AS confirmed_item WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.carrier AS confirmed_item FROM shipments t WHERE EXISTS (SELECT 1 FROM shipments sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;",
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
    "id": "ecom-L3-096",
    "domain": "ecommerce",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in inventory (Q96)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #96 - Marcus Bell (Customer Support Lead)]: Query derived table from inventory. Project dt.id, dt.product_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 106;\"",
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
    "reference_sql": "SELECT dt.id, dt.product_id::text AS derived_name, dt.score FROM (SELECT id, product_id::text, quantity_on_hand AS score FROM inventory WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 106;",
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
    "id": "ecom-L3-097",
    "domain": "ecommerce",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in categories (Q97)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer",
      "department": "Executive"
    },
    "request": "From: Alex Rivera (Chief Executive Officer)\n\n\"[Task #97 - Alex Rivera (Chief Executive Officer)]: Isolate records in categories. Select id, name AS item_title, and id AS metric_score where id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(id)"
    ],
    "reference_sql": "SELECT id, name AS item_title, id AS metric_score FROM categories WHERE id >= (SELECT MIN(id) FROM categories) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;",
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
    "id": "ecom-L3-098",
    "domain": "ecommerce",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q98)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth",
      "department": "Sales"
    },
    "request": "From: Rachel Green (VP of Sales & Growth)\n\n\"[Task #98 - Rachel Green (VP of Sales & Growth)]: Filter products using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 108;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM products WHERE id IN (SELECT id FROM products WHERE id >= 4) ORDER BY id ASC LIMIT 108;",
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
    "id": "ecom-L3-099",
    "domain": "ecommerce",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q99)",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Supply Director",
      "department": "Operations"
    },
    "request": "From: Liam Vance (Fulfillment & Supply Director)\n\n\"[Task #99 - Liam Vance (Fulfillment & Supply Director)]: Classify entries in orders. Select id, status AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from orders ORDER BY id ASC LIMIT 109;\"",
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
    "reference_sql": "SELECT id, status AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM orders ORDER BY id ASC LIMIT 109;",
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
    "id": "ecom-L3-100",
    "domain": "ecommerce",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q100)",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Support Lead",
      "department": "Support"
    },
    "request": "From: Marcus Bell (Customer Support Lead)\n\n\"[Task #100 - Marcus Bell (Customer Support Lead)]: Combine registry names from order_items and departments. Select order_id::text::text AS entity_name, 'Primary Stream' AS source_tier from order_items WHERE order_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;\"",
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
    "reference_sql": "SELECT order_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM order_items WHERE order_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;",
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
