import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L1-001",
    "domain": "restaurants",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "RESTAURANTS Directory Audit (Q1)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #1 - Chef Marco Vieri (Executive Chef & Founder)]: Ahead of our quarterly audit, pull our active restaurants records showing id and name as display_name, ordered by id ascending. Limit output to 11 records.\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM restaurants WHERE id >= 2 ORDER BY id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-002",
    "domain": "restaurants",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "DINING SECTIONS Directory Audit (Q2)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #2 - Giulia Conti (Director of Hospitality)]: Ahead of our quarterly audit, pull our active dining_sections records showing id and section_name as display_name, ordered by id ascending. Limit output to 12 records.\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, section_name AS display_name FROM dining_sections WHERE id >= 3 ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-003",
    "domain": "restaurants",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "DINING TABLES Directory Audit (Q3)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #3 - Elena Rossi (Beverage & Cellar Director)]: Ahead of our quarterly audit, pull our active dining_tables records showing id and table_number::text as display_name, ordered by id ascending. Limit output to 13 records.\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, table_number::text AS display_name FROM dining_tables WHERE id >= 4 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-004",
    "domain": "restaurants",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "MENU CATEGORIES Directory Audit (Q4)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #4 - Matteo Ricci (General Operations Manager)]: Ahead of our quarterly audit, pull our active menu_categories records showing id and name as display_name, ordered by id ascending. Limit output to 14 records.\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM menu_categories WHERE id >= 5 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-005",
    "domain": "restaurants",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "MENU ITEMS Directory Audit (Q5)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #5 - Chef Marco Vieri (Executive Chef & Founder)]: Ahead of our quarterly audit, pull our active menu_items records showing id and name as display_name, ordered by id ascending. Limit output to 15 records.\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM menu_items WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-006",
    "domain": "restaurants",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "INGREDIENTS Directory Audit (Q6)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #6 - Giulia Conti (Director of Hospitality)]: Ahead of our quarterly audit, pull our active ingredients records showing id and ingredient_name as display_name, ordered by id ascending. Limit output to 16 records.\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, ingredient_name AS display_name FROM ingredients WHERE id >= 2 ORDER BY id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-007",
    "domain": "restaurants",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "SUPPLIERS Directory Audit (Q7)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #7 - Elena Rossi (Beverage & Cellar Director)]: Ahead of our quarterly audit, pull our active suppliers records showing id and supplier_name as display_name, ordered by id ascending. Limit output to 17 records.\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, supplier_name AS display_name FROM suppliers WHERE id >= 3 ORDER BY id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-008",
    "domain": "restaurants",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "INGREDIENT PURCHASES Directory Audit (Q8)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #8 - Matteo Ricci (General Operations Manager)]: Ahead of our quarterly audit, pull our active ingredient_purchases records showing id and restaurant_id::text as display_name, ordered by id ascending. Limit output to 18 records.\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, restaurant_id::text AS display_name FROM ingredient_purchases WHERE id >= 4 ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-009",
    "domain": "restaurants",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "RESERVATIONS Directory Audit (Q9)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #9 - Chef Marco Vieri (Executive Chef & Founder)]: Ahead of our quarterly audit, pull our active reservations records showing id and guest_name as display_name, ordered by id ascending. Limit output to 19 records.\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, guest_name AS display_name FROM reservations WHERE id >= 5 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-010",
    "domain": "restaurants",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "ORDERS Directory Audit (Q10)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #10 - Giulia Conti (Director of Hospitality)]: Ahead of our quarterly audit, pull our active orders records showing id and server_name as display_name, ordered by id ascending. Limit output to 20 records.\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, server_name AS display_name FROM orders WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-011",
    "domain": "restaurants",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "ORDER ITEMS Directory Audit (Q11)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #11 - Elena Rossi (Beverage & Cellar Director)]: Ahead of our quarterly audit, pull our active order_items records showing id and order_id::text as display_name, ordered by id ascending. Limit output to 21 records.\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, order_id::text AS display_name FROM order_items WHERE id >= 2 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-012",
    "domain": "restaurants",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "STAFF MEMBERS Directory Audit (Q12)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #12 - Matteo Ricci (General Operations Manager)]: Ahead of our quarterly audit, pull our active staff_members records showing id and name as display_name, ordered by id ascending. Limit output to 22 records.\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM staff_members WHERE id >= 3 ORDER BY id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-013",
    "domain": "restaurants",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "SHIFTS Directory Audit (Q13)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #13 - Chef Marco Vieri (Executive Chef & Founder)]: Ahead of our quarterly audit, pull our active shifts records showing id and shift_type as display_name, ordered by id ascending. Limit output to 23 records.\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, shift_type AS display_name FROM shifts WHERE id >= 4 ORDER BY id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-014",
    "domain": "restaurants",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "GUEST REVIEWS Directory Audit (Q14)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #14 - Giulia Conti (Director of Hospitality)]: Ahead of our quarterly audit, pull our active guest_reviews records showing id and comments as display_name, ordered by id ascending. Limit output to 24 records.\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, comments AS display_name FROM guest_reviews WHERE id >= 5 ORDER BY id ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-015",
    "domain": "restaurants",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in restaurants (Q15)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #15 - Elena Rossi (Beverage & Cellar Director)]: Identify high-volume entries in restaurants. Select id, name AS item_title, and seating_capacity AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 25;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
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
    "reference_sql": "SELECT id, name AS item_title, seating_capacity AS metric_val FROM restaurants WHERE id >= 1 ORDER BY metric_val DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-016",
    "domain": "restaurants",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in dining_sections (Q16)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #16 - Matteo Ricci (General Operations Manager)]: Identify high-volume entries in dining_sections. Select id, section_name AS item_title, and restaurant_id AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 26;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
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
    "reference_sql": "SELECT id, section_name AS item_title, restaurant_id AS metric_val FROM dining_sections WHERE id >= 2 ORDER BY metric_val DESC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-017",
    "domain": "restaurants",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in dining_tables (Q17)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #17 - Chef Marco Vieri (Executive Chef & Founder)]: Identify high-volume entries in dining_tables. Select id, table_number::text AS item_title, and max_seats AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 27;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
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
    "reference_sql": "SELECT id, table_number::text AS item_title, max_seats AS metric_val FROM dining_tables WHERE id >= 3 ORDER BY metric_val DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-018",
    "domain": "restaurants",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in menu_categories (Q18)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #18 - Giulia Conti (Director of Hospitality)]: Identify high-volume entries in menu_categories. Select id, name AS item_title, and id AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 28;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
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
    "reference_sql": "SELECT id, name AS item_title, id AS metric_val FROM menu_categories WHERE id >= 4 ORDER BY metric_val DESC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-019",
    "domain": "restaurants",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in menu_items (Q19)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #19 - Elena Rossi (Beverage & Cellar Director)]: Identify high-volume entries in menu_items. Select id, name AS item_title, and price AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 29;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
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
    "reference_sql": "SELECT id, name AS item_title, price AS metric_val FROM menu_items WHERE id >= 5 ORDER BY metric_val DESC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-020",
    "domain": "restaurants",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in ingredients (Q20)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #20 - Matteo Ricci (General Operations Manager)]: Identify high-volume entries in ingredients. Select id, ingredient_name AS item_title, and unit_cost AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 30;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
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
    "reference_sql": "SELECT id, ingredient_name AS item_title, unit_cost AS metric_val FROM ingredients WHERE id >= 1 ORDER BY metric_val DESC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-021",
    "domain": "restaurants",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in suppliers (Q21)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #21 - Chef Marco Vieri (Executive Chef & Founder)]: Identify high-volume entries in suppliers. Select id, supplier_name AS item_title, and rating AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 31;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
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
    "reference_sql": "SELECT id, supplier_name AS item_title, rating AS metric_val FROM suppliers WHERE id >= 2 ORDER BY metric_val DESC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-022",
    "domain": "restaurants",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in ingredient_purchases (Q22)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #22 - Giulia Conti (Director of Hospitality)]: Identify high-volume entries in ingredient_purchases. Select id, restaurant_id::text AS item_title, and total_amount AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 32;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
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
    "reference_sql": "SELECT id, restaurant_id::text AS item_title, total_amount AS metric_val FROM ingredient_purchases WHERE id >= 3 ORDER BY metric_val DESC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-023",
    "domain": "restaurants",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in reservations (Q23)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #23 - Elena Rossi (Beverage & Cellar Director)]: Identify high-volume entries in reservations. Select id, guest_name AS item_title, and party_size AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 33;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
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
    "reference_sql": "SELECT id, guest_name AS item_title, party_size AS metric_val FROM reservations WHERE id >= 4 ORDER BY metric_val DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-024",
    "domain": "restaurants",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in orders (Q24)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #24 - Matteo Ricci (General Operations Manager)]: Identify high-volume entries in orders. Select id, server_name AS item_title, and total_amount AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 34;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
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
    "reference_sql": "SELECT id, server_name AS item_title, total_amount AS metric_val FROM orders WHERE id >= 5 ORDER BY metric_val DESC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-025",
    "domain": "restaurants",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in order_items (Q25)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #25 - Chef Marco Vieri (Executive Chef & Founder)]: Identify high-volume entries in order_items. Select id, order_id::text AS item_title, and quantity AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 35;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
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
    "reference_sql": "SELECT id, order_id::text AS item_title, quantity AS metric_val FROM order_items WHERE id >= 1 ORDER BY metric_val DESC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-026",
    "domain": "restaurants",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in staff_members (Q26)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #26 - Giulia Conti (Director of Hospitality)]: Identify high-volume entries in staff_members. Select id, name AS item_title, and hourly_rate AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 36;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
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
    "reference_sql": "SELECT id, name AS item_title, hourly_rate AS metric_val FROM staff_members WHERE id >= 2 ORDER BY metric_val DESC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-027",
    "domain": "restaurants",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in shifts (Q27)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #27 - Elena Rossi (Beverage & Cellar Director)]: Identify high-volume entries in shifts. Select id, shift_type AS item_title, and hours_worked AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 37;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
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
    "reference_sql": "SELECT id, shift_type AS item_title, hours_worked AS metric_val FROM shifts WHERE id >= 3 ORDER BY metric_val DESC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-028",
    "domain": "restaurants",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in guest_reviews (Q28)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #28 - Matteo Ricci (General Operations Manager)]: Identify high-volume entries in guest_reviews. Select id, comments AS item_title, and rating AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 38;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
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
    "reference_sql": "SELECT id, comments AS item_title, rating AS metric_val FROM guest_reviews WHERE id >= 4 ORDER BY metric_val DESC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-029",
    "domain": "restaurants",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on restaurants (Q29)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #29 - Chef Marco Vieri (Executive Chef & Founder)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and seating_capacity AS val from restaurants where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
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
    "reference_sql": "SELECT id, name AS entity_name, seating_capacity AS val FROM restaurants WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-030",
    "domain": "restaurants",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on dining_sections (Q30)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #30 - Giulia Conti (Director of Hospitality)]: Management is tracking midpoint distributions. Select id, section_name AS entity_name, and restaurant_id AS val from dining_sections where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
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
    "reference_sql": "SELECT id, section_name AS entity_name, restaurant_id AS val FROM dining_sections WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "rest-L1-031",
    "domain": "restaurants",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on dining_tables (Q31)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #31 - Elena Rossi (Beverage & Cellar Director)]: Management is tracking midpoint distributions. Select id, table_number::text AS entity_name, and max_seats AS val from dining_tables where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
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
    "reference_sql": "SELECT id, table_number::text AS entity_name, max_seats AS val FROM dining_tables WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-032",
    "domain": "restaurants",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on menu_categories (Q32)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #32 - Matteo Ricci (General Operations Manager)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and id AS val from menu_categories where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
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
    "reference_sql": "SELECT id, name AS entity_name, id AS val FROM menu_categories WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-033",
    "domain": "restaurants",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on menu_items (Q33)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #33 - Chef Marco Vieri (Executive Chef & Founder)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and price AS val from menu_items where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
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
    "reference_sql": "SELECT id, name AS entity_name, price AS val FROM menu_items WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-034",
    "domain": "restaurants",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on ingredients (Q34)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #34 - Giulia Conti (Director of Hospitality)]: Management is tracking midpoint distributions. Select id, ingredient_name AS entity_name, and unit_cost AS val from ingredients where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
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
    "reference_sql": "SELECT id, ingredient_name AS entity_name, unit_cost AS val FROM ingredients WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-035",
    "domain": "restaurants",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on suppliers (Q35)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #35 - Elena Rossi (Beverage & Cellar Director)]: Management is tracking midpoint distributions. Select id, supplier_name AS entity_name, and rating AS val from suppliers where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
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
    "reference_sql": "SELECT id, supplier_name AS entity_name, rating AS val FROM suppliers WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-036",
    "domain": "restaurants",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on ingredient_purchases (Q36)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #36 - Matteo Ricci (General Operations Manager)]: Management is tracking midpoint distributions. Select id, restaurant_id::text AS entity_name, and total_amount AS val from ingredient_purchases where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
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
    "reference_sql": "SELECT id, restaurant_id::text AS entity_name, total_amount AS val FROM ingredient_purchases WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-037",
    "domain": "restaurants",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on reservations (Q37)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #37 - Chef Marco Vieri (Executive Chef & Founder)]: Management is tracking midpoint distributions. Select id, guest_name AS entity_name, and party_size AS val from reservations where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
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
    "reference_sql": "SELECT id, guest_name AS entity_name, party_size AS val FROM reservations WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-038",
    "domain": "restaurants",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on orders (Q38)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #38 - Giulia Conti (Director of Hospitality)]: Management is tracking midpoint distributions. Select id, server_name AS entity_name, and total_amount AS val from orders where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
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
    "reference_sql": "SELECT id, server_name AS entity_name, total_amount AS val FROM orders WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-039",
    "domain": "restaurants",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on order_items (Q39)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #39 - Elena Rossi (Beverage & Cellar Director)]: Management is tracking midpoint distributions. Select id, order_id::text AS entity_name, and quantity AS val from order_items where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
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
    "reference_sql": "SELECT id, order_id::text AS entity_name, quantity AS val FROM order_items WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-040",
    "domain": "restaurants",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on staff_members (Q40)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #40 - Matteo Ricci (General Operations Manager)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and hourly_rate AS val from staff_members where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 50;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
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
    "reference_sql": "SELECT id, name AS entity_name, hourly_rate AS val FROM staff_members WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-041",
    "domain": "restaurants",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on shifts (Q41)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #41 - Chef Marco Vieri (Executive Chef & Founder)]: Management is tracking midpoint distributions. Select id, shift_type AS entity_name, and hours_worked AS val from shifts where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 51;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
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
    "reference_sql": "SELECT id, shift_type AS entity_name, hours_worked AS val FROM shifts WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-042",
    "domain": "restaurants",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on guest_reviews (Q42)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #42 - Giulia Conti (Director of Hospitality)]: Management is tracking midpoint distributions. Select id, comments AS entity_name, and rating AS val from guest_reviews where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 52;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
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
    "reference_sql": "SELECT id, comments AS entity_name, rating AS val FROM guest_reviews WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-043",
    "domain": "restaurants",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in restaurants (Q43)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #43 - Elena Rossi (Beverage & Cellar Director)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(seating_capacity, 0.00) AS safe_val from restaurants WHERE id >= 4 ORDER BY id ASC LIMIT 53;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "seating_capacity",
      "safe_val"
    ],
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(seating_capacity, 0.00) AS safe_val FROM restaurants WHERE id >= 4 ORDER BY id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-044",
    "domain": "restaurants",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in dining_sections (Q44)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #44 - Matteo Ricci (General Operations Manager)]: Ensure robust reporting against missing values. Select id, section_name AS entry_name, and COALESCE(restaurant_id, 0.00) AS safe_val from dining_sections WHERE id >= 5 ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "restaurant_id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, section_name AS entry_name, COALESCE(restaurant_id, 0.00) AS safe_val FROM dining_sections WHERE id >= 5 ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-045",
    "domain": "restaurants",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in dining_tables (Q45)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #45 - Chef Marco Vieri (Executive Chef & Founder)]: Ensure robust reporting against missing values. Select id, table_number::text AS entry_name, and COALESCE(max_seats, 0.00) AS safe_val from dining_tables WHERE id >= 1 ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "max_seats",
      "safe_val"
    ],
    "reference_sql": "SELECT id, table_number::text AS entry_name, COALESCE(max_seats, 0.00) AS safe_val FROM dining_tables WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-046",
    "domain": "restaurants",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in menu_categories (Q46)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #46 - Giulia Conti (Director of Hospitality)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(id, 0.00) AS safe_val from menu_categories WHERE id >= 2 ORDER BY id ASC LIMIT 56;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
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
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(id, 0.00) AS safe_val FROM menu_categories WHERE id >= 2 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-047",
    "domain": "restaurants",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in menu_items (Q47)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #47 - Elena Rossi (Beverage & Cellar Director)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(price, 0.00) AS safe_val from menu_items WHERE id >= 3 ORDER BY id ASC LIMIT 57;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "price",
      "safe_val"
    ],
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(price, 0.00) AS safe_val FROM menu_items WHERE id >= 3 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-048",
    "domain": "restaurants",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in ingredients (Q48)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #48 - Matteo Ricci (General Operations Manager)]: Ensure robust reporting against missing values. Select id, ingredient_name AS entry_name, and COALESCE(unit_cost, 0.00) AS safe_val from ingredients WHERE id >= 4 ORDER BY id ASC LIMIT 58;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "unit_cost",
      "safe_val"
    ],
    "reference_sql": "SELECT id, ingredient_name AS entry_name, COALESCE(unit_cost, 0.00) AS safe_val FROM ingredients WHERE id >= 4 ORDER BY id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-049",
    "domain": "restaurants",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in suppliers (Q49)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #49 - Chef Marco Vieri (Executive Chef & Founder)]: Ensure robust reporting against missing values. Select id, supplier_name AS entry_name, and COALESCE(rating, 0.00) AS safe_val from suppliers WHERE id >= 5 ORDER BY id ASC LIMIT 59;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "rating",
      "safe_val"
    ],
    "reference_sql": "SELECT id, supplier_name AS entry_name, COALESCE(rating, 0.00) AS safe_val FROM suppliers WHERE id >= 5 ORDER BY id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-050",
    "domain": "restaurants",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in ingredient_purchases (Q50)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #50 - Giulia Conti (Director of Hospitality)]: Ensure robust reporting against missing values. Select id, restaurant_id::text AS entry_name, and COALESCE(total_amount, 0.00) AS safe_val from ingredient_purchases WHERE id >= 1 ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "total_amount",
      "safe_val"
    ],
    "reference_sql": "SELECT id, restaurant_id::text AS entry_name, COALESCE(total_amount, 0.00) AS safe_val FROM ingredient_purchases WHERE id >= 1 ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-051",
    "domain": "restaurants",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in reservations (Q51)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #51 - Elena Rossi (Beverage & Cellar Director)]: Ensure robust reporting against missing values. Select id, guest_name AS entry_name, and COALESCE(party_size, 0.00) AS safe_val from reservations WHERE id >= 2 ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "party_size",
      "safe_val"
    ],
    "reference_sql": "SELECT id, guest_name AS entry_name, COALESCE(party_size, 0.00) AS safe_val FROM reservations WHERE id >= 2 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-052",
    "domain": "restaurants",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in orders (Q52)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #52 - Matteo Ricci (General Operations Manager)]: Ensure robust reporting against missing values. Select id, server_name AS entry_name, and COALESCE(total_amount, 0.00) AS safe_val from orders WHERE id >= 3 ORDER BY id ASC LIMIT 62;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "total_amount",
      "safe_val"
    ],
    "reference_sql": "SELECT id, server_name AS entry_name, COALESCE(total_amount, 0.00) AS safe_val FROM orders WHERE id >= 3 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-053",
    "domain": "restaurants",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in order_items (Q53)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #53 - Chef Marco Vieri (Executive Chef & Founder)]: Ensure robust reporting against missing values. Select id, order_id::text AS entry_name, and COALESCE(quantity, 0.00) AS safe_val from order_items WHERE id >= 4 ORDER BY id ASC LIMIT 63;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "quantity",
      "safe_val"
    ],
    "reference_sql": "SELECT id, order_id::text AS entry_name, COALESCE(quantity, 0.00) AS safe_val FROM order_items WHERE id >= 4 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-054",
    "domain": "restaurants",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in staff_members (Q54)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #54 - Giulia Conti (Director of Hospitality)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(hourly_rate, 0.00) AS safe_val from staff_members WHERE id >= 5 ORDER BY id ASC LIMIT 64;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "hourly_rate",
      "safe_val"
    ],
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(hourly_rate, 0.00) AS safe_val FROM staff_members WHERE id >= 5 ORDER BY id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-055",
    "domain": "restaurants",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in shifts (Q55)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #55 - Elena Rossi (Beverage & Cellar Director)]: Ensure robust reporting against missing values. Select id, shift_type AS entry_name, and COALESCE(hours_worked, 0.00) AS safe_val from shifts WHERE id >= 1 ORDER BY id ASC LIMIT 65;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "hours_worked",
      "safe_val"
    ],
    "reference_sql": "SELECT id, shift_type AS entry_name, COALESCE(hours_worked, 0.00) AS safe_val FROM shifts WHERE id >= 1 ORDER BY id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-056",
    "domain": "restaurants",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in guest_reviews (Q56)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #56 - Matteo Ricci (General Operations Manager)]: Ensure robust reporting against missing values. Select id, comments AS entry_name, and COALESCE(rating, 0.00) AS safe_val from guest_reviews WHERE id >= 2 ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "rating",
      "safe_val"
    ],
    "reference_sql": "SELECT id, comments AS entry_name, COALESCE(rating, 0.00) AS safe_val FROM guest_reviews WHERE id >= 2 ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-057",
    "domain": "restaurants",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "String Normalization on restaurants (Q57)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #57 - Chef Marco Vieri (Executive Chef & Founder)]: Standardize text fields in restaurants. Select id, UPPER(TRIM(name::text)) AS clean_name from restaurants WHERE name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM restaurants WHERE name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-058",
    "domain": "restaurants",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "String Normalization on dining_sections (Q58)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #58 - Giulia Conti (Director of Hospitality)]: Standardize text fields in dining_sections. Select id, UPPER(TRIM(section_name::text)) AS clean_name from dining_sections WHERE section_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(section_name::text)) AS clean_name FROM dining_sections WHERE section_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-059",
    "domain": "restaurants",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "String Normalization on dining_tables (Q59)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #59 - Elena Rossi (Beverage & Cellar Director)]: Standardize text fields in dining_tables. Select id, UPPER(TRIM(table_number::text::text)) AS clean_name from dining_tables WHERE table_number::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(table_number::text::text)) AS clean_name FROM dining_tables WHERE table_number::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-060",
    "domain": "restaurants",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "String Normalization on menu_categories (Q60)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #60 - Matteo Ricci (General Operations Manager)]: Standardize text fields in menu_categories. Select id, UPPER(TRIM(name::text)) AS clean_name from menu_categories WHERE name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM menu_categories WHERE name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-061",
    "domain": "restaurants",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "String Normalization on menu_items (Q61)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #61 - Chef Marco Vieri (Executive Chef & Founder)]: Standardize text fields in menu_items. Select id, UPPER(TRIM(name::text)) AS clean_name from menu_items WHERE name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM menu_items WHERE name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-062",
    "domain": "restaurants",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "String Normalization on ingredients (Q62)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #62 - Giulia Conti (Director of Hospitality)]: Standardize text fields in ingredients. Select id, UPPER(TRIM(ingredient_name::text)) AS clean_name from ingredients WHERE ingredient_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(ingredient_name::text)) AS clean_name FROM ingredients WHERE ingredient_name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-063",
    "domain": "restaurants",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "String Normalization on suppliers (Q63)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #63 - Elena Rossi (Beverage & Cellar Director)]: Standardize text fields in suppliers. Select id, UPPER(TRIM(supplier_name::text)) AS clean_name from suppliers WHERE supplier_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(supplier_name::text)) AS clean_name FROM suppliers WHERE supplier_name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-064",
    "domain": "restaurants",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "String Normalization on ingredient_purchases (Q64)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #64 - Matteo Ricci (General Operations Manager)]: Standardize text fields in ingredient_purchases. Select id, UPPER(TRIM(restaurant_id::text::text)) AS clean_name from ingredient_purchases WHERE restaurant_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(restaurant_id::text::text)) AS clean_name FROM ingredient_purchases WHERE restaurant_id::text IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-065",
    "domain": "restaurants",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "String Normalization on reservations (Q65)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #65 - Chef Marco Vieri (Executive Chef & Founder)]: Standardize text fields in reservations. Select id, UPPER(TRIM(guest_name::text)) AS clean_name from reservations WHERE guest_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(guest_name::text)) AS clean_name FROM reservations WHERE guest_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-066",
    "domain": "restaurants",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "String Normalization on orders (Q66)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #66 - Giulia Conti (Director of Hospitality)]: Standardize text fields in orders. Select id, UPPER(TRIM(server_name::text)) AS clean_name from orders WHERE server_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 76;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(server_name::text)) AS clean_name FROM orders WHERE server_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-067",
    "domain": "restaurants",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "String Normalization on order_items (Q67)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #67 - Elena Rossi (Beverage & Cellar Director)]: Standardize text fields in order_items. Select id, UPPER(TRIM(order_id::text::text)) AS clean_name from order_items WHERE order_id::text IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 77;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(order_id::text::text)) AS clean_name FROM order_items WHERE order_id::text IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-068",
    "domain": "restaurants",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "String Normalization on staff_members (Q68)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #68 - Matteo Ricci (General Operations Manager)]: Standardize text fields in staff_members. Select id, UPPER(TRIM(name::text)) AS clean_name from staff_members WHERE name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM staff_members WHERE name IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-069",
    "domain": "restaurants",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "String Normalization on shifts (Q69)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #69 - Chef Marco Vieri (Executive Chef & Founder)]: Standardize text fields in shifts. Select id, UPPER(TRIM(shift_type::text)) AS clean_name from shifts WHERE shift_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 79;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(shift_type::text)) AS clean_name FROM shifts WHERE shift_type IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-070",
    "domain": "restaurants",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "String Normalization on guest_reviews (Q70)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #70 - Giulia Conti (Director of Hospitality)]: Standardize text fields in guest_reviews. Select id, UPPER(TRIM(comments::text)) AS clean_name from guest_reviews WHERE comments IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 80;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
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
    "reference_sql": "SELECT id, UPPER(TRIM(comments::text)) AS clean_name FROM guest_reviews WHERE comments IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L1-071",
    "domain": "restaurants",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Category Classification in restaurants (Q71)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #71 - Elena Rossi (Beverage & Cellar Director)]: Review our unique classification segments in restaurants. Select DISTINCT city AS category_label from restaurants WHERE city IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT city AS category_label FROM restaurants WHERE city IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-072",
    "domain": "restaurants",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Category Classification in dining_sections (Q72)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #72 - Matteo Ricci (General Operations Manager)]: Review our unique classification segments in dining_sections. Select DISTINCT section_name AS category_label from dining_sections WHERE section_name IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT section_name AS category_label FROM dining_sections WHERE section_name IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-073",
    "domain": "restaurants",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Category Classification in dining_tables (Q73)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #73 - Chef Marco Vieri (Executive Chef & Founder)]: Review our unique classification segments in dining_tables. Select DISTINCT table_number::text AS category_label from dining_tables WHERE table_number::text IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT table_number::text AS category_label FROM dining_tables WHERE table_number::text IS NOT NULL AND id <= 123 ORDER BY category_label ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-074",
    "domain": "restaurants",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Category Classification in menu_categories (Q74)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #74 - Giulia Conti (Director of Hospitality)]: Review our unique classification segments in menu_categories. Select DISTINCT name AS category_label from menu_categories WHERE name IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT name AS category_label FROM menu_categories WHERE name IS NOT NULL AND id <= 124 ORDER BY category_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-075",
    "domain": "restaurants",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Category Classification in menu_items (Q75)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #75 - Elena Rossi (Beverage & Cellar Director)]: Review our unique classification segments in menu_items. Select DISTINCT category AS category_label from menu_items WHERE category IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT category AS category_label FROM menu_items WHERE category IS NOT NULL AND id <= 125 ORDER BY category_label ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-076",
    "domain": "restaurants",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Category Classification in ingredients (Q76)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #76 - Matteo Ricci (General Operations Manager)]: Review our unique classification segments in ingredients. Select DISTINCT category AS category_label from ingredients WHERE category IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT category AS category_label FROM ingredients WHERE category IS NOT NULL AND id <= 126 ORDER BY category_label ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-077",
    "domain": "restaurants",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Category Classification in suppliers (Q77)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #77 - Chef Marco Vieri (Executive Chef & Founder)]: Review our unique classification segments in suppliers. Select DISTINCT category AS category_label from suppliers WHERE category IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT category AS category_label FROM suppliers WHERE category IS NOT NULL AND id <= 127 ORDER BY category_label ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-078",
    "domain": "restaurants",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Category Classification in ingredient_purchases (Q78)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #78 - Giulia Conti (Director of Hospitality)]: Review our unique classification segments in ingredient_purchases. Select DISTINCT restaurant_id::text AS category_label from ingredient_purchases WHERE restaurant_id::text IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT restaurant_id::text AS category_label FROM ingredient_purchases WHERE restaurant_id::text IS NOT NULL AND id <= 128 ORDER BY category_label ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-079",
    "domain": "restaurants",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Category Classification in reservations (Q79)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #79 - Elena Rossi (Beverage & Cellar Director)]: Review our unique classification segments in reservations. Select DISTINCT status AS category_label from reservations WHERE status IS NOT NULL AND id <= 129 ORDER BY category_label ASC LIMIT 89;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM reservations WHERE status IS NOT NULL AND id <= 129 ORDER BY category_label ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-080",
    "domain": "restaurants",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Category Classification in orders (Q80)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #80 - Matteo Ricci (General Operations Manager)]: Review our unique classification segments in orders. Select DISTINCT server_name AS category_label from orders WHERE server_name IS NOT NULL AND id <= 130 ORDER BY category_label ASC LIMIT 90;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT server_name AS category_label FROM orders WHERE server_name IS NOT NULL AND id <= 130 ORDER BY category_label ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-081",
    "domain": "restaurants",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Category Classification in order_items (Q81)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #81 - Chef Marco Vieri (Executive Chef & Founder)]: Review our unique classification segments in order_items. Select DISTINCT order_id::text AS category_label from order_items WHERE order_id::text IS NOT NULL AND id <= 131 ORDER BY category_label ASC LIMIT 91;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT order_id::text AS category_label FROM order_items WHERE order_id::text IS NOT NULL AND id <= 131 ORDER BY category_label ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-082",
    "domain": "restaurants",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Category Classification in staff_members (Q82)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #82 - Giulia Conti (Director of Hospitality)]: Review our unique classification segments in staff_members. Select DISTINCT role AS category_label from staff_members WHERE role IS NOT NULL AND id <= 132 ORDER BY category_label ASC LIMIT 92;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT role AS category_label FROM staff_members WHERE role IS NOT NULL AND id <= 132 ORDER BY category_label ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-083",
    "domain": "restaurants",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Category Classification in shifts (Q83)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #83 - Elena Rossi (Beverage & Cellar Director)]: Review our unique classification segments in shifts. Select DISTINCT shift_type AS category_label from shifts WHERE shift_type IS NOT NULL AND id <= 133 ORDER BY category_label ASC LIMIT 93;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT shift_type AS category_label FROM shifts WHERE shift_type IS NOT NULL AND id <= 133 ORDER BY category_label ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-084",
    "domain": "restaurants",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Category Classification in guest_reviews (Q84)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #84 - Matteo Ricci (General Operations Manager)]: Review our unique classification segments in guest_reviews. Select DISTINCT restaurant_id::text AS category_label from guest_reviews WHERE restaurant_id::text IS NOT NULL AND id <= 134 ORDER BY category_label ASC LIMIT 94;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT restaurant_id::text AS category_label FROM guest_reviews WHERE restaurant_id::text IS NOT NULL AND id <= 134 ORDER BY category_label ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-085",
    "domain": "restaurants",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Margin Projection on restaurants (Q85)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #85 - Chef Marco Vieri (Executive Chef & Founder)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((seating_capacity * 1.07)::numeric, 2) AS projected_metric from restaurants WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
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
    "reference_sql": "SELECT id, name AS label, ROUND((seating_capacity * 1.07)::numeric, 2) AS projected_metric FROM restaurants WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-086",
    "domain": "restaurants",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Margin Projection on dining_sections (Q86)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #86 - Giulia Conti (Director of Hospitality)]: Calculate financial inflation adjustment. Select id, section_name AS label, and ROUND((restaurant_id * 1.08)::numeric, 2) AS projected_metric from dining_sections WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
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
    "reference_sql": "SELECT id, section_name AS label, ROUND((restaurant_id * 1.08)::numeric, 2) AS projected_metric FROM dining_sections WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-087",
    "domain": "restaurants",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Margin Projection on dining_tables (Q87)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #87 - Elena Rossi (Beverage & Cellar Director)]: Calculate financial inflation adjustment. Select id, table_number::text AS label, and ROUND((max_seats * 1.09)::numeric, 2) AS projected_metric from dining_tables WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_tables.",
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
    "reference_sql": "SELECT id, table_number::text AS label, ROUND((max_seats * 1.09)::numeric, 2) AS projected_metric FROM dining_tables WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_tables."
    ],
    "solution_explanation": "Retrieves records from dining_tables applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-088",
    "domain": "restaurants",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Margin Projection on menu_categories (Q88)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #88 - Matteo Ricci (General Operations Manager)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((id * 1.10)::numeric, 2) AS projected_metric from menu_categories WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_categories.",
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
    "reference_sql": "SELECT id, name AS label, ROUND((id * 1.10)::numeric, 2) AS projected_metric FROM menu_categories WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_categories."
    ],
    "solution_explanation": "Retrieves records from menu_categories applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-089",
    "domain": "restaurants",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Margin Projection on menu_items (Q89)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #89 - Chef Marco Vieri (Executive Chef & Founder)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((price * 1.11)::numeric, 2) AS projected_metric from menu_items WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;\"",
    "context_notes": "Level 1 Foundational single-table query on menu_items.",
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
    "reference_sql": "SELECT id, name AS label, ROUND((price * 1.11)::numeric, 2) AS projected_metric FROM menu_items WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table menu_items."
    ],
    "solution_explanation": "Retrieves records from menu_items applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-090",
    "domain": "restaurants",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Margin Projection on ingredients (Q90)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #90 - Giulia Conti (Director of Hospitality)]: Calculate financial inflation adjustment. Select id, ingredient_name AS label, and ROUND((unit_cost * 1.02)::numeric, 2) AS projected_metric from ingredients WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredients.",
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
    "reference_sql": "SELECT id, ingredient_name AS label, ROUND((unit_cost * 1.02)::numeric, 2) AS projected_metric FROM ingredients WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredients."
    ],
    "solution_explanation": "Retrieves records from ingredients applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L1-091",
    "domain": "restaurants",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Margin Projection on suppliers (Q91)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #91 - Elena Rossi (Beverage & Cellar Director)]: Calculate financial inflation adjustment. Select id, supplier_name AS label, and ROUND((rating * 1.03)::numeric, 2) AS projected_metric from suppliers WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;\"",
    "context_notes": "Level 1 Foundational single-table query on suppliers.",
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
    "reference_sql": "SELECT id, supplier_name AS label, ROUND((rating * 1.03)::numeric, 2) AS projected_metric FROM suppliers WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table suppliers."
    ],
    "solution_explanation": "Retrieves records from suppliers applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-092",
    "domain": "restaurants",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Margin Projection on ingredient_purchases (Q92)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #92 - Matteo Ricci (General Operations Manager)]: Calculate financial inflation adjustment. Select id, restaurant_id::text AS label, and ROUND((total_amount * 1.04)::numeric, 2) AS projected_metric from ingredient_purchases WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 102;\"",
    "context_notes": "Level 1 Foundational single-table query on ingredient_purchases.",
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
    "reference_sql": "SELECT id, restaurant_id::text AS label, ROUND((total_amount * 1.04)::numeric, 2) AS projected_metric FROM ingredient_purchases WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table ingredient_purchases."
    ],
    "solution_explanation": "Retrieves records from ingredient_purchases applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-093",
    "domain": "restaurants",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Margin Projection on reservations (Q93)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #93 - Chef Marco Vieri (Executive Chef & Founder)]: Calculate financial inflation adjustment. Select id, guest_name AS label, and ROUND((party_size * 1.05)::numeric, 2) AS projected_metric from reservations WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 103;\"",
    "context_notes": "Level 1 Foundational single-table query on reservations.",
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
    "reference_sql": "SELECT id, guest_name AS label, ROUND((party_size * 1.05)::numeric, 2) AS projected_metric FROM reservations WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table reservations."
    ],
    "solution_explanation": "Retrieves records from reservations applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-094",
    "domain": "restaurants",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Margin Projection on orders (Q94)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #94 - Giulia Conti (Director of Hospitality)]: Calculate financial inflation adjustment. Select id, server_name AS label, and ROUND((total_amount * 1.06)::numeric, 2) AS projected_metric from orders WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 104;\"",
    "context_notes": "Level 1 Foundational single-table query on orders.",
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
    "reference_sql": "SELECT id, server_name AS label, ROUND((total_amount * 1.06)::numeric, 2) AS projected_metric FROM orders WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table orders."
    ],
    "solution_explanation": "Retrieves records from orders applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-095",
    "domain": "restaurants",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Margin Projection on order_items (Q95)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #95 - Elena Rossi (Beverage & Cellar Director)]: Calculate financial inflation adjustment. Select id, order_id::text AS label, and ROUND((quantity * 1.07)::numeric, 2) AS projected_metric from order_items WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 105;\"",
    "context_notes": "Level 1 Foundational single-table query on order_items.",
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
    "reference_sql": "SELECT id, order_id::text AS label, ROUND((quantity * 1.07)::numeric, 2) AS projected_metric FROM order_items WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table order_items."
    ],
    "solution_explanation": "Retrieves records from order_items applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-096",
    "domain": "restaurants",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Margin Projection on staff_members (Q96)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #96 - Matteo Ricci (General Operations Manager)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((hourly_rate * 1.08)::numeric, 2) AS projected_metric from staff_members WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 106;\"",
    "context_notes": "Level 1 Foundational single-table query on staff_members.",
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
    "reference_sql": "SELECT id, name AS label, ROUND((hourly_rate * 1.08)::numeric, 2) AS projected_metric FROM staff_members WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table staff_members."
    ],
    "solution_explanation": "Retrieves records from staff_members applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-097",
    "domain": "restaurants",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Margin Projection on shifts (Q97)",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder",
      "department": "Culinary Ops"
    },
    "request": "From: Chef Marco Vieri (Executive Chef & Founder)\n\n\"[Task #97 - Chef Marco Vieri (Executive Chef & Founder)]: Calculate financial inflation adjustment. Select id, shift_type AS label, and ROUND((hours_worked * 1.09)::numeric, 2) AS projected_metric from shifts WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 107;\"",
    "context_notes": "Level 1 Foundational single-table query on shifts.",
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
    "reference_sql": "SELECT id, shift_type AS label, ROUND((hours_worked * 1.09)::numeric, 2) AS projected_metric FROM shifts WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table shifts."
    ],
    "solution_explanation": "Retrieves records from shifts applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-098",
    "domain": "restaurants",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Margin Projection on guest_reviews (Q98)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality",
      "department": "Front of House"
    },
    "request": "From: Giulia Conti (Director of Hospitality)\n\n\"[Task #98 - Giulia Conti (Director of Hospitality)]: Calculate financial inflation adjustment. Select id, comments AS label, and ROUND((rating * 1.10)::numeric, 2) AS projected_metric from guest_reviews WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 108;\"",
    "context_notes": "Level 1 Foundational single-table query on guest_reviews.",
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
    "reference_sql": "SELECT id, comments AS label, ROUND((rating * 1.10)::numeric, 2) AS projected_metric FROM guest_reviews WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table guest_reviews."
    ],
    "solution_explanation": "Retrieves records from guest_reviews applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-099",
    "domain": "restaurants",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Status Segment Inspection in restaurants (Q99)",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director",
      "department": "Beverage"
    },
    "request": "From: Elena Rossi (Beverage & Cellar Director)\n\n\"[Task #99 - Elena Rossi (Beverage & Cellar Director)]: Extract active records from restaurants. Select id, name AS item_name, and city AS tag from restaurants WHERE city IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 1 Foundational single-table query on restaurants.",
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
    "reference_sql": "SELECT id, name AS item_name, city AS tag FROM restaurants WHERE city IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table restaurants."
    ],
    "solution_explanation": "Retrieves records from restaurants applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L1-100",
    "domain": "restaurants",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Status Segment Inspection in dining_sections (Q100)",
    "stakeholder": {
      "name": "Matteo Ricci",
      "role": "General Operations Manager",
      "department": "Operations"
    },
    "request": "From: Matteo Ricci (General Operations Manager)\n\n\"[Task #100 - Matteo Ricci (General Operations Manager)]: Extract active records from dining_sections. Select id, section_name AS item_name, and section_name AS tag from dining_sections WHERE section_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;\"",
    "context_notes": "Level 1 Foundational single-table query on dining_sections.",
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
    "reference_sql": "SELECT id, section_name AS item_name, section_name AS tag FROM dining_sections WHERE section_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table dining_sections."
    ],
    "solution_explanation": "Retrieves records from dining_sections applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  }
];
