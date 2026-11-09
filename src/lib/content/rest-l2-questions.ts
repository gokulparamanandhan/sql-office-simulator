import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L2-001",
    "domain": "restaurants",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Dishes in Every Order",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "I want to see what dishes people are actually ordering — every order line with the actual dish name and quantity, not just IDs.",
    "context_notes": "JOIN order_items with menu_items.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "quantity"
    ],
    "reference_sql": "SELECT oi.order_id, mi.name AS dish_name, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY oi.order_id, mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi ON oi.menu_item_id = mi.id.",
      "Return oi.order_id, mi.name AS dish_name, oi.quantity."
    ],
    "solution_explanation": "Joins order_items to menu_items to resolve item IDs into dish names.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-002",
    "domain": "restaurants",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Reservations With Venue Names",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "I need the full reservation list with the actual restaurant name — show guest name, party size, status, and the venue.",
    "context_notes": "JOIN reservations with restaurants.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "status",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, r.status, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id ORDER BY r.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res ON r.restaurant_id = res.id.",
      "Return guest_name, party_size, status, res.name AS restaurant_name."
    ],
    "solution_explanation": "Joins reservations to restaurants to show venue names.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-003",
    "domain": "restaurants",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Reviews With Restaurant Names",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Pull all our guest reviews with the actual restaurant name — I need name, rating, and date.",
    "context_notes": "JOIN guest_reviews with restaurants.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "review_date"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, gr.rating, gr.review_date FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id ORDER BY gr.review_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res ON gr.restaurant_id = res.id."
    ],
    "solution_explanation": "Joins guest_reviews to restaurants for readable review display.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-004",
    "domain": "restaurants",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Tables With Their Section Names",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For the seating plan — show every table and which section it belongs to: table number, seats, and section name.",
    "context_notes": "JOIN dining_tables with dining_sections.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "table_number",
      "max_seats",
      "section_name"
    ],
    "reference_sql": "SELECT dt.table_number, dt.max_seats, ds.section_name FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id ORDER BY ds.section_name, dt.table_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_tables dt with dining_sections ds ON dt.section_id = ds.id."
    ],
    "solution_explanation": "Joins tables to sections for a readable seating plan.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-005",
    "domain": "restaurants",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Confirmed Bookings With Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For tonight's host sheet — confirmed bookings only. Show guest name, party size, and the restaurant name.",
    "context_notes": "JOIN reservations with restaurants WHERE status = confirmed.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.status = 'confirmed' ORDER BY r.guest_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE r.status = confirmed."
    ],
    "solution_explanation": "Filters confirmed reservations and joins to show venue names.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-006",
    "domain": "restaurants",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Five-Star Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Before the team meeting, pull all 5-star reviews with the restaurant name and the guest comment — perfect scores only.",
    "context_notes": "JOIN guest_reviews with restaurants WHERE rating = 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "comments"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, gr.rating, gr.comments FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id WHERE gr.rating = 5 ORDER BY res.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "Filter WHERE gr.rating = 5."
    ],
    "solution_explanation": "Retrieves 5-star reviews with venue context.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-007",
    "domain": "restaurants",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Pasta Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "How much pasta are we actually selling? Show all pasta order lines — dish name and quantity.",
    "context_notes": "JOIN order_items with menu_items WHERE category = pasta.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "quantity"
    ],
    "reference_sql": "SELECT oi.order_id, mi.name AS dish_name, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'pasta' ORDER BY mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Filter WHERE mi.category = pasta."
    ],
    "solution_explanation": "Filters order items to pasta dishes for kitchen demand analysis.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-008",
    "domain": "restaurants",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Large Party Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Flag group bookings for extra prep — all reservations for 6 or more people, with restaurant name and party size.",
    "context_notes": "JOIN reservations with restaurants WHERE party_size >= 6.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.party_size >= 6 ORDER BY r.party_size DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE r.party_size >= 6. ORDER BY party_size DESC."
    ],
    "solution_explanation": "Identifies large group reservations needing extra preparation.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-009",
    "domain": "restaurants",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Full Order Detail",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "I need a breakdown of every order — which dish was ordered, how many, and the price per dish.",
    "context_notes": "3-way JOIN: orders JOIN order_items JOIN menu_items.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "quantity",
      "price"
    ],
    "reference_sql": "SELECT o.id AS order_id, mi.name AS dish_name, oi.quantity, mi.price FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY o.id, mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN orders o with order_items oi ON o.id = oi.order_id.",
      "Then JOIN menu_items mi ON oi.menu_item_id = mi.id."
    ],
    "solution_explanation": "Three-table join building full order detail view.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-010",
    "domain": "restaurants",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Full Table Location Info",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For the venue map — each table with its section name AND the restaurant. Show table number, seats, section, and venue.",
    "context_notes": "3-way JOIN: dining_tables JOIN dining_sections JOIN restaurants.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "table_number",
      "max_seats",
      "section_name",
      "restaurant_name"
    ],
    "reference_sql": "SELECT dt.table_number, dt.max_seats, ds.section_name, res.name AS restaurant_name FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id JOIN restaurants res ON ds.restaurant_id = res.id ORDER BY res.name, ds.section_name, dt.table_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_tables dt with dining_sections ds.",
      "Then JOIN restaurants res ON ds.restaurant_id = res.id."
    ],
    "solution_explanation": "3-table join building a complete table location map.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-011",
    "domain": "restaurants",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Chicago Restaurant Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "I am meeting the Chicago venue managers — pull all guest reviews for our Chicago restaurants, with venue name and rating.",
    "context_notes": "JOIN guest_reviews with restaurants WHERE city = Chicago.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "review_date"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, gr.rating, gr.review_date FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id WHERE res.city = 'Chicago' ORDER BY gr.review_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "Filter WHERE res.city = Chicago."
    ],
    "solution_explanation": "Filters reviews by city for regional review.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-012",
    "domain": "restaurants",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Seated Guest Records",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For the operations debrief — all reservations currently seated with venue name and party size.",
    "context_notes": "JOIN reservations with restaurants WHERE status = seated.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.status = 'seated' ORDER BY r.guest_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE r.status = seated."
    ],
    "solution_explanation": "Lists currently seated reservations.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-013",
    "domain": "restaurants",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Beverages Ordered",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Which drinks have been ordered? Every beverage line item — drink name and quantity.",
    "context_notes": "JOIN order_items with menu_items WHERE category = beverage.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "quantity"
    ],
    "reference_sql": "SELECT oi.order_id, mi.name AS dish_name, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'beverage' ORDER BY mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Filter WHERE mi.category = beverage."
    ],
    "solution_explanation": "Identifies beverage order entries for cellar demand tracking.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-014",
    "domain": "restaurants",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Premium Dish Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which premium dishes are guests ordering? Every order line with a dish priced over $30 — name, price, and quantity.",
    "context_notes": "JOIN order_items with menu_items WHERE price > 30.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "price",
      "quantity"
    ],
    "reference_sql": "SELECT oi.order_id, mi.name AS dish_name, mi.price, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.price > 30 ORDER BY mi.price DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Filter WHERE mi.price > 30. ORDER BY mi.price DESC."
    ],
    "solution_explanation": "Identifies premium dish orders.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-015",
    "domain": "restaurants",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sections at the Flagship",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show all dining sections at our Gusto Flagship Trattoria — section name and whether it is outdoor.",
    "context_notes": "JOIN dining_sections with restaurants WHERE restaurant name = Gusto Flagship Trattoria.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "section_name",
      "is_outdoor"
    ],
    "reference_sql": "SELECT ds.section_name, ds.is_outdoor FROM dining_sections ds JOIN restaurants res ON ds.restaurant_id = res.id WHERE res.name = 'Gusto Flagship Trattoria' ORDER BY ds.section_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_sections ds with restaurants res.",
      "Filter WHERE res.name = Gusto Flagship Trattoria."
    ],
    "solution_explanation": "Lists dining sections at the flagship restaurant.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-016",
    "domain": "restaurants",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Order Items With Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show every order item with its category — order ID, dish name, category, and quantity so I can split food vs drinks.",
    "context_notes": "JOIN order_items with menu_items.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "order_id",
      "dish_name",
      "category",
      "quantity"
    ],
    "reference_sql": "SELECT oi.order_id, mi.name AS dish_name, mi.category, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY mi.category, mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Return order_id, mi.name, mi.category, oi.quantity."
    ],
    "solution_explanation": "Adds category info to order items for food vs beverage analysis.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-017",
    "domain": "restaurants",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Completed Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For the weekly report — all fully completed reservations with venue name and party size.",
    "context_notes": "JOIN reservations with restaurants WHERE status = completed.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.status = 'completed' ORDER BY res.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE r.status = completed."
    ],
    "solution_explanation": "Retrieves all completed reservations.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-018",
    "domain": "restaurants",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "High-Capacity Venue Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Do our bigger venues get better reviews? All reviews for restaurants with over 180 seats — venue name and rating.",
    "context_notes": "JOIN guest_reviews with restaurants WHERE seating_capacity > 180.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, gr.rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id WHERE res.seating_capacity > 180 ORDER BY gr.rating DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "Filter WHERE res.seating_capacity > 180."
    ],
    "solution_explanation": "Checks review quality at high-capacity venues.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-019",
    "domain": "restaurants",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Entree Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show all order lines for entrees — dish name, price, and quantity. I want to know how main courses are moving.",
    "context_notes": "JOIN order_items with menu_items WHERE category = entree.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "dish_name",
      "price",
      "quantity"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.price, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'entree' ORDER BY mi.price DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Filter WHERE mi.category = entree."
    ],
    "solution_explanation": "Lists entree orders for main course demand analysis.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-020",
    "domain": "restaurants",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "NYC Two-Top Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Valentine two-tops promo in NYC — all reservations for exactly 2 people at any New York location.",
    "context_notes": "JOIN reservations with restaurants WHERE city = New York AND party_size = 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "guest_name",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE res.city = 'New York' AND r.party_size = 2 ORDER BY r.guest_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE res.city = New York AND r.party_size = 2."
    ],
    "solution_explanation": "Finds two-person reservations in New York.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-021",
    "domain": "restaurants",
    "level": 2,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Order Items With Food Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Kitchen cost audit — every order item with dish name, its food cost, and quantity ordered.",
    "context_notes": "JOIN order_items with menu_items.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "dish_name",
      "cost",
      "quantity"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.cost, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY mi.cost DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Return mi.name AS dish_name, mi.cost, oi.quantity."
    ],
    "solution_explanation": "Adds cost info to order items for kitchen budget tracking.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-022",
    "domain": "restaurants",
    "level": 2,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Below Average Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "I need to address negative feedback — all reviews 4 stars or below, with restaurant name and guest comments.",
    "context_notes": "JOIN guest_reviews with restaurants WHERE rating <= 4.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "comments"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, gr.rating, gr.comments FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id WHERE gr.rating <= 4 ORDER BY gr.rating ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "Filter WHERE gr.rating <= 4. ORDER BY gr.rating ASC."
    ],
    "solution_explanation": "Retrieves critical feedback reviews for quality improvement.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-023",
    "domain": "restaurants",
    "level": 2,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Full Reservation Schedule",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Complete reservation schedule — guest name, reservation time, party size, and venue, sorted chronologically.",
    "context_notes": "JOIN reservations with restaurants. ORDER BY reservation_time.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ORDER BY"
    ],
    "expected_columns": [
      "guest_name",
      "reservation_time",
      "party_size",
      "restaurant_name"
    ],
    "reference_sql": "SELECT r.guest_name, r.reservation_time, r.party_size, res.name AS restaurant_name FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id ORDER BY r.reservation_time ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "ORDER BY r.reservation_time ASC."
    ],
    "solution_explanation": "Full reservation schedule sorted chronologically.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-024",
    "domain": "restaurants",
    "level": 2,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Outdoor Tables at Each Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For summer patio setup — all outdoor tables with table number, seat count, section name, and restaurant.",
    "context_notes": "3-way JOIN dining_tables JOIN dining_sections JOIN restaurants WHERE is_outdoor = TRUE.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "table_number",
      "max_seats",
      "section_name",
      "restaurant_name"
    ],
    "reference_sql": "SELECT dt.table_number, dt.max_seats, ds.section_name, res.name AS restaurant_name FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id JOIN restaurants res ON ds.restaurant_id = res.id WHERE ds.is_outdoor = TRUE ORDER BY res.name, dt.table_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: dining_tables → dining_sections → restaurants.",
      "Filter WHERE ds.is_outdoor = TRUE."
    ],
    "solution_explanation": "Finds all outdoor tables with full location context.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-025",
    "domain": "restaurants",
    "level": 2,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Dessert Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Are guests finishing with dessert? Every dessert order line — dish name, price, and quantity.",
    "context_notes": "JOIN order_items with menu_items WHERE category = dessert.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "dish_name",
      "price",
      "quantity"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.price, oi.quantity FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'dessert' ORDER BY mi.price DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "Filter WHERE mi.category = dessert."
    ],
    "solution_explanation": "Checks dessert order volume for upselling analysis.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-026",
    "domain": "restaurants",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Item Count Per Order",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many line items does each order contain? Show order ID and item count — busiest orders first.",
    "context_notes": "GROUP BY order_id, COUNT(*) from order_items.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "item_count"
    ],
    "reference_sql": "SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id ORDER BY item_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY order_id.",
      "COUNT(*) AS item_count. ORDER BY item_count DESC."
    ],
    "solution_explanation": "Counts distinct order lines per order.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-027",
    "domain": "restaurants",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Total Units Sold Per Dish",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes are we selling most? Total units sold per dish, most to least.",
    "context_notes": "JOIN order_items with menu_items. SUM(quantity) GROUP BY dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity) AS total_sold. GROUP BY mi.name."
    ],
    "solution_explanation": "Aggregates total units sold per menu item.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-028",
    "domain": "restaurants",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "Average Rating Per Restaurant",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which restaurants perform best with guests? Average review rating per venue, highest first.",
    "context_notes": "JOIN guest_reviews with restaurants. AVG(rating) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.name ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "AVG(gr.rating) AS avg_rating. GROUP BY res.name."
    ],
    "solution_explanation": "Calculates average review score per restaurant.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-029",
    "domain": "restaurants",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Reservations Per Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants are the most booked? Reservations per venue, busiest first.",
    "context_notes": "JOIN reservations with restaurants. COUNT(*) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "reservation_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS reservation_count FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "COUNT(*) AS reservation_count. GROUP BY res.name."
    ],
    "solution_explanation": "Counts total reservations per restaurant.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-030",
    "domain": "restaurants",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Revenue Per Dish",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes are making us money? Total revenue per dish (qty x price), highest first.",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity * mi.price) AS total_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity * mi.price) AS total_revenue. GROUP BY mi.name."
    ],
    "solution_explanation": "Calculates total revenue per dish.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-031",
    "domain": "restaurants",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Average Party Size Per Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For table config planning — average party size per restaurant. Biggest groups first.",
    "context_notes": "JOIN reservations with restaurants. AVG(party_size) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "avg_party_size"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, ROUND(AVG(r.party_size), 1) AS avg_party_size FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name ORDER BY avg_party_size DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "AVG(r.party_size) AS avg_party_size. GROUP BY res.name."
    ],
    "solution_explanation": "Calculates average party size per venue for seating planning.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-032",
    "domain": "restaurants",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Review Count Per Venue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "How many reviews does each restaurant have? Most feedback first.",
    "context_notes": "JOIN guest_reviews with restaurants. COUNT(*) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS review_count FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.name ORDER BY review_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "COUNT(*) AS review_count. GROUP BY res.name."
    ],
    "solution_explanation": "Counts guest reviews per restaurant.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-033",
    "domain": "restaurants",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Order Lines Per Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Category breakdown — how many order lines per food/drink category? Biggest first.",
    "context_notes": "JOIN order_items with menu_items. COUNT(*) GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "order_line_count"
    ],
    "reference_sql": "SELECT mi.category, COUNT(*) AS order_line_count FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY order_line_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "COUNT(*) AS order_line_count. GROUP BY mi.category."
    ],
    "solution_explanation": "Counts order lines per category.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-034",
    "domain": "restaurants",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "Total Covers Per Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many total guest covers has each restaurant had through reservations? Highest first.",
    "context_notes": "JOIN reservations with restaurants. SUM(party_size) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_covers"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, SUM(r.party_size) AS total_covers FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name ORDER BY total_covers DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "SUM(r.party_size) AS total_covers. GROUP BY res.name."
    ],
    "solution_explanation": "Sums total reservation guest covers per restaurant.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-035",
    "domain": "restaurants",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Average Rating by City",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which cities have guests rating us highest? Average review score per city.",
    "context_notes": "JOIN guest_reviews with restaurants. AVG(rating) GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.city, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.city ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "AVG(gr.rating) AS avg_rating. GROUP BY res.city."
    ],
    "solution_explanation": "Calculates average rating by city.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-036",
    "domain": "restaurants",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Tables Per Section",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Layout report — how many dining tables does each section have?",
    "context_notes": "JOIN dining_tables with dining_sections. COUNT(*) GROUP BY section_name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "section_name",
      "table_count"
    ],
    "reference_sql": "SELECT ds.section_name, COUNT(*) AS table_count FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id GROUP BY ds.section_name ORDER BY table_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_tables dt with dining_sections ds.",
      "COUNT(*) AS table_count. GROUP BY ds.section_name."
    ],
    "solution_explanation": "Counts dining tables per section.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-037",
    "domain": "restaurants",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Total Profit Per Dish",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is the total profit per dish — quantity times (price minus cost)?",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*(price-cost)) GROUP BY dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "total_profit"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit. GROUP BY mi.name."
    ],
    "solution_explanation": "Calculates gross profit per dish.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-038",
    "domain": "restaurants",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Miami Restaurant Review Summary",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Miami brand report — which Miami restaurants have the most guest reviews and what are their average scores?",
    "context_notes": "JOIN guest_reviews with restaurants WHERE city = Miami. COUNT and AVG GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id WHERE res.city = 'Miami' GROUP BY res.name ORDER BY review_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "Filter WHERE res.city = Miami. GROUP BY res.name."
    ],
    "solution_explanation": "Evaluates review volume and quality for Miami restaurants.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-039",
    "domain": "restaurants",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Reservation Status Breakdown Per Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Operational report — reservation breakdown by status per restaurant: confirmed, seated, completed counts per venue.",
    "context_notes": "JOIN reservations with restaurants. COUNT GROUP BY restaurant AND status.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "status",
      "count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, r.status, COUNT(*) AS count FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name, r.status ORDER BY res.name, r.status;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "GROUP BY res.name, r.status. COUNT(*) AS count."
    ],
    "solution_explanation": "Breaks down reservation statuses per restaurant.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-040",
    "domain": "restaurants",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "Total Seats Per Section Type",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Total seats per section type across all venues — e.g., all Main Dining Rooms combined.",
    "context_notes": "JOIN dining_tables with dining_sections. SUM(max_seats) GROUP BY section_name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "section_name",
      "total_seats"
    ],
    "reference_sql": "SELECT ds.section_name, SUM(dt.max_seats) AS total_seats FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id GROUP BY ds.section_name ORDER BY total_seats DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_tables dt with dining_sections ds.",
      "SUM(dt.max_seats) AS total_seats. GROUP BY ds.section_name."
    ],
    "solution_explanation": "Aggregates total seating capacity per section type.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-041",
    "domain": "restaurants",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Average Quantity Per Dish",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "On average, how many of each item do guests order at once? Dish name and avg quantity per order line.",
    "context_notes": "JOIN order_items with menu_items. AVG(quantity) GROUP BY dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "avg_qty"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, ROUND(AVG(oi.quantity), 2) AS avg_qty FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY avg_qty DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "AVG(oi.quantity) AS avg_qty. GROUP BY mi.name."
    ],
    "solution_explanation": "Calculates average quantity ordered per dish.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-042",
    "domain": "restaurants",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Best and Worst Ratings Per City",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Per city — best rating and worst rating we have received.",
    "context_notes": "JOIN guest_reviews with restaurants. MAX and MIN of rating GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "MAX",
      "MIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "city",
      "best_rating",
      "worst_rating"
    ],
    "reference_sql": "SELECT res.city, MAX(gr.rating) AS best_rating, MIN(gr.rating) AS worst_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.city ORDER BY res.city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN guest_reviews gr with restaurants res.",
      "MAX and MIN of gr.rating. GROUP BY res.city."
    ],
    "solution_explanation": "Shows rating range per city.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-043",
    "domain": "restaurants",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Revenue Per Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Break down total sales revenue by menu category — which category generates the most?",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "category_revenue"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity * mi.price) AS category_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY category_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity * mi.price) AS category_revenue. GROUP BY mi.category."
    ],
    "solution_explanation": "Calculates total revenue by menu category.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-044",
    "domain": "restaurants",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Reservations at Post-2019 Venues",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Utilization check for newer venues — how many reservations have our post-2019 restaurants received?",
    "context_notes": "JOIN reservations with restaurants WHERE opened_year > 2019. COUNT GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "reservation_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS reservation_count FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE res.opened_year > 2019 GROUP BY res.name ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE res.opened_year > 2019. GROUP BY res.name."
    ],
    "solution_explanation": "Counts reservations for newer restaurants.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-045",
    "domain": "restaurants",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Distinct Dishes Ordered",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "How many different menu items have been ordered at least once?",
    "context_notes": "COUNT(DISTINCT menu_item_id) from order_items.",
    "concepts": [
      "SELECT",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "dishes_ordered"
    ],
    "reference_sql": "SELECT COUNT(DISTINCT oi.menu_item_id) AS dishes_ordered FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "COUNT(DISTINCT oi.menu_item_id) AS dishes_ordered."
    ],
    "solution_explanation": "Counts unique menu items ordered at least once.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-046",
    "domain": "restaurants",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "Most Common Party Sizes",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "What party sizes do guests most commonly book? Count per party size, most common first.",
    "context_notes": "GROUP BY party_size, COUNT(*) from reservations.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "party_size",
      "reservation_count"
    ],
    "reference_sql": "SELECT party_size, COUNT(*) AS reservation_count FROM reservations GROUP BY party_size ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY party_size.",
      "COUNT(*) AS reservation_count."
    ],
    "solution_explanation": "Identifies most common party sizes.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-047",
    "domain": "restaurants",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Total Units Sold Per Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "In raw units, how do menu categories compare? Total quantity sold per category.",
    "context_notes": "JOIN order_items with menu_items. SUM(quantity) GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "total_units"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity) AS total_units FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY total_units DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity) AS total_units. GROUP BY mi.category."
    ],
    "solution_explanation": "Compares total units sold by category.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-048",
    "domain": "restaurants",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Table Count Per Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many dining tables does each restaurant have? Most tables first.",
    "context_notes": "JOIN dining_tables with restaurants. COUNT(*) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "table_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS table_count FROM dining_tables dt JOIN restaurants res ON dt.restaurant_id = res.id GROUP BY res.name ORDER BY table_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN dining_tables dt with restaurants res.",
      "COUNT(*) AS table_count. GROUP BY res.name."
    ],
    "solution_explanation": "Counts dining tables per restaurant.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-049",
    "domain": "restaurants",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Confirmed Reservations Per City",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Where are we getting the most confirmed bookings geographically? Count per city.",
    "context_notes": "JOIN reservations with restaurants WHERE status = confirmed. COUNT GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "confirmed_bookings"
    ],
    "reference_sql": "SELECT res.city, COUNT(*) AS confirmed_bookings FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.status = 'confirmed' GROUP BY res.city ORDER BY confirmed_bookings DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN reservations r with restaurants res.",
      "Filter WHERE r.status = confirmed. GROUP BY res.city."
    ],
    "solution_explanation": "Counts confirmed bookings by city.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-050",
    "domain": "restaurants",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Revenue: Food vs Beverages",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "How much is coming from beverages vs food? Total revenue per category so the beverage contribution is clear.",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity * mi.price) AS total_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(oi.quantity * mi.price) AS total_revenue. GROUP BY mi.category."
    ],
    "solution_explanation": "Compares revenue contribution across menu categories.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-051",
    "domain": "restaurants",
    "level": 2,
    "order": 51,
    "difficulty": "challenging",
    "title": "Venues With 5+ Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For meaningful review analysis — only venues with at least 5 guest reviews. Venue name, review count, and average rating.",
    "context_notes": "JOIN guest_reviews with restaurants. GROUP BY restaurant. HAVING COUNT >= 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.name HAVING COUNT(*) >= 5 ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY res.name.",
      "COUNT(*) AS review_count, AVG(gr.rating) AS avg_rating.",
      "HAVING COUNT(*) >= 5."
    ],
    "solution_explanation": "Filters restaurants with at least 5 reviews for meaningful ratings.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-052",
    "domain": "restaurants",
    "level": 2,
    "order": 52,
    "difficulty": "challenging",
    "title": "Dishes Ordered 10+ Times",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes have been ordered more than 10 times total? These are our stars — dish name and total sold.",
    "context_notes": "JOIN order_items with menu_items. SUM(quantity) GROUP BY dish. HAVING total > 10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name HAVING SUM(oi.quantity) > 10 ORDER BY total_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(oi.quantity) AS total_sold.",
      "HAVING SUM(oi.quantity) > 10."
    ],
    "solution_explanation": "Identifies star dishes with more than 10 units sold.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-053",
    "domain": "restaurants",
    "level": 2,
    "order": 53,
    "difficulty": "challenging",
    "title": "5+ Confirmed Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants have 5 or more confirmed bookings? These need extra staffing attention.",
    "context_notes": "JOIN reservations with restaurants WHERE confirmed. GROUP BY restaurant. HAVING COUNT >= 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "confirmed_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS confirmed_count FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id WHERE r.status = 'confirmed' GROUP BY res.name HAVING COUNT(*) >= 5 ORDER BY confirmed_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE r.status = confirmed.",
      "HAVING COUNT(*) >= 5."
    ],
    "solution_explanation": "Finds high-demand restaurants with 5+ confirmed reservations.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-054",
    "domain": "restaurants",
    "level": 2,
    "order": 54,
    "difficulty": "challenging",
    "title": "Complex Orders With 3+ Items",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which orders were the most complex — 3 or more different items? Show order ID and item count.",
    "context_notes": "GROUP BY order_id from order_items. HAVING COUNT >= 3.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "item_count"
    ],
    "reference_sql": "SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id HAVING COUNT(*) >= 3 ORDER BY item_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY order_id. COUNT(*) AS item_count.",
      "HAVING COUNT(*) >= 3."
    ],
    "solution_explanation": "Identifies multi-item complex orders.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L2-055",
    "domain": "restaurants",
    "level": 2,
    "order": 55,
    "difficulty": "challenging",
    "title": "Categories Over $500 Revenue",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Which menu categories have generated over $500 in total revenue?",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY category. HAVING SUM > 500.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "category",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity * mi.price) AS total_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category HAVING SUM(oi.quantity * mi.price) > 500 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(oi.quantity * mi.price).",
      "HAVING SUM > 500."
    ],
    "solution_explanation": "Filters categories surpassing $500 in revenue.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-056",
    "domain": "restaurants",
    "level": 2,
    "order": 56,
    "difficulty": "challenging",
    "title": "Restaurants With No Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which restaurants have no guest reviews at all? We need to actively solicit feedback for these.",
    "context_notes": "LEFT JOIN restaurants with guest_reviews. WHERE gr.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "restaurant_name"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name FROM restaurants res LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id WHERE gr.id IS NULL ORDER BY res.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants res with guest_reviews gr.",
      "Filter WHERE gr.id IS NULL."
    ],
    "solution_explanation": "Uses LEFT JOIN and IS NULL to find unreviewed restaurants.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-057",
    "domain": "restaurants",
    "level": 2,
    "order": 57,
    "difficulty": "challenging",
    "title": "Menu Items Never Ordered",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which menu items have literally never been ordered? I might cut them from the menu.",
    "context_notes": "LEFT JOIN menu_items with order_items. WHERE order_items.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "dish_name"
    ],
    "reference_sql": "SELECT mi.name AS dish_name FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id WHERE oi.id IS NULL ORDER BY mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN menu_items mi with order_items oi ON oi.menu_item_id = mi.id.",
      "Filter WHERE oi.id IS NULL."
    ],
    "solution_explanation": "Uses LEFT JOIN and IS NULL to find unordered items.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-058",
    "domain": "restaurants",
    "level": 2,
    "order": 58,
    "difficulty": "challenging",
    "title": "All Restaurants With Review Count Including Zeros",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete list of all restaurants with how many reviews each has — including restaurants with zero reviews.",
    "context_notes": "LEFT JOIN restaurants with guest_reviews. COUNT(gr.id) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(gr.id) AS review_count FROM restaurants res LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name ORDER BY review_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants res with guest_reviews gr.",
      "COUNT(gr.id) returns 0 for NULL. GROUP BY res.name."
    ],
    "solution_explanation": "LEFT JOIN with COUNT shows all restaurants including zero-review ones.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-059",
    "domain": "restaurants",
    "level": 2,
    "order": 59,
    "difficulty": "challenging",
    "title": "Venues Averaging Above 4 Stars",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "I want to promote our best venues — which restaurants have an average rating above 4?",
    "context_notes": "JOIN guest_reviews with restaurants. GROUP BY restaurant. HAVING AVG > 4.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.name HAVING AVG(gr.rating) > 4 ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY res.name.",
      "HAVING AVG(gr.rating) > 4."
    ],
    "solution_explanation": "Identifies top-rated venues for promotional use.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-060",
    "domain": "restaurants",
    "level": 2,
    "order": 60,
    "difficulty": "challenging",
    "title": "Restaurants With No Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Are any restaurants getting zero bookings? Which locations have no reservation records?",
    "context_notes": "LEFT JOIN restaurants with reservations. WHERE reservations.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "restaurant_name"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name FROM restaurants res LEFT JOIN reservations r ON r.restaurant_id = res.id WHERE r.id IS NULL ORDER BY res.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants res with reservations r.",
      "Filter WHERE r.id IS NULL."
    ],
    "solution_explanation": "Finds restaurants with zero reservations.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-061",
    "domain": "restaurants",
    "level": 2,
    "order": 61,
    "difficulty": "challenging",
    "title": "Top 10 Revenue Dishes",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Top 10 revenue-generating dishes for the new menu cover — dish name and total revenue.",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY dish. LIMIT 10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "dish_name",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity * mi.price) AS total_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(oi.quantity * mi.price).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Ranks top 10 revenue dishes.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-062",
    "domain": "restaurants",
    "level": 2,
    "order": 62,
    "difficulty": "challenging",
    "title": "Revenue vs Profit Per Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Revenue and profit side by side per category.",
    "context_notes": "JOIN order_items with menu_items. Two SUM aggregations GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "total_revenue",
      "total_profit"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity * mi.price) AS total_revenue, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(qty*price) AS total_revenue.",
      "SUM(qty*(price-cost)) AS total_profit. GROUP BY mi.category."
    ],
    "solution_explanation": "Side-by-side revenue and profit by category.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-063",
    "domain": "restaurants",
    "level": 2,
    "order": 63,
    "difficulty": "challenging",
    "title": "Dishes Over $200 Revenue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which individual dishes have earned over $200 in total revenue?",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*price) GROUP BY dish. HAVING SUM > 200.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "dish_name",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity * mi.price) AS total_revenue FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name HAVING SUM(oi.quantity * mi.price) > 200 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY mi.name.",
      "HAVING SUM(oi.quantity * mi.price) > 200."
    ],
    "solution_explanation": "Identifies dishes crossing $200 in total revenue.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-064",
    "domain": "restaurants",
    "level": 2,
    "order": 64,
    "difficulty": "challenging",
    "title": "All Venues With Review Summary",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "All venues with name, city, review count, and average rating — including venues with zero reviews.",
    "context_notes": "LEFT JOIN restaurants with guest_reviews. COUNT and AVG GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, res.city, COUNT(gr.id) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants res LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name, res.city ORDER BY avg_rating DESC NULLS LAST;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants res with guest_reviews gr.",
      "COUNT(gr.id) and AVG(gr.rating). GROUP BY res.name, res.city."
    ],
    "solution_explanation": "Comprehensive venue summary including zero-review restaurants.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-065",
    "domain": "restaurants",
    "level": 2,
    "order": 65,
    "difficulty": "challenging",
    "title": "Top 5 Booked Venues With Rating",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Top 5 most-booked restaurants along with their average guest rating.",
    "context_notes": "JOIN restaurants with reservations. LEFT JOIN guest_reviews. GROUP BY restaurant. LIMIT 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "COUNT",
      "AVG",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "restaurant_name",
      "reservation_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(DISTINCT r.id) AS reservation_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants res JOIN reservations r ON r.restaurant_id = res.id LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name ORDER BY reservation_count DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN restaurants res with reservations r.",
      "LEFT JOIN guest_reviews gr.",
      "GROUP BY res.name. LIMIT 5."
    ],
    "solution_explanation": "Correlates reservation volume with ratings for top 5 restaurants.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L2-066",
    "domain": "restaurants",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Venues With Average Party Over 4",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants mostly get larger groups — average party size over 4? These need bigger table configs.",
    "context_notes": "JOIN reservations with restaurants. AVG(party_size) GROUP BY restaurant. HAVING > 4.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "avg_party_size"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, ROUND(AVG(r.party_size), 1) AS avg_party_size FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name HAVING AVG(r.party_size) > 4 ORDER BY avg_party_size DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "AVG(r.party_size).",
      "HAVING AVG > 4."
    ],
    "solution_explanation": "Identifies restaurants with large average group sizes.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-067",
    "domain": "restaurants",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Outdoor Table Count Per Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Summer marketing — how many outdoor tables does each restaurant have?",
    "context_notes": "3-way JOIN dining_tables JOIN dining_sections JOIN restaurants WHERE is_outdoor. COUNT GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "outdoor_table_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS outdoor_table_count FROM dining_tables dt JOIN dining_sections ds ON dt.section_id = ds.id JOIN restaurants res ON ds.restaurant_id = res.id WHERE ds.is_outdoor = TRUE GROUP BY res.name ORDER BY outdoor_table_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: dining_tables → dining_sections → restaurants.",
      "Filter WHERE ds.is_outdoor = TRUE. GROUP BY res.name."
    ],
    "solution_explanation": "Counts outdoor tables per restaurant.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-068",
    "domain": "restaurants",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Top 5 Dishes by Units Sold",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Top 5 best-selling dishes by quantity — these deserve menu spotlighting.",
    "context_notes": "JOIN order_items with menu_items. SUM(quantity) GROUP BY dish. LIMIT 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_sold DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(oi.quantity) AS total_sold.",
      "ORDER BY total_sold DESC LIMIT 5."
    ],
    "solution_explanation": "Ranks top 5 dishes by unit volume.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-069",
    "domain": "restaurants",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Server Revenue Performance",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which servers generate the highest average bill? Server name, orders, total revenue, and average bill.",
    "context_notes": "From orders. GROUP BY server_name. COUNT, SUM, AVG.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "order_count",
      "total_revenue",
      "avg_bill"
    ],
    "reference_sql": "SELECT server_name, COUNT(*) AS order_count, SUM(total_amount) AS total_revenue, ROUND(AVG(total_amount), 2) AS avg_bill FROM orders GROUP BY server_name ORDER BY avg_bill DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY server_name.",
      "COUNT(*), SUM(total_amount), AVG(total_amount) AS avg_bill."
    ],
    "solution_explanation": "Ranks servers by average bill.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-070",
    "domain": "restaurants",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "Full Venue Booking and Rating Report",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Board deck — all restaurants with city, total reservations, confirmed only count, and average rating.",
    "context_notes": "LEFT JOIN restaurants with reservations AND guest_reviews. Multiple aggregations.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "AVG",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_reservations",
      "confirmed_reservations",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, res.city, COUNT(DISTINCT r.id) AS total_reservations, SUM(CASE WHEN r.status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_reservations, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants res LEFT JOIN reservations r ON r.restaurant_id = res.id LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name, res.city ORDER BY total_reservations DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants with reservations AND guest_reviews.",
      "SUM(CASE WHEN r.status = 'confirmed' THEN 1 ELSE 0 END).",
      "COUNT(DISTINCT r.id) AS total_reservations."
    ],
    "solution_explanation": "Comprehensive venue report with multi-table LEFT JOINs.",
    "xp": 30,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-071",
    "domain": "restaurants",
    "level": 2,
    "order": 71,
    "difficulty": "boss",
    "title": "Dish Performance: Qty, Revenue, Profit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete dish performance — total sold, revenue, profit, and avg profit per unit. Sort by total profit.",
    "context_notes": "JOIN order_items with menu_items. SUM qty, revenue, profit. AVG(price-cost). GROUP BY dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "AVG",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold",
      "total_revenue",
      "total_profit",
      "avg_profit_per_unit"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold, SUM(oi.quantity * mi.price) AS total_revenue, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit, ROUND(AVG(mi.price - mi.cost), 2) AS avg_profit_per_unit FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(qty), SUM(qty*price), SUM(qty*(price-cost)), AVG(price-cost).",
      "GROUP BY mi.name ORDER BY total_profit DESC."
    ],
    "solution_explanation": "Full dish performance dashboard with all key metrics.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-072",
    "domain": "restaurants",
    "level": 2,
    "order": 72,
    "difficulty": "boss",
    "title": "Venue Health Dashboard",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Per restaurant: name, city, total reservations, average guest rating, and 5-star review count.",
    "context_notes": "LEFT JOIN restaurants with reservations AND guest_reviews. CASE WHEN for 5-star count.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "AVG",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_reservations",
      "avg_rating",
      "five_star_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, res.city, COUNT(DISTINCT r.id) AS total_reservations, ROUND(AVG(gr.rating), 2) AS avg_rating, SUM(CASE WHEN gr.rating = 5 THEN 1 ELSE 0 END) AS five_star_count FROM restaurants res LEFT JOIN reservations r ON r.restaurant_id = res.id LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name, res.city ORDER BY avg_rating DESC NULLS LAST;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants with reservations AND guest_reviews.",
      "SUM(CASE WHEN gr.rating = 5 THEN 1 ELSE 0 END) AS five_star_count.",
      "COUNT(DISTINCT r.id) AS total_reservations."
    ],
    "solution_explanation": "Full venue health dashboard.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-073",
    "domain": "restaurants",
    "level": 2,
    "order": 73,
    "difficulty": "boss",
    "title": "Category Profitability With Margin",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Profitability per category: total units, revenue, profit, and margin % — only categories with more than 20 units sold.",
    "context_notes": "JOIN order_items with menu_items. Multiple SUM. HAVING SUM(qty) > 20. Calculate margin %.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "total_units",
      "total_revenue",
      "total_profit",
      "margin_pct"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity) AS total_units, SUM(oi.quantity * mi.price) AS total_revenue, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit, ROUND(SUM(oi.quantity * (mi.price - mi.cost)) / NULLIF(SUM(oi.quantity * mi.price), 0) * 100, 1) AS margin_pct FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category HAVING SUM(oi.quantity) > 20 ORDER BY margin_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "HAVING SUM(oi.quantity) > 20.",
      "margin_pct = total_profit / total_revenue * 100."
    ],
    "solution_explanation": "Full profitability analysis per category with margin and volume filter.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-074",
    "domain": "restaurants",
    "level": 2,
    "order": 74,
    "difficulty": "boss",
    "title": "Full Order Line-Item Bill",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Full line-item breakdown — order ID, server, dish, quantity, unit price, and line total (qty*price).",
    "context_notes": "3-way JOIN: orders JOIN order_items JOIN menu_items. Calculate line_total.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "Arithmetic",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "server_name",
      "dish_name",
      "quantity",
      "unit_price",
      "line_total"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.server_name, mi.name AS dish_name, oi.quantity, mi.price AS unit_price, oi.quantity * mi.price AS line_total FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY o.id, mi.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: orders → order_items → menu_items.",
      "oi.quantity * mi.price AS line_total."
    ],
    "solution_explanation": "Full itemized order breakdown.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-075",
    "domain": "restaurants",
    "level": 2,
    "order": 75,
    "difficulty": "boss",
    "title": "Star Venues: High Rating AND High Covers",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Star venues — average rating above 4 AND more than 10 total reservation covers. Name, avg rating, total covers.",
    "context_notes": "JOIN restaurants with reservations and guest_reviews. HAVING AVG > 4 AND SUM > 10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "avg_rating",
      "total_covers"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, ROUND(AVG(gr.rating), 2) AS avg_rating, SUM(r.party_size) AS total_covers FROM restaurants res JOIN reservations r ON r.restaurant_id = res.id JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name HAVING AVG(gr.rating) > 4 AND SUM(r.party_size) > 10 ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN restaurants with reservations AND guest_reviews.",
      "HAVING AVG(gr.rating) > 4 AND SUM(r.party_size) > 10."
    ],
    "solution_explanation": "Identifies venues excelling in both satisfaction and booking volume.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-076",
    "domain": "restaurants",
    "level": 2,
    "order": 76,
    "difficulty": "boss",
    "title": "Complete Menu Sales Summary",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete sales summary for every dish — including never-ordered ones. Name, category, times ordered, total qty, total revenue.",
    "context_notes": "LEFT JOIN menu_items with order_items. COUNT and SUM with COALESCE. GROUP BY dish.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "SUM",
      "COALESCE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "times_ordered",
      "total_quantity",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, COUNT(oi.id) AS times_ordered, COALESCE(SUM(oi.quantity), 0) AS total_quantity, COALESCE(SUM(oi.quantity * mi.price), 0) AS total_revenue FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.name, mi.category ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN menu_items mi with order_items oi.",
      "COALESCE(SUM(oi.quantity), 0) to return 0 for unordered items."
    ],
    "solution_explanation": "Complete menu sales report including zero-sales dishes.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-077",
    "domain": "restaurants",
    "level": 2,
    "order": 77,
    "difficulty": "boss",
    "title": "Server Efficiency Report",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Quarterly performance — server name, total orders, total items, total revenue, average bill. Only servers with more than 5 orders.",
    "context_notes": "orders JOIN order_items. GROUP BY server_name. HAVING COUNT > 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "AVG",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "total_orders",
      "total_items",
      "total_revenue",
      "avg_bill"
    ],
    "reference_sql": "SELECT o.server_name, COUNT(DISTINCT o.id) AS total_orders, SUM(oi.quantity) AS total_items, SUM(o.total_amount) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_bill FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.server_name HAVING COUNT(DISTINCT o.id) > 5 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN orders o with order_items oi.",
      "COUNT(DISTINCT o.id) AS total_orders. SUM(oi.quantity) AS total_items.",
      "HAVING COUNT(DISTINCT o.id) > 5."
    ],
    "solution_explanation": "Server performance report.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-078",
    "domain": "restaurants",
    "level": 2,
    "order": 78,
    "difficulty": "boss",
    "title": "Server Revenue Per Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "How much revenue does each server generate from beverages vs food? Server name, category, and revenue per category.",
    "context_notes": "3-way JOIN: orders JOIN order_items JOIN menu_items. GROUP BY server_name AND category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "category",
      "category_revenue"
    ],
    "reference_sql": "SELECT o.server_name, mi.category, SUM(oi.quantity * mi.price) AS category_revenue FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY o.server_name, mi.category ORDER BY o.server_name, category_revenue DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: orders → order_items → menu_items.",
      "GROUP BY o.server_name, mi.category."
    ],
    "solution_explanation": "Server revenue breakdown by food category.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-079",
    "domain": "restaurants",
    "level": 2,
    "order": 79,
    "difficulty": "boss",
    "title": "Reservation Completion Rate",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Reservation efficiency per restaurant — total reservations, completed count, and completion percentage.",
    "context_notes": "JOIN reservations with restaurants. GROUP BY restaurant. SUM(CASE WHEN completed) / COUNT * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_reservations",
      "completed_count",
      "completion_pct"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(*) AS total_reservations, SUM(CASE WHEN r.status = 'completed' THEN 1 ELSE 0 END) AS completed_count, ROUND(SUM(CASE WHEN r.status = 'completed' THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100, 1) AS completion_pct FROM reservations r JOIN restaurants res ON r.restaurant_id = res.id GROUP BY res.name ORDER BY completion_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(CASE WHEN r.status = 'completed' THEN 1 ELSE 0 END) AS completed_count.",
      "completion_pct = completed_count / total * 100."
    ],
    "solution_explanation": "Calculates reservation completion rate per restaurant.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-080",
    "domain": "restaurants",
    "level": 2,
    "order": 80,
    "difficulty": "boss",
    "title": "Full Restaurant Operations Dashboard",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Ultimate summary — each restaurant with city, year opened, table count, total reservations, confirmed count, avg rating, 5-star count.",
    "context_notes": "LEFT JOIN restaurants with dining_tables, reservations, guest_reviews. Multiple aggregations.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "AVG",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "opened_year",
      "table_count",
      "total_reservations",
      "confirmed_count",
      "avg_rating",
      "five_star_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, res.city, res.opened_year, COUNT(DISTINCT dt.id) AS table_count, COUNT(DISTINCT r.id) AS total_reservations, SUM(CASE WHEN r.status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_count, ROUND(AVG(gr.rating), 2) AS avg_rating, SUM(CASE WHEN gr.rating = 5 THEN 1 ELSE 0 END) AS five_star_count FROM restaurants res LEFT JOIN dining_tables dt ON dt.restaurant_id = res.id LEFT JOIN reservations r ON r.restaurant_id = res.id LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id GROUP BY res.name, res.city, res.opened_year ORDER BY avg_rating DESC NULLS LAST;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "4-way LEFT JOIN: restaurants → dining_tables, reservations, guest_reviews.",
      "COUNT(DISTINCT dt.id), COUNT(DISTINCT r.id), SUM(CASE WHEN) for conditional counts."
    ],
    "solution_explanation": "Full operations dashboard with 4 tables.",
    "xp": 40,
    "estimated_minutes": 15
  },
  {
    "id": "rest-L2-081",
    "domain": "restaurants",
    "level": 2,
    "order": 81,
    "difficulty": "boss",
    "title": "Avg Bill for Premium Dish Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is the average order value for orders that included at least one dish priced over $35?",
    "context_notes": "Subquery: order IDs with price > 35. AVG(total_amount) WHERE id IN (subquery).",
    "concepts": [
      "SELECT",
      "AVG",
      "WHERE",
      "Subquery",
      "INNER JOIN"
    ],
    "expected_columns": [
      "avg_premium_order_value"
    ],
    "reference_sql": "SELECT ROUND(AVG(o.total_amount), 2) AS avg_premium_order_value FROM orders o WHERE o.id IN (SELECT DISTINCT oi.order_id FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.price > 35);",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery: SELECT order_id FROM order_items JOIN menu_items WHERE price > 35.",
      "Outer: AVG(total_amount) WHERE id IN (subquery)."
    ],
    "solution_explanation": "Calculates average bill for premium-dish orders using a subquery.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-082",
    "domain": "restaurants",
    "level": 2,
    "order": 82,
    "difficulty": "boss",
    "title": "Dishes Ordered More Than Average",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes have been ordered more than the average quantity across all dishes?",
    "context_notes": "Subquery for AVG total per dish. HAVING SUM > subquery.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name HAVING SUM(oi.quantity) > (SELECT AVG(dish_qty) FROM (SELECT SUM(quantity) AS dish_qty FROM order_items GROUP BY menu_item_id) sub) ORDER BY total_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery: AVG of total quantities per dish.",
      "HAVING SUM(oi.quantity) > (subquery avg)."
    ],
    "solution_explanation": "Identifies above-average performing dishes.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-083",
    "domain": "restaurants",
    "level": 2,
    "order": 83,
    "difficulty": "boss",
    "title": "Venues With Reviews and Reservations",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants had at least 3 reviews AND at least 5 reservations? Name, review count, reservation count.",
    "context_notes": "LEFT JOIN restaurants with guest_reviews AND reservations. HAVING both counts.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count",
      "reservation_count"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(DISTINCT gr.id) AS review_count, COUNT(DISTINCT r.id) AS reservation_count FROM restaurants res LEFT JOIN guest_reviews gr ON gr.restaurant_id = res.id LEFT JOIN reservations r ON r.restaurant_id = res.id GROUP BY res.name HAVING COUNT(DISTINCT gr.id) >= 3 AND COUNT(DISTINCT r.id) >= 5 ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN restaurants with guest_reviews AND reservations.",
      "HAVING COUNT(DISTINCT gr.id) >= 3 AND COUNT(DISTINCT r.id) >= 5."
    ],
    "solution_explanation": "Dual HAVING to find venues with sufficient reviews AND reservations.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-084",
    "domain": "restaurants",
    "level": 2,
    "order": 84,
    "difficulty": "boss",
    "title": "Order Summary With Distinct Dishes",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Per order: ID, server, distinct dishes ordered, total quantity, and total order amount.",
    "context_notes": "JOIN orders with order_items. COUNT(DISTINCT menu_item_id), SUM(quantity). GROUP BY order.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "order_id",
      "server_name",
      "distinct_dishes",
      "total_items",
      "order_total"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.server_name, COUNT(DISTINCT oi.menu_item_id) AS distinct_dishes, SUM(oi.quantity) AS total_items, o.total_amount AS order_total FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.id, o.server_name, o.total_amount ORDER BY o.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN orders o with order_items oi.",
      "COUNT(DISTINCT oi.menu_item_id) AS distinct_dishes.",
      "SUM(oi.quantity) AS total_items. GROUP BY o.id."
    ],
    "solution_explanation": "Per-order summary with distinct dish count and total.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-085",
    "domain": "restaurants",
    "level": 2,
    "order": 85,
    "difficulty": "boss",
    "title": "Best Rated Restaurant Per City",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "In each city, which restaurant has the highest average rating?",
    "context_notes": "JOIN guest_reviews with restaurants. GROUP BY city and restaurant. Subquery for max per city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "Subquery"
    ],
    "expected_columns": [
      "city",
      "restaurant_name",
      "avg_rating"
    ],
    "reference_sql": "SELECT res.city, res.name AS restaurant_name, ROUND(AVG(gr.rating), 2) AS avg_rating FROM guest_reviews gr JOIN restaurants res ON gr.restaurant_id = res.id GROUP BY res.city, res.name HAVING AVG(gr.rating) = (SELECT MAX(sub.avg_r) FROM (SELECT res2.city AS c, AVG(gr2.rating) AS avg_r FROM guest_reviews gr2 JOIN restaurants res2 ON gr2.restaurant_id = res2.id GROUP BY res2.city, res2.name) sub WHERE sub.c = res.city) ORDER BY res.city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY res.city, res.name.",
      "HAVING AVG(gr.rating) = subquery for max per city."
    ],
    "solution_explanation": "Finds highest-rated restaurant per city using correlated subquery.",
    "xp": 40,
    "estimated_minutes": 15
  },
  {
    "id": "rest-L2-086",
    "domain": "restaurants",
    "level": 2,
    "order": 86,
    "difficulty": "boss",
    "title": "Table Activity Count",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many times has each table number been used in orders? Most active first.",
    "context_notes": "GROUP BY table_number, COUNT(*) from orders.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "table_number",
      "order_count"
    ],
    "reference_sql": "SELECT table_number, COUNT(*) AS order_count FROM orders GROUP BY table_number ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY table_number.",
      "COUNT(*) AS order_count. ORDER BY order_count DESC."
    ],
    "solution_explanation": "Counts orders per table number for utilization analysis.",
    "xp": 40,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L2-087",
    "domain": "restaurants",
    "level": 2,
    "order": 87,
    "difficulty": "boss",
    "title": "Weighted Average Dish Profitability",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Across all dishes sold, what is the overall weighted average profit per unit?",
    "context_notes": "JOIN order_items with menu_items. SUM(qty*(price-cost)) / SUM(qty).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "weighted_avg_profit"
    ],
    "reference_sql": "SELECT ROUND(SUM(oi.quantity * (mi.price - mi.cost)) / NULLIF(SUM(oi.quantity), 0), 2) AS weighted_avg_profit FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "SUM(qty*(price-cost)) / SUM(qty) AS weighted_avg_profit."
    ],
    "solution_explanation": "Calculates weighted average profit per unit across all dishes.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-088",
    "domain": "restaurants",
    "level": 2,
    "order": 88,
    "difficulty": "boss",
    "title": "Revenue Share Per Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "What percentage of total revenue does each category represent? Category, revenue, and share %.",
    "context_notes": "JOIN order_items with menu_items. SUM per category divided by total (subquery) * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "Subquery",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "total_revenue",
      "revenue_share_pct"
    ],
    "reference_sql": "SELECT mi.category, SUM(oi.quantity * mi.price) AS total_revenue, ROUND(SUM(oi.quantity * mi.price) / (SELECT SUM(oi2.quantity * mi2.price) FROM order_items oi2 JOIN menu_items mi2 ON oi2.menu_item_id = mi2.id) * 100, 2) AS revenue_share_pct FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY category.",
      "revenue_share_pct = category_revenue / (SELECT SUM all revenue) * 100."
    ],
    "solution_explanation": "Category revenue percentage share.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-089",
    "domain": "restaurants",
    "level": 2,
    "order": 89,
    "difficulty": "boss",
    "title": "Top 20 Order Lines by Line Profit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Top 20 order lines by profit — order ID, server, dish, quantity, line revenue, and line profit.",
    "context_notes": "3-way JOIN: orders JOIN order_items JOIN menu_items. ORDER BY line_profit LIMIT 20.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "Arithmetic",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "order_id",
      "server_name",
      "dish_name",
      "quantity",
      "line_revenue",
      "line_profit"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.server_name, mi.name AS dish_name, oi.quantity, ROUND(oi.quantity * mi.price, 2) AS line_revenue, ROUND(oi.quantity * (mi.price - mi.cost), 2) AS line_profit FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id ORDER BY line_profit DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: orders → order_items → menu_items.",
      "oi.quantity * mi.price AS line_revenue.",
      "oi.quantity * (mi.price - mi.cost) AS line_profit. ORDER BY line_profit DESC LIMIT 20."
    ],
    "solution_explanation": "Full itemized order report with per-line profit.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-090",
    "domain": "restaurants",
    "level": 2,
    "order": 90,
    "difficulty": "boss",
    "title": "Dish Scorecard With Margin",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete dish scorecard: name, category, total sold, revenue, profit, margin % — only dishes with at least $50 total profit.",
    "context_notes": "JOIN order_items with menu_items. Multiple SUM. HAVING profit > 50. Calculate margin %.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "total_sold",
      "total_revenue",
      "total_profit",
      "margin_pct"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity) AS total_sold, SUM(oi.quantity * mi.price) AS total_revenue, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit, ROUND(SUM(oi.quantity * (mi.price - mi.cost)) / NULLIF(SUM(oi.quantity * mi.price), 0) * 100, 1) AS margin_pct FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name, mi.category HAVING SUM(oi.quantity * (mi.price - mi.cost)) > 50 ORDER BY margin_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY mi.name, mi.category.",
      "HAVING SUM(profit) > 50.",
      "margin_pct = total_profit / total_revenue * 100."
    ],
    "solution_explanation": "Full dish performance scorecard with margin.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-091",
    "domain": "restaurants",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Dishes Within Category by Revenue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Within each category, which dishes sell the most? Category, dish name, total units — by category then quantity.",
    "context_notes": "JOIN order_items with menu_items. SUM(quantity) GROUP BY category and dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.category, mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category, mi.name ORDER BY mi.category, total_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY mi.category, mi.name.",
      "SUM(oi.quantity) AS total_sold.",
      "ORDER BY mi.category, total_sold DESC."
    ],
    "solution_explanation": "Ranks dishes by sales within each category.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-092",
    "domain": "restaurants",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Full Sales Mix With Zero-Order Dishes",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Every menu item — ordered or not — with category, price, units sold, and revenue. Sort by revenue.",
    "context_notes": "LEFT JOIN menu_items with order_items. COALESCE for NULLs. GROUP BY dish.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "SUM",
      "COALESCE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "price",
      "total_sold",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, mi.price, COALESCE(SUM(oi.quantity), 0) AS total_sold, COALESCE(SUM(oi.quantity * mi.price), 0) AS total_revenue FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.name, mi.category, mi.price ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "LEFT JOIN menu_items mi with order_items oi.",
      "COALESCE(SUM(...), 0) for unordered items."
    ],
    "solution_explanation": "Complete sales mix including never-ordered items.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-093",
    "domain": "restaurants",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Review Score Distribution",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is our review score distribution — how many 3, 4, and 5 star reviews?",
    "context_notes": "GROUP BY rating, COUNT(*) from guest_reviews.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "rating",
      "count"
    ],
    "reference_sql": "SELECT rating, COUNT(*) AS count FROM guest_reviews GROUP BY rating ORDER BY rating ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY rating.",
      "COUNT(*) AS count."
    ],
    "solution_explanation": "Distribution of review scores across all restaurants.",
    "xp": 40,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L2-094",
    "domain": "restaurants",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "Profitable Dishes Ordered in Bulk",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes generated more than $100 total profit AND were ordered more than 5 times?",
    "context_notes": "JOIN order_items with menu_items. HAVING SUM(profit) > 100 AND COUNT > 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "COUNT",
      "Arithmetic",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "dish_name",
      "total_profit",
      "times_ordered"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit, COUNT(*) AS times_ordered FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.name HAVING SUM(oi.quantity * (mi.price - mi.cost)) > 100 AND COUNT(*) > 5 ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "GROUP BY mi.name.",
      "HAVING SUM(profit) > 100 AND COUNT(*) > 5."
    ],
    "solution_explanation": "Dual HAVING for profitable frequently-ordered dishes.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-095",
    "domain": "restaurants",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Reservation Density: Covers Per Seat",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each restaurant, how many reservation covers relative to seating capacity — shows demand relative to size.",
    "context_notes": "JOIN restaurants with reservations. SUM(party_size) / seating_capacity.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "seating_capacity",
      "total_covers",
      "covers_per_seat"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, res.seating_capacity, SUM(r.party_size) AS total_covers, ROUND(SUM(r.party_size)::NUMERIC / res.seating_capacity, 2) AS covers_per_seat FROM restaurants res JOIN reservations r ON r.restaurant_id = res.id GROUP BY res.name, res.seating_capacity ORDER BY covers_per_seat DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN restaurants res with reservations r.",
      "SUM(r.party_size) / res.seating_capacity AS covers_per_seat."
    ],
    "solution_explanation": "Calculates demand efficiency relative to venue capacity.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-096",
    "domain": "restaurants",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Order Reconciliation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each order, compare the recorded total with the calculated total from items (qty x price). Spot discrepancies.",
    "context_notes": "3-way JOIN: orders JOIN order_items JOIN menu_items. SUM(qty*price) vs total_amount.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "order_id",
      "recorded_total",
      "calculated_total"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.total_amount AS recorded_total, SUM(oi.quantity * mi.price) AS calculated_total FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY o.id, o.total_amount ORDER BY o.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: orders → order_items → menu_items.",
      "SUM(oi.quantity * mi.price) AS calculated_total.",
      "GROUP BY o.id, o.total_amount."
    ],
    "solution_explanation": "Reconciles recorded vs calculated order totals.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-097",
    "domain": "restaurants",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Outdoor Venue Reservation Analysis",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Venues with outdoor sections — reservation count and avg party size. Only include venues with outdoor seating.",
    "context_notes": "JOIN restaurants with dining_sections (outdoor) and reservations.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "reservation_count",
      "avg_party_size"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(DISTINCT r.id) AS reservation_count, ROUND(AVG(r.party_size), 1) AS avg_party_size FROM restaurants res JOIN dining_sections ds ON ds.restaurant_id = res.id AND ds.is_outdoor = TRUE JOIN reservations r ON r.restaurant_id = res.id GROUP BY res.name ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN restaurants with dining_sections WHERE is_outdoor = TRUE.",
      "Then JOIN reservations r ON r.restaurant_id = res.id."
    ],
    "solution_explanation": "Analyzes reservations for venues with outdoor seating.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L2-098",
    "domain": "restaurants",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Top Server by Items Handled",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which server handled the most individual items across all their orders?",
    "context_notes": "JOIN orders with order_items. SUM(quantity) GROUP BY server. LIMIT 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "server_name",
      "total_items"
    ],
    "reference_sql": "SELECT o.server_name, SUM(oi.quantity) AS total_items FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.server_name ORDER BY total_items DESC LIMIT 1;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN orders o with order_items oi.",
      "SUM(oi.quantity) AS total_items.",
      "GROUP BY o.server_name ORDER BY total_items DESC LIMIT 1."
    ],
    "solution_explanation": "Identifies highest-volume server by total items handled.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L2-099",
    "domain": "restaurants",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Highly Rated Venues With Sufficient Reviews",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Venues with at least 3 reviews AND average rating 4.5 or above — name, review count, avg rating, total covers.",
    "context_notes": "JOIN restaurants with guest_reviews AND reservations. HAVING review_count >= 3 AND avg >= 4.5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "review_count",
      "avg_rating",
      "total_covers"
    ],
    "reference_sql": "SELECT res.name AS restaurant_name, COUNT(DISTINCT gr.id) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating, SUM(r.party_size) AS total_covers FROM restaurants res JOIN guest_reviews gr ON gr.restaurant_id = res.id JOIN reservations r ON r.restaurant_id = res.id GROUP BY res.name HAVING COUNT(DISTINCT gr.id) >= 3 AND AVG(gr.rating) >= 4.5 ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN restaurants with guest_reviews AND reservations.",
      "HAVING COUNT >= 3 AND AVG >= 4.5."
    ],
    "solution_explanation": "Finds highly-reviewed and highly-rated venues.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L2-100",
    "domain": "restaurants",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "Grand Revenue and Operations Summary",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Grand finale — one row: total items sold, total orders, total revenue, total profit, margin %, and the best-selling dish name.",
    "context_notes": "JOIN order_items with menu_items. All aggregates. Scalar subquery for best dish.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "total_items_sold",
      "total_orders",
      "total_revenue",
      "total_profit",
      "margin_pct",
      "best_selling_dish"
    ],
    "reference_sql": "SELECT SUM(oi.quantity) AS total_items_sold, COUNT(DISTINCT oi.order_id) AS total_orders, SUM(oi.quantity * mi.price) AS total_revenue, SUM(oi.quantity * (mi.price - mi.cost)) AS total_profit, ROUND(SUM(oi.quantity * (mi.price - mi.cost)) / NULLIF(SUM(oi.quantity * mi.price), 0) * 100, 1) AS margin_pct, (SELECT mi2.name FROM order_items oi2 JOIN menu_items mi2 ON oi2.menu_item_id = mi2.id GROUP BY mi2.name ORDER BY SUM(oi2.quantity) DESC LIMIT 1) AS best_selling_dish FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "JOIN order_items oi with menu_items mi.",
      "SUM(qty), COUNT(DISTINCT order_id), SUM(revenue), SUM(profit).",
      "Scalar subquery for best_selling_dish."
    ],
    "solution_explanation": "Ultimate grand summary with all aggregate metrics and scalar subquery.",
    "xp": 60,
    "estimated_minutes": 15
  }
];
