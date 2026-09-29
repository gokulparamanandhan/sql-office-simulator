import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L4-001",
    "domain": "restaurants",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Dishes Ranked by Price",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank all our menu items by retail price from most expensive to least using DENSE_RANK. Show dish name, category, price, and price rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY price DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "price_rank"
    ],
    "reference_sql": "SELECT name, category, price, DENSE_RANK() OVER (ORDER BY price DESC) AS price_rank FROM menu_items ORDER BY price_rank, name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use DENSE_RANK() OVER (ORDER BY price DESC).",
      "Order final output by price_rank, name."
    ],
    "solution_explanation": "Applies basic dense ranking window function across menu prices.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-002",
    "domain": "restaurants",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Staff Hourly Wage Leaderboard",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "I need an HR compensation ladder: rank all staff members by hourly rate from highest to lowest using ROW_NUMBER.",
    "context_notes": "ROW_NUMBER() OVER (ORDER BY hourly_rate DESC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "role",
      "hourly_rate",
      "wage_rank"
    ],
    "reference_sql": "SELECT name, role, hourly_rate, ROW_NUMBER() OVER (ORDER BY hourly_rate DESC) AS wage_rank FROM staff_members ORDER BY wage_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use ROW_NUMBER() OVER (ORDER BY hourly_rate DESC).",
      "Order output by wage_rank."
    ],
    "solution_explanation": "Numbers staff members strictly by wage rate.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-003",
    "domain": "restaurants",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Running Total of Order Revenue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For our end-of-day register tape, show each order id, order time, total amount, and the cumulative running total of revenue.",
    "context_notes": "SUM(total_amount) OVER (ORDER BY order_time, id).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "total_amount",
      "running_revenue"
    ],
    "reference_sql": "SELECT id, order_time, total_amount, ROUND(SUM(total_amount) OVER (ORDER BY order_time, id), 2) AS running_revenue FROM orders ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use SUM(total_amount) OVER (ORDER BY order_time, id).",
      "Rounds running sum to 2 decimal places."
    ],
    "solution_explanation": "Calculates cumulative revenue over time on the dining floor.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-004",
    "domain": "restaurants",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Rank Dishes Within Each Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Within each menu category, rank dishes by price from highest to lowest using ROW_NUMBER.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "category",
      "name",
      "price",
      "cat_price_rank"
    ],
    "reference_sql": "SELECT category, name, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS cat_price_rank FROM menu_items ORDER BY category, cat_price_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by category and order by price DESC inside ROW_NUMBER().",
      "Order output by category, cat_price_rank."
    ],
    "solution_explanation": "Partitions menu prices to establish category price ladders.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-005",
    "domain": "restaurants",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Total Staff Count Per Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Display each staff member along with their restaurant name and the total headcount of staff assigned to that venue.",
    "context_notes": "COUNT(*) OVER (PARTITION BY restaurant_id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "restaurant_name",
      "venue_headcount"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, r.name AS restaurant_name, COUNT(*) OVER (PARTITION BY sm.restaurant_id) AS venue_headcount FROM staff_members sm JOIN restaurants r ON sm.restaurant_id = r.id ORDER BY r.name, sm.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with restaurants.",
      "Use COUNT(*) OVER (PARTITION BY sm.restaurant_id) as venue_headcount."
    ],
    "solution_explanation": "Attaches total venue staffing context to each employee record.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-006",
    "domain": "restaurants",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Shifts Worked by Staff Members",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show each shift record: staff name, shift type, hours worked, and the cumulative hours worked by that staff member to date.",
    "context_notes": "SUM(hours_worked) OVER (PARTITION BY staff_id ORDER BY shift_date, id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "staff_name",
      "shift_type",
      "shift_date",
      "hours_worked",
      "cumulative_hours"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, s.shift_type, s.shift_date, s.hours_worked, ROUND(SUM(s.hours_worked) OVER (PARTITION BY s.staff_id ORDER BY s.shift_date, s.id), 2) AS cumulative_hours FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id ORDER BY sm.name, s.shift_date;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Compute running sum of hours_worked partitioned by staff_id."
    ],
    "solution_explanation": "Tracks individual employee cumulative shift hours.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-007",
    "domain": "restaurants",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Price Difference From Category Average",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each dish, compare its retail price against the average price of its category: show dish name, category, price, and the price variance.",
    "context_notes": "price - AVG(price) OVER (PARTITION BY category).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "category_avg_price",
      "price_diff"
    ],
    "reference_sql": "SELECT name, category, price, ROUND(AVG(price) OVER (PARTITION BY category), 2) AS category_avg_price, ROUND(price - AVG(price) OVER (PARTITION BY category), 2) AS price_diff FROM menu_items ORDER BY category, price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute AVG(price) OVER (PARTITION BY category).",
      "Subtract category average from dish price."
    ],
    "solution_explanation": "Evaluates price premiums relative to category benchmarks.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-008",
    "domain": "restaurants",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Rank Suppliers by Rating",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Produce a vendor quality board: rank suppliers by rating using DENSE_RANK, breaking ties by supplier name alphabetically.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY rating DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "WINDOW"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating",
      "quality_rank"
    ],
    "reference_sql": "SELECT supplier_name, category, rating, DENSE_RANK() OVER (ORDER BY rating DESC) AS quality_rank FROM suppliers ORDER BY quality_rank, supplier_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use DENSE_RANK() OVER (ORDER BY rating DESC).",
      "Order final list by quality_rank, supplier_name."
    ],
    "solution_explanation": "Establishes official supplier quality tier ranking.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-009",
    "domain": "restaurants",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Previous Order Amount on Floor",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For floor pacing analysis, show each order id, order time, server name, amount, and the previous order amount using LAG.",
    "context_notes": "LAG(total_amount, 1) OVER (ORDER BY order_time, id).",
    "concepts": [
      "SELECT",
      "LAG",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "server_name",
      "total_amount",
      "prev_order_amount"
    ],
    "reference_sql": "SELECT id, order_time, server_name, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_time, id) AS prev_order_amount FROM orders ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use LAG(total_amount, 1) OVER (ORDER BY order_time, id).",
      "Order output chronologically by order_time, id."
    ],
    "solution_explanation": "Analyzes pacing and check size variance order-to-order.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-010",
    "domain": "restaurants",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Hourly Wage vs Role Average",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For compensation equity, show each staff member name, role, wage, and the average wage for their specific role.",
    "context_notes": "AVG(hourly_rate) OVER (PARTITION BY role).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "role",
      "hourly_rate",
      "role_avg_wage"
    ],
    "reference_sql": "SELECT name, role, hourly_rate, ROUND(AVG(hourly_rate) OVER (PARTITION BY role), 2) AS role_avg_wage FROM staff_members ORDER BY role, hourly_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute AVG(hourly_rate) OVER (PARTITION BY role).",
      "Order by role, hourly_rate DESC."
    ],
    "solution_explanation": "Audits wage distribution against peer job title averages.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-011",
    "domain": "restaurants",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Running Purchase Spend by Supplier",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Show each procurement purchase: supplier name, amount, date, and cumulative running spend for that specific vendor.",
    "context_notes": "SUM(total_amount) OVER (PARTITION BY supplier_id ORDER BY purchase_date, id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "supplier_name",
      "total_amount",
      "purchase_date",
      "supplier_running_total"
    ],
    "reference_sql": "SELECT s.supplier_name, ip.total_amount, ip.purchase_date, ROUND(SUM(ip.total_amount) OVER (PARTITION BY ip.supplier_id ORDER BY ip.purchase_date, ip.id), 2) AS supplier_running_total FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id ORDER BY s.supplier_name, ip.purchase_date;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with suppliers.",
      "Partition running sum of total_amount by supplier_id."
    ],
    "solution_explanation": "Tracks ongoing expenditure trajectory per vendor.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-012",
    "domain": "restaurants",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Highest and Lowest Price in Category Attached to Each Dish",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Display each menu item along with the minimum price and maximum price within its category.",
    "context_notes": "MIN(price) OVER (PARTITION BY category) and MAX(price) OVER (...).",
    "concepts": [
      "SELECT",
      "MIN OVER",
      "MAX OVER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "category_min_price",
      "category_max_price"
    ],
    "reference_sql": "SELECT name, category, price, MIN(price) OVER (PARTITION BY category) AS category_min_price, MAX(price) OVER (PARTITION BY category) AS category_max_price FROM menu_items ORDER BY category, price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute MIN(price) and MAX(price) partitioned by category."
    ],
    "solution_explanation": "Defines price bands and brackets for each menu section.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-013",
    "domain": "restaurants",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Shift Duration Comparison to Average Shift",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For kitchen scheduling, display each shift id, shift type, hours worked, and the overall average shift duration.",
    "context_notes": "AVG(hours_worked) OVER ().",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "shift_type",
      "hours_worked",
      "avg_shift_hours"
    ],
    "reference_sql": "SELECT id, shift_type, hours_worked, ROUND(AVG(hours_worked) OVER (), 2) AS avg_shift_hours FROM shifts ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use overall AVG(hours_worked) OVER () with empty window clause."
    ],
    "solution_explanation": "Benchmarks individual shift duration against company mean.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-014",
    "domain": "restaurants",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Rank Venues by Seating Capacity",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank all 30 restaurants from largest to smallest by seating capacity using RANK.",
    "context_notes": "RANK() OVER (ORDER BY seating_capacity DESC).",
    "concepts": [
      "SELECT",
      "RANK",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "city",
      "seating_capacity",
      "capacity_rank"
    ],
    "reference_sql": "SELECT name, city, seating_capacity, RANK() OVER (ORDER BY seating_capacity DESC) AS capacity_rank FROM restaurants ORDER BY capacity_rank, name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use RANK() OVER (ORDER BY seating_capacity DESC).",
      "Order output by capacity_rank, name."
    ],
    "solution_explanation": "Ranks venue scale across the entire restaurant network.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-015",
    "domain": "restaurants",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Next Order Ticket Size Ahead on Floor",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For kitchen expediting, show each order id, server name, amount, and the subsequent order amount using LEAD.",
    "context_notes": "LEAD(total_amount, 1) OVER (ORDER BY order_time, id).",
    "concepts": [
      "SELECT",
      "LEAD",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "server_name",
      "total_amount",
      "next_order_amount"
    ],
    "reference_sql": "SELECT id, order_time, server_name, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_time, id) AS next_order_amount FROM orders ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use LEAD(total_amount, 1) OVER (ORDER BY order_time, id).",
      "Order chronologically by order_time, id."
    ],
    "solution_explanation": "Kitchen line forecasting of upcoming check volumes.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-016",
    "domain": "restaurants",
    "level": 4,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Staff Hourly Rate Quartiles",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Divide our staff members into 4 compensation tiers (quartiles) using NTILE(4) based on hourly rate.",
    "context_notes": "NTILE(4) OVER (ORDER BY hourly_rate DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "role",
      "hourly_rate",
      "wage_quartile"
    ],
    "reference_sql": "SELECT name, role, hourly_rate, NTILE(4) OVER (ORDER BY hourly_rate DESC) AS wage_quartile FROM staff_members ORDER BY wage_quartile, hourly_rate DESC, name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY hourly_rate DESC).",
      "Order by wage_quartile, hourly_rate DESC."
    ],
    "solution_explanation": "Segments workforce into 4 standardized compensation buckets.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-017",
    "domain": "restaurants",
    "level": 4,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Running Count of Reservations Over Time",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Track reservation booking flow: show guest name, reservation time, party size, and running count of reservations.",
    "context_notes": "COUNT(*) OVER (ORDER BY reservation_time, id).",
    "concepts": [
      "SELECT",
      "COUNT OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "guest_name",
      "reservation_time",
      "party_size",
      "booking_sequence"
    ],
    "reference_sql": "SELECT guest_name, reservation_time, party_size, COUNT(*) OVER (ORDER BY reservation_time, id) AS booking_sequence FROM reservations ORDER BY reservation_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use COUNT(*) OVER (ORDER BY reservation_time, id).",
      "Assigns continuous sequence number chronologically."
    ],
    "solution_explanation": "Generates time-ordered booking sequence index.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-018",
    "domain": "restaurants",
    "level": 4,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Staff Member Shift Count",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Display each shift along with the total number of shifts recorded by that particular employee across the schedule.",
    "context_notes": "COUNT(*) OVER (PARTITION BY staff_id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "staff_name",
      "shift_type",
      "shift_date",
      "total_employee_shifts"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, s.shift_type, s.shift_date, COUNT(*) OVER (PARTITION BY s.staff_id) AS total_employee_shifts FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id ORDER BY sm.name, s.shift_date;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Compute COUNT(*) OVER (PARTITION BY s.staff_id)."
    ],
    "solution_explanation": "Checks employee roster engagement across the month.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-019",
    "domain": "restaurants",
    "level": 4,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Ingredients Cost Rank Within Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank raw ingredients within each category by unit cost from highest to lowest using DENSE_RANK.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY category ORDER BY unit_cost DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "category",
      "ingredient_name",
      "unit_cost",
      "cost_rank"
    ],
    "reference_sql": "SELECT category, ingredient_name, unit_cost, DENSE_RANK() OVER (PARTITION BY category ORDER BY unit_cost DESC) AS cost_rank FROM ingredients ORDER BY category, cost_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by category and order by unit_cost DESC inside DENSE_RANK().",
      "Order final output by category, cost_rank."
    ],
    "solution_explanation": "Identifies most expensive raw commodities per culinary department.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-020",
    "domain": "restaurants",
    "level": 4,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Average Rating of Venue Attached to Each Review",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Display each guest review rating alongside the venue overall average review score to spot outliers.",
    "context_notes": "AVG(rating) OVER (PARTITION BY restaurant_id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG OVER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "review_date",
      "venue_avg_rating"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, gr.rating, gr.review_date, ROUND(AVG(gr.rating) OVER (PARTITION BY gr.restaurant_id), 2) AS venue_avg_rating FROM guest_reviews gr JOIN restaurants r ON gr.restaurant_id = r.id ORDER BY r.name, gr.review_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join guest_reviews with restaurants.",
      "Compute AVG(gr.rating) OVER (PARTITION BY gr.restaurant_id)."
    ],
    "solution_explanation": "Spots harsh or glowing review anomalies relative to baseline.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-021",
    "domain": "restaurants",
    "level": 4,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Server Shift Wage Expense Calculation",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each shift, compute estimated labor expense: staff hourly rate multiplied by shift hours worked.",
    "context_notes": "Join shifts with staff_members and calculate hours_worked * hourly_rate.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "Arithmetic"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "shift_type",
      "hours_worked",
      "shift_cost"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, s.shift_type, s.hours_worked, ROUND(s.hours_worked * sm.hourly_rate, 2) AS shift_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id ORDER BY shift_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members on staff_id.",
      "Multiply hours_worked by hourly_rate."
    ],
    "solution_explanation": "Calculates precise direct labor cost per shift.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-022",
    "domain": "restaurants",
    "level": 4,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Running Total of Guest Covers",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Track cumulative guest arrivals: show reservation time, guest name, party size, and running sum of total covers.",
    "context_notes": "SUM(party_size) OVER (ORDER BY reservation_time, id).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "reservation_time",
      "guest_name",
      "party_size",
      "running_covers"
    ],
    "reference_sql": "SELECT reservation_time, guest_name, party_size, SUM(party_size) OVER (ORDER BY reservation_time, id) AS running_covers FROM reservations ORDER BY reservation_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use SUM(party_size) OVER (ORDER BY reservation_time, id).",
      "Orders chronologically."
    ],
    "solution_explanation": "Monitors cumulative guest throughput across dining periods.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-023",
    "domain": "restaurants",
    "level": 4,
    "order": 23,
    "difficulty": "warm-up",
    "title": "First and Last Order Timestamps on Floor",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show each order id, order time, and the very first order timestamp of the shift using FIRST_VALUE.",
    "context_notes": "FIRST_VALUE(order_time) OVER (ORDER BY order_time).",
    "concepts": [
      "SELECT",
      "FIRST_VALUE",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "first_order_time"
    ],
    "reference_sql": "SELECT id, order_time, FIRST_VALUE(order_time) OVER (ORDER BY order_time) AS first_order_time FROM orders ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use FIRST_VALUE(order_time) OVER (ORDER BY order_time)."
    ],
    "solution_explanation": "Anchors dining checks against the opening bell of service.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-024",
    "domain": "restaurants",
    "level": 4,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Staff Members Ranked by Wage Within Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Within each restaurant, rank staff members by hourly wage from highest to lowest using ROW_NUMBER.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY hourly_rate DESC).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ROW_NUMBER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "restaurant_name",
      "staff_name",
      "role",
      "hourly_rate",
      "venue_wage_rank"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, sm.name AS staff_name, sm.role, sm.hourly_rate, ROW_NUMBER() OVER (PARTITION BY sm.restaurant_id ORDER BY sm.hourly_rate DESC) AS venue_wage_rank FROM staff_members sm JOIN restaurants r ON sm.restaurant_id = r.id ORDER BY r.name, venue_wage_rank;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with restaurants.",
      "Partition by sm.restaurant_id inside ROW_NUMBER()."
    ],
    "solution_explanation": "Local venue payroll hierarchy ladder.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-025",
    "domain": "restaurants",
    "level": 4,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Percentage Contribution of Each Order to Daily Total",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Display each order total amount along with its percentage contribution to total network sales.",
    "context_notes": "ROUND((total_amount / SUM(total_amount) OVER ()) * 100, 2).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "sales_pct"
    ],
    "reference_sql": "SELECT id, total_amount, ROUND((total_amount / SUM(total_amount) OVER ()) * 100, 2) AS sales_pct FROM orders ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute total_amount divided by SUM(total_amount) OVER () * 100."
    ],
    "solution_explanation": "Measures individual check impact on gross top-line sales.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-026",
    "domain": "restaurants",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Day-Over-Day Shift Hours Comparison",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare daily labor hours: for each shift date, show total hours worked and the previous day total hours using LAG.",
    "context_notes": "GROUP BY shift_date with LAG over date.",
    "concepts": [
      "SELECT",
      "LAG",
      "SUM",
      "GROUP BY",
      "WINDOW"
    ],
    "expected_columns": [
      "shift_date",
      "daily_hours",
      "prev_day_hours"
    ],
    "reference_sql": "SELECT shift_date, SUM(hours_worked) AS daily_hours, LAG(SUM(hours_worked), 1) OVER (ORDER BY shift_date) AS prev_day_hours FROM shifts GROUP BY shift_date ORDER BY shift_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group shifts by shift_date and sum hours_worked.",
      "Use LAG(SUM(hours_worked), 1) OVER (ORDER BY shift_date)."
    ],
    "solution_explanation": "Evaluates day-over-day staffing expansion and contraction.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-027",
    "domain": "restaurants",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Top 2 Highest Paid Staff in Each Role",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Identify the top 2 highest paid staff members for each role: show role, name, and hourly rate.",
    "context_notes": "Subquery with DENSE_RANK() OVER (PARTITION BY role) <= 2.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "role",
      "name",
      "hourly_rate",
      "role_rank"
    ],
    "reference_sql": "SELECT role, name, hourly_rate, role_rank FROM (SELECT role, name, hourly_rate, DENSE_RANK() OVER (PARTITION BY role ORDER BY hourly_rate DESC) AS role_rank FROM staff_members) ranked WHERE role_rank <= 2 ORDER BY role, role_rank, name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes DENSE_RANK() partitioned by role.",
      "Outer query filters WHERE role_rank <= 2."
    ],
    "solution_explanation": "Compensation benchmarks for senior tier talent per role.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-028",
    "domain": "restaurants",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Server Revenue Ranking and Market Share",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank servers by total sales generated, displaying server name, total sales, rank, and percentage of overall revenue.",
    "context_notes": "GROUP BY server_name with DENSE_RANK and SUM OVER.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "SUM OVER",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "total_sales",
      "sales_rank",
      "pct_of_total"
    ],
    "reference_sql": "SELECT server_name, SUM(total_amount) AS total_sales, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS sales_rank, ROUND((SUM(total_amount) / SUM(SUM(total_amount)) OVER ()) * 100, 2) AS pct_of_total FROM orders GROUP BY server_name ORDER BY sales_rank, server_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by server_name.",
      "Use DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC).",
      "Compute percentage using SUM(SUM(total_amount)) OVER ()."
    ],
    "solution_explanation": "Definitive server sales leaderboard with revenue share.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-029",
    "domain": "restaurants",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Dish Sales Rank Within Category by Quantity",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank dishes within each category by total units sold: show category, dish name, units sold, and category sales rank.",
    "context_notes": "JOIN menu_items, order_items, GROUP BY dish, DENSE_RANK partitioned by category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "DENSE_RANK",
      "PARTITION BY",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "dish_name",
      "units_sold",
      "category_rank"
    ],
    "reference_sql": "SELECT mi.category, mi.name AS dish_name, SUM(oi.quantity) AS units_sold, DENSE_RANK() OVER (PARTITION BY mi.category ORDER BY SUM(oi.quantity) DESC) AS category_rank FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category, mi.name ORDER BY mi.category, category_rank, dish_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join menu_items with order_items.",
      "Group by category, dish name and compute SUM(quantity).",
      "Apply DENSE_RANK() partitioned by category."
    ],
    "solution_explanation": "Identifies top-selling anchor dishes within each menu department.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-030",
    "domain": "restaurants",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Shift Type Labor Cost Breakdown",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total labor cost for Lunch, Dinner, and Prep shifts, displaying shift type, total hours, and total labor dollars paid.",
    "context_notes": "JOIN shifts with staff_members, GROUP BY shift_type.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "shift_type",
      "total_hours",
      "total_labor_cost"
    ],
    "reference_sql": "SELECT s.shift_type, ROUND(SUM(s.hours_worked), 2) AS total_hours, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_labor_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id GROUP BY s.shift_type ORDER BY total_labor_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members on staff_id.",
      "Compute SUM(hours_worked) and SUM(hours_worked * hourly_rate) grouped by shift_type."
    ],
    "solution_explanation": "Allocates operational payroll across service periods.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-031",
    "domain": "restaurants",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Gap Between Consecutive Order Times",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Calculate the minutes elapsed between consecutive orders placed on the dining floor using LAG and EXTRACT.",
    "context_notes": "LAG(order_time) with EXTRACT(EPOCH) / 60.",
    "concepts": [
      "SELECT",
      "LAG",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "prev_order_time",
      "minutes_since_last_order"
    ],
    "reference_sql": "SELECT id, order_time, LAG(order_time, 1) OVER (ORDER BY order_time, id) AS prev_order_time, ROUND(EXTRACT(EPOCH FROM (order_time - LAG(order_time, 1) OVER (ORDER BY order_time, id))) / 60, 1) AS minutes_since_last_order FROM orders ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use LAG(order_time, 1) OVER (ORDER BY order_time, id).",
      "Compute minutes elapsed using EXTRACT(EPOCH FROM delta) / 60."
    ],
    "solution_explanation": "Detects floor ordering cadence and kitchen rush spikes.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-032",
    "domain": "restaurants",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Top 3 Most Expensive Dishes in Each Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Display the top 3 highest-priced dishes for every menu category using ROW_NUMBER.",
    "context_notes": "Subquery with ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) <= 3.",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "category",
      "name",
      "price",
      "price_rank"
    ],
    "reference_sql": "SELECT category, name, price, price_rank FROM (SELECT category, name, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank FROM menu_items) sub WHERE price_rank <= 3 ORDER BY category, price_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery assigns ROW_NUMBER() partitioned by category.",
      "Filter WHERE price_rank <= 3."
    ],
    "solution_explanation": "Luxury showcase: top three premium dishes per station.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-033",
    "domain": "restaurants",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Cumulative Spend by Restaurant Over Time",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "For each restaurant, show each ingredient purchase date, amount, and the running cumulative procurement spend.",
    "context_notes": "SUM(total_amount) OVER (PARTITION BY restaurant_id ORDER BY purchase_date, id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM OVER",
      "PARTITION BY",
      "WINDOW"
    ],
    "expected_columns": [
      "restaurant_name",
      "purchase_date",
      "total_amount",
      "running_spend"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, ip.purchase_date, ip.total_amount, ROUND(SUM(ip.total_amount) OVER (PARTITION BY ip.restaurant_id ORDER BY ip.purchase_date, ip.id), 2) AS running_spend FROM ingredient_purchases ip JOIN restaurants r ON ip.restaurant_id = r.id ORDER BY r.name, ip.purchase_date, ip.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with restaurants.",
      "Compute running sum of total_amount partitioned by restaurant_id."
    ],
    "solution_explanation": "Tracks budget burn trajectory at each restaurant.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-034",
    "domain": "restaurants",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Staff Wage Compared to Venue Average Wage",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show each staff member hourly rate alongside the average hourly rate of staff at that same restaurant venue.",
    "context_notes": "hourly_rate - AVG(hourly_rate) OVER (PARTITION BY restaurant_id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG OVER",
      "PARTITION BY",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "restaurant_name",
      "staff_name",
      "hourly_rate",
      "venue_avg_wage",
      "wage_diff"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, sm.name AS staff_name, sm.hourly_rate, ROUND(AVG(sm.hourly_rate) OVER (PARTITION BY sm.restaurant_id), 2) AS venue_avg_wage, ROUND(sm.hourly_rate - AVG(sm.hourly_rate) OVER (PARTITION BY sm.restaurant_id), 2) AS wage_diff FROM staff_members sm JOIN restaurants r ON sm.restaurant_id = r.id ORDER BY r.name, sm.hourly_rate DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with restaurants.",
      "Compute venue average hourly rate and variance per employee."
    ],
    "solution_explanation": "Internal venue equity audit to ensure fair payroll distribution.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-035",
    "domain": "restaurants",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Total Labor Cost Per Restaurant",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Aggregate all shifts to determine the total labor payroll expense for each restaurant: venue name, city, and total payroll dollars.",
    "context_notes": "JOIN restaurants, staff_members, shifts. SUM(hours_worked * hourly_rate).",
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
      "city",
      "total_payroll_cost"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_payroll_cost FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id GROUP BY r.name, r.city ORDER BY total_payroll_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "3-way JOIN: restaurants → staff_members → shifts.",
      "Compute SUM(s.hours_worked * sm.hourly_rate) grouped by venue."
    ],
    "solution_explanation": "Core P&L labor cost breakdown per operating branch.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-036",
    "domain": "restaurants",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Orders Ranked by Total Amount in 5 Tiles",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group all dining orders into 5 spending tiers using NTILE(5): tier 1 being highest checks, tier 5 lowest checks.",
    "context_notes": "NTILE(5) OVER (ORDER BY total_amount DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount",
      "spend_tier"
    ],
    "reference_sql": "SELECT id, server_name, total_amount, NTILE(5) OVER (ORDER BY total_amount DESC) AS spend_tier FROM orders ORDER BY spend_tier, total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use NTILE(5) OVER (ORDER BY total_amount DESC).",
      "Order output by spend_tier, total_amount DESC."
    ],
    "solution_explanation": "Segments dining checks into quintiles for promotion modeling.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-037",
    "domain": "restaurants",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Dishes With Highest Food Cost in Each Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Using DENSE_RANK, find the dish with the single highest food cost in each menu category.",
    "context_notes": "Subquery with DENSE_RANK() OVER (PARTITION BY category ORDER BY cost DESC) = 1.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "category",
      "name",
      "cost"
    ],
    "reference_sql": "SELECT category, name, cost FROM (SELECT category, name, cost, DENSE_RANK() OVER (PARTITION BY category ORDER BY cost DESC) AS cost_rank FROM menu_items) sub WHERE cost_rank = 1 ORDER BY category;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes DENSE_RANK() partitioned by category on cost DESC.",
      "Filter WHERE cost_rank = 1."
    ],
    "solution_explanation": "Pins the costliest dish recipe for each station supervisor.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-038",
    "domain": "restaurants",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Server Check Size Difference From Overall Average",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each order, show the order id, server name, order amount, and how far above or below the overall average check it sits.",
    "context_notes": "total_amount - AVG(total_amount) OVER ().",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount",
      "diff_from_average"
    ],
    "reference_sql": "SELECT id, server_name, total_amount, ROUND(total_amount - AVG(total_amount) OVER (), 2) AS diff_from_average FROM orders ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute total_amount - AVG(total_amount) OVER ().",
      "Rounds delta to 2 decimal places."
    ],
    "solution_explanation": "Evaluates ticket outliers against company baseline.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-039",
    "domain": "restaurants",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Venues Ranked by Guest Review Score",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank all restaurants by their average review rating using DENSE_RANK, showing venue name, city, review count, and avg score.",
    "context_notes": "JOIN restaurants with guest_reviews, GROUP BY venue, DENSE_RANK OVER avg rating.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "COUNT",
      "DENSE_RANK",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "review_count",
      "avg_rating",
      "rating_rank"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(gr.id) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating, DENSE_RANK() OVER (ORDER BY AVG(gr.rating) DESC) AS rating_rank FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.name, r.city ORDER BY rating_rank, r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with guest_reviews.",
      "Group by restaurant, compute AVG(gr.rating) and DENSE_RANK."
    ],
    "solution_explanation": "The definitive guest satisfaction league table.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-040",
    "domain": "restaurants",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Consecutive Purchase Price Variance by Supplier",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "For Verona Italian Importers, compare each invoice against their previous invoice using LAG to spot cost inflation.",
    "context_notes": "LAG(total_amount) WHERE supplier = Verona Italian Importers.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "LAG",
      "WHERE",
      "WINDOW"
    ],
    "expected_columns": [
      "purchase_date",
      "total_amount",
      "prev_amount",
      "amount_difference"
    ],
    "reference_sql": "SELECT ip.purchase_date, ip.total_amount, LAG(ip.total_amount, 1) OVER (ORDER BY ip.purchase_date, ip.id) AS prev_amount, ROUND(ip.total_amount - LAG(ip.total_amount, 1) OVER (ORDER BY ip.purchase_date, ip.id), 2) AS amount_difference FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id WHERE s.supplier_name = 'Verona Italian Importers' ORDER BY ip.purchase_date, ip.id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter purchases for Verona Italian Importers.",
      "Compute invoice variance using LAG(total_amount, 1)."
    ],
    "solution_explanation": "Audits invoice-to-invoice price stability for key importer.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-041",
    "domain": "restaurants",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Kitchen vs Front of House Headcount by Venue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Count culinary staff (Chefs, Line Cooks) vs hospitality staff (Servers, Hosts, Bartenders) at each restaurant using CASE WHEN.",
    "context_notes": "SUM(CASE WHEN role IN (...)) GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "kitchen_staff",
      "foh_staff"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, SUM(CASE WHEN sm.role IN ('Executive_Chef', 'Sous_Chef', 'Line_Cook') THEN 1 ELSE 0 END) AS kitchen_staff, SUM(CASE WHEN sm.role IN ('Server', 'Host', 'Bartender', 'Sommelier') THEN 1 ELSE 0 END) AS foh_staff FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id GROUP BY r.name ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with staff_members.",
      "Use CASE WHEN inside SUM to bucket kitchen vs front-of-house headcount."
    ],
    "solution_explanation": "Balance check between culinary prep capacity and dining room staff.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-042",
    "domain": "restaurants",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Top Earning Sommelier or Bartender",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Rank beverage staff (Sommelier and Bartender roles) by hourly rate from highest to lowest using ROW_NUMBER.",
    "context_notes": "Filter role IN (Sommelier, Bartender), ROW_NUMBER OVER rate DESC.",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "WHERE",
      "IN",
      "WINDOW"
    ],
    "expected_columns": [
      "name",
      "role",
      "hourly_rate",
      "beverage_wage_rank"
    ],
    "reference_sql": "SELECT name, role, hourly_rate, ROW_NUMBER() OVER (ORDER BY hourly_rate DESC) AS beverage_wage_rank FROM staff_members WHERE role IN ('Sommelier', 'Bartender') ORDER BY beverage_wage_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter staff_members WHERE role IN (Sommelier, Bartender).",
      "Order by hourly_rate DESC inside ROW_NUMBER()."
    ],
    "solution_explanation": "Ranks specialized beverage team members by compensation.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-043",
    "domain": "restaurants",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Cumulative Order Items Prepared in Kitchen",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Track cumulative culinary workload: show order item id, quantity, and running total of items cooked/prepared across all checks.",
    "context_notes": "SUM(quantity) OVER (ORDER BY id).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "quantity",
      "cumulative_items"
    ],
    "reference_sql": "SELECT id, order_id, quantity, SUM(quantity) OVER (ORDER BY id) AS cumulative_items FROM order_items ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use SUM(quantity) OVER (ORDER BY id).",
      "Calculates cumulative kitchen production volume."
    ],
    "solution_explanation": "Monitors total culinary ticket production.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-044",
    "domain": "restaurants",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Shifts Worked by Role Summary",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each job role, calculate total hours scheduled, average hours per shift, and total number of completed shifts.",
    "context_notes": "JOIN staff_members with shifts, GROUP BY role.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "role",
      "shift_count",
      "total_hours",
      "avg_shift_hours"
    ],
    "reference_sql": "SELECT sm.role, COUNT(s.id) AS shift_count, ROUND(SUM(s.hours_worked), 2) AS total_hours, ROUND(AVG(s.hours_worked), 2) AS avg_shift_hours FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.role ORDER BY total_hours DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with shifts.",
      "Group by sm.role and compute COUNT, SUM, AVG of shift metrics."
    ],
    "solution_explanation": "Workforce utilization profile across organizational roles.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-045",
    "domain": "restaurants",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Ingredients Value Rank by Cash Tied Up",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank all ingredients by total holding value (unit cost * current stock) from highest to lowest using DENSE_RANK.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY unit_cost * current_stock_qty DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "holding_value",
      "value_rank"
    ],
    "reference_sql": "SELECT ingredient_name, category, ROUND(unit_cost * current_stock_qty, 2) AS holding_value, DENSE_RANK() OVER (ORDER BY (unit_cost * current_stock_qty) DESC) AS value_rank FROM ingredients ORDER BY value_rank, ingredient_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Multiply unit_cost by current_stock_qty.",
      "Apply DENSE_RANK() OVER (ORDER BY calculation DESC)."
    ],
    "solution_explanation": "Ranks raw ingredient inventory by balance sheet capital risk.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-046",
    "domain": "restaurants",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Venues With Higher Labor Cost Than Food Purchases",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare venue labor payroll against food procurement: show restaurants where total labor exceeds $500.",
    "context_notes": "JOIN restaurants, staff_members, shifts with HAVING total labor > 500.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_labor_cost"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_labor_cost FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id GROUP BY r.name HAVING SUM(s.hours_worked * sm.hourly_rate) > 500 ORDER BY total_labor_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with staff_members and shifts.",
      "Filter venues HAVING total payroll cost > 500."
    ],
    "solution_explanation": "Identifies locations with significant active payroll commitments.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-047",
    "domain": "restaurants",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Server Efficiency: Average Table Turn Time Proxy",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each server, show total orders served, average check total, and the standard deviation of their check sizes.",
    "context_notes": "GROUP BY server_name, AVG and STDDEV.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "STDDEV",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "order_count",
      "avg_check",
      "check_stddev"
    ],
    "reference_sql": "SELECT server_name, COUNT(*) AS order_count, ROUND(AVG(total_amount), 2) AS avg_check, ROUND(COALESCE(STDDEV(total_amount), 0), 2) AS check_stddev FROM orders GROUP BY server_name ORDER BY avg_check DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by server_name.",
      "Compute COUNT(*), AVG(total_amount), and STDDEV(total_amount)."
    ],
    "solution_explanation": "Measures server consistency and upselling stability.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-048",
    "domain": "restaurants",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Top Paid Staff Member in Each Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Identify the single highest-earning staff member at each restaurant venue using ROW_NUMBER.",
    "context_notes": "Subquery with ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY hourly_rate DESC) = 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ROW_NUMBER",
      "PARTITION BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "staff_name",
      "role",
      "hourly_rate"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, ranked.staff_name, ranked.role, ranked.hourly_rate FROM (SELECT restaurant_id, name AS staff_name, role, hourly_rate, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY hourly_rate DESC) AS rn FROM staff_members) ranked JOIN restaurants r ON ranked.restaurant_id = r.id WHERE ranked.rn = 1 ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes ROW_NUMBER() partitioned by restaurant_id.",
      "Filter WHERE rn = 1 and join restaurants."
    ],
    "solution_explanation": "Surfaces senior floor lead / chef per location.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-049",
    "domain": "restaurants",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Dishes Ranking: Most Ordered in Dinner Period",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank menu items by units ordered strictly during the evening dinner hours (orders after 19:00).",
    "context_notes": "JOIN orders, order_items, menu_items WHERE EXTRACT(HOUR) >= 19.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "DENSE_RANK",
      "WHERE",
      "GROUP BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "dinner_units_sold",
      "dinner_rank"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity) AS dinner_units_sold, DENSE_RANK() OVER (ORDER BY SUM(oi.quantity) DESC) AS dinner_rank FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE EXTRACT(HOUR FROM o.order_time) >= 19 GROUP BY mi.name, mi.category ORDER BY dinner_rank, dish_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join orders, order_items, menu_items.",
      "Filter orders where order_time hour >= 19.",
      "Rank dishes by SUM(oi.quantity) DESC."
    ],
    "solution_explanation": "Identifies dinner prime-time culinary crowd pleasers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-050",
    "domain": "restaurants",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Shift Overtime Flag for Long Shifts",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify any shift lasting strictly longer than 7.5 hours, showing staff name, role, shift type, and hours worked.",
    "context_notes": "Filter shifts WHERE hours_worked > 7.50.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "shift_type",
      "hours_worked"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, s.shift_type, s.hours_worked FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE s.hours_worked > 7.50 ORDER BY s.hours_worked DESC, sm.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Filter WHERE hours_worked > 7.50."
    ],
    "solution_explanation": "Labor compliance audit: flags long shifts.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-051",
    "domain": "restaurants",
    "level": 4,
    "order": 51,
    "difficulty": "challenging",
    "title": "Rolling 3-Shift Average Hours Worked by Staff",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each staff member, calculate a 3-shift moving average of hours worked (current shift and 2 previous shifts).",
    "context_notes": "AVG(hours_worked) OVER (PARTITION BY staff_id ORDER BY shift_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG OVER",
      "ROWS BETWEEN",
      "WINDOW"
    ],
    "expected_columns": [
      "staff_name",
      "shift_date",
      "hours_worked",
      "rolling_3shift_avg"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, s.shift_date, s.hours_worked, ROUND(AVG(s.hours_worked) OVER (PARTITION BY s.staff_id ORDER BY s.shift_date, s.id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3shift_avg FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id ORDER BY sm.name, s.shift_date;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Use ROWS BETWEEN 2 PRECEDING AND CURRENT ROW in window frame."
    ],
    "solution_explanation": "Calculates 3-shift moving average for workload fatigue tracking.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-052",
    "domain": "restaurants",
    "level": 4,
    "order": 52,
    "difficulty": "challenging",
    "title": "Server Sales Rank by Dining Period",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank servers by sales volume during the 19:00 hour, displaying server name, sales total, and hour sales rank.",
    "context_notes": "Filter EXTRACT(HOUR) = 19, DENSE_RANK OVER sum.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "rush_hour_sales",
      "hour_rank"
    ],
    "reference_sql": "SELECT server_name, SUM(total_amount) AS rush_hour_sales, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS hour_rank FROM orders WHERE EXTRACT(HOUR FROM order_time) = 19 GROUP BY server_name ORDER BY hour_rank, server_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter orders WHERE EXTRACT(HOUR FROM order_time) = 19.",
      "Group by server_name and rank by SUM(total_amount) DESC."
    ],
    "solution_explanation": "Identifies top closers during the peak 7 PM rush.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-053",
    "domain": "restaurants",
    "level": 4,
    "order": 53,
    "difficulty": "challenging",
    "title": "Labor Cost Ratio to Total Procurement Spend",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each restaurant with both records, compute total labor spend and compare it against total ingredient procurement spend.",
    "context_notes": "Cross-table comparison of aggregated labor vs procurement per venue.",
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
      "labor_cost",
      "food_procurement",
      "labor_to_food_ratio"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS labor_cost, (SELECT ROUND(SUM(ip.total_amount), 2) FROM ingredient_purchases ip WHERE ip.restaurant_id = r.id) AS food_procurement, ROUND(SUM(s.hours_worked * sm.hourly_rate) / NULLIF((SELECT SUM(ip.total_amount) FROM ingredient_purchases ip WHERE ip.restaurant_id = r.id), 0), 2) AS labor_to_food_ratio FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id WHERE EXISTS (SELECT 1 FROM ingredient_purchases ip WHERE ip.restaurant_id = r.id) GROUP BY r.id, r.name ORDER BY labor_to_food_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate shift labor per venue.",
      "Subquery fetches procurement spend for that venue.",
      "Compute ratio of labor to food cost."
    ],
    "solution_explanation": "Key operational prime-cost index (Labor vs Food ratio).",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L4-054",
    "domain": "restaurants",
    "level": 4,
    "order": 54,
    "difficulty": "challenging",
    "title": "Menu Items Contributing to Top 50% of Sales",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Using cumulative sum of revenue over items ordered by revenue DESC, show dish name, sales, and running revenue.",
    "context_notes": "SUM(sales) OVER (ORDER BY sales DESC).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM OVER",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "dish_revenue",
      "running_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity * mi.price) AS dish_revenue, ROUND(SUM(SUM(oi.quantity * mi.price)) OVER (ORDER BY SUM(oi.quantity * mi.price) DESC), 2) AS running_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category ORDER BY dish_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group order_items and menu_items to compute dish_revenue.",
      "Apply running SUM() OVER (ORDER BY dish_revenue DESC)."
    ],
    "solution_explanation": "Pareto 80/20 analysis for menu revenue concentration.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L4-055",
    "domain": "restaurants",
    "level": 4,
    "order": 55,
    "difficulty": "challenging",
    "title": "Venues With Staffing Deficit Below Network Average",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants whose staff count is below the average staff count per venue across all 30 restaurants.",
    "context_notes": "COUNT(staff) < subquery avg headcount.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "headcount"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(sm.id) AS headcount FROM restaurants r LEFT JOIN staff_members sm ON r.id = sm.restaurant_id GROUP BY r.name, r.city HAVING COUNT(sm.id) < (SELECT AVG(staff_cnt) FROM (SELECT COUNT(id) AS staff_cnt FROM staff_members GROUP BY restaurant_id) sub) ORDER BY headcount ASC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group staff_members by restaurant.",
      "HAVING clause checks headcount against subquery average."
    ],
    "solution_explanation": "Surfaces venues susceptible to short-staffing risk.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-056",
    "domain": "restaurants",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Staff Hours Distribution by Quartile",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Aggregate total hours worked per staff member and bucket employees into 4 workload quartiles using NTILE(4).",
    "context_notes": "GROUP BY staff_id with NTILE(4) on SUM(hours_worked).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "NTILE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "total_hours",
      "workload_quartile"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, ROUND(SUM(s.hours_worked), 2) AS total_hours, NTILE(4) OVER (ORDER BY SUM(s.hours_worked) DESC) AS workload_quartile FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.name, sm.role ORDER BY workload_quartile, total_hours DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group shifts by staff member to compute total_hours.",
      "Apply NTILE(4) OVER (ORDER BY SUM(s.hours_worked) DESC)."
    ],
    "solution_explanation": "Segments workforce by actual shift load to balance fatigue.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L4-057",
    "domain": "restaurants",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Average Wage by Role and Venue Scale",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show average hourly wage by staff role across boutique (<=120 seats) vs large (>120 seats) restaurants.",
    "context_notes": "JOIN restaurants with staff_members, CASE WHEN on capacity, GROUP BY role and size.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "role",
      "venue_tier",
      "avg_hourly_wage"
    ],
    "reference_sql": "SELECT sm.role, CASE WHEN r.seating_capacity <= 120 THEN 'Boutique' ELSE 'Grand' END AS venue_tier, ROUND(AVG(sm.hourly_rate), 2) AS avg_hourly_wage FROM staff_members sm JOIN restaurants r ON sm.restaurant_id = r.id GROUP BY sm.role, CASE WHEN r.seating_capacity <= 120 THEN 'Boutique' ELSE 'Grand' END ORDER BY sm.role, venue_tier;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with restaurants.",
      "Bucket capacity with CASE WHEN and compute AVG(hourly_rate) by role."
    ],
    "solution_explanation": "Examines pay differentials between flagship flagships and boutique bistros.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-058",
    "domain": "restaurants",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Consecutive Reservation Time Gap by Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For Gusto Flagship Trattoria, compute minutes elapsed between successive reservation bookings using LAG.",
    "context_notes": "LAG(reservation_time) WHERE restaurant is Flagship.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "LAG",
      "Arithmetic",
      "WHERE",
      "WINDOW"
    ],
    "expected_columns": [
      "guest_name",
      "reservation_time",
      "prev_booking_time",
      "gap_minutes"
    ],
    "reference_sql": "SELECT res.guest_name, res.reservation_time, LAG(res.reservation_time, 1) OVER (ORDER BY res.reservation_time, res.id) AS prev_booking_time, ROUND(EXTRACT(EPOCH FROM (res.reservation_time - LAG(res.reservation_time, 1) OVER (ORDER BY res.reservation_time, res.id))) / 60, 1) AS gap_minutes FROM reservations res JOIN restaurants r ON res.restaurant_id = r.id WHERE r.name = 'Gusto Flagship Trattoria' ORDER BY res.reservation_time, res.id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter reservations for Gusto Flagship Trattoria.",
      "Compute gap in minutes between successive reservations."
    ],
    "solution_explanation": "Analyzes booking density and spacing at flagship venue.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L4-059",
    "domain": "restaurants",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Running Total of Shift Hours Worked Across All Locations",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate daily cumulative hours worked company-wide: date, daily hours, and running cumulative hours.",
    "context_notes": "GROUP BY shift_date with SUM OVER running total.",
    "concepts": [
      "SELECT",
      "SUM",
      "SUM OVER",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "shift_date",
      "daily_total_hours",
      "running_network_hours"
    ],
    "reference_sql": "SELECT shift_date, ROUND(SUM(hours_worked), 2) AS daily_total_hours, ROUND(SUM(SUM(hours_worked)) OVER (ORDER BY shift_date), 2) AS running_network_hours FROM shifts GROUP BY shift_date ORDER BY shift_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group shifts by shift_date.",
      "Compute running sum of daily total hours over dates."
    ],
    "solution_explanation": "Corporate workforce capacity burn chart.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-060",
    "domain": "restaurants",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Top 3 Most Active Servers by Order Volume",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank servers by total count of dining checks served using DENSE_RANK, returning top 3 server positions.",
    "context_notes": "Subquery with DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) <= 3.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "COUNT",
      "GROUP BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "server_name",
      "orders_handled",
      "activity_rank"
    ],
    "reference_sql": "SELECT server_name, orders_handled, activity_rank FROM (SELECT server_name, COUNT(*) AS orders_handled, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS activity_rank FROM orders GROUP BY server_name) sub WHERE activity_rank <= 3 ORDER BY activity_rank, server_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery ranks servers by COUNT(*) DESC.",
      "Filter WHERE activity_rank <= 3."
    ],
    "solution_explanation": "Recognizes highest-throughput front-of-house staff.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-061",
    "domain": "restaurants",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Dishes Outperforming Their Category Average Revenue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find dishes whose total sales revenue exceeds the average dish sales revenue in their respective category.",
    "context_notes": "Correlated subquery or window AVG comparing dish revenue to category average.",
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
      "category",
      "dish_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity * mi.price) AS dish_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category HAVING SUM(oi.quantity * mi.price) > (SELECT AVG(cat_rev) FROM (SELECT mi2.category, SUM(oi2.quantity * mi2.price) AS cat_rev FROM menu_items mi2 JOIN order_items oi2 ON mi2.id = oi2.menu_item_id GROUP BY mi2.id, mi2.category) sub WHERE sub.category = mi.category) ORDER BY mi.category, dish_revenue DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue per dish.",
      "HAVING clause checks if revenue exceeds category average revenue."
    ],
    "solution_explanation": "Identifies category champions carrying menu stations.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-062",
    "domain": "restaurants",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Kitchen Staff Shift Allocation: Lunch vs Dinner",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For Line Cooks and Sous Chefs, show total hours spent on Lunch vs Dinner shifts side-by-side using CASE WHEN.",
    "context_notes": "JOIN staff_members and shifts, SUM(CASE WHEN shift_type) for kitchen roles.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "WHERE",
      "IN",
      "GROUP BY"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "lunch_hours",
      "dinner_hours"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, ROUND(SUM(CASE WHEN s.shift_type = 'Lunch' THEN s.hours_worked ELSE 0 END), 2) AS lunch_hours, ROUND(SUM(CASE WHEN s.shift_type = 'Dinner' THEN s.hours_worked ELSE 0 END), 2) AS dinner_hours FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role IN ('Line_Cook', 'Sous_Chef') GROUP BY sm.name, sm.role ORDER BY sm.role, dinner_hours DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with shifts.",
      "Filter for Line_Cook and Sous_Chef.",
      "Sum hours conditionally for Lunch and Dinner."
    ],
    "solution_explanation": "Kitchen shift distribution for station balancing.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-063",
    "domain": "restaurants",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Top 3 Highest Review Ratings by City Using Dense Rank",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each city, rank restaurants by average guest rating using DENSE_RANK, returning the top rank venue.",
    "context_notes": "Subquery with DENSE_RANK() OVER (PARTITION BY city ORDER BY AVG(rating) DESC) = 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "DENSE_RANK",
      "PARTITION BY",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "city",
      "restaurant_name",
      "avg_rating"
    ],
    "reference_sql": "SELECT city, restaurant_name, avg_rating FROM (SELECT r.city, r.name AS restaurant_name, ROUND(AVG(gr.rating), 2) AS avg_rating, DENSE_RANK() OVER (PARTITION BY r.city ORDER BY AVG(gr.rating) DESC) AS city_rank FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.city, r.name) sub WHERE city_rank = 1 ORDER BY city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes average rating and dense rank per city.",
      "Filter WHERE city_rank = 1."
    ],
    "solution_explanation": "Crowns top rated culinary destination in each metropolitan area.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L4-064",
    "domain": "restaurants",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Running Share of Orders Handled by Servers Over Shift",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For server Marco V., calculate running count of checks and running total revenue over time.",
    "context_notes": "COUNT and SUM OVER order_time WHERE server_name = Marco V..",
    "concepts": [
      "SELECT",
      "COUNT OVER",
      "SUM OVER",
      "WHERE",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "order_time",
      "total_amount",
      "running_orders",
      "running_sales"
    ],
    "reference_sql": "SELECT id, order_time, total_amount, COUNT(*) OVER (ORDER BY order_time, id) AS running_orders, ROUND(SUM(total_amount) OVER (ORDER BY order_time, id), 2) AS running_sales FROM orders WHERE server_name = 'Marco V.' ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter orders for Marco V..",
      "Compute running count and running sum over order_time."
    ],
    "solution_explanation": "Tracks individual server shift productivity velocity.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-065",
    "domain": "restaurants",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Labor Cost Percentage of Total Revenue Per Server",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Calculate estimated direct floor labor cost as percentage of order revenue per server.",
    "context_notes": "Subquery matching server orders with server shift wages.",
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
      "total_revenue",
      "order_count"
    ],
    "reference_sql": "SELECT server_name, ROUND(SUM(total_amount), 2) AS total_revenue, COUNT(*) AS order_count FROM orders GROUP BY server_name ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by server_name.",
      "Compute total_revenue and order_count."
    ],
    "solution_explanation": "Server productivity baseline for floor labor budgeting.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-066",
    "domain": "restaurants",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Dishes Priced in Top 10 Percentile Across All Categories",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Use NTILE(10) to identify the ultra-premium top 10% of menu items by retail selling price.",
    "context_notes": "Subquery with NTILE(10) OVER (ORDER BY price DESC) = 1.",
    "concepts": [
      "SELECT",
      "NTILE",
      "Subquery",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "price"
    ],
    "reference_sql": "SELECT name, category, price FROM (SELECT name, category, price, NTILE(10) OVER (ORDER BY price DESC) AS price_decile FROM menu_items) sub WHERE price_decile = 1 ORDER BY price DESC, name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery assigns NTILE(10) ordered by price DESC.",
      "Filter WHERE price_decile = 1."
    ],
    "solution_explanation": "Surfaces top decile prestige luxury menu offerings.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-067",
    "domain": "restaurants",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Prep Shift Hours Ratio to Total Culinary Hours",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What percentage of all culinary kitchen hours (Line Cook, Sous Chef, Executive Chef) are spent on Prep shifts?",
    "context_notes": "SUM(CASE WHEN Prep) / SUM(all hours) * 100 for kitchen roles.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "WHERE",
      "IN",
      "Arithmetic"
    ],
    "expected_columns": [
      "prep_hours",
      "total_kitchen_hours",
      "prep_percentage"
    ],
    "reference_sql": "SELECT ROUND(SUM(CASE WHEN s.shift_type = 'Prep' THEN s.hours_worked ELSE 0 END), 2) AS prep_hours, ROUND(SUM(s.hours_worked), 2) AS total_kitchen_hours, ROUND((SUM(CASE WHEN s.shift_type = 'Prep' THEN s.hours_worked ELSE 0 END) / SUM(s.hours_worked)) * 100, 1) AS prep_percentage FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE sm.role IN ('Line_Cook', 'Sous_Chef', 'Executive_Chef');",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members filtering culinary roles.",
      "Calculate Prep hours as percentage of total kitchen hours."
    ],
    "solution_explanation": "Mise-en-place prep ratio benchmark for kitchen labor modeling.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-068",
    "domain": "restaurants",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Venues With Multiple High Capacity Tables",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have at least 3 tables with seating capacity >= 8 (large banquet tables).",
    "context_notes": "JOIN restaurants with dining_tables WHERE max_seats >= 8, HAVING COUNT >= 3.",
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
      "city",
      "large_table_count"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(dt.id) AS large_table_count FROM restaurants r JOIN dining_tables dt ON r.id = dt.restaurant_id WHERE dt.max_seats >= 8 GROUP BY r.name, r.city HAVING COUNT(dt.id) >= 3 ORDER BY large_table_count DESC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with dining_tables.",
      "Filter max_seats >= 8 and check HAVING COUNT >= 3."
    ],
    "solution_explanation": "Banquet readiness assessment for large party bookings.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-069",
    "domain": "restaurants",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Hourly Rate Spread by Role",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each role, calculate minimum wage, maximum wage, and the wage spread (max minus min).",
    "context_notes": "GROUP BY role with MIN, MAX, and MAX - MIN.",
    "concepts": [
      "SELECT",
      "MIN",
      "MAX",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "role",
      "min_rate",
      "max_rate",
      "wage_spread"
    ],
    "reference_sql": "SELECT role, MIN(hourly_rate) AS min_rate, MAX(hourly_rate) AS max_rate, ROUND(MAX(hourly_rate) - MIN(hourly_rate), 2) AS wage_spread FROM staff_members GROUP BY role ORDER BY wage_spread DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group staff_members by role.",
      "Compute MIN, MAX, and difference as wage_spread."
    ],
    "solution_explanation": "Compensation bandwidth analysis across corporate job families.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-070",
    "domain": "restaurants",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Average Bill Difference for Tables Handled by Luca B.",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Compare Luca B. average check size against other servers using CASE WHEN.",
    "context_notes": "CASE WHEN server_name = Luca B. vs Other Servers with AVG(total_amount).",
    "concepts": [
      "SELECT",
      "AVG",
      "CASE WHEN",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_cohort",
      "avg_ticket_amount"
    ],
    "reference_sql": "SELECT CASE WHEN server_name = 'Luca B.' THEN 'Luca B.' ELSE 'Other Servers' END AS server_cohort, ROUND(AVG(total_amount), 2) AS avg_ticket_amount FROM orders GROUP BY CASE WHEN server_name = 'Luca B.' THEN 'Luca B.' ELSE 'Other Servers' END ORDER BY avg_ticket_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Bucket server into Luca B. vs Other Servers.",
      "Compute AVG(total_amount) for each cohort."
    ],
    "solution_explanation": "A/B performance test comparing top server ticket size to floor average.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-071",
    "domain": "restaurants",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Rank Category by Revenue and Profit Side-by-Side",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank menu categories by gross revenue AND by gross profit simultaneously using DENSE_RANK.",
    "context_notes": "JOIN order_items and menu_items, GROUP BY category with two DENSE_RANKs.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "DENSE_RANK",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "revenue",
      "revenue_rank",
      "profit",
      "profit_rank"
    ],
    "reference_sql": "SELECT mi.category, ROUND(SUM(oi.quantity * mi.price), 2) AS revenue, DENSE_RANK() OVER (ORDER BY SUM(oi.quantity * mi.price) DESC) AS revenue_rank, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS profit, DENSE_RANK() OVER (ORDER BY SUM(oi.quantity * (mi.price - mi.cost)) DESC) AS profit_rank FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category ORDER BY profit_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join menu_items with order_items.",
      "Compute revenue and profit totals.",
      "Apply DENSE_RANK() on both metrics independently."
    ],
    "solution_explanation": "Identifies misalignment between high-revenue and high-profit sections.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-072",
    "domain": "restaurants",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Staff Shift Utilization vs Average Shift Duration",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find staff members whose average shift duration is strictly greater than the overall company shift duration average.",
    "context_notes": "GROUP BY staff_id, HAVING AVG(hours_worked) > subquery average.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "avg_shift_hours"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, ROUND(AVG(s.hours_worked), 2) AS avg_shift_hours FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.name, sm.role HAVING AVG(s.hours_worked) > (SELECT AVG(hours_worked) FROM shifts) ORDER BY avg_shift_hours DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with shifts.",
      "Group by staff member and filter HAVING AVG > overall average."
    ],
    "solution_explanation": "Pins staff members frequently scheduled for extended shifts.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-073",
    "domain": "restaurants",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Venues With Consecutive High Value Purchases",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find restaurants with at least 2 procurement invoices each exceeding $2,500.",
    "context_notes": "Filter purchases > 2500, GROUP BY restaurant, HAVING COUNT >= 2.",
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
      "city",
      "high_value_purchases"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(ip.id) AS high_value_purchases FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id WHERE ip.total_amount > 2500 GROUP BY r.name, r.city HAVING COUNT(ip.id) >= 2 ORDER BY high_value_purchases DESC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with ingredient_purchases.",
      "Filter WHERE total_amount > 2500 and check HAVING COUNT >= 2."
    ],
    "solution_explanation": "Spots capital-intensive procurement hubs.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-074",
    "domain": "restaurants",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Guest Review Variance From Venue Historical Mean",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Display each review: venue name, review rating, venue average rating, and difference from the venue mean.",
    "context_notes": "rating - AVG(rating) OVER (PARTITION BY restaurant_id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG OVER",
      "PARTITION BY",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "restaurant_name",
      "rating",
      "venue_mean_rating",
      "rating_deviation"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, gr.rating, ROUND(AVG(gr.rating) OVER (PARTITION BY gr.restaurant_id), 2) AS venue_mean_rating, ROUND(gr.rating - AVG(gr.rating) OVER (PARTITION BY gr.restaurant_id), 2) AS rating_deviation FROM guest_reviews gr JOIN restaurants r ON gr.restaurant_id = r.id ORDER BY r.name, gr.review_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join guest_reviews with restaurants.",
      "Compute rating deviation from venue historical average."
    ],
    "solution_explanation": "Quality assurance deviation monitor across feedback logs.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-075",
    "domain": "restaurants",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Top 3 Server Earnings in Tips Proxy",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Assuming a standard 18% gratuity rate on order billings, compute estimated gratuity pool earned by each server.",
    "context_notes": "GROUP BY server_name, SUM(total_amount * 0.18) ORDER DESC LIMIT 3.",
    "concepts": [
      "SELECT",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "server_name",
      "gross_sales",
      "estimated_gratuity"
    ],
    "reference_sql": "SELECT server_name, ROUND(SUM(total_amount), 2) AS gross_sales, ROUND(SUM(total_amount * 0.18), 2) AS estimated_gratuity FROM orders GROUP BY server_name ORDER BY estimated_gratuity DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by server_name.",
      "Compute SUM(total_amount) and multiply by 0.18 for tip pool."
    ],
    "solution_explanation": "Estimated server tip generation leaderboard.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-076",
    "domain": "restaurants",
    "level": 4,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Labor Cost Dashboard by Role and Venue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Comprehensive labor dashboard: for each role, show headcount, average wage, total shift hours worked, and total labor dollars paid.",
    "context_notes": "JOIN staff_members with shifts, GROUP BY role with multiple aggregates.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "AVG",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "role",
      "headcount",
      "avg_hourly_wage",
      "total_hours_worked",
      "total_labor_spend"
    ],
    "reference_sql": "SELECT sm.role, COUNT(DISTINCT sm.id) AS headcount, ROUND(AVG(sm.hourly_rate), 2) AS avg_hourly_wage, ROUND(SUM(s.hours_worked), 2) AS total_hours_worked, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_labor_spend FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.role ORDER BY total_labor_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with shifts.",
      "Group by role and compute headcount, avg wage, total hours, and payroll."
    ],
    "solution_explanation": "Executive workforce P&L scorecard by job family.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-077",
    "domain": "restaurants",
    "level": 4,
    "order": 77,
    "difficulty": "boss",
    "title": "Top Performing Dish in Each Category by Net Profit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify the #1 most profitable dish within each menu category using ROW_NUMBER partitioned by category.",
    "context_notes": "Subquery with ROW_NUMBER() OVER (PARTITION BY category ORDER BY SUM(profit) DESC) = 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ROW_NUMBER",
      "PARTITION BY",
      "SUM",
      "GROUP BY",
      "Subquery"
    ],
    "expected_columns": [
      "category",
      "dish_name",
      "total_profit"
    ],
    "reference_sql": "SELECT category, dish_name, total_profit FROM (SELECT mi.category, mi.name AS dish_name, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS total_profit, ROW_NUMBER() OVER (PARTITION BY mi.category ORDER BY SUM(oi.quantity * (mi.price - mi.cost)) DESC) AS rn FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category, mi.name) sub WHERE rn = 1 ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group order_items and menu_items to compute profit per dish.",
      "Apply ROW_NUMBER() partitioned by category.",
      "Filter WHERE rn = 1."
    ],
    "solution_explanation": "Pins the #1 net profit generator for each kitchen station.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-078",
    "domain": "restaurants",
    "level": 4,
    "order": 78,
    "difficulty": "boss",
    "title": "Full Venue Financial Health Scorecard",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Master venue scorecard: venue name, city, seating capacity, total order revenue, and total ingredient procurement spend.",
    "context_notes": "LEFT JOIN restaurants with orders and ingredient_purchases summaries.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "total_order_revenue",
      "total_procurement_cost"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, r.seating_capacity, COALESCE((SELECT ROUND(SUM(total_amount), 2) FROM orders), 0) AS total_order_revenue, COALESCE(SUM(ip.total_amount), 2) AS total_procurement_cost FROM restaurants r LEFT JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.name, r.city, r.seating_capacity ORDER BY total_procurement_cost DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with procurement and scalar subqueries for sales summary."
    ],
    "solution_explanation": "Full-network operational and procurement audit sheet.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L4-079",
    "domain": "restaurants",
    "level": 4,
    "order": 79,
    "difficulty": "boss",
    "title": "Server Sales Decile and Commission Tiering",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Assign each server a performance tier based on total sales: Platinum (Top 2), Gold (Next 3), Silver (Remaining).",
    "context_notes": "Subquery with DENSE_RANK() on server sales and CASE WHEN tier.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "CASE WHEN",
      "SUM",
      "GROUP BY",
      "Subquery"
    ],
    "expected_columns": [
      "server_name",
      "total_sales",
      "performance_tier"
    ],
    "reference_sql": "SELECT server_name, total_sales, CASE WHEN sales_rank <= 2 THEN 'Platinum Performer' WHEN sales_rank <= 5 THEN 'Gold Performer' ELSE 'Silver Performer' END AS performance_tier FROM (SELECT server_name, ROUND(SUM(total_amount), 2) AS total_sales, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS sales_rank FROM orders GROUP BY server_name) sub ORDER BY total_sales DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery ranks servers by total sales.",
      "CASE WHEN categorizes servers into Platinum, Gold, Silver tiers."
    ],
    "solution_explanation": "Floor server incentive and bonus distribution model.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L4-080",
    "domain": "restaurants",
    "level": 4,
    "order": 80,
    "difficulty": "boss",
    "title": "Shift Hours Outlier Detection with Standard Deviation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find any shift whose hours worked are more than 1.5 standard deviations above the average shift length.",
    "context_notes": "WHERE hours_worked > (SELECT AVG + 1.5 * STDDEV FROM shifts).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "Subquery",
      "AVG",
      "STDDEV"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "shift_type",
      "hours_worked"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, s.shift_type, s.hours_worked FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE s.hours_worked > (SELECT AVG(hours_worked) + 1.5 * STDDEV(hours_worked) FROM shifts) ORDER BY s.hours_worked DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery calculates AVG + 1.5 * STDDEV on shifts.",
      "Outer query filters outlier shift durations."
    ],
    "solution_explanation": "Statistical anomaly detection for fatigue prevention.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-081",
    "domain": "restaurants",
    "level": 4,
    "order": 81,
    "difficulty": "boss",
    "title": "Category Margin Comparison: Actual vs Target 70%",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare actual gross margin percentage against our target 70% benchmark for each menu category.",
    "context_notes": "ROUND((profit / revenue) * 100, 1) vs 70.0 benchmark.",
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
      "revenue",
      "gross_profit",
      "actual_margin_pct",
      "variance_from_target"
    ],
    "reference_sql": "SELECT mi.category, ROUND(SUM(oi.quantity * mi.price), 2) AS revenue, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS gross_profit, ROUND((SUM(oi.quantity * (mi.price - mi.cost)) / SUM(oi.quantity * mi.price)) * 100, 1) AS actual_margin_pct, ROUND(((SUM(oi.quantity * (mi.price - mi.cost)) / SUM(oi.quantity * mi.price)) * 100) - 70.0, 1) AS variance_from_target FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category ORDER BY actual_margin_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join menu_items with order_items.",
      "Compute actual margin % and variance against 70% target."
    ],
    "solution_explanation": "Strategic menu engineering audit against corporate targets.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-082",
    "domain": "restaurants",
    "level": 4,
    "order": 82,
    "difficulty": "boss",
    "title": "Labor Cost per Seated Cover by Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For restaurants with both shifts and reservations, calculate estimated labor cost per booked reservation cover.",
    "context_notes": "Total labor cost divided by total reservation covers per venue.",
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
      "city",
      "total_labor_cost",
      "total_covers",
      "labor_cost_per_cover"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_labor_cost, (SELECT SUM(res.party_size) FROM reservations res WHERE res.restaurant_id = r.id) AS total_covers, ROUND(SUM(s.hours_worked * sm.hourly_rate) / NULLIF((SELECT SUM(res.party_size) FROM reservations res WHERE res.restaurant_id = r.id), 0), 2) AS labor_cost_per_cover FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id WHERE EXISTS (SELECT 1 FROM reservations res WHERE res.restaurant_id = r.id) GROUP BY r.id, r.name, r.city ORDER BY labor_cost_per_cover DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate shift labor dollars per venue.",
      "Subquery sums reservation covers.",
      "Compute labor cost per cover."
    ],
    "solution_explanation": "Labor efficiency index normalized per customer cover.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L4-083",
    "domain": "restaurants",
    "level": 4,
    "order": 83,
    "difficulty": "boss",
    "title": "Rank Dining Tables by Average Check Size",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank dining tables by their average check amount using DENSE_RANK: show table number, check count, avg check, and rank.",
    "context_notes": "GROUP BY table_number with DENSE_RANK OVER AVG(total_amount) DESC.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "COUNT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "table_number",
      "orders_count",
      "avg_check",
      "table_check_rank"
    ],
    "reference_sql": "SELECT table_number, COUNT(*) AS orders_count, ROUND(AVG(total_amount), 2) AS avg_check, DENSE_RANK() OVER (ORDER BY AVG(total_amount) DESC) AS table_check_rank FROM orders GROUP BY table_number ORDER BY table_check_rank, table_number LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by table_number.",
      "Apply DENSE_RANK() OVER (ORDER BY AVG(total_amount) DESC)."
    ],
    "solution_explanation": "Evaluates floor table yield and premium seating zones.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-084",
    "domain": "restaurants",
    "level": 4,
    "order": 84,
    "difficulty": "boss",
    "title": "Running Balance of Total Headcount Added Over Time",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Order staff members by id and compute running cumulative count of total employees added to the payroll.",
    "context_notes": "COUNT(*) OVER (ORDER BY id).",
    "concepts": [
      "SELECT",
      "COUNT OVER",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "name",
      "role",
      "hourly_rate",
      "running_employee_count"
    ],
    "reference_sql": "SELECT id, name, role, hourly_rate, COUNT(*) OVER (ORDER BY id) AS running_employee_count FROM staff_members ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use COUNT(*) OVER (ORDER BY id) on staff_members."
    ],
    "solution_explanation": "Workforce expansion chronology across the enterprise.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-085",
    "domain": "restaurants",
    "level": 4,
    "order": 85,
    "difficulty": "boss",
    "title": "Top 3 Priciest Wines and Champagnes",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find the top 3 highest priced beverages in our cellar catalog along with their price rank using DENSE_RANK.",
    "context_notes": "Filter category = beverage, DENSE_RANK OVER price DESC LIMIT 3.",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "WHERE",
      "WINDOW",
      "LIMIT"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost",
      "cellar_rank"
    ],
    "reference_sql": "SELECT name, price, cost, DENSE_RANK() OVER (ORDER BY price DESC) AS cellar_rank FROM menu_items WHERE category = 'beverage' ORDER BY cellar_rank, name LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE category = beverage.",
      "Apply DENSE_RANK() OVER (ORDER BY price DESC) and LIMIT 3."
    ],
    "solution_explanation": "Cellar crown jewels list for VIP dining suggestions.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-086",
    "domain": "restaurants",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Consecutive Shift Wage Acceleration for Staff",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For Line Cook staff, display shift date, hours worked, and wage earned, comparing against the previous shift using LAG.",
    "context_notes": "Join shifts with staff_members WHERE role = Line_Cook, LAG(shift_cost).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "LAG",
      "WHERE",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "staff_name",
      "shift_date",
      "hours_worked",
      "shift_cost",
      "prev_shift_cost"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, s.shift_date, s.hours_worked, ROUND(s.hours_worked * sm.hourly_rate, 2) AS shift_cost, LAG(ROUND(s.hours_worked * sm.hourly_rate, 2), 1) OVER (PARTITION BY sm.id ORDER BY s.shift_date, s.id) AS prev_shift_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE sm.role = 'Line_Cook' ORDER BY sm.name, s.shift_date;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter for Line_Cook staff.",
      "Compute shift cost and previous shift cost using LAG."
    ],
    "solution_explanation": "Line cook shift cost fluctuations over the rotation.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-087",
    "domain": "restaurants",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Menu Mix Engineering Matrix: Star, Plowhorse, Dog, Puzzle",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Categorize dishes into BCG Menu Matrix: High Sales & High Margin vs Low Sales & Low Margin.",
    "context_notes": "CASE WHEN comparing units_sold and unit_margin against averages.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "Subquery"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "units_sold",
      "unit_profit",
      "menu_quadrant"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity) AS units_sold, ROUND(mi.price - mi.cost, 2) AS unit_profit, CASE WHEN SUM(oi.quantity) >= 10 AND (mi.price - mi.cost) >= 15 THEN 'Star (High Vol, High Margin)' WHEN SUM(oi.quantity) >= 10 AND (mi.price - mi.cost) < 15 THEN 'Plowhorse (High Vol, Low Margin)' WHEN SUM(oi.quantity) < 10 AND (mi.price - mi.cost) >= 15 THEN 'Puzzle (Low Vol, High Margin)' ELSE 'Dog (Low Vol, Low Margin)' END AS menu_quadrant FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category, mi.price, mi.cost ORDER BY units_sold DESC, unit_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join menu_items with order_items.",
      "Compute sales volume and unit profit.",
      "Classify into Star, Plowhorse, Puzzle, Dog."
    ],
    "solution_explanation": "Classic restaurant menu engineering classification quadrant.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L4-088",
    "domain": "restaurants",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Top Revenue Generating Server by Category",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each menu category, find which server has sold the highest total dollar volume.",
    "context_notes": "3-way JOIN, GROUP BY category, server_name, ROW_NUMBER = 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ROW_NUMBER",
      "PARTITION BY",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "server_name",
      "category_sales"
    ],
    "reference_sql": "SELECT category, server_name, category_sales FROM (SELECT mi.category, o.server_name, ROUND(SUM(oi.quantity * mi.price), 2) AS category_sales, ROW_NUMBER() OVER (PARTITION BY mi.category ORDER BY SUM(oi.quantity * mi.price) DESC) AS rn FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY mi.category, o.server_name) sub WHERE rn = 1 ORDER BY category_sales DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join orders, order_items, menu_items.",
      "Rank servers within each menu category by total sales.",
      "Filter top rank server per category."
    ],
    "solution_explanation": "Highlights specialist server sales champions by station.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L4-089",
    "domain": "restaurants",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Labor Expense by Day Company-Wide",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate daily labor payroll dollars and running cumulative payroll cost across the entire enterprise.",
    "context_notes": "GROUP BY shift_date, SUM(hours * rate) and running SUM OVER.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "SUM OVER",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "shift_date",
      "daily_payroll",
      "running_total_payroll"
    ],
    "reference_sql": "SELECT s.shift_date, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS daily_payroll, ROUND(SUM(SUM(s.hours_worked * sm.hourly_rate)) OVER (ORDER BY s.shift_date), 2) AS running_total_payroll FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id GROUP BY s.shift_date ORDER BY s.shift_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Compute daily payroll sum and running cumulative payroll over time."
    ],
    "solution_explanation": "Corporate payroll run-rate tracking.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-090",
    "domain": "restaurants",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Venues With High Headcount but Low Capacity",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Identify potential over-staffed venues: restaurants where staff headcount per seat exceeds 0.05.",
    "context_notes": "COUNT(sm.id) / seating_capacity > 0.05.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "Arithmetic",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "staff_count",
      "staff_to_seat_ratio"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, r.seating_capacity, COUNT(sm.id) AS staff_count, ROUND(COUNT(sm.id)::NUMERIC / r.seating_capacity, 3) AS staff_to_seat_ratio FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id GROUP BY r.name, r.city, r.seating_capacity HAVING (COUNT(sm.id)::NUMERIC / r.seating_capacity) > 0.05 ORDER BY staff_to_seat_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with staff_members.",
      "Compute ratio of staff count to seating capacity.",
      "Filter HAVING ratio > 0.05."
    ],
    "solution_explanation": "Over-staffing audit based on physical venue footprint.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-091",
    "domain": "restaurants",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Top 3 Most Expensive Shifts Worked",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find the 3 single most expensive shifts worked across the network, showing staff name, role, hours, rate, and total shift cost.",
    "context_notes": "shifts JOIN staff_members, ORDER BY shift_cost DESC LIMIT 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "Arithmetic",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "shift_type",
      "hours_worked",
      "hourly_rate",
      "shift_cost"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, s.shift_type, s.hours_worked, sm.hourly_rate, ROUND(s.hours_worked * sm.hourly_rate, 2) AS shift_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id ORDER BY shift_cost DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Compute hours_worked * hourly_rate and return top 3."
    ],
    "solution_explanation": "Identifies largest individual shift wage disbursements.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-092",
    "domain": "restaurants",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dish Revenue Share Within Category Cumulative Distribution",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each dish in the entree category, compute its revenue and its percentage contribution to total entree sales.",
    "context_notes": "SUM(sales) / SUM(SUM(sales)) OVER () * 100 for entrees.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "SUM OVER",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "dish_name",
      "dish_revenue",
      "category_share_pct"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, ROUND(SUM(oi.quantity * mi.price), 2) AS dish_revenue, ROUND((SUM(oi.quantity * mi.price) / SUM(SUM(oi.quantity * mi.price)) OVER ()) * 100, 2) AS category_share_pct FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.category = 'entree' GROUP BY mi.name ORDER BY dish_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE category = entree.",
      "Compute revenue and percentage share of entree category."
    ],
    "solution_explanation": "Analyzes market share inside our critical entree department.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-093",
    "domain": "restaurants",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Average Hourly Rate by Role and City",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Compare average hourly rates for Servers across all cities with active staff: role, city, and average rate.",
    "context_notes": "JOIN staff_members with restaurants WHERE role = Server, GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "role",
      "avg_server_wage"
    ],
    "reference_sql": "SELECT r.city, sm.role, ROUND(AVG(sm.hourly_rate), 2) AS avg_server_wage FROM staff_members sm JOIN restaurants r ON sm.restaurant_id = r.id WHERE sm.role = 'Server' GROUP BY r.city, sm.role ORDER BY avg_server_wage DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join staff_members with restaurants.",
      "Filter for Server role and group by city."
    ],
    "solution_explanation": "Geographic wage benchmarks for hiring competitiveness.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-094",
    "domain": "restaurants",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Floor Sales Velocity: Average Hourly Sales Rate",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group orders by the hour of the day and calculate order count, gross sales, and average bill size per operating hour.",
    "context_notes": "GROUP BY EXTRACT(HOUR FROM order_time).",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_hour",
      "orders_count",
      "total_sales",
      "avg_check_size"
    ],
    "reference_sql": "SELECT EXTRACT(HOUR FROM order_time)::INT AS order_hour, COUNT(*) AS orders_count, ROUND(SUM(total_amount), 2) AS total_sales, ROUND(AVG(total_amount), 2) AS avg_check_size FROM orders GROUP BY EXTRACT(HOUR FROM order_time) ORDER BY order_hour;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract hour from order_time.",
      "Aggregate orders count, sum sales, and avg check size."
    ],
    "solution_explanation": "Peak service heat map by time of day.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L4-095",
    "domain": "restaurants",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Venues With Executive Chef and Sous Chef on Staff",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find restaurants that have both an Executive Chef AND a Sous Chef assigned to their kitchen roster.",
    "context_notes": "INTERSECT or EXISTS matching both roles per restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id WHERE sm.role = 'Executive_Chef' INTERSECT SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id WHERE sm.role = 'Sous_Chef' ORDER BY restaurant_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Find venues with Executive_Chef INTERSECT venues with Sous_Chef."
    ],
    "solution_explanation": "Verifies complete senior culinary management hierarchy.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-096",
    "domain": "restaurants",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Staff With Highest Single Shift Earnings",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank staff members by their single highest earning shift using DENSE_RANK. Top 5 highest paid shifts.",
    "context_notes": "JOIN shifts with staff_members, MAX(hours * rate) LIMIT 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "MAX",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "peak_shift_earning"
    ],
    "reference_sql": "SELECT sm.name AS staff_name, sm.role, ROUND(MAX(s.hours_worked * sm.hourly_rate), 2) AS peak_shift_earning FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id GROUP BY sm.name, sm.role ORDER BY peak_shift_earning DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join shifts with staff_members.",
      "Compute MAX(hours_worked * hourly_rate) grouped by staff member."
    ],
    "solution_explanation": "Peak single-shift gross earning records.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L4-097",
    "domain": "restaurants",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Dishes Accounting for Zero Margin Contribution",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find any dishes where food cost is strictly equal to or greater than retail selling price — margin red alert.",
    "context_notes": "Filter menu_items WHERE cost >= price.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, category, price, cost FROM menu_items WHERE cost >= price ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE cost >= price."
    ],
    "solution_explanation": "Critical loss-leader or pricing defect red flag.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L4-098",
    "domain": "restaurants",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Top 3 Most Consistent Servers by Check Volume",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank servers who have served at least 10 orders by the lowest standard deviation in their check amounts.",
    "context_notes": "GROUP BY server_name, HAVING COUNT >= 10, ORDER BY STDDEV ASC LIMIT 3.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "STDDEV",
      "GROUP BY",
      "HAVING",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "server_name",
      "orders_count",
      "avg_check",
      "check_stddev"
    ],
    "reference_sql": "SELECT server_name, COUNT(*) AS orders_count, ROUND(AVG(total_amount), 2) AS avg_check, ROUND(STDDEV(total_amount), 2) AS check_stddev FROM orders GROUP BY server_name HAVING COUNT(*) >= 10 ORDER BY check_stddev ASC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by server_name.",
      "Filter HAVING COUNT >= 10.",
      "Order by STDDEV(total_amount) ASC LIMIT 3."
    ],
    "solution_explanation": "Identifies most reliable, predictable server floor performance.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-099",
    "domain": "restaurants",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Comprehensive Staff Payroll and Hours Scorecard",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Full staffing scorecard: total staff headcount, total shifts completed, total hours worked, and overall average wage.",
    "context_notes": "Aggregate staff_members and shifts tables in a single executive row.",
    "concepts": [
      "SELECT",
      "COUNT DISTINCT",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "active_headcount",
      "total_shifts_completed",
      "total_hours_worked",
      "avg_company_wage"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM staff_members) AS active_headcount, (SELECT COUNT(*) FROM shifts) AS total_shifts_completed, (SELECT ROUND(SUM(hours_worked), 2) FROM shifts) AS total_hours_worked, (SELECT ROUND(AVG(hourly_rate), 2) FROM staff_members) AS avg_company_wage;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries combine headcount, shift volume, hours, and wage metrics."
    ],
    "solution_explanation": "Master HR and operations headcount KPI card.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L4-100",
    "domain": "restaurants",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Grand Culinary and Floor Labor P&L Statement",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Grand Level 4 P&L statement: total order sales, total food procurement spend, total labor payroll paid, and net operational margin.",
    "context_notes": "Comprehensive executive calculation combining orders, procurement, and payroll.",
    "concepts": [
      "SELECT",
      "SUM",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "gross_order_sales",
      "food_procurement_cost",
      "direct_labor_payroll",
      "prime_cost",
      "gross_operating_profit"
    ],
    "reference_sql": "SELECT (SELECT ROUND(SUM(total_amount), 2) FROM orders) AS gross_order_sales, (SELECT ROUND(SUM(total_amount), 2) FROM ingredient_purchases) AS food_procurement_cost, (SELECT ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id) AS direct_labor_payroll, ROUND((SELECT SUM(total_amount) FROM ingredient_purchases) + (SELECT SUM(s.hours_worked * sm.hourly_rate) FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id), 2) AS prime_cost, ROUND((SELECT SUM(total_amount) FROM orders) - ((SELECT SUM(total_amount) FROM ingredient_purchases) + (SELECT SUM(s.hours_worked * sm.hourly_rate) FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id)), 2) AS gross_operating_profit;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Combines sales, procurement, and labor into standard restaurant Prime Cost and Gross Profit."
    ],
    "solution_explanation": "The master executive restaurant prime-cost and operating profit statement.",
    "xp": 60,
    "estimated_minutes": 15
  }
];
